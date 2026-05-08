using System.IdentityModel.Tokens.Jwt;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AiController : BaseApiController
{
    private readonly ISender _mediator;

    public AiController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("chat")]
    [EnableRateLimiting(CacheKeys.AiRateLimitPolicy)]
    [Authorize]
    public async Task<IActionResult> Chat(
        [FromBody] AiChatRequest request,
        CancellationToken cancellationToken
    )
    {
        var userIdClaim = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
        if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
            return FailureResponse<AiChatResponse>(401, "Invalid user ID in token.");

        var command = new SendAiMessageCommand(userId, request.Message, request.ConversationId);
        var result = await _mediator.Send(command, cancellationToken);

        return OkResponse(result);
    }
}
