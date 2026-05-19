import {
  Component,
  inject,
  Input,
  Output,
  EventEmitter,
  computed,
  signal
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { InterviewService } from '../../../../core/services/interview.service';


@Component({
  selector:
    'app-schedule-interview-modal',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl:
    './schedule-interview-modal.component.html',

  styleUrls:
    ['./schedule-interview-modal.component.css']
})
export class ScheduleInterviewModalComponent {

  private fb =
    inject(FormBuilder);

  private interviewService =
    inject(InterviewService);

  @Input()
  applicationId!: number;

  @Input()
  candidateName = '';

  @Output()
  closed =
    new EventEmitter<void>();

  @Output()
  scheduled =
    new EventEmitter<void>();

  loading = signal(false);
  error = signal<string | null>(null);

  interviewModes = [
    'Online',
    'In-Person'
  ];

  interviewForm =
    this.fb.group({

      scheduledAt: [
        '',
        Validators.required
      ],

      interviewMode: [
        'Online',
        Validators.required
      ],

      meetLink: [''],

      location: [''],

      durationMinutes: [
        60,
        Validators.required
      ],

      notes: ['']

    });

  get isOnline(): boolean {

    return this.interviewForm
      .get('interviewMode')
      ?.value === 'Online';

  }

  close() {

    this.closed.emit();

  }

  submit() {

    if (
      this.interviewForm.invalid
    ) {
      return;
    }

    const formValue =
      this.interviewForm.value;

    // Validation
    if (
      formValue.interviewMode ===
      'Online'
      &&
      !formValue.meetLink
    ) {
      alert(
        'Meet link required'
      );
      return;
    }

    if (
      formValue.interviewMode ===
      'In-Person'
      &&
      !formValue.location
    ) {
      alert(
        'Location required'
      );
      return;
    }

    this.loading.set(true);

    this.interviewService
      .scheduleInterview({

        applicationId:
          this.applicationId,

        scheduledAt:
          formValue.scheduledAt!,

        interviewMode:
          formValue.interviewMode!,

        meetLink:
          formValue.meetLink || '',

        location:
          formValue.location || '',

        notes:
          formValue.notes || '',

        durationMinutes:
          formValue.durationMinutes!

      })
      .subscribe({

        next: () => {

          this.loading.set(false);

          this.scheduled.emit();

        },

        error: err => {

          this.error.set(err.error?.message || "")

          this.loading.set(false);

        }

      });

  }

}