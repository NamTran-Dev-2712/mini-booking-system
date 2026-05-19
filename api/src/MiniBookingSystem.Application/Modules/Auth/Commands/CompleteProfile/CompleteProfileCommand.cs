using MediatR;

public record CompleteProfileCommand(Guid UserId, string PhoneNumber) : IRequest;
