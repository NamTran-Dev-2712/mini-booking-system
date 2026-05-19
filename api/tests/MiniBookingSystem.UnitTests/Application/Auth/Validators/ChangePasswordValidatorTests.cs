using FluentValidation.TestHelper;

namespace MiniBookingSystem.UnitTests.Application.Auth.Validators;

public sealed class ChangePasswordValidatorTests
{
    private readonly ChangePasswordValidator _validator = new();

    [Fact]
    public void Validate_WithValidData_PassesWithNoErrors()
    {
        var command = new ChangePasswordCommand(Guid.NewGuid(), "OldPass@123", "NewPass@456");
        _validator.TestValidate(command).ShouldNotHaveAnyValidationErrors();
    }

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    public void Validate_WhenCurrentPasswordEmpty_HasError(string currentPassword)
    {
        var command = new ChangePasswordCommand(Guid.NewGuid(), currentPassword, "NewPass@456");
        _validator
            .TestValidate(command)
            .ShouldHaveValidationErrorFor(x => x.CurrentPassword)
            .WithErrorMessage("Current password is required.");
    }

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    public void Validate_WhenNewPasswordEmpty_HasError(string newPassword)
    {
        var command = new ChangePasswordCommand(Guid.NewGuid(), "OldPass@123", newPassword);
        _validator.TestValidate(command).ShouldHaveValidationErrorFor(x => x.NewPassword);
    }

    [Theory]
    [InlineData("short1!")]
    [InlineData("Ab1@xyz")]
    public void Validate_WhenNewPasswordTooShort_HasError(string newPassword)
    {
        var command = new ChangePasswordCommand(Guid.NewGuid(), "OldPass@123", newPassword);
        _validator
            .TestValidate(command)
            .ShouldHaveValidationErrorFor(x => x.NewPassword)
            .WithErrorMessage("New password must be at least 8 characters long.");
    }

    [Theory]
    [InlineData("alllowercase1@")]
    [InlineData("ALLUPPERCASE1@")]
    [InlineData("NoSpecialChar1")]
    [InlineData("NoDigitHere!@A")]
    public void Validate_WhenNewPasswordNotStrong_HasError(string newPassword)
    {
        var command = new ChangePasswordCommand(Guid.NewGuid(), "OldPass@123", newPassword);
        _validator.TestValidate(command).ShouldHaveValidationErrorFor(x => x.NewPassword);
    }

    [Fact]
    public void Validate_WhenNewPasswordSameAsCurrent_HasError()
    {
        var command = new ChangePasswordCommand(Guid.NewGuid(), "SamePass@123", "SamePass@123");
        _validator
            .TestValidate(command)
            .ShouldHaveValidationErrorFor(x => x.NewPassword)
            .WithErrorMessage("New password must be different from current password.");
    }
}
