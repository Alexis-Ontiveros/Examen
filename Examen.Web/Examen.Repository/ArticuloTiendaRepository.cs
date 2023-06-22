using Examen.Data.DB;
using Examen.Dto;
using Examen.Interface.Repository;
using Microsoft.EntityFrameworkCore;

namespace Examen.Repository
{
    public class ArticuloTiendaRepository : IArticuloTiendaRepository
    {
        private readonly DbPuntoVentaContext context;
        public ArticuloTiendaRepository(DbPuntoVentaContext context) 
        {
            this.context = context;
        }

        public async Task<IEnumerable<ArticuloDto>> GetArticulosNoAsignados(int idTienda)
        {
            return await context
                .Articulos
                .Include(i => i.ArticuloTienda)
                .Where(w => !w.ArticuloTienda.Select(x => x.IdTienda).Contains(idTienda))
                .Select(at => new ArticuloDto
                {
                    Id = at.Id,
                    Codigo = at.Codigo,
                    Descripcion = at.Descripcion,
                    Stock = at.Stock,
                    Imagen = at.Imagen,
                    Precio = at.Precio
                })
                .ToArrayAsync();
        }

        public async Task<IEnumerable<ArticuloDto>> GetArticulosTiendas(int idTienda)
        {
            return await context
                .Articulos
                .Include(i => i.ArticuloTienda)
                .Where(w => w.ArticuloTienda.Select(x => x.IdTienda).Contains(idTienda))
                .Select(at => new ArticuloDto
                {
                    Id = at.Id,
                    Codigo = at.Codigo,
                    Descripcion = at.Descripcion,
                    Stock = at.Stock,
                    Imagen = at.Imagen,
                    Precio = at.Precio
                })
                .ToArrayAsync();
        }

        public async Task<IEnumerable<ArticuloTiendaDto>> GetArticulosTiendas()
        {
            return await context
                .ArticuloTienda
                .Include(t => t.IdTiendaNavigation)
                .Include(a => a.IdArticuloNavigation)
                .Select(s => new ArticuloTiendaDto
                {
                    Tienda = new TiendaDto
                    {
                        Id = s.IdTiendaNavigation.Id,
                        Direccion = s.IdTiendaNavigation.Direccion,
                        Sucursal = s.IdTiendaNavigation.Sucursal
                    },
                    Articulo = new ArticuloDto
                    {
                        Id = s.IdArticuloNavigation.Id,
                        Codigo = s.IdArticuloNavigation.Codigo,
                        Descripcion = s.IdArticuloNavigation.Descripcion,
                        Imagen = s.IdArticuloNavigation.Imagen,
                        Precio = s.IdArticuloNavigation.Precio,
                        Stock = s.IdArticuloNavigation.Stock
                    }
                }).ToListAsync();
        }

        public async Task<int> RemoveArticuloTienda(ArticuloTiendaDto articuloTienda)
        {
            ArticuloTiendum articuloTiendum = await context.ArticuloTienda.Where(at => at.IdTienda == articuloTienda.IdTienda && at.IdArticulo == articuloTienda.IdArticulo).FirstAsync();
            context.Remove(articuloTiendum);
            return await context.SaveChangesAsync();
        }

        public async Task<int> SaveArticuloTienda(ArticuloTiendaDto articuloTienda)
        {
            await context.AddAsync(new ArticuloTiendum { IdTienda = articuloTienda.IdTienda, IdArticulo = articuloTienda.IdArticulo });
            return await context.SaveChangesAsync();
        }
    }
}
