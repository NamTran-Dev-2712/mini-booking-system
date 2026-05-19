using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
{
    public void Configure(EntityTypeBuilder<ApplicationUser> builder)
    {
        // Table is already renamed in ApplicationDbContext.OnModelCreating

        builder.Property(u => u.FullName).IsRequired().HasMaxLength(200);

        builder.Property(u => u.IsActive).IsRequired().HasDefaultValue(true);
        builder.Property(u => u.IsDeleted).IsRequired().HasDefaultValue(false);

        builder.Property(u => u.CreatedAt).IsRequired();
        builder.Property(u => u.UpdatedAt);
        builder.Property(u => u.DeletedAt);

        builder.Property(u => u.PhoneNumber).HasMaxLength(15);

        builder
            .HasIndex(u => u.PhoneNumber)
            .IsUnique()
            .HasFilter("phone_number IS NOT NULL AND is_deleted = false");

        // Relationships được config tại entity sở hữu FK (dependent side):
        // - Mentor → ApplicationUser  : trong MentorConfiguration
        // - Booking → ApplicationUser : trong BookingConfiguration
        // - RefreshToken → ApplicationUser : trong RefreshTokenConfiguration
    }
}
