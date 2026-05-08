using System.Net.Http.Json;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

public sealed class MiniMaxService : IMiniMaxService
{
    private readonly HttpClient _httpClient;
    private readonly MiniMaxOptions _options;
    private readonly ILogger<MiniMaxService> _logger;

    public MiniMaxService(
        HttpClient httpClient,
        IOptions<MiniMaxOptions> options,
        ILogger<MiniMaxService> logger
    )
    {
        _httpClient = httpClient;
        _options = options.Value;
        _logger = logger;
    }

    public async Task<string> ChatAsync(
        string systemPrompt,
        IReadOnlyList<ChatMessage> history,
        CancellationToken ct = default
    )
    {
        var messages = new List<MiniMaxMessage>
        {
            new() { Role = "system", Content = systemPrompt },
        };

        messages.AddRange(
            history.Select(h => new MiniMaxMessage { Role = h.Role, Content = h.Content })
        );

        var request = new MiniMaxChatRequest
        {
            Model = _options.Model,
            MaxTokens = _options.MaxTokens,
            Messages = messages,
        };

        using var response = await _httpClient.PostAsJsonAsync("chat/completions", request, ct);

        if (!response.IsSuccessStatusCode)
        {
            var body = await response.Content.ReadAsStringAsync(ct);
            _logger.LogError(
                "MiniMax API HTTP error. Status={Status}, Body={Body}",
                response.StatusCode,
                body
            );
            throw new AiServiceException(
                "AI service is temporarily unavailable. Please try again later."
            );
        }

        var result = await response.Content.ReadFromJsonAsync<MiniMaxChatResponse>(
            cancellationToken: ct
        );

        if (
            result?.Choices == null
            || result.Choices.Count == 0
            || string.IsNullOrWhiteSpace(result.Choices[0].Message?.Content)
        )
        {
            throw new AiServiceException("AI service returned an empty response.");
        }

        return result.Choices[0].Message.Content;
    }
}
