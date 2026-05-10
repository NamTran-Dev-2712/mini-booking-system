import { t as e } from "./jsx-runtime-D0R9s8hK.js";
import { M as t, r as n } from "./chunk-5KNZJZUH-C906xdEM.js";
import { t as r } from "./createLucideIcon-CcmGBDAZ.js";
import { t as i } from "./button-DwAmr52O.js";
var a = r(`shield-x`, [
    [
      `path`,
      {
        d: `M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z`,
        key: `oel41y`,
      },
    ],
    [`path`, { d: `m14.5 9.5-5 5`, key: `17q4r4` }],
    [`path`, { d: `m9.5 9.5 5 5`, key: `18nt4w` }],
  ]),
  o = e();
function s() {
  return [{ title: `Unauthorized — MiniBooking` }];
}
var c = t(function () {
  return (0, o.jsx)(`div`, {
    className: `flex min-h-screen items-center justify-center bg-background p-4`,
    children: (0, o.jsxs)(`div`, {
      className: `w-full max-w-md space-y-6 text-center`,
      children: [
        (0, o.jsx)(`div`, {
          className: `flex justify-center`,
          children: (0, o.jsx)(`div`, {
            className: `flex size-20 items-center justify-center rounded-full bg-destructive/10`,
            children: (0, o.jsx)(a, { className: `size-10 text-destructive` }),
          }),
        }),
        (0, o.jsxs)(`div`, {
          className: `space-y-2`,
          children: [
            (0, o.jsx)(`h1`, {
              className: `text-2xl font-semibold tracking-tight`,
              children: `Access Denied`,
            }),
            (0, o.jsx)(`p`, {
              className: `text-muted-foreground`,
              children: `You don't have permission to view this page. Please contact an administrator if you believe this is a mistake.`,
            }),
          ],
        }),
        (0, o.jsxs)(`div`, {
          className: `flex flex-col gap-2 sm:flex-row sm:justify-center`,
          children: [
            (0, o.jsx)(i, {
              asChild: !0,
              variant: `default`,
              children: (0, o.jsx)(n, { to: `/`, children: `Go Home` }),
            }),
            (0, o.jsx)(i, {
              asChild: !0,
              variant: `outline`,
              children: (0, o.jsx)(n, { to: `/login`, children: `Sign In` }),
            }),
          ],
        }),
      ],
    }),
  });
});
export { c as default, s as meta };
