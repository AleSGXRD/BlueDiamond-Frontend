import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormError } from '../../../types/forms/form-error';

@Component({
  selector: 'form-field-phone-number',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-field-phone-number.component.html',
  styleUrl: '../form-field.component.css'
})
export class FormFieldPhoneNumberComponent {
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

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9\s+()]/g, '');  // Remover cualquier carácter que no sea un número
    this.form.get(this.controlName)?.setValue(input.value);
  }
}
