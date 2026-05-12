import { useQueryClient } from "@tanstack/react-query";
import { CalendarDays, LogOut, RefreshCw, UserPlus, Users } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";
import { Kbd } from "~/components/ui/kbd";
import { queryKeys } from "~/lib/query-keys";
import { authService } from "~/services/auth/auth.service";
import { useAuthStore } from "~/stores/auth.store";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Called when "New Mentor" is selected */
  onNewMentor?: () => void;
}

export function CommandPalette({
  open,
  onOpenChange,
  onNewMentor,
}: CommandPaletteProps) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const clearUser = useAuthStore((s) => s.clearUser);

  function run(fn: () => void) {
    onOpenChange(false);
    fn();
  }

  async function handleLogout() {
    onOpenChange(false);
    try {
      await authService.logout();
    } catch {
      // ignore
    } finally {
      clearUser();
      navigate("/login");
    }
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => run(() => navigate("/admin"))}>
            <CalendarDays className="mr-2 size-4" />
            Go to Dashboard
            <Kbd className="ml-auto">G D</Kbd>
          </CommandItem>
          <CommandItem onSelect={() => run(() => navigate("/admin/mentors"))}>
            <Users className="mr-2 size-4" />
            Go to Mentors
            <Kbd className="ml-auto">G M</Kbd>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() =>
              run(() => {
                navigate("/admin/mentors");
                onNewMentor?.();
              })
            }
          >
            <UserPlus className="mr-2 size-4" />
            New Mentor
            <Kbd className="ml-auto">N</Kbd>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              run(() => {
                qc.invalidateQueries({ queryKey: queryKeys.mentors.all() });
                toast.success("Data refreshed");
              })
            }
          >
            <RefreshCw className="mr-2 size-4" />
            Refresh Data
            <Kbd className="ml-auto">R</Kbd>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Account">
          <CommandItem onSelect={handleLogout}>
            <LogOut className="mr-2 size-4" />
            Logout
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
