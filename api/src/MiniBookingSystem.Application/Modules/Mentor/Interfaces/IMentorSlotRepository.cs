public interface IMentorSlotRepository : IGenericRepository<MentorSlot>
{
    Task<List<MentorSlot>> GetSlotsByMentorIdAsync(Guid mentorId);
    Task<List<MentorSlot>> GetAvailableSlotsByMentorIdAsync(Guid mentorId);
    Task<List<MentorSlot>> GetSlotsByMentorIdAndStatusAsync(Guid mentorId, MentorSlotStatus status);
    Task<MentorSlot?> GetSlotByIdForUpdateAsync(Guid slotId);
    Task<List<MentorSlot>> GetPastUncompletedSlotsWithBookingsAsync(
        DateTime now,
        CancellationToken cancellationToken = default
    );
    Task<bool> IsSlotOverlappingAsync(
        Guid mentorId,
        DateTime startTime,
        DateTime endTime,
        CancellationToken cancellationToken = default
    );
    Task<bool> IsSlotOverlappingAsync(
        Guid mentorId,
        DateTime startTime,
        DateTime endTime,
        Guid excludeSlotId,
        CancellationToken cancellationToken = default
    );
    Task<Guid> UpdateSlotAsync(
        MentorSlot mentorSlot,
        CancellationToken cancellationToken = default
    );
}
