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

        // setup output caching
        services.AddStackExchangeRedisOutputCache(options =>
        {
            options.Configuration = configuration[ConfigurationValue.RedisConnectionString];
            options.InstanceName = configuration[ConfigurationValue.RedisInstanceName] + "output:";
        });
        services.AddOutputCache(options =>
        {
            options.AddPolicy(
                CacheKeys.PublicMentorListPolicy,
                policy =>
                {
                    policy
                        .Expire(TimeSpan.FromMinutes(5))
                        .SetVaryByQuery("*")
                        .Tag(CacheKeys.PublicListMentorTag);
                }
            );

            // options.AddPolicy("Availability", policy =>
            // {
            //     policy
            //         .Expire(TimeSpan.FromSeconds(30))
            //         .SetVaryByRouteValue("mentorId")
            //         .SetVaryByQuery("from", "to")
            //         .Tag("mentor-availability");
            // });

            // options.AddPolicy(
            //     "ServiceList",
            //     policy =>
            //     {
            //         policy
            //             .Expire(TimeSpan.FromMinutes(5))
            //             .SetVaryByQuery("page", "pageSize", "keyword", "sortBy")
            //             .Tag("services");
            //     }
            // );
        });

        return services;
    }
}
