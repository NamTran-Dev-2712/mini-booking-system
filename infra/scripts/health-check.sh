#!/bin/bash
set -euo pipefail

# Health check script
# Usage: ./health-check.sh [base_url]
# Returns exit code 0 if healthy, 1 if not

BASE_URL="${1:-http://localhost}"
MAX_RETRIES=5
RETRY_INTERVAL=3

echo "=== Health Check ==="
echo "URL: $BASE_URL"
echo "===================="

check_endpoint() {
    local url="$1"
    local name="$2"
    local retries=0

    while [ $retries -lt $MAX_RETRIES ]; do
        HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null || echo "000")
        if [ "$HTTP_STATUS" = "200" ]; then
            echo "  [OK] $name ($url) - HTTP $HTTP_STATUS"
            return 0
        fi
        retries=$((retries + 1))
        echo "  [RETRY $retries/$MAX_RETRIES] $name - HTTP $HTTP_STATUS"
        sleep $RETRY_INTERVAL
    done

    echo "  [FAIL] $name ($url) - HTTP $HTTP_STATUS"
    return 1
}

FAILED=0

# Check API health
check_endpoint "${BASE_URL}/api/health" "API Health" || FAILED=1

# Check frontend
check_endpoint "${BASE_URL}/" "Frontend" || FAILED=1

if [ $FAILED -eq 0 ]; then
    echo ""
    echo "=== All checks passed ==="
    exit 0
else
    echo ""
    echo "=== Health check FAILED ==="
    exit 1
fi
