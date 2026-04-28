namespace MiniBookingSystem.Application.Common.Constants;

public static class ApplicationRoles
{
    public const string Admin = "Admin";
    public const string User = "User";
    public const string Mentor = "Mentor";

    public static readonly IReadOnlyList<string> All = [Admin, User, Mentor];
}
