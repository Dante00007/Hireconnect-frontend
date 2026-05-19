import {
  Component,
  inject,
  Input,
  Output,
  EventEmitter,
  signal
} from '@angular/core';

import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { JobService } from '../../../../core/services/job.service';
import { JobRequest, JobResponse } from '../../../../core/models/job.model';


@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})
export class JobFormComponent {

  private fb = inject(FormBuilder);

  private jobService = inject(JobService);
  loading = signal(false);
  error = signal<string | null>(null);

  @Input()
  isEditMode = false;

  @Input()
  job: JobResponse | null = null;

  @Output()
  jobSaved = new EventEmitter<void>();

  skillInput = '';

  skills: string[] = [];

  jobForm = this.fb.group({

    title: ['', Validators.required],

    category: ['', Validators.required],

    type: ['', Validators.required],

    location: ['', Validators.required],

    salaryMin: [0],

    salaryMax: [0],

    description: ['', Validators.required],

    experienceRequired: [0]

  });

  ngOnInit() {

    if (this.isEditMode && this.job) {

      this.skills = [...this.job.skills];

      this.jobForm.patchValue({

        title: this.job.title,

        category: this.job.category,

        type: this.job.type,

        location: this.job.location,

        salaryMin: this.job.salaryMin,

        salaryMax: this.job.salaryMax,

        description: this.job.description,

        experienceRequired:
          this.job.experienceRequired

      });

    }

  }

  addSkill() {

    const value =
      this.skillInput.trim();

    if (!value) return;

    if (this.skills.includes(value)) {

      this.skillInput = '';

      return;
    }

    this.skills.push(value);

    this.skillInput = '';
  }

  removeSkill(skill: string) {

    this.skills =
      this.skills.filter(
        s => s !== skill
      );

  }

  submit() {

    if (this.jobForm.invalid) return;

    const payload: JobRequest = {

      ...this.jobForm.value,

      skills: this.skills

    } as JobRequest;

    const request = this.isEditMode

      ? this.jobService.updateJob(
        this.job!.jobId!,
        payload
      )

      : this.jobService.createJob(payload);

    this.loading.set(true);

    request.subscribe({

      next: () => {

        this.jobSaved.emit()
        this.loading.set(false);

      },

      error: err => {

        this.error.set(err.error?.message || 'Failed to save job.');

        this.loading.set(false);
      }

    });

  }

}