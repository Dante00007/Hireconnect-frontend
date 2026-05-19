export interface AuthResponse {
  token: string;
  email: string;
  userId: number;
  role: 'Candidate' | 'Recruiter' | 'Admin';
}

export interface RegistrationRequest {
  email: string;
  password: string;
  role: 'Candidate' | 'Recruiter';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  userId: number;
  email: string;
  role: string;
}