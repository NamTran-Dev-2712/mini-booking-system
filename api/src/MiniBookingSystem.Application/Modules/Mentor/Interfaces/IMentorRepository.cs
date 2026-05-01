public interface IMentorRepository : IGenericRepository<Mentor>
{
    Task<Mentor?> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken);
}
