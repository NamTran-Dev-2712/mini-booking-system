/**
 * Centralized query key factory.
 *
 * Rules:
 * - All keys are `as const` tuples so TypeScript can narrow them.
 * - Hierarchy: [domain, scope, ...params]
 *   e.g. ["mentors", "list", { page: 1, q: "huy" }]
 * - Invalidating a parent key invalidates all children:
 *   invalidate(["mentors"]) → clears list + detail
 *   invalidate(["mentors", "list"]) → clears all list variants
 *   invalidate(["mentors", "detail", id]) → clears one detail
 */

import type { GetMentorsRequest } from "~/services/mentor/dtos/queries/get-mentors/request";

export const queryKeys = {
  mentors: {
    /** Root — invalidate to clear everything mentor-related */
    all: () => ["mentors"] as const,

    /** All list variants */
    lists: () => ["mentors", "list"] as const,

    /** Specific list with filters/pagination */
    list: (filters: GetMentorsRequest) => ["mentors", "list", filters] as const,

    /** All detail variants */
    details: () => ["mentors", "detail"] as const,

    /** Specific mentor detail */
    detail: (id: string) => ["mentors", "detail", id] as const,
  },
} as const;
