using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class PaymentWebhookLogConfiguration : IEntityTypeConfiguration<PaymentWebhookLog>
{
    public void Configure(EntityTypeBuilder<PaymentWebhookLog> builder)
    {
        builder.ToTable("payment_webhook_logs");

        builder.HasKey(wl => wl.Id);

        builder.Property(wl => wl.Provider).IsRequired().HasMaxLength(50);

        builder.Property(wl => wl.EventType).IsRequired().HasMaxLength(100);

        builder.Property(wl => wl.Payload).IsRequired();

        builder.Property(wl => wl.ReceivedAt).IsRequired();

        builder.Property(wl => wl.Status).IsRequired();

        builder.HasQueryFilter(wl => wl.IsDeleted != true);
    }
}
