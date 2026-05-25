using Microsoft.AspNetCore.OutputCaching;

namespace MiniBookingSystem.UnitTests.Application.Auth.Commands;

public sealed class UpdateProfileCommandHandlerTests
{
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly Mock<IMentorRepository> _mentorRepo;
    private readonly Mock<IUserRepository> _userRepo;
    private readonly Mock<ICacheService> _cacheService;
    private readonly Mock<IOutputCacheStore> _outputCacheStore;
    private readonly UpdateProfileCommandHandler _sut;

    public UpdateProfileCommandHandlerTests()
    {
        _unitOfWork = new Mock<IUnitOfWork>(MockBehavior.Strict);
        _mentorRepo = new Mock<IMentorRepository>(MockBehavior.Strict);
        _userRepo = new Mock<IUserRepository>(MockBehavior.Strict);
        _cacheService = new Mock<ICacheService>(MockBehavior.Strict);
        _outputCacheStore = new Mock<IOutputCacheStore>(MockBehavior.Strict);
        var localizer = new Mock<ILocalizationService>();
        localizer.Setup(l => l.GetMessage(It.IsAny<string>())).Returns((string key) => key);
        localizer.Setup(l => l.GetMessage("Mentor.NotFound")).Returns("Mentor not found.");

        _unitOfWork.Setup(u => u.Mentor).Returns(_mentorRepo.Object);
        _unitOfWork.Setup(u => u.User).Returns(_userRepo.Object);

        _sut = new UpdateProfileCommandHandler(
            _unitOfWork.Object,
            _cacheService.Object,
            _outputCacheStore.Object,
            localizer.Object
        );
    }

    private static UpdateProfileCommand BuildUserCommand(
        Guid? userId = null,
        string? fullName = "Nguyễn Văn Cường",
        string? phoneNumber = "0987654321"
    ) =>
        new(
            UserId: userId ?? AuthTestData.Valid.UserId,
            Roles: [ApplicationRoles.User],
            FullName: fullName,
            PhoneNumber: phoneNumber,
            DisplayName: null,
            Bio: null,
            Specialization: null,
            ExperienceYears: null,
            BasePrice: null,
            AvatarUrl: null
        );

    private static UpdateProfileCommand BuildMentorCommand(
        Guid? userId = null,
        string? fullName = "Nguyễn Văn Cường",
        string? phoneNumber = "0987654321",
        string? displayName = "Updated Display",
        string? bio = "Updated bio",
        string? specialization = "Backend",
        int? experienceYears = 8,
        decimal? basePrice = 700_000m,
        string? avatarUrl = "https://example.com/new.png"
    ) =>
        new(
            UserId: userId ?? MentorTestData.Valid.UserId,
            Roles: [ApplicationRoles.Mentor],
            FullName: fullName,
            PhoneNumber: phoneNumber,
            DisplayName: displayName,
            Bio: bio,
            Specialization: specialization,
            ExperienceYears: experienceYears,
            BasePrice: basePrice,
            AvatarUrl: avatarUrl
        );

    private void SetupUserHappyPath(UpdateProfileCommand cmd)
    {
        _userRepo
            .Setup(r =>
                r.UpdateUserAsync(
                    cmd.UserId,
                    cmd.FullName,
                    cmd.PhoneNumber,
                    It.IsAny<CancellationToken>()
                )
            )
            .Returns(Task.CompletedTask);
        _cacheService
            .Setup(c =>
                c.RemoveAsync(CacheKeys.UserProfile(cmd.UserId), It.IsAny<CancellationToken>())
            )
            .Returns(Task.CompletedTask);
    }

    private global::Mentor SetupMentorHappyPath(UpdateProfileCommand cmd)
    {
        var mentor = MentorTestData.BuildMentor(userId: cmd.UserId);

        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        _userRepo
            .Setup(r =>
                r.UpdateUserAsync(
                    cmd.UserId,
                    cmd.FullName,
                    cmd.PhoneNumber,
                    It.IsAny<CancellationToken>()
                )
            )
            .Returns(Task.CompletedTask);
        _mentorRepo
            .Setup(r => r.GetByUserIdAsync(cmd.UserId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(mentor);
        _unitOfWork.Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);
        _unitOfWork
            .Setup(u => u.CommitTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        _cacheService
            .Setup(c =>
                c.RemoveAsync(CacheKeys.UserProfile(cmd.UserId), It.IsAny<CancellationToken>())
            )
            .Returns(Task.CompletedTask);
        _cacheService
            .Setup(c =>
                c.RemoveAsync(CacheKeys.MentorDetail(mentor.Id), It.IsAny<CancellationToken>())
            )
            .Returns(Task.CompletedTask);
        _outputCacheStore
            .Setup(s =>
                s.EvictByTagAsync(CacheKeys.PublicListMentorTag, It.IsAny<CancellationToken>())
            )
            .Returns(ValueTask.CompletedTask);

        return mentor;
    }

    // ── User role — Success path ──────────────────────────────────────────

    [Fact]
    public async Task Handle_UserRole_WithValidData_ReturnsUnit()
    {
        var command = BuildUserCommand();
        SetupUserHappyPath(command);

        var result = await _sut.Handle(command, CancellationToken.None);

        result.Should().Be(MediatR.Unit.Value);
    }

    [Fact]
    public async Task Handle_UserRole_CallsUpdateUserAsync()
    {
        var command = BuildUserCommand();
        SetupUserHappyPath(command);

        await _sut.Handle(command, CancellationToken.None);

        _userRepo.Verify(
            r =>
                r.UpdateUserAsync(
                    command.UserId,
                    command.FullName,
                    command.PhoneNumber,
                    It.IsAny<CancellationToken>()
                ),
            Times.Once
        );
    }

    [Fact]
    public async Task Handle_UserRole_EvictsUserProfileCache()
    {
        var command = BuildUserCommand();
        SetupUserHappyPath(command);

        await _sut.Handle(command, CancellationToken.None);

        _cacheService.Verify(
            c =>
                c.RemoveAsync(CacheKeys.UserProfile(command.UserId), It.IsAny<CancellationToken>()),
            Times.Once
        );
    }

    [Fact]
    public async Task Handle_UserRole_WhenNoFieldsProvided_SkipsUpdateAndStillEvictsCache()
    {
        var command = BuildUserCommand(fullName: null, phoneNumber: null);
        _cacheService
            .Setup(c =>
                c.RemoveAsync(CacheKeys.UserProfile(command.UserId), It.IsAny<CancellationToken>())
            )
            .Returns(Task.CompletedTask);

        await _sut.Handle(command, CancellationToken.None);

        _userRepo.Verify(
            r =>
                r.UpdateUserAsync(
                    It.IsAny<Guid>(),
                    It.IsAny<string?>(),
                    It.IsAny<string?>(),
                    It.IsAny<CancellationToken>()
                ),
            Times.Never
        );
    }

    // ── Mentor role — Success path ────────────────────────────────────────

    [Fact]
    public async Task Handle_MentorRole_UpdatesMentorFields()
    {
        var command = BuildMentorCommand();
        var mentor = SetupMentorHappyPath(command);

        await _sut.Handle(command, CancellationToken.None);

        mentor.DisplayName.Should().Be(command.DisplayName);
        mentor.Bio.Should().Be(command.Bio);
        mentor.Specialization.Should().Be(command.Specialization);
        mentor.ExperienceYears.Should().Be(command.ExperienceYears!.Value);
        mentor.BasePrice.Should().Be(command.BasePrice!.Value);
        mentor.AvatarUrl.Should().Be(command.AvatarUrl);
    }

    [Fact]
    public async Task Handle_MentorRole_CallsUpdateUserAsyncForIdentityFields()
    {
        var command = BuildMentorCommand();
        SetupMentorHappyPath(command);

        await _sut.Handle(command, CancellationToken.None);

        _userRepo.Verify(
            r =>
                r.UpdateUserAsync(
                    command.UserId,
                    command.FullName,
                    command.PhoneNumber,
                    It.IsAny<CancellationToken>()
                ),
            Times.Once
        );
    }

    [Fact]
    public async Task Handle_MentorRole_CommitsTransaction()
    {
        var command = BuildMentorCommand();
        SetupMentorHappyPath(command);

        await _sut.Handle(command, CancellationToken.None);

        _unitOfWork.Verify(
            u => u.CommitTransactionAsync(It.IsAny<CancellationToken>()),
            Times.Once
        );
    }

    [Fact]
    public async Task Handle_MentorRole_EvictsAllRelevantCaches()
    {
        var command = BuildMentorCommand();
        var mentor = SetupMentorHappyPath(command);

        await _sut.Handle(command, CancellationToken.None);

        _cacheService.Verify(
            c =>
                c.RemoveAsync(CacheKeys.UserProfile(command.UserId), It.IsAny<CancellationToken>()),
            Times.Once
        );
        _cacheService.Verify(
            c => c.RemoveAsync(CacheKeys.MentorDetail(mentor.Id), It.IsAny<CancellationToken>()),
            Times.Once
        );
        _outputCacheStore.Verify(
            s => s.EvictByTagAsync(CacheKeys.PublicListMentorTag, It.IsAny<CancellationToken>()),
            Times.Once
        );
    }

    // ── Mentor role — Error paths ─────────────────────────────────────────

    [Fact]
    public async Task Handle_MentorRole_WhenMentorNotFound_ThrowsNotFoundException()
    {
        var command = BuildMentorCommand();

        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        _userRepo
            .Setup(r =>
                r.UpdateUserAsync(
                    command.UserId,
                    command.FullName,
                    command.PhoneNumber,
                    It.IsAny<CancellationToken>()
                )
            )
            .Returns(Task.CompletedTask);
        _mentorRepo
            .Setup(r => r.GetByUserIdAsync(command.UserId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((global::Mentor?)null);
        _unitOfWork
            .Setup(u => u.RollbackTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        var act = () => _sut.Handle(command, CancellationToken.None);

        await act.Should().ThrowAsync<NotFoundException>().WithMessage("*Mentor not found*");
    }

    [Fact]
    public async Task Handle_MentorRole_WhenSaveChangesThrows_RollsBackAndRethrows()
    {
        var command = BuildMentorCommand();
        var mentor = MentorTestData.BuildMentor(userId: command.UserId);

        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
        _userRepo
            .Setup(r =>
                r.UpdateUserAsync(
                    command.UserId,
                    command.FullName,
                    command.PhoneNumber,
                    It.IsAny<CancellationToken>()
                )
            )
            .Returns(Task.CompletedTask);
        _mentorRepo
            .Setup(r => r.GetByUserIdAsync(command.UserId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(mentor);
        _unitOfWork
            .Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()))
            .ThrowsAsync(new InvalidOperationException("DB error"));
        _unitOfWork
            .Setup(u => u.RollbackTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        var act = () => _sut.Handle(command, CancellationToken.None);

        await act.Should().ThrowAsync<InvalidOperationException>();
        _unitOfWork.Verify(
            u => u.RollbackTransactionAsync(It.IsAny<CancellationToken>()),
            Times.Once
        );
        _unitOfWork.Verify(
            u => u.CommitTransactionAsync(It.IsAny<CancellationToken>()),
            Times.Never
        );
    }
}
