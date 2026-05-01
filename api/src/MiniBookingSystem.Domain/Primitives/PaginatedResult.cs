public class PaginatedResult<T>
{
    public IReadOnlyCollection<T> Items { get; init; }
    public int PageNumber { get; init; }
    public int TotalPages { get; init; }
    public int TotalCount { get; init; }
    public int PageSize { get; init; }
    public bool HasPreviousPage => PageNumber > 1;
    public bool HasNextPage => PageNumber < TotalPages;

    public PaginatedResult(IReadOnlyCollection<T> items, int count, int pageNumber, int pageSize)
    {
        PageNumber = pageNumber;
        TotalPages = (int)Math.Ceiling(count / (double)pageSize);
        TotalCount = count;
        PageSize = pageSize;
        Items = items;
    }

    public static PaginatedResult<T> Create(
        IReadOnlyCollection<T> items,
        int count,
        int pageNumber,
        int pageSize
    ) => new(items, count, pageNumber, pageSize);
}
