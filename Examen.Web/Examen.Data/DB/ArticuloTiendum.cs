using System;
using System.Collections.Generic;

namespace Examen.Data.DB;

public partial class ArticuloTiendum
{
    public int IdArticulo { get; set; }

    public int IdTienda { get; set; }

    public DateTime Fecha { get; set; }

    public virtual Articulo IdArticuloNavigation { get; set; } = null!;

    public virtual Tienda IdTiendaNavigation { get; set; } = null!;
}
