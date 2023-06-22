using Examen.Dto;

namespace Examen.Interface.Repository
{
    public interface IUsarioRepository
    {
        Task<UsuarioDto> GetUsuario(UsuarioDto usuario);
    }
}
