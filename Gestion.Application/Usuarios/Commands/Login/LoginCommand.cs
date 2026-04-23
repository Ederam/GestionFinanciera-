using MediatR;

namespace Gestion.Application.Usuarios.Commands.Login;

public record LoginCommand(string Email, string Password) : IRequest<string>;
