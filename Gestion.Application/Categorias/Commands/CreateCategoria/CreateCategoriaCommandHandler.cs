using Gestion.Application.Common.Interfaces;
using Gestion.Domain.Entities;
using MediatR;

namespace Gestion.Application.Categorias.Commands.CreateCategoria;

public class CreateCategoriaCommandHandler : IRequestHandler<CreateCategoriaCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public CreateCategoriaCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateCategoriaCommand request, CancellationToken cancellationToken)
    {
        var entity = new Categoria(
            request.Nombre,
            request.ColorHex,
            request.Icono,
            request.EsDeuda,
            request.UsuarioId
        );

        _context.Categorias.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
