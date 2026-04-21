namespace Gestion.Application.Categorias.Queries.GetCategorias;

public class CategoriaDto
{
    public Guid Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string ColorHex { get; set; } = string.Empty;
    public string Icono { get; set; } = string.Empty;
    public bool EsDeuda { get; set; }
}
