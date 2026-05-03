public sealed class CacheOptions
{
    public string ConnectionString { get; init; } = string.Empty;
    public string InstanceName { get; init; } = "booking:dev:";
    public int DefaultTtlMinutes { get; init; } = 10;
}
