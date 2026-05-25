public static class DatabaseSeeder
{
    public static async Task SeedAllAsync(IServiceProvider serviceProvider)
    {
        // 1. Roles must exist before any user/mentor can be assigned roles.
        await RoleSeeder.SeedAsync(serviceProvider);

        // 2. Admin user — depends on roles being present.
        await AdminSeeder.SeedAsync(serviceProvider);

        // 3. Mentor test data — depends on roles being present.
        // await MentorSeeder.SeedAsync(serviceProvider);
    }
}
