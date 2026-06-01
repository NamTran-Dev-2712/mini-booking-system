namespace MiniBookingSystem.UnitTests.Application.Mentor.Validators;

public sealed class UpdateMentorStatusValidatorTests
{
    private readonly UpdateMentorStatusCommandValidator _validator = new();

    [Theory]
    [InlineData(true)]
    [InlineData(false)]
    public void Validate_WithValidId_PassesWithNoErrors(bool isActive)
    {
        var command = new UpdateMentorStatusCommand(MentorTestData.Valid.MentorId, isActive);
        _validator.TestValidate(command).ShouldNotHaveAnyValidationErrors();
    }

    [Fact]
    public void Validate_WhenIdIsEmpty_HasRequiredError()
    {
        var command = new UpdateMentorStatusCommand(Guid.Empty, IsActive: false);
        _validator
            .TestValidate(command)
            .ShouldHaveValidationErrorFor(x => x.Id)
            .WithErrorMessage("Id is required.");
    }
}
