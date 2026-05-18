public interface IUnitOfWork
{
    IGenericRepository<T> Repository<T>()
        where T : class;

    IUserRepository User { get; }
    IMentorRepository Mentor { get; }
    IMentorSkillRepository MentorSkill { get; }
    IMentorSlotRepository MentorSlot { get; }
    IBookingRepository Booking { get; }
    IPaymentTransactionRepository PaymentTransaction { get; }
    IPaymentWebhookLogRepository PaymentWebhookLog { get; }
    IPasswordResetTokenRepository PasswordResetToken { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    Task BeginTransactionAsync(CancellationToken cancellationToken = default);
    Task CommitTransactionAsync(CancellationToken cancellationToken = default);
    Task RollbackTransactionAsync(CancellationToken cancellationToken = default);
}
