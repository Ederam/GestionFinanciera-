using Gestion.Application.Gastos.Commands.CreateGasto;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Gestion.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GastosController : ControllerBase
{
    private readonly ISender _mediator;

    public GastosController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> Create(CreateGastoCommand command)
    {
        return await _mediator.Send(command);
    }
}
