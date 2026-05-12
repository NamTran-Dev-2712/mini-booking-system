using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    public DbSet<Booking> Bookings => Set<Booking>();
    public DbSet<Mentor> Mentors => Set<Mentor>();
    public DbSet<MentorSkill> MentorSkills => Set<MentorSkill>();
    public DbSet<MentorSlot> MentorSlots => Set<MentorSlot>();
    public DbSet<PaymentTransaction> PaymentTransactions => Set<PaymentTransaction>();
    public DbSet<PaymentWebhookLog> PaymentWebhookLogs => Set<PaymentWebhookLog>();
    public DbSet<AiConversationLog> AiConversationLogs => Set<AiConversationLog>();
    public DbSet<SystemSetting> SystemSettings => Set<SystemSetting>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Rename ASP.NET Identity default tables to snake_case
        builder.Entity<ApplicationUser>().ToTable("users");
        builder.Entity<IdentityRole<Guid>>().ToTable("roles");
        builder.Entity<IdentityUserRole<Guid>>().ToTable("user_roles");
        builder.Entity<IdentityUserClaim<Guid>>().ToTable("user_claims");
        builder.Entity<IdentityUserLogin<Guid>>().ToTable("user_logins");
        builder.Entity<IdentityUserToken<Guid>>().ToTable("user_tokens");
        builder.Entity<IdentityRoleClaim<Guid>>().ToTable("role_claims");

        // Apply all IEntityTypeConfiguration<T> found in this assembly
        builder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);

        // Partial unique index: one user can only have one active booking per slot
        // Active = PendingPayment (1) or Confirmed (2)
        builder
            .Entity<Booking>()
            .HasIndex(b => new { b.UserId, b.MentorSlotId })
            .HasFilter(
                $"status IN ({(int)BookingStatus.PendingPayment}, {(int)BookingStatus.Confirmed})"
            )
            .IsUnique()
            .HasDatabaseName("ix_bookings_user_slot_active_unique");

        builder.Entity<PaymentTransaction>().Property(p => p.Provider).HasConversion<int>();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        foreach (var entry in ChangeTracker.Entries<BaseEntity>())
        {
            if (entry.State == EntityState.Added)
            {
                // Ensure CreatedAt is always set to UTC now on insert.
                // Guards against entities whose CreatedAt was left as DateTime.MinValue
                // (e.g. seeded directly into the DB or created without going through code).
                if (entry.Entity.CreatedAt == default)
                    entry.Entity.CreatedAt = DateTime.UtcNow;

                entry.Entity.UpdatedAt = DateTime.UtcNow;
            }

            if (entry.State == EntityState.Modified)
            {
                entry.Entity.MarkUpdated();
            }
        }

        return base.SaveChangesAsync(cancellationToken);
    }
}
