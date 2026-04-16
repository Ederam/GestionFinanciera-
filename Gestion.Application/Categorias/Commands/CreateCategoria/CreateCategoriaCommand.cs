using MediatR;

namespace Gestion.Application.Categorias.Commands.CreateCategoria;

public record CreateCategoriaCommand(string Nombre, string ColorHex, string Icono, bool EsDeuda, Guid UsuarioId) : IRequest<Guid>;
