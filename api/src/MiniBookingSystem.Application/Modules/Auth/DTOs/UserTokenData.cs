public sealed class UserTokenData
{
    public Guid UserId { get; init; }
    public string Email { get; init; } = default!;
    public string FullName { get; init; } = default!;
    public IEnumerable<string> Roles { get; init; } = [];
}
