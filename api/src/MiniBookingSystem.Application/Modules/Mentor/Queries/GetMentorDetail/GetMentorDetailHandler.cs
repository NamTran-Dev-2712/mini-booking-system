using MediatR;

public class GetMentorDetailHandler : IRequestHandler<GetMentorDetailQuery, MentorDetailDTO>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICacheService _cacheService;
    private readonly IIdentityService _identityService;
    private readonly ILocalizationService _localizer;

    public GetMentorDetailHandler(
        IUnitOfWork unitOfWork,
        ICacheService cacheService,
        IIdentityService identityService,
        ILocalizationService localizer
    )
    {
        _unitOfWork = unitOfWork;
        _cacheService = cacheService;
        _identityService = identityService;
        _localizer = localizer;
    }

    public async Task<MentorDetailDTO> Handle(
        GetMentorDetailQuery request,
        CancellationToken cancellationToken
    )
    {
        var key = CacheKeys.MentorDetail(request.MentorId);
        var cached = await _cacheService.GetAsync<MentorDetailDTO>(key);
        if (cached != null)
            return cached;

        var mentor = await _unitOfWork.Mentor.GetByIdAsync(request.MentorId, cancellationToken);
        if (mentor == null)
            throw new NotFoundException(_localizer.GetMessage("Mentor.NotFound"));

        // Fetch the linked user profile to get PhoneNumber.
        // IIdentityService.GetProfileAsync reads from ASP.NET Identity (ApplicationUser),
        // which is the authoritative source for phone number.
        var userProfile = await _identityService.GetProfileAsync(mentor.UserId, cancellationToken);

        var mentorSkills = await _unitOfWork.MentorSkill.GetAllAsync(ms =>
            ms.MentorId == request.MentorId
        );

        var mentorSlots = await _unitOfWork.MentorSlot.GetAllAsync(ms =>
            ms.MentorId == request.MentorId
        );

        var mentorDetail = new MentorDetailDTO
        {
            Id = mentor.Id,
            UserId = mentor.UserId,
            DisplayName = mentor.DisplayName,
            Email = mentor.Email,
            PhoneNumber = userProfile.PhoneNumber,
            Bio = mentor.Bio,
            Specialization = mentor.Specialization,
            ExperienceYears = mentor.ExperienceYears,
            BasePrice = mentor.BasePrice,
            AvatarUrl = mentor.AvatarUrl,
            IsActive = mentor.IsActive,
            FacebookUrl = mentor.FacebookUrl,
            GithubUrl = mentor.GithubUrl,
            LinkedInUrl = mentor.LinkedInUrl,
            TelegramUrl = mentor.TelegramUrl,
            WebsiteUrl = mentor.WebsiteUrl,
            // Guard against legacy rows that have DateTime.MinValue (0001-01-01) stored in DB.
            CreatedAt = mentor.CreatedAt == default ? DateTime.UtcNow : mentor.CreatedAt,
            Skills = mentorSkills
                .Select(ms => new MentorSkillDTO { Id = ms.Id, SkillName = ms.SkillName })
                .ToList(),
            Slots = mentorSlots
                .Select(ms => new MentorSlotDTO
                {
                    Id = ms.Id,
                    Name = ms.Name,
                    StartTime = ms.StartTime,
                    EndTime = ms.EndTime,
                    Status = ms.Status,
                    Price = ms.Price,
                    Location = ms.Location,
                    MaxBookings = ms.MaxBookings,
                    CurrentBookings = ms.CurrentBookings,
                })
                .ToList(),
        };

        await _cacheService.SetAsync(key, mentorDetail, TimeSpan.FromMinutes(10));

        return mentorDetail;
    }
}
