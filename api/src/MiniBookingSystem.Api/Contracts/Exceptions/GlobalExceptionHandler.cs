using System.Diagnostics;
using FluentValidation;
using Microsoft.AspNetCore.Diagnostics;

public class GlobalExceptionHandler : IExceptionHandler
{
    private readonly ILogger<GlobalExceptionHandler> _logger;

    public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
    {
        _logger = logger;
    }

    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken
    )
    {
        var traceId = Activity.Current?.Id ?? httpContext.TraceIdentifier;

        // Default to internal server error (500)
        var statusCode = StatusCodes.Status500InternalServerError;
        var message = "An unexpected error occurred.";
        List<string>? errors = null;

        // domain validation error (400)
        if (exception is ValidationException validationException)
        {
            statusCode = StatusCodes.Status400BadRequest;
            message = "Validation failed.";

            errors = validationException
                .Errors.Select(x => $"{x.PropertyName}: {x.ErrorMessage}")
                .Distinct()
                .ToList();

            _logger.LogWarning(exception, "FluentValidation error. TraceId: {TraceId}", traceId);
        }
        else if (exception is AppDomainException appEx)
        {
            statusCode = appEx.StatusCode;
            message = appEx.Message;
            errors = appEx.Errors;

            _logger.LogWarning(exception, "Domain validation error. TraceId: {TraceId}", traceId);
        }
        else
        {
            // System error log with a higher severity level
            _logger.LogError(exception, "System Exception caught. TraceId: {TraceId}", traceId);
            // It is possible to hide system error details in the Production environment
            // message = environment.IsDevelopment() ? exception.Message : message;
        }

        var response = ApiResponse<object>.Failure(statusCode, message, errors);
        response.TraceId = traceId;

        httpContext.Response.StatusCode = statusCode;
        httpContext.Response.ContentType = "application/json";

        await httpContext.Response.WriteAsJsonAsync(response, cancellationToken);

        return true; // Báo hiệu lỗi đã được xử lý, không forward tiếp
    }
}
