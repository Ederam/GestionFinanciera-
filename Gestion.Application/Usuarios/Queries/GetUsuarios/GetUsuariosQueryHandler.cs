using Gestion.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Gestion.Application.Usuarios.Queries.GetUsuarios;

public class GetUsuariosQueryHandler : IRequestHandler<GetUsuariosQuery, List<UsuarioDto>>
{
    private readonly IApplicationDbContext _context;

    public GetUsuariosQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<UsuarioDto>> Handle(GetUsuariosQuery request, CancellationToken cancellationToken)
    {
        return await _context.Usuarios
            .AsNoTracking()
            .Select(x => new UsuarioDto
            {
                Id = x.Id,
                Nombre = x.Nombre,
                Email = x.Email
            })
            .ToListAsync(cancellationToken);
    }
}
