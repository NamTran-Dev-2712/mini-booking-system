using Microsoft.EntityFrameworkCore;

public class MentorRepository : GenericRepository<Mentor>, IMentorRepository
{
    private readonly ApplicationDbContext _dbContext;

    public MentorRepository(ApplicationDbContext context)
        : base(context)
    {
        _dbContext = context;
    }

    public async Task<Mentor?> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken)
    {
        return await _dbContext.Mentors.FirstOrDefaultAsync(
            m => m.UserId == userId,
            cancellationToken
        );
    }
}
