namespace MiniBookingSystem.UnitTests.Application.Payment.Validators;

public sealed class CreatePaymentValidatorTests
{
    private readonly CreatePaymentCommandValidator _validator = new();

    private static CreatePaymentCommand ValidCommand() =>
        PaymentTestData.BuildCreatePaymentCommand();

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
            .WithErrorMessage("UserId is required");
    }

    // ── BookingId ─────────────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenBookingIdIsEmpty_HasError()
    {
        var command = ValidCommand() with { BookingId = Guid.Empty };

        _validator
            .TestValidate(command)
            .ShouldHaveValidationErrorFor(x => x.BookingId)
            .WithErrorMessage("BookingId is required");
    }

    // ── Provider ──────────────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenProviderIsValidEnum_HasNoError()
    {
        var command = ValidCommand() with { Provider = PaymentProvider.SePay };

        _validator.TestValidate(command).ShouldNotHaveValidationErrorFor(x => x.Provider);
    }

    [Fact]
    public void Validate_WhenProviderIsOutOfEnumRange_HasError()
    {
        var command = ValidCommand() with { Provider = (PaymentProvider)999 };

        _validator
            .TestValidate(command)
            .ShouldHaveValidationErrorFor(x => x.Provider)
            .WithErrorMessage("Invalid payment provider");
    }

    // ── Currency ──────────────────────────────────────────────────────────

    [Fact]
    public void Validate_WhenCurrencyIsEmpty_HasError()
    {
        var command = ValidCommand() with { Currency = "" };

        _validator
            .TestValidate(command)
            .ShouldHaveValidationErrorFor(x => x.Currency)
            .WithErrorMessage("Currency is required");
    }

    [Fact]
    public void Validate_WhenCurrencyIsTwoLetters_HasError()
    {
        var command = ValidCommand() with { Currency = "US" };

        _validator
            .TestValidate(command)
            .ShouldHaveValidationErrorFor(x => x.Currency)
            .WithErrorMessage("Currency must be a 3-letter ISO code");
    }

    [Fact]
    public void Validate_WhenCurrencyIsFourLetters_HasError()
    {
        var command = ValidCommand() with { Currency = "USDD" };

        _validator
            .TestValidate(command)
            .ShouldHaveValidationErrorFor(x => x.Currency)
            .WithErrorMessage("Currency must be a 3-letter ISO code");
    }

    [Fact]
    public void Validate_WhenCurrencyIsLowercase_HasError()
    {
        var command = ValidCommand() with { Currency = "vnd" };

        _validator
            .TestValidate(command)
            .ShouldHaveValidationErrorFor(x => x.Currency)
            .WithErrorMessage("Currency must be uppercase ISO format (e.g., USD, VND)");
    }

    [Fact]
    public void Validate_WhenCurrencyIsVND_HasNoError()
    {
        var command = ValidCommand() with { Currency = "VND" };

        _validator.TestValidate(command).ShouldNotHaveValidationErrorFor(x => x.Currency);
    }

    [Fact]
    public void Validate_WhenCurrencyIsUSD_HasNoError()
    {
        var command = ValidCommand() with { Currency = "USD" };

        _validator.TestValidate(command).ShouldNotHaveValidationErrorFor(x => x.Currency);
    }
}
