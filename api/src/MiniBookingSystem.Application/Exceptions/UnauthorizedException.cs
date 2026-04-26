public class UnauthorizedException : AppDomainException
{
    public UnauthorizedException(string message, List<string>? errors = null)
        : base(message, 401, errors) { }
}
