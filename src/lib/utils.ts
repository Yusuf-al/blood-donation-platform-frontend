export { cn } from "cn";

export function formatAmount(amount: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(amount);
}

export const calculateRemainingDays = (
  startedAt: string,
  expiresAt: string,
): number => {
  const today = new Date();
  const startDate = new Date(startedAt);
  const expiryDate = new Date(expiresAt);

  // Subscription has not started yet
  if (today < startDate) {
    return Math.ceil(
      (expiryDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );
  }

  // Subscription has expired
  if (today >= expiryDate) {
    return 0;
  }

  // Calculate remaining days
  return Math.ceil(
    (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
};
