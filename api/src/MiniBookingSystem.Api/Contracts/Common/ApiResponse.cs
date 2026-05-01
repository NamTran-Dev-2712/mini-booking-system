public class ApiResponse<T>
{
    public bool Success { get; set; }
    public required string Message { get; set; }

    public T? Data { get; set; }

    public List<string>? Errors { get; set; }

    public int StatusCode { get; set; }
    public string TraceId { get; set; } = Guid.NewGuid().ToString();
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;

    // Helper methods để khởi tạo nhanh
    public static ApiResponse<T> Ok(T data, string message = "Success")
    {
        return new ApiResponse<T>
        {
            Success = true,
            Data = data,
            Message = message,
            StatusCode = 200,
        };
    }

    public static ApiResponse<T> Created(T data, string message = "Created successfully")
    {
        return new ApiResponse<T>
        {
            Success = true,
            Data = data,
            Message = message,
            StatusCode = 201,
        };
    }

    public static ApiResponse<object> NoContent(string message = "No content")
    {
        return new ApiResponse<object>
        {
            Success = true,
            Data = null,
            Message = message,
            StatusCode = 200,
        };
    }

    public static ApiResponse<T> Failure(
        int statusCode,
        string message,
        List<string>? errors = null
    )
    {
        return new ApiResponse<T>
        {
            Success = false,
            Message = message,
            StatusCode = statusCode,
            Errors = errors,
        };
    }
}
