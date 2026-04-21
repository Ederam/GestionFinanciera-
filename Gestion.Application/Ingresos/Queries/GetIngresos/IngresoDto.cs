namespace Gestion.Application.Ingresos.Queries.GetIngresos;

public class IngresoDto
{
    public Guid Id { get; set; }
    public decimal Monto { get; set; }
    public string Descripcion { get; set; } = string.Empty;
    public DateTime Fecha { get; set; }
}
