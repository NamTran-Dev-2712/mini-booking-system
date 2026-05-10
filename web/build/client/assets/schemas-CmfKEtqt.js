import { a as e, n as t, t as n } from "./jsx-runtime-D0R9s8hK.js";
import { r } from "./chunk-5KNZJZUH-C906xdEM.js";
import { t as i } from "./createLucideIcon-CcmGBDAZ.js";
import { t as a } from "./calendar-days-CVX6VkNj.js";
import { n as o, r as s } from "./dist-U9yTH5Ng.js";
import { n as c, t as l } from "./separator-CTbzZobJ.js";
import { t as u } from "./button-DwAmr52O.js";
var d = i(`eye-off`, [
    [
      `path`,
      {
        d: `M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49`,
        key: `ct8e1f`,
      },
    ],
    [`path`, { d: `M14.084 14.158a3 3 0 0 1-4.242-4.242`, key: `151rxh` }],
    [
      `path`,
      {
        d: `M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143`,
        key: `13bj9a`,
      },
    ],
    [`path`, { d: `m2 2 20 20`, key: `1ooewy` }],
  ]),
  f = i(`eye`, [
    [
      `path`,
      {
        d: `M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0`,
        key: `1nclc0`,
      },
    ],
    [`circle`, { cx: `12`, cy: `12`, r: `3`, key: `1v7zrd` }],
  ]),
  p = e(t(), 1),
  m = n(),
  h = `Label`,
  g = p.forwardRef((e, t) =>
    (0, m.jsx)(c.label, {
      ...e,
      ref: t,
      onMouseDown: (t) => {
        t.target.closest(`button, input, select, textarea`) ||
          (e.onMouseDown?.(t),
          !t.defaultPrevented && t.detail > 1 && t.preventDefault());
      },
    }),
  );
g.displayName = h;
var _ = g;
function v({ children: e, title: t, description: n }) {
  return (0, m.jsxs)(`div`, {
    className: `min-h-screen grid lg:grid-cols-2`,
    children: [
      (0, m.jsxs)(`div`, {
        className: `hidden lg:flex flex-col justify-between bg-foreground text-background p-10`,
        children: [
          (0, m.jsxs)(r, {
            to: `/`,
            className: `flex items-center gap-2 font-semibold text-lg`,
            children: [
              (0, m.jsx)(a, { className: `size-6` }),
              (0, m.jsx)(`span`, { children: `MiniBooking` }),
            ],
          }),
          (0, m.jsxs)(`div`, {
            className: `space-y-4`,
            children: [
              (0, m.jsx)(`blockquote`, {
                className: `text-2xl font-medium leading-relaxed`,
                children: `"Connect with mentors, schedule sessions, and accelerate your growth — all in one place."`,
              }),
              (0, m.jsx)(`p`, {
                className: `text-background/60 text-sm`,
                children: `Trusted by over 1,000 students and mentors every day.`,
              }),
            ],
          }),
          (0, m.jsxs)(`p`, {
            className: `text-background/40 text-xs`,
            children: [
              `© `,
              new Date().getFullYear(),
              ` MiniBooking. All rights reserved.`,
            ],
          }),
        ],
      }),
      (0, m.jsxs)(`div`, {
        className: `flex flex-col items-center justify-center px-6 py-12 lg:px-10`,
        children: [
          (0, m.jsxs)(r, {
            to: `/`,
            className: `flex items-center gap-2 font-semibold text-lg mb-8 lg:hidden`,
            children: [
              (0, m.jsx)(a, { className: `size-5` }),
              (0, m.jsx)(`span`, { children: `MiniBooking` }),
            ],
          }),
          (0, m.jsxs)(`div`, {
            className: `w-full max-w-sm space-y-6`,
            children: [
              (0, m.jsxs)(`div`, {
                className: `space-y-1 text-center`,
                children: [
                  (0, m.jsx)(`h1`, {
                    className: `text-2xl font-semibold tracking-tight`,
                    children: t,
                  }),
                  (0, m.jsx)(`p`, {
                    className: `text-sm text-muted-foreground`,
                    children: n,
                  }),
                ],
              }),
              e,
            ],
          }),
        ],
      }),
    ],
  });
}
var y = (e) => e.type === `checkbox`,
  b = (e) => e instanceof Date,
  x = (e) => e == null,
  S = (e) => typeof e == `object`,
  C = (e) => !x(e) && !Array.isArray(e) && S(e) && !b(e),
  w = (e) =>
    C(e) && e.target ? (y(e.target) ? e.target.checked : e.target.value) : e,
  T = (e, t) =>
    t
      .split(`.`)
      .some((t, n, r) => !isNaN(Number(t)) && e.has(r.slice(0, n).join(`.`))),
  ee = (e) => {
    let t = e.constructor && e.constructor.prototype;
    return C(t) && t.hasOwnProperty(`isPrototypeOf`);
  },
  te =
    typeof window < `u` &&
    window.HTMLElement !== void 0 &&
    typeof document < `u`;
function E(e) {
  if (e instanceof Date) return new Date(e);
  let t = typeof FileList < `u` && e instanceof FileList;
  if (te && (e instanceof Blob || t)) return e;
  let n = Array.isArray(e);
  if (!n && !(C(e) && ee(e))) return e;
  let r = n ? [] : Object.create(Object.getPrototypeOf(e));
  for (let t in e)
    Object.prototype.hasOwnProperty.call(e, t) && (r[t] = E(e[t]));
  return r;
}
var D = (e) => /^\w*$/.test(e),
  O = (e) => e === void 0,
  ne = (e) => (Array.isArray(e) ? e.filter(Boolean) : []),
  re = (e) => ne(e.replace(/["|']|\]/g, ``).split(/\.|\[/)),
  k = (e, t, n) => {
    if (!t || !C(e)) return n;
    let r = (D(t) ? [t] : re(t)).reduce((e, t) => (x(e) ? void 0 : e[t]), e);
    return O(r) || r === e ? (O(e[t]) ? n : e[t]) : r;
  },
  A = (e) => typeof e == `boolean`,
  j = (e) => typeof e == `function`,
  M = (e, t, n) => {
    let r = -1,
      i = D(t) ? [t] : re(t),
      a = i.length,
      o = a - 1;
    for (; ++r < a; ) {
      let t = i[r],
        a = n;
      if (r !== o) {
        let n = e[t];
        a = C(n) || Array.isArray(n) ? n : isNaN(+i[r + 1]) ? {} : [];
      }
      if (t === `__proto__` || t === `constructor` || t === `prototype`) return;
      ((e[t] = a), (e = e[t]));
    }
  },
  ie = {
    BLUR: `blur`,
    FOCUS_OUT: `focusout`,
    CHANGE: `change`,
    SUBMIT: `submit`,
    TRIGGER: `trigger`,
    VALID: `valid`,
  },
  N = {
    onBlur: `onBlur`,
    onChange: `onChange`,
    onSubmit: `onSubmit`,
    onTouched: `onTouched`,
    all: `all`,
  },
  P = {
    max: `max`,
    min: `min`,
    maxLength: `maxLength`,
    minLength: `minLength`,
    pattern: `pattern`,
    required: `required`,
    validate: `validate`,
  },
  ae = `form`,
  oe = `root`,
  se = p.createContext(null);
se.displayName = `HookFormControlContext`;
var ce = () => p.useContext(se),
  le = (e, t, n, r = !0) => {
    let i = {};
    for (let a in e)
      Object.defineProperty(i, a, {
        get: () => {
          let i = a;
          return (
            t._proxyFormState[i] !== N.all &&
              (t._proxyFormState[i] = !r || N.all),
            n && (n[i] = !0),
            e[i]
          );
        },
      });
    return i;
  },
  ue = typeof window < `u` ? p.useLayoutEffect : p.useEffect;
function de(e) {
  let t = ce(),
    { control: n = t, disabled: r, name: i, exact: a } = e || {},
    [o, s] = p.useState(() => ({
      ...n._formState,
      defaultValues: n._defaultValues,
    })),
    c = p.useRef({
      isDirty: !1,
      isLoading: !1,
      dirtyFields: !1,
      touchedFields: !1,
      validatingFields: !1,
      isValidating: !1,
      isValid: !1,
      errors: !1,
    });
  return (
    ue(
      () =>
        n._subscribe({
          name: i,
          formState: c.current,
          exact: a,
          callback: (e) => {
            !r && s({ ...n._formState, ...e, defaultValues: n._defaultValues });
          },
        }),
      [i, r, a],
    ),
    p.useEffect(() => {
      c.current.isValid && n._setValid(!0);
    }, [n]),
    p.useMemo(() => le(o, n, c.current, !1), [o, n])
  );
}
var F = (e) => typeof e == `string`,
  fe = (e, t, n, r, i) =>
    F(e)
      ? (r && t.watch.add(e), k(n, e, i))
      : Array.isArray(e)
        ? e.map((e) => (r && t.watch.add(e), k(n, e)))
        : (r && (t.watchAll = !0), n),
  I = (e) => x(e) || !S(e);
function L(e, t, n = new WeakSet()) {
  if (e === t) return !0;
  if (I(e) || I(t)) return Object.is(e, t);
  if (b(e) && b(t)) return Object.is(e.getTime(), t.getTime());
  let r = Object.keys(e),
    i = Object.keys(t);
  if (r.length !== i.length) return !1;
  if (n.has(e) || n.has(t)) return !0;
  (n.add(e), n.add(t));
  for (let i of r) {
    let r = e[i];
    if (!(i in t)) return !1;
    if (i !== `ref`) {
      let e = t[i];
      if (
        (b(r) && b(e)) ||
        ((C(r) || Array.isArray(r)) && (C(e) || Array.isArray(e)))
          ? !L(r, e, n)
          : !Object.is(r, e)
      )
        return !1;
    }
  }
  return !0;
}
function pe(e) {
  let t = ce(),
    {
      control: n = t,
      name: r,
      defaultValue: i,
      disabled: a,
      exact: o,
      compute: s,
    } = e || {},
    c = p.useRef(i),
    l = p.useRef(s),
    u = p.useRef(void 0),
    d = p.useRef(n),
    f = p.useRef(r);
  l.current = s;
  let [m, h] = p.useState(() => {
      let e = n._getWatch(r, c.current);
      return l.current ? l.current(e) : e;
    }),
    g = p.useCallback(
      (e) => {
        let t = fe(r, n._names, e || n._formValues, !1, c.current);
        return l.current ? l.current(t) : t;
      },
      [n._formValues, n._names, r],
    ),
    _ = p.useCallback(
      (e) => {
        if (!a) {
          let t = fe(r, n._names, e || n._formValues, !1, c.current);
          if (l.current) {
            let e = l.current(t);
            L(e, u.current) || (h(e), (u.current = e));
          } else h(t);
        }
      },
      [n._formValues, n._names, a, r],
    );
  (ue(
    () => (
      (d.current !== n || !L(f.current, r)) &&
        ((d.current = n), (f.current = r), _()),
      n._subscribe({
        name: r,
        formState: { values: !0 },
        exact: o,
        callback: (e) => {
          _(e.values);
        },
      })
    ),
    [n, o, r, _],
  ),
    p.useEffect(() => n._removeUnmounted()));
  let v = d.current !== n,
    y = f.current,
    b = p.useMemo(() => {
      if (a) return null;
      let e = !v && !L(y, r);
      return v || e ? g() : null;
    }, [a, v, r, y, g]);
  return b === null ? m : b;
}
function R(e) {
  let t = ce(),
    {
      name: n,
      disabled: r,
      control: i = t,
      shouldUnregister: a,
      defaultValue: o,
      exact: s = !0,
    } = e,
    c = T(i._names.array, n),
    l = pe({
      control: i,
      name: n,
      defaultValue: p.useMemo(
        () => k(i._formValues, n, k(i._defaultValues, n, o)),
        [i, n, o],
      ),
      exact: s,
    }),
    u = de({ control: i, name: n, exact: s }),
    d = p.useRef(e),
    f = p.useRef(
      i.register(n, {
        ...e.rules,
        value: l,
        ...(A(e.disabled) ? { disabled: e.disabled } : {}),
      }),
    );
  d.current = e;
  let m = p.useMemo(
      () =>
        Object.defineProperties(
          {},
          {
            invalid: { enumerable: !0, get: () => !!k(u.errors, n) },
            isDirty: { enumerable: !0, get: () => !!k(u.dirtyFields, n) },
            isTouched: { enumerable: !0, get: () => !!k(u.touchedFields, n) },
            isValidating: {
              enumerable: !0,
              get: () => !!k(u.validatingFields, n),
            },
            error: { enumerable: !0, get: () => k(u.errors, n) },
          },
        ),
      [u, n],
    ),
    h = p.useCallback(
      (e) =>
        f.current.onChange({
          target: { value: w(e), name: n },
          type: ie.CHANGE,
        }),
      [n],
    ),
    g = p.useCallback(
      () =>
        f.current.onBlur({
          target: { value: k(i._formValues, n), name: n },
          type: ie.BLUR,
        }),
      [n, i._formValues],
    ),
    _ = p.useCallback(
      (e) => {
        let t = k(i._fields, n);
        t &&
          t._f &&
          e &&
          (t._f.ref = {
            focus: () => j(e.focus) && e.focus(),
            select: () => j(e.select) && e.select(),
            setCustomValidity: (t) =>
              j(e.setCustomValidity) && e.setCustomValidity(t),
            reportValidity: () => j(e.reportValidity) && e.reportValidity(),
          });
      },
      [i._fields, n],
    ),
    v = p.useMemo(
      () => ({
        name: n,
        value: l,
        ...(A(r) || u.disabled ? { disabled: u.disabled || r } : {}),
        onChange: h,
        onBlur: g,
        ref: _,
      }),
      [n, r, u.disabled, h, g, _, l],
    );
  return (
    p.useEffect(() => {
      let e = i._options.shouldUnregister || a;
      i.register(n, {
        ...d.current.rules,
        ...(A(d.current.disabled) ? { disabled: d.current.disabled } : {}),
      });
      let t = (e, t) => {
        let n = k(i._fields, e);
        n && n._f && (n._f.mount = t);
      };
      if ((t(n, !0), e)) {
        let e = E(k(i._options.defaultValues, n, d.current.defaultValue));
        (M(i._defaultValues, n, e),
          O(k(i._formValues, n)) && M(i._formValues, n, e));
      }
      return (
        !c && i.register(n),
        () => {
          (c ? e && !i._state.action : e) ? i.unregister(n) : t(n, !1);
        }
      );
    }, [n, i, c, a]),
    p.useEffect(() => {
      i._setDisabledField({ disabled: r, name: n });
    }, [r, n, i]),
    p.useMemo(() => ({ field: v, formState: u, fieldState: m }), [v, u, m])
  );
}
var me = (e) => e.render(R(e)),
  he = p.createContext(null);
he.displayName = `HookFormContext`;
var ge = () => p.useContext(he),
  _e = (e) => {
    let {
        children: t,
        watch: n,
        getValues: r,
        getFieldState: i,
        setError: a,
        clearErrors: o,
        setValue: s,
        setValues: c,
        trigger: l,
        formState: u,
        resetField: d,
        reset: f,
        handleSubmit: m,
        unregister: h,
        control: g,
        register: _,
        setFocus: v,
        subscribe: y,
      } = e,
      b = p.useMemo(
        () => ({
          watch: n,
          getValues: r,
          getFieldState: i,
          setError: a,
          clearErrors: o,
          setValue: s,
          setValues: c,
          trigger: l,
          formState: u,
          resetField: d,
          reset: f,
          handleSubmit: m,
          unregister: h,
          control: g,
          register: _,
          setFocus: v,
          subscribe: y,
        }),
        [o, g, u, i, r, m, _, f, d, a, v, s, c, y, l, h, n],
      );
    return p.createElement(
      he.Provider,
      { value: b },
      p.createElement(se.Provider, { value: b.control }, t),
    );
  },
  ve = (e, t, n, r, i) =>
    t
      ? {
          ...n[e],
          types: { ...(n[e] && n[e].types ? n[e].types : {}), [r]: i || !0 },
        }
      : {},
  ye = (e) => (Array.isArray(e) ? e : [e]),
  be = () => {
    let e = [];
    return {
      get observers() {
        return e;
      },
      next: (t) => {
        for (let n of e) n.next && n.next(t);
      },
      subscribe: (t) => (
        e.push(t),
        {
          unsubscribe: () => {
            e = e.filter((e) => e !== t);
          },
        }
      ),
      unsubscribe: () => {
        e = [];
      },
    };
  };
function xe(e, t) {
  let n = {};
  for (let r in e)
    if (e.hasOwnProperty(r)) {
      let i = e[r],
        a = t[r];
      if (i && C(i) && a) {
        let e = xe(i, a);
        C(e) && (n[r] = e);
      } else e[r] && (n[r] = a);
    }
  return n;
}
var z = (e) => C(e) && !Object.keys(e).length,
  Se = (e) => e.type === `file`,
  Ce = (e) => {
    if (!te) return !1;
    let t = e ? e.ownerDocument : 0;
    return (
      e instanceof
      (t && t.defaultView ? t.defaultView.HTMLElement : HTMLElement)
    );
  },
  we = (e) => e.type === `select-multiple`,
  Te = (e) => e.type === `radio`,
  Ee = (e) => Te(e) || y(e),
  De = (e) => Ce(e) && e.isConnected;
function Oe(e, t) {
  let n = t.slice(0, -1).length,
    r = 0;
  for (; r < n; ) {
    if (x(e)) {
      e = void 0;
      break;
    }
    ((e = e[t[r]]), r++);
  }
  return e;
}
function ke(e) {
  for (let t in e) if (e.hasOwnProperty(t) && !O(e[t])) return !1;
  return !0;
}
function B(e, t) {
  if (F(t) && Object.prototype.hasOwnProperty.call(e, t))
    return (delete e[t], e);
  let n = Array.isArray(t) ? t : D(t) ? [t] : re(t),
    r = n.length === 1 ? e : Oe(e, n),
    i = n.length - 1,
    a = n[i];
  return (
    r && delete r[a],
    i !== 0 &&
      ((C(r) && z(r)) || (Array.isArray(r) && ke(r))) &&
      B(e, n.slice(0, -1)),
    e
  );
}
var Ae = (e) => {
  for (let t in e) if (j(e[t])) return !0;
  return !1;
};
function je(e) {
  return Array.isArray(e) || (C(e) && !Ae(e));
}
function Me(e, t = {}) {
  for (let n in e) {
    let r = e[n];
    je(r)
      ? ((t[n] = Array.isArray(r) ? [] : {}), Me(r, t[n]))
      : O(r) || (t[n] = !0);
  }
  return t;
}
function Ne(e) {
  if (e !== !1) {
    if (e === !0) return !0;
    if (Array.isArray(e)) {
      let t = e.map((e) => Ne(e));
      return t.some((e) => e !== void 0) ? t : void 0;
    }
    if (C(e)) {
      let t = {};
      for (let n in e) {
        let r = Ne(e[n]);
        O(r) || (t[n] = r);
      }
      return Object.keys(t).length ? t : void 0;
    }
  }
}
function Pe(e, t, n) {
  n ||= Me(t);
  for (let r in e) {
    let i = e[r];
    if (je(i))
      O(t) || I(n[r])
        ? (n[r] = Me(i, Array.isArray(i) ? [] : {}))
        : Pe(i, x(t) ? {} : t[r], n[r]);
    else {
      let e = t[r];
      n[r] = !L(i, e);
    }
  }
  return Ne(n) || {};
}
var Fe = { value: !1, isValid: !1 },
  Ie = { value: !0, isValid: !0 },
  Le = (e) => {
    if (Array.isArray(e)) {
      if (e.length > 1) {
        let t = e
          .filter((e) => e && e.checked && !e.disabled)
          .map((e) => e.value);
        return { value: t, isValid: !!t.length };
      }
      return e[0].checked && !e[0].disabled
        ? e[0].attributes && !O(e[0].attributes.value)
          ? O(e[0].value) || e[0].value === ``
            ? Ie
            : { value: e[0].value, isValid: !0 }
          : Ie
        : Fe;
    }
    return Fe;
  },
  Re = (e, { valueAsNumber: t, valueAsDate: n, setValueAs: r }) =>
    O(e)
      ? e
      : t
        ? e === ``
          ? NaN
          : e && +e
        : n && F(e)
          ? new Date(e)
          : r
            ? r(e)
            : e,
  ze = { isValid: !1, value: null },
  Be = (e) =>
    Array.isArray(e)
      ? e.reduce(
          (e, t) =>
            t && t.checked && !t.disabled ? { isValid: !0, value: t.value } : e,
          ze,
        )
      : ze;
function Ve(e) {
  let t = e.ref;
  return Se(t)
    ? t.files
    : Te(t)
      ? Be(e.refs).value
      : we(t)
        ? [...t.selectedOptions].map(({ value: e }) => e)
        : y(t)
          ? Le(e.refs).value
          : Re(O(t.value) ? e.ref.value : t.value, e);
}
var He = (e, t, n, r) => {
    let i = {};
    for (let n of e) {
      let e = k(t, n);
      e && M(i, n, e._f);
    }
    return {
      criteriaMode: n,
      names: [...e],
      fields: i,
      shouldUseNativeValidation: r,
    };
  },
  Ue = (e) => e instanceof RegExp,
  We = (e) =>
    O(e)
      ? e
      : Ue(e)
        ? e.source
        : C(e)
          ? Ue(e.value)
            ? e.value.source
            : e.value
          : e,
  Ge = (e) => ({
    isOnSubmit: !e || e === N.onSubmit,
    isOnBlur: e === N.onBlur,
    isOnChange: e === N.onChange,
    isOnAll: e === N.all,
    isOnTouch: e === N.onTouched,
  }),
  Ke = `AsyncFunction`,
  qe = (e) =>
    !!e &&
    !!e.validate &&
    !!(
      (j(e.validate) && e.validate.constructor.name === Ke) ||
      (C(e.validate) &&
        Object.values(e.validate).find((e) => e.constructor.name === Ke))
    ),
  Je = (e) =>
    e.mount &&
    (e.required ||
      e.min ||
      e.max ||
      e.maxLength ||
      e.minLength ||
      e.pattern ||
      e.validate),
  Ye = (e, t, n) =>
    !n &&
    (t.watchAll ||
      t.watch.has(e) ||
      [...t.watch].some(
        (t) => e.startsWith(t) && /^\.\w+/.test(e.slice(t.length)),
      )),
  Xe = (e, t, n, r) => {
    for (let i of n || Object.keys(e)) {
      let n = k(e, i);
      if (n) {
        let { _f: e, ...a } = n;
        if (e) {
          if (
            (e.refs && e.refs[0] && t(e.refs[0], i) && !r) ||
            (e.ref && t(e.ref, e.name) && !r)
          )
            return !0;
          if (Xe(a, t)) break;
        } else if (C(a) && Xe(a, t)) break;
      }
    }
  };
function Ze(e, t, n) {
  let r = k(e, n);
  if (r || D(n)) return { error: r, name: n };
  let i = n.split(`.`);
  for (; i.length; ) {
    let r = i.join(`.`),
      a = k(t, r),
      o = k(e, r);
    if (a && !Array.isArray(a) && n !== r) return { name: n };
    if (o && o.type) return { name: r, error: o };
    if (o && o.root && o.root.type) return { name: `${r}.root`, error: o.root };
    i.pop();
  }
  return { name: n };
}
var Qe = (e, t, n, r) => {
    n(e);
    let { name: i, ...a } = e;
    return (
      z(a) ||
      (r && Object.keys(a).length >= Object.keys(t).length) ||
      Object.keys(a).find((e) => t[e] === (!r || N.all))
    );
  },
  $e = (e, t, n) =>
    !e ||
    !t ||
    e === t ||
    ye(e).some((e) => e && (n ? e === t : e.startsWith(t) || t.startsWith(e))),
  et = (e, t, n, r, i) =>
    i.isOnAll
      ? !1
      : !n && i.isOnTouch
        ? !(t || e)
        : (n ? r.isOnBlur : i.isOnBlur)
          ? !e
          : (n ? r.isOnChange : i.isOnChange)
            ? e
            : !0,
  tt = (e, t) => !ne(k(e, t)).length && B(e, t),
  nt = (e, t, n) => {
    let r = ye(k(e, n));
    return (M(r, oe, t[n]), M(e, n, r), e);
  };
function rt(e, t, n = `validate`) {
  if (F(e) || (Array.isArray(e) && e.every(F)) || (A(e) && !e))
    return { type: n, message: F(e) ? e : ``, ref: t };
}
var it = (e) => (C(e) && !Ue(e) ? e : { value: e, message: `` }),
  at = async (e, t, n, r, i, a) => {
    let {
        ref: o,
        refs: s,
        required: c,
        maxLength: l,
        minLength: u,
        min: d,
        max: f,
        pattern: p,
        validate: m,
        name: h,
        valueAsNumber: g,
        mount: _,
      } = e._f,
      v = k(n, h);
    if (!_ || t.has(h)) return {};
    let b = s ? s[0] : o,
      S = (e) => {
        i &&
          b.reportValidity &&
          (b.setCustomValidity(A(e) ? `` : e || ``), b.reportValidity());
      },
      w = {},
      T = Te(o),
      ee = y(o),
      te = T || ee,
      E =
        ((g || Se(o)) && O(o.value) && O(v)) ||
        (Ce(o) && o.value === ``) ||
        v === `` ||
        (Array.isArray(v) && !v.length) ||
        (g && typeof v == `number` && isNaN(v)),
      D = ve.bind(null, h, r, w),
      ne = (e, t, n, r = P.maxLength, i = P.minLength) => {
        let a = e ? t : n;
        w[h] = { type: e ? r : i, message: a, ref: o, ...D(e ? r : i, a) };
      };
    if (
      a
        ? !Array.isArray(v) || !v.length
        : c &&
          ((!te && (E || x(v))) ||
            (A(v) && !v) ||
            (ee && !Le(s).isValid) ||
            (T && !Be(s).isValid))
    ) {
      let { value: e, message: t } = F(c) ? { value: !!c, message: c } : it(c);
      if (
        e &&
        ((w[h] = { type: P.required, message: t, ref: b, ...D(P.required, t) }),
        !r)
      )
        return (S(t), w);
    }
    if (!E && (!x(d) || !x(f))) {
      let e,
        t,
        n = it(f),
        i = it(d);
      if (!x(v) && !isNaN(v)) {
        let r = o.valueAsNumber || (v && +v);
        (x(n.value) || (e = r > n.value), x(i.value) || (t = r < i.value));
      } else {
        let r = o.valueAsDate || new Date(v),
          a = (e) => new Date(new Date().toDateString() + ` ` + e),
          s = o.type == `time`,
          c = o.type == `week`;
        (F(n.value) &&
          v &&
          (e = s ? a(v) > a(n.value) : c ? v > n.value : r > new Date(n.value)),
          F(i.value) &&
            v &&
            (t = s
              ? a(v) < a(i.value)
              : c
                ? v < i.value
                : r < new Date(i.value)));
      }
      if ((e || t) && (ne(!!e, n.message, i.message, P.max, P.min), !r))
        return (S(w[h].message), w);
    }
    if ((l || u) && !E && (F(v) || (a && Array.isArray(v)))) {
      let e = it(l),
        t = it(u),
        n = !x(e.value) && v.length > +e.value,
        i = !x(t.value) && v.length < +t.value;
      if ((n || i) && (ne(n, e.message, t.message), !r))
        return (S(w[h].message), w);
    }
    if (p && !E && F(v)) {
      let { value: e, message: t } = it(p);
      if (
        Ue(e) &&
        !v.match(e) &&
        ((w[h] = { type: P.pattern, message: t, ref: o, ...D(P.pattern, t) }),
        !r)
      )
        return (S(t), w);
    }
    if (m) {
      if (j(m)) {
        let e = rt(await m(v, n), b);
        if (e && ((w[h] = { ...e, ...D(P.validate, e.message) }), !r))
          return (S(e.message), w);
      } else if (C(m)) {
        let e = {};
        for (let t in m) {
          if (!z(e) && !r) break;
          let i = rt(await m[t](v, n), b, t);
          i &&
            ((e = { ...i, ...D(t, i.message) }), S(i.message), r && (w[h] = e));
        }
        if (!z(e) && ((w[h] = { ref: b, ...e }), !r)) return w;
      }
    }
    return (S(!0), w);
  },
  ot = { mode: N.onSubmit, reValidateMode: N.onChange, shouldFocusError: !0 },
  st = {
    submitCount: 0,
    isDirty: !1,
    isReady: !1,
    isValidating: !1,
    isSubmitted: !1,
    isSubmitting: !1,
    isSubmitSuccessful: !1,
    isValid: !1,
    touchedFields: {},
    dirtyFields: {},
    validatingFields: {},
  };
function ct(e = {}) {
  let t = { ...ot, ...e },
    n = {
      ...E(st),
      isLoading: j(t.defaultValues),
      errors: t.errors || {},
      disabled: t.disabled || !1,
    },
    r = {},
    i =
      ((C(t.defaultValues) || C(t.values)) && E(t.defaultValues || t.values)) ||
      {},
    a = t.shouldUnregister ? {} : E(i),
    o = { action: !1, mount: !1, watch: !1, keepIsValid: !1 },
    s = {
      mount: new Set(),
      disabled: new Set(),
      unMount: new Set(),
      array: new Set(),
      watch: new Set(),
      registerName: new Set(),
    },
    c,
    l = 0,
    u = {
      isDirty: !1,
      dirtyFields: !1,
      validatingFields: !1,
      touchedFields: !1,
      isValidating: !1,
      isValid: !1,
      errors: !1,
    },
    d = { ...u },
    f = { ...d },
    p = { array: be(), state: be() },
    m = t.criteriaMode === N.all,
    h = (e) => (t) => {
      (clearTimeout(l), (l = setTimeout(e, t)));
    },
    g = async (e) => {
      if (!o.keepIsValid && !t.disabled && (d.isValid || f.isValid || e)) {
        let e;
        (t.resolver
          ? ((e = z((await le()).errors)), _())
          : (e = await I({
              fields: r,
              onlyCheckValid: !0,
              eventType: ie.VALID,
            })),
          e !== n.isValid && p.state.next({ isValid: e }));
      }
    },
    _ = (e, r) => {
      !t.disabled &&
        (d.isValidating ||
          d.validatingFields ||
          f.isValidating ||
          f.validatingFields) &&
        ((e || Array.from(s.mount)).forEach((e) => {
          e && (r ? M(n.validatingFields, e, r) : B(n.validatingFields, e));
        }),
        p.state.next({
          validatingFields: n.validatingFields,
          isValidating: !z(n.validatingFields),
        }));
    },
    v = () => {
      n.dirtyFields = Pe(i, a);
    },
    S = (e, i = [], s, c, l = !0, u = !0) => {
      if (c && s && !t.disabled) {
        if (((o.action = !0), u && Array.isArray(k(r, e)))) {
          let t = s(k(r, e), c.argA, c.argB);
          l && M(r, e, t);
        }
        if (u && Array.isArray(k(n.errors, e))) {
          let t = s(k(n.errors, e), c.argA, c.argB);
          (l && M(n.errors, e, t), tt(n.errors, e));
        }
        if (
          (d.touchedFields || f.touchedFields) &&
          u &&
          Array.isArray(k(n.touchedFields, e))
        ) {
          let t = s(k(n.touchedFields, e), c.argA, c.argB);
          l && M(n.touchedFields, e, t);
        }
        ((d.dirtyFields || f.dirtyFields) && v(),
          p.state.next({
            name: e,
            isDirty: R(e, i),
            dirtyFields: n.dirtyFields,
            errors: n.errors,
            isValid: n.isValid,
          }));
      } else M(a, e, i);
    },
    ee = (e, t) => {
      (M(n.errors, e, t), p.state.next({ errors: n.errors }));
    },
    D = (e) => {
      ((n.errors = e), p.state.next({ errors: n.errors, isValid: !1 }));
    },
    re = (e, t, s, c) => {
      let l = k(r, e);
      if (l) {
        let r = O(k(a, e)),
          u = k(a, e, O(s) ? k(i, e) : s);
        (O(u) || (c && c.defaultChecked) || t
          ? M(a, e, t ? u : Ve(l._f))
          : ge(e, u),
          o.mount &&
            !o.action &&
            (g(),
            r &&
              n.isDirty &&
              (d.isDirty || f.isDirty) &&
              (R() || ((n.isDirty = !1), p.state.next({ ...n })))));
      }
    },
    se = (e, r, a, o, s) => {
      let c = !1,
        l = !1,
        u = { name: e };
      if (!t.disabled) {
        if (!a || o) {
          (d.isDirty || f.isDirty) &&
            ((l = n.isDirty),
            (n.isDirty = u.isDirty = R()),
            (c = l !== u.isDirty));
          let t = L(k(i, e), r);
          ((l = !!k(n.dirtyFields, e)),
            t ? B(n.dirtyFields, e) : M(n.dirtyFields, e, !0),
            (u.dirtyFields = n.dirtyFields),
            (c ||= (d.dirtyFields || f.dirtyFields) && l !== !t));
        }
        if (a) {
          let t = k(n.touchedFields, e);
          t ||
            (M(n.touchedFields, e, a),
            (u.touchedFields = n.touchedFields),
            (c ||= (d.touchedFields || f.touchedFields) && t !== a));
        }
        c && s && p.state.next(u);
      }
      return c ? u : {};
    },
    ce = (e, r, i, a) => {
      let o = k(n.errors, e),
        s = (d.isValid || f.isValid) && A(r) && n.isValid !== r;
      if (
        (t.delayError && i
          ? ((c = h(() => ee(e, i))), c(t.delayError))
          : (clearTimeout(l),
            (c = null),
            i ? M(n.errors, e, i) : B(n.errors, e)),
        (i ? !L(o, i) : o) || !z(a) || s)
      ) {
        let t = {
          ...a,
          ...(s && A(r) ? { isValid: r } : {}),
          errors: n.errors,
          name: e,
        };
        ((n = { ...n, ...t }), p.state.next(t));
      }
    },
    le = async (e) => (
      _(e, !0),
      await t.resolver(
        a,
        t.context,
        He(e || s.mount, r, t.criteriaMode, t.shouldUseNativeValidation),
      )
    ),
    ue = async (e) => {
      let { errors: t } = await le(e);
      if ((_(e), e))
        for (let r of e) {
          let e = k(t, r);
          e ? M(n.errors, r, e) : B(n.errors, r);
        }
      else n.errors = t;
      return t;
    },
    de = async ({ name: t, eventType: r }) => {
      if (e.validate) {
        let i = await e.validate({
          formValues: a,
          formState: n,
          name: t,
          eventType: r,
        });
        if (C(i))
          for (let e in i)
            i[e] &&
              Fe(`${ae}.${e}`, {
                message: F(i.message) ? i.message : ``,
                type: P.validate,
              });
        else
          F(i) || !i ? Fe(ae, { message: i || ``, type: P.validate }) : Ne(ae);
        return i;
      }
      return !0;
    },
    I = async ({
      fields: r,
      onlyCheckValid: i,
      name: o,
      eventType: c,
      context: l = { valid: !0, runRootValidation: !1 },
    }) => {
      if (
        e.validate &&
        ((l.runRootValidation = !0),
        !(await de({ name: o, eventType: c })) && ((l.valid = !1), i))
      )
        return l.valid;
      for (let o in r) {
        let u = r[o];
        if (u) {
          let { _f: r, ...f } = u;
          if (r) {
            let o = s.array.has(r.name),
              c = u._f && qe(u._f);
            c && d.validatingFields && _([r.name], !0);
            let f = await at(
              u,
              s.disabled,
              a,
              m,
              t.shouldUseNativeValidation && !i,
              o,
            );
            if (
              (c && d.validatingFields && _([r.name]),
              (f[r.name] && ((l.valid = !1), i)) ||
                (!i &&
                  (k(f, r.name)
                    ? o
                      ? nt(n.errors, f, r.name)
                      : M(n.errors, r.name, f[r.name])
                    : B(n.errors, r.name)),
                e.shouldUseNativeValidation && f[r.name]))
            )
              break;
          }
          !z(f) &&
            (await I({
              context: l,
              onlyCheckValid: i,
              fields: f,
              name: o,
              eventType: c,
            }));
        }
      }
      return l.valid;
    },
    pe = () => {
      for (let e of s.unMount) {
        let t = k(r, e);
        t &&
          (t._f.refs ? t._f.refs.every((e) => !De(e)) : !De(t._f.ref)) &&
          Be(e);
      }
      s.unMount = new Set();
    },
    R = (e, n) => !t.disabled && (e && n && M(a, e, n), !L(je(), i)),
    me = (e, t, n) =>
      fe(e, s, { ...(o.mount ? a : O(t) ? i : F(e) ? { [e]: t } : t) }, n, t),
    he = (e) =>
      ne(k(o.mount ? a : i, e, t.shouldUnregister ? k(i, e, []) : [])),
    ge = (e, t, n = {}) => {
      let i = k(r, e),
        o = t;
      if (i) {
        let n = i._f;
        n &&
          (!n.disabled && M(a, e, Re(t, n)),
          (o = Ce(n.ref) && x(t) ? `` : t),
          we(n.ref)
            ? [...n.ref.options].forEach(
                (e) => (e.selected = o.includes(e.value)),
              )
            : n.refs
              ? y(n.ref)
                ? n.refs.forEach((e) => {
                    (!e.defaultChecked || !e.disabled) &&
                      (Array.isArray(o)
                        ? (e.checked = !!o.find((t) => t === e.value))
                        : (e.checked = o === e.value || !!o));
                  })
                : n.refs.forEach((e) => (e.checked = e.value === o))
              : Se(n.ref)
                ? (n.ref.value = ``)
                : ((n.ref.value = o),
                  n.ref.type || p.state.next({ name: e, values: E(a) })));
      }
      ((n.shouldDirty || n.shouldTouch) &&
        se(e, o, n.shouldTouch, n.shouldDirty, !0),
        n.shouldValidate && Ae(e));
    },
    _e = (e, t, n) => {
      for (let i in t) {
        if (!t.hasOwnProperty(i)) return;
        let a = t[i],
          o = e + `.` + i,
          c = k(r, o);
        (s.array.has(e) || C(a) || (c && !c._f)) && !b(a)
          ? _e(o, a, n)
          : ge(o, a, n);
      }
    },
    ve = (e, t, i = {}) => {
      let c = k(r, e),
        l = s.array.has(e),
        u = E(t),
        m = L(k(a, e), u);
      if ((M(a, e, u), l))
        (p.array.next({ name: e, values: E(a) }),
          (d.isDirty || d.dirtyFields || f.isDirty || f.dirtyFields) &&
            i.shouldDirty &&
            (v(),
            p.state.next({
              name: e,
              dirtyFields: n.dirtyFields,
              isDirty: R(e, u),
            })));
      else {
        let t = (Array.isArray(u) && !u.length) || z(u);
        !c || c._f || x(u) || t ? ge(e, u, i) : _e(e, u, i);
      }
      if (!m) {
        let t = Ye(e, s);
        p.state.next({
          ...(t && n),
          name: o.mount || t ? e : void 0,
          values: E(a),
        });
      }
    },
    Te = (e) => {
      let t = j(e) ? e(a) : e;
      L(a, t) || ((a = { ...a, ...t }), p.state.next({ ...n, values: a }));
    },
    Oe = async (i) => {
      o.mount = !0;
      let l = i.target,
        u = l.name,
        h = !0,
        v = k(r, u),
        y = (e) => {
          h =
            Number.isNaN(e) || (b(e) && isNaN(e.getTime())) || L(e, k(a, u, e));
        },
        x = Ge(t.mode),
        S = Ge(t.reValidateMode);
      if (v) {
        let o,
          b,
          C = l.type ? Ve(v._f) : w(i),
          T = i.type === ie.BLUR || i.type === ie.FOCUS_OUT,
          ee =
            (!Je(v._f) &&
              !e.validate &&
              !t.resolver &&
              !k(n.errors, u) &&
              !v._f.deps) ||
            et(T, k(n.touchedFields, u), n.isSubmitted, S, x),
          te = Ye(u, s, T);
        (M(a, u, C),
          T
            ? (!l || !l.readOnly) && (v._f.onBlur && v._f.onBlur(i), c && c(0))
            : v._f.onChange && v._f.onChange(i));
        let D = se(u, C, T),
          O = !z(D) || te;
        if ((!T && p.state.next({ name: u, type: i.type, values: E(a) }), ee))
          return (
            (d.isValid || f.isValid) &&
              (t.mode === `onBlur` ? T && g() : T || g()),
            O && p.state.next({ name: u, ...(te ? {} : D) })
          );
        if (
          (!t.resolver &&
            e.validate &&
            (await de({ name: u, eventType: i.type })),
          !T && te && p.state.next({ ...n }),
          t.resolver)
        ) {
          let { errors: e } = await le([u]);
          if ((_([u]), y(C), h)) {
            let t = Ze(n.errors, r, u),
              i = Ze(e, r, t.name || u);
            ((o = i.error), (u = i.name), (b = z(e)));
          }
        } else
          (_([u], !0),
            (o = (await at(v, s.disabled, a, m, t.shouldUseNativeValidation))[
              u
            ]),
            _([u]),
            y(C),
            h &&
              (o
                ? (b = !1)
                : (d.isValid || f.isValid) &&
                  (b = await I({
                    fields: r,
                    onlyCheckValid: !0,
                    name: u,
                    eventType: i.type,
                  }))));
        h &&
          (v._f.deps &&
            (!Array.isArray(v._f.deps) || v._f.deps.length > 0) &&
            Ae(v._f.deps),
          ce(u, b, o, D));
      }
    },
    ke = (e, t) => {
      if (k(n.errors, t) && e.focus) return (e.focus(), 1);
    },
    Ae = async (e, i = {}) => {
      let a,
        o,
        c = ye(e);
      if (t.resolver) {
        let t = await ue(O(e) ? e : c);
        ((a = z(t)), (o = e ? !c.some((e) => k(t, e)) : a));
      } else
        e
          ? ((o = (
              await Promise.all(
                c.map(async (e) => {
                  let t = k(r, e);
                  return await I({
                    fields: t && t._f ? { [e]: t } : t,
                    eventType: ie.TRIGGER,
                  });
                }),
              )
            ).every(Boolean)),
            !(!o && !n.isValid) && g())
          : (o = a = await I({ fields: r, name: e, eventType: ie.TRIGGER }));
      return (
        p.state.next({
          ...(!F(e) || ((d.isValid || f.isValid) && a !== n.isValid)
            ? {}
            : { name: e }),
          ...(t.resolver || !e ? { isValid: a } : {}),
          errors: n.errors,
        }),
        i.shouldFocus && !o && Xe(r, ke, e ? c : s.mount),
        o
      );
    },
    je = (e, t) => {
      let r = { ...(o.mount ? a : i) };
      return (
        t && (r = xe(t.dirtyFields ? n.dirtyFields : n.touchedFields, r)),
        O(e) ? r : F(e) ? k(r, e) : e.map((e) => k(r, e))
      );
    },
    Me = (e, t) => ({
      invalid: !!k((t || n).errors, e),
      isDirty: !!k((t || n).dirtyFields, e),
      error: k((t || n).errors, e),
      isValidating: !!k(n.validatingFields, e),
      isTouched: !!k((t || n).touchedFields, e),
    }),
    Ne = (e) => {
      let t = e ? ye(e) : void 0;
      (t?.forEach((e) => B(n.errors, e)),
        t
          ? t.forEach((e) => {
              p.state.next({ name: e, errors: n.errors });
            })
          : p.state.next({ errors: {} }));
    },
    Fe = (e, t, i) => {
      let a = (k(r, e, { _f: {} })._f || {}).ref,
        { ref: o, message: s, type: c, ...l } = k(n.errors, e) || {};
      (M(n.errors, e, { ...l, ...t, ref: a }),
        p.state.next({ name: e, errors: n.errors, isValid: !1 }),
        i && i.shouldFocus && a && a.focus && a.focus());
    },
    Ie = (e, t) =>
      j(e)
        ? p.state.subscribe({
            next: (n) => `values` in n && e(n.values || me(void 0, t), n),
          })
        : me(e, t, !0),
    Le = (e) =>
      p.state.subscribe({
        next: (t) => {
          if (
            $e(e.name, t.name, e.exact) &&
            Qe(t, e.formState || d, pt, e.reRenderRoot)
          ) {
            let r = { ...a };
            e.callback({ values: r, ...n, ...t, defaultValues: i });
          }
        },
      }).unsubscribe,
    ze = (e) => (
      (o.mount = !0),
      (f = { ...f, ...e.formState }),
      Le({ ...e, formState: { ...u, ...e.formState } })
    ),
    Be = (e, o = {}) => {
      for (let c of e ? ye(e) : s.mount)
        (s.mount.delete(c),
          s.array.delete(c),
          o.keepValue || (B(r, c), B(a, c)),
          !o.keepError && B(n.errors, c),
          !o.keepDirty && B(n.dirtyFields, c),
          !o.keepTouched && B(n.touchedFields, c),
          !o.keepIsValidating && B(n.validatingFields, c),
          !t.shouldUnregister && !o.keepDefaultValue && B(i, c));
      (p.state.next({ values: E(a) }),
        p.state.next({ ...n, ...(o.keepDirty ? { isDirty: R() } : {}) }),
        !o.keepIsValid && g());
    },
    Ue = ({ disabled: e, name: t }) => {
      if ((A(e) && o.mount) || e || s.disabled.has(t)) {
        let n = s.disabled.has(t) !== !!e;
        (e ? s.disabled.add(t) : s.disabled.delete(t),
          n && o.mount && !o.action && g());
      }
    },
    Ke = (e, n = {}) => {
      let a = k(r, e),
        c = A(n.disabled) || A(t.disabled),
        l = !s.registerName.has(e) && a && a._f && !a._f.mount;
      return (
        M(r, e, {
          ...(a || {}),
          _f: {
            ...(a && a._f ? a._f : { ref: { name: e } }),
            name: e,
            mount: !0,
            ...n,
          },
        }),
        s.mount.add(e),
        a && !l
          ? Ue({ disabled: A(n.disabled) ? n.disabled : t.disabled, name: e })
          : re(e, !0, n.value),
        {
          ...(c ? { disabled: n.disabled || t.disabled } : {}),
          ...(t.progressive
            ? {
                required: !!n.required,
                min: We(n.min),
                max: We(n.max),
                minLength: We(n.minLength),
                maxLength: We(n.maxLength),
                pattern: We(n.pattern),
              }
            : {}),
          name: e,
          onChange: Oe,
          onBlur: Oe,
          ref: (c) => {
            if (c) {
              (s.registerName.add(e),
                Ke(e, n),
                s.registerName.delete(e),
                (a = k(r, e)));
              let t =
                  (O(c.value) &&
                    c.querySelectorAll &&
                    c.querySelectorAll(`input,select,textarea`)[0]) ||
                  c,
                o = Ee(t),
                l = a._f.refs || [];
              if (o ? l.find((e) => e === t) : t === a._f.ref) return;
              (M(r, e, {
                _f: {
                  ...a._f,
                  ...(o
                    ? {
                        refs: [
                          ...l.filter(De),
                          t,
                          ...(Array.isArray(k(i, e)) ? [{}] : []),
                        ],
                        ref: { type: t.type, name: e },
                      }
                    : { ref: t }),
                },
              }),
                re(e, !1, void 0, t));
            } else
              ((a = k(r, e, {})),
                a._f && (a._f.mount = !1),
                (t.shouldUnregister || n.shouldUnregister) &&
                  !(T(s.array, e) && o.action) &&
                  s.unMount.add(e));
          },
        }
      );
    },
    rt = () => t.shouldFocusError && Xe(r, ke, s.mount),
    it = (e) => {
      A(e) &&
        (p.state.next({ disabled: e }),
        Xe(
          r,
          (t, n) => {
            let i = k(r, n);
            i &&
              ((t.disabled = i._f.disabled || e),
              Array.isArray(i._f.refs) &&
                i._f.refs.forEach((t) => {
                  t.disabled = i._f.disabled || e;
                }));
          },
          0,
          !1,
        ));
    },
    ct = (e, i) => async (o) => {
      let c;
      o && (o.preventDefault && o.preventDefault(), o.persist && o.persist());
      let l = E(a);
      if ((p.state.next({ isSubmitting: !0 }), t.resolver)) {
        let { errors: e, values: t } = await le();
        (_(), (n.errors = e), (l = E(t)));
      } else await I({ fields: r, eventType: ie.SUBMIT });
      if (s.disabled.size) for (let e of s.disabled) B(l, e);
      if ((B(n.errors, oe), z(n.errors))) {
        p.state.next({ errors: {} });
        try {
          await e(l, o);
        } catch (e) {
          c = e;
        }
      } else (i && (await i({ ...n.errors }, o)), rt(), setTimeout(rt));
      if (
        (p.state.next({
          isSubmitted: !0,
          isSubmitting: !1,
          isSubmitSuccessful: z(n.errors) && !c,
          submitCount: n.submitCount + 1,
          errors: n.errors,
        }),
        c)
      )
        throw c;
    },
    lt = (e, t = {}) => {
      k(r, e) &&
        (O(t.defaultValue)
          ? ve(e, E(k(i, e)))
          : (ve(e, t.defaultValue), M(i, e, E(t.defaultValue))),
        t.keepTouched || B(n.touchedFields, e),
        t.keepDirty ||
          (B(n.dirtyFields, e),
          (n.isDirty = t.defaultValue ? R(e, E(k(i, e))) : R())),
        t.keepError || (B(n.errors, e), d.isValid && g()),
        p.state.next({ ...n }));
    },
    ut = (e, c = {}) => {
      let l = e ? E(e) : i,
        u = E(l),
        f = z(e),
        m = f ? i : u;
      if ((c.keepDefaultValues || (i = l), !c.keepValues)) {
        if (c.keepDirtyValues) {
          let e = new Set([...s.mount, ...Object.keys(Pe(i, a))]);
          for (let t of Array.from(e)) {
            let e = k(n.dirtyFields, t),
              r = k(a, t),
              i = k(m, t);
            e && !O(r) ? M(m, t, r) : !e && !O(i) && ve(t, i);
          }
        } else {
          if (te && O(e))
            for (let e of s.mount) {
              let t = k(r, e);
              if (t && t._f) {
                let e = Array.isArray(t._f.refs) ? t._f.refs[0] : t._f.ref;
                if (Ce(e)) {
                  let t = e.closest(`form`);
                  if (t) {
                    t.reset();
                    break;
                  }
                }
              }
            }
          if (c.keepFieldsRef) for (let e of s.mount) ve(e, k(m, e));
          else r = {};
        }
        ((a = t.shouldUnregister ? (c.keepDefaultValues ? E(i) : {}) : E(m)),
          p.array.next({ values: { ...m } }),
          p.state.next({ values: { ...m } }));
      }
      ((s = {
        mount: c.keepDirtyValues ? s.mount : new Set(),
        unMount: new Set(),
        array: new Set(),
        registerName: new Set(),
        disabled: new Set(),
        watch: new Set(),
        watchAll: !1,
        focus: ``,
      }),
        (o.mount =
          !d.isValid ||
          !!c.keepIsValid ||
          !!c.keepDirtyValues ||
          (!t.shouldUnregister && !z(m))),
        (o.watch = !!t.shouldUnregister),
        (o.keepIsValid = !!c.keepIsValid),
        (o.action = !1),
        c.keepErrors || (n.errors = {}),
        p.state.next({
          submitCount: c.keepSubmitCount ? n.submitCount : 0,
          isDirty: f
            ? !1
            : c.keepDirty
              ? n.isDirty
              : !!(c.keepDefaultValues && !L(e, i)),
          isSubmitted: c.keepIsSubmitted ? n.isSubmitted : !1,
          dirtyFields: f
            ? {}
            : c.keepDirtyValues
              ? c.keepDefaultValues && a
                ? Pe(i, a)
                : n.dirtyFields
              : c.keepDefaultValues && e
                ? Pe(i, e)
                : c.keepDirty
                  ? n.dirtyFields
                  : {},
          touchedFields: c.keepTouched ? n.touchedFields : {},
          errors: c.keepErrors ? n.errors : {},
          isSubmitSuccessful: c.keepIsSubmitSuccessful
            ? n.isSubmitSuccessful
            : !1,
          isSubmitting: !1,
          defaultValues: i,
        }));
    },
    dt = (e, n) => ut(j(e) ? e(a) : e, { ...t.resetOptions, ...n }),
    ft = (e, t = {}) => {
      let n = k(r, e),
        i = n && n._f;
      if (i) {
        let e = i.refs ? i.refs[0] : i.ref;
        e.focus &&
          setTimeout(() => {
            (e.focus(), t.shouldSelect && j(e.select) && e.select());
          });
      }
    },
    pt = (e) => {
      n = { ...n, ...e };
    },
    mt = {
      control: {
        register: Ke,
        unregister: Be,
        getFieldState: Me,
        handleSubmit: ct,
        setError: Fe,
        _subscribe: Le,
        _runSchema: le,
        _updateIsValidating: _,
        _focusError: rt,
        _getWatch: me,
        _getDirty: R,
        _setValid: g,
        _setFieldArray: S,
        _setDisabledField: Ue,
        _setErrors: D,
        _getFieldArray: he,
        _reset: ut,
        _resetDefaultValues: () =>
          j(t.defaultValues) &&
          t.defaultValues().then((e) => {
            (dt(e, t.resetOptions), p.state.next({ isLoading: !1 }));
          }),
        _removeUnmounted: pe,
        _disableForm: it,
        _subjects: p,
        _proxyFormState: d,
        get _fields() {
          return r;
        },
        get _formValues() {
          return a;
        },
        get _state() {
          return o;
        },
        set _state(e) {
          o = e;
        },
        get _defaultValues() {
          return i;
        },
        get _names() {
          return s;
        },
        set _names(e) {
          s = e;
        },
        get _formState() {
          return n;
        },
        get _options() {
          return t;
        },
        set _options(e) {
          t = { ...t, ...e };
        },
      },
      subscribe: ze,
      trigger: Ae,
      register: Ke,
      handleSubmit: ct,
      watch: Ie,
      setValue: ve,
      setValues: Te,
      getValues: je,
      reset: dt,
      resetField: lt,
      clearErrors: Ne,
      unregister: Be,
      setError: Fe,
      setFocus: ft,
      getFieldState: Me,
    };
  return { ...mt, formControl: mt };
}
function lt(e = {}) {
  let t = p.useRef(void 0),
    n = p.useRef(void 0),
    [r, i] = p.useState(() => ({
      ...E(st),
      isLoading: j(e.defaultValues),
      errors: e.errors || {},
      disabled: e.disabled || !1,
      defaultValues: j(e.defaultValues) ? void 0 : e.defaultValues,
    }));
  if (!t.current)
    if (e.formControl)
      ((t.current = { ...e.formControl, formState: r }),
        e.defaultValues &&
          !j(e.defaultValues) &&
          e.formControl.reset(e.defaultValues, e.resetOptions));
    else {
      let { formControl: n, ...i } = ct(e);
      t.current = { ...i, formState: r };
    }
  let a = t.current.control;
  return (
    (a._options = e),
    ue(() => {
      let e = a._subscribe({
        formState: a._proxyFormState,
        callback: () => i({ ...a._formState }),
        reRenderRoot: !0,
      });
      return (
        i((e) => ({ ...e, isReady: !0 })),
        (a._formState.isReady = !0),
        e
      );
    }, [a]),
    p.useEffect(() => a._disableForm(e.disabled), [a, e.disabled]),
    p.useEffect(() => {
      (e.mode && (a._options.mode = e.mode),
        e.reValidateMode && (a._options.reValidateMode = e.reValidateMode));
    }, [a, e.mode, e.reValidateMode]),
    p.useEffect(() => {
      e.errors && (a._setErrors(e.errors), a._focusError());
    }, [a, e.errors]),
    p.useEffect(() => {
      e.shouldUnregister && a._subjects.state.next({ values: a._getWatch() });
    }, [a, e.shouldUnregister]),
    p.useEffect(() => {
      if (a._proxyFormState.isDirty) {
        let e = a._getDirty();
        e !== r.isDirty && a._subjects.state.next({ isDirty: e });
      }
    }, [a, r.isDirty]),
    p.useEffect(() => {
      e.values && !L(e.values, n.current)
        ? (a._reset(e.values, {
            keepFieldsRef: !0,
            ...a._options.resetOptions,
          }),
          a._options.resetOptions?.keepIsValid || a._setValid(),
          (n.current = e.values),
          i((e) => ({ ...e })))
        : a._resetDefaultValues();
    }, [a, e.values]),
    p.useEffect(() => {
      (a._state.mount || (a._setValid(), (a._state.mount = !0)),
        a._state.watch &&
          ((a._state.watch = !1), a._subjects.state.next({ ...a._formState })),
        a._removeUnmounted());
    }),
    (t.current.formState = p.useMemo(() => le(r, a), [a, r])),
    t.current
  );
}
function ut({ className: e, ...t }) {
  return (0, m.jsx)(_, {
    "data-slot": `label`,
    className: o(
      `flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50`,
      e,
    ),
    ...t,
  });
}
var dt = _e,
  ft = p.createContext({}),
  pt = ({ ...e }) =>
    (0, m.jsx)(ft.Provider, {
      value: { name: e.name },
      children: (0, m.jsx)(me, { ...e }),
    }),
  mt = () => {
    let e = p.useContext(ft),
      t = p.useContext(ht),
      { getFieldState: n, formState: r } = ge(),
      i = n(e.name, r);
    if (!e) throw Error(`useFormField should be used within <FormField>`);
    let { id: a } = t;
    return {
      id: a,
      name: e.name,
      formItemId: `${a}-form-item`,
      formDescriptionId: `${a}-form-item-description`,
      formMessageId: `${a}-form-item-message`,
      ...i,
    };
  },
  ht = p.createContext({});
function gt({ className: e, ...t }) {
  let n = p.useId();
  return (0, m.jsx)(ht.Provider, {
    value: { id: n },
    children: (0, m.jsx)(`div`, {
      "data-slot": `form-item`,
      className: o(`grid gap-2`, e),
      ...t,
    }),
  });
}
function _t({ className: e, ...t }) {
  let { error: n, formItemId: r } = mt();
  return (0, m.jsx)(ut, {
    "data-slot": `form-label`,
    className: o(n && `text-destructive`, e),
    htmlFor: r,
    ...t,
  });
}
function vt({ ...e }) {
  let {
    error: t,
    formItemId: n,
    formDescriptionId: r,
    formMessageId: i,
  } = mt();
  return (0, m.jsx)(s, {
    "data-slot": `form-control`,
    id: n,
    "aria-describedby": t ? `${r} ${i}` : `${r}`,
    "aria-invalid": !!t,
    ...e,
  });
}
function yt({ className: e, children: t, ...n }) {
  let { error: r, formMessageId: i } = mt(),
    a = r ? String(r?.message ?? ``) : t;
  return a
    ? (0, m.jsx)(`p`, {
        "data-slot": `form-message`,
        id: i,
        className: o(`text-sm font-medium text-destructive`, e),
        ...n,
        children: a,
      })
    : null;
}
function bt({ className: e, type: t, ...n }) {
  return (0, m.jsx)(`input`, {
    type: t,
    "data-slot": `input`,
    className: o(
      `h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40`,
      e,
    ),
    ...n,
  });
}
function xt({ className: e }) {
  return (0, m.jsx)(`svg`, {
    className: e,
    viewBox: `0 0 24 24`,
    fill: `currentColor`,
    "aria-hidden": `true`,
    children: (0, m.jsx)(`path`, {
      d: `M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z`,
    }),
  });
}
function St({ action: e }) {
  return (0, m.jsxs)(`div`, {
    className: `space-y-4`,
    children: [
      (0, m.jsxs)(`div`, {
        className: `flex items-center gap-3`,
        children: [
          (0, m.jsx)(l, { className: `flex-1` }),
          (0, m.jsx)(`span`, {
            className: `text-xs text-muted-foreground`,
            children: `or continue with`,
          }),
          (0, m.jsx)(l, { className: `flex-1` }),
        ],
      }),
      (0, m.jsxs)(`div`, {
        className: `grid grid-cols-2 gap-3`,
        children: [
          (0, m.jsxs)(u, {
            type: `button`,
            variant: `outline`,
            className: `w-full`,
            onClick: () => {},
            children: [
              (0, m.jsxs)(`svg`, {
                className: `size-4 mr-2`,
                viewBox: `0 0 24 24`,
                "aria-hidden": `true`,
                children: [
                  (0, m.jsx)(`path`, {
                    d: `M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z`,
                    fill: `#4285F4`,
                  }),
                  (0, m.jsx)(`path`, {
                    d: `M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z`,
                    fill: `#34A853`,
                  }),
                  (0, m.jsx)(`path`, {
                    d: `M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z`,
                    fill: `#FBBC05`,
                  }),
                  (0, m.jsx)(`path`, {
                    d: `M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z`,
                    fill: `#EA4335`,
                  }),
                ],
              }),
              `Google`,
            ],
          }),
          (0, m.jsxs)(u, {
            type: `button`,
            variant: `outline`,
            className: `w-full`,
            onClick: () => {},
            children: [(0, m.jsx)(xt, { className: `size-4 mr-2` }), `GitHub`],
          }),
        ],
      }),
    ],
  });
}
var Ct = (e, t, n) => {
    if (e && `reportValidity` in e) {
      let r = k(n, t);
      (e.setCustomValidity((r && r.message) || ``), e.reportValidity());
    }
  },
  wt = (e, t) => {
    for (let n in t.fields) {
      let r = t.fields[n];
      r && r.ref && `reportValidity` in r.ref
        ? Ct(r.ref, n, e)
        : r && r.refs && r.refs.forEach((t) => Ct(t, n, e));
    }
  },
  Tt = (e, t) => {
    t.shouldUseNativeValidation && wt(e, t);
    let n = {};
    for (let r in e) {
      let i = k(t.fields, r),
        a = Object.assign(e[r] || {}, { ref: i && i.ref });
      if (Et(t.names || Object.keys(e), r)) {
        let e = Object.assign({}, k(n, r));
        (M(e, `root`, a), M(n, r, e));
      } else M(n, r, a);
    }
    return n;
  },
  Et = (e, t) => {
    let n = Dt(t);
    return e.some((e) => Dt(e).match(`^${n}\\.\\d+`));
  };
function Dt(e) {
  return e.replace(/\]|\[/g, ``);
}
var Ot;
function V(e, t, n) {
  function r(n, r) {
    if (
      (n._zod ||
        Object.defineProperty(n, `_zod`, {
          value: { def: r, constr: o, traits: new Set() },
          enumerable: !1,
        }),
      n._zod.traits.has(e))
    )
      return;
    (n._zod.traits.add(e), t(n, r));
    let i = o.prototype,
      a = Object.keys(i);
    for (let e = 0; e < a.length; e++) {
      let t = a[e];
      t in n || (n[t] = i[t].bind(n));
    }
  }
  let i = n?.Parent ?? Object;
  class a extends i {}
  Object.defineProperty(a, `name`, { value: e });
  function o(e) {
    var t;
    let i = n?.Parent ? new a() : this;
    (r(i, e), (t = i._zod).deferred ?? (t.deferred = []));
    for (let e of i._zod.deferred) e();
    return i;
  }
  return (
    Object.defineProperty(o, `init`, { value: r }),
    Object.defineProperty(o, Symbol.hasInstance, {
      value: (t) =>
        n?.Parent && t instanceof n.Parent ? !0 : t?._zod?.traits?.has(e),
    }),
    Object.defineProperty(o, `name`, { value: e }),
    o
  );
}
var kt = class extends Error {
    constructor() {
      super(
        `Encountered Promise during synchronous parse. Use .parseAsync() instead.`,
      );
    }
  },
  At = class extends Error {
    constructor(e) {
      (super(`Encountered unidirectional transform during encode: ${e}`),
        (this.name = `ZodEncodeError`));
    }
  };
(Ot = globalThis).__zod_globalConfig ?? (Ot.__zod_globalConfig = {});
var jt = globalThis.__zod_globalConfig;
function Mt(e) {
  return (e && Object.assign(jt, e), jt);
}
function Nt(e) {
  let t = Object.values(e).filter((e) => typeof e == `number`);
  return Object.entries(e)
    .filter(([e, n]) => t.indexOf(+e) === -1)
    .map(([e, t]) => t);
}
function Pt(e, t) {
  return typeof t == `bigint` ? t.toString() : t;
}
function Ft(e) {
  return {
    get value() {
      {
        let t = e();
        return (Object.defineProperty(this, `value`, { value: t }), t);
      }
      throw Error(`cached value already set`);
    },
  };
}
function It(e) {
  return e == null;
}
function Lt(e) {
  let t = +!!e.startsWith(`^`),
    n = e.endsWith(`$`) ? e.length - 1 : e.length;
  return e.slice(t, n);
}
var Rt = Symbol(`evaluating`);
function H(e, t, n) {
  let r;
  Object.defineProperty(e, t, {
    get() {
      if (r !== Rt) return (r === void 0 && ((r = Rt), (r = n())), r);
    },
    set(n) {
      Object.defineProperty(e, t, { value: n });
    },
    configurable: !0,
  });
}
function zt(e, t, n) {
  Object.defineProperty(e, t, {
    value: n,
    writable: !0,
    enumerable: !0,
    configurable: !0,
  });
}
function U(...e) {
  let t = {};
  for (let n of e) Object.assign(t, Object.getOwnPropertyDescriptors(n));
  return Object.defineProperties({}, t);
}
function Bt(e) {
  return JSON.stringify(e);
}
function Vt(e) {
  return e
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, ``)
    .replace(/[\s_-]+/g, `-`)
    .replace(/^-+|-+$/g, ``);
}
var Ht = `captureStackTrace` in Error ? Error.captureStackTrace : (...e) => {};
function Ut(e) {
  return typeof e == `object` && !!e && !Array.isArray(e);
}
var Wt = Ft(() => {
  if (
    jt.jitless ||
    (typeof navigator < `u` && navigator?.userAgent?.includes(`Cloudflare`))
  )
    return !1;
  try {
    return (Function(``), !0);
  } catch {
    return !1;
  }
});
function Gt(e) {
  if (Ut(e) === !1) return !1;
  let t = e.constructor;
  if (t === void 0 || typeof t != `function`) return !0;
  let n = t.prototype;
  return !(
    Ut(n) === !1 ||
    Object.prototype.hasOwnProperty.call(n, `isPrototypeOf`) === !1
  );
}
function Kt(e) {
  return Gt(e)
    ? { ...e }
    : Array.isArray(e)
      ? [...e]
      : e instanceof Map
        ? new Map(e)
        : e instanceof Set
          ? new Set(e)
          : e;
}
var qt = new Set([`string`, `number`, `symbol`]);
function Jt(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}
function W(e, t, n) {
  let r = new e._zod.constr(t ?? e._zod.def);
  return ((!t || n?.parent) && (r._zod.parent = e), r);
}
function G(e) {
  let t = e;
  if (!t) return {};
  if (typeof t == `string`) return { error: () => t };
  if (t?.message !== void 0) {
    if (t?.error !== void 0)
      throw Error("Cannot specify both `message` and `error` params");
    t.error = t.message;
  }
  return (
    delete t.message,
    typeof t.error == `string` ? { ...t, error: () => t.error } : t
  );
}
function Yt(e) {
  return Object.keys(e).filter(
    (t) => e[t]._zod.optin === `optional` && e[t]._zod.optout === `optional`,
  );
}
(-Number.MAX_VALUE, Number.MAX_VALUE);
function Xt(e, t) {
  let n = e._zod.def,
    r = n.checks;
  if (r && r.length > 0)
    throw Error(
      `.pick() cannot be used on object schemas containing refinements`,
    );
  return W(
    e,
    U(e._zod.def, {
      get shape() {
        let e = {};
        for (let r in t) {
          if (!(r in n.shape)) throw Error(`Unrecognized key: "${r}"`);
          t[r] && (e[r] = n.shape[r]);
        }
        return (zt(this, `shape`, e), e);
      },
      checks: [],
    }),
  );
}
function Zt(e, t) {
  let n = e._zod.def,
    r = n.checks;
  if (r && r.length > 0)
    throw Error(
      `.omit() cannot be used on object schemas containing refinements`,
    );
  return W(
    e,
    U(e._zod.def, {
      get shape() {
        let r = { ...e._zod.def.shape };
        for (let e in t) {
          if (!(e in n.shape)) throw Error(`Unrecognized key: "${e}"`);
          t[e] && delete r[e];
        }
        return (zt(this, `shape`, r), r);
      },
      checks: [],
    }),
  );
}
function Qt(e, t) {
  if (!Gt(t)) throw Error(`Invalid input to extend: expected a plain object`);
  let n = e._zod.def.checks;
  if (n && n.length > 0) {
    let n = e._zod.def.shape;
    for (let e in t)
      if (Object.getOwnPropertyDescriptor(n, e) !== void 0)
        throw Error(
          "Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.",
        );
  }
  return W(
    e,
    U(e._zod.def, {
      get shape() {
        let n = { ...e._zod.def.shape, ...t };
        return (zt(this, `shape`, n), n);
      },
    }),
  );
}
function $t(e, t) {
  if (!Gt(t))
    throw Error(`Invalid input to safeExtend: expected a plain object`);
  return W(
    e,
    U(e._zod.def, {
      get shape() {
        let n = { ...e._zod.def.shape, ...t };
        return (zt(this, `shape`, n), n);
      },
    }),
  );
}
function en(e, t) {
  if (e._zod.def.checks?.length)
    throw Error(
      `.merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.`,
    );
  return W(
    e,
    U(e._zod.def, {
      get shape() {
        let n = { ...e._zod.def.shape, ...t._zod.def.shape };
        return (zt(this, `shape`, n), n);
      },
      get catchall() {
        return t._zod.def.catchall;
      },
      checks: t._zod.def.checks ?? [],
    }),
  );
}
function tn(e, t, n) {
  let r = t._zod.def.checks;
  if (r && r.length > 0)
    throw Error(
      `.partial() cannot be used on object schemas containing refinements`,
    );
  return W(
    t,
    U(t._zod.def, {
      get shape() {
        let r = t._zod.def.shape,
          i = { ...r };
        if (n)
          for (let t in n) {
            if (!(t in r)) throw Error(`Unrecognized key: "${t}"`);
            n[t] &&
              (i[t] = e ? new e({ type: `optional`, innerType: r[t] }) : r[t]);
          }
        else
          for (let t in r)
            i[t] = e ? new e({ type: `optional`, innerType: r[t] }) : r[t];
        return (zt(this, `shape`, i), i);
      },
      checks: [],
    }),
  );
}
function nn(e, t, n) {
  return W(
    t,
    U(t._zod.def, {
      get shape() {
        let r = t._zod.def.shape,
          i = { ...r };
        if (n)
          for (let t in n) {
            if (!(t in i)) throw Error(`Unrecognized key: "${t}"`);
            n[t] && (i[t] = new e({ type: `nonoptional`, innerType: r[t] }));
          }
        else
          for (let t in r)
            i[t] = new e({ type: `nonoptional`, innerType: r[t] });
        return (zt(this, `shape`, i), i);
      },
    }),
  );
}
function rn(e, t = 0) {
  if (e.aborted === !0) return !0;
  for (let n = t; n < e.issues.length; n++)
    if (e.issues[n]?.continue !== !0) return !0;
  return !1;
}
function an(e, t = 0) {
  if (e.aborted === !0) return !0;
  for (let n = t; n < e.issues.length; n++)
    if (e.issues[n]?.continue === !1) return !0;
  return !1;
}
function on(e, t) {
  return t.map((t) => {
    var n;
    return ((n = t).path ?? (n.path = []), t.path.unshift(e), t);
  });
}
function sn(e) {
  return typeof e == `string` ? e : e?.message;
}
function cn(e, t, n) {
  let r = e.message
      ? e.message
      : (sn(e.inst?._zod.def?.error?.(e)) ??
        sn(t?.error?.(e)) ??
        sn(n.customError?.(e)) ??
        sn(n.localeError?.(e)) ??
        `Invalid input`),
    { inst: i, continue: a, input: o, ...s } = e;
  return ((s.path ??= []), (s.message = r), t?.reportInput && (s.input = o), s);
}
function ln(e) {
  return Array.isArray(e)
    ? `array`
    : typeof e == `string`
      ? `string`
      : `unknown`;
}
function un(...e) {
  let [t, n, r] = e;
  return typeof t == `string`
    ? { message: t, code: `custom`, input: n, inst: r }
    : { ...t };
}
var dn = (e, t) => {
    ((e.name = `$ZodError`),
      Object.defineProperty(e, `_zod`, { value: e._zod, enumerable: !1 }),
      Object.defineProperty(e, `issues`, { value: t, enumerable: !1 }),
      (e.message = JSON.stringify(t, Pt, 2)),
      Object.defineProperty(e, `toString`, {
        value: () => e.message,
        enumerable: !1,
      }));
  },
  fn = V(`$ZodError`, dn),
  pn = V(`$ZodError`, dn, { Parent: Error });
function mn(e, t = (e) => e.message) {
  let n = {},
    r = [];
  for (let i of e.issues)
    i.path.length > 0
      ? ((n[i.path[0]] = n[i.path[0]] || []), n[i.path[0]].push(t(i)))
      : r.push(t(i));
  return { formErrors: r, fieldErrors: n };
}
function hn(e, t = (e) => e.message) {
  let n = { _errors: [] },
    r = (e, i = []) => {
      for (let a of e.issues)
        if (a.code === `invalid_union` && a.errors.length)
          a.errors.map((e) => r({ issues: e }, [...i, ...a.path]));
        else if (a.code === `invalid_key`)
          r({ issues: a.issues }, [...i, ...a.path]);
        else if (a.code === `invalid_element`)
          r({ issues: a.issues }, [...i, ...a.path]);
        else {
          let e = [...i, ...a.path];
          if (e.length === 0) n._errors.push(t(a));
          else {
            let r = n,
              i = 0;
            for (; i < e.length; ) {
              let n = e[i];
              (i === e.length - 1
                ? ((r[n] = r[n] || { _errors: [] }), r[n]._errors.push(t(a)))
                : (r[n] = r[n] || { _errors: [] }),
                (r = r[n]),
                i++);
            }
          }
        }
    };
  return (r(e), n);
}
var gn = (e) => (t, n, r, i) => {
    let a = r ? { ...r, async: !1 } : { async: !1 },
      o = t._zod.run({ value: n, issues: [] }, a);
    if (o instanceof Promise) throw new kt();
    if (o.issues.length) {
      let t = new (i?.Err ?? e)(o.issues.map((e) => cn(e, a, Mt())));
      throw (Ht(t, i?.callee), t);
    }
    return o.value;
  },
  _n = gn(pn),
  vn = (e) => async (t, n, r, i) => {
    let a = r ? { ...r, async: !0 } : { async: !0 },
      o = t._zod.run({ value: n, issues: [] }, a);
    if ((o instanceof Promise && (o = await o), o.issues.length)) {
      let t = new (i?.Err ?? e)(o.issues.map((e) => cn(e, a, Mt())));
      throw (Ht(t, i?.callee), t);
    }
    return o.value;
  },
  yn = vn(pn),
  bn = (e) => (t, n, r) => {
    let i = r ? { ...r, async: !1 } : { async: !1 },
      a = t._zod.run({ value: n, issues: [] }, i);
    if (a instanceof Promise) throw new kt();
    return a.issues.length
      ? {
          success: !1,
          error: new (e ?? fn)(a.issues.map((e) => cn(e, i, Mt()))),
        }
      : { success: !0, data: a.value };
  },
  xn = bn(pn),
  Sn = (e) => async (t, n, r) => {
    let i = r ? { ...r, async: !0 } : { async: !0 },
      a = t._zod.run({ value: n, issues: [] }, i);
    return (
      a instanceof Promise && (a = await a),
      a.issues.length
        ? { success: !1, error: new e(a.issues.map((e) => cn(e, i, Mt()))) }
        : { success: !0, data: a.value }
    );
  },
  Cn = Sn(pn),
  wn = (e) => (t, n, r) => {
    let i = r ? { ...r, direction: `backward` } : { direction: `backward` };
    return gn(e)(t, n, i);
  },
  Tn = (e) => (t, n, r) => gn(e)(t, n, r),
  En = (e) => async (t, n, r) => {
    let i = r ? { ...r, direction: `backward` } : { direction: `backward` };
    return vn(e)(t, n, i);
  },
  Dn = (e) => async (t, n, r) => vn(e)(t, n, r),
  On = (e) => (t, n, r) => {
    let i = r ? { ...r, direction: `backward` } : { direction: `backward` };
    return bn(e)(t, n, i);
  },
  kn = (e) => (t, n, r) => bn(e)(t, n, r),
  An = (e) => async (t, n, r) => {
    let i = r ? { ...r, direction: `backward` } : { direction: `backward` };
    return Sn(e)(t, n, i);
  },
  jn = (e) => async (t, n, r) => Sn(e)(t, n, r),
  Mn = /^[cC][0-9a-z]{6,}$/,
  Nn = /^[0-9a-z]+$/,
  Pn = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
  Fn = /^[0-9a-vA-V]{20}$/,
  In = /^[A-Za-z0-9]{27}$/,
  Ln = /^[a-zA-Z0-9_-]{21}$/,
  Rn =
    /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
  zn =
    /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
  Bn = (e) =>
    e
      ? RegExp(
          `^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`,
        )
      : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
  Vn =
    /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
  Hn = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
function Un() {
  return new RegExp(Hn, `u`);
}
var Wn =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  Gn =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
  Kn =
    /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
  qn =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  Jn =
    /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
  Yn = /^[A-Za-z0-9_-]*$/,
  Xn = /^https?$/,
  Zn = /^\+[1-9]\d{6,14}$/,
  Qn = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`,
  $n = RegExp(`^${Qn}$`);
function er(e) {
  let t = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
  return typeof e.precision == `number`
    ? e.precision === -1
      ? `${t}`
      : e.precision === 0
        ? `${t}:[0-5]\\d`
        : `${t}:[0-5]\\d\\.\\d{${e.precision}}`
    : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function tr(e) {
  return RegExp(`^${er(e)}$`);
}
function nr(e) {
  let t = er({ precision: e.precision }),
    n = [`Z`];
  (e.local && n.push(``),
    e.offset && n.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`));
  let r = `${t}(?:${n.join(`|`)})`;
  return RegExp(`^${Qn}T(?:${r})$`);
}
var rr = (e) => {
    let t = e
      ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ``}}`
      : `[\\s\\S]*`;
    return RegExp(`^${t}$`);
  },
  ir = /^[^A-Z]*$/,
  ar = /^[^a-z]*$/,
  K = V(`$ZodCheck`, (e, t) => {
    var n;
    ((e._zod ??= {}),
      (e._zod.def = t),
      (n = e._zod).onattach ?? (n.onattach = []));
  }),
  or = V(`$ZodCheckMaxLength`, (e, t) => {
    var n;
    (K.init(e, t),
      (n = e._zod.def).when ??
        (n.when = (e) => {
          let t = e.value;
          return !It(t) && t.length !== void 0;
        }),
      e._zod.onattach.push((e) => {
        let n = e._zod.bag.maximum ?? 1 / 0;
        t.maximum < n && (e._zod.bag.maximum = t.maximum);
      }),
      (e._zod.check = (n) => {
        let r = n.value;
        if (r.length <= t.maximum) return;
        let i = ln(r);
        n.issues.push({
          origin: i,
          code: `too_big`,
          maximum: t.maximum,
          inclusive: !0,
          input: r,
          inst: e,
          continue: !t.abort,
        });
      }));
  }),
  sr = V(`$ZodCheckMinLength`, (e, t) => {
    var n;
    (K.init(e, t),
      (n = e._zod.def).when ??
        (n.when = (e) => {
          let t = e.value;
          return !It(t) && t.length !== void 0;
        }),
      e._zod.onattach.push((e) => {
        let n = e._zod.bag.minimum ?? -1 / 0;
        t.minimum > n && (e._zod.bag.minimum = t.minimum);
      }),
      (e._zod.check = (n) => {
        let r = n.value;
        if (r.length >= t.minimum) return;
        let i = ln(r);
        n.issues.push({
          origin: i,
          code: `too_small`,
          minimum: t.minimum,
          inclusive: !0,
          input: r,
          inst: e,
          continue: !t.abort,
        });
      }));
  }),
  cr = V(`$ZodCheckLengthEquals`, (e, t) => {
    var n;
    (K.init(e, t),
      (n = e._zod.def).when ??
        (n.when = (e) => {
          let t = e.value;
          return !It(t) && t.length !== void 0;
        }),
      e._zod.onattach.push((e) => {
        let n = e._zod.bag;
        ((n.minimum = t.length), (n.maximum = t.length), (n.length = t.length));
      }),
      (e._zod.check = (n) => {
        let r = n.value,
          i = r.length;
        if (i === t.length) return;
        let a = ln(r),
          o = i > t.length;
        n.issues.push({
          origin: a,
          ...(o
            ? { code: `too_big`, maximum: t.length }
            : { code: `too_small`, minimum: t.length }),
          inclusive: !0,
          exact: !0,
          input: n.value,
          inst: e,
          continue: !t.abort,
        });
      }));
  }),
  lr = V(`$ZodCheckStringFormat`, (e, t) => {
    var n, r;
    (K.init(e, t),
      e._zod.onattach.push((e) => {
        let n = e._zod.bag;
        ((n.format = t.format),
          t.pattern && ((n.patterns ??= new Set()), n.patterns.add(t.pattern)));
      }),
      t.pattern
        ? ((n = e._zod).check ??
          (n.check = (n) => {
            ((t.pattern.lastIndex = 0),
              !t.pattern.test(n.value) &&
                n.issues.push({
                  origin: `string`,
                  code: `invalid_format`,
                  format: t.format,
                  input: n.value,
                  ...(t.pattern ? { pattern: t.pattern.toString() } : {}),
                  inst: e,
                  continue: !t.abort,
                }));
          }))
        : ((r = e._zod).check ?? (r.check = () => {})));
  }),
  ur = V(`$ZodCheckRegex`, (e, t) => {
    (lr.init(e, t),
      (e._zod.check = (n) => {
        ((t.pattern.lastIndex = 0),
          !t.pattern.test(n.value) &&
            n.issues.push({
              origin: `string`,
              code: `invalid_format`,
              format: `regex`,
              input: n.value,
              pattern: t.pattern.toString(),
              inst: e,
              continue: !t.abort,
            }));
      }));
  }),
  dr = V(`$ZodCheckLowerCase`, (e, t) => {
    ((t.pattern ??= ir), lr.init(e, t));
  }),
  fr = V(`$ZodCheckUpperCase`, (e, t) => {
    ((t.pattern ??= ar), lr.init(e, t));
  }),
  pr = V(`$ZodCheckIncludes`, (e, t) => {
    K.init(e, t);
    let n = Jt(t.includes),
      r = new RegExp(
        typeof t.position == `number` ? `^.{${t.position}}${n}` : n,
      );
    ((t.pattern = r),
      e._zod.onattach.push((e) => {
        let t = e._zod.bag;
        ((t.patterns ??= new Set()), t.patterns.add(r));
      }),
      (e._zod.check = (n) => {
        n.value.includes(t.includes, t.position) ||
          n.issues.push({
            origin: `string`,
            code: `invalid_format`,
            format: `includes`,
            includes: t.includes,
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  }),
  mr = V(`$ZodCheckStartsWith`, (e, t) => {
    K.init(e, t);
    let n = RegExp(`^${Jt(t.prefix)}.*`);
    ((t.pattern ??= n),
      e._zod.onattach.push((e) => {
        let t = e._zod.bag;
        ((t.patterns ??= new Set()), t.patterns.add(n));
      }),
      (e._zod.check = (n) => {
        n.value.startsWith(t.prefix) ||
          n.issues.push({
            origin: `string`,
            code: `invalid_format`,
            format: `starts_with`,
            prefix: t.prefix,
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  }),
  hr = V(`$ZodCheckEndsWith`, (e, t) => {
    K.init(e, t);
    let n = RegExp(`.*${Jt(t.suffix)}$`);
    ((t.pattern ??= n),
      e._zod.onattach.push((e) => {
        let t = e._zod.bag;
        ((t.patterns ??= new Set()), t.patterns.add(n));
      }),
      (e._zod.check = (n) => {
        n.value.endsWith(t.suffix) ||
          n.issues.push({
            origin: `string`,
            code: `invalid_format`,
            format: `ends_with`,
            suffix: t.suffix,
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  }),
  gr = V(`$ZodCheckOverwrite`, (e, t) => {
    (K.init(e, t),
      (e._zod.check = (e) => {
        e.value = t.tx(e.value);
      }));
  }),
  _r = class {
    constructor(e = []) {
      ((this.content = []), (this.indent = 0), this && (this.args = e));
    }
    indented(e) {
      ((this.indent += 1), e(this), --this.indent);
    }
    write(e) {
      if (typeof e == `function`) {
        (e(this, { execution: `sync` }), e(this, { execution: `async` }));
        return;
      }
      let t = e
          .split(
            `
`,
          )
          .filter((e) => e),
        n = Math.min(...t.map((e) => e.length - e.trimStart().length)),
        r = t
          .map((e) => e.slice(n))
          .map((e) => ` `.repeat(this.indent * 2) + e);
      for (let e of r) this.content.push(e);
    }
    compile() {
      let e = Function,
        t = this?.args,
        n = [...(this?.content ?? [``]).map((e) => `  ${e}`)];
      return new e(
        ...t,
        n.join(`
`),
      );
    }
  },
  vr = { major: 4, minor: 4, patch: 3 },
  q = V(`$ZodType`, (e, t) => {
    var n;
    ((e ??= {}),
      (e._zod.def = t),
      (e._zod.bag = e._zod.bag || {}),
      (e._zod.version = vr));
    let r = [...(e._zod.def.checks ?? [])];
    e._zod.traits.has(`$ZodCheck`) && r.unshift(e);
    for (let t of r) for (let n of t._zod.onattach) n(e);
    if (r.length === 0)
      ((n = e._zod).deferred ?? (n.deferred = []),
        e._zod.deferred?.push(() => {
          e._zod.run = e._zod.parse;
        }));
    else {
      let t = (e, t, n) => {
          let r = rn(e),
            i;
          for (let a of t) {
            if (a._zod.def.when) {
              if (an(e) || !a._zod.def.when(e)) continue;
            } else if (r) continue;
            let t = e.issues.length,
              o = a._zod.check(e);
            if (o instanceof Promise && n?.async === !1) throw new kt();
            if (i || o instanceof Promise)
              i = (i ?? Promise.resolve()).then(async () => {
                (await o, e.issues.length !== t && (r ||= rn(e, t)));
              });
            else {
              if (e.issues.length === t) continue;
              r ||= rn(e, t);
            }
          }
          return i ? i.then(() => e) : e;
        },
        n = (n, i, a) => {
          if (rn(n)) return ((n.aborted = !0), n);
          let o = t(i, r, a);
          if (o instanceof Promise) {
            if (a.async === !1) throw new kt();
            return o.then((t) => e._zod.parse(t, a));
          }
          return e._zod.parse(o, a);
        };
      e._zod.run = (i, a) => {
        if (a.skipChecks) return e._zod.parse(i, a);
        if (a.direction === `backward`) {
          let t = e._zod.parse(
            { value: i.value, issues: [] },
            { ...a, skipChecks: !0 },
          );
          return t instanceof Promise ? t.then((e) => n(e, i, a)) : n(t, i, a);
        }
        let o = e._zod.parse(i, a);
        if (o instanceof Promise) {
          if (a.async === !1) throw new kt();
          return o.then((e) => t(e, r, a));
        }
        return t(o, r, a);
      };
    }
    H(e, `~standard`, () => ({
      validate: (t) => {
        try {
          let n = xn(e, t);
          return n.success ? { value: n.data } : { issues: n.error?.issues };
        } catch {
          return Cn(e, t).then((e) =>
            e.success ? { value: e.data } : { issues: e.error?.issues },
          );
        }
      },
      vendor: `zod`,
      version: 1,
    }));
  }),
  yr = V(`$ZodString`, (e, t) => {
    (q.init(e, t),
      (e._zod.pattern =
        [...(e?._zod.bag?.patterns ?? [])].pop() ?? rr(e._zod.bag)),
      (e._zod.parse = (n, r) => {
        if (t.coerce)
          try {
            n.value = String(n.value);
          } catch {}
        return (
          typeof n.value == `string` ||
            n.issues.push({
              expected: `string`,
              code: `invalid_type`,
              input: n.value,
              inst: e,
            }),
          n
        );
      }));
  }),
  J = V(`$ZodStringFormat`, (e, t) => {
    (lr.init(e, t), yr.init(e, t));
  }),
  br = V(`$ZodGUID`, (e, t) => {
    ((t.pattern ??= zn), J.init(e, t));
  }),
  xr = V(`$ZodUUID`, (e, t) => {
    if (t.version) {
      let e = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[
        t.version
      ];
      if (e === void 0) throw Error(`Invalid UUID version: "${t.version}"`);
      t.pattern ??= Bn(e);
    } else t.pattern ??= Bn();
    J.init(e, t);
  }),
  Sr = V(`$ZodEmail`, (e, t) => {
    ((t.pattern ??= Vn), J.init(e, t));
  }),
  Cr = V(`$ZodURL`, (e, t) => {
    (J.init(e, t),
      (e._zod.check = (n) => {
        try {
          let r = n.value.trim();
          if (
            !t.normalize &&
            t.protocol?.source === Xn.source &&
            !/^https?:\/\//i.test(r)
          ) {
            n.issues.push({
              code: `invalid_format`,
              format: `url`,
              note: `Invalid URL format`,
              input: n.value,
              inst: e,
              continue: !t.abort,
            });
            return;
          }
          let i = new URL(r);
          (t.hostname &&
            ((t.hostname.lastIndex = 0),
            t.hostname.test(i.hostname) ||
              n.issues.push({
                code: `invalid_format`,
                format: `url`,
                note: `Invalid hostname`,
                pattern: t.hostname.source,
                input: n.value,
                inst: e,
                continue: !t.abort,
              })),
            t.protocol &&
              ((t.protocol.lastIndex = 0),
              t.protocol.test(
                i.protocol.endsWith(`:`) ? i.protocol.slice(0, -1) : i.protocol,
              ) ||
                n.issues.push({
                  code: `invalid_format`,
                  format: `url`,
                  note: `Invalid protocol`,
                  pattern: t.protocol.source,
                  input: n.value,
                  inst: e,
                  continue: !t.abort,
                })),
            t.normalize ? (n.value = i.href) : (n.value = r));
          return;
        } catch {
          n.issues.push({
            code: `invalid_format`,
            format: `url`,
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
        }
      }));
  }),
  wr = V(`$ZodEmoji`, (e, t) => {
    ((t.pattern ??= Un()), J.init(e, t));
  }),
  Tr = V(`$ZodNanoID`, (e, t) => {
    ((t.pattern ??= Ln), J.init(e, t));
  }),
  Er = V(`$ZodCUID`, (e, t) => {
    ((t.pattern ??= Mn), J.init(e, t));
  }),
  Dr = V(`$ZodCUID2`, (e, t) => {
    ((t.pattern ??= Nn), J.init(e, t));
  }),
  Or = V(`$ZodULID`, (e, t) => {
    ((t.pattern ??= Pn), J.init(e, t));
  }),
  kr = V(`$ZodXID`, (e, t) => {
    ((t.pattern ??= Fn), J.init(e, t));
  }),
  Ar = V(`$ZodKSUID`, (e, t) => {
    ((t.pattern ??= In), J.init(e, t));
  }),
  jr = V(`$ZodISODateTime`, (e, t) => {
    ((t.pattern ??= nr(t)), J.init(e, t));
  }),
  Mr = V(`$ZodISODate`, (e, t) => {
    ((t.pattern ??= $n), J.init(e, t));
  }),
  Nr = V(`$ZodISOTime`, (e, t) => {
    ((t.pattern ??= tr(t)), J.init(e, t));
  }),
  Pr = V(`$ZodISODuration`, (e, t) => {
    ((t.pattern ??= Rn), J.init(e, t));
  }),
  Fr = V(`$ZodIPv4`, (e, t) => {
    ((t.pattern ??= Wn), J.init(e, t), (e._zod.bag.format = `ipv4`));
  }),
  Ir = V(`$ZodIPv6`, (e, t) => {
    ((t.pattern ??= Gn),
      J.init(e, t),
      (e._zod.bag.format = `ipv6`),
      (e._zod.check = (n) => {
        try {
          new URL(`http://[${n.value}]`);
        } catch {
          n.issues.push({
            code: `invalid_format`,
            format: `ipv6`,
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
        }
      }));
  }),
  Lr = V(`$ZodCIDRv4`, (e, t) => {
    ((t.pattern ??= Kn), J.init(e, t));
  }),
  Rr = V(`$ZodCIDRv6`, (e, t) => {
    ((t.pattern ??= qn),
      J.init(e, t),
      (e._zod.check = (n) => {
        let r = n.value.split(`/`);
        try {
          if (r.length !== 2) throw Error();
          let [e, t] = r;
          if (!t) throw Error();
          let n = Number(t);
          if (`${n}` !== t || n < 0 || n > 128) throw Error();
          new URL(`http://[${e}]`);
        } catch {
          n.issues.push({
            code: `invalid_format`,
            format: `cidrv6`,
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
        }
      }));
  });
function zr(e) {
  if (e === ``) return !0;
  if (/\s/.test(e) || e.length % 4 != 0) return !1;
  try {
    return (atob(e), !0);
  } catch {
    return !1;
  }
}
var Br = V(`$ZodBase64`, (e, t) => {
  ((t.pattern ??= Jn),
    J.init(e, t),
    (e._zod.bag.contentEncoding = `base64`),
    (e._zod.check = (n) => {
      zr(n.value) ||
        n.issues.push({
          code: `invalid_format`,
          format: `base64`,
          input: n.value,
          inst: e,
          continue: !t.abort,
        });
    }));
});
function Vr(e) {
  if (!Yn.test(e)) return !1;
  let t = e.replace(/[-_]/g, (e) => (e === `-` ? `+` : `/`));
  return zr(t.padEnd(Math.ceil(t.length / 4) * 4, `=`));
}
var Hr = V(`$ZodBase64URL`, (e, t) => {
    ((t.pattern ??= Yn),
      J.init(e, t),
      (e._zod.bag.contentEncoding = `base64url`),
      (e._zod.check = (n) => {
        Vr(n.value) ||
          n.issues.push({
            code: `invalid_format`,
            format: `base64url`,
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  }),
  Ur = V(`$ZodE164`, (e, t) => {
    ((t.pattern ??= Zn), J.init(e, t));
  });
function Wr(e, t = null) {
  try {
    let n = e.split(`.`);
    if (n.length !== 3) return !1;
    let [r] = n;
    if (!r) return !1;
    let i = JSON.parse(atob(r));
    return !(
      (`typ` in i && i?.typ !== `JWT`) ||
      !i.alg ||
      (t && (!(`alg` in i) || i.alg !== t))
    );
  } catch {
    return !1;
  }
}
var Gr = V(`$ZodJWT`, (e, t) => {
    (J.init(e, t),
      (e._zod.check = (n) => {
        Wr(n.value, t.alg) ||
          n.issues.push({
            code: `invalid_format`,
            format: `jwt`,
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  }),
  Kr = V(`$ZodUnknown`, (e, t) => {
    (q.init(e, t), (e._zod.parse = (e) => e));
  }),
  qr = V(`$ZodNever`, (e, t) => {
    (q.init(e, t),
      (e._zod.parse = (t, n) => (
        t.issues.push({
          expected: `never`,
          code: `invalid_type`,
          input: t.value,
          inst: e,
        }),
        t
      )));
  });
function Jr(e, t, n) {
  (e.issues.length && t.issues.push(...on(n, e.issues)),
    (t.value[n] = e.value));
}
var Yr = V(`$ZodArray`, (e, t) => {
  (q.init(e, t),
    (e._zod.parse = (n, r) => {
      let i = n.value;
      if (!Array.isArray(i))
        return (
          n.issues.push({
            expected: `array`,
            code: `invalid_type`,
            input: i,
            inst: e,
          }),
          n
        );
      n.value = Array(i.length);
      let a = [];
      for (let e = 0; e < i.length; e++) {
        let o = i[e],
          s = t.element._zod.run({ value: o, issues: [] }, r);
        s instanceof Promise ? a.push(s.then((t) => Jr(t, n, e))) : Jr(s, n, e);
      }
      return a.length ? Promise.all(a).then(() => n) : n;
    }));
});
function Xr(e, t, n, r, i, a) {
  let o = n in r;
  if (e.issues.length) {
    if (i && a && !o) return;
    t.issues.push(...on(n, e.issues));
  }
  if (!o && !i) {
    e.issues.length ||
      t.issues.push({
        code: `invalid_type`,
        expected: `nonoptional`,
        input: void 0,
        path: [n],
      });
    return;
  }
  e.value === void 0 ? o && (t.value[n] = void 0) : (t.value[n] = e.value);
}
function Zr(e) {
  let t = Object.keys(e.shape);
  for (let n of t)
    if (!e.shape?.[n]?._zod?.traits?.has(`$ZodType`))
      throw Error(`Invalid element at key "${n}": expected a Zod schema`);
  let n = Yt(e.shape);
  return {
    ...e,
    keys: t,
    keySet: new Set(t),
    numKeys: t.length,
    optionalKeys: new Set(n),
  };
}
function Qr(e, t, n, r, i, a) {
  let o = [],
    s = i.keySet,
    c = i.catchall._zod,
    l = c.def.type,
    u = c.optin === `optional`,
    d = c.optout === `optional`;
  for (let i in t) {
    if (i === `__proto__` || s.has(i)) continue;
    if (l === `never`) {
      o.push(i);
      continue;
    }
    let a = c.run({ value: t[i], issues: [] }, r);
    a instanceof Promise
      ? e.push(a.then((e) => Xr(e, n, i, t, u, d)))
      : Xr(a, n, i, t, u, d);
  }
  return (
    o.length &&
      n.issues.push({ code: `unrecognized_keys`, keys: o, input: t, inst: a }),
    e.length ? Promise.all(e).then(() => n) : n
  );
}
var $r = V(`$ZodObject`, (e, t) => {
    if ((q.init(e, t), !Object.getOwnPropertyDescriptor(t, `shape`)?.get)) {
      let e = t.shape;
      Object.defineProperty(t, `shape`, {
        get: () => {
          let n = { ...e };
          return (Object.defineProperty(t, `shape`, { value: n }), n);
        },
      });
    }
    let n = Ft(() => Zr(t));
    H(e._zod, `propValues`, () => {
      let e = t.shape,
        n = {};
      for (let t in e) {
        let r = e[t]._zod;
        if (r.values) {
          n[t] ?? (n[t] = new Set());
          for (let e of r.values) n[t].add(e);
        }
      }
      return n;
    });
    let r = Ut,
      i = t.catchall,
      a;
    e._zod.parse = (t, o) => {
      a ??= n.value;
      let s = t.value;
      if (!r(s))
        return (
          t.issues.push({
            expected: `object`,
            code: `invalid_type`,
            input: s,
            inst: e,
          }),
          t
        );
      t.value = {};
      let c = [],
        l = a.shape;
      for (let e of a.keys) {
        let n = l[e],
          r = n._zod.optin === `optional`,
          i = n._zod.optout === `optional`,
          a = n._zod.run({ value: s[e], issues: [] }, o);
        a instanceof Promise
          ? c.push(a.then((n) => Xr(n, t, e, s, r, i)))
          : Xr(a, t, e, s, r, i);
      }
      return i
        ? Qr(c, s, t, o, n.value, e)
        : c.length
          ? Promise.all(c).then(() => t)
          : t;
    };
  }),
  ei = V(`$ZodObjectJIT`, (e, t) => {
    $r.init(e, t);
    let n = e._zod.parse,
      r = Ft(() => Zr(t)),
      i = (e) => {
        let t = new _r([`shape`, `payload`, `ctx`]),
          n = r.value,
          i = (e) => {
            let t = Bt(e);
            return `shape[${t}]._zod.run({ value: input[${t}], issues: [] }, ctx)`;
          };
        t.write(`const input = payload.value;`);
        let a = Object.create(null),
          o = 0;
        for (let e of n.keys) a[e] = `key_${o++}`;
        t.write(`const newResult = {};`);
        for (let r of n.keys) {
          let n = a[r],
            o = Bt(r),
            s = e[r],
            c = s?._zod?.optin === `optional`,
            l = s?._zod?.optout === `optional`;
          (t.write(`const ${n} = ${i(r)};`),
            c && l
              ? t.write(`
        if (${n}.issues.length) {
          if (${o} in input) {
            payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${o}, ...iss.path] : [${o}]
            })));
          }
        }
        
        if (${n}.value === undefined) {
          if (${o} in input) {
            newResult[${o}] = undefined;
          }
        } else {
          newResult[${o}] = ${n}.value;
        }
        
      `)
              : c
                ? t.write(`
        if (${n}.issues.length) {
          payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${o}, ...iss.path] : [${o}]
          })));
        }
        
        if (${n}.value === undefined) {
          if (${o} in input) {
            newResult[${o}] = undefined;
          }
        } else {
          newResult[${o}] = ${n}.value;
        }
        
      `)
                : t.write(`
        const ${n}_present = ${o} in input;
        if (${n}.issues.length) {
          payload.issues = payload.issues.concat(${n}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${o}, ...iss.path] : [${o}]
          })));
        }
        if (!${n}_present && !${n}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${o}]
          });
        }

        if (${n}_present) {
          if (${n}.value === undefined) {
            newResult[${o}] = undefined;
          } else {
            newResult[${o}] = ${n}.value;
          }
        }

      `));
        }
        (t.write(`payload.value = newResult;`), t.write(`return payload;`));
        let s = t.compile();
        return (t, n) => s(e, t, n);
      },
      a,
      o = Ut,
      s = !jt.jitless,
      c = s && Wt.value,
      l = t.catchall,
      u;
    e._zod.parse = (d, f) => {
      u ??= r.value;
      let p = d.value;
      return o(p)
        ? s && c && f?.async === !1 && f.jitless !== !0
          ? ((a ||= i(t.shape)), (d = a(d, f)), l ? Qr([], p, d, f, u, e) : d)
          : n(d, f)
        : (d.issues.push({
            expected: `object`,
            code: `invalid_type`,
            input: p,
            inst: e,
          }),
          d);
    };
  });
function ti(e, t, n, r) {
  for (let n of e) if (n.issues.length === 0) return ((t.value = n.value), t);
  let i = e.filter((e) => !rn(e));
  return i.length === 1
    ? ((t.value = i[0].value), i[0])
    : (t.issues.push({
        code: `invalid_union`,
        input: t.value,
        inst: n,
        errors: e.map((e) => e.issues.map((e) => cn(e, r, Mt()))),
      }),
      t);
}
var ni = V(`$ZodUnion`, (e, t) => {
    (q.init(e, t),
      H(e._zod, `optin`, () =>
        t.options.some((e) => e._zod.optin === `optional`)
          ? `optional`
          : void 0,
      ),
      H(e._zod, `optout`, () =>
        t.options.some((e) => e._zod.optout === `optional`)
          ? `optional`
          : void 0,
      ),
      H(e._zod, `values`, () => {
        if (t.options.every((e) => e._zod.values))
          return new Set(t.options.flatMap((e) => Array.from(e._zod.values)));
      }),
      H(e._zod, `pattern`, () => {
        if (t.options.every((e) => e._zod.pattern)) {
          let e = t.options.map((e) => e._zod.pattern);
          return RegExp(`^(${e.map((e) => Lt(e.source)).join(`|`)})$`);
        }
      }));
    let n = t.options.length === 1 ? t.options[0]._zod.run : null;
    e._zod.parse = (r, i) => {
      if (n) return n(r, i);
      let a = !1,
        o = [];
      for (let e of t.options) {
        let t = e._zod.run({ value: r.value, issues: [] }, i);
        if (t instanceof Promise) (o.push(t), (a = !0));
        else {
          if (t.issues.length === 0) return t;
          o.push(t);
        }
      }
      return a ? Promise.all(o).then((t) => ti(t, r, e, i)) : ti(o, r, e, i);
    };
  }),
  ri = V(`$ZodIntersection`, (e, t) => {
    (q.init(e, t),
      (e._zod.parse = (e, n) => {
        let r = e.value,
          i = t.left._zod.run({ value: r, issues: [] }, n),
          a = t.right._zod.run({ value: r, issues: [] }, n);
        return i instanceof Promise || a instanceof Promise
          ? Promise.all([i, a]).then(([t, n]) => ai(e, t, n))
          : ai(e, i, a);
      }));
  });
function ii(e, t) {
  if (e === t || (e instanceof Date && t instanceof Date && +e == +t))
    return { valid: !0, data: e };
  if (Gt(e) && Gt(t)) {
    let n = Object.keys(t),
      r = Object.keys(e).filter((e) => n.indexOf(e) !== -1),
      i = { ...e, ...t };
    for (let n of r) {
      let r = ii(e[n], t[n]);
      if (!r.valid)
        return { valid: !1, mergeErrorPath: [n, ...r.mergeErrorPath] };
      i[n] = r.data;
    }
    return { valid: !0, data: i };
  }
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length) return { valid: !1, mergeErrorPath: [] };
    let n = [];
    for (let r = 0; r < e.length; r++) {
      let i = e[r],
        a = t[r],
        o = ii(i, a);
      if (!o.valid)
        return { valid: !1, mergeErrorPath: [r, ...o.mergeErrorPath] };
      n.push(o.data);
    }
    return { valid: !0, data: n };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function ai(e, t, n) {
  let r = new Map(),
    i;
  for (let n of t.issues)
    if (n.code === `unrecognized_keys`) {
      i ??= n;
      for (let e of n.keys) (r.has(e) || r.set(e, {}), (r.get(e).l = !0));
    } else e.issues.push(n);
  for (let t of n.issues)
    if (t.code === `unrecognized_keys`)
      for (let e of t.keys) (r.has(e) || r.set(e, {}), (r.get(e).r = !0));
    else e.issues.push(t);
  let a = [...r].filter(([, e]) => e.l && e.r).map(([e]) => e);
  if ((a.length && i && e.issues.push({ ...i, keys: a }), rn(e))) return e;
  let o = ii(t.value, n.value);
  if (!o.valid)
    throw Error(
      `Unmergable intersection. Error path: ${JSON.stringify(o.mergeErrorPath)}`,
    );
  return ((e.value = o.data), e);
}
var oi = V(`$ZodEnum`, (e, t) => {
    q.init(e, t);
    let n = Nt(t.entries),
      r = new Set(n);
    ((e._zod.values = r),
      (e._zod.pattern = RegExp(
        `^(${n
          .filter((e) => qt.has(typeof e))
          .map((e) => (typeof e == `string` ? Jt(e) : e.toString()))
          .join(`|`)})$`,
      )),
      (e._zod.parse = (t, i) => {
        let a = t.value;
        return (
          r.has(a) ||
            t.issues.push({
              code: `invalid_value`,
              values: n,
              input: a,
              inst: e,
            }),
          t
        );
      }));
  }),
  si = V(`$ZodTransform`, (e, t) => {
    (q.init(e, t),
      (e._zod.optin = `optional`),
      (e._zod.parse = (n, r) => {
        if (r.direction === `backward`) throw new At(e.constructor.name);
        let i = t.transform(n.value, n);
        if (r.async)
          return (i instanceof Promise ? i : Promise.resolve(i)).then(
            (e) => ((n.value = e), (n.fallback = !0), n),
          );
        if (i instanceof Promise) throw new kt();
        return ((n.value = i), (n.fallback = !0), n);
      }));
  });
function ci(e, t) {
  return t === void 0 && (e.issues.length || e.fallback)
    ? { issues: [], value: void 0 }
    : e;
}
var li = V(`$ZodOptional`, (e, t) => {
    (q.init(e, t),
      (e._zod.optin = `optional`),
      (e._zod.optout = `optional`),
      H(e._zod, `values`, () =>
        t.innerType._zod.values
          ? new Set([...t.innerType._zod.values, void 0])
          : void 0,
      ),
      H(e._zod, `pattern`, () => {
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${Lt(e.source)})?$`) : void 0;
      }),
      (e._zod.parse = (e, n) => {
        if (t.innerType._zod.optin === `optional`) {
          let r = e.value,
            i = t.innerType._zod.run(e, n);
          return i instanceof Promise ? i.then((e) => ci(e, r)) : ci(i, r);
        }
        return e.value === void 0 ? e : t.innerType._zod.run(e, n);
      }));
  }),
  ui = V(`$ZodExactOptional`, (e, t) => {
    (li.init(e, t),
      H(e._zod, `values`, () => t.innerType._zod.values),
      H(e._zod, `pattern`, () => t.innerType._zod.pattern),
      (e._zod.parse = (e, n) => t.innerType._zod.run(e, n)));
  }),
  di = V(`$ZodNullable`, (e, t) => {
    (q.init(e, t),
      H(e._zod, `optin`, () => t.innerType._zod.optin),
      H(e._zod, `optout`, () => t.innerType._zod.optout),
      H(e._zod, `pattern`, () => {
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${Lt(e.source)}|null)$`) : void 0;
      }),
      H(e._zod, `values`, () =>
        t.innerType._zod.values
          ? new Set([...t.innerType._zod.values, null])
          : void 0,
      ),
      (e._zod.parse = (e, n) =>
        e.value === null ? e : t.innerType._zod.run(e, n)));
  }),
  fi = V(`$ZodDefault`, (e, t) => {
    (q.init(e, t),
      (e._zod.optin = `optional`),
      H(e._zod, `values`, () => t.innerType._zod.values),
      (e._zod.parse = (e, n) => {
        if (n.direction === `backward`) return t.innerType._zod.run(e, n);
        if (e.value === void 0) return ((e.value = t.defaultValue), e);
        let r = t.innerType._zod.run(e, n);
        return r instanceof Promise ? r.then((e) => pi(e, t)) : pi(r, t);
      }));
  });
function pi(e, t) {
  return (e.value === void 0 && (e.value = t.defaultValue), e);
}
var mi = V(`$ZodPrefault`, (e, t) => {
    (q.init(e, t),
      (e._zod.optin = `optional`),
      H(e._zod, `values`, () => t.innerType._zod.values),
      (e._zod.parse = (e, n) => (
        n.direction === `backward` ||
          (e.value === void 0 && (e.value = t.defaultValue)),
        t.innerType._zod.run(e, n)
      )));
  }),
  hi = V(`$ZodNonOptional`, (e, t) => {
    (q.init(e, t),
      H(e._zod, `values`, () => {
        let e = t.innerType._zod.values;
        return e ? new Set([...e].filter((e) => e !== void 0)) : void 0;
      }),
      (e._zod.parse = (n, r) => {
        let i = t.innerType._zod.run(n, r);
        return i instanceof Promise ? i.then((t) => gi(t, e)) : gi(i, e);
      }));
  });
function gi(e, t) {
  return (
    !e.issues.length &&
      e.value === void 0 &&
      e.issues.push({
        code: `invalid_type`,
        expected: `nonoptional`,
        input: e.value,
        inst: t,
      }),
    e
  );
}
var _i = V(`$ZodCatch`, (e, t) => {
    (q.init(e, t),
      (e._zod.optin = `optional`),
      H(e._zod, `optout`, () => t.innerType._zod.optout),
      H(e._zod, `values`, () => t.innerType._zod.values),
      (e._zod.parse = (e, n) => {
        if (n.direction === `backward`) return t.innerType._zod.run(e, n);
        let r = t.innerType._zod.run(e, n);
        return r instanceof Promise
          ? r.then(
              (r) => (
                (e.value = r.value),
                r.issues.length &&
                  ((e.value = t.catchValue({
                    ...e,
                    error: { issues: r.issues.map((e) => cn(e, n, Mt())) },
                    input: e.value,
                  })),
                  (e.issues = []),
                  (e.fallback = !0)),
                e
              ),
            )
          : ((e.value = r.value),
            r.issues.length &&
              ((e.value = t.catchValue({
                ...e,
                error: { issues: r.issues.map((e) => cn(e, n, Mt())) },
                input: e.value,
              })),
              (e.issues = []),
              (e.fallback = !0)),
            e);
      }));
  }),
  vi = V(`$ZodPipe`, (e, t) => {
    (q.init(e, t),
      H(e._zod, `values`, () => t.in._zod.values),
      H(e._zod, `optin`, () => t.in._zod.optin),
      H(e._zod, `optout`, () => t.out._zod.optout),
      H(e._zod, `propValues`, () => t.in._zod.propValues),
      (e._zod.parse = (e, n) => {
        if (n.direction === `backward`) {
          let r = t.out._zod.run(e, n);
          return r instanceof Promise
            ? r.then((e) => yi(e, t.in, n))
            : yi(r, t.in, n);
        }
        let r = t.in._zod.run(e, n);
        return r instanceof Promise
          ? r.then((e) => yi(e, t.out, n))
          : yi(r, t.out, n);
      }));
  });
function yi(e, t, n) {
  return e.issues.length
    ? ((e.aborted = !0), e)
    : t._zod.run({ value: e.value, issues: e.issues, fallback: e.fallback }, n);
}
var bi = V(`$ZodReadonly`, (e, t) => {
  (q.init(e, t),
    H(e._zod, `propValues`, () => t.innerType._zod.propValues),
    H(e._zod, `values`, () => t.innerType._zod.values),
    H(e._zod, `optin`, () => t.innerType?._zod?.optin),
    H(e._zod, `optout`, () => t.innerType?._zod?.optout),
    (e._zod.parse = (e, n) => {
      if (n.direction === `backward`) return t.innerType._zod.run(e, n);
      let r = t.innerType._zod.run(e, n);
      return r instanceof Promise ? r.then(xi) : xi(r);
    }));
});
function xi(e) {
  return ((e.value = Object.freeze(e.value)), e);
}
var Si = V(`$ZodCustom`, (e, t) => {
  (K.init(e, t),
    q.init(e, t),
    (e._zod.parse = (e, t) => e),
    (e._zod.check = (n) => {
      let r = n.value,
        i = t.fn(r);
      if (i instanceof Promise) return i.then((t) => Ci(t, n, r, e));
      Ci(i, n, r, e);
    }));
});
function Ci(e, t, n, r) {
  if (!e) {
    let e = {
      code: `custom`,
      input: n,
      inst: r,
      path: [...(r._zod.def.path ?? [])],
      continue: !r._zod.def.abort,
    };
    (r._zod.def.params && (e.params = r._zod.def.params), t.issues.push(un(e)));
  }
}
var wi,
  Ti = class {
    constructor() {
      ((this._map = new WeakMap()), (this._idmap = new Map()));
    }
    add(e, ...t) {
      let n = t[0];
      return (
        this._map.set(e, n),
        n && typeof n == `object` && `id` in n && this._idmap.set(n.id, e),
        this
      );
    }
    clear() {
      return ((this._map = new WeakMap()), (this._idmap = new Map()), this);
    }
    remove(e) {
      let t = this._map.get(e);
      return (
        t && typeof t == `object` && `id` in t && this._idmap.delete(t.id),
        this._map.delete(e),
        this
      );
    }
    get(e) {
      let t = e._zod.parent;
      if (t) {
        let n = { ...(this.get(t) ?? {}) };
        delete n.id;
        let r = { ...n, ...this._map.get(e) };
        return Object.keys(r).length ? r : void 0;
      }
      return this._map.get(e);
    }
    has(e) {
      return this._map.has(e);
    }
  };
function Ei() {
  return new Ti();
}
(wi = globalThis).__zod_globalRegistry ?? (wi.__zod_globalRegistry = Ei());
var Di = globalThis.__zod_globalRegistry;
function Oi(e, t) {
  return new e({ type: `string`, ...G(t) });
}
function ki(e, t) {
  return new e({
    type: `string`,
    format: `email`,
    check: `string_format`,
    abort: !1,
    ...G(t),
  });
}
function Ai(e, t) {
  return new e({
    type: `string`,
    format: `guid`,
    check: `string_format`,
    abort: !1,
    ...G(t),
  });
}
function ji(e, t) {
  return new e({
    type: `string`,
    format: `uuid`,
    check: `string_format`,
    abort: !1,
    ...G(t),
  });
}
function Mi(e, t) {
  return new e({
    type: `string`,
    format: `uuid`,
    check: `string_format`,
    abort: !1,
    version: `v4`,
    ...G(t),
  });
}
function Ni(e, t) {
  return new e({
    type: `string`,
    format: `uuid`,
    check: `string_format`,
    abort: !1,
    version: `v6`,
    ...G(t),
  });
}
function Pi(e, t) {
  return new e({
    type: `string`,
    format: `uuid`,
    check: `string_format`,
    abort: !1,
    version: `v7`,
    ...G(t),
  });
}
function Fi(e, t) {
  return new e({
    type: `string`,
    format: `url`,
    check: `string_format`,
    abort: !1,
    ...G(t),
  });
}
function Ii(e, t) {
  return new e({
    type: `string`,
    format: `emoji`,
    check: `string_format`,
    abort: !1,
    ...G(t),
  });
}
function Li(e, t) {
  return new e({
    type: `string`,
    format: `nanoid`,
    check: `string_format`,
    abort: !1,
    ...G(t),
  });
}
function Ri(e, t) {
  return new e({
    type: `string`,
    format: `cuid`,
    check: `string_format`,
    abort: !1,
    ...G(t),
  });
}
function zi(e, t) {
  return new e({
    type: `string`,
    format: `cuid2`,
    check: `string_format`,
    abort: !1,
    ...G(t),
  });
}
function Bi(e, t) {
  return new e({
    type: `string`,
    format: `ulid`,
    check: `string_format`,
    abort: !1,
    ...G(t),
  });
}
function Vi(e, t) {
  return new e({
    type: `string`,
    format: `xid`,
    check: `string_format`,
    abort: !1,
    ...G(t),
  });
}
function Hi(e, t) {
  return new e({
    type: `string`,
    format: `ksuid`,
    check: `string_format`,
    abort: !1,
    ...G(t),
  });
}
function Ui(e, t) {
  return new e({
    type: `string`,
    format: `ipv4`,
    check: `string_format`,
    abort: !1,
    ...G(t),
  });
}
function Wi(e, t) {
  return new e({
    type: `string`,
    format: `ipv6`,
    check: `string_format`,
    abort: !1,
    ...G(t),
  });
}
function Gi(e, t) {
  return new e({
    type: `string`,
    format: `cidrv4`,
    check: `string_format`,
    abort: !1,
    ...G(t),
  });
}
function Ki(e, t) {
  return new e({
    type: `string`,
    format: `cidrv6`,
    check: `string_format`,
    abort: !1,
    ...G(t),
  });
}
function qi(e, t) {
  return new e({
    type: `string`,
    format: `base64`,
    check: `string_format`,
    abort: !1,
    ...G(t),
  });
}
function Ji(e, t) {
  return new e({
    type: `string`,
    format: `base64url`,
    check: `string_format`,
    abort: !1,
    ...G(t),
  });
}
function Yi(e, t) {
  return new e({
    type: `string`,
    format: `e164`,
    check: `string_format`,
    abort: !1,
    ...G(t),
  });
}
function Xi(e, t) {
  return new e({
    type: `string`,
    format: `jwt`,
    check: `string_format`,
    abort: !1,
    ...G(t),
  });
}
function Zi(e, t) {
  return new e({
    type: `string`,
    format: `datetime`,
    check: `string_format`,
    offset: !1,
    local: !1,
    precision: null,
    ...G(t),
  });
}
function Qi(e, t) {
  return new e({
    type: `string`,
    format: `date`,
    check: `string_format`,
    ...G(t),
  });
}
function $i(e, t) {
  return new e({
    type: `string`,
    format: `time`,
    check: `string_format`,
    precision: null,
    ...G(t),
  });
}
function ea(e, t) {
  return new e({
    type: `string`,
    format: `duration`,
    check: `string_format`,
    ...G(t),
  });
}
function ta(e) {
  return new e({ type: `unknown` });
}
function na(e, t) {
  return new e({ type: `never`, ...G(t) });
}
function ra(e, t) {
  return new or({ check: `max_length`, ...G(t), maximum: e });
}
function ia(e, t) {
  return new sr({ check: `min_length`, ...G(t), minimum: e });
}
function aa(e, t) {
  return new cr({ check: `length_equals`, ...G(t), length: e });
}
function oa(e, t) {
  return new ur({
    check: `string_format`,
    format: `regex`,
    ...G(t),
    pattern: e,
  });
}
function sa(e) {
  return new dr({ check: `string_format`, format: `lowercase`, ...G(e) });
}
function ca(e) {
  return new fr({ check: `string_format`, format: `uppercase`, ...G(e) });
}
function la(e, t) {
  return new pr({
    check: `string_format`,
    format: `includes`,
    ...G(t),
    includes: e,
  });
}
function ua(e, t) {
  return new mr({
    check: `string_format`,
    format: `starts_with`,
    ...G(t),
    prefix: e,
  });
}
function da(e, t) {
  return new hr({
    check: `string_format`,
    format: `ends_with`,
    ...G(t),
    suffix: e,
  });
}
function fa(e) {
  return new gr({ check: `overwrite`, tx: e });
}
function pa(e) {
  return fa((t) => t.normalize(e));
}
function ma() {
  return fa((e) => e.trim());
}
function ha() {
  return fa((e) => e.toLowerCase());
}
function ga() {
  return fa((e) => e.toUpperCase());
}
function _a() {
  return fa((e) => Vt(e));
}
function va(e, t, n) {
  return new e({ type: `array`, element: t, ...G(n) });
}
function ya(e, t, n) {
  return new e({ type: `custom`, check: `custom`, fn: t, ...G(n) });
}
function ba(e, t) {
  let n = xa(
    (t) => (
      (t.addIssue = (e) => {
        if (typeof e == `string`) t.issues.push(un(e, t.value, n._zod.def));
        else {
          let r = e;
          (r.fatal && (r.continue = !1),
            (r.code ??= `custom`),
            (r.input ??= t.value),
            (r.inst ??= n),
            (r.continue ??= !n._zod.def.abort),
            t.issues.push(un(r)));
        }
      }),
      e(t.value, t)
    ),
    t,
  );
  return n;
}
function xa(e, t) {
  let n = new K({ check: `custom`, ...G(t) });
  return ((n._zod.check = e), n);
}
function Sa(e) {
  let t = e?.target ?? `draft-2020-12`;
  return (
    t === `draft-4` && (t = `draft-04`),
    t === `draft-7` && (t = `draft-07`),
    {
      processors: e.processors ?? {},
      metadataRegistry: e?.metadata ?? Di,
      target: t,
      unrepresentable: e?.unrepresentable ?? `throw`,
      override: e?.override ?? (() => {}),
      io: e?.io ?? `output`,
      counter: 0,
      seen: new Map(),
      cycles: e?.cycles ?? `ref`,
      reused: e?.reused ?? `inline`,
      external: e?.external ?? void 0,
    }
  );
}
function Y(e, t, n = { path: [], schemaPath: [] }) {
  var r;
  let i = e._zod.def,
    a = t.seen.get(e);
  if (a)
    return (
      a.count++,
      n.schemaPath.includes(e) && (a.cycle = n.path),
      a.schema
    );
  let o = { schema: {}, count: 1, cycle: void 0, path: n.path };
  t.seen.set(e, o);
  let s = e._zod.toJSONSchema?.();
  if (s) o.schema = s;
  else {
    let r = { ...n, schemaPath: [...n.schemaPath, e], path: n.path };
    if (e._zod.processJSONSchema) e._zod.processJSONSchema(t, o.schema, r);
    else {
      let n = o.schema,
        a = t.processors[i.type];
      if (!a)
        throw Error(
          `[toJSONSchema]: Non-representable type encountered: ${i.type}`,
        );
      a(e, t, n, r);
    }
    let a = e._zod.parent;
    a && ((o.ref ||= a), Y(a, t, r), (t.seen.get(a).isParent = !0));
  }
  let c = t.metadataRegistry.get(e);
  return (
    c && Object.assign(o.schema, c),
    t.io === `input` &&
      X(e) &&
      (delete o.schema.examples, delete o.schema.default),
    t.io === `input` &&
      `_prefault` in o.schema &&
      ((r = o.schema).default ?? (r.default = o.schema._prefault)),
    delete o.schema._prefault,
    t.seen.get(e).schema
  );
}
function Ca(e, t) {
  let n = e.seen.get(t);
  if (!n) throw Error(`Unprocessed schema. This is a bug in Zod.`);
  let r = new Map();
  for (let t of e.seen.entries()) {
    let n = e.metadataRegistry.get(t[0])?.id;
    if (n) {
      let e = r.get(n);
      if (e && e !== t[0])
        throw Error(
          `Duplicate schema id "${n}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`,
        );
      r.set(n, t[0]);
    }
  }
  let i = (t) => {
      let r = e.target === `draft-2020-12` ? `$defs` : `definitions`;
      if (e.external) {
        let n = e.external.registry.get(t[0])?.id,
          i = e.external.uri ?? ((e) => e);
        if (n) return { ref: i(n) };
        let a = t[1].defId ?? t[1].schema.id ?? `schema${e.counter++}`;
        return (
          (t[1].defId = a),
          { defId: a, ref: `${i(`__shared`)}#/${r}/${a}` }
        );
      }
      if (t[1] === n) return { ref: `#` };
      let i = `#/${r}/`,
        a = t[1].schema.id ?? `__schema${e.counter++}`;
      return { defId: a, ref: i + a };
    },
    a = (e) => {
      if (e[1].schema.$ref) return;
      let t = e[1],
        { ref: n, defId: r } = i(e);
      ((t.def = { ...t.schema }), r && (t.defId = r));
      let a = t.schema;
      for (let e in a) delete a[e];
      a.$ref = n;
    };
  if (e.cycles === `throw`)
    for (let t of e.seen.entries()) {
      let e = t[1];
      if (e.cycle)
        throw Error(`Cycle detected: #/${e.cycle?.join(`/`)}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
    }
  for (let n of e.seen.entries()) {
    let r = n[1];
    if (t === n[0]) {
      a(n);
      continue;
    }
    if (e.external) {
      let r = e.external.registry.get(n[0])?.id;
      if (t !== n[0] && r) {
        a(n);
        continue;
      }
    }
    if (e.metadataRegistry.get(n[0])?.id) {
      a(n);
      continue;
    }
    if (r.cycle) {
      a(n);
      continue;
    }
    if (r.count > 1 && e.reused === `ref`) {
      a(n);
      continue;
    }
  }
}
function wa(e, t) {
  let n = e.seen.get(t);
  if (!n) throw Error(`Unprocessed schema. This is a bug in Zod.`);
  let r = (t) => {
    let n = e.seen.get(t);
    if (n.ref === null) return;
    let i = n.def ?? n.schema,
      a = { ...i },
      o = n.ref;
    if (((n.ref = null), o)) {
      r(o);
      let n = e.seen.get(o),
        s = n.schema;
      if (
        (s.$ref &&
        (e.target === `draft-07` ||
          e.target === `draft-04` ||
          e.target === `openapi-3.0`)
          ? ((i.allOf = i.allOf ?? []), i.allOf.push(s))
          : Object.assign(i, s),
        Object.assign(i, a),
        t._zod.parent === o)
      )
        for (let e in i) e === `$ref` || e === `allOf` || e in a || delete i[e];
      if (s.$ref && n.def)
        for (let e in i)
          e === `$ref` ||
            e === `allOf` ||
            (e in n.def &&
              JSON.stringify(i[e]) === JSON.stringify(n.def[e]) &&
              delete i[e]);
    }
    let s = t._zod.parent;
    if (s && s !== o) {
      r(s);
      let t = e.seen.get(s);
      if (t?.schema.$ref && ((i.$ref = t.schema.$ref), t.def))
        for (let e in i)
          e === `$ref` ||
            e === `allOf` ||
            (e in t.def &&
              JSON.stringify(i[e]) === JSON.stringify(t.def[e]) &&
              delete i[e]);
    }
    e.override({ zodSchema: t, jsonSchema: i, path: n.path ?? [] });
  };
  for (let t of [...e.seen.entries()].reverse()) r(t[0]);
  let i = {};
  if (
    (e.target === `draft-2020-12`
      ? (i.$schema = `https://json-schema.org/draft/2020-12/schema`)
      : e.target === `draft-07`
        ? (i.$schema = `http://json-schema.org/draft-07/schema#`)
        : e.target === `draft-04`
          ? (i.$schema = `http://json-schema.org/draft-04/schema#`)
          : e.target,
    e.external?.uri)
  ) {
    let n = e.external.registry.get(t)?.id;
    if (!n) throw Error("Schema is missing an `id` property");
    i.$id = e.external.uri(n);
  }
  Object.assign(i, n.def ?? n.schema);
  let a = e.metadataRegistry.get(t)?.id;
  a !== void 0 && i.id === a && delete i.id;
  let o = e.external?.defs ?? {};
  for (let t of e.seen.entries()) {
    let e = t[1];
    e.def &&
      e.defId &&
      (e.def.id === e.defId && delete e.def.id, (o[e.defId] = e.def));
  }
  e.external ||
    (Object.keys(o).length > 0 &&
      (e.target === `draft-2020-12` ? (i.$defs = o) : (i.definitions = o)));
  try {
    let n = JSON.parse(JSON.stringify(i));
    return (
      Object.defineProperty(n, `~standard`, {
        value: {
          ...t[`~standard`],
          jsonSchema: {
            input: Ea(t, `input`, e.processors),
            output: Ea(t, `output`, e.processors),
          },
        },
        enumerable: !1,
        writable: !1,
      }),
      n
    );
  } catch {
    throw Error(`Error converting schema to JSON.`);
  }
}
function X(e, t) {
  let n = t ?? { seen: new Set() };
  if (n.seen.has(e)) return !1;
  n.seen.add(e);
  let r = e._zod.def;
  if (r.type === `transform`) return !0;
  if (r.type === `array`) return X(r.element, n);
  if (r.type === `set`) return X(r.valueType, n);
  if (r.type === `lazy`) return X(r.getter(), n);
  if (
    r.type === `promise` ||
    r.type === `optional` ||
    r.type === `nonoptional` ||
    r.type === `nullable` ||
    r.type === `readonly` ||
    r.type === `default` ||
    r.type === `prefault`
  )
    return X(r.innerType, n);
  if (r.type === `intersection`) return X(r.left, n) || X(r.right, n);
  if (r.type === `record` || r.type === `map`)
    return X(r.keyType, n) || X(r.valueType, n);
  if (r.type === `pipe`)
    return e._zod.traits.has(`$ZodCodec`) ? !0 : X(r.in, n) || X(r.out, n);
  if (r.type === `object`) {
    for (let e in r.shape) if (X(r.shape[e], n)) return !0;
    return !1;
  }
  if (r.type === `union`) {
    for (let e of r.options) if (X(e, n)) return !0;
    return !1;
  }
  if (r.type === `tuple`) {
    for (let e of r.items) if (X(e, n)) return !0;
    return !!(r.rest && X(r.rest, n));
  }
  return !1;
}
var Ta =
    (e, t = {}) =>
    (n) => {
      let r = Sa({ ...n, processors: t });
      return (Y(e, r), Ca(r, e), wa(r, e));
    },
  Ea =
    (e, t, n = {}) =>
    (r) => {
      let { libraryOptions: i, target: a } = r ?? {},
        o = Sa({ ...(i ?? {}), target: a, io: t, processors: n });
      return (Y(e, o), Ca(o, e), wa(o, e));
    },
  Da = {
    guid: `uuid`,
    url: `uri`,
    datetime: `date-time`,
    json_string: `json-string`,
    regex: ``,
  },
  Oa = (e, t, n, r) => {
    let i = n;
    i.type = `string`;
    let {
      minimum: a,
      maximum: o,
      format: s,
      patterns: c,
      contentEncoding: l,
    } = e._zod.bag;
    if (
      (typeof a == `number` && (i.minLength = a),
      typeof o == `number` && (i.maxLength = o),
      s &&
        ((i.format = Da[s] ?? s),
        i.format === `` && delete i.format,
        s === `time` && delete i.format),
      l && (i.contentEncoding = l),
      c && c.size > 0)
    ) {
      let e = [...c];
      e.length === 1
        ? (i.pattern = e[0].source)
        : e.length > 1 &&
          (i.allOf = [
            ...e.map((e) => ({
              ...(t.target === `draft-07` ||
              t.target === `draft-04` ||
              t.target === `openapi-3.0`
                ? { type: `string` }
                : {}),
              pattern: e.source,
            })),
          ]);
    }
  },
  ka = (e, t, n, r) => {
    n.not = {};
  },
  Aa = (e, t, n, r) => {
    let i = e._zod.def,
      a = Nt(i.entries);
    (a.every((e) => typeof e == `number`) && (n.type = `number`),
      a.every((e) => typeof e == `string`) && (n.type = `string`),
      (n.enum = a));
  },
  ja = (e, t, n, r) => {
    if (t.unrepresentable === `throw`)
      throw Error(`Custom types cannot be represented in JSON Schema`);
  },
  Ma = (e, t, n, r) => {
    if (t.unrepresentable === `throw`)
      throw Error(`Transforms cannot be represented in JSON Schema`);
  },
  Na = (e, t, n, r) => {
    let i = n,
      a = e._zod.def,
      { minimum: o, maximum: s } = e._zod.bag;
    (typeof o == `number` && (i.minItems = o),
      typeof s == `number` && (i.maxItems = s),
      (i.type = `array`),
      (i.items = Y(a.element, t, { ...r, path: [...r.path, `items`] })));
  },
  Pa = (e, t, n, r) => {
    let i = n,
      a = e._zod.def;
    ((i.type = `object`), (i.properties = {}));
    let o = a.shape;
    for (let e in o)
      i.properties[e] = Y(o[e], t, {
        ...r,
        path: [...r.path, `properties`, e],
      });
    let s = new Set(Object.keys(o)),
      c = new Set(
        [...s].filter((e) => {
          let n = a.shape[e]._zod;
          return t.io === `input` ? n.optin === void 0 : n.optout === void 0;
        }),
      );
    (c.size > 0 && (i.required = Array.from(c)),
      a.catchall?._zod.def.type === `never`
        ? (i.additionalProperties = !1)
        : a.catchall
          ? a.catchall &&
            (i.additionalProperties = Y(a.catchall, t, {
              ...r,
              path: [...r.path, `additionalProperties`],
            }))
          : t.io === `output` && (i.additionalProperties = !1));
  },
  Fa = (e, t, n, r) => {
    let i = e._zod.def,
      a = i.inclusive === !1,
      o = i.options.map((e, n) =>
        Y(e, t, { ...r, path: [...r.path, a ? `oneOf` : `anyOf`, n] }),
      );
    a ? (n.oneOf = o) : (n.anyOf = o);
  },
  Ia = (e, t, n, r) => {
    let i = e._zod.def,
      a = Y(i.left, t, { ...r, path: [...r.path, `allOf`, 0] }),
      o = Y(i.right, t, { ...r, path: [...r.path, `allOf`, 1] }),
      s = (e) => `allOf` in e && Object.keys(e).length === 1;
    n.allOf = [...(s(a) ? a.allOf : [a]), ...(s(o) ? o.allOf : [o])];
  },
  La = (e, t, n, r) => {
    let i = e._zod.def,
      a = Y(i.innerType, t, r),
      o = t.seen.get(e);
    t.target === `openapi-3.0`
      ? ((o.ref = i.innerType), (n.nullable = !0))
      : (n.anyOf = [a, { type: `null` }]);
  },
  Ra = (e, t, n, r) => {
    let i = e._zod.def;
    Y(i.innerType, t, r);
    let a = t.seen.get(e);
    a.ref = i.innerType;
  },
  za = (e, t, n, r) => {
    let i = e._zod.def;
    Y(i.innerType, t, r);
    let a = t.seen.get(e);
    ((a.ref = i.innerType),
      (n.default = JSON.parse(JSON.stringify(i.defaultValue))));
  },
  Ba = (e, t, n, r) => {
    let i = e._zod.def;
    Y(i.innerType, t, r);
    let a = t.seen.get(e);
    ((a.ref = i.innerType),
      t.io === `input` &&
        (n._prefault = JSON.parse(JSON.stringify(i.defaultValue))));
  },
  Va = (e, t, n, r) => {
    let i = e._zod.def;
    Y(i.innerType, t, r);
    let a = t.seen.get(e);
    a.ref = i.innerType;
    let o;
    try {
      o = i.catchValue(void 0);
    } catch {
      throw Error(`Dynamic catch values are not supported in JSON Schema`);
    }
    n.default = o;
  },
  Ha = (e, t, n, r) => {
    let i = e._zod.def,
      a = i.in._zod.traits.has(`$ZodTransform`),
      o = t.io === `input` ? (a ? i.out : i.in) : i.out;
    Y(o, t, r);
    let s = t.seen.get(e);
    s.ref = o;
  },
  Ua = (e, t, n, r) => {
    let i = e._zod.def;
    Y(i.innerType, t, r);
    let a = t.seen.get(e);
    ((a.ref = i.innerType), (n.readOnly = !0));
  },
  Wa = (e, t, n, r) => {
    let i = e._zod.def;
    Y(i.innerType, t, r);
    let a = t.seen.get(e);
    a.ref = i.innerType;
  };
function Ga(e, t) {
  try {
    var n = e();
  } catch (e) {
    return t(e);
  }
  return n && n.then ? n.then(void 0, t) : n;
}
function Ka(e, t) {
  for (var n = {}; e.length; ) {
    var r = e[0],
      i = r.code,
      a = r.message,
      o = r.path.join(`.`);
    if (!n[o])
      if (`unionErrors` in r) {
        var s = r.unionErrors[0].errors[0];
        n[o] = { message: s.message, type: s.code };
      } else n[o] = { message: a, type: i };
    if (
      (`unionErrors` in r &&
        r.unionErrors.forEach(function (t) {
          return t.errors.forEach(function (t) {
            return e.push(t);
          });
        }),
      t)
    ) {
      var c = n[o].types,
        l = c && c[r.code];
      n[o] = ve(o, t, n, i, l ? [].concat(l, r.message) : r.message);
    }
    e.shift();
  }
  return n;
}
function qa(e, t) {
  for (var n = {}; e.length; ) {
    var r = e[0],
      i = r.code,
      a = r.message,
      o = r.path.join(`.`);
    if (!n[o])
      if (r.code === `invalid_union` && r.errors.length > 0) {
        var s = r.errors[0][0];
        n[o] = { message: s.message, type: s.code };
      } else n[o] = { message: a, type: i };
    if (
      (r.code === `invalid_union` &&
        r.errors.forEach(function (t) {
          return t.forEach(function (t) {
            return e.push(t);
          });
        }),
      t)
    ) {
      var c = n[o].types,
        l = c && c[r.code];
      n[o] = ve(o, t, n, i, l ? [].concat(l, r.message) : r.message);
    }
    e.shift();
  }
  return n;
}
function Ja(e, t, n) {
  if (
    (n === void 0 && (n = {}),
    (function (e) {
      return `_def` in e && typeof e._def == `object` && `typeName` in e._def;
    })(e))
  )
    return function (r, i, a) {
      try {
        return Promise.resolve(
          Ga(
            function () {
              return Promise.resolve(
                e[n.mode === `sync` ? `parse` : `parseAsync`](r, t),
              ).then(function (e) {
                return (
                  a.shouldUseNativeValidation && wt({}, a),
                  { errors: {}, values: n.raw ? Object.assign({}, r) : e }
                );
              });
            },
            function (e) {
              if (
                (function (e) {
                  return Array.isArray(e?.issues);
                })(e)
              )
                return {
                  values: {},
                  errors: Tt(
                    Ka(
                      e.errors,
                      !a.shouldUseNativeValidation && a.criteriaMode === `all`,
                    ),
                    a,
                  ),
                };
              throw e;
            },
          ),
        );
      } catch (e) {
        return Promise.reject(e);
      }
    };
  if (
    (function (e) {
      return `_zod` in e && typeof e._zod == `object`;
    })(e)
  )
    return function (r, i, a) {
      try {
        return Promise.resolve(
          Ga(
            function () {
              return Promise.resolve(
                (n.mode === `sync` ? _n : yn)(e, r, t),
              ).then(function (e) {
                return (
                  a.shouldUseNativeValidation && wt({}, a),
                  { errors: {}, values: n.raw ? Object.assign({}, r) : e }
                );
              });
            },
            function (e) {
              if (
                (function (e) {
                  return e instanceof fn;
                })(e)
              )
                return {
                  values: {},
                  errors: Tt(
                    qa(
                      e.issues,
                      !a.shouldUseNativeValidation && a.criteriaMode === `all`,
                    ),
                    a,
                  ),
                };
              throw e;
            },
          ),
        );
      } catch (e) {
        return Promise.reject(e);
      }
    };
  throw Error(`Invalid input: not a Zod schema`);
}
var Ya = V(`ZodISODateTime`, (e, t) => {
  (jr.init(e, t), $.init(e, t));
});
function Xa(e) {
  return Zi(Ya, e);
}
var Za = V(`ZodISODate`, (e, t) => {
  (Mr.init(e, t), $.init(e, t));
});
function Qa(e) {
  return Qi(Za, e);
}
var $a = V(`ZodISOTime`, (e, t) => {
  (Nr.init(e, t), $.init(e, t));
});
function eo(e) {
  return $i($a, e);
}
var to = V(`ZodISODuration`, (e, t) => {
  (Pr.init(e, t), $.init(e, t));
});
function no(e) {
  return ea(to, e);
}
var Z = V(
    `ZodError`,
    (e, t) => {
      (fn.init(e, t),
        (e.name = `ZodError`),
        Object.defineProperties(e, {
          format: { value: (t) => hn(e, t) },
          flatten: { value: (t) => mn(e, t) },
          addIssue: {
            value: (t) => {
              (e.issues.push(t), (e.message = JSON.stringify(e.issues, Pt, 2)));
            },
          },
          addIssues: {
            value: (t) => {
              (e.issues.push(...t),
                (e.message = JSON.stringify(e.issues, Pt, 2)));
            },
          },
          isEmpty: {
            get() {
              return e.issues.length === 0;
            },
          },
        }));
    },
    { Parent: Error },
  ),
  ro = gn(Z),
  io = vn(Z),
  ao = bn(Z),
  oo = Sn(Z),
  so = wn(Z),
  co = Tn(Z),
  lo = En(Z),
  uo = Dn(Z),
  fo = On(Z),
  po = kn(Z),
  mo = An(Z),
  ho = jn(Z),
  go = new WeakMap();
function _o(e, t, n) {
  let r = Object.getPrototypeOf(e),
    i = go.get(r);
  if ((i || ((i = new Set()), go.set(r, i)), !i.has(t))) {
    i.add(t);
    for (let e in n) {
      let t = n[e];
      Object.defineProperty(r, e, {
        configurable: !0,
        enumerable: !1,
        get() {
          let n = t.bind(this);
          return (
            Object.defineProperty(this, e, {
              configurable: !0,
              writable: !0,
              enumerable: !0,
              value: n,
            }),
            n
          );
        },
        set(t) {
          Object.defineProperty(this, e, {
            configurable: !0,
            writable: !0,
            enumerable: !0,
            value: t,
          });
        },
      });
    }
  }
}
var Q = V(
    `ZodType`,
    (e, t) => (
      q.init(e, t),
      Object.assign(e[`~standard`], {
        jsonSchema: { input: Ea(e, `input`), output: Ea(e, `output`) },
      }),
      (e.toJSONSchema = Ta(e, {})),
      (e.def = t),
      (e.type = t.type),
      Object.defineProperty(e, `_def`, { value: t }),
      (e.parse = (t, n) => ro(e, t, n, { callee: e.parse })),
      (e.safeParse = (t, n) => ao(e, t, n)),
      (e.parseAsync = async (t, n) => io(e, t, n, { callee: e.parseAsync })),
      (e.safeParseAsync = async (t, n) => oo(e, t, n)),
      (e.spa = e.safeParseAsync),
      (e.encode = (t, n) => so(e, t, n)),
      (e.decode = (t, n) => co(e, t, n)),
      (e.encodeAsync = async (t, n) => lo(e, t, n)),
      (e.decodeAsync = async (t, n) => uo(e, t, n)),
      (e.safeEncode = (t, n) => fo(e, t, n)),
      (e.safeDecode = (t, n) => po(e, t, n)),
      (e.safeEncodeAsync = async (t, n) => mo(e, t, n)),
      (e.safeDecodeAsync = async (t, n) => ho(e, t, n)),
      _o(e, `ZodType`, {
        check(...e) {
          let t = this.def;
          return this.clone(
            U(t, {
              checks: [
                ...(t.checks ?? []),
                ...e.map((e) =>
                  typeof e == `function`
                    ? {
                        _zod: {
                          check: e,
                          def: { check: `custom` },
                          onattach: [],
                        },
                      }
                    : e,
                ),
              ],
            }),
            { parent: !0 },
          );
        },
        with(...e) {
          return this.check(...e);
        },
        clone(e, t) {
          return W(this, e, t);
        },
        brand() {
          return this;
        },
        register(e, t) {
          return (e.add(this, t), this);
        },
        refine(e, t) {
          return this.check(xs(e, t));
        },
        superRefine(e, t) {
          return this.check(Ss(e, t));
        },
        overwrite(e) {
          return this.check(fa(e));
        },
        optional() {
          return rs(this);
        },
        exactOptional() {
          return as(this);
        },
        nullable() {
          return ss(this);
        },
        nullish() {
          return rs(ss(this));
        },
        nonoptional(e) {
          return ps(this, e);
        },
        array() {
          return Go(this);
        },
        or(e) {
          return Yo([this, e]);
        },
        and(e) {
          return Zo(this, e);
        },
        transform(e) {
          return _s(this, ts(e));
        },
        default(e) {
          return ls(this, e);
        },
        prefault(e) {
          return ds(this, e);
        },
        catch(e) {
          return hs(this, e);
        },
        pipe(e) {
          return _s(this, e);
        },
        readonly() {
          return ys(this);
        },
        describe(e) {
          let t = this.clone();
          return (Di.add(t, { description: e }), t);
        },
        meta(...e) {
          if (e.length === 0) return Di.get(this);
          let t = this.clone();
          return (Di.add(t, e[0]), t);
        },
        isOptional() {
          return this.safeParse(void 0).success;
        },
        isNullable() {
          return this.safeParse(null).success;
        },
        apply(e) {
          return e(this);
        },
      }),
      Object.defineProperty(e, `description`, {
        get() {
          return Di.get(e)?.description;
        },
        configurable: !0,
      }),
      e
    ),
  ),
  vo = V(`_ZodString`, (e, t) => {
    (yr.init(e, t),
      Q.init(e, t),
      (e._zod.processJSONSchema = (t, n, r) => Oa(e, t, n, r)));
    let n = e._zod.bag;
    ((e.format = n.format ?? null),
      (e.minLength = n.minimum ?? null),
      (e.maxLength = n.maximum ?? null),
      _o(e, `_ZodString`, {
        regex(...e) {
          return this.check(oa(...e));
        },
        includes(...e) {
          return this.check(la(...e));
        },
        startsWith(...e) {
          return this.check(ua(...e));
        },
        endsWith(...e) {
          return this.check(da(...e));
        },
        min(...e) {
          return this.check(ia(...e));
        },
        max(...e) {
          return this.check(ra(...e));
        },
        length(...e) {
          return this.check(aa(...e));
        },
        nonempty(...e) {
          return this.check(ia(1, ...e));
        },
        lowercase(e) {
          return this.check(sa(e));
        },
        uppercase(e) {
          return this.check(ca(e));
        },
        trim() {
          return this.check(ma());
        },
        normalize(...e) {
          return this.check(pa(...e));
        },
        toLowerCase() {
          return this.check(ha());
        },
        toUpperCase() {
          return this.check(ga());
        },
        slugify() {
          return this.check(_a());
        },
      }));
  }),
  yo = V(`ZodString`, (e, t) => {
    (yr.init(e, t),
      vo.init(e, t),
      (e.email = (t) => e.check(ki(xo, t))),
      (e.url = (t) => e.check(Fi(wo, t))),
      (e.jwt = (t) => e.check(Xi(zo, t))),
      (e.emoji = (t) => e.check(Ii(To, t))),
      (e.guid = (t) => e.check(Ai(So, t))),
      (e.uuid = (t) => e.check(ji(Co, t))),
      (e.uuidv4 = (t) => e.check(Mi(Co, t))),
      (e.uuidv6 = (t) => e.check(Ni(Co, t))),
      (e.uuidv7 = (t) => e.check(Pi(Co, t))),
      (e.nanoid = (t) => e.check(Li(Eo, t))),
      (e.guid = (t) => e.check(Ai(So, t))),
      (e.cuid = (t) => e.check(Ri(Do, t))),
      (e.cuid2 = (t) => e.check(zi(Oo, t))),
      (e.ulid = (t) => e.check(Bi(ko, t))),
      (e.base64 = (t) => e.check(qi(Io, t))),
      (e.base64url = (t) => e.check(Ji(Lo, t))),
      (e.xid = (t) => e.check(Vi(Ao, t))),
      (e.ksuid = (t) => e.check(Hi(jo, t))),
      (e.ipv4 = (t) => e.check(Ui(Mo, t))),
      (e.ipv6 = (t) => e.check(Wi(No, t))),
      (e.cidrv4 = (t) => e.check(Gi(Po, t))),
      (e.cidrv6 = (t) => e.check(Ki(Fo, t))),
      (e.e164 = (t) => e.check(Yi(Ro, t))),
      (e.datetime = (t) => e.check(Xa(t))),
      (e.date = (t) => e.check(Qa(t))),
      (e.time = (t) => e.check(eo(t))),
      (e.duration = (t) => e.check(no(t))));
  });
function bo(e) {
  return Oi(yo, e);
}
var $ = V(`ZodStringFormat`, (e, t) => {
    (J.init(e, t), vo.init(e, t));
  }),
  xo = V(`ZodEmail`, (e, t) => {
    (Sr.init(e, t), $.init(e, t));
  }),
  So = V(`ZodGUID`, (e, t) => {
    (br.init(e, t), $.init(e, t));
  }),
  Co = V(`ZodUUID`, (e, t) => {
    (xr.init(e, t), $.init(e, t));
  }),
  wo = V(`ZodURL`, (e, t) => {
    (Cr.init(e, t), $.init(e, t));
  }),
  To = V(`ZodEmoji`, (e, t) => {
    (wr.init(e, t), $.init(e, t));
  }),
  Eo = V(`ZodNanoID`, (e, t) => {
    (Tr.init(e, t), $.init(e, t));
  }),
  Do = V(`ZodCUID`, (e, t) => {
    (Er.init(e, t), $.init(e, t));
  }),
  Oo = V(`ZodCUID2`, (e, t) => {
    (Dr.init(e, t), $.init(e, t));
  }),
  ko = V(`ZodULID`, (e, t) => {
    (Or.init(e, t), $.init(e, t));
  }),
  Ao = V(`ZodXID`, (e, t) => {
    (kr.init(e, t), $.init(e, t));
  }),
  jo = V(`ZodKSUID`, (e, t) => {
    (Ar.init(e, t), $.init(e, t));
  }),
  Mo = V(`ZodIPv4`, (e, t) => {
    (Fr.init(e, t), $.init(e, t));
  }),
  No = V(`ZodIPv6`, (e, t) => {
    (Ir.init(e, t), $.init(e, t));
  }),
  Po = V(`ZodCIDRv4`, (e, t) => {
    (Lr.init(e, t), $.init(e, t));
  }),
  Fo = V(`ZodCIDRv6`, (e, t) => {
    (Rr.init(e, t), $.init(e, t));
  }),
  Io = V(`ZodBase64`, (e, t) => {
    (Br.init(e, t), $.init(e, t));
  }),
  Lo = V(`ZodBase64URL`, (e, t) => {
    (Hr.init(e, t), $.init(e, t));
  }),
  Ro = V(`ZodE164`, (e, t) => {
    (Ur.init(e, t), $.init(e, t));
  }),
  zo = V(`ZodJWT`, (e, t) => {
    (Gr.init(e, t), $.init(e, t));
  }),
  Bo = V(`ZodUnknown`, (e, t) => {
    (Kr.init(e, t),
      Q.init(e, t),
      (e._zod.processJSONSchema = (e, t, n) => void 0));
  });
function Vo() {
  return ta(Bo);
}
var Ho = V(`ZodNever`, (e, t) => {
  (qr.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => ka(e, t, n, r)));
});
function Uo(e) {
  return na(Ho, e);
}
var Wo = V(`ZodArray`, (e, t) => {
  (Yr.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Na(e, t, n, r)),
    (e.element = t.element),
    _o(e, `ZodArray`, {
      min(e, t) {
        return this.check(ia(e, t));
      },
      nonempty(e) {
        return this.check(ia(1, e));
      },
      max(e, t) {
        return this.check(ra(e, t));
      },
      length(e, t) {
        return this.check(aa(e, t));
      },
      unwrap() {
        return this.element;
      },
    }));
});
function Go(e, t) {
  return va(Wo, e, t);
}
var Ko = V(`ZodObject`, (e, t) => {
  (ei.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Pa(e, t, n, r)),
    H(e, `shape`, () => t.shape),
    _o(e, `ZodObject`, {
      keyof() {
        return $o(Object.keys(this._zod.def.shape));
      },
      catchall(e) {
        return this.clone({ ...this._zod.def, catchall: e });
      },
      passthrough() {
        return this.clone({ ...this._zod.def, catchall: Vo() });
      },
      loose() {
        return this.clone({ ...this._zod.def, catchall: Vo() });
      },
      strict() {
        return this.clone({ ...this._zod.def, catchall: Uo() });
      },
      strip() {
        return this.clone({ ...this._zod.def, catchall: void 0 });
      },
      extend(e) {
        return Qt(this, e);
      },
      safeExtend(e) {
        return $t(this, e);
      },
      merge(e) {
        return en(this, e);
      },
      pick(e) {
        return Xt(this, e);
      },
      omit(e) {
        return Zt(this, e);
      },
      partial(...e) {
        return tn(ns, this, e[0]);
      },
      required(...e) {
        return nn(fs, this, e[0]);
      },
    }));
});
function qo(e, t) {
  return new Ko({ type: `object`, shape: e ?? {}, ...G(t) });
}
var Jo = V(`ZodUnion`, (e, t) => {
  (ni.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Fa(e, t, n, r)),
    (e.options = t.options));
});
function Yo(e, t) {
  return new Jo({ type: `union`, options: e, ...G(t) });
}
var Xo = V(`ZodIntersection`, (e, t) => {
  (ri.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Ia(e, t, n, r)));
});
function Zo(e, t) {
  return new Xo({ type: `intersection`, left: e, right: t });
}
var Qo = V(`ZodEnum`, (e, t) => {
  (oi.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Aa(e, t, n, r)),
    (e.enum = t.entries),
    (e.options = Object.values(t.entries)));
  let n = new Set(Object.keys(t.entries));
  ((e.extract = (e, r) => {
    let i = {};
    for (let r of e)
      if (n.has(r)) i[r] = t.entries[r];
      else throw Error(`Key ${r} not found in enum`);
    return new Qo({ ...t, checks: [], ...G(r), entries: i });
  }),
    (e.exclude = (e, r) => {
      let i = { ...t.entries };
      for (let t of e)
        if (n.has(t)) delete i[t];
        else throw Error(`Key ${t} not found in enum`);
      return new Qo({ ...t, checks: [], ...G(r), entries: i });
    }));
});
function $o(e, t) {
  return new Qo({
    type: `enum`,
    entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
    ...G(t),
  });
}
var es = V(`ZodTransform`, (e, t) => {
  (si.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Ma(e, t, n, r)),
    (e._zod.parse = (n, r) => {
      if (r.direction === `backward`) throw new At(e.constructor.name);
      n.addIssue = (r) => {
        if (typeof r == `string`) n.issues.push(un(r, n.value, t));
        else {
          let t = r;
          (t.fatal && (t.continue = !1),
            (t.code ??= `custom`),
            (t.input ??= n.value),
            (t.inst ??= e),
            n.issues.push(un(t)));
        }
      };
      let i = t.transform(n.value, n);
      return i instanceof Promise
        ? i.then((e) => ((n.value = e), (n.fallback = !0), n))
        : ((n.value = i), (n.fallback = !0), n);
    }));
});
function ts(e) {
  return new es({ type: `transform`, transform: e });
}
var ns = V(`ZodOptional`, (e, t) => {
  (li.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Wa(e, t, n, r)),
    (e.unwrap = () => e._zod.def.innerType));
});
function rs(e) {
  return new ns({ type: `optional`, innerType: e });
}
var is = V(`ZodExactOptional`, (e, t) => {
  (ui.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Wa(e, t, n, r)),
    (e.unwrap = () => e._zod.def.innerType));
});
function as(e) {
  return new is({ type: `optional`, innerType: e });
}
var os = V(`ZodNullable`, (e, t) => {
  (di.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => La(e, t, n, r)),
    (e.unwrap = () => e._zod.def.innerType));
});
function ss(e) {
  return new os({ type: `nullable`, innerType: e });
}
var cs = V(`ZodDefault`, (e, t) => {
  (fi.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => za(e, t, n, r)),
    (e.unwrap = () => e._zod.def.innerType),
    (e.removeDefault = e.unwrap));
});
function ls(e, t) {
  return new cs({
    type: `default`,
    innerType: e,
    get defaultValue() {
      return typeof t == `function` ? t() : Kt(t);
    },
  });
}
var us = V(`ZodPrefault`, (e, t) => {
  (mi.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Ba(e, t, n, r)),
    (e.unwrap = () => e._zod.def.innerType));
});
function ds(e, t) {
  return new us({
    type: `prefault`,
    innerType: e,
    get defaultValue() {
      return typeof t == `function` ? t() : Kt(t);
    },
  });
}
var fs = V(`ZodNonOptional`, (e, t) => {
  (hi.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Ra(e, t, n, r)),
    (e.unwrap = () => e._zod.def.innerType));
});
function ps(e, t) {
  return new fs({ type: `nonoptional`, innerType: e, ...G(t) });
}
var ms = V(`ZodCatch`, (e, t) => {
  (_i.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Va(e, t, n, r)),
    (e.unwrap = () => e._zod.def.innerType),
    (e.removeCatch = e.unwrap));
});
function hs(e, t) {
  return new ms({
    type: `catch`,
    innerType: e,
    catchValue: typeof t == `function` ? t : () => t,
  });
}
var gs = V(`ZodPipe`, (e, t) => {
  (vi.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Ha(e, t, n, r)),
    (e.in = t.in),
    (e.out = t.out));
});
function _s(e, t) {
  return new gs({ type: `pipe`, in: e, out: t });
}
var vs = V(`ZodReadonly`, (e, t) => {
  (bi.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Ua(e, t, n, r)),
    (e.unwrap = () => e._zod.def.innerType));
});
function ys(e) {
  return new vs({ type: `readonly`, innerType: e });
}
var bs = V(`ZodCustom`, (e, t) => {
  (Si.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => ja(e, t, n, r)));
});
function xs(e, t = {}) {
  return ya(bs, e, t);
}
function Ss(e, t) {
  return ba(e, t);
}
export {
  bt as a,
  pt as c,
  yt as d,
  lt as f,
  d as h,
  St as i,
  gt as l,
  f as m,
  bo as n,
  dt as o,
  v as p,
  Ja as r,
  vt as s,
  qo as t,
  _t as u,
};
