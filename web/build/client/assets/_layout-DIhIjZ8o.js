import { a as e, n as t, t as n } from "./jsx-runtime-CAzG7qJ5.js";
import { t as r } from "./react-dom-dMens3Cl.js";
import { c as i, k as a, r as o, s } from "./chunk-5KNZJZUH-D0Qj9TTb.js";
import { t as c } from "./createLucideIcon-DIem-QJH.js";
import { t as l } from "./calendar-days-BOHnMUrY.js";
import {
  i as u,
  n as d,
  o as f,
  r as p,
  s as m,
  t as h,
} from "./separator-8f2NwZMe.js";
import { i as g, n as _, r as v, t as y } from "./dist-D9HvU-dc.js";
import { t as b } from "./button-DXwXqNSz.js";
var x = c(`menu`, [
    [`path`, { d: `M4 5h16`, key: `1tepv9` }],
    [`path`, { d: `M4 12h16`, key: `1lakjw` }],
    [`path`, { d: `M4 19h16`, key: `1djgab` }],
  ]),
  S = c(`x`, [
    [`path`, { d: `M18 6 6 18`, key: `1bl5f8` }],
    [`path`, { d: `m6 6 12 12`, key: `d8bk6v` }],
  ]);
typeof window < `u` && window.document && window.document.createElement;
function C(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function (r) {
    if ((e?.(r), n === !1 || !r.defaultPrevented)) return t?.(r);
  };
}
var w = e(t(), 1),
  ee = w.useInsertionEffect || _;
function te({ prop: e, defaultProp: t, onChange: n = () => {}, caller: r }) {
  let [i, a, o] = ne({ defaultProp: t, onChange: n }),
    s = e !== void 0,
    c = s ? e : i;
  {
    let t = w.useRef(e !== void 0);
    w.useEffect(() => {
      let e = t.current;
      (e !== s &&
        console.warn(
          `${r} is changing from ${e ? `controlled` : `uncontrolled`} to ${s ? `controlled` : `uncontrolled`}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
        ),
        (t.current = s));
    }, [s, r]);
  }
  return [
    c,
    w.useCallback(
      (t) => {
        if (s) {
          let n = re(t) ? t(e) : t;
          n !== e && o.current?.(n);
        } else a(t);
      },
      [s, e, a, o],
    ),
  ];
}
function ne({ defaultProp: e, onChange: t }) {
  let [n, r] = w.useState(e),
    i = w.useRef(n),
    a = w.useRef(t);
  return (
    ee(() => {
      a.current = t;
    }, [t]),
    w.useEffect(() => {
      i.current !== n && (a.current?.(n), (i.current = n));
    }, [n, i]),
    [n, r, a]
  );
}
function re(e) {
  return typeof e == `function`;
}
function ie(e, t) {
  return w.useReducer((e, n) => t[e][n] ?? e, e);
}
var T = (e) => {
  let { present: t, children: n } = e,
    r = ae(t),
    i =
      typeof n == `function` ? n({ present: r.isPresent }) : w.Children.only(n),
    a = m(r.ref, oe(i));
  return typeof n == `function` || r.isPresent
    ? w.cloneElement(i, { ref: a })
    : null;
};
T.displayName = `Presence`;
function ae(e) {
  let [t, n] = w.useState(),
    r = w.useRef(null),
    i = w.useRef(e),
    a = w.useRef(`none`),
    [o, s] = ie(e ? `mounted` : `unmounted`, {
      mounted: { UNMOUNT: `unmounted`, ANIMATION_OUT: `unmountSuspended` },
      unmountSuspended: { MOUNT: `mounted`, ANIMATION_END: `unmounted` },
      unmounted: { MOUNT: `mounted` },
    });
  return (
    w.useEffect(() => {
      let e = E(r.current);
      a.current = o === `mounted` ? e : `none`;
    }, [o]),
    _(() => {
      let t = r.current,
        n = i.current;
      if (n !== e) {
        let r = a.current,
          o = E(t);
        (e
          ? s(`MOUNT`)
          : o === `none` || t?.display === `none`
            ? s(`UNMOUNT`)
            : s(n && r !== o ? `ANIMATION_OUT` : `UNMOUNT`),
          (i.current = e));
      }
    }, [e, s]),
    _(() => {
      if (t) {
        let e,
          n = t.ownerDocument.defaultView ?? window,
          o = (a) => {
            let o = E(r.current).includes(CSS.escape(a.animationName));
            if (a.target === t && o && (s(`ANIMATION_END`), !i.current)) {
              let r = t.style.animationFillMode;
              ((t.style.animationFillMode = `forwards`),
                (e = n.setTimeout(() => {
                  t.style.animationFillMode === `forwards` &&
                    (t.style.animationFillMode = r);
                })));
            }
          },
          c = (e) => {
            e.target === t && (a.current = E(r.current));
          };
        return (
          t.addEventListener(`animationstart`, c),
          t.addEventListener(`animationcancel`, o),
          t.addEventListener(`animationend`, o),
          () => {
            (n.clearTimeout(e),
              t.removeEventListener(`animationstart`, c),
              t.removeEventListener(`animationcancel`, o),
              t.removeEventListener(`animationend`, o));
          }
        );
      } else s(`ANIMATION_END`);
    }, [t, s]),
    {
      isPresent: [`mounted`, `unmountSuspended`].includes(o),
      ref: w.useCallback((e) => {
        ((r.current = e ? getComputedStyle(e) : null), n(e));
      }, []),
    }
  );
}
function E(e) {
  return e?.animationName || `none`;
}
function oe(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, `ref`)?.get,
    n = t && `isReactWarning` in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, `ref`)?.get),
      (n = t && `isReactWarning` in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
var se = w.useId || (() => void 0),
  ce = 0;
function D(e) {
  let [t, n] = w.useState(se());
  return (
    _(() => {
      e || n((e) => e ?? String(ce++));
    }, [e]),
    e || (t ? `radix-${t}` : ``)
  );
}
function le(e, t = globalThis?.document) {
  let n = y(e);
  w.useEffect(() => {
    let e = (e) => {
      e.key === `Escape` && n(e);
    };
    return (
      t.addEventListener(`keydown`, e, { capture: !0 }),
      () => t.removeEventListener(`keydown`, e, { capture: !0 })
    );
  }, [n, t]);
}
var O = n(),
  ue = `DismissableLayer`,
  k = `dismissableLayer.update`,
  de = `dismissableLayer.pointerDownOutside`,
  fe = `dismissableLayer.focusOutside`,
  pe,
  me = w.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  he = w.forwardRef((e, t) => {
    let {
        disableOutsidePointerEvents: n = !1,
        onEscapeKeyDown: r,
        onPointerDownOutside: i,
        onFocusOutside: a,
        onInteractOutside: o,
        onDismiss: s,
        ...c
      } = e,
      l = w.useContext(me),
      [u, d] = w.useState(null),
      f = u?.ownerDocument ?? globalThis?.document,
      [, h] = w.useState({}),
      g = m(t, (e) => d(e)),
      _ = Array.from(l.layers),
      [v] = [...l.layersWithOutsidePointerEventsDisabled].slice(-1),
      y = _.indexOf(v),
      b = u ? _.indexOf(u) : -1,
      x = l.layersWithOutsidePointerEventsDisabled.size > 0,
      S = b >= y,
      ee = ve((e) => {
        let t = e.target,
          n = [...l.branches].some((e) => e.contains(t));
        !S || n || (i?.(e), o?.(e), e.defaultPrevented || s?.());
      }, f),
      te = ye((e) => {
        let t = e.target;
        [...l.branches].some((e) => e.contains(t)) ||
          (a?.(e), o?.(e), e.defaultPrevented || s?.());
      }, f);
    return (
      le((e) => {
        b === l.layers.size - 1 &&
          (r?.(e), !e.defaultPrevented && s && (e.preventDefault(), s()));
      }, f),
      w.useEffect(() => {
        if (u)
          return (
            n &&
              (l.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((pe = f.body.style.pointerEvents),
                (f.body.style.pointerEvents = `none`)),
              l.layersWithOutsidePointerEventsDisabled.add(u)),
            l.layers.add(u),
            be(),
            () => {
              n &&
                l.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (f.body.style.pointerEvents = pe);
            }
          );
      }, [u, f, n, l]),
      w.useEffect(
        () => () => {
          u &&
            (l.layers.delete(u),
            l.layersWithOutsidePointerEventsDisabled.delete(u),
            be());
        },
        [u, l],
      ),
      w.useEffect(() => {
        let e = () => h({});
        return (
          document.addEventListener(k, e),
          () => document.removeEventListener(k, e)
        );
      }, []),
      (0, O.jsx)(p.div, {
        ...c,
        ref: g,
        style: {
          pointerEvents: x ? (S ? `auto` : `none`) : void 0,
          ...e.style,
        },
        onFocusCapture: C(e.onFocusCapture, te.onFocusCapture),
        onBlurCapture: C(e.onBlurCapture, te.onBlurCapture),
        onPointerDownCapture: C(
          e.onPointerDownCapture,
          ee.onPointerDownCapture,
        ),
      })
    );
  });
he.displayName = ue;
var ge = `DismissableLayerBranch`,
  _e = w.forwardRef((e, t) => {
    let n = w.useContext(me),
      r = w.useRef(null),
      i = m(t, r);
    return (
      w.useEffect(() => {
        let e = r.current;
        if (e)
          return (
            n.branches.add(e),
            () => {
              n.branches.delete(e);
            }
          );
      }, [n.branches]),
      (0, O.jsx)(p.div, { ...e, ref: i })
    );
  });
_e.displayName = ge;
function ve(e, t = globalThis?.document) {
  let n = y(e),
    r = w.useRef(!1),
    i = w.useRef(() => {});
  return (
    w.useEffect(() => {
      let e = (e) => {
          if (e.target && !r.current) {
            let r = function () {
                xe(de, n, a, { discrete: !0 });
              },
              a = { originalEvent: e };
            e.pointerType === `touch`
              ? (t.removeEventListener(`click`, i.current),
                (i.current = r),
                t.addEventListener(`click`, i.current, { once: !0 }))
              : r();
          } else t.removeEventListener(`click`, i.current);
          r.current = !1;
        },
        a = window.setTimeout(() => {
          t.addEventListener(`pointerdown`, e);
        }, 0);
      return () => {
        (window.clearTimeout(a),
          t.removeEventListener(`pointerdown`, e),
          t.removeEventListener(`click`, i.current));
      };
    }, [t, n]),
    { onPointerDownCapture: () => (r.current = !0) }
  );
}
function ye(e, t = globalThis?.document) {
  let n = y(e),
    r = w.useRef(!1);
  return (
    w.useEffect(() => {
      let e = (e) => {
        e.target &&
          !r.current &&
          xe(fe, n, { originalEvent: e }, { discrete: !1 });
      };
      return (
        t.addEventListener(`focusin`, e),
        () => t.removeEventListener(`focusin`, e)
      );
    }, [t, n]),
    {
      onFocusCapture: () => (r.current = !0),
      onBlurCapture: () => (r.current = !1),
    }
  );
}
function be() {
  let e = new CustomEvent(k);
  document.dispatchEvent(e);
}
function xe(e, t, n, { discrete: r }) {
  let i = n.originalEvent.target,
    a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  (t && i.addEventListener(e, t, { once: !0 }),
    r ? u(i, a) : i.dispatchEvent(a));
}
var A = `focusScope.autoFocusOnMount`,
  Se = `focusScope.autoFocusOnUnmount`,
  Ce = { bubbles: !1, cancelable: !0 },
  we = `FocusScope`,
  Te = w.forwardRef((e, t) => {
    let {
        loop: n = !1,
        trapped: r = !1,
        onMountAutoFocus: i,
        onUnmountAutoFocus: a,
        ...o
      } = e,
      [s, c] = w.useState(null),
      l = y(i),
      u = y(a),
      d = w.useRef(null),
      f = m(t, (e) => c(e)),
      h = w.useRef({
        paused: !1,
        pause() {
          this.paused = !0;
        },
        resume() {
          this.paused = !1;
        },
      }).current;
    (w.useEffect(() => {
      if (r) {
        let e = function (e) {
            if (h.paused || !s) return;
            let t = e.target;
            s.contains(t) ? (d.current = t) : j(d.current, { select: !0 });
          },
          t = function (e) {
            if (h.paused || !s) return;
            let t = e.relatedTarget;
            t !== null && (s.contains(t) || j(d.current, { select: !0 }));
          },
          n = function (e) {
            if (document.activeElement === document.body)
              for (let t of e) t.removedNodes.length > 0 && j(s);
          };
        (document.addEventListener(`focusin`, e),
          document.addEventListener(`focusout`, t));
        let r = new MutationObserver(n);
        return (
          s && r.observe(s, { childList: !0, subtree: !0 }),
          () => {
            (document.removeEventListener(`focusin`, e),
              document.removeEventListener(`focusout`, t),
              r.disconnect());
          }
        );
      }
    }, [r, s, h.paused]),
      w.useEffect(() => {
        if (s) {
          Me.add(h);
          let e = document.activeElement;
          if (!s.contains(e)) {
            let t = new CustomEvent(A, Ce);
            (s.addEventListener(A, l),
              s.dispatchEvent(t),
              t.defaultPrevented ||
                (Ee(Fe(Oe(s)), { select: !0 }),
                document.activeElement === e && j(s)));
          }
          return () => {
            (s.removeEventListener(A, l),
              setTimeout(() => {
                let t = new CustomEvent(Se, Ce);
                (s.addEventListener(Se, u),
                  s.dispatchEvent(t),
                  t.defaultPrevented || j(e ?? document.body, { select: !0 }),
                  s.removeEventListener(Se, u),
                  Me.remove(h));
              }, 0));
          };
        }
      }, [s, l, u, h]));
    let g = w.useCallback(
      (e) => {
        if ((!n && !r) || h.paused) return;
        let t = e.key === `Tab` && !e.altKey && !e.ctrlKey && !e.metaKey,
          i = document.activeElement;
        if (t && i) {
          let t = e.currentTarget,
            [r, a] = De(t);
          r && a
            ? !e.shiftKey && i === a
              ? (e.preventDefault(), n && j(r, { select: !0 }))
              : e.shiftKey &&
                i === r &&
                (e.preventDefault(), n && j(a, { select: !0 }))
            : i === t && e.preventDefault();
        }
      },
      [n, r, h.paused],
    );
    return (0, O.jsx)(p.div, { tabIndex: -1, ...o, ref: f, onKeyDown: g });
  });
Te.displayName = we;
function Ee(e, { select: t = !1 } = {}) {
  let n = document.activeElement;
  for (let r of e)
    if ((j(r, { select: t }), document.activeElement !== n)) return;
}
function De(e) {
  let t = Oe(e);
  return [ke(t, e), ke(t.reverse(), e)];
}
function Oe(e) {
  let t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (e) => {
        let t = e.tagName === `INPUT` && e.type === `hidden`;
        return e.disabled || e.hidden || t
          ? NodeFilter.FILTER_SKIP
          : e.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
      },
    });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function ke(e, t) {
  for (let n of e) if (!Ae(n, { upTo: t })) return n;
}
function Ae(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === `hidden`) return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === `none`) return !0;
    e = e.parentElement;
  }
  return !1;
}
function je(e) {
  return e instanceof HTMLInputElement && `select` in e;
}
function j(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    let n = document.activeElement;
    (e.focus({ preventScroll: !0 }), e !== n && je(e) && t && e.select());
  }
}
var Me = Ne();
function Ne() {
  let e = [];
  return {
    add(t) {
      let n = e[0];
      (t !== n && n?.pause(), (e = Pe(e, t)), e.unshift(t));
    },
    remove(t) {
      ((e = Pe(e, t)), e[0]?.resume());
    },
  };
}
function Pe(e, t) {
  let n = [...e],
    r = n.indexOf(t);
  return (r !== -1 && n.splice(r, 1), n);
}
function Fe(e) {
  return e.filter((e) => e.tagName !== `A`);
}
var Ie = e(r(), 1),
  Le = `Portal`,
  Re = w.forwardRef((e, t) => {
    let { container: n, ...r } = e,
      [i, a] = w.useState(!1);
    _(() => a(!0), []);
    let o = n || (i && globalThis?.document?.body);
    return o ? Ie.createPortal((0, O.jsx)(p.div, { ...r, ref: t }), o) : null;
  });
Re.displayName = Le;
var M = 0;
function ze() {
  w.useEffect(() => {
    let e = document.querySelectorAll(`[data-radix-focus-guard]`);
    return (
      document.body.insertAdjacentElement(`afterbegin`, e[0] ?? Be()),
      document.body.insertAdjacentElement(`beforeend`, e[1] ?? Be()),
      M++,
      () => {
        (M === 1 &&
          document
            .querySelectorAll(`[data-radix-focus-guard]`)
            .forEach((e) => e.remove()),
          M--);
      }
    );
  }, []);
}
function Be() {
  let e = document.createElement(`span`);
  return (
    e.setAttribute(`data-radix-focus-guard`, ``),
    (e.tabIndex = 0),
    (e.style.outline = `none`),
    (e.style.opacity = `0`),
    (e.style.position = `fixed`),
    (e.style.pointerEvents = `none`),
    e
  );
}
var N = function () {
  return (
    (N =
      Object.assign ||
      function (e) {
        for (var t, n = 1, r = arguments.length; n < r; n++)
          for (var i in ((t = arguments[n]), t))
            Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e;
      }),
    N.apply(this, arguments)
  );
};
function Ve(e, t) {
  var n = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) &&
      t.indexOf(r) < 0 &&
      (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == `function`)
    for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
      t.indexOf(r[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
        (n[r[i]] = e[r[i]]);
  return n;
}
function He(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = t.length, a; r < i; r++)
      (a || !(r in t)) &&
        ((a ||= Array.prototype.slice.call(t, 0, r)), (a[r] = t[r]));
  return e.concat(a || Array.prototype.slice.call(t));
}
var P = `right-scroll-bar-position`,
  F = `width-before-scroll-bar`,
  Ue = `with-scroll-bars-hidden`,
  We = `--removed-body-scroll-bar-size`;
function I(e, t) {
  return (typeof e == `function` ? e(t) : e && (e.current = t), e);
}
function Ge(e, t) {
  var n = (0, w.useState)(function () {
    return {
      value: e,
      callback: t,
      facade: {
        get current() {
          return n.value;
        },
        set current(e) {
          var t = n.value;
          t !== e && ((n.value = e), n.callback(e, t));
        },
      },
    };
  })[0];
  return ((n.callback = t), n.facade);
}
var Ke = typeof window < `u` ? w.useLayoutEffect : w.useEffect,
  qe = new WeakMap();
function Je(e, t) {
  var n = Ge(t || null, function (t) {
    return e.forEach(function (e) {
      return I(e, t);
    });
  });
  return (
    Ke(
      function () {
        var t = qe.get(n);
        if (t) {
          var r = new Set(t),
            i = new Set(e),
            a = n.current;
          (r.forEach(function (e) {
            i.has(e) || I(e, null);
          }),
            i.forEach(function (e) {
              r.has(e) || I(e, a);
            }));
        }
        qe.set(n, e);
      },
      [e],
    ),
    n
  );
}
function Ye(e) {
  return e;
}
function Xe(e, t) {
  t === void 0 && (t = Ye);
  var n = [],
    r = !1;
  return {
    read: function () {
      if (r)
        throw Error(
          "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.",
        );
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function (e) {
      var i = t(e, r);
      return (
        n.push(i),
        function () {
          n = n.filter(function (e) {
            return e !== i;
          });
        }
      );
    },
    assignSyncMedium: function (e) {
      for (r = !0; n.length; ) {
        var t = n;
        ((n = []), t.forEach(e));
      }
      n = {
        push: function (t) {
          return e(t);
        },
        filter: function () {
          return n;
        },
      };
    },
    assignMedium: function (e) {
      r = !0;
      var t = [];
      if (n.length) {
        var i = n;
        ((n = []), i.forEach(e), (t = n));
      }
      var a = function () {
          var n = t;
          ((t = []), n.forEach(e));
        },
        o = function () {
          return Promise.resolve().then(a);
        };
      (o(),
        (n = {
          push: function (e) {
            (t.push(e), o());
          },
          filter: function (e) {
            return ((t = t.filter(e)), n);
          },
        }));
    },
  };
}
function Ze(e) {
  e === void 0 && (e = {});
  var t = Xe(null);
  return ((t.options = N({ async: !0, ssr: !1 }, e)), t);
}
var Qe = function (e) {
  var t = e.sideCar,
    n = Ve(e, [`sideCar`]);
  if (!t)
    throw Error(
      "Sidecar: please provide `sideCar` property to import the right car",
    );
  var r = t.read();
  if (!r) throw Error(`Sidecar medium not found`);
  return w.createElement(r, N({}, n));
};
Qe.isSideCarExport = !0;
function $e(e, t) {
  return (e.useMedium(t), Qe);
}
var et = Ze(),
  L = function () {},
  R = w.forwardRef(function (e, t) {
    var n = w.useRef(null),
      r = w.useState({
        onScrollCapture: L,
        onWheelCapture: L,
        onTouchMoveCapture: L,
      }),
      i = r[0],
      a = r[1],
      o = e.forwardProps,
      s = e.children,
      c = e.className,
      l = e.removeScrollBar,
      u = e.enabled,
      d = e.shards,
      f = e.sideCar,
      p = e.noRelative,
      m = e.noIsolation,
      h = e.inert,
      g = e.allowPinchZoom,
      _ = e.as,
      v = _ === void 0 ? `div` : _,
      y = e.gapMode,
      b = Ve(e, [
        `forwardProps`,
        `children`,
        `className`,
        `removeScrollBar`,
        `enabled`,
        `shards`,
        `sideCar`,
        `noRelative`,
        `noIsolation`,
        `inert`,
        `allowPinchZoom`,
        `as`,
        `gapMode`,
      ]),
      x = f,
      S = Je([n, t]),
      C = N(N({}, b), i);
    return w.createElement(
      w.Fragment,
      null,
      u &&
        w.createElement(x, {
          sideCar: et,
          removeScrollBar: l,
          shards: d,
          noRelative: p,
          noIsolation: m,
          inert: h,
          setCallbacks: a,
          allowPinchZoom: !!g,
          lockRef: n,
          gapMode: y,
        }),
      o
        ? w.cloneElement(w.Children.only(s), N(N({}, C), { ref: S }))
        : w.createElement(v, N({}, C, { className: c, ref: S }), s),
    );
  });
((R.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 }),
  (R.classNames = { fullWidth: F, zeroRight: P }));
var tt,
  nt = function () {
    if (tt) return tt;
    if (typeof __webpack_nonce__ < `u`) return __webpack_nonce__;
  };
function rt() {
  if (!document) return null;
  var e = document.createElement(`style`);
  e.type = `text/css`;
  var t = nt();
  return (t && e.setAttribute(`nonce`, t), e);
}
function it(e, t) {
  e.styleSheet
    ? (e.styleSheet.cssText = t)
    : e.appendChild(document.createTextNode(t));
}
function at(e) {
  (document.head || document.getElementsByTagName(`head`)[0]).appendChild(e);
}
var ot = function () {
    var e = 0,
      t = null;
    return {
      add: function (n) {
        (e == 0 && (t = rt()) && (it(t, n), at(t)), e++);
      },
      remove: function () {
        (e--,
          !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null)));
      },
    };
  },
  st = function () {
    var e = ot();
    return function (t, n) {
      w.useEffect(
        function () {
          return (
            e.add(t),
            function () {
              e.remove();
            }
          );
        },
        [t && n],
      );
    };
  },
  ct = function () {
    var e = st();
    return function (t) {
      var n = t.styles,
        r = t.dynamic;
      return (e(n, r), null);
    };
  },
  lt = { left: 0, top: 0, right: 0, gap: 0 },
  z = function (e) {
    return parseInt(e || ``, 10) || 0;
  },
  ut = function (e) {
    var t = window.getComputedStyle(document.body),
      n = t[e === `padding` ? `paddingLeft` : `marginLeft`],
      r = t[e === `padding` ? `paddingTop` : `marginTop`],
      i = t[e === `padding` ? `paddingRight` : `marginRight`];
    return [z(n), z(r), z(i)];
  },
  dt = function (e) {
    if ((e === void 0 && (e = `margin`), typeof window > `u`)) return lt;
    var t = ut(e),
      n = document.documentElement.clientWidth,
      r = window.innerWidth;
    return {
      left: t[0],
      top: t[1],
      right: t[2],
      gap: Math.max(0, r - n + t[2] - t[0]),
    };
  },
  ft = ct(),
  B = `data-scroll-locked`,
  pt = function (e, t, n, r) {
    var i = e.left,
      a = e.top,
      o = e.right,
      s = e.gap;
    return (
      n === void 0 && (n = `margin`),
      `
  .${Ue} {
   overflow: hidden ${r};
   padding-right: ${s}px ${r};
  }
  body[${B}] {
    overflow: hidden ${r};
    overscroll-behavior: contain;
    ${[
      t && `position: relative ${r};`,
      n === `margin` &&
        `
    padding-left: ${i}px;
    padding-top: ${a}px;
    padding-right: ${o}px;
    margin-left:0;
    margin-top:0;
    margin-right: ${s}px ${r};
    `,
      n === `padding` && `padding-right: ${s}px ${r};`,
    ]
      .filter(Boolean)
      .join(``)}
  }
  
  .${P} {
    right: ${s}px ${r};
  }
  
  .${F} {
    margin-right: ${s}px ${r};
  }
  
  .${P} .${P} {
    right: 0 ${r};
  }
  
  .${F} .${F} {
    margin-right: 0 ${r};
  }
  
  body[${B}] {
    ${We}: ${s}px;
  }
`
    );
  },
  mt = function () {
    var e = parseInt(
      document.body.getAttribute(`data-scroll-locked`) || `0`,
      10,
    );
    return isFinite(e) ? e : 0;
  },
  ht = function () {
    w.useEffect(function () {
      return (
        document.body.setAttribute(B, (mt() + 1).toString()),
        function () {
          var e = mt() - 1;
          e <= 0
            ? document.body.removeAttribute(B)
            : document.body.setAttribute(B, e.toString());
        }
      );
    }, []);
  },
  gt = function (e) {
    var t = e.noRelative,
      n = e.noImportant,
      r = e.gapMode,
      i = r === void 0 ? `margin` : r;
    ht();
    var a = w.useMemo(
      function () {
        return dt(i);
      },
      [i],
    );
    return w.createElement(ft, { styles: pt(a, !t, i, n ? `` : `!important`) });
  },
  V = !1;
if (typeof window < `u`)
  try {
    var H = Object.defineProperty({}, `passive`, {
      get: function () {
        return ((V = !0), !0);
      },
    });
    (window.addEventListener(`test`, H, H),
      window.removeEventListener(`test`, H, H));
  } catch {
    V = !1;
  }
var U = V ? { passive: !1 } : !1,
  _t = function (e) {
    return e.tagName === `TEXTAREA`;
  },
  vt = function (e, t) {
    if (!(e instanceof Element)) return !1;
    var n = window.getComputedStyle(e);
    return (
      n[t] !== `hidden` &&
      !(n.overflowY === n.overflowX && !_t(e) && n[t] === `visible`)
    );
  },
  yt = function (e) {
    return vt(e, `overflowY`);
  },
  bt = function (e) {
    return vt(e, `overflowX`);
  },
  xt = function (e, t) {
    var n = t.ownerDocument,
      r = t;
    do {
      if (
        (typeof ShadowRoot < `u` && r instanceof ShadowRoot && (r = r.host),
        wt(e, r))
      ) {
        var i = Tt(e, r);
        if (i[1] > i[2]) return !0;
      }
      r = r.parentNode;
    } while (r && r !== n.body);
    return !1;
  },
  St = function (e) {
    return [e.scrollTop, e.scrollHeight, e.clientHeight];
  },
  Ct = function (e) {
    return [e.scrollLeft, e.scrollWidth, e.clientWidth];
  },
  wt = function (e, t) {
    return e === `v` ? yt(t) : bt(t);
  },
  Tt = function (e, t) {
    return e === `v` ? St(t) : Ct(t);
  },
  Et = function (e, t) {
    return e === `h` && t === `rtl` ? -1 : 1;
  },
  Dt = function (e, t, n, r, i) {
    var a = Et(e, window.getComputedStyle(t).direction),
      o = a * r,
      s = n.target,
      c = t.contains(s),
      l = !1,
      u = o > 0,
      d = 0,
      f = 0;
    do {
      if (!s) break;
      var p = Tt(e, s),
        m = p[0],
        h = p[1] - p[2] - a * m;
      (m || h) && wt(e, s) && ((d += h), (f += m));
      var g = s.parentNode;
      s = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
    } while ((!c && s !== document.body) || (c && (t.contains(s) || t === s)));
    return (
      ((u && ((i && Math.abs(d) < 1) || (!i && o > d))) ||
        (!u && ((i && Math.abs(f) < 1) || (!i && -o > f)))) &&
        (l = !0),
      l
    );
  },
  W = function (e) {
    return `changedTouches` in e
      ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      : [0, 0];
  },
  Ot = function (e) {
    return [e.deltaX, e.deltaY];
  },
  kt = function (e) {
    return e && `current` in e ? e.current : e;
  },
  At = function (e, t) {
    return e[0] === t[0] && e[1] === t[1];
  },
  jt = function (e) {
    return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`;
  },
  Mt = 0,
  G = [];
function Nt(e) {
  var t = w.useRef([]),
    n = w.useRef([0, 0]),
    r = w.useRef(),
    i = w.useState(Mt++)[0],
    a = w.useState(ct)[0],
    o = w.useRef(e);
  (w.useEffect(
    function () {
      o.current = e;
    },
    [e],
  ),
    w.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add(`block-interactivity-${i}`);
          var t = He([e.lockRef.current], (e.shards || []).map(kt), !0).filter(
            Boolean,
          );
          return (
            t.forEach(function (e) {
              return e.classList.add(`allow-interactivity-${i}`);
            }),
            function () {
              (document.body.classList.remove(`block-interactivity-${i}`),
                t.forEach(function (e) {
                  return e.classList.remove(`allow-interactivity-${i}`);
                }));
            }
          );
        }
      },
      [e.inert, e.lockRef.current, e.shards],
    ));
  var s = w.useCallback(function (e, t) {
      if (
        (`touches` in e && e.touches.length === 2) ||
        (e.type === `wheel` && e.ctrlKey)
      )
        return !o.current.allowPinchZoom;
      var i = W(e),
        a = n.current,
        s = `deltaX` in e ? e.deltaX : a[0] - i[0],
        c = `deltaY` in e ? e.deltaY : a[1] - i[1],
        l,
        u = e.target,
        d = Math.abs(s) > Math.abs(c) ? `h` : `v`;
      if (`touches` in e && d === `h` && u.type === `range`) return !1;
      var f = window.getSelection(),
        p = f && f.anchorNode;
      if (p && (p === u || p.contains(u))) return !1;
      var m = xt(d, u);
      if (!m) return !0;
      if ((m ? (l = d) : ((l = d === `v` ? `h` : `v`), (m = xt(d, u))), !m))
        return !1;
      if (
        (!r.current && `changedTouches` in e && (s || c) && (r.current = l), !l)
      )
        return !0;
      var h = r.current || l;
      return Dt(h, t, e, h === `h` ? s : c, !0);
    }, []),
    c = w.useCallback(function (e) {
      var n = e;
      if (!(!G.length || G[G.length - 1] !== a)) {
        var r = `deltaY` in n ? Ot(n) : W(n),
          i = t.current.filter(function (e) {
            return (
              e.name === n.type &&
              (e.target === n.target || n.target === e.shadowParent) &&
              At(e.delta, r)
            );
          })[0];
        if (i && i.should) {
          n.cancelable && n.preventDefault();
          return;
        }
        if (!i) {
          var c = (o.current.shards || [])
            .map(kt)
            .filter(Boolean)
            .filter(function (e) {
              return e.contains(n.target);
            });
          (c.length > 0 ? s(n, c[0]) : !o.current.noIsolation) &&
            n.cancelable &&
            n.preventDefault();
        }
      }
    }, []),
    l = w.useCallback(function (e, n, r, i) {
      var a = { name: e, delta: n, target: r, should: i, shadowParent: Pt(r) };
      (t.current.push(a),
        setTimeout(function () {
          t.current = t.current.filter(function (e) {
            return e !== a;
          });
        }, 1));
    }, []),
    u = w.useCallback(function (e) {
      ((n.current = W(e)), (r.current = void 0));
    }, []),
    d = w.useCallback(function (t) {
      l(t.type, Ot(t), t.target, s(t, e.lockRef.current));
    }, []),
    f = w.useCallback(function (t) {
      l(t.type, W(t), t.target, s(t, e.lockRef.current));
    }, []);
  w.useEffect(function () {
    return (
      G.push(a),
      e.setCallbacks({
        onScrollCapture: d,
        onWheelCapture: d,
        onTouchMoveCapture: f,
      }),
      document.addEventListener(`wheel`, c, U),
      document.addEventListener(`touchmove`, c, U),
      document.addEventListener(`touchstart`, u, U),
      function () {
        ((G = G.filter(function (e) {
          return e !== a;
        })),
          document.removeEventListener(`wheel`, c, U),
          document.removeEventListener(`touchmove`, c, U),
          document.removeEventListener(`touchstart`, u, U));
      }
    );
  }, []);
  var p = e.removeScrollBar,
    m = e.inert;
  return w.createElement(
    w.Fragment,
    null,
    m ? w.createElement(a, { styles: jt(i) }) : null,
    p
      ? w.createElement(gt, { noRelative: e.noRelative, gapMode: e.gapMode })
      : null,
  );
}
function Pt(e) {
  for (var t = null; e !== null; )
    (e instanceof ShadowRoot && ((t = e.host), (e = e.host)),
      (e = e.parentNode));
  return t;
}
var Ft = $e(et, Nt),
  It = w.forwardRef(function (e, t) {
    return w.createElement(R, N({}, e, { ref: t, sideCar: Ft }));
  });
It.classNames = R.classNames;
var Lt = function (e) {
    return typeof document > `u`
      ? null
      : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
  },
  K = new WeakMap(),
  q = new WeakMap(),
  J = {},
  Rt = 0,
  zt = function (e) {
    return e && (e.host || zt(e.parentNode));
  },
  Bt = function (e, t) {
    return t
      .map(function (t) {
        if (e.contains(t)) return t;
        var n = zt(t);
        return n && e.contains(n)
          ? n
          : (console.error(
              `aria-hidden`,
              t,
              `in not contained inside`,
              e,
              `. Doing nothing`,
            ),
            null);
      })
      .filter(function (e) {
        return !!e;
      });
  },
  Vt = function (e, t, n, r) {
    var i = Bt(t, Array.isArray(e) ? e : [e]);
    J[n] || (J[n] = new WeakMap());
    var a = J[n],
      o = [],
      s = new Set(),
      c = new Set(i),
      l = function (e) {
        !e || s.has(e) || (s.add(e), l(e.parentNode));
      };
    i.forEach(l);
    var u = function (e) {
      !e ||
        c.has(e) ||
        Array.prototype.forEach.call(e.children, function (e) {
          if (s.has(e)) u(e);
          else
            try {
              var t = e.getAttribute(r),
                i = t !== null && t !== `false`,
                c = (K.get(e) || 0) + 1,
                l = (a.get(e) || 0) + 1;
              (K.set(e, c),
                a.set(e, l),
                o.push(e),
                c === 1 && i && q.set(e, !0),
                l === 1 && e.setAttribute(n, `true`),
                i || e.setAttribute(r, `true`));
            } catch (t) {
              console.error(`aria-hidden: cannot operate on `, e, t);
            }
        });
    };
    return (
      u(t),
      s.clear(),
      Rt++,
      function () {
        (o.forEach(function (e) {
          var t = K.get(e) - 1,
            i = a.get(e) - 1;
          (K.set(e, t),
            a.set(e, i),
            t || (q.has(e) || e.removeAttribute(r), q.delete(e)),
            i || e.removeAttribute(n));
        }),
          Rt--,
          Rt ||
            ((K = new WeakMap()),
            (K = new WeakMap()),
            (q = new WeakMap()),
            (J = {})));
      }
    );
  },
  Ht = function (e, t, n) {
    n === void 0 && (n = `data-aria-hidden`);
    var r = Array.from(Array.isArray(e) ? e : [e]),
      i = t || Lt(e);
    return i
      ? (r.push.apply(r, Array.from(i.querySelectorAll(`[aria-live], script`))),
        Vt(r, i, n, `aria-hidden`))
      : function () {
          return null;
        };
  },
  Y = `Dialog`,
  [Ut, Wt] = g(Y),
  [Gt, X] = Ut(Y),
  Kt = (e) => {
    let {
        __scopeDialog: t,
        children: n,
        open: r,
        defaultOpen: i,
        onOpenChange: a,
        modal: o = !0,
      } = e,
      s = w.useRef(null),
      c = w.useRef(null),
      [l, u] = te({ prop: r, defaultProp: i ?? !1, onChange: a, caller: Y });
    return (0, O.jsx)(Gt, {
      scope: t,
      triggerRef: s,
      contentRef: c,
      contentId: D(),
      titleId: D(),
      descriptionId: D(),
      open: l,
      onOpenChange: u,
      onOpenToggle: w.useCallback(() => u((e) => !e), [u]),
      modal: o,
      children: n,
    });
  };
Kt.displayName = Y;
var qt = `DialogTrigger`,
  Jt = w.forwardRef((e, t) => {
    let { __scopeDialog: n, ...r } = e,
      i = X(qt, n),
      a = m(t, i.triggerRef);
    return (0, O.jsx)(p.button, {
      type: `button`,
      "aria-haspopup": `dialog`,
      "aria-expanded": i.open,
      "aria-controls": i.contentId,
      "data-state": $(i.open),
      ...r,
      ref: a,
      onClick: C(e.onClick, i.onOpenToggle),
    });
  });
Jt.displayName = qt;
var Yt = `DialogPortal`,
  [Xt, Zt] = Ut(Yt, { forceMount: void 0 }),
  Qt = (e) => {
    let { __scopeDialog: t, forceMount: n, children: r, container: i } = e,
      a = X(Yt, t);
    return (0, O.jsx)(Xt, {
      scope: t,
      forceMount: n,
      children: w.Children.map(r, (e) =>
        (0, O.jsx)(T, {
          present: n || a.open,
          children: (0, O.jsx)(Re, { asChild: !0, container: i, children: e }),
        }),
      ),
    });
  };
Qt.displayName = Yt;
var Z = `DialogOverlay`,
  $t = w.forwardRef((e, t) => {
    let n = Zt(Z, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...i } = e,
      a = X(Z, e.__scopeDialog);
    return a.modal
      ? (0, O.jsx)(T, {
          present: r || a.open,
          children: (0, O.jsx)(tn, { ...i, ref: t }),
        })
      : null;
  });
$t.displayName = Z;
var en = f(`DialogOverlay.RemoveScroll`),
  tn = w.forwardRef((e, t) => {
    let { __scopeDialog: n, ...r } = e,
      i = X(Z, n);
    return (0, O.jsx)(It, {
      as: en,
      allowPinchZoom: !0,
      shards: [i.contentRef],
      children: (0, O.jsx)(p.div, {
        "data-state": $(i.open),
        ...r,
        ref: t,
        style: { pointerEvents: `auto`, ...r.style },
      }),
    });
  }),
  Q = `DialogContent`,
  nn = w.forwardRef((e, t) => {
    let n = Zt(Q, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...i } = e,
      a = X(Q, e.__scopeDialog);
    return (0, O.jsx)(T, {
      present: r || a.open,
      children: a.modal
        ? (0, O.jsx)(rn, { ...i, ref: t })
        : (0, O.jsx)(an, { ...i, ref: t }),
    });
  });
nn.displayName = Q;
var rn = w.forwardRef((e, t) => {
    let n = X(Q, e.__scopeDialog),
      r = w.useRef(null),
      i = m(t, n.contentRef, r);
    return (
      w.useEffect(() => {
        let e = r.current;
        if (e) return Ht(e);
      }, []),
      (0, O.jsx)(on, {
        ...e,
        ref: i,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: C(e.onCloseAutoFocus, (e) => {
          (e.preventDefault(), n.triggerRef.current?.focus());
        }),
        onPointerDownOutside: C(e.onPointerDownOutside, (e) => {
          let t = e.detail.originalEvent,
            n = t.button === 0 && t.ctrlKey === !0;
          (t.button === 2 || n) && e.preventDefault();
        }),
        onFocusOutside: C(e.onFocusOutside, (e) => e.preventDefault()),
      })
    );
  }),
  an = w.forwardRef((e, t) => {
    let n = X(Q, e.__scopeDialog),
      r = w.useRef(!1),
      i = w.useRef(!1);
    return (0, O.jsx)(on, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      onCloseAutoFocus: (t) => {
        (e.onCloseAutoFocus?.(t),
          t.defaultPrevented ||
            (r.current || n.triggerRef.current?.focus(), t.preventDefault()),
          (r.current = !1),
          (i.current = !1));
      },
      onInteractOutside: (t) => {
        (e.onInteractOutside?.(t),
          t.defaultPrevented ||
            ((r.current = !0),
            t.detail.originalEvent.type === `pointerdown` && (i.current = !0)));
        let a = t.target;
        (n.triggerRef.current?.contains(a) && t.preventDefault(),
          t.detail.originalEvent.type === `focusin` &&
            i.current &&
            t.preventDefault());
      },
    });
  }),
  on = w.forwardRef((e, t) => {
    let {
        __scopeDialog: n,
        trapFocus: r,
        onOpenAutoFocus: i,
        onCloseAutoFocus: a,
        ...o
      } = e,
      s = X(Q, n),
      c = w.useRef(null),
      l = m(t, c);
    return (
      ze(),
      (0, O.jsxs)(O.Fragment, {
        children: [
          (0, O.jsx)(Te, {
            asChild: !0,
            loop: !0,
            trapped: r,
            onMountAutoFocus: i,
            onUnmountAutoFocus: a,
            children: (0, O.jsx)(he, {
              role: `dialog`,
              id: s.contentId,
              "aria-describedby": s.descriptionId,
              "aria-labelledby": s.titleId,
              "data-state": $(s.open),
              ...o,
              ref: l,
              onDismiss: () => s.onOpenChange(!1),
            }),
          }),
          (0, O.jsxs)(O.Fragment, {
            children: [
              (0, O.jsx)(gn, { titleId: s.titleId }),
              (0, O.jsx)(vn, { contentRef: c, descriptionId: s.descriptionId }),
            ],
          }),
        ],
      })
    );
  }),
  sn = `DialogTitle`,
  cn = w.forwardRef((e, t) => {
    let { __scopeDialog: n, ...r } = e,
      i = X(sn, n);
    return (0, O.jsx)(p.h2, { id: i.titleId, ...r, ref: t });
  });
cn.displayName = sn;
var ln = `DialogDescription`,
  un = w.forwardRef((e, t) => {
    let { __scopeDialog: n, ...r } = e,
      i = X(ln, n);
    return (0, O.jsx)(p.p, { id: i.descriptionId, ...r, ref: t });
  });
un.displayName = ln;
var dn = `DialogClose`,
  fn = w.forwardRef((e, t) => {
    let { __scopeDialog: n, ...r } = e,
      i = X(dn, n);
    return (0, O.jsx)(p.button, {
      type: `button`,
      ...r,
      ref: t,
      onClick: C(e.onClick, () => i.onOpenChange(!1)),
    });
  });
fn.displayName = dn;
function $(e) {
  return e ? `open` : `closed`;
}
var pn = `DialogTitleWarning`,
  [mn, hn] = v(pn, { contentName: Q, titleName: sn, docsSlug: `dialog` }),
  gn = ({ titleId: e }) => {
    let t = hn(pn),
      n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
    return (
      w.useEffect(() => {
        e && (document.getElementById(e) || console.error(n));
      }, [n, e]),
      null
    );
  },
  _n = `DialogDescriptionWarning`,
  vn = ({ contentRef: e, descriptionId: t }) => {
    let n = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${hn(_n).contentName}}.`;
    return (
      w.useEffect(() => {
        let r = e.current?.getAttribute(`aria-describedby`);
        t && r && (document.getElementById(t) || console.warn(n));
      }, [n, e, t]),
      null
    );
  },
  yn = Kt,
  bn = Jt,
  xn = Qt,
  Sn = $t,
  Cn = nn,
  wn = cn,
  Tn = fn;
function En({ ...e }) {
  return (0, O.jsx)(yn, { "data-slot": `sheet`, ...e });
}
function Dn({ ...e }) {
  return (0, O.jsx)(bn, { "data-slot": `sheet-trigger`, ...e });
}
function On({ ...e }) {
  return (0, O.jsx)(xn, { "data-slot": `sheet-portal`, ...e });
}
function kn({ className: e, ...t }) {
  return (0, O.jsx)(Sn, {
    "data-slot": `sheet-overlay`,
    className: d(
      `fixed inset-0 z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0`,
      e,
    ),
    ...t,
  });
}
function An({
  className: e,
  children: t,
  side: n = `right`,
  showCloseButton: r = !0,
  ...i
}) {
  return (0, O.jsxs)(On, {
    children: [
      (0, O.jsx)(kn, {}),
      (0, O.jsxs)(Cn, {
        "data-slot": `sheet-content`,
        "data-side": n,
        className: d(
          `fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=top]:data-closed:slide-out-to-top-10`,
          e,
        ),
        ...i,
        children: [
          t,
          r &&
            (0, O.jsx)(Tn, {
              "data-slot": `sheet-close`,
              asChild: !0,
              children: (0, O.jsxs)(b, {
                variant: `ghost`,
                className: `absolute top-3 right-3`,
                size: `icon-sm`,
                children: [
                  (0, O.jsx)(S, {}),
                  (0, O.jsx)(`span`, {
                    className: `sr-only`,
                    children: `Close`,
                  }),
                ],
              }),
            }),
        ],
      }),
    ],
  });
}
function jn({ className: e, ...t }) {
  return (0, O.jsx)(`div`, {
    "data-slot": `sheet-header`,
    className: d(`flex flex-col gap-0.5 p-4`, e),
    ...t,
  });
}
function Mn({ className: e, ...t }) {
  return (0, O.jsx)(wn, {
    "data-slot": `sheet-title`,
    className: d(`font-heading text-base font-medium text-foreground`, e),
    ...t,
  });
}
var Nn = [
  { to: `/`, label: `Home` },
  { to: `/about`, label: `About` },
];
function Pn() {
  return (0, O.jsx)(`header`, {
    className: `sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-sm`,
    children: (0, O.jsxs)(`div`, {
      className: `container mx-auto flex h-14 max-w-6xl items-center justify-between px-4`,
      children: [
        (0, O.jsxs)(o, {
          to: `/`,
          className: `flex items-center gap-2 font-semibold text-base transition-opacity hover:opacity-80`,
          children: [
            (0, O.jsx)(l, { className: `size-5` }),
            (0, O.jsx)(`span`, { children: `MiniBooking` }),
          ],
        }),
        (0, O.jsx)(`nav`, {
          className: `hidden md:flex items-center gap-1`,
          children: Nn.map((e) =>
            (0, O.jsx)(
              s,
              {
                to: e.to,
                end: e.to === `/`,
                className: ({ isActive: e }) =>
                  `px-3 py-1.5 text-sm rounded-md transition-colors ${e ? `text-foreground font-medium bg-muted` : `text-muted-foreground hover:text-foreground hover:bg-muted/60`}`,
                children: e.label,
              },
              e.to,
            ),
          ),
        }),
        (0, O.jsxs)(`div`, {
          className: `hidden md:flex items-center gap-2`,
          children: [
            (0, O.jsx)(b, {
              variant: `ghost`,
              size: `sm`,
              asChild: !0,
              children: (0, O.jsx)(o, { to: `/login`, children: `Sign In` }),
            }),
            (0, O.jsx)(b, {
              size: `sm`,
              asChild: !0,
              children: (0, O.jsx)(o, { to: `/register`, children: `Sign Up` }),
            }),
          ],
        }),
        (0, O.jsxs)(En, {
          children: [
            (0, O.jsx)(Dn, {
              asChild: !0,
              className: `md:hidden`,
              children: (0, O.jsxs)(b, {
                variant: `ghost`,
                size: `icon`,
                children: [
                  (0, O.jsx)(x, {}),
                  (0, O.jsx)(`span`, {
                    className: `sr-only`,
                    children: `Toggle menu`,
                  }),
                ],
              }),
            }),
            (0, O.jsxs)(An, {
              side: `right`,
              className: `w-72`,
              children: [
                (0, O.jsx)(jn, {
                  children: (0, O.jsxs)(Mn, {
                    className: `flex items-center gap-2 text-base`,
                    children: [
                      (0, O.jsx)(l, { className: `size-4` }),
                      `MiniBooking`,
                    ],
                  }),
                }),
                (0, O.jsx)(`div`, {
                  className: `mt-6 flex flex-col gap-1`,
                  children: Nn.map((e) =>
                    (0, O.jsx)(
                      s,
                      {
                        to: e.to,
                        end: e.to === `/`,
                        className: ({ isActive: e }) =>
                          `px-3 py-2 text-sm rounded-md transition-colors ${e ? `text-foreground font-medium bg-muted` : `text-muted-foreground hover:text-foreground hover:bg-muted/60`}`,
                        children: e.label,
                      },
                      e.to,
                    ),
                  ),
                }),
                (0, O.jsxs)(`div`, {
                  className: `mt-6 flex flex-col gap-2 px-1`,
                  children: [
                    (0, O.jsx)(b, {
                      variant: `outline`,
                      asChild: !0,
                      children: (0, O.jsx)(o, {
                        to: `/login`,
                        children: `Sign In`,
                      }),
                    }),
                    (0, O.jsx)(b, {
                      asChild: !0,
                      children: (0, O.jsx)(o, {
                        to: `/register`,
                        children: `Sign Up`,
                      }),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
function Fn({ className: e }) {
  return (0, O.jsx)(`svg`, {
    className: e,
    viewBox: `0 0 24 24`,
    fill: `currentColor`,
    "aria-hidden": `true`,
    children: (0, O.jsx)(`path`, {
      d: `M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z`,
    }),
  });
}
function In({ className: e }) {
  return (0, O.jsx)(`svg`, {
    className: e,
    viewBox: `0 0 24 24`,
    fill: `currentColor`,
    "aria-hidden": `true`,
    children: (0, O.jsx)(`path`, {
      d: `M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z`,
    }),
  });
}
function Ln() {
  return (0, O.jsx)(`footer`, {
    className: `border-t border-border/60 bg-muted/30`,
    children: (0, O.jsxs)(`div`, {
      className: `container mx-auto max-w-6xl px-4 py-10`,
      children: [
        (0, O.jsxs)(`div`, {
          className: `grid grid-cols-2 gap-8 md:grid-cols-4`,
          children: [
            (0, O.jsxs)(`div`, {
              className: `col-span-2 md:col-span-1 space-y-3`,
              children: [
                (0, O.jsxs)(o, {
                  to: `/`,
                  className: `flex items-center gap-2 font-semibold`,
                  children: [
                    (0, O.jsx)(l, { className: `size-5` }),
                    (0, O.jsx)(`span`, { children: `MiniBooking` }),
                  ],
                }),
                (0, O.jsx)(`p`, {
                  className: `text-sm text-muted-foreground leading-relaxed`,
                  children: `Smart mentorship scheduling for modern learners.`,
                }),
                (0, O.jsxs)(`div`, {
                  className: `flex items-center gap-3 pt-1`,
                  children: [
                    (0, O.jsx)(`a`, {
                      href: `https://github.com`,
                      "aria-label": `GitHub`,
                      className: `text-muted-foreground hover:text-foreground transition-colors`,
                      children: (0, O.jsx)(Fn, { className: `size-4` }),
                    }),
                    (0, O.jsx)(`a`, {
                      href: `https://x.com`,
                      "aria-label": `X (Twitter)`,
                      className: `text-muted-foreground hover:text-foreground transition-colors`,
                      children: (0, O.jsx)(In, { className: `size-4` }),
                    }),
                  ],
                }),
              ],
            }),
            (0, O.jsxs)(`div`, {
              className: `space-y-3`,
              children: [
                (0, O.jsx)(`h4`, {
                  className: `text-sm font-medium`,
                  children: `Product`,
                }),
                (0, O.jsxs)(`ul`, {
                  className: `space-y-2 text-sm text-muted-foreground`,
                  children: [
                    (0, O.jsx)(`li`, {
                      children: (0, O.jsx)(o, {
                        to: `/`,
                        className: `hover:text-foreground transition-colors`,
                        children: `Home`,
                      }),
                    }),
                    (0, O.jsx)(`li`, {
                      children: (0, O.jsx)(o, {
                        to: `/about`,
                        className: `hover:text-foreground transition-colors`,
                        children: `About`,
                      }),
                    }),
                  ],
                }),
              ],
            }),
            (0, O.jsxs)(`div`, {
              className: `space-y-3`,
              children: [
                (0, O.jsx)(`h4`, {
                  className: `text-sm font-medium`,
                  children: `Account`,
                }),
                (0, O.jsxs)(`ul`, {
                  className: `space-y-2 text-sm text-muted-foreground`,
                  children: [
                    (0, O.jsx)(`li`, {
                      children: (0, O.jsx)(o, {
                        to: `/login`,
                        className: `hover:text-foreground transition-colors`,
                        children: `Sign In`,
                      }),
                    }),
                    (0, O.jsx)(`li`, {
                      children: (0, O.jsx)(o, {
                        to: `/register`,
                        className: `hover:text-foreground transition-colors`,
                        children: `Sign Up`,
                      }),
                    }),
                  ],
                }),
              ],
            }),
            (0, O.jsxs)(`div`, {
              className: `space-y-3`,
              children: [
                (0, O.jsx)(`h4`, {
                  className: `text-sm font-medium`,
                  children: `Legal`,
                }),
                (0, O.jsxs)(`ul`, {
                  className: `space-y-2 text-sm text-muted-foreground`,
                  children: [
                    (0, O.jsx)(`li`, {
                      children: (0, O.jsx)(`span`, {
                        className: `cursor-default`,
                        children: `Privacy Policy`,
                      }),
                    }),
                    (0, O.jsx)(`li`, {
                      children: (0, O.jsx)(`span`, {
                        className: `cursor-default`,
                        children: `Terms of Service`,
                      }),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        (0, O.jsx)(h, { className: `my-6` }),
        (0, O.jsxs)(`p`, {
          className: `text-center text-xs text-muted-foreground`,
          children: [
            `© `,
            new Date().getFullYear(),
            ` MiniBooking. All rights reserved.`,
          ],
        }),
      ],
    }),
  });
}
var Rn = ({ children: e }) =>
    (0, O.jsxs)(`div`, {
      className: `flex flex-col min-h-screen`,
      children: [
        (0, O.jsx)(Pn, {}),
        (0, O.jsx)(`main`, { className: `flex-1`, children: e }),
        (0, O.jsx)(Ln, {}),
      ],
    }),
  zn = a(function () {
    return (0, O.jsx)(Rn, { children: (0, O.jsx)(i, {}) });
  });
export { zn as default };
