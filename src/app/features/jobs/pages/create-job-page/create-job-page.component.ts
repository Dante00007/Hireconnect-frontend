import {
  Component,
  inject
} from '@angular/core';

import { Router }
from '@angular/router';

import { JobFormComponent }
from '../../components/job-form/job-form.component';

@Component({
  selector: 'app-create-job-page',
  standalone: true,
  imports: [
    JobFormComponent
  ],
  templateUrl:
    './create-job-page.component.html',

  styleUrls:
    ['./create-job-page.component.css']
})
export class CreateJobPageComponent {

  private router =
    inject(Router);

  onJobSaved() {

    this.router.navigate([
      '/recruiter/jobs'
    ]);

  }

}