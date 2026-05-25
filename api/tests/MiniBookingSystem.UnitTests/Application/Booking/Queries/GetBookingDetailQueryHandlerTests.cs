namespace MiniBookingSystem.UnitTests.Application.Booking.Queries;

public sealed class GetBookingDetailQueryHandlerTests
{
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly Mock<IGenericRepository<global::Booking>> _repo;
    private readonly Mock<ICacheService> _cacheService;
    private readonly Mock<ILocalizationService> _localizer;
    private readonly GetBookingDetailQueryHandler _sut;

    public GetBookingDetailQueryHandlerTests()
    {
        _unitOfWork = new Mock<IUnitOfWork>(MockBehavior.Strict);
        _repo = new Mock<IGenericRepository<global::Booking>>(MockBehavior.Strict);
        _cacheService = new Mock<ICacheService>(MockBehavior.Strict);
        _localizer = new Mock<ILocalizationService>();
        _localizer.Setup(l => l.GetMessage(It.IsAny<string>())).Returns((string key) => key);
        _localizer.Setup(l => l.GetMessage("Booking.NotFound")).Returns("Booking not found.");

        _unitOfWork.Setup(u => u.Repository<global::Booking>()).Returns(_repo.Object);

        _sut = new GetBookingDetailQueryHandler(
            _unitOfWork.Object,
            _cacheService.Object,
            _localizer.Object
        );
    }

    /// <summary>
    /// Wires up the generic repository to evaluate LINQ against fully-populated
    /// in-memory bookings. ToListAsync executes the actual query expression.
    /// </summary>
    private void SetupRepoWithBookings(IEnumerable<global::Booking> bookings)
    {
        _repo.Setup(r => r.Query()).Returns(bookings.AsAsyncQueryable());

        _repo
            .Setup(r =>
                r.ToListAsync(It.IsAny<IQueryable<BookingDto>>(), It.IsAny<CancellationToken>())
            )
            .Returns<IQueryable<BookingDto>, CancellationToken>(
                (q, _) => Task.FromResult(q.ToList())
            );
    }

    // ── Cache hit ─────────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenCacheHit_ReturnsCachedDto()
    {
        var bookingId = BookingTestData.Valid.BookingId;
        var cached = BookingTestData.BuildBookingDto(id: bookingId);

        _cacheService
            .Setup(c =>
                c.GetAsync<BookingDto>(
                    CacheKeys.BookingDetail(bookingId),
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(cached);

        var result = await _sut.Handle(
            new GetBookingDetailQuery(bookingId),
            CancellationToken.None
        );

        result.Should().BeSameAs(cached);
        _unitOfWork.Verify(u => u.Repository<global::Booking>(), Times.Never);
    }

    // ── Cache miss ────────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenCacheMiss_ReturnsBookingFromRepo()
    {
        var bookingId = BookingTestData.Valid.BookingId;
        var booking = BookingTestData.BuildBookingWithNavigation(id: bookingId);

        _cacheService
            .Setup(c =>
                c.GetAsync<BookingDto>(
                    CacheKeys.BookingDetail(bookingId),
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync((BookingDto?)null);

        SetupRepoWithBookings([booking]);

        _cacheService
            .Setup(c =>
                c.SetAsync(
                    CacheKeys.BookingDetail(bookingId),
                    It.IsAny<BookingDto>(),
                    It.IsAny<TimeSpan?>(),
                    It.IsAny<CancellationToken>()
                )
            )
            .Returns(Task.CompletedTask);

        var result = await _sut.Handle(
            new GetBookingDetailQuery(bookingId),
            CancellationToken.None
        );

        result.Id.Should().Be(bookingId);
    }

    [Fact]
    public async Task Handle_AfterCacheMiss_StoresResultInCache()
    {
        var bookingId = BookingTestData.Valid.BookingId;
        var booking = BookingTestData.BuildBookingWithNavigation(id: bookingId);

        _cacheService
            .Setup(c =>
                c.GetAsync<BookingDto>(
                    CacheKeys.BookingDetail(bookingId),
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync((BookingDto?)null);

        SetupRepoWithBookings([booking]);

        _cacheService
            .Setup(c =>
                c.SetAsync(
                    CacheKeys.BookingDetail(bookingId),
                    It.IsAny<BookingDto>(),
                    It.IsAny<TimeSpan?>(),
                    It.IsAny<CancellationToken>()
                )
            )
            .Returns(Task.CompletedTask);

        await _sut.Handle(new GetBookingDetailQuery(bookingId), CancellationToken.None);

        _cacheService.Verify(
            c =>
                c.SetAsync(
                    CacheKeys.BookingDetail(bookingId),
                    It.IsAny<BookingDto>(),
                    It.IsAny<TimeSpan?>(),
                    It.IsAny<CancellationToken>()
                ),
            Times.Once
        );
    }

    // ── Not found ─────────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenBookingNotFound_ThrowsNotFoundException()
    {
        var bookingId = Guid.NewGuid();

        _cacheService
            .Setup(c =>
                c.GetAsync<BookingDto>(
                    CacheKeys.BookingDetail(bookingId),
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync((BookingDto?)null);

        SetupRepoWithBookings([]);

        var act = () => _sut.Handle(new GetBookingDetailQuery(bookingId), CancellationToken.None);

        await act.Should().ThrowAsync<NotFoundException>().WithMessage("*Booking not found*");
    }

    [Fact]
    public async Task Handle_WhenBookingIsSoftDeleted_ThrowsNotFoundException()
    {
        var bookingId = Guid.NewGuid();
        var deletedBooking = BookingTestData.BuildBookingWithNavigation(id: bookingId);
        deletedBooking.IsDeleted = true;

        _cacheService
            .Setup(c =>
                c.GetAsync<BookingDto>(
                    CacheKeys.BookingDetail(bookingId),
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync((BookingDto?)null);

        SetupRepoWithBookings([deletedBooking]);

        var act = () => _sut.Handle(new GetBookingDetailQuery(bookingId), CancellationToken.None);

        await act.Should().ThrowAsync<NotFoundException>();
    }
}
