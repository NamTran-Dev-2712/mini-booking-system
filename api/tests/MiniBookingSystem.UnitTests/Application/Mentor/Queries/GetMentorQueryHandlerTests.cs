namespace MiniBookingSystem.UnitTests.Application.Mentor.Queries;

public sealed class GetMentorQueryHandlerTests
{
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly Mock<IGenericRepository<global::Mentor>> _mentorRepo;
    private readonly GetMentorQueryHandler _sut;

    public GetMentorQueryHandlerTests()
    {
        _unitOfWork = new Mock<IUnitOfWork>(MockBehavior.Strict);
        _mentorRepo = new Mock<IGenericRepository<global::Mentor>>(MockBehavior.Strict);

        _unitOfWork.Setup(u => u.Repository<global::Mentor>()).Returns(_mentorRepo.Object);

        _sut = new GetMentorQueryHandler(_unitOfWork.Object);
    }

    /// <summary>
    /// Wires up the in-memory mentor list so CountAsync and ToListAsync evaluate actual LINQ.
    /// This allows filtering, projection, sorting, and pagination logic to be fully tested.
    /// </summary>
    private void SetupMentors(IEnumerable<global::Mentor> mentors)
    {
        _mentorRepo.Setup(r => r.Query()).Returns(mentors.AsAsyncQueryable());

        _mentorRepo
            .Setup(r =>
                r.CountAsync(It.IsAny<IQueryable<global::Mentor>>(), It.IsAny<CancellationToken>())
            )
            .Returns<IQueryable<global::Mentor>, CancellationToken>(
                (q, _) => Task.FromResult(q.Count())
            );

        _mentorRepo
            .Setup(r =>
                r.ToListAsync(It.IsAny<IQueryable<MentorDto>>(), It.IsAny<CancellationToken>())
            )
            .Returns<IQueryable<MentorDto>, CancellationToken>(
                (q, _) => Task.FromResult(q.ToList())
            );
    }

    private static GetMentorQuery DefaultQuery(
        int pageNumber = 1,
        int pageSize = 10,
        string? searchTerm = null,
        decimal? minBasePrice = null,
        decimal? maxBasePrice = null,
        int? minExperienceYears = null,
        int? maxExperienceYears = null,
        string? sortBy = null,
        string sortOrder = "asc"
    ) =>
        new()
        {
            PageNumber = pageNumber,
            PageSize = pageSize,
            SearchTerm = searchTerm,
            MinBasePrice = minBasePrice,
            MaxBasePrice = maxBasePrice,
            MinExperienceYears = minExperienceYears,
            MaxExperienceYears = maxExperienceYears,
            SortBy = sortBy,
            SortOrder = sortOrder,
        };

    // ── Active filter ──────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WithNoFilters_ReturnsOnlyActiveMentors()
    {
        // Arrange
        var activeMentor = MentorTestData.BuildMentor(id: Guid.NewGuid(), isActive: true);
        var inactiveMentor = MentorTestData.BuildMentor(id: Guid.NewGuid(), isActive: false);
        SetupMentors([activeMentor, inactiveMentor]);

        // Act
        var result = await _sut.Handle(DefaultQuery(), CancellationToken.None);

        // Assert
        result.Items.Should().HaveCount(1);
        result.Items.Single().Id.Should().Be(activeMentor.Id);
    }

    // ── Price filter ───────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WithMinBasePrice_ExcludesMentorsBelowThreshold()
    {
        // Arrange
        var cheap = MentorTestData.BuildMentor(id: Guid.NewGuid(), basePrice: 100_000m);
        var expensive = MentorTestData.BuildMentor(id: Guid.NewGuid(), basePrice: 600_000m);
        SetupMentors([cheap, expensive]);

        // Act
        var result = await _sut.Handle(
            DefaultQuery(minBasePrice: 500_000m),
            CancellationToken.None
        );

        // Assert
        result.Items.Should().HaveCount(1);
        result.Items.Single().BasePrice.Should().Be(600_000m);
    }

    [Fact]
    public async Task Handle_WithMaxBasePrice_ExcludesMentorsAboveThreshold()
    {
        // Arrange
        var cheap = MentorTestData.BuildMentor(id: Guid.NewGuid(), basePrice: 100_000m);
        var expensive = MentorTestData.BuildMentor(id: Guid.NewGuid(), basePrice: 900_000m);
        SetupMentors([cheap, expensive]);

        // Act
        var result = await _sut.Handle(
            DefaultQuery(maxBasePrice: 500_000m),
            CancellationToken.None
        );

        // Assert
        result.Items.Should().HaveCount(1);
        result.Items.Single().BasePrice.Should().Be(100_000m);
    }

    // ── Experience filter ──────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WithMinExperienceYears_ExcludesMentorsBelowThreshold()
    {
        // Arrange
        var junior = MentorTestData.BuildMentor(id: Guid.NewGuid(), experienceYears: 1);
        var senior = MentorTestData.BuildMentor(id: Guid.NewGuid(), experienceYears: 10);
        SetupMentors([junior, senior]);

        // Act
        var result = await _sut.Handle(DefaultQuery(minExperienceYears: 5), CancellationToken.None);

        // Assert
        result.Items.Should().HaveCount(1);
        result.Items.Single().ExperienceYears.Should().Be(10);
    }

    // ── Search filter ──────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WithSearchTerm_MatchesByDisplayNamePrefix()
    {
        // Arrange
        var matched = MentorTestData.BuildMentor(id: Guid.NewGuid(), displayName: "Alice Smith");
        var unmatched = MentorTestData.BuildMentor(id: Guid.NewGuid(), displayName: "Bob Jones");
        SetupMentors([matched, unmatched]);

        // Act
        var result = await _sut.Handle(DefaultQuery(searchTerm: "alice"), CancellationToken.None);

        // Assert
        result.Items.Should().HaveCount(1);
        result.Items.Single().DisplayName.Should().Be("Alice Smith");
    }

    [Fact]
    public async Task Handle_WithSearchTerm_MatchesBySpecializationContains()
    {
        // Arrange
        var matched = MentorTestData.BuildMentor(
            id: Guid.NewGuid(),
            specialization: "Machine Learning"
        );
        var unmatched = MentorTestData.BuildMentor(
            id: Guid.NewGuid(),
            specialization: "Web Development"
        );
        SetupMentors([matched, unmatched]);

        // Act
        var result = await _sut.Handle(DefaultQuery(searchTerm: "machine"), CancellationToken.None);

        // Assert
        result.Items.Should().HaveCount(1);
        result.Items.Single().Specialization.Should().Be("Machine Learning");
    }

    // ── Pagination ─────────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WithPagination_ReturnsTotalCountAndCorrectPage()
    {
        // Arrange
        var mentors = Enumerable
            .Range(1, 5)
            .Select(i => MentorTestData.BuildMentor(id: Guid.NewGuid()))
            .ToList();
        SetupMentors(mentors);

        // Act
        var result = await _sut.Handle(
            DefaultQuery(pageNumber: 2, pageSize: 2),
            CancellationToken.None
        );

        // Assert
        result.TotalCount.Should().Be(5);
        result.Items.Should().HaveCount(2);
        result.PageNumber.Should().Be(2);
        result.TotalPages.Should().Be(3);
    }

    // ── Projection ─────────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_ReturnsMentorDtoWithCorrectlyMappedFields()
    {
        // Arrange
        var mentor = MentorTestData.BuildMentor();
        SetupMentors([mentor]);

        // Act
        var result = await _sut.Handle(DefaultQuery(), CancellationToken.None);

        // Assert
        var dto = result.Items.Single();
        dto.Id.Should().Be(mentor.Id);
        dto.DisplayName.Should().Be(mentor.DisplayName);
        dto.Email.Should().Be(mentor.Email);
        dto.ExperienceYears.Should().Be(mentor.ExperienceYears);
        dto.BasePrice.Should().Be(mentor.BasePrice);
        dto.IsActive.Should().BeTrue();
    }
}
