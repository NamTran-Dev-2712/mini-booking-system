using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

[ApiController]
[Route("api/[controller]")]
public abstract class BaseApiController : ControllerBase
{
    private ILocalizationService? _localizer;
    protected ILocalizationService Localizer =>
        _localizer ??= HttpContext.RequestServices.GetRequiredService<ILocalizationService>();

    protected IActionResult OkResponse<T>(T data, string messageKey = "Response.Success")
    {
        return Ok(ApiResponse<T>.Ok(data, Localizer.GetMessage(messageKey)));
    }

    protected IActionResult CreatedResponse<T>(T data, string messageKey = "Response.Created")
    {
        return StatusCode(201, ApiResponse<T>.Created(data, Localizer.GetMessage(messageKey)));
    }

    protected IActionResult NoContentResponse(string messageKey = "Response.NoContent")
    {
        return StatusCode(200, ApiResponse<object>.NoContent(Localizer.GetMessage(messageKey)));
    }

    public IActionResult FailureResponse<T>(
        int statusCode,
        string message,
        List<string>? errors = null
    )
    {
        return StatusCode(statusCode, ApiResponse<T>.Failure(statusCode, message, errors));
    }

    protected void SetAuthCookie(
        string accessToken,
        string refreshToken,
        DateTime accessTokenExpiresAt,
        DateTime refreshTokenExpiresAt
    )
    {
        // SameSite=None yêu cầu Secure=true (HTTPS). Khi chạy HTTP (dev), dùng Lax để tránh bị từ chối.
        var isHttps = Request.IsHttps;
        var sameSite = isHttps ? SameSiteMode.None : SameSiteMode.Lax;

        Response.Cookies.Append(
            "access_token",
            accessToken,
            new CookieOptions
            {
                HttpOnly = true,
                Secure = isHttps,
                SameSite = sameSite,
                Expires = accessTokenExpiresAt,
            }
        );

        Response.Cookies.Append(
            "refresh_token",
            refreshToken,
            new CookieOptions
            {
                HttpOnly = true,
                Secure = isHttps,
                SameSite = sameSite,
                Expires = refreshTokenExpiresAt,
            }
        );
    }

    protected void ClearAuthCookies()
    {
        Response.Cookies.Delete("access_token");
        Response.Cookies.Delete("refresh_token");
    }
}
