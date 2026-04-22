using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class SystemSettingConfiguration : IEntityTypeConfiguration<SystemSetting>
{
    public void Configure(EntityTypeBuilder<SystemSetting> builder)
    {
        builder.ToTable("system_settings");

        // Key is the primary key (string, not Guid)
        builder.HasKey(ss => ss.Key);

        builder.Property(ss => ss.Key).IsRequired().HasMaxLength(200);

        builder.Property(ss => ss.Value).IsRequired();

        builder.Property(ss => ss.UpdatedAt).IsRequired();
    }
}
