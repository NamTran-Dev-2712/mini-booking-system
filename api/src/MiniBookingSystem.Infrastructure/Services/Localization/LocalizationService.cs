using Microsoft.Extensions.Localization;

public class LocalizationService : ILocalizationService
{
    private readonly IStringLocalizerFactory _factory;
    private readonly string _baseName;
    private readonly string _location;

    public LocalizationService(IStringLocalizerFactory factory)
    {
        _factory = factory;
        _location = typeof(SharedResource).Assembly.GetName().Name!;
        _baseName = "SharedResource";
    }

    public string GetMessage(string key)
    {
        var localizer = _factory.Create(_baseName, _location);
        var result = localizer[key];
        return result.ResourceNotFound ? key : result.Value;
    }

    public string GetMessage(string key, params object[] args)
    {
        var localizer = _factory.Create(_baseName, _location);
        var result = localizer[key, args];
        return result.ResourceNotFound ? key : result.Value;
    }
}
