import { InvoicePaidRelation } from "./invoice-paid-relation";
import { ServiceItem } from "./service-item";

export interface Invoice{
  invoiceId:number;
  clientId:number;
  itemId:number;
  serviceId: number;

  itemName:string;
  invoiceDate:Date;
  discount?:number;
  quantity:number;
  price?:number;

  paid?:InvoicePaidRelation
  item?:ServiceItem
}
