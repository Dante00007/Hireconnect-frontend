import {
  Component,
  inject,
  Input,
  Output,
  EventEmitter,
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
import { ApplicationService } from '../../../../core/services/application.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-apply-job-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl:
    './apply-job-modal.component.html',

  styleUrl:
    './apply-job-modal.component.css'
})
export class ApplyJobModalComponent {

  private fb =
    inject(FormBuilder);

  private applicationService =
    inject(ApplicationService);
  
 

  @Input()
  jobId!: number;

  @Output()
  closed =
    new EventEmitter<void>();

  @Output()
  submitted =
    new EventEmitter<void>();
  

  loading = signal(false) ;
  error = signal<string | null>(null);

  applyForm =
    this.fb.group({

      coverLetter: [
        '',
        [
          Validators.required,
          Validators.minLength(20)
        ]
      ]

    });

  close() {

    this.closed.emit();

  }

  submit() {

    if(this.applyForm.invalid)
      return;

    this.loading.set(true);

    this.applicationService
      .submitApplication({

        jobId: this.jobId,

        coverLetter:
          this.applyForm.value
            .coverLetter!

      })
      .subscribe({

        next: () => {

          this.submitted.emit();
          this.loading.set(false);

        },

        error: err => {

          this.error.set(err.error?.message || 'Failed to submit application.');
          this.loading.set(false);

        }

      });

  }

}