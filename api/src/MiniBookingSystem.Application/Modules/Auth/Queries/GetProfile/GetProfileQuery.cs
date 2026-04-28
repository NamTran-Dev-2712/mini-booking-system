using MediatR;

public record GetProfileQuery(string UserId) : IRequest<UserDTO>;
