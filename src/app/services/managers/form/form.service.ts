import { Injectable, EventEmitter } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { FormBuilder } from '@angular/forms';

import { FormType } from '../../../types/forms/form-type';
import { FormField } from '../../../types/forms/form-field';
import { ApiManagerService } from '../api/api-manager.service';
import { FormData } from '../../../types/forms/form-data';


@Injectable({
  providedIn: 'root'
})
export class FormService {

  public active : boolean = false;
  public apiManagerService! : ApiManagerService;

  public formData!: BehaviorSubject<FormData | null>;
  public formEventEmitter = new EventEmitter();

  public formType : FormType = FormType.ADD;
  public idEditting : any;

  constructor(private formBuilder: FormBuilder) {
    this.formData = new BehaviorSubject<FormData | null>(null);
  }

  public SetActiveForm(active : boolean){
    this.active = active;
  }
  public SetFormData(formData: FormData, formType: FormType){
    // formData.form.reset();
    this.formType = formType;
    this.formData.next(formData);
    this.SetActiveForm(true);
  }

  public ProcessData(data:any){
    switch(this.formType){
      case FormType.ADD:
        this.AddData(data);
        break;
      case FormType.EDIT:
        this.UpdateData(data);
        break;
    }
  }

  public AddData(data : any){
    this.formData.value?.apiService.add(data);
  }
  public UpdateData(data:any){
    console.log(this.idEditting);
    this.formData.value?.apiService.edit(data,this.idEditting);
  }
}

