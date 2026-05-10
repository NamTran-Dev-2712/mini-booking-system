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
import { t as w } from "./button-DXwXqNSz.js";
var T = e(t(), 1),
  E = S({
    fullName: _()
      .min(1, `Full name is required`)
      .min(2, `Full name must be at least 2 characters`),
    email: _().min(1, `Email is required`).email(`Invalid email address`),
    phoneNumber: _()
      .min(1, `Phone number is required`)
      .regex(
        /^(0|\+84)(3[2-9]|5[25689]|7[06789]|8[1-9]|9[0-9])\d{7}$/,
        `Phone number must be a valid Vietnamese phone number`,
      ),
    password: _()
      .min(1, `Password is required`)
      .min(8, `Password must be at least 8 characters`)
      .regex(/[A-Z]/, `Password must contain at least one uppercase letter`)
      .regex(/[a-z]/, `Password must contain at least one lowercase letter`)
      .regex(/[0-9]/, `Password must contain at least one number`)
      .regex(
        /[^a-zA-Z0-9]/,
        `Password must contain at least one special character`,
      ),
    confirmPassword: _().min(1, `Password confirmation is required`),
  }).refine((e) => e.password === e.confirmPassword, {
    message: `Passwords do not match`,
    path: [`confirmPassword`],
  });
function D() {
  let e = r(),
    t = g({
      resolver: c(E),
      defaultValues: {
        fullName: ``,
        email: ``,
        phoneNumber: ``,
        password: ``,
        confirmPassword: ``,
      },
    });
  async function n(t) {
    try {
      (await b.register({
        fullName: t.fullName,
        email: t.email,
        password: t.password,
        phoneNumber: t.phoneNumber,
      }),
        a.success(`Account created successfully! Please sign in.`),
        e(`/login`));
    } catch (e) {
      a.error(m(e));
    }
  }
  return { form: t, onSubmit: t.handleSubmit(n) };
}
var O = n();
function k() {
  let { form: e, onSubmit: t } = D(),
    [n, r] = (0, T.useState)(!1),
    [a, c] = (0, T.useState)(!1),
    p = e.formState.isSubmitting;
  return (0, O.jsxs)(`div`, {
    className: `space-y-6`,
    children: [
      (0, O.jsx)(l, {
        ...e,
        children: (0, O.jsxs)(`form`, {
          onSubmit: t,
          className: `space-y-4`,
          children: [
            (0, O.jsx)(C, {
              control: e.control,
              name: `fullName`,
              render: ({ field: e }) =>
                (0, O.jsxs)(u, {
                  children: [
                    (0, O.jsx)(d, { children: `Full Name` }),
                    (0, O.jsx)(h, {
                      children: (0, O.jsx)(x, {
                        placeholder: `John Doe`,
                        autoComplete: `name`,
                        ...e,
                      }),
                    }),
                    (0, O.jsx)(y, {}),
                  ],
                }),
            }),
            (0, O.jsx)(C, {
              control: e.control,
              name: `email`,
              render: ({ field: e }) =>
                (0, O.jsxs)(u, {
                  children: [
                    (0, O.jsx)(d, { children: `Email` }),
                    (0, O.jsx)(h, {
                      children: (0, O.jsx)(x, {
                        type: `email`,
                        placeholder: `you@example.com`,
                        autoComplete: `email`,
                        ...e,
                      }),
                    }),
                    (0, O.jsx)(y, {}),
                  ],
                }),
            }),
            (0, O.jsx)(C, {
              control: e.control,
              name: `phoneNumber`,
              render: ({ field: e }) =>
                (0, O.jsxs)(u, {
                  children: [
                    (0, O.jsx)(d, { children: `Phone Number` }),
                    (0, O.jsx)(h, {
                      children: (0, O.jsx)(x, {
                        type: `tel`,
                        placeholder: `0912 345 678`,
                        autoComplete: `tel`,
                        ...e,
                      }),
                    }),
                    (0, O.jsx)(y, {}),
                  ],
                }),
            }),
            (0, O.jsx)(C, {
              control: e.control,
              name: `password`,
              render: ({ field: e }) =>
                (0, O.jsxs)(u, {
                  children: [
                    (0, O.jsx)(d, { children: `Password` }),
                    (0, O.jsx)(h, {
                      children: (0, O.jsxs)(`div`, {
                        className: `relative`,
                        children: [
                          (0, O.jsx)(x, {
                            type: n ? `text` : `password`,
                            placeholder: `At least 8 characters`,
                            autoComplete: `new-password`,
                            ...e,
                          }),
                          (0, O.jsx)(`button`, {
                            type: `button`,
                            onClick: () => r((e) => !e),
                            className: `absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors`,
                            "aria-label": n ? `Hide password` : `Show password`,
                            children: n
                              ? (0, O.jsx)(s, { className: `size-4` })
                              : (0, O.jsx)(f, { className: `size-4` }),
                          }),
                        ],
                      }),
                    }),
                    (0, O.jsx)(y, {}),
                  ],
                }),
            }),
            (0, O.jsx)(C, {
              control: e.control,
              name: `confirmPassword`,
              render: ({ field: e }) =>
                (0, O.jsxs)(u, {
                  children: [
                    (0, O.jsx)(d, { children: `Confirm Password` }),
                    (0, O.jsx)(h, {
                      children: (0, O.jsxs)(`div`, {
                        className: `relative`,
                        children: [
                          (0, O.jsx)(x, {
                            type: a ? `text` : `password`,
                            placeholder: `Re-enter password`,
                            autoComplete: `new-password`,
                            ...e,
                          }),
                          (0, O.jsx)(`button`, {
                            type: `button`,
                            onClick: () => c((e) => !e),
                            className: `absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors`,
                            "aria-label": a ? `Hide password` : `Show password`,
                            children: a
                              ? (0, O.jsx)(s, { className: `size-4` })
                              : (0, O.jsx)(f, { className: `size-4` }),
                          }),
                        ],
                      }),
                    }),
                    (0, O.jsx)(y, {}),
                  ],
                }),
            }),
            (0, O.jsxs)(w, {
              type: `submit`,
              className: `w-full mt-2`,
              disabled: p,
              children: [
                p && (0, O.jsx)(o, { className: `mr-2 size-4 animate-spin` }),
                `Create Account`,
              ],
            }),
          ],
        }),
      }),
      (0, O.jsx)(v, { action: `register` }),
      (0, O.jsxs)(`p`, {
        className: `text-center text-sm text-muted-foreground`,
        children: [
          `Already have an account?`,
          ` `,
          (0, O.jsx)(i, {
            to: `/login`,
            className: `font-medium text-foreground underline-offset-4 hover:underline`,
            children: `Sign in`,
          }),
        ],
      }),
      (0, O.jsxs)(`p`, {
        className: `text-center text-xs text-muted-foreground`,
        children: [
          `By signing up, you agree to our`,
          ` `,
          (0, O.jsx)(`span`, {
            className: `underline underline-offset-4 cursor-pointer hover:text-foreground transition-colors`,
            children: `Terms of Service`,
          }),
          ` `,
          `and`,
          ` `,
          (0, O.jsx)(`span`, {
            className: `underline underline-offset-4 cursor-pointer hover:text-foreground transition-colors`,
            children: `Privacy Policy`,
          }),
          `.`,
        ],
      }),
    ],
  });
}
function A() {
  return [
    { title: `Sign Up — MiniBooking` },
    { name: `description`, content: `Create your free MiniBooking account` },
  ];
}
function j() {
  return (0, O.jsx)(p, {
    title: `Create Account`,
    description: `Start your mentorship journey completely free`,
    children: (0, O.jsx)(k, {}),
  });
}
export { j as default, A as meta };
