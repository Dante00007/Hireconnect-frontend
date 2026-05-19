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

import {
  JobRequest,
  JobResponse
} from '../models/job.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private http = inject(HttpClient);

  private readonly API_URL = `${environment.apiUrl}/api/job`;

  jobs = signal<JobResponse[]>([]);

  recruiterJobs =
    signal<JobResponse[]>([]);



  createJob(job: JobRequest) {

    return this.http.post(
      this.API_URL,
      job
    );
  }



  getAllJobs() {

    

    return this.http
      .get<JobResponse[]>(this.API_URL)
      .pipe(

        tap(jobs => {

          this.jobs.set(jobs);


        })

      );
  }

  

  getJobById(id: number) {

    return this.http.get<JobResponse>(
      `${this.API_URL}/${id}`
    );
  }



  getRecruiterJobs() {

    return this.http
      .get<JobResponse[]>(
        `${this.API_URL}/myJobs`
      )
      .pipe(

        tap(jobs => {

          this.recruiterJobs.set(jobs);

        })

      );
  }


  updateJob(jobId: number, job: JobRequest) {

    return this.http.put(

      `${this.API_URL}/${jobId}`,

      job

    );

  }

  

  deleteJob(id: number) {

    return this.http.delete(
      `${this.API_URL}/${id}`
    );
  }



  searchJobs(
    title?: string,
    location?: string,
    minSalary?: number,
    maxSalary?: number
  ) {

    const params: any = {};

    if (title)
      params.title = title;

    if (location)
      params.location = location;

    if (minSalary)
      params.minSalary = minSalary;

    if (maxSalary)
      params.maxSalary = maxSalary;

    return this.http.get<JobResponse[]>(
      `${this.API_URL}/search`,
      { params }
    );
  }

}