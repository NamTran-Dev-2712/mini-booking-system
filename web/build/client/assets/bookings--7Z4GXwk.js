import { t as e } from "./jsx-runtime-D0R9s8hK.js";
import { M as t } from "./chunk-5KNZJZUH-C906xdEM.js";
import { t as n } from "./calendar-check-036uFykA.js";
var r = e();
function i() {
  return [{ title: `My Bookings — MiniBooking` }];
}
var a = t(function () {
  return (0, r.jsxs)(`div`, {
    className: `space-y-6`,
    children: [
      (0, r.jsxs)(`div`, {
        children: [
          (0, r.jsx)(`h2`, {
            className: `text-2xl font-semibold tracking-tight`,
            children: `My Bookings`,
          }),
          (0, r.jsx)(`p`, {
            className: `text-muted-foreground`,
            children: `View and manage your mentoring sessions.`,
          }),
        ],
      }),
      (0, r.jsxs)(`div`, {
        className: `flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center`,
        children: [
          (0, r.jsx)(n, { className: `mb-4 size-10 text-muted-foreground/50` }),
          (0, r.jsx)(`p`, {
            className: `text-sm font-medium text-muted-foreground`,
            children: `No bookings yet`,
          }),
          (0, r.jsx)(`p`, {
            className: `mt-1 text-xs text-muted-foreground/70`,
            children: `Book a session with a mentor to get started.`,
          }),
        ],
      }),
    ],
  });
});
export { a as default, i as meta };
