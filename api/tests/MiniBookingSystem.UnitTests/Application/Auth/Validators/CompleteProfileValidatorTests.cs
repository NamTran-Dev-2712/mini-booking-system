using MiniBookingSystem.Application.Common.Constants;

namespace MiniBookingSystem.UnitTests.Application.Auth.Validators;

public sealed class CompleteProfileValidatorTests
{
    private readonly CompleteProfileCommandValidator _validator = new();

    private static CompleteProfileCommand ValidCommand() =>
        new(AuthTestData.Valid.UserId, "0912345678");

    [Fact]
    public void Validate_WithAllValidData_PassesWithNoErrors()
    {
        _validator.TestValidate(ValidCommand()).ShouldNotHaveAnyValidationErrors();
    }

    [Fact]
    public void Validate_WhenUserIdIsEmpty_HasRequiredError()
    {
        var result = _validator.TestValidate(ValidCommand() with { UserId = Guid.Empty });
        result.ShouldHaveValidationErrorFor(x => x.UserId).WithErrorMessage("UserId is required.");
    }

    [Fact]
    public void Validate_WhenPhoneNumberIsEmpty_HasRequiredError()
    {
        var result = _validator.TestValidate(ValidCommand() with { PhoneNumber = "" });
        result
            .ShouldHaveValidationErrorFor(x => x.PhoneNumber)
            .WithErrorMessage("Phone number is required.");
    }

    [Fact]
    public void Validate_WhenPhoneNumberIsInvalid_HasFormatError()
    {
        var result = _validator.TestValidate(ValidCommand() with { PhoneNumber = "12345" });
        result
            .ShouldHaveValidationErrorFor(x => x.PhoneNumber)
            .WithErrorMessage("Phone number must be a valid Vietnamese phone number.");
    }

    [Fact]
    public void Validate_WhenPhoneNumberIsValid_HasNoError()
    {
        _validator
            .TestValidate(ValidCommand() with { PhoneNumber = "0987654321" })
            .ShouldNotHaveValidationErrorFor(x => x.PhoneNumber);
    }
}
