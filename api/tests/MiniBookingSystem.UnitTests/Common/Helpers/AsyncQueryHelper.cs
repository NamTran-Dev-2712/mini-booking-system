using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore.Query;

namespace MiniBookingSystem.UnitTests.Common.Helpers;

/// <summary>
/// Provides IAsyncQueryProvider support so EF Core async extension methods
/// (AnyAsync, FirstOrDefaultAsync, etc.) work on in-memory lists during unit tests.
/// </summary>
internal sealed class TestAsyncQueryProvider<TEntity> : IAsyncQueryProvider
{
    private readonly IQueryProvider _inner;

    internal TestAsyncQueryProvider(IQueryProvider inner) => _inner = inner;

    public IQueryable CreateQuery(Expression expression) =>
        new TestAsyncEnumerable<TEntity>(expression);

    public IQueryable<TElement> CreateQuery<TElement>(Expression expression) =>
        new TestAsyncEnumerable<TElement>(expression);

    public object? Execute(Expression expression) => _inner.Execute(expression);

    public TResult Execute<TResult>(Expression expression) => _inner.Execute<TResult>(expression);

    public TResult ExecuteAsync<TResult>(Expression expression, CancellationToken cancellationToken)
    {
        // TResult = Task<T> — wrap the synchronous LINQ result in Task.FromResult
        var resultType = typeof(TResult).GetGenericArguments()[0];
        var executionResult = Execute(expression);

        return (TResult)
            typeof(Task)
                .GetMethod(nameof(Task.FromResult))!
                .MakeGenericMethod(resultType)
                .Invoke(null, [executionResult])!;
    }
}

internal sealed class TestAsyncEnumerable<T>
    : EnumerableQuery<T>,
        IAsyncEnumerable<T>,
        IQueryable<T>
{
    public TestAsyncEnumerable(IEnumerable<T> enumerable)
        : base(enumerable) { }

    public TestAsyncEnumerable(Expression expression)
        : base(expression) { }

    IQueryProvider IQueryable.Provider
    {
        get
        {
            // Access the expression WITHOUT going through our overridden Provider,
            // then create a fresh EnumerableQuery<T> to get its LINQ-to-objects provider.
            // This prevents infinite recursion that would occur with this.AsQueryable().Provider.
            var expression = ((IQueryable)this).Expression;
            var innerQuery = (IQueryable)new EnumerableQuery<T>(expression);
            return new TestAsyncQueryProvider<T>(innerQuery.Provider);
        }
    }

    public IAsyncEnumerator<T> GetAsyncEnumerator(CancellationToken cancellationToken = default) =>
        new TestAsyncEnumerator<T>(this.AsEnumerable().GetEnumerator());
}

internal sealed class TestAsyncEnumerator<T> : IAsyncEnumerator<T>
{
    private readonly IEnumerator<T> _inner;

    public TestAsyncEnumerator(IEnumerator<T> inner) => _inner = inner;

    public T Current => _inner.Current;

    public ValueTask<bool> MoveNextAsync() => ValueTask.FromResult(_inner.MoveNext());

    public ValueTask DisposeAsync()
    {
        _inner.Dispose();
        return ValueTask.CompletedTask;
    }
}

/// <summary>
/// Extension to convert any in-memory collection to an async-queryable that EF Core can enumerate.
/// </summary>
internal static class AsyncQueryableExtensions
{
    public static IQueryable<T> AsAsyncQueryable<T>(this IEnumerable<T> source) =>
        new TestAsyncEnumerable<T>(source);
}
