using Examen.Data.DB;
using Examen.Dto;
using Examen.Interface.Repository;
using Microsoft.EntityFrameworkCore;

namespace Examen.Repository
{
    public class ClienteArticuloRepository : IClienteArticuloRepository
    {
        private readonly DbPuntoVentaContext context;

        public ClienteArticuloRepository(DbPuntoVentaContext context)
        {
            this.context = context;
        }

        public async Task<int> Add(ClienteArticuloDto clienteArticulo)
        {
            context.Add(new ClienteArticulo { 
                IdCliente = clienteArticulo.IdCliente,
                IdArticulo = clienteArticulo.IdArticulo,
                Estatus = clienteArticulo.Estatus
            });
            return await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ClienteArticuloDto>> Get(int IdCliente, string estatus)
        {
            return await context
                .ClienteArticulos
                .Include(a => a.IdClienteNavigation)
                .Where(ca => ca.IdCliente == IdCliente && ca.Estatus == estatus)
                .Select(ca => new ClienteArticuloDto
                {
                    IdArticulo = ca.IdCliente,
                    IdCliente = ca.IdCliente,
                    Estatus = ca.Estatus,
                    Articulo = new ArticuloDto 
                    {
                        Id = ca.IdArticuloNavigation.Id,
                        Codigo = ca.IdArticuloNavigation.Codigo,
                        Descripcion = ca.IdArticuloNavigation.Descripcion,
                        Imagen = ca.IdArticuloNavigation.Imagen,
                        Precio = ca.IdArticuloNavigation.Precio,
                        Stock = ca.IdArticuloNavigation.Stock
                    }
                })
                .ToListAsync();
        }

        public async Task<int> Remove(int IdCliente, int IdArticulo)
        {
            var ca = await context
                .ClienteArticulos
                .Where(ca => ca.IdCliente == IdCliente && ca.IdArticulo == IdArticulo)
                .FirstAsync();

            context.Remove(ca);
            return await context.SaveChangesAsync();
        }

        public async Task<int> UpdateStatus(IEnumerable<ClienteArticuloDto> clienteArticulos)
        {
            var list = clienteArticulos.Select(ca => new ClienteArticulo
            {
                IdArticulo = ca.Articulo.Id,
                IdCliente = ca.IdCliente,
                Estatus = ca.Estatus,
                Fecha = DateTime.Now
            });
            context.ClienteArticulos.UpdateRange(list);
            
            return await context.SaveChangesAsync();
        }
    }
}
