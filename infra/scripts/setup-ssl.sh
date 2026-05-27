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
ENV_FILE="${DEPLOY_DIR}/.env.production"
COMPOSE_CMD="docker compose -f $COMPOSE_FILE --env-file $ENV_FILE"

cd "$DEPLOY_DIR"

echo "=== SSL Setup ==="
echo "Frontend: $FRONTEND_DOMAIN"
echo "API:      $API_DOMAIN"
echo "Email:    $EMAIL"
echo "=================="

# Load environment variables for docker compose
set -a
source .env.production
set +a

# Step 1: Create temporary nginx config for ACME challenge (both domains)
echo "[1/5] Creating temporary HTTP-only nginx config..."

# Use placeholder upstream so nginx can start without app containers
cat > "${DEPLOY_DIR}/infra/docker/nginx/active-upstream.conf" <<'UPSTREAM'
upstream api_upstream {
    server 127.0.0.1:8080;
}

upstream web_upstream {
    server 127.0.0.1:3000;
}
UPSTREAM

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

# Step 2: Start nginx (force-recreate to pick up new configs)
echo "[2/5] Starting nginx..."
# Force-recreate in case nginx is crash-looping with old SSL configs
$COMPOSE_CMD up -d --force-recreate nginx
sleep 3

# Verify nginx is actually responding on port 80
echo "  Verifying nginx is serving HTTP..."
RETRIES=0
while [ $RETRIES -lt 10 ]; do
    if curl -s -o /dev/null -w "%{http_code}" http://localhost/ 2>/dev/null | grep -qE "200|301|404"; then
        echo "  nginx is responding on port 80!"
        break
    fi
    RETRIES=$((RETRIES + 1))
    echo "  Waiting for nginx... attempt $RETRIES/10"
    sleep 3
done

if [ $RETRIES -eq 10 ]; then
    echo "ERROR: nginx is not responding on port 80. Check:"
    echo "  - docker logs nginx_prod"
    echo "  - sudo ufw status (port 80 must be open)"
    echo "  - sudo ss -tlnp | grep :80 (check if port is in use)"
    docker logs --tail 20 nginx_prod 2>&1 || true
    exit 1
fi

# Step 3: Request certificates for both domains
echo "[3/5] Requesting SSL certificate for $FRONTEND_DOMAIN..."
docker run --rm \
    -v infra_certbot_webroot:/var/www/certbot \
    -v infra_ssl_certs:/etc/letsencrypt \
    certbot/certbot:latest \
    certonly --webroot \
    --webroot-path=/var/www/certbot \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    -d "$FRONTEND_DOMAIN"

echo "[4/5] Requesting SSL certificate for $API_DOMAIN..."
docker run --rm \
    -v infra_certbot_webroot:/var/www/certbot \
    -v infra_ssl_certs:/etc/letsencrypt \
    certbot/certbot:latest \
    certonly --webroot \
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
