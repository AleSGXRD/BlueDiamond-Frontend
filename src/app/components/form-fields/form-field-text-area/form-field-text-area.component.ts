import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormError } from '../../../types/forms/form-error';

@Component({
  selector: 'form-field-text-area',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './form-field-text-area.component.html',
  styleUrls: ['../form-field.component.css','./form-field-text-area.component.css']
})
export class FormFieldTextAreaComponent {
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
