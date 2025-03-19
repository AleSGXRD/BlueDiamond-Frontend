export interface InvoicePaidRelation {
  paidDate: Date;
  invoiceId:number;
  serviceid: number;
  itemId: number;
  clientId:number;
}
export interface CreateInvoicePaidRelation {
  paidDate?: Date;
  invoiceId:number;
  serviceid: number;
  itemId: number;
  clientId:number;
}
