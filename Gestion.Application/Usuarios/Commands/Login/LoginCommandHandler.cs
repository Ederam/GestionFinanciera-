using Gestion.Application.Common.Exceptions;
using Gestion.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace Gestion.Application.Usuarios.Commands.Login;

public class LoginCommandHandler : IRequestHandler<LoginCommand, string>
{
    private readonly IApplicationDbContext _context;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public LoginCommandHandler(IApplicationDbContext context, IJwtTokenGenerator jwtTokenGenerator)
    {
        _context = context;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<string> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var usuario = await _context.Usuarios
            .SingleOrDefaultAsync(x => x.Email == request.Email, cancellationToken);

        if (usuario == null)
        {
            throw new Exception("Credenciales inválidas."); // En un entorno real, usar UnauthorizedException
        }

        // Extraer los bytes del string Base64 guardado
        byte[] hashBytes = Convert.FromBase64String(usuario.PasswordHash);

        // Obtener el Salt (los primeros 16 bytes)
        byte[] salt = new byte[16];
        Array.Copy(hashBytes, 0, salt, 0, 16);

        // Hashear el password enviado usando el mismo Salt
        using var pbkdf2 = new Rfc2898DeriveBytes(request.Password, salt, 100000, HashAlgorithmName.SHA256);
        byte[] hash = pbkdf2.GetBytes(32);

        // Comparar los resultados
        for (int i = 0; i < 32; i++)
        {
            if (hashBytes[i + 16] != hash[i])
            {
                throw new Exception("Credenciales inválidas.");
            }
        }

        // Si es correcto, generar Token
        return _jwtTokenGenerator.GenerateToken(usuario);
    }
}
