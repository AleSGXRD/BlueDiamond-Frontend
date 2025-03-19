import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormError } from '../../../types/forms/form-error';

@Component({
  selector: 'form-field-email',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-field-email.component.html',
  styleUrl: '../form-field.component.css'
})
export class FormFieldEmailComponent {
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
