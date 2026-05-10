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
import { t as S } from "./button-DwAmr52O.js";
import { t as C } from "./auth.service-Bdt1FuOd.js";
import { t as w } from "./api-error-wP_70dsA.js";
var T = e(t(), 1),
  E = y({
    fullName: m()
      .min(1, `Full name is required`)
      .min(2, `Full name must be at least 2 characters`),
    email: m().min(1, `Email is required`).email(`Invalid email address`),
    phoneNumber: m()
      .min(1, `Phone number is required`)
      .regex(
        /^(0|\+84)(3[2-9]|5[25689]|7[06789]|8[1-9]|9[0-9])\d{7}$/,
        `Phone number must be a valid Vietnamese phone number`,
      ),
    password: m()
      .min(1, `Password is required`)
      .min(8, `Password must be at least 8 characters`)
      .regex(/[A-Z]/, `Password must contain at least one uppercase letter`)
      .regex(/[a-z]/, `Password must contain at least one lowercase letter`)
      .regex(/[0-9]/, `Password must contain at least one number`)
      .regex(
        /[^a-zA-Z0-9]/,
        `Password must contain at least one special character`,
      ),
    confirmPassword: m().min(1, `Password confirmation is required`),
  }).refine((e) => e.password === e.confirmPassword, {
    message: `Passwords do not match`,
    path: [`confirmPassword`],
  });
function D() {
  let e = r(),
    t = l({
      resolver: _(E),
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
      (await C.register({
        fullName: t.fullName,
        email: t.email,
        password: t.password,
        phoneNumber: t.phoneNumber,
      }),
        a.success(`Account created successfully! Please sign in.`),
        e(`/login`));
    } catch (e) {
      a.error(w(e));
    }
  }
  return { form: t, onSubmit: t.handleSubmit(n) };
}
var O = n();
function k() {
  let { form: e, onSubmit: t } = D(),
    [n, r] = (0, T.useState)(!1),
    [a, l] = (0, T.useState)(!1),
    m = e.formState.isSubmitting;
  return (0, O.jsxs)(`div`, {
    className: `space-y-6`,
    children: [
      (0, O.jsx)(h, {
        ...e,
        children: (0, O.jsxs)(`form`, {
          onSubmit: t,
          className: `space-y-4`,
          children: [
            (0, O.jsx)(s, {
              control: e.control,
              name: `fullName`,
              render: ({ field: e }) =>
                (0, O.jsxs)(f, {
                  children: [
                    (0, O.jsx)(b, { children: `Full Name` }),
                    (0, O.jsx)(v, {
                      children: (0, O.jsx)(o, {
                        placeholder: `John Doe`,
                        autoComplete: `name`,
                        ...e,
                      }),
                    }),
                    (0, O.jsx)(c, {}),
                  ],
                }),
            }),
            (0, O.jsx)(s, {
              control: e.control,
              name: `email`,
              render: ({ field: e }) =>
                (0, O.jsxs)(f, {
                  children: [
                    (0, O.jsx)(b, { children: `Email` }),
                    (0, O.jsx)(v, {
                      children: (0, O.jsx)(o, {
                        type: `email`,
                        placeholder: `you@example.com`,
                        autoComplete: `email`,
                        ...e,
                      }),
                    }),
                    (0, O.jsx)(c, {}),
                  ],
                }),
            }),
            (0, O.jsx)(s, {
              control: e.control,
              name: `phoneNumber`,
              render: ({ field: e }) =>
                (0, O.jsxs)(f, {
                  children: [
                    (0, O.jsx)(b, { children: `Phone Number` }),
                    (0, O.jsx)(v, {
                      children: (0, O.jsx)(o, {
                        type: `tel`,
                        placeholder: `0912 345 678`,
                        autoComplete: `tel`,
                        ...e,
                      }),
                    }),
                    (0, O.jsx)(c, {}),
                  ],
                }),
            }),
            (0, O.jsx)(s, {
              control: e.control,
              name: `password`,
              render: ({ field: e }) =>
                (0, O.jsxs)(f, {
                  children: [
                    (0, O.jsx)(b, { children: `Password` }),
                    (0, O.jsx)(v, {
                      children: (0, O.jsxs)(`div`, {
                        className: `relative`,
                        children: [
                          (0, O.jsx)(o, {
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
                              ? (0, O.jsx)(u, { className: `size-4` })
                              : (0, O.jsx)(p, { className: `size-4` }),
                          }),
                        ],
                      }),
                    }),
                    (0, O.jsx)(c, {}),
                  ],
                }),
            }),
            (0, O.jsx)(s, {
              control: e.control,
              name: `confirmPassword`,
              render: ({ field: e }) =>
                (0, O.jsxs)(f, {
                  children: [
                    (0, O.jsx)(b, { children: `Confirm Password` }),
                    (0, O.jsx)(v, {
                      children: (0, O.jsxs)(`div`, {
                        className: `relative`,
                        children: [
                          (0, O.jsx)(o, {
                            type: a ? `text` : `password`,
                            placeholder: `Re-enter password`,
                            autoComplete: `new-password`,
                            ...e,
                          }),
                          (0, O.jsx)(`button`, {
                            type: `button`,
                            onClick: () => l((e) => !e),
                            className: `absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors`,
                            "aria-label": a ? `Hide password` : `Show password`,
                            children: a
                              ? (0, O.jsx)(u, { className: `size-4` })
                              : (0, O.jsx)(p, { className: `size-4` }),
                          }),
                        ],
                      }),
                    }),
                    (0, O.jsx)(c, {}),
                  ],
                }),
            }),
            (0, O.jsxs)(S, {
              type: `submit`,
              className: `w-full mt-2`,
              disabled: m,
              children: [
                m && (0, O.jsx)(x, { className: `mr-2 size-4 animate-spin` }),
                `Create Account`,
              ],
            }),
          ],
        }),
      }),
      (0, O.jsx)(d, { action: `register` }),
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
  return (0, O.jsx)(g, {
    title: `Create Account`,
    description: `Start your mentorship journey completely free`,
    children: (0, O.jsx)(k, {}),
  });
}
export { j as default, A as meta };
