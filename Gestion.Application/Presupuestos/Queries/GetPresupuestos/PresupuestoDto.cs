namespace Gestion.Application.Presupuestos.Queries.GetPresupuestos;

public class PresupuestoDto
{
    public Guid Id { get; set; }
    public string Periodo { get; set; } = string.Empty;
    public DateTime FechaInicio { get; set; }
    public DateTime FechaFin { get; set; }
    public decimal TotalIngresosEstimados { get; set; }
}
