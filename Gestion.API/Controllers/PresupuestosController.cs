using Gestion.Application.Presupuestos.Commands.CreatePresupuesto;
using Gestion.Application.Presupuestos.Queries.GetPresupuestos;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Gestion.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PresupuestosController : ControllerBase
{
    private readonly ISender _mediator;

    public PresupuestosController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> Create(CreatePresupuestoCommand command)
    {
        return await _mediator.Send(command);
    }

    [HttpGet]
    public async Task<ActionResult<List<PresupuestoDto>>> Get(Guid usuarioId)
    {
        return await _mediator.Send(new GetPresupuestosQuery(usuarioId));
    }
}
