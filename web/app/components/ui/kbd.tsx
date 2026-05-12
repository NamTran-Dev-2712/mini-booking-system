import { cn } from "~/lib/utils";

interface KbdProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Renders a keyboard shortcut badge.
 * Usage: <Kbd>⌘K</Kbd>  or  <Kbd>N</Kbd>
 */
export function Kbd({ children, className }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted px-1 font-mono text-[10px] font-medium text-muted-foreground",
        className,
      )}
      aria-label={`Keyboard shortcut: ${children}`}
    >
      {children}
    </kbd>
  );
}
