namespace MiniBookingSystem.UnitTests.Infrastructure.Identity;

/// <summary>
/// Unit tests for <see cref="IdentityService"/>.
/// All external collaborators (UserManager, IJwtTokenService, …) are replaced with Moq doubles.
/// EF Core async queries are supported via <see cref="AsyncQueryableExtensions.AsAsyncQueryable{T}"/>.
/// </summary>
public sealed class IdentityServiceTests
{
    private readonly Mock<UserManager<ApplicationUser>> _userManager;
    private readonly Mock<IJwtTokenService> _tokenService;
    private readonly Mock<ITokenHasher> _tokenHasher;
    private readonly Mock<IRefreshTokenRepository> _refreshTokenRepo;
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly Mock<IUserRepository> _userRepo;
    private readonly IdentityService _sut;

    public IdentityServiceTests()
    {
        _userManager = UserManagerMockHelper.Create();
        _tokenService = new Mock<IJwtTokenService>(MockBehavior.Strict);
        _tokenHasher = new Mock<ITokenHasher>(MockBehavior.Strict);
        _refreshTokenRepo = new Mock<IRefreshTokenRepository>(MockBehavior.Strict);
        _unitOfWork = new Mock<IUnitOfWork>(MockBehavior.Strict);
        _userRepo = new Mock<IUserRepository>(MockBehavior.Strict);

        _unitOfWork.Setup(u => u.User).Returns(_userRepo.Object);

        var localizer = new Mock<ILocalizationService>();
        localizer.Setup(x => x.GetMessage(It.IsAny<string>())).Returns((string key) => key);
        localizer
            .Setup(x => x.GetMessage("Auth.EmailAlreadyRegistered"))
            .Returns("Email is already registered.");
        localizer
            .Setup(x => x.GetMessage("Auth.PhoneAlreadyRegistered"))
            .Returns("Phone number is already registered.");
        localizer
            .Setup(x => x.GetMessage("Auth.RegistrationFailed"))
            .Returns("User registration failed.");
        localizer
            .Setup(x => x.GetMessage("Auth.RoleAssignFailed"))
            .Returns("Failed to assign default role.");
        localizer
            .Setup(x => x.GetMessage("Auth.InvalidCredentials"))
            .Returns("Invalid email or password.");
        localizer.Setup(x => x.GetMessage("Auth.UserNotFound")).Returns("User not found.");
        localizer
            .Setup(x => x.GetMessage("Auth.InvalidRefreshToken"))
            .Returns("Invalid refresh token.");
        localizer
            .Setup(x => x.GetMessage("Auth.RefreshTokenUserNotFound"))
            .Returns("User not found for the provided refresh token.");
        localizer
            .Setup(x => x.GetMessage("Auth.CurrentPasswordIncorrect"))
            .Returns("Current password is incorrect.");
        localizer
            .Setup(x => x.GetMessage("Auth.PasswordChangeFailed"))
            .Returns("Failed to change password. Please check your current password.");
        localizer
            .Setup(x => x.GetMessage("Auth.PasswordResetFailed"))
            .Returns("Failed to reset password.");
        localizer
            .Setup(x => x.GetMessage("Auth.GoogleLinkFailed"))
            .Returns("Failed to link Google account.");
        localizer
            .Setup(x => x.GetMessage("Auth.GoogleCreateFailed"))
            .Returns("Failed to create account from Google login.");
        localizer
            .Setup(x => x.GetMessage("Auth.ProfileUpdateFailed"))
            .Returns("Failed to update profile.");

        _sut = new IdentityService(
            _userManager.Object,
            _tokenService.Object,
            _tokenHasher.Object,
            _refreshTokenRepo.Object,
            _unitOfWork.Object,
            localizer.Object
        );
    }

    // ══════════════════════════════════════════════════════════════════════
    // RegisterAsync
    // ══════════════════════════════════════════════════════════════════════

    [Fact]
    public async Task RegisterAsync_WithUniqueEmailAndPhone_CreatesUserAndReturnsId()
    {
        // Arrange
        var capturedUserId = Guid.NewGuid();

        _userManager
            .Setup(um => um.FindByEmailAsync(AuthTestData.Valid.Email))
            .ReturnsAsync((ApplicationUser?)null);

        _userRepo
            .Setup(r =>
                r.IsPhoneNumberTakenAsync(
                    AuthTestData.Valid.PhoneNumber,
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(false);

        _userManager
            .Setup(um => um.CreateAsync(It.IsAny<ApplicationUser>(), AuthTestData.Valid.Password))
            .Callback<ApplicationUser, string>((user, _) => user.Id = capturedUserId)
            .ReturnsAsync(IdentityResult.Success);

        _userManager
            .Setup(um => um.AddToRoleAsync(It.IsAny<ApplicationUser>(), ApplicationRoles.User))
            .ReturnsAsync(IdentityResult.Success);

        // Act
        var result = await _sut.RegisterAsync(
            AuthTestData.Valid.FullName,
            AuthTestData.Valid.Email,
            AuthTestData.Valid.Password,
            AuthTestData.Valid.PhoneNumber
        );

        // Assert
        result.Should().Be(capturedUserId);

        _userManager.Verify(
            um =>
                um.CreateAsync(
                    It.Is<ApplicationUser>(u =>
                        u.Email == AuthTestData.Valid.Email
                        && u.FullName == AuthTestData.Valid.FullName
                        && u.PhoneNumber == AuthTestData.Valid.PhoneNumber
                    ),
                    AuthTestData.Valid.Password
                ),
            Times.Once
        );

        _userManager.Verify(
            um => um.AddToRoleAsync(It.IsAny<ApplicationUser>(), ApplicationRoles.User),
            Times.Once
        );
    }

    [Fact]
    public async Task RegisterAsync_WhenEmailAlreadyRegistered_ThrowsConflictException()
    {
        // Arrange
        var existing = AuthTestData.BuildUser();

        _userManager
            .Setup(um => um.FindByEmailAsync(AuthTestData.Valid.Email))
            .ReturnsAsync(existing);

        // Act
        var act = () =>
            _sut.RegisterAsync(
                AuthTestData.Valid.FullName,
                AuthTestData.Valid.Email,
                AuthTestData.Valid.Password,
                AuthTestData.Valid.PhoneNumber
            );

        // Assert
        await act.Should()
            .ThrowAsync<ConflictException>()
            .WithMessage("Email is already registered.");

        _userManager.Verify(
            um => um.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()),
            Times.Never
        );
    }

    [Fact]
    public async Task RegisterAsync_WhenPhoneAlreadyRegistered_ThrowsConflictException()
    {
        // Arrange
        var existingUsers = new List<ApplicationUser>
        {
            AuthTestData.BuildUser(phoneNumber: AuthTestData.Valid.PhoneNumber),
        };

        _userManager
            .Setup(um => um.FindByEmailAsync(AuthTestData.Valid.Email))
            .ReturnsAsync((ApplicationUser?)null);

        _userRepo
            .Setup(r =>
                r.IsPhoneNumberTakenAsync(
                    AuthTestData.Valid.PhoneNumber,
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(true);

        // Act
        var act = () =>
            _sut.RegisterAsync(
                AuthTestData.Valid.FullName,
                AuthTestData.Valid.Email,
                AuthTestData.Valid.Password,
                AuthTestData.Valid.PhoneNumber
            );

        // Assert
        await act.Should()
            .ThrowAsync<ConflictException>()
            .WithMessage("Phone number is already registered.");

        _userManager.Verify(
            um => um.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()),
            Times.Never
        );
    }

    [Fact]
    public async Task RegisterAsync_WhenUserCreationFails_ThrowsBadRequestExceptionWithErrors()
    {
        // Arrange
        var errors = new[] { new IdentityError { Description = "Password too weak." } };

        _userManager
            .Setup(um => um.FindByEmailAsync(It.IsAny<string>()))
            .ReturnsAsync((ApplicationUser?)null);

        _userRepo
            .Setup(r =>
                r.IsPhoneNumberTakenAsync(It.IsAny<string>(), It.IsAny<CancellationToken>())
            )
            .ReturnsAsync(false);

        _userManager
            .Setup(um => um.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()))
            .ReturnsAsync(IdentityResult.Failed(errors));

        // Act
        var act = () =>
            _sut.RegisterAsync(
                AuthTestData.Valid.FullName,
                AuthTestData.Valid.Email,
                AuthTestData.Valid.Password,
                AuthTestData.Valid.PhoneNumber
            );

        // Assert
        var assertion = await act.Should()
            .ThrowAsync<BadRequestException>()
            .WithMessage("User registration failed.");

        assertion.Which.Errors.Should().ContainSingle(e => e == "Password too weak.");
    }

    [Fact]
    public async Task RegisterAsync_WhenAddToRoleFails_ThrowsBadRequestAndRollsBackUser()
    {
        // Arrange
        var roleErrors = new[] { new IdentityError { Description = "Role not found." } };

        _userManager
            .Setup(um => um.FindByEmailAsync(It.IsAny<string>()))
            .ReturnsAsync((ApplicationUser?)null);

        _userRepo
            .Setup(r =>
                r.IsPhoneNumberTakenAsync(It.IsAny<string>(), It.IsAny<CancellationToken>())
            )
            .ReturnsAsync(false);

        _userManager
            .Setup(um => um.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()))
            .ReturnsAsync(IdentityResult.Success);

        _userManager
            .Setup(um => um.AddToRoleAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()))
            .ReturnsAsync(IdentityResult.Failed(roleErrors));

        // Rollback setup
        _userManager
            .Setup(um => um.DeleteAsync(It.IsAny<ApplicationUser>()))
            .ReturnsAsync(IdentityResult.Success);

        // Act
        var act = () =>
            _sut.RegisterAsync(
                AuthTestData.Valid.FullName,
                AuthTestData.Valid.Email,
                AuthTestData.Valid.Password,
                AuthTestData.Valid.PhoneNumber
            );

        // Assert
        await act.Should()
            .ThrowAsync<BadRequestException>()
            .WithMessage("Failed to assign default role.");

        // Verify the rollback (user deletion) was triggered
        _userManager.Verify(um => um.DeleteAsync(It.IsAny<ApplicationUser>()), Times.Once);
    }

    // ══════════════════════════════════════════════════════════════════════
    // LoginAsync
    // ══════════════════════════════════════════════════════════════════════

    [Fact]
    public async Task LoginAsync_WithValidCredentials_ReturnsAuthResult()
    {
        // Arrange
        var user = AuthTestData.BuildUser();
        var tokenResult = AuthTestData.BuildTokenResult();
        var accessExpiry = new DateTime(2025, 1, 1, 0, 15, 0, DateTimeKind.Utc);

        _userManager.Setup(um => um.FindByEmailAsync(AuthTestData.Valid.Email)).ReturnsAsync(user);

        _userManager
            .Setup(um => um.CheckPasswordAsync(user, AuthTestData.Valid.Password))
            .ReturnsAsync(true);

        _userManager.Setup(um => um.GetRolesAsync(user)).ReturnsAsync(["User"]);

        _tokenService
            .Setup(t => t.GenerateTokensAsync(It.IsAny<UserTokenData>()))
            .ReturnsAsync(tokenResult);

        _tokenService.Setup(t => t.GetAccessTokenExpiry()).Returns(accessExpiry);

        _refreshTokenRepo
            .Setup(r =>
                r.UpdateRefreshTokenAsync(
                    user.Id.ToString(),
                    tokenResult.RefreshTokenHash,
                    tokenResult.RefreshTokenExpiry
                )
            )
            .Returns(Task.CompletedTask);

        // Act
        var result = await _sut.LoginAsync(AuthTestData.Valid.Email, AuthTestData.Valid.Password);

        // Assert
        result.UserId.Should().Be(user.Id.ToString());
        result.Email.Should().Be(user.Email);
        result.FullName.Should().Be(user.FullName);
        result.AccessToken.Should().Be(tokenResult.AccessToken);
        result.RefreshToken.Should().Be(tokenResult.RefreshToken);
        result.ExpiresIn.Should().Be(accessExpiry);
    }

    [Fact]
    public async Task LoginAsync_StoresRefreshTokenHashNotRawToken()
    {
        // Arrange — ensures we store the hash, not the plaintext token
        var user = AuthTestData.BuildUser();
        var tokenResult = AuthTestData.BuildTokenResult();

        _userManager.Setup(um => um.FindByEmailAsync(user.Email!)).ReturnsAsync(user);
        _userManager
            .Setup(um => um.CheckPasswordAsync(user, AuthTestData.Valid.Password))
            .ReturnsAsync(true);
        _userManager.Setup(um => um.GetRolesAsync(user)).ReturnsAsync(["User"]);
        _tokenService
            .Setup(t => t.GenerateTokensAsync(It.IsAny<UserTokenData>()))
            .ReturnsAsync(tokenResult);
        _tokenService.Setup(t => t.GetAccessTokenExpiry()).Returns(DateTime.UtcNow.AddMinutes(15));

        _refreshTokenRepo
            .Setup(r =>
                r.UpdateRefreshTokenAsync(
                    user.Id.ToString(),
                    tokenResult.RefreshTokenHash,
                    tokenResult.RefreshTokenExpiry
                )
            )
            .Returns(Task.CompletedTask);

        // Act
        await _sut.LoginAsync(user.Email!, AuthTestData.Valid.Password);

        // Assert — the repository receives the HASH, never the raw token
        _refreshTokenRepo.Verify(
            r =>
                r.UpdateRefreshTokenAsync(
                    user.Id.ToString(),
                    tokenResult.RefreshTokenHash, // must be the hash
                    tokenResult.RefreshTokenExpiry
                ),
            Times.Once
        );
    }

    [Fact]
    public async Task LoginAsync_WhenUserNotFound_ThrowsUnauthorizedException()
    {
        // Arrange
        _userManager
            .Setup(um => um.FindByEmailAsync(It.IsAny<string>()))
            .ReturnsAsync((ApplicationUser?)null);

        // Act
        var act = () => _sut.LoginAsync("unknown@example.com", "P@ssword123");

        // Assert
        await act.Should()
            .ThrowAsync<UnauthorizedException>()
            .WithMessage("Invalid email or password.");
    }

    [Fact]
    public async Task LoginAsync_WhenPasswordIsIncorrect_ThrowsUnauthorizedException()
    {
        // Arrange
        var user = AuthTestData.BuildUser();

        _userManager.Setup(um => um.FindByEmailAsync(user.Email!)).ReturnsAsync(user);
        _userManager.Setup(um => um.CheckPasswordAsync(user, "WrongP@ss1")).ReturnsAsync(false);

        // Act
        var act = () => _sut.LoginAsync(user.Email!, "WrongP@ss1");

        // Assert — same generic message regardless of user-not-found or wrong-password
        await act.Should()
            .ThrowAsync<UnauthorizedException>()
            .WithMessage("Invalid email or password.");
    }

    // ══════════════════════════════════════════════════════════════════════
    // GetProfileAsync
    // ══════════════════════════════════════════════════════════════════════

    [Fact]
    public async Task GetProfileAsync_WithExistingUserId_ReturnsCorrectUserDTO()
    {
        // Arrange
        var user = AuthTestData.BuildUser();

        _userManager
            .Setup(um => um.Users)
            .Returns(new List<ApplicationUser> { user }.AsAsyncQueryable());

        // Act
        var result = await _sut.GetProfileAsync(user.Id);

        // Assert
        result.Id.Should().Be(user.Id);
        result.FullName.Should().Be(user.FullName);
        result.Email.Should().Be(user.Email);
        result.PhoneNumber.Should().Be(user.PhoneNumber);
    }

    [Fact]
    public async Task GetProfileAsync_WhenUserNotFound_ThrowsNotFoundException()
    {
        // Arrange
        var absentId = Guid.NewGuid();

        _userManager.Setup(um => um.Users).Returns(new List<ApplicationUser>().AsAsyncQueryable());

        // Act
        var act = () => _sut.GetProfileAsync(absentId);

        // Assert
        await act.Should().ThrowAsync<NotFoundException>().WithMessage($"*User not found*");
    }

    // ══════════════════════════════════════════════════════════════════════
    // RefreshTokenAsync
    // ══════════════════════════════════════════════════════════════════════

    [Fact]
    public async Task RefreshTokenAsync_WithValidToken_ReturnsNewTokenPair()
    {
        // Arrange
        const string rawToken = "raw-refresh-token";
        const string hash = "sha256-hashed-token";
        var user = AuthTestData.BuildUser();
        var tokenResult = AuthTestData.BuildTokenResult();
        var accessExpiry = new DateTime(2025, 1, 1, 0, 15, 0, DateTimeKind.Utc);

        var storedToken = new RefreshToken
        {
            UserId = user.Id,
            Token = hash,
            ExpiresAt = DateTime.UtcNow.AddDays(7),
        };

        _tokenHasher.Setup(th => th.HashToken(rawToken)).Returns(hash);
        _refreshTokenRepo.Setup(r => r.GetRefreshTokenAsync(hash)).ReturnsAsync(storedToken);
        _userManager.Setup(um => um.FindByIdAsync(user.Id.ToString())).ReturnsAsync(user);
        _userManager.Setup(um => um.GetRolesAsync(user)).ReturnsAsync(["User"]);
        _tokenService
            .Setup(t => t.GenerateTokensAsync(It.IsAny<UserTokenData>()))
            .ReturnsAsync(tokenResult);
        _tokenService.Setup(t => t.GetAccessTokenExpiry()).Returns(accessExpiry);
        _refreshTokenRepo
            .Setup(r =>
                r.UpdateRefreshTokenAsync(
                    user.Id.ToString(),
                    tokenResult.RefreshTokenHash,
                    tokenResult.RefreshTokenExpiry
                )
            )
            .Returns(Task.CompletedTask);

        // Act
        var result = await _sut.RefreshTokenAsync(rawToken);

        // Assert
        result.AccessToken.Should().Be(tokenResult.AccessToken);
        result.RefreshToken.Should().Be(tokenResult.RefreshToken);
        result.UserId.Should().Be(user.Id.ToString());
    }

    [Fact]
    public async Task RefreshTokenAsync_RotatesStoredHashOnSuccess()
    {
        // Arrange — after refresh the NEW hash must be persisted
        const string rawToken = "raw-token";
        const string hash = "hash-v1";
        var user = AuthTestData.BuildUser();
        var newTokenResult = AuthTestData.BuildTokenResult();

        var storedToken = new RefreshToken
        {
            UserId = user.Id,
            Token = hash,
            ExpiresAt = DateTime.UtcNow.AddDays(7),
        };

        _tokenHasher.Setup(th => th.HashToken(rawToken)).Returns(hash);
        _refreshTokenRepo.Setup(r => r.GetRefreshTokenAsync(hash)).ReturnsAsync(storedToken);
        _userManager.Setup(um => um.FindByIdAsync(user.Id.ToString())).ReturnsAsync(user);
        _userManager.Setup(um => um.GetRolesAsync(user)).ReturnsAsync(["User"]);
        _tokenService
            .Setup(t => t.GenerateTokensAsync(It.IsAny<UserTokenData>()))
            .ReturnsAsync(newTokenResult);
        _tokenService.Setup(t => t.GetAccessTokenExpiry()).Returns(DateTime.UtcNow.AddMinutes(15));
        _refreshTokenRepo
            .Setup(r =>
                r.UpdateRefreshTokenAsync(
                    user.Id.ToString(),
                    newTokenResult.RefreshTokenHash,
                    newTokenResult.RefreshTokenExpiry
                )
            )
            .Returns(Task.CompletedTask);

        // Act
        await _sut.RefreshTokenAsync(rawToken);

        // Assert — the repository is updated with the NEW token hash
        _refreshTokenRepo.Verify(
            r =>
                r.UpdateRefreshTokenAsync(
                    user.Id.ToString(),
                    newTokenResult.RefreshTokenHash,
                    newTokenResult.RefreshTokenExpiry
                ),
            Times.Once
        );
    }

    [Fact]
    public async Task RefreshTokenAsync_WhenTokenNotFoundInStore_ThrowsUnauthorizedException()
    {
        // Arrange
        const string hash = "unknown-hash";

        _tokenHasher.Setup(th => th.HashToken(It.IsAny<string>())).Returns(hash);
        _refreshTokenRepo
            .Setup(r => r.GetRefreshTokenAsync(hash))
            .ReturnsAsync((RefreshToken?)null);

        // Act
        var act = () => _sut.RefreshTokenAsync("any-raw-token");

        // Assert
        await act.Should()
            .ThrowAsync<UnauthorizedException>()
            .WithMessage("Invalid refresh token.");
    }

    [Fact]
    public async Task RefreshTokenAsync_WhenOwnerUserNoLongerExists_ThrowsUnauthorizedException()
    {
        // Arrange
        const string rawToken = "orphan-raw-token";
        const string hash = "orphan-hash";
        var orphanToken = new RefreshToken
        {
            UserId = Guid.NewGuid(),
            Token = hash,
            ExpiresAt = DateTime.UtcNow.AddDays(1),
        };

        _tokenHasher.Setup(th => th.HashToken(rawToken)).Returns(hash);
        _refreshTokenRepo.Setup(r => r.GetRefreshTokenAsync(hash)).ReturnsAsync(orphanToken);
        _userManager
            .Setup(um => um.FindByIdAsync(It.IsAny<string>()))
            .ReturnsAsync((ApplicationUser?)null);

        // Act
        var act = () => _sut.RefreshTokenAsync(rawToken);

        // Assert
        await act.Should()
            .ThrowAsync<UnauthorizedException>()
            .WithMessage("User not found for the provided refresh token.");
    }
}
