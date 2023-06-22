using Examen.Dto;
using Examen.Interface.Repository;
using Examen.Interface.Service;

namespace Examen.Service
{
    public class ClienteArticuloService : IClienteArticuloService
    {
        private readonly IClienteArticuloRepository repository;

        public ClienteArticuloService(IClienteArticuloRepository repository)
        {
            this.repository = repository;
        }

        public async Task<int> AddArticulo(ClienteArticuloDto clienteArticulo)
        {
            clienteArticulo.Estatus = Status.Proceso.ToString();
            return await repository.Add(clienteArticulo);
        }

        public async Task<int> CancelarLista(int IdCliente)
        {
            var listaCompra = await repository.Get(IdCliente, Status.Proceso.ToString());
            listaCompra.ToList().ForEach(lc => { lc.Estatus = Status.Cancelado.ToString(); });

            return await repository.UpdateStatus(listaCompra);
        }

        public async Task<int> ComprarLista(int IdCliente)
        {
            var listaCompra = await repository.Get(IdCliente, Status.Proceso.ToString());
            listaCompra.ToList().ForEach(lc => { lc.Estatus = Status.Comprado.ToString(); });

            return await repository.UpdateStatus(listaCompra);
        }

        public async Task<IEnumerable<ArticuloDto>> GetCancelado(int IdCliente)
        {
            var list = await repository.Get(IdCliente, Status.Cancelado.ToString());
            return list.Select(s => s.Articulo);
        }

        public async Task<IEnumerable<ArticuloDto>> GetComprado(int IdCliente)
        {
            var list = await repository.Get(IdCliente, Status.Comprado.ToString());
            return list.Select(s => s.Articulo);
        }

        public async Task<IEnumerable<ArticuloDto>> GetProceso(int IdCliente)
        {
            var list = await repository.Get(IdCliente, Status.Proceso.ToString());
            return list.Select(s => s.Articulo);
        }

        public async Task<int> RemoveArticulo(int IdCliente, int IdArticulo)
        {
            return await repository.Remove(IdCliente, IdArticulo);
        }
    }
}
