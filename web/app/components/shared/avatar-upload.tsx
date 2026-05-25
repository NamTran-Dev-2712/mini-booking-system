import { Camera, Loader2 } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useUploadAvatarMutation } from "~/hooks/use-upload-avatar";
import i18n from "~/lib/i18n";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface AvatarUploadProps {
  currentUrl?: string | null;
  onUploaded: (url: string) => void;
  fallback?: string;
}

export function AvatarUpload({
  currentUrl,
  onUploaded,
  fallback = "?",
}: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useUploadAvatarMutation();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error(i18n.t("toast.avatarInvalidType"));
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error(i18n.t("toast.avatarTooLarge"));
      return;
    }

    mutate(file, {
      onSuccess: (data) => {
        onUploaded(data.avatarUrl);
        toast.success(i18n.t("toast.avatarUploaded"));
      },
    });

    e.target.value = "";
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isPending}
        className="group relative cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Avatar className="size-20">
          {currentUrl && <AvatarImage src={currentUrl} alt="Avatar" />}
          <AvatarFallback className="text-lg">{fallback}</AvatarFallback>
        </Avatar>

        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          {isPending ? (
            <Loader2 className="size-5 animate-spin text-white" />
          ) : (
            <Camera className="size-5 text-white" />
          )}
        </div>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload avatar"
      />

      <p className="text-xs text-muted-foreground">
        Click to upload (JPEG, PNG, WebP, max 5MB)
      </p>
    </div>
  );
}
