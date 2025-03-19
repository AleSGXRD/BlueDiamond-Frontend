import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormError } from '../../../types/forms/form-error';

@Component({
  selector: 'form-field-password',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-field-password.component.html',
  styleUrl: '../form-field.component.css'
})
export class FormFieldPasswordComponent {
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
}
