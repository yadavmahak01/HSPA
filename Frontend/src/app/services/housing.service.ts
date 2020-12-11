import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IPropertyBase } from '../model/ipropertybase';
import { Property } from '../model/property';
import { IProperty } from '../model/iproperty';
@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) { }
  //fetch all properties
  getAllProperties(SellRent:number): Observable<IProperty[]>{
    return this.http.get('data/properties.json').pipe(
      map(data=>{
        const propertiesArray:Array<IProperty>=[];
        const localProperties = JSON.parse(localStorage.getItem('newProp'));

      if (localProperties) {
        for (const id in localProperties) {
          if (SellRent) {
          if (localProperties.hasOwnProperty(id) && localProperties[id].SellRent === SellRent) {
            propertiesArray.push(localProperties[id]);
          }
        } else {
          propertiesArray.push(localProperties[id]);
        }
        }
      }
        for(const id in data){
          //object is the direct instance of array
          if(data.hasOwnProperty(id)&& data[id].SellRent===SellRent){
          propertiesArray.push(data[id]);
        }
      }
      return propertiesArray;
      })
    );
    }
  addProperty(property:Property){
    let newProp=[property];
    //add new prop in array if newProp exists
    if(localStorage.getItem('newProp')){
      newProp=[property,
                ...JSON.parse(localStorage.getItem('newProp'))
    ];
  }
    localStorage.setItem('newProp', JSON.stringify(property));
}
  newPropID(){
    if(localStorage.getItem('PID')){
      localStorage.setItem('PID',String(+localStorage.getItem('PID')+1));
      return +localStorage.getItem('PID')
    }
    else{
      localStorage.setItem('PID','101');
      return 101;

    }
  }
}

