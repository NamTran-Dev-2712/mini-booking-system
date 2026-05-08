using System.Text.Json.Serialization;

public sealed class MiniMaxChatResponse
{
    [JsonPropertyName("choices")]
    public List<MiniMaxChoice> Choices { get; init; } = [];

    [JsonPropertyName("usage")]
    public MiniMaxUsage? Usage { get; init; }

    [JsonPropertyName("base_resp")]
    public MiniMaxBaseResp? BaseResp { get; init; }
}

public sealed class MiniMaxChoice
{
    [JsonPropertyName("message")]
    public MiniMaxMessage Message { get; init; } = default!;

    [JsonPropertyName("finish_reason")]
    public string? FinishReason { get; init; }
}

public sealed class MiniMaxUsage
{
    [JsonPropertyName("total_tokens")]
    public int TotalTokens { get; init; }
}

public sealed class MiniMaxBaseResp
{
    [JsonPropertyName("status_code")]
    public int StatusCode { get; init; }

    [JsonPropertyName("status_msg")]
    public string StatusMsg { get; init; } = string.Empty;
}
