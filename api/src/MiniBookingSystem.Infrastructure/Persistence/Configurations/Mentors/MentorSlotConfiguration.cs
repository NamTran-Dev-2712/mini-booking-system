using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class MentorSlotConfiguration : IEntityTypeConfiguration<MentorSlot>
{
    public void Configure(EntityTypeBuilder<MentorSlot> builder)
    {
        builder.ToTable("mentor_slots");

        builder.HasKey(ms => ms.Id);

        builder.Property(ms => ms.Name).IsRequired().HasMaxLength(200);

        builder.Property(ms => ms.StartTime).IsRequired();

        builder.Property(ms => ms.EndTime).IsRequired();

        builder.Property(ms => ms.Status).IsRequired();

        builder.Property(ms => ms.Price).IsRequired().HasColumnType("decimal(18,2)");

        builder.Property(ms => ms.Description).HasMaxLength(1000);
        builder.Property(ms => ms.Location).HasMaxLength(500);
        builder.Property(ms => ms.MaxBookings).IsRequired();
        builder.Property(ms => ms.CurrentBookings).HasDefaultValue(0);

        builder
            .HasOne(ms => ms.Mentor)
            .WithMany(m => m.Slots)
            .HasForeignKey(ms => ms.MentorId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasQueryFilter(ms => ms.IsDeleted != true);
    }
}
