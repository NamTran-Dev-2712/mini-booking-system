using MediatR;

public class UpdateSlotMentorCommandHandler : IRequestHandler<UpdateSlotMentorCommand, Guid>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICacheService _cacheService;
    private readonly ILocalizationService _localizer;

    public UpdateSlotMentorCommandHandler(
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
        UpdateSlotMentorCommand request,
        CancellationToken cancellationToken
    )
    {
        var mentor = await _unitOfWork.Mentor.GetByIdAsync(request.MentorId, cancellationToken);
        if (mentor == null)
            throw new NotFoundException(_localizer.GetMessage("Mentor.NotFound"));

        // A mentor may only manage slots on their own profile; admins bypass this.
        if (!request.RequesterIsAdmin && mentor.UserId != request.RequesterUserId)
            throw new ForbiddenException(_localizer.GetMessage("Mentor.ManageSlotOwn"));

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
            throw new ConflictException(_localizer.GetMessage("Mentor.SlotConflict"));

        var mentorSlot = await _unitOfWork.MentorSlot.GetByIdAsync(request.Id, cancellationToken);
        if (mentorSlot == null)
            throw new NotFoundException(_localizer.GetMessage("Mentor.SlotNotFound"));

        mentorSlot.Name = request.Name;
        mentorSlot.StartTime = request.StartTime;
        mentorSlot.EndTime = request.EndTime;
        mentorSlot.Price = request.Price;
        mentorSlot.Description = request.Description;
        mentorSlot.Location = request.Location;
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
