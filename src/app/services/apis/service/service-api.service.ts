
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Service, UpdateService } from '../../../types/api/service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PrintOptions } from '../../../types/api/print-options';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiService {
  private route: string = environment.apiUrl + 'service/';

  private print: string = environment.apiUrl + 'pdf/generate-invoice/';
  constructor(private http : HttpClient) { }

  getAll() : Observable<Service[]>{
    return this.http.get<Service[]>(this.route);
  }
  get(id:number) : Observable<Service>{
    return this.http.get<Service>(this.route + id.toString());
  }
  create(newService: Service[]) : Observable<Service[]>{
    return this.http.post<Service[]>(this.route, newService);
  }
  update(updateService: UpdateService[]) : Observable<any>{
    return this.http.patch<any>(this.route, updateService);
  }
  delete(clientId:number,serviceId:number){
    return this.http.delete(this.route + clientId.toString()  + '/' + serviceId.toString());
  }
  printInvoices(clientId:number, serviceId:number, printOptions: PrintOptions){
    return this.http.post(this.print + `${clientId.toString()}/${serviceId}`, printOptions);
  }
}
