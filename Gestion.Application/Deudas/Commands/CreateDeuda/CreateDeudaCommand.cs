using MediatR;

namespace Gestion.Application.Deudas.Commands.CreateDeuda;

public record CreateDeudaCommand(string Nombre, decimal MontoEstimado, int DiaVencimiento, Guid UsuarioId) : IRequest<Guid>;
