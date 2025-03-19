import { Invoice } from "../types/api/invoice";

export function calculeAmountInvoice(items:Invoice[]) : number{
  let amount = 0
  for(const item of items){
    if(item.item)
    amount += calculeItemAmountInvoice(item.price ?? 0, item.quantity, item.discount ?? 0);
  }
  return parseFloat(amount.toFixed(2))
}

export function calculeItemAmountInvoice(price : number, quantity:number, discount:number) : number{
  return (price * quantity) * ((100 - (discount ?? 0)) / 100)
}
