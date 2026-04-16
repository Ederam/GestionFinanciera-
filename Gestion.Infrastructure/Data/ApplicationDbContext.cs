using Gestion.Application.Common.Interfaces;
using Gestion.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Gestion.Infrastructure.Data;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Usuario> Usuarios => Set<Usuario>();
    public DbSet<Categoria> Categorias => Set<Categoria>();
    public DbSet<Deuda> Deudas => Set<Deuda>();
    public DbSet<Gasto> Gastos => Set<Gasto>();
    public DbSet<Ingreso> Ingresos => Set<Ingreso>();
    public DbSet<Presupuesto> Presupuestos => Set<Presupuesto>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Configuraciones de propiedades y validaciones en BD (Fluent API)
        
        modelBuilder.Entity<Usuario>(entity => 
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Nombre).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(150);
            entity.HasIndex(e => e.Email).IsUnique();
        });

        modelBuilder.Entity<Categoria>(entity =>
        {
            entity.Property(e => e.Nombre).IsRequired().HasMaxLength(50);
            entity.Property(e => e.ColorHex).HasMaxLength(7);
            
            // Relacion con usuario sin eliminación en cascada para evitar pérdida de datos accidental
            entity.HasOne(e => e.Usuario)
                .WithMany(u => u.Categorias)
                .HasForeignKey(e => e.UsuarioId)
                .OnDelete(DeleteBehavior.Restrict); 
        });

        modelBuilder.Entity<Deuda>(entity =>
        {
            entity.Property(e => e.Nombre).IsRequired().HasMaxLength(100);
            entity.Property(e => e.MontoEstimado).HasPrecision(18, 2);
            
            entity.HasOne(e => e.Usuario)
                .WithMany(u => u.Deudas)
                .HasForeignKey(e => e.UsuarioId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Gasto>(entity =>
        {
            entity.Property(e => e.Monto).HasPrecision(18, 2);
            entity.Property(e => e.Descripcion).HasMaxLength(255);
            
            entity.HasOne(e => e.Usuario)
                .WithMany(u => u.Gastos)
                .HasForeignKey(e => e.UsuarioId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.Categoria)
                .WithMany()
                .HasForeignKey(e => e.CategoriaId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Ingreso>(entity =>
        {
            entity.Property(e => e.Monto).HasPrecision(18, 2);
            entity.Property(e => e.Descripcion).HasMaxLength(255);
            
            entity.HasOne(e => e.Usuario)
                .WithMany(u => u.Ingresos)
                .HasForeignKey(e => e.UsuarioId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Presupuesto>(entity =>
        {
            entity.Property(e => e.Periodo).HasMaxLength(20);
            entity.Property(e => e.TotalIngresosEstimados).HasPrecision(18, 2);
            
            entity.HasOne(e => e.Usuario)
                .WithMany(u => u.Presupuestos)
                .HasForeignKey(e => e.UsuarioId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}
