using Gestion.Domain.Entities;

namespace Gestion.Application.Common.Interfaces;

public interface IJwtTokenGenerator
{
    string GenerateToken(Usuario usuario);
}
