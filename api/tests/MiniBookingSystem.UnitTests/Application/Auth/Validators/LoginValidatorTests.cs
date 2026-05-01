namespace MiniBookingSystem.UnitTests.Application.Auth.Validators;

public sealed class LoginValidatorTests
{
    private readonly LoginValidator _validator = new();

    // ── Valid input ────────────────────────────────────────────────────────

    [Fact]
    public void Validate_WithValidInput_PassesWithNoErrors()
    {
        var command = new LoginCommand(AuthTestData.Valid.Email, AuthTestData.Valid.Password);

        _validator.TestValidate(command).ShouldNotHaveAnyValidationErrors();
    }

    // ── Email rules ────────────────────────────────────────────────────────

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    public void Validate_WhenEmailIsEmpty_HasRequiredError(string email)
    {
        var result = _validator.TestValidate(new LoginCommand(email, AuthTestData.Valid.Password));

        result.ShouldHaveValidationErrorFor(x => x.Email).WithErrorMessage("Email is required.");
    }

    [Theory]
    [InlineData("notanemail")]
    [InlineData("missing@")]
    [InlineData("@nodomain.com")]
    [InlineData("no-at-sign")]
    public void Validate_WithInvalidEmailFormat_HasFormatError(string email)
    {
        var result = _validator.TestValidate(new LoginCommand(email, AuthTestData.Valid.Password));

        result.ShouldHaveValidationErrorFor(x => x.Email).WithErrorMessage("Invalid email format.");
    }

    [Theory]
    [InlineData("user@example.com")]
    [InlineData("admin.user+tag@company.co.vn")]
    public void Validate_WithValidEmail_HasNoEmailError(string email)
    {
        var result = _validator.TestValidate(new LoginCommand(email, AuthTestData.Valid.Password));

        result.ShouldNotHaveValidationErrorFor(x => x.Email);
    }

    // ── Password rules ─────────────────────────────────────────────────────

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    public void Validate_WhenPasswordIsEmpty_HasRequiredError(string password)
    {
        var result = _validator.TestValidate(new LoginCommand(AuthTestData.Valid.Email, password));

        result
            .ShouldHaveValidationErrorFor(x => x.Password)
            .WithErrorMessage("Password is required.");
    }

    [Theory]
    [InlineData("abc")] // 3 chars
    [InlineData("1234567")] // 7 chars
    public void Validate_WhenPasswordTooShort_HasMinLengthError(string password)
    {
        var result = _validator.TestValidate(new LoginCommand(AuthTestData.Valid.Email, password));

        result
            .ShouldHaveValidationErrorFor(x => x.Password)
            .WithErrorMessage("Password must be at least 8 characters long.");
    }

    [Theory]
    [InlineData("P@ssw0rd!")]
    [InlineData("MyLong$ecurePass1")]
    public void Validate_WithValidPassword_HasNoPasswordError(string password)
    {
        var result = _validator.TestValidate(new LoginCommand(AuthTestData.Valid.Email, password));

        result.ShouldNotHaveValidationErrorFor(x => x.Password);
    }
}
