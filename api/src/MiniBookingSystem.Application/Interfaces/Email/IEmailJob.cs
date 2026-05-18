public interface IEmailJob
{
    Task SendMentorWelcomeEmailAsync(string to, string fullName, string email, string password);
    Task SendPasswordResetEmailAsync(string to, string fullName, string otpCode, string resetUrl);
}
