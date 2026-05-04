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
            return FailureResponse<Guid>(400, "ID in URL does not match MentorId in body.");

        // check if user is mentor and trying to add skill to other mentor
        if (User.IsInRole(Roles.Mentor.ToString()))
        {
            var userIdClaim = User.Claims.FirstOrDefault(c =>
                c.Type == JwtRegisteredClaimNames.Sub
            );
            if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
                return FailureResponse<Guid>(401, "Invalid user ID in token.");

            if (userId != command.MentorId)
                return FailureResponse<Guid>(403, "You can only add skills to your own profile.");
        }

        var result = await _mediator.Send(command, cancellationToken);
        return CreatedResponse(result, "Skill added to mentor successfully");
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
            return FailureResponse<Guid>(400, "ID in URL does not match MentorId in body.");

        var result = await _mediator.Send(command, cancellationToken);
        return CreatedResponse(result, "Slot created successfully");
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
            return FailureResponse<Guid>(400, "ID in URL does not match ID in body.");

        var result = await _mediator.Send(command, cancellationToken);
        await EvictMentorCache(cancellationToken);
        return OkResponse(result, "Mentor updated successfully");
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
            return FailureResponse<Guid>(400, "ID in URL does not match MentorId in body.");

        if (slotId != command.Id)
            return FailureResponse<Guid>(400, "Slot ID in URL does not match ID in body.");

        var result = await _mediator.Send(command, cancellationToken);
        return OkResponse(result, "Slot updated successfully");
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteMentor(Guid id, CancellationToken cancellationToken)
    {
        var command = new DeleteMentorCommand(id);
        await _mediator.Send(command, cancellationToken);
        await EvictMentorCache(cancellationToken);
        return NoContentResponse("Mentor deleted successfully");
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
