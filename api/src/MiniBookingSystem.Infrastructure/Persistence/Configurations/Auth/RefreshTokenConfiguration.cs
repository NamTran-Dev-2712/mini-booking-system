using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class RefreshTokenConfiguration : IEntityTypeConfiguration<RefreshToken>
{
    public void Configure(EntityTypeBuilder<RefreshToken> builder)
    {
        builder.ToTable("refresh_tokens");

        builder.HasKey(rt => rt.Id);

        builder.Property(rt => rt.Token).IsRequired();

        builder.HasIndex(rt => rt.Token).IsUnique();

        // Index cho query theo UserId (dùng trong RevokeAllByUser)
        builder.HasIndex(rt => rt.UserId);

        builder.Property(rt => rt.ExpiresAt).IsRequired();

        builder.Property(rt => rt.CreatedByIp).HasMaxLength(50);

        builder.Property(rt => rt.RevokedByIp).HasMaxLength(50);

        builder.Property(rt => rt.IsUsed).IsRequired();

        // Quan hệ RefreshToken → ApplicationUser (many:1).
        // RefreshToken ở Domain không thể reference ApplicationUser, dùng generic type.
        builder
            .HasOne<ApplicationUser>()
            .WithMany(u => u.RefreshTokens)
            .HasForeignKey(rt => rt.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasQueryFilter(rt => rt.IsDeleted != true);
    }
}
