import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateInvoicePaid, InvoicePaid, UpdateInvoicePaid } from '../../../types/api/invoice-paid';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoicePaidApiService {
  private route: string = environment.apiUrl + 'invoice-paid/';

  constructor(private http: HttpClient) { }

  getAll() : Observable<InvoicePaid[]>{
    return this.http.get<InvoicePaid[]>(this.route);
  }
  get(id:number) : Observable<InvoicePaid>{
    return this.http.get<InvoicePaid>(this.route + id.toString());
  }
  create(newInvoicePaid: CreateInvoicePaid) : Observable<InvoicePaid>{
    return this.http.post<InvoicePaid>(this.route, newInvoicePaid);
  }
  update(id:number, updateInvoicePaid: UpdateInvoicePaid) : Observable<InvoicePaid>{
    return this.http.patch<InvoicePaid>(this.route + id.toString(), updateInvoicePaid);
  }
  delete(id:number){
    return this.http.delete(this.route + id.toString());
  }
}
