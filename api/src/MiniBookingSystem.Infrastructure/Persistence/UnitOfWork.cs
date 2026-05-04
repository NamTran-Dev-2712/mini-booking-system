// Infrastructure/Persistence/UnitOfWork.cs
using Microsoft.AspNetCore.Identity;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;

    public UnitOfWork(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    // repositories
    private IUserRepository? _userRepository;
    private IMentorRepository? _mentorRepository;
    private IMentorSkillRepository? _mentorSkillRepository;
    private IMentorSlotRepository? _mentorSlotRepository;

    // lazy loading of repositories
    public IUserRepository User => _userRepository ??= new UserRepository(_userManager);
    public IMentorRepository Mentor => _mentorRepository ??= new MentorRepository(_context);
    public IMentorSkillRepository MentorSkill =>
        _mentorSkillRepository ??= new MentorSkillRepository(_context);
    public IMentorSlotRepository MentorSlot =>
        _mentorSlotRepository ??= new MentorSlotRepository(_context);

    public IGenericRepository<T> Repository<T>()
        where T : class
    {
        return new GenericRepository<T>(_context);
    }

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task BeginTransactionAsync(CancellationToken cancellationToken = default)
    {
        await _context.Database.BeginTransactionAsync(cancellationToken);
    }

    public async Task CommitTransactionAsync(CancellationToken cancellationToken = default)
    {
        await _context.Database.CommitTransactionAsync(cancellationToken);
    }

    public async Task RollbackTransactionAsync(CancellationToken cancellationToken = default)
    {
        await _context.Database.RollbackTransactionAsync(cancellationToken);
    }
}
