using FluentValidation;
using MiniBookingSystem.Application.Common.Constants;

/// <summary>
/// Shared FluentValidation rules for optional social link fields so that every
/// command validator (mentor create/update, profile update) applies the same
/// length + URL constraints consistently.
/// </summary>
public static class SocialLinkRuleExtensions
{
    public const int MaxLength = 500;

    public static IRuleBuilderOptions<T, string?> MustBeValidSocialLink<T>(
        this IRuleBuilder<T, string?> ruleBuilder,
        string platformName
    )
    {
        return ruleBuilder
            .MaximumLength(MaxLength)
            .WithMessage($"{platformName} URL must not exceed {MaxLength} characters.")
            .Must(ValidationPatterns.LinkMustBeValid)
            .WithMessage($"Invalid {platformName} URL.");
    }
}
