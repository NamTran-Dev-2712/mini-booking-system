namespace MiniBookingSystem.UnitTests.Application.Booking.Commands;

public sealed class CancelBookingCommandHandlerTests
{
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly Mock<IBookingRepository> _bookingRepo;
    private readonly Mock<ICacheService> _cacheService;
    private readonly Mock<ILocalizationService> _localizer;
    private readonly CancelBookingCommandHandler _sut;

    public CancelBookingCommandHandlerTests()
    {
        _unitOfWork = new Mock<IUnitOfWork>(MockBehavior.Strict);
        _bookingRepo = new Mock<IBookingRepository>(MockBehavior.Strict);
        _cacheService = new Mock<ICacheService>(MockBehavior.Strict);
        _localizer = new Mock<ILocalizationService>();
        _localizer.Setup(l => l.GetMessage(It.IsAny<string>())).Returns((string key) => key);
        _localizer.Setup(l => l.GetMessage("Booking.NotFound")).Returns("Booking not found.");
        _localizer
            .Setup(l => l.GetMessage("Booking.CompletedCannotCancel"))
            .Returns("Completed bookings cannot be cancelled.");
        _localizer
            .Setup(l => l.GetMessage("Booking.ExpiredCannotCancel"))
            .Returns("Expired bookings cannot be cancelled.");

        _unitOfWork.Setup(u => u.Booking).Returns(_bookingRepo.Object);

        _sut = new CancelBookingCommandHandler(
            _unitOfWork.Object,
            _cacheService.Object,
            _localizer.Object
        );
    }

    /// <summary>Sets up the mocks for a successful cancellation of the given booking.</summary>
    private void SetupHappyPath(CancelBookingCommand cmd, global::Booking booking)
    {
        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        _bookingRepo
            .Setup(r => r.GetByIdAsync(cmd.BookingId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(booking);

        _bookingRepo
            .Setup(r => r.UpdateAsync(booking, It.IsAny<CancellationToken>()))
            .ReturnsAsync(booking.Id);

        _unitOfWork
            .Setup(u => u.CommitTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        _cacheService
            .Setup(c =>
                c.RemoveAsync(CacheKeys.BookingDetail(cmd.BookingId), It.IsAny<CancellationToken>())
            )
            .Returns(Task.CompletedTask);
    }

    private void SetupRollback()
    {
        _unitOfWork
            .Setup(u => u.RollbackTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
    }

    // ── Success paths ──────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenBookingIsPendingPayment_ReturnsCancelledBookingId()
    {
        var booking = BookingTestData.BuildBooking(status: BookingStatus.PendingPayment);
        var command = BookingTestData.BuildCancelBookingCommand(bookingId: booking.Id);
        SetupHappyPath(command, booking);

        var result = await _sut.Handle(command, CancellationToken.None);

        result.Should().Be(booking.Id);
    }

    [Fact]
    public async Task Handle_SetsCancellationReason()
    {
        var booking = BookingTestData.BuildBooking(status: BookingStatus.PendingPayment);
        var command = BookingTestData.BuildCancelBookingCommand(
            bookingId: booking.Id,
            reason: "Changed my mind about the session."
        );
        SetupHappyPath(command, booking);

        await _sut.Handle(command, CancellationToken.None);

        booking.CancellationReason.Should().Be(command.CancellationReason);
    }

    [Fact]
    public async Task Handle_SetsBookingStatusToCancelled()
    {
        var booking = BookingTestData.BuildBooking(status: BookingStatus.PendingPayment);
        var command = BookingTestData.BuildCancelBookingCommand(bookingId: booking.Id);
        SetupHappyPath(command, booking);

        await _sut.Handle(command, CancellationToken.None);

        booking.Status.Should().Be(BookingStatus.Cancelled);
    }

    [Fact]
    public async Task Handle_InvalidatesBookingDetailCacheAfterCancellation()
    {
        var booking = BookingTestData.BuildBooking(status: BookingStatus.PendingPayment);
        var command = BookingTestData.BuildCancelBookingCommand(bookingId: booking.Id);
        SetupHappyPath(command, booking);

        await _sut.Handle(command, CancellationToken.None);

        _cacheService.Verify(
            c => c.RemoveAsync(CacheKeys.BookingDetail(booking.Id), It.IsAny<CancellationToken>()),
            Times.Once
        );
    }

    [Fact]
    public async Task Handle_CommitsTransactionOnSuccess()
    {
        var booking = BookingTestData.BuildBooking(status: BookingStatus.PendingPayment);
        var command = BookingTestData.BuildCancelBookingCommand(bookingId: booking.Id);
        SetupHappyPath(command, booking);

        await _sut.Handle(command, CancellationToken.None);

        _unitOfWork.Verify(
            u => u.CommitTransactionAsync(It.IsAny<CancellationToken>()),
            Times.Once
        );
    }

    // ── Idempotency: already cancelled ────────────────────────────────────

    [Fact]
    public async Task Handle_WhenBookingAlreadyCancelled_ReturnsIdempotently()
    {
        var booking = BookingTestData.BuildBooking(status: BookingStatus.Cancelled);
        var command = BookingTestData.BuildCancelBookingCommand(bookingId: booking.Id);

        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        _bookingRepo
            .Setup(r => r.GetByIdAsync(booking.Id, It.IsAny<CancellationToken>()))
            .ReturnsAsync(booking);

        var result = await _sut.Handle(command, CancellationToken.None);

        result.Should().Be(booking.Id);
        // No UpdateAsync, CommitTransactionAsync, or cache eviction called
        _bookingRepo.Verify(
            r => r.UpdateAsync(It.IsAny<global::Booking>(), It.IsAny<CancellationToken>()),
            Times.Never
        );
    }

    // ── Error paths ────────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenBookingNotFound_ThrowsNotFoundException()
    {
        var command = BookingTestData.BuildCancelBookingCommand();

        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        _bookingRepo
            .Setup(r => r.GetByIdAsync(command.BookingId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((global::Booking?)null);

        SetupRollback();

        var act = () => _sut.Handle(command, CancellationToken.None);

        await act.Should().ThrowAsync<NotFoundException>().WithMessage("*Booking not found*");
    }

    [Fact]
    public async Task Handle_WhenBookingIsCompleted_ThrowsConflictException()
    {
        var booking = BookingTestData.BuildBooking(status: BookingStatus.Completed);
        var command = BookingTestData.BuildCancelBookingCommand(bookingId: booking.Id);

        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        _bookingRepo
            .Setup(r => r.GetByIdAsync(booking.Id, It.IsAny<CancellationToken>()))
            .ReturnsAsync(booking);

        SetupRollback();

        await _sut.Invoking(s => s.Handle(command, CancellationToken.None))
            .Should()
            .ThrowAsync<ConflictException>()
            .WithMessage("*Completed bookings cannot be cancelled*");
    }

    [Fact]
    public async Task Handle_WhenBookingIsExpired_ThrowsConflictException()
    {
        var booking = BookingTestData.BuildBooking(status: BookingStatus.Expired);
        var command = BookingTestData.BuildCancelBookingCommand(bookingId: booking.Id);

        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        _bookingRepo
            .Setup(r => r.GetByIdAsync(booking.Id, It.IsAny<CancellationToken>()))
            .ReturnsAsync(booking);

        SetupRollback();

        await _sut.Invoking(s => s.Handle(command, CancellationToken.None))
            .Should()
            .ThrowAsync<ConflictException>()
            .WithMessage("*Expired bookings cannot be cancelled*");
    }

    [Fact]
    public async Task Handle_OnException_RollsBackTransaction()
    {
        var command = BookingTestData.BuildCancelBookingCommand();

        _unitOfWork
            .Setup(u => u.BeginTransactionAsync(It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        _bookingRepo
            .Setup(r => r.GetByIdAsync(command.BookingId, It.IsAny<CancellationToken>()))
            .ThrowsAsync(new Exception("DB error"));

        SetupRollback();

        await Assert.ThrowsAsync<Exception>(() => _sut.Handle(command, CancellationToken.None));

        _unitOfWork.Verify(
            u => u.RollbackTransactionAsync(It.IsAny<CancellationToken>()),
            Times.Once
        );
    }
}
