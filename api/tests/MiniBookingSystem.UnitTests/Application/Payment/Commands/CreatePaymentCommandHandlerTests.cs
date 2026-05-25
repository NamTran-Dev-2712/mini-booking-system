namespace MiniBookingSystem.UnitTests.Application.Payment.Commands;

public sealed class CreatePaymentCommandHandlerTests
{
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly Mock<IBookingRepository> _bookingRepo;
    private readonly Mock<IPaymentTransactionRepository> _paymentTransactionRepo;
    private readonly Mock<ISePayQrService> _sePayQrService;
    private readonly CreatePaymentCommandHandler _sut;

    public CreatePaymentCommandHandlerTests()
    {
        _unitOfWork = new Mock<IUnitOfWork>(MockBehavior.Strict);
        _bookingRepo = new Mock<IBookingRepository>(MockBehavior.Strict);
        _paymentTransactionRepo = new Mock<IPaymentTransactionRepository>(MockBehavior.Strict);
        _sePayQrService = new Mock<ISePayQrService>(MockBehavior.Strict);
        var localizer = new Mock<ILocalizationService>();
        localizer.Setup(l => l.GetMessage(It.IsAny<string>())).Returns((string key) => key);
        localizer.Setup(l => l.GetMessage("Booking.NotFound")).Returns("Booking not found.");
        localizer
            .Setup(l => l.GetMessage("Payment.CreateUnauthorized"))
            .Returns("You can only create payments for your own bookings.");

        _unitOfWork.Setup(u => u.Booking).Returns(_bookingRepo.Object);
        _unitOfWork.Setup(u => u.PaymentTransaction).Returns(_paymentTransactionRepo.Object);

        _sut = new CreatePaymentCommandHandler(
            _unitOfWork.Object,
            _sePayQrService.Object,
            localizer.Object
        );
    }

    private global::Booking BuildBookingWithSlot(
        Guid? userId = null,
        BookingStatus status = BookingStatus.PendingPayment,
        decimal price = MentorTestData.Valid.BasePrice
    )
    {
        var slot = MentorTestData.BuildMentorSlot(id: BookingTestData.Valid.SlotId);
        slot.Price = price;

        var booking = BookingTestData.BuildBooking(
            id: BookingTestData.Valid.BookingId,
            userId: userId ?? PaymentTestData.Valid.UserId,
            mentorSlotId: slot.Id,
            status: status
        );
        booking.MentorSlot = slot;
        return booking;
    }

    private void SetupHappyPath(CreatePaymentCommand cmd)
    {
        var booking = BuildBookingWithSlot();

        _bookingRepo
            .Setup(r =>
                r.GetByIdAsync(
                    cmd.BookingId,
                    It.IsAny<Expression<Func<global::Booking, object>>[]>()
                )
            )
            .ReturnsAsync(booking);

        _paymentTransactionRepo
            .Setup(r => r.GetByBookingIdAsync(cmd.BookingId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((PaymentTransaction?)null);

        _sePayQrService
            .Setup(s => s.GenerateSePayOrderCode())
            .Returns(PaymentTestData.Valid.OrderCode);

        _sePayQrService
            .Setup(s => s.GenerateQrUrl(PaymentTestData.Valid.OrderCode, It.IsAny<decimal>()))
            .Returns(PaymentTestData.Valid.QrUrl);

        _paymentTransactionRepo
            .Setup(r => r.AddAsync(It.IsAny<PaymentTransaction>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((PaymentTransaction pt, CancellationToken _) => pt);

        _unitOfWork.Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);
    }

    // ── Success paths ──────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WithValidCommand_ReturnsCreatePaymentDto()
    {
        var command = PaymentTestData.BuildCreatePaymentCommand();
        SetupHappyPath(command);

        var result = await _sut.Handle(command, CancellationToken.None);

        result.Should().NotBeNull();
        result.ProviderOrderCode.Should().Be(PaymentTestData.Valid.OrderCode);
        result.QrCodeUrl.Should().Be(PaymentTestData.Valid.QrUrl);
    }

    [Fact]
    public async Task Handle_UsesSlotPriceAsAmount()
    {
        const decimal expectedPrice = 800_000m;
        var booking = BuildBookingWithSlot(price: expectedPrice);
        var command = PaymentTestData.BuildCreatePaymentCommand();

        _bookingRepo
            .Setup(r =>
                r.GetByIdAsync(
                    command.BookingId,
                    It.IsAny<Expression<Func<global::Booking, object>>[]>()
                )
            )
            .ReturnsAsync(booking);

        _paymentTransactionRepo
            .Setup(r => r.GetByBookingIdAsync(command.BookingId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((PaymentTransaction?)null);

        _sePayQrService
            .Setup(s => s.GenerateSePayOrderCode())
            .Returns(PaymentTestData.Valid.OrderCode);
        _sePayQrService
            .Setup(s => s.GenerateQrUrl(PaymentTestData.Valid.OrderCode, expectedPrice))
            .Returns(PaymentTestData.Valid.QrUrl);

        _paymentTransactionRepo
            .Setup(r => r.AddAsync(It.IsAny<PaymentTransaction>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((PaymentTransaction pt, CancellationToken _) => pt);

        _unitOfWork.Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);

        var result = await _sut.Handle(command, CancellationToken.None);

        result.Amount.Should().Be(expectedPrice);
    }

    // ── Idempotency ────────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenExistingValidPendingTransaction_ReturnsExistingDto()
    {
        var command = PaymentTestData.BuildCreatePaymentCommand();
        var booking = BuildBookingWithSlot();
        var existingTx = PaymentTestData.BuildPaymentTransaction(
            bookingId: command.BookingId,
            status: PaymentStatus.Pending,
            expiredAt: DateTime.UtcNow.AddMinutes(25)
        );

        _bookingRepo
            .Setup(r =>
                r.GetByIdAsync(
                    command.BookingId,
                    It.IsAny<Expression<Func<global::Booking, object>>[]>()
                )
            )
            .ReturnsAsync(booking);

        _paymentTransactionRepo
            .Setup(r => r.GetByBookingIdAsync(command.BookingId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(existingTx);

        var result = await _sut.Handle(command, CancellationToken.None);

        result.PaymentTransactionId.Should().Be(existingTx.Id);
        result.ProviderOrderCode.Should().Be(existingTx.ProviderOrderCode);

        // Should NOT create a new transaction
        _paymentTransactionRepo.Verify(
            r => r.AddAsync(It.IsAny<PaymentTransaction>(), It.IsAny<CancellationToken>()),
            Times.Never
        );
    }

    [Fact]
    public async Task Handle_WhenExistingTransactionIsExpired_CreatesNewTransaction()
    {
        var command = PaymentTestData.BuildCreatePaymentCommand();
        var booking = BuildBookingWithSlot();
        var expiredTx = PaymentTestData.BuildPaymentTransaction(
            bookingId: command.BookingId,
            status: PaymentStatus.Pending,
            expiredAt: DateTime.UtcNow.AddMinutes(-1) // expired
        );

        _bookingRepo
            .Setup(r =>
                r.GetByIdAsync(
                    command.BookingId,
                    It.IsAny<Expression<Func<global::Booking, object>>[]>()
                )
            )
            .ReturnsAsync(booking);

        _paymentTransactionRepo
            .Setup(r => r.GetByBookingIdAsync(command.BookingId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(expiredTx);

        _sePayQrService
            .Setup(s => s.GenerateSePayOrderCode())
            .Returns(PaymentTestData.Valid.OrderCode);
        _sePayQrService
            .Setup(s => s.GenerateQrUrl(PaymentTestData.Valid.OrderCode, It.IsAny<decimal>()))
            .Returns(PaymentTestData.Valid.QrUrl);

        _paymentTransactionRepo
            .Setup(r => r.AddAsync(It.IsAny<PaymentTransaction>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((PaymentTransaction pt, CancellationToken _) => pt);

        _unitOfWork.Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);

        await _sut.Handle(command, CancellationToken.None);

        _paymentTransactionRepo.Verify(
            r => r.AddAsync(It.IsAny<PaymentTransaction>(), It.IsAny<CancellationToken>()),
            Times.Once
        );
    }

    // ── Error paths ────────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenProviderIsNotSePay_ThrowsValidationException()
    {
        var command = PaymentTestData.BuildCreatePaymentCommand(provider: PaymentProvider.Mock);

        var act = () => _sut.Handle(command, CancellationToken.None);

        await act.Should()
            .ThrowAsync<FluentValidation.ValidationException>()
            .WithMessage("*Unsupported payment provider*");
    }

    [Fact]
    public async Task Handle_WhenBookingNotFound_ThrowsNotFoundException()
    {
        var command = PaymentTestData.BuildCreatePaymentCommand();

        _bookingRepo
            .Setup(r =>
                r.GetByIdAsync(
                    command.BookingId,
                    It.IsAny<Expression<Func<global::Booking, object>>[]>()
                )
            )
            .ReturnsAsync((global::Booking?)null);

        var act = () => _sut.Handle(command, CancellationToken.None);

        await act.Should().ThrowAsync<NotFoundException>().WithMessage("*Booking*");
    }

    [Fact]
    public async Task Handle_WhenUserDoesNotOwnBooking_ThrowsUnauthorizedException()
    {
        var command = PaymentTestData.BuildCreatePaymentCommand(
            userId: Guid.NewGuid() // different from booking.UserId
        );
        var booking = BuildBookingWithSlot(userId: Guid.NewGuid());

        _bookingRepo
            .Setup(r =>
                r.GetByIdAsync(
                    command.BookingId,
                    It.IsAny<Expression<Func<global::Booking, object>>[]>()
                )
            )
            .ReturnsAsync(booking);

        var act = () => _sut.Handle(command, CancellationToken.None);

        await act.Should().ThrowAsync<UnauthorizedException>();
    }

    [Fact]
    public async Task Handle_WhenBookingStatusIsNotPendingPayment_ThrowsValidationException()
    {
        var command = PaymentTestData.BuildCreatePaymentCommand();
        var booking = BuildBookingWithSlot(status: BookingStatus.Confirmed);

        _bookingRepo
            .Setup(r =>
                r.GetByIdAsync(
                    command.BookingId,
                    It.IsAny<Expression<Func<global::Booking, object>>[]>()
                )
            )
            .ReturnsAsync(booking);

        var act = () => _sut.Handle(command, CancellationToken.None);

        await act.Should()
            .ThrowAsync<FluentValidation.ValidationException>()
            .WithMessage("*pending payment status*");
    }
}
