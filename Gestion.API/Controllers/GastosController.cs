using Gestion.Application.Gastos.Commands.CreateGasto;
using Gestion.Application.Gastos.Queries.GetGastos;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Gestion.API.Controllers;

/// <summary>
/// Controlador protegido para la gestión de Gastos Financieros.
/// Requiere un Token JWT válido en las cabeceras (Bearer) para su acceso.
/// </summary>
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class GastosController : ControllerBase
{
    private readonly ISender _mediator;

    /// <summary>
    /// Inicializa una nueva instancia de <see cref="GastosController"/>.
    /// </summary>
    /// <param name="mediator">Mediador inyectado para enrutar los comandos y consultas (Patrón CQRS).</param>
    public GastosController(ISender mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Registra un nuevo gasto financiero en el sistema.
    /// </summary>
    /// <param name="command">Datos del gasto (Monto, Fecha, Descripción, etc).</param>
    /// <returns>El identificador único (Guid) del nuevo gasto creado.</returns>
    [HttpPost]
    public async Task<ActionResult<Guid>> Create(CreateGastoCommand command)
    {
        return await _mediator.Send(command);
    }

    /// <summary>
    /// Consulta el listado de todos los gastos registrados por un usuario específico.
    /// </summary>
    /// <param name="usuarioId">El ID del usuario propietario de los gastos.</param>
    /// <returns>Una lista de <see cref="GastoDto"/> con información detallada de cada transacción.</returns>
    [HttpGet]
    public async Task<ActionResult<List<GastoDto>>> Get(Guid usuarioId)
    {
        return await _mediator.Send(new GetGastosQuery(usuarioId));
    }
}
