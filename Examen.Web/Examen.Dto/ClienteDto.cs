namespace Examen.Dto
{
    public class ClienteDto
    {
        public int Id { get; set; }

        public string Nombre { get; set; } = null!;

        public string Apellidos { get; set; } = null!;

        public string Direccion { get; set; } = null!;
    }
}
