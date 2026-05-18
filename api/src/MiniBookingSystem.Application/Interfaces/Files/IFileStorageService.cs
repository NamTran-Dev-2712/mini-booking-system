public interface IFileStorageService
{
    Task<string> UploadAvatarAsync(
        Stream stream,
        string contentType,
        CancellationToken cancellationToken = default
    );
    void DeleteAvatar(string fileName);
}
