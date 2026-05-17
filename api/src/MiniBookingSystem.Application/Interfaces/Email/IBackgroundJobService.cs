using System.Linq.Expressions;

public interface IBackgroundJobService
{
    void Enqueue<T>(Expression<Func<T, Task>> methodCall);
}
