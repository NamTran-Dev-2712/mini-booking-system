import {
  Search,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import type { GetMentorsRequest } from "~/services/mentor/dtos/queries/get-mentors/request";

interface MentorFilterPanelProps {
  filters: GetMentorsRequest;
  onFilterChange: (patch: Partial<GetMentorsRequest>) => void;
  className?: string;
}

const SORT_OPTIONS = [
  { value: "name", label: "Name" },
  { value: "experience", label: "Experience" },
  { value: "basePrice", label: "Price" },
] as const;

/**
 * Shared filter panel for mentor listings.
 * Handles search, price range, experience range, and sort controls.
 * URL state is managed by the parent — this component is purely presentational.
 */
export function MentorFilterPanel({
  filters,
  onFilterChange,
  className,
}: MentorFilterPanelProps) {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchInput, setSearchInput] = useState(filters.searchTerm ?? "");
  const [isExpanded, setIsExpanded] = useState(false);

  const [minPriceInput, setMinPriceInput] = useState<string>(
    filters.minBasePrice != null ? String(filters.minBasePrice) : "",
  );
  const [maxPriceInput, setMaxPriceInput] = useState<string>(
    filters.maxBasePrice != null ? String(filters.maxBasePrice) : "",
  );
  const [minExpInput, setMinExpInput] = useState<string>(
    filters.minExperienceYears != null
      ? String(filters.minExperienceYears)
      : "",
  );
  const [maxExpInput, setMaxExpInput] = useState<string>(
    filters.maxExperienceYears != null
      ? String(filters.maxExperienceYears)
      : "",
  );

  // Sync inputs when filters change externally (e.g. URL navigation)
  useEffect(() => {
    setSearchInput(filters.searchTerm ?? "");
  }, [filters.searchTerm]);
  useEffect(() => {
    setMinPriceInput(
      filters.minBasePrice != null ? String(filters.minBasePrice) : "",
    );
  }, [filters.minBasePrice]);
  useEffect(() => {
    setMaxPriceInput(
      filters.maxBasePrice != null ? String(filters.maxBasePrice) : "",
    );
  }, [filters.maxBasePrice]);
  useEffect(() => {
    setMinExpInput(
      filters.minExperienceYears != null
        ? String(filters.minExperienceYears)
        : "",
    );
  }, [filters.minExperienceYears]);
  useEffect(() => {
    setMaxExpInput(
      filters.maxExperienceYears != null
        ? String(filters.maxExperienceYears)
        : "",
    );
  }, [filters.maxExperienceYears]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== (filters.searchTerm ?? "")) {
        onFilterChange({ searchTerm: searchInput || undefined, pageNumber: 1 });
      }
    }, 350);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  // Debounced numeric filters
  useEffect(() => {
    const timer = setTimeout(() => {
      const val = minPriceInput ? Number(minPriceInput) : undefined;
      if (val !== filters.minBasePrice) {
        onFilterChange({ minBasePrice: val, pageNumber: 1 });
      }
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minPriceInput]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const val = maxPriceInput ? Number(maxPriceInput) : undefined;
      if (val !== filters.maxBasePrice) {
        onFilterChange({ maxBasePrice: val, pageNumber: 1 });
      }
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxPriceInput]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const val = minExpInput ? Number(minExpInput) : undefined;
      if (val !== filters.minExperienceYears) {
        onFilterChange({ minExperienceYears: val, pageNumber: 1 });
      }
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minExpInput]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const val = maxExpInput ? Number(maxExpInput) : undefined;
      if (val !== filters.maxExperienceYears) {
        onFilterChange({ maxExperienceYears: val, pageNumber: 1 });
      }
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxExpInput]);

  const activeFilterCount = [
    filters.minBasePrice != null,
    filters.maxBasePrice != null,
    filters.minExperienceYears != null,
    filters.maxExperienceYears != null,
    !!filters.sortBy,
  ].filter(Boolean).length;

  function clearAllFilters() {
    setSearchInput("");
    setMinPriceInput("");
    setMaxPriceInput("");
    setMinExpInput("");
    setMaxExpInput("");
    onFilterChange({
      searchTerm: undefined,
      minBasePrice: undefined,
      maxBasePrice: undefined,
      minExperienceYears: undefined,
      maxExperienceYears: undefined,
      sortBy: undefined,
      sortOrder: "asc",
      pageNumber: 1,
    });
  }

  return (
    <div className={cn("space-y-3", className)}>
      {/* Search + toggle row */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            ref={searchRef}
            placeholder="Search by name, email, specialization..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-9 pr-9"
            aria-label="Search mentors"
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        <Button
          variant="outline"
          size="default"
          className="gap-2 shrink-0"
          onClick={() => setIsExpanded((v) => !v)}
          aria-expanded={isExpanded}
          aria-label="Toggle filters"
        >
          <SlidersHorizontal className="size-4" />
          <span className="hidden sm:inline">Filters</span>
          {activeFilterCount > 0 && (
            <Badge
              variant="default"
              className="size-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {activeFilterCount}
            </Badge>
          )}
          {isExpanded ? (
            <ChevronUp className="size-3.5 text-muted-foreground" />
          ) : (
            <ChevronDown className="size-3.5 text-muted-foreground" />
          )}
        </Button>
      </div>

      {/* Expandable filter panel */}
      {isExpanded && (
        <div className="rounded-lg border bg-card p-4 space-y-4 animate-in fade-in-0 slide-in-from-top-1 duration-150">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Min price */}
            <div className="space-y-1.5">
              <Label
                htmlFor="mentor-filter-min-price"
                className="text-xs font-medium"
              >
                Min Price (VND)
              </Label>
              <Input
                id="mentor-filter-min-price"
                type="number"
                min={0}
                placeholder="0"
                value={minPriceInput}
                onChange={(e) => setMinPriceInput(e.target.value)}
                className="h-9"
              />
            </div>

            {/* Max price */}
            <div className="space-y-1.5">
              <Label
                htmlFor="mentor-filter-max-price"
                className="text-xs font-medium"
              >
                Max Price (VND)
              </Label>
              <Input
                id="mentor-filter-max-price"
                type="number"
                min={0}
                placeholder="Any"
                value={maxPriceInput}
                onChange={(e) => setMaxPriceInput(e.target.value)}
                className="h-9"
              />
            </div>

            {/* Min experience */}
            <div className="space-y-1.5">
              <Label
                htmlFor="mentor-filter-min-exp"
                className="text-xs font-medium"
              >
                Min Experience (years)
              </Label>
              <Input
                id="mentor-filter-min-exp"
                type="number"
                min={0}
                placeholder="0"
                value={minExpInput}
                onChange={(e) => setMinExpInput(e.target.value)}
                className="h-9"
              />
            </div>

            {/* Max experience */}
            <div className="space-y-1.5">
              <Label
                htmlFor="mentor-filter-max-exp"
                className="text-xs font-medium"
              >
                Max Experience (years)
              </Label>
              <Input
                id="mentor-filter-max-exp"
                type="number"
                min={0}
                placeholder="Any"
                value={maxExpInput}
                onChange={(e) => setMaxExpInput(e.target.value)}
                className="h-9"
              />
            </div>
          </div>

          {/* Sort row */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-wrap gap-2 items-end">
              {/* Sort by */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Sort by</Label>
                <Select
                  value={filters.sortBy ?? "__none__"}
                  onValueChange={(v) =>
                    onFilterChange({
                      sortBy: v === "__none__" ? undefined : v,
                      pageNumber: 1,
                    })
                  }
                >
                  <SelectTrigger className="h-9 w-36">
                    <SelectValue placeholder="Default" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">Default</SelectItem>
                    {SORT_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort order */}
              {filters.sortBy && (
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Order</Label>
                  <Button
                    variant="outline"
                    size="default"
                    className="h-9 gap-1.5"
                    onClick={() =>
                      onFilterChange({
                        sortOrder: filters.sortOrder === "asc" ? "desc" : "asc",
                        pageNumber: 1,
                      })
                    }
                  >
                    <ArrowUpDown className="size-3.5" />
                    {filters.sortOrder === "desc" ? "Desc" : "Asc"}
                  </Button>
                </div>
              )}
            </div>

            {/* Clear all */}
            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="gap-1.5 text-muted-foreground hover:text-foreground self-end"
              >
                <X className="size-3.5" />
                Clear filters
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Active filter badges */}
      {(filters.searchTerm ||
        filters.minBasePrice != null ||
        filters.maxBasePrice != null ||
        filters.minExperienceYears != null ||
        filters.maxExperienceYears != null) && (
        <div className="flex flex-wrap gap-2">
          {filters.searchTerm && (
            <Badge variant="secondary" className="gap-1 text-xs">
              Search: {filters.searchTerm}
              <button
                onClick={() => {
                  setSearchInput("");
                  onFilterChange({ searchTerm: undefined, pageNumber: 1 });
                }}
                className="ml-1 hover:text-foreground"
                aria-label="Clear search filter"
              >
                <X className="size-3" />
              </button>
            </Badge>
          )}
          {filters.minBasePrice != null && (
            <Badge variant="secondary" className="gap-1 text-xs">
              Min price: {filters.minBasePrice.toLocaleString()}
              <button
                onClick={() =>
                  onFilterChange({ minBasePrice: undefined, pageNumber: 1 })
                }
                className="ml-1 hover:text-foreground"
                aria-label="Clear min price filter"
              >
                <X className="size-3" />
              </button>
            </Badge>
          )}
          {filters.maxBasePrice != null && (
            <Badge variant="secondary" className="gap-1 text-xs">
              Max price: {filters.maxBasePrice.toLocaleString()}
              <button
                onClick={() =>
                  onFilterChange({ maxBasePrice: undefined, pageNumber: 1 })
                }
                className="ml-1 hover:text-foreground"
                aria-label="Clear max price filter"
              >
                <X className="size-3" />
              </button>
            </Badge>
          )}
          {filters.minExperienceYears != null && (
            <Badge variant="secondary" className="gap-1 text-xs">
              Min exp: {filters.minExperienceYears}y
              <button
                onClick={() =>
                  onFilterChange({
                    minExperienceYears: undefined,
                    pageNumber: 1,
                  })
                }
                className="ml-1 hover:text-foreground"
                aria-label="Clear min experience filter"
              >
                <X className="size-3" />
              </button>
            </Badge>
          )}
          {filters.maxExperienceYears != null && (
            <Badge variant="secondary" className="gap-1 text-xs">
              Max exp: {filters.maxExperienceYears}y
              <button
                onClick={() =>
                  onFilterChange({
                    maxExperienceYears: undefined,
                    pageNumber: 1,
                  })
                }
                className="ml-1 hover:text-foreground"
                aria-label="Clear max experience filter"
              >
                <X className="size-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
