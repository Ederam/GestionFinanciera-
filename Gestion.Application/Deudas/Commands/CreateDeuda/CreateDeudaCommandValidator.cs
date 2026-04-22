using FluentValidation;

namespace Gestion.Application.Deudas.Commands.CreateDeuda;

public class CreateDeudaCommandValidator : AbstractValidator<CreateDeudaCommand>
{
    public CreateDeudaCommandValidator()
    {
        RuleFor(v => v.Nombre)
            .NotEmpty().WithMessage("El nombre de la deuda es obligatorio.")
            .MaximumLength(100).WithMessage("El nombre no debe exceder los 100 caracteres.");

        RuleFor(v => v.MontoEstimado)
            .GreaterThan(0).WithMessage("El monto estimado de la deuda debe ser mayor a cero.");

        RuleFor(v => v.DiaVencimiento)
            .InclusiveBetween(1, 31).WithMessage("El día de vencimiento debe estar entre 1 y 31.");

        RuleFor(v => v.UsuarioId)
            .NotEmpty().WithMessage("La deuda debe estar asociada a un usuario.");
    }
}
