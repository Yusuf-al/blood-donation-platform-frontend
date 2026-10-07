export interface Requester {
  id: string;
  name: string;
  email: string;
  phone: string;
}

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
  requester: Requester;
}

export interface BloodDonationAssignment {
  id: string;
  requestId: string;
  donorId: string;
  status: "DONOR_ASSIGNED" | "ACCEPTED" | "REJECTED" | "COMPLETED";
  assignedAt: string; // ISO 8601 date string
  respondedAt: string; // ISO 8601 date string
  donorProfileId: string;
  request: RequestDetails;
}
