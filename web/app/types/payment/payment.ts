export const PaymentStatus = {
  Pending: 1,
  Succeeded: 2,
  Failed: 3,
  Expired: 4,
  Cancelled: 5,
} as const;

export type PaymentStatusValue =
  (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const PAYMENT_STATUS_LABEL: Record<PaymentStatusValue, string> = {
  [PaymentStatus.Pending]: "Pending",
  [PaymentStatus.Succeeded]: "Succeeded",
  [PaymentStatus.Failed]: "Failed",
  [PaymentStatus.Expired]: "Expired",
  [PaymentStatus.Cancelled]: "Cancelled",
};

export interface CreatePaymentResponse {
  paymentTransactionId: string;
  providerOrderCode: string;
  amount: number;
  currency: string;
  qrCodeUrl: string;
  expiredAt: string;
}

export interface PaymentStatusResponse {
  paymentTransactionId: string;
  status: PaymentStatusValue;
  statusName: string;
  paidAt: string | null;
  expiredAt: string | null;
  failureReason: string | null;
}
