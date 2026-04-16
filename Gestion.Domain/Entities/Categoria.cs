using Gestion.Domain.Common;

namespace Gestion.Domain.Entities;

public class Categoria : BaseEntity
{
    public string Nombre { get; private set; }
    public string ColorHex { get; private set; }
    public string Icono { get; private set; }
    public bool EsDeuda { get; private set; }

    public Guid UsuarioId { get; private set; }
    public Usuario Usuario { get; private set; } = null!;

    public Categoria(string nombre, string colorHex, string icono, bool esDeuda, Guid usuarioId)
    {
        Nombre = nombre;
        ColorHex = colorHex;
        Icono = icono;
        EsDeuda = esDeuda;
        UsuarioId = usuarioId;
    }
}
