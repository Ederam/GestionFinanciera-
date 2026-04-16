using MediatR;

namespace Gestion.Application.Gastos.Commands.CreateGasto;

public record CreateGastoCommand(
    decimal Monto,
    DateTime Fecha,
    string Descripcion,
    Guid CategoriaId,
    Guid UsuarioId,
    Guid? DeudaId = null,
    Guid? PresupuestoId = null) : IRequest<Guid>;
