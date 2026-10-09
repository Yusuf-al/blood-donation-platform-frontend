import { IUser } from "./donor.types";

export interface IRequester {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  imageUrl: string;
}

export interface IBloodRequest {
  id: string;
  bloodGroup: string;
  requiredUnits: number;
  hospitalName: string;
  hospitalLocation: string;
  contactPhone: string;
  urgency: string;
  requiredAt: string;
  description: string;
  status: BloodRequestStatus;
  verifiedAt: string | null;
  fulfilledAt: string | null;
  isFeatured: boolean;
  requester: IRequester;
  assignments: BloodDonationAssignment[];
}

export type BloodRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "MATCHING"
  | "DONOR_ASSIGNED"
  | "FULFILLED"
  | "CANCELLED";

// export interface BloodRequest {
//   id: string;
//   bloodGroup: string;
//   contactPhone: string;
//   hospitalLocation: string;
//   hospitalName: string;
//   createdAt: Date;
//   urgency: string;
//   status: string;
//   requiredUnits: number;
//   description: string | null;

//   requester: {
//     id: string;
//     name: string;
//     email: string;
//     phone: string | null;
//     imageUrl: string | null;
//   };

//   assignments: BloodDonationAssignment[];
// }

export interface BloodDonationAssignment {
  id: string;
  status: string;
  assignedAt: Date;
  respondedAt: Date | null;

  donorProfile: {
    bloodGroup: string;
    city: string;
    address: string | null;
  };

  donor: IUser;
}
