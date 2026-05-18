public sealed class UploadOptions
{
    public string AvatarsPath { get; set; } = "uploads/avatars";
    public long MaxFileSizeBytes { get; set; } = 5 * 1024 * 1024;
    public string[] AllowedContentTypes { get; set; } = ["image/jpeg", "image/png", "image/webp"];
}
