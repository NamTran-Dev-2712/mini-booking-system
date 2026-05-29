public interface IEmailJob
{
    Task SendMentorWelcomeEmailAsync(string to, string fullName, string email, string password);
    Task SendMentorSelfWelcomeEmailAsync(string to, string fullName);
    Task SendPasswordResetEmailAsync(string to, string fullName, string otpCode, string resetUrl);
    Task SendAdminWelcomeEmailAsync(string to, string fullName, string email, string password);
}
