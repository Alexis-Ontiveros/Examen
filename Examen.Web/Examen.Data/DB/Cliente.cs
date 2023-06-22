using System;
using System.Collections.Generic;

namespace Examen.Data.DB;

public partial class Cliente
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string Apellidos { get; set; } = null!;

    public string Direccion { get; set; } = null!;

    public virtual ICollection<ClienteArticulo> ClienteArticulos { get; set; } = new List<ClienteArticulo>();

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
