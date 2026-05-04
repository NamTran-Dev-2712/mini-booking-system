using System.IdentityModel.Tokens.Jwt;
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

    [HttpPost("logout")]
    [EnableRateLimiting(CacheKeys.AuthRateLimitPolicy)]
    public async Task<IActionResult> Logout(CancellationToken cancellationToken)
    {
        ClearAuthCookies();

        return NoContentResponse("Logged out successfully");
    }
}
