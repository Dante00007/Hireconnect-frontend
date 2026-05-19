export interface AddressDTO {
  houseNo: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CandidateProfileDTO {
  fullName: string;
  email: string;
  mobile: string;
  dob: string; // ISO string from DateTime
  skills: string; // Note: This is a string in your DTO, not an array
  experience: number;
  resumeUrl: string;
  address: AddressDTO;
}

export interface RecruiterProfileDTO {
  fullName: string;
  email: string;
  companyName: string;
  companySize: string;
  industry: string;
  website: string;
  address: AddressDTO;
}

export interface UserProfileDTO {
  profileId: number;
  userId: number;
  fullName: string;
  email: string;
  userType: string;
  mobile?: string;
  dob?: string;
  skills?: string;
  experience?: number;
  resumeUrl?: string;
  profileImageUrl?: string;
  
  // Recruiter specific
  companyLogoUrl?: string;
  companyName?: string;
  companySize?: string;
  industry?: string;
  website?: string;
  address?: AddressDTO;
}