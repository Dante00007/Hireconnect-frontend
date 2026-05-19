import {
    Component,
    Input
} from '@angular/core';

@Component({
    selector: 'app-feature-card',

    standalone: true,

    templateUrl:
        './feature-card.component.html',

    styleUrls:
        ['./feature-card.component.css']
})
export class FeatureCardComponent {

    @Input()
    icon = '';

    @Input()
    title = '';

    @Input()
    description = '';

}