using MediatR;

public class UpdateSlotMentorCommandHandler : IRequestHandler<UpdateSlotMentorCommand, Guid>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICacheService _cacheService;

    public UpdateSlotMentorCommandHandler(IUnitOfWork unitOfWork, ICacheService cacheService)
    {
        _unitOfWork = unitOfWork;
        _cacheService = cacheService;
    }

    public async Task<Guid> Handle(
        UpdateSlotMentorCommand request,
        CancellationToken cancellationToken
    )
    {
        var mentor = await _unitOfWork.Mentor.GetByIdAsync(request.MentorId, cancellationToken);
        if (mentor == null)
            throw new NotFoundException($"Mentor", request.MentorId.ToString());

        // Check for overlapping slots
        if (
            await _unitOfWork.MentorSlot.IsSlotOverlappingAsync(
                request.MentorId,
                request.StartTime,
                request.EndTime,
                request.Id,
                cancellationToken
            )
        )
            throw new ConflictException(
                "The specified time slot overlaps with an existing slot for this mentor."
            );

        var mentorSlot = await _unitOfWork.MentorSlot.GetByIdAsync(request.Id, cancellationToken);
        if (mentorSlot == null)
            throw new NotFoundException($"Slot", request.Id.ToString());

        mentorSlot.StartTime = request.StartTime;
        mentorSlot.EndTime = request.EndTime;
        mentorSlot.Price = request.Price;
        mentorSlot.Description = request.Description;
        mentorSlot.MaxBookings = request.MaxBookings;

        await _unitOfWork.MentorSlot.UpdateSlotAsync(mentorSlot, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        // Invalidate the slot cache
        await _cacheService.RemoveAsync(
            CacheKeys.MentorDetail(request.MentorId),
            cancellationToken
        );

        return mentorSlot.Id;
    }
}
