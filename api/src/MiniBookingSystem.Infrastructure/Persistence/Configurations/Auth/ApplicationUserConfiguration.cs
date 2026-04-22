using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
{
    public void Configure(EntityTypeBuilder<ApplicationUser> builder)
    {
        // Table is already renamed in ApplicationDbContext.OnModelCreating

        builder.Property(u => u.FullName).IsRequired().HasMaxLength(200);

        builder.Property(u => u.IsActive).IsRequired().HasDefaultValue(true);

        builder.Property(u => u.CreatedAt).IsRequired();

        // One-to-one: ApplicationUser <-> Mentor
        builder
            .HasOne(u => u.MentorProfile)
            .WithOne()
            .HasForeignKey<Mentor>(m => m.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        // One-to-many: ApplicationUser -> Bookings
        builder
            .HasMany(u => u.Bookings)
            .WithOne()
            .HasForeignKey(b => b.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        // One-to-many: ApplicationUser -> RefreshTokens
        builder
            .HasMany(u => u.RefreshTokens)
            .WithOne()
            .HasForeignKey(rt => rt.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
