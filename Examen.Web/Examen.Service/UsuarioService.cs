using Examen.Dto;
using Examen.Interface.Repository;
using Examen.Interface.Service;

namespace Examen.Service
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsarioRepository repository;
        public UsuarioService(IUsarioRepository repository) 
        {
            this.repository = repository;
        }
        public async Task<UsuarioDto> GetUsuario(UsuarioDto usuario)
        {
            return await repository.GetUsuario(usuario);
        }
    }
}
