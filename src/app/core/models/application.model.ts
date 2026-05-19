export interface ApplicationRequest {

  jobId: number;

  coverLetter: string;

}

export interface ApplicationResponse {

  applicationId: number;

  jobId: number;

  candidateId: number;

  candidateName: string;

  jobTitle: string;

  recruiterName: string;

  appliedAt: string;

  status: string;

  coverLetter?: string;

  resumeUrl: string;

}