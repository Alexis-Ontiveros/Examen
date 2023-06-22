using System;
using System.Collections.Generic;

namespace Examen.Data.DB;

public partial class ClienteArticulo
{
    public int IdCliente { get; set; }

    public int IdArticulo { get; set; }

    public string Estatus { get; set; } = null!;

    public DateTime Fecha { get; set; }

    public virtual Articulo IdArticuloNavigation { get; set; } = null!;

    public virtual Cliente IdClienteNavigation { get; set; } = null!;
}
