public abstract record BaseFilterQuery
{
    public int PageNumber { get; init; } = PaginationValue.DefaultPageNumber;

    private int _pageSize = PaginationValue.DefaultPageSize;
    public int PageSize
    {
        get => _pageSize;
        init =>
            _pageSize = value > PaginationValue.MaxPageSize ? PaginationValue.MaxPageSize : value;
    }

    public string? SortBy { get; init; } // example: "FullName", "CreatedAt"
    public string SortOrder { get; init; } = SortOrderConstants.Ascending;

    public string? SearchTerm { get; init; }
}
