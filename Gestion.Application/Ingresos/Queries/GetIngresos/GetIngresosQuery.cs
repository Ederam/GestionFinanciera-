using MediatR;

namespace Gestion.Application.Ingresos.Queries.GetIngresos;

public record GetIngresosQuery(Guid UsuarioId) : IRequest<List<IngresoDto>>;
