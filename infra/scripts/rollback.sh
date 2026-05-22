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

# Load environment variables for docker compose
set -a
source .env.production
set +a

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

# Ensure rollback containers are running
echo "[1/4] Ensuring $ROLLBACK_COLOR containers are up..."
$COMPOSE_CMD --profile "$ROLLBACK_COLOR" up -d

# Wait for health
echo "[2/4] Checking $ROLLBACK_COLOR health..."
sleep 5
API_HEALTH=$(docker inspect --format='{{.State.Health.Status}}' "api-${ROLLBACK_COLOR}" 2>/dev/null || echo "unhealthy")
if [ "$API_HEALTH" != "healthy" ]; then
    echo "ERROR: $ROLLBACK_COLOR API is not healthy ($API_HEALTH). Cannot rollback."
    exit 1
fi

# Switch nginx
echo "[3/4] Switching nginx to $ROLLBACK_COLOR..."
cp "${NGINX_DIR}/upstream-${ROLLBACK_COLOR}.conf" "${NGINX_DIR}/active-upstream.conf"
docker exec nginx_prod nginx -s reload

# Stop failed color
echo "[4/4] Stopping $CURRENT_COLOR..."
$COMPOSE_CMD --profile "$CURRENT_COLOR" down

# Update state
echo "$ROLLBACK_COLOR" > "$STATE_FILE"

echo ""
echo "=== Rollback Complete ==="
echo "Active: $ROLLBACK_COLOR"
echo "========================="
