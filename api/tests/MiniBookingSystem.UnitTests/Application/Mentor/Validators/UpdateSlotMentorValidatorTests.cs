namespace MiniBookingSystem.UnitTests.Application.Mentor.Validators;

public sealed class UpdateSlotMentorValidatorTests
{
    private readonly UpdateSlotMentorCommandValidator _validator = new();

    private static UpdateSlotMentorCommand ValidCommand()
    {
        var start = DateTime.UtcNow.AddDays(1);
        return MentorTestData.BuildUpdateSlotCommand(
            slotId: MentorTestData.Valid.SlotId,
            mentorId: MentorTestData.Valid.MentorId,
            maxBookings: 2
        ) with
        {
            StartTime = start,
            EndTime = start.AddHours(2),
        };
    }

    // ── Valid input ────────────────────────────────────────────────────────

    [Fact]
    public void Validate_WithAllValidData_PassesWithNoErrors()
    {
        _validator.TestValidate(ValidCommand()).ShouldNotHaveAnyValidationErrors();
    }

    // ── Id rules ──────────────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenIdIsEmpty_HasRequiredError()
    {
        var result = _validator.TestValidate(ValidCommand() with { Id = Guid.Empty });
        result
            .ShouldHaveValidationErrorFor(x => x.Id)
            .WithErrorMessage("Slot Id is required for updating.");
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

    // ── StartTime rules ────────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenStartTimeIsDefault_HasRequiredError()
    {
        var result = _validator.TestValidate(ValidCommand() with { StartTime = default });
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
        var result = _validator.TestValidate(ValidCommand() with { MaxBookings = -5 });
        result
            .ShouldHaveValidationErrorFor(x => x.MaxBookings)
            .WithErrorMessage("MaxBookings must be greater than 0.");
    }

    [Fact]
    public void Validate_WhenMaxBookingsIsPositive_HasNoError()
    {
        _validator
            .TestValidate(ValidCommand() with { MaxBookings = 10 })
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
                Description = new string('x', 1001),
            }
        );
        result
            .ShouldHaveValidationErrorFor(x => x.Description)
            .WithErrorMessage("Description cannot exceed 1000 characters.");
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
    public void Validate_WhenPriceIsZero_HasNoError()
    {
        // Update validator allows Price = 0 (no NotEmpty rule unlike Create)
        _validator
            .TestValidate(ValidCommand() with { Price = 0 })
            .ShouldNotHaveValidationErrorFor(x => x.Price);
    }
}
