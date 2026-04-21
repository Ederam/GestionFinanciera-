using Gestion.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Gestion.Application.Deudas.Queries.GetDeudas;

public class GetDeudasQueryHandler : IRequestHandler<GetDeudasQuery, List<DeudaDto>>
{
    private readonly IApplicationDbContext _context;

    public GetDeudasQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<DeudaDto>> Handle(GetDeudasQuery request, CancellationToken cancellationToken)
    {
        return await _context.Deudas
            .AsNoTracking()
            .Where(x => x.UsuarioId == request.UsuarioId)
            .OrderBy(x => x.DiaVencimiento)
            .Select(x => new DeudaDto
            {
                Id = x.Id,
                Nombre = x.Nombre,
                MontoEstimado = x.MontoEstimado,
                DiaVencimiento = x.DiaVencimiento,
                Activa = x.Activa
            })
            .ToListAsync(cancellationToken);
    }
}
