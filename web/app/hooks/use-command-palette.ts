import { useState } from "react";

/**
 * Simple state hook for the global command palette.
 * Kept separate so any component can open/close it without prop drilling.
 */
export function useCommandPalette() {
  const [open, setOpen] = useState(false);

  return {
    open,
    setOpen,
    toggle: () => setOpen((v) => !v),
    close: () => setOpen(false),
  };
}
