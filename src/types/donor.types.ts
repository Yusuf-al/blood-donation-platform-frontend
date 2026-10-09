export interface IDonorFormData {
  bloodGroup: string;
  dateOfBirth: string;
  city: string;
  address?: string;
  lastDonationDate?: string | null;
}

export interface Donor {
  id: string;
  name: string;
  profileImage?: string | null;
  bloodGroup: string;
  city: string;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  lastDonationDate?: string | null;
  donationCount: number;
  availabilityStatus: "AVAILABLE" | "UNAVAILABLE";
}

export interface IDonorQuery {
  searchTerm?: string;
  city?: string;
  bloodGroup?: string;
  availabilityStatus?: string;
  eligibilityVerified?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface IRequestQuery {
  urgency?: string;
  bloodGroup?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface IUsersQuery {
  searchTerm?: string;
  role?: string;
  status?: string;
  isPremiumUser?: boolean;
  isVerified?: boolean;
  page?: number;
  limit?: number;
  sortBy?: "name" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
}

export interface IDonorProfile {
  id: string;
  bloodGroup: string;
  dateOfBirth: string;
  city: string;
  address: string;
  lastDonationDate: string | null;
  availabilityStatus: string;
  eligibilityVerified: boolean;
  user: IUser;
  assignments: unknown[];
}
