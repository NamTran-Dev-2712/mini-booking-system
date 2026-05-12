/**
 * Hotkey scope identifiers.
 *
 * Scopes are activated/deactivated per page/component so shortcuts
 * don't bleed across contexts (e.g. "n" for New Mentor shouldn't fire
 * while a form is open).
 */
export const HotkeyScopes = {
  /** Always active — global shortcuts like Cmd+K, ? */
  Global: "global",

  /** Active on /admin/mentors list page */
  MentorList: "admin.mentor.list",

  /** Active on /admin/mentors/:id detail page */
  MentorDetail: "admin.mentor.detail",

  /**
   * Active when a dialog/sheet form is open.
   * Overrides MentorList so "n", "d", etc. don't fire while typing.
   */
  Form: "form",
} as const;

export type HotkeyScope = (typeof HotkeyScopes)[keyof typeof HotkeyScopes];
