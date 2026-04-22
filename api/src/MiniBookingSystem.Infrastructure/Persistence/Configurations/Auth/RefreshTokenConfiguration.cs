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

        builder.Property(rt => rt.ExpiresAt).IsRequired();

        builder.Property(rt => rt.CreatedByIp).HasMaxLength(50);

        builder.Property(rt => rt.RevokedByIp).HasMaxLength(50);

        builder.Property(rt => rt.IsUsed).IsRequired();

        builder.HasQueryFilter(rt => rt.IsDeleted != true);
    }
}
