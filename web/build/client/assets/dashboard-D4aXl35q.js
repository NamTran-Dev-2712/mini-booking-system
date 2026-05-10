import { t as e } from "./jsx-runtime-D0R9s8hK.js";
import { M as t } from "./chunk-5KNZJZUH-C906xdEM.js";
import { t as n } from "./use-auth-B44xwUsB.js";
var r = e();
function i() {
  return [{ title: `Dashboard — MiniBooking` }];
}
var a = t(function () {
  return (0, r.jsxs)(`div`, {
    className: `space-y-6`,
    children: [
      (0, r.jsxs)(`div`, {
        children: [
          (0, r.jsxs)(`h2`, {
            className: `text-2xl font-semibold tracking-tight`,
            children: [`Welcome back, `, n()?.fullName, ` 👋`],
          }),
          (0, r.jsx)(`p`, {
            className: `text-muted-foreground`,
            children: `Here's what's happening with your sessions.`,
          }),
        ],
      }),
      (0, r.jsx)(`div`, {
        className: `grid gap-4 sm:grid-cols-2 lg:grid-cols-3`,
        children: [
          { label: `Upcoming Bookings`, value: `—` },
          { label: `Sessions Completed`, value: `—` },
          { label: `Active Mentors`, value: `—` },
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
