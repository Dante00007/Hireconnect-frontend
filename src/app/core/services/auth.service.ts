import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse, LoginRequest, RegistrationRequest, User } from '../models/auth.model';
import { tap, catchError, of, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly API_URL = `${environment.apiUrl}/api/auth`;

  currentUser = signal<User | null>(null);
  accessToken = signal<string | null>(null);
  isAuthenticated = computed(() => !!this.currentUser());



  handleAuth(token: string) {
    this.accessToken.set(token);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }
  initializeAuth(): Observable<User | null> {
    // Only attempt to restore state if a token exists in the browser [cite: 116, 120]
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('token')) {
      return this.me().pipe(
        catchError(() => {
          this.logout();
          return of(null);
        })
      );
    }
    return of(null);
  }

  private me(): Observable<User | null> {
    return this.http.get<User>(`${this.API_URL}/me`).pipe(
      tap(user => {
        this.currentUser.set(user);
        this.accessToken.set(localStorage.getItem('token'));
      })
    );
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, request, { withCredentials: true }).pipe(
      tap(res => {
        this.handleAuth(res.token);
        this.currentUser.set({ userId: res.userId, email: res.email, role: res.role });
      }),
      catchError(error => {
        this.clearLocalState();
        return throwError(() => error);
      })
    );
  }

  register(request: RegistrationRequest): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.API_URL}/register`, request);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.clearLocalState();
      }),
    );
  }

  refreshToken() {
    return this.http.post<AuthResponse>(`${this.API_URL}/refresh`, {}, { withCredentials: true }).pipe(
      tap(res => this.handleAuth(res.token))
    );
  }

  private clearLocalState() {
    this.currentUser.set(null);
    this.accessToken.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }
}