using System.IdentityModel.Tokens.Jwt;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.AspNetCore.RateLimiting;

[ApiController]
[Route("api/[controller]")]
public class BookingController : BaseApiController
{
    private readonly ISender _mediator;
    private readonly IOutputCacheStore _cacheStore;

    public BookingController(ISender mediator, IOutputCacheStore cacheStore)
    {
        _mediator = mediator;
        _cacheStore = cacheStore;
    }

    private async Task EvictBookingListCache(CancellationToken cancellationToken)
    {
        await _cacheStore.EvictByTagAsync(CacheKeys.BookingUserListTag, cancellationToken);
        await _cacheStore.EvictByTagAsync(CacheKeys.BookingAdminListTag, cancellationToken);
    }

    [HttpGet("{userId:guid}")]
    [Authorize(Roles = "User")]
    [OutputCache(PolicyName = CacheKeys.BookingUserListPolicy)]
    public async Task<IActionResult> GetUserBookings(
        Guid userId,
        [FromQuery] GetUserBookingQuery query,
        CancellationToken cancellationToken
    )
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub);
        if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var tokenUserId))
            return FailureResponse<PaginatedResult<BookingDto>>(401, "Invalid user ID in token.");

        if (tokenUserId != userId)
            return FailureResponse<PaginatedResult<BookingDto>>(
                403,
                "You can only view your own bookings."
            );

        var queryWithUserId = query with { UserId = userId };
        var result = await _mediator.Send(queryWithUserId, cancellationToken);
        return OkResponse(result, "User bookings retrieved successfully");
    }

    [HttpGet("{bookingId:guid}/detail")]
    [Authorize(Roles = "User, Admin")]
    public async Task<IActionResult> GetBookingDetail(
        Guid bookingId,
        CancellationToken cancellationToken
    )
    {
        var result = await _mediator.Send(new GetBookingDetailQuery(bookingId), cancellationToken);

        // Users can only view their own bookings
        if (User.IsInRole(Roles.User))
        {
            var userIdClaim = User.Claims.FirstOrDefault(c =>
                c.Type == JwtRegisteredClaimNames.Sub
            );
            if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var tokenUserId))
                return FailureResponse<BookingDto>(401, "Invalid user ID in token.");

            if (result.UserId != tokenUserId)
                return FailureResponse<BookingDto>(403, "You can only view your own bookings.");
        }

        return OkResponse(result, "Booking detail retrieved successfully");
    }

    [HttpGet("admin")]
    [Authorize(Roles = "Admin")]
    [OutputCache(PolicyName = CacheKeys.BookingAdminListPolicy)]
    public async Task<IActionResult> GetAllBookings(
        [FromQuery] GetAllBookingsQuery query,
        CancellationToken cancellationToken
    )
    {
        var result = await _mediator.Send(query, cancellationToken);
        return OkResponse(result, "All bookings retrieved successfully");
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
        await EvictBookingListCache(cancellationToken);
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

        var result = await _mediator.Send(command, cancellationToken);
        await EvictBookingListCache(cancellationToken);
        return OkResponse(result, "Booking cancelled successfully");
    }
}
