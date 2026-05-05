namespace MiniBookingSystem.UnitTests.Application.Mentor.Validators;

public sealed class UpdateMentorValidatorTests
{
    private readonly UpdateMentorCommandValidator _validator = new();

    private static UpdateMentorCommand ValidCommand() => MentorTestData.BuildUpdateMentorCommand();

    // ── Valid input ────────────────────────────────────────────────────────

    [Fact]
    public void Validate_WithAllValidData_PassesWithNoErrors()
    {
        _validator.TestValidate(ValidCommand()).ShouldNotHaveAnyValidationErrors();
    }

    [Fact]
    public void Validate_WithAllOptionalFieldsNull_PassesWithNoErrors()
    {
        var command = new UpdateMentorCommand(
            Id: MentorTestData.Valid.MentorId,
            FullName: null,
            PhoneNumber: null,
            DisplayName: null,
            Bio: null,
            Specialization: null,
            ExperienceYears: null,
            BasePrice: null,
            AvatarUrl: null
        );
        _validator.TestValidate(command).ShouldNotHaveAnyValidationErrors();
    }

    // ── Id rules ───────────────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenIdIsEmpty_HasRequiredError()
    {
        var result = _validator.TestValidate(ValidCommand() with { Id = Guid.Empty });
        result.ShouldHaveValidationErrorFor(x => x.Id).WithErrorMessage("Id is required.");
    }

    // ── FullName rules (optional) ──────────────────────────────────────────

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

    [Fact]
    public void Validate_WhenFullNameIsNull_HasNoError()
    {
        _validator
            .TestValidate(ValidCommand() with { FullName = null })
            .ShouldNotHaveValidationErrorFor(x => x.FullName);
    }

    // ── PhoneNumber rules (optional) ───────────────────────────────────────

    [Theory]
    [InlineData("12345678")] // wrong prefix
    [InlineData("0112345678")] // invalid prefix
    public void Validate_WhenPhoneNumberIsInvalid_HasPatternError(string phone)
    {
        var result = _validator.TestValidate(ValidCommand() with { PhoneNumber = phone });
        result
            .ShouldHaveValidationErrorFor(x => x.PhoneNumber)
            .WithErrorMessage("Phone number must be a valid Vietnamese phone number.");
    }

    [Fact]
    public void Validate_WhenPhoneNumberIsNull_HasNoError()
    {
        _validator
            .TestValidate(ValidCommand() with { PhoneNumber = null })
            .ShouldNotHaveValidationErrorFor(x => x.PhoneNumber);
    }

    // ── Bio rules (optional) ───────────────────────────────────────────────

    [Fact]
    public void Validate_WhenBioExceeds1000Chars_HasMaxLengthError()
    {
        var result = _validator.TestValidate(ValidCommand() with { Bio = new string('b', 1001) });
        result
            .ShouldHaveValidationErrorFor(x => x.Bio)
            .WithErrorMessage("Bio must not exceed 1000 characters.");
    }

    [Fact]
    public void Validate_WhenBioIsNull_HasNoError()
    {
        _validator
            .TestValidate(ValidCommand() with { Bio = null })
            .ShouldNotHaveValidationErrorFor(x => x.Bio);
    }

    // ── ExperienceYears rules (optional) ───────────────────────────────────

    [Theory]
    [InlineData(-1)]
    [InlineData(51)]
    public void Validate_WhenExperienceYearsOutOfRange_HasRangeError(int years)
    {
        var result = _validator.TestValidate(ValidCommand() with { ExperienceYears = years });
        result
            .ShouldHaveValidationErrorFor(x => x.ExperienceYears)
            .WithErrorMessage("Experience years must be between 0 and 50.");
    }

    [Fact]
    public void Validate_WhenExperienceYearsIsNull_HasNoError()
    {
        _validator
            .TestValidate(ValidCommand() with { ExperienceYears = null })
            .ShouldNotHaveValidationErrorFor(x => x.ExperienceYears);
    }

    // ── BasePrice rules (optional) ─────────────────────────────────────────

    [Fact]
    public void Validate_WhenBasePriceIsNegative_HasNegativeError()
    {
        var result = _validator.TestValidate(ValidCommand() with { BasePrice = -1 });
        result
            .ShouldHaveValidationErrorFor(x => x.BasePrice)
            .WithErrorMessage("Base price must not be a negative number.");
    }

    [Fact]
    public void Validate_WhenBasePriceIsNull_HasNoError()
    {
        _validator
            .TestValidate(ValidCommand() with { BasePrice = null })
            .ShouldNotHaveValidationErrorFor(x => x.BasePrice);
    }

    // ── AvatarUrl rules (optional) ─────────────────────────────────────────

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

    // ── Specialization rules (optional) ───────────────────────────────────

    [Fact]
    public void Validate_WhenSpecializationIsEmptyString_HasRequiredError()
    {
        var result = _validator.TestValidate(ValidCommand() with { Specialization = "" });
        result
            .ShouldHaveValidationErrorFor(x => x.Specialization)
            .WithErrorMessage("Specialization must not be empty if updating.");
    }

    [Fact]
    public void Validate_WhenSpecializationIsNull_HasNoError()
    {
        _validator
            .TestValidate(ValidCommand() with { Specialization = null })
            .ShouldNotHaveValidationErrorFor(x => x.Specialization);
    }
}
