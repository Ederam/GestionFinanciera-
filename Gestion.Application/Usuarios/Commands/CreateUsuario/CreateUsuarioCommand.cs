using MediatR;

namespace Gestion.Application.Usuarios.Commands.CreateUsuario;

public record CreateUsuarioCommand(string Nombre, string Email, string Password) : IRequest<Guid>;
