import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';
import { Notification } from '../../../../core/models/notification.model';



@Component({
  selector:
    'app-notification-item',

  standalone: true,

  imports: [CommonModule],

  templateUrl:
    './notification-item.component.html',

  styleUrls:
    ['./notification-item.component.css']
})
export class NotificationItemComponent {

  @Input()
  notification!: Notification;

  @Output()
  read =
    new EventEmitter<number>();

}