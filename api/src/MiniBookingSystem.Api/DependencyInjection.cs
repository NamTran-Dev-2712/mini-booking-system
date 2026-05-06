using System.Threading.RateLimiting;
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

            options.AddPolicy(
                CacheKeys.BookingUserListPolicy,
                policy =>
                {
                    policy
                        .Expire(TimeSpan.FromMinutes(3))
                        .SetVaryByRouteValue("userId")
                        .SetVaryByQuery("*")
                        .Tag(CacheKeys.BookingUserListTag);
                }
            );

            options.AddPolicy(
                CacheKeys.BookingAdminListPolicy,
                policy =>
                {
                    policy
                        .Expire(TimeSpan.FromMinutes(2))
                        .SetVaryByQuery("*")
                        .Tag(CacheKeys.BookingAdminListTag);
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

        // setup rate limiting
        services.AddRateLimiter(options =>
        {
            options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

            options.AddPolicy(
                CacheKeys.AuthRateLimitPolicy,
                httpContext =>
                {
                    var ip = httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";

                    return RateLimitPartition.GetFixedWindowLimiter(
                        partitionKey: ip,
                        factory: _ => new FixedWindowRateLimiterOptions
                        {
                            PermitLimit = 5,
                            Window = TimeSpan.FromMinutes(1),
                            QueueLimit = 0,
                            AutoReplenishment = true,
                        }
                    );
                }
            );

            options.AddPolicy(
                CacheKeys.BookingRateLimitPolicy,
                httpContext =>
                {
                    var userId =
                        httpContext.User.FindFirst("sub")?.Value
                        ?? httpContext.Connection.RemoteIpAddress?.ToString()
                        ?? "anonymous";

                    return RateLimitPartition.GetSlidingWindowLimiter(
                        partitionKey: userId,
                        factory: _ => new SlidingWindowRateLimiterOptions
                        {
                            PermitLimit = 10,
                            Window = TimeSpan.FromMinutes(1),
                            SegmentsPerWindow = 6,
                            QueueLimit = 0,
                            AutoReplenishment = true,
                        }
                    );
                }
            );

            options.AddPolicy(
                CacheKeys.AiRateLimitPolicy,
                httpContext =>
                {
                    var userId = httpContext.User.FindFirst("sub")?.Value ?? "anonymous";

                    return RateLimitPartition.GetTokenBucketLimiter(
                        partitionKey: userId,
                        factory: _ => new TokenBucketRateLimiterOptions
                        {
                            TokenLimit = 30,
                            TokensPerPeriod = 30,
                            ReplenishmentPeriod = TimeSpan.FromDays(1),
                            QueueLimit = 0,
                            AutoReplenishment = true,
                        }
                    );
                }
            );
        });

        return services;
    }
}
