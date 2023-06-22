﻿namespace Examen.Dto
{
    public class UsuarioDto
    {
        public int Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string? Rol { get; set; } = null;
        public ClienteDto? Cliente { get; set; } = null;
    }
}
