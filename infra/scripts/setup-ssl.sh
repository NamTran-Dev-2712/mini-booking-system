#!/bin/bash
set -euo pipefail

# SSL Certificate Setup for Multi-Domain
# Usage: ./setup-ssl.sh <frontend_domain> <api_domain> <email>
# Example: ./setup-ssl.sh trannam.xyz api.trannam.xyz admin@trannam.xyz

FRONTEND_DOMAIN="${1:?Usage: ./setup-ssl.sh <frontend_domain> <api_domain> <email>}"
API_DOMAIN="${2:?Usage: ./setup-ssl.sh <frontend_domain> <api_domain> <email>}"
EMAIL="${3:?Usage: ./setup-ssl.sh <frontend_domain> <api_domain> <email>}"
DEPLOY_DIR="/opt/mini-booking-system"
COMPOSE_FILE="${DEPLOY_DIR}/infra/docker-compose.prod.yml"

cd "$DEPLOY_DIR"

echo "=== SSL Setup ==="
echo "Frontend: $FRONTEND_DOMAIN"
echo "API:      $API_DOMAIN"
echo "Email:    $EMAIL"
echo "=================="

# Step 1: Create temporary nginx config for ACME challenge (both domains)
echo "[1/5] Creating temporary HTTP-only nginx config..."
cat > "${DEPLOY_DIR}/infra/docker/nginx/conf.d/frontend.conf" <<EOF
server {
    listen 80;
    server_name ${FRONTEND_DOMAIN};

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 200 'SSL setup in progress...';
        add_header Content-Type text/plain;
    }
}
EOF

cat > "${DEPLOY_DIR}/infra/docker/nginx/conf.d/backend.conf" <<EOF
server {
    listen 80;
    server_name ${API_DOMAIN};

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 200 'SSL setup in progress...';
        add_header Content-Type text/plain;
    }
}
EOF

# Step 2: Start nginx
echo "[2/5] Starting nginx..."
docker compose -f "$COMPOSE_FILE" up -d nginx
sleep 5

# Step 3: Request certificates for both domains
echo "[3/5] Requesting SSL certificate for $FRONTEND_DOMAIN..."
docker compose -f "$COMPOSE_FILE" run --rm certbot \
    certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    -d "$FRONTEND_DOMAIN"

echo "[4/5] Requesting SSL certificate for $API_DOMAIN..."
docker compose -f "$COMPOSE_FILE" run --rm certbot \
    certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    -d "$API_DOMAIN"

# Step 5: Apply production nginx configs from templates
echo "[5/5] Applying production nginx configs..."
export FRONTEND_DOMAIN
export API_DOMAIN
envsubst '${FRONTEND_DOMAIN}' < "${DEPLOY_DIR}/infra/docker/nginx/conf.d/frontend.conf.template" \
    > "${DEPLOY_DIR}/infra/docker/nginx/conf.d/frontend.conf"
envsubst '${API_DOMAIN}' < "${DEPLOY_DIR}/infra/docker/nginx/conf.d/backend.conf.template" \
    > "${DEPLOY_DIR}/infra/docker/nginx/conf.d/backend.conf"

# Reload nginx with SSL
docker exec nginx_prod nginx -s reload

echo ""
echo "=== SSL Setup Complete ==="
echo "Certificates installed:"
echo "  - $FRONTEND_DOMAIN"
echo "  - $API_DOMAIN"
echo "Auto-renewal handled by certbot container"
echo "==========================="
