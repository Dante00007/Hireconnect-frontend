import {
  Component,
  inject,
  signal
} from '@angular/core';

import { CommonModule }
  from '@angular/common';

import { RouterModule }
  from '@angular/router';

import { AuthService }
  from '../../../../core/services/auth.service';
import { ProfileService } from '../../../../core/services/profile.service';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state.component';
import { PageLoaderComponent } from '../../../../shared/components/page-loader/page-loader.component';

@Component({
  selector: 'app-recruiter-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ErrorStateComponent,
    PageLoaderComponent
  ],
  templateUrl:
    './recruiter-dashboard.component.html',

  styleUrls:
    ['./recruiter-dashboard.component.css']
})
export class RecruiterDashboardComponent {

  authService =
    inject(AuthService);
  profileService =
    inject(ProfileService);

  profile = this.profileService.profile;
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadProfile();
  }
  loadProfile() {
    this.loading.set(true);
    this.profileService.getProfile().subscribe({
      next: () => {
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message?.message || 'Failed to load profile.');
        this.loading.set(false);
      }
    });
  }
}