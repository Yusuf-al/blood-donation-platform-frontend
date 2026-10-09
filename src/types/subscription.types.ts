export interface ISubscriptionUser {
  name: string;
  email: string;
  phone: string | null;
  imageUrl: string | null;
}

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
  user: ISubscriptionUser;
  payments: ISubscriptionPayment;
}
