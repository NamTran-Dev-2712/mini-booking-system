using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class PaymentTransactionConfiguration : IEntityTypeConfiguration<PaymentTransaction>
{
    public void Configure(EntityTypeBuilder<PaymentTransaction> builder)
    {
        builder.ToTable("payment_transactions");

        builder.HasKey(pt => pt.Id);

        builder.Property(pt => pt.Provider).IsRequired();

        builder.Property(pt => pt.ProviderOrderCode).IsRequired().HasMaxLength(100);

        builder.Property(pt => pt.Amount).IsRequired().HasColumnType("decimal(18,2)");

        builder.Property(pt => pt.Currency).IsRequired().HasMaxLength(10).HasDefaultValue("VND");

        builder.Property(pt => pt.Status).IsRequired();

        builder
            .HasOne(pt => pt.Booking)
            .WithMany(b => b.PaymentTransactions)
            .HasForeignKey(pt => pt.BookingId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasQueryFilter(pt => pt.IsDeleted != true);
    }
}
