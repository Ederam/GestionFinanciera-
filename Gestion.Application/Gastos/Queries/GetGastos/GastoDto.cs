namespace Gestion.Application.Gastos.Queries.GetGastos;

public class GastoDto
{
    public Guid Id { get; set; }
    public decimal Monto { get; set; }
    public DateTime Fecha { get; set; }
    public string Descripcion { get; set; } = string.Empty;
    public string CategoriaNombre { get; set; } = string.Empty;
}
