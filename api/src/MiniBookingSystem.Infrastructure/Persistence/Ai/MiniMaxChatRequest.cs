using System.Text.Json.Serialization;

public sealed class MiniMaxChatRequest
{
    [JsonPropertyName("model")]
    public string Model { get; init; } = default!;

    [JsonPropertyName("messages")]
    public IReadOnlyList<MiniMaxMessage> Messages { get; init; } = [];

    [JsonPropertyName("max_tokens")]
    public int MaxTokens { get; init; }

    [JsonPropertyName("temperature")]
    public double Temperature { get; init; } = 0.7;
}

public sealed class MiniMaxMessage
{
    [JsonPropertyName("role")]
    public string Role { get; init; } = default!;

    [JsonPropertyName("content")]
    public string Content { get; init; } = default!;
}
