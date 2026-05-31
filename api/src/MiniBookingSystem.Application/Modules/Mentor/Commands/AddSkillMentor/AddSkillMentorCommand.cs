using MediatR;

public record AddSkillMentorCommand(
    Guid MentorId,
    string SkillName,
    // Requester context, populated server-side from the JWT (never from the body).
    Guid RequesterUserId = default,
    bool RequesterIsAdmin = false
) : IRequest<Guid>;
