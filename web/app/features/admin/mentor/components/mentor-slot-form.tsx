import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useCreateMentorSlotMutation } from "~/hooks/mentor/use-create-mentor-slot-mutation";
import { useUpdateMentorSlotMutation } from "~/hooks/mentor/use-update-mentor-slot-mutation";
import type { MentorSlot } from "~/types/mentor/mentor";
import {
  mentorSlotSchema,
  type MentorSlotFormData,
} from "../schemas/mentor-slot.schema";

// Helper: convert ISO string to datetime-local input value
function toDatetimeLocal(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// Helper: convert datetime-local value to ISO string
function fromDatetimeLocal(local: string): string {
  return new Date(local).toISOString();
}

interface MentorSlotFormProps {
  mentorId: string;
  /** If provided, form is in edit mode */
  slot?: MentorSlot;
  onSuccess?: () => void;
}

export function MentorSlotForm({
  mentorId,
  slot,
  onSuccess,
}: MentorSlotFormProps) {
  const isEdit = !!slot;
  const createMutation = useCreateMentorSlotMutation();
  const updateMutation = useUpdateMentorSlotMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;

  const form = useForm<MentorSlotFormData>({
    resolver: zodResolver(mentorSlotSchema),
    defaultValues: slot
      ? {
          startTime: toDatetimeLocal(slot.startTime),
          endTime: toDatetimeLocal(slot.endTime),
          price: slot.price,
          maxBookings: slot.maxBookings ?? 1,
          description: slot.description ?? "",
        }
      : {
          startTime: "",
          endTime: "",
          price: 0,
          maxBookings: 1,
          description: "",
        },
  });

  async function onSubmit(data: MentorSlotFormData) {
    const payload = {
      startTime: fromDatetimeLocal(data.startTime),
      endTime: fromDatetimeLocal(data.endTime),
      price: data.price,
      maxBookings: data.maxBookings,
      description: data.description || null,
    };

    if (isEdit && slot) {
      await updateMutation.mutateAsync({
        mentorId,
        slotId: slot.id,
        ...payload,
      });
    } else {
      await createMutation.mutateAsync({ mentorId, ...payload });
    }

    form.reset();
    onSuccess?.();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        id="slot-form"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time *</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time *</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (VND) *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    step={1000}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxBookings"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Bookings *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Optional notes about this slot..."
                  className="resize-none"
                  rows={2}
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
          {isEdit ? "Update Slot" : "Create Slot"}
        </Button>
      </form>
    </Form>
  );
}
