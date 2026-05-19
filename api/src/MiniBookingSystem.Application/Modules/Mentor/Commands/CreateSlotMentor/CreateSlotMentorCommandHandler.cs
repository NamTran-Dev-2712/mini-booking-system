using MediatR;

public class CreateSlotMentorCommandHandler : IRequestHandler<CreateSlotMentorCommand, Guid>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICacheService _cacheService;

    public CreateSlotMentorCommandHandler(IUnitOfWork unitOfWork, ICacheService cacheService)
    {
        _unitOfWork = unitOfWork;
        _cacheService = cacheService;
    }

    public async Task<Guid> Handle(
        CreateSlotMentorCommand request,
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
                cancellationToken
            )
        )
            throw new ConflictException(
                "The specified time slot overlaps with an existing slot for this mentor."
            );

        var mentorSlot = new MentorSlot
        {
            Id = Guid.NewGuid(),
            MentorId = request.MentorId,
            Name = request.Name,
            StartTime = request.StartTime,
            EndTime = request.EndTime,
            Price = request.Price,
            Description = request.Description,
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
