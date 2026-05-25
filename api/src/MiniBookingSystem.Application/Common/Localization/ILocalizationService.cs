public interface ILocalizationService
{
    string GetMessage(string key);
    string GetMessage(string key, params object[] args);
}
