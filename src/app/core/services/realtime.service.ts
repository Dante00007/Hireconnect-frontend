import {
    Injectable,
    inject
} from '@angular/core';

import * as signalR
    from '@microsoft/signalr';


import {
    AuthService
} from '../services/auth.service';
import { NotificationService } from './notification.service';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RealtimeService {
    private readonly HUB_URL =
        environment.notificationHubUrl;

    private notificationService =
        inject(NotificationService);

    private authService =
        inject(AuthService);

    private hubConnection?:
        signalR.HubConnection;

    startConnection() {

        const user =
            this.authService.currentUser();

        if (!user) return;

        this.hubConnection =
            new signalR.HubConnectionBuilder()

                .withUrl(
                    `${this.HUB_URL}?userId=${user.userId}`
                )

                .withAutomaticReconnect()

                .build();

        this.hubConnection
            .start()
            .then(() => {

                console.log(
                    'SignalR Connected'
                );

            })
            .catch(error => {

                console.error(error);

            });

        this.hubConnection.on(

            'ReceiveNotification',

            notification => {

                this.notificationService
                    .notifications
                    .update(notifications => [

                        notification,

                        ...notifications

                    ]);

            }

        );

    }

}