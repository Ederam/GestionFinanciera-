using Gestion.Domain.Common;

namespace Gestion.Domain.Entities;

public class Usuario : BaseEntity
{
    public string Nombre { get; private set; }
    public string Email { get; private set; }
    public string PasswordHash { get; private set; }

    public ICollection<Categoria> Categorias { get; private set; } = new List<Categoria>();
    public ICollection<Deuda> Deudas { get; private set; } = new List<Deuda>();
    public ICollection<Gasto> Gastos { get; private set; } = new List<Gasto>();
    public ICollection<Ingreso> Ingresos { get; private set; } = new List<Ingreso>();
    public ICollection<Presupuesto> Presupuestos { get; private set; } = new List<Presupuesto>();

    public Usuario(string nombre, string email, string passwordHash)
    {
        Nombre = nombre;
        Email = email;
        PasswordHash = passwordHash;
    }
}
