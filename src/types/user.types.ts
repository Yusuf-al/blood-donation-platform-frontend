export interface BloodRequest {
  id: string;
  requesterId: string;
  bloodGroup: string;
  requiredUnits: number;
  hospitalName: string;
  hospitalLocation: string;
  contactPhone: string;
  urgency: "CRITICAL" | "NORMAL" | "URGENT";
  requiredAt: string; // ISO 8601 date string
  description: string | null;
  status: string;
  verifiedAt: string | null; // ISO 8601 date string
  fulfilledAt: string | null; // ISO 8601 date string
  deletedAt: string | null;
  isFeatured: boolean;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  requester?: User; // Optional, present in nested assignments
}

export interface BloodDonationAssignment {
  id: string;
  requestId: string;
  donorId: string;
  status: "ACCEPTED" | "COMPLETED" | "CREATED" | "REJECTED";
  assignedAt: string; // ISO 8601 date string
  respondedAt: string; // ISO 8601 date string
  donorProfileId: string;
  request: BloodRequest;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}

export interface DonorProfile {
  id: string;
  userId: string;
  bloodGroup: string;
  dateOfBirth: string; // ISO 8601 date string
  city: string;
  address: string;
  lastDonationDate: string | null;
  availabilityStatus: string;
  eligibilityVerified: boolean;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  assignments: BloodDonationAssignment[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash?: string; // Optional (found in nested requester objects)
  googleId: string | null;
  authProvider: string;
  phone: string;
  role: string;
  status: string;
  isPremiumUser: boolean;
  imageUrl: string;
  imagePublicId: string;
  isVerified: boolean;
  isDeleted: boolean;
  createdAt: string; // ISO 8601 date string
  updatedAt?: string; // Optional (found in nested requester objects)
  deletedAt: string | null;
  requests: BloodRequest[];
  assignments: BloodDonationAssignment[];
  donorProfile: DonorProfile;
}
