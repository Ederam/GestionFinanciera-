using Gestion.Domain.Common;

namespace Gestion.Domain.Entities;

public class Presupuesto : BaseEntity
{
    public string Periodo { get; private set; }
    public DateTime FechaInicio { get; private set; }
    public DateTime FechaFin { get; private set; }
    public decimal TotalIngresosEstimados { get; private set; }

    public Guid UsuarioId { get; private set; }
    public Usuario Usuario { get; private set; } = null!;

    public Presupuesto(string periodo, DateTime fechaInicio, DateTime fechaFin, decimal totalIngresosEstimados, Guid usuarioId)
    {
        Periodo = periodo;
        FechaInicio = fechaInicio;
        FechaFin = fechaFin;
        TotalIngresosEstimados = totalIngresosEstimados;
        UsuarioId = usuarioId;
    }
}
