# Hướng Dẫn Deploy Production - Mini Booking System

## Mục Lục

1. [Tổng Quan Kiến Trúc](#1-tổng-quan-kiến-trúc)
2. [Yêu Cầu VPS](#2-yêu-cầu-vps)
3. [Setup VPS Ban Đầu](#3-setup-vps-ban-đầu)
4. [Cấu Hình SSH Key cho GitHub Actions](#4-cấu-hình-ssh-key-cho-github-actions)
5. [Cấu Hình Biến Môi Trường](#5-cấu-hình-biến-môi-trường)
6. [Setup SSL Certificate](#6-setup-ssl-certificate)
7. [First Deploy](#7-first-deploy)
8. [Cấu Hình GitHub Secrets](#8-cấu-hình-github-secrets)
9. [Luồng CI/CD](#9-luồng-cicd)
10. [Blue-Green Deployment](#10-blue-green-deployment)
11. [Monitoring & Logging](#11-monitoring--logging)
12. [Backup & Restore](#12-backup--restore)
13. [Rollback](#13-rollback)
14. [Troubleshooting](#14-troubleshooting)
15. [Rủi Ro & Cách Khắc Phục](#15-rủi-ro--cách-khắc-phục)
16. [Secrets Management](#16-secrets-management)

---

## 1. Tổng Quan Kiến Trúc

```
┌─────────────────────────────────────────────────────────────┐
│                        INTERNET                              │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTPS (443)
┌─────────────────────▼───────────────────────────────────────┐
│                    NGINX (Reverse Proxy)                      │
│              SSL Termination + Rate Limiting                  │
│         ┌──────────────────┬──────────────────┐             │
│         │   /api/*         │      /*          │             │
└─────────┼──────────────────┼──────────────────┼─────────────┘
          │                  │                  │
    ┌─────▼─────┐     ┌─────▼─────┐           │
    │ API Blue  │     │ Web Blue  │  ← active  │
    │ :8080     │     │ :3000     │            │
    └───────────┘     └───────────┘            │
    ┌───────────┐     ┌───────────┐            │
    │ API Green │     │ Web Green │  ← standby │
    │ :8080     │     │ :3000     │            │
    └─────┬─────┘     └───────────┘            │
          │                                     │
    ┌─────▼──────────────────────────────┐     │
    │         PostgreSQL 15               │     │
    │         Redis 7                     │     │
    └─────────────────────────────────────┘     │
                                                │
    ┌───────────────────────────────────────────┘
    │  Certbot (auto SSL renewal every 12h)
    └───────────────────────────────────────────
```

**Luồng deploy:**
```
Code → Husky (local test) → Push → GitHub Actions CI
  → Build Docker Image → Push GHCR
    → SSH to VPS → Blue-Green Switch → Health Check → Done/Rollback
```

---

## 2. Yêu Cầu VPS

| Thông số | Tối thiểu | Khuyến nghị |
|----------|-----------|-------------|
| CPU | 2 vCPU | 4 vCPU |
| RAM | 4 GB | 8 GB |
| Disk | 40 GB SSD | 80 GB SSD |
| OS | Ubuntu 22.04 LTS | Ubuntu 24.04 LTS |
| Network | 1 Gbps | 1 Gbps |

**Nhà cung cấp gợi ý:** DigitalOcean, Vultr, Linode, Hetzner, hoặc bất kỳ VPS nào chạy Ubuntu.

**Domain:** Cần 1 domain trỏ A record về IP của VPS.

---

## 3. Setup VPS Ban Đầu

### 3.1. SSH vào VPS (với quyền root)

```bash
ssh root@103.224.212.202
```

### 3.2. Chạy script setup

```bash
# Download và chạy setup script
curl -fsSL https://raw.githubusercontent.com/YOUR_USER/mini-booking-system/main/infra/scripts/setup-vps.sh | bash
```

Hoặc chạy thủ công từng bước:

```bash
# Update system
apt-get update && apt-get upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
systemctl enable docker && systemctl start docker

# Tạo user deploy
useradd -m -s /bin/bash -G docker deploy
mkdir -p /home/deploy/.ssh
chmod 700 /home/deploy/.ssh

# Tạo project directory
mkdir -p /opt/mini-booking-system
chown -R deploy:deploy /opt/mini-booking-system

# Firewall
apt-get install -y ufw
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
```

### 3.3. Clone repository

> **QUAN TRỌNG:** Dấu `.` ở cuối lệnh git clone — clone trực tiếp vào `/opt/mini-booking-system/`, KHÔNG tạo subfolder.

```bash
su - deploy
cd /opt/mini-booking-system
git clone https://github.com/YOUR_USER/mini-booking-system.git .
```

Verify cấu trúc đúng:
```bash
ls /opt/mini-booking-system/infra/docker-compose.prod.yml
# Phải tồn tại file này. Nếu không → clone sai (có subfolder thừa)
```

---

## 4. Cấu Hình SSH Key cho GitHub Actions

### 4.1. Tạo SSH key pair (trên máy local)

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/deploy_key
```

### 4.2. Thêm public key vào VPS

```bash
# Copy public key lên VPS
ssh-copy-id -i ~/.ssh/deploy_key.pub deploy@your-vps-ip

# Hoặc thủ công:
cat ~/.ssh/deploy_key.pub | ssh root@your-vps-ip "cat >> /home/deploy/.ssh/authorized_keys && chmod 600 /home/deploy/.ssh/authorized_keys && chown deploy:deploy /home/deploy/.ssh/authorized_keys"
```

### 4.3. Thêm private key vào GitHub Secrets

1. Vào repo GitHub → Settings → Secrets and variables → Actions
2. Thêm secret `VPS_SSH_KEY` với nội dung file `~/.ssh/deploy_key` (private key)

### 4.4. Test kết nối

```bash
ssh -i ~/.ssh/deploy_key deploy@your-vps-ip "echo 'Connection OK'"
```

---

## 5. Cấu Hình Biến Môi Trường

### Cách hoạt động

File `.env.production` trên VPS được **tự động generate** bởi CD workflow mỗi lần deploy. Bạn **không cần** tạo hay maintain file này thủ công. Tất cả giá trị được lấy từ GitHub Secrets.

Luồng:
```
GitHub Secrets → CD workflow → SSH ghi .env.production lên VPS → deploy.sh source file → docker compose đọc biến
```

### 5.1. Nơi cấu hình duy nhất: GitHub Secrets

Vào repo → Settings → Environments → New environment → `production` → Add secret.

Tất cả biến môi trường được quản lý tại đây:

**Domain & URLs:**

| Secret | Cách lấy | Ví dụ |
|--------|----------|-------|
| `FRONTEND_DOMAIN` | Domain cho frontend, trỏ A record về IP VPS | `trannam.xyz` |
| `API_DOMAIN` | Subdomain cho API, trỏ A record về IP VPS | `api.trannam.xyz` |
| `SSL_EMAIL` | Email nhận thông báo hết hạn SSL từ Let's Encrypt | `admin@trannam.xyz` |
| `PRODUCTION_API_URL` | `https://{API_DOMAIN}` | `https://api.trannam.xyz` |
| `FRONTEND_URL` | `https://{FRONTEND_DOMAIN}` | `https://trannam.xyz` |

**Database & Cache:**

| Secret | Cách lấy | Ví dụ |
|--------|----------|-------|
| `POSTGRES_USER` | Tự đặt | `booking_user` |
| `POSTGRES_PASSWORD` | `openssl rand -base64 32` | Random string |
| `POSTGRES_DB` | Tên database | `mini_booking_system` |
| `REDIS_PASSWORD` | `openssl rand -base64 32` | Random string |

**Authentication:**

| Secret | Cách lấy | Ví dụ |
|--------|----------|-------|
| `JWT_SECRET` | `openssl rand -base64 64` | Random string (64+ chars) |
| `JWT_ISSUER` | Tên issuer | `MiniBookingSystem` |
| `JWT_AUDIENCE` | Tên audience | `MiniBookingSystemUsers` |
| `GOOGLE_CLIENT_ID` | Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client | `xxx.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Cùng trang với Client ID, nhấn "Show" | `GOCSPX-xxx` |
| `ADMIN_EMAIL` | lấy bất cứ email nào đang sử dụng | `namtran2712.dev@gmail.com` |

**External Services:**

| Secret | Cách lấy | Ví dụ |
|--------|----------|-------|
| `RESEND_API_KEY` | https://resend.com/api-keys → Create API Key | `re_xxx` |
| `RESEND_FROM_EMAIL` | Email thuộc domain đã verify trên Resend (resend.com/domains) | `noreply@trannam.xyz` |
| `RESEND_FROM_NAME` | Tên hiển thị khi gửi email | `Mini Booking System` |
| `MINIMAX_API_KEY` | https://platform.minimax.io → API Keys | `eyJhbG...` |
| `SEPAY_WEBHOOK_KEY` | SePay dashboard → Webhook settings → API Key | `your_key` |
| `SEPAY_BANK_SHORT_NAME` | Tên viết tắt ngân hàng nhận tiền | `MBBank` |
| `SEPAY_ACCOUNT_NUMBER` | Số tài khoản ngân hàng nhận tiền | `0123456789` |
| `SEPAY_ACCOUNT_NAME` | Tên chủ tài khoản (viết hoa, không dấu) | `TRAN NHAT NAM` |

**Infrastructure (không phải env vars của app):**

| Secret | Cách lấy | Ví dụ |
|--------|----------|-------|
| `VPS_HOST` | IP address VPS | `123.45.67.89` |
| `VPS_USER` | SSH user (tạo ở Section 3) | `deploy` |
| `VPS_SSH_KEY` | Nội dung file private key (xem Section 4) | `-----BEGIN OPENSSH...` |
| `GHCR_TOKEN` | GitHub → Settings → Developer settings → PAT (classic) → Scopes: `read:packages`, `write:packages` | `ghp_xxx` |

### 5.2. Cấu hình Hardware (GitHub Variables)

Các tham số phần cứng không phải secrets — dùng **GitHub Environment Variables** (plaintext, dễ thay đổi không cần re-deploy code).

Vào repo → Settings → Environments → `production` → **Environment variables** (không phải secrets) → Add variable:

| Variable | Giá trị khuyến nghị | Ghi chú |
|----------|---------------------|---------|
| `REDIS_MAXMEMORY` | `400mb` | Tùy RAM VPS, thường 10-20% tổng RAM |
| `REDIS_MAXMEMORY_POLICY` | `allkeys-lru` | Eviction policy khi đầy memory |
| `CPU_LIMIT_API` | `1.0` | Số CPU cores cho API container |
| `MEM_LIMIT_API` | `512m` | RAM cho API container |
| `CPU_LIMIT_WEB` | `0.5` | Số CPU cores cho Web container |
| `MEM_LIMIT_WEB` | `256m` | RAM cho Web container |
| `CPU_LIMIT_POSTGRES` | `1.0` | Số CPU cores cho PostgreSQL |
| `MEM_LIMIT_POSTGRES` | `1g` | RAM cho PostgreSQL |
| `CPU_LIMIT_REDIS` | `0.5` | Số CPU cores cho Redis |
| `MEM_LIMIT_REDIS` | `512m` | RAM cho Redis |

**Hướng dẫn chọn giá trị theo spec VPS:**

| VPS RAM | API | Web | Postgres | Redis |
|---------|-----|-----|----------|-------|
| 4 GB | 512m | 256m | 1g | 400mb |
| 8 GB | 1g | 512m | 2g | 800mb |
| 16 GB | 2g | 1g | 4g | 1600mb |

### 5.3. Generate passwords

Chạy trên máy local, copy kết quả vào GitHub Secrets:

```bash
# PostgreSQL password
openssl rand -base64 32

# Redis password
openssl rand -base64 32

# JWT secret (dài hơn cho security)
openssl rand -base64 64
```

### 5.4. Tạo .env.production trên VPS (bắt buộc cho lần đầu)

Lần đầu setup cần tạo file `.env.production` thủ công để chạy SSL setup và infrastructure. Sau đó CD workflow sẽ tự ghi đè mỗi lần deploy.

```bash
# SSH vào VPS với user deploy
ssh deploy@103.224.212.202

cd /opt/mini-booking-system
cp infra/.env.production.example .env.production
nano .env.production
```

**Điền giá trị thật** cho tất cả biến (đặc biệt quan trọng cho SSL setup):
- `FRONTEND_DOMAIN=trannam.xyz`
- `API_DOMAIN=api.trannam.xyz`
- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
- `REDIS_PASSWORD`
- `GITHUB_REPOSITORY=your-username/mini-booking-system`

Các biến external services (Google, Resend, MiniMax, SePay) có thể để placeholder tạm — chỉ cần cho app chạy, không ảnh hưởng SSL setup.

```bash
chmod 600 .env.production
```

> **Sau lần CD đầu tiên**, file này sẽ bị ghi đè bởi workflow từ GitHub Secrets. Bạn không cần maintain thủ công nữa.

---

## 6. Setup SSL Certificate

### 6.1. Đảm bảo DNS đã trỏ đúng

Cả 2 domain phải trỏ A record về cùng IP VPS:

```bash
dig +short trannam.xyz
# Phải trả về IP VPS: 103.224.212.202

dig +short api.trannam.xyz
# Phải trả về cùng IP VPS: 103.224.212.202
```

Nếu chưa trỏ, vào DNS provider (Cloudflare, Namecheap, etc.) thêm:
- `trannam.xyz` → A record → `103.224.212.202`
- `api.trannam.xyz` → A record → `103.224.212.202`

> **Lưu ý:** Nếu dùng Cloudflare, tắt proxy (chuyển sang DNS only / grey cloud) trong lúc setup SSL. Sau khi xong có thể bật lại.

### 6.2. Chạy SSL setup

```bash
cd /opt/mini-booking-system
bash infra/scripts/setup-ssl.sh trannam.xyz api.trannam.xyz namtran2712.dev@gmail.com
```

Script sẽ tự động:
1. Tạo `active-upstream.conf` tạm (placeholder 127.0.0.1 để nginx start được)
2. Tạo nginx config tạm (HTTP only) cho cả 2 domain — phục vụ ACME challenge
3. Start nginx container
4. Chạy `docker run certbot` xin certificate cho `trannam.xyz`
5. Chạy `docker run certbot` xin certificate cho `api.trannam.xyz`
6. Apply production nginx configs từ templates (`frontend.conf` + `backend.conf`)
7. Reload nginx với SSL

### 6.3. Nếu script bị stuck hoặc lỗi

Nếu certbot không output gì (stuck), kill và chạy thủ công:

```bash
# Kill certbot container đang stuck
docker rm -f $(docker ps -aq --filter "ancestor=certbot/certbot:latest") 2>/dev/null

# Chạy certbot trực tiếp cho từng domain
docker run --rm \
    -v infra_certbot_webroot:/var/www/certbot \
    -v infra_ssl_certs:/etc/letsencrypt \
    certbot/certbot:latest \
    certonly --webroot \
    --webroot-path=/var/www/certbot \
    --email namtran2712.dev@gmail.com \
    --agree-tos \
    --no-eff-email \
    -v \
    -d trannam.xyz

docker run --rm \
    -v infra_certbot_webroot:/var/www/certbot \
    -v infra_ssl_certs:/etc/letsencrypt \
    certbot/certbot:latest \
    certonly --webroot \
    --webroot-path=/var/www/certbot \
    --email namtran2712.dev@gmail.com \
    --agree-tos \
    --no-eff-email \
    -v \
    -d api.trannam.xyz

# Apply production nginx config thủ công
export FRONTEND_DOMAIN=trannam.xyz
export API_DOMAIN=api.trannam.xyz
envsubst '${FRONTEND_DOMAIN}' < infra/docker/nginx/conf.d/frontend.conf.template \
    > infra/docker/nginx/conf.d/frontend.conf
envsubst '${API_DOMAIN}' < infra/docker/nginx/conf.d/backend.conf.template \
    > infra/docker/nginx/conf.d/backend.conf

# Reload nginx
docker exec nginx_prod nginx -s reload
```

### 6.4. Verify SSL

```bash
# Frontend (502 là OK — chưa có app containers)
curl -I https://trannam.xyz
# Phải thấy: HTTP/1.1 502 Bad Gateway + header Strict-Transport-Security

# API (502 là OK — chưa có app containers)
curl -I https://api.trannam.xyz
# Phải thấy: HTTP/1.1 502 Bad Gateway + header Strict-Transport-Security
```

> **502 Bad Gateway = SSL hoạt động đúng.** Nginx nhận request qua HTTPS nhưng chưa có app containers để forward. Sau khi deploy app sẽ thành 200.

### 6.5. Kiểm tra certificates

```bash
docker run --rm -v infra_ssl_certs:/etc/letsencrypt certbot/certbot:latest certificates
```

### 6.6. Xóa certificates và setup lại (nếu cần)

```bash
# Xóa cert cũ
docker run --rm -v infra_ssl_certs:/etc/letsencrypt certbot/certbot:latest \
    delete --cert-name trannam.xyz
docker run --rm -v infra_ssl_certs:/etc/letsencrypt certbot/certbot:latest \
    delete --cert-name api.trannam.xyz

# Stop nginx
docker compose -f infra/docker-compose.prod.yml --env-file .env.production down --remove-orphans

# Chạy lại từ đầu
bash infra/scripts/setup-ssl.sh trannam.xyz api.trannam.xyz namtran2712.dev@gmail.com
```

### 6.7. Auto-renewal

Certbot container trong docker-compose tự động renew mỗi 12h. Sau khi deploy app (Section 7), certbot container sẽ chạy cùng. Kiểm tra:

```bash
# Test dry-run renewal
docker run --rm -v infra_ssl_certs:/etc/letsencrypt -v infra_certbot_webroot:/var/www/certbot \
    certbot/certbot:latest renew --dry-run
```

---

## 7. First Deploy

### 7.1. Login vào GHCR

```bash
# Tạo Personal Access Token (PAT) trên GitHub:
# Settings → Developer settings → Personal access tokens → Tokens (classic)
# Scopes: read:packages, write:packages

echo "YOUR_PAT" | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
```

### 7.2. Start infrastructure services

```bash
cd /opt/mini-booking-system

# Start postgres + redis trước
docker compose -f infra/docker-compose.prod.yml --env-file .env.production up -d postgres_db redis_cache

# Chờ healthy
docker compose -f infra/docker-compose.prod.yml --env-file .env.production ps
```

### 7.3. Deploy lần đầu

```bash
# Khởi tạo active color
echo "green" > .active-color

# Deploy (sẽ deploy sang blue vì current là green)
bash infra/scripts/deploy.sh latest
```

### 7.4. Verify

```bash
bash infra/scripts/health-check.sh

# Frontend
curl https://trannam.xyz
# Phải thấy HTML response

# API
curl https://api.trannam.xyz/health
# Phải thấy 200 OK
```

---

## 8. Cấu Hình GitHub Secrets

Tất cả secrets đã được liệt kê chi tiết ở [Section 5](#5-cấu-hình-biến-môi-trường). Dưới đây là hướng dẫn setup trên GitHub.

### Tạo Environment "production"

1. Repo → Settings → Environments → New environment → `production`
2. Thêm tất cả secrets (xem bảng ở Section 5.1)
3. Thêm protection rules (optional):
   - Required reviewers: thêm người review trước khi deploy
   - Wait timer: delay 5 phút trước deploy (cho phép cancel)

---

## 9. Luồng CI/CD

### CI (Pull Request)

Khi tạo PR vào `main`:
1. **backend-test**: Restore → Build → Test (.NET)
2. **frontend-check**: Install → Typecheck → Build (Bun)
3. **docker-build**: Build cả 2 Docker images (verify Dockerfile)

PR chỉ merge được khi cả 3 jobs pass.

### CD (Push to main)

Khi merge PR vào `main`:
1. **test**: Chạy lại test backend + typecheck frontend
2. **build-and-push**: Build images → Push lên GHCR (tag: git SHA + latest)
3. **deploy**: SSH vào VPS → Chạy `deploy.sh`
4. **verify**: Health check → Rollback nếu fail

---

## 10. Blue-Green Deployment

### Cách hoạt động

- Luôn có 2 bộ containers: **blue** và **green**
- Chỉ 1 bộ active (nhận traffic từ nginx)
- Deploy mới → start bộ inactive → health check → switch nginx → stop bộ cũ

### Lệnh thủ công

```bash
# Xem color đang active
cat /opt/mini-booking-system/.active-color

# Deploy thủ công
cd /opt/mini-booking-system
bash infra/scripts/deploy.sh latest

# Xem containers đang chạy
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

### Tại sao Blue-Green?

| So sánh | Rolling Update | Blue-Green |
|---------|---------------|------------|
| Downtime | Gần 0 | 0 |
| Rollback | Chậm (redeploy) | Instant (switch nginx) |
| Resource | Ít hơn | Gấp đôi (tạm thời) |
| Complexity | Thấp | Trung bình |

---

## 11. Monitoring & Logging

### Health Check Endpoints

- **API**: `https://api.trannam.xyz/health` → 200 OK
- **Frontend**: `https://trannam.xyz/` → 200 OK

### Xem logs

```bash
# API logs (structured JSON)
docker logs api-blue --tail 100 -f
docker logs api-green --tail 100 -f

# Nginx access log
docker logs nginx_prod --tail 100 -f

# Log files (persisted)
ls /var/lib/docker/volumes/mini-booking-system_api_logs/_data/

# Tìm errors trong log
docker logs api-blue 2>&1 | grep -i error | tail -20
```

### Serilog Output

Logs được ghi dưới dạng Compact JSON:
```json
{"@t":"2026-05-19T10:00:00.000Z","@mt":"HTTP {Method} {Path} responded {StatusCode} in {Elapsed}ms","Method":"GET","Path":"/health","StatusCode":200,"Elapsed":5.2}
```

### Docker container health

```bash
# Xem health status
docker inspect --format='{{.State.Health.Status}}' api-blue
docker inspect --format='{{json .State.Health}}' api-blue | jq

# Resource usage
docker stats --no-stream
```

### Setup cron cho monitoring

```bash
# Thêm vào crontab của user deploy
crontab -e

# Health check mỗi 5 phút
*/5 * * * * /opt/mini-booking-system/infra/scripts/health-check.sh >> /opt/mini-booking-system/logs/health-check.log 2>&1

# Backup database mỗi ngày lúc 2:00 AM
0 2 * * * /opt/mini-booking-system/infra/scripts/backup-db.sh >> /opt/mini-booking-system/logs/backup.log 2>&1
```

---

## 12. Backup & Restore

### Backup tự động

Database được backup hàng ngày qua cron (xem section 11).

```bash
# Backup thủ công
bash infra/scripts/backup-db.sh

# Xem danh sách backups
ls -lh /opt/mini-booking-system/backups/
```

### Restore từ backup

```bash
# Stop API containers trước
docker compose -f infra/docker-compose.prod.yml --profile blue down
docker compose -f infra/docker-compose.prod.yml --profile green down

# Restore
docker exec -i postgres_prod pg_restore \
    -U booking_user \
    -d mini_booking_system \
    --clean \
    --if-exists \
    < /opt/mini-booking-system/backups/backup_20260519_020000.dump

# Start lại
bash infra/scripts/deploy.sh latest
```

---

## 13. Rollback

### Rollback tự động

CD workflow tự động rollback nếu health check fail sau deploy.

### Rollback thủ công

```bash
cd /opt/mini-booking-system
bash infra/scripts/rollback.sh
```

Script sẽ:
1. Start lại containers của color trước đó
2. Switch nginx upstream
3. Stop containers lỗi

### Rollback về image cụ thể

```bash
# Xem các image tags có sẵn
docker images "ghcr.io/*/api" --format "{{.Tag}}\t{{.CreatedAt}}"

# Deploy image cũ
export IMAGE_TAG=abc1234
bash infra/scripts/deploy.sh abc1234
```

---

## 14. Troubleshooting

### Container không start

```bash
# Xem logs
docker logs api-blue 2>&1 | tail -50

# Kiểm tra env vars
docker exec api-blue env | sort

# Kiểm tra kết nối DB
docker exec api-blue sh -c "curl -s postgres_db:5432 || echo 'Cannot reach postgres'"
```

### Nginx 502 Bad Gateway

```bash
# Kiểm tra upstream containers có chạy không
docker ps | grep -E "api-(blue|green)|web-(blue|green)"

# Kiểm tra nginx config
docker exec nginx_prod nginx -t

# Xem active upstream
cat infra/docker/nginx/active-upstream.conf

# Reload nginx
docker exec nginx_prod nginx -s reload
```

### SSL certificate hết hạn

```bash
# Kiểm tra expiry
docker exec certbot certbot certificates

# Force renew
docker exec certbot certbot renew --force-renewal

# Reload nginx
docker exec nginx_prod nginx -s reload
```

### Database connection refused

```bash
# Kiểm tra postgres container
docker logs postgres_prod --tail 20

# Kiểm tra health
docker inspect --format='{{.State.Health.Status}}' postgres_prod

# Test connection
docker exec postgres_prod pg_isready -U booking_user -d mini_booking_system
```

### Disk space đầy

```bash
# Kiểm tra disk
df -h

# Dọn Docker images cũ
docker image prune -a --filter "until=168h"  # Xóa images > 7 ngày

# Dọn logs cũ
find /opt/mini-booking-system/logs -name "*.json" -mtime +30 -delete

# Dọn Docker system
docker system prune -f
```

### Redis connection issues

```bash
# Test Redis
docker exec redis_prod redis-cli -a YOUR_REDIS_PASSWORD ping

# Xem memory usage
docker exec redis_prod redis-cli -a YOUR_REDIS_PASSWORD info memory

# Flush cache (nếu cần)
docker exec redis_prod redis-cli -a YOUR_REDIS_PASSWORD FLUSHDB
```

---

## 15. Rủi Ro & Cách Khắc Phục

### Risk 1: Disk Space — Docker images tích tụ

**Vấn đề:** Mỗi lần deploy tạo image mới. Sau vài tuần, VPS đầy ổ cứng → PostgreSQL crash.

**Khắc phục (đã tích hợp):**
- `deploy.sh` tự động chạy `docker image prune` sau mỗi deploy thành công (xóa images > 7 ngày)
- `docker builder prune` giữ build cache tối đa 2GB

**Monitoring:**
```bash
# Kiểm tra disk usage
df -h
docker system df

# Dọn thủ công nếu cần
docker system prune -af --volumes
```

**Cron khuyến nghị:**
```bash
# Thêm vào crontab: dọn images mỗi tuần
0 3 * * 0 docker image prune -af --filter "until=168h" >> /opt/mini-booking-system/logs/cleanup.log 2>&1
```

---

### Risk 2: Database Migration — Rủi ro lớn nhất

**Vấn đề:** Trong Blue-Green, khi Green chạy migration xóa cột, Blue (đang nhận traffic) sẽ lỗi ngay lập tức.

**Khắc phục: Quy tắc "Expand and Contract"**

Mọi migration phải chia thành 2-3 phase:

| Phase | Hành động | Code cũ | Code mới |
|-------|-----------|---------|----------|
| 1. Expand | Thêm cột mới (nullable/default) | Chạy OK (ignore cột mới) | Chạy OK (dùng cột mới) |
| 2. Migrate | Deploy code mới sử dụng cột mới | — | Chạy OK |
| 3. Contract | Xóa cột cũ (deploy riêng, sau khi ổn định) | — | Chạy OK |

**Ví dụ thực tế:**

Đổi tên cột `user_name` → `username`:
```
Deploy 1: ALTER TABLE users ADD COLUMN username VARCHAR(255);
          UPDATE users SET username = user_name;
          (Code mới đọc/ghi cả 2 cột)

Deploy 2: (Code chỉ dùng username, không dùng user_name nữa)

Deploy 3: ALTER TABLE users DROP COLUMN user_name;
          (Chỉ chạy sau khi Deploy 2 ổn định 1-2 ngày)
```

**Quy trình chạy migration:**
```bash
# Luôn backup trước
bash infra/scripts/backup-db.sh

# Chạy migration
bash infra/scripts/migrate-db.sh

# Sau đó mới deploy code mới
bash infra/scripts/deploy.sh <tag>
```

**KHÔNG BAO GIỜ làm trong cùng 1 deploy:**
- DROP COLUMN / DROP TABLE
- RENAME COLUMN
- Thay đổi kiểu dữ liệu (ALTER COLUMN TYPE)
- Xóa constraint mà code cũ phụ thuộc

---

### Risk 3: File Upload — Stateless containers

**Vấn đề:** Nếu upload lưu trong container, switch color sẽ mất file.

**Khắc phục (đã tích hợp):**
- Cả `api-blue` và `api-green` đều mount cùng Docker named volume `api_uploads:/app/uploads`
- File upload được chia sẻ giữa 2 colors, không bị mất khi switch

**Verify:**
```bash
# Kiểm tra volume
docker volume inspect mini-booking-system_api_uploads

# Cả 2 containers phải thấy cùng files
docker exec api-blue ls /app/uploads/avatars/
docker exec api-green ls /app/uploads/avatars/
```

**Tương lai (khi scale lên nhiều VPS):**
- Chuyển sang S3-compatible storage (MinIO, AWS S3, Cloudflare R2)
- Hoặc dùng NFS shared volume giữa các VPS

---

### Risk 4: Single Point of Failure — VPS đơn lẻ

**Vấn đề:** Nếu VPS sập (hardware failure), toàn bộ hệ thống down.

**Khắc phục hiện tại:**
- Database backup hàng ngày (có thể restore trên VPS mới)
- `.env.production` được generate tự động từ GitHub Secrets (không phụ thuộc file thủ công trên VPS)
- Toàn bộ infrastructure as code trong repo (dựng lại VPS mới trong ~30 phút)

**Quy trình khôi phục khi VPS sập:**
```bash
# 1. Provision VPS mới
bash infra/scripts/setup-vps.sh

# 2. Clone repo
git clone https://github.com/YOUR_USER/mini-booking-system.git /opt/mini-booking-system

# 3. GitHub Actions sẽ tự generate .env.production ở lần deploy tiếp
#    Hoặc tạo thủ công từ GitHub Secrets

# 4. Restore database từ backup
docker compose -f infra/docker-compose.prod.yml up -d postgres_db
cat backup_latest.dump | docker exec -i postgres_prod pg_restore -U booking_user -d mini_booking_system

# 5. Setup SSL + Deploy
bash infra/scripts/setup-ssl.sh trannam.xyz api.trannam.xyz admin@trannam.xyz
bash infra/scripts/deploy.sh latest
```

**Tương lai (khi cần HA):**
- Load Balancer (HAProxy/Nginx) phía trước 2+ VPS
- Database: PostgreSQL streaming replication hoặc managed DB (RDS, Supabase)
- Redis: Redis Sentinel hoặc managed Redis

---

## 16. Secrets Management

### Cách hoạt động hiện tại

`.env.production` được **tự động generate** từ GitHub Secrets mỗi lần deploy:
1. CD workflow đọc secrets từ GitHub Environment "production"
2. SSH vào VPS và ghi file `.env.production` với `chmod 600`
3. Docker Compose đọc file này để interpolate biến vào containers

**Ưu điểm:**
- Không cần maintain file thủ công trên VPS
- Secrets được quản lý tập trung tại GitHub
- Nếu VPS bị hack, đổi secrets trên GitHub → deploy lại là xong
- Audit trail: GitHub ghi log ai thay đổi secrets khi nào

### Thêm/Sửa secrets

1. Vào repo → Settings → Environments → production → Environment secrets
2. Thêm hoặc sửa secret
3. Push commit mới (hoặc re-run CD workflow) để apply

### Danh sách GitHub Secrets cần thiết

Tổng cộng **25 secrets** cần tạo trên GitHub Environment "production":

| # | Secret | Loại |
|---|--------|------|
| 1 | `VPS_HOST` | Infrastructure |
| 2 | `VPS_USER` | Infrastructure |
| 3 | `VPS_SSH_KEY` | Infrastructure |
| 4 | `GHCR_TOKEN` | Infrastructure |
| 5 | `FRONTEND_DOMAIN` | Domain & URLs |
| 6 | `API_DOMAIN` | Domain & URLs |
| 7 | `SSL_EMAIL` | Domain & URLs |
| 8 | `PRODUCTION_API_URL` | Domain & URLs |
| 9 | `FRONTEND_URL` | Domain & URLs |
| 10 | `POSTGRES_USER` | Database |
| 11 | `POSTGRES_PASSWORD` | Database |
| 12 | `POSTGRES_DB` | Database |
| 13 | `REDIS_PASSWORD` | Cache |
| 14 | `JWT_SECRET` | Auth |
| 15 | `JWT_ISSUER` | Auth |
| 16 | `JWT_AUDIENCE` | Auth |
| 17 | `GOOGLE_CLIENT_ID` | Auth |
| 18 | `GOOGLE_CLIENT_SECRET` | Auth |
| 19 | `RESEND_API_KEY` | Email |
| 20 | `MINIMAX_API_KEY` | AI |
| 21 | `SEPAY_WEBHOOK_KEY` | Payment |
| 22 | `SEPAY_BANK_SHORT_NAME` | Payment |
| 23 | `SEPAY_ACCOUNT_NUMBER` | Payment |
| 24 | `SEPAY_ACCOUNT_NAME` | Payment |
| 25 | `ADMIN_EMAIL` | Admin Auto-Seed |

> **`ADMIN_EMAIL`**: Email address for the auto-created admin account. On first deploy (when no Admin user exists in the database), the system automatically creates an admin user with this email and a random secure password. The password is sent to this email via Resend. If left empty or not set, admin seeding is skipped.

### Rotate secrets

```bash
# 1. Generate new password
openssl rand -base64 32

# 2. Update trên GitHub Secrets

# 3. Nếu là DB password, cần đổi trong PostgreSQL trước:
docker exec postgres_prod psql -U postgres -c "ALTER USER booking_user PASSWORD 'new_password';"

# 4. Re-deploy để apply
# Push empty commit hoặc re-run workflow
```

---

## Appendix: Cấu Trúc File Hoàn Chỉnh

```
mini_booking_system/
├── .github/workflows/
│   ├── ci.yml                    # Test on PR
│   └── cd.yml                    # Deploy on push to main
├── infra/
│   ├── docker/
│   │   ├── api.Dockerfile        # .NET 10 multi-stage
│   │   ├── web.Dockerfile        # Bun + Node multi-stage
│   │   └── nginx/
│   │       ├── nginx.conf
│   │       ├── conf.d/app.conf.template
│   │       ├── upstream-blue.conf
│   │       ├── upstream-green.conf
│   │       └── active-upstream.conf
│   ├── scripts/
│   │   ├── deploy.sh            # Blue-green orchestrator + auto cleanup
│   │   ├── rollback.sh          # Instant rollback
│   │   ├── health-check.sh      # Health check endpoints
│   │   ├── backup-db.sh         # DB backup with 7-day retention
│   │   ├── migrate-db.sh        # Safe migration (Expand & Contract)
│   │   ├── setup-ssl.sh         # Let's Encrypt initial setup
│   │   └── setup-vps.sh         # VPS provisioning
│   ├── docker-compose.prod.yml
│   └── .env.production.example
└── docs/
    └── DEPLOYMENT.md             # (file này)
```

## Appendix: GitHub Secrets Checklist

- [ ] `VPS_HOST` — IP address của VPS
- [ ] `VPS_USER` — `deploy`
- [ ] `VPS_SSH_KEY` — Private key (ed25519)
- [ ] `GHCR_TOKEN` — GitHub PAT với scope `read:packages`, `write:packages`
- [ ] `PRODUCTION_API_URL` — `https://your-domain.com/api`
