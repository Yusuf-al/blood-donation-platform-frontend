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
  assignments: unknown[];
}

export type BloodRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "MATCHING"
  | "DONOR_ASSIGNED"
  | "FULFILLED"
  | "CANCELLED";
