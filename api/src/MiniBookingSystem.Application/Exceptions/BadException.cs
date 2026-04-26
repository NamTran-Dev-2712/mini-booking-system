public class BadRequestException : AppDomainException
{
    public BadRequestException(string message, List<string>? errors = null)
        : base(message, 400, errors) { }
}
