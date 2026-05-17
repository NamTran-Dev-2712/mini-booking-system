namespace MiniBookingSystem.UnitTests.Application.Dashboard.Queries;

public sealed class GetMentorDashboardQueryHandlerTests
{
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly Mock<IMentorRepository> _mentorRepo;
    private readonly Mock<IMentorSlotRepository> _mentorSlotRepo;
    private readonly Mock<IBookingRepository> _bookingRepo;
    private readonly Mock<IPaymentTransactionRepository> _paymentRepo;
    private readonly Mock<ICacheService> _cacheService;
    private readonly GetMentorDashboardQueryHandler _sut;

    private static readonly Guid TestUserId = MentorTestData.Valid.UserId;
    private static readonly Guid TestMentorId = MentorTestData.Valid.MentorId;

    public GetMentorDashboardQueryHandlerTests()
    {
        _unitOfWork = new Mock<IUnitOfWork>(MockBehavior.Strict);
        _mentorRepo = new Mock<IMentorRepository>(MockBehavior.Strict);
        _mentorSlotRepo = new Mock<IMentorSlotRepository>(MockBehavior.Strict);
        _bookingRepo = new Mock<IBookingRepository>(MockBehavior.Strict);
        _paymentRepo = new Mock<IPaymentTransactionRepository>(MockBehavior.Strict);
        _cacheService = new Mock<ICacheService>(MockBehavior.Strict);

        _unitOfWork.Setup(u => u.Mentor).Returns(_mentorRepo.Object);
        _unitOfWork.Setup(u => u.MentorSlot).Returns(_mentorSlotRepo.Object);
        _unitOfWork.Setup(u => u.Booking).Returns(_bookingRepo.Object);
        _unitOfWork.Setup(u => u.PaymentTransaction).Returns(_paymentRepo.Object);

        _sut = new GetMentorDashboardQueryHandler(_unitOfWork.Object, _cacheService.Object);
    }

    private void SetupCacheMiss()
    {
        _cacheService
            .Setup(c =>
                c.GetAsync<MentorDashboardDTO>(
                    CacheKeys.MentorDashboard(TestUserId),
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync((MentorDashboardDTO?)null);
        _cacheService
            .Setup(c =>
                c.SetAsync(
                    CacheKeys.MentorDashboard(TestUserId),
                    It.IsAny<MentorDashboardDTO>(),
                    It.IsAny<TimeSpan>(),
                    It.IsAny<CancellationToken>()
                )
            )
            .Returns(Task.CompletedTask);
    }

    private void SetupMentorFound()
    {
        var mentor = MentorTestData.BuildMentor(id: TestMentorId, userId: TestUserId);
        _mentorRepo
            .Setup(r => r.GetByUserIdAsync(TestUserId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(mentor);
    }

    private void SetupSlots(List<MentorSlot> slots)
    {
        var slotRepoLoose = new Mock<IMentorSlotRepository>();
        slotRepoLoose
            .Setup(r => r.CountAsync(It.IsAny<Expression<Func<MentorSlot, bool>>>()))
            .Returns(
                (Expression<Func<MentorSlot, bool>> pred) =>
                    Task.FromResult(slots.AsQueryable().Count(pred))
            );
        slotRepoLoose.Setup(r => r.Query()).Returns(slots.AsAsyncQueryable());

        _unitOfWork.Setup(u => u.MentorSlot).Returns(slotRepoLoose.Object);
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
        var cached = new MentorDashboardDTO(10, 3, 5, 2_000_000m, []);
        _cacheService
            .Setup(c =>
                c.GetAsync<MentorDashboardDTO>(
                    CacheKeys.MentorDashboard(TestUserId),
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(cached);

        var query = new GetMentorDashboardQuery(TestUserId);
        var result = await _sut.Handle(query, CancellationToken.None);

        result.Should().BeSameAs(cached);
        _mentorRepo.Verify(
            r => r.GetByUserIdAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()),
            Times.Never
        );
    }

    // ── Mentor not found ──────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenMentorNotFound_ThrowsNotFoundException()
    {
        SetupCacheMiss();
        _mentorRepo
            .Setup(r => r.GetByUserIdAsync(TestUserId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((global::Mentor?)null);

        var query = new GetMentorDashboardQuery(TestUserId);
        var act = () => _sut.Handle(query, CancellationToken.None);

        await act.Should().ThrowAsync<NotFoundException>().WithMessage("*Mentor profile*");
    }

    // ── Cache miss — aggregation ──────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenCacheMiss_AggregatesCorrectly()
    {
        SetupCacheMiss();
        SetupMentorFound();

        var slotId = MentorTestData.Valid.SlotId;
        var slots = new List<MentorSlot>
        {
            MentorTestData.BuildMentorSlot(
                id: slotId,
                mentorId: TestMentorId,
                status: MentorSlotStatus.Available,
                startTime: DateTime.UtcNow.AddDays(1)
            ),
            MentorTestData.BuildMentorSlot(
                id: Guid.NewGuid(),
                mentorId: TestMentorId,
                status: MentorSlotStatus.Completed,
                startTime: DateTime.UtcNow.AddDays(-5)
            ),
        };
        SetupSlots(slots);

        var bookings = new List<global::Booking>
        {
            new()
            {
                Id = Guid.NewGuid(),
                MentorSlotId = slotId,
                Status = BookingStatus.Confirmed,
                BookedAt = DateTime.UtcNow.AddDays(-1),
            },
            new()
            {
                Id = Guid.NewGuid(),
                MentorSlotId = slotId,
                Status = BookingStatus.Completed,
                BookedAt = DateTime.UtcNow.AddDays(-10),
            },
            new()
            {
                Id = Guid.NewGuid(),
                MentorSlotId = slots[1].Id,
                Status = BookingStatus.Completed,
                BookedAt = DateTime.UtcNow.AddDays(-20),
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
            },
            new()
            {
                Id = Guid.NewGuid(),
                BookingId = bookings[1].Id,
                Amount = 500_000m,
                Status = PaymentStatus.Succeeded,
            },
            new()
            {
                Id = Guid.NewGuid(),
                BookingId = bookings[2].Id,
                Amount = 300_000m,
                Status = PaymentStatus.Failed,
            },
        };
        SetupPayments(payments);

        var query = new GetMentorDashboardQuery(TestUserId);
        var result = await _sut.Handle(query, CancellationToken.None);

        result.TotalBookings.Should().Be(3);
        result.UpcomingSlots.Should().Be(1);
        result.CompletedSessions.Should().Be(2);
    }

    [Fact]
    public async Task Handle_WhenCacheMiss_CachesResult()
    {
        SetupCacheMiss();
        SetupMentorFound();
        SetupSlots([]);
        SetupBookings([]);
        SetupPayments([]);

        var query = new GetMentorDashboardQuery(TestUserId);
        await _sut.Handle(query, CancellationToken.None);

        _cacheService.Verify(
            c =>
                c.SetAsync(
                    CacheKeys.MentorDashboard(TestUserId),
                    It.IsAny<MentorDashboardDTO>(),
                    It.IsAny<TimeSpan>(),
                    It.IsAny<CancellationToken>()
                ),
            Times.Once
        );
    }
}
