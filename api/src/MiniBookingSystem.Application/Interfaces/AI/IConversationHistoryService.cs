public interface IConversationHistoryService
{
    Task<(List<ChatMessage> History, string ConversationId)> GetOrCreateAsync(
        Guid userId,
        string? conversationId,
        CancellationToken ct = default
    );

    Task AppendAsync(
        Guid userId,
        string conversationId,
        string userMessage,
        string aiResponse,
        CancellationToken ct = default
    );
}
