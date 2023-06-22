using Examen.Dto;

namespace Examen.Interface.Service
{
    public interface IArticuloTiendaService
    {
        Task<IEnumerable<ArticuloTiendaDetalleDto>> GetArticulosTiendas();
        Task<IEnumerable<ArticuloDto>> GetArticulosNoAsignados(int idTienda);
        Task<IEnumerable<ArticuloDto>> GetByTiendaId(int idTienda);
        Task<int> SaveArticuloTienda(ArticuloTiendaDto articuloTienda);
        Task<int> RemoveArticuloTienda(ArticuloTiendaDto articuloTienda);
    }
}
