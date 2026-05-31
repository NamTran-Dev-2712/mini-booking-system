namespace MiniBookingSystem.UnitTests.Application.Mentor.Validators;

public sealed class CreateMentorValidatorTests
{
    private readonly CreateMentorCommandValidator _validator = new();

    private static CreateMentorCommand ValidCommand() => MentorTestData.BuildCreateMentorCommand();

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
        var result = _validator.TestValidate(
            ValidCommand() with
            {
                FullName = new string('a', 101),
            }
        );
        result
            .ShouldHaveValidationErrorFor(x => x.FullName)
            .WithErrorMessage("Full name must not exceed 100 characters.");
    }

    [Theory]
    [InlineData("Nguyen123")]
    [InlineData("John@Doe")]
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
    public void Validate_WithValidVietnameseName_HasNoFullNameError(string fullName)
    {
        _validator
            .TestValidate(ValidCommand() with { FullName = fullName })
            .ShouldNotHaveValidationErrorFor(x => x.FullName);
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

    // ── PhoneNumber rules ──────────────────────────────────────────────────

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    public void Validate_WhenPhoneNumberIsEmpty_HasRequiredError(string phone)
    {
        var result = _validator.TestValidate(ValidCommand() with { PhoneNumber = phone });
        result
            .ShouldHaveValidationErrorFor(x => x.PhoneNumber)
            .WithErrorMessage("Phone number is required.");
    }

    [Theory]
    [InlineData("12345678")] // too short, wrong prefix
    [InlineData("0112345678")] // invalid prefix (01x is old format)
    public void Validate_WithInvalidVietnamesePhone_HasPatternError(string phone)
    {
        var result = _validator.TestValidate(ValidCommand() with { PhoneNumber = phone });
        result.ShouldHaveValidationErrorFor(x => x.PhoneNumber);
    }

    // ── DisplayName rules ──────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenDisplayNameExceeds50Chars_HasMaxLengthError()
    {
        var result = _validator.TestValidate(
            ValidCommand() with
            {
                DisplayName = new string('x', 51),
            }
        );
        result
            .ShouldHaveValidationErrorFor(x => x.DisplayName)
            .WithErrorMessage("Display name must not exceed 50 characters.");
    }

    [Fact]
    public void Validate_WhenDisplayNameIsNull_HasNoError()
    {
        _validator
            .TestValidate(ValidCommand() with { DisplayName = null })
            .ShouldNotHaveValidationErrorFor(x => x.DisplayName);
    }

    // ── ExperienceYears rules ──────────────────────────────────────────────

    [Theory]
    [InlineData(-1)]
    [InlineData(51)]
    public void Validate_WhenExperienceYearsOutOfRange_HasRangeError(int years)
    {
        var result = _validator.TestValidate(ValidCommand() with { ExperienceYears = years });
        result
            .ShouldHaveValidationErrorFor(x => x.ExperienceYears)
            .WithErrorMessage("Experience years is invalid (0 - 50 years).");
    }

    [Theory]
    [InlineData(0)]
    [InlineData(25)]
    [InlineData(50)]
    public void Validate_WhenExperienceYearsWithinRange_HasNoError(int years)
    {
        _validator
            .TestValidate(
                ValidCommand() with
                {
                    ExperienceYears = years,
                    Specialization = years > 0 ? MentorTestData.Valid.Specialization : null,
                }
            )
            .ShouldNotHaveValidationErrorFor(x => x.ExperienceYears);
    }

    // ── Specialization rules ───────────────────────────────────────────────

    [Fact]
    public void Validate_WhenExperienceGreaterThanZeroAndSpecializationIsNull_HasRequiredError()
    {
        var result = _validator.TestValidate(
            ValidCommand() with
            {
                ExperienceYears = 3,
                Specialization = null,
            }
        );

        result
            .ShouldHaveValidationErrorFor(x => x.Specialization)
            .WithErrorMessage("Specialization is required if experience years is greater than 0.");
    }

    [Fact]
    public void Validate_WhenExperienceIsZeroAndSpecializationIsNull_HasNoError()
    {
        _validator
            .TestValidate(ValidCommand() with { ExperienceYears = 0, Specialization = null })
            .ShouldNotHaveValidationErrorFor(x => x.Specialization);
    }

    // ── BasePrice rules ────────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenBasePriceIsNegative_HasNegativeError()
    {
        var result = _validator.TestValidate(ValidCommand() with { BasePrice = -1 });
        result
            .ShouldHaveValidationErrorFor(x => x.BasePrice)
            .WithErrorMessage("Base price must not be a negative number.");
    }

    [Fact]
    public void Validate_WhenBasePriceIsZero_HasNoError()
    {
        _validator
            .TestValidate(ValidCommand() with { BasePrice = 0 })
            .ShouldNotHaveValidationErrorFor(x => x.BasePrice);
    }

    // ── AvatarUrl rules ────────────────────────────────────────────────────

    [Theory]
    [InlineData("not-a-url")]
    [InlineData("ftp://invalid")]
    public void Validate_WhenAvatarUrlIsInvalid_HasUrlError(string avatarUrl)
    {
        var result = _validator.TestValidate(ValidCommand() with { AvatarUrl = avatarUrl });
        result
            .ShouldHaveValidationErrorFor(x => x.AvatarUrl)
            .WithErrorMessage("Invalid avatar URL.");
    }

    [Fact]
    public void Validate_WhenAvatarUrlIsNull_HasNoError()
    {
        _validator
            .TestValidate(ValidCommand() with { AvatarUrl = null })
            .ShouldNotHaveValidationErrorFor(x => x.AvatarUrl);
    }

    // ── Social link rules ──────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenAllSocialLinksAreNull_HasNoError()
    {
        var cmd = ValidCommand() with
        {
            FacebookUrl = null,
            GithubUrl = null,
            LinkedInUrl = null,
            TelegramUrl = null,
            WebsiteUrl = null,
        };

        var result = _validator.TestValidate(cmd);

        result.ShouldNotHaveValidationErrorFor(x => x.FacebookUrl);
        result.ShouldNotHaveValidationErrorFor(x => x.GithubUrl);
        result.ShouldNotHaveValidationErrorFor(x => x.LinkedInUrl);
        result.ShouldNotHaveValidationErrorFor(x => x.TelegramUrl);
        result.ShouldNotHaveValidationErrorFor(x => x.WebsiteUrl);
    }

    [Theory]
    [InlineData("not-a-url")]
    [InlineData("ftp://invalid")]
    public void Validate_WhenFacebookUrlIsInvalid_HasUrlError(string url)
    {
        var result = _validator.TestValidate(ValidCommand() with { FacebookUrl = url });
        result
            .ShouldHaveValidationErrorFor(x => x.FacebookUrl)
            .WithErrorMessage("Invalid Facebook URL.");
    }

    [Fact]
    public void Validate_WhenGithubUrlExceeds500Chars_HasMaxLengthError()
    {
        var longUrl = "https://github.com/" + new string('a', 500);
        var result = _validator.TestValidate(ValidCommand() with { GithubUrl = longUrl });
        result
            .ShouldHaveValidationErrorFor(x => x.GithubUrl)
            .WithErrorMessage("GitHub URL must not exceed 500 characters.");
    }

    [Fact]
    public void Validate_WhenSocialLinksAreValidUrls_HasNoError()
    {
        var result = _validator.TestValidate(ValidCommand());
        result.ShouldNotHaveValidationErrorFor(x => x.FacebookUrl);
        result.ShouldNotHaveValidationErrorFor(x => x.GithubUrl);
        result.ShouldNotHaveValidationErrorFor(x => x.LinkedInUrl);
        result.ShouldNotHaveValidationErrorFor(x => x.TelegramUrl);
        result.ShouldNotHaveValidationErrorFor(x => x.WebsiteUrl);
    }
}
