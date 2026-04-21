using Gestion.Application.Common.Interfaces;
using Gestion.Domain.Entities;
using MediatR;

namespace Gestion.Application.Deudas.Commands.CreateDeuda;

public class CreateDeudaCommandHandler : IRequestHandler<CreateDeudaCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public CreateDeudaCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateDeudaCommand request, CancellationToken cancellationToken)
    {
        var entity = new Deuda(
            request.Nombre,
            request.MontoEstimado,
            request.DiaVencimiento,
            request.UsuarioId
        );

        _context.Deudas.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
