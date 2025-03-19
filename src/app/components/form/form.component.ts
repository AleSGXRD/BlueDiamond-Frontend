import { Component, input, Input } from '@angular/core';
import { FormService } from '../../services/managers/form/form.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import { NotificationSystemService } from '../../services/notification-system.service';
import { FormField, FormFieldType } from '../../types/forms/form-field';
import { DialogService } from '../../services/managers/dialog/dialog.service';
import { ButtonComponent } from '../buttons/button/button.component';
import { FormFieldComponent } from "../form-fields/form-field/form-field.component";
import { ReloadComponentDirective } from '../../directives/reload-component.directive';

@Component({
  selector: 'app-form',
  imports: [FormsModule, ReactiveFormsModule, ButtonComponent, FormFieldComponent, ReloadComponentDirective],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  public form :any;

  public inputs : FormField[] =[
    {
      type : FormFieldType.TEXT,
      formControlName:"email",
      name: "Email",
      placeholder : "...",
    }
  ];

  constructor(private notificationSystemService: NotificationSystemService,
    public formService: FormService,
    public dialogService: DialogService
  ) {
}
  public error : boolean = false;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.formService.formData.subscribe(res => {
      if(res != null){
        this.form = res.form
        this.inputs = res.inputs
      }
    })
  }

  DesappearForm(){
    this.error=false;
    this.formService.active = false;
  }
  SendData(){
    this.error = false;

    const inputSetTime = this.inputs.find(element => element.formControlName == 'setTime')
    if(inputSetTime){
      if(this.form.get(inputSetTime.formControlName).value == true){
        const fields = ['day', 'hours', 'minutes', 'seconds', 'time']
        for(const field of fields){
          if(this.form.get(field).value == undefined||this.form.get(field).value =='' )
            this.error=true
        }
      }
      if(this.error){
        this.notificationSystemService.showNotifcationWithoutRefresh("La fecha no contiene todos los valores que necesita.", 1);
        return;
      }
    }

    this.inputs.forEach(element=> {
        if(this.form.get(element.formControlName).errors != null){
          this.error = true
        }
      }
    );

    if(this.error){
      this.notificationSystemService.showNotifcationWithoutRefresh("El formulario aun tiene datos que faltan por llenar.", 1);
      return ;
    }
    this.dialogService.SetMethod(()=>{
      this.formService.ProcessData(this.form.value);
      this.DesappearForm();
    });
  }
}
