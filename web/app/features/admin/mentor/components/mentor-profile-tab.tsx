import { format } from "date-fns";
import type { MentorDetail } from "~/types/mentor/mentor";

interface MentorProfileTabProps {
  mentor: MentorDetail;
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
      <span className="w-36 shrink-0 text-xs font-medium text-muted-foreground">
        {label}
      </span>
      <span className="text-sm">{value ?? "—"}</span>
    </div>
  );
}

export function MentorProfileTab({ mentor }: MentorProfileTabProps) {
  return (
    <div className="space-y-6">
      {/* Basic info */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Basic Information</h3>
        <div className="space-y-2.5 rounded-lg border p-4">
          <InfoRow label="Display Name" value={mentor.displayName} />
          <InfoRow label="Email" value={mentor.email} />
          <InfoRow label="Specialization" value={mentor.specialization} />
          <InfoRow
            label="Experience"
            value={`${mentor.experienceYears} year${mentor.experienceYears !== 1 ? "s" : ""}`}
          />
          <InfoRow
            label="Base Price"
            value={new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
              maximumFractionDigits: 0,
            }).format(mentor.basePrice)}
          />
          <InfoRow
            label="Status"
            value={mentor.isActive ? "Active" : "Inactive"}
          />
          <InfoRow
            label="Member Since"
            value={format(new Date(mentor.createdAt), "dd MMMM yyyy")}
          />
        </div>
      </div>

      {/* Bio */}
      {mentor.bio && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Bio</h3>
          <p className="rounded-lg border p-4 text-sm leading-relaxed text-muted-foreground">
            {mentor.bio}
          </p>
        </div>
      )}
    </div>
  );
}
