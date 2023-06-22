using Examen.Data.DB;
using Examen.Dto;
using Examen.Interface.Repository;
using Microsoft.EntityFrameworkCore;

namespace Examen.Repository
{
    public class ArticuloRepository : IArticuloRepository
    {
        private readonly DbPuntoVentaContext context;

        public ArticuloRepository(DbPuntoVentaContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<ArticuloDto>> Get()
        {
            return
                await context
                .Articulos.Select(articulo =>
                    new ArticuloDto
                    {
                        Id = articulo.Id,
                        Codigo = articulo.Codigo,
                        Descripcion = articulo.Descripcion,
                        Imagen = articulo.Imagen,
                        Precio = articulo.Precio,
                        Stock = articulo.Stock
                    })
                .ToListAsync();
        }

        public async Task<ArticuloDto> GetById(int Id)
        {
            return
                await context
                .Articulos
                .Where(articulo => articulo.Id == Id)
                .Select(articulo =>
                    new ArticuloDto
                    {
                        Id = articulo.Id,
                        Codigo = articulo.Codigo,
                        Descripcion = articulo.Descripcion,
                        Imagen = articulo.Imagen,
                        Precio = articulo.Precio,
                        Stock = articulo.Stock
                    })
                .FirstAsync();
        }

        public async Task<int> Delete(int id)
        {
            Articulo articulo = await context.Articulos.FindAsync(id);
            context.Articulos.Remove(articulo);
            return await context.SaveChangesAsync();
        }

        public async Task<int> Update(int id, ArticuloDto articulo)
        {
            context.Update(new Articulo
            {
                Id = id,
                Codigo = articulo.Codigo,
                Descripcion = articulo.Descripcion,
                Imagen = articulo.Imagen,
                Precio = articulo.Precio,
                Stock = articulo.Stock
            });
            return await context.SaveChangesAsync();
        }

        public async Task<int> Create(ArticuloDto articulo)
        {
            context.Add(new Articulo
            {
                Codigo = articulo.Codigo,
                Descripcion = articulo.Descripcion,
                Imagen = articulo.Imagen,
                Precio = articulo.Precio,
                Stock = articulo.Stock
            });
            return await context.SaveChangesAsync();
        }
    }
}
