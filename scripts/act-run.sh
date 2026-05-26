#!/bin/bash
set -euo pipefail

# ============================================================
# Mini Booking System - Local CI/CD via nektos/act
# ============================================================
# Usage:
#   ./scripts/act-run.sh ci          # Run CI workflow (test only)
#   ./scripts/act-run.sh cd          # Run full CD (test -> build -> push -> deploy VPS)
#   ./scripts/act-run.sh cd-test     # Run only test job
#   ./scripts/act-run.sh cd-build    # Run only build-and-push job
#   ./scripts/act-run.sh cd-deploy   # Run only deploy job
# ============================================================

MODE="${1:-ci}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# ─── Banner ──────────────────────────────────────────────────
echo ""
echo "============================================"
echo "  Mini Booking System - Local CI/CD (act)"
echo "============================================"
echo "  Mode: ${MODE}"
echo "  Root: ${PROJECT_ROOT}"
echo ""

# ─── Prerequisites ───────────────────────────────────────────
check_command() {
    if ! command -v "$1" &>/dev/null; then
        echo "ERROR: '$1' not found. Install: $2"
        exit 1
    fi
}

check_command "act" "https://github.com/nektos/act#installation"
check_command "docker" "https://docs.docker.com/engine/install/"

if ! docker info &>/dev/null; then
    echo "ERROR: Docker daemon is not running."
    exit 1
fi

# ─── Secrets & Vars files ────────────────────────────────────
SECRETS_FILE="${PROJECT_ROOT}/.secrets"
VARS_FILE="${PROJECT_ROOT}/.vars"

if [ ! -f "$SECRETS_FILE" ]; then
    echo "No .secrets file found."
    if [ -f "${PROJECT_ROOT}/.secrets.example" ]; then
        cp "${PROJECT_ROOT}/.secrets.example" "$SECRETS_FILE"
        echo "Created .secrets from .secrets.example"
        echo ">>> Edit .secrets with your real values, then re-run. <<<"
    else
        echo "No .secrets.example found. Create .secrets manually."
    fi
    exit 1
fi

if [ ! -f "$VARS_FILE" ] && [ -f "${PROJECT_ROOT}/.vars.example" ]; then
    cp "${PROJECT_ROOT}/.vars.example" "$VARS_FILE"
    echo "Created .vars from .vars.example"
fi

# ─── Common act arguments ────────────────────────────────────
ACT_ARGS=(
    --secret-file "$SECRETS_FILE"
    --container-daemon-socket /var/run/docker.sock
    -P ubuntu-latest=catthehacker/ubuntu:act-latest
)

if [ -f "$VARS_FILE" ]; then
    ACT_ARGS+=(--var-file "$VARS_FILE")
fi

cd "$PROJECT_ROOT"

# ─── Execute ─────────────────────────────────────────────────
START_TIME=$(date +%s)

case "$MODE" in
    ci)
        echo "[RUN] CI workflow (backend test + frontend check + docker build)"
        act pull_request "${ACT_ARGS[@]}" -W .github/workflows/ci.yml
        ;;
    cd)
        echo "[RUN] Full CD workflow (test -> build -> push -> deploy VPS)"
        act push "${ACT_ARGS[@]}" -W .github/workflows/cd.yml
        ;;
    cd-test)
        echo "[RUN] CD test job only"
        act push "${ACT_ARGS[@]}" -W .github/workflows/cd.yml -j test
        ;;
    cd-build)
        echo "[RUN] CD build-and-push job only"
        act push "${ACT_ARGS[@]}" -W .github/workflows/cd.yml -j build-and-push
        ;;
    cd-deploy)
        echo "[RUN] CD deploy job only"
        act push "${ACT_ARGS[@]}" -W .github/workflows/cd.yml -j deploy
        ;;
    *)
        echo "Usage: $0 {ci|cd|cd-test|cd-build|cd-deploy}"
        exit 1
        ;;
esac

ELAPSED=$(( $(date +%s) - START_TIME ))
MINUTES=$(( ELAPSED / 60 ))
SECONDS_REMAINING=$(( ELAPSED % 60 ))

echo ""
echo "=== SUCCESS === (${MINUTES}m ${SECONDS_REMAINING}s)"
