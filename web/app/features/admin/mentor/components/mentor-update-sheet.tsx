import { useHotkeys } from "react-hotkeys-hook";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { HotkeyScopes } from "~/lib/hotkeys/hotkey-scopes";
import { useUpdateMentorMutation } from "~/hooks/mentor/use-update-mentor-mutation";
import type { Mentor } from "~/types/mentor/mentor";
import type { UpdateMentorFormData } from "../schemas/mentor.schema";
import { MentorForm } from "./mentor-form";

interface MentorUpdateSheetProps {
  mentor: Mentor | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MentorUpdateSheet({
  mentor,
  open,
  onOpenChange,
}: MentorUpdateSheetProps) {
  const { mutateAsync, isPending } = useUpdateMentorMutation();

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

  if (!mentor) return null;

  async function handleSubmit(data: UpdateMentorFormData) {
    if (!mentor) return;
    await mutateAsync({
      id: mentor.id,
      body: {
        fullName: data.fullName || null,
        phoneNumber: data.phoneNumber || null,
        displayName: data.displayName || null,
        bio: data.bio || null,
        specialization: data.specialization || null,
        experienceYears: data.experienceYears ?? null,
        basePrice: data.basePrice ?? null,
        avatarUrl: data.avatarUrl || null,
      },
    });
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader className="mb-6">
          <SheetTitle>Edit Mentor</SheetTitle>
          <SheetDescription>
            Update {mentor.displayName}&apos;s profile information.
          </SheetDescription>
        </SheetHeader>

        <MentorForm
          mode="update"
          defaultValues={{
            fullName: mentor.displayName,
            displayName: mentor.displayName,
            bio: mentor.bio ?? "",
            specialization: mentor.specialization ?? "",
            experienceYears: mentor.experienceYears,
            basePrice: mentor.basePrice,
            avatarUrl: mentor.avatarUrl ?? "",
          }}
          onSubmit={handleSubmit}
          isSubmitting={isPending}
        />
      </SheetContent>
    </Sheet>
  );
}
