namespace MiniBookingSystem.UnitTests.Common.Builders;

/// <summary>
/// Centralised factory for Mentor-related test data objects.
/// Single source of truth prevents scattered hard-coded values across Mentor test files.
/// </summary>
internal static class MentorTestData
{
    // ── Canonical valid values ─────────────────────────────────────────────
    public static class Valid
    {
        public static readonly Guid MentorId = new("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa");
        public static readonly Guid UserId = new("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb");
        public static readonly Guid SlotId = new("cccccccc-cccc-cccc-cccc-cccccccccccc");
        public static readonly Guid SkillId = new("dddddddd-dddd-dddd-dddd-dddddddddddd");

        public const string FullName = "Nguyễn Văn Minh";
        public const string Email = "mentor@example.com";
        public const string Password = "P@ssw0rd!";
        public const string PhoneNumber = "0912345678";
        public const string DisplayName = "Mentor Minh";
        public const string Bio = "Experienced software engineer";
        public const string Specialization = "Software Development";
        public const int ExperienceYears = 5;
        public const decimal BasePrice = 500_000m;
        public const string AvatarUrl = "https://example.com/avatar.png";
        public const string SkillName = "C#";

        public const string FacebookUrl = "https://facebook.com/mentor.minh";
        public const string GithubUrl = "https://github.com/mentorminh";
        public const string LinkedInUrl = "https://linkedin.com/in/mentorminh";
        public const string TelegramUrl = "https://t.me/mentorminh";
        public const string WebsiteUrl = "https://mentorminh.dev";

        public const string SlotLocation = "Room 202, Building A, FPT University";
    }

    // ── Entity builders ────────────────────────────────────────────────────

    public static Mentor BuildMentor(
        Guid? id = null,
        Guid? userId = null,
        string? email = null,
        string? displayName = null,
        string? specialization = null,
        decimal? basePrice = null,
        int? experienceYears = null,
        bool isActive = true
    )
    {
        var mentor = new Mentor();
        mentor.Initialize(
            userId ?? Valid.UserId,
            displayName ?? Valid.DisplayName,
            email ?? Valid.Email,
            Valid.Bio,
            specialization ?? Valid.Specialization,
            experienceYears ?? Valid.ExperienceYears,
            basePrice ?? Valid.BasePrice,
            Valid.AvatarUrl,
            Valid.FacebookUrl,
            Valid.GithubUrl,
            Valid.LinkedInUrl,
            Valid.TelegramUrl,
            Valid.WebsiteUrl
        );
        mentor.Id = id ?? Valid.MentorId;
        mentor.IsActive = isActive;
        return mentor;
    }

    public static MentorSkill BuildMentorSkill(
        Guid? id = null,
        Guid? mentorId = null,
        string? skillName = null
    ) =>
        new()
        {
            Id = id ?? Valid.SkillId,
            MentorId = mentorId ?? Valid.MentorId,
            SkillName = skillName ?? Valid.SkillName,
        };

    public static MentorSlot BuildMentorSlot(
        Guid? id = null,
        Guid? mentorId = null,
        string? name = null,
        MentorSlotStatus status = MentorSlotStatus.Available,
        DateTime? startTime = null,
        DateTime? endTime = null,
        int maxBookings = 5,
        int currentBookings = 0,
        string? location = null
    )
    {
        var start = startTime ?? DateTime.UtcNow.AddDays(1);
        return new MentorSlot
        {
            Id = id ?? Valid.SlotId,
            MentorId = mentorId ?? Valid.MentorId,
            Name = name ?? "Test Slot",
            StartTime = start,
            EndTime = endTime ?? start.AddHours(1),
            Price = Valid.BasePrice,
            Status = status,
            Location = location ?? Valid.SlotLocation,
            MaxBookings = maxBookings,
            CurrentBookings = currentBookings,
        };
    }

    // ── Command builders ───────────────────────────────────────────────────

    public static CreateMentorCommand BuildCreateMentorCommand(
        string? displayName = null,
        int? experienceYears = null,
        decimal? basePrice = null
    ) =>
        new(
            FullName: Valid.FullName,
            Email: Valid.Email,
            PhoneNumber: Valid.PhoneNumber,
            DisplayName: displayName,
            Bio: Valid.Bio,
            Specialization: Valid.Specialization,
            ExperienceYears: experienceYears ?? Valid.ExperienceYears,
            BasePrice: basePrice ?? Valid.BasePrice,
            AvatarUrl: Valid.AvatarUrl,
            FacebookUrl: Valid.FacebookUrl,
            GithubUrl: Valid.GithubUrl,
            LinkedInUrl: Valid.LinkedInUrl,
            TelegramUrl: Valid.TelegramUrl,
            WebsiteUrl: Valid.WebsiteUrl
        );

    public static AddSkillMentorCommand BuildAddSkillCommand(
        Guid? mentorId = null,
        string? skillName = null,
        Guid? requesterUserId = null,
        bool requesterIsAdmin = false
    ) =>
        new(
            MentorId: mentorId ?? Valid.MentorId,
            SkillName: skillName ?? Valid.SkillName,
            // Defaults to the owning user so existing happy-path tests pass ownership.
            RequesterUserId: requesterUserId ?? Valid.UserId,
            RequesterIsAdmin: requesterIsAdmin
        );

    public static RemoveSkillMentorCommand BuildRemoveSkillCommand(
        Guid? mentorId = null,
        Guid? skillId = null,
        Guid? requesterUserId = null,
        bool requesterIsAdmin = false
    ) =>
        new(
            MentorId: mentorId ?? Valid.MentorId,
            SkillId: skillId ?? Valid.SkillId,
            RequesterUserId: requesterUserId ?? Valid.UserId,
            RequesterIsAdmin: requesterIsAdmin
        );

    public static CreateSlotMentorCommand BuildCreateSlotCommand(
        Guid? mentorId = null,
        string? name = null,
        DateTime? start = null,
        DateTime? end = null,
        decimal? price = null,
        string? description = null,
        int maxBookings = 1,
        string? location = null,
        Guid? requesterUserId = null,
        bool requesterIsAdmin = false
    )
    {
        var s = start ?? DateTime.UtcNow.AddDays(1);
        var e = end ?? s.AddHours(1);
        return new(
            MentorId: mentorId ?? Valid.MentorId,
            Name: name ?? "Test Slot",
            StartTime: s,
            EndTime: e,
            Description: description,
            MaxBookings: maxBookings,
            Price: price ?? Valid.BasePrice,
            Location: location ?? Valid.SlotLocation,
            // Defaults to the owning user so existing happy-path tests pass ownership.
            RequesterUserId: requesterUserId ?? Valid.UserId,
            RequesterIsAdmin: requesterIsAdmin
        );
    }

    public static UpdateMentorCommand BuildUpdateMentorCommand(Guid? id = null) =>
        new(
            Id: id ?? Valid.MentorId,
            FullName: "Nguyễn Văn Cường",
            PhoneNumber: "0987654321",
            DisplayName: "Updated Display Name",
            Bio: "Updated Bio",
            Specialization: "Updated Specialization",
            ExperienceYears: 6,
            BasePrice: 600_000m,
            AvatarUrl: "https://example.com/new-avatar.png",
            FacebookUrl: Valid.FacebookUrl,
            GithubUrl: Valid.GithubUrl,
            LinkedInUrl: Valid.LinkedInUrl,
            TelegramUrl: Valid.TelegramUrl,
            WebsiteUrl: Valid.WebsiteUrl
        );

    public static UpdateSlotMentorCommand BuildUpdateSlotCommand(
        Guid? slotId = null,
        Guid? mentorId = null,
        string? name = null,
        string? description = null,
        int maxBookings = 1,
        string? location = null,
        Guid? requesterUserId = null,
        bool requesterIsAdmin = false
    )
    {
        var start = DateTime.UtcNow.AddDays(2);
        return new(
            Id: slotId ?? Valid.SlotId,
            MentorId: mentorId ?? Valid.MentorId,
            Name: name ?? "Updated Slot",
            StartTime: start,
            EndTime: start.AddHours(2),
            Price: 700_000m,
            Description: description,
            MaxBookings: maxBookings,
            Location: location ?? Valid.SlotLocation,
            // Defaults to the owning user so existing happy-path tests pass ownership.
            RequesterUserId: requesterUserId ?? Valid.UserId,
            RequesterIsAdmin: requesterIsAdmin
        );
    }

    // ── DTO builders ───────────────────────────────────────────────────────

    public static MentorDetailDTO BuildMentorDetailDto(Guid? mentorId = null) =>
        new()
        {
            Id = mentorId ?? Valid.MentorId,
            UserId = Valid.UserId,
            DisplayName = Valid.DisplayName,
            Email = Valid.Email,
            Bio = Valid.Bio,
            FacebookUrl = Valid.FacebookUrl,
            GithubUrl = Valid.GithubUrl,
            LinkedInUrl = Valid.LinkedInUrl,
            TelegramUrl = Valid.TelegramUrl,
            WebsiteUrl = Valid.WebsiteUrl,
            Skills = [new MentorSkillDTO { Id = Valid.SkillId, SkillName = Valid.SkillName }],
            Slots =
            [
                new MentorSlotDTO
                {
                    Id = Valid.SlotId,
                    Name = "Test Slot",
                    StartTime = DateTime.UtcNow.AddDays(1),
                    EndTime = DateTime.UtcNow.AddDays(1).AddHours(1),
                    Status = MentorSlotStatus.Available,
                    Price = Valid.BasePrice,
                    Location = Valid.SlotLocation,
                },
            ],
        };
}
