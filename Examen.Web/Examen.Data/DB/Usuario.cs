using System;
using System.Collections.Generic;

namespace Examen.Data.DB;

public partial class Usuario
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Rol { get; set; } = null!;

    public int ClientId { get; set; }

    public virtual Cliente Client { get; set; } = null!;
}
