import {
  Injectable,
  inject,
  signal,
  computed
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  tap
} from 'rxjs';

import {
  Notification
} from '../models/notification.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private http =
    inject(HttpClient);

  private readonly API_URL =
    `${environment.apiUrl}/api/notification`;

  notifications =
    signal<Notification[]>([]);

  loading =
    signal(false);

  unreadCount =
    computed(() =>

      this.notifications()
        .filter(n => !n.isRead)
        .length

    );

  getNotifications() {

    this.loading.set(true);

    return this.http.get<
      Notification[]
    >(this.API_URL)
    .pipe(

      tap(notifications => {

        this.notifications.set(
          notifications
        );

        this.loading.set(false);

      })

    );

  }

  markAsRead(
    notificationId: number
  ) {

    return this.http.put(

      `${this.API_URL}/${notificationId}/read`,

      {}

    )
    .pipe(

      tap(() => {

        this.notifications.update(
          notifications =>

            notifications.map(n =>

              n.notificationId ===
              notificationId

              ? {
                  ...n,
                  isRead: true
                }

              : n

            )

        );

      })

    );

  }

}