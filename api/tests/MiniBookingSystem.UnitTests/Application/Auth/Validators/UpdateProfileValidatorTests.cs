namespace MiniBookingSystem.UnitTests.Application.Auth.Validators;

public sealed class UpdateProfileValidatorTests
{
    private readonly UpdateProfileValidator _validator = new();

    private static UpdateProfileCommand BuildCommand(
        string? fullName = null,
        string? phoneNumber = null,
        string? displayName = null,
        string? bio = null,
        string? specialization = null,
        int? experienceYears = null,
        decimal? basePrice = null,
        string? avatarUrl = null
    ) =>
        new(
            UserId: AuthTestData.Valid.UserId,
            Roles: [ApplicationRoles.User],
            FullName: fullName,
            PhoneNumber: phoneNumber,
            DisplayName: displayName,
            Bio: bio,
            Specialization: specialization,
            ExperienceYears: experienceYears,
            BasePrice: basePrice,
            AvatarUrl: avatarUrl
        );

    // ── All null — valid (no-op update) ───────────────────────────────────

    [Fact]
    public void Validate_WithAllNullFields_PassesWithNoErrors()
    {
        var command = BuildCommand();
        var result = _validator.TestValidate(command);
        result.ShouldNotHaveAnyValidationErrors();
    }

    // ── FullName ──────────────────────────────────────────────────────────

    [Theory]
    [InlineData("Nguyễn Văn An")]
    [InlineData("Trần Thị Bích")]
    public void Validate_WithValidFullName_Passes(string fullName)
    {
        var command = BuildCommand(fullName: fullName);
        var result = _validator.TestValidate(command);
        result.ShouldNotHaveValidationErrorFor(x => x.FullName);
    }

    [Fact]
    public void Validate_WhenFullNameExceeds100Chars_HasError()
    {
        var command = BuildCommand(fullName: new string('A', 101));
        var result = _validator.TestValidate(command);
        result
            .ShouldHaveValidationErrorFor(x => x.FullName)
            .WithErrorMessage("Full name must not exceed 100 characters.");
    }

    [Theory]
    [InlineData("Nguyen123")]
    [InlineData("Name@Special")]
    public void Validate_WhenFullNameHasInvalidChars_HasError(string fullName)
    {
        var command = BuildCommand(fullName: fullName);
        var result = _validator.TestValidate(command);
        result
            .ShouldHaveValidationErrorFor(x => x.FullName)
            .WithErrorMessage("Full name must contain only Vietnamese letters and spaces.");
    }

    // ── PhoneNumber ───────────────────────────────────────────────────────

    [Theory]
    [InlineData("0912345678")]
    [InlineData("0387654321")]
    [InlineData("+84912345678")]
    public void Validate_WithValidPhoneNumber_Passes(string phone)
    {
        var command = BuildCommand(phoneNumber: phone);
        var result = _validator.TestValidate(command);
        result.ShouldNotHaveValidationErrorFor(x => x.PhoneNumber);
    }

    [Theory]
    [InlineData("012345678")]
    [InlineData("091234567")]
    [InlineData("abc")]
    public void Validate_WhenPhoneNumberIsInvalid_HasError(string phone)
    {
        var command = BuildCommand(phoneNumber: phone);
        var result = _validator.TestValidate(command);
        result.ShouldHaveValidationErrorFor(x => x.PhoneNumber);
    }

    // ── DisplayName ───────────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenDisplayNameExceeds50Chars_HasError()
    {
        var command = BuildCommand(displayName: new string('A', 51));
        var result = _validator.TestValidate(command);
        result
            .ShouldHaveValidationErrorFor(x => x.DisplayName)
            .WithErrorMessage("Display name must not exceed 50 characters.");
    }

    [Fact]
    public void Validate_WithValidDisplayName_Passes()
    {
        var command = BuildCommand(displayName: "Mentor Minh");
        var result = _validator.TestValidate(command);
        result.ShouldNotHaveValidationErrorFor(x => x.DisplayName);
    }

    // ── Bio ───────────────────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenBioExceeds1000Chars_HasError()
    {
        var command = BuildCommand(bio: new string('x', 1001));
        var result = _validator.TestValidate(command);
        result
            .ShouldHaveValidationErrorFor(x => x.Bio)
            .WithErrorMessage("Bio must not exceed 1000 characters.");
    }

    // ── ExperienceYears ───────────────────────────────────────────────────

    [Theory]
    [InlineData(-1)]
    [InlineData(51)]
    public void Validate_WhenExperienceYearsOutOfRange_HasError(int years)
    {
        var command = BuildCommand(experienceYears: years);
        var result = _validator.TestValidate(command);
        result.ShouldHaveValidationErrorFor(x => x.ExperienceYears);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(25)]
    [InlineData(50)]
    public void Validate_WhenExperienceYearsInRange_Passes(int years)
    {
        var command = BuildCommand(experienceYears: years);
        var result = _validator.TestValidate(command);
        result.ShouldNotHaveValidationErrorFor(x => x.ExperienceYears);
    }

    // ── BasePrice ─────────────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenBasePriceIsNegative_HasError()
    {
        var command = BuildCommand(basePrice: -1m);
        var result = _validator.TestValidate(command);
        result.ShouldHaveValidationErrorFor(x => x.BasePrice);
    }

    [Fact]
    public void Validate_WhenBasePriceIsZero_Passes()
    {
        var command = BuildCommand(basePrice: 0m);
        var result = _validator.TestValidate(command);
        result.ShouldNotHaveValidationErrorFor(x => x.BasePrice);
    }

    // ── AvatarUrl ─────────────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenAvatarUrlIsInvalid_HasError()
    {
        var command = BuildCommand(avatarUrl: "not-a-url");
        var result = _validator.TestValidate(command);
        result.ShouldHaveValidationErrorFor(x => x.AvatarUrl);
    }

    [Fact]
    public void Validate_WhenAvatarUrlIsValidHttps_Passes()
    {
        var command = BuildCommand(avatarUrl: "https://example.com/avatar.png");
        var result = _validator.TestValidate(command);
        result.ShouldNotHaveValidationErrorFor(x => x.AvatarUrl);
    }

    [Fact]
    public void Validate_WhenAvatarUrlExceeds500Chars_HasError()
    {
        var command = BuildCommand(avatarUrl: "https://example.com/" + new string('a', 481));
        var result = _validator.TestValidate(command);
        result.ShouldHaveValidationErrorFor(x => x.AvatarUrl);
    }
}
