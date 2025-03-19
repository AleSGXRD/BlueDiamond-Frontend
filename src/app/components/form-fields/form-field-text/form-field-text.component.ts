import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormError } from '../../../types/forms/form-error';

@Component({
  selector: 'form-field-text',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './form-field-text.component.html',
  styleUrl: '../form-field.component.css'
})
export class FormFieldTextComponent{
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
