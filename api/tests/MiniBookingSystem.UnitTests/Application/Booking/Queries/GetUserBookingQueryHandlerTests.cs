namespace MiniBookingSystem.UnitTests.Application.Booking.Queries;

public sealed class GetUserBookingQueryHandlerTests
{
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly Mock<IGenericRepository<global::Booking>> _repo;
    private readonly GetUserBookingQueryHandler _sut;

    public GetUserBookingQueryHandlerTests()
    {
        _unitOfWork = new Mock<IUnitOfWork>(MockBehavior.Strict);
        _repo = new Mock<IGenericRepository<global::Booking>>(MockBehavior.Strict);

        _unitOfWork.Setup(u => u.Repository<global::Booking>()).Returns(_repo.Object);

        _sut = new GetUserBookingQueryHandler(_unitOfWork.Object);
    }

    private void SetupBookings(IEnumerable<global::Booking> bookings)
    {
        _repo.Setup(r => r.Query()).Returns(bookings.AsAsyncQueryable());

        _repo
            .Setup(r =>
                r.CountAsync(It.IsAny<IQueryable<global::Booking>>(), It.IsAny<CancellationToken>())
            )
            .Returns<IQueryable<global::Booking>, CancellationToken>(
                (q, _) => Task.FromResult(q.Count())
            );

        _repo
            .Setup(r =>
                r.ToListAsync(It.IsAny<IQueryable<BookingDto>>(), It.IsAny<CancellationToken>())
            )
            .Returns<IQueryable<BookingDto>, CancellationToken>(
                (q, _) => Task.FromResult(q.ToList())
            );
    }

    private static GetUserBookingQuery DefaultQuery(
        Guid? userId = null,
        BookingStatus? status = null,
        int pageNumber = 1,
        int pageSize = 10
    ) =>
        new()
        {
            UserId = userId ?? BookingTestData.Valid.UserId,
            Status = status,
            PageNumber = pageNumber,
            PageSize = pageSize,
        };

    // ── Filtering ─────────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_ReturnsOnlyBookingsForSpecifiedUser()
    {
        var targetUserId = BookingTestData.Valid.UserId;
        var otherUserId = Guid.NewGuid();

        var myBooking = BookingTestData.BuildBookingWithNavigation(userId: targetUserId);
        var otherBooking = BookingTestData.BuildBookingWithNavigation(
            id: Guid.NewGuid(),
            userId: otherUserId
        );

        SetupBookings([myBooking, otherBooking]);

        var result = await _sut.Handle(DefaultQuery(userId: targetUserId), CancellationToken.None);

        result.Items.Should().HaveCount(1);
        result.Items.First().UserId.Should().Be(targetUserId);
    }

    [Fact]
    public async Task Handle_WhenStatusFilterApplied_ReturnsOnlyMatchingBookings()
    {
        var userId = BookingTestData.Valid.UserId;
        var pending = BookingTestData.BuildBookingWithNavigation(
            id: Guid.NewGuid(),
            userId: userId,
            status: BookingStatus.PendingPayment
        );
        var confirmed = BookingTestData.BuildBookingWithNavigation(
            id: Guid.NewGuid(),
            userId: userId,
            status: BookingStatus.Confirmed
        );

        SetupBookings([pending, confirmed]);

        var result = await _sut.Handle(
            DefaultQuery(userId: userId, status: BookingStatus.Confirmed),
            CancellationToken.None
        );

        result.Items.Should().HaveCount(1);
        result.Items.First().Status.Should().Be(BookingStatus.Confirmed);
    }

    [Fact]
    public async Task Handle_ExcludesSoftDeletedBookings()
    {
        var userId = BookingTestData.Valid.UserId;
        var active = BookingTestData.BuildBookingWithNavigation(id: Guid.NewGuid(), userId: userId);
        var deleted = BookingTestData.BuildBookingWithNavigation(
            id: Guid.NewGuid(),
            userId: userId
        );
        deleted.IsDeleted = true;

        SetupBookings([active, deleted]);

        var result = await _sut.Handle(DefaultQuery(userId: userId), CancellationToken.None);

        result.Items.Should().HaveCount(1);
    }

    // ── Pagination ────────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_ReturnsPaginatedResult_WithCorrectTotalCount()
    {
        var userId = BookingTestData.Valid.UserId;
        var bookings = Enumerable
            .Range(0, 5)
            .Select(i =>
                BookingTestData.BuildBookingWithNavigation(id: Guid.NewGuid(), userId: userId)
            )
            .ToList();

        SetupBookings(bookings);

        var result = await _sut.Handle(
            DefaultQuery(userId: userId, pageSize: 2, pageNumber: 1),
            CancellationToken.None
        );

        result.TotalCount.Should().Be(5);
        result.Items.Should().HaveCount(2);
    }

    [Fact]
    public async Task Handle_WhenNoBookings_ReturnsEmptyResult()
    {
        SetupBookings([]);

        var result = await _sut.Handle(DefaultQuery(), CancellationToken.None);

        result.Items.Should().BeEmpty();
        result.TotalCount.Should().Be(0);
    }
}
