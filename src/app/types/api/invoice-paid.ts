import { CreateInvoicePaidRelation } from "./invoice-paid-relation";

export interface InvoicePaid{
  paidDate: Date;

  months : number;
  paid : number;
}
export interface CreateInvoicePaid{
  paidDate:Date;
  months:number;
  paid:number;

  invoices:CreateInvoicePaidRelation[];
}

export interface UpdateInvoicePaid{

  paidDate: Date;

  months? : number;
  paid? : number;
}
