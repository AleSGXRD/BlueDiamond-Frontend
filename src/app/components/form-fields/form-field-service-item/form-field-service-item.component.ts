import { Component, Input } from '@angular/core';
import { FormApiPorperties, FormSelectOption } from '../../../types/forms/form-select-option';
import { ApiService } from '../../../services/apis/api.service';
import { FormError } from '../../../types/forms/form-error';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../../services/managers/form/form.service';

@Component({
  selector: 'form-field-service-item',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './form-field-service-item.component.html',
  styleUrls: ['../form-field.component.css', './form-field-service-item.component.css']
})
export class FormFieldServiceItemComponent {
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
  formControlNameLinked! : string;
  @Input()
  form:any

  isDropdownVisible = false;

  public items : any[] = [];

  /**
   *
   */
  constructor(private formService : FormService) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(this.apiService && this.formApiProperties){
      const {namePropertyName, valuePropertyName} = this.formApiProperties
      this.apiService.getAll().subscribe(
        res =>{
          const formOptions : FormSelectOption[] = res.map(
            (item:any) => ({name: item[namePropertyName], value : item[valuePropertyName], active : false})
          )
          this.options = formOptions;
          const values : any[] = this.form.get(this.formControlNameLinked)?.value;
          this.updateItemsLinked(values);
        }
      )
    }
    this.formService.formData.subscribe(res => {
      const values : any[] = res?.form.get(this.controlName)?.value;
      this.updateItems(values);
    })
    this.formService.formEventEmitter.subscribe(res => {
      const values : any[] = this.form.get(this.formControlNameLinked)?.value;
      this.updateItemsLinked(values);
    })
  }
  obtainItemName(id:any){
    return this.options.find(option => option.value == id)?.name;
  }
  updateItems(values: any[]){
    if(values == null) return [];

    const mapped : InputServiceItemValues[] = values.map(
      (value:any) =>
        ({value: value.value, name: value.name ?? this.obtainItemName(value), quantity : value.quantity ?? undefined, discount: value.discount ?? undefined}))

    for(const value of values){
      const found = this.items.find((item:any) => item.value == value.value);
      if(!found){
        const mappedItem = mapped.find((item:any) => item.value == value.value)
        this.items.push(mappedItem);
      }
      else{
        if(found.name == undefined){
          const mappedItem = mapped.find((item:any) => item.value == value.value)
          found.name = mappedItem?.name
          found.quantity = mappedItem?.quantity
          found.discount = mappedItem?.discount
        }
      }
    }
    let repeat : boolean = true;
    let valueIds = values.map(value => value.value)
    while(repeat){
      repeat = false;
      for(let i =0 ;i < this.items.length; i++){
        if(valueIds.includes(this.items[i].value) == false){
          this.items = [...this.items.slice(0, i), ...this.items.slice(i+1)]
          repeat = true;
          break;
        }
      }
    }
    this.form.get(this.controlName)?.setValue(this.items);
    return;
  }
  updateItemsLinked(values: any[]){
    if(values == null) return [];

    const mapped : InputServiceItemValues[] = values.map(
      (value:any) =>
        ({value: value, name: this.obtainItemName(value), quantity : undefined, discount: undefined}))

    for(const value of values){
      const found = this.items.find((item:any) => item.value == value);
      if(!found){
        const mappedItem = mapped.find((item:any) => item.value == value)
        this.items.push(mappedItem);
      }
      else{
        if(found.name == undefined){
          const mappedItem = mapped.find((item:any) => item.value == value)
          found.name = mappedItem?.name
          found.quantity = mappedItem?.quantity
          found.discount = mappedItem?.discount
        }
      }
    }
    let repeat : boolean = true;
    while(repeat){
      repeat = false;
      for(let i =0 ;i < this.items.length; i++){
        if(values.includes(this.items[i].value) == false){
          this.items = [...this.items.slice(0, i), ...this.items.slice(i+1)]
          repeat = true;
          break;
        }
      }
    }
    this.form.get(this.controlName)?.setValue(this.items);
    return;
  }
  onInputDiscount(event: Event, id:any): void {
    const input = event.target as HTMLInputElement;
    this.items.find((item:any) => item.value == id).discount = parseInt(input.value.replace(/[^0-9\s+()]/g, ''));
    input.value = input.value.replace(/[^0-9\s+()]/g, '');  // Remover cualquier carácter que no sea un número

    this.form.get(this.controlName)?.setValue(this.items);
  }
  onInputQuantity(event: Event, id:any): void {
    const input = event.target as HTMLInputElement;
    this.items.find((item:any) => item.value == id).quantity = parseInt(input.value.replace(/[^0-9\s+()]/g, ''));
    input.value = input.value.replace(/[^0-9\s+()]/g, '');  // Remover cualquier carácter que no sea un número

    this.form.get(this.controlName)?.setValue(this.items);
  }
}
interface InputServiceItemValues{
  value: any,
  name: any,
  quantity?: number,
  discount?: number,
}
