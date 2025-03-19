import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistoryClient } from '../../../types/api/history-client';

@Injectable({
  providedIn: 'root'
})
export class HistoryClientApiService {
  private route: string = environment.apiUrl + 'history-client/';

  constructor(private http: HttpClient) { }

  getAll() : Observable<HistoryClient[]>{
    return this.http.get<HistoryClient[]>(this.route);
  }
  get(id:number) : Observable<HistoryClient>{
    return this.http.get<HistoryClient>(this.route + id.toString());
  }
  create(newRol: HistoryClient) : Observable<HistoryClient>{
    return this.http.post<HistoryClient>(this.route, newRol);
  }
  update(id:number, updateHistoryClient: HistoryClient) : Observable<HistoryClient>{
    return this.http.patch<HistoryClient>(this.route + id.toString(), updateHistoryClient);
  }
  delete(item:HistoryClient){
    return this.http.delete(this.route + item.clientId.toString() + '/' + new Date(item.date).toString());
  }
}
