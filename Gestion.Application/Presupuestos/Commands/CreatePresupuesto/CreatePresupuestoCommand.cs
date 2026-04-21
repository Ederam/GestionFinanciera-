using MediatR;

namespace Gestion.Application.Presupuestos.Commands.CreatePresupuesto;

public record CreatePresupuestoCommand(string Periodo, DateTime FechaInicio, DateTime FechaFin, decimal TotalIngresosEstimados, Guid UsuarioId) : IRequest<Guid>;
