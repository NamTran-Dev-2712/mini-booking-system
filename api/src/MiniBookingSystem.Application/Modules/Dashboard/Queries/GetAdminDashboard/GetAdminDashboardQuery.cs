using MediatR;

public record GetAdminDashboardQuery(int Months = 6) : IRequest<AdminDashboardDTO>;
