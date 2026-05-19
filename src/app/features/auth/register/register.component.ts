import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { RegistrationRequest } from '../../../core/models/auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Signal-based form state
  email = signal('');
  password = signal('');
  role = signal<'Candidate' | 'Recruiter'>('Candidate');
  isLoading = signal(false);

  // Computed signals for validation
  isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email()));
  isPasswordValid = computed(() => this.password().length >= 6);
  isFormValid = computed(() => this.isEmailValid() && this.isPasswordValid());

  onSubmit() {
    if (!this.isFormValid()) return;

    this.isLoading.set(true);
    const request: RegistrationRequest = {
      email: this.email(),
      password: this.password(),
      role: this.role()
    };

    this.authService.register(request).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/auth/login']);
      },
      error: () => this.isLoading.set(false)
    });
  }
}