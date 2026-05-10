using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Gestion.Application.Common.Interfaces;
using Gestion.Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Gestion.Infrastructure.Authentication;

public class JwtTokenGenerator : IJwtTokenGenerator
{
    private readonly IConfiguration _configuration;

    public JwtTokenGenerator(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateToken(Usuario usuario)
    {
        var secret = _configuration["Jwt:Key"] ?? _configuration["JwtSettings:Secret"] ?? Environment.GetEnvironmentVariable("JWT_KEY") ?? "ClaveSuperSecretaDeDesarrollo1234567890";
        var issuer = _configuration["Jwt:Issuer"] ?? _configuration["JwtSettings:Issuer"] ?? "GestionFinancieraAPI";
        var audience = _configuration["Jwt:Audience"] ?? _configuration["JwtSettings:Audience"] ?? "GestionFinancieraApp";
        var expiryMinutes = int.Parse(_configuration["Jwt:ExpiryMinutes"] ?? _configuration["JwtSettings:ExpiryMinutes"] ?? "60");

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret!));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, usuario.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, usuario.Email),
            new Claim(JwtRegisteredClaimNames.Name, usuario.Nombre),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expiryMinutes),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
