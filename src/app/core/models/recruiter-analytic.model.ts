export interface RecentApplication {

  applicationId: number;

  candidateName: string;

  jobTitle: string;

  status: string;

  appliedAt: string;

}
export interface RecruiterAnalytics {

  totalJobs: number;

  activeJobs: number;

  totalApplications: number;

  totalInterviews: number;

  acceptedCandidates: number;

  scheduledInterviews: number;

  applicationStatusBreakdown:
    Record<string, number>;

  recentApplications:
    RecentApplication[];

}