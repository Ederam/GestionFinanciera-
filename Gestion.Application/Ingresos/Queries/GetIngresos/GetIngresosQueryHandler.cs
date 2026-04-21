using Gestion.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Gestion.Application.Ingresos.Queries.GetIngresos;

public class GetIngresosQueryHandler : IRequestHandler<GetIngresosQuery, List<IngresoDto>>
{
    private readonly IApplicationDbContext _context;

    public GetIngresosQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<IngresoDto>> Handle(GetIngresosQuery request, CancellationToken cancellationToken)
    {
        return await _context.Ingresos
            .AsNoTracking()
            .Where(x => x.UsuarioId == request.UsuarioId)
            .OrderByDescending(x => x.Fecha)
            .Select(x => new IngresoDto
            {
                Id = x.Id,
                Monto = x.Monto,
                Descripcion = x.Descripcion,
                Fecha = x.Fecha
            })
            .ToListAsync(cancellationToken);
    }
}
