public class AiConversationLog : BaseEntity
{
    public Guid? UserId { get; set; }
    public string Feature { get; set; } = default!;
    public string Prompt { get; set; } = default!;
    public string Response { get; set; } = default!;
    public string ModelName { get; set; } = default!;
}
