namespace Examen.Dto
{
    public class ClienteArticuloDto
    {
        public int IdCliente { get; set; }

        public int IdArticulo { get; set; }

        public string? Estatus { get; set; } = null!;

        public ArticuloDto? Articulo { get; set; } = null;
    }
}
