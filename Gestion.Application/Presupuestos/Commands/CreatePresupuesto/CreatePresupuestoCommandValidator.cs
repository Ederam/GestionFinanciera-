using FluentValidation;

namespace Gestion.Application.Presupuestos.Commands.CreatePresupuesto;

public class CreatePresupuestoCommandValidator : AbstractValidator<CreatePresupuestoCommand>
{
    public CreatePresupuestoCommandValidator()
    {
        RuleFor(v => v.Periodo)
            .NotEmpty().WithMessage("El periodo es obligatorio (ej. 'Mayo 2026').")
            .MaximumLength(50).WithMessage("El periodo no debe exceder los 50 caracteres.");

        RuleFor(v => v.FechaInicio)
            .NotEmpty().WithMessage("La fecha de inicio es obligatoria.");

        RuleFor(v => v.FechaFin)
            .NotEmpty().WithMessage("La fecha de fin es obligatoria.")
            .GreaterThanOrEqualTo(v => v.FechaInicio).WithMessage("La fecha de fin debe ser mayor o igual a la fecha de inicio.");

        RuleFor(v => v.TotalIngresosEstimados)
            .GreaterThanOrEqualTo(0).WithMessage("El total de ingresos estimados no puede ser negativo.");

        RuleFor(v => v.UsuarioId)
            .NotEmpty().WithMessage("El presupuesto debe estar asociado a un usuario.");
    }
}
