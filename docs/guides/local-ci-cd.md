# Local CI/CD với nektos/act

## Tổng quan

Khi GitHub account bị suspended, ta không thể dùng GitHub Actions và GHCR (GitHub Container Registry). Giải pháp này cho phép chạy **cùng CI/CD pipeline** trên máy local bằng `nektos/act`, build Docker images và push lên **self-hosted registry** trên VPS, rồi deploy production thực tế.

**Khi GitHub được khôi phục**: chỉ cần đổi 2 biến môi trường trong `.env.production` trên VPS.

---

## Kiến trúc

```
┌──────────────────────────────────────────────────────────┐
│                    LOCAL MACHINE                         │
│                                                          │
│  ┌─────────┐    ┌──────────────┐    ┌────────────────┐  │
│  │ Source   │───>│  nektos/act  │───>│ Docker Build   │  │
│  │ Code     │    │ (chạy trong  │    │ (build images  │  │
│  │          │    │  Docker)     │    │  trên host)    │  │
│  └─────────┘    └──────────────┘    └───────┬────────┘  │
│                                              │           │
└──────────────────────────────────────────────┼───────────┘
                                               │ docker push
                                               ▼
┌──────────────────────────────────────────────────────────┐
│                        VPS                               │
│                                                          │
│  ┌─────────────────┐    ┌──────────────────────────────┐│
│  │  Self-hosted     │    │  Production Stack            ││
│  │  Registry        │    │  ┌────────┐  ┌────────┐     ││
│  │  (registry:2)    │◄───│  │api-blue│  │web-blue│     ││
│  │  Port 5000       │    │  │api-green│ │web-green│    ││
│  │  TLS + Auth      │    │  └────────┘  └────────┘     ││
│  └─────────────────┘    │  ┌─────┐ ┌─────┐ ┌──────┐   ││
│                          │  │nginx│ │pg   │ │redis │   ││
│                          │  └─────┘ └─────┘ └──────┘   ││
│                          └──────────────────────────────┘│
└──────────────────────────────────────────────────────────┘
```

### So sánh flow

| Bước | GitHub Actions | Local via act |
|------|---------------|---------------|
| Test | GitHub runner | act container trên máy local |
| Build | Buildx + GHA cache | `docker build` trên máy local |
| Push | → `ghcr.io` | → `registry.yourdomain.com:5000` |
| Deploy | SSH action → VPS | SSH trực tiếp từ local → VPS |
| Pull on VPS | `docker pull ghcr.io/...` | `docker pull localhost:5000/...` |

---

## Cài đặt

### 1. Cài nektos/act trên máy local

**Windows:**
```powershell
winget install nektos.act
```

**macOS:**
```bash
brew install act
```

**Linux:**
```bash
curl -s https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
```

Kiểm tra:
```bash
act --version
```

### 2. Cài Docker Desktop

act chạy workflow bên trong Docker container, nên cần Docker.

- Windows/Mac: [Docker Desktop](https://docs.docker.com/desktop/)
- Linux: [Docker Engine](https://docs.docker.com/engine/install/)

### 3. Cấu hình secrets cho local

```bash
# Copy template
cp .secrets.example .secrets
cp .vars.example .vars

# Sửa .secrets với giá trị thật
# QUAN TRỌNG: Dùng đúng giá trị production!
```

File `.secrets` chứa tất cả secrets giống GitHub Secrets, bao gồm:
- `REGISTRY_HOST` — địa chỉ self-hosted registry (e.g., `registry.trannam.xyz:5000`)
- `REGISTRY_USER` / `REGISTRY_PASSWORD` — credentials để push images
- `VPS_HOST` / `VPS_USER` / `VPS_SSH_KEY` — SSH access đến VPS
- Tất cả app secrets (DB, Redis, JWT, OAuth, v.v.)

> **Lưu ý**: `.secrets` và `.vars` đã được thêm vào `.gitignore`, sẽ không bị commit.

---

## Setup Self-hosted Registry trên VPS

### Prerequisites trên VPS
- Docker + Docker Compose đã cài (xem `infra/scripts/setup-vps.sh`)
- SSL đã setup (certbot volume `infra_ssl_certs` tồn tại)
- DNS A record trỏ `registry.yourdomain.com` về IP của VPS

### Chạy script setup

```bash
# SSH vào VPS
ssh deploy@your-vps-ip

# Chạy setup script
cd /opt/mini-booking-system
bash infra/scripts/setup-registry.sh registry.yourdomain.com deploy YourStr0ngP@ssword
```

Script sẽ tự động:
1. Tạo htpasswd auth file
2. Tạo `.registry-credentials` cho deploy.sh
3. Request SSL cert từ Let's Encrypt
4. Start registry container
5. Mở port 5000 trên firewall

### Verify từ máy local

```bash
# Login
docker login registry.yourdomain.com:5000 -u deploy

# Push test image
docker tag alpine:latest registry.yourdomain.com:5000/test:latest
docker push registry.yourdomain.com:5000/test:latest

# Verify catalog
curl -u deploy:password https://registry.yourdomain.com:5000/v2/_catalog
```

### Cập nhật .env.production trên VPS

```bash
# Sửa file trên VPS
ssh deploy@your-vps-ip
nano /opt/mini-booking-system/.env.production

# Đổi dòng GITHUB_REPOSITORY thành:
REGISTRY=registry.yourdomain.com:5000
IMAGE_PREFIX=mini-booking
```

---

## Sử dụng

### Chạy CI (test only)

```powershell
# Windows
.\scripts\act-run.ps1 ci

# Linux/Mac
./scripts/act-run.sh ci
```

Pipeline CI sẽ chạy:
1. Backend test (.NET restore → build → test)
2. Frontend check (Bun install → typecheck → build)
3. Docker build (smoke test cả 2 images)

### Chạy CD (full pipeline → deploy VPS)

```powershell
# Windows - Full pipeline
.\scripts\act-run.ps1 cd

# Hoặc chạy từng job riêng:
.\scripts\act-run.ps1 cd-test     # Chỉ test
.\scripts\act-run.ps1 cd-build    # Chỉ build + push images
.\scripts\act-run.ps1 cd-deploy   # Chỉ deploy (cần images đã push)
```

Pipeline CD sẽ chạy:
1. **Test** — Backend test + Frontend typecheck
2. **Build & Push** — Build Docker images → Push lên self-hosted registry
3. **Deploy** — SSH vào VPS → Update IMAGE_TAG → Run deploy.sh (blue-green)

### Chạy trực tiếp với act (không dùng wrapper)

```bash
# CI
act pull_request \
  --secret-file .secrets \
  --var-file .vars \
  --container-daemon-socket /var/run/docker.sock \
  -P ubuntu-latest=catthehacker/ubuntu:act-latest \
  -W .github/workflows/ci.yml

# CD
act push \
  --secret-file .secrets \
  --var-file .vars \
  --container-daemon-socket /var/run/docker.sock \
  -P ubuntu-latest=catthehacker/ubuntu:act-latest \
  -W .github/workflows/cd.yml
```

---

## Cách chuyển lại GitHub Actions

Khi GitHub account được khôi phục (unsuspend):

### Bước 1: Sửa `.env.production` trên VPS

```bash
ssh deploy@your-vps-ip
nano /opt/mini-booking-system/.env.production

# Đổi từ:
REGISTRY=registry.yourdomain.com:5000
IMAGE_PREFIX=mini-booking

# Thành:
REGISTRY=ghcr.io
IMAGE_PREFIX=your-username/mini-booking-system
```

### Bước 2: Push code lên GitHub

```bash
git push origin main
```

GitHub Actions sẽ tự chạy. Workflow detect `ACT` không tồn tại → chạy GitHub path (GHCR + SSH action).

### Bước 3 (Optional): Tắt registry

```bash
ssh deploy@your-vps-ip
cd /opt/mini-booking-system
docker compose -f infra/docker-compose.registry.yml down
```

> **Không cần sửa code**. Workflow files hoạt động cho cả 2 mode nhờ `if: ${{ !env.ACT }}` / `if: ${{ env.ACT }}`.

---

## Cách hoạt động (chi tiết kỹ thuật)

### Biến `ACT`

`nektos/act` tự động set biến môi trường `ACT=true` trong mọi container. Workflow dùng biến này để phân nhánh:

```yaml
# Chỉ chạy trên GitHub Actions
- name: Login to GHCR
  if: ${{ !env.ACT }}
  uses: docker/login-action@v3

# Chỉ chạy khi dùng act
- name: Login to self-hosted registry (act)
  if: ${{ env.ACT }}
  run: docker login ${{ secrets.REGISTRY_HOST }}
```

### Registry parameterization

`docker-compose.prod.yml` dùng biến `REGISTRY` và `IMAGE_PREFIX`:

```yaml
image: ${REGISTRY:-ghcr.io}/${IMAGE_PREFIX}/api:${IMAGE_TAG:-latest}
```

- GitHub mode: `ghcr.io/username/repo/api:abc1234`
- Local mode: `registry.yourdomain.com:5000/mini-booking/api:abc1234`

### deploy.sh

Script tự động login registry nếu file `.registry-credentials` tồn tại:

```bash
if [ -f "${DEPLOY_DIR}/.registry-credentials" ]; then
    source "${DEPLOY_DIR}/.registry-credentials"
    echo "${REG_PASSWORD}" | docker login "${REGISTRY}" -u "${REG_USER}" --password-stdin
fi
```

---

## Cấu trúc file mới

```
mini_booking_system/
├── .actrc                                  # act defaults (runner image, Docker socket)
├── .secrets.example                        # Template secrets cho act
├── .vars.example                           # Template variables cho act
├── .github/workflows/
│   ├── ci.yml                              # CI (thêm workflow_dispatch)
│   └── cd.yml                              # CD (dual-path: GitHub vs act)
├── infra/
│   ├── docker-compose.prod.yml             # Parameterized image refs
│   ├── docker-compose.registry.yml         # Self-hosted registry
│   ├── .env.production.example             # REGISTRY + IMAGE_PREFIX
│   └── scripts/
│       ├── deploy.sh                       # Registry-aware deploy
│       └── setup-registry.sh              # One-time registry setup
├── scripts/
│   ├── act-run.ps1                         # Windows wrapper
│   └── act-run.sh                          # Linux/Mac wrapper
└── docs/guides/
    └── local-ci-cd.md                      # This file
```

---

## Troubleshooting

### act không tìm thấy Docker

```
Error: Cannot connect to the Docker daemon
```

**Fix**: Đảm bảo Docker Desktop đang chạy. Trên Windows, kiểm tra Docker Desktop settings → "Expose daemon on tcp://localhost:2375".

### .NET SDK không cài được trong act

```
dotnet: command not found
```

**Fix**: Workflow đã có conditional step tự cài .NET SDK khi chạy trong act. Nếu vẫn lỗi, thử dùng image lớn hơn:

```bash
act push -P ubuntu-latest=catthehacker/ubuntu:full-latest
```

### Push images bị timeout

```
Error: dial tcp <vps-ip>:5000: i/o timeout
```

**Fix**:
1. Kiểm tra port 5000 mở trên VPS: `ssh deploy@vps "sudo ufw status"`
2. Kiểm tra registry chạy: `ssh deploy@vps "docker ps | grep registry"`
3. Kiểm tra DNS: `nslookup registry.yourdomain.com`

### SSH connection refused trong deploy step

```
ssh: connect to host <ip> port 22: Connection refused
```

**Fix**:
1. Kiểm tra `VPS_HOST` trong `.secrets` đúng IP
2. Kiểm tra SSH key format (phải có `-----BEGIN OPENSSH PRIVATE KEY-----`)
3. Test SSH trực tiếp: `ssh -i ~/.ssh/id_ed25519 deploy@vps-ip`

### Images pull lỗi trên VPS (self-hosted registry)

```
Error: manifest unknown
```

**Fix**:
1. Kiểm tra `.registry-credentials` tồn tại trên VPS
2. Kiểm tra `REGISTRY` và `IMAGE_PREFIX` trong `.env.production` khớp với giá trị push
3. Verify images tồn tại: `curl -u deploy:pass https://registry.yourdomain.com:5000/v2/mini-booking/api/tags/list`

### act chạy rất chậm lần đầu

Lần đầu tiên act cần pull image `catthehacker/ubuntu:act-latest` (~1.5GB). Các lần sau sẽ dùng cache.

---

## Bảng tham chiếu nhanh

| Lệnh | Mục đích |
|-------|----------|
| `.\scripts\act-run.ps1 ci` | Chạy tests (backend + frontend) |
| `.\scripts\act-run.ps1 cd` | Full deploy (test → build → push → deploy VPS) |
| `.\scripts\act-run.ps1 cd-build` | Chỉ build + push images |
| `.\scripts\act-run.ps1 cd-deploy` | Chỉ deploy (images phải đã push) |

| Biến trong `.env.production` | Local mode | GitHub mode |
|------------------------------|------------|-------------|
| `REGISTRY` | `registry.yourdomain.com:5000` | `ghcr.io` |
| `IMAGE_PREFIX` | `mini-booking` | `username/repo` |
