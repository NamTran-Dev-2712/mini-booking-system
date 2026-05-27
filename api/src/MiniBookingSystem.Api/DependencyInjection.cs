using System.Net;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;

public static class DependencyInjection
{
    public static IServiceCollection AddPresentation(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        // Add controller
        services.AddControllers();

        // Configure forwarded headers so the real client IP is available behind
        // nginx/Traefik/Caddy in production. Works transparently in local dev
        // (no proxy → no X-Forwarded-For header → middleware does nothing).
        services.Configure<ForwardedHeadersOptions>(options =>
        {
            options.ForwardedHeaders =
                ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;

            // Only trust explicitly listed proxy IPs (from config).
            // Clear defaults so unknown proxies cannot spoof X-Forwarded-For.
            options.KnownIPNetworks.Clear();
            options.KnownProxies.Clear();

            var trustedProxies =
                configuration
                    .GetSection(ConfigurationValue.ReverseProxyTrustedProxies)
                    .Get<string[]>()
                ?? [];

            foreach (var proxy in trustedProxies)
            {
                if (IPAddress.TryParse(proxy, out var ip))
                {
                    options.KnownProxies.Add(ip);
                }
                else
                {
                    // Support Docker service names (e.g. "nginx") — resolve at startup.
                    // In a Docker bridge network, container names resolve via internal DNS.
                    try
                    {
                        foreach (var addr in System.Net.Dns.GetHostAddresses(proxy))
                            options.KnownProxies.Add(addr);
                    }
                    catch
                    { /* hostname not resolvable, skip */
                    }
                }
            }
        });

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
                    var ip = NormalizeIp(httpContext.Connection.RemoteIpAddress);

                    Log.Information("Client IP for rate limiting: {Ip}", ip);

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
                        ?? NormalizeIp(httpContext.Connection.RemoteIpAddress);

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
                    var userId =
                        httpContext.User.FindFirst("sub")?.Value
                        ?? NormalizeIp(httpContext.Connection.RemoteIpAddress);

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

    /// <summary>
    /// Normalizes loopback IPv6 variants to IPv4 so that browser (::1) and
    /// Postman/curl (127.0.0.1) share the same rate-limit partition.
    /// ::1               → 127.0.0.1
    /// ::ffff:127.0.0.1  → 127.0.0.1
    /// </summary>
    private static string NormalizeIp(System.Net.IPAddress? ip)
    {
        if (ip == null)
            return "unknown";
        if (ip.IsIPv4MappedToIPv6)
            ip = ip.MapToIPv4();
        if (ip.Equals(System.Net.IPAddress.IPv6Loopback))
            return System.Net.IPAddress.Loopback.ToString();
        return ip.ToString();
    }
}
