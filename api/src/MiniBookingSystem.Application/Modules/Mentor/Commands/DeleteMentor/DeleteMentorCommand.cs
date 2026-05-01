using MediatR;

public record DeleteMentorCommand(Guid MentorId) : IRequest<Unit>;
