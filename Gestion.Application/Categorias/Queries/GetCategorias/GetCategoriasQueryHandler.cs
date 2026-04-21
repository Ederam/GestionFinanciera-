using Gestion.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Gestion.Application.Categorias.Queries.GetCategorias;

public class GetCategoriasQueryHandler : IRequestHandler<GetCategoriasQuery, List<CategoriaDto>>
{
    private readonly IApplicationDbContext _context;

    public GetCategoriasQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<CategoriaDto>> Handle(GetCategoriasQuery request, CancellationToken cancellationToken)
    {
        return await _context.Categorias
            .AsNoTracking()
            .Where(x => x.UsuarioId == request.UsuarioId)
            .Select(x => new CategoriaDto
            {
                Id = x.Id,
                Nombre = x.Nombre,
                ColorHex = x.ColorHex,
                Icono = x.Icono,
                EsDeuda = x.EsDeuda
            })
            .ToListAsync(cancellationToken);
    }
}
