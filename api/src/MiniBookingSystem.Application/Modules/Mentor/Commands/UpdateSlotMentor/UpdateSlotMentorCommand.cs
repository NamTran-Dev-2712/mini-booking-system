using MediatR;

public record UpdateSlotMentorCommand(
    Guid Id,
    Guid MentorId,
    string Name,
    DateTime StartTime,
    DateTime EndTime,
    decimal Price,
    string? Description,
    int MaxBookings
) : IRequest<Guid>;
