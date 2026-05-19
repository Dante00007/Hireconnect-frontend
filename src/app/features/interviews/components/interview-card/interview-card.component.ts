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
  InterviewStatusBadgeComponent
} from '../interview-status-badge/interview-status-badge.component';
import { InterviewResponse } from '../../../../core/models/interview.model';

@Component({
  selector: 'app-interview-card',

  standalone: true,

  imports: [
    CommonModule,
    InterviewStatusBadgeComponent
  ],

  templateUrl:
    './interview-card.component.html',

  styleUrls:
    ['./interview-card.component.css']
})
export class InterviewCardComponent {

  @Input()
  interview!: InterviewResponse;

  @Input()
  role:
    'Candidate'|'Recruiter' = 'Candidate';

  @Output()
  confirm =
    new EventEmitter<number>();

  @Output()
  cancel =
    new EventEmitter<number>();

}