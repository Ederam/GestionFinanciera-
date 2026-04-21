namespace Gestion.Application.Deudas.Queries.GetDeudas;

public class DeudaDto
{
    public Guid Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public decimal MontoEstimado { get; set; }
    public int DiaVencimiento { get; set; }
    public bool Activa { get; set; }
}
