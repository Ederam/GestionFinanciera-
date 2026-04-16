using Gestion.Domain.Common;

namespace Gestion.Domain.Entities;

public class Deuda : BaseEntity
{
    public string Nombre { get; private set; }
    public decimal MontoEstimado { get; private set; }
    public int DiaVencimiento { get; private set; }
    public bool Activa { get; private set; } = true;

    public Guid UsuarioId { get; private set; }
    public Usuario Usuario { get; private set; } = null!;

    public Deuda(string nombre, decimal montoEstimado, int diaVencimiento, Guid usuarioId)
    {
        Nombre = nombre;
        MontoEstimado = montoEstimado;
        DiaVencimiento = diaVencimiento;
        UsuarioId = usuarioId;
    }

    public void Desactivar() => Activa = false;
    public void Activar() => Activa = true;
}
