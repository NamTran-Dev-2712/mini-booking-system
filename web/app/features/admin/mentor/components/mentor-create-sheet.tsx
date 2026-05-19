import { useHotkeys } from "react-hotkeys-hook";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { HotkeyScopes } from "~/lib/hotkeys/hotkey-scopes";
import { useCreateMentorMutation } from "~/hooks/mentor/use-create-mentor-mutation";
import type { CreateMentorFormData } from "../schemas/mentor.schema";
import { MentorForm } from "./mentor-form";

interface MentorCreateSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MentorCreateSheet({
  open,
  onOpenChange,
}: MentorCreateSheetProps) {
  const { mutateAsync, isPending } = useCreateMentorMutation();

  // Cmd+S submits the form (form id="mentor-form")
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
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader className="mb-6">
          <SheetTitle>Create Mentor</SheetTitle>
          <SheetDescription>
            Add a new mentor account to the system.
          </SheetDescription>
        </SheetHeader>

        <MentorForm
          mode="create"
          onSubmit={handleSubmit}
          isSubmitting={isPending}
        />
      </SheetContent>
    </Sheet>
  );
}
