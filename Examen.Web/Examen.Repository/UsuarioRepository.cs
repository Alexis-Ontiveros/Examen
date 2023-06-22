using Examen.Data.DB;
using Examen.Dto;
using Examen.Interface.Repository;
using Microsoft.EntityFrameworkCore;

namespace Examen.Repository
{
    public class UsuarioRepository : IUsarioRepository
    {
        private readonly DbPuntoVentaContext context;
        public UsuarioRepository(DbPuntoVentaContext context) 
        {
            this.context = context;
        }
        public async Task<UsuarioDto> GetUsuario(UsuarioDto usuario)
        {
            return await context
                .Usuarios
                .Include(u => u.Client)
                .Select(x => new UsuarioDto
                {
                    Id = x.Id,
                    UserName = x.Name,
                    Password = x.Password,
                    Rol = x.Rol,
                    Cliente = new ClienteDto
                    {
                        Id = x.Client.Id,
                        Nombre = x.Client.Nombre,
                        Apellidos = x.Client.Apellidos,
                        Direccion = x.Client.Direccion
                    }
                })
                .Where(w => w.UserName == usuario.UserName && w.Password == usuario.Password)
                .FirstAsync();
        }
    }
}
