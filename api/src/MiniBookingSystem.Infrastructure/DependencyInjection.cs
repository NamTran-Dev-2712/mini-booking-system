using System.Net.Http.Headers;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using StackExchange.Redis;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        // Configure DbContext with PostgreSQL and snake_case naming convention
        services.AddDbContext<ApplicationDbContext>(options =>
            options
                .UseNpgsql(
                    configuration.GetConnectionString("DefaultConnection"),
                    npgsql =>
                        npgsql.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)
                )
                .UseSnakeCaseNamingConvention()
        );

        // Configure Identity
        services
            .AddIdentityCore<ApplicationUser>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireUppercase = true;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequiredLength = 8;
                options.User.RequireUniqueEmail = true;
            })
            .AddRoles<IdentityRole<Guid>>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

        // Configure JWT settings
        services.Configure<JwtOptions>(configuration.GetSection(ConfigurationValue.JwtSettings));
        services.AddScoped<IJwtTokenService, JwtTokenService>();

        var jwtSettings =
            configuration.GetSection(ConfigurationValue.JwtSettings).Get<JwtOptions>()
            ?? throw new InvalidOperationException("JWT settings are not properly configured.");

        services
            .AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                // Tắt claim mapping mặc định để giữ nguyên tên claim gốc từ JWT (sub, email, ...)
                // Nếu để mặc định, ASP.NET Core sẽ map "sub" → ClaimTypes.NameIdentifier
                options.MapInboundClaims = false;

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings.Issuer,
                    ValidAudience = jwtSettings.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(jwtSettings.Secret)
                    ),
                    // Xóa độ trễ mặc định 5 phút của token expiration trong .NET
                    ClockSkew = TimeSpan.Zero,
                };

                // Đọc JWT token từ cookie thay vì Authorization header
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var token = context.Request.Cookies["access_token"];
                        if (!string.IsNullOrEmpty(token))
                            context.Token = token;
                        return Task.CompletedTask;
                    },
                };
            });

        // Configure cache options
        services.Configure<CacheOptions>(configuration.GetSection(ConfigurationValue.Redis));
        var redisSettings =
            configuration.GetSection(ConfigurationValue.Redis).Get<CacheOptions>()
            ?? throw new InvalidOperationException("Redis settings are not properly configured.");

        services.AddStackExchangeRedisCache(options =>
        {
            options.Configuration = redisSettings.ConnectionString;
            options.InstanceName = redisSettings.InstanceName;
        });
        services.AddSingleton<IConnectionMultiplexer>(_ =>
            ConnectionMultiplexer.Connect(redisSettings.ConnectionString!)
        );
        services.AddScoped<ICacheService, RedisCacheService>();

        // Register application services
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped<ITokenHasher, TokenHasher>();
        services.AddScoped<IIdentityService, IdentityService>();

        // Register SePay
        services.Configure<SePayOptions>(configuration.GetSection("SePay"));
        services.AddScoped<ISePayQrService, SePayQrService>();

        // Register MiniMax AI
        services.Configure<MiniMaxOptions>(configuration.GetSection(ConfigurationValue.MiniMax));
        var miniMaxOptions =
            configuration.GetSection(ConfigurationValue.MiniMax).Get<MiniMaxOptions>()
            ?? throw new InvalidOperationException(
                "MiniMax settings are not configured. Add a 'MiniMax' section to appsettings."
            );
        if (string.IsNullOrWhiteSpace(miniMaxOptions.ApiKey))
            throw new InvalidOperationException(
                "MiniMax:ApiKey must be configured. "
                    + "Set it via User Secrets (dev) or environment variable MiniMax__ApiKey (prod)."
            );

        services.AddHttpClient<IMiniMaxService, MiniMaxService>(client =>
        {
            client.BaseAddress = new Uri(miniMaxOptions.BaseUrl);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
                "Bearer",
                miniMaxOptions.ApiKey
            );
            client.Timeout = TimeSpan.FromSeconds(30);
        });

        services.AddScoped<IConversationHistoryService, ConversationHistoryService>();

        // Register repositories
        services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IMentorRepository, MentorRepository>();
        services.AddScoped<IMentorSkillRepository, MentorSkillRepository>();

        // Register background jobs
        services.AddHostedService<ExpiredBookingCleanupJob>();
        services.AddHostedService<CompletedBookingJob>();

        return services;
    }
}
