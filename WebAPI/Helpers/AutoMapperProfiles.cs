using AutoMapper;
using WebAPI.Dtos;
using WebAPI.Models;

namespace WebAPI.Helpers
{
    //automapper helps in mapping the objects instead of mapping manually
    public class AutoMapperProfiles : Profile
    {
       public AutoMapperProfiles()
       {
           //2 way mapping
            CreateMap<City,CityDto>().ReverseMap();
            CreateMap<City,CityUpdateDto>().ReverseMap();
       }
    }
}