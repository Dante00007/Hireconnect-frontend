import {
  Component,
  inject,
  signal
} from '@angular/core';

import { CommonModule }
  from '@angular/common';

import {
  FormsModule
} from '@angular/forms';


import { JobCardComponent }
  from '../../components/job-card/job-card.component';
import { JobService } from '../../../../core/services/job.service';
import { PageLoaderComponent } from '../../../../shared/components/page-loader/page-loader.component';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state.component';

@Component({
  selector: 'app-candidate-jobs-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    JobCardComponent,
    PageLoaderComponent,
    ErrorStateComponent
  ],
  templateUrl:
    './candidate-jobs-page.component.html',

  styleUrl:
    './candidate-jobs-page.component.css'
})
export class CandidateJobsPageComponent {

  private jobService =
    inject(JobService);

  jobs =
    this.jobService.jobs;

  loading = signal(false);
  error = signal<string | null>(null);

  search = '';

  location = '';

  ngOnInit() {

    this.loadJobs();

  }

  loadJobs() {

    this.loading.set(true);

    this.jobService
      .getAllJobs()
      .subscribe({
        next: () => {
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(err.error?.message || 'Failed to load jobs.');
          this.loading.set(false);
        }
      });

  }

  searchJobs() {
    this.loading.set(true);
    this.jobService
      .searchJobs(
        this.search,
        this.location
      )
      .subscribe({

        next: jobs => {

          this.jobService.jobs.set(jobs);

          this.loading.set(false);

        },

        error: (err) => {

          this.error.set(err.error?.message || 'Failed to load jobs.');
          this.loading.set(false);
        }

      });

  }

}