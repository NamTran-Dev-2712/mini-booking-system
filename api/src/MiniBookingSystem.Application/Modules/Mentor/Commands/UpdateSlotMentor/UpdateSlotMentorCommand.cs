using MediatR;

public record UpdateSlotMentorCommand(
    Guid Id,
    Guid MentorId,
    DateTime StartTime,
    DateTime EndTime,
    decimal Price,
    string? Description,
    int MaxBookings
) : IRequest<Guid>;
