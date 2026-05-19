export interface InterviewRequest {

  applicationId: number;

  scheduledAt: string;

  interviewMode: string;

  meetLink?: string;

  location?: string;

  notes?: string;

  durationMinutes: number;

}

export interface RescheduleInterviewRequest {

  newDateTime: string;

  meetLink?: string;

  location?: string;

  notes?: string;

}

export interface InterviewResponse {

  interviewId: number;

  applicationId: number;

  candidateId: number;

  recruiterId: number;

  candidateName: string;

  jobTitle: string;

  scheduledAt: string;

  interviewMode: string;

  meetLink?: string;

  location?: string;

  notes?: string;

  status: string;

  durationMinutes: number;

}