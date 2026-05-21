#!/bin/bash
set -euo pipefail

# Safe Database Migration Script (Expand and Contract pattern)
# Usage: ./migrate-db.sh
#
# IMPORTANT: This script runs migrations BEFORE switching traffic.
# Migrations MUST be backward-compatible with the currently running code.
#
# Rules for safe migrations in Blue-Green:
#   1. NEVER drop columns/tables in the same deploy that stops using them
#   2. NEVER rename columns directly — add new, migrate data, then drop old
#   3. ALWAYS add new columns as NULLABLE or with a DEFAULT value
#   4. Follow the "Expand and Contract" pattern (see docs/DEPLOYMENT.md)

DEPLOY_DIR="/opt/mini-booking-system"
COMPOSE_FILE="${DEPLOY_DIR}/infra/docker-compose.prod.yml"
STATE_FILE="${DEPLOY_DIR}/.active-color"

cd "$DEPLOY_DIR"

# Source env for database connection
set -a
source .env.production
set +a

CURRENT_COLOR=$(cat "$STATE_FILE" 2>/dev/null || echo "blue")

echo "=== Database Migration ==="
echo "Running against: postgres_db"
echo "Current active:  $CURRENT_COLOR"
echo "==========================="

# Step 1: Backup before migration
echo "[1/3] Creating pre-migration backup..."
bash infra/scripts/backup-db.sh

# Step 2: Run EF Core migrations via the current active API container
echo "[2/3] Applying migrations..."
docker exec "api-${CURRENT_COLOR}" dotnet MiniBookingSystem.Api.dll --migrate-only 2>/dev/null || {
    echo "  Fallback: running migrations via temporary container..."
    docker compose -f "$COMPOSE_FILE" --profile "$CURRENT_COLOR" \
        run --rm --no-deps -e "ConnectionStrings__DefaultConnection=Host=postgres_db;Port=5432;Database=${POSTGRES_DB};Username=${POSTGRES_USER};Password=${POSTGRES_PASSWORD}" \
        "api-${CURRENT_COLOR}" \
        dotnet MiniBookingSystem.Api.dll --migrate-only
}

# Step 3: Verify migration
echo "[3/3] Verifying database connectivity..."
docker exec postgres_prod pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB"

echo ""
echo "=== Migration Complete ==="
echo "Remember: Only EXPAND migrations are safe during Blue-Green deploy."
echo "To CONTRACT (drop old columns), deploy a separate migration after"
echo "confirming the new code is stable."
echo "==========================="
