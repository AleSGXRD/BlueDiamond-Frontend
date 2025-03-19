import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormError } from '../../../types/forms/form-error';
import { format } from 'date-fns';

@Component({
  selector: 'form-field-datetime',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-field-datetime.component.html',
  styleUrls: ['../form-field.component.css', './form-field-datetime.component.css']
})
export class FormFieldDatetimeComponent {
  @Input()
  fieldName!: string;
  @Input()
  value!:any;
  @Input()
  controlName!:string;
  @Input()
  placeholder?: string;
  @Input()
  errors? :FormError[];
  @Input()
  form:any

  formDatetime :any;
  dateValue :Date = new Date();
  constructor(private formBuilder:FormBuilder){
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(this.value == undefined) this.value = new Date();

    this.formDatetime = this.formBuilder.group({
      date:[format(this.value, 'yyyy-MM-dd'), [Validators.required]],
      hours:[this.value.getHours(), [Validators.required]],
      minutes:[this.value.getMinutes(), [Validators.required]],
      seconds:[this.value.getSeconds(), [Validators.required]],
    })
  }
  inputDate(event:any){
    const input = new Date(event.target.value)
    this.dateValue.setDate(input.getDate()+1);
    this.dateValue.setMonth(input.getMonth());
    this.dateValue.setFullYear(input.getFullYear());

    console.log('La fecha es', this.dateValue);

    this.form.get(this.controlName)?.setValue(this.dateValue);
  }
  inputHours(event:any){
    if(event.target.value > 23)
    {
      event.target.value = 23;
    }
    if(event.target.value < 0){
      event.target.value = 0;
    }
    const input = event.target.value

    this.dateValue.setHours(input);
    console.log('La fecha es', this.dateValue);

    this.form.get(this.controlName)?.setValue(this.dateValue);
  }
  inputMinutes(event:any){
    if(event.target.value > 59)
    {
      event.target.value = 59;
    }
    if(event.target.value < 0){
      event.target.value = 0;
    }

    const input = event.target.value

    this.dateValue.setMinutes(input);
    console.log('La fecha es', this.dateValue);

    this.form.get(this.controlName)?.setValue(this.dateValue);
  }
  inputSeconds(event:any){
    if(event.target.value > 59)
    {
      event.target.value = 59;
    }
    if(event.target.value < 0){
      event.target.value = 0;
    }

    const input = event.target.value

    this.dateValue.setSeconds(input);
    console.log('La fecha es', this.dateValue);

    this.form.get(this.controlName)?.setValue(this.dateValue);
  }
}
