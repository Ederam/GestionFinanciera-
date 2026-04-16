using Gestion.Application.Common.Interfaces;
using Gestion.Domain.Entities;
using MediatR;
using System.Security.Cryptography;

namespace Gestion.Application.Usuarios.Commands.CreateUsuario;

public class CreateUsuarioCommandHandler : IRequestHandler<CreateUsuarioCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public CreateUsuarioCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateUsuarioCommand request, CancellationToken cancellationToken)
    {
        // Enfoque Profesional para Contraseñas: Uso de PBKDF2 
        // Generamos un "Salt" de 16 bytes y un "Hash" de 32 bytes de alta seguridad
        byte[] salt = RandomNumberGenerator.GetBytes(16);
        using var pbkdf2 = new Rfc2898DeriveBytes(request.Password, salt, 100000, HashAlgorithmName.SHA256);
        byte[] hash = pbkdf2.GetBytes(32);
        
        // Combinamos Salt + Hash para almacenarlo seguro en BD
        byte[] hashBytes = new byte[48];
        Array.Copy(salt, 0, hashBytes, 0, 16);
        Array.Copy(hash, 0, hashBytes, 16, 32);

        string savedPasswordHash = Convert.ToBase64String(hashBytes);

        var entity = new Usuario(
            request.Nombre,
            request.Email,
            savedPasswordHash
        );

        _context.Usuarios.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
