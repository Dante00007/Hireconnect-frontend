import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationBellComponent } from '../../../features/notifications/components/notification-bell/notification-bell.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule,NotificationBellComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  isDropdownOpen = signal(false); // Signal to toggle dropdown state

  toggleDropdown() {
    this.isDropdownOpen.update(val => !val);
  }
  onLogout() {
    this.authService.logout().subscribe(
      {
        next: () => {
          this.isDropdownOpen.set(false); 
          this.router.navigate(['/']);
        },
        error: () => {
          this.isDropdownOpen.set(false);
          console.error('Logout failed');
        },
      }
    );
  }
}