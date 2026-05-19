import {
  Component,
  inject,
  signal
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';



import {
  ApplicationCardComponent
} from '../../components/application-card/application-card.component';
import { ApplicationService } from '../../../../core/services/application.service';
import { PageLoaderComponent } from '../../../../shared/components/page-loader/page-loader.component';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state.component';

@Component({
  selector: 'app-my-applications-page',
  standalone: true,
  imports: [
    CommonModule,
    ApplicationCardComponent,
    PageLoaderComponent,
    ErrorStateComponent
  ],
  templateUrl:
    './my-applications-page.component.html',

  styleUrls:
    ['./my-applications-page.component.css']
})
export class MyApplicationsPageComponent {

  private applicationService =
    inject(ApplicationService);

  applications =
    this.applicationService
      .applications;

  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit() {

    this.loadApplications();

  }

  loadApplications() {

    this.loading.set(true);

    this.applicationService
      .getMyApplications()
      .subscribe({
        next: () => {
          this.loading.set(false);
        },
        error: (error) => {
          this.error.set(error.error?.message || 'Failed to load applications.');
          this.loading.set(false);
        }
      });

  }

  withdraw(
    applicationId: number
  ) {

    const confirmed =
      confirm(
        'Withdraw application?'
      );

    if (!confirmed) return;
    this.loading.set(true);
    this.applicationService
      .withdrawApplication(
        applicationId
      )
      .subscribe({

        next: () => {

          this.loading.set(false);
          this.loadApplications();

        },

        error: err => {

          this.error.set(err.error?.message || 'Failed to withdraw application.');
          this.loading.set(false);

        }

      });

  }

}