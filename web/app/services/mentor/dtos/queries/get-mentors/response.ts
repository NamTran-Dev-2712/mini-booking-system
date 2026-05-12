import type { PaginatedResult } from "~/types/global/paginated";
import type { Mentor } from "~/types/mentor/mentor";

export type GetMentorsResponse = PaginatedResult<Mentor>;
