import { Component } from '@angular/core';
import { AuthManagerService } from '../../services/managers/auth/auth-manager.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import { Login } from '../../types/auth/login';
import { FormFieldTextComponent } from '../../components/form-fields/form-field-text/form-field-text.component';
import { FormFieldPasswordComponent } from "../../components/form-fields/form-field-password/form-field-password.component";
import { CommonModule } from '@angular/common';
import { BaseLayoutComponent } from '../../layout/base-layout/base-layout.component';
import { FORM_ERROR_NAME, FORM_ERROR_PASSWORD } from '../../constants/form-errors-constants';
import { LoginLayoutComponent } from '../../layout/login-layout/login-layout.component';
import { ButtonComponent } from "../../components/buttons/button/button.component";

@Component({
  standalone:true,
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormFieldTextComponent, FormsModule,
    FormFieldPasswordComponent, CommonModule, LoginLayoutComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public form! : FormGroup;
  errors : boolean = false;

  formErrorName = FORM_ERROR_NAME;
  formErrorPassword = FORM_ERROR_PASSWORD;

  constructor(private authManagerService: AuthManagerService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: [undefined, [Validators.required,Validators.minLength(3), Validators.maxLength(16)]],
      password: [undefined, [Validators.required,Validators.minLength(6), Validators.maxLength(32)]]
    })
  }

  submitLogin(){
    if(!this.form.valid){
      this.errors = true;
      return;
    }

    const login : Login = {
      name: this.form.get('name')?.value,
      password: this.form.get('password')?.value
    }

    this.authManagerService.login(login)
  }
}
