namespace MiniBookingSystem.UnitTests.Application.Mentor.Commands;

public sealed class CreateSlotMentorCommandHandlerTests
{
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly Mock<IMentorRepository> _mentorRepo;
    private readonly Mock<IMentorSlotRepository> _mentorSlotRepo;
    private readonly Mock<ICacheService> _cacheService;
    private readonly CreateSlotMentorCommandHandler _sut;

    public CreateSlotMentorCommandHandlerTests()
    {
        _unitOfWork = new Mock<IUnitOfWork>(MockBehavior.Strict);
        _mentorRepo = new Mock<IMentorRepository>(MockBehavior.Strict);
        _mentorSlotRepo = new Mock<IMentorSlotRepository>(MockBehavior.Strict);
        _cacheService = new Mock<ICacheService>(MockBehavior.Strict);

        _unitOfWork.Setup(u => u.Mentor).Returns(_mentorRepo.Object);
        _unitOfWork.Setup(u => u.MentorSlot).Returns(_mentorSlotRepo.Object);

        _sut = new CreateSlotMentorCommandHandler(_unitOfWork.Object, _cacheService.Object);
    }

    private void SetupHappyPath(CreateSlotMentorCommand cmd)
    {
        _mentorRepo
            .Setup(r => r.GetByIdAsync(cmd.MentorId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(MentorTestData.BuildMentor(id: cmd.MentorId));

        _mentorSlotRepo
            .Setup(r =>
                r.IsSlotOverlappingAsync(
                    cmd.MentorId,
                    cmd.StartTime,
                    cmd.EndTime,
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(false);

        _mentorSlotRepo
            .Setup(r => r.AddAsync(It.IsAny<MentorSlot>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((MentorSlot ms, CancellationToken _) => ms);

        _unitOfWork.Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);

        _cacheService
            .Setup(c =>
                c.RemoveAsync(CacheKeys.MentorDetail(cmd.MentorId), It.IsAny<CancellationToken>())
            )
            .Returns(Task.CompletedTask);
    }

    // ── Success path ───────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WithValidData_ReturnsNonEmptySlotId()
    {
        // Arrange
        var command = MentorTestData.BuildCreateSlotCommand();
        SetupHappyPath(command);

        // Act
        var result = await _sut.Handle(command, CancellationToken.None);

        // Assert
        result.Should().NotBeEmpty();
    }

    [Fact]
    public async Task Handle_SetsNewSlotStatusToAvailable()
    {
        // Arrange
        var command = MentorTestData.BuildCreateSlotCommand();
        MentorSlot? captured = null;

        _mentorRepo
            .Setup(r => r.GetByIdAsync(command.MentorId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(MentorTestData.BuildMentor(id: command.MentorId));
        _mentorSlotRepo
            .Setup(r =>
                r.IsSlotOverlappingAsync(
                    command.MentorId,
                    command.StartTime,
                    command.EndTime,
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(false);
        _mentorSlotRepo
            .Setup(r => r.AddAsync(It.IsAny<MentorSlot>(), It.IsAny<CancellationToken>()))
            .Callback<MentorSlot, CancellationToken>((ms, _) => captured = ms)
            .ReturnsAsync((MentorSlot ms, CancellationToken _) => ms);
        _unitOfWork.Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);
        _cacheService
            .Setup(c =>
                c.RemoveAsync(
                    CacheKeys.MentorDetail(command.MentorId),
                    It.IsAny<CancellationToken>()
                )
            )
            .Returns(Task.CompletedTask);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        captured!.Status.Should().Be(MentorSlotStatus.Available);
    }

    [Fact]
    public async Task Handle_InvalidatesMentorDetailCacheAfterCreation()
    {
        // Arrange
        var command = MentorTestData.BuildCreateSlotCommand();
        SetupHappyPath(command);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        _cacheService.Verify(
            c =>
                c.RemoveAsync(
                    CacheKeys.MentorDetail(command.MentorId),
                    It.IsAny<CancellationToken>()
                ),
            Times.Once
        );
    }

    [Fact]
    public async Task Handle_CallsSaveChangesOnce()
    {
        // Arrange
        var command = MentorTestData.BuildCreateSlotCommand();
        SetupHappyPath(command);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        _unitOfWork.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Handle_SetsNameFromCommand()
    {
        // Arrange
        var command = MentorTestData.BuildCreateSlotCommand(name: "Morning Session");
        MentorSlot? captured = null;

        _mentorRepo
            .Setup(r => r.GetByIdAsync(command.MentorId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(MentorTestData.BuildMentor(id: command.MentorId));
        _mentorSlotRepo
            .Setup(r =>
                r.IsSlotOverlappingAsync(
                    command.MentorId,
                    command.StartTime,
                    command.EndTime,
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(false);
        _mentorSlotRepo
            .Setup(r => r.AddAsync(It.IsAny<MentorSlot>(), It.IsAny<CancellationToken>()))
            .Callback<MentorSlot, CancellationToken>((ms, _) => captured = ms)
            .ReturnsAsync((MentorSlot ms, CancellationToken _) => ms);
        _unitOfWork.Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);
        _cacheService
            .Setup(c =>
                c.RemoveAsync(
                    CacheKeys.MentorDetail(command.MentorId),
                    It.IsAny<CancellationToken>()
                )
            )
            .Returns(Task.CompletedTask);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        captured!.Name.Should().Be("Morning Session");
    }

    // ── Error paths ────────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenMentorNotFound_ThrowsNotFoundException()
    {
        // Arrange
        var command = MentorTestData.BuildCreateSlotCommand();

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
    public async Task Handle_WhenSlotOverlaps_ThrowsConflictException()
    {
        // Arrange
        var command = MentorTestData.BuildCreateSlotCommand();

        _mentorRepo
            .Setup(r => r.GetByIdAsync(command.MentorId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(MentorTestData.BuildMentor(id: command.MentorId));
        _mentorSlotRepo
            .Setup(r =>
                r.IsSlotOverlappingAsync(
                    command.MentorId,
                    command.StartTime,
                    command.EndTime,
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(true);

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<ConflictException>();
    }
}
