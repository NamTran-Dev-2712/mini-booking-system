public interface IUserRepository
{
    Task<bool> IsEmailTakenAsync(string email, CancellationToken cancellationToken = default);
    Task<bool> IsPhoneNumberTakenAsync(
        string phoneNumber,
        CancellationToken cancellationToken = default
    );
}
