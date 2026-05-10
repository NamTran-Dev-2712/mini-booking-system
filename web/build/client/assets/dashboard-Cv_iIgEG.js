import { t as e } from "./jsx-runtime-D0R9s8hK.js";
import { M as t } from "./chunk-5KNZJZUH-C906xdEM.js";
var n = e();
function r() {
  return [{ title: `Admin Dashboard — MiniBooking` }];
}
var i = t(function () {
  return (0, n.jsxs)(`div`, {
    className: `space-y-6`,
    children: [
      (0, n.jsxs)(`div`, {
        children: [
          (0, n.jsx)(`h2`, {
            className: `text-2xl font-semibold tracking-tight`,
            children: `Dashboard`,
          }),
          (0, n.jsx)(`p`, {
            className: `text-muted-foreground`,
            children: `System overview and key metrics.`,
          }),
        ],
      }),
      (0, n.jsx)(`div`, {
        className: `grid gap-4 sm:grid-cols-2 lg:grid-cols-4`,
        children: [
          { label: `Total Users`, value: `—` },
          { label: `Total Mentors`, value: `—` },
          { label: `Bookings Today`, value: `—` },
          { label: `Revenue This Month`, value: `—` },
        ].map((e) =>
          (0, n.jsxs)(
            `div`,
            {
              className: `rounded-xl border bg-card p-6 shadow-sm`,
              children: [
                (0, n.jsx)(`p`, {
                  className: `text-sm text-muted-foreground`,
                  children: e.label,
                }),
                (0, n.jsx)(`p`, {
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
export { i as default, r as meta };
