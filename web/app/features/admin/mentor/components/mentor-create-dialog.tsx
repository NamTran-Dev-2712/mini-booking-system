import { useHotkeys } from "react-hotkeys-hook";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { ScrollArea } from "~/components/ui/scroll-area";
import { HotkeyScopes } from "~/lib/hotkeys/hotkey-scopes";
import { useCreateMentorMutation } from "~/hooks/mentor/use-create-mentor-mutation";
import type { CreateMentorFormData } from "../schemas/mentor.schema";
import { MentorForm } from "./mentor-form";

interface MentorCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MentorCreateDialog({
  open,
  onOpenChange,
}: MentorCreateDialogProps) {
  const { mutateAsync, isPending } = useCreateMentorMutation();

  // Cmd+S submits the form while dialog is open
  useHotkeys(
    "mod+s",
    (e) => {
      e.preventDefault();
      document
        .getElementById("mentor-form")
        ?.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true }),
        );
    },
    { scopes: HotkeyScopes.Form, enabled: open },
  );

  async function handleSubmit(data: CreateMentorFormData) {
    await mutateAsync({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      displayName: data.displayName || null,
      bio: data.bio || null,
      specialization: data.specialization || null,
      experienceYears: data.experienceYears,
      basePrice: data.basePrice,
      avatarUrl: data.avatarUrl || null,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[90vh] w-full max-w-2xl flex-col gap-0 p-0"
        // Prevent closing while submitting
        onInteractOutside={(e) => isPending && e.preventDefault()}
        onEscapeKeyDown={(e) => isPending && e.preventDefault()}
      >
        {/* Fixed header */}
        <DialogHeader className="shrink-0 border-b px-6 py-5">
          <DialogTitle className="text-lg">Create Mentor</DialogTitle>
          <DialogDescription>
            Add a new mentor account to the system. Fields marked with{" "}
            <span className="text-destructive">*</span> are required.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable form body */}
        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="px-6 py-5">
            <MentorForm
              mode="create"
              onSubmit={handleSubmit}
              isSubmitting={isPending}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
