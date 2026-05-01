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
}
