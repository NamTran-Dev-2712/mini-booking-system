using System.Linq.Expressions;
using MediatR;

public class GetUserBookingQueryHandler
    : BaseGetQueryHandler<GetUserBookingQuery, Booking, BookingDto>
{
    public GetUserBookingQueryHandler(IUnitOfWork unitOfWork)
        : base(unitOfWork) { }

    protected override IQueryable<Booking> ApplyFilter(
        IQueryable<Booking> query,
        GetUserBookingQuery request
    )
    {
        query = query.Where(b => b.UserId == request.UserId);

        if (request.Status.HasValue)
            query = query.Where(b => b.Status == request.Status.Value);

        return query;
    }

    protected override Dictionary<string, Expression<Func<Booking, object>>> SortKeyMap =>
        new(StringComparer.OrdinalIgnoreCase)
        {
            [BookingSortKeys.CreatedAt] = b => b.CreatedAt,
            [BookingSortKeys.Status] = b => b.Status,
        };

    protected override IQueryable<BookingDto> ApplyProjection(IQueryable<Booking> query)
    {
        return query.Select(b => new BookingDto
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
            CreatedAt = b.CreatedAt,
        });
    }
}
