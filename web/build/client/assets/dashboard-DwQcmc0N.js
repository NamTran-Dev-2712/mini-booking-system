import { t as e } from "./jsx-runtime-D0R9s8hK.js";
import { M as t } from "./chunk-5KNZJZUH-C906xdEM.js";
import { t as n } from "./use-auth-B44xwUsB.js";
var r = e();
function i() {
  return [{ title: `Mentor Dashboard — MiniBooking` }];
}
var a = t(function () {
  return (0, r.jsxs)(`div`, {
    className: `space-y-6`,
    children: [
      (0, r.jsxs)(`div`, {
        children: [
          (0, r.jsxs)(`h2`, {
            className: `text-2xl font-semibold tracking-tight`,
            children: [`Welcome, `, n()?.fullName, ` 👋`],
          }),
          (0, r.jsx)(`p`, {
            className: `text-muted-foreground`,
            children: `Manage your sessions and availability.`,
          }),
        ],
      }),
      (0, r.jsx)(`div`, {
        className: `grid gap-4 sm:grid-cols-2 lg:grid-cols-3`,
        children: [
          { label: `Upcoming Sessions`, value: `—` },
          { label: `Sessions This Month`, value: `—` },
          { label: `Total Students`, value: `—` },
        ].map((e) =>
          (0, r.jsxs)(
            `div`,
            {
              className: `rounded-xl border bg-card p-6 shadow-sm`,
              children: [
                (0, r.jsx)(`p`, {
                  className: `text-sm text-muted-foreground`,
                  children: e.label,
                }),
                (0, r.jsx)(`p`, {
                  className: `mt-1 text-3xl font-bold`,
                  children: e.value,
                }),
              ],
            },
            e.label,
          ),
        ),
      }),
    ],
  });
});
export { a as default, i as meta };
