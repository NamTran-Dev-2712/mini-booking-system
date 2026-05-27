#!/bin/bash
set -euo pipefail

# Rollback to previous color
# Usage: ./rollback.sh

DEPLOY_DIR="/opt/mini-booking-system"
COMPOSE_FILE="${DEPLOY_DIR}/infra/docker-compose.prod.yml"
ENV_FILE="${DEPLOY_DIR}/.env.production"
STATE_FILE="${DEPLOY_DIR}/.active-color"
NGINX_DIR="${DEPLOY_DIR}/infra/docker/nginx"
COMPOSE_CMD="docker compose -f $COMPOSE_FILE --env-file $ENV_FILE"

cd "$DEPLOY_DIR"

CURRENT_COLOR=$(cat "$STATE_FILE" 2>/dev/null || echo "blue")
if [ "$CURRENT_COLOR" = "blue" ]; then
    ROLLBACK_COLOR="green"
else
    ROLLBACK_COLOR="blue"
fi

echo "=== Rollback ==="
echo "Current: $CURRENT_COLOR"
echo "Rolling back to: $ROLLBACK_COLOR"
echo "================="

# ─── Ensure nginx conf.d has valid .conf files ──────────────
ensure_nginx_config() {
    local FRONTEND_DOMAIN API_DOMAIN
    FRONTEND_DOMAIN=$(grep "^FRONTEND_DOMAIN=" .env.production | cut -d= -f2)
    API_DOMAIN=$(grep "^API_DOMAIN=" .env.production | cut -d= -f2)

    if [ -z "$FRONTEND_DOMAIN" ] || [ -z "$API_DOMAIN" ]; then
        return
    fi

    local HAS_SSL=false
    if docker volume inspect infra_ssl_certs &>/dev/null; then
        if docker run --rm -v infra_ssl_certs:/certs:ro alpine \
            test -f "/certs/live/${FRONTEND_DOMAIN}/fullchain.pem" 2>/dev/null; then
            HAS_SSL=true
        fi
    fi

    if [ "$HAS_SSL" = true ]; then
        export FRONTEND_DOMAIN API_DOMAIN
        envsubst '${FRONTEND_DOMAIN}' < "${NGINX_DIR}/conf.d/frontend.conf.template" \
            > "${NGINX_DIR}/conf.d/frontend.conf"
        envsubst '${API_DOMAIN}' < "${NGINX_DIR}/conf.d/backend.conf.template" \
            > "${NGINX_DIR}/conf.d/backend.conf"
    else
        cat > "${NGINX_DIR}/conf.d/frontend.conf" <<NEOF
server {
    listen 80;
    server_name ${FRONTEND_DOMAIN};
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / {
        proxy_pass http://web_upstream;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
NEOF
        cat > "${NGINX_DIR}/conf.d/backend.conf" <<NEOF
server {
    listen 80;
    server_name ${API_DOMAIN};
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location = /health {
        proxy_pass http://api_upstream/health;
        access_log off;
    }
    location / {
        proxy_pass http://api_upstream/;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
NEOF
    fi
}

# Ensure infrastructure is running
echo "[1/4] Ensuring infrastructure is running..."
ensure_nginx_config
$COMPOSE_CMD up -d postgres_db redis_cache nginx certbot

# Start rollback containers
echo "[2/4] Starting $ROLLBACK_COLOR containers..."
$COMPOSE_CMD --profile "$ROLLBACK_COLOR" up -d "api-${ROLLBACK_COLOR}" "web-${ROLLBACK_COLOR}"

# Wait for health (longer wait for rollback)
echo "[3/4] Waiting for $ROLLBACK_COLOR to become healthy..."
RETRIES=0
while [ $RETRIES -lt 12 ]; do
    API_HEALTH=$(docker inspect --format='{{.State.Health.Status}}' "api-${ROLLBACK_COLOR}" 2>/dev/null || echo "starting")
    if [ "$API_HEALTH" = "healthy" ]; then
        echo "  API healthy!"
        break
    fi
    RETRIES=$((RETRIES + 1))
    echo "  Attempt $RETRIES/12 - API: $API_HEALTH"
    sleep 5
done

if [ "$API_HEALTH" != "healthy" ]; then
    echo "ERROR: $ROLLBACK_COLOR API is not healthy ($API_HEALTH). Cannot rollback."
    exit 1
fi

# Switch nginx
echo "[4/4] Switching nginx to $ROLLBACK_COLOR..."
cp "${NGINX_DIR}/upstream-${ROLLBACK_COLOR}.conf" "${NGINX_DIR}/active-upstream.conf"

# Wait for nginx to be running before reload
NGINX_RETRIES=0
while [ $NGINX_RETRIES -lt 10 ]; do
    NGINX_STATE=$(docker inspect --format='{{.State.Status}}' nginx_prod 2>/dev/null || echo "unknown")
    if [ "$NGINX_STATE" = "running" ]; then
        break
    fi
    NGINX_RETRIES=$((NGINX_RETRIES + 1))
    echo "  Waiting for nginx (state: $NGINX_STATE)... attempt $NGINX_RETRIES/10"
    sleep 3
done

if [ "$NGINX_STATE" != "running" ]; then
    echo "WARN: nginx not running, attempting restart..."
    docker restart nginx_prod 2>/dev/null || true
    sleep 5
fi

docker exec nginx_prod nginx -s reload

# Stop old color containers only
docker stop "api-${CURRENT_COLOR}" "web-${CURRENT_COLOR}" 2>/dev/null || true
docker rm "api-${CURRENT_COLOR}" "web-${CURRENT_COLOR}" 2>/dev/null || true

# Update state
echo "$ROLLBACK_COLOR" > "$STATE_FILE"

echo ""
echo "=== Rollback Complete ==="
echo "Active: $ROLLBACK_COLOR"
echo "========================="
