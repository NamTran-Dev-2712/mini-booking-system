#!/bin/bash
set -euo pipefail

# Blue-Green Deployment Script
# Usage: ./deploy.sh <image_tag>

IMAGE_TAG="${1:-latest}"
DEPLOY_DIR="/opt/mini-booking-system"
COMPOSE_FILE="${DEPLOY_DIR}/infra/docker-compose.prod.yml"
ENV_FILE="${DEPLOY_DIR}/.env.production"
STATE_FILE="${DEPLOY_DIR}/.active-color"
NGINX_DIR="${DEPLOY_DIR}/infra/docker/nginx"
MAX_RETRIES=10
RETRY_INTERVAL=5

cd "$DEPLOY_DIR"

# Load environment variables for docker compose
set -a
while IFS='=' read -r key value; do
    [[ -z "$key" || "$key" =~ ^# ]] && continue
    export "$key=$value"
done < .env.production
set +a
export IMAGE_TAG

COMPOSE_CMD="docker compose -f $COMPOSE_FILE --env-file $ENV_FILE"

# Determine current and target colors
CURRENT_COLOR=$(cat "$STATE_FILE" 2>/dev/null || echo "blue")
if [ "$CURRENT_COLOR" = "blue" ]; then
    TARGET_COLOR="green"
else
    TARGET_COLOR="blue"
fi

echo "=== Blue-Green Deploy ==="
echo "Current: $CURRENT_COLOR"
echo "Target:  $TARGET_COLOR"
echo "Image:   $IMAGE_TAG"
echo "========================="

# Step 1: Pull new images
echo "[1/6] Pulling images (tag: $IMAGE_TAG)..."
export IMAGE_TAG
$COMPOSE_CMD --profile "$TARGET_COLOR" pull

# Step 2: Start target color containers
echo "[2/6] Starting $TARGET_COLOR containers..."
$COMPOSE_CMD --profile "$TARGET_COLOR" up -d

# Step 3: Wait for health checks
echo "[3/6] Waiting for $TARGET_COLOR to become healthy..."
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
    echo "Stopping failed containers..."
    $COMPOSE_CMD --profile "$TARGET_COLOR" down
    exit 1
fi

# Step 4: Switch nginx upstream
echo "[4/6] Switching nginx to $TARGET_COLOR..."
cp "${NGINX_DIR}/upstream-${TARGET_COLOR}.conf" "${NGINX_DIR}/active-upstream.conf"
docker exec nginx_prod nginx -s reload

# Step 5: Verify traffic is flowing
echo "[5/6] Verifying traffic routing..."
sleep 3
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/api/health 2>/dev/null || echo "000")
if [ "$HTTP_STATUS" != "200" ]; then
    echo "ERROR: Health check failed after switch (HTTP $HTTP_STATUS)!"
    echo "Rolling back nginx..."
    cp "${NGINX_DIR}/upstream-${CURRENT_COLOR}.conf" "${NGINX_DIR}/active-upstream.conf"
    docker exec nginx_prod nginx -s reload
    $COMPOSE_CMD --profile "$TARGET_COLOR" down
    exit 1
fi

# Step 6: Stop old color (after graceful drain)
echo "[6/7] Draining $CURRENT_COLOR (60s)..."
sleep 60
$COMPOSE_CMD --profile "$CURRENT_COLOR" down

# Step 7: Cleanup old Docker images to prevent disk exhaustion
echo "[7/7] Cleaning up unused Docker images..."
docker image prune -af --filter "until=168h" 2>/dev/null || true
docker builder prune -f --keep-storage=2GB 2>/dev/null || true

# Save active color
echo "$TARGET_COLOR" > "$STATE_FILE"

echo ""
echo "=== Deploy Complete ==="
echo "Active: $TARGET_COLOR"
echo "Image:  $IMAGE_TAG"
echo "======================="
