import {
  Component,
  inject,
  signal
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { RouterModule }
from '@angular/router';



import { JobCardComponent }
from '../../components/job-card/job-card.component';
import { JobService } from '../../../../core/services/job.service';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state.component';
import { PageLoaderComponent } from '../../../../shared/components/page-loader/page-loader.component';

@Component({
  selector: 'app-recruiter-jobs-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    JobCardComponent,
    ErrorStateComponent,
    PageLoaderComponent
  ],
  templateUrl:
    './recruiter-job-page.component.html',

  styleUrl:
    './recruiter-job-page.component.css'
})
export class RecruiterJobsPageComponent {

  private jobService =
    inject(JobService);

  jobs =
    this.jobService.recruiterJobs;

  loading = signal(false);


  error =
    signal<string | null>(
      null
    );

  ngOnInit() {

    this.loadJobs();

  }

  loadJobs() {
    this.loading.set(true);

    this.error.set(null);

    this.jobService
      .getRecruiterJobs()
      .subscribe({

        next: jobs => {

          this.jobs.set(jobs);

          this.loading.set(false);

        },

        error: (err) => {

          this.loading.set(false);

          this.error.set(err.error?.message ||
            'Failed to load jobs.'
          );

        }

      });
  }

  deleteJob(id?: number) {

    if(!id) return;

    const confirmed =
      confirm(
        'Delete this job posting?'
      );

    if(!confirmed) return;

    this.loading.set(true);

    this.jobService
      .deleteJob(id)
      .subscribe({

        next: () => {

          this.jobService
            .getRecruiterJobs()
            .subscribe();
          this.loading.set(false);

        },
        error: (err) => {
          this.error.set(err.error?.message ||
            'Failed to delete jobs.'
          );
          this.loading.set(false);
        }

      });

  }

}