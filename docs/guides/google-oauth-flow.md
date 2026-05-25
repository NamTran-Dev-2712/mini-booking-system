# Google OAuth Login — Flow Documentation

## Tổng quan

Hệ thống sử dụng **OAuth 2.0 Authorization Code Flow** (server-side) để đăng nhập với Google. Đây là flow an toàn nhất vì:
- Client Secret không bao giờ lộ ra frontend
- Code exchange xảy ra server-to-server
- Token Google không bao giờ đến browser

Sau khi xác thực với Google, hệ thống tự phát hành JWT riêng (giống login bằng email/password) và lưu vào httpOnly cookie.

---

## Sequence Diagram

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  Browser │     │ Backend  │     │  Google  │     │    DB    │
└────┬─────┘     └────┬─────┘     └────┬─────┘     └────┬─────┘
     │                 │                 │                 │
     │ 1. Click "Google" button          │                 │
     │────────────────>│                 │                 │
     │                 │                 │                 │
     │ 2. GET /api/auth/google           │                 │
     │  (redirect 302) │                 │                 │
     │<────────────────│                 │                 │
     │                 │                 │                 │
     │ 3. Redirect to Google consent     │                 │
     │────────────────────────────────-->│                 │
     │                 │                 │                 │
     │ 4. User grants permission         │                 │
     │<──────────────────────────────────│                 │
     │                 │                 │                 │
     │ 5. Google redirects to /signin-google?code=xxx      │
     │────────────────>│                 │                 │
     │                 │                 │                 │
     │                 │ 6. Exchange code for tokens        │
     │                 │────────────────>│                 │
     │                 │<────────────────│                 │
     │                 │                 │                 │
     │                 │ 7. Middleware tạo external cookie  │
     │                 │    rồi redirect đến /api/auth/google/callback
     │                 │                 │                 │
     │ 8. GET /api/auth/google/callback  │                 │
     │────────────────>│                 │                 │
     │                 │                 │                 │
     │                 │ 9. Đọc external cookie, extract claims
     │                 │ 10. Tìm/tạo user trong DB         │
     │                 │────────────────────────────────-->│
     │                 │<─────────────────────────────────│
     │                 │                 │                 │
     │                 │ 11. Phát hành JWT + Refresh Token │
     │                 │ 12. Set httpOnly cookies           │
     │                 │ 13. Xóa external cookie            │
     │                 │                 │                 │
     │ 14. Redirect về frontend (dashboard hoặc complete-profile)
     │<────────────────│                 │                 │
     │                 │                 │                 │
```

---

## Chi tiết từng bước

### Bước 1: Frontend — Click nút Google

**File:** `web/app/features/auth/shared/social.form.tsx`

```tsx
onClick={() => {
  authService.initiateGoogleLogin();
}}
```

**File:** `web/app/services/auth/auth.service.ts`

```ts
initiateGoogleLogin(): void {
  window.location.href = `${apiClient.defaults.baseURL}/api/auth/google`;
}
```

**Tại sao dùng `window.location.href` thay vì axios?**
- OAuth flow yêu cầu browser redirect (302) đến Google consent page
- Không thể dùng AJAX/fetch vì Google consent là full-page redirect
- Browser cần navigate trực tiếp đến URL của backend

---

### Bước 2: Backend — Initiate Challenge

**File:** `api/src/MiniBookingSystem.Api/Controllers/AuthController.cs`

```csharp
[HttpGet("google")]
public IActionResult GoogleLogin()
{
    var redirectUrl = Url.Action(nameof(GoogleCallback), "Auth", null, Request.Scheme)!;
    var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
    return Challenge(properties, "Google");
}
```

**Giải thích:**
- `Challenge("Google")` — yêu cầu ASP.NET Core authentication middleware xử lý Google scheme
- `RedirectUri` — URL mà middleware sẽ redirect đến SAU KHI hoàn tất OAuth (bước 8)
- Middleware tự động build Google authorization URL với `client_id`, `redirect_uri` (`/signin-google`), `scope`, `state` (CSRF protection)
- Trả về 302 redirect đến `https://accounts.google.com/o/oauth2/v2/auth?...`

---

### Bước 3-4: Google Consent

- Browser hiển thị Google consent screen
- User chọn tài khoản và cho phép truy cập email + profile
- Google redirect về `http://localhost:5296/signin-google?code=xxx&state=yyy`

---

### Bước 5-7: Middleware xử lý callback

**File:** `api/src/MiniBookingSystem.Infrastructure/DependencyInjection.cs`

```csharp
.AddCookie("Identity.External", options =>
{
    options.Cookie.Name = "ExternalLogin";
    options.ExpireTimeSpan = TimeSpan.FromMinutes(5);
})
.AddGoogle(options =>
{
    options.ClientId = configuration["Google:ClientId"]!;
    options.ClientSecret = configuration["Google:ClientSecret"]!;
    options.SignInScheme = "Identity.External";
    options.CallbackPath = "/signin-google";
});
```

**Giải thích từng config:**

| Config | Giá trị | Tại sao |
|--------|---------|---------|
| `ClientId` | Từ Google Cloud Console | Định danh app của bạn với Google |
| `ClientSecret` | Từ Google Cloud Console | Dùng để exchange code → token (server-side, không lộ ra client) |
| `SignInScheme` | `"Identity.External"` | Sau khi verify Google token, middleware lưu claims vào cookie scheme này (tạm thời) |
| `CallbackPath` | `/signin-google` | Path mà Google redirect về. Middleware tự intercept request này TRƯỚC KHI đến controller |

**Tại sao `CallbackPath` là `/signin-google` mà không phải `/api/auth/google/callback`?**
- `CallbackPath` là path mà Google OAuth middleware TỰ HANDLE (intercept trước pipeline)
- Nếu trùng với controller route → conflict, middleware và controller cùng cố xử lý request
- `/signin-google` là convention path riêng cho middleware, controller endpoint `/api/auth/google/callback` là nơi TA xử lý logic sau đó

**Flow nội bộ của middleware tại `/signin-google`:**
1. Nhận `?code=xxx&state=yyy` từ Google
2. Validate `state` (CSRF protection — so sánh với state đã lưu trong cookie lúc Challenge)
3. Exchange `code` → `access_token` + `id_token` (server-to-server call đến Google)
4. Parse claims từ id_token (email, name, picture, sub)
5. Tạo `ClaimsPrincipal` và sign-in vào `Identity.External` cookie scheme
6. Redirect đến `RedirectUri` đã set ở bước 2 (`/api/auth/google/callback`)

**Tại sao dùng external cookie thay vì xử lý trực tiếp?**
- Đây là pattern chuẩn của ASP.NET Core: tách biệt "xác thực bên ngoài" và "phát hành token nội bộ"
- External cookie chỉ sống 5 phút, chứa claims tạm thời
- Controller endpoint đọc cookie này, xử lý business logic (tạo user, link account), rồi phát hành JWT riêng
- Sau đó xóa external cookie (không cần nữa)

---

### Bước 8-13: Controller xử lý callback

**File:** `api/src/MiniBookingSystem.Api/Controllers/AuthController.cs`

```csharp
[HttpGet("google/callback")]
public async Task<IActionResult> GoogleCallback(CancellationToken cancellationToken)
{
    var frontendUrl = _configuration["BaseUrl:Frontend"] ?? "http://localhost:5173";

    // 1. Đọc external cookie
    var result = await HttpContext.AuthenticateAsync("Identity.External");
    if (!result.Succeeded)
        return Redirect($"{frontendUrl}/login?error=google_failed");

    // 2. Extract claims từ Google
    var principal = result.Principal!;
    var email = principal.FindFirstValue(ClaimTypes.Email);
    var name = principal.FindFirstValue(ClaimTypes.Name);
    var avatarUrl = principal.FindFirstValue("urn:google:picture")
        ?? principal.FindFirstValue("picture");
    var googleUserId = principal.FindFirstValue(ClaimTypes.NameIdentifier)!;

    // 3. Business logic: tìm/tạo user, phát hành JWT
    var authResult = await _mediator.Send(
        new GoogleLoginCommand(email, name, avatarUrl, googleUserId),
        cancellationToken
    );

    // 4. Set JWT cookies (giống login thường)
    SetAuthCookie(
        authResult.AccessToken,
        authResult.RefreshToken,
        authResult.ExpiresIn,
        authResult.RefreshTokenExpiresAt
    );

    // 5. Xóa external cookie (không cần nữa)
    await HttpContext.SignOutAsync("Identity.External");

    // 6. Redirect về frontend
    if (authResult.RequiresProfileCompletion)
        return Redirect($"{frontendUrl}/auth/complete-profile");

    var role = authResult.Roles.FirstOrDefault() ?? "User";
    var dashboard = role switch { "Admin" => "/admin", "Mentor" => "/mentor", _ => "/user" };
    return Redirect($"{frontendUrl}{dashboard}");
}
```

**Giải thích:**
- `AuthenticateAsync("Identity.External")` — đọc claims từ external cookie mà middleware đã tạo
- Extract email, name, avatar, googleUserId từ claims
- Gửi `GoogleLoginCommand` qua MediatR → handler gọi `IdentityService.GoogleLoginAsync`
- Set JWT vào httpOnly cookie (giống hệt flow login bằng password)
- Xóa external cookie vì đã hoàn tất
- Redirect về frontend dựa trên trạng thái user

---

### Business Logic: GoogleLoginAsync

**File:** `api/src/MiniBookingSystem.Infrastructure/Identity/IdentityService.cs`

```csharp
public async Task<AuthResult> GoogleLoginAsync(...)
{
    // 1. Tìm user đã link Google
    var user = await _userManager.FindByLoginAsync("Google", googleUserId);

    if (user is null)
    {
        // 2. Tìm user có cùng email (auto-link)
        user = await _userManager.FindByEmailAsync(email);

        if (user is not null)
        {
            // Auto-link: user đã đăng ký bằng email/password, giờ thêm Google login
            await _userManager.AddLoginAsync(user, new UserLoginInfo("Google", googleUserId, "Google"));
        }
        else
        {
            // 3. Tạo user mới (OAuth-only, không có password)
            user = new ApplicationUser { ... };
            await _userManager.CreateAsync(user); // Không truyền password
            await _userManager.AddToRoleAsync(user, "User");
            await _userManager.AddLoginAsync(user, new UserLoginInfo("Google", googleUserId, "Google"));
        }
    }

    // 4. Phát hành JWT (giống login thường)
    var roles = await _userManager.GetRolesAsync(user);
    var tokenResult = await _tokenService.GenerateTokensAsync(...);
    await _refreshTokenRepository.UpdateRefreshTokenAsync(...);

    // 5. Check phone number
    var requiresProfileCompletion = string.IsNullOrEmpty(user.PhoneNumber);

    return new AuthResult(..., RequiresProfileCompletion: requiresProfileCompletion);
}
```

**3 scenarios:**

| Scenario | Hành vi |
|----------|---------|
| User đã link Google trước đó | Login trực tiếp, skip tạo/link |
| Email trùng với account có sẵn | Auto-link Google vào account đó (user có thể login bằng cả 2 cách) |
| Email hoàn toàn mới | Tạo user mới, không có password, chỉ login được qua Google |

**Tại sao auto-link thay vì reject?**
- UX tốt hơn: user không cần nhớ mình đã đăng ký bằng cách nào
- An toàn vì Google đã verify email ownership
- User có thể dùng cả password lẫn Google để login

**Tại sao `CreateAsync(user)` không truyền password?**
- User OAuth-only không cần password
- `PasswordHash` sẽ là `null` trong DB
- Nếu user muốn thêm password sau, có thể dùng "Set Password" flow (khác với "Change Password")

---

### Bước 14: Complete Profile (nếu cần)

**Tại sao cần Complete Profile?**
- Google không trả về phone number
- Hệ thống yêu cầu phone number cho booking (liên hệ mentor/user)
- Thay vì bỏ constraint phone number hoàn toàn, ta yêu cầu user bổ sung sau lần đăng nhập đầu

**Database change:**

**File:** `api/src/MiniBookingSystem.Infrastructure/Persistence/Configurations/Auth/ApplicationUserConfiguration.cs`

```csharp
// Trước: PhoneNumber bắt buộc
builder.Property(u => u.PhoneNumber).IsRequired().HasMaxLength(15);
builder.HasIndex(u => u.PhoneNumber).IsUnique().HasFilter("is_deleted = false");

// Sau: PhoneNumber optional, unique index chỉ áp dụng khi NOT NULL
builder.Property(u => u.PhoneNumber).HasMaxLength(15);
builder.HasIndex(u => u.PhoneNumber).IsUnique()
    .HasFilter("phone_number IS NOT NULL AND is_deleted = false");
```

**Tại sao filter thêm `phone_number IS NOT NULL`?**
- Nhiều user Google mới sẽ có `phone_number = NULL`
- Unique index trên NULL values sẽ conflict (PostgreSQL cho phép multiple NULLs trong unique index, nhưng explicit filter rõ ràng hơn)
- Chỉ enforce uniqueness khi user đã nhập phone

---

### Frontend: Complete Profile Flow

**File:** `web/app/features/auth/complete-profile/complete-profile.hook.ts`

```ts
async function onSubmit(data: CompleteProfileFormData) {
  // 1. Gọi API update phone number
  await authService.completeProfile({ phoneNumber: data.phoneNumber });

  // 2. Fetch profile mới (có phone number)
  const profile = await authService.getProfile();

  // 3. Update Zustand store
  setUser({ ... });

  // 4. Redirect đến dashboard
  window.location.href = ROLE_REDIRECT[primaryRole] ?? "/user";
}
```

**Tại sao dùng `window.location.href` thay vì React Router `navigate()`?**
- `navigate()` là client-side routing — không reload page
- Sau khi `setUser()`, store persist vào localStorage (async)
- Dashboard route có guard `requireRole("User")` → rehydrate store từ localStorage
- Nếu dùng `navigate()`, guard có thể chạy TRƯỚC KHI localStorage persist xong → redirect về login
- `window.location.href` force full page reload → đảm bảo localStorage đã có data → guard rehydrate thành công

---

### Routing: Tại sao complete-profile nằm ngoài auth layout?

**File:** `web/app/routes.ts`

```ts
// Auth layout có guard: redirectIfAuthenticated
layout("routes/auth/_layout.tsx", [
  route("login", ...),
  route("register", ...),
  ...
]),

// Complete-profile nằm NGOÀI auth layout
route("auth/complete-profile", "routes/auth/complete-profile.tsx"),
```

**File:** `web/app/routes/auth/_layout.tsx`

```tsx
export const clientLoader = redirectIfAuthenticated;
```

**Vấn đề:** Sau Google callback, user đã có JWT cookie → nếu complete-profile nằm trong auth layout → `redirectIfAuthenticated` sẽ redirect user ra dashboard (nhưng store chưa có data vì chưa gọi `setUser`).

**Giải pháp:** Tách complete-profile ra ngoài auth layout → không bị guard block.

---

## Cấu hình cần thiết

### Google Cloud Console

1. Tạo project tại https://console.cloud.google.com
2. Enable "Google+ API" hoặc "Google Identity"
3. Tạo OAuth 2.0 credentials (Web application)
4. Set **Authorized redirect URIs**: `http://localhost:5296/signin-google`
5. Copy Client ID và Client Secret

### appsettings.json

```json
{
  "Google": {
    "ClientId": "your-client-id.apps.googleusercontent.com",
    "ClientSecret": "your-client-secret"
  }
}
```

### Production

- Dùng environment variables: `Google__ClientId`, `Google__ClientSecret`
- Đổi redirect URI thành domain production: `https://api.yourdomain.com/signin-google`

---

## Bảng tóm tắt các file thay đổi

| File | Vai trò |
|------|---------|
| `Infrastructure/DependencyInjection.cs` | Đăng ký Google auth scheme + external cookie |
| `Api/Controllers/AuthController.cs` | 3 endpoints: google, google/callback, complete-profile |
| `Application/Auth/Commands/GoogleLogin/` | CQRS command + handler |
| `Application/Auth/Commands/CompleteProfile/` | CQRS command + handler + validator |
| `Application/Auth/DTOs/AuthResultDTO.cs` | Thêm `RequiresProfileCompletion` flag |
| `Application/Auth/DTOs/CompleteProfileRequest.cs` | Request DTO cho complete-profile |
| `Application/Auth/Interfaces/IIdentityService.cs` | Thêm 2 methods mới |
| `Infrastructure/Identity/IdentityService.cs` | Implement GoogleLoginAsync + CompleteProfileAsync |
| `Infrastructure/Persistence/Configurations/Auth/ApplicationUserConfiguration.cs` | PhoneNumber optional + filter index |
| `Migration: MakePhoneNumberOptional` | Alter column + recreate index |
| `web/app/services/auth/auth.service.ts` | Thêm initiateGoogleLogin + completeProfile |
| `web/app/features/auth/shared/social.form.tsx` | Wire Google button |
| `web/app/features/auth/complete-profile/` | Page + Form + Hook + Schema |
| `web/app/routes/auth/complete-profile.tsx` | Route file |
| `web/app/routes.ts` | Register route ngoài auth layout |

---

## Security Considerations

1. **CSRF Protection**: Google OAuth middleware tự tạo `state` parameter và validate khi callback
2. **httpOnly Cookies**: JWT không bao giờ accessible từ JavaScript
3. **External Cookie TTL**: Chỉ sống 5 phút, tự expire nếu flow bị gián đoạn
4. **Server-side code exchange**: Client Secret không lộ ra browser
5. **Email verification**: Google đã verify email → ta set `EmailConfirmed = true`
6. **Auto-link safety**: Chỉ link khi Google đã verify email ownership
