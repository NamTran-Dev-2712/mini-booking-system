public interface IMentorSkillRepository : IGenericRepository<MentorSkill>
{
    Task<bool> MentorHasSkillAsync(
        Guid mentorId,
        string skillName,
        CancellationToken cancellationToken = default
    );
}
