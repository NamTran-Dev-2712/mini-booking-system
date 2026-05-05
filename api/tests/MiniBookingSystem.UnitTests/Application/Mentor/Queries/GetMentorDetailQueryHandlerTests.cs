namespace MiniBookingSystem.UnitTests.Application.Mentor.Queries;

public sealed class GetMentorDetailQueryHandlerTests
{
    private readonly Mock<IUnitOfWork> _unitOfWork;
    private readonly Mock<IMentorRepository> _mentorRepo;
    private readonly Mock<IMentorSkillRepository> _mentorSkillRepo;
    private readonly Mock<IMentorSlotRepository> _mentorSlotRepo;
    private readonly Mock<ICacheService> _cacheService;
    private readonly GetMentorDetailHandler _sut;

    public GetMentorDetailQueryHandlerTests()
    {
        _unitOfWork = new Mock<IUnitOfWork>(MockBehavior.Strict);
        _mentorRepo = new Mock<IMentorRepository>(MockBehavior.Strict);
        _mentorSkillRepo = new Mock<IMentorSkillRepository>(MockBehavior.Strict);
        _mentorSlotRepo = new Mock<IMentorSlotRepository>(MockBehavior.Strict);
        _cacheService = new Mock<ICacheService>(MockBehavior.Strict);

        _unitOfWork.Setup(u => u.Mentor).Returns(_mentorRepo.Object);
        _unitOfWork.Setup(u => u.MentorSkill).Returns(_mentorSkillRepo.Object);
        _unitOfWork.Setup(u => u.MentorSlot).Returns(_mentorSlotRepo.Object);

        _sut = new GetMentorDetailHandler(_unitOfWork.Object, _cacheService.Object);
    }

    private void SetupDbPath(
        Guid mentorId,
        IReadOnlyList<MentorSkill>? skills = null,
        IReadOnlyList<MentorSlot>? slots = null
    )
    {
        var mentor = MentorTestData.BuildMentor(id: mentorId);

        _mentorRepo
            .Setup(r => r.GetByIdAsync(mentorId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(mentor);

        _mentorSkillRepo
            .Setup(r =>
                r.GetAllAsync(
                    It.IsAny<System.Linq.Expressions.Expression<Func<MentorSkill, bool>>>()
                )
            )
            .ReturnsAsync(
                skills
                    ?? new List<MentorSkill> { MentorTestData.BuildMentorSkill(mentorId: mentorId) }
            );

        _mentorSlotRepo
            .Setup(r =>
                r.GetAllAsync(
                    It.IsAny<System.Linq.Expressions.Expression<Func<MentorSlot, bool>>>()
                )
            )
            .ReturnsAsync(
                slots ?? new List<MentorSlot> { MentorTestData.BuildMentorSlot(mentorId: mentorId) }
            );

        _cacheService
            .Setup(c =>
                c.SetAsync(
                    It.IsAny<string>(),
                    It.IsAny<MentorDetailDTO>(),
                    It.IsAny<TimeSpan?>(),
                    It.IsAny<CancellationToken>()
                )
            )
            .Returns(Task.CompletedTask);
    }

    // ── Cache hit ─────────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenCacheHit_ReturnsCachedResultWithoutCallingRepository()
    {
        // Arrange
        var mentorId = MentorTestData.Valid.MentorId;
        var cached = MentorTestData.BuildMentorDetailDto(mentorId);

        _cacheService
            .Setup(c =>
                c.GetAsync<MentorDetailDTO>(
                    CacheKeys.MentorDetail(mentorId),
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync(cached);

        var query = new GetMentorDetailQuery(mentorId);

        // Act
        var result = await _sut.Handle(query, CancellationToken.None);

        // Assert
        result.Should().BeSameAs(cached);
        _mentorRepo.Verify(
            r => r.GetByIdAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()),
            Times.Never
        );
    }

    // ── Cache miss ────────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenCacheMiss_FetchesFromDatabaseAndCachesResult()
    {
        // Arrange
        var mentorId = MentorTestData.Valid.MentorId;

        _cacheService
            .Setup(c =>
                c.GetAsync<MentorDetailDTO>(
                    CacheKeys.MentorDetail(mentorId),
                    It.IsAny<CancellationToken>()
                )
            )
            .ReturnsAsync((MentorDetailDTO?)null);
        SetupDbPath(mentorId);

        var query = new GetMentorDetailQuery(mentorId);

        // Act
        var result = await _sut.Handle(query, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.Id.Should().Be(mentorId);

        _cacheService.Verify(
            c =>
                c.SetAsync(
                    CacheKeys.MentorDetail(mentorId),
                    It.IsAny<MentorDetailDTO>(),
                    TimeSpan.FromMinutes(10),
                    It.IsAny<CancellationToken>()
                ),
            Times.Once
        );
    }

    [Fact]
    public async Task Handle_MapsSkillsCorrectly()
    {
        // Arrange
        var mentorId = MentorTestData.Valid.MentorId;
        var skill = MentorTestData.BuildMentorSkill(mentorId: mentorId);

        _cacheService
            .Setup(c =>
                c.GetAsync<MentorDetailDTO>(It.IsAny<string>(), It.IsAny<CancellationToken>())
            )
            .ReturnsAsync((MentorDetailDTO?)null);
        SetupDbPath(mentorId, skills: new[] { skill });

        var query = new GetMentorDetailQuery(mentorId);

        // Act
        var result = await _sut.Handle(query, CancellationToken.None);

        // Assert
        result.Skills.Should().HaveCount(1);
        result.Skills[0].Id.Should().Be(skill.Id);
        result.Skills[0].SkillName.Should().Be(skill.SkillName);
    }

    [Fact]
    public async Task Handle_MapsSlotsCorrectly()
    {
        // Arrange
        var mentorId = MentorTestData.Valid.MentorId;
        var slot = MentorTestData.BuildMentorSlot(
            mentorId: mentorId,
            status: MentorSlotStatus.Available
        );

        _cacheService
            .Setup(c =>
                c.GetAsync<MentorDetailDTO>(It.IsAny<string>(), It.IsAny<CancellationToken>())
            )
            .ReturnsAsync((MentorDetailDTO?)null);
        SetupDbPath(mentorId, slots: new[] { slot });

        var query = new GetMentorDetailQuery(mentorId);

        // Act
        var result = await _sut.Handle(query, CancellationToken.None);

        // Assert
        result.Slots.Should().HaveCount(1);
        result.Slots[0].Id.Should().Be(slot.Id);
        result.Slots[0].StartTime.Should().Be(slot.StartTime);
        result.Slots[0].EndTime.Should().Be(slot.EndTime);
        result.Slots[0].Status.Should().Be(slot.Status);
        result.Slots[0].Price.Should().Be(slot.Price);
    }

    // ── Error path ────────────────────────────────────────────────────────

    [Fact]
    public async Task Handle_WhenMentorNotFound_ThrowsNotFoundException()
    {
        // Arrange
        var mentorId = Guid.NewGuid();

        _cacheService
            .Setup(c =>
                c.GetAsync<MentorDetailDTO>(It.IsAny<string>(), It.IsAny<CancellationToken>())
            )
            .ReturnsAsync((MentorDetailDTO?)null);
        _mentorRepo
            .Setup(r => r.GetByIdAsync(mentorId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((global::Mentor?)null);

        var query = new GetMentorDetailQuery(mentorId);

        // Act
        var act = () => _sut.Handle(query, CancellationToken.None);

        // Assert
        await act.Should().ThrowAsync<NotFoundException>().WithMessage($"*Mentor*{mentorId}*");
    }
}
