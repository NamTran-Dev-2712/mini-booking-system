import { a as e, n as t, t as n } from "./jsx-runtime-D0R9s8hK.js";
import { j as r, r as i } from "./chunk-5KNZJZUH-C906xdEM.js";
import { n as a } from "./dist-BzhCrnqt.js";
import {
  a as o,
  c as s,
  d as c,
  f as l,
  h as u,
  i as d,
  l as f,
  m as p,
  n as m,
  o as h,
  p as g,
  r as _,
  s as v,
  t as y,
  u as b,
} from "./schemas-CmfKEtqt.js";
import { t as x } from "./loader-circle-bNwxySZM.js";
import { t as S } from "./auth.store-U8lf-bmK.js";
import { t as C } from "./button-DwAmr52O.js";
import { t as w } from "./auth.service-Bdt1FuOd.js";
import { t as T } from "./api-error-wP_70dsA.js";
var E = e(t(), 1),
  D = y({
    email: m().min(1, `Email is required`).email(`Invalid email address`),
    password: m().min(1, `Password is required`),
  }),
  O = { Admin: `/admin`, Mentor: `/mentor`, User: `/user` };
function k() {
  let e = r(),
    t = S((e) => e.setUser),
    n = l({ resolver: _(D), defaultValues: { email: ``, password: `` } });
  async function i(n) {
    try {
      let r = await w.login({ email: n.email, password: n.password });
      (t({
        userId: r.userId,
        fullName: r.fullName,
        email: r.email,
        phoneNumber: r.phoneNumber,
        roles: r.roles,
        expiresIn: r.expiresIn,
        createdAt: r.createdAt,
      }),
        e(O[r.roles[0] ?? `User`] ?? `/`));
    } catch (e) {
      a.error(T(e));
    }
  }
  return { form: n, onSubmit: n.handleSubmit(i) };
}
var A = n();
function j() {
  let { form: e, onSubmit: t } = k(),
    [n, r] = (0, E.useState)(!1),
    a = e.formState.isSubmitting;
  return (0, A.jsxs)(`div`, {
    className: `space-y-6`,
    children: [
      (0, A.jsx)(h, {
        ...e,
        children: (0, A.jsxs)(`form`, {
          onSubmit: t,
          className: `space-y-4`,
          children: [
            (0, A.jsx)(s, {
              control: e.control,
              name: `email`,
              render: ({ field: e }) =>
                (0, A.jsxs)(f, {
                  children: [
                    (0, A.jsx)(b, { children: `Email` }),
                    (0, A.jsx)(v, {
                      children: (0, A.jsx)(o, {
                        type: `email`,
                        placeholder: `you@example.com`,
                        autoComplete: `email`,
                        ...e,
                      }),
                    }),
                    (0, A.jsx)(c, {}),
                  ],
                }),
            }),
            (0, A.jsx)(s, {
              control: e.control,
              name: `password`,
              render: ({ field: e }) =>
                (0, A.jsxs)(f, {
                  children: [
                    (0, A.jsxs)(`div`, {
                      className: `flex items-center justify-between`,
                      children: [
                        (0, A.jsx)(b, { children: `Password` }),
                        (0, A.jsx)(i, {
                          to: `/forgot-password`,
                          className: `text-xs text-muted-foreground hover:text-foreground transition-colors`,
                          children: `Forgot password?`,
                        }),
                      ],
                    }),
                    (0, A.jsx)(v, {
                      children: (0, A.jsxs)(`div`, {
                        className: `relative`,
                        children: [
                          (0, A.jsx)(o, {
                            type: n ? `text` : `password`,
                            placeholder: `••••••••`,
                            autoComplete: `current-password`,
                            ...e,
                          }),
                          (0, A.jsx)(`button`, {
                            type: `button`,
                            onClick: () => r((e) => !e),
                            className: `absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors`,
                            "aria-label": n ? `Hide password` : `Show password`,
                            children: n
                              ? (0, A.jsx)(u, { className: `size-4` })
                              : (0, A.jsx)(p, { className: `size-4` }),
                          }),
                        ],
                      }),
                    }),
                    (0, A.jsx)(c, {}),
                  ],
                }),
            }),
            (0, A.jsxs)(C, {
              type: `submit`,
              className: `w-full`,
              disabled: a,
              children: [
                a && (0, A.jsx)(x, { className: `mr-2 size-4 animate-spin` }),
                `Sign In`,
              ],
            }),
          ],
        }),
      }),
      (0, A.jsx)(d, { action: `login` }),
      (0, A.jsxs)(`p`, {
        className: `text-center text-sm text-muted-foreground`,
        children: [
          `Don't have an account?`,
          ` `,
          (0, A.jsx)(i, {
            to: `/register`,
            className: `font-medium text-foreground underline-offset-4 hover:underline`,
            children: `Sign up now`,
          }),
        ],
      }),
    ],
  });
}
function M() {
  return [
    { title: `Sign In — MiniBooking` },
    { name: `description`, content: `Sign in to your MiniBooking account` },
  ];
}
function N() {
  return (0, A.jsx)(g, {
    title: `Welcome Back`,
    description: `Sign in to your account to continue`,
    children: (0, A.jsx)(j, {}),
  });
}
export { N as default, M as meta };
