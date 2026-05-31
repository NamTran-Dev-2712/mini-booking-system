using MediatR;

public record RemoveSkillMentorCommand(
    Guid MentorId,
    Guid SkillId,
    // Requester context, populated server-side from the JWT (never from the body).
    Guid RequesterUserId = default,
    bool RequesterIsAdmin = false
) : IRequest<Unit>;
