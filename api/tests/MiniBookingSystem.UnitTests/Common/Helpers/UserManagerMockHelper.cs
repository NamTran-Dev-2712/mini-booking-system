using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace MiniBookingSystem.UnitTests.Common.Helpers;

/// <summary>
/// Factory that creates a properly configured <see cref="Mock{UserManager}"/> for unit tests.
/// UserManager has a non-trivial constructor — this helper centralises that boilerplate.
/// </summary>
internal static class UserManagerMockHelper
{
    public static Mock<UserManager<ApplicationUser>> Create()
    {
        var store = new Mock<IUserStore<ApplicationUser>>();

        var options = new Mock<IOptions<IdentityOptions>>();
        options.Setup(o => o.Value).Returns(new IdentityOptions());

        var mock = new Mock<UserManager<ApplicationUser>>(
            store.Object,
            options.Object,
            new Mock<IPasswordHasher<ApplicationUser>>().Object,
            Array.Empty<IUserValidator<ApplicationUser>>(),
            Array.Empty<IPasswordValidator<ApplicationUser>>(),
            new Mock<ILookupNormalizer>().Object,
            new Mock<IdentityErrorDescriber>().Object,
            new Mock<IServiceProvider>().Object,
            new Mock<ILogger<UserManager<ApplicationUser>>>().Object
        );

        // Allow unrestricted mocking of virtual members
        mock.CallBase = false;

        return mock;
    }
}
