namespace MiniBookingSystem.UnitTests.Application.Dashboard.Queries;

public sealed class GetUserDashboardQueryHandlerTests
{
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly Mock<IBookingRepository> _bookingRepo;
    private readonly Mock<IPaymentTransactionRepository> _paymentRepo;
    private readonly Mock<ICacheService> _cacheService;
    private readonly GetUserDashboardQueryHandler _sut;

    private static readonly Guid TestUserId = AuthTestData.Valid.UserId;

    public GetUserDashboardQueryHandlerTests()
    {
        _unitOfWork = new Mock<IUnitOfWork>(MockBehavior.Strict);
        _bookingRepo = new Mock<IBookingRepository>(MockBehavior.Strict);
        _paymentRepo = new Mock<IPaymentTransactionRepository>(MockBehavior.Strict);
        _cacheService = new Mock<ICacheService>(MockBehavior.Strict);

        _unitOfWork.Setup(u => u.Booking).Returns(_bookingRepo.Object);
        _unitOfWork.Setup(u => u.PaymentTransaction).Returns(_paymentRepo.Object);

        _sut = new GetUserDashboardQueryHandler(_unitOfWork.Object, _cacheService.Object);
    }

    private void SetupCacheMiss()
    {
        _cacheService
            .Setup(c =>
                c.GetAsync<UserDashboardDTO>(
                    CacheKeys.UserDashboard(TestUserId),
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync((UserDashboardDTO?)null);
        _cacheService
            .Setup(c =>
                c.SetAsync(
                    CacheKeys.UserDashboard(TestUserId),
                    It.IsAny<UserDashboardDTO>(),
                    It.IsAny<TimeSpan>(),
                    It.IsAny<CancellationToken>()
                )
            )
            .Returns(Task.CompletedTask);
    }

    private void SetupBookings(List<global::Booking> bookings)
    {
        var bookingRepoLoose = new Mock<IBookingRepository>();
        bookingRepoLoose.Setup(r => r.Query()).Returns(bookings.AsAsyncQueryable());
        bookingRepoLoose
            .Setup(r =>
                r.CountAsync(It.IsAny<IQueryable<global::Booking>>(), It.IsAny<CancellationToken>())
            )
            .Returns(
                (IQueryable<global::Booking> q, CancellationToken _) => Task.FromResult(q.Count())
            );

        _unitOfWork.Setup(u => u.Booking).Returns(bookingRepoLoose.Object);
    }

    private void SetupPayments(List<PaymentTransaction> payments)
    {
        var paymentRepoLoose = new Mock<IPaymentTransactionRepository>();
        paymentRepoLoose.Setup(r => r.Query()).Returns(payments.AsAsyncQueryable());

        _unitOfWork.Setup(u => u.PaymentTransaction).Returns(paymentRepoLoose.Object);
    }

    // ── Cache hit ─────────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenCacheHit_ReturnsCachedResult()
    {
        var cached = new UserDashboardDTO(5, 2, 3, 500_000m, []);
        _cacheService
            .Setup(c =>
                c.GetAsync<UserDashboardDTO>(
                    CacheKeys.UserDashboard(TestUserId),
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(cached);

        var query = new GetUserDashboardQuery(TestUserId);
        var result = await _sut.Handle(query, CancellationToken.None);

        result.Should().BeSameAs(cached);
        _bookingRepo.Verify(r => r.Query(), Times.Never);
    }

    // ── Cache miss — aggregation ──────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenCacheMiss_AggregatesBookingsCorrectly()
    {
        SetupCacheMiss();

        var slot = MentorTestData.BuildMentorSlot(startTime: DateTime.UtcNow.AddDays(2));
        var bookings = new List<global::Booking>
        {
            new()
            {
                Id = Guid.NewGuid(),
                UserId = TestUserId,
                MentorSlotId = slot.Id,
                Status = BookingStatus.Confirmed,
                BookedAt = DateTime.UtcNow.AddDays(-10),
                MentorSlot = slot,
            },
            new()
            {
                Id = Guid.NewGuid(),
                UserId = TestUserId,
                MentorSlotId = slot.Id,
                Status = BookingStatus.Completed,
                BookedAt = DateTime.UtcNow.AddDays(-30),
                MentorSlot = slot,
            },
            new()
            {
                Id = Guid.NewGuid(),
                UserId = TestUserId,
                MentorSlotId = slot.Id,
                Status = BookingStatus.Cancelled,
                BookedAt = DateTime.UtcNow.AddDays(-5),
                MentorSlot = slot,
            },
        };

        SetupBookings(bookings);
        SetupPayments([]);

        var query = new GetUserDashboardQuery(TestUserId);
        var result = await _sut.Handle(query, CancellationToken.None);

        result.TotalBookings.Should().Be(3);
        result.CompletedSessions.Should().Be(1);
        result.UpcomingBookings.Should().Be(1);
    }

    [Fact]
    public async Task Handle_WhenCacheMiss_CachesResult()
    {
        SetupCacheMiss();
        SetupBookings([]);
        SetupPayments([]);

        var query = new GetUserDashboardQuery(TestUserId);
        await _sut.Handle(query, CancellationToken.None);

        _cacheService.Verify(
            c =>
                c.SetAsync(
                    CacheKeys.UserDashboard(TestUserId),
                    It.IsAny<UserDashboardDTO>(),
                    It.IsAny<TimeSpan>(),
                    It.IsAny<CancellationToken>()
                ),
            Times.Once
        );
    }

    [Fact]
    public async Task Handle_WhenNoBookings_ReturnsZeroes()
    {
        SetupCacheMiss();
        SetupBookings([]);
        SetupPayments([]);

        var query = new GetUserDashboardQuery(TestUserId);
        var result = await _sut.Handle(query, CancellationToken.None);

        result.TotalBookings.Should().Be(0);
        result.UpcomingBookings.Should().Be(0);
        result.CompletedSessions.Should().Be(0);
        result.TotalSpending.Should().Be(0);
        result.BookingHistory.Should().BeEmpty();
    }
}
