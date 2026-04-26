public class NotFoundException : AppDomainException
{
    public NotFoundException(string entityName, object key)
        : base($"Entity '{entityName}' ({key}) was not found.", 404) { }
}
