using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace MiniBookingSystem.UnitTests.Infrastructure.Services;

public sealed class LocalFileStorageServiceTests
{
    private readonly string _testDir;
    private readonly LocalFileStorageService _sut;

    public LocalFileStorageServiceTests()
    {
        _testDir = Path.Combine(Path.GetTempPath(), $"avatar_test_{Guid.NewGuid():N}");
        Directory.CreateDirectory(_testDir);

        var options = Options.Create(
            new UploadOptions
            {
                AvatarsPath = _testDir,
                MaxFileSizeBytes = 5 * 1024 * 1024,
                AllowedContentTypes = ["image/jpeg", "image/png", "image/webp"],
            }
        );

        var configuration = new Mock<IConfiguration>();
        configuration.Setup(c => c[ConfigurationValue.BaseUrlApi]).Returns("http://localhost:5296");

        var logger = new Mock<ILogger<LocalFileStorageService>>();

        _sut = new LocalFileStorageService(options, configuration.Object, logger.Object);
    }

    [Theory]
    [InlineData("image/jpeg", ".jpg")]
    [InlineData("image/png", ".png")]
    [InlineData("image/webp", ".webp")]
    public async Task UploadAvatarAsync_WithValidContentType_SavesFileAndReturnsUrl(
        string contentType,
        string expectedExtension
    )
    {
        // Arrange
        var content = new byte[] { 0x89, 0x50, 0x4E, 0x47 };
        using var stream = new MemoryStream(content);

        // Act
        var result = await _sut.UploadAvatarAsync(stream, contentType);

        // Assert
        result.Should().StartWith("http://localhost:5296/uploads/avatars/");
        result.Should().EndWith(expectedExtension);

        var fileName = result.Split('/').Last();
        var filePath = Path.Combine(_testDir, fileName);
        File.Exists(filePath).Should().BeTrue();

        // Cleanup
        File.Delete(filePath);
    }

    [Fact]
    public async Task UploadAvatarAsync_WithUnsupportedContentType_ThrowsBadRequestException()
    {
        // Arrange
        using var stream = new MemoryStream([0x00]);

        // Act
        var act = () => _sut.UploadAvatarAsync(stream, "application/pdf");

        // Assert
        await act.Should().ThrowAsync<BadRequestException>();
    }

    [Fact]
    public async Task UploadAvatarAsync_GeneratesUniqueFileNames()
    {
        // Arrange
        using var stream1 = new MemoryStream([0x01]);
        using var stream2 = new MemoryStream([0x02]);

        // Act
        var url1 = await _sut.UploadAvatarAsync(stream1, "image/jpeg");
        var url2 = await _sut.UploadAvatarAsync(stream2, "image/jpeg");

        // Assert
        url1.Should().NotBe(url2);

        // Cleanup
        File.Delete(Path.Combine(_testDir, url1.Split('/').Last()));
        File.Delete(Path.Combine(_testDir, url2.Split('/').Last()));
    }

    [Fact]
    public void DeleteAvatar_WhenFileExists_DeletesFile()
    {
        // Arrange
        var fileName = "test-delete.jpg";
        var filePath = Path.Combine(_testDir, fileName);
        File.WriteAllBytes(filePath, [0x01]);

        // Act
        _sut.DeleteAvatar(fileName);

        // Assert
        File.Exists(filePath).Should().BeFalse();
    }

    [Fact]
    public void DeleteAvatar_WhenFileDoesNotExist_DoesNotThrow()
    {
        // Act & Assert
        var act = () => _sut.DeleteAvatar("nonexistent.jpg");
        act.Should().NotThrow();
    }
}
