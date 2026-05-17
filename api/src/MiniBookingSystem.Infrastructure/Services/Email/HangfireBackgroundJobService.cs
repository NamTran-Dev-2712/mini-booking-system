using System.Linq.Expressions;
using Hangfire;

public sealed class HangfireBackgroundJobService : IBackgroundJobService
{
    private readonly IBackgroundJobClient _backgroundJobClient;

    public HangfireBackgroundJobService(IBackgroundJobClient backgroundJobClient)
    {
        _backgroundJobClient = backgroundJobClient;
    }

    public void Enqueue<T>(Expression<Func<T, Task>> methodCall)
    {
        _backgroundJobClient.Enqueue(methodCall);
    }
}
