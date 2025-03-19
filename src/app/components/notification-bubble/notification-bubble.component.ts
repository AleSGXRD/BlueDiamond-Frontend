import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification-bubble',
  imports:[CommonModule],
  templateUrl: './notification-bubble.component.html',
  styleUrl: './notification-bubble.component.css'
})
export class NotificationBubbleComponent {
  @Input()
  notification : Notification = {
    message :  "Ha ocurrido un error al entrar los datos",
    type : NotificationType.WARNING
  }

}

export interface Notification{
  message :string,
  type : NotificationType,
  repeat? : number
}

export enum NotificationType{
  SUCCESS = 0,
  WARNING = 1
}
