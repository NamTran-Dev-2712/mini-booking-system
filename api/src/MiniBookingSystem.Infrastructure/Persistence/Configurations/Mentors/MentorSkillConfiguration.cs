using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class MentorSkillConfiguration : IEntityTypeConfiguration<MentorSkill>
{
    public void Configure(EntityTypeBuilder<MentorSkill> builder)
    {
        builder.ToTable("mentor_skills");

        builder.HasKey(ms => ms.Id);

        builder.Property(ms => ms.SkillName).IsRequired().HasMaxLength(100);

        builder
            .HasOne(ms => ms.Mentor)
            .WithMany(m => m.Skills)
            .HasForeignKey(ms => ms.MentorId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasQueryFilter(ms => ms.IsDeleted != true);
    }
}
