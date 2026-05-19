import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { JobResponse } from '../../../../core/models/job.model';


@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent {

  @Input()
  showApplyButton = false;

  @Input()
  job!: JobResponse;

  @Input()
  showActions = false;

  @Output()
  delete = new EventEmitter<number>();

}