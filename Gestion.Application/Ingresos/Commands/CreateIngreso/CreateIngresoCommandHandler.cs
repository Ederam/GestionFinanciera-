using Gestion.Application.Common.Interfaces;
using Gestion.Domain.Entities;
using MediatR;

namespace Gestion.Application.Ingresos.Commands.CreateIngreso;

public class CreateIngresoCommandHandler : IRequestHandler<CreateIngresoCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public CreateIngresoCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateIngresoCommand request, CancellationToken cancellationToken)
    {
        var entity = new Ingreso(
            request.Monto,
            request.Descripcion,
            request.Fecha,
            request.UsuarioId
        );

        _context.Ingresos.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
