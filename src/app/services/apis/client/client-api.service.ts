import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthRepsonse } from '../../../types/auth/auth-response';
import { Observable } from 'rxjs';
import { Login } from '../../../types/auth/login';
import { Client, CreateClient, UpdateClient } from '../../../types/api/client';
import { PrintOptions } from '../../../types/api/print-options';

@Injectable({
  providedIn: 'root'
})
export class ClientApiService {
  private route: string = environment.apiUrl + 'client/';
  private print: string = environment.apiUrl + 'pdf/generate-invoice/'

  constructor(private http: HttpClient) { }

  getAll() : Observable<Client[]>{
    return this.http.get<Client[]>(this.route);
  }
  get(id:number) : Observable<Client>{
    return this.http.get<Client>(this.route + id.toString());
  }
  create(newClient: CreateClient) : Observable<Client>{
    return this.http.post<Client>(this.route, newClient);
  }
  update(id:number, updateClient: UpdateClient) : Observable<Client>{
    return this.http.patch<Client>(this.route + id.toString(), updateClient);
  }
  delete(id:number){
    return this.http.delete(this.route + id.toString());
  }
  printAll(id:number, printOptions:PrintOptions){
    return this.http.post(this.print + id, printOptions);
  }
  sendServiceOffer(id:number){
    const printOptions : PrintOptions = { send : true, print: true}
    return this.http.post(this.route + id, printOptions );
  }
  approveOffer(id:number): Observable<any>{
    return this.http.get(this.route + 'approve/' + id.toString());
  }
  viewPdf(invoiceId:number){
    window.open(this.route + `view-service-offer/${invoiceId.toString()}`,'_blank');
  }
}
