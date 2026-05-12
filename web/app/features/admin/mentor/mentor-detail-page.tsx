import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useHotkeys } from "react-hotkeys-hook";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import { Kbd } from "~/components/ui/kbd";
import { Skeleton } from "~/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useMentorDetailQuery } from "~/hooks/mentor/use-mentor-detail-query";
import { HotkeyScopes } from "~/lib/hotkeys/hotkey-scopes";
import { MentorDeleteDialog } from "./components/mentor-delete-dialog";
import { MentorEditDialog } from "./components/mentor-edit-dialog";
import { MentorProfileTab } from "./components/mentor-profile-tab";
import { MentorSkillsTab } from "./components/mentor-skills-tab";
import { MentorSlotsTab } from "./components/mentor-slots-tab";

const TABS = ["profile", "skills", "slots"] as const;
type TabValue = (typeof TABS)[number];

interface MentorDetailPageProps {
  mentorId: string;
}

export function MentorDetailPage({ mentorId }: MentorDetailPageProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get("tab") as TabValue) ?? "profile";

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { data: mentor, isPending, isError } = useMentorDetailQuery(mentorId);

  const isFormOpen = editOpen || deleteOpen;

  // ── Hotkeys ──────────────────────────────────────────────────────────────
  useHotkeys(
    "1",
    () => setSearchParams({ tab: "profile" }, { replace: true }),
    { scopes: HotkeyScopes.MentorDetail, enabled: !isFormOpen },
  );
  useHotkeys("2", () => setSearchParams({ tab: "skills" }, { replace: true }), {
    scopes: HotkeyScopes.MentorDetail,
    enabled: !isFormOpen,
  });
  useHotkeys("3", () => setSearchParams({ tab: "slots" }, { replace: true }), {
    scopes: HotkeyScopes.MentorDetail,
    enabled: !isFormOpen,
  });
  useHotkeys("e", () => setEditOpen(true), {
    scopes: HotkeyScopes.MentorDetail,
    enabled: !isFormOpen && !!mentor,
  });

  // ── Loading state ─────────────────────────────────────────────────────────
  if (isPending) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="flex items-center gap-4">
          <Skeleton className="size-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (isError || !mentor) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-sm text-muted-foreground">
          Mentor not found or failed to load.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => navigate("/admin/mentors")}
        >
          Back to Mentors
        </Button>
      </div>
    );
  }

  // Safe initials — guard against null/empty displayName from API
  const initials =
    (mentor.displayName ?? "")
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/admin">Admin</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/admin/mentors">Mentors</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{mentor.displayName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header card */}
      <div className="flex flex-col gap-4 rounded-xl border p-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="size-16 shrink-0">
            {mentor.avatarUrl && (
              <AvatarImage src={mentor.avatarUrl} alt={mentor.displayName} />
            )}
            <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-semibold">{mentor.displayName}</h2>
              <Badge
                variant={mentor.isActive ? "default" : "secondary"}
                className="text-xs"
              >
                {mentor.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{mentor.email}</p>
            {mentor.specialization && (
              <p className="mt-0.5 text-xs text-muted-foreground">
                {mentor.specialization} · {mentor.experienceYears} yr
                {mentor.experienceYears !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin/mentors")}
            className="gap-1.5"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditOpen(true)}
            className="gap-1.5"
          >
            <Edit className="size-4" />
            Edit
            <Kbd>E</Kbd>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setDeleteOpen(true)}
            className="gap-1.5"
          >
            <Trash2 className="size-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => setSearchParams({ tab: v }, { replace: true })}
      >
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="profile" className="gap-1.5">
            Profile <Kbd>1</Kbd>
          </TabsTrigger>
          <TabsTrigger value="skills" className="gap-1.5">
            Skills <Kbd>2</Kbd>
          </TabsTrigger>
          <TabsTrigger value="slots" className="gap-1.5">
            Slots <Kbd>3</Kbd>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="profile">
            <MentorProfileTab mentor={mentor} />
          </TabsContent>

          <TabsContent value="skills">
            <MentorSkillsTab mentorId={mentor.id} skills={mentor.skills} />
          </TabsContent>

          <TabsContent value="slots">
            <MentorSlotsTab
              mentorId={mentor.id}
              slots={mentor.slots}
              createShortcutEnabled={activeTab === "slots"}
            />
          </TabsContent>
        </div>
      </Tabs>

      {/* Dialogs */}
      <MentorEditDialog
        mentor={mentor}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
      <MentorDeleteDialog
        mentor={mentor}
        open={deleteOpen}
        onOpenChange={(o) => {
          setDeleteOpen(o);
          if (!o) navigate("/admin/mentors");
        }}
      />
    </div>
  );
}
