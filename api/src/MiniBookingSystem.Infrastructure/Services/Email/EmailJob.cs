using Hangfire;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

public sealed class EmailJob : IEmailJob
{
    private readonly IEmailService _emailService;
    private readonly IEmailTemplateService _templateService;
    private readonly ILogger<EmailJob> _logger;
    private readonly IConfiguration _configuration;

    public EmailJob(
        IEmailService emailService,
        IEmailTemplateService templateService,
        ILogger<EmailJob> logger,
        IConfiguration configuration
    )
    {
        _emailService = emailService;
        _templateService = templateService;
        _logger = logger;
        _configuration = configuration;
    }

    [AutomaticRetry(Attempts = 5, DelaysInSeconds = new[] { 60, 300, 900, 3600, 7200 })]
    public async Task SendMentorWelcomeEmailAsync(
        string to,
        string fullName,
        string email,
        string password
    )
    {
        _logger.LogInformation("Sending welcome email to mentor {Email}", email);

        var loginUrl = _configuration[ConfigurationValue.BaseUrlFrontend] + "/login";

        var model = new
        {
            FullName = fullName,
            Email = email,
            Password = password,
            LoginUrl = loginUrl,
        };

        var htmlBody = await _templateService.RenderAsync("mentor-welcome", model);

        await _emailService.SendEmailAsync(
            to,
            "Welcome to MiniBookingSystem - Your Mentor Account",
            htmlBody
        );

        _logger.LogInformation("Welcome email sent successfully to {Email}", email);
    }

    [AutomaticRetry(Attempts = 5, DelaysInSeconds = new[] { 60, 300, 900, 3600, 7200 })]
    public async Task SendMentorSelfWelcomeEmailAsync(string to, string fullName)
    {
        _logger.LogInformation("Sending self-register welcome email to mentor {Email}", to);

        var loginUrl = _configuration[ConfigurationValue.BaseUrlFrontend] + "/login";

        var model = new { FullName = fullName, LoginUrl = loginUrl };

        var htmlBody = await _templateService.RenderAsync("mentor-self-welcome", model);

        await _emailService.SendEmailAsync(
            to,
            "Welcome to MiniBookingSystem - Your Mentor Account",
            htmlBody
        );

        _logger.LogInformation("Self-register welcome email sent successfully to {Email}", to);
    }

    [AutomaticRetry(Attempts = 5, DelaysInSeconds = new[] { 60, 300, 900, 3600, 7200 })]
    public async Task SendPasswordResetEmailAsync(
        string to,
        string fullName,
        string otpCode,
        string resetUrl
    )
    {
        _logger.LogInformation("Sending password reset email to {Email}", to);

        var model = new
        {
            FullName = fullName,
            OtpCode = otpCode,
            ResetUrl = resetUrl,
        };

        var htmlBody = await _templateService.RenderAsync("password-reset", model);

        await _emailService.SendEmailAsync(to, "Password Reset - MiniBookingSystem", htmlBody);

        _logger.LogInformation("Password reset email sent successfully to {Email}", to);
    }

    [AutomaticRetry(Attempts = 5, DelaysInSeconds = new[] { 60, 300, 900, 3600, 7200 })]
    public async Task SendAdminWelcomeEmailAsync(
        string to,
        string fullName,
        string email,
        string password
    )
    {
        _logger.LogInformation("Sending admin welcome email to {Email}", email);

        var loginUrl = _configuration[ConfigurationValue.BaseUrlFrontend] + "/login";

        var model = new
        {
            FullName = fullName,
            Email = email,
            Password = password,
            LoginUrl = loginUrl,
        };

        var htmlBody = await _templateService.RenderAsync("admin-welcome", model);

        await _emailService.SendEmailAsync(
            to,
            "Welcome to MiniBookingSystem - Your Admin Account",
            htmlBody
        );

        _logger.LogInformation("Admin welcome email sent successfully to {Email}", email);
    }
}
