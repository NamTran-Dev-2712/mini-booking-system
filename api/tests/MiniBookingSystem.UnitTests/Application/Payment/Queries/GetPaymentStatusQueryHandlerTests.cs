namespace MiniBookingSystem.UnitTests.Application.Payment.Queries;

public sealed class GetPaymentStatusQueryHandlerTests
{
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly Mock<IBookingRepository> _bookingRepo;
    private readonly Mock<IPaymentTransactionRepository> _paymentTransactionRepo;
    private readonly GetPaymentStatusQueryHandler _sut;

    public GetPaymentStatusQueryHandlerTests()
    {
        _unitOfWork = new Mock<IUnitOfWork>(MockBehavior.Strict);
        _bookingRepo = new Mock<IBookingRepository>(MockBehavior.Strict);
        _paymentTransactionRepo = new Mock<IPaymentTransactionRepository>(MockBehavior.Strict);

        _unitOfWork.Setup(u => u.Booking).Returns(_bookingRepo.Object);
        _unitOfWork.Setup(u => u.PaymentTransaction).Returns(_paymentTransactionRepo.Object);

        _sut = new GetPaymentStatusQueryHandler(_unitOfWork.Object);
    }

    private static GetPaymentStatusQuery ValidQuery() =>
        new(BookingId: PaymentTestData.Valid.BookingId, UserId: PaymentTestData.Valid.UserId);

    private void SetupHappyPath(GetPaymentStatusQuery query)
    {
        var booking = BookingTestData.BuildBooking(id: query.BookingId, userId: query.UserId);

        var payment = PaymentTestData.BuildPaymentTransaction(bookingId: query.BookingId);

        _bookingRepo
            .Setup(r => r.GetByIdAsync(query.BookingId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(booking);

        _paymentTransactionRepo
            .Setup(r => r.GetByBookingIdAsync(query.BookingId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(payment);
    }

    // ── Success paths ──────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WithValidQuery_ReturnsPaymentStatusDto()
    {
        var query = ValidQuery();
        SetupHappyPath(query);

        var result = await _sut.Handle(query, CancellationToken.None);

        result.Should().NotBeNull();
    }

    [Fact]
    public async Task Handle_ReturnsDtoWithCorrectPaymentStatus()
    {
        var query = ValidQuery();
        var booking = BookingTestData.BuildBooking(id: query.BookingId, userId: query.UserId);
        var payment = PaymentTestData.BuildPaymentTransaction(
            bookingId: query.BookingId,
            status: PaymentStatus.Succeeded
        );

        _bookingRepo
            .Setup(r => r.GetByIdAsync(query.BookingId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(booking);

        _paymentTransactionRepo
            .Setup(r => r.GetByBookingIdAsync(query.BookingId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(payment);

        var result = await _sut.Handle(query, CancellationToken.None);

        result.Status.Should().Be(PaymentStatus.Succeeded);
        result.PaymentTransactionId.Should().Be(payment.Id);
    }

    [Fact]
    public async Task Handle_WhenPaymentHasFailureReason_IncludesItInDto()
    {
        const string reason = "Insufficient amount. Required 500000, received 100.";
        var query = ValidQuery();
        var booking = BookingTestData.BuildBooking(id: query.BookingId, userId: query.UserId);
        var payment = PaymentTestData.BuildPaymentTransaction(
            bookingId: query.BookingId,
            status: PaymentStatus.Failed
        );
        payment.FailureReason = reason;

        _bookingRepo
            .Setup(r => r.GetByIdAsync(query.BookingId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(booking);

        _paymentTransactionRepo
            .Setup(r => r.GetByBookingIdAsync(query.BookingId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(payment);

        var result = await _sut.Handle(query, CancellationToken.None);

        result.FailureReason.Should().Be(reason);
    }

    // ── Error paths ────────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenBookingNotFound_ThrowsNotFoundException()
    {
        var query = ValidQuery();

        _bookingRepo
            .Setup(r => r.GetByIdAsync(query.BookingId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((global::Booking?)null);

        var act = () => _sut.Handle(query, CancellationToken.None);

        await act.Should().ThrowAsync<NotFoundException>().WithMessage("*Booking*");
    }

    [Fact]
    public async Task Handle_WhenUserDoesNotOwnBooking_ThrowsUnauthorizedException()
    {
        var query = new GetPaymentStatusQuery(
            BookingId: PaymentTestData.Valid.BookingId,
            UserId: Guid.NewGuid() // different user
        );

        var booking = BookingTestData.BuildBooking(
            id: query.BookingId,
            userId: Guid.NewGuid() // owned by someone else
        );

        _bookingRepo
            .Setup(r => r.GetByIdAsync(query.BookingId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(booking);

        var act = () => _sut.Handle(query, CancellationToken.None);

        await act.Should().ThrowAsync<UnauthorizedException>();
    }

    [Fact]
    public async Task Handle_WhenPaymentTransactionNotFound_ThrowsNotFoundException()
    {
        var query = ValidQuery();
        var booking = BookingTestData.BuildBooking(id: query.BookingId, userId: query.UserId);

        _bookingRepo
            .Setup(r => r.GetByIdAsync(query.BookingId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(booking);

        _paymentTransactionRepo
            .Setup(r => r.GetByBookingIdAsync(query.BookingId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((PaymentTransaction?)null);

        var act = () => _sut.Handle(query, CancellationToken.None);

        await act.Should().ThrowAsync<NotFoundException>().WithMessage("*PaymentTransaction*");
    }
}
