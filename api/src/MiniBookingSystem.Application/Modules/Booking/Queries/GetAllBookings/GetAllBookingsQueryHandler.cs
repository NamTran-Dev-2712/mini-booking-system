using System.Linq.Expressions;
using MediatR;

public class GetAllBookingsQueryHandler
    : IRequestHandler<GetAllBookingsQuery, PaginatedResult<BookingDto>>
{
    private readonly IUnitOfWork _unitOfWork;

    public GetAllBookingsQueryHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<PaginatedResult<BookingDto>> Handle(
        GetAllBookingsQuery request,
        CancellationToken cancellationToken
    )
    {
        var repo = _unitOfWork.Repository<Booking>();
        var query = repo.Query().Where(b => b.IsDeleted != true);

        if (request.UserId.HasValue)
            query = query.Where(b => b.UserId == request.UserId.Value);

        if (request.Status.HasValue)
            query = query.Where(b => b.Status == request.Status.Value);

        if (!string.IsNullOrWhiteSpace(request.SearchTerm))
        {
            var term = request.SearchTerm.Trim().ToLower();
            query = query.Where(b => b.BookingCode.ToLower().Contains(term));
        }

        var totalCount = await repo.CountAsync(query, cancellationToken);

        query = ApplySorting(query, request.SortBy, request.SortOrder);

        var projectedQuery = query
            .Select(b => new BookingDto
            {
                Id = b.Id,
                UserId = b.UserId,
                BookingCode = b.BookingCode,
                MentorSlot = new MentorSlotDTO
                {
                    Id = b.MentorSlot.Id,
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
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize);

        var items = await repo.ToListAsync(projectedQuery, cancellationToken);

        return PaginatedResult<BookingDto>.Create(
            items,
            totalCount,
            request.PageNumber,
            request.PageSize
        );
    }

    private static IQueryable<Booking> ApplySorting(
        IQueryable<Booking> query,
        string? sortBy,
        string? sortOrder
    )
    {
        var sortKeyMap = new Dictionary<string, Expression<Func<Booking, object>>>(
            StringComparer.OrdinalIgnoreCase
        )
        {
            [BookingSortKeys.CreatedAt] = b => b.CreatedAt,
            [BookingSortKeys.Status] = b => b.Status,
        };

        var isDescending = string.Equals(
            sortOrder,
            SortOrderConstants.Descending,
            StringComparison.OrdinalIgnoreCase
        );

        if (!string.IsNullOrEmpty(sortBy) && sortKeyMap.TryGetValue(sortBy, out var sortExpr))
            return isDescending ? query.OrderByDescending(sortExpr) : query.OrderBy(sortExpr);

        return query.OrderByDescending(b => b.CreatedAt);
    }
}
