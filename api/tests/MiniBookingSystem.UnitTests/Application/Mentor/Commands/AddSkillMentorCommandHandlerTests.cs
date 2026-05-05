namespace MiniBookingSystem.UnitTests.Application.Mentor.Commands;

public sealed class AddSkillMentorCommandHandlerTests
{
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly Mock<IMentorRepository> _mentorRepo;
    private readonly Mock<IMentorSkillRepository> _mentorSkillRepo;
    private readonly AddSkillMentorCommandHandler _sut;

    public AddSkillMentorCommandHandlerTests()
    {
        _unitOfWork = new Mock<IUnitOfWork>(MockBehavior.Strict);
        _mentorRepo = new Mock<IMentorRepository>(MockBehavior.Strict);
        _mentorSkillRepo = new Mock<IMentorSkillRepository>(MockBehavior.Strict);

        _unitOfWork.Setup(u => u.Mentor).Returns(_mentorRepo.Object);
        _unitOfWork.Setup(u => u.MentorSkill).Returns(_mentorSkillRepo.Object);

        _sut = new AddSkillMentorCommandHandler(_unitOfWork.Object);
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
        await act.Should()
            .ThrowAsync<NotFoundException>()
            .WithMessage($"*Mentor*{command.MentorId}*");
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
        await act.Should().ThrowAsync<ConflictException>().WithMessage($"*{command.SkillName}*");
    }
}
