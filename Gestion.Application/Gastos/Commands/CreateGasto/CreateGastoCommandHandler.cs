using Gestion.Application.Common.Interfaces;
using Gestion.Domain.Entities;
using MediatR;

namespace Gestion.Application.Gastos.Commands.CreateGasto;

public class CreateGastoCommandHandler : IRequestHandler<CreateGastoCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public CreateGastoCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateGastoCommand request, CancellationToken cancellationToken)
    {
        var entity = new Gasto(
            request.Monto,
            request.Fecha,
            request.Descripcion,
            request.CategoriaId,
            request.UsuarioId,
            request.DeudaId,
            request.PresupuestoId
        );

        _context.Gastos.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
