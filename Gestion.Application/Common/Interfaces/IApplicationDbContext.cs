using Gestion.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Gestion.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Usuario> Usuarios { get; }
    DbSet<Categoria> Categorias { get; }
    DbSet<Deuda> Deudas { get; }
    DbSet<Gasto> Gastos { get; }
    DbSet<Ingreso> Ingresos { get; }
    DbSet<Presupuesto> Presupuestos { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
