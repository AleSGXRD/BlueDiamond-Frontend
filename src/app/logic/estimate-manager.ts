import { Estimate } from "../types/api/estimate";

export function calculeAmountEstimate(items:Estimate[]) : number{
  let amount = 0
  for(const item of items){
    amount += calculeItemAmountEstimate(item.price ?? 0, item.quantity, item.discount ?? 0);
  }
  return parseFloat(amount.toFixed(2))
}

export function calculeItemAmountEstimate(price : number, quantity:number, discount:number) : number{
  return (price * quantity) * ((100 - (discount ?? 0)) / 100)
}
