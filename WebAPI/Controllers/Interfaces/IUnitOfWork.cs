using WebAPI.Interfaces;
using System.Threading.Tasks;

namespace WebAPI.Controllers.Interfaces
{
    public interface IUnitOfWork
    {
         ICityRepository CityRepository{get;}
         Task<bool> SaveAsync();
    }
}