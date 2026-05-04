using Microsoft.EntityFrameworkCore;

public class MentorSlotRepository : GenericRepository<MentorSlot>, IMentorSlotRepository
{
    public MentorSlotRepository(ApplicationDbContext context)
        : base(context) { }

    public async Task<List<MentorSlot>> GetSlotsByMentorIdAsync(Guid mentorId)
    {
        return await _dbSet.Where(slot => slot.MentorId == mentorId).ToListAsync();
    }

    public async Task<List<MentorSlot>> GetAvailableSlotsByMentorIdAsync(Guid mentorId)
    {
        return await _dbSet
            .Where(slot => slot.MentorId == mentorId && slot.Status == MentorSlotStatus.Available)
            .ToListAsync();
    }

    public async Task<List<MentorSlot>> GetSlotsByMentorIdAndStatusAsync(
        Guid mentorId,
        MentorSlotStatus status
    )
    {
        return await _dbSet
            .Where(slot => slot.MentorId == mentorId && slot.Status == status)
            .ToListAsync();
    }

    public async Task<bool> IsSlotOverlappingAsync(
        Guid mentorId,
        DateTime startTime,
        DateTime endTime,
        CancellationToken cancellationToken = default
    )
    {
        return await _dbSet.AnyAsync(slot =>
            slot.MentorId == mentorId
            && slot.Status != MentorSlotStatus.Cancelled
            && // Ignore cancelled slots
            (
                (startTime >= slot.StartTime && startTime < slot.EndTime)
                || // New start time overlaps existing slot
                (endTime > slot.StartTime && endTime <= slot.EndTime)
                || // New end time overlaps existing slot
                (startTime <= slot.StartTime && endTime >= slot.EndTime)
            ) // New slot completely covers existing slot
        );
    }

    public async Task<bool> IsSlotOverlappingAsync(
        Guid mentorId,
        DateTime startTime,
        DateTime endTime,
        Guid excludeSlotId,
        CancellationToken cancellationToken = default
    )
    {
        return await _dbSet.AnyAsync(slot =>
            slot.Id != excludeSlotId
            && // Exclude the slot being updated
            slot.MentorId == mentorId
            && slot.Status != MentorSlotStatus.Cancelled
            && // Ignore cancelled slots
            (
                (startTime >= slot.StartTime && startTime < slot.EndTime)
                || // New start time overlaps existing slot
                (endTime > slot.StartTime && endTime <= slot.EndTime)
                || // New end time overlaps existing slot
                (startTime <= slot.StartTime && endTime >= slot.EndTime)
            ) // New slot completely covers existing slot
        );
    }

    public async Task<Guid> UpdateSlotAsync(
        MentorSlot mentorSlot,
        CancellationToken cancellationToken = default
    )
    {
        _dbSet.Update(mentorSlot);
        return mentorSlot.Id;
    }
}
