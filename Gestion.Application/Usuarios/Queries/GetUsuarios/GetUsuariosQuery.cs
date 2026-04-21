using MediatR;

namespace Gestion.Application.Usuarios.Queries.GetUsuarios;

public record GetUsuariosQuery() : IRequest<List<UsuarioDto>>;
