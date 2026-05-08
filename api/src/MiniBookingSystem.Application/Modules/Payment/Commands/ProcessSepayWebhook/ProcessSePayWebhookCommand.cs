using MediatR;

public sealed record ProcessSePayWebhookCommand(SePayWebhookRequest Payload) : IRequest;
