import {
  Component,
  Input
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';
import { RecentApplication } from '../../../../core/models/recruiter-analytic.model';



@Component({
  selector:
    'app-recent-application-card',

  standalone: true,

  imports: [CommonModule],

  templateUrl:
    './recent-application-card.component.html',

  styleUrls:
    ['./recent-application-card.component.css']
})
export class RecentApplicationCardComponent {

  @Input()
  application!: RecentApplication;

}