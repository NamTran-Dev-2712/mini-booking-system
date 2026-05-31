using MediatR;

public class CreateMentorCommandHandler : IRequestHandler<CreateMentorCommand, Guid>
{
    private readonly IIdentityService _identityService;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IBackgroundJobService _backgroundJobService;

    public CreateMentorCommandHandler(
        IIdentityService identityService,
        IUnitOfWork unitOfWork,
        IBackgroundJobService backgroundJobService
    )
    {
        _identityService = identityService;
        _unitOfWork = unitOfWork;
        _backgroundJobService = backgroundJobService;
    }

    public async Task<Guid> Handle(CreateMentorCommand request, CancellationToken cancellationToken)
    {
        var generatedPassword = PasswordGenerator.Generate(16);
        var phoneNumber = PhoneNumberNormalizer.Normalize(request.PhoneNumber);

        await _unitOfWork.BeginTransactionAsync(cancellationToken);

        try
        {
            var userId = await _identityService.RegisterAsync(
                request.FullName,
                request.Email,
                generatedPassword,
                phoneNumber,
                request.AvatarUrl,
                cancellationToken
            );

            await _unitOfWork.User.UpdateRoleAsync(userId, Roles.Mentor, cancellationToken);

            var mentor = new Mentor();
            mentor.Initialize(
                userId,
                request.DisplayName ?? request.FullName,
                request.Email,
                request.Bio,
                request.Specialization,
                request.ExperienceYears,
                request.BasePrice,
                request.AvatarUrl,
                request.FacebookUrl,
                request.GithubUrl,
                request.LinkedInUrl,
                request.TelegramUrl,
                request.WebsiteUrl
            );

            await _unitOfWork.Mentor.AddAsync(mentor);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            await _unitOfWork.CommitTransactionAsync(cancellationToken);

            _backgroundJobService.Enqueue<IEmailJob>(job =>
                job.SendMentorWelcomeEmailAsync(
                    request.Email,
                    request.FullName,
                    request.Email,
                    generatedPassword
                )
            );

            return userId;
        }
        catch (Exception)
        {
            await _unitOfWork.RollbackTransactionAsync(cancellationToken);
            throw;
        }
    }
}
