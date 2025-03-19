import { Injectable } from '@angular/core';
import { ApiManagerService } from '../api-manager.service';
import { ClientApiService } from '../../../apis/client/client-api.service';
import { NotificationSystemService } from '../../../notification-system.service';
import { CreateClient } from '../../../../types/api/client';

@Injectable({
  providedIn: 'root'
})
export class ClientApiManagerService implements ApiManagerService {

  constructor(private clientApiService: ClientApiService,
    private notificationSystemService: NotificationSystemService
  ) { }

  add(data: any) {
    const createClient : CreateClient = this.mapperCreateClient(data)
    this.clientApiService.create(createClient).subscribe(
      res=>{
        this.notificationSystemService.showNotifcation('El cliente se ha creado con exito', 0)
      },
      err=>{
        this.notificationSystemService.showNotifcationWithoutRefresh(err.error?.message?? 'Ha ocurrido un error al intentar añadir el nuevo cliente.', 1)
      }
    );
  }
  edit(id:any,data: any) {
    this.clientApiService.update(id,data).subscribe(
      res=>{
        this.notificationSystemService.showNotifcation('El cliente se ha editado con exito', 0)
      },
      err=>{
        this.notificationSystemService.showNotifcationWithoutRefresh(err.error?.message?? 'Ha ocurrido un error al intentar editar el cliente.', 1)
      }
    );
  }
  mapperCreateClient(data:any):CreateClient{
    const {name, address, city, country, cp,phoneNumber, email,language, commercial, active, note }= data
    const newClient : CreateClient ={
      client:{name, address, city, country, cp,phoneNumber, email,language,commercial },
      history: {active, note}
    }
    return newClient;
  }
}
