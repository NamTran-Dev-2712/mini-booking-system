using MediatR;

public record CreateSlotMentorCommand(
    Guid MentorId,
    DateTime StartTime,
    DateTime EndTime,
    decimal Price
) : IRequest<Guid>;
