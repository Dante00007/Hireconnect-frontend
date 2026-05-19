import {
  Component,
  inject,
  signal
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  NotificationItemComponent
} from '../notification-item/notification-item.component';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector:
    'app-notification-bell',

  standalone: true,

  imports: [
    CommonModule,
    NotificationItemComponent
  ],

  templateUrl:
    './notification-bell.component.html',

  styleUrls:
    ['./notification-bell.component.css']
})
export class NotificationBellComponent {

  private notificationService =
    inject(NotificationService);

  notifications =
    this.notificationService
      .notifications;

  unreadCount =
    this.notificationService
      .unreadCount;

  dropdownOpen =
    signal(false);

  ngOnInit() {

    this.notificationService
      .getNotifications()
      .subscribe();

  }

  toggleDropdown() {

    this.dropdownOpen.update(
      value => !value
    );

  }

  markAsRead(
    notificationId: number
  ) {

    this.notificationService
      .markAsRead(notificationId)
      .subscribe();

  }

}