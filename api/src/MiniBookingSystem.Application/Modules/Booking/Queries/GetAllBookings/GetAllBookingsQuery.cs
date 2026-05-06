using MediatR;

public record GetAllBookingsQuery : BaseFilterQuery, IRequest<PaginatedResult<BookingDto>>
{
    public Guid? UserId { get; init; }
    public BookingStatus? Status { get; init; }
}
