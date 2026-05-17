using MediatR;

public record GetMentorDashboardQuery(Guid UserId, int Months = 6) : IRequest<MentorDashboardDTO>;
