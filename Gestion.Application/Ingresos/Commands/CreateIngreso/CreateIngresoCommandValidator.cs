using FluentValidation;

namespace Gestion.Application.Ingresos.Commands.CreateIngreso;

public class CreateIngresoCommandValidator : AbstractValidator<CreateIngresoCommand>
{
    public CreateIngresoCommandValidator()
    {
        RuleFor(v => v.Monto)
            .GreaterThan(0).WithMessage("El monto del ingreso debe ser mayor a cero.");

        RuleFor(v => v.Descripcion)
            .NotEmpty().WithMessage("La descripción es obligatoria.")
            .MaximumLength(200).WithMessage("La descripción no debe exceder los 200 caracteres.");

        RuleFor(v => v.UsuarioId)
            .NotEmpty().WithMessage("El ingreso debe estar asociado a un usuario.");
    }
}
