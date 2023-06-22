namespace Examen.Interface.Service
{
    public interface IBaseService<T>
    {
        Task<T> GetById(int Id);
        Task<IEnumerable<T>> Get();
        Task<int> Create(T articulo);
        Task<int> Update(int id, T articulo);
        Task<int> Delete(int id);
    }
}
