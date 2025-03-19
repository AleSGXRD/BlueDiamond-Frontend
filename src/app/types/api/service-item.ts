
export interface ServiceItem{
  itemId?:number;
  name:string
  description:string
  price:number
  priceCommercial?:number
}

export interface CreateServiceItem{
  name:string
  description:string
  price:number
  priceCommercial?:number
}
export interface UpdateServiceItem{
  name?:string
  description?:string
  price?:number
  priceCommercial?:number
}
