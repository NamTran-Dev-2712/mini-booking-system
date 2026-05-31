using MediatR;

public class CreateSlotMentorCommandHandler : IRequestHandler<CreateSlotMentorCommand, Guid>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICacheService _cacheService;
    private readonly ILocalizationService _localizer;

    public CreateSlotMentorCommandHandler(
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
        CreateSlotMentorCommand request,
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
                cancellationToken
            )
        )
            throw new ConflictException(_localizer.GetMessage("Mentor.SlotConflict"));

        var mentorSlot = new MentorSlot
        {
            Id = Guid.NewGuid(),
            MentorId = request.MentorId,
            Name = request.Name,
            StartTime = request.StartTime,
            EndTime = request.EndTime,
            Price = request.Price,
            Description = request.Description,
            Location = request.Location,
            MaxBookings = request.MaxBookings,
            Status = MentorSlotStatus.Available,
        };

        await _unitOfWork.MentorSlot.AddAsync(mentorSlot, cancellationToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        // Invalidate the mentor's slot cache
        await _cacheService.RemoveAsync(
            CacheKeys.MentorDetail(request.MentorId),
            cancellationToken
        );

        return mentorSlot.Id;
    }
}
