import { a as e, n as t, r as n, t as r } from "./jsx-runtime-D0R9s8hK.js";
import { n as i } from "./dist-U9yTH5Ng.js";
import { n as a } from "./separator-CTbzZobJ.js";
var o = e(t(), 1),
  s = r();
function c(e, t) {
  let n = o.createContext(t),
    r = (e) => {
      let { children: t, ...r } = e,
        i = o.useMemo(() => r, Object.values(r));
      return (0, s.jsx)(n.Provider, { value: i, children: t });
    };
  r.displayName = e + `Provider`;
  function i(r) {
    let i = o.useContext(n);
    if (i) return i;
    if (t !== void 0) return t;
    throw Error(`\`${r}\` must be used within \`${e}\``);
  }
  return [r, i];
}
function l(e, t = []) {
  let n = [];
  function r(t, r) {
    let i = o.createContext(r),
      a = n.length;
    n = [...n, r];
    let c = (t) => {
      let { scope: n, children: r, ...c } = t,
        l = n?.[e]?.[a] || i,
        u = o.useMemo(() => c, Object.values(c));
      return (0, s.jsx)(l.Provider, { value: u, children: r });
    };
    c.displayName = t + `Provider`;
    function l(n, s) {
      let c = s?.[e]?.[a] || i,
        l = o.useContext(c);
      if (l) return l;
      if (r !== void 0) return r;
      throw Error(`\`${n}\` must be used within \`${t}\``);
    }
    return [c, l];
  }
  let i = () => {
    let t = n.map((e) => o.createContext(e));
    return function (n) {
      let r = n?.[e] || t;
      return o.useMemo(() => ({ [`__scope${e}`]: { ...n, [e]: r } }), [n, r]);
    };
  };
  return ((i.scopeName = e), [r, u(i, ...t)]);
}
function u(...e) {
  let t = e[0];
  if (e.length === 1) return t;
  let n = () => {
    let n = e.map((e) => ({ useScope: e(), scopeName: e.scopeName }));
    return function (e) {
      let r = n.reduce((t, { useScope: n, scopeName: r }) => {
        let i = n(e)[`__scope${r}`];
        return { ...t, ...i };
      }, {});
      return o.useMemo(() => ({ [`__scope${t.scopeName}`]: r }), [r]);
    };
  };
  return ((n.scopeName = t.scopeName), n);
}
var d = globalThis?.document ? o.useLayoutEffect : () => {};
function f(e) {
  let t = o.useRef(e);
  return (
    o.useEffect(() => {
      t.current = e;
    }),
    o.useMemo(
      () =>
        (...e) =>
          t.current?.(...e),
      [],
    )
  );
}
var p = n((e) => {
    var n = t();
    function r(e, t) {
      return (e === t && (e !== 0 || 1 / e == 1 / t)) || (e !== e && t !== t);
    }
    var i = typeof Object.is == `function` ? Object.is : r,
      a = n.useState,
      o = n.useEffect,
      s = n.useLayoutEffect,
      c = n.useDebugValue;
    function l(e, t) {
      var n = t(),
        r = a({ inst: { value: n, getSnapshot: t } }),
        i = r[0].inst,
        l = r[1];
      return (
        s(
          function () {
            ((i.value = n), (i.getSnapshot = t), u(i) && l({ inst: i }));
          },
          [e, n, t],
        ),
        o(
          function () {
            return (
              u(i) && l({ inst: i }),
              e(function () {
                u(i) && l({ inst: i });
              })
            );
          },
          [e],
        ),
        c(n),
        n
      );
    }
    function u(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var n = t();
        return !i(e, n);
      } catch {
        return !0;
      }
    }
    function d(e, t) {
      return t();
    }
    var f =
      typeof window > `u` ||
      window.document === void 0 ||
      window.document.createElement === void 0
        ? d
        : l;
    e.useSyncExternalStore =
      n.useSyncExternalStore === void 0 ? f : n.useSyncExternalStore;
  }),
  m = n((e, t) => {
    t.exports = p();
  })();
function h() {
  return (0, m.useSyncExternalStore)(
    g,
    () => !0,
    () => !1,
  );
}
function g() {
  return () => {};
}
var _ = `Avatar`,
  [v, y] = l(_),
  [b, x] = v(_),
  S = o.forwardRef((e, t) => {
    let { __scopeAvatar: n, ...r } = e,
      [i, c] = o.useState(`idle`);
    return (0, s.jsx)(b, {
      scope: n,
      imageLoadingStatus: i,
      onImageLoadingStatusChange: c,
      children: (0, s.jsx)(a.span, { ...r, ref: t }),
    });
  });
S.displayName = _;
var C = `AvatarImage`,
  w = o.forwardRef((e, t) => {
    let {
        __scopeAvatar: n,
        src: r,
        onLoadingStatusChange: i = () => {},
        ...o
      } = e,
      c = x(C, n),
      l = O(r, o),
      u = f((e) => {
        (i(e), c.onImageLoadingStatusChange(e));
      });
    return (
      d(() => {
        l !== `idle` && u(l);
      }, [l, u]),
      l === `loaded` ? (0, s.jsx)(a.img, { ...o, ref: t, src: r }) : null
    );
  });
w.displayName = C;
var T = `AvatarFallback`,
  E = o.forwardRef((e, t) => {
    let { __scopeAvatar: n, delayMs: r, ...i } = e,
      c = x(T, n),
      [l, u] = o.useState(r === void 0);
    return (
      o.useEffect(() => {
        if (r !== void 0) {
          let e = window.setTimeout(() => u(!0), r);
          return () => window.clearTimeout(e);
        }
      }, [r]),
      l && c.imageLoadingStatus !== `loaded`
        ? (0, s.jsx)(a.span, { ...i, ref: t })
        : null
    );
  });
E.displayName = T;
function D(e, t) {
  return e
    ? t
      ? (e.src !== t && (e.src = t),
        e.complete && e.naturalWidth > 0 ? `loaded` : `loading`)
      : `error`
    : `idle`;
}
function O(e, { referrerPolicy: t, crossOrigin: n }) {
  let r = h(),
    i = o.useRef(null),
    a = r ? ((i.current ||= new window.Image()), i.current) : null,
    [s, c] = o.useState(() => D(a, e));
  return (
    d(() => {
      c(D(a, e));
    }, [a, e]),
    d(() => {
      let e = (e) => () => {
        c(e);
      };
      if (!a) return;
      let r = e(`loaded`),
        i = e(`error`);
      return (
        a.addEventListener(`load`, r),
        a.addEventListener(`error`, i),
        t && (a.referrerPolicy = t),
        typeof n == `string` && (a.crossOrigin = n),
        () => {
          (a.removeEventListener(`load`, r), a.removeEventListener(`error`, i));
        }
      );
    }, [a, n, t]),
    s
  );
}
var k = S,
  A = E;
function j({ className: e, size: t = `default`, ...n }) {
  return (0, s.jsx)(k, {
    "data-slot": `avatar`,
    "data-size": t,
    className: i(
      `group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten`,
      e,
    ),
    ...n,
  });
}
function M({ className: e, ...t }) {
  return (0, s.jsx)(A, {
    "data-slot": `avatar-fallback`,
    className: i(
      `flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs`,
      e,
    ),
    ...t,
  });
}
export { c as a, d as i, M as n, l as o, f as r, j as t };
