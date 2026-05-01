using System.Linq.Expressions;
using MediatR;

public class GetMentorQueryHandler : BaseGetQueryHandler<GetMentorQuery, Mentor, MentorDto>
{
    public GetMentorQueryHandler(IUnitOfWork unitOfWork)
        : base(unitOfWork) { }

    protected override IQueryable<Mentor> ApplySearch(IQueryable<Mentor> query, string searchTerm)
    {
        var keyword = searchTerm.Trim().ToLower();

        return query.Where(m =>
            m.DisplayName.ToLower().StartsWith(keyword)
            || (m.Specialization != null && m.Specialization.ToLower().Contains(keyword))
        );
    }

    protected override IQueryable<Mentor> ApplyFilter(
        IQueryable<Mentor> query,
        GetMentorQuery request
    )
    {
        query = query.Where(m => m.IsActive);

        if (request.MinBasePrice.HasValue)
            query = query.Where(m => m.BasePrice >= request.MinBasePrice.Value);

        if (request.MaxBasePrice.HasValue)
            query = query.Where(m => m.BasePrice <= request.MaxBasePrice.Value);

        if (request.MinExperienceYears.HasValue)
            query = query.Where(m => m.ExperienceYears >= request.MinExperienceYears.Value);

        if (request.MaxExperienceYears.HasValue)
            query = query.Where(m => m.ExperienceYears <= request.MaxExperienceYears.Value);

        return query;
    }

    protected override Dictionary<string, Expression<Func<Mentor, object>>> SortKeyMap =>
        new(StringComparer.OrdinalIgnoreCase)
        {
            [MentorSortKeys.Name] = m => m.DisplayName,
            [MentorSortKeys.BasePrice] = m => m.BasePrice,
            [MentorSortKeys.Experience] = m => m.ExperienceYears,
        };

    protected override IQueryable<MentorDto> ApplyProjection(IQueryable<Mentor> query)
    {
        return query.Select(m => new MentorDto
        {
            Id = m.Id,
            UserId = m.UserId,
            DisplayName = m.DisplayName,
            Email = m.Email,
            Bio = m.Bio,
            Specialization = m.Specialization,
            ExperienceYears = m.ExperienceYears,
            BasePrice = m.BasePrice,
            AvatarUrl = m.AvatarUrl,
            IsActive = m.IsActive,
            CreatedAt = m.CreatedAt,
        });
    }
}
