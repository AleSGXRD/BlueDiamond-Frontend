import { ItemTable } from "../components/client-components/items-table/items-table.component";
import { Invoice } from "../types/api/invoice";
import { Service } from "../types/api/service";
import { ServiceItem } from "../types/api/service-item";

export function serviceDay(item : Service){
  return (new Date(item.serviceDate).toISOString().split('T'))[0]
}
export function calculeAmount(items: ItemTable[]) : number{
  let amount = 0
  for(const item of items){
    amount += calculeItemAmount(item.price, item.quantity, item.discount ?? 0);
  }
  return parseFloat(amount.toFixed(2))
}
export function calculeItemAmount(price:number, quantity:number, discount:number):number{
  return (price * quantity) * ((100 - (discount ?? 0)) / 100)
}

export function getItemPrice(item:ServiceItem, commercial:boolean){
  return commercial == true ? item.priceCommercial ?? item.price : item.price;
}
