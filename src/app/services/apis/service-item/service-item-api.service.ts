import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CreateServiceItem, ServiceItem, UpdateServiceItem } from '../../../types/api/service-item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceItemApiService {
  private route: string = environment.apiUrl + 'service-item/';

  constructor(private http: HttpClient) { }

  getAll() : Observable<ServiceItem[]>{
    return this.http.get<ServiceItem[]>(this.route);
  }
  get(id:number) : Observable<ServiceItem>{
    return this.http.get<ServiceItem>(this.route + id.toString());
  }
  create(newServiceItem: CreateServiceItem) : Observable<ServiceItem>{
    return this.http.post<ServiceItem>(this.route, newServiceItem);
  }
  update(id:number, updateServiceItem: UpdateServiceItem) : Observable<ServiceItem>{
    return this.http.patch<ServiceItem>(this.route + id.toString(), updateServiceItem);
  }
  delete(id:number){
    return this.http.delete(this.route + id.toString());
  }
}
