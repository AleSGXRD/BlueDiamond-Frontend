import { Component } from '@angular/core';
import { FormField, FormFieldType } from '../../types/forms/form-field';
import { ServiceItemApiManagerService } from '../../services/managers/api/service-item/service-item-api-manager.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormService } from '../../services/managers/form/form.service';
import { FormType } from '../../types/forms/form-type';
import { Observable } from 'rxjs';
import { ServiceItem } from '../../types/api/service-item';
import { ServiceItemApiService } from '../../services/apis/service-item/service-item-api.service';
import { BaseLayoutComponent } from '../../layout/base-layout/base-layout.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NavigationMobileService } from '../../services/managers/navigation-mobile.service';
import { ButtonComponent } from '../../components/buttons/button/button.component';
import { NotificationSystemService } from '../../services/notification-system.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-service-item',
  imports: [FormsModule, ReactiveFormsModule, BaseLayoutComponent, CommonModule, AsyncPipe,
    ButtonComponent
  ],
  templateUrl: './service-item.component.html',
  styleUrl: './service-item.component.css'
})
export class ServiceItemComponent {
  serviceItems$ : Observable<ServiceItem[]>;
  stabilizerId: number = environment.stabilizerId;
  monthlyId : number = environment.monthlyServiceId

  inputsForm :FormField[] =[
    {
      type : FormFieldType.TEXTAREA,
      formControlName: 'name',
      name: "Nombre del servicio*",
    },
    {
      type : FormFieldType.TEXTAREA,
      formControlName: 'description',
      name: "Descripción del servicio",
    },
    {
      type : FormFieldType.NUMBER,
      formControlName: 'price',
      name: "Precio",
    },
    {
      type : FormFieldType.NUMBER,
      formControlName: 'priceCommercial',
      name: "Precio para los comerciales",
    },
  ]
  form:any;

  addServiceItemFormData : any;

  constructor(
    private serviceItemApiService: ServiceItemApiService,
    private serviceItemApiManagerService: ServiceItemApiManagerService,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private navigationMobileService: NavigationMobileService,
    private notificationSystemService: NotificationSystemService
  ) {
    this.serviceItems$ = this.serviceItemApiService.getAll();
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.form = this.formBuilder.group({
      name: [undefined, [Validators.required]],
      description: [undefined],
      price: [undefined, [Validators.required]],
      priceCommercial: [undefined],
    })

    this.addServiceItemFormData = {
      apiService: this.serviceItemApiManagerService,
      form: this.form,
      inputs: this.inputsForm
    }
    this.navigationMobileService.setFormData(this.addServiceItemFormData);
  }
  editItem(item:ServiceItem){
    const editForm = this.formBuilder.group({
      itemId: [item.itemId, [Validators.required]],
      name: [item.name, [Validators.required]],
      description: [item.description],
      price: [item.price, [Validators.required]],
      priceCommercial: [item.priceCommercial],
    })
    editForm.get('itemId')?.setValue(item.itemId);
    const editServiceItemFormData = {
      apiService: this.serviceItemApiManagerService,
      form: editForm,
      inputs: this.inputsForm
    }
    this.formService.SetFormData(editServiceItemFormData, FormType.EDIT);
  }
  deleteItem(item:ServiceItem){
    if(!item || !item.itemId) return;

    this.serviceItemApiService.delete(item.itemId).subscribe(
      res=>{
        this.notificationSystemService.showNotifcation("Ha sido eliminado el item con exito.", 0);
      },
      err=>{
        this.notificationSystemService.showNotifcation(err?.err.message?? "Ha ocurrido un error al intentar eliminar el item.", 1);
      }
    )
  }
}
