using System.Security.Cryptography;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MiniBookingSystem.Application.Common.Constants;

public static class AdminSeeder
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
        var configuration = scope.ServiceProvider.GetRequiredService<IConfiguration>();
        var backgroundJobService =
            scope.ServiceProvider.GetRequiredService<IBackgroundJobService>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<ApplicationDbContext>>();

        var adminEmail = configuration[ConfigurationValue.AdminSettingsEmail];
        if (string.IsNullOrWhiteSpace(adminEmail))
        {
            logger.LogWarning("AdminSeeder: AdminSettings:Email is not configured. Skipping.");
            return;
        }

        var admins = await userManager.GetUsersInRoleAsync(ApplicationRoles.Admin);
        if (admins.Any())
        {
            logger.LogInformation("AdminSeeder: Admin user already exists. Skipping.");
            return;
        }

        var password = GenerateSecurePassword();

        var user = new ApplicationUser
        {
            FullName = "System Administrator",
            Email = adminEmail,
            UserName = adminEmail,
            EmailConfirmed = true,
            IsActive = true,
        };

        var createResult = await userManager.CreateAsync(user, password);
        if (!createResult.Succeeded)
        {
            logger.LogError(
                "AdminSeeder: Failed to create admin user: {Errors}",
                string.Join(", ", createResult.Errors.Select(e => e.Description))
            );
            return;
        }

        var roleResult = await userManager.AddToRoleAsync(user, ApplicationRoles.Admin);
        if (!roleResult.Succeeded)
        {
            await userManager.DeleteAsync(user);
            logger.LogError(
                "AdminSeeder: Failed to assign Admin role: {Errors}",
                string.Join(", ", roleResult.Errors.Select(e => e.Description))
            );
            return;
        }

        backgroundJobService.Enqueue<IEmailJob>(job =>
            job.SendAdminWelcomeEmailAsync(adminEmail, user.FullName, adminEmail, password)
        );

        logger.LogInformation(
            "AdminSeeder: Admin user created for {Email}. Welcome email enqueued.",
            adminEmail
        );
    }

    private static string GenerateSecurePassword()
    {
        const string uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const string lowercase = "abcdefghijklmnopqrstuvwxyz";
        const string digits = "0123456789";
        const string special = "!@#$%^&*";
        const string allChars = uppercase + lowercase + digits + special;

        var password = new char[16];
        var bytes = new byte[16];
        RandomNumberGenerator.Fill(bytes);

        password[0] = uppercase[bytes[0] % uppercase.Length];
        password[1] = lowercase[bytes[1] % lowercase.Length];
        password[2] = digits[bytes[2] % digits.Length];
        password[3] = special[bytes[3] % special.Length];

        for (var i = 4; i < 16; i++)
            password[i] = allChars[bytes[i] % allChars.Length];

        // Shuffle to avoid predictable positions
        var rng = RandomNumberGenerator.Create();
        var shuffleBytes = new byte[16];
        rng.GetBytes(shuffleBytes);
        for (var i = password.Length - 1; i > 0; i--)
        {
            var j = shuffleBytes[i] % (i + 1);
            (password[i], password[j]) = (password[j], password[i]);
        }

        return new string(password);
    }
}
