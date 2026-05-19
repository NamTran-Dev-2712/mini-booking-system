using MediatR;

public class GetBookingDetailQueryHandler : IRequestHandler<GetBookingDetailQuery, BookingDto>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICacheService _cacheService;

    public GetBookingDetailQueryHandler(IUnitOfWork unitOfWork, ICacheService cacheService)
    {
        _unitOfWork = unitOfWork;
        _cacheService = cacheService;
    }

    public async Task<BookingDto> Handle(
        GetBookingDetailQuery request,
        CancellationToken cancellationToken
    )
    {
        var cacheKey = CacheKeys.BookingDetail(request.BookingId);
        var cached = await _cacheService.GetAsync<BookingDto>(cacheKey, cancellationToken);
        if (cached != null)
            return cached;

        var repo = _unitOfWork.Repository<Booking>();

        var projectedQuery = repo.Query()
            .Where(b => b.Id == request.BookingId && b.IsDeleted != true)
            .Select(b => new BookingDto
            {
                Id = b.Id,
                UserId = b.UserId,
                BookingCode = b.BookingCode,
                MentorSlot = new MentorSlotDTO
                {
                    Id = b.MentorSlot.Id,
                    Name = b.MentorSlot.Name,
                    Price = b.MentorSlot.Price,
                    StartTime = b.MentorSlot.StartTime,
                    EndTime = b.MentorSlot.EndTime,
                    Status = b.MentorSlot.Status,
                },
                Mentor = new MentorDto
                {
                    Id = b.MentorSlot.Mentor.Id,
                    DisplayName = b.MentorSlot.Mentor.DisplayName,
                    ExperienceYears = b.MentorSlot.Mentor.ExperienceYears,
                    BasePrice = b.MentorSlot.Mentor.BasePrice,
                    AvatarUrl = b.MentorSlot.Mentor.AvatarUrl,
                    Bio = b.MentorSlot.Mentor.Bio,
                    Specialization = b.MentorSlot.Mentor.Specialization,
                    CreatedAt = b.MentorSlot.Mentor.CreatedAt,
                    Email = b.MentorSlot.Mentor.Email,
                    IsActive = b.MentorSlot.Mentor.IsActive,
                    UserId = b.MentorSlot.Mentor.UserId,
                },
                Status = b.Status,
                CancellationReason = b.CancellationReason,
                CreatedAt = b.CreatedAt,
                UpdatedAt = b.UpdatedAt,
            })
            .Take(1);

        var results = await repo.ToListAsync(projectedQuery, cancellationToken);
        var booking = results.FirstOrDefault();

        if (booking == null)
            throw new NotFoundException("Booking", request.BookingId.ToString());

        await _cacheService.SetAsync(cacheKey, booking, TimeSpan.FromMinutes(5), cancellationToken);

        return booking;
    }
}
