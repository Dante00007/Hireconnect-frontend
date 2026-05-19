import {
  Component,
  inject,
  signal
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import {
  ActivatedRoute,
  Router
} from '@angular/router';


import { JobFormComponent }
from '../../components/job-form/job-form.component';
import { JobService } from '../../../../core/services/job.service';
import { JobResponse } from '../../../../core/models/job.model';



@Component({
  selector: 'app-edit-job-page',
  standalone: true,
  imports: [
    CommonModule,
    JobFormComponent
  ],
  templateUrl:
    './edit-job-page.component.html',

  styleUrls:
    ['./edit-job-page.component.css']
})
export class EditJobPageComponent {

  private route =
    inject(ActivatedRoute);

  private router =
    inject(Router);

  private jobService =
    inject(JobService);

  loading = signal(false);
  error = signal<string | null>(null);

  job =
    signal<JobResponse | null>(null);

  ngOnInit() {

    const id =
      Number(
        this.route.snapshot.paramMap.get('id')
      );

    if(!id) return;
    this.loading.set(true);

    this.jobService
      .getJobById(id)
      .subscribe({

        next: job => {

          this.job.set(job);

          this.loading.set(false);

        },

        error: err => {

          this.error.set(err.error?.message || 'Failed to load job.');

          this.loading.set(false);

        }

      });

  }

  onJobSaved() {

    this.router.navigate([
      '/recruiter/jobs'
    ]);

  }

}