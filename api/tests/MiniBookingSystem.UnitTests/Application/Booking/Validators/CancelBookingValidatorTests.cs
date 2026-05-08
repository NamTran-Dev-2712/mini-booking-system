namespace MiniBookingSystem.UnitTests.Application.Booking.Validators;

public sealed class CancelBookingValidatorTests
{
    private readonly CancelBookingCommandValidator _validator = new();

    private static CancelBookingCommand ValidCommand() =>
        BookingTestData.BuildCancelBookingCommand();

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

    // ── BookingId ─────────────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenBookingIdIsEmpty_HasError()
    {
        var command = ValidCommand() with { BookingId = Guid.Empty };

        _validator
            .TestValidate(command)
            .ShouldHaveValidationErrorFor(x => x.BookingId)
            .WithErrorMessage("BookingId is required.");
    }

    // ── CancellationReason ────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenCancellationReasonIsNull_HasError()
    {
        var command = ValidCommand() with { CancellationReason = null };

        _validator
            .TestValidate(command)
            .ShouldHaveValidationErrorFor(x => x.CancellationReason)
            .WithErrorMessage("CancellationReason is required.");
    }

    [Fact]
    public void Validate_WhenCancellationReasonIsEmpty_HasError()
    {
        var command = ValidCommand() with { CancellationReason = "" };

        _validator
            .TestValidate(command)
            .ShouldHaveValidationErrorFor(x => x.CancellationReason)
            .WithErrorMessage("CancellationReason is required.");
    }

    [Fact]
    public void Validate_WhenCancellationReasonIsTooShort_HasError()
    {
        var command = ValidCommand() with { CancellationReason = "Short" }; // 5 chars < 10

        _validator
            .TestValidate(command)
            .ShouldHaveValidationErrorFor(x => x.CancellationReason)
            .WithErrorMessage("CancellationReason must be at least 10 characters.");
    }

    [Fact]
    public void Validate_WhenCancellationReasonIsExactly10Characters_HasNoError()
    {
        var command = ValidCommand() with { CancellationReason = "1234567890" };

        _validator.TestValidate(command).ShouldNotHaveValidationErrorFor(x => x.CancellationReason);
    }

    [Fact]
    public void Validate_WhenCancellationReasonExceeds500Characters_HasError()
    {
        var command = ValidCommand() with { CancellationReason = new string('x', 501) };

        _validator
            .TestValidate(command)
            .ShouldHaveValidationErrorFor(x => x.CancellationReason)
            .WithErrorMessage("CancellationReason cannot exceed 500 characters.");
    }

    [Fact]
    public void Validate_WhenCancellationReasonIsExactly500Characters_HasNoError()
    {
        var command = ValidCommand() with { CancellationReason = new string('x', 500) };

        _validator.TestValidate(command).ShouldNotHaveValidationErrorFor(x => x.CancellationReason);
    }
}
