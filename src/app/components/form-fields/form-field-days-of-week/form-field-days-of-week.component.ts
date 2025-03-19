import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormError } from '../../../types/forms/form-error';
import { capitalizerFirstLetter } from '../../../logic/text-manager';

@Component({
  selector: 'form-field-days-of-week',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-field-days-of-week.component.html',
  styleUrls: ['./form-field-days-of-week.component.css','../form-field.component.css']
})
export class FormFieldDaysOfWeekComponent {
  @Input()
  fieldName!: string;
  @Input()
  value!:string;
  @Input()
  controlName!:string;
  @Input()
  placeholder?: string;
  @Input()
  errors? :FormError[];
  @Input()
  form:any

  formDaysOfWeek : any;
  constructor(private formBuilder: FormBuilder){
    this.formDaysOfWeek = this.formBuilder.group({
      monday:[false],
      tuesday: [false],
      wednesday: [false],
      thursday: [false],
      friday: [false],
      saturday: [false],
      sunday: [false]
    })
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const valueForm : string = this.form.get(this.controlName).value;

    if(valueForm && valueForm != ''){
      const daysInForm = valueForm.split(', ').map(value => value.toLowerCase());
      for(const day of daysInForm){
        const formControl : FormControl = this.formDaysOfWeek.get(day)
        formControl.setValue(true);
      }
      this.onInput("");
    }

  }

  days : string[] = [
                    "monday",
                    "tuesday",
                    "wednesday",
                    "thursday",
                    "friday",
                    "saturday",
                    "sunday"
                  ]

  onInput(dayActual:string): void {
    let newValue = ''
    let daysSelected : string[] = []

    for(const day of this.days){
      const dayValue = this.formDaysOfWeek.get(day)?.value
      if(dayValue && day != dayActual || (dayValue == false && day == dayActual)){
        daysSelected.push(capitalizerFirstLetter(day))
      }
    }
    newValue = daysSelected.join(', ')

    if(newValue != this.value){
      this.value = newValue;
      this.form.get(this.controlName)?.setValue(this.value);
      console.log(this.value)
    }
  }
}
