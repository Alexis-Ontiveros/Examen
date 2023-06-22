using Examen.Dto;
using Examen.Interface.Repository;
using Examen.Interface.Service;

namespace Examen.Service
{
    public class TiendaService : ITiendaService
    {
        private readonly ITiendaRepository repository;

        public TiendaService(ITiendaRepository repository)
        {
            this.repository = repository;
        }

        public async Task<int> Delete(int id)
        {
            return await repository.Delete(id);
        }

        public async Task<TiendaDto> GetById(int Id)
        {
            return await repository.GetById(Id);
        }

        public async Task<IEnumerable<TiendaDto>> Get()
        {
            return await repository.Get();
        }

        public async Task<int> Create(TiendaDto tienda)
        {
           return await repository.Create(tienda);
        }

        public async Task<int> Update(int id, TiendaDto tienda)
        {
            return await repository.Update(id, tienda);
        }
    }
}
