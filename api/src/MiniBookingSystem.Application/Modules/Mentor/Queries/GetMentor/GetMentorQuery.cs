using MediatR;

public record GetMentorQuery : BaseFilterQuery, IRequest<PaginatedResult<MentorDto>>
{
    public decimal? MinBasePrice { get; init; }
    public decimal? MaxBasePrice { get; init; }
    public int? MinExperienceYears { get; init; }
    public int? MaxExperienceYears { get; init; }
}
