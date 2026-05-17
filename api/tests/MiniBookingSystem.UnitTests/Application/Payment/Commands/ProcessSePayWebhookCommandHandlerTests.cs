namespace MiniBookingSystem.UnitTests.Application.Payment.Commands;

public sealed class ProcessSePayWebhookCommandHandlerTests
{
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly Mock<IPaymentTransactionRepository> _paymentTransactionRepo;
    private readonly Mock<IPaymentWebhookLogRepository> _webhookLogRepo;
    private readonly Mock<ISePayQrService> _sePayQrService;
    private readonly Mock<ICacheService> _cacheService;
    private readonly Mock<ILogger<ProcessSePayWebhookCommandHandler>> _logger;
    private readonly ProcessSePayWebhookCommandHandler _sut;

    public ProcessSePayWebhookCommandHandlerTests()
    {
        _unitOfWork = new Mock<IUnitOfWork>(MockBehavior.Strict);
        _paymentTransactionRepo = new Mock<IPaymentTransactionRepository>(MockBehavior.Strict);
        _webhookLogRepo = new Mock<IPaymentWebhookLogRepository>(MockBehavior.Strict);
        _sePayQrService = new Mock<ISePayQrService>(MockBehavior.Strict);
        _cacheService = new Mock<ICacheService>(MockBehavior.Strict);
        // ILogger uses Loose because Log* are extension methods
        _logger = new Mock<ILogger<ProcessSePayWebhookCommandHandler>>();

        _unitOfWork.Setup(u => u.PaymentTransaction).Returns(_paymentTransactionRepo.Object);
        _unitOfWork.Setup(u => u.PaymentWebhookLog).Returns(_webhookLogRepo.Object);

        _sut = new ProcessSePayWebhookCommandHandler(
            _unitOfWork.Object,
            _sePayQrService.Object,
            _cacheService.Object,
            _logger.Object
        );
    }

    /// <summary>Always required: log is added and SaveChanges is called at least once.</summary>
    private void SetupAlwaysRequired()
    {
        _webhookLogRepo
            .Setup(r => r.AddAsync(It.IsAny<PaymentWebhookLog>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((PaymentWebhookLog log, CancellationToken _) => log);

        _unitOfWork.Setup(u => u.SaveChangesAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);

        _cacheService
            .Setup(c => c.RemoveAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);
    }

    private void SetupNotDuplicate(long id)
    {
        _webhookLogRepo
            .Setup(r =>
                r.ExistsProcessedAsync(
                    PaymentProvider.SePay.ToString(),
                    id.ToString(),
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(false);
    }

    private static ProcessSePayWebhookCommand Cmd(SePayWebhookRequest payload) => new(payload);

    // ── Happy path ─────────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WithValidInboundPayment_MarksSucceededAndConfirmsBooking()
    {
        var payload = PaymentTestData.BuildSePayWebhookRequest();
        var payment = PaymentTestData.BuildPaymentTransactionWithBooking(
            orderCode: payload.Code,
            paymentStatus: PaymentStatus.Pending,
            bookingStatus: BookingStatus.PendingPayment,
            paymentExpiredAt: DateTime.UtcNow.AddMinutes(30),
            bookingExpiresAt: DateTime.UtcNow.AddMinutes(30)
        );

        SetupAlwaysRequired();
        SetupNotDuplicate(payload.Id);

        _paymentTransactionRepo
            .Setup(r =>
                r.GetPendingByProviderOrderCodeWithBookingAsync(
                    PaymentProvider.SePay,
                    payload.Code!.ToUpperInvariant(),
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(payment);

        await _sut.Handle(Cmd(payload), CancellationToken.None);

        payment.Status.Should().Be(PaymentStatus.Succeeded);
        payment.Booking!.Status.Should().Be(BookingStatus.Confirmed);
    }

    // ── Duplicate webhook ─────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenWebhookAlreadyProcessed_MarksIgnored()
    {
        var payload = PaymentTestData.BuildSePayWebhookRequest();

        SetupAlwaysRequired();

        _webhookLogRepo
            .Setup(r =>
                r.ExistsProcessedAsync(
                    PaymentProvider.SePay.ToString(),
                    payload.Id.ToString(),
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(true); // duplicate!

        await _sut.Handle(Cmd(payload), CancellationToken.None);

        // No payment lookup should happen
        _paymentTransactionRepo.Verify(
            r =>
                r.GetPendingByProviderOrderCodeWithBookingAsync(
                    It.IsAny<PaymentProvider>(),
                    It.IsAny<string>(),
                    It.IsAny<CancellationToken>()
                ),
            Times.Never
        );
    }

    // ── TransferType is not "in" ───────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenTransferTypeIsNotIn_MarksIgnored()
    {
        var payload = PaymentTestData.BuildSePayWebhookRequest(transferType: "out");

        SetupAlwaysRequired();
        SetupNotDuplicate(payload.Id);

        await _sut.Handle(Cmd(payload), CancellationToken.None);

        _paymentTransactionRepo.Verify(
            r =>
                r.GetPendingByProviderOrderCodeWithBookingAsync(
                    It.IsAny<PaymentProvider>(),
                    It.IsAny<string>(),
                    It.IsAny<CancellationToken>()
                ),
            Times.Never
        );
    }

    // ── Order code extraction ─────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenCodeIsNullAndContentIsEmpty_MarksIgnored()
    {
        // Construct directly so Code and Content are truly null
        var payload = new SePayWebhookRequest
        {
            Id = 12345,
            TransferType = "in",
            Code = null,
            Content = null,
            TransferAmount = PaymentTestData.Valid.Amount,
        };

        SetupAlwaysRequired();
        SetupNotDuplicate(payload.Id);

        _sePayQrService
            .Setup(s => s.PaymentCodePrefix)
            .Returns(PaymentTestData.Valid.PaymentCodePrefix);

        await _sut.Handle(Cmd(payload), CancellationToken.None);

        _paymentTransactionRepo.Verify(
            r =>
                r.GetPendingByProviderOrderCodeWithBookingAsync(
                    It.IsAny<PaymentProvider>(),
                    It.IsAny<string>(),
                    It.IsAny<CancellationToken>()
                ),
            Times.Never
        );
    }

    [Fact]
    public async Task Handle_WhenCodeIsNullButContentContainsOrderCode_ExtractsAndProcesses()
    {
        const string orderCode = "BK-20260509001";
        var payload = new SePayWebhookRequest
        {
            Id = 9999,
            TransferType = "in",
            Code = null,
            Content = $"Thanh toan {orderCode}",
            TransferAmount = PaymentTestData.Valid.Amount,
        };

        var payment = PaymentTestData.BuildPaymentTransactionWithBooking(
            orderCode: orderCode,
            paymentStatus: PaymentStatus.Pending,
            bookingStatus: BookingStatus.PendingPayment,
            paymentExpiredAt: DateTime.UtcNow.AddMinutes(30),
            bookingExpiresAt: DateTime.UtcNow.AddMinutes(30)
        );

        SetupAlwaysRequired();
        SetupNotDuplicate(payload.Id);

        _sePayQrService.Setup(s => s.PaymentCodePrefix).Returns("BK");

        _paymentTransactionRepo
            .Setup(r =>
                r.GetPendingByProviderOrderCodeWithBookingAsync(
                    PaymentProvider.SePay,
                    orderCode.ToUpperInvariant(),
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(payment);

        await _sut.Handle(Cmd(payload), CancellationToken.None);

        payment.Status.Should().Be(PaymentStatus.Succeeded);
    }

    // ── Payment not found ─────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenPaymentNotFound_MarksIgnored()
    {
        var payload = PaymentTestData.BuildSePayWebhookRequest();

        SetupAlwaysRequired();
        SetupNotDuplicate(payload.Id);

        _paymentTransactionRepo
            .Setup(r =>
                r.GetPendingByProviderOrderCodeWithBookingAsync(
                    PaymentProvider.SePay,
                    payload.Code!.ToUpperInvariant(),
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync((PaymentTransaction?)null);

        await _sut.Handle(Cmd(payload), CancellationToken.None);

        // No exception; handler continues gracefully
    }

    // ── Already succeeded ─────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenPaymentAlreadySucceeded_MarksIgnored()
    {
        var payload = PaymentTestData.BuildSePayWebhookRequest();
        var payment = PaymentTestData.BuildPaymentTransactionWithBooking(
            orderCode: payload.Code,
            paymentStatus: PaymentStatus.Succeeded
        );

        SetupAlwaysRequired();
        SetupNotDuplicate(payload.Id);

        _paymentTransactionRepo
            .Setup(r =>
                r.GetPendingByProviderOrderCodeWithBookingAsync(
                    PaymentProvider.SePay,
                    payload.Code!.ToUpperInvariant(),
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(payment);

        await _sut.Handle(Cmd(payload), CancellationToken.None);

        // Status should not change away from Succeeded
        payment.Status.Should().Be(PaymentStatus.Succeeded);
    }

    // ── Expiry checks ─────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenPaymentExpired_MarksPaymentExpired()
    {
        var payload = PaymentTestData.BuildSePayWebhookRequest();
        var payment = PaymentTestData.BuildPaymentTransactionWithBooking(
            orderCode: payload.Code,
            paymentStatus: PaymentStatus.Pending,
            paymentExpiredAt: DateTime.UtcNow.AddMinutes(-5) // expired!
        );

        SetupAlwaysRequired();
        SetupNotDuplicate(payload.Id);

        _paymentTransactionRepo
            .Setup(r =>
                r.GetPendingByProviderOrderCodeWithBookingAsync(
                    PaymentProvider.SePay,
                    payload.Code!.ToUpperInvariant(),
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(payment);

        await _sut.Handle(Cmd(payload), CancellationToken.None);

        payment.Status.Should().Be(PaymentStatus.Expired);
    }

    [Fact]
    public async Task Handle_WhenBookingExpired_MarksPaymentExpired()
    {
        var payload = PaymentTestData.BuildSePayWebhookRequest();
        var payment = PaymentTestData.BuildPaymentTransactionWithBooking(
            orderCode: payload.Code,
            paymentStatus: PaymentStatus.Pending,
            paymentExpiredAt: DateTime.UtcNow.AddMinutes(30),
            bookingExpiresAt: DateTime.UtcNow.AddMinutes(-5) // booking expired!
        );

        SetupAlwaysRequired();
        SetupNotDuplicate(payload.Id);

        _paymentTransactionRepo
            .Setup(r =>
                r.GetPendingByProviderOrderCodeWithBookingAsync(
                    PaymentProvider.SePay,
                    payload.Code!.ToUpperInvariant(),
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(payment);

        await _sut.Handle(Cmd(payload), CancellationToken.None);

        payment.Status.Should().Be(PaymentStatus.Expired);
    }

    // ── Insufficient amount ───────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenTransferAmountIsInsufficient_MarksPaymentFailed()
    {
        var payload = PaymentTestData.BuildSePayWebhookRequest(
            amount: 100m // less than PaymentTestData.Valid.Amount (500_000)
        );
        var payment = PaymentTestData.BuildPaymentTransactionWithBooking(
            orderCode: payload.Code,
            paymentStatus: PaymentStatus.Pending,
            paymentExpiredAt: DateTime.UtcNow.AddMinutes(30),
            bookingExpiresAt: DateTime.UtcNow.AddMinutes(30)
        );

        SetupAlwaysRequired();
        SetupNotDuplicate(payload.Id);

        _paymentTransactionRepo
            .Setup(r =>
                r.GetPendingByProviderOrderCodeWithBookingAsync(
                    PaymentProvider.SePay,
                    payload.Code!.ToUpperInvariant(),
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(payment);

        await _sut.Handle(Cmd(payload), CancellationToken.None);

        payment.Status.Should().Be(PaymentStatus.Failed);
        payment.FailureReason.Should().Contain("Insufficient amount");
    }

    // ── Exception handling ────────────────────────────────────────────────

    [Fact]
    public async Task Handle_OnException_MarksWebhookFailedAndRethrows()
    {
        var payload = PaymentTestData.BuildSePayWebhookRequest();

        SetupAlwaysRequired();
        SetupNotDuplicate(payload.Id);

        _paymentTransactionRepo
            .Setup(r =>
                r.GetPendingByProviderOrderCodeWithBookingAsync(
                    PaymentProvider.SePay,
                    It.IsAny<string>(),
                    It.IsAny<CancellationToken>()
                )
            )
            .ThrowsAsync(new Exception("DB connectivity error"));

        var act = () => _sut.Handle(Cmd(payload), CancellationToken.None);

        await act.Should().ThrowAsync<Exception>().WithMessage("*DB connectivity error*");
    }
}
