import { Injectable } from '@angular/core';
import { RolApiService } from '../../../apis/rol/rol-api.service';
import { NotificationSystemService } from '../../../notification-system.service';
import { Rol } from '../../../../types/api/rol';
import { ApiManagerService } from '../api-manager.service';

@Injectable({
  providedIn: 'root'
})
export class RolApiManagerService implements ApiManagerService {

  constructor(private RolApiService: RolApiService,
    private notificationSystemService: NotificationSystemService
  ) { }

  add(data: any) {
    const newRol :Rol = this.mapperRol(data)
    this.RolApiService.create(newRol).subscribe(
      res=>{
        this.notificationSystemService.showNotifcation('El rol se ha creado con exito', 0)
      },
      err=>{
        this.notificationSystemService.showNotifcationWithoutRefresh(err.error?.message?? 'Ha ocurrido un error al intentar editar el rol.', 1)
      }
    );
  }
  edit(id:any,data: any) {
    this.RolApiService.update(id,data).subscribe(
      res=>{
        this.notificationSystemService.showNotifcation('El rol se ha editado con exito', 0)
      },
      err=>{
        this.notificationSystemService.showNotifcationWithoutRefresh(err.error?.message?? 'Ha ocurrido un error al intentar editar el rol.', 1)
      }
    );
  }
  mapperRol(data:any):Rol{
    const { rolId, name }= data
    const newRol :Rol ={
      rolId,name
    }
    return newRol;
  }
}
