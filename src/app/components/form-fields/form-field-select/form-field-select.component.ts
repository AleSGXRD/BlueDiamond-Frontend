import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormError } from '../../../types/forms/form-error';
import { FormApiPorperties, FormSelectOption } from '../../../types/forms/form-select-option';
import { ApiService } from '../../../services/apis/api.service';

@Component({
  selector: 'form-field-select',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-field-select.component.html',
  styleUrl: '../form-field.component.css'
})
export class FormFieldSelectComponent {
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
  apiService?: ApiService;
  @Input()
  formApiProperties?: FormApiPorperties;

  @Input()
  options! : FormSelectOption[];
  @Input()
  form:any

  ngOnInit(): void {
    if(this.apiService && this.formApiProperties){
      const {namePropertyName, valuePropertyName} = this.formApiProperties
      this.apiService.getAll().subscribe(
        res => {
          const formOptions : FormSelectOption[] = res.map(
            (item:any) => ({name: item[namePropertyName], value : item[valuePropertyName], active : false})
          )
          this.options = formOptions;
          const valueInput = this.form.get(this.controlName).value;
          this.setInputValue(valueInput);
        }
      )
    }
    else{
      const valueInput = this.form.get(this.controlName).value;
      this.setInputValue(valueInput);
    }
  }

  isDropdownVisible = false;

  get formValue(){
    return this.value != undefined ?  this.options.find(option => option.value == this.value)?.name : this.placeholder
  }
  setInputValue(value:any){
    this.value = value;
    this.form.get(this.controlName).setValue(value);
  }

  toggleDropdown(event:any) {
    this.isDropdownVisible = !this.isDropdownVisible;
    event.stopPropagation();
  }
  // Detectar clic fuera del dropdown y ocultarlo
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const dropdown = document.getElementById('dropdown');
    const button = document.getElementById(this.controlName);

    // Si el clic no ocurrió dentro del dropdown ni del botón, ocultar el dropdown
    if (dropdown  && event.target !== button) {
      this.isDropdownVisible = false;
    }
  }
}
