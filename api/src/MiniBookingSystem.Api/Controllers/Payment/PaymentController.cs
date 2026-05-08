using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[Route("api/[controller]")]
public sealed class PaymentController : BaseApiController
{
    private readonly IMediator _mediator;

    public PaymentController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> CreatePayment(
        [FromBody] CreatePaymentRequest request,
        CancellationToken cancellationToken
    )
    {
        var userId = Guid.Parse(User.FindFirstValue("sub")!);

        var command = new CreatePaymentCommand(
            UserId: userId,
            BookingId: request.BookingId,
            Provider: PaymentProvider.SePay,
            Currency: "VND"
        );

        var result = await _mediator.Send(command, cancellationToken);
        return CreatedResponse(result, "Payment transaction created.");
    }

    [HttpGet("{bookingId:guid}/status")]
    public async Task<IActionResult> GetPaymentStatus(
        Guid bookingId,
        CancellationToken cancellationToken
    )
    {
        var userId = Guid.Parse(User.FindFirstValue("sub")!);

        var query = new GetPaymentStatusQuery(bookingId, userId);
        var result = await _mediator.Send(query, cancellationToken);
        return OkResponse(result);
    }
}

public sealed record CreatePaymentRequest(Guid BookingId);
