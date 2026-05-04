using MediatR;

public record GetProfileQuery(Guid UserId) : IRequest<UserDTO>;
