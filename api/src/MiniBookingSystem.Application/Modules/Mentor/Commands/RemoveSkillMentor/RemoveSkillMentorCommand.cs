using MediatR;

public record RemoveSkillMentorCommand(Guid MentorId, Guid SkillId) : IRequest<Unit>;
