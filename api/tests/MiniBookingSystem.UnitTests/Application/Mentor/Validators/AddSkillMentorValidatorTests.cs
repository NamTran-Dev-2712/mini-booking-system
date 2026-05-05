namespace MiniBookingSystem.UnitTests.Application.Mentor.Validators;

public sealed class AddSkillMentorValidatorTests
{
    private readonly AddSkillMentorCommandValidator _validator = new();

    private static AddSkillMentorCommand ValidCommand() => MentorTestData.BuildAddSkillCommand();

    // ── Valid input ────────────────────────────────────────────────────────

    [Fact]
    public void Validate_WithAllValidData_PassesWithNoErrors()
    {
        _validator.TestValidate(ValidCommand()).ShouldNotHaveAnyValidationErrors();
    }

    // ── MentorId rules ─────────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenMentorIdIsEmpty_HasRequiredError()
    {
        var result = _validator.TestValidate(ValidCommand() with { MentorId = Guid.Empty });
        result
            .ShouldHaveValidationErrorFor(x => x.MentorId)
            .WithErrorMessage("MentorId is required.");
    }

    // ── SkillName rules ────────────────────────────────────────────────────

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    public void Validate_WhenSkillNameIsEmpty_HasRequiredError(string skillName)
    {
        var result = _validator.TestValidate(ValidCommand() with { SkillName = skillName });
        result
            .ShouldHaveValidationErrorFor(x => x.SkillName)
            .WithErrorMessage("SkillName is required.");
    }

    [Fact]
    public void Validate_WhenSkillNameExceeds100Chars_HasMaxLengthError()
    {
        var result = _validator.TestValidate(
            ValidCommand() with
            {
                SkillName = new string('a', 101),
            }
        );
        result
            .ShouldHaveValidationErrorFor(x => x.SkillName)
            .WithErrorMessage("SkillName must not exceed 100 characters.");
    }

    [Theory]
    [InlineData("C!Sharp")] // invalid character '!'
    [InlineData("Java$cript")] // invalid character '$'
    [InlineData("Python (v3)")] // invalid character '('
    public void Validate_WhenSkillNameContainsInvalidChars_HasPatternError(string skillName)
    {
        var result = _validator.TestValidate(ValidCommand() with { SkillName = skillName });
        result
            .ShouldHaveValidationErrorFor(x => x.SkillName)
            .WithErrorMessage("SkillName contains invalid characters.");
    }

    [Theory]
    [InlineData("C#")]
    [InlineData("C++")]
    [InlineData(".NET")]
    [InlineData("ASP.NET Core")]
    [InlineData("Node.js")]
    [InlineData("Vue-Router")]
    public void Validate_WithValidSkillNames_HasNoError(string skillName)
    {
        _validator
            .TestValidate(ValidCommand() with { SkillName = skillName })
            .ShouldNotHaveValidationErrorFor(x => x.SkillName);
    }
}
