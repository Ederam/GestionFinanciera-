using MediatR;

namespace Gestion.Application.Gastos.Queries.GetGastos;

public record GetGastosQuery(Guid UsuarioId) : IRequest<List<GastoDto>>;
