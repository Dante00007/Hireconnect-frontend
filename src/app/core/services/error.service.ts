import {
    Injectable,
    signal
} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    error =
        signal<string | null>(null);

    showError(
        message: string
    ) {

        this.error.set(message);

        setTimeout(() => {

            this.clearError();

        }, 4000);

    }

    clearError() {

        this.error.set(null);

    }

}