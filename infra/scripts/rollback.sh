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

# Ensure infrastructure is running
echo "[1/4] Ensuring infrastructure is running..."
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
