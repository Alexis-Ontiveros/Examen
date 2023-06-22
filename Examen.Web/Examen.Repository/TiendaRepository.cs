using Examen.Data.DB;
using Examen.Dto;
using Examen.Interface.Repository;
using Microsoft.EntityFrameworkCore;

namespace Examen.Repository
{
    public class TiendaRepository : ITiendaRepository
    {
        private readonly DbPuntoVentaContext context;

        public TiendaRepository(DbPuntoVentaContext context)
        {
            this.context = context;
        }

        public async Task<int> Delete(int id)
        {
            Tienda tienda = await context.Tiendas.FindAsync(id);
            context.Tiendas.Remove(tienda);
            return await context.SaveChangesAsync();
        }

        public async Task<TiendaDto> GetById(int Id)
        {
            return
                await context
                .Tiendas.Where(tienda => tienda.Id == Id)
                .Select(tienda =>
                    new TiendaDto
                    {
                        Id = tienda.Id,
                        Direccion = tienda.Direccion,
                        Sucursal = tienda.Sucursal,
                    })
                .FirstAsync();
        }

        public async Task<IEnumerable<TiendaDto>> Get()
        {
            return
                await context
                .Tiendas.Select(tienda =>
                    new TiendaDto
                    {
                        Id = tienda.Id,
                        Direccion = tienda.Direccion,
                        Sucursal = tienda.Sucursal,
                    })
                .ToListAsync();
        }

        public async Task<int> Create(TiendaDto tienda)
        {
            context.Add(new Tienda
            {
                Sucursal = tienda.Sucursal,
                Direccion = tienda.Direccion
            });
            return await context.SaveChangesAsync();
        }

        public async Task<int> Update(int id, TiendaDto tienda)
        {
            context.Update(new Tienda
            {
                Id = id,
                Sucursal = tienda.Sucursal,
                Direccion = tienda.Direccion
            });
            return await context.SaveChangesAsync();
        }
    }
}
