using MediatR;

public record GetUserDashboardQuery(Guid UserId, int Months = 6) : IRequest<UserDashboardDTO>;
