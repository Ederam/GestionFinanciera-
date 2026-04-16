using Gestion.Domain.Common;

namespace Gestion.Domain.Entities;

public class Ingreso : BaseEntity
{
    public decimal Monto { get; private set; }
    public string Descripcion { get; private set; }
    public DateTime Fecha { get; private set; }

    public Guid UsuarioId { get; private set; }
    public Usuario Usuario { get; private set; } = null!;

    public Ingreso(decimal monto, string descripcion, DateTime fecha, Guid usuarioId)
    {
        if (monto <= 0) throw new ArgumentException("El monto debe ser mayor a cero.");
        
        Monto = monto;
        Descripcion = descripcion;
        Fecha = fecha;
        UsuarioId = usuarioId;
    }
}
