namespace MiniBookingSystem.UnitTests.Application.Booking.Validators;

public sealed class CreateBookingValidatorTests
{
    private readonly CreateBookingCommandValidator _validator = new();

    private static CreateBookingCommand ValidCommand() =>
        BookingTestData.BuildCreateBookingCommand();

    [Fact]
    public void Validate_WhenCommandIsValid_HasNoErrors()
    {
        var result = _validator.TestValidate(ValidCommand());

        result.ShouldNotHaveAnyValidationErrors();
    }

    // ── UserId ─────────────────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenUserIdIsEmpty_HasError()
    {
        var command = ValidCommand() with { UserId = Guid.Empty };

        _validator
            .TestValidate(command)
            .ShouldHaveValidationErrorFor(x => x.UserId)
            .WithErrorMessage("UserId is required.");
    }

    // ── MentorSlotId ───────────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenMentorSlotIdIsEmpty_HasError()
    {
        var command = ValidCommand() with { MentorSlotId = Guid.Empty };

        _validator
            .TestValidate(command)
            .ShouldHaveValidationErrorFor(x => x.MentorSlotId)
            .WithErrorMessage("MentorSlotId is required.");
    }

    // ── Notes ──────────────────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenNotesIsNull_HasNoError()
    {
        var command = ValidCommand() with { Notes = null };

        _validator.TestValidate(command).ShouldNotHaveValidationErrorFor(x => x.Notes);
    }

    [Fact]
    public void Validate_WhenNotesExceeds500Characters_HasError()
    {
        var command = ValidCommand() with { Notes = new string('a', 501) };

        _validator
            .TestValidate(command)
            .ShouldHaveValidationErrorFor(x => x.Notes)
            .WithErrorMessage("Notes cannot exceed 500 characters.");
    }

    [Fact]
    public void Validate_WhenNotesIsExactly500Characters_HasNoError()
    {
        var command = ValidCommand() with { Notes = new string('a', 500) };

        _validator.TestValidate(command).ShouldNotHaveValidationErrorFor(x => x.Notes);
    }
}
