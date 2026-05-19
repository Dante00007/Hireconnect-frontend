import {
    Component,
    inject
} from '@angular/core';

import {
    CommonModule
} from '@angular/common';

import {
    ErrorService
} from '../../../core/services/error.service';

@Component({
    selector: 'app-error-toast',

    standalone: true,

    imports: [CommonModule],

    templateUrl:
        './error-toast.component.html',

    styleUrls:
        ['./error-toast.component.css']
})
export class ErrorToastComponent {

    errorService =
        inject(ErrorService);

}