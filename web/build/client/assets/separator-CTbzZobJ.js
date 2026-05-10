import { a as e, n as t, t as n } from "./jsx-runtime-D0R9s8hK.js";
import { t as r } from "./react-dom-CuViyZo3.js";
import { i, n as a } from "./dist-U9yTH5Ng.js";
var o = e(t(), 1),
  s = e(r(), 1),
  c = n(),
  l = [
    `a`,
    `button`,
    `div`,
    `form`,
    `h2`,
    `h3`,
    `img`,
    `input`,
    `label`,
    `li`,
    `nav`,
    `ol`,
    `p`,
    `select`,
    `span`,
    `svg`,
    `ul`,
  ].reduce((e, t) => {
    let n = i(`Primitive.${t}`),
      r = o.forwardRef((e, r) => {
        let { asChild: i, ...a } = e,
          o = i ? n : t;
        return (
          typeof window < `u` && (window[Symbol.for(`radix-ui`)] = !0),
          (0, c.jsx)(o, { ...a, ref: r })
        );
      });
    return ((r.displayName = `Primitive.${t}`), { ...e, [t]: r });
  }, {});
function u(e, t) {
  e && s.flushSync(() => e.dispatchEvent(t));
}
var d = `Separator`,
  f = `horizontal`,
  p = [`horizontal`, `vertical`],
  m = o.forwardRef((e, t) => {
    let { decorative: n, orientation: r = f, ...i } = e,
      a = h(r) ? r : f,
      o = n
        ? { role: `none` }
        : {
            "aria-orientation": a === `vertical` ? a : void 0,
            role: `separator`,
          };
    return (0, c.jsx)(l.div, { "data-orientation": a, ...o, ...i, ref: t });
  });
m.displayName = d;
function h(e) {
  return p.includes(e);
}
var g = m;
function _({
  className: e,
  orientation: t = `horizontal`,
  decorative: n = !0,
  ...r
}) {
  return (0, c.jsx)(g, {
    "data-slot": `separator`,
    decorative: n,
    orientation: t,
    className: a(
      `shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch`,
      e,
    ),
    ...r,
  });
}
export { l as n, u as r, _ as t };
