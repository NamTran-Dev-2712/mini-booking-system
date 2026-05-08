public interface IMiniMaxService
{
    Task<string> ChatAsync(
        string systemPrompt,
        IReadOnlyList<ChatMessage> history,
        CancellationToken ct = default
    );
}
