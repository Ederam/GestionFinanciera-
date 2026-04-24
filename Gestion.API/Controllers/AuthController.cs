using Gestion.Application.Usuarios.Commands.Login;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Gestion.API.Controllers;

/// <summary>
/// Controlador responsable de la autenticación de usuarios.
/// Expone endpoints para el inicio de sesión y la generación de Tokens JWT.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ISender _mediator;

    /// <summary>
    /// Inicializa una nueva instancia de <see cref="AuthController"/>.
    /// </summary>
    /// <param name="mediator">Instancia del mediador (CQRS) inyectada por dependencias.</param>
    public AuthController(ISender mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Inicia sesión de un usuario y devuelve un Token JWT firmado.
    /// </summary>
    /// <param name="command">Comando que contiene el Email y la Contraseña.</param>
    /// <returns>El Token JWT para ser utilizado en las cabeceras de autorización, o un error 401 si falla.</returns>
    [HttpPost("login")]
    public async Task<ActionResult<string>> Login(LoginCommand command)
    {
        try
        {
            var token = await _mediator.Send(command);
            return Ok(new { Token = token });
        }
        catch (Exception ex)
        {
            return Unauthorized(new { Message = ex.Message });
        }
    }
}
