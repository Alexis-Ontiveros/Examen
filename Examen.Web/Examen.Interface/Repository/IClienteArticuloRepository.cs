using Examen.Dto;

namespace Examen.Interface.Repository
{
    public interface IClienteArticuloRepository
    {
        Task<IEnumerable<ClienteArticuloDto>> Get(int IdCliente, string estatus);
        Task<int> Add(ClienteArticuloDto clienteArticulo);
        Task<int> Remove(int IdCliente, int IdArticulo);
        Task<int> UpdateStatus(IEnumerable<ClienteArticuloDto> clienteArticulos);
    }
}
