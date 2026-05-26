<#
.SYNOPSIS
    Run GitHub Actions workflows locally via nektos/act
.DESCRIPTION
    Wrapper script to execute CI/CD pipelines on local machine.
    Images are pushed to self-hosted registry on VPS, then deployed via SSH.
.PARAMETER Mode
    ci        - Run CI workflow (test only)
    cd        - Run full CD workflow (test -> build -> push -> deploy VPS)
    cd-test   - Run only test job from CD
    cd-build  - Run only build-and-push job from CD
    cd-deploy - Run only deploy job from CD
.EXAMPLE
    .\scripts\act-run.ps1 ci
    .\scripts\act-run.ps1 cd
    .\scripts\act-run.ps1 cd-build
#>

param(
    [Parameter(Position = 0)]
    [ValidateSet("ci", "cd", "cd-test", "cd-build", "cd-deploy")]
    [string]$Mode = "ci"
)

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)

# ─── Banner ──────────────────────────────────────────────────
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Mini Booking System - Local CI/CD (act)" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Mode: $Mode" -ForegroundColor White
Write-Host "  Root: $ProjectRoot" -ForegroundColor DarkGray
Write-Host ""

# ─── Prerequisites ───────────────────────────────────────────
function Test-Prerequisite {
    param([string]$Command, [string]$InstallHint)
    if (-not (Get-Command $Command -ErrorAction SilentlyContinue)) {
        Write-Host "ERROR: '$Command' not found." -ForegroundColor Red
        Write-Host "Install: $InstallHint" -ForegroundColor Yellow
        exit 1
    }
}

Test-Prerequisite "act" "winget install nektos.act"
Test-Prerequisite "docker" "https://docs.docker.com/desktop/install/windows-install/"

# Docker daemon check
try { docker info 2>$null | Out-Null } catch {}
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Docker daemon is not running. Start Docker Desktop first." -ForegroundColor Red
    exit 1
}

# ─── Secrets & Vars files ────────────────────────────────────
$SecretsFile = Join-Path $ProjectRoot ".secrets"
$VarsFile = Join-Path $ProjectRoot ".vars"

if (-not (Test-Path $SecretsFile)) {
    Write-Host "No .secrets file found." -ForegroundColor Yellow
    $ExampleFile = Join-Path $ProjectRoot ".secrets.example"
    if (Test-Path $ExampleFile) {
        Copy-Item $ExampleFile $SecretsFile
        Write-Host "Created .secrets from .secrets.example" -ForegroundColor Yellow
        Write-Host ">>> Edit .secrets with your real values, then re-run. <<<" -ForegroundColor Red
    }
    else {
        Write-Host "No .secrets.example found either. Create .secrets manually." -ForegroundColor Red
    }
    exit 1
}

if (-not (Test-Path $VarsFile)) {
    $VarsExample = Join-Path $ProjectRoot ".vars.example"
    if (Test-Path $VarsExample) {
        Copy-Item $VarsExample $VarsFile
        Write-Host "Created .vars from .vars.example" -ForegroundColor DarkGray
    }
}

# ─── Common act arguments ────────────────────────────────────
$ActArgs = @(
    "--secret-file", $SecretsFile,
    "--container-daemon-socket", "/var/run/docker.sock",
    "-P", "ubuntu-latest=catthehacker/ubuntu:act-latest"
)

if (Test-Path $VarsFile) {
    $ActArgs += @("--var-file", $VarsFile)
}

Set-Location $ProjectRoot

# ─── Execute ─────────────────────────────────────────────────
$startTime = Get-Date

switch ($Mode) {
    "ci" {
        Write-Host "[RUN] CI workflow (backend test + frontend check + docker build)" -ForegroundColor Green
        & act pull_request @ActArgs -W .github/workflows/ci.yml
    }
    "cd" {
        Write-Host "[RUN] Full CD workflow (test -> build -> push -> deploy VPS)" -ForegroundColor Green
        & act push @ActArgs -W .github/workflows/cd.yml
    }
    "cd-test" {
        Write-Host "[RUN] CD test job only" -ForegroundColor Green
        & act push @ActArgs -W .github/workflows/cd.yml -j test
    }
    "cd-build" {
        Write-Host "[RUN] CD build-and-push job only" -ForegroundColor Green
        & act push @ActArgs -W .github/workflows/cd.yml -j build-and-push
    }
    "cd-deploy" {
        Write-Host "[RUN] CD deploy job only" -ForegroundColor Green
        & act push @ActArgs -W .github/workflows/cd.yml -j deploy
    }
}

$elapsed = (Get-Date) - $startTime
$exitCode = $LASTEXITCODE

Write-Host ""
if ($exitCode -eq 0) {
    Write-Host "=== SUCCESS === (${elapsed.Minutes}m ${elapsed.Seconds}s)" -ForegroundColor Green
}
else {
    Write-Host "=== FAILED === (exit code: $exitCode, ${elapsed.Minutes}m ${elapsed.Seconds}s)" -ForegroundColor Red
    exit $exitCode
}
