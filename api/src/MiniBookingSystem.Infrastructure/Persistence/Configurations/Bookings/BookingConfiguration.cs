using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class BookingConfiguration : IEntityTypeConfiguration<Booking>
{
    public void Configure(EntityTypeBuilder<Booking> builder)
    {
        builder.ToTable("bookings");

        builder.HasKey(b => b.Id);

        builder.Property(b => b.BookingCode).IsRequired().HasMaxLength(50);

        builder.HasIndex(b => b.BookingCode).IsUnique();

        builder.Property(b => b.Status).IsRequired();

        builder.Property(b => b.BookedAt).IsRequired();

        // Relationship to MentorSlot (configured on this side to avoid duplication)
        builder
            .HasOne(b => b.MentorSlot)
            .WithMany(ms => ms.Bookings)
            .HasForeignKey(b => b.MentorSlotId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasQueryFilter(b => b.IsDeleted != true);
    }
}
