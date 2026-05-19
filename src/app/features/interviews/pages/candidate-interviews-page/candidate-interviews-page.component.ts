import {
  Component,
  inject,
  signal
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';


import {
  InterviewCardComponent
} from '../../components/interview-card/interview-card.component';
import { InterviewService } from '../../../../core/services/interview.service';
import { PageLoaderComponent } from '../../../../shared/components/page-loader/page-loader.component';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state.component';

@Component({
  selector:
    'app-candidate-interviews-page',

  standalone: true,

  imports: [
    CommonModule,
    InterviewCardComponent,
    PageLoaderComponent,
    ErrorStateComponent
  ],

  templateUrl:
    './candidate-interviews-page.component.html',

  styleUrl:
    './candidate-interviews-page.component.css'
})
export class CandidateInterviewsPageComponent {

  private interviewService =
    inject(InterviewService);

  interviews =
    this.interviewService
      .interviews;

  loading = signal(false);

  error = signal<string | null>(null);  

  ngOnInit() {

    this.loadInterviews();

  }

  loadInterviews() {

    this.loading.set(true);

    this.interviewService
      .getCandidateInterviews()
      .subscribe({

        next: () => {

          this.loading.set(false);

        },

        error: (err) => {

          this.error.set(err.error?.message || 'Failed to load interviews.');
          this.loading.set(false);
        }

      });

  }

  confirmInterview(
    interviewId: number
  ) {
    this.loading.set(true);
    this.interviewService
      .confirmInterview(interviewId)
      .subscribe({

        next: () => {

          this.interviews.update(
            interviews =>

              interviews.map(interview =>

                interview.interviewId ===
                  interviewId

                  ? {
                    ...interview,
                    status: 'Confirmed'
                  }

                  : interview

              )

          );
          this.loading.set(false);

        },
        error : (err) => {
          this.error.set(err.error?.message || 'Failed to confirm interview.'); 
          this.loading.set(false);
        }

      });

  }

}