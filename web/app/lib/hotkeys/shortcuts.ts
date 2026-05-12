import { HotkeyScopes, type HotkeyScope } from "./hotkey-scopes";

export interface ShortcutDef {
  /** Key combo string accepted by react-hotkeys-hook */
  keys: string;
  /** Human-readable label shown in the help dialog */
  label: string;
  /** Scope this shortcut belongs to */
  scope: HotkeyScope;
  /** Display string for the key badge (e.g. "⌘K", "N", "?") */
  display: string;
}

/**
 * Single source of truth for all keyboard shortcuts.
 * Used both by useHotkeys() calls and the ShortcutHelp dialog.
 */
export const SHORTCUTS = {
  // ── Global ────────────────────────────────────────────────────────────────
  commandPalette: {
    keys: "mod+k",
    label: "Open command palette",
    scope: HotkeyScopes.Global,
    display: "⌘K",
  },
  help: {
    keys: "shift+slash",
    label: "Show keyboard shortcuts",
    scope: HotkeyScopes.Global,
    display: "?",
  },
  goToMentors: {
    keys: "g m",
    label: "Go to Mentors",
    scope: HotkeyScopes.Global,
    display: "G M",
  },

  // ── Mentor List ───────────────────────────────────────────────────────────
  focusSearch: {
    keys: "slash",
    label: "Focus search",
    scope: HotkeyScopes.MentorList,
    display: "/",
  },
  newMentor: {
    keys: "n",
    label: "New mentor",
    scope: HotkeyScopes.MentorList,
    display: "N",
  },
  refreshList: {
    keys: "r",
    label: "Refresh list",
    scope: HotkeyScopes.MentorList,
    display: "R",
  },
  prevPage: {
    keys: "left",
    label: "Previous page",
    scope: HotkeyScopes.MentorList,
    display: "←",
  },
  nextPage: {
    keys: "right",
    label: "Next page",
    scope: HotkeyScopes.MentorList,
    display: "→",
  },
  rowDown: {
    keys: "j",
    label: "Select next row",
    scope: HotkeyScopes.MentorList,
    display: "J",
  },
  rowUp: {
    keys: "k",
    label: "Select previous row",
    scope: HotkeyScopes.MentorList,
    display: "K",
  },
  openRow: {
    keys: "enter",
    label: "Open selected mentor",
    scope: HotkeyScopes.MentorList,
    display: "Enter",
  },
  deleteRow: {
    keys: "d",
    label: "Delete selected mentor",
    scope: HotkeyScopes.MentorList,
    display: "D",
  },

  // ── Mentor Detail ─────────────────────────────────────────────────────────
  tabProfile: {
    keys: "1",
    label: "Switch to Profile tab",
    scope: HotkeyScopes.MentorDetail,
    display: "1",
  },
  tabSkills: {
    keys: "2",
    label: "Switch to Skills tab",
    scope: HotkeyScopes.MentorDetail,
    display: "2",
  },
  tabSlots: {
    keys: "3",
    label: "Switch to Slots tab",
    scope: HotkeyScopes.MentorDetail,
    display: "3",
  },
  editMentor: {
    keys: "e",
    label: "Edit mentor",
    scope: HotkeyScopes.MentorDetail,
    display: "E",
  },
  addSkill: {
    keys: "s",
    label: "Add skill",
    scope: HotkeyScopes.MentorDetail,
    display: "S",
  },
  createSlot: {
    keys: "c",
    label: "Create slot",
    scope: HotkeyScopes.MentorDetail,
    display: "C",
  },

  // ── Form (dialog/sheet open) ──────────────────────────────────────────────
  closeForm: {
    keys: "escape",
    label: "Close form",
    scope: HotkeyScopes.Form,
    display: "Esc",
  },
  submitForm: {
    keys: "mod+s",
    label: "Save / Submit form",
    scope: HotkeyScopes.Form,
    display: "⌘S",
  },
} satisfies Record<string, ShortcutDef>;

/** Shortcuts grouped by scope — used by the help dialog */
export const SHORTCUTS_BY_SCOPE = Object.values(SHORTCUTS).reduce<
  Record<HotkeyScope, ShortcutDef[]>
>(
  (acc, s) => {
    (acc[s.scope] ??= []).push(s);
    return acc;
  },
  {} as Record<HotkeyScope, ShortcutDef[]>,
);
