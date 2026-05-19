using MediatR;

public record CreateSlotMentorCommand(
    Guid MentorId,
    string Name,
    DateTime StartTime,
    DateTime EndTime,
    string? Description,
    int MaxBookings,
    decimal Price
) : IRequest<Guid>;
