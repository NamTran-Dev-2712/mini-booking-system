using MediatR;

public record UpdateSlotMentorCommand(
    Guid Id,
    Guid MentorId,
    DateTime StartTime,
    DateTime EndTime,
    decimal Price
) : IRequest<Guid>;
