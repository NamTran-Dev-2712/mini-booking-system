import { a as e, n as t, r as n, t as r } from "./jsx-runtime-CAzG7qJ5.js";
import { t as i } from "./createLucideIcon-DIem-QJH.js";
import { i as a, n as o, r as s, t as c } from "./badge-B7zb_CxP.js";
import { n as l, r as u, t as d } from "./separator-8f2NwZMe.js";
import { i as f, n as p, t as m } from "./dist-D9HvU-dc.js";
var h = i(`heart`, [
    [
      `path`,
      {
        d: `M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5`,
        key: `mvr1a0`,
      },
    ],
  ]),
  g = i(`lightbulb`, [
    [
      `path`,
      {
        d: `M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5`,
        key: `1gvzjb`,
      },
    ],
    [`path`, { d: `M9 18h6`, key: `x1upvd` }],
    [`path`, { d: `M10 22h4`, key: `ceow96` }],
  ]),
  _ = i(`target`, [
    [`circle`, { cx: `12`, cy: `12`, r: `10`, key: `1mglay` }],
    [`circle`, { cx: `12`, cy: `12`, r: `6`, key: `1vlfrh` }],
    [`circle`, { cx: `12`, cy: `12`, r: `2`, key: `1c9p78` }],
  ]),
  v = n((e) => {
    var n = t();
    function r(e, t) {
      return (e === t && (e !== 0 || 1 / e == 1 / t)) || (e !== e && t !== t);
    }
    var i = typeof Object.is == `function` ? Object.is : r,
      a = n.useState,
      o = n.useEffect,
      s = n.useLayoutEffect,
      c = n.useDebugValue;
    function l(e, t) {
      var n = t(),
        r = a({ inst: { value: n, getSnapshot: t } }),
        i = r[0].inst,
        l = r[1];
      return (
        s(
          function () {
            ((i.value = n), (i.getSnapshot = t), u(i) && l({ inst: i }));
          },
          [e, n, t],
        ),
        o(
          function () {
            return (
              u(i) && l({ inst: i }),
              e(function () {
                u(i) && l({ inst: i });
              })
            );
          },
          [e],
        ),
        c(n),
        n
      );
    }
    function u(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var n = t();
        return !i(e, n);
      } catch {
        return !0;
      }
    }
    function d(e, t) {
      return t();
    }
    var f =
      typeof window > `u` ||
      window.document === void 0 ||
      window.document.createElement === void 0
        ? d
        : l;
    e.useSyncExternalStore =
      n.useSyncExternalStore === void 0 ? f : n.useSyncExternalStore;
  }),
  y = n((e, t) => {
    t.exports = v();
  })();
function b() {
  return (0, y.useSyncExternalStore)(
    x,
    () => !0,
    () => !1,
  );
}
function x() {
  return () => {};
}
var S = e(t(), 1),
  C = r(),
  w = `Avatar`,
  [T, E] = f(w),
  [D, O] = T(w),
  k = S.forwardRef((e, t) => {
    let { __scopeAvatar: n, ...r } = e,
      [i, a] = S.useState(`idle`);
    return (0, C.jsx)(D, {
      scope: n,
      imageLoadingStatus: i,
      onImageLoadingStatusChange: a,
      children: (0, C.jsx)(u.span, { ...r, ref: t }),
    });
  });
k.displayName = w;
var A = `AvatarImage`,
  j = S.forwardRef((e, t) => {
    let {
        __scopeAvatar: n,
        src: r,
        onLoadingStatusChange: i = () => {},
        ...a
      } = e,
      o = O(A, n),
      s = F(r, a),
      c = m((e) => {
        (i(e), o.onImageLoadingStatusChange(e));
      });
    return (
      p(() => {
        s !== `idle` && c(s);
      }, [s, c]),
      s === `loaded` ? (0, C.jsx)(u.img, { ...a, ref: t, src: r }) : null
    );
  });
j.displayName = A;
var M = `AvatarFallback`,
  N = S.forwardRef((e, t) => {
    let { __scopeAvatar: n, delayMs: r, ...i } = e,
      a = O(M, n),
      [o, s] = S.useState(r === void 0);
    return (
      S.useEffect(() => {
        if (r !== void 0) {
          let e = window.setTimeout(() => s(!0), r);
          return () => window.clearTimeout(e);
        }
      }, [r]),
      o && a.imageLoadingStatus !== `loaded`
        ? (0, C.jsx)(u.span, { ...i, ref: t })
        : null
    );
  });
N.displayName = M;
function P(e, t) {
  return e
    ? t
      ? (e.src !== t && (e.src = t),
        e.complete && e.naturalWidth > 0 ? `loaded` : `loading`)
      : `error`
    : `idle`;
}
function F(e, { referrerPolicy: t, crossOrigin: n }) {
  let r = b(),
    i = S.useRef(null),
    a = r ? ((i.current ||= new window.Image()), i.current) : null,
    [o, s] = S.useState(() => P(a, e));
  return (
    p(() => {
      s(P(a, e));
    }, [a, e]),
    p(() => {
      let e = (e) => () => {
        s(e);
      };
      if (!a) return;
      let r = e(`loaded`),
        i = e(`error`);
      return (
        a.addEventListener(`load`, r),
        a.addEventListener(`error`, i),
        t && (a.referrerPolicy = t),
        typeof n == `string` && (a.crossOrigin = n),
        () => {
          (a.removeEventListener(`load`, r), a.removeEventListener(`error`, i));
        }
      );
    }, [a, n, t]),
    o
  );
}
var I = k,
  L = N;
function R({ className: e, size: t = `default`, ...n }) {
  return (0, C.jsx)(I, {
    "data-slot": `avatar`,
    "data-size": t,
    className: l(
      `group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten`,
      e,
    ),
    ...n,
  });
}
function z({ className: e, ...t }) {
  return (0, C.jsx)(L, {
    "data-slot": `avatar-fallback`,
    className: l(
      `flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs`,
      e,
    ),
    ...t,
  });
}
function B() {
  return [
    { title: `About Us — MiniBooking` },
    { name: `description`, content: `Our story and mission at MiniBooking` },
  ];
}
var V = [
    { icon: o, value: `1,000+`, label: `Trusted Students` },
    { icon: a, value: `200+`, label: `Expert Mentors` },
    { icon: s, value: `50K+`, label: `Successful Sessions` },
  ],
  H = [
    {
      icon: _,
      title: `Simplicity`,
      description: `We believe technology should serve people, not the other way around. Every feature is designed for maximum ease of use.`,
    },
    {
      icon: h,
      title: `Dedication`,
      description: `Every user feedback inspires us to improve. We listen, we learn, and we act on what matters most.`,
    },
    {
      icon: g,
      title: `Innovation`,
      description: `Constantly seeking better ways to solve problems. Innovation is in our DNA and drives everything we build.`,
    },
  ],
  U = [
    { name: `Trần Nam`, role: `Founder & CEO`, initials: `TN` },
    { name: `Nguyễn Linh`, role: `Lead Designer`, initials: `NL` },
    { name: `Phạm Khoa`, role: `Backend Engineer`, initials: `PK` },
    { name: `Lê Thu`, role: `Frontend Engineer`, initials: `LT` },
  ];
function W() {
  return (0, C.jsxs)(`div`, {
    className: `flex flex-col`,
    children: [
      (0, C.jsxs)(`section`, {
        className: `relative overflow-hidden py-20 md:py-28`,
        children: [
          (0, C.jsx)(`div`, {
            className: `absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,oklch(0.9_0_0/0.25),transparent)]`,
          }),
          (0, C.jsxs)(`div`, {
            className: `container mx-auto max-w-6xl px-4 text-center`,
            children: [
              (0, C.jsx)(c, {
                variant: `secondary`,
                className: `mb-4`,
                children: `About Us`,
              }),
              (0, C.jsxs)(`h1`, {
                className: `text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl`,
                children: [
                  `Building the Future`,
                  (0, C.jsx)(`span`, {
                    className: `block text-muted-foreground`,
                    children: `of Mentorship`,
                  }),
                ],
              }),
              (0, C.jsx)(`p`, {
                className: `mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg`,
                children: `MiniBooking was founded with one goal: make connecting with mentors easy and effective for everyone, everywhere.`,
              }),
            ],
          }),
        ],
      }),
      (0, C.jsx)(`section`, {
        className: `border-y border-border/60 bg-muted/30 py-10`,
        children: (0, C.jsx)(`div`, {
          className: `container mx-auto max-w-6xl px-4`,
          children: (0, C.jsx)(`div`, {
            className: `grid grid-cols-3 gap-4 md:gap-8`,
            children: V.map(({ icon: e, value: t, label: n }) =>
              (0, C.jsxs)(
                `div`,
                {
                  className: `flex flex-col items-center gap-1 text-center`,
                  children: [
                    (0, C.jsx)(e, {
                      className: `size-5 text-muted-foreground mb-1`,
                    }),
                    (0, C.jsx)(`span`, {
                      className: `text-2xl font-bold md:text-3xl`,
                      children: t,
                    }),
                    (0, C.jsx)(`span`, {
                      className: `text-xs text-muted-foreground md:text-sm`,
                      children: n,
                    }),
                  ],
                },
                n,
              ),
            ),
          }),
        }),
      }),
      (0, C.jsx)(`section`, {
        className: `py-20 md:py-28`,
        children: (0, C.jsx)(`div`, {
          className: `container mx-auto max-w-6xl px-4`,
          children: (0, C.jsxs)(`div`, {
            className: `grid gap-12 md:grid-cols-2 md:items-center`,
            children: [
              (0, C.jsxs)(`div`, {
                className: `space-y-4`,
                children: [
                  (0, C.jsx)(c, {
                    variant: `secondary`,
                    children: `Our Mission`,
                  }),
                  (0, C.jsx)(`h2`, {
                    className: `text-3xl font-bold tracking-tight md:text-4xl`,
                    children: `Connecting Students with Expert Mentors`,
                  }),
                  (0, C.jsx)(`p`, {
                    className: `text-muted-foreground leading-relaxed`,
                    children: `We believe mentorship is the key to growth. MiniBooking exists to remove the friction in scheduling mentorship sessions — so you can focus on learning and developing your skills.`,
                  }),
                  (0, C.jsx)(`p`, {
                    className: `text-muted-foreground leading-relaxed`,
                    children: `Whether you're a student seeking guidance or a professional sharing knowledge, our platform adapts to your needs without requiring any technical expertise.`,
                  }),
                ],
              }),
              (0, C.jsx)(`div`, {
                className: `rounded-2xl border border-border/60 bg-muted/40 aspect-video flex items-center justify-center`,
                children: (0, C.jsx)(`p`, {
                  className: `text-muted-foreground text-sm`,
                  children: `Product screenshot`,
                }),
              }),
            ],
          }),
        }),
      }),
      (0, C.jsx)(d, {}),
      (0, C.jsx)(`section`, {
        className: `py-20 md:py-28`,
        children: (0, C.jsxs)(`div`, {
          className: `container mx-auto max-w-6xl px-4`,
          children: [
            (0, C.jsxs)(`div`, {
              className: `mb-12 text-center`,
              children: [
                (0, C.jsx)(`h2`, {
                  className: `text-3xl font-bold tracking-tight md:text-4xl`,
                  children: `Our Core Values`,
                }),
                (0, C.jsx)(`p`, {
                  className: `mt-3 text-muted-foreground`,
                  children: `The principles that guide every decision we make.`,
                }),
              ],
            }),
            (0, C.jsx)(`div`, {
              className: `grid gap-6 md:grid-cols-3`,
              children: H.map(({ icon: e, title: t, description: n }) =>
                (0, C.jsxs)(
                  `div`,
                  {
                    className: `rounded-xl border border-border/60 bg-card p-6 transition-shadow hover:shadow-md`,
                    children: [
                      (0, C.jsx)(`div`, {
                        className: `mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-muted`,
                        children: (0, C.jsx)(e, { className: `size-5` }),
                      }),
                      (0, C.jsx)(`h3`, {
                        className: `font-semibold`,
                        children: t,
                      }),
                      (0, C.jsx)(`p`, {
                        className: `mt-2 text-sm text-muted-foreground leading-relaxed`,
                        children: n,
                      }),
                    ],
                  },
                  t,
                ),
              ),
            }),
          ],
        }),
      }),
      (0, C.jsx)(d, {}),
      (0, C.jsx)(`section`, {
        className: `py-20 md:py-28`,
        children: (0, C.jsxs)(`div`, {
          className: `container mx-auto max-w-6xl px-4`,
          children: [
            (0, C.jsxs)(`div`, {
              className: `mb-12 text-center`,
              children: [
                (0, C.jsx)(`h2`, {
                  className: `text-3xl font-bold tracking-tight md:text-4xl`,
                  children: `Our Team`,
                }),
                (0, C.jsx)(`p`, {
                  className: `mt-3 text-muted-foreground`,
                  children: `The people behind MiniBooking.`,
                }),
              ],
            }),
            (0, C.jsx)(`div`, {
              className: `grid grid-cols-2 gap-6 md:grid-cols-4`,
              children: U.map(({ name: e, role: t, initials: n }) =>
                (0, C.jsxs)(
                  `div`,
                  {
                    className: `flex flex-col items-center gap-3 text-center`,
                    children: [
                      (0, C.jsx)(R, {
                        className: `size-16`,
                        children: (0, C.jsx)(z, {
                          className: `text-sm font-medium`,
                          children: n,
                        }),
                      }),
                      (0, C.jsxs)(`div`, {
                        children: [
                          (0, C.jsx)(`p`, {
                            className: `font-medium text-sm`,
                            children: e,
                          }),
                          (0, C.jsx)(`p`, {
                            className: `text-xs text-muted-foreground`,
                            children: t,
                          }),
                        ],
                      }),
                    ],
                  },
                  e,
                ),
              ),
            }),
          ],
        }),
      }),
    ],
  });
}
export { W as default, B as meta };
