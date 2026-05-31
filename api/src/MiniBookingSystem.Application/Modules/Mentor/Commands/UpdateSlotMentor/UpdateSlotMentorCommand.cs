using MediatR;

public record UpdateSlotMentorCommand(
    Guid Id,
    Guid MentorId,
    string Name,
    DateTime StartTime,
    DateTime EndTime,
    decimal Price,
    string? Description,
    int MaxBookings,
    string? Location = null,
    // Requester context, populated server-side from the JWT (never from the body).
    Guid RequesterUserId = default,
    bool RequesterIsAdmin = false
) : IRequest<Guid>;
