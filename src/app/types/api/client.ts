import { Estimate } from "./estimate"
import { CreateHistoryClient, HistoryClient } from "./history-client"
import { Invoice } from "./invoice"
import { InvoicePaidRelation } from "./invoice-paid-relation"
import { Service } from "./service"

export interface Client{
  clientId? : number
  name: string
  address : string
  city : string
  cp : number
  country : string
  phoneNumber : string
  email : string
  language : string
  offerSended? : boolean
  offerApproved? :boolean
  stabilizerPrice : number
  maintenancePrice : number
  daysPerWeek : string
  commercial : boolean

  histories?: HistoryClient[]
  invoices? : Invoice[]
  services? : Service[]
  invoicePaidRelations?: InvoicePaidRelation[]
  estimates? : Estimate[]
  // serviceExtrawork: ServiceExtrawork[]
}
export interface CreateClient{
  client: Client;
  history: CreateHistoryClient
}
export interface UpdateClient{
  name?: string
  address ?: string
  city?:string
  cp?:string
  country?:string
  phoneNumber?:string
  email?:string
  language?:string
  offerSended? : boolean
  offerApproved? :boolean
  maintenancePrice? : number
  stabilizerPrice? : number
  daysPerWeek? : string;
  commercial?:boolean
}
