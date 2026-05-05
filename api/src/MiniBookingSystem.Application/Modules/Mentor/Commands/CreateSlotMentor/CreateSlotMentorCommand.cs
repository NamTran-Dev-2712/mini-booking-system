using MediatR;

public record CreateSlotMentorCommand(
    Guid MentorId,
    DateTime StartTime,
    DateTime EndTime,
    string? Description,
    int MaxBookings,
    decimal Price
) : IRequest<Guid>;
