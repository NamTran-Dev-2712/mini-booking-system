using System.Text.RegularExpressions;
using MediatR;
using Microsoft.Extensions.Logging;

public sealed class SendAiMessageCommandHandler
    : IRequestHandler<SendAiMessageCommand, AiChatResponse>
{
    private readonly IMiniMaxService _miniMaxService;
    private readonly IConversationHistoryService _conversationHistory;
    private readonly ICacheService _cacheService;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<SendAiMessageCommandHandler> _logger;

    public SendAiMessageCommandHandler(
        IMiniMaxService miniMaxService,
        IConversationHistoryService conversationHistory,
        ICacheService cacheService,
        IUnitOfWork unitOfWork,
        ILogger<SendAiMessageCommandHandler> logger
    )
    {
        _miniMaxService = miniMaxService;
        _conversationHistory = conversationHistory;
        _cacheService = cacheService;
        _unitOfWork = unitOfWork;
        _logger = logger;
    }

    public async Task<AiChatResponse> Handle(
        SendAiMessageCommand request,
        CancellationToken cancellationToken
    )
    {
        // 1. Fast-path: keyword-based out-of-scope filter (saves API tokens)
        if (AiInputGuard.IsOutOfScope(request.Message))
        {
            _logger.LogInformation(
                "AI request rejected by InputGuard for user {UserId}",
                request.UserId
            );
            return new AiChatResponse(
                AiInputGuard.OutOfScopeReply,
                request.ConversationId ?? Guid.NewGuid().ToString("N")
            );
        }

        // 2. Load or create conversation history from Redis
        var (history, conversationId) = await _conversationHistory.GetOrCreateAsync(
            request.UserId,
            request.ConversationId,
            cancellationToken
        );

        // Append the current user message to history before sending
        var historyWithCurrentMessage = history
            .Append(new ChatMessage("user", request.Message))
            .ToList();

        // 3. Build context-aware system prompt (mentor data cached separately)
        var mentors = await GetCachedMentorContextAsync(cancellationToken);
        var systemPrompt = SystemPromptBuilder.Build(mentors);

        // 4. Call MiniMax API
        var rawReply = await _miniMaxService.ChatAsync(
            systemPrompt,
            historyWithCurrentMessage,
            cancellationToken
        );

        // Strip <think>...</think> reasoning blocks that reasoning models emit
        var reply = StripThinkingTags(rawReply);

        // 5. Persist full conversation turn (user + assistant) to Redis
        await _conversationHistory.AppendAsync(
            request.UserId,
            conversationId,
            request.Message,
            reply,
            cancellationToken
        );

        // 6. Best-effort audit log to DB — never fail the main request on log errors
        await TryLogConversationAsync(request, reply, cancellationToken);

        return new AiChatResponse(reply, conversationId);
    }

    private async Task<IReadOnlyList<MentorContextItem>> GetCachedMentorContextAsync(
        CancellationToken ct
    )
    {
        var cached = await _cacheService.GetAsync<List<MentorContextItem>>(
            CacheKeys.AiMentorContext,
            ct
        );
        if (cached != null)
            return cached;

        var now = DateTime.UtcNow;

        // Load active mentors with their available slots in one go
        var mentors = await _unitOfWork.Mentor.GetAllAsync(
            m => m.IsActive == true,
            q => q.OrderByDescending(m => m.ExperienceYears),
            m => m.Slots
        );

        var result = mentors
            .Take(AiConstants.MaxMentorsInContext)
            .Select(m =>
            {
                var availableSlots = m
                    .Slots.Where(s =>
                        s.Status == MentorSlotStatus.Available
                        && s.StartTime > now
                        && s.CurrentBookings < s.MaxBookings
                    )
                    .OrderBy(s => s.StartTime)
                    .Take(5)
                    .Select(s => new AvailableSlotItem(
                        s.StartTime,
                        s.EndTime,
                        s.Price,
                        s.MaxBookings - s.CurrentBookings
                    ))
                    .ToList();

                return new MentorContextItem(
                    m.DisplayName,
                    m.Specialization,
                    m.Bio,
                    m.ExperienceYears,
                    m.BasePrice,
                    availableSlots
                );
            })
            .ToList();

        await _cacheService.SetAsync(
            CacheKeys.AiMentorContext,
            result,
            TimeSpan.FromMinutes(AiConstants.MentorContextCacheTtlMinutes),
            ct
        );

        return result;
    }

    private static string StripThinkingTags(string response)
    {
        // Remove <think>...</think> blocks that reasoning models emit
        return Regex.Replace(response, @"<think>[\s\S]*?</think>", string.Empty).Trim();
    }

    private async Task TryLogConversationAsync(
        SendAiMessageCommand request,
        string reply,
        CancellationToken ct
    )
    {
        try
        {
            var logEntry = new AiConversationLog
            {
                UserId = request.UserId,
                Feature = AiConstants.Feature,
                Prompt = request.Message,
                Response = reply,
                ModelName = "MiniMax",
            };

            await _unitOfWork.Repository<AiConversationLog>().AddAsync(logEntry, ct);
            await _unitOfWork.SaveChangesAsync(ct);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(
                ex,
                "Failed to persist AI conversation log for user {UserId}",
                request.UserId
            );
        }
    }
}
