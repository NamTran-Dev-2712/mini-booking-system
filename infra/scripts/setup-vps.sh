#!/bin/bash
set -euo pipefail

# VPS Initial Setup Script
# Usage: ./setup-vps.sh
# Run as root on a fresh Ubuntu 22.04/24.04 VPS

echo "=== VPS Setup for Mini Booking System ==="
echo "OS: $(cat /etc/os-release | grep PRETTY_NAME | cut -d= -f2)"
echo "=========================================="

# Step 1: System update
echo "[1/7] Updating system..."
apt-get update && apt-get upgrade -y

# Step 2: Install Docker
echo "[2/7] Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com | sh
    systemctl enable docker
    systemctl start docker
    echo "  Docker installed: $(docker --version)"
else
    echo "  Docker already installed: $(docker --version)"
fi

# Step 3: Install Docker Compose plugin
echo "[3/7] Verifying Docker Compose..."
if docker compose version &> /dev/null; then
    echo "  Docker Compose: $(docker compose version)"
else
    echo "  ERROR: Docker Compose plugin not found. Install manually."
    exit 1
fi

# Step 4: Create deploy user
echo "[4/7] Creating deploy user..."
if ! id "deploy" &>/dev/null; then
    useradd -m -s /bin/bash -G docker deploy
    mkdir -p /home/deploy/.ssh
    chmod 700 /home/deploy/.ssh
    echo "  User 'deploy' created. Add SSH public key to /home/deploy/.ssh/authorized_keys"
else
    echo "  User 'deploy' already exists"
fi

# Step 5: Create project directory
echo "[5/7] Setting up project directory..."
mkdir -p /opt/mini-booking-system/backups
chown -R deploy:deploy /opt/mini-booking-system

# Step 6: Configure firewall
echo "[6/7] Configuring firewall (ufw)..."
apt-get install -y ufw
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw --force enable
echo "  Firewall rules:"
ufw status

# Step 7: Configure log rotation
echo "[7/7] Setting up log rotation..."
cat > /etc/logrotate.d/mini-booking <<EOF
/opt/mini-booking-system/logs/*.json {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 0640 deploy deploy
}
EOF

echo ""
echo "=== VPS Setup Complete ==="
echo ""
echo "Next steps:"
echo "  1. Add SSH public key: /home/deploy/.ssh/authorized_keys"
echo "  2. Clone repo: su - deploy && cd /opt/mini-booking-system && git clone ..."
echo "  3. Copy .env: cp infra/.env.production.example .env.production"
echo "  4. Edit .env.production with real values"
echo "  5. Run SSL setup: bash infra/scripts/setup-ssl.sh yourdomain.com email@example.com"
echo "  6. First deploy: bash infra/scripts/deploy.sh latest"
echo "==========================="
