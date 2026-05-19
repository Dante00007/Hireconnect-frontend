export interface JobRequest {

  title: string;

  category: string;

  type: string;

  location: string;

  salaryMin: number;

  salaryMax: number;

  description: string;

  skills: string[];

  experienceRequired: number;

}
export interface JobResponse {

  jobId: number;

  title: string;

  category: string;

  type: string;

  location: string;

  salaryMin: number;

  salaryMax: number;

  description: string;

  skills: string[];

  experienceRequired: number;

  postedBy: number;
  
  postedByName: string;

  createdAt: string;

}