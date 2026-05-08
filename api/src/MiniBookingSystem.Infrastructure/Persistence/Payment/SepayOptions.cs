public sealed class SePayOptions
{
    public string BankShortName { get; set; } = default!;
    public string AccountNumber { get; set; } = default!;
    public string AccountName { get; set; } = default!;
    public string WebhookApiKey { get; set; } = default!;
    public string QrBaseUrl { get; set; } = "https://qr.sepay.vn/img";
    public string PaymentCodePrefix { get; set; } = "BK";
}
