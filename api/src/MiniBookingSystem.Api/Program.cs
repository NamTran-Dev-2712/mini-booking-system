using Scalar.AspNetCore;
using Serilog;

Log.Logger = new LoggerConfiguration().WriteTo.Console().CreateBootstrapLogger();

try
{
    // Start building the application
    Log.Information("Starting the application...");

    var builder = WebApplication.CreateBuilder(args);

    // Configure Serilog
    // builder.Host.UseSerilog((context, services, configuration) => configuration
    //     .ReadFrom.Configuration(context.Configuration)
    //     .ReadFrom.Services(services));

    builder.Services.AddOpenApi();
    builder.Services.AddDataProtection();

    // Add Dependency Injection
    builder.Services.AddPresentation(builder.Configuration);
    builder.Services.AddApplication();
    builder.Services.AddInfrastructure(builder.Configuration);

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

    // app.UseSerilogRequestLogging();

    app.MapHealthChecks("/health");

    app.UseExceptionHandler();

    app.UseHttpsRedirection();

    app.UseCors("DefaultCors");

    app.UseRateLimiter();

    app.UseOutputCache();

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();

    // Seed initial data (roles, mentors, etc.)
    await DatabaseSeeder.SeedAllAsync(app.Services);

    Log.Information("Docs: http://localhost:5296/scalar/v1");
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
