namespace MiniBookingSystem.UnitTests.Application.Auth.Commands;

public sealed class ResetPasswordCommandHandlerTests
{
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly Mock<ITokenHasher> _tokenHasher;
    private readonly Mock<IIdentityService> _identityService;
    private readonly Mock<IRefreshTokenRepository> _refreshTokenRepo;
    private readonly Mock<IUserRepository> _userRepo;
    private readonly Mock<IPasswordResetTokenRepository> _passwordResetTokenRepo;
    private readonly ResetPasswordCommandHandler _sut;

    public ResetPasswordCommandHandlerTests()
    {
        _unitOfWork = new Mock<IUnitOfWork>();
        _tokenHasher = new Mock<ITokenHasher>();
        _identityService = new Mock<IIdentityService>();
        _refreshTokenRepo = new Mock<IRefreshTokenRepository>();
        _userRepo = new Mock<IUserRepository>();
        _passwordResetTokenRepo = new Mock<IPasswordResetTokenRepository>();

        _unitOfWork.Setup(u => u.User).Returns(_userRepo.Object);
        _unitOfWork.Setup(u => u.PasswordResetToken).Returns(_passwordResetTokenRepo.Object);

        var localizer = new Mock<ILocalizationService>();
        localizer.Setup(x => x.GetMessage(It.IsAny<string>())).Returns((string key) => key);
        localizer
            .Setup(x => x.GetMessage("Auth.InvalidResetToken"))
            .Returns("Invalid or expired reset token.");
        localizer
            .Setup(x => x.GetMessage("Auth.ResetTokenExpired"))
            .Returns("Reset token has expired. Please request a new one.");
        localizer
            .Setup(x => x.GetMessage("Auth.ResetTokenUsed"))
            .Returns("This reset token has already been used.");
        localizer.Setup(x => x.GetMessage("Auth.InvalidOtp")).Returns("Invalid OTP code.");

        _sut = new ResetPasswordCommandHandler(
            _unitOfWork.Object,
            _tokenHasher.Object,
            _identityService.Object,
            _refreshTokenRepo.Object,
            localizer.Object
        );
    }

    private PasswordResetToken CreateValidToken(Guid userId) =>
        new()
        {
            UserId = userId,
            TokenHash = "hashed_token",
            OtpCodeHash = "hashed_otp",
            ExpiresAt = DateTime.UtcNow.AddMinutes(10),
            Attempts = 0,
        };

    [Fact]
    public async Task Handle_WithValidTokenAndOtp_ResetsPasswordSuccessfully()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var command = new ResetPasswordCommand(
            "test@example.com",
            "raw_token",
            "123456",
            "NewPass@123"
        );
        var userInfo = new UserBasicInfo(userId, "Test User", "test@example.com");
        var resetToken = CreateValidToken(userId);

        _userRepo
            .Setup(r => r.FindByEmailAsync(command.Email, It.IsAny<CancellationToken>()))
            .ReturnsAsync(userInfo);
        _tokenHasher.Setup(h => h.HashToken("raw_token")).Returns("hashed_token");
        _tokenHasher.Setup(h => h.HashToken("123456")).Returns("hashed_otp");
        _passwordResetTokenRepo
            .Setup(r => r.GetByTokenHashAsync("hashed_token", It.IsAny<CancellationToken>()))
            .ReturnsAsync(resetToken);
        _identityService
            .Setup(s =>
                s.ResetPasswordAsync(userId, command.NewPassword, It.IsAny<CancellationToken>())
            )
            .Returns(Task.CompletedTask);
        _unitOfWork.Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);
        _passwordResetTokenRepo
            .Setup(r => r.InvalidateAllForUserAsync(userId, It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        _refreshTokenRepo
            .Setup(r => r.RemoveRefreshTokenAsync(userId.ToString()))
            .Returns(Task.CompletedTask);

        // Act
        var result = await _sut.Handle(command, CancellationToken.None);

        // Assert
        result.Should().Be(MediatR.Unit.Value);
        _identityService.Verify(
            s => s.ResetPasswordAsync(userId, command.NewPassword, It.IsAny<CancellationToken>()),
            Times.Once
        );
        _refreshTokenRepo.Verify(r => r.RemoveRefreshTokenAsync(userId.ToString()), Times.Once);
    }

    [Fact]
    public async Task Handle_WhenUserNotFound_ThrowsBadRequestException()
    {
        // Arrange
        var command = new ResetPasswordCommand(
            "nonexistent@example.com",
            "token",
            "123456",
            "NewPass@123"
        );

        _userRepo
            .Setup(r => r.FindByEmailAsync(command.Email, It.IsAny<CancellationToken>()))
            .ReturnsAsync((UserBasicInfo?)null);

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should()
            .ThrowAsync<BadRequestException>()
            .WithMessage("Invalid or expired reset token.");
    }

    [Fact]
    public async Task Handle_WhenTokenNotFound_ThrowsBadRequestException()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var command = new ResetPasswordCommand(
            "test@example.com",
            "invalid_token",
            "123456",
            "NewPass@123"
        );
        var userInfo = new UserBasicInfo(userId, "Test User", "test@example.com");

        _userRepo
            .Setup(r => r.FindByEmailAsync(command.Email, It.IsAny<CancellationToken>()))
            .ReturnsAsync(userInfo);
        _tokenHasher.Setup(h => h.HashToken("invalid_token")).Returns("hashed_invalid");
        _passwordResetTokenRepo
            .Setup(r => r.GetByTokenHashAsync("hashed_invalid", It.IsAny<CancellationToken>()))
            .ReturnsAsync((PasswordResetToken?)null);

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should()
            .ThrowAsync<BadRequestException>()
            .WithMessage("Invalid or expired reset token.");
    }

    [Fact]
    public async Task Handle_WhenTokenExpired_ThrowsBadRequestException()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var command = new ResetPasswordCommand(
            "test@example.com",
            "token",
            "123456",
            "NewPass@123"
        );
        var userInfo = new UserBasicInfo(userId, "Test User", "test@example.com");
        var expiredToken = new PasswordResetToken
        {
            UserId = userId,
            TokenHash = "hashed_token",
            OtpCodeHash = "hashed_otp",
            ExpiresAt = DateTime.UtcNow.AddMinutes(-5),
            Attempts = 0,
        };

        _userRepo
            .Setup(r => r.FindByEmailAsync(command.Email, It.IsAny<CancellationToken>()))
            .ReturnsAsync(userInfo);
        _tokenHasher.Setup(h => h.HashToken("token")).Returns("hashed_token");
        _passwordResetTokenRepo
            .Setup(r => r.GetByTokenHashAsync("hashed_token", It.IsAny<CancellationToken>()))
            .ReturnsAsync(expiredToken);

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should()
            .ThrowAsync<BadRequestException>()
            .WithMessage("Reset token has expired. Please request a new one.");
    }

    [Fact]
    public async Task Handle_WhenTokenAlreadyConsumed_ThrowsBadRequestException()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var command = new ResetPasswordCommand(
            "test@example.com",
            "token",
            "123456",
            "NewPass@123"
        );
        var userInfo = new UserBasicInfo(userId, "Test User", "test@example.com");
        var consumedToken = new PasswordResetToken
        {
            UserId = userId,
            TokenHash = "hashed_token",
            OtpCodeHash = "hashed_otp",
            ExpiresAt = DateTime.UtcNow.AddMinutes(10),
            ConsumedAt = DateTime.UtcNow.AddMinutes(-2),
            Attempts = 0,
        };

        _userRepo
            .Setup(r => r.FindByEmailAsync(command.Email, It.IsAny<CancellationToken>()))
            .ReturnsAsync(userInfo);
        _tokenHasher.Setup(h => h.HashToken("token")).Returns("hashed_token");
        _passwordResetTokenRepo
            .Setup(r => r.GetByTokenHashAsync("hashed_token", It.IsAny<CancellationToken>()))
            .ReturnsAsync(consumedToken);

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should()
            .ThrowAsync<BadRequestException>()
            .WithMessage("This reset token has already been used.");
    }

    [Fact]
    public async Task Handle_WhenMaxAttemptsReached_ThrowsBadRequestException()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var command = new ResetPasswordCommand(
            "test@example.com",
            "token",
            "123456",
            "NewPass@123"
        );
        var userInfo = new UserBasicInfo(userId, "Test User", "test@example.com");
        var maxAttemptsToken = new PasswordResetToken
        {
            UserId = userId,
            TokenHash = "hashed_token",
            OtpCodeHash = "hashed_otp",
            ExpiresAt = DateTime.UtcNow.AddMinutes(10),
            Attempts = 5,
        };

        _userRepo
            .Setup(r => r.FindByEmailAsync(command.Email, It.IsAny<CancellationToken>()))
            .ReturnsAsync(userInfo);
        _tokenHasher.Setup(h => h.HashToken("token")).Returns("hashed_token");
        _passwordResetTokenRepo
            .Setup(r => r.GetByTokenHashAsync("hashed_token", It.IsAny<CancellationToken>()))
            .ReturnsAsync(maxAttemptsToken);

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should()
            .ThrowAsync<BadRequestException>()
            .WithMessage("Too many failed attempts. Please request a new reset token.");
    }

    [Fact]
    public async Task Handle_WhenOtpInvalid_IncrementsAttemptsAndThrows()
    {
        // Arrange
        var userId = Guid.NewGuid();
        var command = new ResetPasswordCommand(
            "test@example.com",
            "token",
            "999999",
            "NewPass@123"
        );
        var userInfo = new UserBasicInfo(userId, "Test User", "test@example.com");
        var resetToken = CreateValidToken(userId);

        _userRepo
            .Setup(r => r.FindByEmailAsync(command.Email, It.IsAny<CancellationToken>()))
            .ReturnsAsync(userInfo);
        _tokenHasher.Setup(h => h.HashToken("token")).Returns("hashed_token");
        _tokenHasher.Setup(h => h.HashToken("999999")).Returns("wrong_otp_hash");
        _passwordResetTokenRepo
            .Setup(r => r.GetByTokenHashAsync("hashed_token", It.IsAny<CancellationToken>()))
            .ReturnsAsync(resetToken);
        _unitOfWork.Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<BadRequestException>().WithMessage("Invalid OTP code.");
        resetToken.Attempts.Should().Be(1);
    }
}
