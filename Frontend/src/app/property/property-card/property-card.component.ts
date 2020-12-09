import { Component } from '@angular/core';
import { ɵshimHostAttribute } from '@angular/platform-browser';

@Component({
  selector: 'app-property-card',
  //template: `<h1>Hello People </h1>`,
  templateUrl:'property-card.component.html',
  //styles: [`h1 {font-weight:normal;}`]
  styleUrls: ['property-card.component.css']

})
export class PropertyCardComponent{
  Property:any={
    "Id":1,
    "Name":"Kavya House",
    "Type":"House",
    "Price":10000
  }
}
