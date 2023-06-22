namespace Examen.Dto
{
    public class ArticuloTiendaDto
    {
        public int IdArticulo { get; set; }

        public int IdTienda { get; set; }
        public TiendaDto? Tienda { get; set; } = null;
        public ArticuloDto? Articulo { get; set; } = null;
    }
}
