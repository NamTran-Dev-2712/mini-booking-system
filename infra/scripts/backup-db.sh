#!/bin/bash
set -euo pipefail

# Database backup script with retention
# Usage: ./backup-db.sh
# Recommended: run via cron daily at 2:00 AM
# crontab: 0 2 * * * /opt/mini-booking-system/infra/scripts/backup-db.sh

DEPLOY_DIR="/opt/mini-booking-system"
BACKUP_DIR="/opt/mini-booking-system/backups"
ENV_FILE="${DEPLOY_DIR}/.env.production"
RETENTION_DAYS=7
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Read only the DB credentials we need. We deliberately do NOT `source` the env
# file: values may contain spaces (e.g. RESEND_FROM_NAME=Mini Booking System),
# which would break shell sourcing ("command not found").
read_env() { grep -E "^$1=" "$ENV_FILE" | head -n1 | cut -d= -f2-; }
POSTGRES_USER="$(read_env POSTGRES_USER)"
POSTGRES_DB="$(read_env POSTGRES_DB)"

mkdir -p "$BACKUP_DIR"

echo "=== Database Backup ==="
echo "Time: $(date)"
echo "======================="

# Run pg_dump inside the postgres container
echo "[1/3] Creating backup..."
docker exec postgres_prod pg_dump \
    -U "$POSTGRES_USER" \
    -d "$POSTGRES_DB" \
    --format=custom \
    --compress=9 \
    > "${BACKUP_DIR}/backup_${TIMESTAMP}.dump"

BACKUP_SIZE=$(du -h "${BACKUP_DIR}/backup_${TIMESTAMP}.dump" | cut -f1)
echo "  Created: backup_${TIMESTAMP}.dump ($BACKUP_SIZE)"

# Clean old backups
echo "[2/3] Cleaning backups older than ${RETENTION_DAYS} days..."
DELETED=$(find "$BACKUP_DIR" -name "backup_*.dump" -mtime +$RETENTION_DAYS -delete -print | wc -l)
echo "  Deleted: $DELETED old backup(s)"

# Verify backup integrity
echo "[3/3] Verifying backup..."
docker exec -i postgres_prod pg_restore \
    --list < "${BACKUP_DIR}/backup_${TIMESTAMP}.dump" > /dev/null 2>&1 && \
    echo "  Backup verified OK" || \
    echo "  WARNING: Backup verification failed!"

echo ""
echo "=== Backup Complete ==="
