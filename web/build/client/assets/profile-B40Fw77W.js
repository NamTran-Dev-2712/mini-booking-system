import { t as e } from "./jsx-runtime-D0R9s8hK.js";
import { M as t } from "./chunk-5KNZJZUH-C906xdEM.js";
import { t as n } from "./circle-user-BYgSlSbd.js";
import { t as r } from "./use-auth-B44xwUsB.js";
var i = e();
function a() {
  return [{ title: `Profile — MiniBooking` }];
}
var o = t(function () {
  let e = r();
  return (0, i.jsxs)(`div`, {
    className: `space-y-6`,
    children: [
      (0, i.jsxs)(`div`, {
        children: [
          (0, i.jsx)(`h2`, {
            className: `text-2xl font-semibold tracking-tight`,
            children: `Profile`,
          }),
          (0, i.jsx)(`p`, {
            className: `text-muted-foreground`,
            children: `Manage your personal information.`,
          }),
        ],
      }),
      (0, i.jsx)(`div`, {
        className: `rounded-xl border bg-card p-6 shadow-sm`,
        children: (0, i.jsxs)(`div`, {
          className: `flex items-center gap-4`,
          children: [
            (0, i.jsx)(`div`, {
              className: `flex size-16 items-center justify-center rounded-full bg-primary/10`,
              children: (0, i.jsx)(n, { className: `size-8 text-primary` }),
            }),
            (0, i.jsxs)(`div`, {
              children: [
                (0, i.jsx)(`p`, {
                  className: `text-lg font-semibold`,
                  children: e?.fullName,
                }),
                (0, i.jsx)(`p`, {
                  className: `text-sm text-muted-foreground`,
                  children: e?.email,
                }),
                (0, i.jsx)(`p`, {
                  className: `text-sm text-muted-foreground`,
                  children: e?.phoneNumber,
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
});
export { o as default, a as meta };
