using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/health")]
public class HealthCheckController : BaseApiController
{
    [HttpGet]
    public IActionResult Get()
    {
        return OkResponse(new { status = "Healthy" }, "API is healthy");
    }

    [HttpGet("check-request-error")]
    public IActionResult CheckRequestError()
    {
        var random = new Random();

        var errorType = random.Next(6);

        if (errorType == 0)
            throw new NotFoundException("User", "Id");
        else if (errorType == 1)
            throw new BadRequestException("This is a bad request error for testing purposes");
        else if (errorType == 2)
            throw new ConflictException("This is a conflict error for testing purposes");
        else if (errorType == 3)
            throw new UnauthorizedException("This is an unauthorized error for testing purposes");
        else if (errorType == 4)
            throw new ForbiddenException("This is a forbidden error for testing purposes");

        return OkResponse(new { status = "Healthy" }, "API is healthy");
    }
}
