# Hướng dẫn Unit Test — Mini Booking System

> Tài liệu này giải thích toàn bộ cách bộ test được xây dựng, cách chạy, cách mở rộng, và tại sao mỗi thứ được làm theo cách đó. Đọc từ đầu đến cuối nếu bạn chưa có kinh nghiệm viết test.

---

## Mục lục

1. [Tại sao cần viết test?](#1-tại-sao-cần-viết-test)
2. [Các công cụ được sử dụng](#2-các-công-cụ-được-sử-dụng)
3. [Cấu trúc thư mục](#3-cấu-trúc-thư-mục)
4. [Cách cài đặt và chạy test](#4-cách-cài-đặt-và-chạy-test)
5. [Cấu hình project (.csproj và GlobalUsings)](#5-cấu-hình-project-csproj-và-globalusings)
6. [Nền tảng cơ chế: AAA Pattern](#6-nền-tảng-cơ-chế-aaa-pattern)
7. [Quy tắc đặt tên test](#7-quy-tắc-đặt-tên-test)
8. [Infrastructure hỗ trợ test (Helpers & Builders)](#8-infrastructure-hỗ-trợ-test-helpers--builders)
9. [Loại test 1: Handler Tests (Application layer)](#9-loại-test-1-handler-tests-application-layer)
10. [Loại test 2: Validator Tests](#10-loại-test-2-validator-tests)
11. [Loại test 3: Infrastructure Tests (IdentityService)](#11-loại-test-3-infrastructure-tests-identityservice)
12. [Tổng kết số lượng test hiện tại](#12-tổng-kết-số-lượng-test-hiện-tại)
13. [Hướng dẫn mở rộng: Viết test cho module mới](#13-hướng-dẫn-mở-rộng-viết-test-cho-module-mới)
14. [Các lỗi phổ biến và cách tránh](#14-các-lỗi-phổ-biến-và-cách-tránh)

---

## 1. Tại sao cần viết test?

Unit test là lớp kiểm tra tự động chạy trên từng đơn vị code nhỏ (một class, một method) một cách **hoàn toàn cô lập** với database, mạng, hay các hệ thống bên ngoài.

**Lợi ích thực tế:**
- Bắt bug ngay tại chỗ vừa viết code, thay vì phát hiện sau khi deploy.
- Khi sửa code cũ, chạy lại test để đảm bảo không làm hỏng tính năng khác (regression).
- Tài liệu "sống" — đọc test case hiểu ngay class đó hoạt động như thế nào trong các tình huống khác nhau.

**Đây là Unit Test, không phải Integration Test:**
- Unit test **KHÔNG** kết nối database thật, không gọi API thật.
- Tất cả các phụ thuộc bên ngoài (database, service khác) đều bị **thay thế bằng đối tượng giả (mock)**.

---

## 2. Các công cụ được sử dụng

| Công cụ | Vai trò | Phiên bản |
|---|---|---|
| **xUnit** | Framework test — cung cấp `[Fact]`, `[Theory]`, runner | 2.9.3 |
| **Moq** | Tạo mock object — giả lập interface/dependency | 4.20.72 |
| **FluentAssertions** | Viết assertion dễ đọc theo dạng tiếng Anh tự nhiên | 8.3.0 |
| **FluentValidation.TestHelper** | Namespace trong FluentValidation — test validator rules | (tích hợp sẵn) |
| **coverlet.collector** | Thu thập code coverage khi chạy test | 6.0.4 |

### xUnit — `[Fact]` vs `[Theory]`

```csharp
// [Fact] — chạy đúng 1 lần với 1 kịch bản cố định
[Fact]
public async Task Handle_WithValidCredentials_ReturnsAuthResult() { ... }

// [Theory] + [InlineData] — chạy nhiều lần với nhiều bộ dữ liệu khác nhau
[Theory]
[InlineData("")]
[InlineData("   ")]
public void Validate_WhenEmailIsEmpty_HasRequiredError(string email) { ... }
```

> Dùng `[Theory]` khi bạn muốn kiểm tra cùng một logic nhưng với nhiều input khác nhau — tránh copy-paste nhiều test giống nhau.

### Moq — Tạo đối tượng giả

```csharp
// Tạo mock của một interface
var identityService = new Mock<IIdentityService>(MockBehavior.Strict);

// Cấu hình: "Khi gọi LoginAsync với email X và password Y thì trả về Z"
identityService
    .Setup(s => s.LoginAsync("user@example.com", "P@ssw0rd!", It.IsAny<CancellationToken>()))
    .ReturnsAsync(someAuthResult);

// Xác nhận: "LoginAsync phải được gọi đúng 1 lần"
identityService.Verify(
    s => s.LoginAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()),
    Times.Once);
```

> `MockBehavior.Strict` = bất kỳ method nào được gọi mà CHƯA được `.Setup()` sẽ ném exception ngay. Điều này giúp phát hiện các cuộc gọi ngoài ý muốn.

### FluentAssertions — Assertion dễ đọc

```csharp
// Thay vì:
Assert.Equal(expected, result);

// Dùng:
result.Should().BeEquivalentTo(expected);

// Kiểm tra exception async:
await act.Should().ThrowAsync<UnauthorizedException>()
    .WithMessage("Invalid email or password.");
```

---

## 3. Cấu trúc thư mục

```
tests/
└── MiniBookingSystem.UnitTests/
    │
    ├── MiniBookingSystem.UnitTests.csproj   ← Cấu hình project test
    ├── GlobalUsings.cs                      ← using toàn cục, dùng mọi nơi
    │
    ├── Common/
    │   ├── Builders/
    │   │   └── AuthTestData.cs              ← Dữ liệu test tập trung (1 nguồn sự thật)
    │   └── Helpers/
    │       ├── AsyncQueryHelper.cs          ← Hỗ trợ EF Core async (AnyAsync, FirstOrDefaultAsync)
    │       └── UserManagerMockHelper.cs     ← Factory tạo mock UserManager
    │
    ├── Application/
    │   └── Auth/
    │       ├── Commands/
    │       │   ├── LoginCommandHandlerTests.cs
    │       │   ├── RegisterCommandHandlerTests.cs
    │       │   └── RefreshTokenCommandHandlerTests.cs
    │       ├── Queries/
    │       │   └── GetProfileQueryHandlerTests.cs
    │       └── Validators/
    │           ├── LoginValidatorTests.cs
    │           └── RegisterValidatorTests.cs
    │
    └── Infrastructure/
        └── Identity/
            └── IdentityServiceTests.cs
```

**Quy tắc cấu trúc:** Cấu trúc thư mục test **phản chiếu** cấu trúc source code:
- Source: `src/MiniBookingSystem.Application/Modules/Auth/Commands/LoginCommand.cs`
- Test:   `tests/.../Application/Auth/Commands/LoginCommandHandlerTests.cs`

---

## 4. Cách cài đặt và chạy test

### Yêu cầu
- .NET 10 SDK (`dotnet --version` phải >= 10.x)

### Chạy tất cả test

```powershell
# Từ thư mục /api
cd api
dotnet test tests/MiniBookingSystem.UnitTests/MiniBookingSystem.UnitTests.csproj
```

### Chạy với verbosity chi tiết (thấy tên từng test)

```powershell
dotnet test tests/MiniBookingSystem.UnitTests/MiniBookingSystem.UnitTests.csproj --verbosity normal
```

### Chạy một test cụ thể theo tên

```powershell
dotnet test --filter "Handle_WithValidCredentials_ReturnsAuthResult"
```

### Chạy tất cả test trong một class

```powershell
dotnet test --filter "FullyQualifiedName~LoginCommandHandlerTests"
```

### Xem code coverage

```powershell
dotnet test --collect:"XPlat Code Coverage"
# File coverage.xml được tạo trong thư mục TestResults/
```

### Chạy trong VS Code
- Mở Test Explorer: `Ctrl+Shift+P` → "Testing: Open Test Explorer"
- Nhấn nút ▶ bên cạnh test để chạy từng test
- Nhấn nút 🔴 bên cạnh test để debug (đặt breakpoint được)

---

## 5. Cấu hình project (.csproj và GlobalUsings)

### File `.csproj` — Khai báo dependencies

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <IsTestProject>true</IsTestProject>   <!-- Đánh dấu đây là project test -->
  </PropertyGroup>

  <!-- Cần thiết để mock UserManager (ASP.NET Core Identity) -->
  <ItemGroup>
    <FrameworkReference Include="Microsoft.AspNetCore.App" />
  </ItemGroup>

  <!-- Test packages -->
  <ItemGroup>
    <PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.13.0" />
    <PackageReference Include="xunit" Version="2.9.3" />
    <PackageReference Include="xunit.runner.visualstudio" Version="2.8.2" />
    <PackageReference Include="Moq" Version="4.20.72" />
    <PackageReference Include="FluentAssertions" Version="8.3.0" />
  </ItemGroup>

  <!-- Tham chiếu đến source project cần test -->
  <ItemGroup>
    <ProjectReference Include="..\..\src\MiniBookingSystem.Application\..." />
    <ProjectReference Include="..\..\src\MiniBookingSystem.Infrastructure\..." />
  </ItemGroup>
</Project>
```

### File `GlobalUsings.cs` — Import toàn cục

```csharp
// Thay vì phải viết "using FluentAssertions;" ở đầu mỗi file test,
// khai báo 1 lần ở đây là dùng được ở toàn bộ project.

global using FluentAssertions;
global using FluentValidation.TestHelper;    // Namespace trong FluentValidation.dll
global using Moq;
global using Xunit;
global using MiniBookingSystem.UnitTests.Common.Builders;   // AuthTestData
global using MiniBookingSystem.UnitTests.Common.Helpers;    // AsyncQueryableExtensions
global using MiniBookingSystem.Application.Common.Constants; // ApplicationRoles
global using Microsoft.AspNetCore.Identity;  // IdentityResult, ApplicationUser...
```

> `FluentValidation.TestHelper` là **namespace** trong package FluentValidation chính, không phải package riêng. Đừng cài thêm `FluentValidation.TestHelper` từ NuGet vì nó không tồn tại.

---

## 6. Nền tảng cơ chế: AAA Pattern

Mọi test đều tuân theo cấu trúc **Arrange → Act → Assert**:

```csharp
[Fact]
public async Task Handle_WithValidCredentials_ReturnsAuthResult()
{
    // ── Arrange ─────────────────────────────────────────────────────
    // Chuẩn bị: tạo dữ liệu đầu vào, cấu hình mock, kết quả mong đợi
    var command = new LoginCommand(AuthTestData.Valid.Email, AuthTestData.Valid.Password);
    var expected = AuthTestData.BuildAuthResult();

    _identityService
        .Setup(s => s.LoginAsync(command.Email, command.Password, It.IsAny<CancellationToken>()))
        .ReturnsAsync(expected);

    // ── Act ──────────────────────────────────────────────────────────
    // Thực thi: gọi đúng method cần test
    var result = await _sut.Handle(command, CancellationToken.None);

    // ── Assert ───────────────────────────────────────────────────────
    // Kiểm tra: kết quả có đúng như mong đợi không
    result.Should().BeEquivalentTo(expected);
}
```

- **`_sut`** = *System Under Test* — đây là object thật cần kiểm tra, không phải mock.
- Tất cả **phụ thuộc của `_sut`** mới là mock.

---

## 7. Quy tắc đặt tên test

Tên test phải tự mô tả được kịch bản mà không cần đọc code bên trong. Format:

```
MethodName_WhenCondition_ExpectedOutcome
```

| Ví dụ tên test | Ý nghĩa |
|---|---|
| `Handle_WithValidCredentials_ReturnsAuthResult` | Khi đăng nhập đúng → trả về AuthResult |
| `Handle_WhenUserNotFound_PropagatesUnauthorizedException` | Khi user không tồn tại → ném UnauthorizedException |
| `Validate_WhenEmailIsEmpty_HasRequiredError` | Khi email rỗng → có lỗi "required" |
| `RegisterAsync_WhenAddToRoleFails_ThrowsBadRequestAndRollsBackUser` | Khi gán role lỗi → ném BadRequest VÀ xóa user đã tạo (rollback) |

---

## 8. Infrastructure hỗ trợ test (Helpers & Builders)

### 8.1 `AuthTestData.cs` — Dữ liệu test tập trung

**Vấn đề:** Nếu mỗi file test tự khai báo `"user@example.com"`, `"P@ssw0rd!"` thì khi email đổi thành format khác, phải tìm và sửa ở hàng chục chỗ.

**Giải pháp:** Một nơi duy nhất chứa toàn bộ dữ liệu test.

```csharp
// Sử dụng trong test:
var command = new LoginCommand(AuthTestData.Valid.Email, AuthTestData.Valid.Password);

// Thay vì:
var command = new LoginCommand("user@example.com", "P@ssw0rd!"); // ❌ string cứng
```

**Các builder methods:**
```csharp
AuthTestData.BuildUser(id: someGuid, email: "other@mail.com")  // ApplicationUser
AuthTestData.BuildAuthResult()                                   // AuthResult
AuthTestData.BuildUserDto()                                      // UserDTO
AuthTestData.BuildTokenResult()                                  // TokenResult
```

Tham số là nullable — nếu không truyền sẽ dùng giá trị mặc định từ `Valid.*`.

---

### 8.2 `UserManagerMockHelper.cs` — Factory mock UserManager

**Vấn đề:** `UserManager<TUser>` có **9 tham số constructor** (IUserStore, IOptions, IPasswordHasher, ...). Nếu viết thủ công mỗi lần sẽ rất dài dòng và dễ bị thiếu.

**Giải pháp:** Factory method tập trung:

```csharp
// Cách dùng trong test — chỉ 1 dòng:
_userManager = UserManagerMockHelper.Create();

// Factory này tự động tạo mock cho cả 9 dependency bên trong
```

---

### 8.3 `AsyncQueryHelper.cs` — Hỗ trợ EF Core async LINQ

**Vấn đề:** Source code dùng `_userManager.Users.AnyAsync(...)` và `FirstOrDefaultAsync(...)`. Đây là **EF Core extension methods** — chúng yêu cầu `IQueryable` phải implement `IAsyncQueryProvider`. Nếu mock `Users` trả về `List<T>.AsQueryable()` thông thường, khi chạy test sẽ ném:

```
InvalidOperationException: The source IQueryable doesn't implement IAsyncEnumerable<T>.
```

**Giải pháp:** Custom `TestAsyncEnumerable<T>` implement đủ interface để EF Core async hoạt động trên `List<T>` trong bộ nhớ:

```csharp
// Dùng trong test:
var users = new List<ApplicationUser> { someUser };

_userManager.Setup(um => um.Users)
    .Returns(users.AsAsyncQueryable()); // ← Extension method từ AsyncQueryHelper
```

> `AsAsyncQueryable()` là extension method trong `AsyncQueryHelper.cs` — chuyển bất kỳ `IEnumerable<T>` nào thành `IQueryable<T>` tương thích với EF Core async.

**Tại sao phức tạp:** EF Core async methods (`AnyAsync`, `FirstOrDefaultAsync`, etc.) không phải là LINQ bình thường. Chúng gọi internal `IAsyncQueryProvider.ExecuteAsync()` — nếu provider không implement interface này sẽ fail. Helper này bridge giữa `List<T>` đơn giản và EF Core's async provider contract.

---

## 9. Loại test 1: Handler Tests (Application layer)

**File:** `Application/Auth/Commands/LoginCommandHandlerTests.cs` (và các Handler khác)

**Cấu trúc class:**

```csharp
public sealed class LoginCommandHandlerTests
{
    // Mock của dependency (IIdentityService)
    private readonly Mock<IIdentityService> _identityService;

    // _sut = System Under Test — đây là class thật cần test
    private readonly LoginCommandHandler _sut;

    // Constructor chạy trước MỖI test — tạo mock và inject vào handler
    public LoginCommandHandlerTests()
    {
        _identityService = new Mock<IIdentityService>(MockBehavior.Strict);
        _sut = new LoginCommandHandler(_identityService.Object);
        //                                              ↑
        //                    .Object = lấy object giả từ mock
    }

    [Fact]
    public async Task Handle_WithValidCredentials_ReturnsAuthResult()
    {
        // Arrange: giả lập IdentityService trả về AuthResult
        var expected = AuthTestData.BuildAuthResult();
        _identityService
            .Setup(s => s.LoginAsync(...))
            .ReturnsAsync(expected);

        // Act: gọi handler
        var result = await _sut.Handle(command, CancellationToken.None);

        // Assert: kiểm tra kết quả
        result.Should().BeEquivalentTo(expected);
    }
}
```

**Tư duy khi viết Handler test:**

Handler thường chỉ làm 2 việc:
1. Nhận command → gọi service → trả về kết quả
2. Service throw exception → handler không xử lý, để exception lan lên

Vì vậy Handler test kiểm tra:
- **Happy path:** handler gọi đúng service với đúng tham số, kết quả được truyền qua đúng.
- **Delegate arguments:** `Verify(Times.Once)` — đảm bảo đúng email/password được truyền xuống, không bị transform sai.
- **Exception propagation:** khi service throw, handler không nuốt exception.

---

## 10. Loại test 2: Validator Tests

**File:** `Application/Auth/Validators/LoginValidatorTests.cs`

**Cấu trúc:**

```csharp
public sealed class LoginValidatorTests
{
    // Validator là stateless → tạo 1 lần dùng cho tất cả test
    private readonly LoginValidator _validator = new();

    [Fact]
    public void Validate_WithValidInput_PassesWithNoErrors()
    {
        var command = new LoginCommand(AuthTestData.Valid.Email, AuthTestData.Valid.Password);

        // TestValidate() = chạy validator và trả về TestValidationResult
        _validator.TestValidate(command).ShouldNotHaveAnyValidationErrors();
    }

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    public void Validate_WhenEmailIsEmpty_HasRequiredError(string email)
    {
        var result = _validator.TestValidate(new LoginCommand(email, AuthTestData.Valid.Password));

        // Kiểm tra property Email có lỗi, và message đúng không
        result.ShouldHaveValidationErrorFor(x => x.Email)
            .WithErrorMessage("Email is required.");
    }
}
```

**API của FluentValidation.TestHelper:**

| Method | Ý nghĩa |
|---|---|
| `_validator.TestValidate(model)` | Chạy validation, trả về `TestValidationResult` |
| `.ShouldNotHaveAnyValidationErrors()` | Assert không có lỗi nào |
| `.ShouldHaveValidationErrorFor(x => x.Email)` | Assert property Email có lỗi |
| `.ShouldNotHaveValidationErrorFor(x => x.Email)` | Assert property Email không có lỗi |
| `.WithErrorMessage("...")` | Assert message lỗi đúng (chain sau `ShouldHaveValidationErrorFor`) |

**Tư duy viết Validator test:**

Mỗi rule cần có tối thiểu 2 test:
1. **Invalid case** — dữ liệu vi phạm rule → có lỗi với message đúng.
2. **Valid case** — dữ liệu hợp lệ → không có lỗi ở field đó.

Dùng `[Theory]` + `[InlineData]` để cover nhiều giá trị invalid cùng một test method:
```csharp
[Theory]
[InlineData("password123!")]   // no uppercase
[InlineData("PASSWORD123!")]   // no lowercase
[InlineData("Password123")]    // no special char
public void Validate_WhenPasswordIsWeak_HasStrongPasswordError(string password)
```

---

## 11. Loại test 3: Infrastructure Tests (IdentityService)

**File:** `Infrastructure/Identity/IdentityServiceTests.cs`

Đây là loại test phức tạp nhất vì `IdentityService` có nhiều dependency và logic phức tạp.

**Cấu trúc:**

```csharp
public sealed class IdentityServiceTests
{
    private readonly Mock<UserManager<ApplicationUser>> _userManager;
    private readonly Mock<IJwtTokenService> _tokenService;
    private readonly Mock<ITokenHasher> _tokenHasher;
    private readonly Mock<IRefreshTokenRepository> _refreshTokenRepo;
    private readonly IdentityService _sut;

    public IdentityServiceTests()
    {
        // UserManager cần factory đặc biệt vì constructor phức tạp
        _userManager = UserManagerMockHelper.Create();
        _tokenService = new Mock<IJwtTokenService>(MockBehavior.Strict);
        _tokenHasher = new Mock<ITokenHasher>(MockBehavior.Strict);
        _refreshTokenRepo = new Mock<IRefreshTokenRepository>(MockBehavior.Strict);

        // Inject tất cả mock vào IdentityService thật
        _sut = new IdentityService(
            _userManager.Object,
            _tokenService.Object,
            _tokenHasher.Object,
            _refreshTokenRepo.Object);
    }
}
```

**Kỹ thuật nâng cao: `Callback` để capture giá trị**

```csharp
// Vấn đề: User.Id được gán bên trong IdentityService.RegisterAsync(),
// làm sao test biết Id đó là gì?

var capturedUserId = Guid.NewGuid();

_userManager
    .Setup(um => um.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()))
    .Callback<ApplicationUser, string>((user, _) =>
    {
        // Callback chạy khi CreateAsync được gọi — gán Id vào object user
        user.Id = capturedUserId;
    })
    .ReturnsAsync(IdentityResult.Success);

// Bây giờ kết quả trả về sẽ là capturedUserId
var result = await _sut.RegisterAsync(...);
result.Should().Be(capturedUserId);
```

**Kỹ thuật: Mock EF Core async query**

```csharp
// Kịch bản: kiểm tra số điện thoại đã tồn tại chưa (dùng AnyAsync bên trong service)
var existingUsers = new List<ApplicationUser>
{
    AuthTestData.BuildUser(phoneNumber: "0912345678")
};

_userManager.Setup(um => um.Users)
    .Returns(existingUsers.AsAsyncQueryable()); // ← AsAsyncQueryable() từ AsyncQueryHelper
```

**Kỹ thuật: Verify rollback (kiểm tra compensation action)**

```csharp
// Kịch bản: tạo user thành công nhưng gán role thất bại → user phải bị xóa

_userManager.Setup(um => um.CreateAsync(...)).ReturnsAsync(IdentityResult.Success);
_userManager.Setup(um => um.AddToRoleAsync(...)).ReturnsAsync(IdentityResult.Failed(errors));
_userManager.Setup(um => um.DeleteAsync(It.IsAny<ApplicationUser>()))
    .ReturnsAsync(IdentityResult.Success);  // Setup để cho phép gọi Delete

await act.Should().ThrowAsync<BadRequestException>();

// Verify rằng DeleteAsync thực sự được gọi 1 lần (rollback)
_userManager.Verify(um => um.DeleteAsync(It.IsAny<ApplicationUser>()), Times.Once);
```

---

## 12. Tổng kết số lượng test hiện tại

| File | Số test | Loại |
|---|---|---|
| `LoginCommandHandlerTests` | 4 | Handler |
| `RegisterCommandHandlerTests` | 4 | Handler |
| `RefreshTokenCommandHandlerTests` | 3 | Handler |
| `GetProfileQueryHandlerTests` | 3 | Handler |
| `LoginValidatorTests` | 7 | Validator |
| `RegisterValidatorTests` | 30+ (Theory) | Validator |
| `IdentityServiceTests` | 14 | Infrastructure |
| **Tổng** | **85** | |

Kết quả chạy: **85/85 Passed** ✅

---

## 13. Hướng dẫn mở rộng: Viết test cho module mới

Giả sử bạn vừa viết module **Booking** với class `CreateBookingCommandHandler`. Đây là các bước:

### Bước 1: Thêm test data vào builder (nếu cần)

Mở `Common/Builders/AuthTestData.cs` hoặc tạo file mới `Common/Builders/BookingTestData.cs`:

```csharp
internal static class BookingTestData
{
    public static class Valid
    {
        public static readonly Guid BookingId = new("22222222-2222-2222-2222-222222222222");
        public const string RoomId = "room-101";
        // ...
    }

    public static Booking BuildBooking(Guid? id = null)
    {
        return new Booking
        {
            Id = id ?? Valid.BookingId,
            // ...
        };
    }
}
```

### Bước 2: Tạo file test theo đúng cấu trúc thư mục

```
tests/MiniBookingSystem.UnitTests/
└── Application/
    └── Booking/
        └── Commands/
            └── CreateBookingCommandHandlerTests.cs
```

### Bước 3: Viết test file

```csharp
namespace MiniBookingSystem.UnitTests.Application.Booking.Commands;

public sealed class CreateBookingCommandHandlerTests
{
    // 1. Khai báo mock của TẤT CẢ dependency mà handler dùng
    private readonly Mock<IBookingService> _bookingService;
    private readonly Mock<IRoomRepository> _roomRepo;

    // 2. _sut = class thật cần test
    private readonly CreateBookingCommandHandler _sut;

    // 3. Constructor: tạo mock, inject vào handler
    public CreateBookingCommandHandlerTests()
    {
        _bookingService = new Mock<IBookingService>(MockBehavior.Strict);
        _roomRepo = new Mock<IRoomRepository>(MockBehavior.Strict);
        _sut = new CreateBookingCommandHandler(_bookingService.Object, _roomRepo.Object);
    }

    // 4. Happy path test
    [Fact]
    public async Task Handle_WithValidData_ReturnsBookingId()
    {
        // Arrange
        var command = new CreateBookingCommand(BookingTestData.Valid.RoomId, checkIn, checkOut);
        var expectedId = BookingTestData.Valid.BookingId;

        _bookingService
            .Setup(s => s.CreateAsync(It.IsAny<CreateBookingDto>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(expectedId);

        // Act
        var result = await _sut.Handle(command, CancellationToken.None);

        // Assert
        result.Should().Be(expectedId);
    }

    // 5. Error case test
    [Fact]
    public async Task Handle_WhenRoomNotAvailable_ThrowsConflictException()
    {
        // Arrange
        var command = new CreateBookingCommand(...);

        _bookingService
            .Setup(s => s.CreateAsync(It.IsAny<CreateBookingDto>(), It.IsAny<CancellationToken>()))
            .ThrowsAsync(new ConflictException("Room is not available."));

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<ConflictException>()
            .WithMessage("Room is not available.");
    }
}
```

### Bước 4: Chạy test mới

```powershell
dotnet test --filter "FullyQualifiedName~CreateBookingCommandHandlerTests"
```

---

## 14. Các lỗi phổ biến và cách tránh

### ❌ Lỗi 1: Mock không được `.Setup()` nhưng bị gọi (MockBehavior.Strict)

```
Moq.MockException: IIdentityService.LoginAsync("...", "...", ...) invocation was not expected
```

**Nguyên nhân:** Dùng `MockBehavior.Strict` nhưng quên `.Setup()` cho method được gọi.

**Cách fix:** Thêm `.Setup()` cho method đó, hoặc dùng `MockBehavior.Loose` (nhưng sẽ không bắt được cuộc gọi không mong muốn).

---

### ❌ Lỗi 2: EF Core async không hoạt động trên List

```
InvalidOperationException: The source IQueryable doesn't implement IAsyncEnumerable<T>
```

**Nguyên nhân:** Dùng `.Returns(list.AsQueryable())` thay vì `.Returns(list.AsAsyncQueryable())`.

**Cách fix:**
```csharp
// ❌ Sai
_userManager.Setup(um => um.Users).Returns(list.AsQueryable());

// ✅ Đúng
_userManager.Setup(um => um.Users).Returns(list.AsAsyncQueryable());
```

---

### ❌ Lỗi 3: Test case email sai với FluentValidation

**Nguyên nhân:** FluentValidation dùng mode `AspNetCoreCompatible` cho `.EmailAddress()` — mode này accept `"spaces in@email.com"` vì nó valid theo RFC 5322. Viết test với email đó sẽ fail.

**Cách fix:** Chỉ test các format thực sự invalid như `"notanemail"`, `"missing@"`, `"@nodomain.com"`.

---

### ❌ Lỗi 4: Quên `await` khi test async method

```csharp
// ❌ Sai — test luôn pass vì exception không được await
var act = () => _sut.Handle(command, CancellationToken.None);
act.Should().ThrowAsync<NotFoundException>(); // Thiếu await!

// ✅ Đúng
await act.Should().ThrowAsync<NotFoundException>();
```

---

### ❌ Lỗi 5: Dùng `It.IsAny<>()` quá nhiều trong Verify

```csharp
// ❌ Test quá lỏng lẻo — không kiểm tra đúng argument được truyền
_identityService.Verify(
    s => s.LoginAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()),
    Times.Once);

// ✅ Tốt hơn — xác nhận đúng giá trị được pass xuống
_identityService.Verify(
    s => s.LoginAsync(command.Email, command.Password, It.IsAny<CancellationToken>()),
    Times.Once);
```

---

### Checklist trước khi merge test mới

- [ ] Test tên mô tả đúng kịch bản (`Method_WhenCondition_ExpectedOutcome`)
- [ ] Có test happy path (dữ liệu hợp lệ)
- [ ] Có test error case (dữ liệu không hợp lệ / exception)
- [ ] Dùng `AuthTestData` (hoặc Builder tương ứng) thay vì string/value hardcode
- [ ] Mock dùng `MockBehavior.Strict`
- [ ] `Verify(Times.Once)` cho các side effect quan trọng
- [ ] Chạy `dotnet test` → tất cả pass ✅
