import { a as e, n as t, t as n } from "./jsx-runtime-CAzG7qJ5.js";
import {
  A as r,
  C as i,
  a,
  c as o,
  d as s,
  f as c,
  i as l,
  k as u,
} from "./chunk-5KNZJZUH-D0Qj9TTb.js";
import { n as d, t as f } from "./loader-circle-CXbg7Cgp.js";
import { t as p } from "./createLucideIcon-DIem-QJH.js";
import { t as m } from "./circle-check-DIFduJ4p.js";
import { t as h } from "./auth.store-vFxwWdJE.js";
var g = e(t(), 1),
  _ = (e, t, n, r, i, a, o, s) => {
    let c = document.documentElement,
      l = [`light`, `dark`];
    function u(t) {
      ((Array.isArray(e) ? e : [e]).forEach((e) => {
        let n = e === `class`,
          r = n && a ? i.map((e) => a[e] || e) : i;
        n
          ? (c.classList.remove(...r), c.classList.add(a && a[t] ? a[t] : t))
          : c.setAttribute(e, t);
      }),
        d(t));
    }
    function d(e) {
      s && l.includes(e) && (c.style.colorScheme = e);
    }
    function f() {
      return window.matchMedia(`(prefers-color-scheme: dark)`).matches
        ? `dark`
        : `light`;
    }
    if (r) u(r);
    else
      try {
        let e = localStorage.getItem(t) || n;
        u(o && e === `system` ? f() : e);
      } catch {}
  },
  v = g.createContext(void 0),
  y = { setTheme: (e) => {}, themes: [] },
  b = () => g.useContext(v) ?? y;
g.memo(
  ({
    forcedTheme: e,
    storageKey: t,
    attribute: n,
    enableSystem: r,
    enableColorScheme: i,
    defaultTheme: a,
    value: o,
    themes: s,
    nonce: c,
    scriptProps: l,
  }) => {
    let u = JSON.stringify([n, t, a, e, s, o, r, i]).slice(1, -1);
    return g.createElement(`script`, {
      ...l,
      suppressHydrationWarning: !0,
      nonce: typeof window > `u` ? c : ``,
      dangerouslySetInnerHTML: { __html: `(${_.toString()})(${u})` },
    });
  },
);
var x = p(`info`, [
    [`circle`, { cx: `12`, cy: `12`, r: `10`, key: `1mglay` }],
    [`path`, { d: `M12 16v-4`, key: `1dtifu` }],
    [`path`, { d: `M12 8h.01`, key: `e9boi3` }],
  ]),
  S = p(`octagon-x`, [
    [`path`, { d: `m15 9-6 6`, key: `1uzhvr` }],
    [
      `path`,
      {
        d: `M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z`,
        key: `2d38gg`,
      },
    ],
    [`path`, { d: `m9 9 6 6`, key: `z0biqf` }],
  ]),
  C = p(`triangle-alert`, [
    [
      `path`,
      {
        d: `m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3`,
        key: `wmoenq`,
      },
    ],
    [`path`, { d: `M12 9v4`, key: `juzpu7` }],
    [`path`, { d: `M12 17h.01`, key: `p32p05` }],
  ]),
  w = n(),
  T = ({ ...e }) => {
    let { theme: t = `system` } = b();
    return (0, w.jsx)(d, {
      theme: t,
      className: `toaster group`,
      icons: {
        success: (0, w.jsx)(m, { className: `size-4` }),
        info: (0, w.jsx)(x, { className: `size-4` }),
        warning: (0, w.jsx)(C, { className: `size-4` }),
        error: (0, w.jsx)(S, { className: `size-4` }),
        loading: (0, w.jsx)(f, { className: `size-4 animate-spin` }),
      },
      style: {
        "--normal-bg": `var(--popover)`,
        "--normal-text": `var(--popover-foreground)`,
        "--normal-border": `var(--border)`,
        "--border-radius": `var(--radius)`,
      },
      toastOptions: { classNames: { toast: `cn-toast` } },
      ...e,
    });
  };
function E({ children: e }) {
  return (0, w.jsxs)(`html`, {
    lang: `en`,
    children: [
      (0, w.jsxs)(`head`, {
        children: [
          (0, w.jsx)(`meta`, { charSet: `utf-8` }),
          (0, w.jsx)(`meta`, {
            name: `viewport`,
            content: `width=device-width, initial-scale=1`,
          }),
          (0, w.jsx)(a, {}),
          (0, w.jsx)(l, {}),
        ],
      }),
      (0, w.jsxs)(`body`, {
        children: [e, (0, w.jsx)(c, {}), (0, w.jsx)(s, {})],
      }),
    ],
  });
}
var D = u(function () {
    return (
      (0, g.useEffect)(() => {
        h.persist.rehydrate();
      }, []),
      (0, w.jsxs)(w.Fragment, {
        children: [
          (0, w.jsx)(o, {}),
          (0, w.jsx)(T, { richColors: !0, position: `top-right` }),
        ],
      })
    );
  }),
  O = r(function ({ error: e }) {
    let t = `Oops!`,
      n = `An unexpected error occurred.`;
    return (
      i(e) &&
        ((t = e.status === 404 ? `404` : `Error`),
        (n =
          e.status === 404
            ? `The requested page could not be found.`
            : e.statusText || n)),
      (0, w.jsxs)(`main`, {
        className: `pt-16 p-4 container mx-auto`,
        children: [
          (0, w.jsx)(`h1`, { children: t }),
          (0, w.jsx)(`p`, { children: n }),
          void 0,
        ],
      })
    );
  });
export { O as ErrorBoundary, E as Layout, D as default };
