import { IUser } from "./donor.types";
import { IBloodRequest } from "./newRequest.types";

export interface RequestDetails {
  id: string;
  requesterId: string;
  bloodGroup: string;
  requiredUnits: number;
  hospitalName: string;
  hospitalLocation: string;
  contactPhone: string;
  urgency: string;
  requiredAt: string; // ISO 8601 date string
  description: string;
  status: string;
  verifiedAt: string; // ISO 8601 date string
  fulfilledAt: string; // ISO 8601 date string
  deletedAt: string | null;
  isFeatured: boolean;
  requester: IUser;
}

export interface BloodDonationAssignment {
  id: string;
  requestId: string;
  donorId: string;
  status: "CREATED" | "ACCEPTED" | "REJECTED" | "COMPLETED";
  assignedAt: string; // ISO 8601 date string
  respondedAt: string; // ISO 8601 date string
  donorProfileId: string;
  request: RequestDetails;
}

export interface IAssignmentDonorProfile {
  bloodGroup: string;
  availabilityStatus: string;
}
export interface IAssignemnts {
  id: string;
  requestId: string;
  donorId: string;
  donorProfileId: string;
  status: string;
  assignedAt: string;
  respondedAt: string;
  request: RequestDetails;
  donor: IUser;
  donorProfile: IAssignmentDonorProfile;
}

export interface IDonationAssignment {
  id: string;
  assignedAt: string;
  respondedAt: string | null;
  request: {
    bloodGroup: string;
    createdAt: string;
    requester: {
      name: string;
      imageUrl: string;
    };
  };
  donor: {
    name: string;
    imageUrl: string;
  };
}

export interface IDonationHistory {
  donatedAt: string;
  status: string;
  notes: string | null;
  assignment: IDonationAssignment;
}
