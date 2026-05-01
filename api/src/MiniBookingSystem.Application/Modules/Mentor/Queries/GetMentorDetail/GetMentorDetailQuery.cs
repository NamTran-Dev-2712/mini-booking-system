using MediatR;

public record GetMentorDetailQuery(Guid MentorId) : IRequest<MentorDetailDTO>;
