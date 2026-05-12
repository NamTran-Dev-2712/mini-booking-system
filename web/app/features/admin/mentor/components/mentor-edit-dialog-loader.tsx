/**
 * Thin wrapper used by the list page.
 * Receives a base Mentor (from the list), fetches the full MentorDetail
 * (needed for the Skills tab), then renders MentorEditDialog.
 */
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { useMentorDetailQuery } from "~/hooks/mentor/use-mentor-detail-query";
import type { Mentor } from "~/types/mentor/mentor";
import { MentorEditDialog } from "./mentor-edit-dialog";

interface MentorEditDialogLoaderProps {
  mentor: Mentor | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MentorEditDialogLoader({
  mentor,
  open,
  onOpenChange,
}: MentorEditDialogLoaderProps) {
  // Only fetch when the dialog is open and we have an id
  const { data: detail, isPending } = useMentorDetailQuery(mentor?.id ?? "");

  if (!mentor) return null;

  // While detail is loading, show a centered spinner inside a dialog
  if (isPending || !detail) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="flex h-48 items-center justify-center">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <MentorEditDialog mentor={detail} open={open} onOpenChange={onOpenChange} />
  );
}
