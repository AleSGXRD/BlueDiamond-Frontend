import { Component, Input } from '@angular/core';
import { FormField } from '../../../types/forms/form-field';
import { FormGroup } from '@angular/forms';
import { FormFieldTextComponent } from '../form-field-text/form-field-text.component';
import { FormFieldPasswordComponent } from '../form-field-password/form-field-password.component';
import { FormFieldBooleanComponent } from '../form-field-boolean/form-field-boolean.component';
import { FormFieldEmailComponent } from '../form-field-email/form-field-email.component';
import { FormFieldNumberComponent } from '../form-field-number/form-field-number.component';
import { FormFieldPhoneNumberComponent } from '../form-field-phone-number/form-field-phone-number.component';
import { FormFieldSelectComponent } from '../form-field-select/form-field-select.component';
import { FormFieldMultipleSelectComponent } from "../form-field-multiple-select/form-field-multiple-select.component";
import { FormFieldServiceItemComponent } from '../form-field-service-item/form-field-service-item.component';
import { FormFieldDateComponent } from '../form-field-date/form-field-date.component';
import { FormFieldDatetimeComponent } from '../form-field-datetime/form-field-datetime.component';
import { FormFieldDaysOfWeekComponent } from "../form-field-days-of-week/form-field-days-of-week.component";
import { FormFieldTextAreaComponent } from '../form-field-text-area/form-field-text-area.component';

@Component({
  selector: 'app-form-field',
  imports: [FormFieldTextComponent, FormFieldPasswordComponent, FormFieldBooleanComponent, FormFieldEmailComponent,
    FormFieldNumberComponent, FormFieldPhoneNumberComponent, FormFieldSelectComponent, FormFieldMultipleSelectComponent,
    FormFieldServiceItemComponent, FormFieldDateComponent, FormFieldDatetimeComponent, FormFieldDaysOfWeekComponent,
  FormFieldTextAreaComponent],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.css'
})
export class FormFieldComponent {
  @Input()
  input!:FormField;
  @Input()
  form!:FormGroup;

  condition(){
    if(this.input.condition == undefined) return true;

    const active = this.form.get(this.input.condition.controlName)?.value == this.input.condition.value
    return active;
  }
}
