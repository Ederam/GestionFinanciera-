using Gestion.Application.Categorias.Commands.CreateCategoria;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Gestion.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriasController : ControllerBase
{
    private readonly ISender _mediator;

    public CategoriasController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> Create(CreateCategoriaCommand command)
    {
        return await _mediator.Send(command);
    }
}
