namespace MiniBookingSystem.UnitTests.Application.Mentor.Commands;

public sealed class UpdateSlotMentorCommandHandlerTests
{
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly Mock<IMentorRepository> _mentorRepo;
    private readonly Mock<IMentorSlotRepository> _mentorSlotRepo;
    private readonly Mock<ICacheService> _cacheService;
    private readonly UpdateSlotMentorCommandHandler _sut;

    public UpdateSlotMentorCommandHandlerTests()
    {
        _unitOfWork = new Mock<IUnitOfWork>(MockBehavior.Strict);
        _mentorRepo = new Mock<IMentorRepository>(MockBehavior.Strict);
        _mentorSlotRepo = new Mock<IMentorSlotRepository>(MockBehavior.Strict);
        _cacheService = new Mock<ICacheService>(MockBehavior.Strict);
        var localizer = new Mock<ILocalizationService>();
        localizer.Setup(l => l.GetMessage(It.IsAny<string>())).Returns((string key) => key);
        localizer.Setup(l => l.GetMessage("Mentor.NotFound")).Returns("Mentor not found.");
        localizer.Setup(l => l.GetMessage("Mentor.SlotNotFound")).Returns("Slot not found.");
        localizer
            .Setup(l => l.GetMessage("Mentor.SlotConflict"))
            .Returns("The new time range conflicts with an existing slot.");

        _unitOfWork.Setup(u => u.Mentor).Returns(_mentorRepo.Object);
        _unitOfWork.Setup(u => u.MentorSlot).Returns(_mentorSlotRepo.Object);

        _sut = new UpdateSlotMentorCommandHandler(
            _unitOfWork.Object,
            _cacheService.Object,
            localizer.Object
        );
    }

    private MentorSlot SetupHappyPath(UpdateSlotMentorCommand cmd)
    {
        var slot = MentorTestData.BuildMentorSlot(id: cmd.Id, mentorId: cmd.MentorId);

        _mentorRepo
            .Setup(r => r.GetByIdAsync(cmd.MentorId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(MentorTestData.BuildMentor(id: cmd.MentorId));

        _mentorSlotRepo
            .Setup(r =>
                r.IsSlotOverlappingAsync(
                    cmd.MentorId,
                    cmd.StartTime,
                    cmd.EndTime,
                    cmd.Id,
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(false);

        _mentorSlotRepo
            .Setup(r => r.GetByIdAsync(cmd.Id, It.IsAny<CancellationToken>()))
            .ReturnsAsync(slot);

        _mentorSlotRepo
            .Setup(r => r.UpdateSlotAsync(It.IsAny<MentorSlot>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(slot.Id);

        _unitOfWork.Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);

        _cacheService
            .Setup(c =>
                c.RemoveAsync(CacheKeys.MentorDetail(cmd.MentorId), It.IsAny<CancellationToken>())
            )
            .Returns(Task.CompletedTask);

        return slot;
    }

    // ── Success path ───────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WithValidData_ReturnsSlotId()
    {
        // Arrange
        var command = MentorTestData.BuildUpdateSlotCommand();
        var slot = SetupHappyPath(command);

        // Act
        var result = await _sut.Handle(command, CancellationToken.None);

        // Assert
        result.Should().Be(slot.Id);
    }

    [Fact]
    public async Task Handle_UpdatesSlotProperties()
    {
        // Arrange
        var command = MentorTestData.BuildUpdateSlotCommand(
            name: "Afternoon Session",
            description: "Updated description",
            maxBookings: 3
        );
        var slot = SetupHappyPath(command);

        // Act
        await _sut.Handle(command, CancellationToken.None);

        // Assert
        slot.Name.Should().Be(command.Name);
        slot.StartTime.Should().Be(command.StartTime);
        slot.EndTime.Should().Be(command.EndTime);
        slot.Price.Should().Be(command.Price);
        slot.Description.Should().Be(command.Description);
        slot.MaxBookings.Should().Be(command.MaxBookings);
    }

    [Fact]
    public async Task Handle_InvalidatesCacheAfterUpdate()
    {
        // Arrange
        var command = MentorTestData.BuildUpdateSlotCommand();
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

    // ── Ownership ──────────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenMentorRequesterIsNotOwner_ThrowsForbiddenException()
    {
        // Arrange — requester is a mentor whose user id does NOT own this mentor profile
        var command = MentorTestData.BuildUpdateSlotCommand(requesterUserId: Guid.NewGuid());

        _mentorRepo
            .Setup(r => r.GetByIdAsync(command.MentorId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(MentorTestData.BuildMentor(id: command.MentorId)); // UserId = Valid.UserId

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<ForbiddenException>();
        _mentorSlotRepo.Verify(
            r => r.UpdateSlotAsync(It.IsAny<MentorSlot>(), It.IsAny<CancellationToken>()),
            Times.Never
        );
    }

    [Fact]
    public async Task Handle_WhenAdminRequester_BypassesOwnershipCheck()
    {
        // Arrange — admin acting on a mentor they do not own
        var command = MentorTestData.BuildUpdateSlotCommand(
            requesterUserId: Guid.NewGuid(),
            requesterIsAdmin: true
        );
        var slot = SetupHappyPath(command);

        // Act
        var result = await _sut.Handle(command, CancellationToken.None);

        // Assert
        result.Should().Be(slot.Id);
    }

    // ── Error paths ────────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenMentorNotFound_ThrowsNotFoundException()
    {
        // Arrange
        var command = MentorTestData.BuildUpdateSlotCommand();

        _mentorRepo
            .Setup(r => r.GetByIdAsync(command.MentorId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((global::Mentor?)null);

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<NotFoundException>().WithMessage($"*Mentor not found*");
    }

    [Fact]
    public async Task Handle_WhenSlotNotFound_ThrowsNotFoundException()
    {
        // Arrange
        var command = MentorTestData.BuildUpdateSlotCommand();

        _mentorRepo
            .Setup(r => r.GetByIdAsync(command.MentorId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(MentorTestData.BuildMentor(id: command.MentorId));
        _mentorSlotRepo
            .Setup(r =>
                r.IsSlotOverlappingAsync(
                    command.MentorId,
                    command.StartTime,
                    command.EndTime,
                    command.Id,
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(false);
        _mentorSlotRepo
            .Setup(r => r.GetByIdAsync(command.Id, It.IsAny<CancellationToken>()))
            .ReturnsAsync((MentorSlot?)null);

        // Act
        var act = () => _sut.Handle(command, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<NotFoundException>().WithMessage($"*Slot not found*");
    }

    [Fact]
    public async Task Handle_WhenSlotOverlaps_ThrowsConflictException()
    {
        // Arrange
        var command = MentorTestData.BuildUpdateSlotCommand();

        _mentorRepo
            .Setup(r => r.GetByIdAsync(command.MentorId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(MentorTestData.BuildMentor(id: command.MentorId));
        _mentorSlotRepo
            .Setup(r =>
                r.IsSlotOverlappingAsync(
                    command.MentorId,
                    command.StartTime,
                    command.EndTime,
                    command.Id,
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
