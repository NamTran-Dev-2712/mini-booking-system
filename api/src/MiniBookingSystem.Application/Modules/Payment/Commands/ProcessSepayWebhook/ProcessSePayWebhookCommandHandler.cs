using System.Text.Json;
using System.Text.RegularExpressions;
using MediatR;
using Microsoft.Extensions.Logging;

public class ProcessSePayWebhookCommandHandler : IRequestHandler<ProcessSePayWebhookCommand>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly ISePayQrService _sePayQrService;
    private readonly ILogger<ProcessSePayWebhookCommandHandler> _logger;

    public ProcessSePayWebhookCommandHandler(
        IUnitOfWork unitOfWork,
        ISePayQrService sePayQrService,
        ILogger<ProcessSePayWebhookCommandHandler> logger
    )
    {
        _unitOfWork = unitOfWork;
        _sePayQrService = sePayQrService;
        _logger = logger;
    }

    public async Task Handle(
        ProcessSePayWebhookCommand request,
        CancellationToken cancellationToken
    )
    {
        var payload = request.Payload;
        var rawPayload = JsonSerializer.Serialize(payload);

        _logger.LogInformation(
            "SePay webhook received. Id={Id}, TransferType={TransferType}, Amount={Amount}, Code={Code}, Content={Content}",
            payload.Id,
            payload.TransferType,
            payload.TransferAmount,
            payload.Code,
            payload.Content
        );

        var webhookLog = new PaymentWebhookLog
        {
            Provider = PaymentProvider.SePay.ToString(),
            EventType = payload.TransferType ?? "unknown",
            ExternalReference = payload.Id.ToString(),
            Payload = rawPayload,
            ReceivedAt = DateTime.UtcNow,
            Status = PaymentWebhookLogStatus.Received,
        };

        await _unitOfWork.PaymentWebhookLog.AddAsync(webhookLog, cancellationToken);

        try
        {
            // Idempotency: nếu SePay retry cùng transaction id thì không xử lý lại.
            var alreadyProcessed = await _unitOfWork.PaymentWebhookLog.ExistsProcessedAsync(
                PaymentProvider.SePay.ToString(),
                payload.Id.ToString(),
                cancellationToken
            );

            if (alreadyProcessed)
            {
                _logger.LogWarning(
                    "SePay webhook Id={Id} already processed. Ignoring duplicate.",
                    payload.Id
                );
                webhookLog.Status = PaymentWebhookLogStatus.Ignored;
                webhookLog.ProcessedAt = DateTime.UtcNow;
                await _unitOfWork.SaveChangesAsync(cancellationToken);
                return;
            }

            if (!string.Equals(payload.TransferType, "in", StringComparison.OrdinalIgnoreCase))
            {
                _logger.LogWarning(
                    "SePay webhook Id={Id} ignored: TransferType='{TransferType}' is not 'in'.",
                    payload.Id,
                    payload.TransferType
                );
                webhookLog.Status = PaymentWebhookLogStatus.Ignored;
                webhookLog.ErrorMessage = "Not an incoming transfer.";
                webhookLog.ProcessedAt = DateTime.UtcNow;
                await _unitOfWork.SaveChangesAsync(cancellationToken);
                return;
            }

            // SePay chỉ tự parse `code` khi tài khoản cấu hình auto-detect.
            // Fallback: extract từ `content` nếu `code` trống.
            var orderCode = payload.Code;
            if (string.IsNullOrWhiteSpace(orderCode))
                orderCode = ExtractOrderCodeFromContent(payload.Content);

            // Normalize về uppercase để match với ProviderOrderCode trong DB (luôn uppercase).
            orderCode = orderCode?.Trim().ToUpperInvariant();

            if (string.IsNullOrWhiteSpace(orderCode))
            {
                _logger.LogWarning(
                    "SePay webhook Id={Id} ignored: cannot extract orderCode. Code='{Code}', Content='{Content}'.",
                    payload.Id,
                    payload.Code,
                    payload.Content
                );
                webhookLog.Status = PaymentWebhookLogStatus.Ignored;
                webhookLog.ErrorMessage =
                    $"Cannot resolve payment code from Code or Content. Content: '{payload.Content}'.";
                webhookLog.ProcessedAt = DateTime.UtcNow;
                await _unitOfWork.SaveChangesAsync(cancellationToken);
                return;
            }

            var payment =
                await _unitOfWork.PaymentTransaction.GetPendingByProviderOrderCodeWithBookingAsync(
                    PaymentProvider.SePay,
                    orderCode,
                    cancellationToken
                );

            if (payment == null || payment.Booking == null)
            {
                _logger.LogWarning(
                    "SePay webhook Id={Id} ignored: no pending payment found for orderCode='{OrderCode}'.",
                    payload.Id,
                    orderCode
                );
                webhookLog.Status = PaymentWebhookLogStatus.Ignored;
                webhookLog.ErrorMessage = $"Payment not found for code '{orderCode}'.";
                webhookLog.ProcessedAt = DateTime.UtcNow;
                await _unitOfWork.SaveChangesAsync(cancellationToken);
                return;
            }

            if (payment.Status == PaymentStatus.Succeeded)
            {
                webhookLog.Status = PaymentWebhookLogStatus.Ignored;
                webhookLog.ProcessedAt = DateTime.UtcNow;
                await _unitOfWork.SaveChangesAsync(cancellationToken);
                return;
            }

            if (
                payment.ExpiredAt <= DateTime.UtcNow
                || payment.Booking.ExpiresAt <= DateTime.UtcNow
            )
            {
                _logger.LogWarning(
                    "SePay webhook Id={Id} ignored: payment/booking expired. PaymentExpiredAt={PaymentExpiredAt}, BookingExpiresAt={BookingExpiresAt}.",
                    payload.Id,
                    payment.ExpiredAt,
                    payment.Booking.ExpiresAt
                );
                payment.Status = PaymentStatus.Expired;
                payment.FailureReason = "Payment received after expiration.";
                payment.RawCallbackData = rawPayload;

                webhookLog.Status = PaymentWebhookLogStatus.Ignored;
                webhookLog.ErrorMessage = "Payment expired.";
                webhookLog.ProcessedAt = DateTime.UtcNow;

                await _unitOfWork.SaveChangesAsync(cancellationToken);
                return;
            }

            if (payload.TransferAmount < payment.Amount)
            {
                payment.Status = PaymentStatus.Failed;
                payment.FailureReason =
                    $"Insufficient amount. Required {payment.Amount}, received {payload.TransferAmount}.";
                payment.RawCallbackData = rawPayload;

                webhookLog.Status = PaymentWebhookLogStatus.Failed;
                webhookLog.ErrorMessage = payment.FailureReason;
                webhookLog.ProcessedAt = DateTime.UtcNow;

                await _unitOfWork.SaveChangesAsync(cancellationToken);
                return;
            }

            payment.Status = PaymentStatus.Succeeded;
            payment.ProviderTransactionId = payload.Id.ToString();
            payment.PaidAt = DateTime.UtcNow;
            payment.RawCallbackData = rawPayload;

            payment.Booking.ConfirmBooking();

            webhookLog.Status = PaymentWebhookLogStatus.Processed;
            webhookLog.ProcessedAt = DateTime.UtcNow;

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            _logger.LogInformation(
                "SePay webhook Id={Id} processed successfully. OrderCode={OrderCode}, BookingId={BookingId}.",
                payload.Id,
                orderCode,
                payment.BookingId
            );
        }
        catch (Exception ex)
        {
            webhookLog.Status = PaymentWebhookLogStatus.Failed;
            webhookLog.ErrorMessage = ex.Message;
            webhookLog.ProcessedAt = DateTime.UtcNow;

            await _unitOfWork.SaveChangesAsync(cancellationToken);
            throw;
        }
    }

    private string? ExtractOrderCodeFromContent(string? content)
    {
        if (string.IsNullOrWhiteSpace(content))
            return null;

        var prefix = Regex.Escape(_sePayQrService.PaymentCodePrefix);

        // Match cả "BK-\w+" lẫn "BK\w+" vì SePay có thể bỏ dấu gạch ngang trong content.
        var match = Regex.Match(content, $@"\b({prefix}-?\w+)\b", RegexOptions.IgnoreCase);
        if (!match.Success)
            return null;

        var extracted = match.Groups[1].Value.ToUpperInvariant();

        // Normalize: nếu thiếu dấu gạch ngang sau prefix (e.g. "BK20260508...")
        // thì chèn lại để khớp với ProviderOrderCode trong DB ("BK-20260508...").
        var rawPrefix = _sePayQrService.PaymentCodePrefix.ToUpperInvariant();
        if (
            extracted.StartsWith(rawPrefix, StringComparison.Ordinal)
            && extracted.Length > rawPrefix.Length
            && extracted[rawPrefix.Length] != '-'
        )
        {
            extracted = rawPrefix + "-" + extracted[rawPrefix.Length..];
        }

        return extracted;
    }
}
