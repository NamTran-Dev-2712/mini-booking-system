using MediatR;

public record GetUserBookingQuery : BaseFilterQuery, IRequest<PaginatedResult<BookingDto>>
{
    public Guid UserId { get; init; }
    public BookingStatus? Status { get; init; }
}
