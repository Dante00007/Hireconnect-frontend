import {
  Injectable,
  inject,
  signal
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  tap
} from 'rxjs';
import { RecruiterAnalytics } from '../models/recruiter-analytic.model';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AnalyticService {

  private http =
    inject(HttpClient);

  private readonly API_URL = `${environment.apiUrl}/api/analytics`;

  dashboard =
    signal<RecruiterAnalytics | null>(
      null
    );

  getRecruiterDashboard() {


    return this.http.get<
      RecruiterAnalytics
    >(
      `${this.API_URL}/recruiter`
    )
      .pipe(

        tap(data => {

          this.dashboard.set(data);

        })

      );

  }

}