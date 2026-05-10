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
  isRouteErrorResponse,
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
  BarChart3,
  Building2,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleCheckIcon,
  Eye,
  EyeOff,
  Heart,
  InfoIcon,
  Lightbulb,
  Loader2,
  Loader2Icon,
  Menu,
  OctagonXIcon,
  Search,
  Shield,
  Target,
  TriangleAlertIcon,
  Users,
  XIcon,
  Zap,
} from "lucide-react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { cva } from "class-variance-authority";
import { Avatar, Dialog, Label, Separator, Slot } from "radix-ui";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
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
//#region app/components/layouts/public/public.header.tsx
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
        /* @__PURE__ */ jsxs("div", {
          className: "hidden md:flex items-center gap-2",
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
                /* @__PURE__ */ jsxs("div", {
                  className: "mt-6 flex flex-col gap-2 px-1",
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
var _layout_exports$1 = /* @__PURE__ */ __exportAll({
  default: () => _layout_default$1,
});
var _layout_default$1 = UNSAFE_withComponentProps(function PublicLayout() {
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
function meta$3() {
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
  meta: () => meta$3,
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
//#region app/features/public/about/about.page.tsx
function meta$2() {
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
  meta: () => meta$2,
});
//#endregion
//#region app/routes/auth/_layout.tsx
var _layout_exports = /* @__PURE__ */ __exportAll({
  default: () => _layout_default,
});
var _layout_default = UNSAFE_withComponentProps(function AuthRoutesLayout() {
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
//#region app/lib/axios.config.ts
var apiClient = axios.create({
  baseURL: "http://localhost:5000",
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
//#region app/features/auth/login/login.schema.ts
var loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
//#endregion
//#region app/features/auth/login/login.hook.ts
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
        expiresIn: result.expiresIn,
        createdAt: result.createdAt,
      });
      navigate("/");
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
function meta$1() {
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
  meta: () => meta$1,
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
function meta() {
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
  meta: () => meta,
});
//#endregion
//#region \0virtual:react-router/server-manifest
var server_manifest_default = {
  entry: {
    module: "/assets/entry.client-BkgyedHx.js",
    imports: [
      "/assets/jsx-runtime-CAzG7qJ5.js",
      "/assets/chunk-5KNZJZUH-D0Qj9TTb.js",
      "/assets/react-dom-dMens3Cl.js",
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
      module: "/assets/root-nIC8NSxo.js",
      imports: [
        "/assets/jsx-runtime-CAzG7qJ5.js",
        "/assets/chunk-5KNZJZUH-D0Qj9TTb.js",
        "/assets/react-dom-dMens3Cl.js",
        "/assets/auth.store-vFxwWdJE.js",
        "/assets/createLucideIcon-DIem-QJH.js",
        "/assets/circle-check-DIFduJ4p.js",
        "/assets/loader-circle-CXbg7Cgp.js",
      ],
      css: ["/assets/root-CikxycWZ.css"],
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
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/_layout-DIhIjZ8o.js",
      imports: [
        "/assets/jsx-runtime-CAzG7qJ5.js",
        "/assets/chunk-5KNZJZUH-D0Qj9TTb.js",
        "/assets/button-DXwXqNSz.js",
        "/assets/separator-8f2NwZMe.js",
        "/assets/dist-D9HvU-dc.js",
        "/assets/createLucideIcon-DIem-QJH.js",
        "/assets/calendar-days-BOHnMUrY.js",
        "/assets/react-dom-dMens3Cl.js",
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
      module: "/assets/home-CkObzHMM.js",
      imports: [
        "/assets/jsx-runtime-CAzG7qJ5.js",
        "/assets/chunk-5KNZJZUH-D0Qj9TTb.js",
        "/assets/badge-B7zb_CxP.js",
        "/assets/button-DXwXqNSz.js",
        "/assets/separator-8f2NwZMe.js",
        "/assets/createLucideIcon-DIem-QJH.js",
        "/assets/circle-check-DIFduJ4p.js",
        "/assets/react-dom-dMens3Cl.js",
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
      module: "/assets/about-D8tBN2dQ.js",
      imports: [
        "/assets/jsx-runtime-CAzG7qJ5.js",
        "/assets/badge-B7zb_CxP.js",
        "/assets/separator-8f2NwZMe.js",
        "/assets/dist-D9HvU-dc.js",
        "/assets/createLucideIcon-DIem-QJH.js",
        "/assets/react-dom-dMens3Cl.js",
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
      hasClientLoader: false,
      hasClientMiddleware: false,
      hasDefaultExport: true,
      hasErrorBoundary: false,
      module: "/assets/_layout-s09XA58U.js",
      imports: [
        "/assets/jsx-runtime-CAzG7qJ5.js",
        "/assets/chunk-5KNZJZUH-D0Qj9TTb.js",
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
      module: "/assets/login-XgYl6byK.js",
      imports: [
        "/assets/jsx-runtime-CAzG7qJ5.js",
        "/assets/chunk-5KNZJZUH-D0Qj9TTb.js",
        "/assets/schemas-C2PMZ5kw.js",
        "/assets/button-DXwXqNSz.js",
        "/assets/auth.store-vFxwWdJE.js",
        "/assets/loader-circle-CXbg7Cgp.js",
        "/assets/separator-8f2NwZMe.js",
        "/assets/createLucideIcon-DIem-QJH.js",
        "/assets/calendar-days-BOHnMUrY.js",
        "/assets/react-dom-dMens3Cl.js",
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
      module: "/assets/register-DOCXcEyd.js",
      imports: [
        "/assets/jsx-runtime-CAzG7qJ5.js",
        "/assets/chunk-5KNZJZUH-D0Qj9TTb.js",
        "/assets/schemas-C2PMZ5kw.js",
        "/assets/button-DXwXqNSz.js",
        "/assets/loader-circle-CXbg7Cgp.js",
        "/assets/separator-8f2NwZMe.js",
        "/assets/createLucideIcon-DIem-QJH.js",
        "/assets/calendar-days-BOHnMUrY.js",
        "/assets/react-dom-dMens3Cl.js",
      ],
      css: [],
      clientActionModule: void 0,
      clientLoaderModule: void 0,
      clientMiddlewareModule: void 0,
      hydrateFallbackModule: void 0,
    },
  },
  url: "/assets/manifest-f90c6546.js",
  version: "f90c6546",
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
    module: _layout_exports$1,
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
    module: _layout_exports,
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
