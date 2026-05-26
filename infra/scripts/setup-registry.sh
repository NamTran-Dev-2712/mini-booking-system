#!/bin/bash
set -euo pipefail

# ============================================================
# Setup Self-hosted Docker Registry trên VPS
# ============================================================
# Script này chạy 1 lần trên VPS để cài đặt Docker Registry
# thay thế GHCR khi GitHub account bị suspended.
#
# Usage: ./setup-registry.sh <registry_domain> <username> <password>
# Example: ./setup-registry.sh registry.trannam.xyz deploy MyStr0ngP@ss
#
# Prerequisites:
#   - Docker + Docker Compose đã cài
#   - Certbot/SSL đã setup (infra_ssl_certs volume tồn tại)
#   - DNS A record trỏ registry_domain về VPS IP
#   - Port 5000 accessible từ internet
# ============================================================

REGISTRY_DOMAIN="${1:?Usage: $0 <registry_domain> <username> <password>}"
USERNAME="${2:?Usage: $0 <registry_domain> <username> <password>}"
PASSWORD="${3:?Usage: $0 <registry_domain> <username> <password>}"

DEPLOY_DIR="/opt/mini-booking-system"
REGISTRY_AUTH_DIR="${DEPLOY_DIR}/infra/registry-auth"

echo ""
echo "=== Self-hosted Registry Setup ==="
echo "Domain:   ${REGISTRY_DOMAIN}"
echo "Username: ${USERNAME}"
echo "==================================="
echo ""

# ─── Step 1: Tạo thư mục auth và file htpasswd ──────────────
echo "[1/5] Creating registry auth..."
mkdir -p "${REGISTRY_AUTH_DIR}"

# Tạo htpasswd file (bcrypt encrypted)
docker run --rm --entrypoint htpasswd httpd:2 -Bbn "${USERNAME}" "${PASSWORD}" \
    > "${REGISTRY_AUTH_DIR}/htpasswd"
chmod 600 "${REGISTRY_AUTH_DIR}/htpasswd"
echo "  htpasswd created at ${REGISTRY_AUTH_DIR}/htpasswd"

# ─── Step 2: Tạo credentials file cho deploy.sh ─────────────
echo "[2/5] Creating deploy credentials..."
cat > "${DEPLOY_DIR}/.registry-credentials" <<EOF
REG_USER=${USERNAME}
REG_PASSWORD=${PASSWORD}
EOF
chmod 600 "${DEPLOY_DIR}/.registry-credentials"
echo "  Credentials saved to ${DEPLOY_DIR}/.registry-credentials"

# ─── Step 3: Request SSL cert cho registry domain ────────────
echo "[3/5] Requesting SSL certificate for ${REGISTRY_DOMAIN}..."

# Kiểm tra cert đã tồn tại chưa
CERT_EXISTS=$(docker run --rm \
    -v infra_ssl_certs:/etc/letsencrypt:ro \
    alpine:latest \
    sh -c "[ -f /etc/letsencrypt/live/${REGISTRY_DOMAIN}/fullchain.pem ] && echo 'yes' || echo 'no'" \
    2>/dev/null || echo "no")

if [ "$CERT_EXISTS" = "yes" ]; then
    echo "  SSL cert already exists for ${REGISTRY_DOMAIN}, skipping..."
else
    SSL_EMAIL=$(grep "^SSL_EMAIL=" "${DEPLOY_DIR}/.env.production" | cut -d= -f2 || echo "admin@${REGISTRY_DOMAIN}")

    # Dùng nginx container đang chạy để serve ACME challenge
    docker run --rm \
        -v infra_certbot_webroot:/var/www/certbot \
        -v infra_ssl_certs:/etc/letsencrypt \
        certbot/certbot:latest \
        certonly --webroot \
        --webroot-path=/var/www/certbot \
        --email "${SSL_EMAIL}" \
        --agree-tos \
        --no-eff-email \
        -d "${REGISTRY_DOMAIN}"

    echo "  SSL cert issued for ${REGISTRY_DOMAIN}"
fi

# ─── Step 4: Start registry ─────────────────────────────────
echo "[4/5] Starting registry..."
cd "${DEPLOY_DIR}"
REGISTRY_DOMAIN="${REGISTRY_DOMAIN}" \
    docker compose -f infra/docker-compose.registry.yml up -d

# Đợi registry healthy
echo "  Waiting for registry to become healthy..."
RETRIES=0
MAX_RETRIES=10
while [ $RETRIES -lt $MAX_RETRIES ]; do
    HEALTH=$(docker inspect --format='{{.State.Health.Status}}' docker_registry 2>/dev/null || echo "starting")
    if [ "$HEALTH" = "healthy" ]; then
        echo "  Registry is healthy!"
        break
    fi
    RETRIES=$((RETRIES + 1))
    echo "  Attempt ${RETRIES}/${MAX_RETRIES} - Status: ${HEALTH}"
    sleep 3
done

if [ $RETRIES -eq $MAX_RETRIES ]; then
    echo "ERROR: Registry failed to become healthy!"
    echo "Check logs: docker logs docker_registry"
    exit 1
fi

# ─── Step 5: Mở firewall ────────────────────────────────────
echo "[5/5] Configuring firewall..."
if command -v ufw &>/dev/null; then
    ufw allow 5000/tcp comment "Docker Registry" 2>/dev/null || true
    echo "  Port 5000 opened in ufw"
else
    echo "  ufw not found, skipping firewall config"
    echo "  Make sure port 5000 is accessible from your local machine"
fi

# ─── Verify ──────────────────────────────────────────────────
echo ""
echo "=== Registry Setup Complete ==="
echo ""
echo "Registry URL: https://${REGISTRY_DOMAIN}:5000"
echo ""
echo "Test from local machine:"
echo "  docker login ${REGISTRY_DOMAIN}:5000 -u ${USERNAME}"
echo ""
echo "Push test:"
echo "  docker tag alpine:latest ${REGISTRY_DOMAIN}:5000/test:latest"
echo "  docker push ${REGISTRY_DOMAIN}:5000/test:latest"
echo ""
echo "Update .env.production:"
echo "  REGISTRY=${REGISTRY_DOMAIN}:5000"
echo "  IMAGE_PREFIX=mini-booking"
echo ""
echo "================================="
