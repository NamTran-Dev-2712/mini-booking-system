using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

[ApiController]
[Route("api/[controller]")]
public class AuthController : BaseApiController
{
    private readonly ISender _mediator;

    public AuthController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(
        RegisterCommand command,
        CancellationToken cancellationToken
    )
    {
        var result = await _mediator.Send(command, cancellationToken);
        return CreatedResponse(result, "User registered successfully");
    }

    [HttpPost("login")]
    [EnableRateLimiting(CacheKeys.AuthRateLimitPolicy)]
    public async Task<IActionResult> Login(
        LoginCommand command,
        CancellationToken cancellationToken
    )
    {
        var authResult = await _mediator.Send(command, cancellationToken);

        SetAuthCookie(
            authResult.AccessToken,
            authResult.RefreshToken,
            authResult.ExpiresIn,
            authResult.RefreshTokenExpiresAt
        );

        authResult = authResult with { AccessToken = string.Empty, RefreshToken = string.Empty };

        return OkResponse(authResult);
    }

    [HttpGet("profile")]
    [Authorize]
    public async Task<IActionResult> GetProfile(CancellationToken cancellationToken)
    {
        var userId = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;

        if (string.IsNullOrEmpty(userId))
        {
            throw new UnauthorizedException("User ID claim is missing");
        }

        var query = new GetProfileQuery(Guid.Parse(userId));
        var userProfile = await _mediator.Send(query, cancellationToken);

        return OkResponse(userProfile);
    }

    [HttpPost("refresh")]
    [EnableRateLimiting(CacheKeys.AuthRateLimitPolicy)]
    public async Task<IActionResult> Refresh(CancellationToken cancellationToken)
    {
        var refreshToken = Request.Cookies["refresh_token"];

        if (string.IsNullOrEmpty(refreshToken))
        {
            throw new BadRequestException("Refresh token is missing");
        }

        var authResult = await _mediator.Send(
            new RefreshTokenCommand(refreshToken),
            cancellationToken
        );

        SetAuthCookie(
            authResult.AccessToken,
            authResult.RefreshToken,
            authResult.ExpiresIn,
            authResult.RefreshTokenExpiresAt
        );

        authResult = authResult with { AccessToken = string.Empty, RefreshToken = string.Empty };

        return OkResponse(authResult);
    }

    [HttpPut("profile")]
    [Authorize]
    public async Task<IActionResult> UpdateProfile(
        UpdateProfileRequest request,
        CancellationToken cancellationToken
    )
    {
        var userId = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;

        if (string.IsNullOrEmpty(userId))
        {
            throw new UnauthorizedException("User ID claim is missing");
        }

        var roles = User.FindAll(ClaimTypes.Role).Select(c => c.Value);

        var command = new UpdateProfileCommand(
            Guid.Parse(userId),
            roles,
            request.FullName,
            request.PhoneNumber,
            request.DisplayName,
            request.Bio,
            request.Specialization,
            request.ExperienceYears,
            request.BasePrice,
            request.AvatarUrl
        );

        await _mediator.Send(command, cancellationToken);

        return OkResponse<object>(null!, "Profile updated successfully");
    }

    [HttpPost("logout")]
    [EnableRateLimiting(CacheKeys.AuthRateLimitPolicy)]
    public async Task<IActionResult> Logout(CancellationToken cancellationToken)
    {
        ClearAuthCookies();

        return NoContentResponse("Logged out successfully");
    }

    [HttpPost("change-password")]
    [Authorize]
    public async Task<IActionResult> ChangePassword(
        ChangePasswordRequest request,
        CancellationToken cancellationToken
    )
    {
        var userId = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;

        if (string.IsNullOrEmpty(userId))
            throw new UnauthorizedException("User ID claim is missing");

        var command = new ChangePasswordCommand(
            Guid.Parse(userId),
            request.CurrentPassword,
            request.NewPassword
        );

        await _mediator.Send(command, cancellationToken);

        ClearAuthCookies();

        return OkResponse<object>(null!, "Password changed successfully. Please login again.");
    }

    [HttpPost("forgot-password")]
    [EnableRateLimiting(CacheKeys.AuthRateLimitPolicy)]
    public async Task<IActionResult> ForgotPassword(
        ForgotPasswordCommand command,
        CancellationToken cancellationToken
    )
    {
        await _mediator.Send(command, cancellationToken);

        return OkResponse<object>(
            null!,
            "If an account exists with this email, you will receive a password reset link shortly."
        );
    }

    [HttpPost("reset-password")]
    [EnableRateLimiting(CacheKeys.AuthRateLimitPolicy)]
    public async Task<IActionResult> ResetPassword(
        ResetPasswordCommand command,
        CancellationToken cancellationToken
    )
    {
        await _mediator.Send(command, cancellationToken);

        return OkResponse<object>(null!, "Password has been reset successfully.");
    }

    [HttpPost("avatar")]
    [EnableRateLimiting(CacheKeys.AuthRateLimitPolicy)]
    [RequestSizeLimit(5 * 1024 * 1024)]
    public async Task<IActionResult> UploadAvatar(
        IFormFile file,
        [FromServices] IFileStorageService fileStorageService,
        [FromServices] Microsoft.Extensions.Options.IOptions<UploadOptions> uploadOptions,
        CancellationToken cancellationToken
    )
    {
        var options = uploadOptions.Value;

        if (file.Length == 0)
            throw new BadRequestException("File is empty.");

        if (file.Length > options.MaxFileSizeBytes)
            throw new BadRequestException(
                $"File size exceeds the maximum allowed size of {options.MaxFileSizeBytes / (1024 * 1024)}MB."
            );

        if (!options.AllowedContentTypes.Contains(file.ContentType))
            throw new BadRequestException($"File type '{file.ContentType}' is not allowed.");

        await using var stream = file.OpenReadStream();
        var avatarUrl = await fileStorageService.UploadAvatarAsync(
            stream,
            file.ContentType,
            cancellationToken
        );

        return OkResponse(new { avatarUrl });
    }
}
