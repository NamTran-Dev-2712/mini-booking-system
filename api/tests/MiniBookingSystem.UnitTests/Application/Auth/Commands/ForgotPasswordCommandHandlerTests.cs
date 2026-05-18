using System.Linq.Expressions;

namespace MiniBookingSystem.UnitTests.Application.Auth.Commands;

public sealed class ForgotPasswordCommandHandlerTests
{
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly Mock<ITokenHasher> _tokenHasher;
    private readonly Mock<IBackgroundJobService> _backgroundJobService;
    private readonly Mock<IUserRepository> _userRepo;
    private readonly Mock<IPasswordResetTokenRepository> _passwordResetTokenRepo;
    private readonly ForgotPasswordCommandHandler _sut;

    public ForgotPasswordCommandHandlerTests()
    {
        _unitOfWork = new Mock<IUnitOfWork>();
        _tokenHasher = new Mock<ITokenHasher>();
        _backgroundJobService = new Mock<IBackgroundJobService>();
        _userRepo = new Mock<IUserRepository>();
        _passwordResetTokenRepo = new Mock<IPasswordResetTokenRepository>();

        _unitOfWork.Setup(u => u.User).Returns(_userRepo.Object);
        _unitOfWork.Setup(u => u.PasswordResetToken).Returns(_passwordResetTokenRepo.Object);

        var configuration = new Mock<Microsoft.Extensions.Configuration.IConfiguration>();
        configuration
            .Setup(c => c[ConfigurationValue.BaseUrlFrontend])
            .Returns("http://localhost:5173");

        _sut = new ForgotPasswordCommandHandler(
            _unitOfWork.Object,
            _tokenHasher.Object,
            _backgroundJobService.Object,
            configuration.Object
        );
    }

    [Fact]
    public async Task Handle_WhenUserExists_EnqueuesEmailAndReturnsUnit()
    {
        // Arrange
        var command = new ForgotPasswordCommand("test@example.com");
        var userInfo = new UserBasicInfo(Guid.NewGuid(), "Test User", "test@example.com");

        _userRepo
            .Setup(r => r.FindByEmailAsync(command.Email, It.IsAny<CancellationToken>()))
            .ReturnsAsync(userInfo);

        _passwordResetTokenRepo
            .Setup(r => r.InvalidateAllForUserAsync(userInfo.Id, It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        _tokenHasher.Setup(h => h.HashToken(It.IsAny<string>())).Returns("hashed_token");

        _passwordResetTokenRepo
            .Setup(r => r.AddAsync(It.IsAny<PasswordResetToken>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((PasswordResetToken t, CancellationToken _) => t);

        _unitOfWork.Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);

        // Act
        var result = await _sut.Handle(command, CancellationToken.None);

        // Assert
        result.Should().Be(MediatR.Unit.Value);
        _backgroundJobService.Verify(
            s => s.Enqueue<IEmailJob>(It.IsAny<Expression<Func<IEmailJob, Task>>>()),
            Times.Once
        );
    }

    [Fact]
    public async Task Handle_WhenUserDoesNotExist_ReturnsUnitWithoutEnqueuingEmail()
    {
        // Arrange
        var command = new ForgotPasswordCommand("nonexistent@example.com");

        _userRepo
            .Setup(r => r.FindByEmailAsync(command.Email, It.IsAny<CancellationToken>()))
            .ReturnsAsync((UserBasicInfo?)null);

        // Act
        var result = await _sut.Handle(command, CancellationToken.None);

        // Assert
        result.Should().Be(MediatR.Unit.Value);
        _backgroundJobService.Verify(
            s => s.Enqueue<IEmailJob>(It.IsAny<Expression<Func<IEmailJob, Task>>>()),
            Times.Never
        );
    }

    [Fact]
    public async Task Handle_WhenUserExists_InvalidatesExistingTokensBeforeCreatingNew()
    {
        // Arrange
        var command = new ForgotPasswordCommand("test@example.com");
        var userInfo = new UserBasicInfo(Guid.NewGuid(), "Test User", "test@example.com");

        _userRepo
            .Setup(r => r.FindByEmailAsync(command.Email, It.IsAny<CancellationToken>()))
            .ReturnsAsync(userInfo);

        _passwordResetTokenRepo
            .Setup(r => r.InvalidateAllForUserAsync(userInfo.Id, It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        _tokenHasher.Setup(h => h.HashToken(It.IsAny<string>())).Returns("hashed");

        _passwordResetTokenRepo
            .Setup(r => r.AddAsync(It.IsAny<PasswordResetToken>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((PasswordResetToken t, CancellationToken _) => t);

        _unitOfWork.Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        _passwordResetTokenRepo.Verify(
            r => r.InvalidateAllForUserAsync(userInfo.Id, It.IsAny<CancellationToken>()),
            Times.Once
        );
    }
}
