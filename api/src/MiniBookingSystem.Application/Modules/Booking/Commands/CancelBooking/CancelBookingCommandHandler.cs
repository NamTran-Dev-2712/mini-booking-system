using MediatR;

public class CancelBookingCommandHandler : IRequestHandler<CancelBookingCommand, Guid>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICacheService _cacheService;
    private readonly ILocalizationService _localizer;

    public CancelBookingCommandHandler(
        IUnitOfWork unitOfWork,
        ICacheService cacheService,
        ILocalizationService localizer
    )
    {
        _unitOfWork = unitOfWork;
        _cacheService = cacheService;
        _localizer = localizer;
    }

    public async Task<Guid> Handle(
        CancelBookingCommand request,
        CancellationToken cancellationToken
    )
    {
        await _unitOfWork.BeginTransactionAsync(cancellationToken);

        try
        {
            var booking = await _unitOfWork.Booking.GetByIdAsync(
                request.BookingId,
                cancellationToken
            );
            if (booking == null)
                throw new NotFoundException(_localizer.GetMessage("Booking.NotFound"));

            if (booking.Status == BookingStatus.Cancelled)
                return booking.Id; // Idempotent response for already cancelled bookings

            if (booking.Status == BookingStatus.Completed)
                throw new ConflictException(_localizer.GetMessage("Booking.CompletedCannotCancel"));

            if (booking.Status == BookingStatus.Expired)
                throw new ConflictException(_localizer.GetMessage("Booking.ExpiredCannotCancel"));

            booking.CancelBooking(request.CancellationReason);

            await _unitOfWork.Booking.UpdateAsync(booking, cancellationToken);

            // refund slot if it was previously confirmed (payment completed)
            if (booking.Status == BookingStatus.Confirmed)
            {
                var mentorSlot = await _unitOfWork.MentorSlot.GetByIdAsync(
                    booking.MentorSlotId,
                    cancellationToken
                );
                if (mentorSlot != null)
                {
                    mentorSlot.CurrentBookings = Math.Max(0, mentorSlot.CurrentBookings - 1);
                    await _unitOfWork.MentorSlot.UpdateSlotAsync(mentorSlot, cancellationToken);
                }
            }

            await _unitOfWork.CommitTransactionAsync(cancellationToken);

            // Invalidate booking detail cache so next read reflects the cancelled status
            await _cacheService.RemoveAsync(
                CacheKeys.BookingDetail(request.BookingId),
                cancellationToken
            );

            return booking.Id;
        }
        catch
        {
            await _unitOfWork.RollbackTransactionAsync(cancellationToken);
            throw;
        }
    }
}
