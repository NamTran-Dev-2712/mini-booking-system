public class AiServiceException : AppDomainException
{
    public AiServiceException(string message)
        : base(message, 503) { }
}
