import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Useraccount } from '../../../types/api/useraccount';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UseraccountApiService {
  private route: string = environment.apiUrl + 'useraccount/';

  constructor(private http: HttpClient) { }

  getAll() : Observable<Useraccount[]>{
    return this.http.get<Useraccount[]>(this.route);
  }
  get(id:number) : Observable<Useraccount>{
    return this.http.get<Useraccount>(this.route + id.toString());
  }
  create(newUseraccount: Useraccount) : Observable<Useraccount>{
    return this.http.post<Useraccount>(this.route, newUseraccount);
  }
  update(id:number, updateUseraccount: Useraccount) : Observable<Useraccount>{
    return this.http.patch<Useraccount>(this.route + id.toString(), updateUseraccount);
  }
  delete(id:number){
    return this.http.delete(this.route + id.toString());
  }
}
