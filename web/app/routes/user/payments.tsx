import { CreditCard } from "lucide-react";

export function meta() {
  return [{ title: "Payments — MiniBooking" }];
}

export default function UserPayments() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Payments</h2>
        <p className="text-muted-foreground">
          View your payment history and transactions.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
        <CreditCard className="mb-4 size-10 text-muted-foreground/50" />
        <p className="text-sm font-medium text-muted-foreground">
          No payment records yet
        </p>
      </div>
    </div>
  );
}
