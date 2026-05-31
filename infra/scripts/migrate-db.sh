#!/bin/bash
set -euo pipefail

# Safe Database Migration Script (Expand and Contract pattern)
# Usage: ./migrate-db.sh [target_color]
#
# Applies EF Core migrations using the NEWLY PULLED image (target color) BEFORE
# traffic is switched, with a pre-migration backup. Invoked by deploy.sh.
#
# IMPORTANT: Migrations MUST be backward-compatible with the currently running
# (old) code, because old and new containers share the same database during the
# blue-green cutover window.
#
# Rules for safe migrations in Blue-Green:
#   1. NEVER drop columns/tables in the same deploy that stops using them
#   2. NEVER rename columns directly — add new, migrate data, then drop old
#   3. ALWAYS add new columns as NULLABLE or with a DEFAULT value
#   4. Follow the "Expand and Contract" pattern (see docs/DEPLOYMENT.md)

DEPLOY_DIR="/opt/mini-booking-system"
COMPOSE_FILE="${DEPLOY_DIR}/infra/docker-compose.prod.yml"
ENV_FILE="${DEPLOY_DIR}/.env.production"
STATE_FILE="${DEPLOY_DIR}/.active-color"

cd "$DEPLOY_DIR"

# Target color = the color whose (new) image we migrate with. Defaults to the
# inactive color derived from the active-color state file.
TARGET_COLOR="${1:-}"
if [ -z "$TARGET_COLOR" ]; then
    CURRENT_COLOR=$(cat "$STATE_FILE" 2>/dev/null || echo "blue")
    if [ "$CURRENT_COLOR" = "blue" ]; then
        TARGET_COLOR="green"
    else
        TARGET_COLOR="blue"
    fi
fi

# Read ONLY the values we need from the env file. We deliberately do NOT `source`
# it: values may legitimately contain spaces (e.g. RESEND_FROM_NAME=Mini Booking
# System), which break shell sourcing ("command not found"). docker compose reads
# the file itself via --env-file for variable interpolation, so no export needed.
read_env() { grep -E "^$1=" "$ENV_FILE" | head -n1 | cut -d= -f2-; }

POSTGRES_USER="$(read_env POSTGRES_USER)"
POSTGRES_DB="$(read_env POSTGRES_DB)"
REGISTRY="$(read_env REGISTRY)"
IMAGE_PREFIX="$(read_env IMAGE_PREFIX)"
IMAGE_TAG="$(read_env IMAGE_TAG)"

echo "=== Database Migration ==="
echo "Image:  ${REGISTRY:-ghcr.io}/${IMAGE_PREFIX}/api:${IMAGE_TAG:-latest}"
echo "Via:    api-${TARGET_COLOR} (one-shot, --migrate-only)"
echo "==========================="

# Step 1: Backup before migration. A failure here aborts the deploy (set -e)
# BEFORE any schema change, leaving the live (old) site untouched.
echo "[1/3] Creating pre-migration backup..."
bash infra/scripts/backup-db.sh

# Step 2: Apply EF Core migrations using the NEW image, then exit.
# The image ENTRYPOINT is ["dotnet","MiniBookingSystem.Api.dll"], so we only pass
# the extra "--migrate-only" argument. --no-deps: infra (postgres/redis) is
# already running from deploy.sh; don't recreate it. A non-zero exit aborts the
# deploy before traffic is switched.
echo "[2/3] Applying migrations..."
docker compose -f "$COMPOSE_FILE" --env-file "$ENV_FILE" --profile "$TARGET_COLOR" \
    run --rm --no-deps "api-${TARGET_COLOR}" --migrate-only

# Step 3: Verify database connectivity
echo "[3/3] Verifying database connectivity..."
docker exec postgres_prod pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB"

echo ""
echo "=== Migration Complete ==="
echo "Only EXPAND (additive / nullable) migrations are safe during Blue-Green."
echo "To CONTRACT (drop or rename columns), deploy a separate migration AFTER"
echo "the new code is confirmed stable."
echo "==========================="
