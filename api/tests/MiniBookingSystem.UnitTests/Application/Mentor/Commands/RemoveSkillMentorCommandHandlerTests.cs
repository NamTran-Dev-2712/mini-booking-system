using MediatR;

namespace MiniBookingSystem.UnitTests.Application.Mentor.Commands;

public sealed class RemoveSkillMentorCommandHandlerTests
{
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly Mock<IMentorRepository> _mentorRepo;
    private readonly Mock<IMentorSkillRepository> _mentorSkillRepo;
    private readonly Mock<ICacheService> _cacheService;
    private readonly RemoveSkillMentorCommandHandler _sut;

    public RemoveSkillMentorCommandHandlerTests()
    {
        _unitOfWork = new Mock<IUnitOfWork>(MockBehavior.Strict);
        _mentorRepo = new Mock<IMentorRepository>(MockBehavior.Strict);
        _mentorSkillRepo = new Mock<IMentorSkillRepository>(MockBehavior.Strict);
        _cacheService = new Mock<ICacheService>(MockBehavior.Strict);
        var localizer = new Mock<ILocalizationService>();
        localizer.Setup(l => l.GetMessage(It.IsAny<string>())).Returns((string key) => key);
        localizer.Setup(l => l.GetMessage("Mentor.NotFound")).Returns("Mentor not found.");
        localizer
            .Setup(l => l.GetMessage("Mentor.SkillNotFound"))
            .Returns("Mentor skill not found.");

        _unitOfWork.Setup(u => u.Mentor).Returns(_mentorRepo.Object);
        _unitOfWork.Setup(u => u.MentorSkill).Returns(_mentorSkillRepo.Object);

        _sut = new RemoveSkillMentorCommandHandler(
            _unitOfWork.Object,
            _cacheService.Object,
            localizer.Object
        );
    }

    private void SetupHappyPath(Guid mentorId, Guid skillId)
    {
        _mentorRepo
            .Setup(r => r.GetByIdAsync(mentorId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(MentorTestData.BuildMentor(id: mentorId));

        _mentorSkillRepo
            .Setup(r => r.GetByIdAsync(skillId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(MentorTestData.BuildMentorSkill(id: skillId, mentorId: mentorId));

        _mentorSkillRepo.Setup(r => r.Remove(It.IsAny<MentorSkill>()));

        _unitOfWork.Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);

        _cacheService
            .Setup(c =>
                c.RemoveAsync(CacheKeys.MentorDetail(mentorId), It.IsAny<CancellationToken>())
            )
            .Returns(Task.CompletedTask);
    }

    // ── Success path ───────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WithValidData_ReturnsUnit()
    {
        // Arrange
        var mentorId = MentorTestData.Valid.MentorId;
        var skillId = MentorTestData.Valid.SkillId;
        SetupHappyPath(mentorId, skillId);

        var command = new RemoveSkillMentorCommand(mentorId, skillId);

        // Act
        var result = await _sut.Handle(command, CancellationToken.None);

        // Assert
        result.Should().Be(Unit.Value);
    }

    [Fact]
    public async Task Handle_RemovesSkillAndSavesChanges()
    {
        // Arrange
        var mentorId = MentorTestData.Valid.MentorId;
        var skillId = MentorTestData.Valid.SkillId;
        SetupHappyPath(mentorId, skillId);

        var command = new RemoveSkillMentorCommand(mentorId, skillId);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        _mentorSkillRepo.Verify(r => r.Remove(It.IsAny<MentorSkill>()), Times.Once);
        _unitOfWork.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Handle_InvalidatesMentorDetailCache()
    {
        // Arrange
        var mentorId = MentorTestData.Valid.MentorId;
        var skillId = MentorTestData.Valid.SkillId;
        SetupHappyPath(mentorId, skillId);

        var command = new RemoveSkillMentorCommand(mentorId, skillId);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        _cacheService.Verify(
            c => c.RemoveAsync(CacheKeys.MentorDetail(mentorId), It.IsAny<CancellationToken>()),
            Times.Once
        );
    }

    // ── Error paths ────────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenMentorNotFound_ThrowsNotFoundException()
    {
        // Arrange
        var mentorId = Guid.NewGuid();
        var skillId = Guid.NewGuid();

        _mentorRepo
            .Setup(r => r.GetByIdAsync(mentorId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((global::Mentor?)null);

        var command = new RemoveSkillMentorCommand(mentorId, skillId);

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<NotFoundException>().WithMessage("*Mentor not found*");
    }

    [Fact]
    public async Task Handle_WhenSkillNotFound_ThrowsNotFoundException()
    {
        // Arrange
        var mentorId = MentorTestData.Valid.MentorId;
        var skillId = Guid.NewGuid();

        _mentorRepo
            .Setup(r => r.GetByIdAsync(mentorId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(MentorTestData.BuildMentor(id: mentorId));

        _mentorSkillRepo
            .Setup(r => r.GetByIdAsync(skillId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((MentorSkill?)null);

        var command = new RemoveSkillMentorCommand(mentorId, skillId);

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<NotFoundException>().WithMessage("*Mentor skill not found*");
    }

    [Fact]
    public async Task Handle_WhenSkillBelongsToDifferentMentor_ThrowsNotFoundException()
    {
        // Arrange
        var mentorId = MentorTestData.Valid.MentorId;
        var otherMentorId = Guid.NewGuid();
        var skillId = MentorTestData.Valid.SkillId;

        _mentorRepo
            .Setup(r => r.GetByIdAsync(mentorId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(MentorTestData.BuildMentor(id: mentorId));

        // Skill belongs to a different mentor
        _mentorSkillRepo
            .Setup(r => r.GetByIdAsync(skillId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(MentorTestData.BuildMentorSkill(id: skillId, mentorId: otherMentorId));

        var command = new RemoveSkillMentorCommand(mentorId, skillId);

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<NotFoundException>();
    }
}
