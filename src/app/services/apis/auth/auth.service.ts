import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Login } from '../../../types/auth/login';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthRepsonse } from '../../../types/auth/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private route: string = environment.apiUrl + 'auth/';

  constructor(private http: HttpClient) { }

  login(user : Login) : Observable<AuthRepsonse>{
    return this.http.post<AuthRepsonse>(this.route+'login',user);
  }
}
