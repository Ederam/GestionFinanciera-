using Gestion.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Gestion.Application.Gastos.Queries.GetGastos;

public class GetGastosQueryHandler : IRequestHandler<GetGastosQuery, List<GastoDto>>
{
    private readonly IApplicationDbContext _context;

    public GetGastosQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<GastoDto>> Handle(GetGastosQuery request, CancellationToken cancellationToken)
    {
        return await _context.Gastos
            .AsNoTracking()
            .Where(x => x.UsuarioId == request.UsuarioId)
            .Include(x => x.Categoria)
            .OrderByDescending(x => x.Fecha)
            .Select(x => new GastoDto
            {
                Id = x.Id,
                Monto = x.Monto,
                Fecha = x.Fecha,
                Descripcion = x.Descripcion,
                CategoriaNombre = x.Categoria.Nombre
            })
            .ToListAsync(cancellationToken);
    }
}
