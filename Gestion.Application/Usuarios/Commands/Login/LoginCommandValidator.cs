using FluentValidation;

namespace Gestion.Application.Usuarios.Commands.Login;

public class LoginCommandValidator : AbstractValidator<LoginCommand>
{
    public LoginCommandValidator()
    {
        RuleFor(v => v.Email)
            .NotEmpty().WithMessage("El email es obligatorio.")
            .EmailAddress().WithMessage("Debe proporcionar un email válido.");

        RuleFor(v => v.Password)
            .NotEmpty().WithMessage("La contraseña es obligatoria.");
    }
}
