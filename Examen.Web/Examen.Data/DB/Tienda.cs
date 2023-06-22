using System;
using System.Collections.Generic;

namespace Examen.Data.DB;

public partial class Tienda
{
    public int Id { get; set; }

    public string Sucursal { get; set; } = null!;

    public string Direccion { get; set; } = null!;

    public virtual ICollection<ArticuloTiendum> ArticuloTienda { get; set; } = new List<ArticuloTiendum>();
}
