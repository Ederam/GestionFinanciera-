using Gestion.Application.Deudas.Commands.CreateDeuda;
using Gestion.Application.Deudas.Queries.GetDeudas;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Gestion.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DeudasController : ControllerBase
{
    private readonly ISender _mediator;

    public DeudasController(ISender mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> Create(CreateDeudaCommand command)
    {
        return await _mediator.Send(command);
    }

    [HttpGet]
    public async Task<ActionResult<List<DeudaDto>>> Get(Guid usuarioId)
    {
        return await _mediator.Send(new GetDeudasQuery(usuarioId));
    }
}
