import { IUser } from "./donor.types";

export interface IPaymentsQuery {
  provider?: string;
  paymentMethod?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: "name" | "paidAt";
  sortOrder?: "asc" | "desc";
}

export interface IPayment {
  paidAt: string | null;
  amount: number;
  provider: string;
  status: string;
  paymentMethod: string;
  transactionId: string | null;
  user: IUser;
}
