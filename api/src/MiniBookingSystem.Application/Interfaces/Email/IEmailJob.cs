public interface IEmailJob
{
    Task SendMentorWelcomeEmailAsync(string to, string fullName, string email, string password);
}
