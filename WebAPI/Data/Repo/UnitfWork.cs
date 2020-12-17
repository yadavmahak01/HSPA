using System.Threading.Tasks;
using WebAPI.Controllers.Interfaces;
using WebAPI.Interfaces;

namespace WebAPI.Data.Repo
{
    public class UnitfWork : IUnitOfWork
    {
        private readonly DataContext dc;
        public UnitfWork(DataContext dc)
        {
            this.dc=dc;
        }
        public ICityRepository CityRepository => new CityRepository(dc); 

        public async Task<bool> SaveAsync()
        {
            return await dc.SaveChangesAsync()>0 ;
        }
    }
}