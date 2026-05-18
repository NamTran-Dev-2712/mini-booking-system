using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

public class UserRepository : IUserRepository
{
    private readonly UserManager<ApplicationUser> _userManager;

    public UserRepository(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<Guid> DeleteUserAsync(
        Guid userId,
        CancellationToken cancellationToken = default
    )
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        if (user is null)
            throw new NotFoundException("User", userId.ToString());

        var tombstone = $"deleted_{Guid.NewGuid():N}@deleted.local";
        user.IsDeleted = true;
        user.DeletedAt = DateTime.UtcNow;
        user.UpdatedAt = DateTime.UtcNow;
        user.Email = tombstone;
        user.UserName = tombstone; // UserName = Email at registration, must update both

        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(e => e.Description).ToList();
            throw new BadRequestException("Failed to delete user.", errors);
        }

        return userId;
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
            u => u.PhoneNumber == phoneNumber && !u.IsDeleted,
            cancellationToken
        );
    }

    public async Task<bool> IsPhoneNumberTakenAsync(
        string phoneNumber,
        Guid? excludeUserId,
        CancellationToken cancellationToken = default
    )
    {
        return await _userManager.Users.AnyAsync(
            u =>
                u.PhoneNumber == phoneNumber
                && (excludeUserId == null || u.Id != excludeUserId)
                && !u.IsDeleted,
            cancellationToken
        );
    }

    public async Task<Guid> UpdateRoleAsync(
        Guid userId,
        string newRole,
        CancellationToken cancellationToken = default
    )
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        if (user is null)
            throw new NotFoundException("User", userId.ToString());

        var result = await _userManager.RemoveFromRolesAsync(
            user,
            await _userManager.GetRolesAsync(user)
        );
        if (!result.Succeeded)
            throw new BadRequestException("Failed to remove user from existing roles.");

        result = await _userManager.AddToRoleAsync(user, newRole);
        if (!result.Succeeded)
            throw new BadRequestException("Failed to add user to new role.");

        return userId;
    }

    public async Task UpdateUserAsync(
        Guid userId,
        string? fullName,
        string? phoneNumber,
        CancellationToken cancellationToken = default
    )
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        if (user is null)
            throw new NotFoundException("User", userId.ToString());

        if (phoneNumber is not null)
        {
            var phoneExists = await _userManager.Users.AnyAsync(
                u => u.PhoneNumber == phoneNumber && u.Id != userId,
                cancellationToken
            );
            if (phoneExists)
                throw new ConflictException("Phone number is already registered.");

            user.PhoneNumber = phoneNumber;
        }

        if (fullName is not null)
            user.FullName = fullName;

        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(e => e.Description).ToList();
            throw new BadRequestException("Failed to update user.", errors);
        }
    }

    public async Task<int> CountActiveAsync(CancellationToken cancellationToken = default)
    {
        return await _userManager.Users.CountAsync(u => !u.IsDeleted, cancellationToken);
    }

    public async Task<UserBasicInfo?> FindByEmailAsync(
        string email,
        CancellationToken cancellationToken = default
    )
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user is null || user.IsDeleted)
            return null;

        return new UserBasicInfo(user.Id, user.FullName, user.Email!);
    }

    public async Task UpdateAvatarAsync(
        Guid userId,
        string avatarUrl,
        CancellationToken cancellationToken = default
    )
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        if (user is null)
            throw new NotFoundException("User", userId.ToString());

        user.AvatarUrl = avatarUrl;
        user.UpdatedAt = DateTime.UtcNow;

        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(e => e.Description).ToList();
            throw new BadRequestException("Failed to update avatar.", errors);
        }
    }
}
