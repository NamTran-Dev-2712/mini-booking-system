using MediatR;

public class DeleteMentorCommandHandler : IRequestHandler<DeleteMentorCommand, Unit>
{
    private readonly IUnitOfWork _unitOfWork;

    public DeleteMentorCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Unit> Handle(DeleteMentorCommand request, CancellationToken cancellationToken)
    {
        var mentor = await _unitOfWork.Mentor.GetByIdAsync(request.MentorId, cancellationToken);
        if (mentor is null)
            throw new NotFoundException("Mentor", request.MentorId.ToString());

        // start a transaction to ensure both mentor and user are deleted successfully
        await _unitOfWork.BeginTransactionAsync(cancellationToken);

        try
        {
            // delete the mentor (soft delete)
            mentor.IsDeleted = true;
            mentor.Email = "deleted_" + mentor.Email + "_" + mentor.Id; // anonymize email to prevent conflicts
            mentor.DeletedAt = DateTime.UtcNow;
            _unitOfWork.Mentor.Update(mentor);

            // delete the associated user
            await _unitOfWork.User.DeleteUserAsync(mentor.UserId, cancellationToken);

            await _unitOfWork.SaveChangesAsync(cancellationToken);
            await _unitOfWork.CommitTransactionAsync(cancellationToken);

            return Unit.Value;
        }
        catch (Exception)
        {
            await _unitOfWork.RollbackTransactionAsync(cancellationToken);
            throw;
        }
    }
}
