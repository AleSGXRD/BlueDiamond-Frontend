import { Injectable } from '@angular/core';
import { ApiManagerService } from '../api-manager.service';
import { ServiceApiService } from '../../../apis/service/service-api.service';
import { NotificationSystemService } from '../../../notification-system.service';
import { Service, UpdateService } from '../../../../types/api/service';
import { PrintOptions } from '../../../../types/api/print-options';
import { LoaderService } from '../../loader.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiManagerService implements ApiManagerService{
  constructor(private serviceApiService: ServiceApiService,
    private notificationSystemService: NotificationSystemService,
    private loaderService:LoaderService
  ) { }

  add(data: any) {
    const createServices: Service[] = this.mapperCreateService(data)

    this.serviceApiService.create(createServices).subscribe(
      res=>{
        this.notificationSystemService.showNotifcation('El servicio se ha añadido con exito', 0)
      },
      err=>{
        this.notificationSystemService.showNotifcationWithoutRefresh(err.error?.message?? `Ha ocurrido un error al intentar añadir el servicio.`, 1)
      }
    );
  }
  edit(data: any) {
    const updateServices: UpdateService[] = this.mapperEditService(data)

    this.serviceApiService.update(updateServices).subscribe(
      res=>{
        this.notificationSystemService.showNotifcation(res.message ?? 'El cliente se ha editado con exito.', 0)
      },
      err=>{
        this.notificationSystemService.showNotifcationWithoutRefresh(err.error?.message?? 'Ha ocurrido un error al intentar editar el cliente.', 1)
      }
    );
  }
  delete(clientId:number, serviceId:number){
    this.serviceApiService.delete(clientId,serviceId).subscribe(
      res =>{
        this.notificationSystemService.showNotifcation("Se ha eliminado el servicio con exito.", 0);
      },
      err =>{
        this.notificationSystemService.showNotifcationWithoutRefresh(err.message ?? "Ha ocurrido un error al intentar eliminar el servicio", 1);

      }
    )
  }
  print(clientId:number, serviceId:number, printOptions: PrintOptions){
    this.loaderService.setLoader("Generando invoices...")
    this.serviceApiService.printInvoices(clientId, serviceId, printOptions).subscribe(
      res => {
        this.notificationSystemService.showNotifcation(`El se han creado${printOptions.send == true? ' y enviado': ''} los invoices con exito.`, 0)
        this.loaderService.hideLoader()
      },
      err =>{
        this.notificationSystemService.showNotifcationWithoutRefresh(err.error?.message?? 'Ha ocurrido un error al intentar crear los invoices.', 1)
        this.loaderService.hideLoader()
      }
    )
  }
  mapperCreateService(data:any):Service[]{
    const { clientId, serviceDate, manyMonths, permanent, active, itemsObject }= data
    let services : Service[] = []
    for(const item of itemsObject){
      const service: Service = {
        clientId,
        itemId : item.value,
        serviceDate,
        manyMonths,
        permanent,
        active,
        quantity: item.quantity ? (item.quantity != null ?  item.quantity : 1 ) : 1,
        discount: item.discount ? (item.discount != null ?  item.discount : 0 ) : 0,
        estimateCreated : false
      }
      services.push(service)
    }
    return services;
  }
  mapperEditService(data:any):UpdateService[]{
    const { serviceId, clientId, serviceDate, manyMonths, permanent, active, finished, itemsObject }= data
    let services : UpdateService[] = []
    for(const item of itemsObject){
      const service: UpdateService = {
        serviceId,
        clientId,
        itemId : item.value,
        serviceDate,
        manyMonths,
        permanent,
        active,
        finished,
        quantity: item.quantity ? (item.quantity != null ?  item.quantity : 1 ) : 1,
        discount: item.discount ? (item.discount != null ?  item.discount : 0 ) : 0,
      }
      services.push(service)
    }
    return services;
  }
}
