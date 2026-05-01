namespace MiniBookingSystem.UnitTests.Application.Auth.Validators;

public sealed class RegisterValidatorTests
{
    private readonly RegisterValidator _validator = new();

    private static RegisterCommand ValidCommand() =>
        new(
            AuthTestData.Valid.FullName,
            AuthTestData.Valid.Email,
            AuthTestData.Valid.Password,
            AuthTestData.Valid.PhoneNumber
        );

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
    [InlineData("Nguyen123")] // contains digits
    [InlineData("John@Doe")] // contains @
    [InlineData("Test_Name")] // contains underscore
    public void Validate_WhenFullNameContainsInvalidChars_HasPatternError(string fullName)
    {
        var result = _validator.TestValidate(ValidCommand() with { FullName = fullName });

        result
            .ShouldHaveValidationErrorFor(x => x.FullName)
            .WithErrorMessage("Full name must contain only Vietnamese letters and spaces.");
    }

    [Theory]
    [InlineData("Nguyen Van An")]
    [InlineData("Trần Thị Bích")]
    [InlineData("Lê Văn Cường")]
    [InlineData("An")] // single-word name
    public void Validate_WithValidVietnameseName_HasNoFullNameError(string fullName)
    {
        var result = _validator.TestValidate(ValidCommand() with { FullName = fullName });

        result.ShouldNotHaveValidationErrorFor(x => x.FullName);
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
    [InlineData("Ab1@")] // only 4 chars
    [InlineData("A1@bcde")] // only 7 chars
    public void Validate_WhenPasswordTooShort_HasMinLengthError(string password)
    {
        var result = _validator.TestValidate(ValidCommand() with { Password = password });

        result
            .ShouldHaveValidationErrorFor(x => x.Password)
            .WithErrorMessage("Password must be at least 8 characters long.");
    }

    [Theory]
    [InlineData("password123!")] // no uppercase
    [InlineData("PASSWORD123!")] // no lowercase
    [InlineData("Password123")] // no special char
    [InlineData("Password!@#$")] // no digit
    public void Validate_WhenPasswordIsWeak_HasStrongPasswordError(string password)
    {
        var result = _validator.TestValidate(ValidCommand() with { Password = password });

        result
            .ShouldHaveValidationErrorFor(x => x.Password)
            .WithErrorMessage(
                "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
            );
    }

    [Theory]
    [InlineData("P@ssw0rd!")]
    [InlineData("Abcd1234!")]
    [InlineData("MyStr0ng#Pass")]
    public void Validate_WithStrongPassword_HasNoPasswordError(string password)
    {
        var result = _validator.TestValidate(ValidCommand() with { Password = password });

        result.ShouldNotHaveValidationErrorFor(x => x.Password);
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
    [InlineData("012345678")] // 9 digits starting with 01 (invalid prefix)
    [InlineData("1234567890")] // does not start with 0/+84/84
    [InlineData("0612345678")] // 06x prefix not supported in Vietnam
    [InlineData("+1234567890")] // non-Vietnam country code
    [InlineData("091234567")] // too short (9 digits after 09)
    public void Validate_WithInvalidVietnamesePhone_HasPhoneError(string phone)
    {
        var result = _validator.TestValidate(ValidCommand() with { PhoneNumber = phone });

        result
            .ShouldHaveValidationErrorFor(x => x.PhoneNumber)
            .WithErrorMessage("Phone number must be a valid Vietnamese phone number.");
    }

    [Theory]
    [InlineData("0912345678")] // 09x format
    [InlineData("0812345678")] // 08x format
    [InlineData("0712345678")] // 07x format
    [InlineData("0312345678")] // 03x format
    [InlineData("0512345678")] // 05x format
    [InlineData("+84912345678")] // international +84 format
    [InlineData("84912345678")] // international 84 format (no +)
    public void Validate_WithValidVietnamesePhone_HasNoPhoneError(string phone)
    {
        var result = _validator.TestValidate(ValidCommand() with { PhoneNumber = phone });

        result.ShouldNotHaveValidationErrorFor(x => x.PhoneNumber);
    }
}
