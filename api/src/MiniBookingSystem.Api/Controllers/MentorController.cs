using System.IdentityModel.Tokens.Jwt;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;

[ApiController]
[Route("api/[controller]")]
public class MentorController : BaseApiController
{
    private readonly ISender _mediator;
    private readonly IOutputCacheStore _cacheStore;

    public MentorController(ISender mediator, IOutputCacheStore cacheStore)
    {
        _mediator = mediator;
        _cacheStore = cacheStore;
    }

    private async Task EvictMentorCache(CancellationToken cancellationToken)
    {
        await _cacheStore.EvictByTagAsync(CacheKeys.PublicListMentorTag, cancellationToken);
    }

    // Extracts the caller identity from the JWT. Returns false when the subject
    // claim is missing/invalid so the action can respond 401. Ownership itself is
    // enforced in the command handlers using these server-side values.
    private bool TryGetRequester(out Guid userId, out bool isAdmin)
    {
        userId = default;
        isAdmin = User.IsInRole(Roles.Admin);
        var claim = User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub);
        return claim != null && Guid.TryParse(claim.Value, out userId);
    }

    [HttpPost()]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateMentor(
        CreateMentorCommand command,
        CancellationToken cancellationToken
    )
    {
        var result = await _mediator.Send(command, cancellationToken);
        await EvictMentorCache(cancellationToken);
        return CreatedResponse(result, "Mentor created successfully");
    }

    [HttpPost("{id:guid}/skills")]
    [Authorize(Roles = "Admin, Mentor")]
    public async Task<IActionResult> AddSkillToMentor(
        Guid id,
        AddSkillMentorCommand command,
        CancellationToken cancellationToken
    )
    {
        if (id != command.MentorId)
            return FailureResponse<Guid>(400, Localizer.GetMessage("Mentor.IdMismatch"));

        if (!TryGetRequester(out var requesterUserId, out var requesterIsAdmin))
            return FailureResponse<Guid>(401, Localizer.GetMessage("Auth.InvalidTokenClaim"));

        // Populate requester context server-side; ownership (mentor may only manage
        // their own profile, admins bypass) is enforced in the command handler.
        command = command with
        {
            RequesterUserId = requesterUserId,
            RequesterIsAdmin = requesterIsAdmin,
        };

        var result = await _mediator.Send(command, cancellationToken);
        return CreatedResponse(result, "Skill added to mentor successfully");
    }

    [HttpDelete("{id:guid}/skills/{skillId:guid}")]
    [Authorize(Roles = "Admin, Mentor")]
    public async Task<IActionResult> RemoveSkillFromMentor(
        Guid id,
        Guid skillId,
        CancellationToken cancellationToken
    )
    {
        if (!TryGetRequester(out var requesterUserId, out var requesterIsAdmin))
            return FailureResponse<Guid>(401, Localizer.GetMessage("Auth.InvalidTokenClaim"));

        // Ownership (mentor may only manage their own profile, admins bypass) is
        // enforced in the command handler using these server-side values.
        var command = new RemoveSkillMentorCommand(id, skillId, requesterUserId, requesterIsAdmin);
        await _mediator.Send(command, cancellationToken);
        return NoContentResponse("Response.Mentor.SkillRemoved");
    }

    [HttpPost("{id:guid}/slots")]
    [Authorize(Roles = "Admin, Mentor")]
    public async Task<IActionResult> CreateSlot(
        Guid id,
        CreateSlotMentorCommand command,
        CancellationToken cancellationToken
    )
    {
        if (id != command.MentorId)
            return FailureResponse<Guid>(400, Localizer.GetMessage("Mentor.IdMismatch"));

        if (!TryGetRequester(out var requesterUserId, out var requesterIsAdmin))
            return FailureResponse<Guid>(401, Localizer.GetMessage("Auth.InvalidTokenClaim"));

        command = command with
        {
            RequesterUserId = requesterUserId,
            RequesterIsAdmin = requesterIsAdmin,
        };

        var result = await _mediator.Send(command, cancellationToken);
        return CreatedResponse(result, "Response.Mentor.SlotCreated");
    }

    [HttpPut("{id:guid}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateMentor(
        Guid id,
        UpdateMentorCommand command,
        CancellationToken cancellationToken
    )
    {
        if (id != command.Id)
            return FailureResponse<Guid>(400, Localizer.GetMessage("Mentor.IdBodyMismatch"));

        var result = await _mediator.Send(command, cancellationToken);
        await EvictMentorCache(cancellationToken);
        return OkResponse(result, "Response.Mentor.Updated");
    }

    [HttpPut("{id:guid}/slots/{slotId:guid}")]
    [Authorize(Roles = "Admin, Mentor")]
    public async Task<IActionResult> UpdateSlot(
        Guid id,
        Guid slotId,
        UpdateSlotMentorCommand command,
        CancellationToken cancellationToken
    )
    {
        if (id != command.MentorId)
            return FailureResponse<Guid>(400, Localizer.GetMessage("Mentor.IdMismatch"));

        if (slotId != command.Id)
            return FailureResponse<Guid>(400, Localizer.GetMessage("Mentor.SlotIdMismatch"));

        if (!TryGetRequester(out var requesterUserId, out var requesterIsAdmin))
            return FailureResponse<Guid>(401, Localizer.GetMessage("Auth.InvalidTokenClaim"));

        command = command with
        {
            RequesterUserId = requesterUserId,
            RequesterIsAdmin = requesterIsAdmin,
        };

        var result = await _mediator.Send(command, cancellationToken);
        return OkResponse(result, "Response.Mentor.SlotUpdated");
    }

    [HttpPatch("{id:guid}/status")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateMentorStatus(
        Guid id,
        UpdateMentorStatusCommand command,
        CancellationToken cancellationToken
    )
    {
        if (id != command.Id)
            return FailureResponse<Guid>(400, Localizer.GetMessage("Mentor.IdBodyMismatch"));

        var result = await _mediator.Send(command, cancellationToken);
        await EvictMentorCache(cancellationToken);
        return OkResponse(result, "Response.Mentor.StatusUpdated");
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteMentor(Guid id, CancellationToken cancellationToken)
    {
        var command = new DeleteMentorCommand(id);
        await _mediator.Send(command, cancellationToken);
        await EvictMentorCache(cancellationToken);
        return NoContentResponse("Response.Mentor.Deleted");
    }

    [HttpGet()]
    [OutputCache(PolicyName = CacheKeys.PublicMentorListPolicy)]
    public async Task<IActionResult> GetMentors(
        [FromQuery] GetMentorQuery query,
        CancellationToken cancellationToken
    )
    {
        var result = await _mediator.Send(query, cancellationToken);
        return OkResponse(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetMentorDetail(Guid id, CancellationToken cancellationToken)
    {
        var query = new GetMentorDetailQuery(id);
        var result = await _mediator.Send(query, cancellationToken);
        return OkResponse(result);
    }
}
