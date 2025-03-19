import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientApiService } from '../../../services/apis/client/client-api.service';
import { Client } from '../../../types/api/client';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { NotificationSystemService } from '../../../services/notification-system.service';
import { BaseLayoutComponent } from "../../../layout/base-layout/base-layout.component";
import { ButtonComponent } from '../../../components/buttons/button/button.component';
import { ReloadComponentDirective } from '../../../directives/reload-component.directive';
import { ClientServicesComponent } from "../../../components/client-components/client-services/client-services.component";
import { ClientInvoicesComponent } from "../../../components/client-components/client-invoices/client-invoices.component";
import { NavigationMobileService } from '../../../services/managers/navigation-mobile.service';
import { FormBuilder, Validators } from '@angular/forms';
import { VALIDATORS_NAME } from '../../../constants/validators-constants';
import { ClientApiManagerService } from '../../../services/managers/api/client/client-api-manager.service';
import { FormData } from '../../../types/forms/form-data';
import { FormField, FormFieldType } from '../../../types/forms/form-field';
import { FORM_ERROR_CP, FORM_ERROR_EMAIL, FORM_ERROR_NAME, FORM_ERROR_PHONE_NUMBER } from '../../../constants/form-errors-constants';
import { LANGUAGE_OPTIONS } from '../../../constants/form/form-options-constants';
import { FormService } from '../../../services/managers/form/form.service';
import { FormType } from '../../../types/forms/form-type';
import { ClientHistoriesComponent } from "../../../components/client-components/client-histories/client-histories.component";
import { ClientEstimatesComponent } from "../../../components/client-components/client-estimates/client-estimates.component";
import { LoaderService } from '../../../services/managers/loader.service';
import { DialogService } from '../../../services/managers/dialog/dialog.service';
import { HistoryClientApiManagerService } from '../../../services/managers/api/history-client/history-client-api-manager.service';

@Component({
  selector: 'app-view-client',
  imports: [BaseLayoutComponent, CommonModule, ButtonComponent, ReloadComponentDirective,
    ClientServicesComponent, ClientInvoicesComponent, ClientHistoriesComponent, ClientEstimatesComponent],
  templateUrl: './view-client.component.html',
  styleUrl: './view-client.component.css'
})
export class ViewClientComponent {
  public id : any;
  public client!:Client;

  public view:number = 0;

  constructor(private route :ActivatedRoute,
    private clientApiService: ClientApiService,
    private clientApiManagerService : ClientApiManagerService,
    private historyClientApiManagerService: HistoryClientApiManagerService,
    private navigationMobileService: NavigationMobileService,
    private notificationSystemService: NotificationSystemService,
    private formService: FormService,
    private formBuilder: FormBuilder,
    private loaderService : LoaderService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  async ngOnInit() {

    await this.route.params.subscribe(
      params =>{
        this.id = params['id'];
        this.navigationMobileService.setClientId(this.id);
        this.clientApiService.get(this.id).subscribe(
          res => this.client = res,
          err => this.notificationSystemService.showNotifcationWithoutRefresh("Ha ocurrido un error al cargar el cliente", 1) );
      }
    )
  }
  approveServiceOffer(){
    if(!this.client || !this.client.clientId)return;
    const {clientId} = this.client;
    this.dialogService.SetMethod(()=>{
      this.clientApiService.approveOffer(clientId).subscribe(
        (res:any) => {
          this.notificationSystemService.showNotifcation(res.message ?? "Se ha aprobado el servicio mensual.", 0);
        }
      )
    })
  }

  sendServiceOffer(){
    if(!this.client || !this.client.clientId)return;
    const {clientId} = this.client;
    this.dialogService.SetMethod(()=>{
      this.loaderService.setLoader('Enviando correo...')
      this.clientApiService.sendServiceOffer(clientId).subscribe(
        res => {
          this.notificationSystemService.showNotifcation("Se ha enviado correctamente la oferta de servicio.", 0)
          this.loaderService.hideLoader()
        },
        err => {
          this.notificationSystemService.showNotifcationWithoutRefresh(err.error?.message ??"Ha ocurrido un erro al enviar la oferta.", 1);
          this.loaderService.hideLoader()
        }
      )
    })
  }

  inputsForm :FormField[] =[
  {
    type : FormFieldType.TEXT,
    formControlName: 'name',
    name: "Nombre de cliente*",
    errors: FORM_ERROR_NAME,
  },
  {
    type : FormFieldType.TEXT,
    formControlName: 'address',
    name: "Dirección del cliente",
  },
  {
    type : FormFieldType.TEXT,
    formControlName: 'city',
    name: "Ciudad",
  },
  {
    type : FormFieldType.TEXT,
    formControlName: 'country',
    name: "País",
  },
  {
    type : FormFieldType.TEXT,
    formControlName: 'cp',
    name: "Código postal*",
    errors: FORM_ERROR_CP,
  },
  {
    type : FormFieldType.PHONE_NUMBER,
    formControlName: 'phoneNumber',
    name: "Número de teléfono",
    errors: FORM_ERROR_PHONE_NUMBER,
  },
  {
    type : FormFieldType.EMAIL,
    formControlName: 'email',
    name: "Dirección de correo*",
    errors: FORM_ERROR_EMAIL,
  },
  {
    type : FormFieldType.SELECT,
    formControlName: 'language',
    name: "Lenguaje del cliente*",
    placeholder:'Lenguaje del cliente',
    options: LANGUAGE_OPTIONS
  },
  {
    type : FormFieldType.BOOLEAN,
    formControlName: 'commercial',
    name: "Cliente comercial*",
    value: false
  },
  {
    type : FormFieldType.NUMBER,
    formControlName: 'maintenancePrice',
    name: "Precio de mantenimmiento mensual*",
  },
  {
    type : FormFieldType.NUMBER,
    formControlName: 'stabilizerPrice',
    name: "Precio de la Estabilización Anual*",
  },
  {
    type : FormFieldType.DAYSOFWEEK,
    formControlName: 'daysPerWeek',
    name: "Días que se prestará el servicio de mantenimiento.*",
    value: ''
  },
  {
    type : FormFieldType.BOOLEAN,
    formControlName: 'offerSended',
    name: "Oferta de servicio enviada*",
    value : false
  },
  {
    type : FormFieldType.BOOLEAN,
    formControlName: 'offerApproved',
    name: "Oferta de servicio aprobada*",
    value: false
  },
]

  editClient(){
    console.log(this.client)
    const editform = this.formBuilder.group({
      clientId: [this.client.clientId],
      name: [this.client.name, VALIDATORS_NAME],
      address: [this.client.address],
      city: [this.client.city],
      cp: [this.client.cp, [Validators.required, Validators.pattern(/^[A-Za-z0-9\s\-]{3,10}$/)]],
      country: [this.client.country],
      phoneNumber: [this.client.phoneNumber, Validators.pattern(/^[0-9\s+()]*$/)],
      email:[this.client.email, [Validators.required, Validators.email]],
      language: [this.client.language, [Validators.required]],
      offerSended:[this.client.offerSended],
      offerApproved: [this.client.offerApproved],
      maintenancePrice: [this.client.maintenancePrice, [Validators.required]],
      stabilizerPrice: [this.client.stabilizerPrice, [Validators.required]],
      daysPerWeek: [this.client.daysPerWeek, [Validators.required]],
      commercial: [this.client.commercial],
    })
    editform.get('language')?.setValue(this.client.language);

    const editClientFormData: FormData ={
      apiService: this.clientApiManagerService,
      form: editform,
      inputs: this.inputsForm
    }
    this.formService.SetFormData(editClientFormData, FormType.EDIT);
  }
  addHistoryClient()
  {
    const addform = this.formBuilder.group({
      clientId: [this.client.clientId],
      active: [false, Validators.required],
      note : [undefined],
      date: [new Date(), Validators.required],
    })
    const addInputs:FormField[] = [
      {
        type : FormFieldType.DATETIME,
        formControlName: 'date',
        name: "Fecha*",
        value: new Date()
      },
      {
        type : FormFieldType.BOOLEAN,
        formControlName: 'active',
        name: "Cliente activo*",
        value: false
      },
      {
        type : FormFieldType.TEXT,
        formControlName: 'note',
        name: "Nota",
      },
    ]

    const addHistoryClientFormData: FormData ={
      apiService: this.historyClientApiManagerService,
      form: addform,
      inputs: addInputs
    }
    this.formService.SetFormData(addHistoryClientFormData, FormType.ADD);
  }
  setView(view:number){
    this.view = view;
  }
  viewOffer(){
    this.clientApiService.viewPdf(this.id);
  }

  get languageClient(){
    return this.client.language == LANGUAGE_OPTIONS[0].value ? "ES" : "EN";
  }
  isThisView(view :number){
    return this.view == view;
  }
  deleteClient(id:number){
    if(id == -1) return;
    this.dialogService.SetDeleteMethod(()=>{
      this.clientApiService.delete(id).subscribe(
        res => {
          this.router.navigate(['/home'])
          this.notificationSystemService.showNotifcationWithoutRefresh("Se ha eliminado el cliente con exito", 0);
        },
        err => {
          this.notificationSystemService.showNotifcationWithoutRefresh("No se ha podido eliminar el cliente.", 1)
        }
      )
    })
  }
}
