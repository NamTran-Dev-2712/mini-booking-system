using MediatR;

public record AddSkillMentorCommand(Guid MentorId, string SkillName) : IRequest<Guid>;
