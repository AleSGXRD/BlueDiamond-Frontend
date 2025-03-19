import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../../../types/api/invoice';
import { PrintOptions } from '../../../types/api/print-options';
import { Router } from '@angular/router';
import { send } from 'node:process';

@Injectable({
  providedIn: 'root'
})
export class InvoiceApiInvoice {

  private route: string = environment.apiUrl + 'invoice/';
  private pdf : string = environment.apiUrl + 'pdf/';

  constructor(private http : HttpClient,
    private router : Router
  ) { }

  getAll() : Observable<Invoice[]>{
    return this.http.get<Invoice[]>(this.route);
  }
  get(id:number) : Observable<Invoice>{
    return this.http.get<Invoice>(this.route + id.toString());
  }
  create(newInvoice: Invoice[]) : Observable<Invoice[]>{
    return this.http.post<Invoice[]>(this.route, newInvoice);
  }
  update(clientId:number,itemId:number,date:Date, updateInvoice: Invoice) : Observable<Invoice>{
    return this.http.patch<Invoice>(this.route + clientId.toString() +'/' + itemId.toString() + '/' + date.toDateString(), updateInvoice);
  }
  delete(invoiceId:number){
    return this.http.delete(this.route + invoiceId.toString());
  }
  viewPdf(invoiceId:number){
    window.open(this.pdf + `view-invoice/${invoiceId.toString()}`,'_blank');
  }
  sendPdf(clientId:number, serviceId: number,invoiceId:number){
    const printOptions: PrintOptions = {send : true, print: true}
    return this.http.post<any>(this.pdf +'generate-invoice/' + clientId.toString() +'/' + serviceId + '/' + invoiceId.toString(), printOptions);
  }
}
