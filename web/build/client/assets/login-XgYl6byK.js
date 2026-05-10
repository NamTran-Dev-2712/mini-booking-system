import { a as e, n as t, t as n } from "./jsx-runtime-CAzG7qJ5.js";
import { O as r, r as i } from "./chunk-5KNZJZUH-D0Qj9TTb.js";
import { r as a, t as o } from "./loader-circle-CXbg7Cgp.js";
import {
  _ as s,
  a as c,
  c as l,
  d as u,
  f as d,
  g as f,
  h as p,
  i as m,
  l as h,
  m as g,
  n as _,
  o as v,
  p as y,
  r as b,
  s as x,
  t as S,
  u as C,
} from "./schemas-C2PMZ5kw.js";
import { t as w } from "./auth.store-vFxwWdJE.js";
import { t as T } from "./button-DXwXqNSz.js";
var E = e(t(), 1),
  D = S({
    email: _().min(1, `Email is required`).email(`Invalid email address`),
    password: _().min(1, `Password is required`),
  });
function O() {
  let e = r(),
    t = w((e) => e.setUser),
    n = g({ resolver: c(D), defaultValues: { email: ``, password: `` } });
  async function i(n) {
    try {
      let r = await b.login({ email: n.email, password: n.password });
      (t({
        userId: r.userId,
        fullName: r.fullName,
        email: r.email,
        phoneNumber: r.phoneNumber,
        expiresIn: r.expiresIn,
        createdAt: r.createdAt,
      }),
        e(`/`));
    } catch (e) {
      a.error(m(e));
    }
  }
  return { form: n, onSubmit: n.handleSubmit(i) };
}
var k = n();
function A() {
  let { form: e, onSubmit: t } = O(),
    [n, r] = (0, E.useState)(!1),
    a = e.formState.isSubmitting;
  return (0, k.jsxs)(`div`, {
    className: `space-y-6`,
    children: [
      (0, k.jsx)(l, {
        ...e,
        children: (0, k.jsxs)(`form`, {
          onSubmit: t,
          className: `space-y-4`,
          children: [
            (0, k.jsx)(C, {
              control: e.control,
              name: `email`,
              render: ({ field: e }) =>
                (0, k.jsxs)(u, {
                  children: [
                    (0, k.jsx)(d, { children: `Email` }),
                    (0, k.jsx)(h, {
                      children: (0, k.jsx)(x, {
                        type: `email`,
                        placeholder: `you@example.com`,
                        autoComplete: `email`,
                        ...e,
                      }),
                    }),
                    (0, k.jsx)(y, {}),
                  ],
                }),
            }),
            (0, k.jsx)(C, {
              control: e.control,
              name: `password`,
              render: ({ field: e }) =>
                (0, k.jsxs)(u, {
                  children: [
                    (0, k.jsxs)(`div`, {
                      className: `flex items-center justify-between`,
                      children: [
                        (0, k.jsx)(d, { children: `Password` }),
                        (0, k.jsx)(i, {
                          to: `/forgot-password`,
                          className: `text-xs text-muted-foreground hover:text-foreground transition-colors`,
                          children: `Forgot password?`,
                        }),
                      ],
                    }),
                    (0, k.jsx)(h, {
                      children: (0, k.jsxs)(`div`, {
                        className: `relative`,
                        children: [
                          (0, k.jsx)(x, {
                            type: n ? `text` : `password`,
                            placeholder: `••••••••`,
                            autoComplete: `current-password`,
                            ...e,
                          }),
                          (0, k.jsx)(`button`, {
                            type: `button`,
                            onClick: () => r((e) => !e),
                            className: `absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors`,
                            "aria-label": n ? `Hide password` : `Show password`,
                            children: n
                              ? (0, k.jsx)(s, { className: `size-4` })
                              : (0, k.jsx)(f, { className: `size-4` }),
                          }),
                        ],
                      }),
                    }),
                    (0, k.jsx)(y, {}),
                  ],
                }),
            }),
            (0, k.jsxs)(T, {
              type: `submit`,
              className: `w-full`,
              disabled: a,
              children: [
                a && (0, k.jsx)(o, { className: `mr-2 size-4 animate-spin` }),
                `Sign In`,
              ],
            }),
          ],
        }),
      }),
      (0, k.jsx)(v, { action: `login` }),
      (0, k.jsxs)(`p`, {
        className: `text-center text-sm text-muted-foreground`,
        children: [
          `Don't have an account?`,
          ` `,
          (0, k.jsx)(i, {
            to: `/register`,
            className: `font-medium text-foreground underline-offset-4 hover:underline`,
            children: `Sign up now`,
          }),
        ],
      }),
    ],
  });
}
function j() {
  return [
    { title: `Sign In — MiniBooking` },
    { name: `description`, content: `Sign in to your MiniBooking account` },
  ];
}
function M() {
  return (0, k.jsx)(p, {
    title: `Welcome Back`,
    description: `Sign in to your account to continue`,
    children: (0, k.jsx)(A, {}),
  });
}
export { M as default, j as meta };
