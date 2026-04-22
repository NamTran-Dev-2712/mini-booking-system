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

        builder.HasQueryFilter(m => m.IsDeleted != true);
    }
}
