import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';

import { RecruiterProfileDTO, UserProfileDTO } from '../models/profile.model';
import { Form } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private http = inject(HttpClient);

  private readonly API_URL = `${environment.apiUrl}/api/profile`;
  profile = signal<UserProfileDTO | null>(null);


  getProfile() {

    return this.http
      .get<UserProfileDTO>(this.API_URL)
      .pipe(

        tap(profile => {

          this.profile.set(profile);


        }),

        catchError(error => {

          // Profile does not exist yet
          if (error.status === 404) {

            this.profile.set(null);

          }


          return of(null);

        })

      );
  }

  createCandidateProfile(formData: FormData) {

    return this.http.post(
      `${this.API_URL}/candidate`,
      formData
    );
  }
  updateCandidateProfile(formData: FormData) {
    return this.http.put(
      `${this.API_URL}/candidate`,
      formData
    );

  }

  createRecruiterProfile(data: FormData) {
    return this.http.post(
      `${this.API_URL}/recruiter`,
      data
    );
  }
  updateRecruiterProfile(data: FormData) {
    return this.http.put(
      `${this.API_URL}/recruiter`,
      data
    );
  }


}