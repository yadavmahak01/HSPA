import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) { }
  //fetch all properties
  getAllProperties(){
    return this.http.get('data/properties.json')
  }
}
