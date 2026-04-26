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
}
