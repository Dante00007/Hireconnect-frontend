import {
  Component,
  inject,
  signal
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ActivatedRoute
} from '@angular/router';

import {
  ApplicantCardComponent
} from '../../components/applicant-card/applicant-card.component';
import { ApplicationService } from '../../../../core/services/application.service';
import { ApplicationResponse } from '../../../../core/models/application.model';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state.component';


@Component({
  selector:
    'app-recruiter-applications-page',

  standalone: true,

  imports: [
    CommonModule,
    ApplicantCardComponent,
    ErrorStateComponent
  ],

  templateUrl:
    './recruiter-applications-page.component.html',

  styleUrls:
    ['./recruiter-applications-page.component.css']
})
export class RecruiterApplicationsPageComponent {

  private route =
    inject(ActivatedRoute);

  private applicationService =
    inject(ApplicationService);

  applications = this.applicationService.applications;

  loading =
    signal(false);
  
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {
   
    const jobId =
      Number(
        this.route.snapshot.paramMap.get('id')
      );

    if (!jobId) return;
    this.loading.set(true);
    this.applicationService
      .getApplicationsByJob(jobId)
      .subscribe({

        next: applications => {

          this.applications.set(
            applications
          );

          this.loading.set(false);

        },

        error: err => {

          this.error.set(err.error?.message || 'Failed to load applications.');

          this.loading.set(false);

        }

      });

  }

  updateStatus(event: {
    applicationId: number;
    status: string;
  }) {
    this.loading.set(true);
    this.applicationService
      .updateStatus(
        event.applicationId,
        event.status
      )
      .subscribe({

        next: (res) => {

          const updated =
            this.applications()
              .map(app => {

                if(app.applicationId === res.applicationId) {
                  return {
                    ...app,
                    status: event.status
                  };

                }

                return app;

              });

          this.applications.set(
            updated
          );
          this.loading.set(false);

        },
        error: err => {

          this.error.set(err.error?.message || 'Failed to update status.');
          this.loading.set(false);

        }

      });

  }

}