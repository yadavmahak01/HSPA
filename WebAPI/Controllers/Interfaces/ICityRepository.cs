using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface ICityRepository
    {
         Task<IEnumerable<City>> GetCityAsync();
         void AddCity(City city);
         void DeleteCity(int CityId);
         Task<City> FindCity(int id);
    }
}