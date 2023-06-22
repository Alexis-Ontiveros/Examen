using Examen.Dto;
using Examen.Interface.Repository;
using Examen.Interface.Service;

namespace Examen.Service
{
    public class ArticuloTiendaService : IArticuloTiendaService
    {
        private readonly IArticuloTiendaRepository repository;

        public ArticuloTiendaService(IArticuloTiendaRepository repository)
        {
            this.repository = repository;
        }

        public async Task<IEnumerable<ArticuloDto>> GetArticulosNoAsignados(int idTienda)
        {
            return await repository.GetArticulosNoAsignados(idTienda);
        }

        public async Task<IEnumerable<ArticuloTiendaDetalleDto>> GetArticulosTiendas()
        {
            var list = await repository.GetArticulosTiendas();

            var group = list
                .GroupBy(x => new { tiendaId = x.Tienda.Id, sucursal = string.Concat(x.Tienda.Sucursal, " - ", x.Tienda.Direccion) })
                .Select(y => new
                {
                    Tienda = y.Key,
                    Articulos = y.Select(s => s.Articulo)
                });

            var values = new List<ArticuloTiendaDetalleDto>();

            foreach(var item in group) 
            {
                values.Add(new ArticuloTiendaDetalleDto { Tienda = new TiendaDto { Id = item.Tienda.tiendaId, Sucursal = item.Tienda.sucursal }, Articulos = item.Articulos });
            }

            return values;
        }

        public async Task<IEnumerable<ArticuloDto>> GetByTiendaId(int idTienda)
        {
            return await repository.GetArticulosTiendas(idTienda);
        }

        public async Task<int> RemoveArticuloTienda(ArticuloTiendaDto articuloTienda)
        {
            return await repository.RemoveArticuloTienda(articuloTienda);
        }

        public async Task<int> SaveArticuloTienda(ArticuloTiendaDto articuloTienda)
        {
            return await repository.SaveArticuloTienda(articuloTienda);
        }
    }
}
