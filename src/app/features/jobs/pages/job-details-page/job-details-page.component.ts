import {
  Component,
  inject,
  signal
} from '@angular/core';

import { CommonModule }
  from '@angular/common';

import {
  ActivatedRoute
} from '@angular/router';
import { JobService } from '../../../../core/services/job.service';
import { JobResponse } from '../../../../core/models/job.model';
import { ApplyJobModalComponent } from '../../../applications/components/apply-job-modal/apply-job-modal.component';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state.component';



@Component({
  selector: 'app-job-details-page',
  standalone: true,
  imports: [CommonModule, ApplyJobModalComponent, ErrorStateComponent],
  templateUrl:
    './job-details-page.component.html',

  styleUrl: './job-details-page.component.css'
})
export class JobDetailsPageComponent {

  private route =
    inject(ActivatedRoute);

  private jobService =
    inject(JobService);

  showApplyModal =
    signal(false);

  loading = signal(false);

  error =
    signal<string | null>(null);

  job =
    signal<JobResponse | null>(null);

  ngOnInit() {

    this.loadJob();

  }
  loadJob() {
    const id =
      Number(
        this.route.snapshot.paramMap.get('id')
      );

    if (!id) return;
    this.loading.set(true);

    this.jobService
      .getJobById(id)
      .subscribe({

        next: job => {

          this.job.set(job);

          this.loading.set(false);

        },

        error: err => {

          this.error.set(
            err.error?.message || 'Failed to load job.'
          );

          this.loading.set(false);

        }

      });
  }
  openApplyModal() {

    this.showApplyModal.set(true);

  }

  closeApplyModal() {

    this.showApplyModal.set(false);

  }

  onApplicationSubmitted() {

    this.showApplyModal.set(false);

    alert(
      'Application submitted successfully!'
    );

  }

}