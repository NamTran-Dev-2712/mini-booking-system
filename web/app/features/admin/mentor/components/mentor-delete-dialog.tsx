import { ConfirmDialog } from "~/components/shared/confirm-dialog";
import { useDeleteMentorMutation } from "~/hooks/mentor/use-delete-mentor-mutation";
import type { Mentor } from "~/types/mentor/mentor";

interface MentorDeleteDialogProps {
  mentor: Mentor | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MentorDeleteDialog({
  mentor,
  open,
  onOpenChange,
}: MentorDeleteDialogProps) {
  const { mutateAsync, isPending } = useDeleteMentorMutation();

  async function handleConfirm() {
    if (!mentor) return;
    await mutateAsync(mentor.id);
    onOpenChange(false);
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Mentor"
      description={
        mentor
          ? `Are you sure you want to delete "${mentor.displayName}"? This action cannot be undone.`
          : "Are you sure you want to delete this mentor?"
      }
      confirmLabel="Delete"
      variant="destructive"
      isLoading={isPending}
      onConfirm={handleConfirm}
    />
  );
}
