using Gestion.Application.Usuarios.Commands.Login;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Gestion.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ISender _mediator;

    public AuthController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("login")]
    public async Task<ActionResult<string>> Login(LoginCommand command)
    {
        try
        {
            var token = await _mediator.Send(command);
            return Ok(new { Token = token });
        }
        catch (Exception ex)
        {
            return Unauthorized(new { Message = ex.Message });
        }
    }
}
