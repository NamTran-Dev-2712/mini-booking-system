import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Kbd } from "~/components/ui/kbd";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { HotkeyScopes } from "~/lib/hotkeys/hotkey-scopes";
import { SHORTCUTS_BY_SCOPE } from "~/lib/hotkeys/shortcuts";

const SCOPE_LABELS: Record<string, string> = {
  [HotkeyScopes.Global]: "Global",
  [HotkeyScopes.MentorList]: "Mentor List",
  [HotkeyScopes.MentorDetail]: "Mentor Detail",
  [HotkeyScopes.Form]: "Form",
};

interface MentorShortcutHelpProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MentorShortcutHelp({
  open,
  onOpenChange,
}: MentorShortcutHelpProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-4 pr-4">
            {Object.entries(SHORTCUTS_BY_SCOPE).map(([scope, shortcuts]) => (
              <div key={scope}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {SCOPE_LABELS[scope] ?? scope}
                </p>
                <div className="space-y-1.5">
                  {shortcuts.map((s) => (
                    <div
                      key={s.keys}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-foreground">{s.label}</span>
                      <Kbd>{s.display}</Kbd>
                    </div>
                  ))}
                </div>
                <Separator className="mt-4" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
