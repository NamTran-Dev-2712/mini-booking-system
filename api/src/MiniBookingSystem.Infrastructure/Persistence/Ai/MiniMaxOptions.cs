public sealed class MiniMaxOptions
{
    public string ApiKey { get; set; } = string.Empty;
    public string BaseUrl { get; set; } = "https://api.minimax.io/v1/";
    public string Model { get; set; } = "MiniMax-M2.7";
    public int MaxTokens { get; set; } = 1000;
}
