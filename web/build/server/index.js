import { t as useAuthStore } from "./assets/auth.store-DMqV7YnH.js";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import {
  Link,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  ServerRouter,
  UNSAFE_withComponentProps,
  UNSAFE_withErrorBoundaryProps,
  UNSAFE_withHydrateFallbackProps,
  data,
  isRouteErrorResponse,
  redirect,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  defaultShouldDehydrateQuery,
  isServer,
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  Avatar,
  Dialog,
  DropdownMenu,
  Label,
  ScrollArea,
  Select,
  Separator,
  Slot,
  Tabs,
  Tooltip,
} from "radix-ui";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import { Toaster, toast } from "sonner";
import {
  Activity,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  ArrowUpDown,
  BarChart3,
  BookOpen,
  Bot,
  Briefcase,
  Building2,
  Calendar,
  CalendarCheck,
  CalendarDays,
  CheckCircle,
  CheckCircle2,
  CheckIcon,
  ChevronDown,
  ChevronDownIcon,
  ChevronLeft,
  ChevronRight,
  ChevronRightIcon,
  ChevronUp,
  ChevronUpIcon,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  CircleCheckIcon,
  Clock,
  CreditCard,
  DollarSign,
  Edit,
  Eye,
  EyeOff,
  GraduationCap,
  Heart,
  InfoIcon,
  LayoutDashboard,
  Lightbulb,
  Loader2,
  Loader2Icon,
  LogOut,
  Mail,
  Menu,
  MoreHorizontal,
  OctagonXIcon,
  Phone,
  Plus,
  QrCode,
  RefreshCw,
  Search,
  SearchIcon,
  Settings2,
  Shield,
  ShieldX,
  SlidersHorizontal,
  Star,
  Target,
  Trash2,
  TrendingUp,
  TriangleAlertIcon,
  User,
  UserCircle,
  UserPlus,
  Users,
  X,
  XCircle,
  XIcon,
  Zap,
} from "lucide-react";
import { cva } from "class-variance-authority";
import axios from "axios";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format, isSameDay } from "date-fns";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useHotkeys } from "react-hotkeys-hook";
import { Command } from "cmdk";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
  let target = {};
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
    });
  if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
  return target;
};
//#endregion
//#region node_modules/@react-router/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = /* @__PURE__ */ __exportAll({
  default: () => handleRequest,
  streamTimeout: () => streamTimeout,
});
var streamTimeout = 5e3;
function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  routerContext,
  loadContext,
) {
  if (request.method.toUpperCase() === "HEAD")
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders,
    });
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption =
      (userAgent && isbot(userAgent)) || routerContext.isSpaMode
        ? "onAllReady"
        : "onShellReady";
    let timeoutId = setTimeout(() => abort(), streamTimeout + 1e3);
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, {
        context: routerContext,
        url: request.url,
      }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            },
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) console.error(error);
        },
      },
    );
  });
}
//#endregion
//#region app/lib/utils.ts
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
//#endregion
//#region app/components/ui/tooltip.tsx
function TooltipProvider({ delayDuration = 0, ...props }) {
  return /* @__PURE__ */ jsx(Tooltip.Provider, {
    "data-slot": "tooltip-provider",
    delayDuration,
    ...props,
  });
}
function Tooltip$1({ ...props }) {
  return /* @__PURE__ */ jsx(Tooltip.Root, {
    "data-slot": "tooltip",
    ...props,
  });
}
function TooltipTrigger({ ...props }) {
  return /* @__PURE__ */ jsx(Tooltip.Trigger, {
    "data-slot": "tooltip-trigger",
    ...props,
  });
}
function TooltipContent({ className, sideOffset = 0, children, ...props }) {
  return /* @__PURE__ */ jsx(Tooltip.Portal, {
    children: /* @__PURE__ */ jsxs(Tooltip.Content, {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "z-50 inline-flex w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
        className,
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(Tooltip.Arrow, {
          className:
            "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground",
        }),
      ],
    }),
  });
}
//#endregion
//#region app/components/ui/sonner.tsx
var Toaster$1 = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(Toaster, {
    theme,
    className: "toaster group",
    icons: {
      success: /* @__PURE__ */ jsx(CircleCheckIcon, { className: "size-4" }),
      info: /* @__PURE__ */ jsx(InfoIcon, { className: "size-4" }),
      warning: /* @__PURE__ */ jsx(TriangleAlertIcon, { className: "size-4" }),
      error: /* @__PURE__ */ jsx(OctagonXIcon, { className: "size-4" }),
      loading: /* @__PURE__ */ jsx(Loader2Icon, {
        className: "size-4 animate-spin",
      }),
    },
    style: {
      "--normal-bg": "var(--popover)",
      "--normal-text": "var(--popover-foreground)",
      "--normal-border": "var(--border)",
      "--border-radius": "var(--radius)",
    },
    toastOptions: { classNames: { toast: "cn-toast" } },
    ...props,
  });
};
//#endregion
//#region app/lib/api-error.ts
/**
 * Extracts a user-facing error message from an unknown thrown value.
 * Works for both our ApiError shape and generic JS errors.
 */
function getApiErrorMessage(error) {
  if (isApiError(error)) {
    if (error.errors && error.errors.length > 0) return error.errors[0];
    return error.message;
  }
  if (error instanceof Error) return error.message;
  return "An unexpected error occurred. Please try again.";
}
function isApiError(error) {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    "message" in error
  );
}
//#endregion
//#region app/lib/query-client.ts
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 3e4,
        gcTime: 5 * 6e4,
        refetchOnWindowFocus: false,
        retry: (failureCount, err) => {
          if (isApiError(err) && [400, 401, 403, 404].includes(err.statusCode))
            return false;
          return failureCount < 2;
        },
      },
      mutations: {
        retry: 0,
        onError: (err) => {
          import("sonner").then(({ toast }) =>
            toast.error(getApiErrorMessage(err)),
          );
        },
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
  });
}
var browserQueryClient;
function getQueryClient() {
  if (isServer) return makeQueryClient();
  return (browserQueryClient ??= makeQueryClient());
}
//#endregion
//#region app/root.tsx
var root_exports = /* @__PURE__ */ __exportAll({
  ErrorBoundary: () => ErrorBoundary,
  Layout: () => Layout,
  default: () => root_default,
});
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [
      /* @__PURE__ */ jsxs("head", {
        children: [
          /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
          /* @__PURE__ */ jsx("meta", {
            name: "viewport",
            content: "width=device-width, initial-scale=1",
          }),
          /* @__PURE__ */ jsx(Meta, {}),
          /* @__PURE__ */ jsx(Links, {}),
        ],
      }),
      /* @__PURE__ */ jsxs("body", {
        children: [
          children,
          /* @__PURE__ */ jsx(ScrollRestoration, {}),
          /* @__PURE__ */ jsx(Scripts, {}),
        ],
      }),
    ],
  });
}
var root_default = UNSAFE_withComponentProps(function App() {
  useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []);
  return /* @__PURE__ */ jsxs(QueryClientProvider, {
    client: getQueryClient(),
    children: [
      /* @__PURE__ */ jsx(HydrationBoundary, {
        state: void 0,
        children: /* @__PURE__ */ jsxs(TooltipProvider, {
          children: [
            /* @__PURE__ */ jsx(Outlet, {}),
            /* @__PURE__ */ jsx(Toaster$1, {
              richColors: true,
              position: "top-right",
            }),
          ],
        }),
      }),
      false,
    ],
  });
});
var ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary({
  error,
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [
      /* @__PURE__ */ jsx("h1", { children: message }),
      /* @__PURE__ */ jsx("p", { children: details }),
      stack,
    ],
  });
});
//#endregion
//#region app/components/ui/avatar.tsx
function Avatar$1({ className, size = "default", ...props }) {
  return /* @__PURE__ */ jsx(Avatar.Root, {
    "data-slot": "avatar",
    "data-size": size,
    className: cn(
      "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten",
      className,
    ),
    ...props,
  });
}
function AvatarImage({ className, ...props }) {
  return /* @__PURE__ */ jsx(Avatar.Image, {
    "data-slot": "avatar-image",
    className: cn(
      "aspect-square size-full rounded-full object-cover",
      className,
    ),
    ...props,
  });
}
function AvatarFallback({ className, ...props }) {
  return /* @__PURE__ */ jsx(Avatar.Fallback, {
    "data-slot": "avatar-fallback",
    className: cn(
      "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
      className,
    ),
    ...props,
  });
}
//#endregion
//#region app/components/ui/button.tsx
var buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  return /* @__PURE__ */ jsx(asChild ? Slot.Root : "button", {
    "data-slot": "button",
    "data-variant": variant,
    "data-size": size,
    className: cn(
      buttonVariants({
        variant,
        size,
        className,
      }),
    ),
    ...props,
  });
}
//#endregion
//#region app/components/ui/sheet.tsx
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsx(Dialog.Root, {
    "data-slot": "sheet",
    ...props,
  });
}
function SheetTrigger({ ...props }) {
  return /* @__PURE__ */ jsx(Dialog.Trigger, {
    "data-slot": "sheet-trigger",
    ...props,
  });
}
function SheetPortal({ ...props }) {
  return /* @__PURE__ */ jsx(Dialog.Portal, {
    "data-slot": "sheet-portal",
    ...props,
  });
}
function SheetOverlay({ className, ...props }) {
  return /* @__PURE__ */ jsx(Dialog.Overlay, {
    "data-slot": "sheet-overlay",
    className: cn(
      "fixed inset-0 z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
      className,
    ),
    ...props,
  });
}
function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(SheetPortal, {
    children: [
      /* @__PURE__ */ jsx(SheetOverlay, {}),
      /* @__PURE__ */ jsxs(Dialog.Content, {
        "data-slot": "sheet-content",
        "data-side": side,
        className: cn(
          "fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=top]:data-closed:slide-out-to-top-10",
          className,
        ),
        ...props,
        children: [
          children,
          showCloseButton &&
            /* @__PURE__ */ jsx(Dialog.Close, {
              "data-slot": "sheet-close",
              asChild: true,
              children: /* @__PURE__ */ jsxs(Button, {
                variant: "ghost",
                className: "absolute top-3 right-3",
                size: "icon-sm",
                children: [
                  /* @__PURE__ */ jsx(XIcon, {}),
                  /* @__PURE__ */ jsx("span", {
                    className: "sr-only",
                    children: "Close",
                  }),
                ],
              }),
            }),
        ],
      }),
    ],
  });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", {
    "data-slot": "sheet-header",
    className: cn("flex flex-col gap-0.5 p-4", className),
    ...props,
  });
}
function SheetTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(Dialog.Title, {
    "data-slot": "sheet-title",
    className: cn(
      "font-heading text-base font-medium text-foreground",
      className,
    ),
    ...props,
  });
}
//#endregion
//#region app/components/ui/separator.tsx
function Separator$1({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(Separator.Root, {
    "data-slot": "separator",
    decorative,
    orientation,
    className: cn(
      "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
      className,
    ),
    ...props,
  });
}
//#endregion
//#region app/lib/axios.config.ts
var apiClient = axios.create({
  baseURL: "http://localhost:5296",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
var isRefreshing = false;
var refreshQueue = [];
function processQueue(error) {
  refreshQueue.forEach((p) => (error ? p.reject(error) : p.resolve()));
  refreshQueue = [];
}
apiClient.interceptors.response.use(
  (response) => {
    const body = response.data;
    if (!body.success) {
      const error = {
        message: body.message,
        errors: body.errors ?? [],
        statusCode: body.statusCode,
        traceId: body.traceId,
      };
      return Promise.reject(error);
    }
    return response;
  },
  async (axiosError) => {
    const originalRequest = axiosError.config;
    if (!axiosError.response)
      return Promise.reject({
        message: "Network error. Please check your connection.",
        errors: [],
        statusCode: 0,
      });
    const status = axiosError.response.status;
    const isRefreshEndpoint =
      originalRequest.url?.includes("/api/auth/refresh");
    const isLoginEndpoint = originalRequest.url?.includes("/api/auth/login");
    if (
      status === 401 &&
      !originalRequest._retry &&
      !isRefreshEndpoint &&
      !isLoginEndpoint
    ) {
      if (isRefreshing)
        return new Promise((resolve, reject) => {
          refreshQueue.push({
            resolve: () => resolve(apiClient(originalRequest)),
            reject,
          });
        });
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        await apiClient.post("/api/auth/refresh");
        processQueue(null);
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        const { useAuthStore } =
          await import("./assets/auth.store-69aGwhV_.js");
        useAuthStore.getState().clearUser();
        if (typeof window !== "undefined") window.location.href = "/login";
        return Promise.reject({
          message: "Session expired. Please log in again.",
          errors: [],
          statusCode: 401,
        });
      } finally {
        isRefreshing = false;
      }
    }
    const body = axiosError.response.data;
    const error = {
      message: body?.message ?? axiosError.message,
      errors: body?.errors ?? [],
      statusCode: body?.statusCode ?? status,
      traceId: body?.traceId,
    };
    return Promise.reject(error);
  },
);
//#endregion
//#region app/services/auth/auth.service.ts
var authService = {
  async login(data) {
    return (await apiClient.post("/api/auth/login", data)).data.data;
  },
  async register(data) {
    return (await apiClient.post("/api/auth/register", data)).data.data;
  },
  async getProfile() {
    return (await apiClient.get("/api/auth/profile")).data.data;
  },
  async logout() {
    await apiClient.post("/api/auth/logout");
  },
  async refresh() {
    return (await apiClient.post("/api/auth/refresh")).data.data;
  },
};
//#endregion
//#region app/hooks/use-auth.ts
/** Returns the currently authenticated user, or null. */
function useCurrentUser() {
  return useAuthStore((state) => state.user);
}
/** Returns the user's primary role (first in the roles array), or null. */
function usePrimaryRole() {
  return useAuthStore((state) => state.user?.roles[0] ?? null);
}
//#endregion
//#region app/components/layouts/public/public.header.tsx
var ROLE_DASHBOARD = {
  Admin: "/admin",
  Mentor: "/mentor",
  User: "/user",
};
var navLinks = [
  {
    to: "/",
    label: "Home",
  },
  {
    to: "/about",
    label: "About",
  },
  {
    to: "/mentors",
    label: "Mentors",
  },
];
function PublicHeader() {
  const navigate = useNavigate();
  const user = useCurrentUser();
  const primaryRole = usePrimaryRole();
  const clearUser = useAuthStore((s) => s.clearUser);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const dashboardHref = ROLE_DASHBOARD[primaryRole ?? ""] ?? "/";
  const initials = (user?.fullName ?? "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  async function handleLogout() {
    try {
      await authService.logout();
    } catch {
    } finally {
      clearUser();
      navigate("/login");
    }
  }
  return /* @__PURE__ */ jsx("header", {
    className:
      "sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-sm",
    children: /* @__PURE__ */ jsxs("div", {
      className:
        "container mx-auto flex h-14 max-w-6xl items-center justify-between px-4",
      children: [
        /* @__PURE__ */ jsxs(Link, {
          to: "/",
          className:
            "flex items-center gap-2 font-semibold text-base transition-opacity hover:opacity-80",
          children: [
            /* @__PURE__ */ jsx(CalendarDays, { className: "size-5" }),
            /* @__PURE__ */ jsx("span", { children: "MiniBooking" }),
          ],
        }),
        /* @__PURE__ */ jsx("nav", {
          className: "hidden md:flex items-center gap-1",
          children: navLinks.map((link) =>
            /* @__PURE__ */ jsx(
              NavLink,
              {
                to: link.to,
                end: link.to === "/",
                className: ({ isActive }) =>
                  `px-3 py-1.5 text-sm rounded-md transition-colors ${isActive ? "text-foreground font-medium bg-muted" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"}`,
                children: link.label,
              },
              link.to,
            ),
          ),
        }),
        /* @__PURE__ */ jsx("div", {
          className: "hidden md:flex items-center gap-2",
          children: isAuthenticated
            ? /* @__PURE__ */ jsxs(Fragment, {
                children: [
                  /* @__PURE__ */ jsx(Button, {
                    variant: "ghost",
                    size: "sm",
                    asChild: true,
                    children: /* @__PURE__ */ jsxs(Link, {
                      to: dashboardHref,
                      className: "flex items-center gap-1.5",
                      children: [
                        /* @__PURE__ */ jsx(LayoutDashboard, {
                          className: "size-3.5",
                        }),
                        "Dashboard",
                      ],
                    }),
                  }),
                  /* @__PURE__ */ jsxs("div", {
                    className: "flex items-center gap-2 pl-1",
                    children: [
                      /* @__PURE__ */ jsx(Avatar$1, {
                        className: "size-8",
                        children: /* @__PURE__ */ jsx(AvatarFallback, {
                          className:
                            "bg-primary/10 text-xs font-semibold text-primary",
                          children: initials,
                        }),
                      }),
                      /* @__PURE__ */ jsx("span", {
                        className:
                          "text-sm font-medium leading-tight max-w-[120px] truncate",
                        children: user?.fullName,
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsxs(Button, {
                    variant: "ghost",
                    size: "sm",
                    onClick: handleLogout,
                    className: "text-muted-foreground hover:text-destructive",
                    children: [
                      /* @__PURE__ */ jsx(LogOut, { className: "size-3.5" }),
                      "Sign Out",
                    ],
                  }),
                ],
              })
            : /* @__PURE__ */ jsxs(Fragment, {
                children: [
                  /* @__PURE__ */ jsx(Button, {
                    variant: "ghost",
                    size: "sm",
                    asChild: true,
                    children: /* @__PURE__ */ jsx(Link, {
                      to: "/login",
                      children: "Sign In",
                    }),
                  }),
                  /* @__PURE__ */ jsx(Button, {
                    size: "sm",
                    asChild: true,
                    children: /* @__PURE__ */ jsx(Link, {
                      to: "/register",
                      children: "Sign Up",
                    }),
                  }),
                ],
              }),
        }),
        /* @__PURE__ */ jsxs(Sheet, {
          children: [
            /* @__PURE__ */ jsx(SheetTrigger, {
              asChild: true,
              className: "md:hidden",
              children: /* @__PURE__ */ jsxs(Button, {
                variant: "ghost",
                size: "icon",
                children: [
                  /* @__PURE__ */ jsx(Menu, {}),
                  /* @__PURE__ */ jsx("span", {
                    className: "sr-only",
                    children: "Toggle menu",
                  }),
                ],
              }),
            }),
            /* @__PURE__ */ jsxs(SheetContent, {
              side: "right",
              className: "w-72",
              children: [
                /* @__PURE__ */ jsx(SheetHeader, {
                  children: /* @__PURE__ */ jsxs(SheetTitle, {
                    className: "flex items-center gap-2 text-base",
                    children: [
                      /* @__PURE__ */ jsx(CalendarDays, {
                        className: "size-4",
                      }),
                      "MiniBooking",
                    ],
                  }),
                }),
                /* @__PURE__ */ jsx("div", {
                  className: "mt-6 flex flex-col gap-1",
                  children: navLinks.map((link) =>
                    /* @__PURE__ */ jsx(
                      NavLink,
                      {
                        to: link.to,
                        end: link.to === "/",
                        className: ({ isActive }) =>
                          `px-3 py-2 text-sm rounded-md transition-colors ${isActive ? "text-foreground font-medium bg-muted" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"}`,
                        children: link.label,
                      },
                      link.to,
                    ),
                  ),
                }),
                /* @__PURE__ */ jsx(Separator$1, { className: "my-4" }),
                isAuthenticated
                  ? /* @__PURE__ */ jsxs("div", {
                      className: "flex flex-col gap-2 px-1",
                      children: [
                        /* @__PURE__ */ jsxs("div", {
                          className:
                            "flex items-center gap-3 rounded-lg bg-muted px-3 py-2.5",
                          children: [
                            /* @__PURE__ */ jsx(Avatar$1, {
                              className: "size-8 shrink-0",
                              children: /* @__PURE__ */ jsx(AvatarFallback, {
                                className:
                                  "bg-primary/10 text-xs font-semibold text-primary",
                                children: initials,
                              }),
                            }),
                            /* @__PURE__ */ jsxs("div", {
                              className: "min-w-0",
                              children: [
                                /* @__PURE__ */ jsx("p", {
                                  className: "truncate text-sm font-medium",
                                  children: user?.fullName,
                                }),
                                /* @__PURE__ */ jsx("p", {
                                  className:
                                    "truncate text-xs text-muted-foreground",
                                  children: user?.email,
                                }),
                              ],
                            }),
                          ],
                        }),
                        /* @__PURE__ */ jsx(Button, {
                          variant: "outline",
                          asChild: true,
                          children: /* @__PURE__ */ jsxs(Link, {
                            to: dashboardHref,
                            className: "flex items-center gap-2",
                            children: [
                              /* @__PURE__ */ jsx(LayoutDashboard, {
                                className: "size-4",
                              }),
                              "Go to Dashboard",
                            ],
                          }),
                        }),
                        /* @__PURE__ */ jsx(Button, {
                          asChild: true,
                          variant: "ghost",
                          children: /* @__PURE__ */ jsxs(Link, {
                            to: `/${primaryRole?.toLowerCase()}/profile`,
                            className: "flex items-center gap-2",
                            children: [
                              /* @__PURE__ */ jsx(UserCircle, {
                                className: "size-4",
                              }),
                              "My Profile",
                            ],
                          }),
                        }),
                        /* @__PURE__ */ jsxs(Button, {
                          variant: "ghost",
                          onClick: handleLogout,
                          className:
                            "justify-start text-muted-foreground hover:text-destructive",
                          children: [
                            /* @__PURE__ */ jsx(LogOut, {
                              className: "size-4",
                            }),
                            "Sign Out",
                          ],
                        }),
                      ],
                    })
                  : /* @__PURE__ */ jsxs("div", {
                      className: "flex flex-col gap-2 px-1",
                      children: [
                        /* @__PURE__ */ jsx(Button, {
                          variant: "outline",
                          asChild: true,
                          children: /* @__PURE__ */ jsx(Link, {
                            to: "/login",
                            children: "Sign In",
                          }),
                        }),
                        /* @__PURE__ */ jsx(Button, {
                          asChild: true,
                          children: /* @__PURE__ */ jsx(Link, {
                            to: "/register",
                            children: "Sign Up",
                          }),
                        }),
                      ],
                    }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
//#endregion
//#region app/components/layouts/public/public.footer.tsx
function GitHubIcon$1({ className }) {
  return /* @__PURE__ */ jsx("svg", {
    className,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    children: /* @__PURE__ */ jsx("path", {
      d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
    }),
  });
}
function XIcon$1({ className }) {
  return /* @__PURE__ */ jsx("svg", {
    className,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    children: /* @__PURE__ */ jsx("path", {
      d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    }),
  });
}
function PublicFooter() {
  return /* @__PURE__ */ jsx("footer", {
    className: "border-t border-border/60 bg-muted/30",
    children: /* @__PURE__ */ jsxs("div", {
      className: "container mx-auto max-w-6xl px-4 py-10",
      children: [
        /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-2 gap-8 md:grid-cols-4",
          children: [
            /* @__PURE__ */ jsxs("div", {
              className: "col-span-2 md:col-span-1 space-y-3",
              children: [
                /* @__PURE__ */ jsxs(Link, {
                  to: "/",
                  className: "flex items-center gap-2 font-semibold",
                  children: [
                    /* @__PURE__ */ jsx(CalendarDays, { className: "size-5" }),
                    /* @__PURE__ */ jsx("span", { children: "MiniBooking" }),
                  ],
                }),
                /* @__PURE__ */ jsx("p", {
                  className: "text-sm text-muted-foreground leading-relaxed",
                  children: "Smart mentorship scheduling for modern learners.",
                }),
                /* @__PURE__ */ jsxs("div", {
                  className: "flex items-center gap-3 pt-1",
                  children: [
                    /* @__PURE__ */ jsx("a", {
                      href: "https://github.com",
                      "aria-label": "GitHub",
                      className:
                        "text-muted-foreground hover:text-foreground transition-colors",
                      children: /* @__PURE__ */ jsx(GitHubIcon$1, {
                        className: "size-4",
                      }),
                    }),
                    /* @__PURE__ */ jsx("a", {
                      href: "https://x.com",
                      "aria-label": "X (Twitter)",
                      className:
                        "text-muted-foreground hover:text-foreground transition-colors",
                      children: /* @__PURE__ */ jsx(XIcon$1, {
                        className: "size-4",
                      }),
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ jsxs("div", {
              className: "space-y-3",
              children: [
                /* @__PURE__ */ jsx("h4", {
                  className: "text-sm font-medium",
                  children: "Product",
                }),
                /* @__PURE__ */ jsxs("ul", {
                  className: "space-y-2 text-sm text-muted-foreground",
                  children: [
                    /* @__PURE__ */ jsx("li", {
                      children: /* @__PURE__ */ jsx(Link, {
                        to: "/",
                        className: "hover:text-foreground transition-colors",
                        children: "Home",
                      }),
                    }),
                    /* @__PURE__ */ jsx("li", {
                      children: /* @__PURE__ */ jsx(Link, {
                        to: "/about",
                        className: "hover:text-foreground transition-colors",
                        children: "About",
                      }),
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ jsxs("div", {
              className: "space-y-3",
              children: [
                /* @__PURE__ */ jsx("h4", {
                  className: "text-sm font-medium",
                  children: "Account",
                }),
                /* @__PURE__ */ jsxs("ul", {
                  className: "space-y-2 text-sm text-muted-foreground",
                  children: [
                    /* @__PURE__ */ jsx("li", {
                      children: /* @__PURE__ */ jsx(Link, {
                        to: "/login",
                        className: "hover:text-foreground transition-colors",
                        children: "Sign In",
                      }),
                    }),
                    /* @__PURE__ */ jsx("li", {
                      children: /* @__PURE__ */ jsx(Link, {
                        to: "/register",
                        className: "hover:text-foreground transition-colors",
                        children: "Sign Up",
                      }),
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ jsxs("div", {
              className: "space-y-3",
              children: [
                /* @__PURE__ */ jsx("h4", {
                  className: "text-sm font-medium",
                  children: "Legal",
                }),
                /* @__PURE__ */ jsxs("ul", {
                  className: "space-y-2 text-sm text-muted-foreground",
                  children: [
                    /* @__PURE__ */ jsx("li", {
                      children: /* @__PURE__ */ jsx("span", {
                        className: "cursor-default",
                        children: "Privacy Policy",
                      }),
                    }),
                    /* @__PURE__ */ jsx("li", {
                      children: /* @__PURE__ */ jsx("span", {
                        className: "cursor-default",
                        children: "Terms of Service",
                      }),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        /* @__PURE__ */ jsx(Separator$1, { className: "my-6" }),
        /* @__PURE__ */ jsxs("p", {
          className: "text-center text-xs text-muted-foreground",
          children: [
            "© ",
            /* @__PURE__ */ new Date().getFullYear(),
            " MiniBooking. All rights reserved.",
          ],
        }),
      ],
    }),
  });
}
//#endregion
//#region app/components/layouts/public/public.layout.tsx
var PublicLayoutComponent = ({ children }) => {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col min-h-screen",
    children: [
      /* @__PURE__ */ jsx(PublicHeader, {}),
      /* @__PURE__ */ jsx("main", {
        className: "flex-1",
        children,
      }),
      /* @__PURE__ */ jsx(PublicFooter, {}),
    ],
  });
};
//#endregion
//#region app/routes/public/_layout.tsx
var _layout_exports$4 = /* @__PURE__ */ __exportAll({
  HydrateFallback: () => HydrateFallback$4,
  clientLoader: () => clientLoader$4,
  default: () => _layout_default$4,
});
async function clientLoader$4() {
  await useAuthStore.persist.rehydrate();
  return null;
}
var HydrateFallback$4 = UNSAFE_withHydrateFallbackProps(
  function HydrateFallback() {
    return null;
  },
);
var _layout_default$4 = UNSAFE_withComponentProps(function PublicLayout() {
  return /* @__PURE__ */ jsx(PublicLayoutComponent, {
    children: /* @__PURE__ */ jsx(Outlet, {}),
  });
});
//#endregion
//#region app/components/ui/badge.tsx
var badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: { variant: "default" },
  },
);
function Badge({ className, variant = "default", asChild = false, ...props }) {
  return /* @__PURE__ */ jsx(asChild ? Slot.Root : "span", {
    "data-slot": "badge",
    "data-variant": variant,
    className: cn(badgeVariants({ variant }), className),
    ...props,
  });
}
//#endregion
//#region app/features/public/home/home.page.tsx
function meta$27() {
  return [
    { title: "MiniBooking — Smart Mentor Scheduling" },
    {
      name: "description",
      content: "Connect with mentors and book appointments effortlessly",
    },
  ];
}
var features = [
  {
    icon: CalendarCheck,
    title: "Instant Booking",
    description:
      "Find available mentors and book sessions instantly — no waiting or phone calls needed.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "End-to-end encrypted data. Your privacy and mentor information are protected.",
  },
  {
    icon: Zap,
    title: "Fast & Easy",
    description:
      "Intuitive interface. Just 3 simple steps to schedule your mentorship session.",
  },
];
var stats$1 = [
  {
    icon: Users,
    value: "1,000+",
    label: "Students",
  },
  {
    icon: Building2,
    value: "200+",
    label: "Mentors",
  },
  {
    icon: BarChart3,
    value: "50K+",
    label: "Sessions",
  },
];
var steps = [
  {
    step: "01",
    title: "Search",
    description:
      "Browse mentors by expertise, experience level, and availability.",
  },
  {
    step: "02",
    title: "Book",
    description:
      "View real-time availability and select your preferred time slot.",
  },
  {
    step: "03",
    title: "Connect",
    description:
      "Receive instant confirmation and automatic reminders before your session.",
  },
];
function HomePage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col",
    children: [
      /* @__PURE__ */ jsxs("section", {
        className: "relative overflow-hidden py-20 md:py-32",
        children: [
          /* @__PURE__ */ jsx("div", {
            className:
              "absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,oklch(0.9_0_0/0.3),transparent)]",
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "container mx-auto max-w-6xl px-4 text-center",
            children: [
              /* @__PURE__ */ jsxs(Badge, {
                variant: "secondary",
                className: "mb-4 inline-flex items-center gap-1",
                children: [
                  /* @__PURE__ */ jsx(CheckCircle2, { className: "size-3" }),
                  "Free • No Installation Required",
                ],
              }),
              /* @__PURE__ */ jsxs("h1", {
                className:
                  "text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl",
                children: [
                  "Connect with Mentors",
                  /* @__PURE__ */ jsx("span", {
                    className: "block text-muted-foreground",
                    children: "Easier Than Ever",
                  }),
                ],
              }),
              /* @__PURE__ */ jsx("p", {
                className:
                  "mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg",
                children:
                  "MiniBooking helps you find expert mentors, schedule sessions, and grow your skills — all on one seamless platform.",
              }),
              /* @__PURE__ */ jsxs("div", {
                className:
                  "mt-8 flex flex-wrap items-center justify-center gap-3",
                children: [
                  /* @__PURE__ */ jsx(Button, {
                    size: "lg",
                    asChild: true,
                    className: "h-11 px-6",
                    children: /* @__PURE__ */ jsxs(Link, {
                      to: "/register",
                      children: [
                        "Get Started Free",
                        /* @__PURE__ */ jsx(ChevronRight, {
                          className: "ml-1 size-4",
                        }),
                      ],
                    }),
                  }),
                  /* @__PURE__ */ jsx(Button, {
                    variant: "outline",
                    size: "lg",
                    asChild: true,
                    className: "h-11 px-6",
                    children: /* @__PURE__ */ jsx(Link, {
                      to: "/about",
                      children: "Learn More",
                    }),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsx("section", {
        className: "border-y border-border/60 bg-muted/30 py-10",
        children: /* @__PURE__ */ jsx("div", {
          className: "container mx-auto max-w-6xl px-4",
          children: /* @__PURE__ */ jsx("div", {
            className: "grid grid-cols-3 gap-4 md:gap-8",
            children: stats$1.map(({ icon: Icon, value, label }) =>
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex flex-col items-center gap-1 text-center",
                  children: [
                    /* @__PURE__ */ jsx(Icon, {
                      className: "size-5 text-muted-foreground mb-1",
                    }),
                    /* @__PURE__ */ jsx("span", {
                      className: "text-2xl font-bold md:text-3xl",
                      children: value,
                    }),
                    /* @__PURE__ */ jsx("span", {
                      className: "text-xs text-muted-foreground md:text-sm",
                      children: label,
                    }),
                  ],
                },
                label,
              ),
            ),
          }),
        }),
      }),
      /* @__PURE__ */ jsx("section", {
        className: "py-20 md:py-28",
        children: /* @__PURE__ */ jsxs("div", {
          className: "container mx-auto max-w-6xl px-4",
          children: [
            /* @__PURE__ */ jsxs("div", {
              className: "mb-12 text-center",
              children: [
                /* @__PURE__ */ jsx("h2", {
                  className: "text-3xl font-bold tracking-tight md:text-4xl",
                  children: "Why Choose MiniBooking?",
                }),
                /* @__PURE__ */ jsx("p", {
                  className: "mt-3 text-muted-foreground",
                  children:
                    "Built for simplicity, powerful enough for all your mentorship needs.",
                }),
              ],
            }),
            /* @__PURE__ */ jsx("div", {
              className: "grid gap-6 md:grid-cols-3",
              children: features.map(({ icon: Icon, title, description }) =>
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className:
                      "group rounded-xl border border-border/60 bg-card p-6 transition-shadow hover:shadow-md",
                    children: [
                      /* @__PURE__ */ jsx("div", {
                        className:
                          "mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-muted",
                        children: /* @__PURE__ */ jsx(Icon, {
                          className: "size-5",
                        }),
                      }),
                      /* @__PURE__ */ jsx("h3", {
                        className: "font-semibold",
                        children: title,
                      }),
                      /* @__PURE__ */ jsx("p", {
                        className:
                          "mt-2 text-sm text-muted-foreground leading-relaxed",
                        children: description,
                      }),
                    ],
                  },
                  title,
                ),
              ),
            }),
          ],
        }),
      }),
      /* @__PURE__ */ jsx(Separator$1, {}),
      /* @__PURE__ */ jsx("section", {
        className: "py-20 md:py-28",
        children: /* @__PURE__ */ jsxs("div", {
          className: "container mx-auto max-w-6xl px-4",
          children: [
            /* @__PURE__ */ jsxs("div", {
              className: "mb-12 text-center",
              children: [
                /* @__PURE__ */ jsx("h2", {
                  className: "text-3xl font-bold tracking-tight md:text-4xl",
                  children: "Just 3 Simple Steps",
                }),
                /* @__PURE__ */ jsx("p", {
                  className: "mt-3 text-muted-foreground",
                  children:
                    "From search to confirmation — faster than you think.",
                }),
              ],
            }),
            /* @__PURE__ */ jsx("div", {
              className: "grid gap-8 md:grid-cols-3",
              children: steps.map(({ step, title, description }) =>
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "relative flex flex-col gap-3",
                    children: [
                      /* @__PURE__ */ jsx("span", {
                        className:
                          "text-5xl font-black text-border select-none",
                        children: step,
                      }),
                      /* @__PURE__ */ jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [
                          /* @__PURE__ */ jsx(Search, {
                            className: "size-4 opacity-60",
                          }),
                          /* @__PURE__ */ jsx("h3", {
                            className: "font-semibold",
                            children: title,
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsx("p", {
                        className:
                          "text-sm text-muted-foreground leading-relaxed",
                        children: description,
                      }),
                    ],
                  },
                  step,
                ),
              ),
            }),
          ],
        }),
      }),
      /* @__PURE__ */ jsx("section", {
        className: "bg-foreground text-background py-16 md:py-20",
        children: /* @__PURE__ */ jsxs("div", {
          className: "container mx-auto max-w-6xl px-4 text-center",
          children: [
            /* @__PURE__ */ jsx("h2", {
              className: "text-3xl font-bold tracking-tight md:text-4xl",
              children: "Ready to Get Started?",
            }),
            /* @__PURE__ */ jsx("p", {
              className: "mt-3 text-background/60 md:text-lg",
              children:
                "Join thousands of students connecting with expert mentors every day.",
            }),
            /* @__PURE__ */ jsx(Button, {
              size: "lg",
              variant: "secondary",
              asChild: true,
              className: "mt-8 h-11 px-8",
              children: /* @__PURE__ */ jsxs(Link, {
                to: "/register",
                children: [
                  "Create Free Account",
                  /* @__PURE__ */ jsx(ChevronRight, {
                    className: "ml-1 size-4",
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
    ],
  });
}
//#endregion
//#region app/routes/public/home.tsx
var home_exports = /* @__PURE__ */ __exportAll({
  default: () => HomePage,
  meta: () => meta$27,
});
//#endregion
//#region app/features/public/about/about.page.tsx
function meta$26() {
  return [
    { title: "About Us — MiniBooking" },
    {
      name: "description",
      content: "Our story and mission at MiniBooking",
    },
  ];
}
var stats = [
  {
    icon: Users,
    value: "1,000+",
    label: "Trusted Students",
  },
  {
    icon: Building2,
    value: "200+",
    label: "Expert Mentors",
  },
  {
    icon: BarChart3,
    value: "50K+",
    label: "Successful Sessions",
  },
];
var values = [
  {
    icon: Target,
    title: "Simplicity",
    description:
      "We believe technology should serve people, not the other way around. Every feature is designed for maximum ease of use.",
  },
  {
    icon: Heart,
    title: "Dedication",
    description:
      "Every user feedback inspires us to improve. We listen, we learn, and we act on what matters most.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Constantly seeking better ways to solve problems. Innovation is in our DNA and drives everything we build.",
  },
];
var team = [
  {
    name: "Trần Nam",
    role: "Founder & CEO",
    initials: "TN",
  },
  {
    name: "Nguyễn Linh",
    role: "Lead Designer",
    initials: "NL",
  },
  {
    name: "Phạm Khoa",
    role: "Backend Engineer",
    initials: "PK",
  },
  {
    name: "Lê Thu",
    role: "Frontend Engineer",
    initials: "LT",
  },
];
function AboutPage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col",
    children: [
      /* @__PURE__ */ jsxs("section", {
        className: "relative overflow-hidden py-20 md:py-28",
        children: [
          /* @__PURE__ */ jsx("div", {
            className:
              "absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,oklch(0.9_0_0/0.25),transparent)]",
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "container mx-auto max-w-6xl px-4 text-center",
            children: [
              /* @__PURE__ */ jsx(Badge, {
                variant: "secondary",
                className: "mb-4",
                children: "About Us",
              }),
              /* @__PURE__ */ jsxs("h1", {
                className:
                  "text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl",
                children: [
                  "Building the Future",
                  /* @__PURE__ */ jsx("span", {
                    className: "block text-muted-foreground",
                    children: "of Mentorship",
                  }),
                ],
              }),
              /* @__PURE__ */ jsx("p", {
                className:
                  "mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg",
                children:
                  "MiniBooking was founded with one goal: make connecting with mentors easy and effective for everyone, everywhere.",
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsx("section", {
        className: "border-y border-border/60 bg-muted/30 py-10",
        children: /* @__PURE__ */ jsx("div", {
          className: "container mx-auto max-w-6xl px-4",
          children: /* @__PURE__ */ jsx("div", {
            className: "grid grid-cols-3 gap-4 md:gap-8",
            children: stats.map(({ icon: Icon, value, label }) =>
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex flex-col items-center gap-1 text-center",
                  children: [
                    /* @__PURE__ */ jsx(Icon, {
                      className: "size-5 text-muted-foreground mb-1",
                    }),
                    /* @__PURE__ */ jsx("span", {
                      className: "text-2xl font-bold md:text-3xl",
                      children: value,
                    }),
                    /* @__PURE__ */ jsx("span", {
                      className: "text-xs text-muted-foreground md:text-sm",
                      children: label,
                    }),
                  ],
                },
                label,
              ),
            ),
          }),
        }),
      }),
      /* @__PURE__ */ jsx("section", {
        className: "py-20 md:py-28",
        children: /* @__PURE__ */ jsx("div", {
          className: "container mx-auto max-w-6xl px-4",
          children: /* @__PURE__ */ jsxs("div", {
            className: "grid gap-12 md:grid-cols-2 md:items-center",
            children: [
              /* @__PURE__ */ jsxs("div", {
                className: "space-y-4",
                children: [
                  /* @__PURE__ */ jsx(Badge, {
                    variant: "secondary",
                    children: "Our Mission",
                  }),
                  /* @__PURE__ */ jsx("h2", {
                    className: "text-3xl font-bold tracking-tight md:text-4xl",
                    children: "Connecting Students with Expert Mentors",
                  }),
                  /* @__PURE__ */ jsx("p", {
                    className: "text-muted-foreground leading-relaxed",
                    children:
                      "We believe mentorship is the key to growth. MiniBooking exists to remove the friction in scheduling mentorship sessions — so you can focus on learning and developing your skills.",
                  }),
                  /* @__PURE__ */ jsx("p", {
                    className: "text-muted-foreground leading-relaxed",
                    children:
                      "Whether you're a student seeking guidance or a professional sharing knowledge, our platform adapts to your needs without requiring any technical expertise.",
                  }),
                ],
              }),
              /* @__PURE__ */ jsx("div", {
                className:
                  "rounded-2xl border border-border/60 bg-muted/40 aspect-video flex items-center justify-center",
                children: /* @__PURE__ */ jsx("p", {
                  className: "text-muted-foreground text-sm",
                  children: "Product screenshot",
                }),
              }),
            ],
          }),
        }),
      }),
      /* @__PURE__ */ jsx(Separator$1, {}),
      /* @__PURE__ */ jsx("section", {
        className: "py-20 md:py-28",
        children: /* @__PURE__ */ jsxs("div", {
          className: "container mx-auto max-w-6xl px-4",
          children: [
            /* @__PURE__ */ jsxs("div", {
              className: "mb-12 text-center",
              children: [
                /* @__PURE__ */ jsx("h2", {
                  className: "text-3xl font-bold tracking-tight md:text-4xl",
                  children: "Our Core Values",
                }),
                /* @__PURE__ */ jsx("p", {
                  className: "mt-3 text-muted-foreground",
                  children: "The principles that guide every decision we make.",
                }),
              ],
            }),
            /* @__PURE__ */ jsx("div", {
              className: "grid gap-6 md:grid-cols-3",
              children: values.map(({ icon: Icon, title, description }) =>
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className:
                      "rounded-xl border border-border/60 bg-card p-6 transition-shadow hover:shadow-md",
                    children: [
                      /* @__PURE__ */ jsx("div", {
                        className:
                          "mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-muted",
                        children: /* @__PURE__ */ jsx(Icon, {
                          className: "size-5",
                        }),
                      }),
                      /* @__PURE__ */ jsx("h3", {
                        className: "font-semibold",
                        children: title,
                      }),
                      /* @__PURE__ */ jsx("p", {
                        className:
                          "mt-2 text-sm text-muted-foreground leading-relaxed",
                        children: description,
                      }),
                    ],
                  },
                  title,
                ),
              ),
            }),
          ],
        }),
      }),
      /* @__PURE__ */ jsx(Separator$1, {}),
      /* @__PURE__ */ jsx("section", {
        className: "py-20 md:py-28",
        children: /* @__PURE__ */ jsxs("div", {
          className: "container mx-auto max-w-6xl px-4",
          children: [
            /* @__PURE__ */ jsxs("div", {
              className: "mb-12 text-center",
              children: [
                /* @__PURE__ */ jsx("h2", {
                  className: "text-3xl font-bold tracking-tight md:text-4xl",
                  children: "Our Team",
                }),
                /* @__PURE__ */ jsx("p", {
                  className: "mt-3 text-muted-foreground",
                  children: "The people behind MiniBooking.",
                }),
              ],
            }),
            /* @__PURE__ */ jsx("div", {
              className: "grid grid-cols-2 gap-6 md:grid-cols-4",
              children: team.map(({ name, role, initials }) =>
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "flex flex-col items-center gap-3 text-center",
                    children: [
                      /* @__PURE__ */ jsx(Avatar$1, {
                        className: "size-16",
                        children: /* @__PURE__ */ jsx(AvatarFallback, {
                          className: "text-sm font-medium",
                          children: initials,
                        }),
                      }),
                      /* @__PURE__ */ jsxs("div", {
                        children: [
                          /* @__PURE__ */ jsx("p", {
                            className: "font-medium text-sm",
                            children: name,
                          }),
                          /* @__PURE__ */ jsx("p", {
                            className: "text-xs text-muted-foreground",
                            children: role,
                          }),
                        ],
                      }),
                    ],
                  },
                  name,
                ),
              ),
            }),
          ],
        }),
      }),
    ],
  });
}
//#endregion
//#region app/routes/public/about.tsx
var about_exports = /* @__PURE__ */ __exportAll({
  default: () => AboutPage,
  meta: () => meta$26,
});
//#endregion
//#region app/components/ui/select.tsx
function Select$1({ ...props }) {
  return /* @__PURE__ */ jsx(Select.Root, {
    "data-slot": "select",
    ...props,
  });
}
function SelectValue({ ...props }) {
  return /* @__PURE__ */ jsx(Select.Value, {
    "data-slot": "select-value",
    ...props,
  });
}
function SelectTrigger({ className, size = "default", children, ...props }) {
  return /* @__PURE__ */ jsxs(Select.Trigger, {
    "data-slot": "select-trigger",
    "data-size": size,
    className: cn(
      "flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className,
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(Select.Icon, {
        asChild: true,
        children: /* @__PURE__ */ jsx(ChevronDownIcon, {
          className: "pointer-events-none size-4 text-muted-foreground",
        }),
      }),
    ],
  });
}
function SelectContent({
  className,
  children,
  position = "item-aligned",
  align = "center",
  ...props
}) {
  return /* @__PURE__ */ jsx(Select.Portal, {
    children: /* @__PURE__ */ jsxs(Select.Content, {
      "data-slot": "select-content",
      "data-align-trigger": position === "item-aligned",
      className: cn(
        "relative z-50 max-h-(--radix-select-content-available-height) min-w-36 origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      ),
      position,
      align,
      ...props,
      children: [
        /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx(Select.Viewport, {
          "data-position": position,
          className: cn(
            "data-[position=popper]:h-(--radix-select-trigger-height) data-[position=popper]:w-full data-[position=popper]:min-w-(--radix-select-trigger-width)",
            position === "popper" && "",
          ),
          children,
        }),
        /* @__PURE__ */ jsx(SelectScrollDownButton, {}),
      ],
    }),
  });
}
function SelectItem({ className, children, ...props }) {
  return /* @__PURE__ */ jsxs(Select.Item, {
    "data-slot": "select-item",
    className: cn(
      "relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
      className,
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", {
        className:
          "pointer-events-none absolute right-2 flex size-4 items-center justify-center",
        children: /* @__PURE__ */ jsx(Select.ItemIndicator, {
          children: /* @__PURE__ */ jsx(CheckIcon, {
            className: "pointer-events-none",
          }),
        }),
      }),
      /* @__PURE__ */ jsx(Select.ItemText, { children }),
    ],
  });
}
function SelectScrollUpButton({ className, ...props }) {
  return /* @__PURE__ */ jsx(Select.ScrollUpButton, {
    "data-slot": "select-scroll-up-button",
    className: cn(
      "z-10 flex cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
      className,
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUpIcon, {}),
  });
}
function SelectScrollDownButton({ className, ...props }) {
  return /* @__PURE__ */ jsx(Select.ScrollDownButton, {
    "data-slot": "select-scroll-down-button",
    className: cn(
      "z-10 flex cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
      className,
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDownIcon, {}),
  });
}
//#endregion
//#region app/components/shared/data-table/data-table-pagination.tsx
var PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
function DataTablePagination({
  pageNumber,
  pageSize,
  totalPages,
  totalCount,
  hasPreviousPage,
  hasNextPage,
  onPageChange,
  onPageSizeChange,
}) {
  return /* @__PURE__ */ jsxs("div", {
    className:
      "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-2",
    children: [
      /* @__PURE__ */ jsxs("p", {
        className: "text-xs text-muted-foreground",
        children: [totalCount, " result", totalCount !== 1 ? "s" : ""],
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "flex items-center gap-4",
        children: [
          /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsx("span", {
                className: "text-xs text-muted-foreground whitespace-nowrap",
                children: "Rows per page",
              }),
              /* @__PURE__ */ jsxs(Select$1, {
                value: String(pageSize),
                onValueChange: (v) => onPageSizeChange(Number(v)),
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, {
                    className: "h-8 w-16 text-xs",
                    children: /* @__PURE__ */ jsx(SelectValue, {}),
                  }),
                  /* @__PURE__ */ jsx(SelectContent, {
                    side: "top",
                    children: PAGE_SIZE_OPTIONS.map((s) =>
                      /* @__PURE__ */ jsx(
                        SelectItem,
                        {
                          value: String(s),
                          className: "text-xs",
                          children: s,
                        },
                        s,
                      ),
                    ),
                  }),
                ],
              }),
            ],
          }),
          /* @__PURE__ */ jsxs("span", {
            className: "text-xs text-muted-foreground whitespace-nowrap",
            children: ["Page ", pageNumber, " of ", totalPages || 1],
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-1",
            children: [
              /* @__PURE__ */ jsx(Button, {
                variant: "outline",
                size: "icon",
                className: "size-8",
                onClick: () => onPageChange(1),
                disabled: !hasPreviousPage,
                "aria-label": "First page",
                children: /* @__PURE__ */ jsx(ChevronsLeft, {
                  className: "size-3.5",
                }),
              }),
              /* @__PURE__ */ jsx(Button, {
                variant: "outline",
                size: "icon",
                className: "size-8",
                onClick: () => onPageChange(pageNumber - 1),
                disabled: !hasPreviousPage,
                "aria-label": "Previous page",
                children: /* @__PURE__ */ jsx(ChevronLeft, {
                  className: "size-3.5",
                }),
              }),
              /* @__PURE__ */ jsx(Button, {
                variant: "outline",
                size: "icon",
                className: "size-8",
                onClick: () => onPageChange(pageNumber + 1),
                disabled: !hasNextPage,
                "aria-label": "Next page",
                children: /* @__PURE__ */ jsx(ChevronRight, {
                  className: "size-3.5",
                }),
              }),
              /* @__PURE__ */ jsx(Button, {
                variant: "outline",
                size: "icon",
                className: "size-8",
                onClick: () => onPageChange(totalPages),
                disabled: !hasNextPage,
                "aria-label": "Last page",
                children: /* @__PURE__ */ jsx(ChevronsRight, {
                  className: "size-3.5",
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
//#endregion
//#region app/lib/query-keys.ts
var queryKeys = {
  mentors: {
    /** Root — invalidate to clear everything mentor-related */
    all: () => ["mentors"],
    /** All list variants */
    lists: () => ["mentors", "list"],
    /** Specific list with filters/pagination */
    list: (filters) => ["mentors", "list", filters],
    /** All detail variants */
    details: () => ["mentors", "detail"],
    /** Specific mentor detail */
    detail: (id) => ["mentors", "detail", id],
  },
  bookings: {
    all: () => ["bookings"],
    lists: () => ["bookings", "list"],
    list: (filters) => ["bookings", "list", filters],
    details: () => ["bookings", "detail"],
    detail: (id) => ["bookings", "detail", id],
  },
  payments: { status: (bookingId) => ["payments", "status", bookingId] },
};
//#endregion
//#region app/services/mentor/mentor.service.ts
var mentorService = {
  async getMentors(params = {}) {
    return (await apiClient.get("/api/Mentor", { params })).data.data;
  },
  async getMentorDetail(id) {
    return (await apiClient.get(`/api/Mentor/${id}`)).data.data;
  },
  async createMentor(body) {
    return { id: (await apiClient.post("/api/Mentor", body)).data.data };
  },
  async updateMentor(id, body) {
    return {
      id: (
        await apiClient.put(`/api/Mentor/${id}`, {
          ...body,
          id,
        })
      ).data.data,
    };
  },
  async deleteMentor(id) {
    await apiClient.delete(`/api/Mentor/${id}`);
  },
  async addSkill(mentorId, body) {
    return {
      id: (
        await apiClient.post(`/api/Mentor/${mentorId}/skills`, {
          ...body,
          mentorId,
        })
      ).data.data,
    };
  },
  async removeSkill(mentorId, skillId) {
    await apiClient.delete(`/api/Mentor/${mentorId}/skills/${skillId}`);
  },
  async createSlot(mentorId, body) {
    return {
      id: (
        await apiClient.post(`/api/Mentor/${mentorId}/slots`, {
          ...body,
          mentorId,
        })
      ).data.data,
    };
  },
  async updateSlot(mentorId, slotId, body) {
    return {
      id: (
        await apiClient.put(`/api/Mentor/${mentorId}/slots/${slotId}`, {
          ...body,
          id: slotId,
          mentorId,
        })
      ).data.data,
    };
  },
};
//#endregion
//#region app/hooks/mentor/use-mentors-query.ts
/**
 * Fetches the paginated mentor list.
 * Uses keepPreviousData so the table doesn't flash empty while paginating.
 * staleTime is inherited from QueryClient defaults (30s).
 */
function useMentorsQuery(filters = {}) {
  return useQuery({
    queryKey: queryKeys.mentors.list(filters),
    queryFn: () => mentorService.getMentors(filters),
    placeholderData: keepPreviousData,
  });
}
//#endregion
//#region app/lib/mentor-filters.ts
/**
 * Parses URL search params into a GetMentorsRequest object.
 * URL is the single source of truth for filter/sort/pagination state.
 */
function parseMentorFilters(searchParams) {
  const pageNumber = Number(searchParams.get("page") ?? "1");
  const pageSize = Number(searchParams.get("pageSize") ?? "20");
  const sortBy = searchParams.get("sort") ?? void 0;
  const sortOrder = searchParams.get("order") ?? "asc";
  const searchTerm = searchParams.get("q") ?? void 0;
  const minBasePrice = searchParams.get("minPrice")
    ? Number(searchParams.get("minPrice"))
    : void 0;
  const maxBasePrice = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : void 0;
  const minExperienceYears = searchParams.get("minExp")
    ? Number(searchParams.get("minExp"))
    : void 0;
  const maxExperienceYears = searchParams.get("maxExp")
    ? Number(searchParams.get("maxExp"))
    : void 0;
  return {
    pageNumber: isNaN(pageNumber) ? 1 : pageNumber,
    pageSize: isNaN(pageSize) ? 20 : pageSize,
    sortBy: sortBy || void 0,
    sortOrder,
    searchTerm: searchTerm || void 0,
    minBasePrice,
    maxBasePrice,
    minExperienceYears,
    maxExperienceYears,
  };
}
/**
 * Serializes a GetMentorsRequest back to URLSearchParams.
 */
function serializeMentorFilters(filters) {
  const params = new URLSearchParams();
  if (filters.pageNumber && filters.pageNumber !== 1)
    params.set("page", String(filters.pageNumber));
  if (filters.pageSize && filters.pageSize !== 20)
    params.set("pageSize", String(filters.pageSize));
  if (filters.sortBy) params.set("sort", filters.sortBy);
  if (filters.sortOrder && filters.sortOrder !== "asc")
    params.set("order", filters.sortOrder);
  if (filters.searchTerm) params.set("q", filters.searchTerm);
  if (filters.minBasePrice != null)
    params.set("minPrice", String(filters.minBasePrice));
  if (filters.maxBasePrice != null)
    params.set("maxPrice", String(filters.maxBasePrice));
  if (filters.minExperienceYears != null)
    params.set("minExp", String(filters.minExperienceYears));
  if (filters.maxExperienceYears != null)
    params.set("maxExp", String(filters.maxExperienceYears));
  return params;
}
//#endregion
//#region app/components/ui/input.tsx
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx("input", {
    type,
    "data-slot": "input",
    className: cn(
      "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
      className,
    ),
    ...props,
  });
}
//#endregion
//#region app/components/ui/label.tsx
function Label$1({ className, ...props }) {
  return /* @__PURE__ */ jsx(Label.Root, {
    "data-slot": "label",
    className: cn(
      "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
      className,
    ),
    ...props,
  });
}
//#endregion
//#region app/components/shared/mentor/mentor-filter-panel.tsx
var SORT_OPTIONS = [
  {
    value: "name",
    label: "Name",
  },
  {
    value: "experience",
    label: "Experience",
  },
  {
    value: "basePrice",
    label: "Price",
  },
];
/**
 * Shared filter panel for mentor listings.
 * Handles search, price range, experience range, and sort controls.
 * URL state is managed by the parent — this component is purely presentational.
 */
function MentorFilterPanel({ filters, onFilterChange, className }) {
  const searchRef = useRef(null);
  const [searchInput, setSearchInput] = useState(filters.searchTerm ?? "");
  const [isExpanded, setIsExpanded] = useState(false);
  const [minPriceInput, setMinPriceInput] = useState(
    filters.minBasePrice != null ? String(filters.minBasePrice) : "",
  );
  const [maxPriceInput, setMaxPriceInput] = useState(
    filters.maxBasePrice != null ? String(filters.maxBasePrice) : "",
  );
  const [minExpInput, setMinExpInput] = useState(
    filters.minExperienceYears != null
      ? String(filters.minExperienceYears)
      : "",
  );
  const [maxExpInput, setMaxExpInput] = useState(
    filters.maxExperienceYears != null
      ? String(filters.maxExperienceYears)
      : "",
  );
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
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== (filters.searchTerm ?? ""))
        onFilterChange({
          searchTerm: searchInput || void 0,
          pageNumber: 1,
        });
    }, 350);
    return () => clearTimeout(timer);
  }, [searchInput]);
  useEffect(() => {
    const timer = setTimeout(() => {
      const val = minPriceInput ? Number(minPriceInput) : void 0;
      if (val !== filters.minBasePrice)
        onFilterChange({
          minBasePrice: val,
          pageNumber: 1,
        });
    }, 500);
    return () => clearTimeout(timer);
  }, [minPriceInput]);
  useEffect(() => {
    const timer = setTimeout(() => {
      const val = maxPriceInput ? Number(maxPriceInput) : void 0;
      if (val !== filters.maxBasePrice)
        onFilterChange({
          maxBasePrice: val,
          pageNumber: 1,
        });
    }, 500);
    return () => clearTimeout(timer);
  }, [maxPriceInput]);
  useEffect(() => {
    const timer = setTimeout(() => {
      const val = minExpInput ? Number(minExpInput) : void 0;
      if (val !== filters.minExperienceYears)
        onFilterChange({
          minExperienceYears: val,
          pageNumber: 1,
        });
    }, 500);
    return () => clearTimeout(timer);
  }, [minExpInput]);
  useEffect(() => {
    const timer = setTimeout(() => {
      const val = maxExpInput ? Number(maxExpInput) : void 0;
      if (val !== filters.maxExperienceYears)
        onFilterChange({
          maxExperienceYears: val,
          pageNumber: 1,
        });
    }, 500);
    return () => clearTimeout(timer);
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
      searchTerm: void 0,
      minBasePrice: void 0,
      maxBasePrice: void 0,
      minExperienceYears: void 0,
      maxExperienceYears: void 0,
      sortBy: void 0,
      sortOrder: "asc",
      pageNumber: 1,
    });
  }
  return /* @__PURE__ */ jsxs("div", {
    className: cn("space-y-3", className),
    children: [
      /* @__PURE__ */ jsxs("div", {
        className: "flex gap-2",
        children: [
          /* @__PURE__ */ jsxs("div", {
            className: "relative flex-1",
            children: [
              /* @__PURE__ */ jsx(Search, {
                className:
                  "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none",
              }),
              /* @__PURE__ */ jsx(Input, {
                ref: searchRef,
                placeholder: "Search by name, email, specialization...",
                value: searchInput,
                onChange: (e) => setSearchInput(e.target.value),
                className: "pl-9 pr-9",
                "aria-label": "Search mentors",
              }),
              searchInput &&
                /* @__PURE__ */ jsx("button", {
                  onClick: () => setSearchInput(""),
                  className:
                    "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                  "aria-label": "Clear search",
                  children: /* @__PURE__ */ jsx(X, { className: "size-3.5" }),
                }),
            ],
          }),
          /* @__PURE__ */ jsxs(Button, {
            variant: "outline",
            size: "default",
            className: "gap-2 shrink-0",
            onClick: () => setIsExpanded((v) => !v),
            "aria-expanded": isExpanded,
            "aria-label": "Toggle filters",
            children: [
              /* @__PURE__ */ jsx(SlidersHorizontal, { className: "size-4" }),
              /* @__PURE__ */ jsx("span", {
                className: "hidden sm:inline",
                children: "Filters",
              }),
              activeFilterCount > 0 &&
                /* @__PURE__ */ jsx(Badge, {
                  variant: "default",
                  className:
                    "size-5 rounded-full p-0 text-xs flex items-center justify-center",
                  children: activeFilterCount,
                }),
              isExpanded
                ? /* @__PURE__ */ jsx(ChevronUp, {
                    className: "size-3.5 text-muted-foreground",
                  })
                : /* @__PURE__ */ jsx(ChevronDown, {
                    className: "size-3.5 text-muted-foreground",
                  }),
            ],
          }),
        ],
      }),
      isExpanded &&
        /* @__PURE__ */ jsxs("div", {
          className:
            "rounded-lg border bg-card p-4 space-y-4 animate-in fade-in-0 slide-in-from-top-1 duration-150",
          children: [
            /* @__PURE__ */ jsxs("div", {
              className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
              children: [
                /* @__PURE__ */ jsxs("div", {
                  className: "space-y-1.5",
                  children: [
                    /* @__PURE__ */ jsx(Label$1, {
                      htmlFor: "mentor-filter-min-price",
                      className: "text-xs font-medium",
                      children: "Min Price (VND)",
                    }),
                    /* @__PURE__ */ jsx(Input, {
                      id: "mentor-filter-min-price",
                      type: "number",
                      min: 0,
                      placeholder: "0",
                      value: minPriceInput,
                      onChange: (e) => setMinPriceInput(e.target.value),
                      className: "h-9",
                    }),
                  ],
                }),
                /* @__PURE__ */ jsxs("div", {
                  className: "space-y-1.5",
                  children: [
                    /* @__PURE__ */ jsx(Label$1, {
                      htmlFor: "mentor-filter-max-price",
                      className: "text-xs font-medium",
                      children: "Max Price (VND)",
                    }),
                    /* @__PURE__ */ jsx(Input, {
                      id: "mentor-filter-max-price",
                      type: "number",
                      min: 0,
                      placeholder: "Any",
                      value: maxPriceInput,
                      onChange: (e) => setMaxPriceInput(e.target.value),
                      className: "h-9",
                    }),
                  ],
                }),
                /* @__PURE__ */ jsxs("div", {
                  className: "space-y-1.5",
                  children: [
                    /* @__PURE__ */ jsx(Label$1, {
                      htmlFor: "mentor-filter-min-exp",
                      className: "text-xs font-medium",
                      children: "Min Experience (years)",
                    }),
                    /* @__PURE__ */ jsx(Input, {
                      id: "mentor-filter-min-exp",
                      type: "number",
                      min: 0,
                      placeholder: "0",
                      value: minExpInput,
                      onChange: (e) => setMinExpInput(e.target.value),
                      className: "h-9",
                    }),
                  ],
                }),
                /* @__PURE__ */ jsxs("div", {
                  className: "space-y-1.5",
                  children: [
                    /* @__PURE__ */ jsx(Label$1, {
                      htmlFor: "mentor-filter-max-exp",
                      className: "text-xs font-medium",
                      children: "Max Experience (years)",
                    }),
                    /* @__PURE__ */ jsx(Input, {
                      id: "mentor-filter-max-exp",
                      type: "number",
                      min: 0,
                      placeholder: "Any",
                      value: maxExpInput,
                      onChange: (e) => setMaxExpInput(e.target.value),
                      className: "h-9",
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ jsxs("div", {
              className:
                "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
              children: [
                /* @__PURE__ */ jsxs("div", {
                  className: "flex flex-wrap gap-2 items-end",
                  children: [
                    /* @__PURE__ */ jsxs("div", {
                      className: "space-y-1.5",
                      children: [
                        /* @__PURE__ */ jsx(Label$1, {
                          className: "text-xs font-medium",
                          children: "Sort by",
                        }),
                        /* @__PURE__ */ jsxs(Select$1, {
                          value: filters.sortBy ?? "__none__",
                          onValueChange: (v) =>
                            onFilterChange({
                              sortBy: v === "__none__" ? void 0 : v,
                              pageNumber: 1,
                            }),
                          children: [
                            /* @__PURE__ */ jsx(SelectTrigger, {
                              className: "h-9 w-36",
                              children: /* @__PURE__ */ jsx(SelectValue, {
                                placeholder: "Default",
                              }),
                            }),
                            /* @__PURE__ */ jsxs(SelectContent, {
                              children: [
                                /* @__PURE__ */ jsx(SelectItem, {
                                  value: "__none__",
                                  children: "Default",
                                }),
                                SORT_OPTIONS.map((opt) =>
                                  /* @__PURE__ */ jsx(
                                    SelectItem,
                                    {
                                      value: opt.value,
                                      children: opt.label,
                                    },
                                    opt.value,
                                  ),
                                ),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    filters.sortBy &&
                      /* @__PURE__ */ jsxs("div", {
                        className: "space-y-1.5",
                        children: [
                          /* @__PURE__ */ jsx(Label$1, {
                            className: "text-xs font-medium",
                            children: "Order",
                          }),
                          /* @__PURE__ */ jsxs(Button, {
                            variant: "outline",
                            size: "default",
                            className: "h-9 gap-1.5",
                            onClick: () =>
                              onFilterChange({
                                sortOrder:
                                  filters.sortOrder === "asc" ? "desc" : "asc",
                                pageNumber: 1,
                              }),
                            children: [
                              /* @__PURE__ */ jsx(ArrowUpDown, {
                                className: "size-3.5",
                              }),
                              filters.sortOrder === "desc" ? "Desc" : "Asc",
                            ],
                          }),
                        ],
                      }),
                  ],
                }),
                activeFilterCount > 0 &&
                  /* @__PURE__ */ jsxs(Button, {
                    variant: "ghost",
                    size: "sm",
                    onClick: clearAllFilters,
                    className:
                      "gap-1.5 text-muted-foreground hover:text-foreground self-end",
                    children: [
                      /* @__PURE__ */ jsx(X, { className: "size-3.5" }),
                      "Clear filters",
                    ],
                  }),
              ],
            }),
          ],
        }),
      (filters.searchTerm ||
        filters.minBasePrice != null ||
        filters.maxBasePrice != null ||
        filters.minExperienceYears != null ||
        filters.maxExperienceYears != null) &&
        /* @__PURE__ */ jsxs("div", {
          className: "flex flex-wrap gap-2",
          children: [
            filters.searchTerm &&
              /* @__PURE__ */ jsxs(Badge, {
                variant: "secondary",
                className: "gap-1 text-xs",
                children: [
                  "Search: ",
                  filters.searchTerm,
                  /* @__PURE__ */ jsx("button", {
                    onClick: () => {
                      setSearchInput("");
                      onFilterChange({
                        searchTerm: void 0,
                        pageNumber: 1,
                      });
                    },
                    className: "ml-1 hover:text-foreground",
                    "aria-label": "Clear search filter",
                    children: /* @__PURE__ */ jsx(X, { className: "size-3" }),
                  }),
                ],
              }),
            filters.minBasePrice != null &&
              /* @__PURE__ */ jsxs(Badge, {
                variant: "secondary",
                className: "gap-1 text-xs",
                children: [
                  "Min price: ",
                  filters.minBasePrice.toLocaleString(),
                  /* @__PURE__ */ jsx("button", {
                    onClick: () =>
                      onFilterChange({
                        minBasePrice: void 0,
                        pageNumber: 1,
                      }),
                    className: "ml-1 hover:text-foreground",
                    "aria-label": "Clear min price filter",
                    children: /* @__PURE__ */ jsx(X, { className: "size-3" }),
                  }),
                ],
              }),
            filters.maxBasePrice != null &&
              /* @__PURE__ */ jsxs(Badge, {
                variant: "secondary",
                className: "gap-1 text-xs",
                children: [
                  "Max price: ",
                  filters.maxBasePrice.toLocaleString(),
                  /* @__PURE__ */ jsx("button", {
                    onClick: () =>
                      onFilterChange({
                        maxBasePrice: void 0,
                        pageNumber: 1,
                      }),
                    className: "ml-1 hover:text-foreground",
                    "aria-label": "Clear max price filter",
                    children: /* @__PURE__ */ jsx(X, { className: "size-3" }),
                  }),
                ],
              }),
            filters.minExperienceYears != null &&
              /* @__PURE__ */ jsxs(Badge, {
                variant: "secondary",
                className: "gap-1 text-xs",
                children: [
                  "Min exp: ",
                  filters.minExperienceYears,
                  "y",
                  /* @__PURE__ */ jsx("button", {
                    onClick: () =>
                      onFilterChange({
                        minExperienceYears: void 0,
                        pageNumber: 1,
                      }),
                    className: "ml-1 hover:text-foreground",
                    "aria-label": "Clear min experience filter",
                    children: /* @__PURE__ */ jsx(X, { className: "size-3" }),
                  }),
                ],
              }),
            filters.maxExperienceYears != null &&
              /* @__PURE__ */ jsxs(Badge, {
                variant: "secondary",
                className: "gap-1 text-xs",
                children: [
                  "Max exp: ",
                  filters.maxExperienceYears,
                  "y",
                  /* @__PURE__ */ jsx("button", {
                    onClick: () =>
                      onFilterChange({
                        maxExperienceYears: void 0,
                        pageNumber: 1,
                      }),
                    className: "ml-1 hover:text-foreground",
                    "aria-label": "Clear max experience filter",
                    children: /* @__PURE__ */ jsx(X, { className: "size-3" }),
                  }),
                ],
              }),
          ],
        }),
    ],
  });
}
//#endregion
//#region app/components/ui/skeleton.tsx
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", {
    "data-slot": "skeleton",
    className: cn("animate-pulse rounded-md bg-muted", className),
    ...props,
  });
}
//#endregion
//#region app/components/ui/card.tsx
function Card({ className, size = "default", ...props }) {
  return /* @__PURE__ */ jsx("div", {
    "data-slot": "card",
    "data-size": size,
    className: cn(
      "group/card flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
      className,
    ),
    ...props,
  });
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", {
    "data-slot": "card-header",
    className: cn(
      "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-4 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
      className,
    ),
    ...props,
  });
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", {
    "data-slot": "card-title",
    className: cn(
      "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
      className,
    ),
    ...props,
  });
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", {
    "data-slot": "card-content",
    className: cn("px-4 group-data-[size=sm]/card:px-3", className),
    ...props,
  });
}
function CardFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", {
    "data-slot": "card-footer",
    className: cn(
      "flex items-center rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/card:p-3",
      className,
    ),
    ...props,
  });
}
//#endregion
//#region app/components/shared/mentor/mentor-public-card.tsx
/**
 * Public-facing mentor card for grid display.
 * Shows avatar, name, specialization, experience, and price.
 */
function MentorPublicCard({ mentor, onViewDetail, className }) {
  const initials = mentor.displayName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(mentor.basePrice);
  return /* @__PURE__ */ jsxs(Card, {
    className: cn(
      "group flex flex-col overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer",
      className,
    ),
    onClick: () => onViewDetail?.(mentor),
    role: "button",
    tabIndex: 0,
    onKeyDown: (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onViewDetail?.(mentor);
      }
    },
    "aria-label": `View ${mentor.displayName}'s profile`,
    children: [
      /* @__PURE__ */ jsxs(CardContent, {
        className: "flex flex-col items-center gap-4 p-6 pb-4 flex-1",
        children: [
          /* @__PURE__ */ jsxs("div", {
            className: "relative",
            children: [
              /* @__PURE__ */ jsxs(Avatar$1, {
                size: "lg",
                className:
                  "size-20 ring-2 ring-border ring-offset-2 ring-offset-background",
                children: [
                  /* @__PURE__ */ jsx(AvatarImage, {
                    src: mentor.avatarUrl ?? void 0,
                    alt: mentor.displayName,
                  }),
                  /* @__PURE__ */ jsx(AvatarFallback, {
                    className: "text-lg font-semibold",
                    children: initials,
                  }),
                ],
              }),
              mentor.isActive &&
                /* @__PURE__ */ jsx("span", {
                  className:
                    "absolute bottom-0.5 right-0.5 size-3.5 rounded-full bg-green-500 ring-2 ring-background",
                  "aria-label": "Active",
                  title: "Active",
                }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "text-center space-y-1 w-full",
            children: [
              /* @__PURE__ */ jsx("h3", {
                className:
                  "font-semibold text-base leading-tight line-clamp-1 group-hover:text-primary transition-colors",
                children: mentor.displayName,
              }),
              mentor.specialization &&
                /* @__PURE__ */ jsx("p", {
                  className: "text-sm text-muted-foreground line-clamp-1",
                  children: mentor.specialization,
                }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-center gap-4 w-full text-sm",
            children: [
              /* @__PURE__ */ jsxs("div", {
                className: "flex items-center gap-1.5 text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsx(Briefcase, {
                    className: "size-3.5 shrink-0",
                  }),
                  /* @__PURE__ */ jsxs("span", {
                    children: [mentor.experienceYears, "y exp"],
                  }),
                ],
              }),
              /* @__PURE__ */ jsx("div", { className: "w-px h-4 bg-border" }),
              /* @__PURE__ */ jsxs("div", {
                className:
                  "flex items-center gap-1.5 font-medium text-foreground",
                children: [
                  /* @__PURE__ */ jsx(DollarSign, {
                    className: "size-3.5 shrink-0 text-muted-foreground",
                  }),
                  /* @__PURE__ */ jsx("span", {
                    className: "line-clamp-1",
                    children: formattedPrice,
                  }),
                ],
              }),
            ],
          }),
          mentor.bio &&
            /* @__PURE__ */ jsx("p", {
              className:
                "text-xs text-muted-foreground text-center line-clamp-2 leading-relaxed",
              children: mentor.bio,
            }),
        ],
      }),
      /* @__PURE__ */ jsx(CardFooter, {
        className: "p-4 pt-0",
        children: /* @__PURE__ */ jsxs(Button, {
          variant: "outline",
          size: "sm",
          className:
            "w-full gap-1.5 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors",
          onClick: (e) => {
            e.stopPropagation();
            onViewDetail?.(mentor);
          },
          tabIndex: -1,
          children: [
            /* @__PURE__ */ jsx(Star, { className: "size-3.5" }),
            "View Profile",
          ],
        }),
      }),
    ],
  });
}
//#endregion
//#region app/components/shared/mentor/mentor-public-grid.tsx
var SKELETON_COUNT = 9;
function MentorCardSkeleton() {
  return /* @__PURE__ */ jsxs(Card, {
    className: "flex flex-col overflow-hidden",
    children: [
      /* @__PURE__ */ jsxs(CardContent, {
        className: "flex flex-col items-center gap-4 p-6 pb-4",
        children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "size-20 rounded-full" }),
          /* @__PURE__ */ jsxs("div", {
            className: "space-y-2 w-full text-center",
            children: [
              /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-3/4 mx-auto" }),
              /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-1/2 mx-auto" }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-4 w-full justify-center",
            children: [
              /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-16" }),
              /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-20" }),
            ],
          }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-full" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-4/5" }),
        ],
      }),
      /* @__PURE__ */ jsx(CardFooter, {
        className: "p-4 pt-0",
        children: /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-full" }),
      }),
    ],
  });
}
/**
 * Responsive grid for displaying mentor cards.
 * 1 column on mobile, 2 on tablet, 3 on desktop.
 */
function MentorPublicGrid({
  mentors,
  isLoading = false,
  onViewDetail,
  className,
}) {
  if (isLoading)
    return /* @__PURE__ */ jsx("div", {
      className: cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className,
      ),
      "aria-busy": "true",
      "aria-label": "Loading mentors",
      children: Array.from({ length: SKELETON_COUNT }).map((_, i) =>
        /* @__PURE__ */ jsx(MentorCardSkeleton, {}, i),
      ),
    });
  if (mentors.length === 0)
    return /* @__PURE__ */ jsxs("div", {
      className: cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center",
        className,
      ),
      children: [
        /* @__PURE__ */ jsx(Users, {
          className: "mb-4 size-10 text-muted-foreground/50",
        }),
        /* @__PURE__ */ jsx("p", {
          className: "text-sm font-medium text-muted-foreground",
          children: "No mentors found",
        }),
        /* @__PURE__ */ jsx("p", {
          className: "mt-1 text-xs text-muted-foreground/70",
          children: "Try adjusting your filters or search term",
        }),
      ],
    });
  return /* @__PURE__ */ jsx("div", {
    className: cn(
      "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
      className,
    ),
    children: mentors.map((mentor) =>
      /* @__PURE__ */ jsx(
        MentorPublicCard,
        {
          mentor,
          onViewDetail,
        },
        mentor.id,
      ),
    ),
  });
}
//#endregion
//#region app/components/shared/mentor/mentor-list-container.tsx
/**
 * Orchestrator component for the public/user mentor listing.
 * Manages URL-driven filter + pagination state, fetches data,
 * and renders the filter panel, grid, and pagination.
 */
function MentorListContainer({ detailBasePath, defaultPageSize = 9 }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const rawFilters = parseMentorFilters(searchParams);
  const filters = {
    ...rawFilters,
    pageSize:
      rawFilters.pageSize === 20 ? defaultPageSize : rawFilters.pageSize,
  };
  const { data, isPending } = useMentorsQuery(filters);
  const mentors = data?.items ?? [];
  function updateFilters(patch) {
    const merged = {
      ...filters,
      ...patch,
    };
    if (merged.pageSize === defaultPageSize) merged.pageSize = 20;
    setSearchParams(serializeMentorFilters(merged), { replace: true });
  }
  function handleViewDetail(mentor) {
    navigate(`${detailBasePath}/${mentor.id}`);
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsx(MentorFilterPanel, {
        filters,
        onFilterChange: updateFilters,
      }),
      !isPending &&
        data &&
        /* @__PURE__ */ jsx("p", {
          className: "text-sm text-muted-foreground",
          children:
            data.totalCount === 0
              ? "No mentors found"
              : `${data.totalCount} mentor${data.totalCount !== 1 ? "s" : ""} found`,
        }),
      /* @__PURE__ */ jsx(MentorPublicGrid, {
        mentors,
        isLoading: isPending,
        onViewDetail: handleViewDetail,
      }),
      data &&
        data.totalPages > 1 &&
        /* @__PURE__ */ jsx(DataTablePagination, {
          pageNumber: data.pageNumber,
          pageSize: data.pageSize,
          totalPages: data.totalPages,
          totalCount: data.totalCount,
          hasPreviousPage: data.hasPreviousPage,
          hasNextPage: data.hasNextPage,
          onPageChange: (p) => updateFilters({ pageNumber: p }),
          onPageSizeChange: (s) =>
            updateFilters({
              pageSize: s,
              pageNumber: 1,
            }),
        }),
    ],
  });
}
//#endregion
//#region app/routes/public/mentors.tsx
var mentors_exports$1 = /* @__PURE__ */ __exportAll({
  default: () => mentors_default$1,
  meta: () => meta$25,
});
function meta$25() {
  return [
    { title: "Find Mentors — MiniBooking" },
    {
      name: "description",
      content:
        "Browse and connect with expert mentors. Filter by specialization, experience, and price.",
    },
  ];
}
var mentors_default$1 = UNSAFE_withComponentProps(function PublicMentors() {
  return /* @__PURE__ */ jsxs("div", {
    className: "container mx-auto px-4 py-10 space-y-8",
    children: [
      /* @__PURE__ */ jsxs("div", {
        className: "space-y-2",
        children: [
          /* @__PURE__ */ jsx("h1", {
            className: "text-3xl font-bold tracking-tight",
            children: "Find a Mentor",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-muted-foreground text-lg",
            children:
              "Browse our expert mentors and book a session that fits your goals.",
          }),
        ],
      }),
      /* @__PURE__ */ jsx(MentorListContainer, {
        detailBasePath: "/mentors",
        defaultPageSize: 9,
      }),
    ],
  });
});
//#endregion
//#region app/hooks/mentor/use-mentor-detail-query.ts
/**
 * Fetches a single mentor's full detail (profile + skills + slots).
 * staleTime is 60s for detail — slightly longer than list since it's
 * less likely to change while the admin is viewing it.
 */
function useMentorDetailQuery(id) {
  return useQuery({
    queryKey: queryKeys.mentors.detail(id),
    queryFn: () => mentorService.getMentorDetail(id),
    staleTime: 6e4,
    enabled: !!id,
  });
}
//#endregion
//#region app/components/ui/dialog.tsx
function Dialog$1({ ...props }) {
  return /* @__PURE__ */ jsx(Dialog.Root, {
    "data-slot": "dialog",
    ...props,
  });
}
function DialogPortal({ ...props }) {
  return /* @__PURE__ */ jsx(Dialog.Portal, {
    "data-slot": "dialog-portal",
    ...props,
  });
}
function DialogOverlay({ className, ...props }) {
  return /* @__PURE__ */ jsx(Dialog.Overlay, {
    "data-slot": "dialog-overlay",
    className: cn(
      "fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
      className,
    ),
    ...props,
  });
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(DialogPortal, {
    children: [
      /* @__PURE__ */ jsx(DialogOverlay, {}),
      /* @__PURE__ */ jsxs(Dialog.Content, {
        "data-slot": "dialog-content",
        className: cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className,
        ),
        ...props,
        children: [
          children,
          showCloseButton &&
            /* @__PURE__ */ jsx(Dialog.Close, {
              "data-slot": "dialog-close",
              asChild: true,
              children: /* @__PURE__ */ jsxs(Button, {
                variant: "ghost",
                className: "absolute top-2 right-2",
                size: "icon-sm",
                children: [
                  /* @__PURE__ */ jsx(XIcon, {}),
                  /* @__PURE__ */ jsx("span", {
                    className: "sr-only",
                    children: "Close",
                  }),
                ],
              }),
            }),
        ],
      }),
    ],
  });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", {
    "data-slot": "dialog-header",
    className: cn("flex flex-col gap-2", className),
    ...props,
  });
}
function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs("div", {
    "data-slot": "dialog-footer",
    className: cn(
      "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
      className,
    ),
    ...props,
    children: [
      children,
      showCloseButton &&
        /* @__PURE__ */ jsx(Dialog.Close, {
          asChild: true,
          children: /* @__PURE__ */ jsx(Button, {
            variant: "outline",
            children: "Close",
          }),
        }),
    ],
  });
}
function DialogTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(Dialog.Title, {
    "data-slot": "dialog-title",
    className: cn("font-heading text-base leading-none font-medium", className),
    ...props,
  });
}
function DialogDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(Dialog.Description, {
    "data-slot": "dialog-description",
    className: cn(
      "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
      className,
    ),
    ...props,
  });
}
//#endregion
//#region app/components/ui/textarea.tsx
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsx("textarea", {
    "data-slot": "textarea",
    className: cn(
      "flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
      className,
    ),
    ...props,
  });
}
//#endregion
//#region app/services/booking/booking.service.ts
var bookingService = {
  async createBooking(params) {
    return (
      await apiClient.post(
        "/api/Booking",
        {
          userId: params.userId,
          mentorSlotId: params.mentorSlotId,
          notes: params.notes,
        },
        {
          headers: params.idempotencyKey
            ? { "Idempotency-Key": params.idempotencyKey }
            : void 0,
        },
      )
    ).data.data;
  },
  async getUserBookings(userId, params = {}) {
    return (await apiClient.get(`/api/Booking/${userId}`, { params })).data
      .data;
  },
  async getBookingDetail(bookingId) {
    return (await apiClient.get(`/api/Booking/${bookingId}/detail`)).data.data;
  },
  async cancelBooking(params) {
    return (await apiClient.post("/api/Booking/cancel", params)).data.data;
  },
};
//#endregion
//#region app/hooks/booking/use-create-booking-mutation.ts
function useCreateBookingMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (params) => bookingService.createBooking(params),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.mentors.details() });
      qc.invalidateQueries({ queryKey: queryKeys.bookings.all() });
    },
  });
}
//#endregion
//#region app/hooks/booking/use-user-bookings-query.ts
function useUserBookingsQuery(userId, filters = {}) {
  return useQuery({
    queryKey: queryKeys.bookings.list({ ...filters }),
    queryFn: () => bookingService.getUserBookings(userId, filters),
    placeholderData: keepPreviousData,
    enabled: !!userId,
  });
}
//#endregion
//#region app/components/shared/booking/booking-confirm-dialog.tsx
function formatSlotTime$4(iso) {
  return new Date(iso).toLocaleString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
function formatPrice$8(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}
function BookingConfirmDialog({ open, onOpenChange, slot, mentorName }) {
  const navigate = useNavigate();
  const [notes, setNotes] = useState("");
  const user = useAuthStore((s) => s.user);
  const createBooking = useCreateBookingMutation();
  function handleConfirm() {
    if (!user) {
      toast.error("Please sign in to book a session.");
      return;
    }
    const idempotencyKey = `${user.userId}:${slot.id}`;
    createBooking.mutate(
      {
        userId: user.userId,
        mentorSlotId: slot.id,
        notes: notes.trim() || void 0,
        idempotencyKey,
      },
      {
        onSuccess: (bookingId) => {
          toast.success("Booking created! Redirecting to payment...");
          onOpenChange(false);
          setNotes("");
          navigate(`/user/bookings/${bookingId}/payment`);
        },
        onError: (error) => {
          const apiError = error;
          if (
            apiError?.statusCode === 409 ||
            apiError?.message
              ?.toLowerCase()
              .includes("already have an active booking")
          ) {
            toast.info(
              "You already have a pending booking for this slot. Redirecting to payment...",
            );
            onOpenChange(false);
            navigate("/user/bookings?status=pending");
          } else toast.error(getApiErrorMessage(error));
        },
      },
    );
  }
  return /* @__PURE__ */ jsx(Dialog$1, {
    open,
    onOpenChange,
    children: /* @__PURE__ */ jsxs(DialogContent, {
      className: "sm:max-w-md",
      children: [
        /* @__PURE__ */ jsxs(DialogHeader, {
          children: [
            /* @__PURE__ */ jsx(DialogTitle, { children: "Confirm Booking" }),
            /* @__PURE__ */ jsxs(DialogDescription, {
              children: [
                "You are about to book a session with ",
                mentorName,
                ".",
              ],
            }),
          ],
        }),
        /* @__PURE__ */ jsxs("div", {
          className: "space-y-4 py-2",
          children: [
            /* @__PURE__ */ jsxs("div", {
              className: "rounded-lg border bg-muted/50 p-4 space-y-3",
              children: [
                /* @__PURE__ */ jsxs("div", {
                  className: "flex items-center gap-2 text-sm",
                  children: [
                    /* @__PURE__ */ jsx(CalendarDays, {
                      className: "size-4 text-muted-foreground",
                    }),
                    /* @__PURE__ */ jsx("span", {
                      className: "font-medium",
                      children: "Session Time",
                    }),
                  ],
                }),
                /* @__PURE__ */ jsxs("div", {
                  className: "pl-6 space-y-1 text-sm text-muted-foreground",
                  children: [
                    /* @__PURE__ */ jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsx(Clock, { className: "size-3.5" }),
                        /* @__PURE__ */ jsx("span", {
                          children: formatSlotTime$4(slot.startTime),
                        }),
                      ],
                    }),
                    /* @__PURE__ */ jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsx(Clock, { className: "size-3.5" }),
                        /* @__PURE__ */ jsx("span", {
                          children: formatSlotTime$4(slot.endTime),
                        }),
                      ],
                    }),
                  ],
                }),
                /* @__PURE__ */ jsxs("div", {
                  className: "flex items-center gap-2 pl-6 text-sm font-medium",
                  children: [
                    /* @__PURE__ */ jsx(DollarSign, {
                      className: "size-3.5 text-muted-foreground",
                    }),
                    /* @__PURE__ */ jsx("span", {
                      children: formatPrice$8(slot.price),
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [
                /* @__PURE__ */ jsx(Label$1, {
                  htmlFor: "booking-notes",
                  className: "text-sm",
                  children: "Notes (optional)",
                }),
                /* @__PURE__ */ jsx(Textarea, {
                  id: "booking-notes",
                  placeholder:
                    "Any specific topics or questions you'd like to discuss...",
                  value: notes,
                  onChange: (e) => setNotes(e.target.value),
                  rows: 3,
                  className: "resize-none",
                }),
              ],
            }),
          ],
        }),
        /* @__PURE__ */ jsxs(DialogFooter, {
          className: "gap-2 sm:gap-0",
          children: [
            /* @__PURE__ */ jsx(Button, {
              variant: "outline",
              onClick: () => onOpenChange(false),
              disabled: createBooking.isPending,
              children: "Cancel",
            }),
            /* @__PURE__ */ jsxs(Button, {
              onClick: handleConfirm,
              disabled: createBooking.isPending,
              children: [
                createBooking.isPending &&
                  /* @__PURE__ */ jsx(Loader2, {
                    className: "size-4 animate-spin",
                  }),
                "Confirm Booking",
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
//#endregion
//#region app/types/mentor/mentor.ts
var SLOT_STATUS = {
  Available: 1,
  FullyBooked: 2,
  Blocked: 3,
  Cancelled: 4,
  Completed: 5,
};
var SLOT_STATUS_LABEL = {
  1: "Available",
  2: "Fully Booked",
  3: "Blocked",
  4: "Cancelled",
  5: "Completed",
};
//#endregion
//#region app/components/shared/mentor/mentor-detail-view.tsx
function formatPrice$7(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}
function formatSlotTime$3(iso) {
  return new Date(iso).toLocaleString("vi-VN", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
function SlotCard({ slot, context, onBook }) {
  const isAvailable = slot.status === SLOT_STATUS.Available;
  const isFull = slot.currentBookings >= slot.maxBookings;
  const spotsLeft = slot.maxBookings - slot.currentBookings;
  const statusVariant = {
    [SLOT_STATUS.Available]: "default",
    [SLOT_STATUS.FullyBooked]: "secondary",
    [SLOT_STATUS.Blocked]: "outline",
    [SLOT_STATUS.Cancelled]: "destructive",
    [SLOT_STATUS.Completed]: "outline",
  };
  return /* @__PURE__ */ jsxs("div", {
    className: cn(
      "flex flex-col gap-2 rounded-lg border p-4 transition-colors sm:flex-row sm:items-center sm:justify-between",
      isAvailable ? "hover:bg-muted/50" : "opacity-60",
    ),
    children: [
      /* @__PURE__ */ jsxs("div", {
        className: "space-y-1",
        children: [
          /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-2 text-sm font-medium",
            children: [
              /* @__PURE__ */ jsx(Clock, {
                className: "size-3.5 text-muted-foreground",
              }),
              /* @__PURE__ */ jsx("span", {
                children: formatSlotTime$3(slot.startTime),
              }),
              /* @__PURE__ */ jsx("span", {
                className: "text-muted-foreground",
                children: "—",
              }),
              /* @__PURE__ */ jsx("span", {
                children: formatSlotTime$3(slot.endTime),
              }),
            ],
          }),
          slot.description &&
            /* @__PURE__ */ jsx("p", {
              className: "text-xs text-muted-foreground",
              children: slot.description,
            }),
          /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-3 text-xs text-muted-foreground",
            children: [
              /* @__PURE__ */ jsx("span", {
                className: "font-medium text-foreground",
                children: formatPrice$7(slot.price),
              }),
              /* @__PURE__ */ jsx(Badge, {
                variant: statusVariant[slot.status] ?? "secondary",
                className: "text-xs",
                children: SLOT_STATUS_LABEL[slot.status] ?? "Unknown",
              }),
              isAvailable &&
                /* @__PURE__ */ jsx("span", {
                  children: isFull
                    ? /* @__PURE__ */ jsx(Badge, {
                        variant: "secondary",
                        className: "text-xs",
                        children: "Full",
                      })
                    : /* @__PURE__ */ jsxs("span", {
                        children: [
                          spotsLeft,
                          " spot",
                          spotsLeft !== 1 ? "s" : "",
                          " left",
                        ],
                      }),
                }),
            ],
          }),
        ],
      }),
      context === "user" &&
        isAvailable &&
        !isFull &&
        /* @__PURE__ */ jsx(Button, {
          size: "sm",
          className: "shrink-0 self-end sm:self-auto",
          onClick: () => onBook?.(slot),
          children: "Book",
        }),
    ],
  });
}
function DetailSkeleton() {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-32" }),
      /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col gap-6 lg:flex-row",
        children: [
          /* @__PURE__ */ jsxs("div", {
            className: "flex-1 space-y-4",
            children: [
              /* @__PURE__ */ jsxs("div", {
                className: "flex items-center gap-4",
                children: [
                  /* @__PURE__ */ jsx(Skeleton, {
                    className: "size-20 rounded-full",
                  }),
                  /* @__PURE__ */ jsxs("div", {
                    className: "space-y-2",
                    children: [
                      /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-48" }),
                      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-32" }),
                      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-40" }),
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ jsx(Skeleton, { className: "h-24 w-full" }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "w-full space-y-3 lg:w-80",
            children: [
              /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" }),
              /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" }),
              /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" }),
            ],
          }),
        ],
      }),
    ],
  });
}
function MentorDetailView({ mentorId, context }) {
  const navigate = useNavigate();
  const { data: mentor, isPending, isError } = useMentorDetailQuery(mentorId);
  const [bookingSlot, setBookingSlot] = useState(null);
  const backPath = context === "user" ? "/user/mentors" : "/mentors";
  if (isPending) return /* @__PURE__ */ jsx(DetailSkeleton, {});
  if (isError || !mentor)
    return /* @__PURE__ */ jsxs("div", {
      className: "flex flex-col items-center justify-center py-16 text-center",
      children: [
        /* @__PURE__ */ jsx(User, {
          className: "mb-4 size-10 text-muted-foreground/50",
        }),
        /* @__PURE__ */ jsx("p", {
          className: "text-sm font-medium text-muted-foreground",
          children: "Mentor not found or failed to load.",
        }),
        /* @__PURE__ */ jsx(Button, {
          variant: "outline",
          size: "sm",
          className: "mt-4",
          onClick: () => navigate(backPath),
          children: "Back to Mentors",
        }),
      ],
    });
  const initials =
    (mentor.displayName ?? "")
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";
  const availableSlots = mentor.slots.filter(
    (s) => s.status === SLOT_STATUS.Available,
  );
  const allSlots = mentor.slots;
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxs(Button, {
        variant: "ghost",
        size: "sm",
        className: "gap-1.5 text-muted-foreground hover:text-foreground",
        onClick: () => navigate(backPath),
        children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "size-4" }),
          "Back to Mentors",
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col gap-6 lg:flex-row",
        children: [
          /* @__PURE__ */ jsxs("div", {
            className: "flex-1 space-y-6",
            children: [
              /* @__PURE__ */ jsx(Card, {
                children: /* @__PURE__ */ jsx(CardContent, {
                  className: "p-6",
                  children: /* @__PURE__ */ jsxs("div", {
                    className:
                      "flex flex-col items-center gap-4 sm:flex-row sm:items-start",
                    children: [
                      /* @__PURE__ */ jsxs("div", {
                        className: "relative shrink-0",
                        children: [
                          /* @__PURE__ */ jsxs(Avatar$1, {
                            className:
                              "size-20 ring-2 ring-border ring-offset-2 ring-offset-background",
                            children: [
                              /* @__PURE__ */ jsx(AvatarImage, {
                                src: mentor.avatarUrl ?? void 0,
                                alt: mentor.displayName,
                              }),
                              /* @__PURE__ */ jsx(AvatarFallback, {
                                className: "text-lg font-semibold",
                                children: initials,
                              }),
                            ],
                          }),
                          mentor.isActive &&
                            /* @__PURE__ */ jsx("span", {
                              className:
                                "absolute bottom-1 right-1 size-3.5 rounded-full bg-green-500 ring-2 ring-background",
                            }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs("div", {
                        className: "min-w-0 flex-1 text-center sm:text-left",
                        children: [
                          /* @__PURE__ */ jsxs("div", {
                            className:
                              "flex flex-wrap items-center justify-center gap-2 sm:justify-start",
                            children: [
                              /* @__PURE__ */ jsx("h1", {
                                className: "text-xl font-semibold",
                                children: mentor.displayName,
                              }),
                              /* @__PURE__ */ jsx(Badge, {
                                variant: mentor.isActive
                                  ? "default"
                                  : "secondary",
                                children: mentor.isActive
                                  ? "Active"
                                  : "Inactive",
                              }),
                            ],
                          }),
                          mentor.specialization &&
                            /* @__PURE__ */ jsx("p", {
                              className: "mt-1 text-sm text-muted-foreground",
                              children: mentor.specialization,
                            }),
                          /* @__PURE__ */ jsxs("div", {
                            className:
                              "mt-3 flex flex-wrap items-center justify-center gap-4 text-sm sm:justify-start",
                            children: [
                              /* @__PURE__ */ jsxs("div", {
                                className:
                                  "flex items-center gap-1.5 text-muted-foreground",
                                children: [
                                  /* @__PURE__ */ jsx(Briefcase, {
                                    className: "size-3.5",
                                  }),
                                  /* @__PURE__ */ jsxs("span", {
                                    children: [
                                      mentor.experienceYears,
                                      " year",
                                      mentor.experienceYears !== 1 ? "s" : "",
                                      " experience",
                                    ],
                                  }),
                                ],
                              }),
                              /* @__PURE__ */ jsxs("div", {
                                className:
                                  "flex items-center gap-1.5 font-medium",
                                children: [
                                  /* @__PURE__ */ jsx(DollarSign, {
                                    className: "size-3.5 text-muted-foreground",
                                  }),
                                  /* @__PURE__ */ jsx("span", {
                                    children: formatPrice$7(mentor.basePrice),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          /* @__PURE__ */ jsxs("div", {
                            className:
                              "mt-3 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground sm:justify-start",
                            children: [
                              /* @__PURE__ */ jsxs("div", {
                                className: "flex items-center gap-1.5",
                                children: [
                                  /* @__PURE__ */ jsx(Mail, {
                                    className: "size-3.5",
                                  }),
                                  /* @__PURE__ */ jsx("span", {
                                    children: mentor.email,
                                  }),
                                ],
                              }),
                              mentor.phoneNumber &&
                                /* @__PURE__ */ jsxs("div", {
                                  className: "flex items-center gap-1.5",
                                  children: [
                                    /* @__PURE__ */ jsx(Phone, {
                                      className: "size-3.5",
                                    }),
                                    /* @__PURE__ */ jsx("span", {
                                      children: mentor.phoneNumber,
                                    }),
                                  ],
                                }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              }),
              mentor.bio &&
                /* @__PURE__ */ jsxs(Card, {
                  children: [
                    /* @__PURE__ */ jsx(CardHeader, {
                      className: "pb-3",
                      children: /* @__PURE__ */ jsx(CardTitle, {
                        className: "text-base",
                        children: "About",
                      }),
                    }),
                    /* @__PURE__ */ jsx(CardContent, {
                      children: /* @__PURE__ */ jsx("p", {
                        className:
                          "text-sm leading-relaxed text-muted-foreground whitespace-pre-line",
                        children: mentor.bio,
                      }),
                    }),
                  ],
                }),
              mentor.skills.length > 0 &&
                /* @__PURE__ */ jsxs(Card, {
                  children: [
                    /* @__PURE__ */ jsx(CardHeader, {
                      className: "pb-3",
                      children: /* @__PURE__ */ jsx(CardTitle, {
                        className: "text-base",
                        children: "Skills",
                      }),
                    }),
                    /* @__PURE__ */ jsx(CardContent, {
                      children: /* @__PURE__ */ jsx("div", {
                        className: "flex flex-wrap gap-2",
                        children: mentor.skills.map((skill) =>
                          /* @__PURE__ */ jsx(
                            Badge,
                            {
                              variant: "secondary",
                              className: "text-sm",
                              children: skill.skillName,
                            },
                            skill.id,
                          ),
                        ),
                      }),
                    }),
                  ],
                }),
            ],
          }),
          /* @__PURE__ */ jsx("div", {
            className: "w-full lg:w-96",
            children: /* @__PURE__ */ jsxs(Card, {
              className: "sticky top-24",
              children: [
                /* @__PURE__ */ jsx(CardHeader, {
                  className: "pb-3",
                  children: /* @__PURE__ */ jsxs(CardTitle, {
                    className: "flex items-center gap-2 text-base",
                    children: [
                      /* @__PURE__ */ jsx(Calendar, { className: "size-4" }),
                      "Sessions",
                      availableSlots.length > 0 &&
                        /* @__PURE__ */ jsxs(Badge, {
                          variant: "default",
                          className: "text-xs",
                          children: [availableSlots.length, " available"],
                        }),
                    ],
                  }),
                }),
                /* @__PURE__ */ jsxs(CardContent, {
                  children: [
                    allSlots.length === 0
                      ? /* @__PURE__ */ jsxs("div", {
                          className: "py-8 text-center",
                          children: [
                            /* @__PURE__ */ jsx(Calendar, {
                              className:
                                "mx-auto mb-3 size-8 text-muted-foreground/50",
                            }),
                            /* @__PURE__ */ jsx("p", {
                              className: "text-sm text-muted-foreground",
                              children: "No sessions scheduled yet.",
                            }),
                            /* @__PURE__ */ jsx("p", {
                              className:
                                "mt-1 text-xs text-muted-foreground/70",
                              children: "Check back later for new openings.",
                            }),
                          ],
                        })
                      : /* @__PURE__ */ jsx("div", {
                          className: "space-y-3",
                          children: allSlots.map((slot) =>
                            /* @__PURE__ */ jsx(
                              SlotCard,
                              {
                                slot,
                                context,
                                onBook: (s) => setBookingSlot(s),
                              },
                              slot.id,
                            ),
                          ),
                        }),
                    context === "public" &&
                      availableSlots.length > 0 &&
                      /* @__PURE__ */ jsxs(Fragment, {
                        children: [
                          /* @__PURE__ */ jsx(Separator$1, {
                            className: "my-4",
                          }),
                          /* @__PURE__ */ jsx(Button, {
                            className: "w-full",
                            asChild: true,
                            children: /* @__PURE__ */ jsx(Link, {
                              to: "/login",
                              children: "Sign in to Book a Session",
                            }),
                          }),
                        ],
                      }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
      context === "user" &&
        bookingSlot &&
        /* @__PURE__ */ jsx(BookingConfirmDialog, {
          open: !!bookingSlot,
          onOpenChange: (open) => !open && setBookingSlot(null),
          slot: bookingSlot,
          mentorName: mentor.displayName,
        }),
    ],
  });
}
//#endregion
//#region app/routes/public/mentor-detail.tsx
var mentor_detail_exports$1 = /* @__PURE__ */ __exportAll({
  default: () => mentor_detail_default$1,
  meta: () => meta$24,
});
function meta$24() {
  return [{ title: "Mentor Profile — MiniBooking" }];
}
var mentor_detail_default$1 = UNSAFE_withComponentProps(
  function PublicMentorDetail({ params }) {
    return /* @__PURE__ */ jsx("div", {
      className: "container mx-auto px-4 py-10",
      children: /* @__PURE__ */ jsx(MentorDetailView, {
        mentorId: params.id,
        context: "public",
      }),
    });
  },
);
//#endregion
//#region app/guards/require-role.ts
var ROLE_REDIRECT$1 = {
  Admin: "/admin",
  Mentor: "/mentor",
  User: "/user",
};
/**
 * clientLoader factory that enforces role-based access control.
 *
 * Usage in a layout route:
 *   export const clientLoader = requireRole("Admin");
 *
 * - Rehydrates the Zustand store from localStorage (SSR-safe).
 * - Redirects to /login if not authenticated.
 * - Throws a 404 if authenticated but missing the required role
 *   (hides the existence of role-restricted routes from other roles).
 */
function requireRole(role) {
  return async function clientLoader() {
    await useAuthStore.persist.rehydrate();
    const { isAuthenticated, user } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect("/login");
    if (!user?.roles.includes(role)) throw data(null, { status: 404 });
    return null;
  };
}
/**
 * Redirects an already-authenticated user to their role's dashboard.
 * Used in public and auth layout loaders.
 */
async function redirectIfAuthenticated() {
  await useAuthStore.persist.rehydrate();
  const { isAuthenticated, user } = useAuthStore.getState();
  if (isAuthenticated && user)
    throw redirect(ROLE_REDIRECT$1[user.roles[0] ?? "User"] ?? "/");
  return null;
}
//#endregion
//#region app/routes/auth/_layout.tsx
var _layout_exports$3 = /* @__PURE__ */ __exportAll({
  HydrateFallback: () => HydrateFallback$3,
  clientLoader: () => clientLoader$3,
  default: () => _layout_default$3,
});
var clientLoader$3 = redirectIfAuthenticated;
var HydrateFallback$3 = UNSAFE_withHydrateFallbackProps(
  function HydrateFallback() {
    return null;
  },
);
var _layout_default$3 = UNSAFE_withComponentProps(function AuthRoutesLayout() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
//#endregion
//#region app/components/layouts/auth/auth.layout.tsx
function AuthLayout({ children, title, description }) {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen grid lg:grid-cols-2",
    children: [
      /* @__PURE__ */ jsxs("div", {
        className:
          "hidden lg:flex flex-col justify-between bg-foreground text-background p-10",
        children: [
          /* @__PURE__ */ jsxs(Link, {
            to: "/",
            className: "flex items-center gap-2 font-semibold text-lg",
            children: [
              /* @__PURE__ */ jsx(CalendarDays, { className: "size-6" }),
              /* @__PURE__ */ jsx("span", { children: "MiniBooking" }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "space-y-4",
            children: [
              /* @__PURE__ */ jsx("blockquote", {
                className: "text-2xl font-medium leading-relaxed",
                children:
                  '"Connect with mentors, schedule sessions, and accelerate your growth — all in one place."',
              }),
              /* @__PURE__ */ jsx("p", {
                className: "text-background/60 text-sm",
                children:
                  "Trusted by over 1,000 students and mentors every day.",
              }),
            ],
          }),
          /* @__PURE__ */ jsxs("p", {
            className: "text-background/40 text-xs",
            children: [
              "© ",
              /* @__PURE__ */ new Date().getFullYear(),
              " MiniBooking. All rights reserved.",
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className:
          "flex flex-col items-center justify-center px-6 py-12 lg:px-10",
        children: [
          /* @__PURE__ */ jsxs(Link, {
            to: "/",
            className:
              "flex items-center gap-2 font-semibold text-lg mb-8 lg:hidden",
            children: [
              /* @__PURE__ */ jsx(CalendarDays, { className: "size-5" }),
              /* @__PURE__ */ jsx("span", { children: "MiniBooking" }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "w-full max-w-sm space-y-6",
            children: [
              /* @__PURE__ */ jsxs("div", {
                className: "space-y-1 text-center",
                children: [
                  /* @__PURE__ */ jsx("h1", {
                    className: "text-2xl font-semibold tracking-tight",
                    children: title,
                  }),
                  /* @__PURE__ */ jsx("p", {
                    className: "text-sm text-muted-foreground",
                    children: description,
                  }),
                ],
              }),
              children,
            ],
          }),
        ],
      }),
    ],
  });
}
//#endregion
//#region app/components/ui/form.tsx
var Form = FormProvider;
var FormFieldContext = React.createContext({});
var FormField = ({ ...props }) => {
  return /* @__PURE__ */ jsx(FormFieldContext.Provider, {
    value: { name: props.name },
    children: /* @__PURE__ */ jsx(Controller, { ...props }),
  });
};
var useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext)
    throw new Error("useFormField should be used within <FormField>");
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};
var FormItemContext = React.createContext({});
function FormItem({ className, ...props }) {
  const id = React.useId();
  return /* @__PURE__ */ jsx(FormItemContext.Provider, {
    value: { id },
    children: /* @__PURE__ */ jsx("div", {
      "data-slot": "form-item",
      className: cn("grid gap-2", className),
      ...props,
    }),
  });
}
function FormLabel({ className, ...props }) {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsx(Label$1, {
    "data-slot": "form-label",
    className: cn(error && "text-destructive", className),
    htmlFor: formItemId,
    ...props,
  });
}
function FormControl({ ...props }) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();
  return /* @__PURE__ */ jsx(Slot.Root, {
    "data-slot": "form-control",
    id: formItemId,
    "aria-describedby": !error
      ? `${formDescriptionId}`
      : `${formDescriptionId} ${formMessageId}`,
    "aria-invalid": !!error,
    ...props,
  });
}
function FormMessage({ className, children, ...props }) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : children;
  if (!body) return null;
  return /* @__PURE__ */ jsx("p", {
    "data-slot": "form-message",
    id: formMessageId,
    className: cn("text-sm font-medium text-destructive", className),
    ...props,
    children: body,
  });
}
//#endregion
//#region app/features/auth/shared/social.form.tsx
function GitHubIcon({ className }) {
  return /* @__PURE__ */ jsx("svg", {
    className,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    children: /* @__PURE__ */ jsx("path", {
      d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
    }),
  });
}
function SocialForm({ action: _action }) {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-4",
    children: [
      /* @__PURE__ */ jsxs("div", {
        className: "flex items-center gap-3",
        children: [
          /* @__PURE__ */ jsx(Separator$1, { className: "flex-1" }),
          /* @__PURE__ */ jsx("span", {
            className: "text-xs text-muted-foreground",
            children: "or continue with",
          }),
          /* @__PURE__ */ jsx(Separator$1, { className: "flex-1" }),
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-2 gap-3",
        children: [
          /* @__PURE__ */ jsxs(Button, {
            type: "button",
            variant: "outline",
            className: "w-full",
            onClick: () => {},
            children: [
              /* @__PURE__ */ jsxs("svg", {
                className: "size-4 mr-2",
                viewBox: "0 0 24 24",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ jsx("path", {
                    d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
                    fill: "#4285F4",
                  }),
                  /* @__PURE__ */ jsx("path", {
                    d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
                    fill: "#34A853",
                  }),
                  /* @__PURE__ */ jsx("path", {
                    d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",
                    fill: "#FBBC05",
                  }),
                  /* @__PURE__ */ jsx("path", {
                    d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
                    fill: "#EA4335",
                  }),
                ],
              }),
              "Google",
            ],
          }),
          /* @__PURE__ */ jsxs(Button, {
            type: "button",
            variant: "outline",
            className: "w-full",
            onClick: () => {},
            children: [
              /* @__PURE__ */ jsx(GitHubIcon, { className: "size-4 mr-2" }),
              "GitHub",
            ],
          }),
        ],
      }),
    ],
  });
}
//#endregion
//#region app/features/auth/login/login.schema.ts
var loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
//#endregion
//#region app/features/auth/login/login.hook.ts
var ROLE_REDIRECT = {
  Admin: "/admin",
  Mentor: "/mentor",
  User: "/user",
};
function useLoginForm() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(data) {
    try {
      const result = await authService.login({
        email: data.email,
        password: data.password,
      });
      setUser({
        userId: result.userId,
        fullName: result.fullName,
        email: result.email,
        phoneNumber: result.phoneNumber,
        roles: result.roles,
        expiresIn: result.expiresIn,
        createdAt: result.createdAt,
      });
      navigate(ROLE_REDIRECT[result.roles[0] ?? "User"] ?? "/");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }
  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
//#endregion
//#region app/features/auth/login/login.form.tsx
function LoginForm() {
  const { form, onSubmit } = useLoginForm();
  const [showPassword, setShowPassword] = useState(false);
  const isSubmitting = form.formState.isSubmitting;
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsx(Form, {
        ...form,
        children: /* @__PURE__ */ jsxs("form", {
          onSubmit,
          className: "space-y-4",
          children: [
            /* @__PURE__ */ jsx(FormField, {
              control: form.control,
              name: "email",
              render: ({ field }) =>
                /* @__PURE__ */ jsxs(FormItem, {
                  children: [
                    /* @__PURE__ */ jsx(FormLabel, { children: "Email" }),
                    /* @__PURE__ */ jsx(FormControl, {
                      children: /* @__PURE__ */ jsx(Input, {
                        type: "email",
                        placeholder: "you@example.com",
                        autoComplete: "email",
                        ...field,
                      }),
                    }),
                    /* @__PURE__ */ jsx(FormMessage, {}),
                  ],
                }),
            }),
            /* @__PURE__ */ jsx(FormField, {
              control: form.control,
              name: "password",
              render: ({ field }) =>
                /* @__PURE__ */ jsxs(FormItem, {
                  children: [
                    /* @__PURE__ */ jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [
                        /* @__PURE__ */ jsx(FormLabel, {
                          children: "Password",
                        }),
                        /* @__PURE__ */ jsx(Link, {
                          to: "/forgot-password",
                          className:
                            "text-xs text-muted-foreground hover:text-foreground transition-colors",
                          children: "Forgot password?",
                        }),
                      ],
                    }),
                    /* @__PURE__ */ jsx(FormControl, {
                      children: /* @__PURE__ */ jsxs("div", {
                        className: "relative",
                        children: [
                          /* @__PURE__ */ jsx(Input, {
                            type: showPassword ? "text" : "password",
                            placeholder: "••••••••",
                            autoComplete: "current-password",
                            ...field,
                          }),
                          /* @__PURE__ */ jsx("button", {
                            type: "button",
                            onClick: () => setShowPassword((v) => !v),
                            className:
                              "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                            "aria-label": showPassword
                              ? "Hide password"
                              : "Show password",
                            children: showPassword
                              ? /* @__PURE__ */ jsx(EyeOff, {
                                  className: "size-4",
                                })
                              : /* @__PURE__ */ jsx(Eye, {
                                  className: "size-4",
                                }),
                          }),
                        ],
                      }),
                    }),
                    /* @__PURE__ */ jsx(FormMessage, {}),
                  ],
                }),
            }),
            /* @__PURE__ */ jsxs(Button, {
              type: "submit",
              className: "w-full",
              disabled: isSubmitting,
              children: [
                isSubmitting &&
                  /* @__PURE__ */ jsx(Loader2, {
                    className: "mr-2 size-4 animate-spin",
                  }),
                "Sign In",
              ],
            }),
          ],
        }),
      }),
      /* @__PURE__ */ jsx(SocialForm, { action: "login" }),
      /* @__PURE__ */ jsxs("p", {
        className: "text-center text-sm text-muted-foreground",
        children: [
          "Don't have an account?",
          " ",
          /* @__PURE__ */ jsx(Link, {
            to: "/register",
            className:
              "font-medium text-foreground underline-offset-4 hover:underline",
            children: "Sign up now",
          }),
        ],
      }),
    ],
  });
}
//#endregion
//#region app/features/auth/login/login.page.tsx
function meta$23() {
  return [
    { title: "Sign In — MiniBooking" },
    {
      name: "description",
      content: "Sign in to your MiniBooking account",
    },
  ];
}
function LoginPage() {
  return /* @__PURE__ */ jsx(AuthLayout, {
    title: "Welcome Back",
    description: "Sign in to your account to continue",
    children: /* @__PURE__ */ jsx(LoginForm, {}),
  });
}
//#endregion
//#region app/routes/auth/login.tsx
var login_exports = /* @__PURE__ */ __exportAll({
  default: () => LoginPage,
  meta: () => meta$23,
});
var registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Full name must be at least 2 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .regex(
        /^(0|\+84)(3[2-9]|5[25689]|7[06789]|8[1-9]|9[0-9])\d{7}$/,
        "Phone number must be a valid Vietnamese phone number",
      ),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
//#endregion
//#region app/features/auth/register/register.hook.ts
function useRegisterForm() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(data) {
    try {
      await authService.register({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
      });
      toast.success("Account created successfully! Please sign in.");
      navigate("/login");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  }
  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
//#endregion
//#region app/features/auth/register/register.form.tsx
function RegisterForm() {
  const { form, onSubmit } = useRegisterForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const isSubmitting = form.formState.isSubmitting;
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsx(Form, {
        ...form,
        children: /* @__PURE__ */ jsxs("form", {
          onSubmit,
          className: "space-y-4",
          children: [
            /* @__PURE__ */ jsx(FormField, {
              control: form.control,
              name: "fullName",
              render: ({ field }) =>
                /* @__PURE__ */ jsxs(FormItem, {
                  children: [
                    /* @__PURE__ */ jsx(FormLabel, { children: "Full Name" }),
                    /* @__PURE__ */ jsx(FormControl, {
                      children: /* @__PURE__ */ jsx(Input, {
                        placeholder: "John Doe",
                        autoComplete: "name",
                        ...field,
                      }),
                    }),
                    /* @__PURE__ */ jsx(FormMessage, {}),
                  ],
                }),
            }),
            /* @__PURE__ */ jsx(FormField, {
              control: form.control,
              name: "email",
              render: ({ field }) =>
                /* @__PURE__ */ jsxs(FormItem, {
                  children: [
                    /* @__PURE__ */ jsx(FormLabel, { children: "Email" }),
                    /* @__PURE__ */ jsx(FormControl, {
                      children: /* @__PURE__ */ jsx(Input, {
                        type: "email",
                        placeholder: "you@example.com",
                        autoComplete: "email",
                        ...field,
                      }),
                    }),
                    /* @__PURE__ */ jsx(FormMessage, {}),
                  ],
                }),
            }),
            /* @__PURE__ */ jsx(FormField, {
              control: form.control,
              name: "phoneNumber",
              render: ({ field }) =>
                /* @__PURE__ */ jsxs(FormItem, {
                  children: [
                    /* @__PURE__ */ jsx(FormLabel, {
                      children: "Phone Number",
                    }),
                    /* @__PURE__ */ jsx(FormControl, {
                      children: /* @__PURE__ */ jsx(Input, {
                        type: "tel",
                        placeholder: "0912 345 678",
                        autoComplete: "tel",
                        ...field,
                      }),
                    }),
                    /* @__PURE__ */ jsx(FormMessage, {}),
                  ],
                }),
            }),
            /* @__PURE__ */ jsx(FormField, {
              control: form.control,
              name: "password",
              render: ({ field }) =>
                /* @__PURE__ */ jsxs(FormItem, {
                  children: [
                    /* @__PURE__ */ jsx(FormLabel, { children: "Password" }),
                    /* @__PURE__ */ jsx(FormControl, {
                      children: /* @__PURE__ */ jsxs("div", {
                        className: "relative",
                        children: [
                          /* @__PURE__ */ jsx(Input, {
                            type: showPassword ? "text" : "password",
                            placeholder: "At least 8 characters",
                            autoComplete: "new-password",
                            ...field,
                          }),
                          /* @__PURE__ */ jsx("button", {
                            type: "button",
                            onClick: () => setShowPassword((v) => !v),
                            className:
                              "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                            "aria-label": showPassword
                              ? "Hide password"
                              : "Show password",
                            children: showPassword
                              ? /* @__PURE__ */ jsx(EyeOff, {
                                  className: "size-4",
                                })
                              : /* @__PURE__ */ jsx(Eye, {
                                  className: "size-4",
                                }),
                          }),
                        ],
                      }),
                    }),
                    /* @__PURE__ */ jsx(FormMessage, {}),
                  ],
                }),
            }),
            /* @__PURE__ */ jsx(FormField, {
              control: form.control,
              name: "confirmPassword",
              render: ({ field }) =>
                /* @__PURE__ */ jsxs(FormItem, {
                  children: [
                    /* @__PURE__ */ jsx(FormLabel, {
                      children: "Confirm Password",
                    }),
                    /* @__PURE__ */ jsx(FormControl, {
                      children: /* @__PURE__ */ jsxs("div", {
                        className: "relative",
                        children: [
                          /* @__PURE__ */ jsx(Input, {
                            type: showConfirm ? "text" : "password",
                            placeholder: "Re-enter password",
                            autoComplete: "new-password",
                            ...field,
                          }),
                          /* @__PURE__ */ jsx("button", {
                            type: "button",
                            onClick: () => setShowConfirm((v) => !v),
                            className:
                              "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                            "aria-label": showConfirm
                              ? "Hide password"
                              : "Show password",
                            children: showConfirm
                              ? /* @__PURE__ */ jsx(EyeOff, {
                                  className: "size-4",
                                })
                              : /* @__PURE__ */ jsx(Eye, {
                                  className: "size-4",
                                }),
                          }),
                        ],
                      }),
                    }),
                    /* @__PURE__ */ jsx(FormMessage, {}),
                  ],
                }),
            }),
            /* @__PURE__ */ jsxs(Button, {
              type: "submit",
              className: "w-full mt-2",
              disabled: isSubmitting,
              children: [
                isSubmitting &&
                  /* @__PURE__ */ jsx(Loader2, {
                    className: "mr-2 size-4 animate-spin",
                  }),
                "Create Account",
              ],
            }),
          ],
        }),
      }),
      /* @__PURE__ */ jsx(SocialForm, { action: "register" }),
      /* @__PURE__ */ jsxs("p", {
        className: "text-center text-sm text-muted-foreground",
        children: [
          "Already have an account?",
          " ",
          /* @__PURE__ */ jsx(Link, {
            to: "/login",
            className:
              "font-medium text-foreground underline-offset-4 hover:underline",
            children: "Sign in",
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("p", {
        className: "text-center text-xs text-muted-foreground",
        children: [
          "By signing up, you agree to our",
          " ",
          /* @__PURE__ */ jsx("span", {
            className:
              "underline underline-offset-4 cursor-pointer hover:text-foreground transition-colors",
            children: "Terms of Service",
          }),
          " ",
          "and",
          " ",
          /* @__PURE__ */ jsx("span", {
            className:
              "underline underline-offset-4 cursor-pointer hover:text-foreground transition-colors",
            children: "Privacy Policy",
          }),
          ".",
        ],
      }),
    ],
  });
}
//#endregion
//#region app/features/auth/register/register.page.tsx
function meta$22() {
  return [
    { title: "Sign Up — MiniBooking" },
    {
      name: "description",
      content: "Create your free MiniBooking account",
    },
  ];
}
function RegisterPage() {
  return /* @__PURE__ */ jsx(AuthLayout, {
    title: "Create Account",
    description: "Start your mentorship journey completely free",
    children: /* @__PURE__ */ jsx(RegisterForm, {}),
  });
}
//#endregion
//#region app/routes/auth/register.tsx
var register_exports = /* @__PURE__ */ __exportAll({
  default: () => RegisterPage,
  meta: () => meta$22,
});
//#endregion
//#region app/components/layouts/shared/app-sidebar.tsx
function AppSidebar({ navItems, onNavigate }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, clearUser } = useAuthStore();
  const initials = (user?.fullName ?? "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  async function handleLogout() {
    try {
      await authService.logout();
    } catch {
    } finally {
      clearUser();
      navigate("/login");
    }
  }
  function isActive(item) {
    if (item.exact) return location.pathname === item.href;
    return (
      location.pathname === item.href ||
      location.pathname.startsWith(item.href + "/")
    );
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "flex h-full w-[260px] flex-col border-r bg-background",
    children: [
      /* @__PURE__ */ jsxs("div", {
        className: "flex h-16 shrink-0 items-center gap-3 px-5",
        children: [
          /* @__PURE__ */ jsx("div", {
            className:
              "flex size-8 items-center justify-center rounded-lg bg-primary",
            children: /* @__PURE__ */ jsx(CalendarDays, {
              className: "size-4 text-primary-foreground",
            }),
          }),
          /* @__PURE__ */ jsx("span", {
            className: "text-base font-semibold tracking-tight",
            children: "MiniBooking",
          }),
        ],
      }),
      /* @__PURE__ */ jsx(Separator$1, {}),
      /* @__PURE__ */ jsx("nav", {
        className: "flex-1 overflow-y-auto px-3 py-4",
        children: /* @__PURE__ */ jsx("ul", {
          className: "space-y-0.5",
          children: navItems.map((item) => {
            const active = isActive(item);
            return /* @__PURE__ */ jsx(
              "li",
              {
                children: /* @__PURE__ */ jsxs(Link, {
                  to: item.href,
                  onClick: onNavigate,
                  className: cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  ),
                  children: [
                    /* @__PURE__ */ jsx(item.icon, {
                      className: cn(
                        "size-[18px] shrink-0",
                        active ? "text-primary" : "text-muted-foreground",
                      ),
                    }),
                    item.label,
                  ],
                }),
              },
              item.href,
            );
          }),
        }),
      }),
      /* @__PURE__ */ jsx(Separator$1, {}),
      /* @__PURE__ */ jsxs("div", {
        className: "flex items-center gap-3 p-4",
        children: [
          /* @__PURE__ */ jsx(Avatar$1, {
            className: "size-9 shrink-0",
            children: /* @__PURE__ */ jsx(AvatarFallback, {
              className: "bg-primary/10 text-sm font-semibold text-primary",
              children: initials,
            }),
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "min-w-0 flex-1",
            children: [
              /* @__PURE__ */ jsx("p", {
                className: "truncate text-sm font-medium leading-tight",
                children: user?.fullName,
              }),
              /* @__PURE__ */ jsx("p", {
                className: "truncate text-xs text-muted-foreground",
                children: user?.email,
              }),
            ],
          }),
          /* @__PURE__ */ jsx(Button, {
            variant: "ghost",
            size: "icon",
            onClick: handleLogout,
            "aria-label": "Logout",
            className: "shrink-0 text-muted-foreground hover:text-destructive",
            children: /* @__PURE__ */ jsx(LogOut, { className: "size-4" }),
          }),
        ],
      }),
    ],
  });
}
//#endregion
//#region app/components/layouts/shared/app-header.tsx
function AppHeader({ navItems }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const activeItem = navItems.find((item) => {
    if (item.exact) return location.pathname === item.href;
    return (
      location.pathname === item.href ||
      location.pathname.startsWith(item.href + "/")
    );
  });
  return /* @__PURE__ */ jsxs("header", {
    className:
      "flex h-16 shrink-0 items-center gap-3 border-b bg-background px-4 lg:px-6",
    children: [
      /* @__PURE__ */ jsx(Button, {
        variant: "ghost",
        size: "icon",
        className: "lg:hidden",
        onClick: () => setMobileOpen(true),
        "aria-label": "Open menu",
        children: /* @__PURE__ */ jsx(Menu, { className: "size-5" }),
      }),
      /* @__PURE__ */ jsxs(Link, {
        to: "/",
        className: "flex items-center gap-2 font-semibold lg:hidden",
        children: [
          /* @__PURE__ */ jsx("div", {
            className:
              "flex size-7 items-center justify-center rounded-md bg-primary",
            children: /* @__PURE__ */ jsx(CalendarDays, {
              className: "size-3.5 text-primary-foreground",
            }),
          }),
          /* @__PURE__ */ jsx("span", {
            className: "text-sm",
            children: "MiniBooking",
          }),
        ],
      }),
      activeItem &&
        /* @__PURE__ */ jsx("h1", {
          className: "hidden text-sm font-semibold text-foreground lg:block",
          children: activeItem.label,
        }),
      /* @__PURE__ */ jsx(Sheet, {
        open: mobileOpen,
        onOpenChange: setMobileOpen,
        children: /* @__PURE__ */ jsx(SheetContent, {
          side: "left",
          className: "w-[260px] p-0 gap-0",
          showCloseButton: false,
          children: /* @__PURE__ */ jsx(AppSidebar, {
            navItems,
            onNavigate: () => setMobileOpen(false),
          }),
        }),
      }),
    ],
  });
}
//#endregion
//#region app/components/layouts/shared/app-layout.tsx
function AppLayout({ navItems, children }) {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex h-screen overflow-hidden bg-background",
    children: [
      /* @__PURE__ */ jsx("aside", {
        className: "hidden shrink-0 lg:flex",
        children: /* @__PURE__ */ jsx(AppSidebar, { navItems }),
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "flex min-w-0 flex-1 flex-col overflow-hidden",
        children: [
          /* @__PURE__ */ jsx(AppHeader, { navItems }),
          /* @__PURE__ */ jsx("main", {
            className: "flex-1 overflow-y-auto p-4 md:p-6 lg:p-8",
            children,
          }),
        ],
      }),
    ],
  });
}
//#endregion
//#region app/components/layouts/shared/nav-config.ts
var userNavItems = [
  {
    label: "Dashboard",
    href: "/user",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "Find Mentors",
    href: "/user/mentors",
    icon: Users,
  },
  {
    label: "My Bookings",
    href: "/user/bookings",
    icon: CalendarCheck,
  },
  {
    label: "AI Assistant",
    href: "/user/ai-chat",
    icon: Bot,
  },
  {
    label: "Payments",
    href: "/user/payments",
    icon: CreditCard,
  },
  {
    label: "Profile",
    href: "/user/profile",
    icon: UserCircle,
  },
];
var mentorNavItems = [
  {
    label: "Dashboard",
    href: "/mentor",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "My Schedule",
    href: "/mentor/schedule",
    icon: CalendarDays,
  },
  {
    label: "My Skills",
    href: "/mentor/skills",
    icon: GraduationCap,
  },
  {
    label: "Bookings",
    href: "/mentor/bookings",
    icon: BookOpen,
  },
  {
    label: "AI Assistant",
    href: "/mentor/ai-chat",
    icon: Bot,
  },
  {
    label: "Profile",
    href: "/mentor/profile",
    icon: UserCircle,
  },
];
var adminNavItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "Mentors",
    href: "/admin/mentors",
    icon: Users,
  },
  {
    label: "Bookings",
    href: "/admin/bookings",
    icon: CalendarCheck,
  },
  {
    label: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
    label: "System Health",
    href: "/admin/health",
    icon: Activity,
  },
];
//#endregion
//#region app/routes/user/_layout.tsx
var _layout_exports$2 = /* @__PURE__ */ __exportAll({
  HydrateFallback: () => HydrateFallback$2,
  clientLoader: () => clientLoader$2,
  default: () => _layout_default$2,
});
var clientLoader$2 = requireRole("User");
var HydrateFallback$2 = UNSAFE_withHydrateFallbackProps(
  function HydrateFallback() {
    return /* @__PURE__ */ jsx("div", {
      className: "h-screen animate-pulse bg-muted",
    });
  },
);
var _layout_default$2 = UNSAFE_withComponentProps(function UserLayout() {
  return /* @__PURE__ */ jsx(AppLayout, {
    navItems: userNavItems,
    children: /* @__PURE__ */ jsx(Outlet, {}),
  });
});
//#endregion
//#region app/routes/user/dashboard.tsx
var dashboard_exports$2 = /* @__PURE__ */ __exportAll({
  default: () => dashboard_default$2,
  meta: () => meta$21,
});
function meta$21() {
  return [{ title: "Dashboard — MiniBooking" }];
}
var dashboard_default$2 = UNSAFE_withComponentProps(function UserDashboard() {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        children: [
          /* @__PURE__ */ jsxs("h2", {
            className: "text-2xl font-semibold tracking-tight",
            children: ["Welcome back, ", useCurrentUser()?.fullName, " 👋"],
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-muted-foreground",
            children: "Here's what's happening with your sessions.",
          }),
        ],
      }),
      /* @__PURE__ */ jsx("div", {
        className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
        children: [
          {
            label: "Upcoming Bookings",
            value: "—",
          },
          {
            label: "Sessions Completed",
            value: "—",
          },
          {
            label: "Active Mentors",
            value: "—",
          },
        ].map((stat) =>
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "rounded-xl border bg-card p-6 shadow-sm",
              children: [
                /* @__PURE__ */ jsx("p", {
                  className: "text-sm text-muted-foreground",
                  children: stat.label,
                }),
                /* @__PURE__ */ jsx("p", {
                  className: "mt-1 text-3xl font-bold",
                  children: stat.value,
                }),
              ],
            },
            stat.label,
          ),
        ),
      }),
    ],
  });
});
//#endregion
//#region app/components/ui/tabs.tsx
function Tabs$1({ className, orientation = "horizontal", ...props }) {
  return /* @__PURE__ */ jsx(Tabs.Root, {
    "data-slot": "tabs",
    "data-orientation": orientation,
    className: cn("group/tabs flex gap-2 data-horizontal:flex-col", className),
    ...props,
  });
}
var tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: { variant: "default" },
  },
);
function TabsList({ className, variant = "default", ...props }) {
  return /* @__PURE__ */ jsx(Tabs.List, {
    "data-slot": "tabs-list",
    "data-variant": variant,
    className: cn(tabsListVariants({ variant }), className),
    ...props,
  });
}
function TabsTrigger({ className, ...props }) {
  return /* @__PURE__ */ jsx(Tabs.Trigger, {
    "data-slot": "tabs-trigger",
    className: cn(
      "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
      "data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground",
      "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
      className,
    ),
    ...props,
  });
}
function TabsContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(Tabs.Content, {
    "data-slot": "tabs-content",
    className: cn("flex-1 text-sm outline-none", className),
    ...props,
  });
}
//#endregion
//#region app/types/booking/booking.ts
var BookingStatus = {
  PendingPayment: 1,
  Confirmed: 2,
  Cancelled: 3,
  Completed: 4,
  Expired: 5,
};
var BOOKING_STATUS_LABEL = {
  [BookingStatus.PendingPayment]: "Pending Payment",
  [BookingStatus.Confirmed]: "Confirmed",
  [BookingStatus.Cancelled]: "Cancelled",
  [BookingStatus.Completed]: "Completed",
  [BookingStatus.Expired]: "Expired",
};
//#endregion
//#region app/routes/user/bookings.tsx
var bookings_exports$2 = /* @__PURE__ */ __exportAll({
  default: () => bookings_default$2,
  meta: () => meta$20,
});
function meta$20() {
  return [{ title: "My Bookings — MiniBooking" }];
}
var STATUS_TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Pending",
    value: "pending",
    filter: BookingStatus.PendingPayment,
  },
  {
    label: "Confirmed",
    value: "confirmed",
    filter: BookingStatus.Confirmed,
  },
  {
    label: "Completed",
    value: "completed",
    filter: BookingStatus.Completed,
  },
  {
    label: "Cancelled",
    value: "cancelled",
    filter: BookingStatus.Cancelled,
  },
  {
    label: "Expired",
    value: "expired",
    filter: BookingStatus.Expired,
  },
];
var STATUS_VARIANT$3 = {
  [BookingStatus.PendingPayment]: "outline",
  [BookingStatus.Confirmed]: "default",
  [BookingStatus.Completed]: "secondary",
  [BookingStatus.Cancelled]: "destructive",
  [BookingStatus.Expired]: "secondary",
};
function formatSlotTime$2(iso) {
  return new Date(iso).toLocaleString("vi-VN", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
function formatPrice$6(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}
function BookingCardSkeleton() {
  return /* @__PURE__ */ jsx(Card, {
    children: /* @__PURE__ */ jsx(CardContent, {
      className: "p-4",
      children: /* @__PURE__ */ jsxs("div", {
        className: "flex items-center gap-4",
        children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "size-12 rounded-full" }),
          /* @__PURE__ */ jsxs("div", {
            className: "flex-1 space-y-2",
            children: [
              /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-40" }),
              /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-56" }),
              /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-24" }),
            ],
          }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-20" }),
        ],
      }),
    }),
  });
}
function BookingCard({ booking, onClick }) {
  const navigate = useNavigate();
  const initials =
    (booking.mentor.displayName ?? "")
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";
  const isPending = booking.status === BookingStatus.PendingPayment;
  return /* @__PURE__ */ jsx(Card, {
    className:
      "cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5",
    onClick,
    role: "button",
    tabIndex: 0,
    onKeyDown: (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    },
    children: /* @__PURE__ */ jsx(CardContent, {
      className: "p-4",
      children: /* @__PURE__ */ jsxs("div", {
        className: "flex items-center gap-4",
        children: [
          /* @__PURE__ */ jsxs(Avatar$1, {
            className: "size-12 shrink-0",
            children: [
              /* @__PURE__ */ jsx(AvatarImage, {
                src: booking.mentor.avatarUrl ?? void 0,
                alt: booking.mentor.displayName,
              }),
              /* @__PURE__ */ jsx(AvatarFallback, {
                className: "text-sm font-semibold",
                children: initials,
              }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "min-w-0 flex-1 space-y-1",
            children: [
              /* @__PURE__ */ jsxs("div", {
                className: "flex items-center gap-2",
                children: [
                  /* @__PURE__ */ jsx("p", {
                    className: "text-sm font-medium truncate",
                    children: booking.mentor.displayName,
                  }),
                  /* @__PURE__ */ jsx(Badge, {
                    variant: STATUS_VARIANT$3[booking.status] ?? "secondary",
                    className: "text-xs shrink-0",
                    children: BOOKING_STATUS_LABEL[booking.status] ?? "Unknown",
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs("div", {
                className:
                  "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxs("span", {
                    className: "flex items-center gap-1",
                    children: [
                      /* @__PURE__ */ jsx(Clock, { className: "size-3" }),
                      formatSlotTime$2(booking.mentorSlot.startTime),
                    ],
                  }),
                  /* @__PURE__ */ jsxs("span", {
                    className: "flex items-center gap-1",
                    children: [
                      /* @__PURE__ */ jsx(DollarSign, { className: "size-3" }),
                      formatPrice$6(booking.mentorSlot.price),
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs("p", {
                className: "text-xs text-muted-foreground",
                children: ["Code: ", booking.bookingCode],
              }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-2 shrink-0",
            children: [
              isPending &&
                /* @__PURE__ */ jsxs(Button, {
                  size: "sm",
                  variant: "default",
                  className: "gap-1.5",
                  onClick: (e) => {
                    e.stopPropagation();
                    navigate(`/user/bookings/${booking.id}/payment`);
                  },
                  children: [
                    /* @__PURE__ */ jsx(CreditCard, { className: "size-3.5" }),
                    "Pay",
                  ],
                }),
              /* @__PURE__ */ jsx(ChevronRight, {
                className: "size-4 text-muted-foreground",
              }),
            ],
          }),
        ],
      }),
    }),
  });
}
var bookings_default$2 = UNSAFE_withComponentProps(function UserBookings() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const user = useAuthStore((s) => s.user);
  const activeTab = searchParams.get("status") ?? "all";
  const page = Number(searchParams.get("page") ?? "1");
  const statusFilter = STATUS_TABS.find((t) => t.value === activeTab)?.filter;
  const { data, isPending } = useUserBookingsQuery(user?.userId ?? "", {
    pageNumber: page,
    pageSize: 10,
    status: statusFilter,
    sortBy: "CreatedAt",
    sortOrder: "desc",
  });
  const bookings = data?.items ?? [];
  function handleTabChange(value) {
    const params = new URLSearchParams();
    if (value !== "all") params.set("status", value);
    setSearchParams(params, { replace: true });
  }
  function handlePageChange(p) {
    const params = new URLSearchParams(searchParams);
    if (p > 1) params.set("page", String(p));
    else params.delete("page");
    setSearchParams(params, { replace: true });
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        children: [
          /* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-semibold tracking-tight",
            children: "My Bookings",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-muted-foreground",
            children: "View and manage your mentoring sessions.",
          }),
        ],
      }),
      /* @__PURE__ */ jsx(Tabs$1, {
        value: activeTab,
        onValueChange: handleTabChange,
        children: /* @__PURE__ */ jsx(TabsList, {
          className: "w-full justify-start overflow-x-auto",
          children: STATUS_TABS.map((tab) =>
            /* @__PURE__ */ jsx(
              TabsTrigger,
              {
                value: tab.value,
                className: "text-xs sm:text-sm",
                children: tab.label,
              },
              tab.value,
            ),
          ),
        }),
      }),
      isPending
        ? /* @__PURE__ */ jsx("div", {
            className: "space-y-3",
            children: Array.from({ length: 5 }).map((_, i) =>
              /* @__PURE__ */ jsx(BookingCardSkeleton, {}, i),
            ),
          })
        : bookings.length === 0
          ? /* @__PURE__ */ jsxs("div", {
              className:
                "flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center",
              children: [
                /* @__PURE__ */ jsx(CalendarCheck, {
                  className: "mb-4 size-10 text-muted-foreground/50",
                }),
                /* @__PURE__ */ jsx("p", {
                  className: "text-sm font-medium text-muted-foreground",
                  children: "No bookings found",
                }),
                /* @__PURE__ */ jsx("p", {
                  className: "mt-1 text-xs text-muted-foreground/70",
                  children:
                    activeTab === "all"
                      ? "Book a session with a mentor to get started."
                      : "No bookings with this status.",
                }),
                /* @__PURE__ */ jsx(Button, {
                  variant: "outline",
                  size: "sm",
                  className: "mt-4",
                  onClick: () => navigate("/user/mentors"),
                  children: "Find Mentors",
                }),
              ],
            })
          : /* @__PURE__ */ jsx("div", {
              className: "space-y-3",
              children: bookings.map((booking) =>
                /* @__PURE__ */ jsx(
                  BookingCard,
                  {
                    booking,
                    onClick: () => navigate(`/user/bookings/${booking.id}`),
                  },
                  booking.id,
                ),
              ),
            }),
      data &&
        data.totalPages > 1 &&
        /* @__PURE__ */ jsx(DataTablePagination, {
          pageNumber: data.pageNumber,
          pageSize: data.pageSize,
          totalPages: data.totalPages,
          totalCount: data.totalCount,
          hasPreviousPage: data.hasPreviousPage,
          hasNextPage: data.hasNextPage,
          onPageChange: handlePageChange,
          onPageSizeChange: () => {},
        }),
    ],
  });
});
//#endregion
//#region app/hooks/booking/use-booking-detail-query.ts
function useBookingDetailQuery(bookingId) {
  return useQuery({
    queryKey: queryKeys.bookings.detail(bookingId),
    queryFn: () => bookingService.getBookingDetail(bookingId),
    staleTime: 6e4,
    enabled: !!bookingId,
  });
}
//#endregion
//#region app/hooks/booking/use-cancel-booking-mutation.ts
function useCancelBookingMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (params) => bookingService.cancelBooking(params),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.bookings.all() });
      qc.invalidateQueries({ queryKey: queryKeys.mentors.details() });
    },
  });
}
//#endregion
//#region app/routes/user/booking-detail.tsx
var booking_detail_exports = /* @__PURE__ */ __exportAll({
  default: () => booking_detail_default,
  meta: () => meta$19,
});
function meta$19() {
  return [{ title: "Booking Detail — MiniBooking" }];
}
var STATUS_VARIANT$2 = {
  [BookingStatus.PendingPayment]: "outline",
  [BookingStatus.Confirmed]: "default",
  [BookingStatus.Completed]: "secondary",
  [BookingStatus.Cancelled]: "destructive",
  [BookingStatus.Expired]: "secondary",
};
function formatDateTime(iso) {
  return new Date(iso).toLocaleString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
function formatPrice$5(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}
function CancelDialog({ open, onOpenChange, bookingId }) {
  const [reason, setReason] = useState("");
  const user = useAuthStore((s) => s.user);
  const cancelBooking = useCancelBookingMutation();
  function handleCancel() {
    if (!user) return;
    cancelBooking.mutate(
      {
        userId: user.userId,
        bookingId,
        cancellationReason: reason.trim() || void 0,
      },
      {
        onSuccess: () => {
          toast.success("Booking cancelled.");
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(getApiErrorMessage(error));
        },
      },
    );
  }
  return /* @__PURE__ */ jsx(Dialog$1, {
    open,
    onOpenChange,
    children: /* @__PURE__ */ jsxs(DialogContent, {
      className: "sm:max-w-md",
      children: [
        /* @__PURE__ */ jsxs(DialogHeader, {
          children: [
            /* @__PURE__ */ jsx(DialogTitle, { children: "Cancel Booking" }),
            /* @__PURE__ */ jsx(DialogDescription, {
              children:
                "Are you sure you want to cancel this booking? This action cannot be undone.",
            }),
          ],
        }),
        /* @__PURE__ */ jsxs("div", {
          className: "space-y-2 py-2",
          children: [
            /* @__PURE__ */ jsx(Label$1, {
              htmlFor: "cancel-reason",
              className: "text-sm",
              children: "Reason (optional)",
            }),
            /* @__PURE__ */ jsx(Textarea, {
              id: "cancel-reason",
              placeholder: "Why are you cancelling?",
              value: reason,
              onChange: (e) => setReason(e.target.value),
              rows: 3,
              className: "resize-none",
            }),
          ],
        }),
        /* @__PURE__ */ jsxs(DialogFooter, {
          className: "gap-2 sm:gap-0",
          children: [
            /* @__PURE__ */ jsx(Button, {
              variant: "outline",
              onClick: () => onOpenChange(false),
              disabled: cancelBooking.isPending,
              children: "Keep Booking",
            }),
            /* @__PURE__ */ jsxs(Button, {
              variant: "destructive",
              onClick: handleCancel,
              disabled: cancelBooking.isPending,
              children: [
                cancelBooking.isPending &&
                  /* @__PURE__ */ jsx(Loader2, {
                    className: "size-4 animate-spin",
                  }),
                "Cancel Booking",
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
var booking_detail_default = UNSAFE_withComponentProps(
  function BookingDetailPage({ params }) {
    const navigate = useNavigate();
    const bookingId = params.id;
    const {
      data: booking,
      isPending,
      isError,
    } = useBookingDetailQuery(bookingId);
    const [cancelOpen, setCancelOpen] = useState(false);
    if (isPending)
      return /* @__PURE__ */ jsxs("div", {
        className: "space-y-6",
        children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-32" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-48 w-full" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-32 w-full" }),
        ],
      });
    if (isError || !booking)
      return /* @__PURE__ */ jsxs("div", {
        className:
          "flex flex-col items-center justify-center py-16 text-center",
        children: [
          /* @__PURE__ */ jsx(XCircle, {
            className: "mb-4 size-10 text-muted-foreground/50",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-sm font-medium text-muted-foreground",
            children: "Booking not found or failed to load.",
          }),
          /* @__PURE__ */ jsx(Button, {
            variant: "outline",
            size: "sm",
            className: "mt-4",
            onClick: () => navigate("/user/bookings"),
            children: "Back to Bookings",
          }),
        ],
      });
    const initials =
      (booking.mentor.displayName ?? "")
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "?";
    const isPending_ = booking.status === BookingStatus.PendingPayment;
    return /* @__PURE__ */ jsxs("div", {
      className: "space-y-6",
      children: [
        /* @__PURE__ */ jsxs(Button, {
          variant: "ghost",
          size: "sm",
          className: "gap-1.5 text-muted-foreground hover:text-foreground",
          onClick: () => navigate("/user/bookings"),
          children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "size-4" }),
            "Back to Bookings",
          ],
        }),
        /* @__PURE__ */ jsxs("div", {
          className:
            "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
          children: [
            /* @__PURE__ */ jsxs("div", {
              className: "space-y-1",
              children: [
                /* @__PURE__ */ jsxs("div", {
                  className: "flex items-center gap-3",
                  children: [
                    /* @__PURE__ */ jsx("h2", {
                      className: "text-xl font-semibold",
                      children: "Booking Detail",
                    }),
                    /* @__PURE__ */ jsx(Badge, {
                      variant: STATUS_VARIANT$2[booking.status] ?? "secondary",
                      className: "text-xs",
                      children:
                        BOOKING_STATUS_LABEL[booking.status] ?? "Unknown",
                    }),
                  ],
                }),
                /* @__PURE__ */ jsxs("p", {
                  className: "text-sm text-muted-foreground",
                  children: [
                    "Code: ",
                    /* @__PURE__ */ jsx("span", {
                      className: "font-mono",
                      children: booking.bookingCode,
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ jsx("div", {
              className: "flex items-center gap-2",
              children:
                isPending_ &&
                /* @__PURE__ */ jsxs(Fragment, {
                  children: [
                    /* @__PURE__ */ jsxs(Button, {
                      size: "sm",
                      onClick: () =>
                        navigate(`/user/bookings/${bookingId}/payment`),
                      className: "gap-1.5",
                      children: [
                        /* @__PURE__ */ jsx(CreditCard, {
                          className: "size-4",
                        }),
                        "Pay Now",
                      ],
                    }),
                    /* @__PURE__ */ jsx(Button, {
                      variant: "destructive",
                      size: "sm",
                      onClick: () => setCancelOpen(true),
                      children: "Cancel",
                    }),
                  ],
                }),
            }),
          ],
        }),
        /* @__PURE__ */ jsxs("div", {
          className: "grid gap-6 lg:grid-cols-2",
          children: [
            /* @__PURE__ */ jsxs(Card, {
              children: [
                /* @__PURE__ */ jsx(CardHeader, {
                  className: "pb-3",
                  children: /* @__PURE__ */ jsx(CardTitle, {
                    className: "text-base",
                    children: "Mentor",
                  }),
                }),
                /* @__PURE__ */ jsx(CardContent, {
                  children: /* @__PURE__ */ jsxs("div", {
                    className: "flex items-center gap-4",
                    children: [
                      /* @__PURE__ */ jsxs(Avatar$1, {
                        className: "size-14 shrink-0",
                        children: [
                          /* @__PURE__ */ jsx(AvatarImage, {
                            src: booking.mentor.avatarUrl ?? void 0,
                            alt: booking.mentor.displayName,
                          }),
                          /* @__PURE__ */ jsx(AvatarFallback, {
                            className: "text-sm font-semibold",
                            children: initials,
                          }),
                        ],
                      }),
                      /* @__PURE__ */ jsxs("div", {
                        className: "min-w-0",
                        children: [
                          /* @__PURE__ */ jsx("p", {
                            className: "font-medium",
                            children: booking.mentor.displayName,
                          }),
                          booking.mentor.specialization &&
                            /* @__PURE__ */ jsx("p", {
                              className: "text-sm text-muted-foreground",
                              children: booking.mentor.specialization,
                            }),
                          /* @__PURE__ */ jsx("p", {
                            className: "text-xs text-muted-foreground",
                            children: booking.mentor.email,
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
            /* @__PURE__ */ jsxs(Card, {
              children: [
                /* @__PURE__ */ jsx(CardHeader, {
                  className: "pb-3",
                  children: /* @__PURE__ */ jsx(CardTitle, {
                    className: "text-base",
                    children: "Session Details",
                  }),
                }),
                /* @__PURE__ */ jsxs(CardContent, {
                  className: "space-y-3",
                  children: [
                    /* @__PURE__ */ jsxs("div", {
                      className: "flex items-center gap-3 text-sm",
                      children: [
                        /* @__PURE__ */ jsx(Calendar, {
                          className: "size-4 text-muted-foreground",
                        }),
                        /* @__PURE__ */ jsxs("div", {
                          children: [
                            /* @__PURE__ */ jsx("p", {
                              className: "font-medium",
                              children: formatDateTime(
                                booking.mentorSlot.startTime,
                              ),
                            }),
                            /* @__PURE__ */ jsxs("p", {
                              className: "text-muted-foreground",
                              children: [
                                "to ",
                                formatDateTime(booking.mentorSlot.endTime),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    /* @__PURE__ */ jsx(Separator$1, {}),
                    /* @__PURE__ */ jsxs("div", {
                      className: "flex items-center gap-3 text-sm",
                      children: [
                        /* @__PURE__ */ jsx(DollarSign, {
                          className: "size-4 text-muted-foreground",
                        }),
                        /* @__PURE__ */ jsx("span", {
                          className: "font-medium",
                          children: formatPrice$5(booking.mentorSlot.price),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        /* @__PURE__ */ jsxs(Card, {
          children: [
            /* @__PURE__ */ jsx(CardHeader, {
              className: "pb-3",
              children: /* @__PURE__ */ jsx(CardTitle, {
                className: "text-base",
                children: "Timeline",
              }),
            }),
            /* @__PURE__ */ jsx(CardContent, {
              children: /* @__PURE__ */ jsxs("div", {
                className: "space-y-4",
                children: [
                  /* @__PURE__ */ jsx(TimelineItem, {
                    icon: /* @__PURE__ */ jsx(Clock, { className: "size-3.5" }),
                    label: "Booking Created",
                    time: booking.createdAt,
                    active: true,
                  }),
                  booking.status === BookingStatus.Confirmed &&
                    /* @__PURE__ */ jsx(TimelineItem, {
                      icon: /* @__PURE__ */ jsx(CheckCircle2, {
                        className: "size-3.5 text-green-600",
                      }),
                      label: "Payment Confirmed",
                      time: booking.updatedAt ?? booking.createdAt,
                      active: true,
                    }),
                  booking.status === BookingStatus.Cancelled &&
                    /* @__PURE__ */ jsx(TimelineItem, {
                      icon: /* @__PURE__ */ jsx(XCircle, {
                        className: "size-3.5 text-destructive",
                      }),
                      label: `Cancelled${booking.cancellationReason ? `: ${booking.cancellationReason}` : ""}`,
                      time: booking.updatedAt ?? booking.createdAt,
                      active: true,
                    }),
                  booking.status === BookingStatus.Expired &&
                    /* @__PURE__ */ jsx(TimelineItem, {
                      icon: /* @__PURE__ */ jsx(Clock, {
                        className: "size-3.5 text-orange-500",
                      }),
                      label: "Booking Expired",
                      time: booking.updatedAt ?? booking.createdAt,
                      active: true,
                    }),
                  booking.status === BookingStatus.Completed &&
                    /* @__PURE__ */ jsx(TimelineItem, {
                      icon: /* @__PURE__ */ jsx(CheckCircle2, {
                        className: "size-3.5 text-green-600",
                      }),
                      label: "Session Completed",
                      time: booking.updatedAt ?? booking.createdAt,
                      active: true,
                    }),
                ],
              }),
            }),
          ],
        }),
        /* @__PURE__ */ jsx(CancelDialog, {
          open: cancelOpen,
          onOpenChange: setCancelOpen,
          bookingId,
        }),
      ],
    });
  },
);
function TimelineItem({ icon, label, time, active }) {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex items-start gap-3",
    children: [
      /* @__PURE__ */ jsx("div", {
        className:
          "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border bg-background",
        children: icon,
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "min-w-0 flex-1",
        children: [
          /* @__PURE__ */ jsx("p", {
            className: "text-sm font-medium",
            children: label,
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-xs text-muted-foreground",
            children: formatDateTime(time),
          }),
        ],
      }),
    ],
  });
}
//#endregion
//#region app/services/payment/payment.service.ts
var paymentService = {
  async createPayment(bookingId) {
    return (await apiClient.post("/api/Payment", { bookingId })).data.data;
  },
  async getPaymentStatus(bookingId) {
    return (await apiClient.get(`/api/Payment/${bookingId}/status`)).data.data;
  },
};
//#endregion
//#region app/hooks/payment/use-create-payment-mutation.ts
function useCreatePaymentMutation() {
  return useMutation({
    mutationFn: (bookingId) => paymentService.createPayment(bookingId),
  });
}
//#endregion
//#region app/types/payment/payment.ts
var PaymentStatus = {
  Pending: 1,
  Succeeded: 2,
  Failed: 3,
  Expired: 4,
  Cancelled: 5,
};
(PaymentStatus.Pending,
  PaymentStatus.Succeeded,
  PaymentStatus.Failed,
  PaymentStatus.Expired,
  PaymentStatus.Cancelled);
//#endregion
//#region app/hooks/payment/use-payment-status-query.ts
function usePaymentStatusQuery(bookingId, options) {
  return useQuery({
    queryKey: queryKeys.payments.status(bookingId),
    queryFn: () => paymentService.getPaymentStatus(bookingId),
    enabled: options?.enabled !== false && !!bookingId,
    staleTime: 0,
    gcTime: 0,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data) return 3e3;
      if (data.status === PaymentStatus.Pending) return 3e3;
      return false;
    },
    refetchIntervalInBackground: true,
  });
}
//#endregion
//#region app/routes/user/booking-payment.tsx
var booking_payment_exports = /* @__PURE__ */ __exportAll({
  default: () => booking_payment_default,
  meta: () => meta$18,
});
function meta$18() {
  return [{ title: "Payment — MiniBooking" }];
}
function formatPrice$4(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}
function CountdownTimer({ expiredAt }) {
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, Math.floor((new Date(expiredAt).getTime() - Date.now()) / 1e3)),
  );
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Math.max(
        0,
        Math.floor((new Date(expiredAt).getTime() - Date.now()) / 1e3),
      );
      setRemaining(diff);
      if (diff <= 0) clearInterval(interval);
    }, 1e3);
    return () => clearInterval(interval);
  }, [expiredAt]);
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  if (remaining <= 0)
    return /* @__PURE__ */ jsx("span", {
      className: "text-destructive font-medium",
      children: "Expired",
    });
  return /* @__PURE__ */ jsxs("span", {
    className: remaining < 60 ? "text-destructive font-medium" : "font-medium",
    children: [
      String(minutes).padStart(2, "0"),
      ":",
      String(seconds).padStart(2, "0"),
    ],
  });
}
function PaymentSuccess({ bookingId }) {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/user/bookings/${bookingId}`);
    }, 3e3);
    return () => clearTimeout(timer);
  }, [navigate, bookingId]);
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col items-center gap-4 py-8 text-center",
    children: [
      /* @__PURE__ */ jsx("div", {
        className:
          "flex size-16 items-center justify-center rounded-full bg-green-100",
        children: /* @__PURE__ */ jsx(CheckCircle2, {
          className: "size-8 text-green-600",
        }),
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "space-y-1",
        children: [
          /* @__PURE__ */ jsx("h3", {
            className: "text-lg font-semibold",
            children: "Payment Successful!",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-sm text-muted-foreground",
            children: "Your booking has been confirmed. Redirecting...",
          }),
        ],
      }),
    ],
  });
}
function PaymentExpired({ bookingId, mentorId }) {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col items-center gap-4 py-8 text-center",
    children: [
      /* @__PURE__ */ jsx("div", {
        className:
          "flex size-16 items-center justify-center rounded-full bg-orange-100",
        children: /* @__PURE__ */ jsx(Clock, {
          className: "size-8 text-orange-600",
        }),
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "space-y-1",
        children: [
          /* @__PURE__ */ jsx("h3", {
            className: "text-lg font-semibold",
            children: "Payment Expired",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-sm text-muted-foreground",
            children:
              "The payment window has closed. Please create a new booking.",
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "flex gap-2",
        children: [
          mentorId &&
            /* @__PURE__ */ jsx(Button, {
              variant: "outline",
              onClick: () => navigate(`/user/mentors/${mentorId}`),
              children: "Back to Mentor",
            }),
          /* @__PURE__ */ jsx(Button, {
            onClick: () => navigate("/user/bookings"),
            children: "My Bookings",
          }),
        ],
      }),
    ],
  });
}
function PaymentFailed({ reason }) {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col items-center gap-4 py-8 text-center",
    children: [
      /* @__PURE__ */ jsx("div", {
        className:
          "flex size-16 items-center justify-center rounded-full bg-red-100",
        children: /* @__PURE__ */ jsx(XCircle, {
          className: "size-8 text-red-600",
        }),
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "space-y-1",
        children: [
          /* @__PURE__ */ jsx("h3", {
            className: "text-lg font-semibold",
            children: "Payment Failed",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-sm text-muted-foreground",
            children: reason || "Something went wrong with your payment.",
          }),
        ],
      }),
      /* @__PURE__ */ jsx(Button, {
        onClick: () => navigate("/user/bookings"),
        children: "My Bookings",
      }),
    ],
  });
}
function QrPaymentView({ payment, bookingId }) {
  const { data: status } = usePaymentStatusQuery(bookingId);
  const mentorId = useBookingDetailQuery(bookingId).data?.mentor?.id;
  if (status?.status === PaymentStatus.Succeeded)
    return /* @__PURE__ */ jsx(PaymentSuccess, { bookingId });
  if (status?.status === PaymentStatus.Expired)
    return /* @__PURE__ */ jsx(PaymentExpired, {
      bookingId,
      mentorId,
    });
  if (status?.status === PaymentStatus.Failed)
    return /* @__PURE__ */ jsx(PaymentFailed, { reason: status.failureReason });
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        className: "flex flex-col items-center gap-4",
        children: [
          /* @__PURE__ */ jsx("div", {
            className: "rounded-xl border-2 border-dashed p-4 bg-white",
            children: /* @__PURE__ */ jsx("img", {
              src: payment.qrCodeUrl,
              alt: "Payment QR Code",
              className: "size-56 sm:size-64",
            }),
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-2 text-sm text-muted-foreground",
            children: [
              /* @__PURE__ */ jsx(Loader2, {
                className: "size-4 animate-spin",
              }),
              /* @__PURE__ */ jsx("span", {
                children: "Waiting for payment...",
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "space-y-3 rounded-lg border bg-muted/50 p-4",
        children: [
          /* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-between text-sm",
            children: [
              /* @__PURE__ */ jsx("span", {
                className: "text-muted-foreground",
                children: "Amount",
              }),
              /* @__PURE__ */ jsx("span", {
                className: "text-lg font-semibold",
                children: formatPrice$4(payment.amount),
              }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-between text-sm",
            children: [
              /* @__PURE__ */ jsx("span", {
                className: "text-muted-foreground",
                children: "Order Code",
              }),
              /* @__PURE__ */ jsx(Badge, {
                variant: "outline",
                className: "font-mono text-xs",
                children: payment.providerOrderCode,
              }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-between text-sm",
            children: [
              /* @__PURE__ */ jsx("span", {
                className: "text-muted-foreground",
                children: "Time Remaining",
              }),
              /* @__PURE__ */ jsx(CountdownTimer, {
                expiredAt: payment.expiredAt,
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "rounded-lg border p-4 space-y-2",
        children: [
          /* @__PURE__ */ jsx("p", {
            className: "text-sm font-medium",
            children: "How to pay:",
          }),
          /* @__PURE__ */ jsxs("ol", {
            className:
              "list-decimal list-inside space-y-1 text-sm text-muted-foreground",
            children: [
              /* @__PURE__ */ jsx("li", { children: "Open your banking app" }),
              /* @__PURE__ */ jsx("li", { children: "Scan the QR code above" }),
              /* @__PURE__ */ jsx("li", {
                children: "Verify the amount and transfer",
              }),
              /* @__PURE__ */ jsx("li", {
                children: "Wait for confirmation (auto-detected)",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
var booking_payment_default = UNSAFE_withComponentProps(
  function BookingPaymentPage({ params }) {
    const bookingId = params.id;
    const navigate = useNavigate();
    const createPayment = useCreatePaymentMutation();
    const [payment, setPayment] = useState(null);
    useEffect(() => {
      if (!bookingId) return;
      createPayment.mutate(bookingId, {
        onSuccess: (data) => setPayment(data),
      });
    }, [bookingId]);
    return /* @__PURE__ */ jsx("div", {
      className: "flex items-start justify-center py-6",
      children: /* @__PURE__ */ jsxs(Card, {
        className: "w-full max-w-md",
        children: [
          /* @__PURE__ */ jsx(CardHeader, {
            className: "text-center",
            children: /* @__PURE__ */ jsxs(CardTitle, {
              className: "flex items-center justify-center gap-2",
              children: [
                /* @__PURE__ */ jsx(QrCode, { className: "size-5" }),
                "Payment",
              ],
            }),
          }),
          /* @__PURE__ */ jsxs(CardContent, {
            children: [
              createPayment.isPending &&
                !payment &&
                /* @__PURE__ */ jsxs("div", {
                  className: "flex flex-col items-center gap-4 py-8",
                  children: [
                    /* @__PURE__ */ jsx(Skeleton, {
                      className: "size-56 rounded-xl",
                    }),
                    /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-40" }),
                    /* @__PURE__ */ jsx(Skeleton, { className: "h-20 w-full" }),
                  ],
                }),
              createPayment.isError &&
                !payment &&
                /* @__PURE__ */ jsxs("div", {
                  className:
                    "flex flex-col items-center gap-4 py-8 text-center",
                  children: [
                    /* @__PURE__ */ jsx(XCircle, {
                      className: "size-10 text-destructive",
                    }),
                    /* @__PURE__ */ jsx("p", {
                      className: "text-sm text-muted-foreground",
                      children:
                        "Failed to create payment. The booking may have expired.",
                    }),
                    /* @__PURE__ */ jsx(Button, {
                      variant: "outline",
                      onClick: () => navigate("/user/bookings"),
                      children: "Back to Bookings",
                    }),
                  ],
                }),
              payment &&
                /* @__PURE__ */ jsx(QrPaymentView, {
                  payment,
                  bookingId,
                }),
            ],
          }),
        ],
      }),
    });
  },
);
//#endregion
//#region app/routes/user/find-mentors.tsx
var find_mentors_exports = /* @__PURE__ */ __exportAll({
  default: () => find_mentors_default,
  meta: () => meta$17,
});
function meta$17() {
  return [{ title: "Find Mentors — MiniBooking" }];
}
var find_mentors_default = UNSAFE_withComponentProps(
  function UserFindMentors() {
    return /* @__PURE__ */ jsxs("div", {
      className: "space-y-6",
      children: [
        /* @__PURE__ */ jsxs("div", {
          children: [
            /* @__PURE__ */ jsx("h2", {
              className: "text-2xl font-semibold tracking-tight",
              children: "Find Mentors",
            }),
            /* @__PURE__ */ jsx("p", {
              className: "text-muted-foreground",
              children: "Browse and connect with expert mentors.",
            }),
          ],
        }),
        /* @__PURE__ */ jsx(MentorListContainer, {
          detailBasePath: "/user/mentors",
          defaultPageSize: 9,
        }),
      ],
    });
  },
);
//#endregion
//#region app/routes/user/mentor-detail.tsx
var mentor_detail_exports = /* @__PURE__ */ __exportAll({
  default: () => mentor_detail_default,
  meta: () => meta$16,
});
function meta$16() {
  return [{ title: "Mentor Profile — MiniBooking" }];
}
var mentor_detail_default = UNSAFE_withComponentProps(
  function UserMentorDetail({ params }) {
    return /* @__PURE__ */ jsx("div", {
      className: "space-y-6",
      children: /* @__PURE__ */ jsx(MentorDetailView, {
        mentorId: params.id,
        context: "user",
      }),
    });
  },
);
//#endregion
//#region app/routes/user/ai-chat.tsx
var ai_chat_exports$1 = /* @__PURE__ */ __exportAll({
  default: () => ai_chat_default$1,
  meta: () => meta$15,
});
function meta$15() {
  return [{ title: "AI Assistant — MiniBooking" }];
}
var ai_chat_default$1 = UNSAFE_withComponentProps(function UserAiChat() {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex h-full flex-col space-y-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        children: [
          /* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-semibold tracking-tight",
            children: "AI Assistant",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-muted-foreground",
            children: "Get personalized guidance from our AI mentor.",
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className:
          "flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center",
        children: [
          /* @__PURE__ */ jsx(Bot, {
            className: "mb-4 size-10 text-muted-foreground/50",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-sm font-medium text-muted-foreground",
            children: "AI chat coming soon",
          }),
        ],
      }),
    ],
  });
});
//#endregion
//#region app/routes/user/payments.tsx
var payments_exports$1 = /* @__PURE__ */ __exportAll({
  default: () => payments_default$1,
  meta: () => meta$14,
});
function meta$14() {
  return [{ title: "Payments — MiniBooking" }];
}
var payments_default$1 = UNSAFE_withComponentProps(function UserPayments() {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        children: [
          /* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-semibold tracking-tight",
            children: "Payments",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-muted-foreground",
            children: "View your payment history and transactions.",
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className:
          "flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center",
        children: [
          /* @__PURE__ */ jsx(CreditCard, {
            className: "mb-4 size-10 text-muted-foreground/50",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-sm font-medium text-muted-foreground",
            children: "No payment records yet",
          }),
        ],
      }),
    ],
  });
});
//#endregion
//#region app/routes/user/profile.tsx
var profile_exports$1 = /* @__PURE__ */ __exportAll({
  default: () => profile_default$1,
  meta: () => meta$13,
});
function meta$13() {
  return [{ title: "Profile — MiniBooking" }];
}
var profile_default$1 = UNSAFE_withComponentProps(function UserProfile() {
  const user = useCurrentUser();
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        children: [
          /* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-semibold tracking-tight",
            children: "Profile",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-muted-foreground",
            children: "Manage your personal information.",
          }),
        ],
      }),
      /* @__PURE__ */ jsx("div", {
        className: "rounded-xl border bg-card p-6 shadow-sm",
        children: /* @__PURE__ */ jsxs("div", {
          className: "flex items-center gap-4",
          children: [
            /* @__PURE__ */ jsx("div", {
              className:
                "flex size-16 items-center justify-center rounded-full bg-primary/10",
              children: /* @__PURE__ */ jsx(UserCircle, {
                className: "size-8 text-primary",
              }),
            }),
            /* @__PURE__ */ jsxs("div", {
              children: [
                /* @__PURE__ */ jsx("p", {
                  className: "text-lg font-semibold",
                  children: user?.fullName,
                }),
                /* @__PURE__ */ jsx("p", {
                  className: "text-sm text-muted-foreground",
                  children: user?.email,
                }),
                /* @__PURE__ */ jsx("p", {
                  className: "text-sm text-muted-foreground",
                  children: user?.phoneNumber,
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
});
//#endregion
//#region app/routes/mentor/_layout.tsx
var _layout_exports$1 = /* @__PURE__ */ __exportAll({
  HydrateFallback: () => HydrateFallback$1,
  clientLoader: () => clientLoader$1,
  default: () => _layout_default$1,
});
var clientLoader$1 = requireRole("Mentor");
var HydrateFallback$1 = UNSAFE_withHydrateFallbackProps(
  function HydrateFallback() {
    return /* @__PURE__ */ jsx("div", {
      className: "h-screen animate-pulse bg-muted",
    });
  },
);
var _layout_default$1 = UNSAFE_withComponentProps(function MentorLayout() {
  return /* @__PURE__ */ jsx(AppLayout, {
    navItems: mentorNavItems,
    children: /* @__PURE__ */ jsx(Outlet, {}),
  });
});
//#endregion
//#region app/hooks/mentor/use-my-mentor-profile.ts
/**
 * Resolves the current user's Mentor profile.
 * Searches mentors by the user's email to find their mentorId,
 * then fetches the full mentor detail (profile + skills + slots).
 */
function useMyMentorProfile() {
  const user = useAuthStore((s) => s.user);
  const mentorListQuery = useQuery({
    queryKey: ["mentors", "my-profile-resolve", user?.email],
    queryFn: () =>
      mentorService.getMentors({
        searchTerm: user.email,
        pageSize: 1,
      }),
    enabled: !!user?.email,
    staleTime: Infinity,
  });
  const mentorId = mentorListQuery.data?.items[0]?.id;
  const detailQuery = useQuery({
    queryKey: queryKeys.mentors.detail(mentorId ?? ""),
    queryFn: () => mentorService.getMentorDetail(mentorId),
    enabled: !!mentorId,
    staleTime: 6e4,
  });
  return {
    mentorId,
    mentor: detailQuery.data,
    isPending:
      mentorListQuery.isPending || (!!mentorId && detailQuery.isPending),
    isError: mentorListQuery.isError || detailQuery.isError,
    refetch: detailQuery.refetch,
  };
}
//#endregion
//#region app/routes/mentor/dashboard.tsx
var dashboard_exports$1 = /* @__PURE__ */ __exportAll({
  default: () => dashboard_default$1,
  meta: () => meta$12,
});
function meta$12() {
  return [{ title: "Mentor Dashboard — MiniBooking" }];
}
function formatPrice$3(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}
function formatSlotTime$1(iso) {
  return new Date(iso).toLocaleString("vi-VN", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
function StatCard({ icon: Icon, label, value }) {
  return /* @__PURE__ */ jsx(Card, {
    children: /* @__PURE__ */ jsxs(CardContent, {
      className: "flex items-center gap-4 p-5",
      children: [
        /* @__PURE__ */ jsx("div", {
          className:
            "flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10",
          children: /* @__PURE__ */ jsx(Icon, {
            className: "size-5 text-primary",
          }),
        }),
        /* @__PURE__ */ jsxs("div", {
          children: [
            /* @__PURE__ */ jsx("p", {
              className: "text-sm text-muted-foreground",
              children: label,
            }),
            /* @__PURE__ */ jsx("p", {
              className: "text-2xl font-bold",
              children: value,
            }),
          ],
        }),
      ],
    }),
  });
}
function DashboardSkeleton() {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-64" }),
      /* @__PURE__ */ jsxs("div", {
        className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
        children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-24" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-24" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-24" }),
        ],
      }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-48" }),
    ],
  });
}
var dashboard_default$1 = UNSAFE_withComponentProps(function MentorDashboard() {
  const user = useCurrentUser();
  const navigate = useNavigate();
  const { mentor, isPending } = useMyMentorProfile();
  if (isPending) return /* @__PURE__ */ jsx(DashboardSkeleton, {});
  const now = /* @__PURE__ */ new Date();
  const upcomingSlots = (mentor?.slots ?? [])
    .filter(
      (s) => s.status === SLOT_STATUS.Available && new Date(s.startTime) > now,
    )
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
    )
    .slice(0, 5);
  const totalBookedSlots = (mentor?.slots ?? []).reduce(
    (sum, s) => sum + s.currentBookings,
    0,
  );
  const skillsCount = mentor?.skills.length ?? 0;
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        children: [
          /* @__PURE__ */ jsxs("h2", {
            className: "text-2xl font-semibold tracking-tight",
            children: ["Welcome, ", user?.fullName],
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-muted-foreground",
            children: "Manage your sessions and availability.",
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
        children: [
          /* @__PURE__ */ jsx(StatCard, {
            icon: CalendarDays,
            label: "Upcoming Sessions",
            value: upcomingSlots.length,
          }),
          /* @__PURE__ */ jsx(StatCard, {
            icon: Users,
            label: "Total Bookings",
            value: totalBookedSlots,
          }),
          /* @__PURE__ */ jsx(StatCard, {
            icon: GraduationCap,
            label: "Active Skills",
            value: skillsCount,
          }),
        ],
      }),
      /* @__PURE__ */ jsxs(Card, {
        children: [
          /* @__PURE__ */ jsxs(CardHeader, {
            className: "flex flex-row items-center justify-between pb-3",
            children: [
              /* @__PURE__ */ jsx(CardTitle, {
                className: "text-base",
                children: "Upcoming Sessions",
              }),
              /* @__PURE__ */ jsx(Button, {
                variant: "ghost",
                size: "sm",
                onClick: () => navigate("/mentor/schedule"),
                children: "View all",
              }),
            ],
          }),
          /* @__PURE__ */ jsx(CardContent, {
            children:
              upcomingSlots.length === 0
                ? /* @__PURE__ */ jsxs("div", {
                    className: "flex flex-col items-center py-8 text-center",
                    children: [
                      /* @__PURE__ */ jsx(CalendarDays, {
                        className: "mb-3 size-8 text-muted-foreground/50",
                      }),
                      /* @__PURE__ */ jsx("p", {
                        className: "text-sm text-muted-foreground",
                        children:
                          "No upcoming sessions. Create a slot to get started.",
                      }),
                      /* @__PURE__ */ jsx(Button, {
                        variant: "outline",
                        size: "sm",
                        className: "mt-3",
                        onClick: () => navigate("/mentor/schedule"),
                        children: "Manage Schedule",
                      }),
                    ],
                  })
                : /* @__PURE__ */ jsx("div", {
                    className: "space-y-3",
                    children: upcomingSlots.map((slot) =>
                      /* @__PURE__ */ jsxs(
                        "div",
                        {
                          className:
                            "flex items-center justify-between rounded-lg border p-3",
                          children: [
                            /* @__PURE__ */ jsxs("div", {
                              className: "space-y-1",
                              children: [
                                /* @__PURE__ */ jsxs("div", {
                                  className:
                                    "flex items-center gap-2 text-sm font-medium",
                                  children: [
                                    /* @__PURE__ */ jsx(Clock, {
                                      className:
                                        "size-3.5 text-muted-foreground",
                                    }),
                                    /* @__PURE__ */ jsx("span", {
                                      children: formatSlotTime$1(
                                        slot.startTime,
                                      ),
                                    }),
                                    /* @__PURE__ */ jsx("span", {
                                      className: "text-muted-foreground",
                                      children: "—",
                                    }),
                                    /* @__PURE__ */ jsx("span", {
                                      children: formatSlotTime$1(slot.endTime),
                                    }),
                                  ],
                                }),
                                /* @__PURE__ */ jsxs("div", {
                                  className:
                                    "flex items-center gap-3 text-xs text-muted-foreground",
                                  children: [
                                    /* @__PURE__ */ jsxs("span", {
                                      className: "flex items-center gap-1",
                                      children: [
                                        /* @__PURE__ */ jsx(DollarSign, {
                                          className: "size-3",
                                        }),
                                        formatPrice$3(slot.price),
                                      ],
                                    }),
                                    /* @__PURE__ */ jsxs("span", {
                                      children: [
                                        slot.currentBookings,
                                        "/",
                                        slot.maxBookings,
                                        " booked",
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            /* @__PURE__ */ jsx(Badge, {
                              variant: "default",
                              className: "text-xs",
                              children: SLOT_STATUS_LABEL[slot.status],
                            }),
                          ],
                        },
                        slot.id,
                      ),
                    ),
                  }),
          }),
        ],
      }),
      /* @__PURE__ */ jsxs(Card, {
        children: [
          /* @__PURE__ */ jsx(CardHeader, {
            className: "pb-3",
            children: /* @__PURE__ */ jsx(CardTitle, {
              className: "text-base",
              children: "Quick Actions",
            }),
          }),
          /* @__PURE__ */ jsx(CardContent, {
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex flex-wrap gap-3",
              children: [
                /* @__PURE__ */ jsxs(Button, {
                  variant: "outline",
                  size: "sm",
                  className: "gap-1.5",
                  onClick: () => navigate("/mentor/schedule"),
                  children: [
                    /* @__PURE__ */ jsx(CalendarDays, { className: "size-4" }),
                    "Create Slot",
                  ],
                }),
                /* @__PURE__ */ jsxs(Button, {
                  variant: "outline",
                  size: "sm",
                  className: "gap-1.5",
                  onClick: () => navigate("/mentor/skills"),
                  children: [
                    /* @__PURE__ */ jsx(GraduationCap, { className: "size-4" }),
                    "Manage Skills",
                  ],
                }),
                /* @__PURE__ */ jsxs(Button, {
                  variant: "outline",
                  size: "sm",
                  className: "gap-1.5",
                  onClick: () => navigate("/mentor/profile"),
                  children: [
                    /* @__PURE__ */ jsx(TrendingUp, { className: "size-4" }),
                    "View Profile",
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
});
//#endregion
//#region app/hooks/mentor/use-create-mentor-slot-mutation.ts
function useCreateMentorSlotMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ mentorId, ...body }) =>
      mentorService.createSlot(mentorId, body),
    onSuccess: (_data, { mentorId }) => {
      qc.invalidateQueries({ queryKey: queryKeys.mentors.detail(mentorId) });
      toast.success("Slot created successfully");
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err));
    },
  });
}
//#endregion
//#region app/hooks/mentor/use-update-mentor-slot-mutation.ts
function useUpdateMentorSlotMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ mentorId, slotId, ...body }) =>
      mentorService.updateSlot(mentorId, slotId, body),
    onSuccess: (_data, { mentorId }) => {
      qc.invalidateQueries({ queryKey: queryKeys.mentors.detail(mentorId) });
      toast.success("Slot updated successfully");
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err));
    },
  });
}
//#endregion
//#region app/features/admin/mentor/schemas/mentor-slot.schema.ts
var mentorSlotSchema = z
  .object({
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    price: z
      .number({ error: "Price must be a number" })
      .min(0, "Price must not be negative"),
    maxBookings: z
      .number({ error: "Max bookings must be a number" })
      .int("Max bookings must be an integer")
      .min(1, "Max bookings must be at least 1"),
    description: z
      .string()
      .max(1e3, "Description must not exceed 1000 characters")
      .optional()
      .or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    const start = new Date(data.startTime);
    const end = new Date(data.endTime);
    const now = /* @__PURE__ */ new Date();
    if (isNaN(start.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid start time",
        path: ["startTime"],
      });
      return;
    }
    if (isNaN(end.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid end time",
        path: ["endTime"],
      });
      return;
    }
    if (start <= now)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Start time must be in the future",
        path: ["startTime"],
      });
    if (end <= start) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End time must be after start time",
        path: ["endTime"],
      });
      return;
    }
    const durationMinutes = (end.getTime() - start.getTime()) / 6e4;
    if (durationMinutes < 30)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Slot duration must be at least 30 minutes",
        path: ["endTime"],
      });
    if (durationMinutes > 720)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Slot duration must not exceed 12 hours",
        path: ["endTime"],
      });
  });
//#endregion
//#region app/features/admin/mentor/components/mentor-slot-form.tsx
function toDatetimeLocal(iso) {
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function fromDatetimeLocal(local) {
  return new Date(local).toISOString();
}
function MentorSlotForm({ mentorId, slot, onSuccess }) {
  const isEdit = !!slot;
  const createMutation = useCreateMentorSlotMutation();
  const updateMutation = useUpdateMentorSlotMutation();
  const isPending = createMutation.isPending || updateMutation.isPending;
  const form = useForm({
    resolver: zodResolver(mentorSlotSchema),
    defaultValues: slot
      ? {
          startTime: toDatetimeLocal(slot.startTime),
          endTime: toDatetimeLocal(slot.endTime),
          price: slot.price,
          maxBookings: slot.maxBookings ?? 1,
          description: slot.description ?? "",
        }
      : {
          startTime: "",
          endTime: "",
          price: 0,
          maxBookings: 1,
          description: "",
        },
  });
  async function onSubmit(data) {
    const payload = {
      startTime: fromDatetimeLocal(data.startTime),
      endTime: fromDatetimeLocal(data.endTime),
      price: data.price,
      maxBookings: data.maxBookings,
      description: data.description || null,
    };
    if (isEdit && slot)
      await updateMutation.mutateAsync({
        mentorId,
        slotId: slot.id,
        ...payload,
      });
    else
      await createMutation.mutateAsync({
        mentorId,
        ...payload,
      });
    form.reset();
    onSuccess?.();
  }
  return /* @__PURE__ */ jsx(Form, {
    ...form,
    children: /* @__PURE__ */ jsxs("form", {
      onSubmit: form.handleSubmit(onSubmit),
      className: "space-y-4",
      id: "slot-form",
      children: [
        /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
          children: [
            /* @__PURE__ */ jsx(FormField, {
              control: form.control,
              name: "startTime",
              render: ({ field }) =>
                /* @__PURE__ */ jsxs(FormItem, {
                  children: [
                    /* @__PURE__ */ jsx(FormLabel, {
                      children: "Start Time *",
                    }),
                    /* @__PURE__ */ jsx(FormControl, {
                      children: /* @__PURE__ */ jsx(Input, {
                        type: "datetime-local",
                        ...field,
                      }),
                    }),
                    /* @__PURE__ */ jsx(FormMessage, {}),
                  ],
                }),
            }),
            /* @__PURE__ */ jsx(FormField, {
              control: form.control,
              name: "endTime",
              render: ({ field }) =>
                /* @__PURE__ */ jsxs(FormItem, {
                  children: [
                    /* @__PURE__ */ jsx(FormLabel, { children: "End Time *" }),
                    /* @__PURE__ */ jsx(FormControl, {
                      children: /* @__PURE__ */ jsx(Input, {
                        type: "datetime-local",
                        ...field,
                      }),
                    }),
                    /* @__PURE__ */ jsx(FormMessage, {}),
                  ],
                }),
            }),
          ],
        }),
        /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
          children: [
            /* @__PURE__ */ jsx(FormField, {
              control: form.control,
              name: "price",
              render: ({ field }) =>
                /* @__PURE__ */ jsxs(FormItem, {
                  children: [
                    /* @__PURE__ */ jsx(FormLabel, {
                      children: "Price (VND) *",
                    }),
                    /* @__PURE__ */ jsx(FormControl, {
                      children: /* @__PURE__ */ jsx(Input, {
                        type: "number",
                        min: 0,
                        step: 1e3,
                        ...field,
                        onChange: (e) => field.onChange(Number(e.target.value)),
                      }),
                    }),
                    /* @__PURE__ */ jsx(FormMessage, {}),
                  ],
                }),
            }),
            /* @__PURE__ */ jsx(FormField, {
              control: form.control,
              name: "maxBookings",
              render: ({ field }) =>
                /* @__PURE__ */ jsxs(FormItem, {
                  children: [
                    /* @__PURE__ */ jsx(FormLabel, {
                      children: "Max Bookings *",
                    }),
                    /* @__PURE__ */ jsx(FormControl, {
                      children: /* @__PURE__ */ jsx(Input, {
                        type: "number",
                        min: 1,
                        ...field,
                        onChange: (e) => field.onChange(Number(e.target.value)),
                      }),
                    }),
                    /* @__PURE__ */ jsx(FormMessage, {}),
                  ],
                }),
            }),
          ],
        }),
        /* @__PURE__ */ jsx(FormField, {
          control: form.control,
          name: "description",
          render: ({ field }) =>
            /* @__PURE__ */ jsxs(FormItem, {
              children: [
                /* @__PURE__ */ jsx(FormLabel, { children: "Description" }),
                /* @__PURE__ */ jsx(FormControl, {
                  children: /* @__PURE__ */ jsx(Textarea, {
                    placeholder: "Optional notes about this slot...",
                    className: "resize-none",
                    rows: 2,
                    ...field,
                    value: field.value ?? "",
                  }),
                }),
                /* @__PURE__ */ jsx(FormMessage, {}),
              ],
            }),
        }),
        /* @__PURE__ */ jsxs(Button, {
          type: "submit",
          className: "w-full",
          disabled: isPending,
          children: [
            isPending &&
              /* @__PURE__ */ jsx(Loader2, {
                className: "mr-2 size-4 animate-spin",
              }),
            isEdit ? "Update Slot" : "Create Slot",
          ],
        }),
      ],
    }),
  });
}
//#endregion
//#region app/routes/mentor/schedule.tsx
var schedule_exports = /* @__PURE__ */ __exportAll({
  default: () => schedule_default,
  meta: () => meta$11,
});
function meta$11() {
  return [{ title: "My Schedule — MiniBooking" }];
}
function formatPrice$2(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}
function formatTime(iso) {
  return new Date(iso).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
var STATUS_VARIANT$1 = {
  [SLOT_STATUS.Available]: "default",
  [SLOT_STATUS.FullyBooked]: "secondary",
  [SLOT_STATUS.Blocked]: "outline",
  [SLOT_STATUS.Cancelled]: "destructive",
  [SLOT_STATUS.Completed]: "outline",
};
var schedule_default = UNSAFE_withComponentProps(function MentorSchedule() {
  const { mentor, mentorId, isPending } = useMyMentorProfile();
  const [createOpen, setCreateOpen] = useState(false);
  const [editSlot, setEditSlot] = useState(null);
  const [filter, setFilter] = useState("upcoming");
  if (isPending)
    return /* @__PURE__ */ jsxs("div", {
      className: "space-y-6",
      children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-48" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-64" }),
        /* @__PURE__ */ jsx("div", {
          className: "space-y-4",
          children: Array.from({ length: 3 }).map((_, i) =>
            /* @__PURE__ */ jsx(Skeleton, { className: "h-24" }, i),
          ),
        }),
      ],
    });
  const now = /* @__PURE__ */ new Date();
  const sorted = [
    ...(mentor?.slots ?? []).filter((slot) => {
      const slotTime = new Date(slot.startTime);
      if (filter === "upcoming") return slotTime > now;
      if (filter === "past") return slotTime <= now;
      return true;
    }),
  ].sort((a, b) => {
    if (filter === "past")
      return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
  });
  const groups = [];
  for (const slot of sorted) {
    const slotDate = new Date(slot.startTime);
    const existing = groups.find((g) => isSameDay(g.date, slotDate));
    if (existing) existing.slots.push(slot);
    else
      groups.push({
        date: slotDate,
        slots: [slot],
      });
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        className:
          "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        children: [
          /* @__PURE__ */ jsxs("div", {
            children: [
              /* @__PURE__ */ jsx("h2", {
                className: "text-2xl font-semibold tracking-tight",
                children: "My Schedule",
              }),
              /* @__PURE__ */ jsx("p", {
                className: "text-muted-foreground",
                children: "Manage your available time slots.",
              }),
            ],
          }),
          /* @__PURE__ */ jsxs(Button, {
            onClick: () => setCreateOpen(true),
            className: "gap-1.5 self-start sm:self-auto",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "size-4" }),
              "New Slot",
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsx(Tabs$1, {
        value: filter,
        onValueChange: (v) => setFilter(v),
        children: /* @__PURE__ */ jsxs(TabsList, {
          children: [
            /* @__PURE__ */ jsx(TabsTrigger, {
              value: "upcoming",
              children: "Upcoming",
            }),
            /* @__PURE__ */ jsx(TabsTrigger, {
              value: "past",
              children: "Past",
            }),
            /* @__PURE__ */ jsx(TabsTrigger, {
              value: "all",
              children: "All",
            }),
          ],
        }),
      }),
      groups.length === 0
        ? /* @__PURE__ */ jsxs("div", {
            className:
              "flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center",
            children: [
              /* @__PURE__ */ jsx(CalendarDays, {
                className: "mb-4 size-10 text-muted-foreground/50",
              }),
              /* @__PURE__ */ jsx("p", {
                className: "text-sm font-medium text-muted-foreground",
                children:
                  filter === "upcoming"
                    ? "No upcoming slots"
                    : filter === "past"
                      ? "No past slots"
                      : "No slots created yet",
              }),
              /* @__PURE__ */ jsx("p", {
                className: "mt-1 text-xs text-muted-foreground/70",
                children: "Create a slot to start accepting bookings.",
              }),
              /* @__PURE__ */ jsx(Button, {
                variant: "outline",
                size: "sm",
                className: "mt-4",
                onClick: () => setCreateOpen(true),
                children: "Create first slot",
              }),
            ],
          })
        : /* @__PURE__ */ jsx("div", {
            className: "space-y-6",
            children: groups.map((group) =>
              /* @__PURE__ */ jsxs(
                "div",
                {
                  children: [
                    /* @__PURE__ */ jsx("h3", {
                      className:
                        "mb-3 text-sm font-medium text-muted-foreground",
                      children: format(group.date, "EEEE, dd/MM/yyyy"),
                    }),
                    /* @__PURE__ */ jsx("div", {
                      className: "space-y-2",
                      children: group.slots.map((slot) =>
                        /* @__PURE__ */ jsx(
                          Card,
                          {
                            className: "transition-colors hover:bg-muted/30",
                            children: /* @__PURE__ */ jsxs(CardContent, {
                              className:
                                "flex items-center justify-between p-4",
                              children: [
                                /* @__PURE__ */ jsxs("div", {
                                  className: "space-y-1",
                                  children: [
                                    /* @__PURE__ */ jsxs("div", {
                                      className:
                                        "flex items-center gap-2 text-sm font-medium",
                                      children: [
                                        /* @__PURE__ */ jsx(Clock, {
                                          className:
                                            "size-3.5 text-muted-foreground",
                                        }),
                                        /* @__PURE__ */ jsx("span", {
                                          children: formatTime(slot.startTime),
                                        }),
                                        /* @__PURE__ */ jsx("span", {
                                          className: "text-muted-foreground",
                                          children: "—",
                                        }),
                                        /* @__PURE__ */ jsx("span", {
                                          children: formatTime(slot.endTime),
                                        }),
                                      ],
                                    }),
                                    /* @__PURE__ */ jsxs("div", {
                                      className:
                                        "flex flex-wrap items-center gap-3 text-xs text-muted-foreground",
                                      children: [
                                        /* @__PURE__ */ jsxs("span", {
                                          className:
                                            "flex items-center gap-1 font-medium text-foreground",
                                          children: [
                                            /* @__PURE__ */ jsx(DollarSign, {
                                              className: "size-3",
                                            }),
                                            formatPrice$2(slot.price),
                                          ],
                                        }),
                                        /* @__PURE__ */ jsxs("span", {
                                          className: "flex items-center gap-1",
                                          children: [
                                            /* @__PURE__ */ jsx(Users, {
                                              className: "size-3",
                                            }),
                                            slot.currentBookings,
                                            "/",
                                            slot.maxBookings,
                                          ],
                                        }),
                                        slot.description &&
                                          /* @__PURE__ */ jsx("span", {
                                            className: "truncate max-w-[200px]",
                                            children: slot.description,
                                          }),
                                      ],
                                    }),
                                  ],
                                }),
                                /* @__PURE__ */ jsxs("div", {
                                  className: "flex items-center gap-2 shrink-0",
                                  children: [
                                    /* @__PURE__ */ jsx(Badge, {
                                      variant:
                                        STATUS_VARIANT$1[slot.status] ??
                                        "secondary",
                                      className: "text-xs",
                                      children: SLOT_STATUS_LABEL[slot.status],
                                    }),
                                    slot.status === SLOT_STATUS.Available &&
                                      /* @__PURE__ */ jsx(Button, {
                                        variant: "ghost",
                                        size: "icon",
                                        className: "size-8",
                                        onClick: () => setEditSlot(slot),
                                        children: /* @__PURE__ */ jsx(Edit, {
                                          className: "size-3.5",
                                        }),
                                      }),
                                  ],
                                }),
                              ],
                            }),
                          },
                          slot.id,
                        ),
                      ),
                    }),
                  ],
                },
                group.date.toISOString(),
              ),
            ),
          }),
      /* @__PURE__ */ jsx(Dialog$1, {
        open: createOpen,
        onOpenChange: setCreateOpen,
        children: /* @__PURE__ */ jsxs(DialogContent, {
          className: "sm:max-w-md",
          children: [
            /* @__PURE__ */ jsx(DialogHeader, {
              children: /* @__PURE__ */ jsx(DialogTitle, {
                children: "Create New Slot",
              }),
            }),
            mentorId &&
              /* @__PURE__ */ jsx(MentorSlotForm, {
                mentorId,
                onSuccess: () => setCreateOpen(false),
              }),
          ],
        }),
      }),
      /* @__PURE__ */ jsx(Dialog$1, {
        open: !!editSlot,
        onOpenChange: (o) => !o && setEditSlot(null),
        children: /* @__PURE__ */ jsxs(DialogContent, {
          className: "sm:max-w-md",
          children: [
            /* @__PURE__ */ jsx(DialogHeader, {
              children: /* @__PURE__ */ jsx(DialogTitle, {
                children: "Edit Slot",
              }),
            }),
            mentorId &&
              editSlot &&
              /* @__PURE__ */ jsx(MentorSlotForm, {
                mentorId,
                slot: editSlot,
                onSuccess: () => setEditSlot(null),
              }),
          ],
        }),
      }),
    ],
  });
});
//#endregion
//#region app/hooks/mentor/use-add-mentor-skill-mutation.ts
function useAddMentorSkillMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ mentorId, skillName }) =>
      mentorService.addSkill(mentorId, { skillName }),
    onSuccess: (_data, { mentorId }) => {
      qc.invalidateQueries({ queryKey: queryKeys.mentors.detail(mentorId) });
      toast.success("Skill added successfully");
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err));
    },
  });
}
//#endregion
//#region app/features/admin/mentor/schemas/mentor-skill.schema.ts
var addSkillSchema = z.object({
  skillName: z
    .string()
    .min(1, "Skill name is required")
    .max(100, "Skill name must not exceed 100 characters"),
});
//#endregion
//#region app/features/admin/mentor/components/mentor-skills-form.tsx
function MentorSkillsForm({ mentorId }) {
  const { mutateAsync, isPending } = useAddMentorSkillMutation();
  const form = useForm({
    resolver: zodResolver(addSkillSchema),
    defaultValues: { skillName: "" },
  });
  async function onSubmit(data) {
    await mutateAsync({
      mentorId,
      skillName: data.skillName,
    });
    form.reset();
  }
  return /* @__PURE__ */ jsx(Form, {
    ...form,
    children: /* @__PURE__ */ jsxs("form", {
      onSubmit: form.handleSubmit(onSubmit),
      className: "flex items-start gap-2",
      children: [
        /* @__PURE__ */ jsx(FormField, {
          control: form.control,
          name: "skillName",
          render: ({ field }) =>
            /* @__PURE__ */ jsxs(FormItem, {
              className: "flex-1",
              children: [
                /* @__PURE__ */ jsx(FormControl, {
                  children: /* @__PURE__ */ jsx(Input, {
                    placeholder: "Add a skill (e.g. React, Node.js)",
                    ...field,
                    disabled: isPending,
                  }),
                }),
                /* @__PURE__ */ jsx(FormMessage, {}),
              ],
            }),
        }),
        /* @__PURE__ */ jsxs(Button, {
          type: "submit",
          size: "sm",
          disabled: isPending,
          className: "gap-1.5",
          children: [
            isPending
              ? /* @__PURE__ */ jsx(Loader2, {
                  className: "size-4 animate-spin",
                })
              : /* @__PURE__ */ jsx(Plus, { className: "size-4" }),
            "Add",
          ],
        }),
      ],
    }),
  });
}
//#endregion
//#region app/hooks/mentor/use-remove-mentor-skill-mutation.ts
function useRemoveMentorSkillMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ mentorId, skillId }) =>
      mentorService.removeSkill(mentorId, skillId),
    onSuccess: (_data, { mentorId }) => {
      qc.invalidateQueries({ queryKey: queryKeys.mentors.detail(mentorId) });
      toast.success("Skill removed successfully");
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err));
    },
  });
}
//#endregion
//#region app/routes/mentor/skills.tsx
var skills_exports = /* @__PURE__ */ __exportAll({
  default: () => skills_default,
  meta: () => meta$10,
});
function meta$10() {
  return [{ title: "My Skills — MiniBooking" }];
}
var skills_default = UNSAFE_withComponentProps(function MentorSkills() {
  const { mentor, mentorId, isPending } = useMyMentorProfile();
  const {
    mutate: removeSkill,
    isPending: isRemoving,
    variables,
  } = useRemoveMentorSkillMutation();
  if (isPending)
    return /* @__PURE__ */ jsxs("div", {
      className: "space-y-6",
      children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-48" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-12 w-full" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-32 w-full" }),
      ],
    });
  const skills = mentor?.skills ?? [];
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        children: [
          /* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-semibold tracking-tight",
            children: "My Skills",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-muted-foreground",
            children: "Add and manage the skills you mentor in.",
          }),
        ],
      }),
      /* @__PURE__ */ jsxs(Card, {
        children: [
          /* @__PURE__ */ jsx(CardHeader, {
            className: "pb-3",
            children: /* @__PURE__ */ jsx(CardTitle, {
              className: "text-base",
              children: "Add New Skill",
            }),
          }),
          /* @__PURE__ */ jsx(CardContent, {
            children:
              mentorId && /* @__PURE__ */ jsx(MentorSkillsForm, { mentorId }),
          }),
        ],
      }),
      /* @__PURE__ */ jsx(Separator$1, {}),
      /* @__PURE__ */ jsxs(Card, {
        children: [
          /* @__PURE__ */ jsx(CardHeader, {
            className: "pb-3",
            children: /* @__PURE__ */ jsxs(CardTitle, {
              className: "text-base",
              children: [
                "Current Skills",
                /* @__PURE__ */ jsxs("span", {
                  className: "ml-2 text-xs font-normal text-muted-foreground",
                  children: ["(", skills.length, ")"],
                }),
              ],
            }),
          }),
          /* @__PURE__ */ jsx(CardContent, {
            children:
              skills.length === 0
                ? /* @__PURE__ */ jsxs("div", {
                    className:
                      "flex flex-col items-center justify-center rounded-xl border border-dashed py-10 text-center",
                    children: [
                      /* @__PURE__ */ jsx(GraduationCap, {
                        className: "mb-3 size-8 text-muted-foreground/50",
                      }),
                      /* @__PURE__ */ jsx("p", {
                        className: "text-sm text-muted-foreground",
                        children: "No skills added yet.",
                      }),
                      /* @__PURE__ */ jsx("p", {
                        className: "mt-1 text-xs text-muted-foreground/70",
                        children:
                          "Add skills to let students know what you can teach.",
                      }),
                    ],
                  })
                : /* @__PURE__ */ jsx("div", {
                    className: "flex flex-wrap gap-2",
                    children: skills.map((skill) => {
                      const removing =
                        isRemoving && variables?.skillId === skill.id;
                      return /* @__PURE__ */ jsxs(
                        Badge,
                        {
                          variant: "secondary",
                          className: "gap-1.5 px-3 py-1.5 text-sm",
                          children: [
                            skill.skillName,
                            /* @__PURE__ */ jsxs(Tooltip$1, {
                              children: [
                                /* @__PURE__ */ jsx(TooltipTrigger, {
                                  asChild: true,
                                  children: /* @__PURE__ */ jsx("button", {
                                    type: "button",
                                    onClick: () =>
                                      mentorId &&
                                      removeSkill({
                                        mentorId,
                                        skillId: skill.id,
                                      }),
                                    disabled: removing,
                                    className:
                                      "ml-0.5 rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50",
                                    "aria-label": `Remove ${skill.skillName}`,
                                    children: removing
                                      ? /* @__PURE__ */ jsx(Loader2, {
                                          className: "size-3 animate-spin",
                                        })
                                      : /* @__PURE__ */ jsx(X, {
                                          className: "size-3",
                                        }),
                                  }),
                                }),
                                /* @__PURE__ */ jsx(TooltipContent, {
                                  children: "Remove skill",
                                }),
                              ],
                            }),
                          ],
                        },
                        skill.id,
                      );
                    }),
                  }),
          }),
        ],
      }),
    ],
  });
});
//#endregion
//#region app/routes/mentor/bookings.tsx
var bookings_exports$1 = /* @__PURE__ */ __exportAll({
  default: () => bookings_default$1,
  meta: () => meta$9,
});
function meta$9() {
  return [{ title: "Bookings — MiniBooking" }];
}
function formatSlotTime(iso) {
  return new Date(iso).toLocaleString("vi-VN", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
function formatPrice$1(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}
var SLOT_FILTER_TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Available",
    value: "available",
    filter: SLOT_STATUS.Available,
  },
  {
    label: "Fully Booked",
    value: "booked",
    filter: SLOT_STATUS.FullyBooked,
  },
  {
    label: "Completed",
    value: "completed",
    filter: SLOT_STATUS.Completed,
  },
];
function SlotBookingCard({ slot }) {
  const isFuture = new Date(slot.startTime) > /* @__PURE__ */ new Date();
  const statusVariant = {
    [SLOT_STATUS.Available]: "default",
    [SLOT_STATUS.FullyBooked]: "secondary",
    [SLOT_STATUS.Blocked]: "outline",
    [SLOT_STATUS.Cancelled]: "destructive",
    [SLOT_STATUS.Completed]: "outline",
  };
  return /* @__PURE__ */ jsx(Card, {
    className: !isFuture ? "opacity-70" : "",
    children: /* @__PURE__ */ jsx(CardContent, {
      className: "p-4",
      children: /* @__PURE__ */ jsxs("div", {
        className: "flex items-center justify-between gap-4",
        children: [
          /* @__PURE__ */ jsxs("div", {
            className: "min-w-0 flex-1 space-y-1",
            children: [
              /* @__PURE__ */ jsxs("div", {
                className: "flex items-center gap-2 text-sm font-medium",
                children: [
                  /* @__PURE__ */ jsx(Clock, {
                    className: "size-3.5 text-muted-foreground",
                  }),
                  /* @__PURE__ */ jsx("span", {
                    children: formatSlotTime(slot.startTime),
                  }),
                  /* @__PURE__ */ jsx("span", {
                    className: "text-muted-foreground",
                    children: "—",
                  }),
                  /* @__PURE__ */ jsx("span", {
                    children: formatSlotTime(slot.endTime),
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs("div", {
                className:
                  "flex flex-wrap items-center gap-3 text-xs text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxs("span", {
                    className:
                      "flex items-center gap-1 font-medium text-foreground",
                    children: [
                      /* @__PURE__ */ jsx(DollarSign, { className: "size-3" }),
                      formatPrice$1(slot.price),
                    ],
                  }),
                  /* @__PURE__ */ jsxs("span", {
                    className: "flex items-center gap-1",
                    children: [
                      /* @__PURE__ */ jsx(User, { className: "size-3" }),
                      slot.currentBookings,
                      "/",
                      slot.maxBookings,
                      " booked",
                    ],
                  }),
                  slot.description &&
                    /* @__PURE__ */ jsx("span", {
                      className: "truncate max-w-[200px]",
                      children: slot.description,
                    }),
                ],
              }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-2 shrink-0",
            children: [
              slot.currentBookings > 0 &&
                /* @__PURE__ */ jsxs(Badge, {
                  variant: "outline",
                  className: "text-xs gap-1",
                  children: [
                    /* @__PURE__ */ jsx(User, { className: "size-3" }),
                    slot.currentBookings,
                  ],
                }),
              /* @__PURE__ */ jsx(Badge, {
                variant: statusVariant[slot.status] ?? "secondary",
                className: "text-xs",
                children: SLOT_STATUS_LABEL[slot.status],
              }),
            ],
          }),
        ],
      }),
    }),
  });
}
var bookings_default$1 = UNSAFE_withComponentProps(function MentorBookings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { mentor, isPending } = useMyMentorProfile();
  const activeTab = searchParams.get("filter") ?? "all";
  const statusFilter = SLOT_FILTER_TABS.find(
    (t) => t.value === activeTab,
  )?.filter;
  const allSlots = mentor?.slots ?? [];
  const sorted = [
    ...(statusFilter != null
      ? allSlots.filter((s) => s.status === statusFilter)
      : allSlots),
  ].sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
  );
  const totalBookings = allSlots.reduce((sum, s) => sum + s.currentBookings, 0);
  function handleTabChange(value) {
    const params = new URLSearchParams();
    if (value !== "all") params.set("filter", value);
    setSearchParams(params, { replace: true });
  }
  if (isPending)
    return /* @__PURE__ */ jsxs("div", {
      className: "space-y-6",
      children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-48" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-64" }),
        /* @__PURE__ */ jsx("div", {
          className: "space-y-3",
          children: Array.from({ length: 4 }).map((_, i) =>
            /* @__PURE__ */ jsx(Skeleton, { className: "h-20" }, i),
          ),
        }),
      ],
    });
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        children: [
          /* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-semibold tracking-tight",
            children: "Bookings",
          }),
          /* @__PURE__ */ jsxs("p", {
            className: "text-muted-foreground",
            children: [
              "View sessions booked with you.",
              totalBookings > 0 &&
                /* @__PURE__ */ jsxs("span", {
                  className: "ml-1 font-medium text-foreground",
                  children: [
                    totalBookings,
                    " total booking",
                    totalBookings !== 1 ? "s" : "",
                  ],
                }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsx(Tabs$1, {
        value: activeTab,
        onValueChange: handleTabChange,
        children: /* @__PURE__ */ jsx(TabsList, {
          className: "w-full justify-start overflow-x-auto",
          children: SLOT_FILTER_TABS.map((tab) =>
            /* @__PURE__ */ jsx(
              TabsTrigger,
              {
                value: tab.value,
                className: "text-xs sm:text-sm",
                children: tab.label,
              },
              tab.value,
            ),
          ),
        }),
      }),
      sorted.length === 0
        ? /* @__PURE__ */ jsxs("div", {
            className:
              "flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center",
            children: [
              /* @__PURE__ */ jsx(BookOpen, {
                className: "mb-4 size-10 text-muted-foreground/50",
              }),
              /* @__PURE__ */ jsx("p", {
                className: "text-sm font-medium text-muted-foreground",
                children:
                  activeTab === "all"
                    ? "No bookings yet"
                    : "No slots with this status",
              }),
              /* @__PURE__ */ jsx("p", {
                className: "mt-1 text-xs text-muted-foreground/70",
                children:
                  "Create time slots to start receiving bookings from students.",
              }),
            ],
          })
        : /* @__PURE__ */ jsx("div", {
            className: "space-y-3",
            children: sorted.map((slot) =>
              /* @__PURE__ */ jsx(SlotBookingCard, { slot }, slot.id),
            ),
          }),
    ],
  });
});
//#endregion
//#region app/routes/mentor/ai-chat.tsx
var ai_chat_exports = /* @__PURE__ */ __exportAll({
  default: () => ai_chat_default,
  meta: () => meta$8,
});
function meta$8() {
  return [{ title: "AI Assistant — MiniBooking" }];
}
var ai_chat_default = UNSAFE_withComponentProps(function MentorAiChat() {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex h-full flex-col space-y-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        children: [
          /* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-semibold tracking-tight",
            children: "AI Assistant",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-muted-foreground",
            children: "Get guidance and insights to improve your mentoring.",
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className:
          "flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center",
        children: [
          /* @__PURE__ */ jsx(Bot, {
            className: "mb-4 size-10 text-muted-foreground/50",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-sm font-medium text-muted-foreground",
            children: "AI chat coming soon",
          }),
        ],
      }),
    ],
  });
});
//#endregion
//#region app/routes/mentor/profile.tsx
var profile_exports = /* @__PURE__ */ __exportAll({
  default: () => profile_default,
  meta: () => meta$7,
});
function meta$7() {
  return [{ title: "Profile — MiniBooking" }];
}
function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}
var profile_default = UNSAFE_withComponentProps(function MentorProfile() {
  const user = useCurrentUser();
  const { mentor, isPending } = useMyMentorProfile();
  if (isPending)
    return /* @__PURE__ */ jsxs("div", {
      className: "space-y-6",
      children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-48" }),
        /* @__PURE__ */ jsxs("div", {
          className: "flex items-center gap-4",
          children: [
            /* @__PURE__ */ jsx(Skeleton, {
              className: "size-20 rounded-full",
            }),
            /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [
                /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-48" }),
                /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-32" }),
              ],
            }),
          ],
        }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-48 w-full" }),
      ],
    });
  const initials = (mentor?.displayName ?? user?.fullName ?? "?")
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        children: [
          /* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-semibold tracking-tight",
            children: "Profile",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-muted-foreground",
            children: "Your mentor profile information.",
          }),
        ],
      }),
      /* @__PURE__ */ jsx(Card, {
        children: /* @__PURE__ */ jsx(CardContent, {
          className: "p-6",
          children: /* @__PURE__ */ jsxs("div", {
            className:
              "flex flex-col items-center gap-6 sm:flex-row sm:items-start",
            children: [
              /* @__PURE__ */ jsxs("div", {
                className: "relative shrink-0",
                children: [
                  /* @__PURE__ */ jsxs(Avatar$1, {
                    className:
                      "size-20 ring-2 ring-border ring-offset-2 ring-offset-background",
                    children: [
                      /* @__PURE__ */ jsx(AvatarImage, {
                        src: mentor?.avatarUrl ?? void 0,
                        alt: mentor?.displayName,
                      }),
                      /* @__PURE__ */ jsx(AvatarFallback, {
                        className: "text-lg font-semibold",
                        children: initials,
                      }),
                    ],
                  }),
                  mentor?.isActive &&
                    /* @__PURE__ */ jsx("span", {
                      className:
                        "absolute bottom-1 right-1 size-3.5 rounded-full bg-green-500 ring-2 ring-background",
                    }),
                ],
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "min-w-0 flex-1 text-center sm:text-left",
                children: [
                  /* @__PURE__ */ jsxs("div", {
                    className:
                      "flex flex-wrap items-center justify-center gap-2 sm:justify-start",
                    children: [
                      /* @__PURE__ */ jsx("h3", {
                        className: "text-xl font-semibold",
                        children: mentor?.displayName ?? user?.fullName,
                      }),
                      /* @__PURE__ */ jsx(Badge, {
                        variant: mentor?.isActive ? "default" : "secondary",
                        children: mentor?.isActive ? "Active" : "Inactive",
                      }),
                    ],
                  }),
                  mentor?.specialization &&
                    /* @__PURE__ */ jsx("p", {
                      className: "mt-1 text-sm text-muted-foreground",
                      children: mentor.specialization,
                    }),
                  /* @__PURE__ */ jsxs("div", {
                    className:
                      "mt-3 flex flex-wrap items-center justify-center gap-4 text-sm sm:justify-start",
                    children: [
                      /* @__PURE__ */ jsxs("div", {
                        className:
                          "flex items-center gap-1.5 text-muted-foreground",
                        children: [
                          /* @__PURE__ */ jsx(Mail, { className: "size-3.5" }),
                          /* @__PURE__ */ jsx("span", {
                            children: mentor?.email ?? user?.email,
                          }),
                        ],
                      }),
                      (mentor?.phoneNumber || user?.phoneNumber) &&
                        /* @__PURE__ */ jsxs("div", {
                          className:
                            "flex items-center gap-1.5 text-muted-foreground",
                          children: [
                            /* @__PURE__ */ jsx(Phone, {
                              className: "size-3.5",
                            }),
                            /* @__PURE__ */ jsx("span", {
                              children:
                                mentor?.phoneNumber ?? user?.phoneNumber,
                            }),
                          ],
                        }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      /* @__PURE__ */ jsxs("div", {
        className: "grid gap-4 sm:grid-cols-3",
        children: [
          /* @__PURE__ */ jsx(Card, {
            children: /* @__PURE__ */ jsxs(CardContent, {
              className: "flex items-center gap-3 p-4",
              children: [
                /* @__PURE__ */ jsx("div", {
                  className:
                    "flex size-9 items-center justify-center rounded-lg bg-primary/10",
                  children: /* @__PURE__ */ jsx(Briefcase, {
                    className: "size-4 text-primary",
                  }),
                }),
                /* @__PURE__ */ jsxs("div", {
                  children: [
                    /* @__PURE__ */ jsx("p", {
                      className: "text-xs text-muted-foreground",
                      children: "Experience",
                    }),
                    /* @__PURE__ */ jsxs("p", {
                      className: "text-lg font-semibold",
                      children: [
                        mentor?.experienceYears ?? 0,
                        " year",
                        (mentor?.experienceYears ?? 0) !== 1 ? "s" : "",
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
          /* @__PURE__ */ jsx(Card, {
            children: /* @__PURE__ */ jsxs(CardContent, {
              className: "flex items-center gap-3 p-4",
              children: [
                /* @__PURE__ */ jsx("div", {
                  className:
                    "flex size-9 items-center justify-center rounded-lg bg-primary/10",
                  children: /* @__PURE__ */ jsx(DollarSign, {
                    className: "size-4 text-primary",
                  }),
                }),
                /* @__PURE__ */ jsxs("div", {
                  children: [
                    /* @__PURE__ */ jsx("p", {
                      className: "text-xs text-muted-foreground",
                      children: "Base Price",
                    }),
                    /* @__PURE__ */ jsx("p", {
                      className: "text-lg font-semibold",
                      children: formatPrice(mentor?.basePrice ?? 0),
                    }),
                  ],
                }),
              ],
            }),
          }),
          /* @__PURE__ */ jsx(Card, {
            children: /* @__PURE__ */ jsxs(CardContent, {
              className: "flex items-center gap-3 p-4",
              children: [
                /* @__PURE__ */ jsx("div", {
                  className:
                    "flex size-9 items-center justify-center rounded-lg bg-primary/10",
                  children: /* @__PURE__ */ jsx(CalendarDays, {
                    className: "size-4 text-primary",
                  }),
                }),
                /* @__PURE__ */ jsxs("div", {
                  children: [
                    /* @__PURE__ */ jsx("p", {
                      className: "text-xs text-muted-foreground",
                      children: "Total Slots",
                    }),
                    /* @__PURE__ */ jsx("p", {
                      className: "text-lg font-semibold",
                      children: mentor?.slots.length ?? 0,
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
      mentor?.bio &&
        /* @__PURE__ */ jsxs(Card, {
          children: [
            /* @__PURE__ */ jsx(CardHeader, {
              className: "pb-3",
              children: /* @__PURE__ */ jsx(CardTitle, {
                className: "text-base",
                children: "About",
              }),
            }),
            /* @__PURE__ */ jsx(CardContent, {
              children: /* @__PURE__ */ jsx("p", {
                className:
                  "text-sm leading-relaxed text-muted-foreground whitespace-pre-line",
                children: mentor.bio,
              }),
            }),
          ],
        }),
      /* @__PURE__ */ jsxs(Card, {
        children: [
          /* @__PURE__ */ jsx(CardHeader, {
            className: "pb-3",
            children: /* @__PURE__ */ jsxs(CardTitle, {
              className: "flex items-center gap-2 text-base",
              children: [
                /* @__PURE__ */ jsx(GraduationCap, { className: "size-4" }),
                "Skills",
                /* @__PURE__ */ jsxs("span", {
                  className: "text-xs font-normal text-muted-foreground",
                  children: ["(", mentor?.skills.length ?? 0, ")"],
                }),
              ],
            }),
          }),
          /* @__PURE__ */ jsx(CardContent, {
            children:
              (mentor?.skills.length ?? 0) === 0
                ? /* @__PURE__ */ jsx("p", {
                    className: "text-sm text-muted-foreground",
                    children:
                      "No skills added yet. Go to the Skills page to add your expertise.",
                  })
                : /* @__PURE__ */ jsx("div", {
                    className: "flex flex-wrap gap-2",
                    children: mentor.skills.map((skill) =>
                      /* @__PURE__ */ jsx(
                        Badge,
                        {
                          variant: "secondary",
                          className: "text-sm",
                          children: skill.skillName,
                        },
                        skill.id,
                      ),
                    ),
                  }),
          }),
        ],
      }),
    ],
  });
});
//#endregion
//#region app/routes/admin/_layout.tsx
var _layout_exports = /* @__PURE__ */ __exportAll({
  HydrateFallback: () => HydrateFallback,
  clientLoader: () => clientLoader,
  default: () => _layout_default,
});
var clientLoader = requireRole("Admin");
var HydrateFallback = UNSAFE_withHydrateFallbackProps(
  function HydrateFallback() {
    return /* @__PURE__ */ jsx("div", {
      className: "h-screen animate-pulse bg-muted",
    });
  },
);
var _layout_default = UNSAFE_withComponentProps(function AdminLayout() {
  return /* @__PURE__ */ jsx(AppLayout, {
    navItems: adminNavItems,
    children: /* @__PURE__ */ jsx(Outlet, {}),
  });
});
//#endregion
//#region app/routes/admin/dashboard.tsx
var dashboard_exports = /* @__PURE__ */ __exportAll({
  default: () => dashboard_default,
  meta: () => meta$6,
});
function meta$6() {
  return [{ title: "Admin Dashboard — MiniBooking" }];
}
var dashboard_default = UNSAFE_withComponentProps(function AdminDashboard() {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        children: [
          /* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-semibold tracking-tight",
            children: "Dashboard",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-muted-foreground",
            children: "System overview and key metrics.",
          }),
        ],
      }),
      /* @__PURE__ */ jsx("div", {
        className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
        children: [
          {
            label: "Total Users",
            value: "—",
          },
          {
            label: "Total Mentors",
            value: "—",
          },
          {
            label: "Bookings Today",
            value: "—",
          },
          {
            label: "Revenue This Month",
            value: "—",
          },
        ].map((stat) =>
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "rounded-xl border bg-card p-6 shadow-sm",
              children: [
                /* @__PURE__ */ jsx("p", {
                  className: "text-sm text-muted-foreground",
                  children: stat.label,
                }),
                /* @__PURE__ */ jsx("p", {
                  className: "mt-1 text-3xl font-bold",
                  children: stat.value,
                }),
              ],
            },
            stat.label,
          ),
        ),
      }),
    ],
  });
});
//#endregion
//#region app/components/ui/kbd.tsx
/**
 * Renders a keyboard shortcut badge.
 * Usage: <Kbd>⌘K</Kbd>  or  <Kbd>N</Kbd>
 */
function Kbd({ children, className }) {
  return /* @__PURE__ */ jsx("kbd", {
    className: cn(
      "inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted px-1 font-mono text-[10px] font-medium text-muted-foreground",
      className,
    ),
    "aria-label": `Keyboard shortcut: ${children}`,
    children,
  });
}
//#endregion
//#region app/components/ui/table.tsx
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", {
    "data-slot": "table-container",
    className: "relative w-full overflow-x-auto",
    children: /* @__PURE__ */ jsx("table", {
      "data-slot": "table",
      className: cn("w-full caption-bottom text-sm", className),
      ...props,
    }),
  });
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx("thead", {
    "data-slot": "table-header",
    className: cn("[&_tr]:border-b", className),
    ...props,
  });
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsx("tbody", {
    "data-slot": "table-body",
    className: cn("[&_tr:last-child]:border-0", className),
    ...props,
  });
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsx("tr", {
    "data-slot": "table-row",
    className: cn(
      "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
      className,
    ),
    ...props,
  });
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsx("th", {
    "data-slot": "table-head",
    className: cn(
      "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0",
      className,
    ),
    ...props,
  });
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsx("td", {
    "data-slot": "table-cell",
    className: cn(
      "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
      className,
    ),
    ...props,
  });
}
//#endregion
//#region app/components/shared/data-table/data-table.tsx
function DataTable({
  table,
  columns,
  isLoading = false,
  skeletonRows = 8,
  emptyState,
  onRowClick,
  highlightedRowId,
  getRowId,
}) {
  const rows = table.getRowModel().rows;
  return /* @__PURE__ */ jsx("div", {
    className: "rounded-lg border overflow-hidden",
    children: /* @__PURE__ */ jsxs(Table, {
      children: [
        /* @__PURE__ */ jsx(TableHeader, {
          children: table.getHeaderGroups().map((hg) =>
            /* @__PURE__ */ jsx(
              TableRow,
              {
                className: "hover:bg-transparent",
                children: hg.headers.map((header) =>
                  /* @__PURE__ */ jsx(
                    TableHead,
                    {
                      className: "h-10 text-xs",
                      children: header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          ),
                    },
                    header.id,
                  ),
                ),
              },
              hg.id,
            ),
          ),
        }),
        /* @__PURE__ */ jsx(TableBody, {
          children: isLoading
            ? Array.from({ length: skeletonRows }).map((_, i) =>
                /* @__PURE__ */ jsx(
                  TableRow,
                  {
                    children: columns.map((_, j) =>
                      /* @__PURE__ */ jsx(
                        TableCell,
                        {
                          children: /* @__PURE__ */ jsx(Skeleton, {
                            className: "h-4 w-full",
                          }),
                        },
                        j,
                      ),
                    ),
                  },
                  `skeleton-${i}`,
                ),
              )
            : rows.length === 0
              ? /* @__PURE__ */ jsx(TableRow, {
                  children: /* @__PURE__ */ jsx(TableCell, {
                    colSpan: columns.length,
                    className: "h-48 text-center",
                    children:
                      emptyState ??
                      /* @__PURE__ */ jsx("span", {
                        className: "text-sm text-muted-foreground",
                        children: "No results found.",
                      }),
                  }),
                })
              : rows.map((row) => {
                  const isHighlighted =
                    highlightedRowId ===
                    (getRowId ? getRowId(row.original) : row.id);
                  return /* @__PURE__ */ jsx(
                    TableRow,
                    {
                      "data-state": row.getIsSelected() ? "selected" : void 0,
                      tabIndex: 0,
                      onClick: () => onRowClick?.(row.original),
                      onKeyDown: (e) => {
                        if (e.key === "Enter") onRowClick?.(row.original);
                      },
                      className: cn(
                        onRowClick && "cursor-pointer",
                        isHighlighted && "bg-accent",
                      ),
                      "aria-selected": isHighlighted,
                      children: row.getVisibleCells().map((cell) =>
                        /* @__PURE__ */ jsx(
                          TableCell,
                          {
                            className: "py-3 text-sm",
                            children: flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            ),
                          },
                          cell.id,
                        ),
                      ),
                    },
                    row.id,
                  );
                }),
        }),
      ],
    }),
  });
}
//#endregion
//#region app/components/ui/dropdown-menu.tsx
function DropdownMenu$1({ ...props }) {
  return /* @__PURE__ */ jsx(DropdownMenu.Root, {
    "data-slot": "dropdown-menu",
    ...props,
  });
}
function DropdownMenuTrigger({ ...props }) {
  return /* @__PURE__ */ jsx(DropdownMenu.Trigger, {
    "data-slot": "dropdown-menu-trigger",
    ...props,
  });
}
function DropdownMenuContent({
  className,
  align = "start",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenu.Portal, {
    children: /* @__PURE__ */ jsx(DropdownMenu.Content, {
      "data-slot": "dropdown-menu-content",
      sideOffset,
      align,
      className: cn(
        "z-50 max-h-(--radix-dropdown-menu-content-available-height) w-(--radix-dropdown-menu-trigger-width) min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:overflow-hidden data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
        className,
      ),
      ...props,
    }),
  });
}
function DropdownMenuItem({ className, inset, variant = "default", ...props }) {
  return /* @__PURE__ */ jsx(DropdownMenu.Item, {
    "data-slot": "dropdown-menu-item",
    "data-inset": inset,
    "data-variant": variant,
    className: cn(
      "group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
      className,
    ),
    ...props,
  });
}
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsxs(DropdownMenu.CheckboxItem, {
    "data-slot": "dropdown-menu-checkbox-item",
    "data-inset": inset,
    className: cn(
      "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
      className,
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", {
        className:
          "pointer-events-none absolute right-2 flex items-center justify-center",
        "data-slot": "dropdown-menu-checkbox-item-indicator",
        children: /* @__PURE__ */ jsx(DropdownMenu.ItemIndicator, {
          children: /* @__PURE__ */ jsx(CheckIcon, {}),
        }),
      }),
      children,
    ],
  });
}
function DropdownMenuLabel({ className, inset, ...props }) {
  return /* @__PURE__ */ jsx(DropdownMenu.Label, {
    "data-slot": "dropdown-menu-label",
    "data-inset": inset,
    className: cn(
      "px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7",
      className,
    ),
    ...props,
  });
}
function DropdownMenuSeparator({ className, ...props }) {
  return /* @__PURE__ */ jsx(DropdownMenu.Separator, {
    "data-slot": "dropdown-menu-separator",
    className: cn("-mx-1 my-1 h-px bg-border", className),
    ...props,
  });
}
//#endregion
//#region app/components/shared/data-table/data-table-view-options.tsx
function DataTableViewOptions({ table }) {
  return /* @__PURE__ */ jsxs(DropdownMenu$1, {
    children: [
      /* @__PURE__ */ jsx(DropdownMenuTrigger, {
        asChild: true,
        children: /* @__PURE__ */ jsxs(Button, {
          variant: "outline",
          size: "sm",
          className: "h-8 gap-1.5",
          children: [
            /* @__PURE__ */ jsx(Settings2, { className: "size-3.5" }),
            /* @__PURE__ */ jsx("span", {
              className: "hidden sm:inline",
              children: "View",
            }),
          ],
        }),
      }),
      /* @__PURE__ */ jsxs(DropdownMenuContent, {
        align: "end",
        className: "w-40",
        children: [
          /* @__PURE__ */ jsx(DropdownMenuLabel, {
            className: "text-xs",
            children: "Toggle columns",
          }),
          /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
          table
            .getAllColumns()
            .filter(
              (col) =>
                typeof col.accessorFn !== "undefined" && col.getCanHide(),
            )
            .map((col) =>
              /* @__PURE__ */ jsx(
                DropdownMenuCheckboxItem,
                {
                  className: "capitalize text-xs",
                  checked: col.getIsVisible(),
                  onCheckedChange: (v) => col.toggleVisibility(!!v),
                  children: col.id,
                },
                col.id,
              ),
            ),
        ],
      }),
    ],
  });
}
//#endregion
//#region app/components/ui/input-group.tsx
function InputGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", {
    "data-slot": "input-group",
    role: "group",
    className: cn(
      "group/input-group relative flex h-8 w-full min-w-0 items-center rounded-lg border border-input transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:bg-input/50 has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:bg-input/30 dark:has-disabled:bg-input/80 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5",
      className,
    ),
    ...props,
  });
}
var inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-2 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]",
        "inline-end":
          "order-last pr-2 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]",
        "block-start":
          "order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
        "block-end":
          "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2",
      },
    },
    defaultVariants: { align: "inline-start" },
  },
);
function InputGroupAddon({ className, align = "inline-start", ...props }) {
  return /* @__PURE__ */ jsx("div", {
    role: "group",
    "data-slot": "input-group-addon",
    "data-align": align,
    className: cn(inputGroupAddonVariants({ align }), className),
    onClick: (e) => {
      if (e.target.closest("button")) return;
      e.currentTarget.parentElement?.querySelector("input")?.focus();
    },
    ...props,
  });
}
cva("flex items-center gap-2 text-sm shadow-none", {
  variants: {
    size: {
      xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
      sm: "",
      "icon-xs": "size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0",
      "icon-sm": "size-8 p-0 has-[>svg]:p-0",
    },
  },
  defaultVariants: { size: "xs" },
});
//#endregion
//#region app/components/ui/command.tsx
function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  ...props
}) {
  return /* @__PURE__ */ jsxs(Dialog$1, {
    ...props,
    children: [
      /* @__PURE__ */ jsxs(DialogHeader, {
        className: "sr-only",
        children: [
          /* @__PURE__ */ jsx(DialogTitle, { children: title }),
          /* @__PURE__ */ jsx(DialogDescription, { children: description }),
        ],
      }),
      /* @__PURE__ */ jsx(DialogContent, {
        className: cn(
          "top-1/3 translate-y-0 overflow-hidden rounded-xl! p-0",
          className,
        ),
        showCloseButton,
        children,
      }),
    ],
  });
}
function CommandInput({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", {
    "data-slot": "command-input-wrapper",
    className: "p-1 pb-0",
    children: /* @__PURE__ */ jsxs(InputGroup, {
      className:
        "h-8! rounded-lg! border-input/30 bg-input/30 shadow-none! *:data-[slot=input-group-addon]:pl-2!",
      children: [
        /* @__PURE__ */ jsx(Command.Input, {
          "data-slot": "command-input",
          className: cn(
            "w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
            className,
          ),
          ...props,
        }),
        /* @__PURE__ */ jsx(InputGroupAddon, {
          children: /* @__PURE__ */ jsx(SearchIcon, {
            className: "size-4 shrink-0 opacity-50",
          }),
        }),
      ],
    }),
  });
}
function CommandList({ className, ...props }) {
  return /* @__PURE__ */ jsx(Command.List, {
    "data-slot": "command-list",
    className: cn(
      "no-scrollbar max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none",
      className,
    ),
    ...props,
  });
}
function CommandEmpty({ className, ...props }) {
  return /* @__PURE__ */ jsx(Command.Empty, {
    "data-slot": "command-empty",
    className: cn("py-6 text-center text-sm", className),
    ...props,
  });
}
function CommandGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx(Command.Group, {
    "data-slot": "command-group",
    className: cn(
      "overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground",
      className,
    ),
    ...props,
  });
}
function CommandSeparator({ className, ...props }) {
  return /* @__PURE__ */ jsx(Command.Separator, {
    "data-slot": "command-separator",
    className: cn("-mx-1 h-px bg-border", className),
    ...props,
  });
}
function CommandItem({ className, children, ...props }) {
  return /* @__PURE__ */ jsxs(Command.Item, {
    "data-slot": "command-item",
    className: cn(
      "group/command-item relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none in-data-[slot=dialog-content]:rounded-lg! data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-selected:bg-muted data-selected:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-selected:*:[svg]:text-foreground",
      className,
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(CheckIcon, {
        className:
          "ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100",
      }),
    ],
  });
}
//#endregion
//#region app/components/shared/command-palette.tsx
function CommandPalette({ open, onOpenChange, onNewMentor }) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const clearUser = useAuthStore((s) => s.clearUser);
  function run(fn) {
    onOpenChange(false);
    fn();
  }
  async function handleLogout() {
    onOpenChange(false);
    try {
      await authService.logout();
    } catch {
    } finally {
      clearUser();
      navigate("/login");
    }
  }
  return /* @__PURE__ */ jsxs(CommandDialog, {
    open,
    onOpenChange,
    children: [
      /* @__PURE__ */ jsx(CommandInput, {
        placeholder: "Type a command or search...",
      }),
      /* @__PURE__ */ jsxs(CommandList, {
        children: [
          /* @__PURE__ */ jsx(CommandEmpty, { children: "No results found." }),
          /* @__PURE__ */ jsxs(CommandGroup, {
            heading: "Navigation",
            children: [
              /* @__PURE__ */ jsxs(CommandItem, {
                onSelect: () => run(() => navigate("/admin")),
                children: [
                  /* @__PURE__ */ jsx(CalendarDays, {
                    className: "mr-2 size-4",
                  }),
                  "Go to Dashboard",
                  /* @__PURE__ */ jsx(Kbd, {
                    className: "ml-auto",
                    children: "G D",
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs(CommandItem, {
                onSelect: () => run(() => navigate("/admin/mentors")),
                children: [
                  /* @__PURE__ */ jsx(Users, { className: "mr-2 size-4" }),
                  "Go to Mentors",
                  /* @__PURE__ */ jsx(Kbd, {
                    className: "ml-auto",
                    children: "G M",
                  }),
                ],
              }),
            ],
          }),
          /* @__PURE__ */ jsx(CommandSeparator, {}),
          /* @__PURE__ */ jsxs(CommandGroup, {
            heading: "Actions",
            children: [
              /* @__PURE__ */ jsxs(CommandItem, {
                onSelect: () =>
                  run(() => {
                    navigate("/admin/mentors");
                    onNewMentor?.();
                  }),
                children: [
                  /* @__PURE__ */ jsx(UserPlus, { className: "mr-2 size-4" }),
                  "New Mentor",
                  /* @__PURE__ */ jsx(Kbd, {
                    className: "ml-auto",
                    children: "N",
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs(CommandItem, {
                onSelect: () =>
                  run(() => {
                    qc.invalidateQueries({ queryKey: queryKeys.mentors.all() });
                    toast.success("Data refreshed");
                  }),
                children: [
                  /* @__PURE__ */ jsx(RefreshCw, { className: "mr-2 size-4" }),
                  "Refresh Data",
                  /* @__PURE__ */ jsx(Kbd, {
                    className: "ml-auto",
                    children: "R",
                  }),
                ],
              }),
            ],
          }),
          /* @__PURE__ */ jsx(CommandSeparator, {}),
          /* @__PURE__ */ jsx(CommandGroup, {
            heading: "Account",
            children: /* @__PURE__ */ jsxs(CommandItem, {
              onSelect: handleLogout,
              children: [
                /* @__PURE__ */ jsx(LogOut, { className: "mr-2 size-4" }),
                "Logout",
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
//#endregion
//#region app/hooks/use-command-palette.ts
/**
 * Simple state hook for the global command palette.
 * Kept separate so any component can open/close it without prop drilling.
 */
function useCommandPalette() {
  const [open, setOpen] = useState(false);
  return {
    open,
    setOpen,
    toggle: () => setOpen((v) => !v),
    close: () => setOpen(false),
  };
}
//#endregion
//#region app/lib/hotkeys/hotkey-scopes.ts
/**
 * Hotkey scope identifiers.
 *
 * Scopes are activated/deactivated per page/component so shortcuts
 * don't bleed across contexts (e.g. "n" for New Mentor shouldn't fire
 * while a form is open).
 */
var HotkeyScopes = {
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
};
//#endregion
//#region app/components/shared/data-table/data-table-column-header.tsx
function DataTableColumnHeader({ column, title, className }) {
  if (!column.getCanSort())
    return /* @__PURE__ */ jsx("div", {
      className: cn("text-xs font-medium", className),
      children: title,
    });
  return /* @__PURE__ */ jsx("div", {
    className: cn("flex items-center space-x-2", className),
    children: /* @__PURE__ */ jsxs(DropdownMenu$1, {
      children: [
        /* @__PURE__ */ jsx(DropdownMenuTrigger, {
          asChild: true,
          children: /* @__PURE__ */ jsxs(Button, {
            variant: "ghost",
            size: "sm",
            className: "-ml-3 h-8 data-[state=open]:bg-accent",
            children: [
              /* @__PURE__ */ jsx("span", {
                className: "text-xs font-medium",
                children: title,
              }),
              column.getIsSorted() === "desc"
                ? /* @__PURE__ */ jsx(ArrowDown, { className: "ml-2 size-3.5" })
                : column.getIsSorted() === "asc"
                  ? /* @__PURE__ */ jsx(ArrowUp, { className: "ml-2 size-3.5" })
                  : /* @__PURE__ */ jsx(ChevronsUpDown, {
                      className: "ml-2 size-3.5 text-muted-foreground",
                    }),
            ],
          }),
        }),
        /* @__PURE__ */ jsxs(DropdownMenuContent, {
          align: "start",
          children: [
            /* @__PURE__ */ jsxs(DropdownMenuItem, {
              onClick: () => column.toggleSorting(false),
              children: [
                /* @__PURE__ */ jsx(ArrowUp, {
                  className: "mr-2 size-3.5 text-muted-foreground/70",
                }),
                "Asc",
              ],
            }),
            /* @__PURE__ */ jsxs(DropdownMenuItem, {
              onClick: () => column.toggleSorting(true),
              children: [
                /* @__PURE__ */ jsx(ArrowDown, {
                  className: "mr-2 size-3.5 text-muted-foreground/70",
                }),
                "Desc",
              ],
            }),
            /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsxs(DropdownMenuItem, {
              onClick: () => column.toggleVisibility(false),
              children: [
                /* @__PURE__ */ jsx(EyeOff, {
                  className: "mr-2 size-3.5 text-muted-foreground/70",
                }),
                "Hide",
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
//#endregion
//#region app/features/admin/mentor/components/mentor-table-columns.tsx
function getMentorColumns({ onEdit, onDelete, onViewDetail }) {
  return [
    {
      id: "mentor",
      accessorFn: (row) => row.displayName,
      header: ({ column }) =>
        /* @__PURE__ */ jsx(DataTableColumnHeader, {
          column,
          title: "Mentor",
        }),
      cell: ({ row }) => {
        const mentor = row.original;
        const initials =
          (mentor.displayName ?? "")
            .split(" ")
            .filter(Boolean)
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "?";
        return /* @__PURE__ */ jsxs("div", {
          className: "flex items-center gap-3 min-w-0",
          children: [
            /* @__PURE__ */ jsxs(Avatar$1, {
              className: "size-8 shrink-0",
              children: [
                mentor.avatarUrl &&
                  /* @__PURE__ */ jsx(AvatarImage, {
                    src: mentor.avatarUrl,
                    alt: mentor.displayName,
                  }),
                /* @__PURE__ */ jsx(AvatarFallback, {
                  className: "bg-primary/10 text-xs font-semibold text-primary",
                  children: initials,
                }),
              ],
            }),
            /* @__PURE__ */ jsxs("div", {
              className: "min-w-0",
              children: [
                /* @__PURE__ */ jsx("p", {
                  className: "truncate text-sm font-medium leading-tight",
                  children: mentor.displayName,
                }),
                /* @__PURE__ */ jsx("p", {
                  className: "truncate text-xs text-muted-foreground",
                  children: mentor.email,
                }),
              ],
            }),
          ],
        });
      },
      enableHiding: false,
    },
    {
      id: "specialization",
      accessorKey: "specialization",
      header: ({ column }) =>
        /* @__PURE__ */ jsx(DataTableColumnHeader, {
          column,
          title: "Specialization",
        }),
      cell: ({ getValue }) => {
        const val = getValue();
        return val
          ? /* @__PURE__ */ jsx("span", {
              className: "text-sm",
              children: val,
            })
          : /* @__PURE__ */ jsx("span", {
              className: "text-xs text-muted-foreground",
              children: "—",
            });
      },
    },
    {
      id: "experience",
      accessorKey: "experienceYears",
      header: ({ column }) =>
        /* @__PURE__ */ jsx(DataTableColumnHeader, {
          column,
          title: "Experience",
        }),
      cell: ({ getValue }) => {
        const years = getValue();
        return /* @__PURE__ */ jsxs("span", {
          className: "text-sm",
          children: [years, " yr", years !== 1 ? "s" : ""],
        });
      },
    },
    {
      id: "basePrice",
      accessorKey: "basePrice",
      header: ({ column }) =>
        /* @__PURE__ */ jsx(DataTableColumnHeader, {
          column,
          title: "Base Price",
        }),
      cell: ({ getValue }) => {
        const price = getValue();
        return /* @__PURE__ */ jsx("span", {
          className: "text-sm font-medium",
          children: new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 0,
          }).format(price),
        });
      },
    },
    {
      id: "status",
      accessorKey: "isActive",
      header: "Status",
      cell: ({ getValue }) => {
        const active = getValue();
        return /* @__PURE__ */ jsx(Badge, {
          variant: active ? "default" : "secondary",
          className: "text-xs",
          children: active ? "Active" : "Inactive",
        });
      },
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      header: ({ column }) =>
        /* @__PURE__ */ jsx(DataTableColumnHeader, {
          column,
          title: "Created",
        }),
      cell: ({ getValue }) => {
        const date = getValue();
        return /* @__PURE__ */ jsx("span", {
          className: "text-xs text-muted-foreground",
          children: format(new Date(date), "dd MMM yyyy"),
        });
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const mentor = row.original;
        return /* @__PURE__ */ jsxs(DropdownMenu$1, {
          children: [
            /* @__PURE__ */ jsx(DropdownMenuTrigger, {
              asChild: true,
              children: /* @__PURE__ */ jsx(Button, {
                variant: "ghost",
                size: "icon",
                className: "size-8",
                "aria-label": "Open actions",
                onClick: (e) => e.stopPropagation(),
                children: /* @__PURE__ */ jsx(MoreHorizontal, {
                  className: "size-4",
                }),
              }),
            }),
            /* @__PURE__ */ jsxs(DropdownMenuContent, {
              align: "end",
              children: [
                /* @__PURE__ */ jsx(DropdownMenuLabel, {
                  className: "text-xs",
                  children: "Actions",
                }),
                /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
                /* @__PURE__ */ jsx(DropdownMenuItem, {
                  onClick: () => onViewDetail(mentor),
                  children: "View detail",
                }),
                /* @__PURE__ */ jsx(DropdownMenuItem, {
                  onClick: () => onEdit(mentor),
                  children: "Edit",
                }),
                /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
                /* @__PURE__ */ jsx(DropdownMenuItem, {
                  onClick: () => onDelete(mentor),
                  className: "text-destructive focus:text-destructive",
                  children: "Delete",
                }),
              ],
            }),
          ],
        });
      },
    },
  ];
}
//#endregion
//#region app/features/admin/mentor/components/mentor-card-list.tsx
function MentorCardList({
  mentors,
  isLoading = false,
  onEdit,
  onDelete,
  onViewDetail,
}) {
  if (isLoading)
    return /* @__PURE__ */ jsx("div", {
      className: "space-y-3",
      children: Array.from({ length: 5 }).map((_, i) =>
        /* @__PURE__ */ jsx(
          Card,
          {
            children: /* @__PURE__ */ jsx(CardContent, {
              className: "p-4",
              children: /* @__PURE__ */ jsxs("div", {
                className: "flex items-start gap-3",
                children: [
                  /* @__PURE__ */ jsx(Skeleton, {
                    className: "size-10 rounded-full shrink-0",
                  }),
                  /* @__PURE__ */ jsxs("div", {
                    className: "flex-1 space-y-2",
                    children: [
                      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-32" }),
                      /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-48" }),
                      /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-24" }),
                    ],
                  }),
                ],
              }),
            }),
          },
          i,
        ),
      ),
    });
  if (mentors.length === 0)
    return /* @__PURE__ */ jsx("div", {
      className:
        "flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center",
      children: /* @__PURE__ */ jsx("p", {
        className: "text-sm text-muted-foreground",
        children: "No mentors found.",
      }),
    });
  return /* @__PURE__ */ jsx("div", {
    className: "space-y-3",
    children: mentors.map((mentor) => {
      const initials =
        (mentor.displayName ?? "")
          .split(" ")
          .filter(Boolean)
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase() || "?";
      return /* @__PURE__ */ jsx(
        Card,
        {
          className: "cursor-pointer transition-colors hover:bg-accent/50",
          onClick: () => onViewDetail(mentor),
          children: /* @__PURE__ */ jsx(CardContent, {
            className: "p-4",
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex items-start gap-3",
              children: [
                /* @__PURE__ */ jsxs(Avatar$1, {
                  className: "size-10 shrink-0",
                  children: [
                    mentor.avatarUrl &&
                      /* @__PURE__ */ jsx(AvatarImage, {
                        src: mentor.avatarUrl,
                        alt: mentor.displayName,
                      }),
                    /* @__PURE__ */ jsx(AvatarFallback, {
                      className:
                        "bg-primary/10 text-sm font-semibold text-primary",
                      children: initials,
                    }),
                  ],
                }),
                /* @__PURE__ */ jsxs("div", {
                  className: "min-w-0 flex-1",
                  children: [
                    /* @__PURE__ */ jsxs("div", {
                      className: "flex items-start justify-between gap-2",
                      children: [
                        /* @__PURE__ */ jsxs("div", {
                          className: "min-w-0",
                          children: [
                            /* @__PURE__ */ jsx("p", {
                              className: "truncate font-medium text-sm",
                              children: mentor.displayName,
                            }),
                            /* @__PURE__ */ jsx("p", {
                              className:
                                "truncate text-xs text-muted-foreground",
                              children: mentor.email,
                            }),
                          ],
                        }),
                        /* @__PURE__ */ jsxs(DropdownMenu$1, {
                          children: [
                            /* @__PURE__ */ jsx(DropdownMenuTrigger, {
                              asChild: true,
                              children: /* @__PURE__ */ jsx(Button, {
                                variant: "ghost",
                                size: "icon",
                                className: "size-7 shrink-0",
                                onClick: (e) => e.stopPropagation(),
                                "aria-label": "Actions",
                                children: /* @__PURE__ */ jsx(MoreHorizontal, {
                                  className: "size-4",
                                }),
                              }),
                            }),
                            /* @__PURE__ */ jsxs(DropdownMenuContent, {
                              align: "end",
                              children: [
                                /* @__PURE__ */ jsx(DropdownMenuItem, {
                                  onClick: (e) => {
                                    e.stopPropagation();
                                    onViewDetail(mentor);
                                  },
                                  children: "View detail",
                                }),
                                /* @__PURE__ */ jsx(DropdownMenuItem, {
                                  onClick: (e) => {
                                    e.stopPropagation();
                                    onEdit(mentor);
                                  },
                                  children: "Edit",
                                }),
                                /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
                                /* @__PURE__ */ jsx(DropdownMenuItem, {
                                  onClick: (e) => {
                                    e.stopPropagation();
                                    onDelete(mentor);
                                  },
                                  className:
                                    "text-destructive focus:text-destructive",
                                  children: "Delete",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    /* @__PURE__ */ jsxs("div", {
                      className: "mt-2 flex flex-wrap items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsx(Badge, {
                          variant: mentor.isActive ? "default" : "secondary",
                          className: "text-xs",
                          children: mentor.isActive ? "Active" : "Inactive",
                        }),
                        mentor.specialization &&
                          /* @__PURE__ */ jsx("span", {
                            className: "text-xs text-muted-foreground",
                            children: mentor.specialization,
                          }),
                        /* @__PURE__ */ jsxs("span", {
                          className: "text-xs text-muted-foreground",
                          children: [
                            mentor.experienceYears,
                            " yr",
                            mentor.experienceYears !== 1 ? "s" : "",
                          ],
                        }),
                        /* @__PURE__ */ jsx("span", {
                          className: "text-xs font-medium",
                          children: new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                            maximumFractionDigits: 0,
                          }).format(mentor.basePrice),
                        }),
                      ],
                    }),
                    /* @__PURE__ */ jsxs("p", {
                      className: "mt-1 text-xs text-muted-foreground",
                      children: [
                        "Joined ",
                        format(new Date(mentor.createdAt), "dd MMM yyyy"),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        },
        mentor.id,
      );
    }),
  });
}
//#endregion
//#region app/components/ui/scroll-area.tsx
function ScrollArea$1({ className, children, ...props }) {
  return /* @__PURE__ */ jsxs(ScrollArea.Root, {
    "data-slot": "scroll-area",
    className: cn("relative", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(ScrollArea.Viewport, {
        "data-slot": "scroll-area-viewport",
        className:
          "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
        children,
      }),
      /* @__PURE__ */ jsx(ScrollBar, {}),
      /* @__PURE__ */ jsx(ScrollArea.Corner, {}),
    ],
  });
}
function ScrollBar({ className, orientation = "vertical", ...props }) {
  return /* @__PURE__ */ jsx(ScrollArea.ScrollAreaScrollbar, {
    "data-slot": "scroll-area-scrollbar",
    "data-orientation": orientation,
    orientation,
    className: cn(
      "flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent",
      className,
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ScrollArea.ScrollAreaThumb, {
      "data-slot": "scroll-area-thumb",
      className: "relative flex-1 rounded-full bg-border",
    }),
  });
}
//#endregion
//#region app/hooks/mentor/use-create-mentor-mutation.ts
function useCreateMentorMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) => mentorService.createMentor(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.mentors.lists() });
      toast.success("Mentor created successfully");
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err));
    },
  });
}
//#endregion
//#region app/features/admin/mentor/schemas/mentor.schema.ts
var vietnameseNameRegex = /^[a-zA-ZÀ-ỹ\u00C0-\u024F\u1E00-\u1EFF\s]+$/u;
var vietnamesePhoneRegex = /^(0[35789]\d{8})$/;
var strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
var urlRegex = /^https?:\/\/.+/;
var createMentorSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Full name is required")
      .max(100, "Full name must not exceed 100 characters")
      .regex(
        vietnameseNameRegex,
        "Full name must contain only Vietnamese letters and spaces",
      ),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        strongPasswordRegex,
        "Password must contain uppercase, lowercase, digit, and special character",
      ),
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .regex(
        vietnamesePhoneRegex,
        "Phone number must be a valid Vietnamese phone number",
      ),
    displayName: z
      .string()
      .max(50, "Display name must not exceed 50 characters")
      .optional()
      .or(z.literal("")),
    bio: z
      .string()
      .max(1e3, "Bio must not exceed 1000 characters")
      .optional()
      .or(z.literal("")),
    specialization: z.string().optional().or(z.literal("")),
    experienceYears: z
      .number({ error: "Experience years must be a number" })
      .int("Experience years must be an integer")
      .min(0, "Experience years must be at least 0")
      .max(50, "Experience years must not exceed 50"),
    basePrice: z
      .number({ error: "Base price must be a number" })
      .min(0, "Base price must not be negative"),
    avatarUrl: z
      .string()
      .regex(urlRegex, "Invalid avatar URL")
      .optional()
      .or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (
      data.experienceYears > 0 &&
      (!data.specialization || data.specialization.trim() === "")
    )
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Specialization is required when experience years > 0",
        path: ["specialization"],
      });
  });
var updateMentorSchema = z.object({
  fullName: z
    .string()
    .max(100, "Full name must not exceed 100 characters")
    .regex(
      vietnameseNameRegex,
      "Full name must contain only Vietnamese letters and spaces",
    )
    .optional()
    .or(z.literal("")),
  phoneNumber: z
    .string()
    .regex(
      vietnamesePhoneRegex,
      "Phone number must be a valid Vietnamese phone number",
    )
    .optional()
    .or(z.literal("")),
  displayName: z
    .string()
    .max(50, "Display name must not exceed 50 characters")
    .optional()
    .or(z.literal("")),
  bio: z
    .string()
    .max(1e3, "Bio must not exceed 1000 characters")
    .optional()
    .or(z.literal("")),
  specialization: z.string().optional().or(z.literal("")),
  experienceYears: z
    .number({ error: "Experience years must be a number" })
    .int()
    .min(0)
    .max(50)
    .optional(),
  basePrice: z
    .number({ error: "Base price must be a number" })
    .min(0, "Base price must not be negative")
    .optional(),
  avatarUrl: z
    .string()
    .regex(urlRegex, "Invalid avatar URL")
    .optional()
    .or(z.literal("")),
});
//#endregion
//#region app/features/admin/mentor/components/mentor-form.tsx
function MentorForm(props) {
  const [showPassword, setShowPassword] = useState(false);
  const isCreate = props.mode === "create";
  const form = useForm({
    resolver: zodResolver(isCreate ? createMentorSchema : updateMentorSchema),
    defaultValues: isCreate
      ? {
          fullName: "",
          email: "",
          password: "",
          phoneNumber: "",
          displayName: "",
          bio: "",
          specialization: "",
          experienceYears: 0,
          basePrice: 0,
          avatarUrl: "",
        }
      : props.defaultValues,
  });
  const isSubmitting = props.isSubmitting ?? form.formState.isSubmitting;
  async function handleSubmit(data) {
    if (isCreate) await props.onSubmit(data);
    else await props.onSubmit(data);
  }
  return /* @__PURE__ */ jsx(Form, {
    ...form,
    children: /* @__PURE__ */ jsxs("form", {
      onSubmit: form.handleSubmit(handleSubmit),
      className: "space-y-4",
      id: "mentor-form",
      children: [
        isCreate &&
          /* @__PURE__ */ jsxs(Fragment, {
            children: [
              /* @__PURE__ */ jsxs("div", {
                className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
                children: [
                  /* @__PURE__ */ jsx(FormField, {
                    control: form.control,
                    name: "fullName",
                    render: ({ field }) =>
                      /* @__PURE__ */ jsxs(FormItem, {
                        children: [
                          /* @__PURE__ */ jsx(FormLabel, {
                            children: "Full Name *",
                          }),
                          /* @__PURE__ */ jsx(FormControl, {
                            children: /* @__PURE__ */ jsx(Input, {
                              placeholder: "Nguyễn Văn A",
                              ...field,
                            }),
                          }),
                          /* @__PURE__ */ jsx(FormMessage, {}),
                        ],
                      }),
                  }),
                  /* @__PURE__ */ jsx(FormField, {
                    control: form.control,
                    name: "email",
                    render: ({ field }) =>
                      /* @__PURE__ */ jsxs(FormItem, {
                        children: [
                          /* @__PURE__ */ jsx(FormLabel, {
                            children: "Email *",
                          }),
                          /* @__PURE__ */ jsx(FormControl, {
                            children: /* @__PURE__ */ jsx(Input, {
                              type: "email",
                              placeholder: "mentor@example.com",
                              ...field,
                            }),
                          }),
                          /* @__PURE__ */ jsx(FormMessage, {}),
                        ],
                      }),
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
                children: [
                  /* @__PURE__ */ jsx(FormField, {
                    control: form.control,
                    name: "password",
                    render: ({ field }) =>
                      /* @__PURE__ */ jsxs(FormItem, {
                        children: [
                          /* @__PURE__ */ jsx(FormLabel, {
                            children: "Password *",
                          }),
                          /* @__PURE__ */ jsx(FormControl, {
                            children: /* @__PURE__ */ jsxs("div", {
                              className: "relative",
                              children: [
                                /* @__PURE__ */ jsx(Input, {
                                  type: showPassword ? "text" : "password",
                                  placeholder: "••••••••",
                                  ...field,
                                }),
                                /* @__PURE__ */ jsx("button", {
                                  type: "button",
                                  onClick: () => setShowPassword((v) => !v),
                                  className:
                                    "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                                  "aria-label": showPassword
                                    ? "Hide password"
                                    : "Show password",
                                  children: showPassword
                                    ? /* @__PURE__ */ jsx(EyeOff, {
                                        className: "size-4",
                                      })
                                    : /* @__PURE__ */ jsx(Eye, {
                                        className: "size-4",
                                      }),
                                }),
                              ],
                            }),
                          }),
                          /* @__PURE__ */ jsx(FormMessage, {}),
                        ],
                      }),
                  }),
                  /* @__PURE__ */ jsx(FormField, {
                    control: form.control,
                    name: "phoneNumber",
                    render: ({ field }) =>
                      /* @__PURE__ */ jsxs(FormItem, {
                        children: [
                          /* @__PURE__ */ jsx(FormLabel, {
                            children: "Phone Number *",
                          }),
                          /* @__PURE__ */ jsx(FormControl, {
                            children: /* @__PURE__ */ jsx(Input, {
                              placeholder: "0912345678",
                              ...field,
                            }),
                          }),
                          /* @__PURE__ */ jsx(FormMessage, {}),
                        ],
                      }),
                  }),
                ],
              }),
            ],
          }),
        !isCreate &&
          /* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
            children: [
              /* @__PURE__ */ jsx(FormField, {
                control: form.control,
                name: "fullName",
                render: ({ field }) =>
                  /* @__PURE__ */ jsxs(FormItem, {
                    children: [
                      /* @__PURE__ */ jsx(FormLabel, { children: "Full Name" }),
                      /* @__PURE__ */ jsx(FormControl, {
                        children: /* @__PURE__ */ jsx(Input, {
                          placeholder: "Nguyễn Văn A",
                          ...field,
                          value: field.value ?? "",
                        }),
                      }),
                      /* @__PURE__ */ jsx(FormMessage, {}),
                    ],
                  }),
              }),
              /* @__PURE__ */ jsx(FormField, {
                control: form.control,
                name: "phoneNumber",
                render: ({ field }) =>
                  /* @__PURE__ */ jsxs(FormItem, {
                    children: [
                      /* @__PURE__ */ jsx(FormLabel, {
                        children: "Phone Number",
                      }),
                      /* @__PURE__ */ jsx(FormControl, {
                        children: /* @__PURE__ */ jsx(Input, {
                          placeholder: "0912345678",
                          ...field,
                          value: field.value ?? "",
                        }),
                      }),
                      /* @__PURE__ */ jsx(FormMessage, {}),
                    ],
                  }),
              }),
            ],
          }),
        /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
          children: [
            /* @__PURE__ */ jsx(FormField, {
              control: form.control,
              name: "displayName",
              render: ({ field }) =>
                /* @__PURE__ */ jsxs(FormItem, {
                  children: [
                    /* @__PURE__ */ jsx(FormLabel, {
                      children: "Display Name",
                    }),
                    /* @__PURE__ */ jsx(FormControl, {
                      children: /* @__PURE__ */ jsx(Input, {
                        placeholder: "Mentor Huy",
                        ...field,
                        value: field.value ?? "",
                      }),
                    }),
                    /* @__PURE__ */ jsx(FormMessage, {}),
                  ],
                }),
            }),
            /* @__PURE__ */ jsx(FormField, {
              control: form.control,
              name: "specialization",
              render: ({ field }) =>
                /* @__PURE__ */ jsxs(FormItem, {
                  children: [
                    /* @__PURE__ */ jsx(FormLabel, {
                      children: "Specialization",
                    }),
                    /* @__PURE__ */ jsx(FormControl, {
                      children: /* @__PURE__ */ jsx(Input, {
                        placeholder: "React, Node.js...",
                        ...field,
                        value: field.value ?? "",
                      }),
                    }),
                    /* @__PURE__ */ jsx(FormMessage, {}),
                  ],
                }),
            }),
          ],
        }),
        /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
          children: [
            /* @__PURE__ */ jsx(FormField, {
              control: form.control,
              name: "experienceYears",
              render: ({ field }) =>
                /* @__PURE__ */ jsxs(FormItem, {
                  children: [
                    /* @__PURE__ */ jsx(FormLabel, {
                      children: "Experience (years)",
                    }),
                    /* @__PURE__ */ jsx(FormControl, {
                      children: /* @__PURE__ */ jsx(Input, {
                        type: "number",
                        min: 0,
                        max: 50,
                        ...field,
                        value: field.value ?? 0,
                        onChange: (e) => field.onChange(Number(e.target.value)),
                      }),
                    }),
                    /* @__PURE__ */ jsx(FormMessage, {}),
                  ],
                }),
            }),
            /* @__PURE__ */ jsx(FormField, {
              control: form.control,
              name: "basePrice",
              render: ({ field }) =>
                /* @__PURE__ */ jsxs(FormItem, {
                  children: [
                    /* @__PURE__ */ jsx(FormLabel, {
                      children: "Base Price (VND)",
                    }),
                    /* @__PURE__ */ jsx(FormControl, {
                      children: /* @__PURE__ */ jsx(Input, {
                        type: "number",
                        min: 0,
                        step: 1e3,
                        placeholder: "150000",
                        ...field,
                        value: field.value ?? 0,
                        onChange: (e) => field.onChange(Number(e.target.value)),
                      }),
                    }),
                    /* @__PURE__ */ jsx(FormMessage, {}),
                  ],
                }),
            }),
          ],
        }),
        /* @__PURE__ */ jsx(FormField, {
          control: form.control,
          name: "bio",
          render: ({ field }) =>
            /* @__PURE__ */ jsxs(FormItem, {
              children: [
                /* @__PURE__ */ jsx(FormLabel, { children: "Bio" }),
                /* @__PURE__ */ jsx(FormControl, {
                  children: /* @__PURE__ */ jsx(Textarea, {
                    placeholder: "Tell us about this mentor...",
                    className: "resize-none",
                    rows: 3,
                    ...field,
                    value: field.value ?? "",
                  }),
                }),
                /* @__PURE__ */ jsx(FormMessage, {}),
              ],
            }),
        }),
        /* @__PURE__ */ jsx(FormField, {
          control: form.control,
          name: "avatarUrl",
          render: ({ field }) =>
            /* @__PURE__ */ jsxs(FormItem, {
              children: [
                /* @__PURE__ */ jsx(FormLabel, { children: "Avatar URL" }),
                /* @__PURE__ */ jsx(FormControl, {
                  children: /* @__PURE__ */ jsx(Input, {
                    type: "url",
                    placeholder: "https://...",
                    ...field,
                    value: field.value ?? "",
                  }),
                }),
                /* @__PURE__ */ jsx(FormMessage, {}),
              ],
            }),
        }),
        /* @__PURE__ */ jsxs(Button, {
          type: "submit",
          className: "w-full",
          disabled: isSubmitting,
          form: "mentor-form",
          children: [
            isSubmitting &&
              /* @__PURE__ */ jsx(Loader2, {
                className: "mr-2 size-4 animate-spin",
              }),
            isCreate ? "Create Mentor" : "Save Changes",
          ],
        }),
      ],
    }),
  });
}
//#endregion
//#region app/features/admin/mentor/components/mentor-create-dialog.tsx
function MentorCreateDialog({ open, onOpenChange }) {
  const { mutateAsync, isPending } = useCreateMentorMutation();
  useHotkeys(
    "mod+s",
    (e) => {
      e.preventDefault();
      document.getElementById("mentor-form")?.dispatchEvent(
        new Event("submit", {
          cancelable: true,
          bubbles: true,
        }),
      );
    },
    {
      scopes: HotkeyScopes.Form,
      enabled: open,
    },
  );
  async function handleSubmit(data) {
    await mutateAsync({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      displayName: data.displayName || null,
      bio: data.bio || null,
      specialization: data.specialization || null,
      experienceYears: data.experienceYears,
      basePrice: data.basePrice,
      avatarUrl: data.avatarUrl || null,
    });
    onOpenChange(false);
  }
  return /* @__PURE__ */ jsx(Dialog$1, {
    open,
    onOpenChange,
    children: /* @__PURE__ */ jsxs(DialogContent, {
      className: "flex max-h-[90vh] w-full max-w-2xl flex-col gap-0 p-0",
      onInteractOutside: (e) => isPending && e.preventDefault(),
      onEscapeKeyDown: (e) => isPending && e.preventDefault(),
      children: [
        /* @__PURE__ */ jsxs(DialogHeader, {
          className: "shrink-0 border-b px-6 py-5",
          children: [
            /* @__PURE__ */ jsx(DialogTitle, {
              className: "text-lg",
              children: "Create Mentor",
            }),
            /* @__PURE__ */ jsxs(DialogDescription, {
              children: [
                "Add a new mentor account to the system. Fields marked with",
                " ",
                /* @__PURE__ */ jsx("span", {
                  className: "text-destructive",
                  children: "*",
                }),
                " are required.",
              ],
            }),
          ],
        }),
        /* @__PURE__ */ jsx(ScrollArea$1, {
          className: "flex-1 overflow-y-auto",
          children: /* @__PURE__ */ jsx("div", {
            className: "px-6 py-5",
            children: /* @__PURE__ */ jsx(MentorForm, {
              mode: "create",
              onSubmit: handleSubmit,
              isSubmitting: isPending,
            }),
          }),
        }),
      ],
    }),
  });
}
//#endregion
//#region app/hooks/mentor/use-update-mentor-mutation.ts
function useUpdateMentorMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }) => mentorService.updateMentor(id, body),
    onSuccess: (_data, { id }) => {
      qc.invalidateQueries({ queryKey: queryKeys.mentors.detail(id) });
      qc.invalidateQueries({ queryKey: queryKeys.mentors.lists() });
      toast.success("Mentor updated successfully");
    },
    onError: (err) => {
      toast.error(getApiErrorMessage(err));
    },
  });
}
//#endregion
//#region app/features/admin/mentor/components/mentor-edit-dialog.tsx
function InlineSkillForm({ mentorId }) {
  const { mutateAsync, isPending } = useAddMentorSkillMutation();
  const form = useForm({
    resolver: zodResolver(addSkillSchema),
    defaultValues: { skillName: "" },
  });
  async function onSubmit(data) {
    await mutateAsync({
      mentorId,
      skillName: data.skillName,
    });
    form.reset();
  }
  return /* @__PURE__ */ jsx(Form, {
    ...form,
    children: /* @__PURE__ */ jsxs("form", {
      onSubmit: form.handleSubmit(onSubmit),
      className: "flex items-start gap-2",
      children: [
        /* @__PURE__ */ jsx(FormField, {
          control: form.control,
          name: "skillName",
          render: ({ field }) =>
            /* @__PURE__ */ jsxs(FormItem, {
              className: "flex-1",
              children: [
                /* @__PURE__ */ jsx(FormControl, {
                  children: /* @__PURE__ */ jsx(Input, {
                    placeholder: "Add a skill (e.g. React, Node.js)",
                    ...field,
                    disabled: isPending,
                  }),
                }),
                /* @__PURE__ */ jsx(FormMessage, {}),
              ],
            }),
        }),
        /* @__PURE__ */ jsxs(Button, {
          type: "submit",
          size: "sm",
          disabled: isPending,
          className: "gap-1.5",
          children: [
            isPending
              ? /* @__PURE__ */ jsx(Loader2, {
                  className: "size-4 animate-spin",
                })
              : /* @__PURE__ */ jsx(Plus, { className: "size-4" }),
            "Add",
          ],
        }),
      ],
    }),
  });
}
function SkillsList({ mentorId, skills }) {
  const {
    mutate: removeSkill,
    isPending,
    variables,
  } = useRemoveMentorSkillMutation();
  return /* @__PURE__ */ jsxs("div", {
    children: [
      /* @__PURE__ */ jsxs("h3", {
        className: "mb-3 text-sm font-medium",
        children: [
          "Current Skills",
          /* @__PURE__ */ jsxs("span", {
            className: "ml-2 text-xs text-muted-foreground",
            children: ["(", skills.length, ")"],
          }),
        ],
      }),
      skills.length === 0
        ? /* @__PURE__ */ jsxs("div", {
            className:
              "flex flex-col items-center justify-center rounded-xl border border-dashed py-10 text-center",
            children: [
              /* @__PURE__ */ jsx(GraduationCap, {
                className: "mb-3 size-8 text-muted-foreground/50",
              }),
              /* @__PURE__ */ jsx("p", {
                className: "text-sm text-muted-foreground",
                children: "No skills added yet.",
              }),
            ],
          })
        : /* @__PURE__ */ jsx("div", {
            className: "flex flex-wrap gap-2",
            children: skills.map((skill) => {
              const isRemoving = isPending && variables?.skillId === skill.id;
              return /* @__PURE__ */ jsxs(
                Badge,
                {
                  variant: "secondary",
                  className: "gap-1.5 px-3 py-1 text-sm",
                  children: [
                    skill.skillName,
                    /* @__PURE__ */ jsxs(Tooltip$1, {
                      children: [
                        /* @__PURE__ */ jsx(TooltipTrigger, {
                          asChild: true,
                          children: /* @__PURE__ */ jsx("button", {
                            type: "button",
                            onClick: () =>
                              removeSkill({
                                mentorId,
                                skillId: skill.id,
                              }),
                            disabled: isRemoving,
                            className:
                              "ml-0.5 rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50",
                            "aria-label": `Remove ${skill.skillName}`,
                            children: isRemoving
                              ? /* @__PURE__ */ jsx(Loader2, {
                                  className: "size-3 animate-spin",
                                })
                              : /* @__PURE__ */ jsx(X, { className: "size-3" }),
                          }),
                        }),
                        /* @__PURE__ */ jsx(TooltipContent, {
                          children: "Remove skill",
                        }),
                      ],
                    }),
                  ],
                },
                skill.id,
              );
            }),
          }),
    ],
  });
}
function MentorEditDialog({ mentor, open, onOpenChange }) {
  const { mutateAsync, isPending } = useUpdateMentorMutation();
  const [activeTab, setActiveTab] = useState("profile");
  const form = useForm({
    resolver: zodResolver(updateMentorSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      displayName: "",
      bio: "",
      specialization: "",
      experienceYears: 0,
      basePrice: 0,
      avatarUrl: "",
    },
  });
  useEffect(() => {
    if (mentor && open) {
      form.reset({
        fullName: mentor.displayName ?? "",
        phoneNumber: mentor.phoneNumber ?? "",
        displayName: mentor.displayName ?? "",
        bio: mentor.bio ?? "",
        specialization: mentor.specialization ?? "",
        experienceYears: mentor.experienceYears ?? 0,
        basePrice: mentor.basePrice ?? 0,
        avatarUrl: mentor.avatarUrl ?? "",
      });
      setActiveTab("profile");
    }
  }, [mentor?.id, open]);
  useHotkeys(
    "mod+s",
    (e) => {
      e.preventDefault();
      document.getElementById("mentor-edit-form")?.dispatchEvent(
        new Event("submit", {
          cancelable: true,
          bubbles: true,
        }),
      );
    },
    {
      scopes: HotkeyScopes.Form,
      enabled: open && activeTab === "profile",
    },
  );
  if (!mentor) return null;
  async function handleSubmit(data) {
    if (!mentor) return;
    await mutateAsync({
      id: mentor.id,
      body: {
        fullName: data.fullName || null,
        phoneNumber: data.phoneNumber || null,
        displayName: data.displayName || null,
        bio: data.bio || null,
        specialization: data.specialization || null,
        experienceYears: data.experienceYears ?? null,
        basePrice: data.basePrice ?? null,
        avatarUrl: data.avatarUrl || null,
      },
    });
    onOpenChange(false);
  }
  return /* @__PURE__ */ jsx(Dialog$1, {
    open,
    onOpenChange,
    children: /* @__PURE__ */ jsxs(DialogContent, {
      className: "flex max-h-[90vh] w-full max-w-2xl flex-col gap-0 p-0",
      onInteractOutside: (e) => isPending && e.preventDefault(),
      onEscapeKeyDown: (e) => isPending && e.preventDefault(),
      children: [
        /* @__PURE__ */ jsxs(DialogHeader, {
          className: "shrink-0 border-b px-6 py-5",
          children: [
            /* @__PURE__ */ jsxs(DialogTitle, {
              className: "text-lg",
              children: ["Edit Mentor — ", mentor.displayName],
            }),
            /* @__PURE__ */ jsx(DialogDescription, {
              children: "Update profile information or manage skills.",
            }),
          ],
        }),
        /* @__PURE__ */ jsxs(Tabs$1, {
          value: activeTab,
          onValueChange: (v) => setActiveTab(v),
          className: "flex flex-1 flex-col overflow-hidden",
          children: [
            /* @__PURE__ */ jsxs(TabsList, {
              className: "mx-6 mt-4 w-auto self-start",
              children: [
                /* @__PURE__ */ jsxs(TabsTrigger, {
                  value: "profile",
                  className: "gap-1.5",
                  children: [
                    /* @__PURE__ */ jsx(User, { className: "size-3.5" }),
                    "Profile",
                  ],
                }),
                /* @__PURE__ */ jsxs(TabsTrigger, {
                  value: "skills",
                  className: "gap-1.5",
                  children: [
                    /* @__PURE__ */ jsx(GraduationCap, {
                      className: "size-3.5",
                    }),
                    "Skills",
                    mentor.skills.length > 0 &&
                      /* @__PURE__ */ jsx(Badge, {
                        variant: "secondary",
                        className: "ml-1 h-4 px-1.5 text-[10px]",
                        children: mentor.skills.length,
                      }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ jsx(TabsContent, {
              value: "profile",
              className: "flex-1 overflow-hidden mt-0",
              children: /* @__PURE__ */ jsx(ScrollArea$1, {
                className: "h-full max-h-[calc(90vh-200px)]",
                children: /* @__PURE__ */ jsx("div", {
                  className: "px-6 py-5",
                  children: /* @__PURE__ */ jsx(Form, {
                    ...form,
                    children: /* @__PURE__ */ jsxs("form", {
                      id: "mentor-edit-form",
                      onSubmit: form.handleSubmit(handleSubmit),
                      className: "space-y-4",
                      children: [
                        /* @__PURE__ */ jsxs("div", {
                          className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
                          children: [
                            /* @__PURE__ */ jsx(FormField, {
                              control: form.control,
                              name: "fullName",
                              render: ({ field }) =>
                                /* @__PURE__ */ jsxs(FormItem, {
                                  children: [
                                    /* @__PURE__ */ jsx(FormLabel, {
                                      children: "Full Name",
                                    }),
                                    /* @__PURE__ */ jsx(FormControl, {
                                      children: /* @__PURE__ */ jsx(Input, {
                                        placeholder: "Nguyễn Văn A",
                                        ...field,
                                        value: field.value ?? "",
                                      }),
                                    }),
                                    /* @__PURE__ */ jsx(FormMessage, {}),
                                  ],
                                }),
                            }),
                            /* @__PURE__ */ jsx(FormField, {
                              control: form.control,
                              name: "displayName",
                              render: ({ field }) =>
                                /* @__PURE__ */ jsxs(FormItem, {
                                  children: [
                                    /* @__PURE__ */ jsx(FormLabel, {
                                      children: "Display Name",
                                    }),
                                    /* @__PURE__ */ jsx(FormControl, {
                                      children: /* @__PURE__ */ jsx(Input, {
                                        placeholder: "Mentor Huy",
                                        ...field,
                                        value: field.value ?? "",
                                      }),
                                    }),
                                    /* @__PURE__ */ jsx(FormMessage, {}),
                                  ],
                                }),
                            }),
                          ],
                        }),
                        /* @__PURE__ */ jsxs("div", {
                          className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
                          children: [
                            /* @__PURE__ */ jsx(FormField, {
                              control: form.control,
                              name: "phoneNumber",
                              render: ({ field }) =>
                                /* @__PURE__ */ jsxs(FormItem, {
                                  children: [
                                    /* @__PURE__ */ jsx(FormLabel, {
                                      children: "Phone Number",
                                    }),
                                    /* @__PURE__ */ jsx(FormControl, {
                                      children: /* @__PURE__ */ jsx(Input, {
                                        placeholder: "0912345678",
                                        ...field,
                                        value: field.value ?? "",
                                      }),
                                    }),
                                    /* @__PURE__ */ jsx(FormMessage, {}),
                                  ],
                                }),
                            }),
                            /* @__PURE__ */ jsx(FormField, {
                              control: form.control,
                              name: "specialization",
                              render: ({ field }) =>
                                /* @__PURE__ */ jsxs(FormItem, {
                                  children: [
                                    /* @__PURE__ */ jsx(FormLabel, {
                                      children: "Specialization",
                                    }),
                                    /* @__PURE__ */ jsx(FormControl, {
                                      children: /* @__PURE__ */ jsx(Input, {
                                        placeholder: "React, Node.js...",
                                        ...field,
                                        value: field.value ?? "",
                                      }),
                                    }),
                                    /* @__PURE__ */ jsx(FormMessage, {}),
                                  ],
                                }),
                            }),
                          ],
                        }),
                        /* @__PURE__ */ jsxs("div", {
                          className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
                          children: [
                            /* @__PURE__ */ jsx(FormField, {
                              control: form.control,
                              name: "experienceYears",
                              render: ({ field }) =>
                                /* @__PURE__ */ jsxs(FormItem, {
                                  children: [
                                    /* @__PURE__ */ jsx(FormLabel, {
                                      children: "Experience (years)",
                                    }),
                                    /* @__PURE__ */ jsx(FormControl, {
                                      children: /* @__PURE__ */ jsx(Input, {
                                        type: "number",
                                        min: 0,
                                        max: 50,
                                        ...field,
                                        value: field.value ?? 0,
                                        onChange: (e) =>
                                          field.onChange(
                                            Number(e.target.value),
                                          ),
                                      }),
                                    }),
                                    /* @__PURE__ */ jsx(FormMessage, {}),
                                  ],
                                }),
                            }),
                            /* @__PURE__ */ jsx(FormField, {
                              control: form.control,
                              name: "basePrice",
                              render: ({ field }) =>
                                /* @__PURE__ */ jsxs(FormItem, {
                                  children: [
                                    /* @__PURE__ */ jsx(FormLabel, {
                                      children: "Base Price (VND)",
                                    }),
                                    /* @__PURE__ */ jsx(FormControl, {
                                      children: /* @__PURE__ */ jsx(Input, {
                                        type: "number",
                                        min: 0,
                                        step: 1e3,
                                        ...field,
                                        value: field.value ?? 0,
                                        onChange: (e) =>
                                          field.onChange(
                                            Number(e.target.value),
                                          ),
                                      }),
                                    }),
                                    /* @__PURE__ */ jsx(FormMessage, {}),
                                  ],
                                }),
                            }),
                          ],
                        }),
                        /* @__PURE__ */ jsx(FormField, {
                          control: form.control,
                          name: "bio",
                          render: ({ field }) =>
                            /* @__PURE__ */ jsxs(FormItem, {
                              children: [
                                /* @__PURE__ */ jsx(FormLabel, {
                                  children: "Bio",
                                }),
                                /* @__PURE__ */ jsx(FormControl, {
                                  children: /* @__PURE__ */ jsx(Textarea, {
                                    placeholder: "Tell us about this mentor...",
                                    className: "resize-none",
                                    rows: 3,
                                    ...field,
                                    value: field.value ?? "",
                                  }),
                                }),
                                /* @__PURE__ */ jsx(FormMessage, {}),
                              ],
                            }),
                        }),
                        /* @__PURE__ */ jsx(FormField, {
                          control: form.control,
                          name: "avatarUrl",
                          render: ({ field }) =>
                            /* @__PURE__ */ jsxs(FormItem, {
                              children: [
                                /* @__PURE__ */ jsx(FormLabel, {
                                  children: "Avatar URL",
                                }),
                                /* @__PURE__ */ jsx(FormControl, {
                                  children: /* @__PURE__ */ jsx(Input, {
                                    type: "url",
                                    placeholder: "https://...",
                                    ...field,
                                    value: field.value ?? "",
                                  }),
                                }),
                                /* @__PURE__ */ jsx(FormMessage, {}),
                              ],
                            }),
                        }),
                        /* @__PURE__ */ jsxs(Button, {
                          type: "submit",
                          className: "w-full",
                          disabled: isPending,
                          children: [
                            isPending &&
                              /* @__PURE__ */ jsx(Loader2, {
                                className: "mr-2 size-4 animate-spin",
                              }),
                            "Save Changes",
                          ],
                        }),
                      ],
                    }),
                  }),
                }),
              }),
            }),
            /* @__PURE__ */ jsx(TabsContent, {
              value: "skills",
              className: "flex-1 overflow-hidden mt-0",
              children: /* @__PURE__ */ jsx(ScrollArea$1, {
                className: "h-full max-h-[calc(90vh-200px)]",
                children: /* @__PURE__ */ jsxs("div", {
                  className: "space-y-6 px-6 py-5",
                  children: [
                    /* @__PURE__ */ jsxs("div", {
                      children: [
                        /* @__PURE__ */ jsx("h3", {
                          className: "mb-3 text-sm font-medium",
                          children: "Add Skill",
                        }),
                        /* @__PURE__ */ jsx(InlineSkillForm, {
                          mentorId: mentor.id,
                        }),
                      ],
                    }),
                    /* @__PURE__ */ jsx(Separator$1, {}),
                    /* @__PURE__ */ jsx(SkillsList, {
                      mentorId: mentor.id,
                      skills: mentor.skills,
                    }),
                  ],
                }),
              }),
            }),
          ],
        }),
      ],
    }),
  });
}
//#endregion
//#region app/features/admin/mentor/components/mentor-edit-dialog-loader.tsx
/**
 * Thin wrapper used by the list page.
 * Receives a base Mentor (from the list), fetches the full MentorDetail
 * (needed for the Skills tab), then renders MentorEditDialog.
 */
function MentorEditDialogLoader({ mentor, open, onOpenChange }) {
  const { data: detail, isPending } = useMentorDetailQuery(mentor?.id ?? "");
  if (!mentor) return null;
  if (isPending || !detail)
    return /* @__PURE__ */ jsx(Dialog$1, {
      open,
      onOpenChange,
      children: /* @__PURE__ */ jsx(DialogContent, {
        className: "flex h-48 items-center justify-center",
        children: /* @__PURE__ */ jsx(Loader2, {
          className: "size-6 animate-spin text-muted-foreground",
        }),
      }),
    });
  return /* @__PURE__ */ jsx(MentorEditDialog, {
    mentor: detail,
    open,
    onOpenChange,
  });
}
//#endregion
//#region app/components/ui/alert-dialog.tsx
function AlertDialog$1({ ...props }) {
  return /* @__PURE__ */ jsx(AlertDialog.Root, {
    "data-slot": "alert-dialog",
    ...props,
  });
}
function AlertDialogPortal({ ...props }) {
  return /* @__PURE__ */ jsx(AlertDialog.Portal, {
    "data-slot": "alert-dialog-portal",
    ...props,
  });
}
function AlertDialogOverlay({ className, ...props }) {
  return /* @__PURE__ */ jsx(AlertDialog.Overlay, {
    "data-slot": "alert-dialog-overlay",
    className: cn(
      "fixed inset-0 z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
      className,
    ),
    ...props,
  });
}
function AlertDialogContent({ className, size = "default", ...props }) {
  return /* @__PURE__ */ jsxs(AlertDialogPortal, {
    children: [
      /* @__PURE__ */ jsx(AlertDialogOverlay, {}),
      /* @__PURE__ */ jsx(AlertDialog.Content, {
        "data-slot": "alert-dialog-content",
        "data-size": size,
        className: cn(
          "group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className,
        ),
        ...props,
      }),
    ],
  });
}
function AlertDialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", {
    "data-slot": "alert-dialog-header",
    className: cn(
      "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
      className,
    ),
    ...props,
  });
}
function AlertDialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", {
    "data-slot": "alert-dialog-footer",
    className: cn(
      "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
      className,
    ),
    ...props,
  });
}
function AlertDialogTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(AlertDialog.Title, {
    "data-slot": "alert-dialog-title",
    className: cn(
      "font-heading text-base font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
      className,
    ),
    ...props,
  });
}
function AlertDialogDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(AlertDialog.Description, {
    "data-slot": "alert-dialog-description",
    className: cn(
      "text-sm text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
      className,
    ),
    ...props,
  });
}
function AlertDialogAction({
  className,
  variant = "default",
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(Button, {
    variant,
    size,
    asChild: true,
    children: /* @__PURE__ */ jsx(AlertDialog.Action, {
      "data-slot": "alert-dialog-action",
      className: cn(className),
      ...props,
    }),
  });
}
function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(Button, {
    variant,
    size,
    asChild: true,
    children: /* @__PURE__ */ jsx(AlertDialog.Cancel, {
      "data-slot": "alert-dialog-cancel",
      className: cn(className),
      ...props,
    }),
  });
}
//#endregion
//#region app/components/shared/confirm-dialog.tsx
function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "destructive",
  isLoading = false,
  onConfirm,
}) {
  return /* @__PURE__ */ jsx(AlertDialog$1, {
    open,
    onOpenChange,
    children: /* @__PURE__ */ jsxs(AlertDialogContent, {
      children: [
        /* @__PURE__ */ jsxs(AlertDialogHeader, {
          children: [
            /* @__PURE__ */ jsx(AlertDialogTitle, { children: title }),
            /* @__PURE__ */ jsx(AlertDialogDescription, {
              children: description,
            }),
          ],
        }),
        /* @__PURE__ */ jsxs(AlertDialogFooter, {
          children: [
            /* @__PURE__ */ jsx(AlertDialogCancel, {
              disabled: isLoading,
              children: cancelLabel,
            }),
            /* @__PURE__ */ jsxs(AlertDialogAction, {
              onClick: (e) => {
                e.preventDefault();
                onConfirm();
              },
              disabled: isLoading,
              className: cn(buttonVariants({ variant }), "gap-2"),
              children: [
                isLoading &&
                  /* @__PURE__ */ jsx(Loader2, {
                    className: "size-4 animate-spin",
                  }),
                confirmLabel,
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
//#endregion
//#region app/hooks/mentor/use-delete-mentor-mutation.ts
function useDeleteMentorMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => mentorService.deleteMentor(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: queryKeys.mentors.lists() });
      const previousLists = qc.getQueriesData({
        queryKey: queryKeys.mentors.lists(),
      });
      qc.setQueriesData({ queryKey: queryKeys.mentors.lists() }, (old) => {
        if (!old) return old;
        return {
          ...old,
          items: old.items.filter((m) => m.id !== id),
          totalCount: old.totalCount - 1,
        };
      });
      return { previousLists };
    },
    onError: (err, _id, ctx) => {
      ctx?.previousLists?.forEach(([key, value]) => {
        qc.setQueryData(key, value);
      });
      toast.error(getApiErrorMessage(err));
    },
    onSuccess: () => {
      toast.success("Mentor deleted successfully");
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: queryKeys.mentors.lists() });
    },
  });
}
//#endregion
//#region app/features/admin/mentor/components/mentor-delete-dialog.tsx
function MentorDeleteDialog({ mentor, open, onOpenChange }) {
  const { mutateAsync, isPending } = useDeleteMentorMutation();
  async function handleConfirm() {
    if (!mentor) return;
    await mutateAsync(mentor.id);
    onOpenChange(false);
  }
  return /* @__PURE__ */ jsx(ConfirmDialog, {
    open,
    onOpenChange,
    title: "Delete Mentor",
    description: mentor
      ? `Are you sure you want to delete "${mentor.displayName}"? This action cannot be undone.`
      : "Are you sure you want to delete this mentor?",
    confirmLabel: "Delete",
    variant: "destructive",
    isLoading: isPending,
    onConfirm: handleConfirm,
  });
}
//#endregion
//#region app/lib/hotkeys/shortcuts.ts
/**
 * Single source of truth for all keyboard shortcuts.
 * Used both by useHotkeys() calls and the ShortcutHelp dialog.
 */
var SHORTCUTS = {
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
};
/** Shortcuts grouped by scope — used by the help dialog */
var SHORTCUTS_BY_SCOPE = Object.values(SHORTCUTS).reduce((acc, s) => {
  (acc[s.scope] ??= []).push(s);
  return acc;
}, {});
//#endregion
//#region app/features/admin/mentor/components/mentor-shortcut-help.tsx
var SCOPE_LABELS = {
  [HotkeyScopes.Global]: "Global",
  [HotkeyScopes.MentorList]: "Mentor List",
  [HotkeyScopes.MentorDetail]: "Mentor Detail",
  [HotkeyScopes.Form]: "Form",
};
function MentorShortcutHelp({ open, onOpenChange }) {
  return /* @__PURE__ */ jsx(Dialog$1, {
    open,
    onOpenChange,
    children: /* @__PURE__ */ jsxs(DialogContent, {
      className: "max-w-md",
      children: [
        /* @__PURE__ */ jsx(DialogHeader, {
          children: /* @__PURE__ */ jsx(DialogTitle, {
            children: "Keyboard Shortcuts",
          }),
        }),
        /* @__PURE__ */ jsx(ScrollArea$1, {
          className: "max-h-[60vh]",
          children: /* @__PURE__ */ jsx("div", {
            className: "space-y-4 pr-4",
            children: Object.entries(SHORTCUTS_BY_SCOPE).map(
              ([scope, shortcuts]) =>
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    children: [
                      /* @__PURE__ */ jsx("p", {
                        className:
                          "mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                        children: SCOPE_LABELS[scope] ?? scope,
                      }),
                      /* @__PURE__ */ jsx("div", {
                        className: "space-y-1.5",
                        children: shortcuts.map((s) =>
                          /* @__PURE__ */ jsxs(
                            "div",
                            {
                              className: "flex items-center justify-between",
                              children: [
                                /* @__PURE__ */ jsx("span", {
                                  className: "text-sm text-foreground",
                                  children: s.label,
                                }),
                                /* @__PURE__ */ jsx(Kbd, {
                                  children: s.display,
                                }),
                              ],
                            },
                            s.keys,
                          ),
                        ),
                      }),
                      /* @__PURE__ */ jsx(Separator$1, { className: "mt-4" }),
                    ],
                  },
                  scope,
                ),
            ),
          }),
        }),
      ],
    }),
  });
}
//#endregion
//#region app/features/admin/mentor/mentor-list-page.tsx
function MentorListPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const qc = useQueryClient();
  const filters = parseMentorFilters(searchParams);
  const [createOpen, setCreateOpen] = useState(false);
  const [editMentor, setEditMentor] = useState(null);
  const [deleteMentor, setDeleteMentor] = useState(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [highlightedId, setHighlightedId] = useState();
  const commandPalette = useCommandPalette();
  const { data, isPending, isFetching } = useMentorsQuery(filters);
  const mentors = data?.items ?? [];
  const [sorting, setSorting] = useState([]);
  const columns = getMentorColumns({
    onEdit: (m) => setEditMentor(m),
    onDelete: (m) => setDeleteMentor(m),
    onViewDetail: (m) => navigate(`/admin/mentors/${m.id}`),
  });
  const table = useReactTable({
    data: mentors,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: (updater) => {
      const next = typeof updater === "function" ? updater(sorting) : updater;
      setSorting(next);
      if (next.length > 0)
        updateFilters({
          sortBy: next[0].id,
          sortOrder: next[0].desc ? "desc" : "asc",
          pageNumber: 1,
        });
      else
        updateFilters({
          sortBy: void 0,
          sortOrder: "asc",
          pageNumber: 1,
        });
    },
    manualPagination: true,
    manualSorting: true,
    pageCount: data?.totalPages ?? 0,
  });
  function updateFilters(patch) {
    setSearchParams(
      serializeMentorFilters({
        ...filters,
        ...patch,
      }),
      { replace: true },
    );
  }
  const isFormOpen = createOpen || !!editMentor || !!deleteMentor;
  useHotkeys("n", () => setCreateOpen(true), {
    scopes: HotkeyScopes.MentorList,
    enabled: !isFormOpen,
  });
  useHotkeys(
    "r",
    () => {
      qc.invalidateQueries({ queryKey: queryKeys.mentors.lists() });
    },
    {
      scopes: HotkeyScopes.MentorList,
      enabled: !isFormOpen,
    },
  );
  useHotkeys(
    "left",
    () => {
      if (data?.hasPreviousPage)
        updateFilters({ pageNumber: filters.pageNumber - 1 });
    },
    {
      scopes: HotkeyScopes.MentorList,
      enabled: !isFormOpen,
    },
  );
  useHotkeys(
    "right",
    () => {
      if (data?.hasNextPage)
        updateFilters({ pageNumber: filters.pageNumber + 1 });
    },
    {
      scopes: HotkeyScopes.MentorList,
      enabled: !isFormOpen,
    },
  );
  const moveHighlight = useCallback(
    (dir) => {
      if (mentors.length === 0) return;
      const idx = mentors.findIndex((m) => m.id === highlightedId);
      setHighlightedId(
        mentors[
          idx === -1 ? 0 : Math.max(0, Math.min(mentors.length - 1, idx + dir))
        ]?.id,
      );
    },
    [mentors, highlightedId],
  );
  useHotkeys("j", () => moveHighlight(1), {
    scopes: HotkeyScopes.MentorList,
    enabled: !isFormOpen,
  });
  useHotkeys("k", () => moveHighlight(-1), {
    scopes: HotkeyScopes.MentorList,
    enabled: !isFormOpen,
  });
  useHotkeys(
    "enter",
    () => {
      if (highlightedId) navigate(`/admin/mentors/${highlightedId}`);
    },
    {
      scopes: HotkeyScopes.MentorList,
      enabled: !isFormOpen && !!highlightedId,
    },
  );
  useHotkeys(
    "d",
    () => {
      const m = mentors.find((x) => x.id === highlightedId);
      if (m) setDeleteMentor(m);
    },
    {
      scopes: HotkeyScopes.MentorList,
      enabled: !isFormOpen && !!highlightedId,
    },
  );
  useHotkeys("shift+slash", () => setHelpOpen(true), {
    scopes: HotkeyScopes.Global,
  });
  useHotkeys(
    "mod+k",
    (e) => {
      e.preventDefault();
      commandPalette.toggle();
    },
    { scopes: HotkeyScopes.Global },
  );
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        className:
          "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        children: [
          /* @__PURE__ */ jsxs("div", {
            children: [
              /* @__PURE__ */ jsx("h2", {
                className: "text-2xl font-semibold tracking-tight",
                children: "Mentors",
              }),
              /* @__PURE__ */ jsx("p", {
                className: "text-sm text-muted-foreground",
                children: "Create and manage mentor accounts.",
              }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-2 self-start sm:self-auto",
            children: [
              /* @__PURE__ */ jsxs(Button, {
                variant: "outline",
                size: "sm",
                className: "h-9 gap-1.5",
                onClick: () =>
                  qc.invalidateQueries({ queryKey: queryKeys.mentors.lists() }),
                disabled: isFetching,
                "aria-label": "Refresh",
                children: [
                  /* @__PURE__ */ jsx(RefreshCw, {
                    className: `size-3.5 ${isFetching ? "animate-spin" : ""}`,
                  }),
                  /* @__PURE__ */ jsx("span", {
                    className: "hidden sm:inline",
                    children: "Refresh",
                  }),
                  /* @__PURE__ */ jsx(Kbd, { children: "R" }),
                ],
              }),
              /* @__PURE__ */ jsx(DataTableViewOptions, { table }),
              /* @__PURE__ */ jsxs(Button, {
                onClick: () => setCreateOpen(true),
                className: "gap-2",
                children: [
                  /* @__PURE__ */ jsx(UserPlus, { className: "size-4" }),
                  "New Mentor",
                  /* @__PURE__ */ jsx(Kbd, {
                    className: "ml-1",
                    children: "N",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsx(MentorFilterPanel, {
        filters,
        onFilterChange: updateFilters,
      }),
      /* @__PURE__ */ jsx("div", {
        className: "hidden md:block",
        children: /* @__PURE__ */ jsx(DataTable, {
          table,
          columns,
          isLoading: isPending,
          emptyState: /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col items-center gap-2 py-8",
            children: [
              /* @__PURE__ */ jsx("p", {
                className: "text-sm text-muted-foreground",
                children: "No mentors found.",
              }),
              /* @__PURE__ */ jsx(Button, {
                variant: "outline",
                size: "sm",
                onClick: () => setCreateOpen(true),
                children: "Create first mentor",
              }),
            ],
          }),
          onRowClick: (m) => navigate(`/admin/mentors/${m.id}`),
          highlightedRowId: highlightedId,
          getRowId: (m) => m.id,
        }),
      }),
      /* @__PURE__ */ jsx("div", {
        className: "md:hidden",
        children: /* @__PURE__ */ jsx(MentorCardList, {
          mentors,
          isLoading: isPending,
          onEdit: (m) => setEditMentor(m),
          onDelete: (m) => setDeleteMentor(m),
          onViewDetail: (m) => navigate(`/admin/mentors/${m.id}`),
        }),
      }),
      data &&
        data.totalPages > 0 &&
        /* @__PURE__ */ jsx(DataTablePagination, {
          pageNumber: data.pageNumber,
          pageSize: data.pageSize,
          totalPages: data.totalPages,
          totalCount: data.totalCount,
          hasPreviousPage: data.hasPreviousPage,
          hasNextPage: data.hasNextPage,
          onPageChange: (p) => updateFilters({ pageNumber: p }),
          onPageSizeChange: (s) =>
            updateFilters({
              pageSize: s,
              pageNumber: 1,
            }),
        }),
      /* @__PURE__ */ jsx(MentorCreateDialog, {
        open: createOpen,
        onOpenChange: setCreateOpen,
      }),
      /* @__PURE__ */ jsx(MentorEditDialogLoader, {
        mentor: editMentor,
        open: !!editMentor,
        onOpenChange: (o) => !o && setEditMentor(null),
      }),
      /* @__PURE__ */ jsx(MentorDeleteDialog, {
        mentor: deleteMentor,
        open: !!deleteMentor,
        onOpenChange: (o) => !o && setDeleteMentor(null),
      }),
      /* @__PURE__ */ jsx(MentorShortcutHelp, {
        open: helpOpen,
        onOpenChange: setHelpOpen,
      }),
      /* @__PURE__ */ jsx(CommandPalette, {
        open: commandPalette.open,
        onOpenChange: commandPalette.setOpen,
        onNewMentor: () => setCreateOpen(true),
      }),
    ],
  });
}
//#endregion
//#region app/routes/admin/mentors.tsx
var mentors_exports = /* @__PURE__ */ __exportAll({
  default: () => mentors_default,
  meta: () => meta$5,
});
function meta$5() {
  return [{ title: "Mentors — Admin | MiniBooking" }];
}
var mentors_default = UNSAFE_withComponentProps(function AdminMentors() {
  return /* @__PURE__ */ jsx(MentorListPage, {});
});
//#endregion
//#region app/components/ui/breadcrumb.tsx
function Breadcrumb({ className, ...props }) {
  return /* @__PURE__ */ jsx("nav", {
    "aria-label": "breadcrumb",
    "data-slot": "breadcrumb",
    className: cn(className),
    ...props,
  });
}
function BreadcrumbList({ className, ...props }) {
  return /* @__PURE__ */ jsx("ol", {
    "data-slot": "breadcrumb-list",
    className: cn(
      "flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground",
      className,
    ),
    ...props,
  });
}
function BreadcrumbItem({ className, ...props }) {
  return /* @__PURE__ */ jsx("li", {
    "data-slot": "breadcrumb-item",
    className: cn("inline-flex items-center gap-1", className),
    ...props,
  });
}
function BreadcrumbLink({ asChild, className, ...props }) {
  return /* @__PURE__ */ jsx(asChild ? Slot.Root : "a", {
    "data-slot": "breadcrumb-link",
    className: cn("transition-colors hover:text-foreground", className),
    ...props,
  });
}
function BreadcrumbPage({ className, ...props }) {
  return /* @__PURE__ */ jsx("span", {
    "data-slot": "breadcrumb-page",
    role: "link",
    "aria-disabled": "true",
    "aria-current": "page",
    className: cn("font-normal text-foreground", className),
    ...props,
  });
}
function BreadcrumbSeparator({ children, className, ...props }) {
  return /* @__PURE__ */ jsx("li", {
    "data-slot": "breadcrumb-separator",
    role: "presentation",
    "aria-hidden": "true",
    className: cn("[&>svg]:size-3.5", className),
    ...props,
    children: children ?? /* @__PURE__ */ jsx(ChevronRightIcon, {}),
  });
}
//#endregion
//#region app/features/admin/mentor/components/mentor-profile-tab.tsx
function InfoRow({ label, value }) {
  return /* @__PURE__ */ jsxs("div", {
    className: "flex flex-col gap-0.5 sm:flex-row sm:gap-4",
    children: [
      /* @__PURE__ */ jsx("span", {
        className: "w-36 shrink-0 text-xs font-medium text-muted-foreground",
        children: label,
      }),
      /* @__PURE__ */ jsx("span", {
        className: "text-sm",
        children: value ?? "—",
      }),
    ],
  });
}
function MentorProfileTab({ mentor }) {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        className: "space-y-3",
        children: [
          /* @__PURE__ */ jsx("h3", {
            className: "text-sm font-medium",
            children: "Basic Information",
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "space-y-2.5 rounded-lg border p-4",
            children: [
              /* @__PURE__ */ jsx(InfoRow, {
                label: "Display Name",
                value: mentor.displayName,
              }),
              /* @__PURE__ */ jsx(InfoRow, {
                label: "Email",
                value: mentor.email,
              }),
              /* @__PURE__ */ jsx(InfoRow, {
                label: "Specialization",
                value: mentor.specialization,
              }),
              /* @__PURE__ */ jsx(InfoRow, {
                label: "Experience",
                value: `${mentor.experienceYears} year${mentor.experienceYears !== 1 ? "s" : ""}`,
              }),
              /* @__PURE__ */ jsx(InfoRow, {
                label: "Base Price",
                value: new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                  maximumFractionDigits: 0,
                }).format(mentor.basePrice),
              }),
              /* @__PURE__ */ jsx(InfoRow, {
                label: "Status",
                value: mentor.isActive ? "Active" : "Inactive",
              }),
              /* @__PURE__ */ jsx(InfoRow, {
                label: "Member Since",
                value: format(new Date(mentor.createdAt), "dd MMMM yyyy"),
              }),
            ],
          }),
        ],
      }),
      mentor.bio &&
        /* @__PURE__ */ jsxs("div", {
          className: "space-y-2",
          children: [
            /* @__PURE__ */ jsx("h3", {
              className: "text-sm font-medium",
              children: "Bio",
            }),
            /* @__PURE__ */ jsx("p", {
              className:
                "rounded-lg border p-4 text-sm leading-relaxed text-muted-foreground",
              children: mentor.bio,
            }),
          ],
        }),
    ],
  });
}
//#endregion
//#region app/features/admin/mentor/components/mentor-skills-tab.tsx
function MentorSkillsTab({ mentorId, skills }) {
  const {
    mutate: removeSkill,
    isPending,
    variables,
  } = useRemoveMentorSkillMutation();
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        children: [
          /* @__PURE__ */ jsx("h3", {
            className: "mb-3 text-sm font-medium",
            children: "Add Skill",
          }),
          /* @__PURE__ */ jsx(MentorSkillsForm, { mentorId }),
        ],
      }),
      /* @__PURE__ */ jsx(Separator$1, {}),
      /* @__PURE__ */ jsxs("div", {
        children: [
          /* @__PURE__ */ jsxs("h3", {
            className: "mb-3 text-sm font-medium",
            children: [
              "Current Skills",
              /* @__PURE__ */ jsxs("span", {
                className: "ml-2 text-xs text-muted-foreground",
                children: ["(", skills.length, ")"],
              }),
            ],
          }),
          skills.length === 0
            ? /* @__PURE__ */ jsxs("div", {
                className:
                  "flex flex-col items-center justify-center rounded-xl border border-dashed py-10 text-center",
                children: [
                  /* @__PURE__ */ jsx(GraduationCap, {
                    className: "mb-3 size-8 text-muted-foreground/50",
                  }),
                  /* @__PURE__ */ jsx("p", {
                    className: "text-sm text-muted-foreground",
                    children: "No skills added yet.",
                  }),
                ],
              })
            : /* @__PURE__ */ jsx("div", {
                className: "flex flex-wrap gap-2",
                children: skills.map((skill) => {
                  const isRemoving =
                    isPending && variables?.skillId === skill.id;
                  return /* @__PURE__ */ jsxs(
                    Badge,
                    {
                      variant: "secondary",
                      className: "gap-1.5 px-3 py-1 text-sm",
                      children: [
                        skill.skillName,
                        /* @__PURE__ */ jsxs(Tooltip$1, {
                          children: [
                            /* @__PURE__ */ jsx(TooltipTrigger, {
                              asChild: true,
                              children: /* @__PURE__ */ jsx("button", {
                                type: "button",
                                onClick: () =>
                                  removeSkill({
                                    mentorId,
                                    skillId: skill.id,
                                  }),
                                disabled: isRemoving,
                                className:
                                  "ml-0.5 rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50",
                                "aria-label": `Remove ${skill.skillName}`,
                                children: isRemoving
                                  ? /* @__PURE__ */ jsx(Loader2, {
                                      className: "size-3 animate-spin",
                                    })
                                  : /* @__PURE__ */ jsx(X, {
                                      className: "size-3",
                                    }),
                              }),
                            }),
                            /* @__PURE__ */ jsx(TooltipContent, {
                              children: "Remove skill",
                            }),
                          ],
                        }),
                      ],
                    },
                    skill.id,
                  );
                }),
              }),
        ],
      }),
    ],
  });
}
//#endregion
//#region app/features/admin/mentor/components/mentor-slots-tab.tsx
var STATUS_VARIANT = {
  1: "default",
  2: "secondary",
  3: "outline",
  4: "destructive",
  5: "outline",
};
function MentorSlotsTab({ mentorId, slots, createShortcutEnabled = false }) {
  const [createOpen, setCreateOpen] = useState(false);
  const [editSlot, setEditSlot] = useState(null);
  const sorted = [...slots].sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime(),
  );
  const groups = [];
  for (const slot of sorted) {
    const slotDate = new Date(slot.startTime);
    const existing = groups.find((g) => isSameDay(g.date, slotDate));
    if (existing) existing.slots.push(slot);
    else
      groups.push({
        date: slotDate,
        slots: [slot],
      });
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        className: "flex items-center justify-between",
        children: [
          /* @__PURE__ */ jsxs("h3", {
            className: "text-sm font-medium",
            children: [
              "Slots",
              /* @__PURE__ */ jsxs("span", {
                className: "ml-2 text-xs text-muted-foreground",
                children: ["(", slots.length, ")"],
              }),
            ],
          }),
          /* @__PURE__ */ jsxs(Button, {
            size: "sm",
            onClick: () => setCreateOpen(true),
            className: "gap-1.5",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "size-4" }),
              "New Slot",
              createShortcutEnabled &&
                /* @__PURE__ */ jsx(Kbd, { children: "C" }),
            ],
          }),
        ],
      }),
      groups.length === 0
        ? /* @__PURE__ */ jsxs("div", {
            className:
              "flex flex-col items-center justify-center rounded-xl border border-dashed py-10 text-center",
            children: [
              /* @__PURE__ */ jsx(CalendarDays, {
                className: "mb-3 size-8 text-muted-foreground/50",
              }),
              /* @__PURE__ */ jsx("p", {
                className: "text-sm text-muted-foreground",
                children: "No slots created yet.",
              }),
              /* @__PURE__ */ jsx(Button, {
                variant: "outline",
                size: "sm",
                className: "mt-3",
                onClick: () => setCreateOpen(true),
                children: "Create first slot",
              }),
            ],
          })
        : /* @__PURE__ */ jsx("div", {
            className: "space-y-6",
            children: groups.map(({ date, slots: daySlots }) =>
              /* @__PURE__ */ jsxs(
                "div",
                {
                  children: [
                    /* @__PURE__ */ jsxs("div", {
                      className: "mb-3 flex items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsx(CalendarDays, {
                          className: "size-4 text-muted-foreground",
                        }),
                        /* @__PURE__ */ jsx("span", {
                          className: "text-sm font-medium",
                          children: format(date, "EEEE, dd MMMM yyyy"),
                        }),
                      ],
                    }),
                    /* @__PURE__ */ jsx("div", {
                      className: "space-y-2",
                      children: daySlots.map((slot) =>
                        /* @__PURE__ */ jsx(
                          Card,
                          {
                            className:
                              "cursor-pointer transition-colors hover:bg-accent/50",
                            onClick: () => setEditSlot(slot),
                            children: /* @__PURE__ */ jsxs(CardContent, {
                              className: "p-4",
                              children: [
                                /* @__PURE__ */ jsxs("div", {
                                  className:
                                    "flex items-start justify-between gap-3",
                                  children: [
                                    /* @__PURE__ */ jsxs("div", {
                                      className: "flex items-center gap-2",
                                      children: [
                                        /* @__PURE__ */ jsx(Clock, {
                                          className:
                                            "size-4 shrink-0 text-muted-foreground",
                                        }),
                                        /* @__PURE__ */ jsxs("div", {
                                          children: [
                                            /* @__PURE__ */ jsxs("p", {
                                              className: "text-sm font-medium",
                                              children: [
                                                format(
                                                  new Date(slot.startTime),
                                                  "HH:mm",
                                                ),
                                                " —",
                                                " ",
                                                format(
                                                  new Date(slot.endTime),
                                                  "HH:mm",
                                                ),
                                              ],
                                            }),
                                            /* @__PURE__ */ jsxs("p", {
                                              className:
                                                "text-xs text-muted-foreground",
                                              children: [
                                                Math.round(
                                                  (new Date(
                                                    slot.endTime,
                                                  ).getTime() -
                                                    new Date(
                                                      slot.startTime,
                                                    ).getTime()) /
                                                    6e4,
                                                ),
                                                " ",
                                                "min",
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    /* @__PURE__ */ jsxs("div", {
                                      className:
                                        "flex flex-col items-end gap-1.5",
                                      children: [
                                        /* @__PURE__ */ jsx(Badge, {
                                          variant: STATUS_VARIANT[slot.status],
                                          className: "text-xs",
                                          children:
                                            SLOT_STATUS_LABEL[slot.status] ??
                                            "Unknown",
                                        }),
                                        /* @__PURE__ */ jsx("span", {
                                          className: "text-xs font-medium",
                                          children: new Intl.NumberFormat(
                                            "vi-VN",
                                            {
                                              style: "currency",
                                              currency: "VND",
                                              maximumFractionDigits: 0,
                                            },
                                          ).format(slot.price),
                                        }),
                                        /* @__PURE__ */ jsxs("span", {
                                          className:
                                            "text-xs text-muted-foreground",
                                          children: [
                                            slot.currentBookings,
                                            "/",
                                            slot.maxBookings,
                                            " booked",
                                          ],
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                slot.description &&
                                  /* @__PURE__ */ jsxs(Tooltip$1, {
                                    children: [
                                      /* @__PURE__ */ jsx(TooltipTrigger, {
                                        asChild: true,
                                        children: /* @__PURE__ */ jsx("p", {
                                          className:
                                            "mt-2 truncate text-xs text-muted-foreground",
                                          children: slot.description,
                                        }),
                                      }),
                                      /* @__PURE__ */ jsx(TooltipContent, {
                                        children: /* @__PURE__ */ jsx("p", {
                                          className: "max-w-xs text-xs",
                                          children: slot.description,
                                        }),
                                      }),
                                    ],
                                  }),
                              ],
                            }),
                          },
                          slot.id,
                        ),
                      ),
                    }),
                    /* @__PURE__ */ jsx(Separator$1, { className: "mt-4" }),
                  ],
                },
                date.toISOString(),
              ),
            ),
          }),
      /* @__PURE__ */ jsx(Dialog$1, {
        open: createOpen,
        onOpenChange: setCreateOpen,
        children: /* @__PURE__ */ jsxs(DialogContent, {
          className: "sm:max-w-md",
          children: [
            /* @__PURE__ */ jsx(DialogHeader, {
              children: /* @__PURE__ */ jsx(DialogTitle, {
                children: "Create Slot",
              }),
            }),
            /* @__PURE__ */ jsx(MentorSlotForm, {
              mentorId,
              onSuccess: () => setCreateOpen(false),
            }),
          ],
        }),
      }),
      /* @__PURE__ */ jsx(Dialog$1, {
        open: !!editSlot,
        onOpenChange: (o) => !o && setEditSlot(null),
        children: /* @__PURE__ */ jsxs(DialogContent, {
          className: "sm:max-w-md",
          children: [
            /* @__PURE__ */ jsx(DialogHeader, {
              children: /* @__PURE__ */ jsx(DialogTitle, {
                children: "Edit Slot",
              }),
            }),
            editSlot &&
              /* @__PURE__ */ jsx(MentorSlotForm, {
                mentorId,
                slot: editSlot,
                onSuccess: () => setEditSlot(null),
              }),
          ],
        }),
      }),
    ],
  });
}
//#endregion
//#region app/features/admin/mentor/mentor-detail-page.tsx
function MentorDetailPage({ mentorId }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "profile";
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { data: mentor, isPending, isError } = useMentorDetailQuery(mentorId);
  const isFormOpen = editOpen || deleteOpen;
  useHotkeys(
    "1",
    () => setSearchParams({ tab: "profile" }, { replace: true }),
    {
      scopes: HotkeyScopes.MentorDetail,
      enabled: !isFormOpen,
    },
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
  if (isPending)
    return /* @__PURE__ */ jsxs("div", {
      className: "space-y-6",
      children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-48" }),
        /* @__PURE__ */ jsxs("div", {
          className: "flex items-center gap-4",
          children: [
            /* @__PURE__ */ jsx(Skeleton, {
              className: "size-16 rounded-full",
            }),
            /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [
                /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-40" }),
                /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-56" }),
              ],
            }),
          ],
        }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-64 w-full" }),
      ],
    });
  if (isError || !mentor)
    return /* @__PURE__ */ jsxs("div", {
      className: "flex flex-col items-center justify-center py-16 text-center",
      children: [
        /* @__PURE__ */ jsx("p", {
          className: "text-sm text-muted-foreground",
          children: "Mentor not found or failed to load.",
        }),
        /* @__PURE__ */ jsx(Button, {
          variant: "outline",
          size: "sm",
          className: "mt-4",
          onClick: () => navigate("/admin/mentors"),
          children: "Back to Mentors",
        }),
      ],
    });
  const initials =
    (mentor.displayName ?? "")
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsx(Breadcrumb, {
        children: /* @__PURE__ */ jsxs(BreadcrumbList, {
          children: [
            /* @__PURE__ */ jsx(BreadcrumbItem, {
              children: /* @__PURE__ */ jsx(BreadcrumbLink, {
                asChild: true,
                children: /* @__PURE__ */ jsx(Link, {
                  to: "/admin",
                  children: "Admin",
                }),
              }),
            }),
            /* @__PURE__ */ jsx(BreadcrumbSeparator, {}),
            /* @__PURE__ */ jsx(BreadcrumbItem, {
              children: /* @__PURE__ */ jsx(BreadcrumbLink, {
                asChild: true,
                children: /* @__PURE__ */ jsx(Link, {
                  to: "/admin/mentors",
                  children: "Mentors",
                }),
              }),
            }),
            /* @__PURE__ */ jsx(BreadcrumbSeparator, {}),
            /* @__PURE__ */ jsx(BreadcrumbItem, {
              children: /* @__PURE__ */ jsx(BreadcrumbPage, {
                children: mentor.displayName,
              }),
            }),
          ],
        }),
      }),
      /* @__PURE__ */ jsxs("div", {
        className:
          "flex flex-col gap-4 rounded-xl border p-5 sm:flex-row sm:items-start sm:justify-between",
        children: [
          /* @__PURE__ */ jsxs("div", {
            className: "flex items-center gap-4",
            children: [
              /* @__PURE__ */ jsxs(Avatar$1, {
                className: "size-16 shrink-0",
                children: [
                  mentor.avatarUrl &&
                    /* @__PURE__ */ jsx(AvatarImage, {
                      src: mentor.avatarUrl,
                      alt: mentor.displayName,
                    }),
                  /* @__PURE__ */ jsx(AvatarFallback, {
                    className:
                      "bg-primary/10 text-lg font-semibold text-primary",
                    children: initials,
                  }),
                ],
              }),
              /* @__PURE__ */ jsxs("div", {
                className: "min-w-0",
                children: [
                  /* @__PURE__ */ jsxs("div", {
                    className: "flex flex-wrap items-center gap-2",
                    children: [
                      /* @__PURE__ */ jsx("h2", {
                        className: "text-xl font-semibold",
                        children: mentor.displayName,
                      }),
                      /* @__PURE__ */ jsx(Badge, {
                        variant: mentor.isActive ? "default" : "secondary",
                        className: "text-xs",
                        children: mentor.isActive ? "Active" : "Inactive",
                      }),
                    ],
                  }),
                  /* @__PURE__ */ jsx("p", {
                    className: "text-sm text-muted-foreground",
                    children: mentor.email,
                  }),
                  mentor.specialization &&
                    /* @__PURE__ */ jsxs("p", {
                      className: "mt-0.5 text-xs text-muted-foreground",
                      children: [
                        mentor.specialization,
                        " · ",
                        mentor.experienceYears,
                        " yr",
                        mentor.experienceYears !== 1 ? "s" : "",
                      ],
                    }),
                ],
              }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "flex shrink-0 items-center gap-2",
            children: [
              /* @__PURE__ */ jsxs(Button, {
                variant: "outline",
                size: "sm",
                onClick: () => navigate("/admin/mentors"),
                className: "gap-1.5",
                children: [
                  /* @__PURE__ */ jsx(ArrowLeft, { className: "size-4" }),
                  "Back",
                ],
              }),
              /* @__PURE__ */ jsxs(Button, {
                variant: "outline",
                size: "sm",
                onClick: () => setEditOpen(true),
                className: "gap-1.5",
                children: [
                  /* @__PURE__ */ jsx(Edit, { className: "size-4" }),
                  "Edit",
                  /* @__PURE__ */ jsx(Kbd, { children: "E" }),
                ],
              }),
              /* @__PURE__ */ jsxs(Button, {
                variant: "destructive",
                size: "sm",
                onClick: () => setDeleteOpen(true),
                className: "gap-1.5",
                children: [
                  /* @__PURE__ */ jsx(Trash2, { className: "size-4" }),
                  "Delete",
                ],
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsxs(Tabs$1, {
        value: activeTab,
        onValueChange: (v) => setSearchParams({ tab: v }, { replace: true }),
        children: [
          /* @__PURE__ */ jsxs(TabsList, {
            className: "w-full sm:w-auto",
            children: [
              /* @__PURE__ */ jsxs(TabsTrigger, {
                value: "profile",
                className: "gap-1.5",
                children: [
                  "Profile ",
                  /* @__PURE__ */ jsx(Kbd, { children: "1" }),
                ],
              }),
              /* @__PURE__ */ jsxs(TabsTrigger, {
                value: "skills",
                className: "gap-1.5",
                children: [
                  "Skills ",
                  /* @__PURE__ */ jsx(Kbd, { children: "2" }),
                ],
              }),
              /* @__PURE__ */ jsxs(TabsTrigger, {
                value: "slots",
                className: "gap-1.5",
                children: [
                  "Slots ",
                  /* @__PURE__ */ jsx(Kbd, { children: "3" }),
                ],
              }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "mt-6",
            children: [
              /* @__PURE__ */ jsx(TabsContent, {
                value: "profile",
                children: /* @__PURE__ */ jsx(MentorProfileTab, { mentor }),
              }),
              /* @__PURE__ */ jsx(TabsContent, {
                value: "skills",
                children: /* @__PURE__ */ jsx(MentorSkillsTab, {
                  mentorId: mentor.id,
                  skills: mentor.skills,
                }),
              }),
              /* @__PURE__ */ jsx(TabsContent, {
                value: "slots",
                children: /* @__PURE__ */ jsx(MentorSlotsTab, {
                  mentorId: mentor.id,
                  slots: mentor.slots,
                  createShortcutEnabled: activeTab === "slots",
                }),
              }),
            ],
          }),
        ],
      }),
      /* @__PURE__ */ jsx(MentorEditDialog, {
        mentor,
        open: editOpen,
        onOpenChange: setEditOpen,
      }),
      /* @__PURE__ */ jsx(MentorDeleteDialog, {
        mentor,
        open: deleteOpen,
        onOpenChange: (o) => {
          setDeleteOpen(o);
          if (!o) navigate("/admin/mentors");
        },
      }),
    ],
  });
}
//#endregion
//#region app/routes/admin/mentors.$id.tsx
var mentors_$id_exports = /* @__PURE__ */ __exportAll({
  default: () => mentors_$id_default,
  meta: () => meta$4,
});
function meta$4({ params }) {
  return [{ title: `Mentor Detail — Admin | MiniBooking` }];
}
var mentors_$id_default = UNSAFE_withComponentProps(function AdminMentorDetail({
  params,
}) {
  return /* @__PURE__ */ jsx(MentorDetailPage, { mentorId: params.id });
});
//#endregion
//#region app/routes/admin/bookings.tsx
var bookings_exports = /* @__PURE__ */ __exportAll({
  default: () => bookings_default,
  meta: () => meta$3,
});
function meta$3() {
  return [{ title: "Bookings — Admin | MiniBooking" }];
}
var bookings_default = UNSAFE_withComponentProps(function AdminBookings() {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        children: [
          /* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-semibold tracking-tight",
            children: "Bookings",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-muted-foreground",
            children: "View and manage all bookings across the platform.",
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className:
          "flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center",
        children: [
          /* @__PURE__ */ jsx(CalendarCheck, {
            className: "mb-4 size-10 text-muted-foreground/50",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-sm font-medium text-muted-foreground",
            children: "Booking management coming soon",
          }),
        ],
      }),
    ],
  });
});
//#endregion
//#region app/routes/admin/payments.tsx
var payments_exports = /* @__PURE__ */ __exportAll({
  default: () => payments_default,
  meta: () => meta$2,
});
function meta$2() {
  return [{ title: "Payments — Admin | MiniBooking" }];
}
var payments_default = UNSAFE_withComponentProps(function AdminPayments() {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        children: [
          /* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-semibold tracking-tight",
            children: "Payments",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-muted-foreground",
            children: "Monitor payment transactions and revenue.",
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className:
          "flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center",
        children: [
          /* @__PURE__ */ jsx(CreditCard, {
            className: "mb-4 size-10 text-muted-foreground/50",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-sm font-medium text-muted-foreground",
            children: "Payment management coming soon",
          }),
        ],
      }),
    ],
  });
});
//#endregion
//#region app/routes/admin/health.tsx
var health_exports = /* @__PURE__ */ __exportAll({
  default: () => health_default,
  meta: () => meta$1,
});
function meta$1() {
  return [{ title: "System Health — Admin | MiniBooking" }];
}
var health_default = UNSAFE_withComponentProps(function AdminHealth() {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        children: [
          /* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-semibold tracking-tight",
            children: "System Health",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-muted-foreground",
            children: "Monitor API status and service health.",
          }),
        ],
      }),
      /* @__PURE__ */ jsx("div", {
        className: "rounded-xl border bg-card p-6 shadow-sm",
        children: /* @__PURE__ */ jsxs("div", {
          className: "flex items-center gap-3",
          children: [
            /* @__PURE__ */ jsx(Activity, {
              className: "size-5 text-muted-foreground",
            }),
            /* @__PURE__ */ jsx("span", {
              className: "text-sm font-medium",
              children: "API Status",
            }),
            /* @__PURE__ */ jsxs("div", {
              className:
                "ml-auto flex items-center gap-1.5 text-sm font-medium text-emerald-600",
              children: [
                /* @__PURE__ */ jsx(CheckCircle, { className: "size-4" }),
                "Operational",
              ],
            }),
          ],
        }),
      }),
    ],
  });
});
//#endregion
//#region app/routes/errors/unauthorized.tsx
var unauthorized_exports = /* @__PURE__ */ __exportAll({
  default: () => unauthorized_default,
  meta: () => meta,
});
function meta() {
  return [{ title: "Unauthorized — MiniBooking" }];
}
var unauthorized_default = UNSAFE_withComponentProps(
  function UnauthorizedPage() {
    return /* @__PURE__ */ jsx("div", {
      className:
        "flex min-h-screen items-center justify-center bg-background p-4",
      children: /* @__PURE__ */ jsxs("div", {
        className: "w-full max-w-md space-y-6 text-center",
        children: [
          /* @__PURE__ */ jsx("div", {
            className: "flex justify-center",
            children: /* @__PURE__ */ jsx("div", {
              className:
                "flex size-20 items-center justify-center rounded-full bg-destructive/10",
              children: /* @__PURE__ */ jsx(ShieldX, {
                className: "size-10 text-destructive",
              }),
            }),
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "space-y-2",
            children: [
              /* @__PURE__ */ jsx("h1", {
                className: "text-2xl font-semibold tracking-tight",
                children: "Access Denied",
              }),
              /* @__PURE__ */ jsx("p", {
                className: "text-muted-foreground",
                children:
                  "You don't have permission to view this page. Please contact an administrator if you believe this is a mistake.",
              }),
            ],
          }),
          /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col gap-2 sm:flex-row sm:justify-center",
            children: [
              /* @__PURE__ */ jsx(Button, {
                asChild: true,
                variant: "default",
                children: /* @__PURE__ */ jsx(Link, {
                  to: "/",
                  children: "Go Home",
                }),
              }),
              /* @__PURE__ */ jsx(Button, {
                asChild: true,
                variant: "outline",
                children: /* @__PURE__ */ jsx(Link, {
                  to: "/login",
                  children: "Sign In",
                }),
              }),
            ],
          }),
        ],
      }),
    });
  },
);
//#endregion
//#region \0virtual:react-router/server-manifest
var server_manifest_default = {
  entry: {
    module: "/assets/entry.client-D2AijQnQ.js",
    imports: [
      "/assets/rolldown-runtime-D7KTRRX7.js",
      "/assets/chunk-5KNZJZUH-CvMizu8N.js",
      "/assets/react-dom-DL8BN-RZ.js",
      "/assets/jsx-runtime-BlYCgOOU.js",
      "/assets/react-B-3UWBEL.js",
    ],
    css: [],
  },
  routes: {
    root: {
      id: "root",
      parentId: void 0,
      path: "",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: true,
      module: "/assets/root-CWiQE2AC.js",
      imports: [
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/react-dom-DL8BN-RZ.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/tooltip-BxvEFgKv.js",
        "/assets/api-error-DsoLvGEf.js",
        "/assets/auth.store-2ys34xdP.js",
        "/assets/QueryClientProvider-BSetF0kN.js",
        "/assets/mutation-C96behGB.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
        "/assets/circle-check-DGXQ6KNJ.js",
        "/assets/loader-circle-DxipSu_q.js",
        "/assets/dist-Dm1nhCqh.js",
        "/assets/utils-DZ7UQ4Bk.js",
        "/assets/dist-DMJxeS_F.js",
        "/assets/dist-Mpu295hZ.js",
        "/assets/dist-DdO1kwVo.js",
        "/assets/dist-CeOfY7EX.js",
        "/assets/dist-C5yWpQ74.js",
        "/assets/dist-GZs3GFMO.js",
      ],
      css: ["/assets/root-BTY5yZZ-.css"],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/public/_layout": {
      id: "routes/public/_layout",
      parentId: "root",
      path: void 0,
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: true,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/_layout-W-i1NxJK.js",
      imports: [
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/avatar-DJgmc_Mf.js",
        "/assets/button-4KLeZV-d.js",
        "/assets/separator-iiM6-Sxx.js",
        "/assets/sheet-BvsiYVru.js",
        "/assets/use-auth-Bm0M9Fk6.js",
        "/assets/auth.service-Dy9lc57k.js",
        "/assets/auth.store-2ys34xdP.js",
        "/assets/calendar-days-CX08cIXK.js",
        "/assets/circle-user-lD79-Kph.js",
        "/assets/log-out-e-HsZzjL.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/utils-DZ7UQ4Bk.js",
        "/assets/dist-DdO1kwVo.js",
        "/assets/dist-GZs3GFMO.js",
        "/assets/react-dom-DL8BN-RZ.js",
        "/assets/dist-DKAWrTW-.js",
        "/assets/dist-CfBkXSLO.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
        "/assets/x-BZUO-sLr.js",
        "/assets/dist-Mpu295hZ.js",
        "/assets/dist-CeOfY7EX.js",
        "/assets/es2015-DaoE4flL.js",
        "/assets/dist-C5yWpQ74.js",
        "/assets/axios.config-BQys5tVP.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/public/home": {
      id: "routes/public/home",
      parentId: "routes/public/_layout",
      path: void 0,
      index: true,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/home-CS73SjBZ.js",
      imports: [
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/badge-BmglEu3D.js",
        "/assets/button-4KLeZV-d.js",
        "/assets/separator-iiM6-Sxx.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
        "/assets/chart-column-BAeSxre6.js",
        "/assets/calendar-check-BQQ517_C.js",
        "/assets/chevron-right-B0ExwN4W.js",
        "/assets/circle-check-DGXQ6KNJ.js",
        "/assets/search-BePpyUcP.js",
        "/assets/users-DXGm006r.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/utils-DZ7UQ4Bk.js",
        "/assets/dist-DKAWrTW-.js",
        "/assets/dist-GZs3GFMO.js",
        "/assets/react-dom-DL8BN-RZ.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/public/about": {
      id: "routes/public/about",
      parentId: "routes/public/_layout",
      path: "about",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/about-Bubqmp78.js",
      imports: [
        "/assets/avatar-DJgmc_Mf.js",
        "/assets/badge-BmglEu3D.js",
        "/assets/separator-iiM6-Sxx.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
        "/assets/chart-column-BAeSxre6.js",
        "/assets/users-DXGm006r.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/utils-DZ7UQ4Bk.js",
        "/assets/dist-DdO1kwVo.js",
        "/assets/dist-GZs3GFMO.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/react-dom-DL8BN-RZ.js",
        "/assets/dist-DKAWrTW-.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/public/mentors": {
      id: "routes/public/mentors",
      parentId: "routes/public/_layout",
      path: "mentors",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/mentors-DY7Snxl7.js",
      imports: [
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/mentor-list-container-B-9zjmy-.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/data-table-pagination-DhXvt5KN.js",
        "/assets/mentor-filter-panel-hQ_UnR6u.js",
        "/assets/avatar-DJgmc_Mf.js",
        "/assets/button-4KLeZV-d.js",
        "/assets/card-6LjgNCSB.js",
        "/assets/utils-DZ7UQ4Bk.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
        "/assets/briefcase-C0f7RW0h.js",
        "/assets/dollar-sign-ter81zHN.js",
        "/assets/users-DXGm006r.js",
        "/assets/dist-DMJxeS_F.js",
        "/assets/dist-Bwou0fCS.js",
        "/assets/dist-Mpu295hZ.js",
        "/assets/dist-BRlPHYh3.js",
        "/assets/dist-DdO1kwVo.js",
        "/assets/dist-CeOfY7EX.js",
        "/assets/es2015-DaoE4flL.js",
        "/assets/dist-GZs3GFMO.js",
        "/assets/chevron-right-B0ExwN4W.js",
        "/assets/react-dom-DL8BN-RZ.js",
        "/assets/dist-DKAWrTW-.js",
        "/assets/badge-BmglEu3D.js",
        "/assets/input-BWt5iw2T.js",
        "/assets/label-Dps5ofxK.js",
        "/assets/mentor.service-DPL6eBMY.js",
        "/assets/QueryClientProvider-BSetF0kN.js",
        "/assets/search-BePpyUcP.js",
        "/assets/x-BZUO-sLr.js",
        "/assets/axios.config-BQys5tVP.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/public/mentor-detail": {
      id: "routes/public/mentor-detail",
      parentId: "routes/public/_layout",
      path: "mentors/:id",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/mentor-detail-NOzE0g1g.js",
      imports: [
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/mentor-detail-view-pwZveAgr.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/avatar-DJgmc_Mf.js",
        "/assets/badge-BmglEu3D.js",
        "/assets/button-4KLeZV-d.js",
        "/assets/card-6LjgNCSB.js",
        "/assets/textarea-CfN3TLtF.js",
        "/assets/label-Dps5ofxK.js",
        "/assets/separator-iiM6-Sxx.js",
        "/assets/use-user-bookings-query-CF3lHHJI.js",
        "/assets/use-mentor-detail-query-BXrqEF3A.js",
        "/assets/api-error-DsoLvGEf.js",
        "/assets/utils-DZ7UQ4Bk.js",
        "/assets/booking.service-B8etHkBu.js",
        "/assets/auth.store-2ys34xdP.js",
        "/assets/mentor-Bg1gbwk1.js",
        "/assets/QueryClientProvider-BSetF0kN.js",
        "/assets/useMutation-CvoIZgcs.js",
        "/assets/arrow-left-B7etKPWB.js",
        "/assets/briefcase-C0f7RW0h.js",
        "/assets/calendar-days-CX08cIXK.js",
        "/assets/calendar-Bj1l8o8z.js",
        "/assets/clock-B5djXDMU.js",
        "/assets/dollar-sign-ter81zHN.js",
        "/assets/loader-circle-DxipSu_q.js",
        "/assets/phone-DnpuB4sX.js",
        "/assets/user-PZHMXx1a.js",
        "/assets/dist-Dm1nhCqh.js",
        "/assets/dist-DdO1kwVo.js",
        "/assets/dist-GZs3GFMO.js",
        "/assets/react-dom-DL8BN-RZ.js",
        "/assets/dist-DKAWrTW-.js",
        "/assets/dist-CfBkXSLO.js",
        "/assets/x-BZUO-sLr.js",
        "/assets/dist-Mpu295hZ.js",
        "/assets/dist-CeOfY7EX.js",
        "/assets/es2015-DaoE4flL.js",
        "/assets/dist-C5yWpQ74.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
        "/assets/axios.config-BQys5tVP.js",
        "/assets/mentor.service-DPL6eBMY.js",
        "/assets/mutation-C96behGB.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/auth/_layout": {
      id: "routes/auth/_layout",
      parentId: "root",
      path: void 0,
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: true,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/_layout-DsGVbPPu.js",
      imports: [
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/require-role-CJ_8scK3.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/auth.store-2ys34xdP.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/auth/login": {
      id: "routes/auth/login",
      parentId: "routes/auth/_layout",
      path: "login",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/login-CgplN7Ry.js",
      imports: [
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/social.form-BmLj8Qcb.js",
        "/assets/button-4KLeZV-d.js",
        "/assets/schemas-CdW0TvSb.js",
        "/assets/input-BWt5iw2T.js",
        "/assets/api-error-DsoLvGEf.js",
        "/assets/auth.service-Dy9lc57k.js",
        "/assets/auth.store-2ys34xdP.js",
        "/assets/eye-CwrHmF5t.js",
        "/assets/loader-circle-DxipSu_q.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/dist-Dm1nhCqh.js",
        "/assets/separator-iiM6-Sxx.js",
        "/assets/calendar-days-CX08cIXK.js",
        "/assets/utils-DZ7UQ4Bk.js",
        "/assets/dist-DKAWrTW-.js",
        "/assets/dist-GZs3GFMO.js",
        "/assets/react-dom-DL8BN-RZ.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
        "/assets/label-Dps5ofxK.js",
        "/assets/axios.config-BQys5tVP.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/auth/register": {
      id: "routes/auth/register",
      parentId: "routes/auth/_layout",
      path: "register",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/register-ChfqAx_B.js",
      imports: [
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/social.form-BmLj8Qcb.js",
        "/assets/button-4KLeZV-d.js",
        "/assets/schemas-CdW0TvSb.js",
        "/assets/input-BWt5iw2T.js",
        "/assets/api-error-DsoLvGEf.js",
        "/assets/auth.service-Dy9lc57k.js",
        "/assets/eye-CwrHmF5t.js",
        "/assets/loader-circle-DxipSu_q.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/dist-Dm1nhCqh.js",
        "/assets/separator-iiM6-Sxx.js",
        "/assets/calendar-days-CX08cIXK.js",
        "/assets/utils-DZ7UQ4Bk.js",
        "/assets/dist-DKAWrTW-.js",
        "/assets/dist-GZs3GFMO.js",
        "/assets/react-dom-DL8BN-RZ.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
        "/assets/label-Dps5ofxK.js",
        "/assets/axios.config-BQys5tVP.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/user/_layout": {
      id: "routes/user/_layout",
      parentId: "root",
      path: void 0,
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: true,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/_layout-Dv8kl8Tm.js",
      imports: [
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/nav-config-DwEQ-Nxr.js",
        "/assets/require-role-CJ_8scK3.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/avatar-DJgmc_Mf.js",
        "/assets/button-4KLeZV-d.js",
        "/assets/separator-iiM6-Sxx.js",
        "/assets/sheet-BvsiYVru.js",
        "/assets/utils-DZ7UQ4Bk.js",
        "/assets/auth.service-Dy9lc57k.js",
        "/assets/auth.store-2ys34xdP.js",
        "/assets/activity-CDTLDLIC.js",
        "/assets/book-open-B__mxakS.js",
        "/assets/bot-DwWtA718.js",
        "/assets/calendar-check-BQQ517_C.js",
        "/assets/calendar-days-CX08cIXK.js",
        "/assets/circle-user-lD79-Kph.js",
        "/assets/credit-card-CFnx3JQ5.js",
        "/assets/graduation-cap-DLzpx06y.js",
        "/assets/log-out-e-HsZzjL.js",
        "/assets/users-DXGm006r.js",
        "/assets/dist-Dm1nhCqh.js",
        "/assets/dist-DdO1kwVo.js",
        "/assets/dist-GZs3GFMO.js",
        "/assets/react-dom-DL8BN-RZ.js",
        "/assets/dist-DKAWrTW-.js",
        "/assets/dist-CfBkXSLO.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
        "/assets/x-BZUO-sLr.js",
        "/assets/dist-Mpu295hZ.js",
        "/assets/dist-CeOfY7EX.js",
        "/assets/es2015-DaoE4flL.js",
        "/assets/dist-C5yWpQ74.js",
        "/assets/axios.config-BQys5tVP.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/user/dashboard": {
      id: "routes/user/dashboard",
      parentId: "routes/user/_layout",
      path: "user",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/dashboard-BsiG5BO9.js",
      imports: [
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/use-auth-Bm0M9Fk6.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/auth.store-2ys34xdP.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/user/bookings": {
      id: "routes/user/bookings",
      parentId: "routes/user/_layout",
      path: "user/bookings",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/bookings-BUdgfGB-.js",
      imports: [
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/data-table-pagination-DhXvt5KN.js",
        "/assets/avatar-DJgmc_Mf.js",
        "/assets/badge-BmglEu3D.js",
        "/assets/button-4KLeZV-d.js",
        "/assets/card-6LjgNCSB.js",
        "/assets/tabs-ivzE7UWj.js",
        "/assets/use-user-bookings-query-CF3lHHJI.js",
        "/assets/auth.store-2ys34xdP.js",
        "/assets/booking-BgsOWCU3.js",
        "/assets/calendar-check-BQQ517_C.js",
        "/assets/chevron-right-B0ExwN4W.js",
        "/assets/clock-B5djXDMU.js",
        "/assets/credit-card-CFnx3JQ5.js",
        "/assets/dollar-sign-ter81zHN.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/utils-DZ7UQ4Bk.js",
        "/assets/dist-DMJxeS_F.js",
        "/assets/dist-Bwou0fCS.js",
        "/assets/dist-Mpu295hZ.js",
        "/assets/dist-BRlPHYh3.js",
        "/assets/dist-DdO1kwVo.js",
        "/assets/dist-CeOfY7EX.js",
        "/assets/es2015-DaoE4flL.js",
        "/assets/dist-GZs3GFMO.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
        "/assets/react-dom-DL8BN-RZ.js",
        "/assets/dist-DKAWrTW-.js",
        "/assets/QueryClientProvider-BSetF0kN.js",
        "/assets/dist-C5yWpQ74.js",
        "/assets/booking.service-B8etHkBu.js",
        "/assets/axios.config-BQys5tVP.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/user/booking-detail": {
      id: "routes/user/booking-detail",
      parentId: "routes/user/_layout",
      path: "user/bookings/:id",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/booking-detail-BZKlc7pW.js",
      imports: [
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/avatar-DJgmc_Mf.js",
        "/assets/badge-BmglEu3D.js",
        "/assets/button-4KLeZV-d.js",
        "/assets/card-6LjgNCSB.js",
        "/assets/textarea-CfN3TLtF.js",
        "/assets/label-Dps5ofxK.js",
        "/assets/separator-iiM6-Sxx.js",
        "/assets/use-booking-detail-query-tFewnflI.js",
        "/assets/api-error-DsoLvGEf.js",
        "/assets/booking.service-B8etHkBu.js",
        "/assets/auth.store-2ys34xdP.js",
        "/assets/booking-BgsOWCU3.js",
        "/assets/QueryClientProvider-BSetF0kN.js",
        "/assets/useMutation-CvoIZgcs.js",
        "/assets/arrow-left-B7etKPWB.js",
        "/assets/calendar-Bj1l8o8z.js",
        "/assets/circle-check-DGXQ6KNJ.js",
        "/assets/clock-B5djXDMU.js",
        "/assets/credit-card-CFnx3JQ5.js",
        "/assets/dollar-sign-ter81zHN.js",
        "/assets/loader-circle-DxipSu_q.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/dist-Dm1nhCqh.js",
        "/assets/utils-DZ7UQ4Bk.js",
        "/assets/dist-DdO1kwVo.js",
        "/assets/dist-GZs3GFMO.js",
        "/assets/react-dom-DL8BN-RZ.js",
        "/assets/dist-DKAWrTW-.js",
        "/assets/dist-CfBkXSLO.js",
        "/assets/x-BZUO-sLr.js",
        "/assets/dist-Mpu295hZ.js",
        "/assets/dist-CeOfY7EX.js",
        "/assets/es2015-DaoE4flL.js",
        "/assets/dist-C5yWpQ74.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
        "/assets/axios.config-BQys5tVP.js",
        "/assets/mutation-C96behGB.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/user/booking-payment": {
      id: "routes/user/booking-payment",
      parentId: "routes/user/_layout",
      path: "user/bookings/:id/payment",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/booking-payment-eseZvh0W.js",
      imports: [
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/badge-BmglEu3D.js",
        "/assets/button-4KLeZV-d.js",
        "/assets/card-6LjgNCSB.js",
        "/assets/use-booking-detail-query-tFewnflI.js",
        "/assets/axios.config-BQys5tVP.js",
        "/assets/useMutation-CvoIZgcs.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
        "/assets/circle-check-DGXQ6KNJ.js",
        "/assets/clock-B5djXDMU.js",
        "/assets/loader-circle-DxipSu_q.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/utils-DZ7UQ4Bk.js",
        "/assets/dist-DKAWrTW-.js",
        "/assets/QueryClientProvider-BSetF0kN.js",
        "/assets/booking.service-B8etHkBu.js",
        "/assets/mutation-C96behGB.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/user/find-mentors": {
      id: "routes/user/find-mentors",
      parentId: "routes/user/_layout",
      path: "user/mentors",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/find-mentors-Bu0Abe9v.js",
      imports: [
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/mentor-list-container-B-9zjmy-.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/data-table-pagination-DhXvt5KN.js",
        "/assets/mentor-filter-panel-hQ_UnR6u.js",
        "/assets/avatar-DJgmc_Mf.js",
        "/assets/button-4KLeZV-d.js",
        "/assets/card-6LjgNCSB.js",
        "/assets/utils-DZ7UQ4Bk.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
        "/assets/briefcase-C0f7RW0h.js",
        "/assets/dollar-sign-ter81zHN.js",
        "/assets/users-DXGm006r.js",
        "/assets/dist-DMJxeS_F.js",
        "/assets/dist-Bwou0fCS.js",
        "/assets/dist-Mpu295hZ.js",
        "/assets/dist-BRlPHYh3.js",
        "/assets/dist-DdO1kwVo.js",
        "/assets/dist-CeOfY7EX.js",
        "/assets/es2015-DaoE4flL.js",
        "/assets/dist-GZs3GFMO.js",
        "/assets/chevron-right-B0ExwN4W.js",
        "/assets/react-dom-DL8BN-RZ.js",
        "/assets/dist-DKAWrTW-.js",
        "/assets/badge-BmglEu3D.js",
        "/assets/input-BWt5iw2T.js",
        "/assets/label-Dps5ofxK.js",
        "/assets/mentor.service-DPL6eBMY.js",
        "/assets/QueryClientProvider-BSetF0kN.js",
        "/assets/search-BePpyUcP.js",
        "/assets/x-BZUO-sLr.js",
        "/assets/axios.config-BQys5tVP.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/user/mentor-detail": {
      id: "routes/user/mentor-detail",
      parentId: "routes/user/_layout",
      path: "user/mentors/:id",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/mentor-detail--dhFYULO.js",
      imports: [
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/mentor-detail-view-pwZveAgr.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/avatar-DJgmc_Mf.js",
        "/assets/badge-BmglEu3D.js",
        "/assets/button-4KLeZV-d.js",
        "/assets/card-6LjgNCSB.js",
        "/assets/textarea-CfN3TLtF.js",
        "/assets/label-Dps5ofxK.js",
        "/assets/separator-iiM6-Sxx.js",
        "/assets/use-user-bookings-query-CF3lHHJI.js",
        "/assets/use-mentor-detail-query-BXrqEF3A.js",
        "/assets/api-error-DsoLvGEf.js",
        "/assets/utils-DZ7UQ4Bk.js",
        "/assets/booking.service-B8etHkBu.js",
        "/assets/auth.store-2ys34xdP.js",
        "/assets/mentor-Bg1gbwk1.js",
        "/assets/QueryClientProvider-BSetF0kN.js",
        "/assets/useMutation-CvoIZgcs.js",
        "/assets/arrow-left-B7etKPWB.js",
        "/assets/briefcase-C0f7RW0h.js",
        "/assets/calendar-days-CX08cIXK.js",
        "/assets/calendar-Bj1l8o8z.js",
        "/assets/clock-B5djXDMU.js",
        "/assets/dollar-sign-ter81zHN.js",
        "/assets/loader-circle-DxipSu_q.js",
        "/assets/phone-DnpuB4sX.js",
        "/assets/user-PZHMXx1a.js",
        "/assets/dist-Dm1nhCqh.js",
        "/assets/dist-DdO1kwVo.js",
        "/assets/dist-GZs3GFMO.js",
        "/assets/react-dom-DL8BN-RZ.js",
        "/assets/dist-DKAWrTW-.js",
        "/assets/dist-CfBkXSLO.js",
        "/assets/x-BZUO-sLr.js",
        "/assets/dist-Mpu295hZ.js",
        "/assets/dist-CeOfY7EX.js",
        "/assets/es2015-DaoE4flL.js",
        "/assets/dist-C5yWpQ74.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
        "/assets/axios.config-BQys5tVP.js",
        "/assets/mentor.service-DPL6eBMY.js",
        "/assets/mutation-C96behGB.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/user/ai-chat": {
      id: "routes/user/ai-chat",
      parentId: "routes/user/_layout",
      path: "user/ai-chat",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/ai-chat-yq51gMRE.js",
      imports: [
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/bot-DwWtA718.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/user/payments": {
      id: "routes/user/payments",
      parentId: "routes/user/_layout",
      path: "user/payments",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/payments-CmhRZ5Lp.js",
      imports: [
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/credit-card-CFnx3JQ5.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/user/profile": {
      id: "routes/user/profile",
      parentId: "routes/user/_layout",
      path: "user/profile",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/profile-uVETPaDH.js",
      imports: [
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/use-auth-Bm0M9Fk6.js",
        "/assets/circle-user-lD79-Kph.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/auth.store-2ys34xdP.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/mentor/_layout": {
      id: "routes/mentor/_layout",
      parentId: "root",
      path: void 0,
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: true,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/_layout-CZoD5by7.js",
      imports: [
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/nav-config-DwEQ-Nxr.js",
        "/assets/require-role-CJ_8scK3.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/avatar-DJgmc_Mf.js",
        "/assets/button-4KLeZV-d.js",
        "/assets/separator-iiM6-Sxx.js",
        "/assets/sheet-BvsiYVru.js",
        "/assets/utils-DZ7UQ4Bk.js",
        "/assets/auth.service-Dy9lc57k.js",
        "/assets/auth.store-2ys34xdP.js",
        "/assets/activity-CDTLDLIC.js",
        "/assets/book-open-B__mxakS.js",
        "/assets/bot-DwWtA718.js",
        "/assets/calendar-check-BQQ517_C.js",
        "/assets/calendar-days-CX08cIXK.js",
        "/assets/circle-user-lD79-Kph.js",
        "/assets/credit-card-CFnx3JQ5.js",
        "/assets/graduation-cap-DLzpx06y.js",
        "/assets/log-out-e-HsZzjL.js",
        "/assets/users-DXGm006r.js",
        "/assets/dist-Dm1nhCqh.js",
        "/assets/dist-DdO1kwVo.js",
        "/assets/dist-GZs3GFMO.js",
        "/assets/react-dom-DL8BN-RZ.js",
        "/assets/dist-DKAWrTW-.js",
        "/assets/dist-CfBkXSLO.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
        "/assets/x-BZUO-sLr.js",
        "/assets/dist-Mpu295hZ.js",
        "/assets/dist-CeOfY7EX.js",
        "/assets/es2015-DaoE4flL.js",
        "/assets/dist-C5yWpQ74.js",
        "/assets/axios.config-BQys5tVP.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/mentor/dashboard": {
      id: "routes/mentor/dashboard",
      parentId: "routes/mentor/_layout",
      path: "mentor",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/dashboard-DClFmKxC.js",
      imports: [
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/badge-BmglEu3D.js",
        "/assets/button-4KLeZV-d.js",
        "/assets/card-6LjgNCSB.js",
        "/assets/use-my-mentor-profile-BhMK-brR.js",
        "/assets/use-auth-Bm0M9Fk6.js",
        "/assets/mentor-Bg1gbwk1.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
        "/assets/calendar-days-CX08cIXK.js",
        "/assets/clock-B5djXDMU.js",
        "/assets/dollar-sign-ter81zHN.js",
        "/assets/graduation-cap-DLzpx06y.js",
        "/assets/users-DXGm006r.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/utils-DZ7UQ4Bk.js",
        "/assets/dist-DKAWrTW-.js",
        "/assets/QueryClientProvider-BSetF0kN.js",
        "/assets/mentor.service-DPL6eBMY.js",
        "/assets/auth.store-2ys34xdP.js",
        "/assets/axios.config-BQys5tVP.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/mentor/schedule": {
      id: "routes/mentor/schedule",
      parentId: "routes/mentor/_layout",
      path: "mentor/schedule",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/schedule-BsP_qGIr.js",
      imports: [
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/badge-BmglEu3D.js",
        "/assets/button-4KLeZV-d.js",
        "/assets/card-6LjgNCSB.js",
        "/assets/textarea-CfN3TLtF.js",
        "/assets/tabs-ivzE7UWj.js",
        "/assets/mentor-slot-form-DbsOtVhG.js",
        "/assets/use-my-mentor-profile-BhMK-brR.js",
        "/assets/mentor-Bg1gbwk1.js",
        "/assets/format-BB6sCivm.js",
        "/assets/calendar-days-CX08cIXK.js",
        "/assets/clock-B5djXDMU.js",
        "/assets/dollar-sign-ter81zHN.js",
        "/assets/plus-avQu0RtP.js",
        "/assets/users-DXGm006r.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/utils-DZ7UQ4Bk.js",
        "/assets/dist-DKAWrTW-.js",
        "/assets/QueryClientProvider-BSetF0kN.js",
        "/assets/dist-CfBkXSLO.js",
        "/assets/x-BZUO-sLr.js",
        "/assets/dist-Mpu295hZ.js",
        "/assets/dist-DdO1kwVo.js",
        "/assets/dist-CeOfY7EX.js",
        "/assets/es2015-DaoE4flL.js",
        "/assets/dist-C5yWpQ74.js",
        "/assets/dist-GZs3GFMO.js",
        "/assets/react-dom-DL8BN-RZ.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
        "/assets/dist-BRlPHYh3.js",
        "/assets/schemas-CdW0TvSb.js",
        "/assets/input-BWt5iw2T.js",
        "/assets/api-error-DsoLvGEf.js",
        "/assets/mentor.service-DPL6eBMY.js",
        "/assets/useMutation-CvoIZgcs.js",
        "/assets/loader-circle-DxipSu_q.js",
        "/assets/dist-Dm1nhCqh.js",
        "/assets/label-Dps5ofxK.js",
        "/assets/axios.config-BQys5tVP.js",
        "/assets/mutation-C96behGB.js",
        "/assets/auth.store-2ys34xdP.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/mentor/skills": {
      id: "routes/mentor/skills",
      parentId: "routes/mentor/_layout",
      path: "mentor/skills",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/skills-Cbp-kCNc.js",
      imports: [
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/badge-BmglEu3D.js",
        "/assets/button-4KLeZV-d.js",
        "/assets/card-6LjgNCSB.js",
        "/assets/separator-iiM6-Sxx.js",
        "/assets/tooltip-BxvEFgKv.js",
        "/assets/mentor-skills-form-B8rHB5-O.js",
        "/assets/use-remove-mentor-skill-mutation-CMrN_x0L.js",
        "/assets/use-my-mentor-profile-BhMK-brR.js",
        "/assets/graduation-cap-DLzpx06y.js",
        "/assets/loader-circle-DxipSu_q.js",
        "/assets/x-BZUO-sLr.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/utils-DZ7UQ4Bk.js",
        "/assets/dist-DKAWrTW-.js",
        "/assets/QueryClientProvider-BSetF0kN.js",
        "/assets/dist-GZs3GFMO.js",
        "/assets/react-dom-DL8BN-RZ.js",
        "/assets/dist-DMJxeS_F.js",
        "/assets/dist-Mpu295hZ.js",
        "/assets/dist-DdO1kwVo.js",
        "/assets/dist-CeOfY7EX.js",
        "/assets/dist-C5yWpQ74.js",
        "/assets/schemas-CdW0TvSb.js",
        "/assets/input-BWt5iw2T.js",
        "/assets/plus-avQu0RtP.js",
        "/assets/label-Dps5ofxK.js",
        "/assets/api-error-DsoLvGEf.js",
        "/assets/mentor.service-DPL6eBMY.js",
        "/assets/useMutation-CvoIZgcs.js",
        "/assets/dist-Dm1nhCqh.js",
        "/assets/axios.config-BQys5tVP.js",
        "/assets/mutation-C96behGB.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
        "/assets/auth.store-2ys34xdP.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/mentor/bookings": {
      id: "routes/mentor/bookings",
      parentId: "routes/mentor/_layout",
      path: "mentor/bookings",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/bookings-CColR_fb.js",
      imports: [
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/avatar-DJgmc_Mf.js",
        "/assets/badge-BmglEu3D.js",
        "/assets/button-4KLeZV-d.js",
        "/assets/card-6LjgNCSB.js",
        "/assets/tabs-ivzE7UWj.js",
        "/assets/use-my-mentor-profile-BhMK-brR.js",
        "/assets/booking-BgsOWCU3.js",
        "/assets/mentor-Bg1gbwk1.js",
        "/assets/book-open-B__mxakS.js",
        "/assets/clock-B5djXDMU.js",
        "/assets/dollar-sign-ter81zHN.js",
        "/assets/user-PZHMXx1a.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/utils-DZ7UQ4Bk.js",
        "/assets/dist-DdO1kwVo.js",
        "/assets/dist-GZs3GFMO.js",
        "/assets/react-dom-DL8BN-RZ.js",
        "/assets/dist-DKAWrTW-.js",
        "/assets/QueryClientProvider-BSetF0kN.js",
        "/assets/dist-Mpu295hZ.js",
        "/assets/dist-BRlPHYh3.js",
        "/assets/dist-C5yWpQ74.js",
        "/assets/mentor.service-DPL6eBMY.js",
        "/assets/auth.store-2ys34xdP.js",
        "/assets/axios.config-BQys5tVP.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/mentor/ai-chat": {
      id: "routes/mentor/ai-chat",
      parentId: "routes/mentor/_layout",
      path: "mentor/ai-chat",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/ai-chat-D4iUhrZj.js",
      imports: [
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/bot-DwWtA718.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/mentor/profile": {
      id: "routes/mentor/profile",
      parentId: "routes/mentor/_layout",
      path: "mentor/profile",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/profile-DBHwhUwd.js",
      imports: [
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/avatar-DJgmc_Mf.js",
        "/assets/badge-BmglEu3D.js",
        "/assets/card-6LjgNCSB.js",
        "/assets/separator-iiM6-Sxx.js",
        "/assets/use-my-mentor-profile-BhMK-brR.js",
        "/assets/use-auth-Bm0M9Fk6.js",
        "/assets/briefcase-C0f7RW0h.js",
        "/assets/calendar-days-CX08cIXK.js",
        "/assets/dollar-sign-ter81zHN.js",
        "/assets/graduation-cap-DLzpx06y.js",
        "/assets/phone-DnpuB4sX.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/utils-DZ7UQ4Bk.js",
        "/assets/dist-DdO1kwVo.js",
        "/assets/dist-GZs3GFMO.js",
        "/assets/react-dom-DL8BN-RZ.js",
        "/assets/dist-DKAWrTW-.js",
        "/assets/QueryClientProvider-BSetF0kN.js",
        "/assets/mentor.service-DPL6eBMY.js",
        "/assets/auth.store-2ys34xdP.js",
        "/assets/axios.config-BQys5tVP.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/admin/_layout": {
      id: "routes/admin/_layout",
      parentId: "root",
      path: void 0,
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: true,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/_layout-C3nUp4Qq.js",
      imports: [
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/nav-config-DwEQ-Nxr.js",
        "/assets/require-role-CJ_8scK3.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/avatar-DJgmc_Mf.js",
        "/assets/button-4KLeZV-d.js",
        "/assets/separator-iiM6-Sxx.js",
        "/assets/sheet-BvsiYVru.js",
        "/assets/utils-DZ7UQ4Bk.js",
        "/assets/auth.service-Dy9lc57k.js",
        "/assets/auth.store-2ys34xdP.js",
        "/assets/activity-CDTLDLIC.js",
        "/assets/book-open-B__mxakS.js",
        "/assets/bot-DwWtA718.js",
        "/assets/calendar-check-BQQ517_C.js",
        "/assets/calendar-days-CX08cIXK.js",
        "/assets/circle-user-lD79-Kph.js",
        "/assets/credit-card-CFnx3JQ5.js",
        "/assets/graduation-cap-DLzpx06y.js",
        "/assets/log-out-e-HsZzjL.js",
        "/assets/users-DXGm006r.js",
        "/assets/dist-Dm1nhCqh.js",
        "/assets/dist-DdO1kwVo.js",
        "/assets/dist-GZs3GFMO.js",
        "/assets/react-dom-DL8BN-RZ.js",
        "/assets/dist-DKAWrTW-.js",
        "/assets/dist-CfBkXSLO.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
        "/assets/x-BZUO-sLr.js",
        "/assets/dist-Mpu295hZ.js",
        "/assets/dist-CeOfY7EX.js",
        "/assets/es2015-DaoE4flL.js",
        "/assets/dist-C5yWpQ74.js",
        "/assets/axios.config-BQys5tVP.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/admin/dashboard": {
      id: "routes/admin/dashboard",
      parentId: "routes/admin/_layout",
      path: "admin",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/dashboard-C5NqG8aj.js",
      imports: [
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/react-B-3UWBEL.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/admin/mentors": {
      id: "routes/admin/mentors",
      parentId: "routes/admin/_layout",
      path: "admin/mentors",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/mentors-CRMfTxIq.js",
      imports: [
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/mentor-delete-dialog-Bd0UADo_.js",
        "/assets/data-table-pagination-DhXvt5KN.js",
        "/assets/mentor-filter-panel-hQ_UnR6u.js",
        "/assets/avatar-DJgmc_Mf.js",
        "/assets/badge-BmglEu3D.js",
        "/assets/button-4KLeZV-d.js",
        "/assets/card-6LjgNCSB.js",
        "/assets/textarea-CfN3TLtF.js",
        "/assets/schemas-CdW0TvSb.js",
        "/assets/input-BWt5iw2T.js",
        "/assets/separator-iiM6-Sxx.js",
        "/assets/tabs-ivzE7UWj.js",
        "/assets/use-mentor-detail-query-BXrqEF3A.js",
        "/assets/api-error-DsoLvGEf.js",
        "/assets/utils-DZ7UQ4Bk.js",
        "/assets/auth.service-Dy9lc57k.js",
        "/assets/mentor.service-DPL6eBMY.js",
        "/assets/auth.store-2ys34xdP.js",
        "/assets/dist-DMJxeS_F.js",
        "/assets/dist-Mpu295hZ.js",
        "/assets/dist-BRlPHYh3.js",
        "/assets/dist-DdO1kwVo.js",
        "/assets/dist-CfBkXSLO.js",
        "/assets/dist-CeOfY7EX.js",
        "/assets/es2015-DaoE4flL.js",
        "/assets/dist-C5yWpQ74.js",
        "/assets/dist-GZs3GFMO.js",
        "/assets/QueryClientProvider-BSetF0kN.js",
        "/assets/useMutation-CvoIZgcs.js",
        "/assets/dist-DKAWrTW-.js",
        "/assets/format-BB6sCivm.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
        "/assets/calendar-days-CX08cIXK.js",
        "/assets/eye-CwrHmF5t.js",
        "/assets/loader-circle-DxipSu_q.js",
        "/assets/log-out-e-HsZzjL.js",
        "/assets/search-BePpyUcP.js",
        "/assets/users-DXGm006r.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/dist-Dm1nhCqh.js",
        "/assets/tooltip-BxvEFgKv.js",
        "/assets/use-remove-mentor-skill-mutation-CMrN_x0L.js",
        "/assets/dist-Bwou0fCS.js",
        "/assets/graduation-cap-DLzpx06y.js",
        "/assets/plus-avQu0RtP.js",
        "/assets/user-PZHMXx1a.js",
        "/assets/x-BZUO-sLr.js",
        "/assets/react-dom-DL8BN-RZ.js",
        "/assets/label-Dps5ofxK.js",
        "/assets/axios.config-BQys5tVP.js",
        "/assets/mutation-C96behGB.js",
        "/assets/chevron-right-B0ExwN4W.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/admin/mentors.$id": {
      id: "routes/admin/mentors.$id",
      parentId: "routes/admin/_layout",
      path: "admin/mentors/:id",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/mentors._id-cwkpRkBx.js",
      imports: [
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/mentor-delete-dialog-Bd0UADo_.js",
        "/assets/avatar-DJgmc_Mf.js",
        "/assets/badge-BmglEu3D.js",
        "/assets/button-4KLeZV-d.js",
        "/assets/card-6LjgNCSB.js",
        "/assets/textarea-CfN3TLtF.js",
        "/assets/separator-iiM6-Sxx.js",
        "/assets/tabs-ivzE7UWj.js",
        "/assets/tooltip-BxvEFgKv.js",
        "/assets/mentor-skills-form-B8rHB5-O.js",
        "/assets/mentor-slot-form-DbsOtVhG.js",
        "/assets/use-remove-mentor-skill-mutation-CMrN_x0L.js",
        "/assets/use-mentor-detail-query-BXrqEF3A.js",
        "/assets/utils-DZ7UQ4Bk.js",
        "/assets/mentor-Bg1gbwk1.js",
        "/assets/format-BB6sCivm.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
        "/assets/arrow-left-B7etKPWB.js",
        "/assets/calendar-days-CX08cIXK.js",
        "/assets/chevron-right-B0ExwN4W.js",
        "/assets/clock-B5djXDMU.js",
        "/assets/graduation-cap-DLzpx06y.js",
        "/assets/loader-circle-DxipSu_q.js",
        "/assets/plus-avQu0RtP.js",
        "/assets/x-BZUO-sLr.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/schemas-CdW0TvSb.js",
        "/assets/input-BWt5iw2T.js",
        "/assets/api-error-DsoLvGEf.js",
        "/assets/mentor.service-DPL6eBMY.js",
        "/assets/dist-Bwou0fCS.js",
        "/assets/dist-Mpu295hZ.js",
        "/assets/dist-BRlPHYh3.js",
        "/assets/dist-DdO1kwVo.js",
        "/assets/dist-CfBkXSLO.js",
        "/assets/dist-C5yWpQ74.js",
        "/assets/dist-GZs3GFMO.js",
        "/assets/QueryClientProvider-BSetF0kN.js",
        "/assets/useMutation-CvoIZgcs.js",
        "/assets/user-PZHMXx1a.js",
        "/assets/dist-Dm1nhCqh.js",
        "/assets/dist-DKAWrTW-.js",
        "/assets/dist-CeOfY7EX.js",
        "/assets/es2015-DaoE4flL.js",
        "/assets/react-dom-DL8BN-RZ.js",
        "/assets/label-Dps5ofxK.js",
        "/assets/dist-DMJxeS_F.js",
        "/assets/axios.config-BQys5tVP.js",
        "/assets/mutation-C96behGB.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/admin/bookings": {
      id: "routes/admin/bookings",
      parentId: "routes/admin/_layout",
      path: "admin/bookings",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/bookings-GmVRQ0FY.js",
      imports: [
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/calendar-check-BQQ517_C.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/admin/payments": {
      id: "routes/admin/payments",
      parentId: "routes/admin/_layout",
      path: "admin/payments",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/payments-CTXEkDn9.js",
      imports: [
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/credit-card-CFnx3JQ5.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/admin/health": {
      id: "routes/admin/health",
      parentId: "routes/admin/_layout",
      path: "admin/health",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/health-Cy4hNf02.js",
      imports: [
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
        "/assets/activity-CDTLDLIC.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/react-B-3UWBEL.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
    "routes/errors/unauthorized": {
      id: "routes/errors/unauthorized",
      parentId: "root",
      path: "unauthorized",
      index: void 0,
      caseSensitive: void 0,
      hasAction: false,
      hasLoader: false,
      hasClientAction: false,
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/unauthorized-B4XQeGSS.js",
      imports: [
        "/assets/chunk-5KNZJZUH-CvMizu8N.js",
        "/assets/button-4KLeZV-d.js",
        "/assets/createLucideIcon-B2n_jYVc.js",
        "/assets/jsx-runtime-BlYCgOOU.js",
        "/assets/rolldown-runtime-D7KTRRX7.js",
        "/assets/react-B-3UWBEL.js",
        "/assets/utils-DZ7UQ4Bk.js",
        "/assets/dist-DKAWrTW-.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
  },
  url: "/assets/manifest-9ff066a2.js",
  version: "9ff066a2",
  sri: void 0,
};
//#endregion
//#region \0virtual:react-router/server-build
var assetsBuildDirectory = "build\\client";
var basename = "/";
var future = {
  unstable_optimizeDeps: false,
  v8_passThroughRequests: false,
  unstable_trailingSlashAwareDataRequests: false,
  unstable_previewServerPrerendering: false,
  v8_middleware: false,
  v8_splitRouteModules: false,
  v8_viteEnvironmentApi: false,
};
var ssr = true;
var isSpaMode = false;
var prerender = [];
var routeDiscovery = {
  mode: "lazy",
  manifestPath: "/__manifest",
};
var publicPath = "/";
var entry = { module: entry_server_node_exports };
var routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports,
  },
  "routes/public/_layout": {
    id: "routes/public/_layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: _layout_exports$4,
  },
  "routes/public/home": {
    id: "routes/public/home",
    parentId: "routes/public/_layout",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: home_exports,
  },
  "routes/public/about": {
    id: "routes/public/about",
    parentId: "routes/public/_layout",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: about_exports,
  },
  "routes/public/mentors": {
    id: "routes/public/mentors",
    parentId: "routes/public/_layout",
    path: "mentors",
    index: void 0,
    caseSensitive: void 0,
    module: mentors_exports$1,
  },
  "routes/public/mentor-detail": {
    id: "routes/public/mentor-detail",
    parentId: "routes/public/_layout",
    path: "mentors/:id",
    index: void 0,
    caseSensitive: void 0,
    module: mentor_detail_exports$1,
  },
  "routes/auth/_layout": {
    id: "routes/auth/_layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: _layout_exports$3,
  },
  "routes/auth/login": {
    id: "routes/auth/login",
    parentId: "routes/auth/_layout",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports,
  },
  "routes/auth/register": {
    id: "routes/auth/register",
    parentId: "routes/auth/_layout",
    path: "register",
    index: void 0,
    caseSensitive: void 0,
    module: register_exports,
  },
  "routes/user/_layout": {
    id: "routes/user/_layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: _layout_exports$2,
  },
  "routes/user/dashboard": {
    id: "routes/user/dashboard",
    parentId: "routes/user/_layout",
    path: "user",
    index: void 0,
    caseSensitive: void 0,
    module: dashboard_exports$2,
  },
  "routes/user/bookings": {
    id: "routes/user/bookings",
    parentId: "routes/user/_layout",
    path: "user/bookings",
    index: void 0,
    caseSensitive: void 0,
    module: bookings_exports$2,
  },
  "routes/user/booking-detail": {
    id: "routes/user/booking-detail",
    parentId: "routes/user/_layout",
    path: "user/bookings/:id",
    index: void 0,
    caseSensitive: void 0,
    module: booking_detail_exports,
  },
  "routes/user/booking-payment": {
    id: "routes/user/booking-payment",
    parentId: "routes/user/_layout",
    path: "user/bookings/:id/payment",
    index: void 0,
    caseSensitive: void 0,
    module: booking_payment_exports,
  },
  "routes/user/find-mentors": {
    id: "routes/user/find-mentors",
    parentId: "routes/user/_layout",
    path: "user/mentors",
    index: void 0,
    caseSensitive: void 0,
    module: find_mentors_exports,
  },
  "routes/user/mentor-detail": {
    id: "routes/user/mentor-detail",
    parentId: "routes/user/_layout",
    path: "user/mentors/:id",
    index: void 0,
    caseSensitive: void 0,
    module: mentor_detail_exports,
  },
  "routes/user/ai-chat": {
    id: "routes/user/ai-chat",
    parentId: "routes/user/_layout",
    path: "user/ai-chat",
    index: void 0,
    caseSensitive: void 0,
    module: ai_chat_exports$1,
  },
  "routes/user/payments": {
    id: "routes/user/payments",
    parentId: "routes/user/_layout",
    path: "user/payments",
    index: void 0,
    caseSensitive: void 0,
    module: payments_exports$1,
  },
  "routes/user/profile": {
    id: "routes/user/profile",
    parentId: "routes/user/_layout",
    path: "user/profile",
    index: void 0,
    caseSensitive: void 0,
    module: profile_exports$1,
  },
  "routes/mentor/_layout": {
    id: "routes/mentor/_layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: _layout_exports$1,
  },
  "routes/mentor/dashboard": {
    id: "routes/mentor/dashboard",
    parentId: "routes/mentor/_layout",
    path: "mentor",
    index: void 0,
    caseSensitive: void 0,
    module: dashboard_exports$1,
  },
  "routes/mentor/schedule": {
    id: "routes/mentor/schedule",
    parentId: "routes/mentor/_layout",
    path: "mentor/schedule",
    index: void 0,
    caseSensitive: void 0,
    module: schedule_exports,
  },
  "routes/mentor/skills": {
    id: "routes/mentor/skills",
    parentId: "routes/mentor/_layout",
    path: "mentor/skills",
    index: void 0,
    caseSensitive: void 0,
    module: skills_exports,
  },
  "routes/mentor/bookings": {
    id: "routes/mentor/bookings",
    parentId: "routes/mentor/_layout",
    path: "mentor/bookings",
    index: void 0,
    caseSensitive: void 0,
    module: bookings_exports$1,
  },
  "routes/mentor/ai-chat": {
    id: "routes/mentor/ai-chat",
    parentId: "routes/mentor/_layout",
    path: "mentor/ai-chat",
    index: void 0,
    caseSensitive: void 0,
    module: ai_chat_exports,
  },
  "routes/mentor/profile": {
    id: "routes/mentor/profile",
    parentId: "routes/mentor/_layout",
    path: "mentor/profile",
    index: void 0,
    caseSensitive: void 0,
    module: profile_exports,
  },
  "routes/admin/_layout": {
    id: "routes/admin/_layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: _layout_exports,
  },
  "routes/admin/dashboard": {
    id: "routes/admin/dashboard",
    parentId: "routes/admin/_layout",
    path: "admin",
    index: void 0,
    caseSensitive: void 0,
    module: dashboard_exports,
  },
  "routes/admin/mentors": {
    id: "routes/admin/mentors",
    parentId: "routes/admin/_layout",
    path: "admin/mentors",
    index: void 0,
    caseSensitive: void 0,
    module: mentors_exports,
  },
  "routes/admin/mentors.$id": {
    id: "routes/admin/mentors.$id",
    parentId: "routes/admin/_layout",
    path: "admin/mentors/:id",
    index: void 0,
    caseSensitive: void 0,
    module: mentors_$id_exports,
  },
  "routes/admin/bookings": {
    id: "routes/admin/bookings",
    parentId: "routes/admin/_layout",
    path: "admin/bookings",
    index: void 0,
    caseSensitive: void 0,
    module: bookings_exports,
  },
  "routes/admin/payments": {
    id: "routes/admin/payments",
    parentId: "routes/admin/_layout",
    path: "admin/payments",
    index: void 0,
    caseSensitive: void 0,
    module: payments_exports,
  },
  "routes/admin/health": {
    id: "routes/admin/health",
    parentId: "routes/admin/_layout",
    path: "admin/health",
    index: void 0,
    caseSensitive: void 0,
    module: health_exports,
  },
  "routes/errors/unauthorized": {
    id: "routes/errors/unauthorized",
    parentId: "root",
    path: "unauthorized",
    index: void 0,
    caseSensitive: void 0,
    module: unauthorized_exports,
  },
};
var allowedActionOrigins = false;
//#endregion
export {
  allowedActionOrigins,
  server_manifest_default as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr,
};
