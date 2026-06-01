import { useTranslation } from "react-i18next";
import { ConfirmDialog } from "~/components/shared/confirm-dialog";
import { useUpdateMentorStatusMutation } from "~/hooks/mentor/use-update-mentor-status-mutation";
import type { Mentor } from "~/types/mentor/mentor";

interface MentorStatusDialogProps {
  mentor: Mentor | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Confirmation dialog for locking / unlocking a mentor account.
 * Locking deactivates the mentor (hidden from public listings, blocked from
 * signing in, existing sessions revoked); unlocking restores access.
 */
export function MentorStatusDialog({
  mentor,
  open,
  onOpenChange,
}: MentorStatusDialogProps) {
  const { t } = useTranslation("mentor");
  const { mutateAsync, isPending } = useUpdateMentorStatusMutation();

  // When the mentor is currently active, the action is "lock" (→ isActive=false).
  const willLock = mentor?.isActive ?? true;

  async function handleConfirm() {
    if (!mentor) return;
    await mutateAsync({ id: mentor.id, isActive: !mentor.isActive });
    onOpenChange(false);
  }

  const name = mentor?.displayName ?? "";

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t(
        willLock ? "statusDialog.lockTitle" : "statusDialog.unlockTitle",
      )}
      description={t(
        willLock
          ? "statusDialog.lockDescription"
          : "statusDialog.unlockDescription",
        { name },
      )}
      confirmLabel={t(
        willLock ? "statusDialog.lockConfirm" : "statusDialog.unlockConfirm",
      )}
      variant={willLock ? "destructive" : "default"}
      isLoading={isPending}
      onConfirm={handleConfirm}
    />
  );
}
