using Examen.Dto;

namespace Examen.Interface.Service
{
    public interface IClienteArticuloService
    {
        Task<IEnumerable<ArticuloDto>> GetCancelado(int IdCliente);
        Task<IEnumerable<ArticuloDto>> GetProceso(int IdCliente);
        Task<IEnumerable<ArticuloDto>> GetComprado(int IdCliente);
        Task<int> AddArticulo(ClienteArticuloDto clienteArticulo);
        Task<int> RemoveArticulo(int IdCliente, int IdArticulo);
        Task<int> ComprarLista(int IdCliente);
        Task<int> CancelarLista(int IdCliente);
    }
}
