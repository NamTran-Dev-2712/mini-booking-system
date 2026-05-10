import { a as e, n as t, t as n } from "./jsx-runtime-D0R9s8hK.js";
import { t as r } from "./react-dom-CuViyZo3.js";
import { t as i } from "./createLucideIcon-CcmGBDAZ.js";
import { a, i as o, n as s } from "./dist-U9yTH5Ng.js";
import { n as c, r as l } from "./separator-CTbzZobJ.js";
import { a as u, i as d, o as f, r as p } from "./avatar-CDlKaHys.js";
import { t as m } from "./button-DwAmr52O.js";
var h = i(`layout-dashboard`, [
    [
      `rect`,
      { width: `7`, height: `9`, x: `3`, y: `3`, rx: `1`, key: `10lvy0` },
    ],
    [
      `rect`,
      { width: `7`, height: `5`, x: `14`, y: `3`, rx: `1`, key: `16une8` },
    ],
    [
      `rect`,
      { width: `7`, height: `9`, x: `14`, y: `12`, rx: `1`, key: `1hutg5` },
    ],
    [
      `rect`,
      { width: `7`, height: `5`, x: `3`, y: `16`, rx: `1`, key: `ldoo1y` },
    ],
  ]),
  g = i(`log-out`, [
    [`path`, { d: `m16 17 5-5-5-5`, key: `1bji2h` }],
    [`path`, { d: `M21 12H9`, key: `dn1m92` }],
    [`path`, { d: `M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`, key: `1uf3rs` }],
  ]),
  _ = i(`menu`, [
    [`path`, { d: `M4 5h16`, key: `1tepv9` }],
    [`path`, { d: `M4 12h16`, key: `1lakjw` }],
    [`path`, { d: `M4 19h16`, key: `1djgab` }],
  ]),
  v = i(`x`, [
    [`path`, { d: `M18 6 6 18`, key: `1bl5f8` }],
    [`path`, { d: `m6 6 12 12`, key: `d8bk6v` }],
  ]),
  y = e(t(), 1);
typeof window < `u` && window.document && window.document.createElement;
function b(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function (r) {
    if ((e?.(r), n === !1 || !r.defaultPrevented)) return t?.(r);
  };
}
var ee = y.useInsertionEffect || d;
function x({ prop: e, defaultProp: t, onChange: n = () => {}, caller: r }) {
  let [i, a, o] = S({ defaultProp: t, onChange: n }),
    s = e !== void 0,
    c = s ? e : i;
  {
    let t = y.useRef(e !== void 0);
    y.useEffect(() => {
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
    y.useCallback(
      (t) => {
        if (s) {
          let n = C(t) ? t(e) : t;
          n !== e && o.current?.(n);
        } else a(t);
      },
      [s, e, a, o],
    ),
  ];
}
function S({ defaultProp: e, onChange: t }) {
  let [n, r] = y.useState(e),
    i = y.useRef(n),
    a = y.useRef(t);
  return (
    ee(() => {
      a.current = t;
    }, [t]),
    y.useEffect(() => {
      i.current !== n && (a.current?.(n), (i.current = n));
    }, [n, i]),
    [n, r, a]
  );
}
function C(e) {
  return typeof e == `function`;
}
var te = e(r(), 1),
  w = n();
function T(e, t) {
  return y.useReducer((e, n) => t[e][n] ?? e, e);
}
var E = (e) => {
  let { present: t, children: n } = e,
    r = ne(t),
    i =
      typeof n == `function` ? n({ present: r.isPresent }) : y.Children.only(n),
    o = a(r.ref, re(i));
  return typeof n == `function` || r.isPresent
    ? y.cloneElement(i, { ref: o })
    : null;
};
E.displayName = `Presence`;
function ne(e) {
  let [t, n] = y.useState(),
    r = y.useRef(null),
    i = y.useRef(e),
    a = y.useRef(`none`),
    [o, s] = T(e ? `mounted` : `unmounted`, {
      mounted: { UNMOUNT: `unmounted`, ANIMATION_OUT: `unmountSuspended` },
      unmountSuspended: { MOUNT: `mounted`, ANIMATION_END: `unmounted` },
      unmounted: { MOUNT: `mounted` },
    });
  return (
    y.useEffect(() => {
      let e = D(r.current);
      a.current = o === `mounted` ? e : `none`;
    }, [o]),
    d(() => {
      let t = r.current,
        n = i.current;
      if (n !== e) {
        let r = a.current,
          o = D(t);
        (e
          ? s(`MOUNT`)
          : o === `none` || t?.display === `none`
            ? s(`UNMOUNT`)
            : s(n && r !== o ? `ANIMATION_OUT` : `UNMOUNT`),
          (i.current = e));
      }
    }, [e, s]),
    d(() => {
      if (t) {
        let e,
          n = t.ownerDocument.defaultView ?? window,
          o = (a) => {
            let o = D(r.current).includes(CSS.escape(a.animationName));
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
            e.target === t && (a.current = D(r.current));
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
      ref: y.useCallback((e) => {
        ((r.current = e ? getComputedStyle(e) : null), n(e));
      }, []),
    }
  );
}
function D(e) {
  return e?.animationName || `none`;
}
function re(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, `ref`)?.get,
    n = t && `isReactWarning` in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, `ref`)?.get),
      (n = t && `isReactWarning` in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
var ie = y.useId || (() => void 0),
  ae = 0;
function O(e) {
  let [t, n] = y.useState(ie());
  return (
    d(() => {
      e || n((e) => e ?? String(ae++));
    }, [e]),
    e || (t ? `radix-${t}` : ``)
  );
}
function oe(e, t = globalThis?.document) {
  let n = p(e);
  y.useEffect(() => {
    let e = (e) => {
      e.key === `Escape` && n(e);
    };
    return (
      t.addEventListener(`keydown`, e, { capture: !0 }),
      () => t.removeEventListener(`keydown`, e, { capture: !0 })
    );
  }, [n, t]);
}
var se = `DismissableLayer`,
  k = `dismissableLayer.update`,
  ce = `dismissableLayer.pointerDownOutside`,
  le = `dismissableLayer.focusOutside`,
  ue,
  de = y.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  fe = y.forwardRef((e, t) => {
    let {
        disableOutsidePointerEvents: n = !1,
        onEscapeKeyDown: r,
        onPointerDownOutside: i,
        onFocusOutside: o,
        onInteractOutside: s,
        onDismiss: l,
        ...u
      } = e,
      d = y.useContext(de),
      [f, p] = y.useState(null),
      m = f?.ownerDocument ?? globalThis?.document,
      [, h] = y.useState({}),
      g = a(t, (e) => p(e)),
      _ = Array.from(d.layers),
      [v] = [...d.layersWithOutsidePointerEventsDisabled].slice(-1),
      ee = _.indexOf(v),
      x = f ? _.indexOf(f) : -1,
      S = d.layersWithOutsidePointerEventsDisabled.size > 0,
      C = x >= ee,
      te = he((e) => {
        let t = e.target,
          n = [...d.branches].some((e) => e.contains(t));
        !C || n || (i?.(e), s?.(e), e.defaultPrevented || l?.());
      }, m),
      T = ge((e) => {
        let t = e.target;
        [...d.branches].some((e) => e.contains(t)) ||
          (o?.(e), s?.(e), e.defaultPrevented || l?.());
      }, m);
    return (
      oe((e) => {
        x === d.layers.size - 1 &&
          (r?.(e), !e.defaultPrevented && l && (e.preventDefault(), l()));
      }, m),
      y.useEffect(() => {
        if (f)
          return (
            n &&
              (d.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((ue = m.body.style.pointerEvents),
                (m.body.style.pointerEvents = `none`)),
              d.layersWithOutsidePointerEventsDisabled.add(f)),
            d.layers.add(f),
            _e(),
            () => {
              n &&
                d.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (m.body.style.pointerEvents = ue);
            }
          );
      }, [f, m, n, d]),
      y.useEffect(
        () => () => {
          f &&
            (d.layers.delete(f),
            d.layersWithOutsidePointerEventsDisabled.delete(f),
            _e());
        },
        [f, d],
      ),
      y.useEffect(() => {
        let e = () => h({});
        return (
          document.addEventListener(k, e),
          () => document.removeEventListener(k, e)
        );
      }, []),
      (0, w.jsx)(c.div, {
        ...u,
        ref: g,
        style: {
          pointerEvents: S ? (C ? `auto` : `none`) : void 0,
          ...e.style,
        },
        onFocusCapture: b(e.onFocusCapture, T.onFocusCapture),
        onBlurCapture: b(e.onBlurCapture, T.onBlurCapture),
        onPointerDownCapture: b(
          e.onPointerDownCapture,
          te.onPointerDownCapture,
        ),
      })
    );
  });
fe.displayName = se;
var pe = `DismissableLayerBranch`,
  me = y.forwardRef((e, t) => {
    let n = y.useContext(de),
      r = y.useRef(null),
      i = a(t, r);
    return (
      y.useEffect(() => {
        let e = r.current;
        if (e)
          return (
            n.branches.add(e),
            () => {
              n.branches.delete(e);
            }
          );
      }, [n.branches]),
      (0, w.jsx)(c.div, { ...e, ref: i })
    );
  });
me.displayName = pe;
function he(e, t = globalThis?.document) {
  let n = p(e),
    r = y.useRef(!1),
    i = y.useRef(() => {});
  return (
    y.useEffect(() => {
      let e = (e) => {
          if (e.target && !r.current) {
            let r = function () {
                ve(ce, n, a, { discrete: !0 });
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
function ge(e, t = globalThis?.document) {
  let n = p(e),
    r = y.useRef(!1);
  return (
    y.useEffect(() => {
      let e = (e) => {
        e.target &&
          !r.current &&
          ve(le, n, { originalEvent: e }, { discrete: !1 });
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
function _e() {
  let e = new CustomEvent(k);
  document.dispatchEvent(e);
}
function ve(e, t, n, { discrete: r }) {
  let i = n.originalEvent.target,
    a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  (t && i.addEventListener(e, t, { once: !0 }),
    r ? l(i, a) : i.dispatchEvent(a));
}
var A = `focusScope.autoFocusOnMount`,
  ye = `focusScope.autoFocusOnUnmount`,
  be = { bubbles: !1, cancelable: !0 },
  xe = `FocusScope`,
  Se = y.forwardRef((e, t) => {
    let {
        loop: n = !1,
        trapped: r = !1,
        onMountAutoFocus: i,
        onUnmountAutoFocus: o,
        ...s
      } = e,
      [l, u] = y.useState(null),
      d = p(i),
      f = p(o),
      m = y.useRef(null),
      h = a(t, (e) => u(e)),
      g = y.useRef({
        paused: !1,
        pause() {
          this.paused = !0;
        },
        resume() {
          this.paused = !1;
        },
      }).current;
    (y.useEffect(() => {
      if (r) {
        let e = function (e) {
            if (g.paused || !l) return;
            let t = e.target;
            l.contains(t) ? (m.current = t) : j(m.current, { select: !0 });
          },
          t = function (e) {
            if (g.paused || !l) return;
            let t = e.relatedTarget;
            t !== null && (l.contains(t) || j(m.current, { select: !0 }));
          },
          n = function (e) {
            if (document.activeElement === document.body)
              for (let t of e) t.removedNodes.length > 0 && j(l);
          };
        (document.addEventListener(`focusin`, e),
          document.addEventListener(`focusout`, t));
        let r = new MutationObserver(n);
        return (
          l && r.observe(l, { childList: !0, subtree: !0 }),
          () => {
            (document.removeEventListener(`focusin`, e),
              document.removeEventListener(`focusout`, t),
              r.disconnect());
          }
        );
      }
    }, [r, l, g.paused]),
      y.useEffect(() => {
        if (l) {
          ke.add(g);
          let e = document.activeElement;
          if (!l.contains(e)) {
            let t = new CustomEvent(A, be);
            (l.addEventListener(A, d),
              l.dispatchEvent(t),
              t.defaultPrevented ||
                (Ce(Me(Te(l)), { select: !0 }),
                document.activeElement === e && j(l)));
          }
          return () => {
            (l.removeEventListener(A, d),
              setTimeout(() => {
                let t = new CustomEvent(ye, be);
                (l.addEventListener(ye, f),
                  l.dispatchEvent(t),
                  t.defaultPrevented || j(e ?? document.body, { select: !0 }),
                  l.removeEventListener(ye, f),
                  ke.remove(g));
              }, 0));
          };
        }
      }, [l, d, f, g]));
    let _ = y.useCallback(
      (e) => {
        if ((!n && !r) || g.paused) return;
        let t = e.key === `Tab` && !e.altKey && !e.ctrlKey && !e.metaKey,
          i = document.activeElement;
        if (t && i) {
          let t = e.currentTarget,
            [r, a] = we(t);
          r && a
            ? !e.shiftKey && i === a
              ? (e.preventDefault(), n && j(r, { select: !0 }))
              : e.shiftKey &&
                i === r &&
                (e.preventDefault(), n && j(a, { select: !0 }))
            : i === t && e.preventDefault();
        }
      },
      [n, r, g.paused],
    );
    return (0, w.jsx)(c.div, { tabIndex: -1, ...s, ref: h, onKeyDown: _ });
  });
Se.displayName = xe;
function Ce(e, { select: t = !1 } = {}) {
  let n = document.activeElement;
  for (let r of e)
    if ((j(r, { select: t }), document.activeElement !== n)) return;
}
function we(e) {
  let t = Te(e);
  return [Ee(t, e), Ee(t.reverse(), e)];
}
function Te(e) {
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
function Ee(e, t) {
  for (let n of e) if (!De(n, { upTo: t })) return n;
}
function De(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === `hidden`) return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === `none`) return !0;
    e = e.parentElement;
  }
  return !1;
}
function Oe(e) {
  return e instanceof HTMLInputElement && `select` in e;
}
function j(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    let n = document.activeElement;
    (e.focus({ preventScroll: !0 }), e !== n && Oe(e) && t && e.select());
  }
}
var ke = Ae();
function Ae() {
  let e = [];
  return {
    add(t) {
      let n = e[0];
      (t !== n && n?.pause(), (e = je(e, t)), e.unshift(t));
    },
    remove(t) {
      ((e = je(e, t)), e[0]?.resume());
    },
  };
}
function je(e, t) {
  let n = [...e],
    r = n.indexOf(t);
  return (r !== -1 && n.splice(r, 1), n);
}
function Me(e) {
  return e.filter((e) => e.tagName !== `A`);
}
var Ne = `Portal`,
  Pe = y.forwardRef((e, t) => {
    let { container: n, ...r } = e,
      [i, a] = y.useState(!1);
    d(() => a(!0), []);
    let o = n || (i && globalThis?.document?.body);
    return o ? te.createPortal((0, w.jsx)(c.div, { ...r, ref: t }), o) : null;
  });
Pe.displayName = Ne;
var M = 0;
function Fe() {
  y.useEffect(() => {
    let e = document.querySelectorAll(`[data-radix-focus-guard]`);
    return (
      document.body.insertAdjacentElement(`afterbegin`, e[0] ?? Ie()),
      document.body.insertAdjacentElement(`beforeend`, e[1] ?? Ie()),
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
function Ie() {
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
function Le(e, t) {
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
function Re(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = t.length, a; r < i; r++)
      (a || !(r in t)) &&
        ((a ||= Array.prototype.slice.call(t, 0, r)), (a[r] = t[r]));
  return e.concat(a || Array.prototype.slice.call(t));
}
var P = `right-scroll-bar-position`,
  F = `width-before-scroll-bar`,
  ze = `with-scroll-bars-hidden`,
  Be = `--removed-body-scroll-bar-size`;
function I(e, t) {
  return (typeof e == `function` ? e(t) : e && (e.current = t), e);
}
function Ve(e, t) {
  var n = (0, y.useState)(function () {
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
var He = typeof window < `u` ? y.useLayoutEffect : y.useEffect,
  Ue = new WeakMap();
function We(e, t) {
  var n = Ve(t || null, function (t) {
    return e.forEach(function (e) {
      return I(e, t);
    });
  });
  return (
    He(
      function () {
        var t = Ue.get(n);
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
        Ue.set(n, e);
      },
      [e],
    ),
    n
  );
}
function Ge(e) {
  return e;
}
function Ke(e, t) {
  t === void 0 && (t = Ge);
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
function qe(e) {
  e === void 0 && (e = {});
  var t = Ke(null);
  return ((t.options = N({ async: !0, ssr: !1 }, e)), t);
}
var Je = function (e) {
  var t = e.sideCar,
    n = Le(e, [`sideCar`]);
  if (!t)
    throw Error(
      "Sidecar: please provide `sideCar` property to import the right car",
    );
  var r = t.read();
  if (!r) throw Error(`Sidecar medium not found`);
  return y.createElement(r, N({}, n));
};
Je.isSideCarExport = !0;
function Ye(e, t) {
  return (e.useMedium(t), Je);
}
var Xe = qe(),
  L = function () {},
  R = y.forwardRef(function (e, t) {
    var n = y.useRef(null),
      r = y.useState({
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
      b = e.gapMode,
      ee = Le(e, [
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
      S = We([n, t]),
      C = N(N({}, ee), i);
    return y.createElement(
      y.Fragment,
      null,
      u &&
        y.createElement(x, {
          sideCar: Xe,
          removeScrollBar: l,
          shards: d,
          noRelative: p,
          noIsolation: m,
          inert: h,
          setCallbacks: a,
          allowPinchZoom: !!g,
          lockRef: n,
          gapMode: b,
        }),
      o
        ? y.cloneElement(y.Children.only(s), N(N({}, C), { ref: S }))
        : y.createElement(v, N({}, C, { className: c, ref: S }), s),
    );
  });
((R.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 }),
  (R.classNames = { fullWidth: F, zeroRight: P }));
var Ze,
  Qe = function () {
    if (Ze) return Ze;
    if (typeof __webpack_nonce__ < `u`) return __webpack_nonce__;
  };
function $e() {
  if (!document) return null;
  var e = document.createElement(`style`);
  e.type = `text/css`;
  var t = Qe();
  return (t && e.setAttribute(`nonce`, t), e);
}
function et(e, t) {
  e.styleSheet
    ? (e.styleSheet.cssText = t)
    : e.appendChild(document.createTextNode(t));
}
function tt(e) {
  (document.head || document.getElementsByTagName(`head`)[0]).appendChild(e);
}
var nt = function () {
    var e = 0,
      t = null;
    return {
      add: function (n) {
        (e == 0 && (t = $e()) && (et(t, n), tt(t)), e++);
      },
      remove: function () {
        (e--,
          !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null)));
      },
    };
  },
  rt = function () {
    var e = nt();
    return function (t, n) {
      y.useEffect(
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
  it = function () {
    var e = rt();
    return function (t) {
      var n = t.styles,
        r = t.dynamic;
      return (e(n, r), null);
    };
  },
  at = { left: 0, top: 0, right: 0, gap: 0 },
  z = function (e) {
    return parseInt(e || ``, 10) || 0;
  },
  ot = function (e) {
    var t = window.getComputedStyle(document.body),
      n = t[e === `padding` ? `paddingLeft` : `marginLeft`],
      r = t[e === `padding` ? `paddingTop` : `marginTop`],
      i = t[e === `padding` ? `paddingRight` : `marginRight`];
    return [z(n), z(r), z(i)];
  },
  st = function (e) {
    if ((e === void 0 && (e = `margin`), typeof window > `u`)) return at;
    var t = ot(e),
      n = document.documentElement.clientWidth,
      r = window.innerWidth;
    return {
      left: t[0],
      top: t[1],
      right: t[2],
      gap: Math.max(0, r - n + t[2] - t[0]),
    };
  },
  ct = it(),
  B = `data-scroll-locked`,
  lt = function (e, t, n, r) {
    var i = e.left,
      a = e.top,
      o = e.right,
      s = e.gap;
    return (
      n === void 0 && (n = `margin`),
      `
  .${ze} {
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
    ${Be}: ${s}px;
  }
`
    );
  },
  ut = function () {
    var e = parseInt(
      document.body.getAttribute(`data-scroll-locked`) || `0`,
      10,
    );
    return isFinite(e) ? e : 0;
  },
  dt = function () {
    y.useEffect(function () {
      return (
        document.body.setAttribute(B, (ut() + 1).toString()),
        function () {
          var e = ut() - 1;
          e <= 0
            ? document.body.removeAttribute(B)
            : document.body.setAttribute(B, e.toString());
        }
      );
    }, []);
  },
  ft = function (e) {
    var t = e.noRelative,
      n = e.noImportant,
      r = e.gapMode,
      i = r === void 0 ? `margin` : r;
    dt();
    var a = y.useMemo(
      function () {
        return st(i);
      },
      [i],
    );
    return y.createElement(ct, { styles: lt(a, !t, i, n ? `` : `!important`) });
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
  pt = function (e) {
    return e.tagName === `TEXTAREA`;
  },
  mt = function (e, t) {
    if (!(e instanceof Element)) return !1;
    var n = window.getComputedStyle(e);
    return (
      n[t] !== `hidden` &&
      !(n.overflowY === n.overflowX && !pt(e) && n[t] === `visible`)
    );
  },
  ht = function (e) {
    return mt(e, `overflowY`);
  },
  gt = function (e) {
    return mt(e, `overflowX`);
  },
  _t = function (e, t) {
    var n = t.ownerDocument,
      r = t;
    do {
      if (
        (typeof ShadowRoot < `u` && r instanceof ShadowRoot && (r = r.host),
        bt(e, r))
      ) {
        var i = xt(e, r);
        if (i[1] > i[2]) return !0;
      }
      r = r.parentNode;
    } while (r && r !== n.body);
    return !1;
  },
  vt = function (e) {
    return [e.scrollTop, e.scrollHeight, e.clientHeight];
  },
  yt = function (e) {
    return [e.scrollLeft, e.scrollWidth, e.clientWidth];
  },
  bt = function (e, t) {
    return e === `v` ? ht(t) : gt(t);
  },
  xt = function (e, t) {
    return e === `v` ? vt(t) : yt(t);
  },
  St = function (e, t) {
    return e === `h` && t === `rtl` ? -1 : 1;
  },
  Ct = function (e, t, n, r, i) {
    var a = St(e, window.getComputedStyle(t).direction),
      o = a * r,
      s = n.target,
      c = t.contains(s),
      l = !1,
      u = o > 0,
      d = 0,
      f = 0;
    do {
      if (!s) break;
      var p = xt(e, s),
        m = p[0],
        h = p[1] - p[2] - a * m;
      (m || h) && bt(e, s) && ((d += h), (f += m));
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
  wt = function (e) {
    return [e.deltaX, e.deltaY];
  },
  Tt = function (e) {
    return e && `current` in e ? e.current : e;
  },
  Et = function (e, t) {
    return e[0] === t[0] && e[1] === t[1];
  },
  Dt = function (e) {
    return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`;
  },
  Ot = 0,
  G = [];
function kt(e) {
  var t = y.useRef([]),
    n = y.useRef([0, 0]),
    r = y.useRef(),
    i = y.useState(Ot++)[0],
    a = y.useState(it)[0],
    o = y.useRef(e);
  (y.useEffect(
    function () {
      o.current = e;
    },
    [e],
  ),
    y.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add(`block-interactivity-${i}`);
          var t = Re([e.lockRef.current], (e.shards || []).map(Tt), !0).filter(
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
  var s = y.useCallback(function (e, t) {
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
      var m = _t(d, u);
      if (!m) return !0;
      if ((m ? (l = d) : ((l = d === `v` ? `h` : `v`), (m = _t(d, u))), !m))
        return !1;
      if (
        (!r.current && `changedTouches` in e && (s || c) && (r.current = l), !l)
      )
        return !0;
      var h = r.current || l;
      return Ct(h, t, e, h === `h` ? s : c, !0);
    }, []),
    c = y.useCallback(function (e) {
      var n = e;
      if (!(!G.length || G[G.length - 1] !== a)) {
        var r = `deltaY` in n ? wt(n) : W(n),
          i = t.current.filter(function (e) {
            return (
              e.name === n.type &&
              (e.target === n.target || n.target === e.shadowParent) &&
              Et(e.delta, r)
            );
          })[0];
        if (i && i.should) {
          n.cancelable && n.preventDefault();
          return;
        }
        if (!i) {
          var c = (o.current.shards || [])
            .map(Tt)
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
    l = y.useCallback(function (e, n, r, i) {
      var a = { name: e, delta: n, target: r, should: i, shadowParent: At(r) };
      (t.current.push(a),
        setTimeout(function () {
          t.current = t.current.filter(function (e) {
            return e !== a;
          });
        }, 1));
    }, []),
    u = y.useCallback(function (e) {
      ((n.current = W(e)), (r.current = void 0));
    }, []),
    d = y.useCallback(function (t) {
      l(t.type, wt(t), t.target, s(t, e.lockRef.current));
    }, []),
    f = y.useCallback(function (t) {
      l(t.type, W(t), t.target, s(t, e.lockRef.current));
    }, []);
  y.useEffect(function () {
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
  return y.createElement(
    y.Fragment,
    null,
    m ? y.createElement(a, { styles: Dt(i) }) : null,
    p
      ? y.createElement(ft, { noRelative: e.noRelative, gapMode: e.gapMode })
      : null,
  );
}
function At(e) {
  for (var t = null; e !== null; )
    (e instanceof ShadowRoot && ((t = e.host), (e = e.host)),
      (e = e.parentNode));
  return t;
}
var jt = Ye(Xe, kt),
  Mt = y.forwardRef(function (e, t) {
    return y.createElement(R, N({}, e, { ref: t, sideCar: jt }));
  });
Mt.classNames = R.classNames;
var Nt = function (e) {
    return typeof document > `u`
      ? null
      : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
  },
  K = new WeakMap(),
  q = new WeakMap(),
  J = {},
  Pt = 0,
  Ft = function (e) {
    return e && (e.host || Ft(e.parentNode));
  },
  It = function (e, t) {
    return t
      .map(function (t) {
        if (e.contains(t)) return t;
        var n = Ft(t);
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
  Lt = function (e, t, n, r) {
    var i = It(t, Array.isArray(e) ? e : [e]);
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
      Pt++,
      function () {
        (o.forEach(function (e) {
          var t = K.get(e) - 1,
            i = a.get(e) - 1;
          (K.set(e, t),
            a.set(e, i),
            t || (q.has(e) || e.removeAttribute(r), q.delete(e)),
            i || e.removeAttribute(n));
        }),
          Pt--,
          Pt ||
            ((K = new WeakMap()),
            (K = new WeakMap()),
            (q = new WeakMap()),
            (J = {})));
      }
    );
  },
  Rt = function (e, t, n) {
    n === void 0 && (n = `data-aria-hidden`);
    var r = Array.from(Array.isArray(e) ? e : [e]),
      i = t || Nt(e);
    return i
      ? (r.push.apply(r, Array.from(i.querySelectorAll(`[aria-live], script`))),
        Lt(r, i, n, `aria-hidden`))
      : function () {
          return null;
        };
  },
  Y = `Dialog`,
  [zt, Bt] = f(Y),
  [Vt, X] = zt(Y),
  Ht = (e) => {
    let {
        __scopeDialog: t,
        children: n,
        open: r,
        defaultOpen: i,
        onOpenChange: a,
        modal: o = !0,
      } = e,
      s = y.useRef(null),
      c = y.useRef(null),
      [l, u] = x({ prop: r, defaultProp: i ?? !1, onChange: a, caller: Y });
    return (0, w.jsx)(Vt, {
      scope: t,
      triggerRef: s,
      contentRef: c,
      contentId: O(),
      titleId: O(),
      descriptionId: O(),
      open: l,
      onOpenChange: u,
      onOpenToggle: y.useCallback(() => u((e) => !e), [u]),
      modal: o,
      children: n,
    });
  };
Ht.displayName = Y;
var Ut = `DialogTrigger`,
  Wt = y.forwardRef((e, t) => {
    let { __scopeDialog: n, ...r } = e,
      i = X(Ut, n),
      o = a(t, i.triggerRef);
    return (0, w.jsx)(c.button, {
      type: `button`,
      "aria-haspopup": `dialog`,
      "aria-expanded": i.open,
      "aria-controls": i.contentId,
      "data-state": $(i.open),
      ...r,
      ref: o,
      onClick: b(e.onClick, i.onOpenToggle),
    });
  });
Wt.displayName = Ut;
var Gt = `DialogPortal`,
  [Kt, qt] = zt(Gt, { forceMount: void 0 }),
  Jt = (e) => {
    let { __scopeDialog: t, forceMount: n, children: r, container: i } = e,
      a = X(Gt, t);
    return (0, w.jsx)(Kt, {
      scope: t,
      forceMount: n,
      children: y.Children.map(r, (e) =>
        (0, w.jsx)(E, {
          present: n || a.open,
          children: (0, w.jsx)(Pe, { asChild: !0, container: i, children: e }),
        }),
      ),
    });
  };
Jt.displayName = Gt;
var Z = `DialogOverlay`,
  Yt = y.forwardRef((e, t) => {
    let n = qt(Z, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...i } = e,
      a = X(Z, e.__scopeDialog);
    return a.modal
      ? (0, w.jsx)(E, {
          present: r || a.open,
          children: (0, w.jsx)(Zt, { ...i, ref: t }),
        })
      : null;
  });
Yt.displayName = Z;
var Xt = o(`DialogOverlay.RemoveScroll`),
  Zt = y.forwardRef((e, t) => {
    let { __scopeDialog: n, ...r } = e,
      i = X(Z, n);
    return (0, w.jsx)(Mt, {
      as: Xt,
      allowPinchZoom: !0,
      shards: [i.contentRef],
      children: (0, w.jsx)(c.div, {
        "data-state": $(i.open),
        ...r,
        ref: t,
        style: { pointerEvents: `auto`, ...r.style },
      }),
    });
  }),
  Q = `DialogContent`,
  Qt = y.forwardRef((e, t) => {
    let n = qt(Q, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...i } = e,
      a = X(Q, e.__scopeDialog);
    return (0, w.jsx)(E, {
      present: r || a.open,
      children: a.modal
        ? (0, w.jsx)($t, { ...i, ref: t })
        : (0, w.jsx)(en, { ...i, ref: t }),
    });
  });
Qt.displayName = Q;
var $t = y.forwardRef((e, t) => {
    let n = X(Q, e.__scopeDialog),
      r = y.useRef(null),
      i = a(t, n.contentRef, r);
    return (
      y.useEffect(() => {
        let e = r.current;
        if (e) return Rt(e);
      }, []),
      (0, w.jsx)(tn, {
        ...e,
        ref: i,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: b(e.onCloseAutoFocus, (e) => {
          (e.preventDefault(), n.triggerRef.current?.focus());
        }),
        onPointerDownOutside: b(e.onPointerDownOutside, (e) => {
          let t = e.detail.originalEvent,
            n = t.button === 0 && t.ctrlKey === !0;
          (t.button === 2 || n) && e.preventDefault();
        }),
        onFocusOutside: b(e.onFocusOutside, (e) => e.preventDefault()),
      })
    );
  }),
  en = y.forwardRef((e, t) => {
    let n = X(Q, e.__scopeDialog),
      r = y.useRef(!1),
      i = y.useRef(!1);
    return (0, w.jsx)(tn, {
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
  tn = y.forwardRef((e, t) => {
    let {
        __scopeDialog: n,
        trapFocus: r,
        onOpenAutoFocus: i,
        onCloseAutoFocus: o,
        ...s
      } = e,
      c = X(Q, n),
      l = y.useRef(null),
      u = a(t, l);
    return (
      Fe(),
      (0, w.jsxs)(w.Fragment, {
        children: [
          (0, w.jsx)(Se, {
            asChild: !0,
            loop: !0,
            trapped: r,
            onMountAutoFocus: i,
            onUnmountAutoFocus: o,
            children: (0, w.jsx)(fe, {
              role: `dialog`,
              id: c.contentId,
              "aria-describedby": c.descriptionId,
              "aria-labelledby": c.titleId,
              "data-state": $(c.open),
              ...s,
              ref: u,
              onDismiss: () => c.onOpenChange(!1),
            }),
          }),
          (0, w.jsxs)(w.Fragment, {
            children: [
              (0, w.jsx)(fn, { titleId: c.titleId }),
              (0, w.jsx)(mn, { contentRef: l, descriptionId: c.descriptionId }),
            ],
          }),
        ],
      })
    );
  }),
  nn = `DialogTitle`,
  rn = y.forwardRef((e, t) => {
    let { __scopeDialog: n, ...r } = e,
      i = X(nn, n);
    return (0, w.jsx)(c.h2, { id: i.titleId, ...r, ref: t });
  });
rn.displayName = nn;
var an = `DialogDescription`,
  on = y.forwardRef((e, t) => {
    let { __scopeDialog: n, ...r } = e,
      i = X(an, n);
    return (0, w.jsx)(c.p, { id: i.descriptionId, ...r, ref: t });
  });
on.displayName = an;
var sn = `DialogClose`,
  cn = y.forwardRef((e, t) => {
    let { __scopeDialog: n, ...r } = e,
      i = X(sn, n);
    return (0, w.jsx)(c.button, {
      type: `button`,
      ...r,
      ref: t,
      onClick: b(e.onClick, () => i.onOpenChange(!1)),
    });
  });
cn.displayName = sn;
function $(e) {
  return e ? `open` : `closed`;
}
var ln = `DialogTitleWarning`,
  [un, dn] = u(ln, { contentName: Q, titleName: nn, docsSlug: `dialog` }),
  fn = ({ titleId: e }) => {
    let t = dn(ln),
      n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
    return (
      y.useEffect(() => {
        e && (document.getElementById(e) || console.error(n));
      }, [n, e]),
      null
    );
  },
  pn = `DialogDescriptionWarning`,
  mn = ({ contentRef: e, descriptionId: t }) => {
    let n = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${dn(pn).contentName}}.`;
    return (
      y.useEffect(() => {
        let r = e.current?.getAttribute(`aria-describedby`);
        t && r && (document.getElementById(t) || console.warn(n));
      }, [n, e, t]),
      null
    );
  },
  hn = Ht,
  gn = Wt,
  _n = Jt,
  vn = Yt,
  yn = Qt,
  bn = rn,
  xn = cn;
function Sn({ ...e }) {
  return (0, w.jsx)(hn, { "data-slot": `sheet`, ...e });
}
function Cn({ ...e }) {
  return (0, w.jsx)(gn, { "data-slot": `sheet-trigger`, ...e });
}
function wn({ ...e }) {
  return (0, w.jsx)(_n, { "data-slot": `sheet-portal`, ...e });
}
function Tn({ className: e, ...t }) {
  return (0, w.jsx)(vn, {
    "data-slot": `sheet-overlay`,
    className: s(
      `fixed inset-0 z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0`,
      e,
    ),
    ...t,
  });
}
function En({
  className: e,
  children: t,
  side: n = `right`,
  showCloseButton: r = !0,
  ...i
}) {
  return (0, w.jsxs)(wn, {
    children: [
      (0, w.jsx)(Tn, {}),
      (0, w.jsxs)(yn, {
        "data-slot": `sheet-content`,
        "data-side": n,
        className: s(
          `fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-[side=bottom]:data-open:slide-in-from-bottom-10 data-[side=left]:data-open:slide-in-from-left-10 data-[side=right]:data-open:slide-in-from-right-10 data-[side=top]:data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-[side=bottom]:data-closed:slide-out-to-bottom-10 data-[side=left]:data-closed:slide-out-to-left-10 data-[side=right]:data-closed:slide-out-to-right-10 data-[side=top]:data-closed:slide-out-to-top-10`,
          e,
        ),
        ...i,
        children: [
          t,
          r &&
            (0, w.jsx)(xn, {
              "data-slot": `sheet-close`,
              asChild: !0,
              children: (0, w.jsxs)(m, {
                variant: `ghost`,
                className: `absolute top-3 right-3`,
                size: `icon-sm`,
                children: [
                  (0, w.jsx)(v, {}),
                  (0, w.jsx)(`span`, {
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
function Dn({ className: e, ...t }) {
  return (0, w.jsx)(`div`, {
    "data-slot": `sheet-header`,
    className: s(`flex flex-col gap-0.5 p-4`, e),
    ...t,
  });
}
function On({ className: e, ...t }) {
  return (0, w.jsx)(bn, {
    "data-slot": `sheet-title`,
    className: s(`font-heading text-base font-medium text-foreground`, e),
    ...t,
  });
}
export { Cn as a, h as c, On as i, En as n, _ as o, Dn as r, g as s, Sn as t };
