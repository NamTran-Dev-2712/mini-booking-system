public interface ISePayQrService
{
    string PaymentCodePrefix { get; }
    string GenerateQrUrl(string orderCode, decimal amount);
    string GenerateSePayOrderCode();
}
