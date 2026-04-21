using MediatR;

namespace Gestion.Application.Ingresos.Commands.CreateIngreso;

public record CreateIngresoCommand(decimal Monto, string Descripcion, DateTime Fecha, Guid UsuarioId) : IRequest<Guid>;
