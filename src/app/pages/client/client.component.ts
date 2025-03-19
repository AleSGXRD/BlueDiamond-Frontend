import { Component } from '@angular/core';
import { BaseLayoutComponent } from "../../layout/base-layout/base-layout.component";
import { ClientApiService } from '../../services/apis/client/client-api.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Client } from '../../types/api/client';
import { Service } from '../../types/api/service';
import { FormData } from '../../types/forms/form-data';
import { ClientApiManagerService } from '../../services/managers/api/client/client-api-manager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FORM_ERROR_CP, FORM_ERROR_EMAIL, FORM_ERROR_NAME, FORM_ERROR_PHONE_NUMBER } from '../../constants/form-errors-constants';
import { LANGUAGE_OPTIONS } from '../../constants/form/form-options-constants';
import { VALIDATORS_NAME } from '../../constants/validators-constants';
import { FormField, FormFieldType } from '../../types/forms/form-field';
import { NavigationMobileService } from '../../services/managers/navigation-mobile.service';
import { FilterComponent } from '../../components/filter/filter.component';
import { filtroPorProximidad } from '../../logic/filters';
import { DialogService } from '../../services/managers/dialog/dialog.service';
import { NotificationSystemService } from '../../services/notification-system.service';
import { ButtonComponent } from '../../components/buttons/button/button.component';

@Component({
  selector: 'app-client',
  imports: [BaseLayoutComponent, CommonModule, FilterComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  clients$ : Observable<Client[]>;
  clients : Client[] = [];

  /**
   *
   */

  addClientFormData! :FormData;

  public formFilter! : FormGroup;
  public inputsFormFilter :FormField[] =[
    {
      type : FormFieldType.TEXT,
      formControlName: 'search',
      name: "Nombre del cliente...",
    },
    {
      type : FormFieldType.SELECT,
      formControlName: 'commercial',
      name: "Tipo de cliente",
      placeholder: "Seleccione un tipo de cliente",
      options: [
        {
          name:'Todos',
          value: 0
        },
        {
          name: 'No comercial',
          value : 1,
        },
        {
          name: 'Comercial',
          value: 2
        }
      ]
    },
    // {
    //   type : FormFieldType.SELECT,
    //   formControlName: 'active',
    //   name: "Estado de cliente",
    //   placeholder: "Seleccione un estado de cliente",
    //   options: [
    //     {
    //       name:'Todos',
    //       value: 0
    //     },
    //     {
    //       name: 'No activo',
    //       value : 1,
    //     },
    //     {
    //       name: 'Activo',
    //       value: 2
    //     }
    //   ]
    // }
  ]

  public form! :FormGroup;
  formErrorName = FORM_ERROR_NAME;
  formErrorEmail = FORM_ERROR_EMAIL;
  formErrorCP = FORM_ERROR_CP;
  formErrorPhoneNumber = FORM_ERROR_PHONE_NUMBER;

  languagesOptions = LANGUAGE_OPTIONS;

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

  constructor(private clientApiService: ClientApiService,
    private clientApiManagerService: ClientApiManagerService,
    private navigationMobileService: NavigationMobileService,
    private formBuilder : FormBuilder
  ) {
    this.clients$ = this.clientApiService.getAll();
    this.navigationMobileService.setClientId(-1);
    this.clientApiService.getAll().subscribe(res => this.clients = res)
  }
  get listClient(){
    if(this.clients.length == 0) return [];
    let listClient = [...this.clients];

    const filter = this.formFilter.get('search')?.value;
    // const state = this.formFilter.get('state')?.value;
    const commercial = this.formFilter.get('commercial')?.value;
    console.log(filter);
    if(!(filter == undefined || filter == ''))
      listClient = filtroPorProximidad (filter, 'name', listClient, 13);

    listClient = listClient.filter(value => {
      if(commercial != 0){
        if(commercial != 0){
          if(commercial == 1){
            if(value.commercial == true)
              return false
          }
          if(commercial == 2){
            if(value.commercial == false)
              return false
          }
        }
      }
      return true
    })

    return listClient
  }
  ngOnInit(): void {
    this.formFilter = this.formBuilder.group({
      search : [undefined],
      commercial: [undefined]
    })
    this.form = this.formBuilder.group({
      name: [undefined, VALIDATORS_NAME],
      address: [undefined],
      city: [undefined],
      cp: [undefined, [Validators.required, Validators.pattern(/^[A-Za-z0-9\s\-]{3,10}$/)]],
      country: [undefined],
      phoneNumber: [undefined, Validators.pattern(/^[0-9\s+()]*$/)],
      email:[undefined, [Validators.required, Validators.email]],
      language: [undefined, [Validators.required]],
      offerSended:[false],
      offerApproved: [false],
      maintenancePrice: [undefined, [Validators.required]],
      stabilizerPrice: [undefined, [Validators.required]],
      daysPerWeek: [undefined, [Validators.required]],
      commercial: [false],
    })
    this.form.get('offerSended')?.setValue(false);
    this.form.get('offerApproved')?.setValue(false);
    this.form.get('commercial')?.setValue(false);

    this.addClientFormData ={
      apiService: this.clientApiManagerService,
      form: this.form,
      inputs: this.inputsForm
    }
    this.navigationMobileService.setFormData(this.addClientFormData);
  }
  manyServices(client:Client){
    const serviceIds = [...new Set(client.services?.map(service=> service.serviceId))]
    return serviceIds.length;
  }

  manyInvoicesWithoutPay(client:Client){
    const serviceIds = [...new Set(client.services?.map(service=> service.serviceId))]
    let manyInvoices = 0;
    for(const serviceId of serviceIds){
      const found : Service | undefined = client.services?.find(service => service.serviceId == serviceId)
      if(found)
        manyInvoices += found.invoices?.filter(inv => inv.paid == null).length ?? 0
    }
    return manyInvoices
  }

}
