import { Component } from '@angular/core';
import { BaseLayoutComponent } from '../../layout/base-layout/base-layout.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { UseraccountApiManagerService } from '../../services/managers/api/useraccount/useraccount-api-manager.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NavigationMobileService } from '../../services/managers/navigation-mobile.service';
import { FormField, FormFieldType } from '../../types/forms/form-field';
import { FormData } from '../../types/forms/form-data';
import { VALIDATORS_NAME, VALIDATORS_PASSWORD } from '../../constants/validators-constants';
import { RolApiService } from '../../services/apis/rol/rol-api.service';
import { FORM_ERROR_NAME, FORM_ERROR_PASSWORD } from '../../constants/form-errors-constants';
import { Observable } from 'rxjs';
import { Useraccount } from '../../types/api/useraccount';
import { UseraccountApiService } from '../../services/apis/account/useraccount-api.service';
import { ButtonComponent } from '../../components/buttons/button/button.component';
import { FormService } from '../../services/managers/form/form.service';
import { FormType } from '../../types/forms/form-type';
import { NotificationSystemService } from '../../services/notification-system.service';

@Component({
  selector: 'useraccount-page',
  imports: [BaseLayoutComponent, CommonModule, AsyncPipe,ButtonComponent],
  templateUrl: './useraccount-page.component.html',
  styleUrl: './useraccount-page.component.css'
})
export class UseraccountPageComponent {

  useracounts$! : Observable<Useraccount[]>;

  constructor(private useraccountApiManagerService: UseraccountApiManagerService,
    private useraccountApiService: UseraccountApiService,
    private formBuilder: FormBuilder,
    private navigationMobile: NavigationMobileService,
    private rolApiService: RolApiService,
    private formService: FormService,
    private notificationSystemService: NotificationSystemService
  ) {
    this.useracounts$ = this.useraccountApiService.getAll();
  }

  form: any;
  inputs: FormField[] =[];
  addUseraccountFormData! : FormData;


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.form = this.formBuilder.group({
      rolId: [undefined,[Validators.required]],
      name: [undefined, VALIDATORS_NAME],
      password: [undefined, VALIDATORS_PASSWORD]
    })
    this.inputs = [
      {
        type: FormFieldType.SELECT,
        formControlName: 'rolId',
        name: "Rol de usuario*",
        apiService: this.rolApiService,
        formApiProperties: {namePropertyName : 'name', valuePropertyName: 'rolId'},
        placeholder: 'Seleccione un rol para el usuario'
      },
      {
        type: FormFieldType.TEXT,
        formControlName: 'name',
        name: "Nombre de usuario*",
        errors: FORM_ERROR_NAME
      },
      {
        type: FormFieldType.PASSWORD,
        formControlName: 'password',
        name: "Contraseña de usuario*",
        errors: FORM_ERROR_PASSWORD
      }
    ]
    this.addUseraccountFormData = {
      apiService:this.useraccountApiManagerService,
      form: this.form,
      inputs: this.inputs
    }

    this.navigationMobile.setFormData(this.addUseraccountFormData);
  }

  editItem(user: Useraccount){
    const editForm = this.formBuilder.group({
      userId: [user.userId, [Validators.required]],
      rolId: [user.rolId,[Validators.required]],
      name: [user.name, VALIDATORS_NAME],
      password: [undefined, VALIDATORS_PASSWORD]
    })
    const editInputs = [
      {
        type: FormFieldType.SELECT,
        formControlName: 'rolId',
        name: "Rol de usuario*",
        apiService: this.rolApiService,
        formApiProperties: {namePropertyName : 'name', valuePropertyName: 'rolId'},
        placeholder: 'Seleccione un rol para el usuario'
      },
      {
        type: FormFieldType.TEXT,
        formControlName: 'name',
        name: "Nombre de usuario*",
        errors: FORM_ERROR_NAME
      },
      {
        type: FormFieldType.PASSWORD,
        formControlName: 'password',
        name: "Contraseña de usuario*",
        errors: FORM_ERROR_PASSWORD
      }
    ]
    const editUseraccountFormData : FormData = {
      apiService:this.useraccountApiManagerService,
      form: editForm,
      inputs: editInputs
    }

    this.formService.SetFormData(editUseraccountFormData, FormType.EDIT);
  }
  deleteItem(user: Useraccount){
    if(!user.userId) return;

    this.useraccountApiService.delete(user.userId).subscribe(
      res => {
        this.notificationSystemService.showNotifcation("Se ha eliminado el usuario.", 0);
      },
      err => {
        this.notificationSystemService.showNotifcationWithoutRefresh("No se ha podido eliminar el usuario: "+ err.error?.message, 1);
      }
    )
  }
}
