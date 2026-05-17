using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Resend;

public sealed class ResendEmailService : IEmailService
{
    private readonly IResend _resend;
    private readonly ResendOptions _options;
    private readonly ILogger<ResendEmailService> _logger;

    public ResendEmailService(
        IResend resend,
        IOptions<ResendOptions> options,
        ILogger<ResendEmailService> logger
    )
    {
        _resend = resend;
        _options = options.Value;
        _logger = logger;
    }

    public async Task SendEmailAsync(
        string to,
        string subject,
        string htmlBody,
        CancellationToken cancellationToken = default
    )
    {
        var message = new EmailMessage
        {
            From = $"{_options.FromName} <{_options.FromEmail}>",
            Subject = subject,
            HtmlBody = htmlBody,
        };
        message.To.Add(to);

        await _resend.EmailSendAsync(message, cancellationToken);

        _logger.LogInformation("Email sent to {Recipient} with subject '{Subject}'", to, subject);
    }
}
