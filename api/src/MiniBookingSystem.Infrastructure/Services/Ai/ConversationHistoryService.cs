public sealed class ConversationHistoryService : IConversationHistoryService
{
    private readonly ICacheService _cacheService;

    public ConversationHistoryService(ICacheService cacheService)
    {
        _cacheService = cacheService;
    }

    public async Task<(List<ChatMessage> History, string ConversationId)> GetOrCreateAsync(
        Guid userId,
        string? conversationId,
        CancellationToken ct = default
    )
    {
        var convId = string.IsNullOrWhiteSpace(conversationId)
            ? Guid.NewGuid().ToString("N")
            : conversationId;

        var key = CacheKeys.AiConversation(userId, convId);
        var history = await _cacheService.GetAsync<List<ChatMessage>>(key, ct);

        return (history ?? [], convId);
    }

    public async Task AppendAsync(
        Guid userId,
        string conversationId,
        string userMessage,
        string aiResponse,
        CancellationToken ct = default
    )
    {
        var key = CacheKeys.AiConversation(userId, conversationId);
        var history = await _cacheService.GetAsync<List<ChatMessage>>(key, ct) ?? [];

        history.Add(new ChatMessage("user", userMessage));
        history.Add(new ChatMessage("assistant", aiResponse));

        // Keep only the most recent turns to stay within token budget
        var maxMessages = AiConstants.MaxHistoryTurns * 2;
        if (history.Count > maxMessages)
            history = history.TakeLast(maxMessages).ToList();

        await _cacheService.SetAsync(
            key,
            history,
            TimeSpan.FromMinutes(AiConstants.ConversationTtlMinutes),
            ct
        );
    }
}
