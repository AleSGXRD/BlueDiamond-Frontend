import { Component, Input } from '@angular/core';
import { FormError } from '../../../types/forms/form-error';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { format } from 'date-fns'

@Component({
  selector: 'form-field-date',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './form-field-date.component.html',
  styleUrl: '../form-field.component.css'
})
export class FormFieldDateComponent {
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
}
