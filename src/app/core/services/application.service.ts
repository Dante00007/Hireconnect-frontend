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
import { ApplicationRequest, ApplicationResponse } from '../models/application.model';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private http =
    inject(HttpClient);

  private readonly API_URL = `${environment.apiUrl}/api/applications`;

  applications =
    signal<ApplicationResponse[]>([]);

  loading =
    signal(false);

  // =========================
  // SUBMIT APPLICATION
  // =========================

  submitApplication(
    payload: ApplicationRequest
  ) {

    return this.http.post(
      `${this.API_URL}/submit`,
      payload
    );

  }

  // =========================
  // CANDIDATE APPLICATIONS
  // =========================

  getMyApplications() {


    return this.http
      .get<ApplicationResponse[]>(
        `${this.API_URL}/candidate`
      )
      .pipe(

        tap(applications => {

          this.applications.set(
            applications
          );

        })

      );
  }

  // =========================
  // APPLICATIONS BY JOB
  // =========================

  getApplicationsByJob(
    jobId: number
  ) {

    return this.http.get<
      ApplicationResponse[]
    >(
      `${this.API_URL}/job/${jobId}`
    );

  }
  
  // =========================
  // UPDATE STATUS
  // =========================

  updateStatus(
    applicationId: number,
    status: string
  ) : Observable<ApplicationResponse> {

    return this.http.put<ApplicationResponse>(

      `${this.API_URL}/${applicationId}/status`,

      {},

      {
        params: { status }
      }

    );

  }

  // =========================
  // WITHDRAW
  // =========================

  withdrawApplication(
    applicationId: number
  ) {

    return this.http.delete(
      `${this.API_URL}/${applicationId}`
    );

  }

  // =========================
  // GET BY ID
  // =========================

  getApplicationById(
    id: number
  ) {

    return this.http.get<
      ApplicationResponse
    >(
      `${this.API_URL}/${id}`
    );

  }

}