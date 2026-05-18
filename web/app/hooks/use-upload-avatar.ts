import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "~/lib/api-error";
import { fileService } from "~/services/file/file.service";

export function useUploadAvatarMutation() {
  return useMutation({
    mutationFn: (file: File) => fileService.uploadAvatar(file),

    onError: (err) => {
      toast.error(getApiErrorMessage(err));
    },
  });
}
