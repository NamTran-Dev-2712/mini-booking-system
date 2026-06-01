using MediatR;

public record UpdateMentorStatusCommand(Guid Id, bool IsActive) : IRequest<Guid>;
