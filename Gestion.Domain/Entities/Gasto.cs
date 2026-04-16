using Gestion.Domain.Common;

namespace Gestion.Domain.Entities;

public class Gasto : BaseEntity
{
    public decimal Monto { get; private set; }
    public DateTime Fecha { get; private set; }
    public string Descripcion { get; private set; }

    public Guid CategoriaId { get; private set; }
    public Categoria Categoria { get; private set; } = null!;

    public Guid? DeudaId { get; private set; }
    public Deuda? Deuda { get; private set; }

    public Guid? PresupuestoId { get; private set; }
    public Presupuesto? Presupuesto { get; private set; }

    public Guid UsuarioId { get; private set; }
    public Usuario Usuario { get; private set; } = null!;

    public Gasto(decimal monto, DateTime fecha, string descripcion, Guid categoriaId, Guid usuarioId, Guid? deudaId = null, Guid? presupuestoId = null)
    {
        if (monto <= 0) throw new ArgumentException("El gasto debe ser mayor a cero.");

        Monto = monto;
        Fecha = fecha;
        Descripcion = descripcion;
        CategoriaId = categoriaId;
        UsuarioId = usuarioId;
        DeudaId = deudaId;
        PresupuestoId = presupuestoId;
    }
}
