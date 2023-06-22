namespace Examen.Dto
{
    public class ArticuloDto
    {
        public int Id { get; set; }

        public string Codigo { get; set; } = null!;

        public string Descripcion { get; set; } = null!;

        public decimal Precio { get; set; }

        public byte[]? Imagen { get; set; }

        public int Stock { get; set; }
    }
}
