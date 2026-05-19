import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';


import {
  StatusBadgeComponent
} from '../status-badge/status-badge.component';
import { ApplicationResponse } from '../../../../core/models/application.model';
import { ScheduleInterviewModalComponent } from '../../../interviews/components/schedule-interview-modal/schedule-interview-modal.component';

@Component({
  selector: 'app-applicant-card',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    StatusBadgeComponent,
    ScheduleInterviewModalComponent
  ],
  templateUrl:
    './applicant-card.component.html',

  styleUrls:
    ['./applicant-card.component.css']
})
export class ApplicantCardComponent {

  @Input()
  application!: ApplicationResponse;

  @Output()
  statusChanged =
    new EventEmitter<{
      applicationId: number;
      status: string;
    }>();

  showInterviewModal = signal(false);

  statuses = [
    'Applied',
    'Interview',
    'Accepted',
    'Rejected'
  ];

  selectedStatus = '';

  ngOnInit() {

    this.selectedStatus =
      this.application.status;

  }

  updateStatus() {

    this.statusChanged.emit({

      applicationId:
        this.application.applicationId,

      status:
        this.selectedStatus

    });

  }
  openInterviewModal() {

    this.showInterviewModal.set(true);

  }

  closeInterviewModal() {

    this.showInterviewModal.set(false);

  }

  onInterviewScheduled() {

    this.showInterviewModal.set(false);

    alert(
      'Interview scheduled successfully!'
    );

  }

}