using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class MentorConfiguration : IEntityTypeConfiguration<Mentor>
{
    public void Configure(EntityTypeBuilder<Mentor> builder)
    {
        builder.ToTable("mentors");

        builder.HasKey(m => m.Id);

        builder.HasIndex(m => m.UserId).IsUnique();

        builder.Property(m => m.DisplayName).IsRequired().HasMaxLength(200);

        builder.Property(m => m.Email).IsRequired().HasMaxLength(256);

        builder.HasIndex(m => m.Email).IsUnique();

        builder.Property(m => m.ExperienceYears).IsRequired();

        builder.Property(m => m.BasePrice).IsRequired().HasColumnType("decimal(18,2)");

        builder.Property(m => m.IsActive).IsRequired().HasDefaultValue(true);

        // Social links (optional)
        builder.Property(m => m.FacebookUrl).HasMaxLength(500);
        builder.Property(m => m.GithubUrl).HasMaxLength(500);
        builder.Property(m => m.LinkedInUrl).HasMaxLength(500);
        builder.Property(m => m.TelegramUrl).HasMaxLength(500);
        builder.Property(m => m.WebsiteUrl).HasMaxLength(500);

        // Quan hệ Mentor → ApplicationUser (1:1).
        // Mentor ở Domain không thể reference ApplicationUser ở Infrastructure,
        // nên dùng HasOne<ApplicationUser>() (generic, không cần CLR nav property trên Mentor).
        // EF biết FK là Mentor.UserId và nav ngược là ApplicationUser.MentorProfile.
        builder
            .HasOne<ApplicationUser>()
            .WithOne(u => u.MentorProfile)
            .HasForeignKey<Mentor>(m => m.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasQueryFilter(m => m.IsDeleted != true);
    }
}
