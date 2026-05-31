using Hangfire;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using MiniBookingSystem.Infrastructure.Persistence.DbContext;
using Scalar.AspNetCore;
using Serilog;

Log.Logger = new LoggerConfiguration().WriteTo.Console().CreateBootstrapLogger();

try
{
    // Start building the application
    Log.Information("Starting the application...");

    var builder = WebApplication.CreateBuilder(args);

    builder.Host.UseSerilog(
        (context, services, configuration) =>
            configuration.ReadFrom.Configuration(context.Configuration).ReadFrom.Services(services)
    );

    builder.Services.AddOpenApi();
    builder.Services.AddDataProtection();

    // Add Dependency Injection
    builder.Services.AddPresentation(builder.Configuration);
    builder.Services.AddApplication();
    builder.Services.AddInfrastructure(builder.Configuration);

    // Add localization
    builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");

    // Add health checks
    builder.Services.AddHealthChecks();

    var app = builder.Build();

    if (app.Environment.IsDevelopment())
    {
        app.MapOpenApi();

        app.MapScalarApiReference(options =>
        {
            options.Title = "Mini Booking System API";
            options.Theme = ScalarTheme.BluePlanet;
            options.DefaultHttpClient = new(ScalarTarget.CSharp, ScalarClient.HttpClient);
        });
    }

    app.UseSerilogRequestLogging();

    // Request localization — reads Accept-Language header
    var supportedCultures = new[] { "en", "vi" };
    app.UseRequestLocalization(options =>
    {
        options.SetDefaultCulture("en");
        options.AddSupportedCultures(supportedCultures);
        options.AddSupportedUICultures(supportedCultures);
    });

    app.MapHealthChecks("/health");

    app.UseExceptionHandler();

    // Must be first so that Connection.RemoteIpAddress is already the real
    // client IP before CORS, Auth, and RateLimiter middleware run.
    app.UseForwardedHeaders();

    app.UseHttpsRedirection();

    // Serve uploaded avatar files
    var uploadsPath = Path.Combine(
        app.Environment.ContentRootPath,
        builder.Configuration["Uploads:AvatarsPath"] ?? "uploads/avatars"
    );
    Directory.CreateDirectory(uploadsPath);
    app.UseStaticFiles(
        new StaticFileOptions
        {
            FileProvider = new PhysicalFileProvider(uploadsPath),
            RequestPath = "/uploads/avatars",
        }
    );

    app.UseCors("DefaultCors");

    app.UseAuthentication();
    app.UseAuthorization();

    // UseRateLimiter must run AFTER UseAuthentication/UseAuthorization so that
    // user-based rate limit policies (Booking, AI) can read HttpContext.User claims.
    app.UseRateLimiter();

    app.UseOutputCache();

    app.UseHangfireDashboard("/hangfire");

    app.MapControllers();

    // Apply pending EF Core migrations. Runs on every startup (idempotent) and is
    // also the path used by the `--migrate-only` CI/CD step below.
    using (var scope = app.Services.CreateScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        await db.Database.MigrateAsync();
    }

    // `--migrate-only`: apply migrations then exit 0 WITHOUT starting the web
    // server or seeding. Used by infra/scripts/migrate-db.sh to run migrations
    // safely (with a pre-migration backup) before traffic is switched during the
    // blue-green deploy. The `finally` below still flushes logs.
    if (args.Contains("--migrate-only"))
    {
        Log.Information(
            "Migrations applied successfully (--migrate-only). Exiting without starting the server."
        );
        return;
    }

    // Seed initial data (roles, mentors, etc.)
    await DatabaseSeeder.SeedAllAsync(app.Services);

    Log.Information("Docs: http://localhost:5296/scalar/v1");
    Log.Information("Hangfire Dashboard: http://localhost:5296/hangfire");
    Log.Information("Application started successfully.");

    app.Run();
}
catch (Exception)
{
    Log.Logger.Fatal("The application failed to start correctly.");
    throw;
}
finally
{
    Log.CloseAndFlush();
}
