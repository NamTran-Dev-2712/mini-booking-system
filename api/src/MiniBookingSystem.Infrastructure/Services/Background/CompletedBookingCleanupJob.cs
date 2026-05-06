using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

public class CompletedBookingJob : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<CompletedBookingJob> _logger;

    public CompletedBookingJob(
        IServiceProvider serviceProvider,
        ILogger<CompletedBookingJob> logger
    )
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Completed Booking Job is starting.");

        // Run every 5 minutes to balance between timely completion and system load
        using var timer = new PeriodicTimer(TimeSpan.FromMinutes(5));

        while (await timer.WaitForNextTickAsync(stoppingToken))
        {
            try
            {
                await ProcessCompletedSlotsAndBookingsAsync(stoppingToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred executing Completed Booking Job.");
            }
        }
    }

    private async Task ProcessCompletedSlotsAndBookingsAsync(CancellationToken cancellationToken)
    {
        using var scope = _serviceProvider.CreateScope();
        var unitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();

        await unitOfWork.BeginTransactionAsync(cancellationToken);

        try
        {
            // 1. Get all past slots that are not yet marked as Completed and have bookings
            var pastSlots = await unitOfWork.MentorSlot.GetPastUncompletedSlotsWithBookingsAsync(
                DateTime.UtcNow,
                cancellationToken
            );

            if (!pastSlots.Any())
            {
                await unitOfWork.RollbackTransactionAsync(cancellationToken);
                return;
            }

            int completedBookingsCount = 0;

            // 2. For each slot, update its status to Completed and also update all related Confirmed bookings to Completed
            foreach (var slot in pastSlots)
            {
                // Update MentorSlot status to Completed
                slot.Status = MentorSlotStatus.Completed;
                await unitOfWork.MentorSlot.UpdateSlotAsync(slot, cancellationToken);

                // Filter out bookings that are in the Confirmed (Paid) status to mark as completed
                var confirmedBookings = slot
                    .Bookings.Where(b => b.Status == BookingStatus.Confirmed)
                    .ToList();

                foreach (var booking in confirmedBookings)
                {
                    booking.Status = BookingStatus.Completed;
                    await unitOfWork.Booking.UpdateAsync(booking, cancellationToken);

                    completedBookingsCount++;

                    // TODO: Add domain event for booking completion if needed, e.g. booking.AddDomainEvent(new BookingCompletedEvent(booking.Id, slot.MentorId));
                    // booking.AddDomainEvent(new BookingCompletedEvent(booking.Id, slot.MentorId));
                }
            }

            // 3. Commit all changes in a single transaction
            await unitOfWork.SaveChangesAsync(cancellationToken);
            await unitOfWork.CommitTransactionAsync(cancellationToken);

            _logger.LogInformation(
                "Successfully completed {SlotCount} slots and {BookingCount} bookings.",
                pastSlots.Count(),
                completedBookingsCount
            );
        }
        catch (Exception)
        {
            await unitOfWork.RollbackTransactionAsync(cancellationToken);
            throw;
        }
    }
}
