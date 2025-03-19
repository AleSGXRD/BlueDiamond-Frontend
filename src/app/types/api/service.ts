import { Invoice } from "./invoice";
import { ServiceItem } from "./service-item";

export interface Service{
  clientId:number;
  itemId:number;
  serviceId?: number;

  serviceDate:Date;
  manyMonths:number;
  permanent:boolean;
  active:boolean;
  estimateCreated:boolean;
  finished?:boolean;
  discount?:number;
  quantity:number;

  invoices? : Invoice[]
  item?:ServiceItem
}
export interface UpdateService{
  clientId:number;
  itemId:number;
  serviceId:number;
  serviceDate?:Date;

  manyMonths?:number;
  finished?:boolean;
  permanent?:boolean;
  active?:boolean;
  discount?:number;
  quantity?:number;

}
