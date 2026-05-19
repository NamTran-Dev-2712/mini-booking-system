using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

public sealed class RefreshTokenCleanupJob : BackgroundService
{
    // private static readonly TimeSpan Interval = TimeSpan.FromHours(1);
    private static readonly TimeSpan Interval = TimeSpan.FromMinutes(1);
    private static readonly TimeSpan RetentionPeriod = TimeSpan.FromDays(7);

    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<RefreshTokenCleanupJob> _logger;

    public RefreshTokenCleanupJob(
        IServiceProvider serviceProvider,
        ILogger<RefreshTokenCleanupJob> logger
    )
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Refresh Token Cleanup Job started. Interval: {Interval}", Interval);

        using var timer = new PeriodicTimer(Interval);

        while (await timer.WaitForNextTickAsync(stoppingToken))
        {
            try
            {
                await CleanupExpiredTokensAsync(stoppingToken);
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
            {
                break;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred during refresh token cleanup.");
            }
        }
    }

    private async Task CleanupExpiredTokensAsync(CancellationToken cancellationToken)
    {
        using var scope = _serviceProvider.CreateScope();
        var refreshTokenRepository =
            scope.ServiceProvider.GetRequiredService<IRefreshTokenRepository>();

        var cutoff = DateTime.UtcNow.Subtract(RetentionPeriod);
        var deletedCount = await refreshTokenRepository.DeleteExpiredAndRevokedAsync(
            cutoff,
            cancellationToken
        );

        if (deletedCount > 0)
        {
            _logger.LogInformation(
                "Refresh Token Cleanup: deleted {Count} expired/revoked tokens older than {Cutoff:u}",
                deletedCount,
                cutoff
            );
        }
    }
}
