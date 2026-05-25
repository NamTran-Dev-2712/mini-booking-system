using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MiniBookingSystem.UnitTests.Infrastructure.Seeds;

public class AdminSeederTests
{
    private readonly Mock<UserManager<ApplicationUser>> _userManagerMock;
    private readonly Mock<IBackgroundJobService> _backgroundJobServiceMock;
    private readonly Mock<ILogger<ApplicationDbContext>> _loggerMock;
    private readonly IConfiguration _configuration;
    private readonly IServiceProvider _serviceProvider;

    public AdminSeederTests()
    {
        _userManagerMock = UserManagerMockHelper.Create();
        _backgroundJobServiceMock = new Mock<IBackgroundJobService>();
        _loggerMock = new Mock<ILogger<ApplicationDbContext>>();

        _configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(
                new Dictionary<string, string?>
                {
                    ["AdminSettings:Email"] = "admin@test.com",
                    ["BaseUrl:Frontend"] = "http://localhost:5173",
                }
            )
            .Build();

        var services = new ServiceCollection();
        services.AddSingleton<UserManager<ApplicationUser>>(_userManagerMock.Object);
        services.AddSingleton<IConfiguration>(_configuration);
        services.AddSingleton<IBackgroundJobService>(_backgroundJobServiceMock.Object);
        services.AddSingleton<ILogger<ApplicationDbContext>>(_loggerMock.Object);

        _serviceProvider = services.BuildServiceProvider();
    }

    [Fact]
    public async Task SeedAsync_WhenNoAdminAndEmailConfigured_CreatesAdminAndEnqueuesEmail()
    {
        _userManagerMock
            .Setup(x => x.GetUsersInRoleAsync(ApplicationRoles.Admin))
            .ReturnsAsync(new List<ApplicationUser>());

        _userManagerMock
            .Setup(x => x.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()))
            .ReturnsAsync(IdentityResult.Success);

        _userManagerMock
            .Setup(x => x.AddToRoleAsync(It.IsAny<ApplicationUser>(), ApplicationRoles.Admin))
            .ReturnsAsync(IdentityResult.Success);

        await AdminSeeder.SeedAsync(_serviceProvider);

        _userManagerMock.Verify(
            x =>
                x.CreateAsync(
                    It.Is<ApplicationUser>(u =>
                        u.Email == "admin@test.com"
                        && u.FullName == "System Administrator"
                        && u.EmailConfirmed == true
                    ),
                    It.IsAny<string>()
                ),
            Times.Once
        );

        _userManagerMock.Verify(
            x => x.AddToRoleAsync(It.IsAny<ApplicationUser>(), ApplicationRoles.Admin),
            Times.Once
        );

        _backgroundJobServiceMock.Verify(
            x => x.Enqueue(It.IsAny<Expression<Func<IEmailJob, Task>>>()),
            Times.Once
        );
    }

    [Fact]
    public async Task SeedAsync_WhenAdminAlreadyExists_DoesNotCreateAnother()
    {
        _userManagerMock
            .Setup(x => x.GetUsersInRoleAsync(ApplicationRoles.Admin))
            .ReturnsAsync(new List<ApplicationUser> { new() { Email = "existing@admin.com" } });

        await AdminSeeder.SeedAsync(_serviceProvider);

        _userManagerMock.Verify(
            x => x.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()),
            Times.Never
        );
    }

    [Fact]
    public async Task SeedAsync_WhenEmailNotConfigured_SkipsGracefully()
    {
        var emptyConfig = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?> { ["AdminSettings:Email"] = "" })
            .Build();

        var services = new ServiceCollection();
        services.AddSingleton<UserManager<ApplicationUser>>(_userManagerMock.Object);
        services.AddSingleton<IConfiguration>(emptyConfig);
        services.AddSingleton<IBackgroundJobService>(_backgroundJobServiceMock.Object);
        services.AddSingleton<ILogger<ApplicationDbContext>>(_loggerMock.Object);

        var sp = services.BuildServiceProvider();

        await AdminSeeder.SeedAsync(sp);

        _userManagerMock.Verify(x => x.GetUsersInRoleAsync(It.IsAny<string>()), Times.Never);

        _userManagerMock.Verify(
            x => x.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()),
            Times.Never
        );
    }

    [Fact]
    public async Task SeedAsync_WhenUserCreationFails_LogsErrorAndDoesNotEnqueueEmail()
    {
        _userManagerMock
            .Setup(x => x.GetUsersInRoleAsync(ApplicationRoles.Admin))
            .ReturnsAsync(new List<ApplicationUser>());

        _userManagerMock
            .Setup(x => x.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()))
            .ReturnsAsync(
                IdentityResult.Failed(new IdentityError { Description = "Password too weak" })
            );

        await AdminSeeder.SeedAsync(_serviceProvider);

        _userManagerMock.Verify(
            x => x.AddToRoleAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()),
            Times.Never
        );

        _backgroundJobServiceMock.Verify(
            x => x.Enqueue(It.IsAny<Expression<Func<IEmailJob, Task>>>()),
            Times.Never
        );
    }

    [Fact]
    public async Task SeedAsync_WhenRoleAssignmentFails_RollsBackUserAndDoesNotEnqueueEmail()
    {
        _userManagerMock
            .Setup(x => x.GetUsersInRoleAsync(ApplicationRoles.Admin))
            .ReturnsAsync(new List<ApplicationUser>());

        _userManagerMock
            .Setup(x => x.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()))
            .ReturnsAsync(IdentityResult.Success);

        _userManagerMock
            .Setup(x => x.AddToRoleAsync(It.IsAny<ApplicationUser>(), ApplicationRoles.Admin))
            .ReturnsAsync(
                IdentityResult.Failed(new IdentityError { Description = "Role not found" })
            );

        _userManagerMock
            .Setup(x => x.DeleteAsync(It.IsAny<ApplicationUser>()))
            .ReturnsAsync(IdentityResult.Success);

        await AdminSeeder.SeedAsync(_serviceProvider);

        _userManagerMock.Verify(x => x.DeleteAsync(It.IsAny<ApplicationUser>()), Times.Once);

        _backgroundJobServiceMock.Verify(
            x => x.Enqueue(It.IsAny<Expression<Func<IEmailJob, Task>>>()),
            Times.Never
        );
    }
}
