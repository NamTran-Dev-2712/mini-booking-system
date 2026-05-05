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
            Valid.AvatarUrl
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
        MentorSlotStatus status = MentorSlotStatus.Available,
        DateTime? startTime = null,
        DateTime? endTime = null
    )
    {
        var start = startTime ?? DateTime.UtcNow.AddDays(1);
        return new MentorSlot
        {
            Id = id ?? Valid.SlotId,
            MentorId = mentorId ?? Valid.MentorId,
            StartTime = start,
            EndTime = endTime ?? start.AddHours(1),
            Price = Valid.BasePrice,
            Status = status,
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
            Password: Valid.Password,
            PhoneNumber: Valid.PhoneNumber,
            DisplayName: displayName,
            Bio: Valid.Bio,
            Specialization: Valid.Specialization,
            ExperienceYears: experienceYears ?? Valid.ExperienceYears,
            BasePrice: basePrice ?? Valid.BasePrice,
            AvatarUrl: Valid.AvatarUrl
        );

    public static AddSkillMentorCommand BuildAddSkillCommand(
        Guid? mentorId = null,
        string? skillName = null
    ) => new(MentorId: mentorId ?? Valid.MentorId, SkillName: skillName ?? Valid.SkillName);

    public static CreateSlotMentorCommand BuildCreateSlotCommand(
        Guid? mentorId = null,
        DateTime? start = null,
        DateTime? end = null,
        decimal? price = null
    )
    {
        var s = start ?? DateTime.UtcNow.AddDays(1);
        var e = end ?? s.AddHours(1);
        return new(
            MentorId: mentorId ?? Valid.MentorId,
            StartTime: s,
            EndTime: e,
            Price: price ?? Valid.BasePrice
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
            AvatarUrl: "https://example.com/new-avatar.png"
        );

    public static UpdateSlotMentorCommand BuildUpdateSlotCommand(
        Guid? slotId = null,
        Guid? mentorId = null
    )
    {
        var start = DateTime.UtcNow.AddDays(2);
        return new(
            Id: slotId ?? Valid.SlotId,
            MentorId: mentorId ?? Valid.MentorId,
            StartTime: start,
            EndTime: start.AddHours(2),
            Price: 700_000m
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
            Skills = [new MentorSkillDTO { Id = Valid.SkillId, SkillName = Valid.SkillName }],
            Slots =
            [
                new MentorSlotDTO
                {
                    Id = Valid.SlotId,
                    StartTime = DateTime.UtcNow.AddDays(1),
                    EndTime = DateTime.UtcNow.AddDays(1).AddHours(1),
                    Status = MentorSlotStatus.Available,
                    Price = Valid.BasePrice,
                },
            ],
        };
}
