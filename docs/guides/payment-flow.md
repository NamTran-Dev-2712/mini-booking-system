# Luồng Thanh Toán SePay — Mini Booking System

> Tài liệu này mô tả toàn bộ luồng từ khi user tạo booking cho đến khi thanh toán được xác nhận thành công qua SePay webhook, bao gồm các edge case, cơ chế bảo vệ, và các file cần đọc để hiểu từng phần.

---

## Mục lục

1. [Tổng quan kiến trúc](#1-tổng-quan-kiến-trúc)
2. [Sơ đồ luồng hoàn chỉnh](#2-sơ-đồ-luồng-hoàn-chỉnh)
3. [Bước 1 — Tạo Booking](#3-bước-1--tạo-booking)
4. [Bước 2 — Tạo Payment Transaction & QR Code](#4-bước-2--tạo-payment-transaction--qr-code)
5. [Bước 3 — User Chuyển Khoản](#5-bước-3--user-chuyển-khoản)
6. [Bước 4 — SePay Gửi Webhook](#6-bước-4--sepay-gửi-webhook)
7. [Bước 5 — Xác Nhận Thành Công](#7-bước-5--xác-nhận-thành-công)
8. [Background Job — Tự Động Hủy Booking Hết Hạn](#8-background-job--tự-động-hủy-booking-hết-hạn)
9. [Frontend Polling — Kiểm Tra Trạng Thái](#9-frontend-polling--kiểm-tra-trạng-thái)
10. [Bảng trạng thái và chuyển tiếp](#10-bảng-trạng-thái-và-chuyển-tiếp)
11. [Các cơ chế bảo vệ quan trọng](#11-các-cơ-chế-bảo-vệ-quan-trọng)
12. [Edge Cases & Cách Xử Lý](#12-edge-cases--cách-xử-lý)
13. [Cấu hình SePay](#13-cấu-hình-sepay)
14. [Index file cần đọc](#14-index-file-cần-đọc)

---

## 1. Tổng quan kiến trúc

Hệ thống dùng **Clean Architecture** với 4 layer:

```
API Layer         → Controller nhận HTTP request, xác thực JWT, dispatch MediatR command
Application Layer → CommandHandler/QueryHandler chứa toàn bộ business logic
Domain Layer      → Entity (Booking, PaymentTransaction), Enum, Domain method
Infrastructure    → EF Core + PostgreSQL, Redis, SePay HTTP service, Background Job
```

**Pattern chính:**
- **CQRS via MediatR**: mọi thao tác đều đi qua `IMediator.Send(command/query)`
- **Unit of Work**: tất cả repository access qua `IUnitOfWork`, đảm bảo atomic transaction
- **Idempotency**: Redis cache ngăn duplicate booking/payment
- **Webhook-driven**: payment confirmation hoàn toàn bất đồng bộ qua SePay webhook

---

## 2. Sơ đồ luồng hoàn chỉnh

```
User                    API Server                  SePay              Background Job
 │                          │                          │                      │
 │──POST /api/booking───────▶│                          │                      │
 │                          │ CreateBookingCommand      │                      │
 │                          │ ├─ Check idempotency      │                      │
 │                          │ ├─ Lock MentorSlot (FOR UPDATE)                  │
 │                          │ ├─ INSERT booking (status=PendingPayment)         │
 │                          │ └─ UPDATE mentor_slot.current_bookings            │
 │◀──── bookingId ──────────│                          │                      │
 │                          │                          │                      │
 │──POST /api/payment───────▶│                          │                      │
 │                          │ CreatePaymentCommand      │                      │
 │                          │ ├─ Validate booking status│                      │
 │                          │ ├─ Generate orderCode     │                      │
 │                          │ ├─ Build SePay QR URL     │                      │
 │                          │ └─ INSERT payment_transaction (status=Pending)   │
 │◀── { qrCodeUrl, expiredAt }                          │                      │
 │                          │                          │                      │
 │ [Quét QR, chuyển khoản]  │                          │                      │
 │─────────────────────────────────────────────────────▶│                      │
 │                          │                          │                      │
 │                          │◀──POST /api/webhooks/sepay│                      │
 │                          │ ProcessSePayWebhookCommand│                      │
 │                          │ ├─ Validate Apikey header │                      │
 │                          │ ├─ INSERT webhook_log (Received)                 │
 │                          │ ├─ Check idempotency (ExistsProcessed)           │
 │                          │ ├─ Validate TransferType == "in"                 │
 │                          │ ├─ Extract orderCode từ Code/Content             │
 │                          │ ├─ Load payment + booking (JOIN)                 │
 │                          │ ├─ Check expiry / amount                         │
 │                          │ ├─ UPDATE payment (status=Succeeded, paidAt)     │
 │                          │ ├─ UPDATE booking (status=Confirmed, confirmedAt)│
 │                          │ └─ UPDATE webhook_log (status=Processed)         │
 │                          │──── 200 OK ─────────────▶│                      │
 │                          │                          │                      │
 │──GET /api/payment/{id}/status                        │                      │
 │◀── { status: "Succeeded" }                           │                      │
 │                          │                          │                      │
 │                          │                    [every 1 min]                 │
 │                          │◀──────────────────────────────────── tick ──────│
 │                          │ ExpiredBookingCleanupJob  │                      │
 │                          │ ├─ SELECT bookings WHERE status=PendingPayment   │
 │                          │ │    AND expires_at <= NOW                       │
 │                          │ ├─ UPDATE booking.status = Expired               │
 │                          │ └─ UPDATE mentor_slot.current_bookings -= 1      │
```

---

## 3. Bước 1 — Tạo Booking

### HTTP Request
```http
POST /api/booking
Authorization: Bearer {jwt}
Idempotency-Key: {client-generated-uuid}   ← tùy chọn nhưng khuyến nghị

{
  "mentorSlotId": "...",
  "notes": "..."
}
```

### File cần đọc
| File | Vai trò |
|------|---------|
| `Api/Controllers/BookingController.cs` | Nhận request, extract `userId` từ JWT claim `sub` |
| `Application/Modules/Booking/Commands/CreateBooking/CreateBookingCommand.cs` | DTO command: `UserId`, `MentorSlotId`, `Notes`, `IdempotencyKey` |
| `Application/Modules/Booking/Commands/CreateBooking/CreateBookingCommandHandler.cs` | **Business logic chính** |
| `Domain/Modules/Booking/Entities/Booking.cs` | Entity + method `CreateBooking()` |
| `Domain/Modules/Booking/Enums/BookingStatus.cs` | Enum trạng thái booking |

### Logic chi tiết (`CreateBookingCommandHandler`)

**Bước 1.1 — Idempotency check (Redis)**
```
key = "booking:idempotency:booking:user:{userId}:key:{idempotencyKey}"
→ GetAsync(key)
  ├─ Nếu tìm thấy bookingId:
  │   ├─ GetByIdAsync(bookingId) → check status == PendingPayment
  │   │   └─ Nếu vẫn PendingPayment → return bookingId ngay (idempotent)
  │   └─ Nếu Expired/Cancelled → RemoveAsync(key) → tiếp tục tạo mới
  └─ Nếu không có → tiếp tục
```
> **Tại sao cần validate lại?** Background job expire booking sau 15 phút nhưng không thể xóa Redis key (không biết client dùng key gì, TTL = 24h). Nếu không validate, user gửi lại request cũ sẽ nhận bookingId đã expired.

**Bước 1.2 — DB Transaction + Pessimistic Locking**
```sql
BEGIN TRANSACTION;

-- Kiểm tra booking trùng (fast fail)
SELECT EXISTS (...) WHERE user_id = @userId AND mentor_slot_id = @slotId AND status IN (1,2)

-- Khóa row mentor_slot để tránh race condition (concurrent booking)
SELECT * FROM mentor_slots WHERE id = @slotId FOR UPDATE

-- Validate slot còn chỗ
IF slot.Status != Available OR slot.CurrentBookings >= slot.MaxBookings → throw

-- Tạo booking
INSERT INTO bookings (status=1=PendingPayment, expires_at=now+15min, ...)

-- Cập nhật slot
UPDATE mentor_slots SET current_bookings = current_bookings + 1
-- Nếu đầy: SET status = FullyBooked

COMMIT;
```

**Bước 1.3 — Set idempotency cache**
```
SetAsync(key, booking.Id, TTL=24h)
```

**Bước 1.4 — Invalidate mentor cache**
```
RemoveAsync("mentor:detail:{mentorId}")
```
→ Lần sau GET mentor sẽ fetch lại từ DB với slot availability mới.

### Kết quả
- **Response**: `bookingId` (Guid)
- **DB**: 1 row trong `bookings` với `status = 1 (PendingPayment)`, `expires_at = now + 15 phút`
- **Redis**: idempotency key lưu `bookingId`, TTL 24h

---

## 4. Bước 2 — Tạo Payment Transaction & QR Code

### HTTP Request
```http
POST /api/payment
Authorization: Bearer {jwt}

{
  "bookingId": "..."
}
```

### File cần đọc
| File | Vai trò |
|------|---------|
| `Api/Controllers/Payment/PaymentController.cs` | Nhận request, extract userId từ JWT |
| `Application/Modules/Payment/Commands/CreatePayment/CreatePaymentCommand.cs` | Command DTO |
| `Application/Modules/Payment/Commands/CreatePayment/CreatePaymentCommandHandler.cs` | Business logic |
| `Application/Modules/Payment/DTOs/CreatePaymentDTO.cs` | Response DTO |
| `Application/Modules/Payment/Interfaces/ISepayService.cs` | Interface SePay service |
| `Infrastructure/Services/Payment/SepayService.cs` | Implement: build QR URL, generate orderCode |
| `Infrastructure/Persistence/Payment/SepayOptions.cs` | Config từ `appsettings.json` section `SePay` |

### Logic chi tiết (`CreatePaymentCommandHandler`)

**Bước 2.1 — Validate**
```
booking = GetByIdAsync(bookingId, include: MentorSlot)   ← include để lấy Price
├─ booking == null → NotFoundException
├─ booking.UserId != userId → UnauthorizedException
└─ booking.Status != PendingPayment → ValidationException
```

> **Tại sao cần include MentorSlot?** Booking entity không lưu amount trực tiếp — amount = `booking.MentorSlot.Price`. Nếu không include, sẽ NullReferenceException khi đọc Price.

**Bước 2.2 — Idempotency payment**
```
payment = GetByBookingIdAsync(bookingId)
├─ payment != null AND status == Pending AND expiredAt > now
│   → Return existing transaction (không tạo mới)
└─ Ngược lại → tạo mới
```
> **Tại sao?** User có thể bấm "Tạo QR" nhiều lần. Nếu transaction cũ còn hạn, trả về QR cũ.

**Bước 2.3 — Tạo OrderCode**
```csharp
orderCode = $"BK-{DateTime.UtcNow:yyyyMMddHHmmssfff}"
// Ví dụ: "BK-20260508120000123"
```
OrderCode là **khóa tra cứu** khi webhook đến — phải unique và nhúng trong nội dung QR.

**Bước 2.4 — Build QR URL**
```
https://qr.sepay.vn/img
  ?acc={AccountNumber}
  &bank={BankShortName}
  &amount={amount}
  &des={orderCode}        ← SePay sẽ parse field này
```
Field `des` (description) của QR là nơi chứa `orderCode`. Khi user quét và chuyển khoản, SePay lấy nội dung này và gửi về trong webhook.

**Bước 2.5 — Lưu DB**
```sql
INSERT INTO payment_transactions (
  booking_id, provider=SePay, provider_order_code=orderCode,
  amount, currency='VND', qr_code_url, expired_at=now+30min,
  status=1=Pending
)
```
> Lưu ý: `expired_at` của payment transaction là **30 phút** (trong khi booking expires sau **15 phút**). Logic webhook check cả hai — cái nào hết hạn trước thì tính.

### Response
```json
{
  "paymentTransactionId": "...",
  "providerOrderCode": "BK-20260508120000123",
  "amount": 200000,
  "currency": "VND",
  "qrCodeUrl": "https://qr.sepay.vn/img?acc=...&des=BK-20260508120000123",
  "expiredAt": "2026-05-08T12:30:00Z"
}
```

---

## 5. Bước 3 — User Chuyển Khoản

Đây là bước **ngoài hệ thống** — user mở app ngân hàng, quét QR, và thực hiện chuyển khoản.

**Điều gì xảy ra phía ngân hàng/SePay:**
1. User quét QR → app ngân hàng pre-fill: số tài khoản, ngân hàng, số tiền, **nội dung = orderCode**
2. User xác nhận → tiền chuyển từ tài khoản user sang tài khoản merchant
3. SePay nhận thông báo biến động số dư (từ bank webhook/polling)
4. SePay parse thông tin giao dịch → gọi webhook về hệ thống ta

**Lưu ý quan trọng về nội dung chuyển khoản:**
SePay format nội dung theo pattern: `{số_tham_chiếu}-{orderCode}-{mô_tả}-{...}`

Ví dụ: `128266361079-BK20260507200611699-CHUYEN TIEN-OQCH000BC6Jz`

Dấu `-` trong `BK-20260507200611699` bị "hòa tan" vào separator của SePay. Vì vậy SePay log `BK20260507200611699` (thiếu dash). Hệ thống xử lý việc này bằng regex normalize (xem Bước 4).

---

## 6. Bước 4 — SePay Gửi Webhook

### HTTP Request từ SePay
```http
POST /api/webhooks/sepay
Authorization: Apikey {WebhookApiKey}
Content-Type: application/json

{
  "id": 56255006,
  "gateway": "MBBank",
  "transactionDate": "2026-05-08 12:05:30",
  "accountNumber": "0976290389",
  "code": null,                              ← null nếu không cấu hình auto-detect
  "content": "128266-BK20260508120000123-CHUYEN TIEN",
  "transferType": "in",
  "transferAmount": 200000,
  "accumulated": 200000,
  "referenceCode": "...",
  "description": "..."
}
```

### File cần đọc
| File | Vai trò |
|------|---------|
| `Api/Controllers/Payment/WebhookSepayController.cs` | Nhận webhook, validate Apikey header |
| `Application/Modules/Payment/DTOs/SePayWebhookRequest.cs` | DTO map JSON payload |
| `Application/Modules/Payment/Commands/ProcessSepayWebhook/ProcessSePayWebhookCommandHandler.cs` | **Toàn bộ logic xử lý webhook** |
| `Infrastructure/Repositories/Payment/PaymentRepository.cs` | Query payment + booking bằng orderCode |
| `Infrastructure/Repositories/Payment/PaymentWebhookLogRepository.cs` | Check idempotency webhook |

### Logic chi tiết (`ProcessSePayWebhookCommandHandler`)

**Bước 4.1 — Validate Apikey (tại Controller)**
```csharp
var authorization = Request.Headers.Authorization.ToString();
// expected = "Apikey ZxaMIoEJCW5kn7yr..."
if (!string.Equals(authorization, expected)) return Unauthorized();
```
> Không dùng Bearer JWT — đây là server-to-server call từ SePay, không phải user. SePay cung cấp API key tĩnh.

**Bước 4.2 — Insert WebhookLog (trạng thái Received)**
```sql
INSERT INTO payment_webhook_logs (
  provider='SePay', external_reference='56255006',
  event_type='in', payload='{...raw json}',
  received_at=now, status=1=Received
)
```
> Log được insert **đầu tiên, trước mọi xử lý**. Dù sau đó có lỗi, vẫn có audit trail. Status sẽ được update thành `Processed`, `Ignored`, hoặc `Failed` ở cuối.

**Bước 4.3 — Idempotency check**
```sql
SELECT EXISTS (
  SELECT 1 FROM payment_webhook_logs
  WHERE provider = 'SePay'
    AND external_reference = '56255006'
    AND status = 2  -- Processed
)
```
> SePay có thể retry webhook nếu không nhận được 200 OK. Check này đảm bảo không xử lý cùng transaction 2 lần.

**Bước 4.4 — Validate TransferType**
```
payload.TransferType == "in"  →  tiếp tục
payload.TransferType == "out" →  Ignored (chuyển tiền đi, không phải nhận)
payload.TransferType == null  →  Ignored
```

**Bước 4.5 — Extract OrderCode (quan trọng nhất)**
```
1. Thử payload.Code trước (nếu SePay dashboard cấu hình auto-detect)
2. Nếu null/empty → fallback: extract từ payload.Content bằng regex

Regex pattern: \b(BK-?\w+)\b
  - Khớp "BK-20260508120000123" (có dash)
  - Khớp "BK20260508120000123"  (thiếu dash — SePay format issue)

Sau khi extract:
  - Normalize về UPPERCASE
  - Nếu thiếu dash sau prefix: chèn lại
    "BK20260508120000123" → "BK-20260508120000123"
```

Tại sao phải normalize?
```
DB lưu:       "BK-20260508120000123"   (từ GenerateSePayOrderCode())
SePay gửi:    "BK20260508120000123"    (mất dash do format separator)
→ Nếu không normalize → query DB không tìm thấy → Ignored thay vì Processed
```

File: `ProcessSePayWebhookCommandHandler.cs` → method `ExtractOrderCodeFromContent()`

**Bước 4.6 — Load PaymentTransaction + Booking**
```sql
SELECT p.*, b.*
FROM payment_transactions p
INNER JOIN bookings b ON p.booking_id = b.id
WHERE p.provider = 1  -- SePay
  AND p.provider_order_code = 'BK-20260508120000123'
  AND p.status = 1    -- Pending
LIMIT 1
```
> Chỉ query `status = Pending` — nếu đã Succeeded thì không tìm thấy → check tiếp ở bước sau.

**Bước 4.7 — Kiểm tra các điều kiện**
```
payment == null || payment.Booking == null
  → Ignored: "Payment not found for code '...'"

payment.Status == Succeeded
  → Ignored: đã xử lý rồi (trường hợp khác với idempotency ở bước 4.3)

payment.ExpiredAt <= now || booking.ExpiresAt <= now
  → payment.Status = Expired
  → Ignored: "Payment expired"

payload.TransferAmount < payment.Amount
  → payment.Status = Failed
  → Failed: "Insufficient amount"
```

**Bước 4.8 — Xác nhận thành công**
```csharp
payment.Status = PaymentStatus.Succeeded;
payment.ProviderTransactionId = payload.Id.ToString();  // "56255006"
payment.PaidAt = DateTime.UtcNow;
payment.RawCallbackData = rawPayload;                   // toàn bộ JSON từ SePay

payment.Booking.ConfirmBooking();
// → booking.Status = Confirmed
// → booking.ConfirmedAt = DateTime.UtcNow

webhookLog.Status = PaymentWebhookLogStatus.Processed;
webhookLog.ProcessedAt = DateTime.UtcNow;

await _unitOfWork.SaveChangesAsync();
```

**Kết quả sau SaveChanges:**
```sql
UPDATE payment_transactions SET status=2, paid_at=now, provider_transaction_id='56255006', ...
UPDATE bookings SET status=2, confirmed_at=now
UPDATE payment_webhook_logs SET status=2, processed_at=now
```

---

## 7. Bước 5 — Xác Nhận Thành Công

Sau khi webhook xử lý xong, frontend polling phát hiện trạng thái đã thay đổi.

### HTTP Request
```http
GET /api/payment/{bookingId}/status
Authorization: Bearer {jwt}
```

### File cần đọc
| File | Vai trò |
|------|---------|
| `Application/Modules/Payment/Queries/GetPaymentStatus/GetPaymentStatusQueryHandler.cs` | Đọc payment status theo bookingId |
| `Application/Modules/Payment/DTOs/PaymentStatusDTO.cs` | Response DTO |

### Response khi thành công
```json
{
  "paymentTransactionId": "...",
  "status": 2,
  "statusName": "Succeeded",
  "paidAt": "2026-05-08T12:05:45Z",
  "expiredAt": "2026-05-08T12:30:00Z",
  "failureReason": null
}
```

---

## 8. Background Job — Tự Động Hủy Booking Hết Hạn

### File cần đọc
| File | Vai trò |
|------|---------|
| `Infrastructure/Services/Background/ExpiredBookingCleanupJob.cs` | Hosted service chạy mỗi 1 phút |

### Logic

Chạy mỗi **1 phút** bằng `PeriodicTimer`:

```sql
-- Tìm booking hết hạn chưa thanh toán
SELECT * FROM bookings
WHERE status = 1          -- PendingPayment
  AND expires_at <= now()
```

Với mỗi expired booking:
```
1. booking.Status = Expired (5)
2. mentorSlot.CurrentBookings -= 1
3. Nếu slot từng FullyBooked → đổi lại Available
4. Invalidate cache mentor detail
```

**Tất cả trong 1 transaction** → atomic.

### Tại sao background job không xóa Redis idempotency key?

Job chạy ở Infrastructure layer và không biết `IdempotencyKey` string mà client đã dùng (đó là random key do client tạo, không lưu trong DB). Giải pháp: khi `CreateBookingCommandHandler` nhận cache hit, validate lại booking status trước khi return — nếu đã Expired thì evict key và tạo mới.

---

## 9. Frontend Polling — Kiểm Tra Trạng Thái

Frontend sau khi nhận QR URL sẽ **poll định kỳ** (ví dụ mỗi 3 giây) endpoint status:

```
GET /api/payment/{bookingId}/status
→ { status: "Pending" }     → hiển thị "Đang chờ thanh toán..."
→ { status: "Succeeded" }   → redirect sang trang "Đặt lịch thành công"
→ { status: "Expired" }     → thông báo "Giao dịch hết hạn, vui lòng tạo lại"
→ { status: "Failed" }      → thông báo lý do thất bại
```

**Dừng poll khi:** `status != Pending` hoặc quá `expiredAt`.

---

## 10. Bảng trạng thái và chuyển tiếp

### Booking (`BookingStatus`)
```
PendingPayment (1) ──[thanh toán thành công]──▶ Confirmed (2)
PendingPayment (1) ──[hết 15 phút, job chạy]──▶ Expired (5)
PendingPayment (1) ──[user tự hủy]────────────▶ Cancelled (3)
Confirmed (2)      ──[buổi học xong]──────────▶ Completed (4)
```

### PaymentTransaction (`PaymentStatus`)
```
Pending (1) ──[webhook: amount đủ, còn hạn]──▶ Succeeded (2)
Pending (1) ──[webhook: amount thiếu]─────────▶ Failed (3)
Pending (1) ──[webhook: đã hết hạn]───────────▶ Expired (4)
Pending (1) ──[user hủy booking]──────────────▶ Cancelled (5)
```

### PaymentWebhookLog (`PaymentWebhookLogStatus`)
```
Received (1) ──[xử lý thành công]──▶ Processed (2)
Received (1) ──[không match/bỏ qua]▶ Ignored (3)
Received (1) ──[exception]──────────▶ Failed (4)
```

---

## 11. Các cơ chế bảo vệ quan trọng

### 11.1 Pessimistic Locking (`FOR UPDATE`)
```sql
SELECT * FROM mentor_slots WHERE id = @slotId FOR UPDATE
```
Khi 2 user đặt cùng 1 slot cùng lúc, `FOR UPDATE` lock row lại. User thứ 2 phải đợi transaction của user 1 commit/rollback trước khi tiếp tục → tránh overbooking.

File: `Infrastructure/Repositories/MentorSlot/MentorSlotRepository.cs` → `GetSlotByIdForUpdateAsync()`

### 11.2 Webhook Idempotency
SePay retry webhook nếu không nhận 200 OK trong vòng N giây. Check:
```sql
SELECT EXISTS (...WHERE external_reference = @id AND status = 2)
```
Nếu đã `Processed` → trả về `Ignored` ngay, không re-process.

### 11.3 Booking Idempotency (Redis)
Header `Idempotency-Key` từ client. Nếu network timeout khiến client gửi lại request, server trả về cùng `bookingId` thay vì tạo booking mới.

### 11.4 Active Booking Check
```sql
SELECT EXISTS (...WHERE user_id = @userId AND mentor_slot_id = @slotId AND status IN (1, 2))
```
Tránh user đặt cùng 1 slot 2 lần (một lần đang PendingPayment + một lần mới).

### 11.5 Webhook Apikey Authentication
```
Authorization: Apikey {key từ appsettings SePay:WebhookApiKey}
```
Không dùng JWT — đây là M2M call. Nếu không khớp → 401 Unauthorized ngay tại controller.

### 11.6 Null Safety cho `payload.Code`
SePay chỉ tự parse `code` nếu tài khoản ngân hàng được cấu hình "auto-detect" trong dashboard SePay. Trong hầu hết trường hợp, `code = null`. Hệ thống luôn fallback sang extract từ `content`.

---

## 12. Edge Cases & Cách Xử Lý

| Tình huống | Hành vi hệ thống |
|-----------|-----------------|
| User gọi `POST /api/payment` 2 lần cho cùng booking | Lần 2 trả về transaction cũ nếu còn Pending và chưa hết hạn |
| SePay gửi webhook 2 lần (retry) | Lần 2 detect `alreadyProcessed = true` → Ignored, không re-update DB |
| Booking hết 15 phút nhưng webhook đến sau | Check `booking.ExpiresAt <= now` → payment.Status = Expired |
| User chuyển thiếu tiền | `transferAmount < payment.Amount` → payment.Status = Failed |
| `payload.Code` null | Fallback regex extract từ `payload.Content` |
| orderCode trong content thiếu dash | Regex `-?` → match + normalize về `BK-XXXX` |
| Booking expired nhưng idempotency key còn trong Redis | Validate booking.Status khi cache hit → evict key → tạo booking mới |
| Concurrent booking cùng slot | `FOR UPDATE` + unique check đảm bảo chỉ 1 booking thành công |
| `payment.Booking == null` (booking bị soft-delete) | Check `payment.Booking == null` → Ignored |

---

## 13. Cấu hình SePay

File: `appsettings.Development.json` / `appsettings.json`

```json
"SePay": {
  "BankShortName": "MBBank",
  "AccountNumber": "0976290389",
  "AccountName": "TRAN NHAT NAM",
  "WebhookApiKey": "ZxaMIoEJCW5k...",
  "QrBaseUrl": "https://qr.sepay.vn/img",
  "PaymentCodePrefix": "BK"
}
```

| Field | Dùng ở đâu |
|-------|------------|
| `BankShortName` | Build QR URL (`?bank=MBBank`) |
| `AccountNumber` | Build QR URL (`?acc=0976...`) |
| `WebhookApiKey` | Controller validate header `Authorization: Apikey {key}` |
| `QrBaseUrl` | Base URL của SePay QR image service |
| `PaymentCodePrefix` | Prefix orderCode (`BK-...`) + regex extract orderCode từ content |

---

## 14. Index file cần đọc

### Domain (quy tắc nghiệp vụ)
```
Domain/Modules/Booking/Entities/Booking.cs              → Entity, CreateBooking(), ConfirmBooking(), CancelBooking()
Domain/Modules/Booking/Enums/BookingStatus.cs            → PendingPayment, Confirmed, Cancelled, Completed, Expired
Domain/Modules/Payments/Enums/PaymentStatus.cs           → Pending, Succeeded, Failed, Expired, Cancelled
Domain/Modules/Payments/Enums/PaymentWebhookLogStatus.cs → Received, Processed, Ignored, Failed
Domain/Modules/Payments/Enums/PaymentProvider.cs         → Mock, SePay, VNPay
```

### Application (business logic)
```
Application/Modules/Booking/Commands/CreateBooking/CreateBookingCommandHandler.cs
Application/Modules/Payment/Commands/CreatePayment/CreatePaymentCommandHandler.cs
Application/Modules/Payment/Commands/ProcessSepayWebhook/ProcessSePayWebhookCommandHandler.cs
Application/Modules/Payment/Queries/GetPaymentStatus/GetPaymentStatusQueryHandler.cs
Application/Modules/Payment/Interfaces/ISepayService.cs
Application/Common/Constants/CacheKeys.cs
```

### Infrastructure (kết nối bên ngoài)
```
Infrastructure/Services/Payment/SepayService.cs              → GenerateQrUrl(), GenerateSePayOrderCode()
Infrastructure/Persistence/Payment/SepayOptions.cs           → Config model
Infrastructure/Repositories/Payment/PaymentRepository.cs     → GetPendingByProviderOrderCodeWithBookingAsync()
Infrastructure/Repositories/Payment/PaymentWebhookLogRepository.cs → ExistsProcessedAsync()
Infrastructure/Services/Background/ExpiredBookingCleanupJob.cs
Infrastructure/Persistence/GenericRepository.cs              → GetByIdAsync(), AddAsync(), v.v.
Infrastructure/Persistence/UnitOfWork.cs                     → BeginTransaction, SaveChanges, Commit/Rollback
```

### API (HTTP interface)
```
Api/Controllers/BookingController.cs
Api/Controllers/Payment/PaymentController.cs
Api/Controllers/Payment/WebhookSepayController.cs
Api/appsettings.Development.json                             → SePay config, Redis, DB connection
```
