using MediatR;

public class RegisterMentorCommandHandler : IRequestHandler<RegisterMentorCommand, UserDTO>
{
    private readonly IIdentityService _identityService;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IBackgroundJobService _backgroundJobService;

    public RegisterMentorCommandHandler(
        IIdentityService identityService,
        IUnitOfWork unitOfWork,
        IBackgroundJobService backgroundJobService
    )
    {
        _identityService = identityService;
        _unitOfWork = unitOfWork;
        _backgroundJobService = backgroundJobService;
    }

    public async Task<UserDTO> Handle(
        RegisterMentorCommand request,
        CancellationToken cancellationToken
    )
    {
        var phoneNumber = PhoneNumberNormalizer.Normalize(request.PhoneNumber);

        await _unitOfWork.BeginTransactionAsync(cancellationToken);

        Guid userId;
        try
        {
            userId = await _identityService.RegisterAsync(
                request.FullName,
                request.Email,
                request.Password,
                phoneNumber,
                request.AvatarUrl,
                cancellationToken
            );

            await _unitOfWork.User.UpdateRoleAsync(userId, Roles.Mentor, cancellationToken);

            var mentor = new Mentor();
            mentor.Initialize(
                userId,
                request.FullName,
                request.Email,
                bio: null,
                specialization: null,
                experienceYears: 0,
                basePrice: 0,
                avatarUrl: request.AvatarUrl
            );

            await _unitOfWork.Mentor.AddAsync(mentor);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            await _unitOfWork.CommitTransactionAsync(cancellationToken);
        }
        catch (Exception)
        {
            await _unitOfWork.RollbackTransactionAsync(cancellationToken);
            throw;
        }

        _backgroundJobService.Enqueue<IEmailJob>(job =>
            job.SendMentorSelfWelcomeEmailAsync(request.Email, request.FullName)
        );

        return new UserDTO(
            Id: userId,
            FullName: request.FullName,
            Email: request.Email,
            PhoneNumber: phoneNumber,
            AvatarUrl: request.AvatarUrl,
            CreatedAt: DateTime.UtcNow,
            Roles: [Roles.Mentor]
        );
    }
}
