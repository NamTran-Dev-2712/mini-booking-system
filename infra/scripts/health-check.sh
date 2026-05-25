#!/bin/bash
set -euo pipefail

# Health check script
# Usage: ./health-check.sh
# Returns exit code 0 if healthy, 1 if not

DEPLOY_DIR="/opt/mini-booking-system"
API_DOMAIN=$(grep "^API_DOMAIN=" "${DEPLOY_DIR}/.env.production" | cut -d= -f2)
FRONTEND_DOMAIN=$(grep "^FRONTEND_DOMAIN=" "${DEPLOY_DIR}/.env.production" | cut -d= -f2)

MAX_RETRIES=5
RETRY_INTERVAL=3

echo "=== Health Check ==="
echo "API:      $API_DOMAIN"
echo "Frontend: $FRONTEND_DOMAIN"
echo "===================="

check_endpoint() {
    local url="$1"
    local host_header="$2"
    local name="$3"
    local retries=0

    while [ $retries -lt $MAX_RETRIES ]; do
        HTTP_STATUS=$(curl -sk -o /dev/null -w "%{http_code}" -H "Host: ${host_header}" "$url" 2>/dev/null || echo "000")
        if [ "$HTTP_STATUS" = "200" ]; then
            echo "  [OK] $name - HTTP $HTTP_STATUS"
            return 0
        fi
        retries=$((retries + 1))
        echo "  [RETRY $retries/$MAX_RETRIES] $name - HTTP $HTTP_STATUS"
        sleep $RETRY_INTERVAL
    done

    echo "  [FAIL] $name - HTTP $HTTP_STATUS"
    return 1
}

FAILED=0

# Check API health via nginx (using Host header to match server_name)
check_endpoint "http://localhost/health" "$API_DOMAIN" "API Health" || FAILED=1

# Check frontend via nginx
check_endpoint "http://localhost/" "$FRONTEND_DOMAIN" "Frontend" || FAILED=1

if [ $FAILED -eq 0 ]; then
    echo ""
    echo "=== All checks passed ==="
    exit 0
else
    echo ""
    echo "=== Health check FAILED ==="
    exit 1
fi
