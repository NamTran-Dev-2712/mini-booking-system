import { t as e } from "./jsx-runtime-D0R9s8hK.js";
import { M as t } from "./chunk-5KNZJZUH-C906xdEM.js";
import { t as n } from "./createLucideIcon-CcmGBDAZ.js";
import { t as r } from "./activity-DpAHtI9C.js";
var i = n(`circle-check-big`, [
    [`path`, { d: `M21.801 10A10 10 0 1 1 17 3.335`, key: `yps3ct` }],
    [`path`, { d: `m9 11 3 3L22 4`, key: `1pflzl` }],
  ]),
  a = e();
function o() {
  return [{ title: `System Health — Admin | MiniBooking` }];
}
var s = t(function () {
  return (0, a.jsxs)(`div`, {
    className: `space-y-6`,
    children: [
      (0, a.jsxs)(`div`, {
        children: [
          (0, a.jsx)(`h2`, {
            className: `text-2xl font-semibold tracking-tight`,
            children: `System Health`,
          }),
          (0, a.jsx)(`p`, {
            className: `text-muted-foreground`,
            children: `Monitor API status and service health.`,
          }),
        ],
      }),
      (0, a.jsx)(`div`, {
        className: `rounded-xl border bg-card p-6 shadow-sm`,
        children: (0, a.jsxs)(`div`, {
          className: `flex items-center gap-3`,
          children: [
            (0, a.jsx)(r, { className: `size-5 text-muted-foreground` }),
            (0, a.jsx)(`span`, {
              className: `text-sm font-medium`,
              children: `API Status`,
            }),
            (0, a.jsxs)(`div`, {
              className: `ml-auto flex items-center gap-1.5 text-sm font-medium text-emerald-600`,
              children: [(0, a.jsx)(i, { className: `size-4` }), `Operational`],
            }),
          ],
        }),
      }),
    ],
  });
});
export { s as default, o as meta };
