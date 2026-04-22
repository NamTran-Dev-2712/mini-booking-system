using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class AiConversationLogConfiguration : IEntityTypeConfiguration<AiConversationLog>
{
    public void Configure(EntityTypeBuilder<AiConversationLog> builder)
    {
        builder.ToTable("ai_conversation_logs");

        builder.HasKey(l => l.Id);

        builder.Property(l => l.Feature).IsRequired().HasMaxLength(100);

        builder.Property(l => l.Prompt).IsRequired();

        builder.Property(l => l.Response).IsRequired();

        builder.Property(l => l.ModelName).IsRequired().HasMaxLength(100);

        // UserId is nullable — supports anonymous AI interactions; no FK constraint
        builder.Property(l => l.UserId).IsRequired(false);

        builder.HasQueryFilter(l => l.IsDeleted != true);
    }
}
