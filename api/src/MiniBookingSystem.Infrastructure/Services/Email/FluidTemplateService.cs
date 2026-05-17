using System.Reflection;
using Fluid;
using Microsoft.Extensions.Logging;

public sealed class FluidTemplateService : IEmailTemplateService
{
    private static readonly FluidParser Parser = new();
    private readonly ILogger<FluidTemplateService> _logger;

    public FluidTemplateService(ILogger<FluidTemplateService> logger)
    {
        _logger = logger;
    }

    public async Task<string> RenderAsync(
        string templateName,
        object model,
        CancellationToken cancellationToken = default
    )
    {
        var templateContent = await LoadTemplateAsync(templateName);

        if (!Parser.TryParse(templateContent, out var template, out var error))
        {
            _logger.LogError(
                "Failed to parse email template '{TemplateName}': {Error}",
                templateName,
                error
            );
            throw new InvalidOperationException(
                $"Failed to parse email template '{templateName}': {error}"
            );
        }

        var context = new TemplateContext(model);
        context.Options.MemberAccessStrategy = new UnsafeMemberAccessStrategy();

        return await template.RenderAsync(context);
    }

    private static async Task<string> LoadTemplateAsync(string templateName)
    {
        var assembly = Assembly.GetExecutingAssembly();
        var resourceName =
            $"MiniBookingSystem.Infrastructure.Services.Email.Templates.{templateName}.liquid";

        await using var stream =
            assembly.GetManifestResourceStream(resourceName)
            ?? throw new FileNotFoundException(
                $"Email template '{templateName}' not found as embedded resource."
            );

        using var reader = new StreamReader(stream);
        return await reader.ReadToEndAsync();
    }
}
