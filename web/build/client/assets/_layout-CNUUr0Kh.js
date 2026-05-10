import { t as e } from "./jsx-runtime-D0R9s8hK.js";
import {
  M as t,
  P as n,
  c as r,
  j as i,
  r as a,
  s as o,
} from "./chunk-5KNZJZUH-C906xdEM.js";
import { t as s } from "./calendar-days-CVX6VkNj.js";
import { t as c } from "./circle-user-BYgSlSbd.js";
import {
  a as l,
  c as u,
  i as d,
  n as f,
  o as p,
  r as m,
  s as h,
  t as g,
} from "./sheet-CR4o6XAE.js";
import { t as _ } from "./auth.store-U8lf-bmK.js";
import { t as v } from "./separator-CTbzZobJ.js";
import { n as y, t as b } from "./avatar-CDlKaHys.js";
import { t as x } from "./button-DwAmr52O.js";
import { t as S } from "./auth.service-Bdt1FuOd.js";
import { n as C, t as w } from "./use-auth-B44xwUsB.js";
var T = e(),
  E = { Admin: `/admin`, Mentor: `/mentor`, User: `/user` },
  D = [
    { to: `/`, label: `Home` },
    { to: `/about`, label: `About` },
  ];
function O() {
  let e = i(),
    t = w(),
    n = C(),
    r = _((e) => e.clearUser),
    O = _((e) => e.isAuthenticated),
    k = E[n ?? ``] ?? `/`,
    A = (t?.fullName ?? `?`)
      .split(` `)
      .map((e) => e[0])
      .join(``)
      .slice(0, 2)
      .toUpperCase();
  async function j() {
    try {
      await S.logout();
    } catch {
    } finally {
      (r(), e(`/login`));
    }
  }
  return (0, T.jsx)(`header`, {
    className: `sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-sm`,
    children: (0, T.jsxs)(`div`, {
      className: `container mx-auto flex h-14 max-w-6xl items-center justify-between px-4`,
      children: [
        (0, T.jsxs)(a, {
          to: `/`,
          className: `flex items-center gap-2 font-semibold text-base transition-opacity hover:opacity-80`,
          children: [
            (0, T.jsx)(s, { className: `size-5` }),
            (0, T.jsx)(`span`, { children: `MiniBooking` }),
          ],
        }),
        (0, T.jsx)(`nav`, {
          className: `hidden md:flex items-center gap-1`,
          children: D.map((e) =>
            (0, T.jsx)(
              o,
              {
                to: e.to,
                end: e.to === `/`,
                className: ({ isActive: e }) =>
                  `px-3 py-1.5 text-sm rounded-md transition-colors ${e ? `text-foreground font-medium bg-muted` : `text-muted-foreground hover:text-foreground hover:bg-muted/60`}`,
                children: e.label,
              },
              e.to,
            ),
          ),
        }),
        (0, T.jsx)(`div`, {
          className: `hidden md:flex items-center gap-2`,
          children: O
            ? (0, T.jsxs)(T.Fragment, {
                children: [
                  (0, T.jsx)(x, {
                    variant: `ghost`,
                    size: `sm`,
                    asChild: !0,
                    children: (0, T.jsxs)(a, {
                      to: k,
                      className: `flex items-center gap-1.5`,
                      children: [
                        (0, T.jsx)(u, { className: `size-3.5` }),
                        `Dashboard`,
                      ],
                    }),
                  }),
                  (0, T.jsxs)(`div`, {
                    className: `flex items-center gap-2 pl-1`,
                    children: [
                      (0, T.jsx)(b, {
                        className: `size-8`,
                        children: (0, T.jsx)(y, {
                          className: `bg-primary/10 text-xs font-semibold text-primary`,
                          children: A,
                        }),
                      }),
                      (0, T.jsx)(`span`, {
                        className: `text-sm font-medium leading-tight max-w-[120px] truncate`,
                        children: t?.fullName,
                      }),
                    ],
                  }),
                  (0, T.jsxs)(x, {
                    variant: `ghost`,
                    size: `sm`,
                    onClick: j,
                    className: `text-muted-foreground hover:text-destructive`,
                    children: [
                      (0, T.jsx)(h, { className: `size-3.5` }),
                      `Sign Out`,
                    ],
                  }),
                ],
              })
            : (0, T.jsxs)(T.Fragment, {
                children: [
                  (0, T.jsx)(x, {
                    variant: `ghost`,
                    size: `sm`,
                    asChild: !0,
                    children: (0, T.jsx)(a, {
                      to: `/login`,
                      children: `Sign In`,
                    }),
                  }),
                  (0, T.jsx)(x, {
                    size: `sm`,
                    asChild: !0,
                    children: (0, T.jsx)(a, {
                      to: `/register`,
                      children: `Sign Up`,
                    }),
                  }),
                ],
              }),
        }),
        (0, T.jsxs)(g, {
          children: [
            (0, T.jsx)(l, {
              asChild: !0,
              className: `md:hidden`,
              children: (0, T.jsxs)(x, {
                variant: `ghost`,
                size: `icon`,
                children: [
                  (0, T.jsx)(p, {}),
                  (0, T.jsx)(`span`, {
                    className: `sr-only`,
                    children: `Toggle menu`,
                  }),
                ],
              }),
            }),
            (0, T.jsxs)(f, {
              side: `right`,
              className: `w-72`,
              children: [
                (0, T.jsx)(m, {
                  children: (0, T.jsxs)(d, {
                    className: `flex items-center gap-2 text-base`,
                    children: [
                      (0, T.jsx)(s, { className: `size-4` }),
                      `MiniBooking`,
                    ],
                  }),
                }),
                (0, T.jsx)(`div`, {
                  className: `mt-6 flex flex-col gap-1`,
                  children: D.map((e) =>
                    (0, T.jsx)(
                      o,
                      {
                        to: e.to,
                        end: e.to === `/`,
                        className: ({ isActive: e }) =>
                          `px-3 py-2 text-sm rounded-md transition-colors ${e ? `text-foreground font-medium bg-muted` : `text-muted-foreground hover:text-foreground hover:bg-muted/60`}`,
                        children: e.label,
                      },
                      e.to,
                    ),
                  ),
                }),
                (0, T.jsx)(v, { className: `my-4` }),
                O
                  ? (0, T.jsxs)(`div`, {
                      className: `flex flex-col gap-2 px-1`,
                      children: [
                        (0, T.jsxs)(`div`, {
                          className: `flex items-center gap-3 rounded-lg bg-muted px-3 py-2.5`,
                          children: [
                            (0, T.jsx)(b, {
                              className: `size-8 shrink-0`,
                              children: (0, T.jsx)(y, {
                                className: `bg-primary/10 text-xs font-semibold text-primary`,
                                children: A,
                              }),
                            }),
                            (0, T.jsxs)(`div`, {
                              className: `min-w-0`,
                              children: [
                                (0, T.jsx)(`p`, {
                                  className: `truncate text-sm font-medium`,
                                  children: t?.fullName,
                                }),
                                (0, T.jsx)(`p`, {
                                  className: `truncate text-xs text-muted-foreground`,
                                  children: t?.email,
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, T.jsx)(x, {
                          variant: `outline`,
                          asChild: !0,
                          children: (0, T.jsxs)(a, {
                            to: k,
                            className: `flex items-center gap-2`,
                            children: [
                              (0, T.jsx)(u, { className: `size-4` }),
                              `Go to Dashboard`,
                            ],
                          }),
                        }),
                        (0, T.jsx)(x, {
                          asChild: !0,
                          variant: `ghost`,
                          children: (0, T.jsxs)(a, {
                            to: `/${n?.toLowerCase()}/profile`,
                            className: `flex items-center gap-2`,
                            children: [
                              (0, T.jsx)(c, { className: `size-4` }),
                              `My Profile`,
                            ],
                          }),
                        }),
                        (0, T.jsxs)(x, {
                          variant: `ghost`,
                          onClick: j,
                          className: `justify-start text-muted-foreground hover:text-destructive`,
                          children: [
                            (0, T.jsx)(h, { className: `size-4` }),
                            `Sign Out`,
                          ],
                        }),
                      ],
                    })
                  : (0, T.jsxs)(`div`, {
                      className: `flex flex-col gap-2 px-1`,
                      children: [
                        (0, T.jsx)(x, {
                          variant: `outline`,
                          asChild: !0,
                          children: (0, T.jsx)(a, {
                            to: `/login`,
                            children: `Sign In`,
                          }),
                        }),
                        (0, T.jsx)(x, {
                          asChild: !0,
                          children: (0, T.jsx)(a, {
                            to: `/register`,
                            children: `Sign Up`,
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
function k({ className: e }) {
  return (0, T.jsx)(`svg`, {
    className: e,
    viewBox: `0 0 24 24`,
    fill: `currentColor`,
    "aria-hidden": `true`,
    children: (0, T.jsx)(`path`, {
      d: `M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z`,
    }),
  });
}
function A({ className: e }) {
  return (0, T.jsx)(`svg`, {
    className: e,
    viewBox: `0 0 24 24`,
    fill: `currentColor`,
    "aria-hidden": `true`,
    children: (0, T.jsx)(`path`, {
      d: `M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z`,
    }),
  });
}
function j() {
  return (0, T.jsx)(`footer`, {
    className: `border-t border-border/60 bg-muted/30`,
    children: (0, T.jsxs)(`div`, {
      className: `container mx-auto max-w-6xl px-4 py-10`,
      children: [
        (0, T.jsxs)(`div`, {
          className: `grid grid-cols-2 gap-8 md:grid-cols-4`,
          children: [
            (0, T.jsxs)(`div`, {
              className: `col-span-2 md:col-span-1 space-y-3`,
              children: [
                (0, T.jsxs)(a, {
                  to: `/`,
                  className: `flex items-center gap-2 font-semibold`,
                  children: [
                    (0, T.jsx)(s, { className: `size-5` }),
                    (0, T.jsx)(`span`, { children: `MiniBooking` }),
                  ],
                }),
                (0, T.jsx)(`p`, {
                  className: `text-sm text-muted-foreground leading-relaxed`,
                  children: `Smart mentorship scheduling for modern learners.`,
                }),
                (0, T.jsxs)(`div`, {
                  className: `flex items-center gap-3 pt-1`,
                  children: [
                    (0, T.jsx)(`a`, {
                      href: `https://github.com`,
                      "aria-label": `GitHub`,
                      className: `text-muted-foreground hover:text-foreground transition-colors`,
                      children: (0, T.jsx)(k, { className: `size-4` }),
                    }),
                    (0, T.jsx)(`a`, {
                      href: `https://x.com`,
                      "aria-label": `X (Twitter)`,
                      className: `text-muted-foreground hover:text-foreground transition-colors`,
                      children: (0, T.jsx)(A, { className: `size-4` }),
                    }),
                  ],
                }),
              ],
            }),
            (0, T.jsxs)(`div`, {
              className: `space-y-3`,
              children: [
                (0, T.jsx)(`h4`, {
                  className: `text-sm font-medium`,
                  children: `Product`,
                }),
                (0, T.jsxs)(`ul`, {
                  className: `space-y-2 text-sm text-muted-foreground`,
                  children: [
                    (0, T.jsx)(`li`, {
                      children: (0, T.jsx)(a, {
                        to: `/`,
                        className: `hover:text-foreground transition-colors`,
                        children: `Home`,
                      }),
                    }),
                    (0, T.jsx)(`li`, {
                      children: (0, T.jsx)(a, {
                        to: `/about`,
                        className: `hover:text-foreground transition-colors`,
                        children: `About`,
                      }),
                    }),
                  ],
                }),
              ],
            }),
            (0, T.jsxs)(`div`, {
              className: `space-y-3`,
              children: [
                (0, T.jsx)(`h4`, {
                  className: `text-sm font-medium`,
                  children: `Account`,
                }),
                (0, T.jsxs)(`ul`, {
                  className: `space-y-2 text-sm text-muted-foreground`,
                  children: [
                    (0, T.jsx)(`li`, {
                      children: (0, T.jsx)(a, {
                        to: `/login`,
                        className: `hover:text-foreground transition-colors`,
                        children: `Sign In`,
                      }),
                    }),
                    (0, T.jsx)(`li`, {
                      children: (0, T.jsx)(a, {
                        to: `/register`,
                        className: `hover:text-foreground transition-colors`,
                        children: `Sign Up`,
                      }),
                    }),
                  ],
                }),
              ],
            }),
            (0, T.jsxs)(`div`, {
              className: `space-y-3`,
              children: [
                (0, T.jsx)(`h4`, {
                  className: `text-sm font-medium`,
                  children: `Legal`,
                }),
                (0, T.jsxs)(`ul`, {
                  className: `space-y-2 text-sm text-muted-foreground`,
                  children: [
                    (0, T.jsx)(`li`, {
                      children: (0, T.jsx)(`span`, {
                        className: `cursor-default`,
                        children: `Privacy Policy`,
                      }),
                    }),
                    (0, T.jsx)(`li`, {
                      children: (0, T.jsx)(`span`, {
                        className: `cursor-default`,
                        children: `Terms of Service`,
                      }),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        (0, T.jsx)(v, { className: `my-6` }),
        (0, T.jsxs)(`p`, {
          className: `text-center text-xs text-muted-foreground`,
          children: [
            `© `,
            new Date().getFullYear(),
            ` MiniBooking. All rights reserved.`,
          ],
        }),
      ],
    }),
  });
}
var M = ({ children: e }) =>
  (0, T.jsxs)(`div`, {
    className: `flex flex-col min-h-screen`,
    children: [
      (0, T.jsx)(O, {}),
      (0, T.jsx)(`main`, { className: `flex-1`, children: e }),
      (0, T.jsx)(j, {}),
    ],
  });
async function N() {
  return (await _.persist.rehydrate(), null);
}
var P = n(function () {
    return null;
  }),
  F = t(function () {
    return (0, T.jsx)(M, { children: (0, T.jsx)(r, {}) });
  });
export { P as HydrateFallback, N as clientLoader, F as default };
