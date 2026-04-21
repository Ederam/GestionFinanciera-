using Gestion.Application.Ingresos.Commands.CreateIngreso;
using Gestion.Application.Ingresos.Queries.GetIngresos;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Gestion.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class IngresosController : ControllerBase
{
    private readonly ISender _mediator;

    public IngresosController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> Create(CreateIngresoCommand command)
    {
        return await _mediator.Send(command);
    }

    [HttpGet]
    public async Task<ActionResult<List<IngresoDto>>> Get(Guid usuarioId)
    {
        return await _mediator.Send(new GetIngresosQuery(usuarioId));
    }
}
