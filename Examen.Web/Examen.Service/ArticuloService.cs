using Examen.Dto;
using Examen.Interface.Repository;
using Examen.Interface.Service;

namespace Examen.Service
{
    public class ArticuloService : IArticuloService
    {
        private readonly IArticuloRepository repository;

        public ArticuloService(IArticuloRepository repository)
        {
            this.repository = repository;
        }

        public async Task<int> Delete(int id)
        {
            return await repository.Delete(id);
        }

        public async Task<ArticuloDto> GetById(int Id)
        {
            return await repository.GetById(Id);
        }

        public async Task<IEnumerable<ArticuloDto>> Get()
        {
            return await repository.Get();
        }

        public async Task<int> Create(ArticuloDto articulo)
        {
            return await repository.Create(articulo);
        }

        public async Task<int> Update(int id, ArticuloDto articulo)
        {
            return await repository.Update(id, articulo);
        }
    }
}
