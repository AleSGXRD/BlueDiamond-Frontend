import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Rol } from '../../../types/api/rol';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolApiService {
  private route: string = environment.apiUrl + 'rol/';

  constructor(private http: HttpClient) { }

  getAll() : Observable<Rol[]>{
    return this.http.get<Rol[]>(this.route);
  }
  get(id:number) : Observable<Rol>{
    return this.http.get<Rol>(this.route + id.toString());
  }
  create(newRol: Rol) : Observable<Rol>{
    return this.http.post<Rol>(this.route, newRol);
  }
  update(id:number, updateRol: UserActivation) : Observable<Rol>{
    return this.http.patch<Rol>(this.route + id.toString(), updateRol);
  }
  delete(id:number){
    return this.http.delete(this.route + id.toString());
  }
}
