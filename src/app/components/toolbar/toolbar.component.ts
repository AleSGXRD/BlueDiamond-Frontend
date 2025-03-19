import { Component, EventEmitter, output, Output } from '@angular/core';
import { ButtonComponent, Rounded } from '../buttons/button/button.component';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthManagerService } from '../../services/managers/auth/auth-manager.service';
import { Payload } from '../../types/auth/auth-response';

@Component({
  selector: 'app-toolbar',
  imports:[ButtonComponent],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  buttonRounded : Rounded = Rounded.FULL;
  user! : Payload;

  menuOpened:boolean = false;

  constructor(
    private authManagerService: AuthManagerService,
    private router : Router
  ){
    this.user = this.authManagerService.user;
  }

  @Output() openSideBar = new EventEmitter<any>();
  @Output() openFormAdd = new EventEmitter<any>();

  logout(){
    localStorage.removeItem('user');
    this.router.navigate(["/login"]);
  }
  openMenu(){
    this.menuOpened = !this.menuOpened
  }
}
