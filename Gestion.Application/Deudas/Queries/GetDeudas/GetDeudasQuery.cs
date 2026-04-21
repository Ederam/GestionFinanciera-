using MediatR;

namespace Gestion.Application.Deudas.Queries.GetDeudas;

public record GetDeudasQuery(Guid UsuarioId) : IRequest<List<DeudaDto>>;
