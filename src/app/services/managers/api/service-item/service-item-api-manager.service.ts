import { Injectable } from '@angular/core';
import { ServiceItemApiService } from '../../../apis/service-item/service-item-api.service';
import { NotificationSystemService } from '../../../notification-system.service';
import { CreateServiceItem, UpdateServiceItem } from '../../../../types/api/service-item';
import { ApiManagerService } from '../api-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceItemApiManagerService implements ApiManagerService {

  constructor(private serviceItemApiService: ServiceItemApiService,
    private notificationSystemService: NotificationSystemService
  ) { }

  add(data: any) {
    const CreateServiceItem : CreateServiceItem = this.mapperCreateServiceItem(data)
    this.serviceItemApiService.create(CreateServiceItem).subscribe(
      res=>{
        this.notificationSystemService.showNotifcation('El item se ha creado con exito', 0)
      },
      err=>{
        this.notificationSystemService.showNotifcationWithoutRefresh(err.error?.message?? 'Ha ocurrido un error al intentar añadir el nuevo item.', 1)
      }
    );
  }
  edit(data: any) {
    const {itemId} = data;
    const updateServiceItem : CreateServiceItem = this.mapperCreateServiceItem(data)

    this.serviceItemApiService.update(itemId,updateServiceItem).subscribe(
      res=>{
        this.notificationSystemService.showNotifcation('El item se ha editado con exito', 0)
      },
      err=>{
        this.notificationSystemService.showNotifcationWithoutRefresh(err.error?.message?? 'Ha ocurrido un error al intentar editar el item.', 1)
      }
    );
  }
  mapperCreateServiceItem(data:any):CreateServiceItem{
    const { name, description, price, priceCommercial }= data
    const newServiceItem : CreateServiceItem ={
      name, description, price, priceCommercial
    }
    return newServiceItem;
  }
  mapperUpdateServiceItem(data:any):UpdateServiceItem{
    const { name, description, price, priceCommercial} = data
    const updateServiceItem : UpdateServiceItem ={
      name,description,price,priceCommercial
    }
    return updateServiceItem
  }
}
