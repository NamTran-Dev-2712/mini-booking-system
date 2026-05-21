#!/bin/bash
set -euo pipefail

# Initial SSL certificate setup with Let's Encrypt
# Usage: ./setup-ssl.sh <domain> <email>
# Run this ONCE on first deploy before enabling HTTPS in nginx

DOMAIN="${1:?Usage: ./setup-ssl.sh <domain> <email>}"
EMAIL="${2:?Usage: ./setup-ssl.sh <domain> <email>}"
DEPLOY_DIR="/opt/mini-booking-system"
COMPOSE_FILE="${DEPLOY_DIR}/infra/docker-compose.prod.yml"

cd "$DEPLOY_DIR"

echo "=== SSL Setup ==="
echo "Domain: $DOMAIN"
echo "Email:  $EMAIL"
echo "=================="

# Step 1: Create a temporary nginx config for HTTP-only (ACME challenge)
echo "[1/4] Creating temporary HTTP-only nginx config..."
cat > "${DEPLOY_DIR}/infra/docker/nginx/conf.d/app.conf" <<EOF
server {
    listen 80;
    server_name ${DOMAIN};

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
echo "[2/4] Starting nginx..."
docker compose -f "$COMPOSE_FILE" up -d nginx

sleep 5

# Step 3: Request certificate
echo "[3/4] Requesting SSL certificate..."
docker compose -f "$COMPOSE_FILE" run --rm certbot \
    certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    -d "$DOMAIN"

# Step 4: Replace with production nginx config (using template)
echo "[4/4] Applying production nginx config..."
export DOMAIN
envsubst '${DOMAIN}' < "${DEPLOY_DIR}/infra/docker/nginx/conf.d/app.conf.template" \
    > "${DEPLOY_DIR}/infra/docker/nginx/conf.d/app.conf"

# Reload nginx with SSL
docker exec nginx_prod nginx -s reload

echo ""
echo "=== SSL Setup Complete ==="
echo "Certificate installed for: $DOMAIN"
echo "Auto-renewal handled by certbot container"
echo "==========================="
