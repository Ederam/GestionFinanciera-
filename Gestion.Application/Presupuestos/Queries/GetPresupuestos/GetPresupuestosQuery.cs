using MediatR;

namespace Gestion.Application.Presupuestos.Queries.GetPresupuestos;

public record GetPresupuestosQuery(Guid UsuarioId) : IRequest<List<PresupuestoDto>>;
