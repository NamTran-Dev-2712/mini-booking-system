using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class PasswordResetTokenConfiguration : IEntityTypeConfiguration<PasswordResetToken>
{
    public void Configure(EntityTypeBuilder<PasswordResetToken> builder)
    {
        builder.ToTable("password_reset_tokens");

        builder.HasKey(t => t.Id);

        builder.Property(t => t.TokenHash).IsRequired().HasMaxLength(128);

        builder.HasIndex(t => t.TokenHash).IsUnique();

        builder.HasIndex(t => t.UserId);

        builder.Property(t => t.OtpCodeHash).IsRequired().HasMaxLength(128);

        builder.Property(t => t.ExpiresAt).IsRequired();

        builder.Property(t => t.Attempts).IsRequired().HasDefaultValue(0);

        builder.Ignore(t => t.IsConsumed);
        builder.Ignore(t => t.IsExpired);

        builder
            .HasOne<ApplicationUser>()
            .WithMany()
            .HasForeignKey(t => t.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
