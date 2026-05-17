namespace MiniBookingSystem.UnitTests.Application.Dashboard.Queries;

public sealed class GetAdminDashboardQueryHandlerTests
{
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly Mock<IUserRepository> _userRepo;
    private readonly Mock<IMentorRepository> _mentorRepo;
    private readonly Mock<IBookingRepository> _bookingRepo;
    private readonly Mock<IPaymentTransactionRepository> _paymentRepo;
    private readonly Mock<ICacheService> _cacheService;
    private readonly GetAdminDashboardQueryHandler _sut;

    public GetAdminDashboardQueryHandlerTests()
    {
        _unitOfWork = new Mock<IUnitOfWork>(MockBehavior.Strict);
        _userRepo = new Mock<IUserRepository>(MockBehavior.Strict);
        _mentorRepo = new Mock<IMentorRepository>(MockBehavior.Strict);
        _bookingRepo = new Mock<IBookingRepository>(MockBehavior.Strict);
        _paymentRepo = new Mock<IPaymentTransactionRepository>(MockBehavior.Strict);
        _cacheService = new Mock<ICacheService>(MockBehavior.Strict);

        _unitOfWork.Setup(u => u.User).Returns(_userRepo.Object);
        _unitOfWork.Setup(u => u.Mentor).Returns(_mentorRepo.Object);
        _unitOfWork.Setup(u => u.Booking).Returns(_bookingRepo.Object);
        _unitOfWork.Setup(u => u.PaymentTransaction).Returns(_paymentRepo.Object);

        _sut = new GetAdminDashboardQueryHandler(_unitOfWork.Object, _cacheService.Object);
    }

    private void SetupCacheMiss()
    {
        _cacheService
            .Setup(c =>
                c.GetAsync<AdminDashboardDTO>(
                    CacheKeys.AdminDashboard(),
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync((AdminDashboardDTO?)null);
        _cacheService
            .Setup(c =>
                c.SetAsync(
                    CacheKeys.AdminDashboard(),
                    It.IsAny<AdminDashboardDTO>(),
                    It.IsAny<TimeSpan>(),
                    It.IsAny<CancellationToken>()
                )
            )
            .Returns(Task.CompletedTask);
    }

    private void SetupCounts(int users, int mentors)
    {
        _userRepo.Setup(r => r.CountActiveAsync(It.IsAny<CancellationToken>())).ReturnsAsync(users);
        _mentorRepo
            .Setup(r => r.CountAsync(It.IsAny<Expression<Func<global::Mentor, bool>>>()))
            .ReturnsAsync(mentors);
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
        var cached = new AdminDashboardDTO(10, 3, 20, 5_000_000m, new(), []);
        _cacheService
            .Setup(c =>
                c.GetAsync<AdminDashboardDTO>(
                    CacheKeys.AdminDashboard(),
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(cached);

        var query = new GetAdminDashboardQuery();
        var result = await _sut.Handle(query, CancellationToken.None);

        result.Should().BeSameAs(cached);
        _userRepo.Verify(r => r.CountActiveAsync(It.IsAny<CancellationToken>()), Times.Never);
    }

    // ── Cache miss — aggregation ──────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenCacheMiss_AggregatesCorrectly()
    {
        SetupCacheMiss();
        SetupCounts(users: 15, mentors: 4);

        var bookings = new List<global::Booking>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Status = BookingStatus.Confirmed,
                BookedAt = DateTime.UtcNow.AddDays(-1),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Status = BookingStatus.Confirmed,
                BookedAt = DateTime.UtcNow.AddDays(-2),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Status = BookingStatus.Completed,
                BookedAt = DateTime.UtcNow.AddDays(-10),
            },
            new()
            {
                Id = Guid.NewGuid(),
                Status = BookingStatus.Cancelled,
                BookedAt = DateTime.UtcNow.AddDays(-5),
            },
        };
        SetupBookings(bookings);

        var payments = new List<PaymentTransaction>
        {
            new()
            {
                Id = Guid.NewGuid(),
                BookingId = bookings[0].Id,
                Amount = 500_000m,
                Status = PaymentStatus.Succeeded,
                PaidAt = DateTime.UtcNow.AddDays(-1),
            },
            new()
            {
                Id = Guid.NewGuid(),
                BookingId = bookings[1].Id,
                Amount = 300_000m,
                Status = PaymentStatus.Succeeded,
                PaidAt = DateTime.UtcNow.AddDays(-2),
            },
            new()
            {
                Id = Guid.NewGuid(),
                BookingId = bookings[2].Id,
                Amount = 200_000m,
                Status = PaymentStatus.Failed,
                PaidAt = null,
            },
        };
        SetupPayments(payments);

        var query = new GetAdminDashboardQuery();
        var result = await _sut.Handle(query, CancellationToken.None);

        result.TotalUsers.Should().Be(15);
        result.TotalMentors.Should().Be(4);
        result.TotalBookings.Should().Be(4);
    }

    [Fact]
    public async Task Handle_WhenCacheMiss_CachesResult()
    {
        SetupCacheMiss();
        SetupCounts(users: 0, mentors: 0);
        SetupBookings([]);
        SetupPayments([]);

        var query = new GetAdminDashboardQuery();
        await _sut.Handle(query, CancellationToken.None);

        _cacheService.Verify(
            c =>
                c.SetAsync(
                    CacheKeys.AdminDashboard(),
                    It.IsAny<AdminDashboardDTO>(),
                    It.IsAny<TimeSpan>(),
                    It.IsAny<CancellationToken>()
                ),
            Times.Once
        );
    }

    [Fact]
    public async Task Handle_WhenNoData_ReturnsZeroes()
    {
        SetupCacheMiss();
        SetupCounts(users: 0, mentors: 0);
        SetupBookings([]);
        SetupPayments([]);

        var query = new GetAdminDashboardQuery();
        var result = await _sut.Handle(query, CancellationToken.None);

        result.TotalUsers.Should().Be(0);
        result.TotalMentors.Should().Be(0);
        result.TotalBookings.Should().Be(0);
        result.TotalRevenue.Should().Be(0);
        result.BookingsByStatus.Should().BeEmpty();
        result.RevenueOverTime.Should().BeEmpty();
    }
}
