namespace MiniBookingSystem.UnitTests.Application.Booking.Commands;

public sealed class CreateBookingCommandHandlerTests
{
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly Mock<IBookingRepository> _bookingRepo;
    private readonly Mock<IMentorSlotRepository> _mentorSlotRepo;
    private readonly Mock<ICacheService> _cacheService;
    private readonly Mock<ILocalizationService> _localizer;
    private readonly CreateBookingCommandHandler _sut;

    public CreateBookingCommandHandlerTests()
    {
        _unitOfWork = new Mock<IUnitOfWork>(MockBehavior.Strict);
        _bookingRepo = new Mock<IBookingRepository>(MockBehavior.Strict);
        _mentorSlotRepo = new Mock<IMentorSlotRepository>(MockBehavior.Strict);
        _cacheService = new Mock<ICacheService>(MockBehavior.Strict);
        _localizer = new Mock<ILocalizationService>();
        _localizer.Setup(l => l.GetMessage(It.IsAny<string>())).Returns((string key) => key);
        _localizer
            .Setup(l => l.GetMessage("Booking.AlreadyBooked"))
            .Returns("You already have an active booking for this slot.");

        _unitOfWork.Setup(u => u.Booking).Returns(_bookingRepo.Object);
        _unitOfWork.Setup(u => u.MentorSlot).Returns(_mentorSlotRepo.Object);

        _sut = new CreateBookingCommandHandler(
            _unitOfWork.Object,
            _cacheService.Object,
            _localizer.Object
        );
    }

    private MentorSlot SetupHappyPath(
        CreateBookingCommand cmd,
        int maxBookings = 5,
        int currentBookings = 0
    )
    {
        var slot = MentorTestData.BuildMentorSlot(
            id: cmd.MentorSlotId,
            mentorId: MentorTestData.Valid.MentorId,
            maxBookings: maxBookings,
            currentBookings: currentBookings
        );

        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        _bookingRepo
            .Setup(r =>
                r.HasActiveBookingAsync(cmd.UserId, cmd.MentorSlotId, It.IsAny<CancellationToken>())
            )
            .ReturnsAsync(false);

        _mentorSlotRepo
            .Setup(r => r.GetSlotByIdForUpdateAsync(cmd.MentorSlotId))
            .ReturnsAsync(slot);

        _bookingRepo
            .Setup(r => r.AddAsync(It.IsAny<global::Booking>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((global::Booking b, CancellationToken _) => b);

        _mentorSlotRepo
            .Setup(r => r.UpdateSlotAsync(It.IsAny<MentorSlot>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(slot.Id);

        _unitOfWork.Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);

        _unitOfWork
            .Setup(u => u.CommitTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        _cacheService
            .Setup(c =>
                c.RemoveAsync(
                    CacheKeys.MentorDetail(MentorTestData.Valid.MentorId),
                    It.IsAny<CancellationToken>()
                )
            )
            .Returns(Task.CompletedTask);

        return slot;
    }

    private void SetupRollback()
    {
        _unitOfWork
            .Setup(u => u.RollbackTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
    }

    // ── Success paths ──────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WithValidCommand_ReturnsNonEmptyBookingId()
    {
        var command = BookingTestData.BuildCreateBookingCommand();
        SetupHappyPath(command);

        var result = await _sut.Handle(command, CancellationToken.None);

        result.Should().NotBeEmpty();
    }

    [Fact]
    public async Task Handle_IncrementsSlotCurrentBookings()
    {
        var command = BookingTestData.BuildCreateBookingCommand();
        var slot = SetupHappyPath(command, maxBookings: 5, currentBookings: 0);

        await _sut.Handle(command, CancellationToken.None);

        slot.CurrentBookings.Should().Be(1);
    }

    [Fact]
    public async Task Handle_WhenSlotReachesMaxBookings_SetsStatusToFullyBooked()
    {
        var command = BookingTestData.BuildCreateBookingCommand();
        var slot = SetupHappyPath(command, maxBookings: 1, currentBookings: 0);

        await _sut.Handle(command, CancellationToken.None);

        slot.Status.Should().Be(MentorSlotStatus.FullyBooked);
    }

    [Fact]
    public async Task Handle_WhenSlotStillHasRoom_KeepsStatusAvailable()
    {
        var command = BookingTestData.BuildCreateBookingCommand();
        var slot = SetupHappyPath(command, maxBookings: 3, currentBookings: 0);

        await _sut.Handle(command, CancellationToken.None);

        slot.Status.Should().Be(MentorSlotStatus.Available);
    }

    [Fact]
    public async Task Handle_InvalidatesMentorDetailCacheAfterBooking()
    {
        var command = BookingTestData.BuildCreateBookingCommand();
        SetupHappyPath(command);

        await _sut.Handle(command, CancellationToken.None);

        _cacheService.Verify(
            c =>
                c.RemoveAsync(
                    CacheKeys.MentorDetail(MentorTestData.Valid.MentorId),
                    It.IsAny<CancellationToken>()
                ),
            Times.Once
        );
    }

    [Fact]
    public async Task Handle_CommitsTransactionOnSuccess()
    {
        var command = BookingTestData.BuildCreateBookingCommand();
        SetupHappyPath(command);

        await _sut.Handle(command, CancellationToken.None);

        _unitOfWork.Verify(
            u => u.CommitTransactionAsync(It.IsAny<CancellationToken>()),
            Times.Once
        );
    }

    // ── Idempotency paths ──────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WithIdempotencyKey_WhenCacheEmpty_CreatesBookingAndCachesResult()
    {
        var command = BookingTestData.BuildCreateBookingCommand(
            idempotencyKey: BookingTestData.Valid.IdempotencyKey
        );
        var idempotencyKey = CacheKeys.Idempotency(
            "booking",
            command.UserId,
            command.IdempotencyKey!
        );

        _cacheService
            .Setup(c => c.GetAsync<Guid>(idempotencyKey, It.IsAny<CancellationToken>()))
            .ReturnsAsync(Guid.Empty);

        SetupHappyPath(command);

        _cacheService
            .Setup(c =>
                c.SetAsync(
                    idempotencyKey,
                    It.IsAny<Guid>(),
                    TimeSpan.FromHours(24),
                    It.IsAny<CancellationToken>()
                )
            )
            .Returns(Task.CompletedTask);

        var result = await _sut.Handle(command, CancellationToken.None);

        result.Should().NotBeEmpty();
        _cacheService.Verify(
            c =>
                c.SetAsync(
                    idempotencyKey,
                    It.IsAny<Guid>(),
                    TimeSpan.FromHours(24),
                    It.IsAny<CancellationToken>()
                ),
            Times.Once
        );
    }

    [Fact]
    public async Task Handle_WithIdempotencyKey_WhenCachedBookingStillPending_ReturnsCachedId()
    {
        var existingBookingId = Guid.NewGuid();
        var command = BookingTestData.BuildCreateBookingCommand(
            idempotencyKey: BookingTestData.Valid.IdempotencyKey
        );
        var idempotencyKey = CacheKeys.Idempotency(
            "booking",
            command.UserId,
            command.IdempotencyKey!
        );

        _cacheService
            .Setup(c => c.GetAsync<Guid>(idempotencyKey, It.IsAny<CancellationToken>()))
            .ReturnsAsync(existingBookingId);

        _bookingRepo
            .Setup(r => r.GetByIdAsync(existingBookingId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(
                BookingTestData.BuildBooking(
                    id: existingBookingId,
                    status: BookingStatus.PendingPayment
                )
            );

        var result = await _sut.Handle(command, CancellationToken.None);

        result.Should().Be(existingBookingId);
        _unitOfWork.Verify(
            u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()),
            Times.Never
        );
    }

    [Fact]
    public async Task Handle_WithIdempotencyKey_WhenCachedBookingStale_EvictsCacheAndCreatesNew()
    {
        var staleBookingId = Guid.NewGuid();
        var command = BookingTestData.BuildCreateBookingCommand(
            idempotencyKey: BookingTestData.Valid.IdempotencyKey
        );
        var idempotencyKey = CacheKeys.Idempotency(
            "booking",
            command.UserId,
            command.IdempotencyKey!
        );

        _cacheService
            .Setup(c => c.GetAsync<Guid>(idempotencyKey, It.IsAny<CancellationToken>()))
            .ReturnsAsync(staleBookingId);

        _bookingRepo
            .Setup(r => r.GetByIdAsync(staleBookingId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(
                BookingTestData.BuildBooking(id: staleBookingId, status: BookingStatus.Cancelled)
            );

        // Evicts stale cache key
        _cacheService
            .Setup(c => c.RemoveAsync(idempotencyKey, It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        SetupHappyPath(command);

        // Stores new result
        _cacheService
            .Setup(c =>
                c.SetAsync(
                    idempotencyKey,
                    It.IsAny<Guid>(),
                    TimeSpan.FromHours(24),
                    It.IsAny<CancellationToken>()
                )
            )
            .Returns(Task.CompletedTask);

        var result = await _sut.Handle(command, CancellationToken.None);

        result.Should().NotBeEmpty();
        result.Should().NotBe(staleBookingId);
        _cacheService.Verify(
            c => c.RemoveAsync(idempotencyKey, It.IsAny<CancellationToken>()),
            Times.Once
        );
    }

    // ── Error paths ────────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenActiveBookingExists_ThrowsConflictException()
    {
        var command = BookingTestData.BuildCreateBookingCommand();

        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        _bookingRepo
            .Setup(r =>
                r.HasActiveBookingAsync(
                    command.UserId,
                    command.MentorSlotId,
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(true);

        SetupRollback();

        var act = () => _sut.Handle(command, CancellationToken.None);

        await act.Should().ThrowAsync<ConflictException>();
        _unitOfWork.Verify(
            u => u.RollbackTransactionAsync(It.IsAny<CancellationToken>()),
            Times.Once
        );
    }

    [Fact]
    public async Task Handle_WhenSlotNotFound_ThrowsInvalidOperationException()
    {
        var command = BookingTestData.BuildCreateBookingCommand();

        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        _bookingRepo
            .Setup(r =>
                r.HasActiveBookingAsync(
                    command.UserId,
                    command.MentorSlotId,
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(false);

        _mentorSlotRepo
            .Setup(r => r.GetSlotByIdForUpdateAsync(command.MentorSlotId))
            .ReturnsAsync((MentorSlot?)null);

        SetupRollback();

        var act = () => _sut.Handle(command, CancellationToken.None);

        await act.Should()
            .ThrowAsync<InvalidOperationException>()
            .WithMessage("*no longer available*");
    }

    [Fact]
    public async Task Handle_WhenSlotIsFullyBooked_ThrowsInvalidOperationException()
    {
        var command = BookingTestData.BuildCreateBookingCommand();
        var fullSlot = MentorTestData.BuildMentorSlot(
            id: command.MentorSlotId,
            status: MentorSlotStatus.FullyBooked,
            maxBookings: 1,
            currentBookings: 1
        );

        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        _bookingRepo
            .Setup(r =>
                r.HasActiveBookingAsync(
                    command.UserId,
                    command.MentorSlotId,
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(false);

        _mentorSlotRepo
            .Setup(r => r.GetSlotByIdForUpdateAsync(command.MentorSlotId))
            .ReturnsAsync(fullSlot);

        SetupRollback();

        var act = () => _sut.Handle(command, CancellationToken.None);

        await act.Should()
            .ThrowAsync<InvalidOperationException>()
            .WithMessage("*no longer available*");
    }

    [Fact]
    public async Task Handle_WhenSlotStatusIsNotAvailable_ThrowsInvalidOperationException()
    {
        var command = BookingTestData.BuildCreateBookingCommand();
        var unavailableSlot = MentorTestData.BuildMentorSlot(
            id: command.MentorSlotId,
            status: MentorSlotStatus.Completed,
            maxBookings: 5,
            currentBookings: 0
        );

        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        _bookingRepo
            .Setup(r =>
                r.HasActiveBookingAsync(
                    command.UserId,
                    command.MentorSlotId,
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(false);

        _mentorSlotRepo
            .Setup(r => r.GetSlotByIdForUpdateAsync(command.MentorSlotId))
            .ReturnsAsync(unavailableSlot);

        SetupRollback();

        var act = () => _sut.Handle(command, CancellationToken.None);

        await act.Should()
            .ThrowAsync<InvalidOperationException>()
            .WithMessage("*no longer available*");
    }

    [Fact]
    public async Task Handle_OnException_RollsBackTransaction()
    {
        var command = BookingTestData.BuildCreateBookingCommand();

        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        _bookingRepo
            .Setup(r =>
                r.HasActiveBookingAsync(
                    command.UserId,
                    command.MentorSlotId,
                    It.IsAny<CancellationToken>()
                )
            )
            .ThrowsAsync(new Exception("DB error"));

        SetupRollback();

        await Assert.ThrowsAsync<Exception>(() => _sut.Handle(command, CancellationToken.None));

        _unitOfWork.Verify(
            u => u.RollbackTransactionAsync(It.IsAny<CancellationToken>()),
            Times.Once
        );
    }
}
