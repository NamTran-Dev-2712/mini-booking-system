using System.IdentityModel.Tokens.Jwt;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

[ApiController]
[Route("api/[controller]")]
public class BookingController : BaseApiController
{
    private readonly ISender _mediator;

    public BookingController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpPost()]
    [Authorize(Roles = "User")]
    [EnableRateLimiting(CacheKeys.BookingRateLimitPolicy)]
    public async Task<IActionResult> CreateBooking(
        CreateBookingCommand command,
        CancellationToken cancellationToken
    )
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub);
        if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
            return FailureResponse<Guid>(401, "Invalid user ID in token.");

        if (userId != command.UserId)
            return FailureResponse<Guid>(403, "You can only create bookings for your own account.");

        var idempotencyKey = Request.Headers["Idempotency-Key"].FirstOrDefault();
        var commandWithKey = command with { IdempotencyKey = idempotencyKey };

        var result = await _mediator.Send(commandWithKey, cancellationToken);
        return CreatedResponse(result, "Booking created successfully");
    }

    [HttpPost("cancel")]
    [Authorize(Roles = "User")]
    [EnableRateLimiting(CacheKeys.BookingRateLimitPolicy)]
    public async Task<IActionResult> CancelBooking(
        CancelBookingCommand command,
        CancellationToken cancellationToken
    )
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub);
        if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
            return FailureResponse<Guid>(401, "Invalid user ID in token.");

        if (userId != command.UserId)
            return FailureResponse<Guid>(403, "You can only cancel your own bookings.");

        // Note: For cancellation, we allow users to cancel their own bookings. The command handler will verify ownership.
        var result = await _mediator.Send(command, cancellationToken);
        return OkResponse(result, "Booking cancelled successfully");
    }
}
