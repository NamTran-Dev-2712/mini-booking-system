using MediatR;

public record CreateBookingCommand(
    Guid UserId,
    Guid MentorSlotId,
    string? Notes,
    string? IdempotencyKey = null
) : IRequest<Guid>;
