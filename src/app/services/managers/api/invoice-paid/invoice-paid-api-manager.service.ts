import { Injectable } from '@angular/core';
import { InvoicePaidApiService } from '../../../apis/invoice-paid/invoice-paid-api.service';
import { NotificationSystemService } from '../../../notification-system.service';
import { CreateInvoicePaid } from '../../../../types/api/invoice-paid';

@Injectable({
  providedIn: 'root'
})
export class InvoicePaidApiManagerService {

  constructor(private invoicePaidApiService: InvoicePaidApiService,
    private notificationSystemService: NotificationSystemService
  ) { }

  add(data: any) {
    const CreateInvoicePaid : CreateInvoicePaid = this.mapperCreateInvoicePaid(data)
    this.invoicePaidApiService.create(CreateInvoicePaid).subscribe(
      res=>{
        this.notificationSystemService.showNotifcation('El pago del invoice se ha creado con exito', 0)
      },
      err=>{
        this.notificationSystemService.showNotifcationWithoutRefresh(err.error?.message?? 'Ha ocurrido un error al intentar añadir el nuevo pago del invoice.', 1)
      }
    );
  }
  edit(id:any,data: any) {
    this.invoicePaidApiService.update(id,data).subscribe(
      res=>{
        this.notificationSystemService.showNotifcation('El pago del invoice se ha editado con exito', 0)
      },
      err=>{
        this.notificationSystemService.showNotifcationWithoutRefresh(err.error?.message?? 'Ha ocurrido un error al intentar editar el pago del invoice.', 1)
      }
    );
  }
  mapperCreateInvoicePaid(data:any):CreateInvoicePaid{
    const {paidDate, months, paid, relations}= data
    const newInvoicePaid : CreateInvoicePaid ={
      paidDate,
      months,
      paid,
      invoices : relations
    }
    return newInvoicePaid;
  }
}
