import { Component, inject, OnInit, signal } from '@angular/core';

import { AuthService } from '../../../../core/services/auth.service';

import { CandidateProfileFormComponent }
  from '../../../candidate/components/candidate-profile-form/candidate-profile-form.component';

import { RecruiterProfileFormComponent }
  from '../../../recruiter/components/recruiter-profile-form/recruiter-profile-form.component';
import { ProfileService } from '../../../../core/services/profile.service';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CandidateProfileFormComponent,
    RecruiterProfileFormComponent,
    ErrorStateComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {

  authService = inject(AuthService);
  profileService = inject(ProfileService);

  profile = this.profileService.profile;
  loading = signal(false);
  error = signal<string | null>(null);

  isEditing = signal(false);

  ngOnInit() {
    this.loadProfile();
  }
  loadProfile() {
    this.loading.set(true);
    this.profileService
      .getProfile()
      .subscribe({
        next: () => {
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(err.message?.message || 'Failed to load profile.');
          this.loading.set(false);
        }
      });
  }
  openEdit() {
    this.isEditing.set(true);
  }

  closeEdit() {
    this.isEditing.set(false);
  }

  onProfileSaved() {
    this.loading.set(true);
    this.profileService
      .getProfile()
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.closeEdit();
        },
        error: (err) => {
          this.error.set(err.message?.message || 'Failed to load profile.');
          this.loading.set(false);
        }
      });
  }

}