import { IUser } from "./donor.types";

export interface ISubscriptionPayment {
  paidAt: string | null;
  amount: number;
  paymentMethod: string;
  provider: string;
}

export interface ISubscription {
  startedAt: string;
  expiresAt: string;
  status: string;
  user: IUser;
  payments: ISubscriptionPayment;
}
