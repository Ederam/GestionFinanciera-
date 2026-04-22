using FluentValidation;

namespace Gestion.Application.Gastos.Commands.CreateGasto;

public class CreateGastoCommandValidator : AbstractValidator<CreateGastoCommand>
{
    public CreateGastoCommandValidator()
    {
        RuleFor(v => v.Monto)
            .GreaterThan(0).WithMessage("El monto del gasto debe ser mayor a cero.");

        RuleFor(v => v.Descripcion)
            .NotEmpty().WithMessage("La descripción es obligatoria.")
            .MaximumLength(200).WithMessage("La descripción no debe exceder los 200 caracteres.");

        RuleFor(v => v.CategoriaId)
            .NotEmpty().WithMessage("El gasto debe estar asociado a una categoría.");

        RuleFor(v => v.UsuarioId)
            .NotEmpty().WithMessage("El gasto debe estar asociado a un usuario.");
    }
}
