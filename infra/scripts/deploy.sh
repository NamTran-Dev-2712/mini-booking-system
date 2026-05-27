#!/bin/bash
set -euo pipefail

# Blue-Green Deployment Script
# Usage: ./deploy.sh [image_tag]
# Supports both GHCR (GitHub Actions) and self-hosted registry (local act)

IMAGE_TAG="${1:-latest}"
DEPLOY_DIR="/opt/mini-booking-system"
COMPOSE_FILE="${DEPLOY_DIR}/infra/docker-compose.prod.yml"
ENV_FILE="${DEPLOY_DIR}/.env.production"
STATE_FILE="${DEPLOY_DIR}/.active-color"
NGINX_DIR="${DEPLOY_DIR}/infra/docker/nginx"
MAX_RETRIES=24
RETRY_INTERVAL=5

cd "$DEPLOY_DIR"

# Load registry config from .env.production
IMAGE_TAG=$(grep "^IMAGE_TAG=" .env.production | cut -d= -f2)
REGISTRY=$(grep "^REGISTRY=" .env.production | cut -d= -f2 || echo "ghcr.io")
IMAGE_PREFIX=$(grep "^IMAGE_PREFIX=" .env.production | cut -d= -f2)
export IMAGE_TAG REGISTRY IMAGE_PREFIX

# Login to registry if credentials file exists
# For self-hosted registry: .registry-credentials contains REG_USER and REG_PASSWORD
# For GHCR: the CD workflow handles login before calling this script
if [ -f "${DEPLOY_DIR}/.registry-credentials" ]; then
    echo "[pre] Logging into registry ${REGISTRY}..."
    # shellcheck source=/dev/null
    source "${DEPLOY_DIR}/.registry-credentials"
    echo "${REG_PASSWORD}" | docker login "${REGISTRY}" -u "${REG_USER}" --password-stdin
fi

COMPOSE_CMD="docker compose -f $COMPOSE_FILE --env-file $ENV_FILE"

# ─── Ensure nginx conf.d has valid .conf files ──────────────
# setup-ssl.sh generates conf.d/*.conf via envsubst, but those files
# are untracked by git. If they're missing OR SSL certs were deleted,
# nginx will crash on startup. This block self-heals both cases.
ensure_nginx_config() {
    local FRONTEND_DOMAIN API_DOMAIN
    FRONTEND_DOMAIN=$(grep "^FRONTEND_DOMAIN=" .env.production | cut -d= -f2)
    API_DOMAIN=$(grep "^API_DOMAIN=" .env.production | cut -d= -f2)

    if [ -z "$FRONTEND_DOMAIN" ] || [ -z "$API_DOMAIN" ]; then
        echo "  WARN: FRONTEND_DOMAIN or API_DOMAIN not set in .env.production, skipping nginx config generation"
        return
    fi

    # Check if SSL certs exist inside the Docker volume
    local HAS_SSL=false
    if docker volume inspect infra_ssl_certs &>/dev/null; then
        # Check if cert files actually exist in the volume
        if docker run --rm -v infra_ssl_certs:/certs:ro alpine \
            test -f "/certs/live/${FRONTEND_DOMAIN}/fullchain.pem" 2>/dev/null; then
            HAS_SSL=true
        fi
    fi

    if [ "$HAS_SSL" = true ]; then
        echo "  SSL certs found — generating HTTPS configs from templates"
        export FRONTEND_DOMAIN API_DOMAIN
        envsubst '${FRONTEND_DOMAIN}' < "${NGINX_DIR}/conf.d/frontend.conf.template" \
            > "${NGINX_DIR}/conf.d/frontend.conf"
        envsubst '${API_DOMAIN}' < "${NGINX_DIR}/conf.d/backend.conf.template" \
            > "${NGINX_DIR}/conf.d/backend.conf"
    else
        echo "  WARN: SSL certs NOT found — generating HTTP-only fallback configs"
        echo "  Run 'bash infra/scripts/setup-ssl.sh ${FRONTEND_DOMAIN} ${API_DOMAIN} <email>' to enable HTTPS"

        cat > "${NGINX_DIR}/conf.d/frontend.conf" <<NEOF
server {
    listen 80;
    server_name ${FRONTEND_DOMAIN};

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        proxy_pass http://web_upstream;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
NEOF

        cat > "${NGINX_DIR}/conf.d/backend.conf" <<NEOF
server {
    listen 80;
    server_name ${API_DOMAIN};

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

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
        proxy_read_timeout 30s;
        proxy_connect_timeout 5s;
    }
}
NEOF
    fi
}

# Determine current and target colors
CURRENT_COLOR=$(cat "$STATE_FILE" 2>/dev/null || echo "blue")
if [ "$CURRENT_COLOR" = "blue" ]; then
    TARGET_COLOR="green"
else
    TARGET_COLOR="blue"
fi

echo "=== Blue-Green Deploy ==="
echo "Current:  $CURRENT_COLOR"
echo "Target:   $TARGET_COLOR"
echo "Registry: $REGISTRY"
echo "Image:    ${REGISTRY}/${IMAGE_PREFIX}/api:${IMAGE_TAG}"
echo "========================="

# Step 1: Pull new images
echo "[1/7] Pulling images (tag: $IMAGE_TAG)..."
export IMAGE_TAG
$COMPOSE_CMD --profile "$TARGET_COLOR" pull "api-${TARGET_COLOR}" "web-${TARGET_COLOR}"

# Step 2: Ensure infrastructure is running
echo "[2/7] Ensuring infrastructure is running..."
echo "  Generating nginx configs..."
ensure_nginx_config
$COMPOSE_CMD up -d postgres_db redis_cache nginx certbot

# Step 3: Start target color containers
echo "[3/7] Starting $TARGET_COLOR containers..."
$COMPOSE_CMD --profile "$TARGET_COLOR" up -d "api-${TARGET_COLOR}" "web-${TARGET_COLOR}"

# Step 4: Wait for health checks
echo "[4/7] Waiting for $TARGET_COLOR to become healthy..."
RETRIES=0
while [ $RETRIES -lt $MAX_RETRIES ]; do
    API_HEALTH=$(docker inspect --format='{{.State.Health.Status}}' "api-${TARGET_COLOR}" 2>/dev/null || echo "starting")
    WEB_HEALTH=$(docker inspect --format='{{.State.Health.Status}}' "web-${TARGET_COLOR}" 2>/dev/null || echo "starting")

    if [ "$API_HEALTH" = "healthy" ] && [ "$WEB_HEALTH" = "healthy" ]; then
        echo "  Both containers healthy!"
        break
    fi

    RETRIES=$((RETRIES + 1))
    echo "  Attempt $RETRIES/$MAX_RETRIES - API: $API_HEALTH, Web: $WEB_HEALTH"
    sleep $RETRY_INTERVAL
done

if [ $RETRIES -eq $MAX_RETRIES ]; then
    echo "ERROR: $TARGET_COLOR containers failed health check!"
    echo ""
    echo "=== API Container Logs (last 50 lines) ==="
    docker logs --tail 50 "api-${TARGET_COLOR}" 2>&1 || true
    echo ""
    echo "=== Web Container Logs (last 20 lines) ==="
    docker logs --tail 20 "web-${TARGET_COLOR}" 2>&1 || true
    echo ""
    echo "Stopping failed containers..."
    docker stop "api-${TARGET_COLOR}" "web-${TARGET_COLOR}" 2>/dev/null || true
    docker rm "api-${TARGET_COLOR}" "web-${TARGET_COLOR}" 2>/dev/null || true
    exit 1
fi

# Step 5: Switch nginx upstream
echo "[5/7] Switching nginx to $TARGET_COLOR..."
cp "${NGINX_DIR}/upstream-${TARGET_COLOR}.conf" "${NGINX_DIR}/active-upstream.conf"

# Wait for nginx to be running (not restarting) before reload
NGINX_RETRIES=0
while [ $NGINX_RETRIES -lt 10 ]; do
    NGINX_STATE=$(docker inspect --format='{{.State.Status}}' nginx_prod 2>/dev/null || echo "unknown")
    if [ "$NGINX_STATE" = "running" ]; then
        break
    fi
    NGINX_RETRIES=$((NGINX_RETRIES + 1))
    echo "  Waiting for nginx to be running (state: $NGINX_STATE)... attempt $NGINX_RETRIES/10"
    sleep 3
done

if [ "$NGINX_STATE" != "running" ]; then
    echo "ERROR: nginx is not running (state: $NGINX_STATE). Attempting restart..."
    docker restart nginx_prod 2>/dev/null || true
    sleep 5
fi

docker exec nginx_prod nginx -s reload

# Step 6: Verify traffic is flowing
echo "[6/7] Verifying traffic routing..."
sleep 3
API_DOMAIN=$(grep "^API_DOMAIN=" .env.production | cut -d= -f2)

# Try HTTPS first, fallback to HTTP if SSL certs are not set up
HTTP_STATUS=$(curl -sk -o /dev/null -w "%{http_code}" -H "Host: ${API_DOMAIN}" https://localhost/health 2>/dev/null || echo "000")
if [ "$HTTP_STATUS" = "000" ]; then
    # HTTPS failed (likely no SSL) — try HTTP
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -H "Host: ${API_DOMAIN}" http://localhost/health 2>/dev/null || echo "000")
fi

if [ "$HTTP_STATUS" != "200" ]; then
    echo "ERROR: Health check failed after switch (HTTP $HTTP_STATUS)!"
    echo "Rolling back nginx..."
    cp "${NGINX_DIR}/upstream-${CURRENT_COLOR}.conf" "${NGINX_DIR}/active-upstream.conf"
    docker exec nginx_prod nginx -s reload 2>/dev/null || true
    docker stop "api-${TARGET_COLOR}" "web-${TARGET_COLOR}" 2>/dev/null || true
    docker rm "api-${TARGET_COLOR}" "web-${TARGET_COLOR}" 2>/dev/null || true
    exit 1
fi

# Step 7: Stop old color containers only (keep infra running)
echo "[7/7] Draining $CURRENT_COLOR (60s)..."
sleep 60
docker stop "api-${CURRENT_COLOR}" "web-${CURRENT_COLOR}" 2>/dev/null || true
docker rm "api-${CURRENT_COLOR}" "web-${CURRENT_COLOR}" 2>/dev/null || true

# Step 8: Cleanup old Docker images to prevent disk exhaustion
echo "[8/8] Cleaning up unused Docker images..."
docker image prune -af --filter "until=168h" 2>/dev/null || true
docker builder prune -f --keep-storage=2GB 2>/dev/null || true

# Save active color
echo "$TARGET_COLOR" > "$STATE_FILE"

echo ""
echo "=== Deploy Complete ==="
echo "Active: $TARGET_COLOR"
echo "Image:  $IMAGE_TAG"
echo "======================="
