public class ForbiddenException : AppDomainException
{
    public ForbiddenException(string message, List<string>? errors = null)
        : base(message, 403, errors) { }
}
