using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

public static class DependencyInjection
{
    public static IServiceCollection AddPresentation(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        // Add controller
        services.AddControllers();

        // Add docs API
        services.AddOpenApi(options =>
        {
            options.AddDocumentTransformer(
                (document, context, cancellationToken) =>
                {
                    document.Info = new()
                    {
                        Title = "Mini Booking System API",
                        Version = "v1",
                        Description = "API docs for Mini Booking System",
                    };

                    return Task.CompletedTask;
                }
            );
        });

        // Add global exception handler
        services.AddExceptionHandler<GlobalExceptionHandler>();
        services.AddProblemDetails();

        services.AddCors(options =>
        {
            options.AddPolicy(
                "DefaultCors",
                policy =>
                {
                    policy
                        .WithOrigins(
                            configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? []
                        )
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                }
            );
        });

        return services;
    }
}
