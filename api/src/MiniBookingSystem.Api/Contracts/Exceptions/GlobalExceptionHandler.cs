using System.Diagnostics;
using FluentValidation;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.Extensions.Localization;

public class GlobalExceptionHandler : IExceptionHandler
{
    private readonly ILogger<GlobalExceptionHandler> _logger;
    private readonly IStringLocalizer _localizer;

    public GlobalExceptionHandler(
        ILogger<GlobalExceptionHandler> logger,
        IStringLocalizerFactory factory
    )
    {
        _logger = logger;
        var assemblyName = typeof(SharedResource).Assembly.GetName().Name!;
        _localizer = factory.Create("SharedResource", assemblyName);
    }

    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken
    )
    {
        var traceId = Activity.Current?.Id ?? httpContext.TraceIdentifier;

        var statusCode = StatusCodes.Status500InternalServerError;
        var message = GetLocalizedMessage("Error.Generic");
        List<string>? errors = null;

        if (exception is ValidationException validationException)
        {
            statusCode = StatusCodes.Status400BadRequest;
            message = GetLocalizedMessage("Error.ValidationFailed");

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
            _logger.LogError(exception, "System Exception caught. TraceId: {TraceId}", traceId);
        }

        var response = ApiResponse<object>.Failure(statusCode, message, errors);
        response.TraceId = traceId;

        httpContext.Response.StatusCode = statusCode;
        httpContext.Response.ContentType = "application/json";

        await httpContext.Response.WriteAsJsonAsync(response, cancellationToken);

        return true;
    }

    private string GetLocalizedMessage(string key)
    {
        var result = _localizer[key];
        return result.ResourceNotFound ? key : result.Value;
    }
}
