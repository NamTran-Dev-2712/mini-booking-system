namespace MiniBookingSystem.UnitTests.Application.Auth.Validators;

public sealed class RegisterMentorValidatorTests
{
    private readonly RegisterMentorValidator _validator = new();

    private static RegisterMentorCommand ValidCommand() =>
        AuthTestData.BuildRegisterMentorCommand();

    // ── Valid input ────────────────────────────────────────────────────────

    [Fact]
    public void Validate_WithAllValidData_PassesWithNoErrors()
    {
        _validator.TestValidate(ValidCommand()).ShouldNotHaveAnyValidationErrors();
    }

    // ── FullName rules ─────────────────────────────────────────────────────

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    public void Validate_WhenFullNameIsEmpty_HasRequiredError(string fullName)
    {
        var result = _validator.TestValidate(ValidCommand() with { FullName = fullName });

        result
            .ShouldHaveValidationErrorFor(x => x.FullName)
            .WithErrorMessage("Full name is required.");
    }

    [Fact]
    public void Validate_WhenFullNameExceeds100Chars_HasMaxLengthError()
    {
        var longName = new string('a', 101);
        var result = _validator.TestValidate(ValidCommand() with { FullName = longName });

        result
            .ShouldHaveValidationErrorFor(x => x.FullName)
            .WithErrorMessage("Full name must not exceed 100 characters.");
    }

    [Theory]
    [InlineData("Nguyen123")]
    [InlineData("John@Doe")]
    [InlineData("Test_Name")]
    public void Validate_WhenFullNameContainsInvalidChars_HasPatternError(string fullName)
    {
        var result = _validator.TestValidate(ValidCommand() with { FullName = fullName });

        result
            .ShouldHaveValidationErrorFor(x => x.FullName)
            .WithErrorMessage("Full name must contain only Vietnamese letters and spaces.");
    }

    // ── Email rules ────────────────────────────────────────────────────────

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    public void Validate_WhenEmailIsEmpty_HasRequiredError(string email)
    {
        var result = _validator.TestValidate(ValidCommand() with { Email = email });

        result.ShouldHaveValidationErrorFor(x => x.Email).WithErrorMessage("Email is required.");
    }

    [Theory]
    [InlineData("invalidemail")]
    [InlineData("missing@")]
    [InlineData("no-at-sign.com")]
    public void Validate_WithInvalidEmailFormat_HasFormatError(string email)
    {
        var result = _validator.TestValidate(ValidCommand() with { Email = email });

        result.ShouldHaveValidationErrorFor(x => x.Email).WithErrorMessage("Invalid email format.");
    }

    // ── Password rules ─────────────────────────────────────────────────────

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    public void Validate_WhenPasswordIsEmpty_HasRequiredError(string password)
    {
        var result = _validator.TestValidate(ValidCommand() with { Password = password });

        result
            .ShouldHaveValidationErrorFor(x => x.Password)
            .WithErrorMessage("Password is required.");
    }

    [Theory]
    [InlineData("password123!")]
    [InlineData("PASSWORD123!")]
    [InlineData("Password123")]
    [InlineData("Password!@#$")]
    public void Validate_WhenPasswordIsWeak_HasStrongPasswordError(string password)
    {
        var result = _validator.TestValidate(ValidCommand() with { Password = password });

        result
            .ShouldHaveValidationErrorFor(x => x.Password)
            .WithErrorMessage(
                "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
            );
    }

    // ── PhoneNumber rules ──────────────────────────────────────────────────

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    public void Validate_WhenPhoneIsEmpty_HasRequiredError(string phone)
    {
        var result = _validator.TestValidate(ValidCommand() with { PhoneNumber = phone });

        result
            .ShouldHaveValidationErrorFor(x => x.PhoneNumber)
            .WithErrorMessage("Phone number is required.");
    }

    [Theory]
    [InlineData("012345678")]
    [InlineData("1234567890")]
    [InlineData("0612345678")]
    public void Validate_WithInvalidVietnamesePhone_HasPhoneError(string phone)
    {
        var result = _validator.TestValidate(ValidCommand() with { PhoneNumber = phone });

        result
            .ShouldHaveValidationErrorFor(x => x.PhoneNumber)
            .WithErrorMessage("Phone number must be a valid Vietnamese phone number.");
    }

    // ── AvatarUrl rules ────────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenAvatarUrlIsNull_HasNoAvatarUrlError()
    {
        var result = _validator.TestValidate(ValidCommand() with { AvatarUrl = null });

        result.ShouldNotHaveValidationErrorFor(x => x.AvatarUrl);
    }

    [Fact]
    public void Validate_WhenAvatarUrlIsEmpty_HasNoAvatarUrlError()
    {
        var result = _validator.TestValidate(ValidCommand() with { AvatarUrl = string.Empty });

        result.ShouldNotHaveValidationErrorFor(x => x.AvatarUrl);
    }

    [Theory]
    [InlineData("not-a-url")]
    [InlineData("htp://broken")]
    public void Validate_WhenAvatarUrlIsInvalid_HasAvatarUrlError(string avatarUrl)
    {
        var result = _validator.TestValidate(ValidCommand() with { AvatarUrl = avatarUrl });

        result
            .ShouldHaveValidationErrorFor(x => x.AvatarUrl)
            .WithErrorMessage("Invalid avatar URL.");
    }

    [Theory]
    [InlineData("https://example.com/avatar.png")]
    [InlineData("http://cdn.example.com/img/u.jpg")]
    public void Validate_WithValidAvatarUrl_HasNoAvatarUrlError(string avatarUrl)
    {
        var result = _validator.TestValidate(ValidCommand() with { AvatarUrl = avatarUrl });

        result.ShouldNotHaveValidationErrorFor(x => x.AvatarUrl);
    }
}
