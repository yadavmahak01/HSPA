import { IPropertyBase } from './ipropertybase';

export class Property implements IPropertyBase {
  Id: number;
  SellRent: number;
  Name: string;
  Type: string;
  Seats: number;
  Color:string;
  Price: number;
  Address: string;
  City: string;
  Security?: number;
  Maintenance?: number;
  Image?: string;
  Description?: string;

}
