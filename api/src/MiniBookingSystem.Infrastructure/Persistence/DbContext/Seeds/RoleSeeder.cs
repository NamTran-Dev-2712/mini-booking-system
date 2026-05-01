using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MiniBookingSystem.Application.Common.Constants;

public static class RoleSeeder
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var roleManager = scope.ServiceProvider.GetRequiredService<
            RoleManager<IdentityRole<Guid>>
        >();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<ApplicationDbContext>>();

        foreach (var roleName in ApplicationRoles.All)
        {
            if (await roleManager.RoleExistsAsync(roleName))
                continue;

            var result = await roleManager.CreateAsync(new IdentityRole<Guid>(roleName));

            if (result.Succeeded)
                logger.LogInformation("RoleSeeder: Role '{RoleName}' created.", roleName);
            else
                logger.LogError(
                    "RoleSeeder: Failed to create role '{RoleName}': {Errors}",
                    roleName,
                    string.Join(", ", result.Errors.Select(e => e.Description))
                );
        }
    }
}
