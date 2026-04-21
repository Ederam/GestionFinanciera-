using MediatR;

namespace Gestion.Application.Categorias.Queries.GetCategorias;

public record GetCategoriasQuery(Guid UsuarioId) : IRequest<List<CategoriaDto>>;
