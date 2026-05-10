using System.Text;
using Gestion.API.Middleware;
using Gestion.Application;
using Gestion.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Scalar.AspNetCore;
using Gestion.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1. Configuración de Base de Datos Segura
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

// 2. Configuración de JWT Segura
var jwtKey = builder.Configuration["Jwt:Key"] ?? Environment.GetEnvironmentVariable("JWT_KEY");
if (string.IsNullOrEmpty(jwtKey)) 
{
    jwtKey = "ClaveSuperSecretaDeDesarrollo1234567890"; 
}

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"] ?? builder.Configuration["JwtSettings:Issuer"] ?? "GestionFinancieraAPI",
            ValidAudience = builder.Configuration["Jwt:Audience"] ?? builder.Configuration["JwtSettings:Audience"] ?? "GestionFinancieraApp",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

// 3. CORS Profesional (Restringido)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins(
                "http://localhost:4200", 
                "https://gestion-financiera-seven.vercel.app" 
              )
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Services
builder.Services.AddControllers();
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddAuthorization();
builder.Services.AddExceptionHandler<Gestion.API.Infrastructure.GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer((document, context, cancellationToken) =>
    {
        var securityScheme = new OpenApiSecurityScheme
        {
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT",
            Description = "Introduce el token JWT aquí",
            Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
        };
        document.Components ??= new OpenApiComponents();
        document.Components.SecuritySchemes.Add("Bearer", securityScheme);
        document.SecurityRequirements.Add(new OpenApiSecurityRequirement { { securityScheme, Array.Empty<string>() } });
        return Task.CompletedTask;
    });
});

var app = builder.Build();

// 4. Aplicar Migraciones Automáticamente en Producción
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        context.Database.Migrate();
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error al aplicar migraciones: {ex.Message}");
    }
}

app.UseExceptionHandler();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();
app.UseCors("AllowAngular");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
