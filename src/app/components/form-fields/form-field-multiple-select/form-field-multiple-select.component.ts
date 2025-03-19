import { Component, HostListener, Input } from '@angular/core';
import { FormError } from '../../../types/forms/form-error';
import { FormApiPorperties, FormSelectOption } from '../../../types/forms/form-select-option';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../services/apis/api.service';
import { FormService } from '../../../services/managers/form/form.service';

@Component({
  selector: 'form-field-multiple-select',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-field-multiple-select.component.html',
  styleUrls: ['../form-field.component.css', './form-field-multiple-select.component.css']
})
export class FormFieldMultipleSelectComponent {
  @Input()
  fieldName!: string;
  @Input()
  value! : any[];
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
  form:any;
  @Input()
  inputEmitter!: boolean;

  formValueInput :any;

  isDropdownVisible = false;
  constructor(private formService: FormService){

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(this.apiService && this.formApiProperties){
      const {namePropertyName, valuePropertyName} = this.formApiProperties
      this.apiService.getAll().subscribe(
        res =>{
          const values = this.form.get(this.controlName).value;
          const formOptions : FormSelectOption[] = res.map(
            (item:any) => ({name: item[namePropertyName], value : item[valuePropertyName], active : values?values.includes(item.itemId):false})
          )
          this.options = formOptions;
        }
      )
    }
    this.formService.formData.subscribe(res=>{
      if(res == null) return;
      const values = res.form.get(this.controlName)?.value;
      if(values && values.length > 0)
        for(const option of this.options){
          option.active = values.includes(option.value);
        }
      else
        this.options.forEach(opt => opt.active = false)

      this.value = this.getFormValues;
      this.initValueInput();
    })
  }

  get formValue(){
    this.value = this.getFormValues;
    this.initValueInput();
    return this.formValueInput
  }
  initValueInput(){
    this.formValueInput = this.value != undefined && this.value.length > 0 ?  this.getFormValue(this.options.filter(option => option.active == true)) : this.placeholder;
  }
  getFormValue(options: FormSelectOption[]){
    let val = '';
    for(let i= 0; i< options.length;i++){
      if(i < options.length-1){
        val += options[i].name + ', ';
        continue;
      }

      val += options[i].name;
    }
    return val;
  }
  setInputValue(pos : number){
    this.options[pos].active = !this.options[pos].active;

    this.value = this.getFormValues;
    this.form.get(this.controlName).setValue(this.value);
    if(this.inputEmitter == true)
      this.formService.formEventEmitter.emit('emit')
  }
  get getFormValues(){
    let values = []
    for(const option of this.options){
      if(!option.active)
        continue;

      values.push(option.value)
    }
    return values
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
