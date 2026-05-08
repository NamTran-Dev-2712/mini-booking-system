using Microsoft.EntityFrameworkCore;

public class MentorSlotRepository : GenericRepository<MentorSlot>, IMentorSlotRepository
{
    public MentorSlotRepository(ApplicationDbContext context)
        : base(context) { }

    public async Task<List<MentorSlot>> GetSlotsByMentorIdAsync(Guid mentorId)
    {
        return await _context.MentorSlots.Where(slot => slot.MentorId == mentorId).ToListAsync();
    }

    public async Task<List<MentorSlot>> GetAvailableSlotsByMentorIdAsync(Guid mentorId)
    {
        return await _context
            .MentorSlots.Where(slot =>
                slot.MentorId == mentorId && slot.Status == MentorSlotStatus.Available
            )
            .ToListAsync();
    }

    public async Task<List<MentorSlot>> GetSlotsByMentorIdAndStatusAsync(
        Guid mentorId,
        MentorSlotStatus status
    )
    {
        return await _context
            .MentorSlots.Where(slot => slot.MentorId == mentorId && slot.Status == status)
            .ToListAsync();
    }

    public async Task<bool> IsSlotOverlappingAsync(
        Guid mentorId,
        DateTime startTime,
        DateTime endTime,
        CancellationToken cancellationToken = default
    )
    {
        return await _context.MentorSlots.AnyAsync(slot =>
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
        return await _context.MentorSlots.AnyAsync(slot =>
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
        _context.MentorSlots.Update(mentorSlot);
        return mentorSlot.Id;
    }

    public async Task<MentorSlot?> GetSlotByIdForUpdateAsync(Guid slotId)
    {
        var slot = await _context
            .MentorSlots.FromSqlInterpolated(
                $"SELECT * FROM \"mentor_slots\" WHERE \"id\" = {slotId} FOR UPDATE"
            )
            .FirstOrDefaultAsync();
        return slot;
    }

    public async Task<List<MentorSlot>> GetPastUncompletedSlotsWithBookingsAsync(
        DateTime now,
        CancellationToken cancellationToken = default
    )
    {
        return await _context
            .MentorSlots.Include(s => s.Bookings)
            .Where(s =>
                s.EndTime < now
                && s.Status != MentorSlotStatus.Completed
                && s.Status != MentorSlotStatus.Cancelled
            )
            .ToListAsync(cancellationToken);
    }
}
