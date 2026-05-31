using MediatR;

public record CreateSlotMentorCommand(
    Guid MentorId,
    string Name,
    DateTime StartTime,
    DateTime EndTime,
    string? Description,
    int MaxBookings,
    decimal Price,
    string? Location = null,
    // Requester context, populated server-side from the JWT (never from the body).
    Guid RequesterUserId = default,
    bool RequesterIsAdmin = false
) : IRequest<Guid>;
