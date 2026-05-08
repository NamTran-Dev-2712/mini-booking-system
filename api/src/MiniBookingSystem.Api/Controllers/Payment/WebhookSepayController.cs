using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

[ApiController]
[Route("api/webhooks/sepay")]
public sealed class SePayWebhookController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IOptions<SePayOptions> _options;

    public SePayWebhookController(IMediator mediator, IOptions<SePayOptions> options)
    {
        _mediator = mediator;
        _options = options;
    }

    [HttpPost]
    public async Task<IActionResult> Receive(
        [FromBody] SePayWebhookRequest request,
        CancellationToken cancellationToken
    )
    {
        var authorization = Request.Headers.Authorization.ToString();
        var expected = $"Apikey {_options.Value.WebhookApiKey}";

        if (!string.Equals(authorization, expected, StringComparison.Ordinal))
            return Unauthorized(new { success = false });

        await _mediator.Send(new ProcessSePayWebhookCommand(request), cancellationToken);

        return Ok(new { success = true });
    }
}
