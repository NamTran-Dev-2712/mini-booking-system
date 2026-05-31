namespace MiniBookingSystem.UnitTests.Application.Mentor.Commands;

public sealed class AddSkillMentorCommandHandlerTests
{
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly Mock<IMentorRepository> _mentorRepo;
    private readonly Mock<IMentorSkillRepository> _mentorSkillRepo;
    private readonly Mock<ICacheService> _cacheService;
    private readonly AddSkillMentorCommandHandler _sut;

    public AddSkillMentorCommandHandlerTests()
    {
        _unitOfWork = new Mock<IUnitOfWork>(MockBehavior.Strict);
        _mentorRepo = new Mock<IMentorRepository>(MockBehavior.Strict);
        _mentorSkillRepo = new Mock<IMentorSkillRepository>(MockBehavior.Strict);
        _cacheService = new Mock<ICacheService>(MockBehavior.Strict);
        var localizer = new Mock<ILocalizationService>();
        localizer.Setup(l => l.GetMessage(It.IsAny<string>())).Returns((string key) => key);
        localizer.Setup(l => l.GetMessage("Mentor.NotFound")).Returns("Mentor not found.");
        localizer
            .Setup(l => l.GetMessage("Mentor.SkillAlreadyExists"))
            .Returns("Mentor already has this skill.");

        _unitOfWork.Setup(u => u.Mentor).Returns(_mentorRepo.Object);
        _unitOfWork.Setup(u => u.MentorSkill).Returns(_mentorSkillRepo.Object);

        _cacheService
            .Setup(c => c.RemoveAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        _sut = new AddSkillMentorCommandHandler(
            _unitOfWork.Object,
            _cacheService.Object,
            localizer.Object
        );
    }

    private void SetupHappyPath(Guid mentorId, string skillName)
    {
        _mentorRepo
            .Setup(r => r.GetByIdAsync(mentorId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(MentorTestData.BuildMentor(id: mentorId));

        _mentorSkillRepo
            .Setup(r => r.MentorHasSkillAsync(mentorId, skillName, It.IsAny<CancellationToken>()))
            .ReturnsAsync(false);

        _mentorSkillRepo
            .Setup(r => r.AddAsync(It.IsAny<MentorSkill>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((MentorSkill ms, CancellationToken _) => ms);

        _unitOfWork.Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);
    }

    // ── Success path ───────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WithValidData_ReturnsMentorId()
    {
        // Arrange
        var command = MentorTestData.BuildAddSkillCommand();
        SetupHappyPath(command.MentorId, command.SkillName);

        // Act
        var result = await _sut.Handle(command, CancellationToken.None);

        // Assert
        result.Should().Be(command.MentorId);
    }

    [Fact]
    public async Task Handle_AddsSkillWithCorrectMentorIdAndName()
    {
        // Arrange
        var command = MentorTestData.BuildAddSkillCommand();
        MentorSkill? captured = null;

        _mentorRepo
            .Setup(r => r.GetByIdAsync(command.MentorId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(MentorTestData.BuildMentor(id: command.MentorId));
        _mentorSkillRepo
            .Setup(r =>
                r.MentorHasSkillAsync(
                    command.MentorId,
                    command.SkillName,
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(false);
        _mentorSkillRepo
            .Setup(r => r.AddAsync(It.IsAny<MentorSkill>(), It.IsAny<CancellationToken>()))
            .Callback<MentorSkill, CancellationToken>((ms, _) => captured = ms)
            .ReturnsAsync((MentorSkill ms, CancellationToken _) => ms);
        _unitOfWork.Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        captured!.MentorId.Should().Be(command.MentorId);
        captured.SkillName.Should().Be(command.SkillName);
    }

    [Fact]
    public async Task Handle_CallsSaveChangesOnce()
    {
        // Arrange
        var command = MentorTestData.BuildAddSkillCommand();
        SetupHappyPath(command.MentorId, command.SkillName);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        _unitOfWork.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    // ── Error paths ────────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenMentorNotFound_ThrowsNotFoundException()
    {
        // Arrange
        var command = MentorTestData.BuildAddSkillCommand();

        _mentorRepo
            .Setup(r => r.GetByIdAsync(command.MentorId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((global::Mentor?)null);

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<NotFoundException>().WithMessage("*Mentor not found*");
    }

    [Fact]
    public async Task Handle_WhenMentorRequesterIsNotOwner_ThrowsForbiddenException()
    {
        // Arrange — requester is a mentor whose user id does NOT own this mentor profile
        var command = MentorTestData.BuildAddSkillCommand(requesterUserId: Guid.NewGuid());

        _mentorRepo
            .Setup(r => r.GetByIdAsync(command.MentorId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(MentorTestData.BuildMentor(id: command.MentorId)); // UserId = Valid.UserId

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<ForbiddenException>();
        _mentorSkillRepo.Verify(
            r => r.AddAsync(It.IsAny<MentorSkill>(), It.IsAny<CancellationToken>()),
            Times.Never
        );
    }

    [Fact]
    public async Task Handle_WhenRequesterIsOwner_AddsSkill()
    {
        // Arrange — requester user id matches the mentor's owning user id
        var command = MentorTestData.BuildAddSkillCommand(
            requesterUserId: MentorTestData.Valid.UserId
        );
        SetupHappyPath(command.MentorId, command.SkillName);

        // Act
        var result = await _sut.Handle(command, CancellationToken.None);

        // Assert
        result.Should().Be(command.MentorId);
    }

    [Fact]
    public async Task Handle_WhenAdminRequester_BypassesOwnershipCheck()
    {
        // Arrange — admin acting on a mentor they do not own
        var command = MentorTestData.BuildAddSkillCommand(
            requesterUserId: Guid.NewGuid(),
            requesterIsAdmin: true
        );
        SetupHappyPath(command.MentorId, command.SkillName);

        // Act
        var result = await _sut.Handle(command, CancellationToken.None);

        // Assert
        result.Should().Be(command.MentorId);
    }

    [Fact]
    public async Task Handle_WhenSkillAlreadyExists_ThrowsConflictException()
    {
        // Arrange
        var command = MentorTestData.BuildAddSkillCommand();

        _mentorRepo
            .Setup(r => r.GetByIdAsync(command.MentorId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(MentorTestData.BuildMentor(id: command.MentorId));
        _mentorSkillRepo
            .Setup(r =>
                r.MentorHasSkillAsync(
                    command.MentorId,
                    command.SkillName,
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(true);

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should()
            .ThrowAsync<ConflictException>()
            .WithMessage("*Mentor already has this skill*");
    }
}
