using Microsoft.EntityFrameworkCore;

public class MentorSkillRepository : GenericRepository<MentorSkill>, IMentorSkillRepository
{
    private readonly ApplicationDbContext _dbContext;

    public MentorSkillRepository(ApplicationDbContext context)
        : base(context)
    {
        _dbContext = context;
    }

    public async Task<bool> MentorHasSkillAsync(
        Guid mentorId,
        string skillName,
        CancellationToken cancellationToken = default
    )
    {
        return await _dbContext.MentorSkills.AnyAsync(
            ms => ms.MentorId == mentorId && EF.Functions.ILike(ms.SkillName, skillName),
            cancellationToken
        );
    }
}
