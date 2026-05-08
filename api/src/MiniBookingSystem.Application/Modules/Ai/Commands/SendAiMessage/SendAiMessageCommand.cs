using MediatR;

public sealed record SendAiMessageCommand(Guid UserId, string Message, string? ConversationId)
    : IRequest<AiChatResponse>;
