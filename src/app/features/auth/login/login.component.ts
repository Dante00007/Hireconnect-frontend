import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    private authService = inject(AuthService);
    private router = inject(Router);

    // Signal-based form state
    email = signal('');
    password = signal('');
    isLoading = signal(false);
    errorMessage = signal('');

    // Validation Signals
    isFormValid = computed(() =>
        this.email().includes('@') && this.password().length > 0
    );

    onSubmit() {
        if (!this.isFormValid()) return;

        this.isLoading.set(true);
        this.errorMessage.set('');

        const credentials = {
            email: this.email(),
            password: this.password()
        };

        this.authService.login(credentials).subscribe({
            next: (res) => {
                this.isLoading.set(false);
                // Navigate based on the role returned by your backend [cite: 15, 103]
                if (res.role === 'Recruiter') {
                    this.router.navigate(['/recruiter/dashboard']);
                } else {
                    this.router.navigate(['/candidate/jobs']);
                }
            },
            error: (err) => {
                this.isLoading.set(false);
                this.errorMessage.set(err.error?.message || 'Invalid credentials');
            }
        });
    }
}