using MediatR;

public class CreateBookingCommandHandler : IRequestHandler<CreateBookingCommand, Guid>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICacheService _cacheService;
    private readonly ILocalizationService _localizer;

    public CreateBookingCommandHandler(
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
        CreateBookingCommand request,
        CancellationToken cancellationToken
    )
    {
        // --- Idempotency check ---
        // If client sends an Idempotency-Key header, return the same bookingId on duplicate requests
        if (!string.IsNullOrWhiteSpace(request.IdempotencyKey))
        {
            var idempotencyCacheKey = CacheKeys.Idempotency(
                "booking",
                request.UserId,
                request.IdempotencyKey
            );
            var cached = await _cacheService.GetAsync<Guid>(idempotencyCacheKey, cancellationToken);
            if (cached != Guid.Empty)
            {
                // Validate the cached booking is still active before returning it.
                // If booking expired/cancelled (background job ran), evict the stale key
                // so the user can create a new booking.
                var cachedBooking = await _unitOfWork.Booking.GetByIdAsync(
                    cached,
                    cancellationToken
                );
                if (cachedBooking != null && cachedBooking.Status == BookingStatus.PendingPayment)
                    return cached;

                await _cacheService.RemoveAsync(idempotencyCacheKey, cancellationToken);
            }
        }

        await _unitOfWork.BeginTransactionAsync(cancellationToken);

        try
        {
            // --- Application-level unique check (fast fail with clear error) ---
            var hasActive = await _unitOfWork.Booking.HasActiveBookingAsync(
                request.UserId,
                request.MentorSlotId,
                cancellationToken
            );
            if (hasActive)
                throw new ConflictException(_localizer.GetMessage("Booking.AlreadyBooked"));

            var mentorSlot = await _unitOfWork.MentorSlot.GetSlotByIdForUpdateAsync(
                request.MentorSlotId
            );

            if (
                mentorSlot == null
                || mentorSlot.Status != MentorSlotStatus.Available
                || mentorSlot.CurrentBookings >= mentorSlot.MaxBookings
            )
            {
                throw new InvalidOperationException("This slot is no longer available.");
            }

            var booking = new Booking();
            booking.CreateBooking(request.UserId, mentorSlot);

            mentorSlot.CurrentBookings += 1;
            if (mentorSlot.CurrentBookings >= mentorSlot.MaxBookings)
            {
                mentorSlot.Status = MentorSlotStatus.FullyBooked;
            }

            await _unitOfWork.Booking.AddAsync(booking, cancellationToken);
            await _unitOfWork.MentorSlot.UpdateSlotAsync(mentorSlot, cancellationToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            await _unitOfWork.CommitTransactionAsync(cancellationToken);

            // Invalidate the cached mentor detail (which includes slot availability/status)
            await _cacheService.RemoveAsync(
                CacheKeys.MentorDetail(mentorSlot.MentorId),
                cancellationToken
            );

            // Store idempotency result so duplicate requests return the same bookingId
            if (!string.IsNullOrWhiteSpace(request.IdempotencyKey))
            {
                var idempotencyCacheKey = CacheKeys.Idempotency(
                    "booking",
                    request.UserId,
                    request.IdempotencyKey
                );
                await _cacheService.SetAsync(
                    idempotencyCacheKey,
                    booking.Id,
                    TimeSpan.FromHours(24),
                    cancellationToken
                );
            }

            return booking.Id;
        }
        catch (Exception)
        {
            await _unitOfWork.RollbackTransactionAsync(cancellationToken);
            throw;
        }
    }
}
