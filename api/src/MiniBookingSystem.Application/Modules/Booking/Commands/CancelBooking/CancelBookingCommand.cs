using MediatR;

public record CancelBookingCommand(Guid UserId, Guid BookingId, string? CancellationReason = null)
    : IRequest<Guid> { }
