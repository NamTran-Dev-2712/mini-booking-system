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
} from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Toaster, toast } from "sonner";
import {
  Activity,
  BarChart3,
  BookOpen,
  Bot,
  Building2,
  CalendarCheck,
  CalendarDays,
  CheckCircle,
  CheckCircle2,
  ChevronRight,
  CircleCheckIcon,
  CreditCard,
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
  Menu,
  OctagonXIcon,
  Search,
  Shield,
  ShieldX,
  Target,
  TriangleAlertIcon,
  UserCircle,
  Users,
  XIcon,
  Zap,
} from "lucide-react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Avatar, Dialog, Label, Separator, Slot } from "radix-ui";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
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
//#region app/stores/auth.store.ts
var ssrSafeStorage = {
  getItem: (name) => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(name);
  },
  setItem: (name, value) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(name, value);
  },
  removeItem: (name) => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(name);
  },
};
var useAuthStore = create()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),
      clearUser: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => ssrSafeStorage),
      skipHydration: true,
    },
  ),
);
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
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [
      /* @__PURE__ */ jsx(Outlet, {}),
      /* @__PURE__ */ jsx(Toaster$1, {
        richColors: true,
        position: "top-right",
      }),
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
//#region app/lib/utils.ts
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
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
  (axiosError) => {
    if (!axiosError.response)
      return Promise.reject({
        message: "Network error. Please check your connection.",
        errors: [],
        statusCode: 0,
      });
    const body = axiosError.response.data;
    const error = {
      message: body?.message ?? axiosError.message,
      errors: body?.errors ?? [],
      statusCode: body?.statusCode ?? axiosError.response.status,
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
function meta$21() {
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
  meta: () => meta$21,
});
//#endregion
//#region app/features/public/about/about.page.tsx
function meta$20() {
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
  meta: () => meta$20,
});
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
function meta$19() {
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
  meta: () => meta$19,
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
function meta$18() {
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
  meta: () => meta$18,
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
          className: "w-[260px] p-0",
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
  meta: () => meta$17,
});
function meta$17() {
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
//#region app/routes/user/bookings.tsx
var bookings_exports$2 = /* @__PURE__ */ __exportAll({
  default: () => bookings_default$2,
  meta: () => meta$16,
});
function meta$16() {
  return [{ title: "My Bookings — MiniBooking" }];
}
var bookings_default$2 = UNSAFE_withComponentProps(function UserBookings() {
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
      /* @__PURE__ */ jsxs("div", {
        className:
          "flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center",
        children: [
          /* @__PURE__ */ jsx(CalendarCheck, {
            className: "mb-4 size-10 text-muted-foreground/50",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-sm font-medium text-muted-foreground",
            children: "No bookings yet",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "mt-1 text-xs text-muted-foreground/70",
            children: "Book a session with a mentor to get started.",
          }),
        ],
      }),
    ],
  });
});
//#endregion
//#region app/routes/user/find-mentors.tsx
var find_mentors_exports = /* @__PURE__ */ __exportAll({
  default: () => find_mentors_default,
  meta: () => meta$15,
});
function meta$15() {
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
        /* @__PURE__ */ jsxs("div", {
          className:
            "flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center",
          children: [
            /* @__PURE__ */ jsx(Users, {
              className: "mb-4 size-10 text-muted-foreground/50",
            }),
            /* @__PURE__ */ jsx("p", {
              className: "text-sm font-medium text-muted-foreground",
              children: "Mentor directory coming soon",
            }),
          ],
        }),
      ],
    });
  },
);
//#endregion
//#region app/routes/user/ai-chat.tsx
var ai_chat_exports$1 = /* @__PURE__ */ __exportAll({
  default: () => ai_chat_default$1,
  meta: () => meta$14,
});
function meta$14() {
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
  meta: () => meta$13,
});
function meta$13() {
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
  meta: () => meta$12,
});
function meta$12() {
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
//#region app/routes/mentor/dashboard.tsx
var dashboard_exports$1 = /* @__PURE__ */ __exportAll({
  default: () => dashboard_default$1,
  meta: () => meta$11,
});
function meta$11() {
  return [{ title: "Mentor Dashboard — MiniBooking" }];
}
var dashboard_default$1 = UNSAFE_withComponentProps(function MentorDashboard() {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        children: [
          /* @__PURE__ */ jsxs("h2", {
            className: "text-2xl font-semibold tracking-tight",
            children: ["Welcome, ", useCurrentUser()?.fullName, " 👋"],
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-muted-foreground",
            children: "Manage your sessions and availability.",
          }),
        ],
      }),
      /* @__PURE__ */ jsx("div", {
        className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
        children: [
          {
            label: "Upcoming Sessions",
            value: "—",
          },
          {
            label: "Sessions This Month",
            value: "—",
          },
          {
            label: "Total Students",
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
//#region app/routes/mentor/schedule.tsx
var schedule_exports = /* @__PURE__ */ __exportAll({
  default: () => schedule_default,
  meta: () => meta$10,
});
function meta$10() {
  return [{ title: "My Schedule — MiniBooking" }];
}
var schedule_default = UNSAFE_withComponentProps(function MentorSchedule() {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
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
      /* @__PURE__ */ jsxs("div", {
        className:
          "flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center",
        children: [
          /* @__PURE__ */ jsx(CalendarDays, {
            className: "mb-4 size-10 text-muted-foreground/50",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-sm font-medium text-muted-foreground",
            children: "Schedule management coming soon",
          }),
        ],
      }),
    ],
  });
});
//#endregion
//#region app/routes/mentor/skills.tsx
var skills_exports = /* @__PURE__ */ __exportAll({
  default: () => skills_default,
  meta: () => meta$9,
});
function meta$9() {
  return [{ title: "My Skills — MiniBooking" }];
}
var skills_default = UNSAFE_withComponentProps(function MentorSkills() {
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
      /* @__PURE__ */ jsxs("div", {
        className:
          "flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center",
        children: [
          /* @__PURE__ */ jsx(GraduationCap, {
            className: "mb-4 size-10 text-muted-foreground/50",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-sm font-medium text-muted-foreground",
            children: "Skills management coming soon",
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
  meta: () => meta$8,
});
function meta$8() {
  return [{ title: "Bookings — MiniBooking" }];
}
var bookings_default$1 = UNSAFE_withComponentProps(function MentorBookings() {
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
            children: "View all sessions booked with you.",
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className:
          "flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center",
        children: [
          /* @__PURE__ */ jsx(BookOpen, {
            className: "mb-4 size-10 text-muted-foreground/50",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-sm font-medium text-muted-foreground",
            children: "No bookings yet",
          }),
        ],
      }),
    ],
  });
});
//#endregion
//#region app/routes/mentor/ai-chat.tsx
var ai_chat_exports = /* @__PURE__ */ __exportAll({
  default: () => ai_chat_default,
  meta: () => meta$7,
});
function meta$7() {
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
  meta: () => meta$6,
});
function meta$6() {
  return [{ title: "Profile — MiniBooking" }];
}
var profile_default = UNSAFE_withComponentProps(function MentorProfile() {
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
            children: "Manage your mentor profile and information.",
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
  meta: () => meta$5,
});
function meta$5() {
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
//#region app/routes/admin/mentors.tsx
var mentors_exports = /* @__PURE__ */ __exportAll({
  default: () => mentors_default,
  meta: () => meta$4,
});
function meta$4() {
  return [{ title: "Mentors — Admin | MiniBooking" }];
}
var mentors_default = UNSAFE_withComponentProps(function AdminMentors() {
  return /* @__PURE__ */ jsxs("div", {
    className: "space-y-6",
    children: [
      /* @__PURE__ */ jsxs("div", {
        children: [
          /* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-semibold tracking-tight",
            children: "Mentors",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-muted-foreground",
            children: "Create and manage mentor accounts.",
          }),
        ],
      }),
      /* @__PURE__ */ jsxs("div", {
        className:
          "flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center",
        children: [
          /* @__PURE__ */ jsx(Users, {
            className: "mb-4 size-10 text-muted-foreground/50",
          }),
          /* @__PURE__ */ jsx("p", {
            className: "text-sm font-medium text-muted-foreground",
            children: "Mentor management coming soon",
          }),
        ],
      }),
    ],
  });
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
    module: "/assets/entry.client-DE5nelOy.js",
    imports: [
      "/assets/jsx-runtime-D0R9s8hK.js",
      "/assets/chunk-5KNZJZUH-C906xdEM.js",
      "/assets/react-dom-CuViyZo3.js",
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
      module: "/assets/root-N6RJCCuF.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/chunk-5KNZJZUH-C906xdEM.js",
        "/assets/react-dom-CuViyZo3.js",
        "/assets/auth.store-U8lf-bmK.js",
        "/assets/createLucideIcon-CcmGBDAZ.js",
        "/assets/circle-check-Dw8m6_p6.js",
        "/assets/loader-circle-bNwxySZM.js",
        "/assets/dist-BzhCrnqt.js",
      ],
      css: ["/assets/root-Ag4K7PW2.css"],
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
      module: "/assets/_layout-CNUUr0Kh.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/chunk-5KNZJZUH-C906xdEM.js",
        "/assets/avatar-CDlKaHys.js",
        "/assets/button-DwAmr52O.js",
        "/assets/separator-CTbzZobJ.js",
        "/assets/sheet-CR4o6XAE.js",
        "/assets/use-auth-B44xwUsB.js",
        "/assets/auth.service-Bdt1FuOd.js",
        "/assets/auth.store-U8lf-bmK.js",
        "/assets/calendar-days-CVX6VkNj.js",
        "/assets/circle-user-BYgSlSbd.js",
        "/assets/dist-U9yTH5Ng.js",
        "/assets/react-dom-CuViyZo3.js",
        "/assets/createLucideIcon-CcmGBDAZ.js",
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
      module: "/assets/home-CIe3uUyq.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/chunk-5KNZJZUH-C906xdEM.js",
        "/assets/badge-B6h3YhWd.js",
        "/assets/button-DwAmr52O.js",
        "/assets/separator-CTbzZobJ.js",
        "/assets/createLucideIcon-CcmGBDAZ.js",
        "/assets/calendar-check-036uFykA.js",
        "/assets/circle-check-Dw8m6_p6.js",
        "/assets/users-QJx7Xv8k.js",
        "/assets/dist-U9yTH5Ng.js",
        "/assets/react-dom-CuViyZo3.js",
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
      module: "/assets/about-0XrJ9hiJ.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/avatar-CDlKaHys.js",
        "/assets/badge-B6h3YhWd.js",
        "/assets/separator-CTbzZobJ.js",
        "/assets/createLucideIcon-CcmGBDAZ.js",
        "/assets/users-QJx7Xv8k.js",
        "/assets/dist-U9yTH5Ng.js",
        "/assets/react-dom-CuViyZo3.js",
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
      module: "/assets/_layout-Dbnt0gwx.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/chunk-5KNZJZUH-C906xdEM.js",
        "/assets/require-role-BJYB-2Yk.js",
        "/assets/auth.store-U8lf-bmK.js",
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
      module: "/assets/login-BJJ-4Zbq.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/chunk-5KNZJZUH-C906xdEM.js",
        "/assets/schemas-CmfKEtqt.js",
        "/assets/button-DwAmr52O.js",
        "/assets/api-error-wP_70dsA.js",
        "/assets/auth.service-Bdt1FuOd.js",
        "/assets/auth.store-U8lf-bmK.js",
        "/assets/loader-circle-bNwxySZM.js",
        "/assets/dist-BzhCrnqt.js",
        "/assets/separator-CTbzZobJ.js",
        "/assets/dist-U9yTH5Ng.js",
        "/assets/createLucideIcon-CcmGBDAZ.js",
        "/assets/calendar-days-CVX6VkNj.js",
        "/assets/react-dom-CuViyZo3.js",
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
      module: "/assets/register-DT88hnyD.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/chunk-5KNZJZUH-C906xdEM.js",
        "/assets/schemas-CmfKEtqt.js",
        "/assets/button-DwAmr52O.js",
        "/assets/api-error-wP_70dsA.js",
        "/assets/auth.service-Bdt1FuOd.js",
        "/assets/loader-circle-bNwxySZM.js",
        "/assets/dist-BzhCrnqt.js",
        "/assets/separator-CTbzZobJ.js",
        "/assets/dist-U9yTH5Ng.js",
        "/assets/createLucideIcon-CcmGBDAZ.js",
        "/assets/calendar-days-CVX6VkNj.js",
        "/assets/react-dom-CuViyZo3.js",
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
      module: "/assets/_layout-Bgx-CXR9.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/chunk-5KNZJZUH-C906xdEM.js",
        "/assets/nav-config-lz1XTaL7.js",
        "/assets/require-role-BJYB-2Yk.js",
        "/assets/avatar-CDlKaHys.js",
        "/assets/button-DwAmr52O.js",
        "/assets/separator-CTbzZobJ.js",
        "/assets/sheet-CR4o6XAE.js",
        "/assets/auth.service-Bdt1FuOd.js",
        "/assets/dist-U9yTH5Ng.js",
        "/assets/auth.store-U8lf-bmK.js",
        "/assets/activity-DpAHtI9C.js",
        "/assets/book-open-BWD5Gq0U.js",
        "/assets/bot-D5Q7sFzH.js",
        "/assets/calendar-check-036uFykA.js",
        "/assets/calendar-days-CVX6VkNj.js",
        "/assets/circle-user-BYgSlSbd.js",
        "/assets/credit-card-BiPk2xTW.js",
        "/assets/graduation-cap-C9Li4Dvj.js",
        "/assets/users-QJx7Xv8k.js",
        "/assets/dist-BzhCrnqt.js",
        "/assets/react-dom-CuViyZo3.js",
        "/assets/createLucideIcon-CcmGBDAZ.js",
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
      module: "/assets/dashboard-D4aXl35q.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/chunk-5KNZJZUH-C906xdEM.js",
        "/assets/use-auth-B44xwUsB.js",
        "/assets/auth.store-U8lf-bmK.js",
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
      module: "/assets/bookings--7Z4GXwk.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/chunk-5KNZJZUH-C906xdEM.js",
        "/assets/calendar-check-036uFykA.js",
        "/assets/createLucideIcon-CcmGBDAZ.js",
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
      module: "/assets/find-mentors-Cajp0lxD.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/chunk-5KNZJZUH-C906xdEM.js",
        "/assets/users-QJx7Xv8k.js",
        "/assets/createLucideIcon-CcmGBDAZ.js",
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
      module: "/assets/ai-chat-DSS8ShH2.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/chunk-5KNZJZUH-C906xdEM.js",
        "/assets/bot-D5Q7sFzH.js",
        "/assets/createLucideIcon-CcmGBDAZ.js",
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
      module: "/assets/payments-6T423BMr.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/chunk-5KNZJZUH-C906xdEM.js",
        "/assets/credit-card-BiPk2xTW.js",
        "/assets/createLucideIcon-CcmGBDAZ.js",
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
      module: "/assets/profile-B40Fw77W.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/chunk-5KNZJZUH-C906xdEM.js",
        "/assets/use-auth-B44xwUsB.js",
        "/assets/circle-user-BYgSlSbd.js",
        "/assets/auth.store-U8lf-bmK.js",
        "/assets/createLucideIcon-CcmGBDAZ.js",
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
      module: "/assets/_layout-Kpyw5xqT.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/chunk-5KNZJZUH-C906xdEM.js",
        "/assets/nav-config-lz1XTaL7.js",
        "/assets/require-role-BJYB-2Yk.js",
        "/assets/avatar-CDlKaHys.js",
        "/assets/button-DwAmr52O.js",
        "/assets/separator-CTbzZobJ.js",
        "/assets/sheet-CR4o6XAE.js",
        "/assets/auth.service-Bdt1FuOd.js",
        "/assets/dist-U9yTH5Ng.js",
        "/assets/auth.store-U8lf-bmK.js",
        "/assets/activity-DpAHtI9C.js",
        "/assets/book-open-BWD5Gq0U.js",
        "/assets/bot-D5Q7sFzH.js",
        "/assets/calendar-check-036uFykA.js",
        "/assets/calendar-days-CVX6VkNj.js",
        "/assets/circle-user-BYgSlSbd.js",
        "/assets/credit-card-BiPk2xTW.js",
        "/assets/graduation-cap-C9Li4Dvj.js",
        "/assets/users-QJx7Xv8k.js",
        "/assets/dist-BzhCrnqt.js",
        "/assets/react-dom-CuViyZo3.js",
        "/assets/createLucideIcon-CcmGBDAZ.js",
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
      module: "/assets/dashboard-DwQcmc0N.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/chunk-5KNZJZUH-C906xdEM.js",
        "/assets/use-auth-B44xwUsB.js",
        "/assets/auth.store-U8lf-bmK.js",
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
      module: "/assets/schedule-S7XEnNd-.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/chunk-5KNZJZUH-C906xdEM.js",
        "/assets/calendar-days-CVX6VkNj.js",
        "/assets/createLucideIcon-CcmGBDAZ.js",
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
      module: "/assets/skills-cNkCd3tw.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/chunk-5KNZJZUH-C906xdEM.js",
        "/assets/graduation-cap-C9Li4Dvj.js",
        "/assets/createLucideIcon-CcmGBDAZ.js",
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
      module: "/assets/bookings-CMMVUjkF.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/chunk-5KNZJZUH-C906xdEM.js",
        "/assets/book-open-BWD5Gq0U.js",
        "/assets/createLucideIcon-CcmGBDAZ.js",
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
      module: "/assets/ai-chat-CYkG_eaJ.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/chunk-5KNZJZUH-C906xdEM.js",
        "/assets/bot-D5Q7sFzH.js",
        "/assets/createLucideIcon-CcmGBDAZ.js",
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
      module: "/assets/profile-B1TSTZWK.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/chunk-5KNZJZUH-C906xdEM.js",
        "/assets/use-auth-B44xwUsB.js",
        "/assets/circle-user-BYgSlSbd.js",
        "/assets/auth.store-U8lf-bmK.js",
        "/assets/createLucideIcon-CcmGBDAZ.js",
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
      module: "/assets/_layout-DqFnXIsc.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/chunk-5KNZJZUH-C906xdEM.js",
        "/assets/nav-config-lz1XTaL7.js",
        "/assets/require-role-BJYB-2Yk.js",
        "/assets/avatar-CDlKaHys.js",
        "/assets/button-DwAmr52O.js",
        "/assets/separator-CTbzZobJ.js",
        "/assets/sheet-CR4o6XAE.js",
        "/assets/auth.service-Bdt1FuOd.js",
        "/assets/dist-U9yTH5Ng.js",
        "/assets/auth.store-U8lf-bmK.js",
        "/assets/activity-DpAHtI9C.js",
        "/assets/book-open-BWD5Gq0U.js",
        "/assets/bot-D5Q7sFzH.js",
        "/assets/calendar-check-036uFykA.js",
        "/assets/calendar-days-CVX6VkNj.js",
        "/assets/circle-user-BYgSlSbd.js",
        "/assets/credit-card-BiPk2xTW.js",
        "/assets/graduation-cap-C9Li4Dvj.js",
        "/assets/users-QJx7Xv8k.js",
        "/assets/dist-BzhCrnqt.js",
        "/assets/react-dom-CuViyZo3.js",
        "/assets/createLucideIcon-CcmGBDAZ.js",
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
      module: "/assets/dashboard-Cv_iIgEG.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/chunk-5KNZJZUH-C906xdEM.js",
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
      module: "/assets/mentors-DXHSwT73.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/chunk-5KNZJZUH-C906xdEM.js",
        "/assets/users-QJx7Xv8k.js",
        "/assets/createLucideIcon-CcmGBDAZ.js",
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
      module: "/assets/bookings-uD45shQW.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/chunk-5KNZJZUH-C906xdEM.js",
        "/assets/calendar-check-036uFykA.js",
        "/assets/createLucideIcon-CcmGBDAZ.js",
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
      module: "/assets/payments-CKMgnIx0.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/chunk-5KNZJZUH-C906xdEM.js",
        "/assets/credit-card-BiPk2xTW.js",
        "/assets/createLucideIcon-CcmGBDAZ.js",
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
      module: "/assets/health-CjM6MaDA.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/chunk-5KNZJZUH-C906xdEM.js",
        "/assets/createLucideIcon-CcmGBDAZ.js",
        "/assets/activity-DpAHtI9C.js",
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
      module: "/assets/unauthorized-Ds6IihRR.js",
      imports: [
        "/assets/jsx-runtime-D0R9s8hK.js",
        "/assets/chunk-5KNZJZUH-C906xdEM.js",
        "/assets/button-DwAmr52O.js",
        "/assets/createLucideIcon-CcmGBDAZ.js",
        "/assets/dist-U9yTH5Ng.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
  },
  url: "/assets/manifest-8dfcf08e.js",
  version: "8dfcf08e",
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
  "routes/user/find-mentors": {
    id: "routes/user/find-mentors",
    parentId: "routes/user/_layout",
    path: "user/mentors",
    index: void 0,
    caseSensitive: void 0,
    module: find_mentors_exports,
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
