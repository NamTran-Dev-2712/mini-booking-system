public interface IUserRepository
{
    Task<bool> IsEmailTakenAsync(string email, CancellationToken cancellationToken = default);
    Task<bool> IsPhoneNumberTakenAsync(
        string phoneNumber,
        CancellationToken cancellationToken = default
    );
    Task<bool> IsPhoneNumberTakenAsync(
        string phoneNumber,
        Guid? excludeUserId,
        CancellationToken cancellationToken = default
    );
    Task<UserBasicInfo?> FindByEmailAsync(
        string email,
        CancellationToken cancellationToken = default
    );
    Task UpdateAvatarAsync(
        Guid userId,
        string avatarUrl,
        CancellationToken cancellationToken = default
    );
    Task UpdateUserAsync(
        Guid userId,
        string? fullName,
        string? phoneNumber,
        CancellationToken cancellationToken = default
    );
    Task<Guid> DeleteUserAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<Guid> UpdateRoleAsync(
        Guid userId,
        string newRole,
        CancellationToken cancellationToken = default
    );
    Task<int> CountActiveAsync(CancellationToken cancellationToken = default);
}
