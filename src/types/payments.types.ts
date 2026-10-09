export interface IPaymentsQuery {
  provider?: string;
  paymentMethod?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: "name" | "paidAt";
  sortOrder?: "asc" | "desc";
}
