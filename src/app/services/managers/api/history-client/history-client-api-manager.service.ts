import { Injectable } from '@angular/core';
import { NotificationSystemService } from '../../../notification-system.service';
import { HistoryClient } from '../../../../types/api/history-client';
import { HistoryClientApiService } from '../../../apis/history-client/history-client-api.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryClientApiManagerService {

  constructor(private historyClientApiService: HistoryClientApiService,
    private notificationSystemService: NotificationSystemService
  ) { }

  add(data: any) {
    const newRol :HistoryClient = this.mapperRol(data)
    this.historyClientApiService.create(newRol).subscribe(
      res=>{
        this.notificationSystemService.showNotifcation('La historia del usuario se ha creado con exito', 0)
      },
      err=>{
        this.notificationSystemService.showNotifcationWithoutRefresh(err.error?.message?? 'Ha ocurrido un error al intentar añadir la historia del usuario.', 1)
      }
    );
  }
  edit(id:any,data: any) {
    this.historyClientApiService.update(id,data).subscribe(
      res=>{
        this.notificationSystemService.showNotifcation('La historia del usuario se ha editado con exito', 0)
      },
      err=>{
        this.notificationSystemService.showNotifcationWithoutRefresh(err.error?.message?? 'Ha ocurrido un error al intentar editar la historia del usuario.', 1)
      }
    );
  }
  mapperRol(data:any):HistoryClient{
    const { active,clientId,date,note }= data
    const newRol :HistoryClient ={
      active,clientId,date,note
    }
    return newRol;
  }
}
