import { a as e, n as t, t as n } from "./jsx-runtime-D0R9s8hK.js";
import { A as r, j as i, r as a } from "./chunk-5KNZJZUH-C906xdEM.js";
import "./dist-BzhCrnqt.js";
import { t as o } from "./activity-DpAHtI9C.js";
import { t as s } from "./book-open-BWD5Gq0U.js";
import { t as c } from "./bot-D5Q7sFzH.js";
import { t as l } from "./calendar-check-036uFykA.js";
import { t as u } from "./calendar-days-CVX6VkNj.js";
import { t as d } from "./circle-user-BYgSlSbd.js";
import { t as f } from "./credit-card-BiPk2xTW.js";
import { t as p } from "./graduation-cap-C9Li4Dvj.js";
import { c as m, n as h, o as g, s as _, t as v } from "./sheet-CR4o6XAE.js";
import { t as y } from "./users-QJx7Xv8k.js";
import { t as b } from "./auth.store-U8lf-bmK.js";
import { n as x } from "./dist-U9yTH5Ng.js";
import { t as S } from "./separator-CTbzZobJ.js";
import { n as C, t as w } from "./avatar-CDlKaHys.js";
import { t as T } from "./button-DwAmr52O.js";
import { t as E } from "./auth.service-Bdt1FuOd.js";
var D = e(t(), 1),
  O = n();
function k({ navItems: e, onNavigate: t }) {
  let n = r(),
    o = i(),
    { user: s, clearUser: c } = b(),
    l = (s?.fullName ?? `?`)
      .split(` `)
      .map((e) => e[0])
      .join(``)
      .slice(0, 2)
      .toUpperCase();
  async function d() {
    try {
      await E.logout();
    } catch {
    } finally {
      (c(), o(`/login`));
    }
  }
  function f(e) {
    return e.exact
      ? n.pathname === e.href
      : n.pathname === e.href || n.pathname.startsWith(e.href + `/`);
  }
  return (0, O.jsxs)(`div`, {
    className: `flex h-full w-[260px] flex-col border-r bg-background`,
    children: [
      (0, O.jsxs)(`div`, {
        className: `flex h-16 shrink-0 items-center gap-3 px-5`,
        children: [
          (0, O.jsx)(`div`, {
            className: `flex size-8 items-center justify-center rounded-lg bg-primary`,
            children: (0, O.jsx)(u, {
              className: `size-4 text-primary-foreground`,
            }),
          }),
          (0, O.jsx)(`span`, {
            className: `text-base font-semibold tracking-tight`,
            children: `MiniBooking`,
          }),
        ],
      }),
      (0, O.jsx)(S, {}),
      (0, O.jsx)(`nav`, {
        className: `flex-1 overflow-y-auto px-3 py-4`,
        children: (0, O.jsx)(`ul`, {
          className: `space-y-0.5`,
          children: e.map((e) => {
            let n = f(e);
            return (0, O.jsx)(
              `li`,
              {
                children: (0, O.jsxs)(a, {
                  to: e.href,
                  onClick: t,
                  className: x(
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors`,
                    n
                      ? `bg-primary/10 text-primary`
                      : `text-muted-foreground hover:bg-accent hover:text-accent-foreground`,
                  ),
                  children: [
                    (0, O.jsx)(e.icon, {
                      className: x(
                        `size-[18px] shrink-0`,
                        n ? `text-primary` : `text-muted-foreground`,
                      ),
                    }),
                    e.label,
                  ],
                }),
              },
              e.href,
            );
          }),
        }),
      }),
      (0, O.jsx)(S, {}),
      (0, O.jsxs)(`div`, {
        className: `flex items-center gap-3 p-4`,
        children: [
          (0, O.jsx)(w, {
            className: `size-9 shrink-0`,
            children: (0, O.jsx)(C, {
              className: `bg-primary/10 text-sm font-semibold text-primary`,
              children: l,
            }),
          }),
          (0, O.jsxs)(`div`, {
            className: `min-w-0 flex-1`,
            children: [
              (0, O.jsx)(`p`, {
                className: `truncate text-sm font-medium leading-tight`,
                children: s?.fullName,
              }),
              (0, O.jsx)(`p`, {
                className: `truncate text-xs text-muted-foreground`,
                children: s?.email,
              }),
            ],
          }),
          (0, O.jsx)(T, {
            variant: `ghost`,
            size: `icon`,
            onClick: d,
            "aria-label": `Logout`,
            className: `shrink-0 text-muted-foreground hover:text-destructive`,
            children: (0, O.jsx)(_, { className: `size-4` }),
          }),
        ],
      }),
    ],
  });
}
function A({ navItems: e }) {
  let [t, n] = (0, D.useState)(!1),
    i = r(),
    o = e.find((e) =>
      e.exact
        ? i.pathname === e.href
        : i.pathname === e.href || i.pathname.startsWith(e.href + `/`),
    );
  return (0, O.jsxs)(`header`, {
    className: `flex h-16 shrink-0 items-center gap-3 border-b bg-background px-4 lg:px-6`,
    children: [
      (0, O.jsx)(T, {
        variant: `ghost`,
        size: `icon`,
        className: `lg:hidden`,
        onClick: () => n(!0),
        "aria-label": `Open menu`,
        children: (0, O.jsx)(g, { className: `size-5` }),
      }),
      (0, O.jsxs)(a, {
        to: `/`,
        className: `flex items-center gap-2 font-semibold lg:hidden`,
        children: [
          (0, O.jsx)(`div`, {
            className: `flex size-7 items-center justify-center rounded-md bg-primary`,
            children: (0, O.jsx)(u, {
              className: `size-3.5 text-primary-foreground`,
            }),
          }),
          (0, O.jsx)(`span`, { className: `text-sm`, children: `MiniBooking` }),
        ],
      }),
      o &&
        (0, O.jsx)(`h1`, {
          className: `hidden text-sm font-semibold text-foreground lg:block`,
          children: o.label,
        }),
      (0, O.jsx)(v, {
        open: t,
        onOpenChange: n,
        children: (0, O.jsx)(h, {
          side: `left`,
          className: `w-[260px] p-0`,
          showCloseButton: !1,
          children: (0, O.jsx)(k, { navItems: e, onNavigate: () => n(!1) }),
        }),
      }),
    ],
  });
}
function j({ navItems: e, children: t }) {
  return (0, O.jsxs)(`div`, {
    className: `flex h-screen overflow-hidden bg-background`,
    children: [
      (0, O.jsx)(`aside`, {
        className: `hidden shrink-0 lg:flex`,
        children: (0, O.jsx)(k, { navItems: e }),
      }),
      (0, O.jsxs)(`div`, {
        className: `flex min-w-0 flex-1 flex-col overflow-hidden`,
        children: [
          (0, O.jsx)(A, { navItems: e }),
          (0, O.jsx)(`main`, {
            className: `flex-1 overflow-y-auto p-4 md:p-6 lg:p-8`,
            children: t,
          }),
        ],
      }),
    ],
  });
}
var M = [
    { label: `Dashboard`, href: `/user`, icon: m, exact: !0 },
    { label: `Find Mentors`, href: `/user/mentors`, icon: y },
    { label: `My Bookings`, href: `/user/bookings`, icon: l },
    { label: `AI Assistant`, href: `/user/ai-chat`, icon: c },
    { label: `Payments`, href: `/user/payments`, icon: f },
    { label: `Profile`, href: `/user/profile`, icon: d },
  ],
  N = [
    { label: `Dashboard`, href: `/mentor`, icon: m, exact: !0 },
    { label: `My Schedule`, href: `/mentor/schedule`, icon: u },
    { label: `My Skills`, href: `/mentor/skills`, icon: p },
    { label: `Bookings`, href: `/mentor/bookings`, icon: s },
    { label: `AI Assistant`, href: `/mentor/ai-chat`, icon: c },
    { label: `Profile`, href: `/mentor/profile`, icon: d },
  ],
  P = [
    { label: `Dashboard`, href: `/admin`, icon: m, exact: !0 },
    { label: `Mentors`, href: `/admin/mentors`, icon: y },
    { label: `Bookings`, href: `/admin/bookings`, icon: l },
    { label: `Payments`, href: `/admin/payments`, icon: f },
    { label: `System Health`, href: `/admin/health`, icon: o },
  ];
export { j as i, N as n, M as r, P as t };
