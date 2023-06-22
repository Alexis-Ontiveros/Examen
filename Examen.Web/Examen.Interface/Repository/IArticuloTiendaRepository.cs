using Examen.Dto;

namespace Examen.Interface.Repository
{
    public interface IArticuloTiendaRepository
    {
        Task<IEnumerable<ArticuloTiendaDto>> GetArticulosTiendas();
        Task<IEnumerable<ArticuloDto>> GetArticulosNoAsignados(int idTienda);
        Task<IEnumerable<ArticuloDto>> GetArticulosTiendas(int idTienda);
        Task<int> SaveArticuloTienda(ArticuloTiendaDto articuloTienda);
        Task<int> RemoveArticuloTienda(ArticuloTiendaDto articuloTienda);
    }
}
