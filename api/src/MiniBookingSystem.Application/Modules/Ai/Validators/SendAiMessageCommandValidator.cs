using FluentValidation;

public sealed class SendAiMessageCommandValidator : AbstractValidator<SendAiMessageCommand>
{
    public SendAiMessageCommandValidator()
    {
        RuleFor(x => x.UserId).NotEmpty().WithMessage("UserId is required.");

        RuleFor(x => x.Message)
            .NotEmpty()
            .WithMessage("Message is required.")
            .MaximumLength(AiConstants.MaxMessageLength)
            .WithMessage($"Message must not exceed {AiConstants.MaxMessageLength} characters.")
            .Must(m => !string.IsNullOrWhiteSpace(m))
            .WithMessage("Message cannot be whitespace only.");

        RuleFor(x => x.ConversationId)
            .MaximumLength(64)
            .WithMessage("ConversationId must not exceed 64 characters.")
            .When(x => x.ConversationId != null);
    }
}
