using Examen.Dto;

namespace Examen.Interface.Service
{
    public interface IUsuarioService
    {
        Task<UsuarioDto> GetUsuario(UsuarioDto usuario);
    }
}
