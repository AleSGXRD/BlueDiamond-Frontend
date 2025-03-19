import { Injectable } from '@angular/core';
import { AuthService } from '../../apis/auth/auth.service';
import { Login } from '../../../types/auth/login';
import { Router } from '@angular/router';
import { NotificationSystemService } from '../../notification-system.service';


@Injectable({
  providedIn: 'root'
})
export class AuthManagerService {

  constructor(private authService: AuthService,
    private router:Router,
    private notificationService: NotificationSystemService
  ) {}

  login(login:Login){
    this.authService.login(login).subscribe(
      res=>{
        console.log(res)
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.payload));
        this.router.navigate(['home']);
      },
      err=>{
        this.notificationService.showNotifcationWithError(err.error.message, 1,err);
      }
    )
  }

  get logged (){
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token'); // Devuelve el token almacenado
    }
    return null; // Devuelve null si no está en el navegador
  }
  get user(){
    if (typeof window !== 'undefined' && window.localStorage) {
      const json = localStorage.getItem('user');
      if(json){
        const payload = JSON.parse(json);
        return payload;
      }
      return null; // Devuelve el token almacenado
    }
    return null;
  }
}
