import { t as e } from "./jsx-runtime-D0R9s8hK.js";
import { M as t } from "./chunk-5KNZJZUH-C906xdEM.js";
import { t as n } from "./calendar-days-CVX6VkNj.js";
var r = e();
function i() {
  return [{ title: `My Schedule — MiniBooking` }];
}
var a = t(function () {
  return (0, r.jsxs)(`div`, {
    className: `space-y-6`,
    children: [
      (0, r.jsxs)(`div`, {
        children: [
          (0, r.jsx)(`h2`, {
            className: `text-2xl font-semibold tracking-tight`,
            children: `My Schedule`,
          }),
          (0, r.jsx)(`p`, {
            className: `text-muted-foreground`,
            children: `Manage your available time slots.`,
          }),
        ],
      }),
      (0, r.jsxs)(`div`, {
        className: `flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center`,
        children: [
          (0, r.jsx)(n, { className: `mb-4 size-10 text-muted-foreground/50` }),
          (0, r.jsx)(`p`, {
            className: `text-sm font-medium text-muted-foreground`,
            children: `Schedule management coming soon`,
          }),
        ],
      }),
    ],
  });
});
export { a as default, i as meta };
