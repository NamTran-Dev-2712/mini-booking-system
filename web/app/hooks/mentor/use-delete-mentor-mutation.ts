import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "~/lib/api-error";
import { queryKeys } from "~/lib/query-keys";
import { mentorService } from "~/services/mentor/mentor.service";
import type { PaginatedResult } from "~/types/global/paginated";
import type { Mentor } from "~/types/mentor/mentor";

export function useDeleteMentorMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => mentorService.deleteMentor(id),

    // Optimistic: remove from all cached list pages immediately
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: queryKeys.mentors.lists() });

      // Snapshot all list query data for rollback
      const previousLists = qc.getQueriesData<PaginatedResult<Mentor>>({
        queryKey: queryKeys.mentors.lists(),
      });

      // Optimistically remove from every cached list variant
      qc.setQueriesData<PaginatedResult<Mentor>>(
        { queryKey: queryKeys.mentors.lists() },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            items: old.items.filter((m) => m.id !== id),
            totalCount: old.totalCount - 1,
          };
        },
      );

      return { previousLists };
    },

    onError: (err, _id, ctx) => {
      // Rollback on failure
      ctx?.previousLists?.forEach(([key, value]) => {
        qc.setQueryData(key, value);
      });
      toast.error(getApiErrorMessage(err));
    },

    onSuccess: () => {
      toast.success("Mentor deleted successfully");
    },

    onSettled: () => {
      // Always re-sync with server after delete
      qc.invalidateQueries({ queryKey: queryKeys.mentors.lists() });
    },
  });
}
