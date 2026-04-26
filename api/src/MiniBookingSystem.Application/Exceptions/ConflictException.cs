public class ConflictException : AppDomainException
{
    public ConflictException(string message, List<string>? errors = null)
        : base(message, 409, errors) { }
}
