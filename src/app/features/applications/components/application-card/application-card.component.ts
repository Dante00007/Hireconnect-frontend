import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';



import {
  StatusBadgeComponent
} from '../status-badge/status-badge.component';
import { ApplicationResponse } from '../../../../core/models/application.model';

@Component({
  selector: 'app-application-card',
  standalone: true,
  imports: [
    CommonModule,
    StatusBadgeComponent
  ],
  templateUrl:
    './application-card.component.html',

  styleUrls:
    ['./application-card.component.css']
})
export class ApplicationCardComponent {

  @Input()
  application!: ApplicationResponse;

  @Output()
  withdraw =
    new EventEmitter<number>();

}