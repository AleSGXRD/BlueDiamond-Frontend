import { Component, Input } from '@angular/core';
import { Invoice } from '../../../types/api/invoice';
import { calculeAmountInvoice, calculeItemAmountInvoice } from '../../../logic/invoice-manager';
import { ButtonComponent } from '../../buttons/button/button.component';
import { CommonModule } from '@angular/common';
import { InvoicePaidRelation } from '../../../types/api/invoice-paid-relation';
import { ItemTable, ItemsTableComponent } from '../items-table/items-table.component';
import { OptionsComponent } from '../../options/options.component';
import { InvoiceApiInvoice } from '../../../services/apis/invoice/invoice-api.service';
import { NotificationSystemService } from '../../../services/notification-system.service';
import { DialogService } from '../../../services/managers/dialog/dialog.service';
import { format, getYear } from 'date-fns';
import { FormBuilder, Validators } from '@angular/forms';
import { FormField, FormFieldType } from '../../../types/forms/form-field';
import { FormData } from '../../../types/forms/form-data';
import { InvoicePaidApiManagerService } from '../../../services/managers/api/invoice-paid/invoice-paid-api-manager.service';
import { FormService } from '../../../services/managers/form/form.service';
import { FormType } from '../../../types/forms/form-type';
import { LoaderService } from '../../../services/managers/loader.service';
import { FilterComponent } from '../../filter/filter.component';
import { filterByNumber } from '../../../logic/filters';

@Component({
  selector: 'client-invoices',
  imports: [ButtonComponent, CommonModule, ItemsTableComponent, FilterComponent],
  templateUrl: './client-invoices.component.html',
  styleUrl: './client-invoices.component.css'
})
export class ClientInvoicesComponent {
  @Input()
  invoices!: Invoice[]
  formFilter : any;
  inputsFormFilter : FormField[] = [
    {
      type: FormFieldType.NUMBER,
      formControlName:'idInvoice',
      name: "Id del invoice",
    },
    {
      type: FormFieldType.NUMBER,
      formControlName:'idService',
      name: "Id de servicio",
    },
    {
      type: FormFieldType.SELECT,
      formControlName:'state',
      name: "Estado del invoice",
      placeholder : "Seleccione un estado del invoice",
      options : [
        {
          name : "Todos",
          value : -1
        },
        {
          name: "Pendiente",
          value : 0
        },
        {
          name : "Aprobado",
          value : 1
        },
      ]
    }
  ]
  /**
   *
   */
  constructor(private invoiceApiService: InvoiceApiInvoice,
    private invoicePaidApiService: InvoicePaidApiManagerService,
    private notificationSystemService: NotificationSystemService,
    private dialogService: DialogService,
    private formBuilder:FormBuilder,
    private formService:FormService,
    private loaderService: LoaderService,
  ) {

    }
  ngOnInit(): void {
    this.formFilter = this.formBuilder.group({
      idInvoice: [undefined],
      idService : [undefined],
      state: [undefined]
    })
  }
  get clientInvoices() : ShowClientInvoice[]{
    if(this.invoices.length ==0) return [];
    const idInvoice = this.formFilter.get('idInvoice').value;
    const idService = this.formFilter.get('idService').value;
    const state = this.formFilter.get('state').value;

    let serviceIdsMapped = [];

    serviceIdsMapped = idInvoice != undefined?
                            filterByNumber(idInvoice, 'invoiceId', this.invoices, 5)
                            :
                            this.invoices;
    serviceIdsMapped = idService != undefined?
                            filterByNumber(idService, 'serviceId', serviceIdsMapped, 5)
                            :
                            serviceIdsMapped;

    serviceIdsMapped = serviceIdsMapped.map(service => service.invoiceId)

    const serviceIds = [...new Set(serviceIdsMapped)]
    let infos : ShowClientInvoice[] = []
    for(const id of serviceIds){
      const infoInvoices : Invoice[] = this.invoices.filter(invoice => invoice.invoiceId == id);

      const {serviceId, invoiceDate, invoiceId, paid, clientId } = infoInvoices[0]
      const items : ItemTable[] = infoInvoices.map(invoice => ({
        itemId: invoice.itemId ?? 0,
        name: invoice.itemName ?? '',
        price: invoice.price ?? 0,
        discount: invoice.discount ?? 0,
        quantity: invoice.quantity ?? 0
      }));

      const showInfo:ShowClientInvoice = {
        serviceId,
        invoiceDate,
        invoiceId,
        clientId,

        paid,
        amount: calculeAmountInvoice(infoInvoices),

        items
      }
      infos.push(showInfo)
    }
    if(state != -1 && state != undefined){
      infos = infos.filter(info => {
          if(state ==0)
            return info.paid == null
          else
            return info.paid != null
        }
      )
    }

    if(!idInvoice && !idService)
      infos.sort((a,b) => {
        // Primero, separar por estado: "pendiente" debe ir antes que "completado"
        // if (a.paid == null && b.paid != null) {
        //   return -1; // "a" va antes que "b"
        // }
        // if (a.paid != null && b.paid == null) {
        //   return 1; // "b" va antes que "a"
        // }

        // Si están en el mismo estado, ordenar por fecha
        const fechaA : any = new Date(a.invoiceDate);
        const fechaB : any = new Date(b.invoiceDate);
        return fechaB - fechaA ;
      })
    return infos;
  }
  deleteInvoice(invoiceId:number){
    this.dialogService.SetDeleteMethod(()=>{
      this.invoiceApiService.delete(invoiceId).subscribe(
        res => {
          this.notificationSystemService.showNotifcation(`Se ha eliminado el INV-${invoiceId}`, 0);
        },
        err => {
          this.notificationSystemService.showNotifcation( 'No se ha podido eliminar el invoice', 1);
        }
      )
    })
  }
  calculeItemAmount(item : ItemTable){
    if(item == undefined)
      return 0
    return calculeItemAmountInvoice(item.price, item.quantity, item.discount ?? 0);
  }
  serviceDay(item : ShowClientInvoice){
    return item.serviceId
  }
  invoiceDay(item : ShowClientInvoice){
    return format(item.invoiceDate, 'MMMM') + ' ' + getYear(item.invoiceDate);
  }
  paidDay(item:InvoicePaidRelation){
    return format(item.paidDate, 'MMMM') + ' ' + getYear(item.paidDate);
  }
  addPaid(invoiceId:number){
    const infos = this.clientInvoices;
    const invoice = infos.find(info => info.invoiceId == invoiceId);
    let invoicePaidRelations = invoice?.items.map(item => ({
      paidDate : undefined,
      invoiceId,
      serviceId: invoice.serviceId,
      itemId: item.itemId,
      clientId:invoice.clientId
    }))

    let form = this.formBuilder.group({
      paidDate: [new Date(), [Validators.required]],
      months : [1, []],
      paid : [invoice?.amount, [Validators.required]],

      relations : [invoicePaidRelations, [Validators.required]]
    })
    const inputsForm : FormField[] =[
      {
        type : FormFieldType.NUMBER,
        formControlName: 'months',
        name: "Cantidad de meses*",
      },
      {
        type : FormFieldType.NUMBER,
        formControlName: 'paid',
        name: "Pago*",
      }
    ]
    const addPaidFormData : FormData = {
      apiService: this.invoicePaidApiService,
      form : form,
      inputs:inputsForm
    }
    this.formService.SetFormData(addPaidFormData, FormType.ADD);
  }

  viewPdf(invoiceId: number){
    this.invoiceApiService.viewPdf(invoiceId);
  }
  sendPdf(clientId:number, serviceId : number, invoiceId : number){
    this.dialogService.SetMethod(()=>{
      this.loaderService.setLoader("Enviando Invoice...");
      this.invoiceApiService.sendPdf(clientId, serviceId, invoiceId).subscribe(
        res=> {
          this.notificationSystemService.showNotifcation(res.message ?? "Se ha enviado el invoice con exito al cliente.", 0);
          this.loaderService.hideLoader()
        },
        err => {
          this.notificationSystemService.showNotifcationWithoutRefresh(err.error?.message ?? "Ha ocurrido un error al enviar el correo.", 1);
          this.loaderService.hideLoader()
        }
      );
    })
  }

}

interface ShowClientInvoice{
  serviceId : number;
  invoiceDate : Date;
  invoiceId : number;
  clientId : number;

  amount: number;
  paid?: InvoicePaidRelation;

  items : ItemTable[];
}
