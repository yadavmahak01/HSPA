﻿using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Controllers.Interfaces;
using WebAPI.Dtos;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        public CityController(IUnitOfWork uow,IMapper mapper)
        {
            this.uow =uow;
            this.mapper=mapper;

        }
        //Get api/city
        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
            var cities = await uow.CityRepository.GetCityAsync();

            var citiesDto = mapper.Map<IEnumerable<CityDto>>(cities);
           // var citiesDto=from c in cities
            //select new CityDto(){
              //  Id=c.Id,
                //Name=c.Name

            //};
            return Ok(citiesDto);
        }

        
        // Post api/city/post --post data in json format
        [HttpPost("post")]
        public async Task<IActionResult> AddCity(CityDto cityDto)
        {
            var city = mapper.Map<City>(cityDto);
            city.LastUpdatedBy=1;
            city.LastUpdatedOn=DateTime.Now;
            //var city=new City{
              //  Name=cityDto.Name,
                //LastUpdatedBy=1,
                //LastUpdatedOn=DateTime.Now
            //};
            uow.CityRepository.AddCity(city);
            await uow.SaveAsync();
            return StatusCode(201);
        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCity(int id,CityDto cityDto){

            try{
                if(id!=cityDto.Id)
                return BadRequest("Update not allowed");

            var cityFromDb = await uow.CityRepository.FindCity(id);
            
            if(cityFromDb==null)
                return BadRequest("Update not allowed");
            cityFromDb.LastUpdatedBy=1;
            cityFromDb.LastUpdatedOn=DateTime.Now;
            mapper.Map(cityDto,cityFromDb);
            throw new Exception("Some unkown error occured");
            await uow.SaveAsync();
            return StatusCode(200);
            }
            catch{
                return StatusCode(500,"Some unkkown error has occured");
            }
        }

        [HttpPatch("update/{id}")]
        public async Task<IActionResult> UpdateCityPatch(int id,JsonPatchDocument<City> cityToPatch){

            var cityFromDb = await uow.CityRepository.FindCity(id);
            cityFromDb.LastUpdatedBy=1;
            cityFromDb.LastUpdatedOn=DateTime.Now;
            cityToPatch.ApplyTo(cityFromDb,ModelState);
            await uow.SaveAsync();
            return StatusCode(200);
        }
        [HttpPut("updateCityName/{id}")]
        public async Task<IActionResult> UpdateCity(int id,CityUpdateDto cityDto){

            var cityFromDb = await uow.CityRepository.FindCity(id);
            cityFromDb.LastUpdatedBy=1;
            cityFromDb.LastUpdatedOn=DateTime.Now;
            mapper.Map(cityDto,cityFromDb);
            await uow.SaveAsync();
            return StatusCode(200);
        }

        
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            uow.CityRepository.DeleteCity(id);
            await uow.SaveAsync();
            return Ok(id);
        }


    }
}
