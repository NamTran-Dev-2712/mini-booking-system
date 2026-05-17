using System.IdentityModel.Tokens.Jwt;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : BaseApiController
{
    private readonly ISender _mediator;

    public DashboardController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("admin")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAdminDashboard(
        [FromQuery] int months = 6,
        CancellationToken cancellationToken = default
    )
    {
        var query = new GetAdminDashboardQuery(months);
        var result = await _mediator.Send(query, cancellationToken);
        return OkResponse(result);
    }

    [HttpGet("mentor")]
    [Authorize(Roles = "Mentor")]
    public async Task<IActionResult> GetMentorDashboard(
        [FromQuery] int months = 6,
        CancellationToken cancellationToken = default
    )
    {
        var userId = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;

        if (string.IsNullOrEmpty(userId))
            throw new UnauthorizedException("User ID claim is missing");

        var query = new GetMentorDashboardQuery(Guid.Parse(userId), months);
        var result = await _mediator.Send(query, cancellationToken);
        return OkResponse(result);
    }

    [HttpGet("user")]
    [Authorize(Roles = "User")]
    public async Task<IActionResult> GetUserDashboard(
        [FromQuery] int months = 6,
        CancellationToken cancellationToken = default
    )
    {
        var userId = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;

        if (string.IsNullOrEmpty(userId))
            throw new UnauthorizedException("User ID claim is missing");

        var query = new GetUserDashboardQuery(Guid.Parse(userId), months);
        var result = await _mediator.Send(query, cancellationToken);
        return OkResponse(result);
    }
}
