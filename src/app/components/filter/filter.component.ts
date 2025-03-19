import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '../form-fields/form-field/form-field.component';

@Component({
  selector: 'filter',
  imports: [FormsModule, ReactiveFormsModule, FormFieldComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  @Input()
  form:any;
  @Input()
  inputs: any;
}
