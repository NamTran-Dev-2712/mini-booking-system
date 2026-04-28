using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

public class UserRepository : IUserRepository
{
    private readonly UserManager<ApplicationUser> _userManager;

    public UserRepository(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<bool> IsEmailTakenAsync(
        string email,
        CancellationToken cancellationToken = default
    )
    {
        var user = await _userManager.FindByEmailAsync(email);
        return user is not null;
    }

    public async Task<bool> IsPhoneNumberTakenAsync(
        string phoneNumber,
        CancellationToken cancellationToken = default
    )
    {
        return await _userManager.Users.AnyAsync(
            u => u.PhoneNumber == phoneNumber,
            cancellationToken
        );
    }
}
