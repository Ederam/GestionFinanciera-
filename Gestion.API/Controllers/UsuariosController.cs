using Gestion.Application.Usuarios.Commands.CreateUsuario;
using Gestion.Application.Usuarios.Queries.GetUsuarios;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Gestion.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsuariosController : ControllerBase
{
    private readonly ISender _mediator;

    public UsuariosController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> Create(CreateUsuarioCommand command)
    {
        return await _mediator.Send(command);
    }

    [HttpGet]
    public async Task<ActionResult<List<UsuarioDto>>> Get()
    {
        return await _mediator.Send(new GetUsuariosQuery());
    }
}
