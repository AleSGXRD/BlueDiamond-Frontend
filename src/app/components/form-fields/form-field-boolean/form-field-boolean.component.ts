import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormError } from '../../../types/forms/form-error';

@Component({
  selector: 'form-field-boolean',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-field-boolean.component.html',
  styleUrl: '../form-field.component.css'
})
export class FormFieldBooleanComponent {
  @Input()
  fieldName!: string;
  @Input()
  value!:boolean;
  @Input()
  controlName!:string;
  @Input()
  placeholder?: string;
  @Input()
  errors? :FormError[];
  @Input()
  form:any
}
