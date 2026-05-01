using System.IdentityModel.Tokens.Jwt;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class MentorController : BaseApiController
{
    private readonly ISender _mediator;

    public MentorController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpPost()]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateMentor(
        CreateMentorCommand command,
        CancellationToken cancellationToken
    )
    {
        var result = await _mediator.Send(command, cancellationToken);
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
        return OkResponse(result, "Mentor updated successfully");
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteMentor(Guid id, CancellationToken cancellationToken)
    {
        var command = new DeleteMentorCommand(id);
        await _mediator.Send(command, cancellationToken);
        return NoContentResponse("Mentor deleted successfully");
    }

    [HttpGet()]
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
