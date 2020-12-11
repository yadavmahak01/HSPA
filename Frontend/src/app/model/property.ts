import { IPropertyBase } from './ipropertybase';

export class Property implements IPropertyBase {
  Id: number;
  SellRent: number;
  Name: string;
  Type: string;
  Seats: number;
  Price: number;
  Address: string;
  Address2?: string;
  City: string;
  Security?: number;
  Maintenance?: number;
  Possession?: string;
  Image?: string;
  Description?: string;
  PostedOn: string;
  PostedBy: number;
}
