using MediatR;

public class CreateMentorCommandHandler : IRequestHandler<CreateMentorCommand, Guid>
{
    private readonly IIdentityService _identityService;
    private readonly IUnitOfWork _unitOfWork;

    public CreateMentorCommandHandler(IIdentityService identityService, IUnitOfWork unitOfWork)
    {
        _identityService = identityService;
        _unitOfWork = unitOfWork;
    }

    public async Task<Guid> Handle(CreateMentorCommand request, CancellationToken cancellationToken)
    {
        // start a transaction to ensure both user and mentor are created successfully
        await _unitOfWork.BeginTransactionAsync(cancellationToken);

        try
        {
            var userId = await _identityService.RegisterAsync(
                request.FullName,
                request.Email,
                request.Password,
                request.PhoneNumber,
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
                request.AvatarUrl
            );

            await _unitOfWork.Mentor.AddAsync(mentor);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            // commit the transaction after both user and mentor are created successfully
            await _unitOfWork.CommitTransactionAsync(cancellationToken);

            return userId;
        }
        catch (Exception)
        {
            await _unitOfWork.RollbackTransactionAsync(cancellationToken);
            throw;
        }
    }
}
