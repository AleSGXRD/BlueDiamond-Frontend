import { Injectable } from '@angular/core';
import { ApiManagerService } from '../api-manager.service';
import { UseraccountApiService } from '../../../apis/account/useraccount-api.service';
import { NotificationSystemService } from '../../../notification-system.service';
import { Useraccount } from '../../../../types/api/useraccount';

@Injectable({
  providedIn: 'root'
})
export class UseraccountApiManagerService implements ApiManagerService {

  constructor(private useraccountApiService: UseraccountApiService,
    private notificationSystemService: NotificationSystemService
  ) { }

  add(data: any) {
    const useraccount : Useraccount = this.mapperUseraccount(data)
    this.useraccountApiService.create(useraccount).subscribe(
      res=>{
        this.notificationSystemService.showNotifcation('La cuenta de usuario se ha creado con exito', 0)
      },
      err=>{
        this.notificationSystemService.showNotifcationWithoutRefresh(err.error?.message?? 'Ha ocurrido un error al intentar editar la cuenta de usuario.', 1)
      }
    );
  }
  edit(data:any) {
    const editUser = this.mapperEditUseraccount(data);
    if(editUser.userId == undefined) return;
    this.useraccountApiService.update(editUser.userId, editUser).subscribe(
      res=>{
        this.notificationSystemService.showNotifcation('La cuenta de usuario se ha editado con exito', 0)
      },
      err=>{
        this.notificationSystemService.showNotifcationWithoutRefresh(err.error?.message?? 'Ha ocurrido un error al intentar editar la cuenta de usuario.', 1)
      }
    );
  }
  mapperUseraccount(data:any):Useraccount{
    const { rolId, name, password }= data
    const newUseraccount : Useraccount ={
      rolId,name,password
    }
    return newUseraccount;
  }
  mapperEditUseraccount(data:any):Useraccount{
    const {rolId, name,password,userId} = data
    const editUseraccount : Useraccount ={
      rolId,name,password,userId
    }
    return editUseraccount
  }
}
