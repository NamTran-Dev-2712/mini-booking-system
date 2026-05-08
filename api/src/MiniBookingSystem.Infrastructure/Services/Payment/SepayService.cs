using System.Web;
using Microsoft.Extensions.Options;

public sealed class SePayQrService : ISePayQrService
{
    private readonly SePayOptions _options;

    public SePayQrService(IOptions<SePayOptions> options)
    {
        _options = options.Value;
    }

    public string PaymentCodePrefix => _options.PaymentCodePrefix;

    public string GenerateQrUrl(string orderCode, decimal amount)
    {
        var builder = new UriBuilder(_options.QrBaseUrl);
        var query = HttpUtility.ParseQueryString(string.Empty);

        query["acc"] = _options.AccountNumber;
        query["bank"] = _options.BankShortName;
        query["amount"] = decimal.ToInt64(amount).ToString();
        query["des"] = orderCode;

        builder.Query = query.ToString();
        return builder.ToString();
    }

    public string GenerateSePayOrderCode()
    {
        return $"{_options.PaymentCodePrefix}-{DateTime.UtcNow:yyyyMMddHHmmssfff}";
    }
}
