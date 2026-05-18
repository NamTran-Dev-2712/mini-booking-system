using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

public sealed class LocalFileStorageService : IFileStorageService
{
    private readonly UploadOptions _options;
    private readonly string _basePath;
    private readonly string _baseUrl;
    private readonly ILogger<LocalFileStorageService> _logger;

    public LocalFileStorageService(
        IOptions<UploadOptions> options,
        IConfiguration configuration,
        ILogger<LocalFileStorageService> logger
    )
    {
        _options = options.Value;
        _logger = logger;
        _baseUrl = configuration[ConfigurationValue.BaseUrlApi] ?? "http://localhost:5296";

        _basePath = Path.IsPathRooted(_options.AvatarsPath)
            ? _options.AvatarsPath
            : Path.Combine(Directory.GetCurrentDirectory(), _options.AvatarsPath);

        Directory.CreateDirectory(_basePath);
    }

    public async Task<string> UploadAvatarAsync(
        Stream stream,
        string contentType,
        CancellationToken cancellationToken = default
    )
    {
        if (!_options.AllowedContentTypes.Contains(contentType))
            throw new BadRequestException(
                $"File type '{contentType}' is not allowed. Allowed types: {string.Join(", ", _options.AllowedContentTypes)}"
            );

        var extension = contentType switch
        {
            "image/jpeg" => ".jpg",
            "image/png" => ".png",
            "image/webp" => ".webp",
            _ => throw new BadRequestException("Unsupported file type."),
        };

        var fileName = $"{Guid.NewGuid()}{extension}";
        var filePath = Path.Combine(_basePath, fileName);

        await using var fileStream = File.Create(filePath);
        await stream.CopyToAsync(fileStream, cancellationToken);

        _logger.LogInformation("Avatar uploaded: {FileName}", fileName);

        return $"{_baseUrl}/uploads/avatars/{fileName}";
    }

    public void DeleteAvatar(string fileName)
    {
        var filePath = Path.Combine(_basePath, fileName);
        if (File.Exists(filePath))
        {
            File.Delete(filePath);
            _logger.LogInformation("Avatar deleted: {FileName}", fileName);
        }
    }
}
