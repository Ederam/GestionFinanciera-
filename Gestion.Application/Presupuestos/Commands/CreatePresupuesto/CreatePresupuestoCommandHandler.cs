using Gestion.Application.Common.Interfaces;
using Gestion.Domain.Entities;
using MediatR;

namespace Gestion.Application.Presupuestos.Commands.CreatePresupuesto;

public class CreatePresupuestoCommandHandler : IRequestHandler<CreatePresupuestoCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public CreatePresupuestoCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreatePresupuestoCommand request, CancellationToken cancellationToken)
    {
        var entity = new Presupuesto(
            request.Periodo,
            request.FechaInicio,
            request.FechaFin,
            request.TotalIngresosEstimados,
            request.UsuarioId
        );

        _context.Presupuestos.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
