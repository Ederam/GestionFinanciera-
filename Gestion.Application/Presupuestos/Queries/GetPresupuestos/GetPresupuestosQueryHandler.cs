using Gestion.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Gestion.Application.Presupuestos.Queries.GetPresupuestos;

public class GetPresupuestosQueryHandler : IRequestHandler<GetPresupuestosQuery, List<PresupuestoDto>>
{
    private readonly IApplicationDbContext _context;

    public GetPresupuestosQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<PresupuestoDto>> Handle(GetPresupuestosQuery request, CancellationToken cancellationToken)
    {
        return await _context.Presupuestos
            .AsNoTracking()
            .Where(x => x.UsuarioId == request.UsuarioId)
            .OrderByDescending(x => x.FechaInicio)
            .Select(x => new PresupuestoDto
            {
                Id = x.Id,
                Periodo = x.Periodo,
                FechaInicio = x.FechaInicio,
                FechaFin = x.FechaFin,
                TotalIngresosEstimados = x.TotalIngresosEstimados
            })
            .ToListAsync(cancellationToken);
    }
}
