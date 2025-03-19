import { Component, Input } from '@angular/core';
import { Estimate } from '../../../types/api/estimate';
import { CommonModule } from '@angular/common';
import { ItemsTableComponent, ItemTable } from '../items-table/items-table.component';
import { EstimateApiService } from '../../../services/apis/estimate/estimate-api.service';
import { NotificationSystemService } from '../../../services/notification-system.service';
import { DialogService } from '../../../services/managers/dialog/dialog.service';
import { calculeItemAmountInvoice } from '../../../logic/invoice-manager';
import { calculeAmountEstimate } from '../../../logic/estimate-manager';
import { ButtonComponent } from '../../buttons/button/button.component';
import { format } from 'date-fns';
import { FormBuilder } from '@angular/forms';
import { FormField, FormFieldType } from '../../../types/forms/form-field';
import { info } from 'console';
import { FilterComponent } from '../../filter/filter.component';
import { LoaderService } from '../../../services/managers/loader.service';
import { filterByNumber } from '../../../logic/filters';

@Component({
  selector: 'client-estimates',
  imports: [CommonModule, ItemsTableComponent, ButtonComponent, FilterComponent],
  templateUrl: './client-estimates.component.html',
  styleUrl: './client-estimates.component.css'
})
export class ClientEstimatesComponent {
  @Input()
  estimates: Estimate[] = []
  /**
     *
     */
  formFilter : any;
  inputsFormFilter : FormField[] = [
      {
        type: FormFieldType.NUMBER,
        formControlName:'idEstimate',
        name: "Id del estimado",
      },
      {
        type: FormFieldType.NUMBER,
        formControlName:'idService',
        name: "Id de servicio",
      },
      {
        type: FormFieldType.SELECT,
        formControlName:'state',
        name: "Estado dle estimado",
        placeholder : "Seleccione un estado del estimado",
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
    constructor(private estimateApiService: EstimateApiService,
      private notificationSystemService: NotificationSystemService,
      private dialogService: DialogService,
    private formBuilder : FormBuilder,
      private loaderService: LoaderService) {

      }
      ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.

        this.formFilter = this.formBuilder.group({
          idEstimate: [undefined],
          idService : [undefined],
          state: [undefined]
        })
      }
    get clientEstimates() : ShowClientEstimate[]{
      if(this.estimates.length ==0) return [];
      const idEstimate = this.formFilter.get('idEstimate').value;
      const idService = this.formFilter.get('idService').value;
      const state = this.formFilter.get('state').value;

      let serviceIdsMapped = [];

      serviceIdsMapped = idEstimate != undefined?
                              filterByNumber(idEstimate, 'estimateId', this.estimates, 5)
                              :
                              this.estimates;
      serviceIdsMapped = idService != undefined?
                              filterByNumber(idService, 'serviceId', serviceIdsMapped, 5)
                              :
                              serviceIdsMapped;

      serviceIdsMapped = serviceIdsMapped.map(service => service.estimateId)

      let infos : ShowClientEstimate[] = []
      for(const id of serviceIdsMapped){
        const infoEstimates : Estimate[] = this.estimates.filter(estimate => estimate.estimateId == id);

        const {serviceId, estimateDate, estimateId, clientId, estimateApproved} = infoEstimates[0]
        const items : ItemTable[] = infoEstimates.map(estimate => ({
          itemId: estimate.itemId ?? 0,
          name: estimate.itemName ?? '',
          price: estimate.price ?? 0,
          discount: estimate.discount ?? 0,
          quantity: estimate.quantity ?? 0
        }));

        const showInfo:ShowClientEstimate = {
          serviceId,
          estimateDate,
          estimateId,
          clientId,
          estimateApproved,
          amount: calculeAmountEstimate(infoEstimates),

          items
        }
        infos.push(showInfo)
      }

      if(state != undefined && state != -1)
        infos = infos.filter(info => {
              if(state == 0 && info.estimateApproved == false)
                return true;
              if(state == 1 && info.estimateApproved == true)
                return true;

              return false;
          })
      if(!idEstimate && !idService)
        infos.sort((a,b) => {

          // Si están en el mismo estado, ordenar por fecha
          const fechaA : any = new Date(a.estimateDate);
          const fechaB : any = new Date(b.estimateDate);
          return fechaB - fechaA ;
        })
      return infos;
    }
    deleteEstimate(estimateId:number){
      this.dialogService.SetDeleteMethod(()=>{
        this.estimateApiService.deleteEstimate(estimateId).subscribe(
          res => {
            this.notificationSystemService.showNotifcation(`Se ha eliminado el EST-${estimateId}`, 0);
          },
          err => {
            this.notificationSystemService.showNotifcation('No se ha podido eliminar el estimado', 1);
          }
        )
      })
    }
    calculeItemAmount(item : ItemTable){
      if(item == undefined)
        return 0
      return calculeItemAmountInvoice(item.price, item.quantity, item.discount ?? 0);
    }
    estimateDay(item : ShowClientEstimate){
      return format(new Date(item.estimateDate), "yyyy-MM-dd")
    }

    viewPdf(estimateId: number){
      this.estimateApiService.viewPdf(estimateId);
    }
    sendPdf(clientId:number, estimateId : number){
      this.dialogService.SetMethod(()=>{
        this.loaderService.setLoader("Enviando Estimado...")
        this.estimateApiService.printEstimate(clientId, estimateId, {send:true, print:true}).subscribe(
          res=> {
            this.notificationSystemService.showNotifcation("Se ha enviado el estimate con exito al cliente.", 0);
            this.loaderService.hideLoader()
          },
          err => {
            this.notificationSystemService.showNotifcationWithoutRefresh(err.error?.message ?? "Ha ocurrido un error al enviar el correo.", 1);
            this.loaderService.hideLoader()
          }
        );
      })
    }
    approveEstimate(estimateId:number){
      this.dialogService.SetMethod(()=>{
        this.estimateApiService.approveEstimate(estimateId).subscribe(
          res => {
            this.notificationSystemService.showNotifcation("Se ha aprobado el servicio con exito.",0)
          },
          err => {
            this.notificationSystemService.showNotifcation(err.error?.message ?? "Ha ocurrido un error al intentar aprobar el servicio.",1)
          }
        )
      })
    }
}
interface ShowClientEstimate{
  serviceId : number;
  estimateDate : Date;
  estimateId : number;
  clientId : number;

  estimateApproved?:boolean;

  amount: number;

  items : ItemTable[];
}
