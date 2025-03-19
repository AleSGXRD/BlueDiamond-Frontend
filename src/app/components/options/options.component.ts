import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../buttons/button/button.component';

@Component({
  selector: 'options',
  imports: [ButtonComponent],
  templateUrl: './options.component.html',
  styleUrl: './options.component.css'
})
export class OptionsComponent {
  @Input()
  addElementDescription! : string;

  @Output() addElementEmitter = new EventEmitter<any>();
}
