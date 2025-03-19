import { Component, Input } from '@angular/core';
import { Service } from '../../../types/api/service';
import { ServiceItem } from '../../../types/api/service-item';
import { ButtonComponent } from "../../buttons/button/button.component";
import { calculeAmount, calculeItemAmount, getItemPrice } from '../../../logic/service-manager';
import { ItemsTableComponent, ItemTable } from '../items-table/items-table.component';
import { NavigationMobileService } from '../../../services/managers/navigation-mobile.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceApiManagerService } from '../../../services/managers/api/service/service-api-manager.service';
import { FormField, FormFieldType } from '../../../types/forms/form-field';
import { FormData } from '../../../types/forms/form-data';
import { ServiceItemApiService } from '../../../services/apis/service-item/service-item-api.service';
import { PrintOptions } from '../../../types/api/print-options';
import { FormService } from '../../../services/managers/form/form.service';
import { FormType } from '../../../types/forms/form-type';
import { eachMonthOfInterval, format } from 'date-fns';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { EstimateApiService } from '../../../services/apis/estimate/estimate-api.service';
import { NotificationSystemService } from '../../../services/notification-system.service';
import { ServiceState } from '../../../types/ServiceState';
import { FilterComponent } from '../../filter/filter.component';
import { filterByNumber, filtroPorProximidad } from '../../../logic/filters';
import { DialogService } from '../../../services/managers/dialog/dialog.service';

@Component({
  selector: 'client-services',
  imports: [ButtonComponent, ItemsTableComponent, CommonModule, FilterComponent],
  templateUrl: './client-services.component.html',
  styleUrl: './client-services.component.css'
})
export class ClientServicesComponent {
  @Input()
  services!: Service[];
  @Input()
  clientId!: number;
  @Input()
  public maintenancePrice: number = 0;
  @Input()
  public stabilizerPrice: number = 0;
  public monthlyServiceId = environment.monthlyServiceId;
  public stabilizerId = environment.stabilizerId


  @Input()
  public commercial : boolean = false;

  form : any;
  inputsForm : FormField[] = [];
  addServiceFormdata! : FormData;

  formFilter: any;

  inputsFormFilter : FormField[] = [
    {
      type: FormFieldType.NUMBER,
      formControlName:'id',
      name: "Id de servicio",
    },{
      type: FormFieldType.SELECT_MULTIPLE,
      formControlName:'state',
      name: "Estado de servicio",
      placeholder : "Seleccione un estado de servicio",
      options : [
        {
          name: "Inactivo",
          value : ServiceState.INACTIVE
        },
        {
          name : "Por aprobar",
          value : ServiceState.WAITING_FOR_APPROVE
        },
        {
          name : "Activo",
          value : ServiceState.ACTIVE
        },
        {
          name : "Finalizado",
          value : ServiceState.FINISHED
        }
      ]
    }
  ]

  constructor(private navigationMobileService: NavigationMobileService,
    private formBuilder : FormBuilder,
    private serviceApiManagerService: ServiceApiManagerService,
    private serviceItemApiService: ServiceItemApiService,
    private formService : FormService,
    private estimateApiService: EstimateApiService,
    private notificationSystemService: NotificationSystemService,
    private dialogService: DialogService
  ) {
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.formFilter = this.formBuilder.group({
      id: [undefined],
      state: [[]]
    })
    this.inputsForm =[
      {
        type : FormFieldType.DATETIME,
        formControlName: 'serviceDate',
        name: "Fecha*",
        value: new Date()
      },
      {
        type : FormFieldType.BOOLEAN,
        formControlName: 'permanent',
        name: "Servicio permanente",
        value: false
      },
      {
        type : FormFieldType.NUMBER,
        formControlName: 'manyMonths',
        name: "Cantidad de meses",
        condition: {
          controlName: 'permanent',
          value : false
        },
        value:1
      },
      {
        type : FormFieldType.SELECT_MULTIPLE,
        formControlName : 'items',
        name:'Items*',
        placeholder: "Seleccione los servicios",
        apiService: this.serviceItemApiService,
        formApiProperties: {namePropertyName : 'name', valuePropertyName: 'itemId'},
        inputEmitter : true
      },
      {
        type : FormFieldType.SERVICE_ITEM,
        formControlName : 'itemsObject',
        name:'itemsObject',
        placeholder: "itemsObject",
        apiService: this.serviceItemApiService,
        formApiProperties: {namePropertyName : 'name', valuePropertyName: 'itemId'},
        formControlNameLinked: 'items',
      },
      {
        type : FormFieldType.BOOLEAN,
        formControlName: 'active',
        name: "Servicio activo",
        value: false
      },
    ]
    this.form = this.formBuilder.group({
      serviceId:[undefined],
      clientId: [this.clientId ,[Validators.required]],
      items: [[], [Validators.required]],
      itemsObject: [[]],
      serviceDate:[format(new Date(), 'yyyy-MM-dd'), [Validators.required]],

      manyMonths: [1],
      permanent: [false],
      active: [false]
    })
    this.form.reset();
    this.form.get('manyMonths').defaultValue = 1;
    this.form.get('serviceDate').defaultValue = format(new Date(), 'yyyy-MM-dd');
    this.form.get('clientId').defaultValue = this.clientId
    this.form.get('permanent').defaultValue = false;
    this.form.get('active').defaultValue = false;

    this.addServiceFormdata ={
      apiService: this.serviceApiManagerService,
      form: this.form,
      inputs: this.inputsForm
    }

    this.navigationMobileService.setFormData(this.addServiceFormdata)
  }
  editService(serviceId: number){
    const servicesFiltered = this.services.filter((service)=> service.serviceId == serviceId)
    const {permanent, active, manyMonths, serviceDate, finished} = servicesFiltered[0];
    const items = servicesFiltered.map((item)=> item.itemId)

    const itemsObject = servicesFiltered.map((item)=>({value: item.itemId, name:item.item?.name, quantity:item.quantity, discount:item.discount}))

    const formEdit = this.formBuilder.group({
      serviceId: [serviceId],
      clientId: [this.clientId ,[Validators.required]],
      items: [items, [Validators.required]],
      itemsObject: [itemsObject],
      serviceDate:[new Date(serviceDate), [Validators.required]],

      manyMonths: [manyMonths],
      finished: [finished],
      permanent: [permanent],
      active: [active]
    })
    console.log(formEdit);
    formEdit.get('serviceDate')?.setValue(new Date(serviceDate));
    formEdit.get('clientId')?.setValue(this.clientId);
    formEdit.get('serviceId')?.setValue(serviceId);
    const inputsEditForm : FormField[] =[
      {
        type : FormFieldType.DATETIME,
        formControlName: 'serviceDate',
        name: "Fecha*",
        value: new Date()
      },
      {
        type : FormFieldType.BOOLEAN,
        formControlName: 'permanent',
        name: "Servicio permanente",
        value: false
      },
      {
        type : FormFieldType.NUMBER,
        formControlName: 'manyMonths',
        name: "Cantidad de meses",
        condition: {
          controlName: 'permanent',
          value : false
        }
      },
      {
        type : FormFieldType.SELECT_MULTIPLE,
        formControlName : 'items',
        name:'Items*',
        placeholder: "Seleccione los servicios",
        apiService: this.serviceItemApiService,
        formApiProperties: {namePropertyName : 'name', valuePropertyName: 'itemId'},
        inputEmitter: true,
        value:items
      },
      {
        type : FormFieldType.SERVICE_ITEM,
        formControlName : 'itemsObject',
        name:'',
        placeholder: "",
        apiService: this.serviceItemApiService,
        formApiProperties: {namePropertyName : 'name', valuePropertyName: 'itemId'},
        formControlNameLinked: 'items',
      },
      {
        type : FormFieldType.BOOLEAN,
        formControlName: 'active',
        name: "Servicio activo",
        value: false,
        condition:{
          controlName: "finished",
          value: false
        }
      },
      {
        type : FormFieldType.BOOLEAN,
        formControlName: 'finished',
        name: "Servicio finalizado",
        value: false
      }
    ]
    const editFormData ={
      apiService: this.serviceApiManagerService,
      form: formEdit,
      inputs: inputsEditForm
    }

    this.formService.SetFormData(editFormData, FormType.EDIT);
  }

  get clientServices() : ShowClientService[]{
    if(this.services.length ==0) return [];
    const idFilter = this.formFilter.get('id').value;

    let serviceIdsMapped = [];

    serviceIdsMapped = idFilter != undefined?
                            filterByNumber(idFilter, 'serviceId', this.services, 5)
                            :
                            this.services;

    serviceIdsMapped = serviceIdsMapped.map(service => service.serviceId)

    const serviceIds = [...new Set(serviceIdsMapped)]
    let infos : ShowClientService[] = []

    for(const id of serviceIds){
      const infoServices : Service[] = this.services.filter(service => service.serviceId == id);

      const {serviceDate, manyMonths, permanent, active, invoices,estimateCreated, finished} = infoServices[0]
      const items : ItemTable[] = infoServices.map(service => ({
        itemId : service.itemId,
        name : service.item?.name ?? '',
        price : this.getItemPrice(service.item),
        discount : service.discount ?? 0,
        quantity : service.quantity
      }));

      const months = eachMonthOfInterval({
        start:new Date(serviceDate),
        end:new Date(),
      })

      const serviceState : ServiceState = active == false ? (estimateCreated == true? ServiceState.WAITING_FOR_APPROVE : ServiceState.INACTIVE) : (finished == true ? ServiceState.FINISHED :ServiceState.ACTIVE)

      const cantInvoices = [...new Set(invoices?.map(invoice => invoice.invoiceId))]

      const showInfo:ShowClientService = {
        serviceDate,
        serviceId:id,

        amount: calculeAmount(items),
        manyMonths,
        permanent,
        serviceState,

        invoicesToPrint: months.length - cantInvoices.length,

        items
      }
      infos.push(showInfo)
    }
    const stateFilter = this.formFilter.get('state').value
    if(stateFilter.length > 0)
      infos = infos.filter(service => stateFilter.includes(service.serviceState))

    return infos;
  }
  getServiceState(serviceState: ServiceState){
    switch(serviceState){
      case 0 :
        return "Inactivo";
      case 1 :
        return "En espera a confirmar";
      case 2 :
        return "Activo"
      case 3 :
        return "Finalizado"
    }
    return 'Unkown'
  }
  serviceDay(item : ShowClientService){
    return (new Date(item.serviceDate).toISOString().split('T'))[0]
  }
  getItemPrice(item? : ServiceItem){
    if(item == undefined)
      return 0;
    if(item.itemId == this.monthlyServiceId)
      return this.maintenancePrice;
    if(item.itemId == this.stabilizerId)
      return this.stabilizerPrice;

    return getItemPrice(item, this.commercial);
  }
  isMonthlyService(service : ShowClientService){
    for(const item of service.items){
      if(item.itemId == this.monthlyServiceId)
        return true;
    }
    return false;
  }
  isStabilizerService(service : ShowClientService){
    for(const item of service.items){
      if(item.itemId == this.stabilizerId)
        return true;
    }
    return false;
  }
  calculeItemAmount(item : ItemTable){
    return calculeItemAmount(item.price,item.quantity,item.discount ?? 0);
  }
  deleteService(clientId:number, serviceId:number){
    if(serviceId == -1) return;
    this.dialogService.SetDeleteMethod(()=>{
      this.serviceApiManagerService.delete(clientId,serviceId);
    })
  }
  createInvoices(clientId:number, serviceId:number, printOptions:PrintOptions){
    this.serviceApiManagerService.print(clientId, serviceId, printOptions);
  }
  createEstimate(clientId:number, serviceId:number){
    this.estimateApiService.generateEstimate(clientId, serviceId).subscribe(
      res =>{
        this.notificationSystemService.showNotifcation("Se ha creado el estimado con exito.", 0)
      },
      err => {
        this.notificationSystemService.showNotifcationWithError(err.error?.message ??"Ha ocurrido un error al intentar crear el estimado.", 1,err.error?.message)
      }
    );
  }
}

interface ShowClientService{
  serviceDate : Date;
  serviceId?: number;

  amount : number;
  manyMonths: number;
  permanent:boolean;
  serviceState: ServiceState;

  invoicesToPrint:number;

  items:ItemTable[];
}
