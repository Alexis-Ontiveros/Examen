namespace Examen.Dto
{
    public class ArticuloTiendaDetalleDto
    {

        public TiendaDto Tienda { get; set; } = new TiendaDto();

        public IEnumerable<ArticuloDto> Articulos { get; set; } = Enumerable.Empty<ArticuloDto>();
    }
}
