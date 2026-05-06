using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

public class ExpiredBookingCleanupJob : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<ExpiredBookingCleanupJob> _logger;

    public ExpiredBookingCleanupJob(
        IServiceProvider serviceProvider,
        ILogger<ExpiredBookingCleanupJob> logger
    )
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Expired Booking Cleanup Job is starting.");

        // PeriodicTimer optimizes the delay and cancellation handling for periodic tasks
        using var timer = new PeriodicTimer(TimeSpan.FromMinutes(1));

        while (await timer.WaitForNextTickAsync(stoppingToken))
        {
            try
            {
                await ProcessExpiredBookingsAsync(stoppingToken);
            }
            catch (Exception ex)
            {
                // ensure that exceptions are logged but do not crash the service
                _logger.LogError(ex, "Error occurred executing Expired Booking Cleanup Job.");
            }
        }
    }

    private async Task ProcessExpiredBookingsAsync(CancellationToken cancellationToken)
    {
        // Create a new scope to get scoped services like IUnitOfWork and ICacheService
        using var scope = _serviceProvider.CreateScope();
        var unitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();
        var cacheService = scope.ServiceProvider.GetRequiredService<ICacheService>();

        await unitOfWork.BeginTransactionAsync(cancellationToken);

        try
        {
            // 1. get list of expired pending bookings that need to be processed
            var expiredBookings = await unitOfWork.Booking.GetExpiredPendingBookingsAsync(
                DateTime.UtcNow,
                cancellationToken
            );

            if (!expiredBookings.Any())
            {
                await unitOfWork.RollbackTransactionAsync(cancellationToken);
                return;
            }

            var affectedMentorIds = new HashSet<Guid>();

            // 2. For each expired booking, update status to Expired and release the slot (Refund Slot)
            foreach (var booking in expiredBookings)
            {
                // Update Booking status to Expired
                booking.Status = BookingStatus.Expired;
                await unitOfWork.Booking.UpdateAsync(booking, cancellationToken);

                // Get the corresponding MentorSlot to refundthe slot
                var mentorSlot = await unitOfWork.MentorSlot.GetSlotByIdForUpdateAsync(
                    booking.MentorSlotId
                );

                if (mentorSlot != null)
                {
                    // Refund the slot by decreasing CurrentBookings and if it was FullyBooked, change back to Available
                    mentorSlot.CurrentBookings = Math.Max(0, mentorSlot.CurrentBookings - 1);

                    // Only change status back to Available if it was FullyBooked and now has room
                    if (
                        mentorSlot.Status == MentorSlotStatus.FullyBooked
                        && mentorSlot.CurrentBookings < mentorSlot.MaxBookings
                    )
                    {
                        mentorSlot.Status = MentorSlotStatus.Available;
                    }

                    await unitOfWork.MentorSlot.UpdateSlotAsync(mentorSlot, cancellationToken);
                    affectedMentorIds.Add(mentorSlot.MentorId);
                }
            }

            // 3. Commit all changes in a single transaction
            await unitOfWork.SaveChangesAsync(cancellationToken);
            await unitOfWork.CommitTransactionAsync(cancellationToken);

            _logger.LogInformation(
                "Successfully expired {Count} bookings and released slots.",
                expiredBookings.Count
            );

            // 4. Invalidate cache for affected mentors to reflect updated slot availability/status
            foreach (var mentorId in affectedMentorIds)
            {
                await cacheService.RemoveAsync(CacheKeys.MentorDetail(mentorId), cancellationToken);
            }
        }
        catch (Exception)
        {
            await unitOfWork.RollbackTransactionAsync(cancellationToken);
            throw;
        }
    }
}
