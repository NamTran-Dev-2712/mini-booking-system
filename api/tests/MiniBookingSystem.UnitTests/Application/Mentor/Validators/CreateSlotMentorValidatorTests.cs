namespace MiniBookingSystem.UnitTests.Application.Mentor.Validators;

public sealed class CreateSlotMentorValidatorTests
{
    private readonly CreateSlotMentorCommandValidator _validator = new();

    private static CreateSlotMentorCommand ValidCommand()
    {
        var start = DateTime.UtcNow.AddDays(1);
        return MentorTestData.BuildCreateSlotCommand(start: start, end: start.AddHours(1));
    }

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

    // ── Name rules ────────────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenNameIsEmpty_HasRequiredError()
    {
        var result = _validator.TestValidate(ValidCommand() with { Name = "" });
        result.ShouldHaveValidationErrorFor(x => x.Name).WithErrorMessage("Name is required.");
    }

    [Fact]
    public void Validate_WhenNameExceeds200Characters_HasMaxLengthError()
    {
        var result = _validator.TestValidate(ValidCommand() with { Name = new string('a', 201) });
        result
            .ShouldHaveValidationErrorFor(x => x.Name)
            .WithErrorMessage("Name cannot exceed 200 characters.");
    }

    [Fact]
    public void Validate_WhenNameIsValid_HasNoError()
    {
        _validator
            .TestValidate(ValidCommand() with { Name = "Morning Session" })
            .ShouldNotHaveValidationErrorFor(x => x.Name);
    }

    // ── StartTime rules ────────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenStartTimeIsDefault_HasRequiredError()
    {
        var cmd = ValidCommand();
        var result = _validator.TestValidate(cmd with { StartTime = default });
        result
            .ShouldHaveValidationErrorFor(x => x.StartTime)
            .WithErrorMessage("StartTime is required.");
    }

    [Fact]
    public void Validate_WhenStartTimeIsInThePast_HasFutureError()
    {
        var pastStart = DateTime.UtcNow.AddHours(-1);
        var result = _validator.TestValidate(
            ValidCommand() with
            {
                StartTime = pastStart,
                EndTime = pastStart.AddHours(1),
            }
        );

        result
            .ShouldHaveValidationErrorFor(x => x.StartTime)
            .WithErrorMessage("StartTime must be in the future.");
    }

    // ── EndTime rules ──────────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenEndTimeIsDefault_HasRequiredError()
    {
        var result = _validator.TestValidate(ValidCommand() with { EndTime = default });
        result
            .ShouldHaveValidationErrorFor(x => x.EndTime)
            .WithErrorMessage("EndTime is required.");
    }

    [Fact]
    public void Validate_WhenEndTimeIsBeforeStartTime_HasOrderError()
    {
        var start = DateTime.UtcNow.AddDays(1);
        var result = _validator.TestValidate(
            ValidCommand() with
            {
                StartTime = start,
                EndTime = start.AddHours(-1),
            }
        );

        result
            .ShouldHaveValidationErrorFor(x => x.EndTime)
            .WithErrorMessage("EndTime must be after StartTime.");
    }

    [Fact]
    public void Validate_WhenEndTimeEqualsStartTime_HasOrderError()
    {
        var start = DateTime.UtcNow.AddDays(1);
        var result = _validator.TestValidate(
            ValidCommand() with
            {
                StartTime = start,
                EndTime = start,
            }
        );

        result.ShouldHaveValidationErrorFor(x => x.EndTime);
    }

    // ── Duration rules ─────────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenDurationIsLessThan30Minutes_HasDurationError()
    {
        var start = DateTime.UtcNow.AddDays(1);
        var result = _validator.TestValidate(
            ValidCommand() with
            {
                StartTime = start,
                EndTime = start.AddMinutes(29),
            }
        );

        result
            .ShouldHaveValidationErrorFor(x => x)
            .WithErrorMessage("The duration of a slot must be at least 30 minutes.");
    }

    [Fact]
    public void Validate_WhenDurationIsExactly30Minutes_HasNoError()
    {
        var start = DateTime.UtcNow.AddDays(1);
        _validator
            .TestValidate(ValidCommand() with { StartTime = start, EndTime = start.AddMinutes(30) })
            .ShouldNotHaveValidationErrorFor(x => x);
    }

    [Fact]
    public void Validate_WhenDurationExceeds12Hours_HasMaxDurationError()
    {
        var start = DateTime.UtcNow.AddDays(1);
        var result = _validator.TestValidate(
            ValidCommand() with
            {
                StartTime = start,
                EndTime = start.AddHours(13),
            }
        );

        result
            .ShouldHaveValidationErrorFor(x => x)
            .WithErrorMessage("A slot cannot exceed 12 hours in duration.");
    }

    [Fact]
    public void Validate_WhenDurationIsExactly12Hours_HasNoError()
    {
        var start = DateTime.UtcNow.AddDays(1);
        _validator
            .TestValidate(ValidCommand() with { StartTime = start, EndTime = start.AddHours(12) })
            .ShouldNotHaveValidationErrorFor(x => x);
    }

    // ── Price rules ────────────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenPriceIsNegative_HasNegativeError()
    {
        var result = _validator.TestValidate(ValidCommand() with { Price = -1 });
        result
            .ShouldHaveValidationErrorFor(x => x.Price)
            .WithErrorMessage("Price cannot be a negative value.");
    }

    [Fact]
    public void Validate_WhenPriceIsZero_HasNotEmptyError()
    {
        // Price = 0 is the default for decimal; FluentValidation's NotEmpty() treats it as empty.
        var result = _validator.TestValidate(ValidCommand() with { Price = 0 });
        result.ShouldHaveValidationErrorFor(x => x.Price).WithErrorMessage("Price is required.");
    }

    // ── MaxBookings rules ──────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenMaxBookingsIsZero_HasError()
    {
        var result = _validator.TestValidate(ValidCommand() with { MaxBookings = 0 });
        result
            .ShouldHaveValidationErrorFor(x => x.MaxBookings)
            .WithErrorMessage("MaxBookings must be greater than 0.");
    }

    [Fact]
    public void Validate_WhenMaxBookingsIsNegative_HasError()
    {
        var result = _validator.TestValidate(ValidCommand() with { MaxBookings = -1 });
        result
            .ShouldHaveValidationErrorFor(x => x.MaxBookings)
            .WithErrorMessage("MaxBookings must be greater than 0.");
    }

    [Fact]
    public void Validate_WhenMaxBookingsIsPositive_HasNoError()
    {
        _validator
            .TestValidate(ValidCommand() with { MaxBookings = 5 })
            .ShouldNotHaveValidationErrorFor(x => x.MaxBookings);
    }

    // ── Description rules ──────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenDescriptionIsNull_HasNoError()
    {
        _validator
            .TestValidate(ValidCommand() with { Description = null })
            .ShouldNotHaveValidationErrorFor(x => x.Description);
    }

    [Fact]
    public void Validate_WhenDescriptionExceeds1000Characters_HasError()
    {
        var result = _validator.TestValidate(
            ValidCommand() with
            {
                Description = new string('a', 1001),
            }
        );
        result
            .ShouldHaveValidationErrorFor(x => x.Description)
            .WithErrorMessage("Description cannot exceed 1000 characters.");
    }

    [Fact]
    public void Validate_WhenDescriptionIsExactly1000Characters_HasNoError()
    {
        _validator
            .TestValidate(ValidCommand() with { Description = new string('a', 1000) })
            .ShouldNotHaveValidationErrorFor(x => x.Description);
    }

    // ── Location rules ─────────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenLocationIsNull_HasNoError()
    {
        _validator
            .TestValidate(ValidCommand() with { Location = null })
            .ShouldNotHaveValidationErrorFor(x => x.Location);
    }

    [Fact]
    public void Validate_WhenLocationExceeds500Characters_HasError()
    {
        var result = _validator.TestValidate(
            ValidCommand() with
            {
                Location = new string('a', 501),
            }
        );
        result
            .ShouldHaveValidationErrorFor(x => x.Location)
            .WithErrorMessage("Location cannot exceed 500 characters.");
    }

    [Fact]
    public void Validate_WhenLocationIsExactly500Characters_HasNoError()
    {
        _validator
            .TestValidate(ValidCommand() with { Location = new string('a', 500) })
            .ShouldNotHaveValidationErrorFor(x => x.Location);
    }
}
