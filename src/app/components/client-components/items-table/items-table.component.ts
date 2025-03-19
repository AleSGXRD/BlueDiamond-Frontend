import { Component, Input } from '@angular/core';

@Component({
  selector: 'items-table',
  imports: [],
  templateUrl: './items-table.component.html',
  styleUrl: './items-table.component.css'
})
export class ItemsTableComponent {

  @Input()
  items!:ItemTable[]

  calculeItemAmount(item:ItemTable){
    return ((item.price * item.quantity) * ((100 - (item.discount ?? 0)) / 100)).toFixed(2)
  }
}
export interface ItemTable{
  itemId:number;
  name:string;
  price:number;
  quantity:number;
  discount:number;

}
