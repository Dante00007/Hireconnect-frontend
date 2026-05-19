import {
  Injectable,
  inject,
  signal
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable,
  tap
} from 'rxjs';
import { InterviewRequest, InterviewResponse, RescheduleInterviewRequest } from '../models/interview.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  private http =
    inject(HttpClient);

  private readonly API_URL = `${environment.apiUrl}/api/interviews`;

  interviews =
    signal<InterviewResponse[]>([]);

  

  

  scheduleInterview(
    payload: InterviewRequest
  ) {

    return this.http.post<
      InterviewResponse
    >(
      this.API_URL,
      payload
    );

  }



  getRecruiterInterviews() {

    return this.http.get<
      InterviewResponse[]
    >(
      `${this.API_URL}/recruiter`
    )
    .pipe(

      tap(interviews => {

        this.interviews.set(
          interviews
        );

      })

    );

  }


  getCandidateInterviews() {


    return this.http.get<
      InterviewResponse[]
    >(
      `${this.API_URL}/candidate`
    )
    .pipe(

      tap(interviews => {

        this.interviews.set(
          interviews
        );


      })

    );

  }

 

  confirmInterview(
    interviewId: number
  ): Observable<InterviewResponse> {

    return this.http.put<InterviewResponse>(

      `${this.API_URL}/${interviewId}/confirm`,

      {}

    );

  }

 

  rescheduleInterview(

    interviewId: number,

    payload:
      RescheduleInterviewRequest

  ) {

    return this.http.put<
      InterviewResponse
    >(

      `${this.API_URL}/${interviewId}/reschedule`,

      payload

    );

  }



  cancelInterview(
    interviewId: number
  ): Observable<InterviewResponse> {

    return this.http.delete<InterviewResponse>(

      `${this.API_URL}/${interviewId}/cancel`

    );

  }

}