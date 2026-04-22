using FluentValidation;

namespace Gestion.Application.Categorias.Commands.CreateCategoria;

public class CreateCategoriaCommandValidator : AbstractValidator<CreateCategoriaCommand>
{
    public CreateCategoriaCommandValidator()
    {
        RuleFor(v => v.Nombre)
            .NotEmpty().WithMessage("El nombre de la categoría es obligatorio.")
            .MaximumLength(100).WithMessage("El nombre no debe exceder los 100 caracteres.");

        RuleFor(v => v.ColorHex)
            .NotEmpty().WithMessage("El color es obligatorio.")
            .Matches("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$").WithMessage("Debe ser un código hexadecimal válido (ej. #FF5733).");

        RuleFor(v => v.Icono)
            .NotEmpty().WithMessage("El ícono es obligatorio.");

        RuleFor(v => v.UsuarioId)
            .NotEmpty().WithMessage("La categoría debe estar asociada a un usuario.");
    }
}
