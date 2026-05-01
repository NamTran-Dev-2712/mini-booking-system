using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public abstract class BaseApiController : ControllerBase
{
    protected IActionResult OkResponse<T>(T data, string message = "Success")
    {
        return Ok(ApiResponse<T>.Ok(data, message));
    }

    protected IActionResult CreatedResponse<T>(T data, string message = "Created successfully")
    {
        return StatusCode(201, ApiResponse<T>.Created(data, message));
    }

    protected IActionResult NoContentResponse(string message = "No content")
    {
        return StatusCode(200, ApiResponse<object>.NoContent(message));
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
