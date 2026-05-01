using System.Linq.Expressions;
using MediatR;

public abstract class BaseGetQueryHandler<TQuery, TEntity, TDto>
    : IRequestHandler<TQuery, PaginatedResult<TDto>>
    where TQuery : BaseFilterQuery, IRequest<PaginatedResult<TDto>>
    where TEntity : BaseEntity
{
    protected readonly IUnitOfWork UnitOfWork;

    protected BaseGetQueryHandler(IUnitOfWork unitOfWork)
    {
        UnitOfWork = unitOfWork;
    }

    public async Task<PaginatedResult<TDto>> Handle(
        TQuery request,
        CancellationToken cancellationToken
    )
    {
        var query = GetBaseQuery();

        if (!string.IsNullOrWhiteSpace(request.SearchTerm))
            query = ApplySearch(query, request.SearchTerm.Trim());

        query = ApplyFilter(query, request);

        var repo = UnitOfWork.Repository<TEntity>();

        // Count BEFORE sorting — repository executes against DB, avoiding ORDER BY in COUNT.
        var totalCount = await repo.CountAsync(query, cancellationToken);

        query = ApplySorting(query, request);

        var dtoQuery = ApplyProjection(query)
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize);

        var items = await repo.ToListAsync(dtoQuery, cancellationToken);

        return PaginatedResult<TDto>.Create(
            items,
            totalCount,
            request.PageNumber,
            request.PageSize
        );
    }

    protected virtual IQueryable<TEntity> GetBaseQuery()
    {
        return UnitOfWork.Repository<TEntity>().Query().Where(e => e.IsDeleted != true);
    }

    protected virtual IQueryable<TEntity> ApplySearch(
        IQueryable<TEntity> query,
        string searchTerm
    ) => query;

    protected abstract IQueryable<TEntity> ApplyFilter(IQueryable<TEntity> query, TQuery request);

    protected virtual Dictionary<string, Expression<Func<TEntity, object>>> SortKeyMap =>
        new(StringComparer.OrdinalIgnoreCase)
        {
            ["createdat"] = e => e.CreatedAt,
            ["updatedat"] = e => e.UpdatedAt,
        };

    protected virtual IQueryable<TEntity> ApplySorting(IQueryable<TEntity> query, TQuery request)
    {
        var map = SortKeyMap;
        var key = request.SortBy?.ToLowerInvariant() ?? string.Empty;
        var isDescending = string.Equals(
            request.SortOrder,
            SortOrderConstants.Descending,
            StringComparison.OrdinalIgnoreCase
        );

        if (!string.IsNullOrEmpty(key) && map.TryGetValue(key, out var sortExpr))
        {
            return isDescending ? query.OrderByDescending(sortExpr) : query.OrderBy(sortExpr);
        }

        // Default: newest first
        return query.OrderByDescending(e => e.CreatedAt);
    }

    protected abstract IQueryable<TDto> ApplyProjection(IQueryable<TEntity> query);
}
