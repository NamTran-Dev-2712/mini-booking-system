using MediatR;

public record GetBookingDetailQuery(Guid BookingId) : IRequest<BookingDto>;
