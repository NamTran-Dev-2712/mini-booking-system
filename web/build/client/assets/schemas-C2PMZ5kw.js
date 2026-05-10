import { a as e, i as t, n, t as r } from "./jsx-runtime-CAzG7qJ5.js";
import { r as i } from "./chunk-5KNZJZUH-D0Qj9TTb.js";
import { t as a } from "./createLucideIcon-DIem-QJH.js";
import { t as o } from "./calendar-days-BOHnMUrY.js";
import { a as s, n as c, r as l, t as u } from "./separator-8f2NwZMe.js";
import { t as d } from "./button-DXwXqNSz.js";
var f = a(`eye-off`, [
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
  p = a(`eye`, [
    [
      `path`,
      {
        d: `M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0`,
        key: `1nclc0`,
      },
    ],
    [`circle`, { cx: `12`, cy: `12`, r: `3`, key: `1v7zrd` }],
  ]),
  m = e(n(), 1),
  h = r(),
  g = `Label`,
  _ = m.forwardRef((e, t) =>
    (0, h.jsx)(l.label, {
      ...e,
      ref: t,
      onMouseDown: (t) => {
        t.target.closest(`button, input, select, textarea`) ||
          (e.onMouseDown?.(t),
          !t.defaultPrevented && t.detail > 1 && t.preventDefault());
      },
    }),
  );
_.displayName = g;
var v = _;
function y({ children: e, title: t, description: n }) {
  return (0, h.jsxs)(`div`, {
    className: `min-h-screen grid lg:grid-cols-2`,
    children: [
      (0, h.jsxs)(`div`, {
        className: `hidden lg:flex flex-col justify-between bg-foreground text-background p-10`,
        children: [
          (0, h.jsxs)(i, {
            to: `/`,
            className: `flex items-center gap-2 font-semibold text-lg`,
            children: [
              (0, h.jsx)(o, { className: `size-6` }),
              (0, h.jsx)(`span`, { children: `MiniBooking` }),
            ],
          }),
          (0, h.jsxs)(`div`, {
            className: `space-y-4`,
            children: [
              (0, h.jsx)(`blockquote`, {
                className: `text-2xl font-medium leading-relaxed`,
                children: `"Connect with mentors, schedule sessions, and accelerate your growth — all in one place."`,
              }),
              (0, h.jsx)(`p`, {
                className: `text-background/60 text-sm`,
                children: `Trusted by over 1,000 students and mentors every day.`,
              }),
            ],
          }),
          (0, h.jsxs)(`p`, {
            className: `text-background/40 text-xs`,
            children: [
              `© `,
              new Date().getFullYear(),
              ` MiniBooking. All rights reserved.`,
            ],
          }),
        ],
      }),
      (0, h.jsxs)(`div`, {
        className: `flex flex-col items-center justify-center px-6 py-12 lg:px-10`,
        children: [
          (0, h.jsxs)(i, {
            to: `/`,
            className: `flex items-center gap-2 font-semibold text-lg mb-8 lg:hidden`,
            children: [
              (0, h.jsx)(o, { className: `size-5` }),
              (0, h.jsx)(`span`, { children: `MiniBooking` }),
            ],
          }),
          (0, h.jsxs)(`div`, {
            className: `w-full max-w-sm space-y-6`,
            children: [
              (0, h.jsxs)(`div`, {
                className: `space-y-1 text-center`,
                children: [
                  (0, h.jsx)(`h1`, {
                    className: `text-2xl font-semibold tracking-tight`,
                    children: t,
                  }),
                  (0, h.jsx)(`p`, {
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
var b = (e) => e.type === `checkbox`,
  x = (e) => e instanceof Date,
  S = (e) => e == null,
  C = (e) => typeof e == `object`,
  w = (e) => !S(e) && !Array.isArray(e) && C(e) && !x(e),
  ee = (e) =>
    w(e) && e.target ? (b(e.target) ? e.target.checked : e.target.value) : e,
  te = (e, t) =>
    t
      .split(`.`)
      .some((t, n, r) => !isNaN(Number(t)) && e.has(r.slice(0, n).join(`.`))),
  T = (e) => {
    let t = e.constructor && e.constructor.prototype;
    return w(t) && t.hasOwnProperty(`isPrototypeOf`);
  },
  E =
    typeof window < `u` &&
    window.HTMLElement !== void 0 &&
    typeof document < `u`;
function D(e) {
  if (e instanceof Date) return new Date(e);
  let t = typeof FileList < `u` && e instanceof FileList;
  if (E && (e instanceof Blob || t)) return e;
  let n = Array.isArray(e);
  if (!n && !(w(e) && T(e))) return e;
  let r = n ? [] : Object.create(Object.getPrototypeOf(e));
  for (let t in e)
    Object.prototype.hasOwnProperty.call(e, t) && (r[t] = D(e[t]));
  return r;
}
var ne = (e) => /^\w*$/.test(e),
  O = (e) => e === void 0,
  re = (e) => (Array.isArray(e) ? e.filter(Boolean) : []),
  ie = (e) => re(e.replace(/["|']|\]/g, ``).split(/\.|\[/)),
  k = (e, t, n) => {
    if (!t || !w(e)) return n;
    let r = (ne(t) ? [t] : ie(t)).reduce((e, t) => (S(e) ? void 0 : e[t]), e);
    return O(r) || r === e ? (O(e[t]) ? n : e[t]) : r;
  },
  A = (e) => typeof e == `boolean`,
  j = (e) => typeof e == `function`,
  M = (e, t, n) => {
    let r = -1,
      i = ne(t) ? [t] : ie(t),
      a = i.length,
      o = a - 1;
    for (; ++r < a; ) {
      let t = i[r],
        a = n;
      if (r !== o) {
        let n = e[t];
        a = w(n) || Array.isArray(n) ? n : isNaN(+i[r + 1]) ? {} : [];
      }
      if (t === `__proto__` || t === `constructor` || t === `prototype`) return;
      ((e[t] = a), (e = e[t]));
    }
  },
  ae = {
    BLUR: `blur`,
    FOCUS_OUT: `focusout`,
    CHANGE: `change`,
    SUBMIT: `submit`,
    TRIGGER: `trigger`,
    VALID: `valid`,
  },
  oe = {
    onBlur: `onBlur`,
    onChange: `onChange`,
    onSubmit: `onSubmit`,
    onTouched: `onTouched`,
    all: `all`,
  },
  se = {
    max: `max`,
    min: `min`,
    maxLength: `maxLength`,
    minLength: `minLength`,
    pattern: `pattern`,
    required: `required`,
    validate: `validate`,
  },
  ce = `form`,
  le = `root`,
  ue = m.createContext(null);
ue.displayName = `HookFormControlContext`;
var de = () => m.useContext(ue),
  fe = (e, t, n, r = !0) => {
    let i = {};
    for (let a in e)
      Object.defineProperty(i, a, {
        get: () => {
          let i = a;
          return (
            t._proxyFormState[i] !== oe.all &&
              (t._proxyFormState[i] = !r || oe.all),
            n && (n[i] = !0),
            e[i]
          );
        },
      });
    return i;
  },
  pe = typeof window < `u` ? m.useLayoutEffect : m.useEffect;
function me(e) {
  let t = de(),
    { control: n = t, disabled: r, name: i, exact: a } = e || {},
    [o, s] = m.useState(() => ({
      ...n._formState,
      defaultValues: n._defaultValues,
    })),
    c = m.useRef({
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
    pe(
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
    m.useEffect(() => {
      c.current.isValid && n._setValid(!0);
    }, [n]),
    m.useMemo(() => fe(o, n, c.current, !1), [o, n])
  );
}
var N = (e) => typeof e == `string`,
  he = (e, t, n, r, i) =>
    N(e)
      ? (r && t.watch.add(e), k(n, e, i))
      : Array.isArray(e)
        ? e.map((e) => (r && t.watch.add(e), k(n, e)))
        : (r && (t.watchAll = !0), n),
  ge = (e) => S(e) || !C(e);
function P(e, t, n = new WeakSet()) {
  if (e === t) return !0;
  if (ge(e) || ge(t)) return Object.is(e, t);
  if (x(e) && x(t)) return Object.is(e.getTime(), t.getTime());
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
        (x(r) && x(e)) ||
        ((w(r) || Array.isArray(r)) && (w(e) || Array.isArray(e)))
          ? !P(r, e, n)
          : !Object.is(r, e)
      )
        return !1;
    }
  }
  return !0;
}
function _e(e) {
  let t = de(),
    {
      control: n = t,
      name: r,
      defaultValue: i,
      disabled: a,
      exact: o,
      compute: s,
    } = e || {},
    c = m.useRef(i),
    l = m.useRef(s),
    u = m.useRef(void 0),
    d = m.useRef(n),
    f = m.useRef(r);
  l.current = s;
  let [p, h] = m.useState(() => {
      let e = n._getWatch(r, c.current);
      return l.current ? l.current(e) : e;
    }),
    g = m.useCallback(
      (e) => {
        let t = he(r, n._names, e || n._formValues, !1, c.current);
        return l.current ? l.current(t) : t;
      },
      [n._formValues, n._names, r],
    ),
    _ = m.useCallback(
      (e) => {
        if (!a) {
          let t = he(r, n._names, e || n._formValues, !1, c.current);
          if (l.current) {
            let e = l.current(t);
            P(e, u.current) || (h(e), (u.current = e));
          } else h(t);
        }
      },
      [n._formValues, n._names, a, r],
    );
  (pe(
    () => (
      (d.current !== n || !P(f.current, r)) &&
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
    m.useEffect(() => n._removeUnmounted()));
  let v = d.current !== n,
    y = f.current,
    b = m.useMemo(() => {
      if (a) return null;
      let e = !v && !P(y, r);
      return v || e ? g() : null;
    }, [a, v, r, y, g]);
  return b === null ? p : b;
}
function ve(e) {
  let t = de(),
    {
      name: n,
      disabled: r,
      control: i = t,
      shouldUnregister: a,
      defaultValue: o,
      exact: s = !0,
    } = e,
    c = te(i._names.array, n),
    l = _e({
      control: i,
      name: n,
      defaultValue: m.useMemo(
        () => k(i._formValues, n, k(i._defaultValues, n, o)),
        [i, n, o],
      ),
      exact: s,
    }),
    u = me({ control: i, name: n, exact: s }),
    d = m.useRef(e),
    f = m.useRef(
      i.register(n, {
        ...e.rules,
        value: l,
        ...(A(e.disabled) ? { disabled: e.disabled } : {}),
      }),
    );
  d.current = e;
  let p = m.useMemo(
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
    h = m.useCallback(
      (e) =>
        f.current.onChange({
          target: { value: ee(e), name: n },
          type: ae.CHANGE,
        }),
      [n],
    ),
    g = m.useCallback(
      () =>
        f.current.onBlur({
          target: { value: k(i._formValues, n), name: n },
          type: ae.BLUR,
        }),
      [n, i._formValues],
    ),
    _ = m.useCallback(
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
    v = m.useMemo(
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
    m.useEffect(() => {
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
        let e = D(k(i._options.defaultValues, n, d.current.defaultValue));
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
    m.useEffect(() => {
      i._setDisabledField({ disabled: r, name: n });
    }, [r, n, i]),
    m.useMemo(() => ({ field: v, formState: u, fieldState: p }), [v, u, p])
  );
}
var ye = (e) => e.render(ve(e)),
  be = m.createContext(null);
be.displayName = `HookFormContext`;
var xe = () => m.useContext(be),
  Se = (e) => {
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
        handleSubmit: p,
        unregister: h,
        control: g,
        register: _,
        setFocus: v,
        subscribe: y,
      } = e,
      b = m.useMemo(
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
          handleSubmit: p,
          unregister: h,
          control: g,
          register: _,
          setFocus: v,
          subscribe: y,
        }),
        [o, g, u, i, r, p, _, f, d, a, v, s, c, y, l, h, n],
      );
    return m.createElement(
      be.Provider,
      { value: b },
      m.createElement(ue.Provider, { value: b.control }, t),
    );
  },
  Ce = (e, t, n, r, i) =>
    t
      ? {
          ...n[e],
          types: { ...(n[e] && n[e].types ? n[e].types : {}), [r]: i || !0 },
        }
      : {},
  we = (e) => (Array.isArray(e) ? e : [e]),
  Te = () => {
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
function Ee(e, t) {
  let n = {};
  for (let r in e)
    if (e.hasOwnProperty(r)) {
      let i = e[r],
        a = t[r];
      if (i && w(i) && a) {
        let e = Ee(i, a);
        w(e) && (n[r] = e);
      } else e[r] && (n[r] = a);
    }
  return n;
}
var F = (e) => w(e) && !Object.keys(e).length,
  De = (e) => e.type === `file`,
  Oe = (e) => {
    if (!E) return !1;
    let t = e ? e.ownerDocument : 0;
    return (
      e instanceof
      (t && t.defaultView ? t.defaultView.HTMLElement : HTMLElement)
    );
  },
  ke = (e) => e.type === `select-multiple`,
  Ae = (e) => e.type === `radio`,
  je = (e) => Ae(e) || b(e),
  Me = (e) => Oe(e) && e.isConnected;
function Ne(e, t) {
  let n = t.slice(0, -1).length,
    r = 0;
  for (; r < n; ) {
    if (S(e)) {
      e = void 0;
      break;
    }
    ((e = e[t[r]]), r++);
  }
  return e;
}
function Pe(e) {
  for (let t in e) if (e.hasOwnProperty(t) && !O(e[t])) return !1;
  return !0;
}
function I(e, t) {
  if (N(t) && Object.prototype.hasOwnProperty.call(e, t))
    return (delete e[t], e);
  let n = Array.isArray(t) ? t : ne(t) ? [t] : ie(t),
    r = n.length === 1 ? e : Ne(e, n),
    i = n.length - 1,
    a = n[i];
  return (
    r && delete r[a],
    i !== 0 &&
      ((w(r) && F(r)) || (Array.isArray(r) && Pe(r))) &&
      I(e, n.slice(0, -1)),
    e
  );
}
var Fe = (e) => {
  for (let t in e) if (j(e[t])) return !0;
  return !1;
};
function Ie(e) {
  return Array.isArray(e) || (w(e) && !Fe(e));
}
function Le(e, t = {}) {
  for (let n in e) {
    let r = e[n];
    Ie(r)
      ? ((t[n] = Array.isArray(r) ? [] : {}), Le(r, t[n]))
      : O(r) || (t[n] = !0);
  }
  return t;
}
function Re(e) {
  if (e !== !1) {
    if (e === !0) return !0;
    if (Array.isArray(e)) {
      let t = e.map((e) => Re(e));
      return t.some((e) => e !== void 0) ? t : void 0;
    }
    if (w(e)) {
      let t = {};
      for (let n in e) {
        let r = Re(e[n]);
        O(r) || (t[n] = r);
      }
      return Object.keys(t).length ? t : void 0;
    }
  }
}
function ze(e, t, n) {
  n ||= Le(t);
  for (let r in e) {
    let i = e[r];
    if (Ie(i))
      O(t) || ge(n[r])
        ? (n[r] = Le(i, Array.isArray(i) ? [] : {}))
        : ze(i, S(t) ? {} : t[r], n[r]);
    else {
      let e = t[r];
      n[r] = !P(i, e);
    }
  }
  return Re(n) || {};
}
var Be = { value: !1, isValid: !1 },
  Ve = { value: !0, isValid: !0 },
  He = (e) => {
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
            ? Ve
            : { value: e[0].value, isValid: !0 }
          : Ve
        : Be;
    }
    return Be;
  },
  Ue = (e, { valueAsNumber: t, valueAsDate: n, setValueAs: r }) =>
    O(e)
      ? e
      : t
        ? e === ``
          ? NaN
          : e && +e
        : n && N(e)
          ? new Date(e)
          : r
            ? r(e)
            : e,
  We = { isValid: !1, value: null },
  Ge = (e) =>
    Array.isArray(e)
      ? e.reduce(
          (e, t) =>
            t && t.checked && !t.disabled ? { isValid: !0, value: t.value } : e,
          We,
        )
      : We;
function Ke(e) {
  let t = e.ref;
  return De(t)
    ? t.files
    : Ae(t)
      ? Ge(e.refs).value
      : ke(t)
        ? [...t.selectedOptions].map(({ value: e }) => e)
        : b(t)
          ? He(e.refs).value
          : Ue(O(t.value) ? e.ref.value : t.value, e);
}
var qe = (e, t, n, r) => {
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
  Je = (e) => e instanceof RegExp,
  Ye = (e) =>
    O(e)
      ? e
      : Je(e)
        ? e.source
        : w(e)
          ? Je(e.value)
            ? e.value.source
            : e.value
          : e,
  Xe = (e) => ({
    isOnSubmit: !e || e === oe.onSubmit,
    isOnBlur: e === oe.onBlur,
    isOnChange: e === oe.onChange,
    isOnAll: e === oe.all,
    isOnTouch: e === oe.onTouched,
  }),
  Ze = `AsyncFunction`,
  Qe = (e) =>
    !!e &&
    !!e.validate &&
    !!(
      (j(e.validate) && e.validate.constructor.name === Ze) ||
      (w(e.validate) &&
        Object.values(e.validate).find((e) => e.constructor.name === Ze))
    ),
  $e = (e) =>
    e.mount &&
    (e.required ||
      e.min ||
      e.max ||
      e.maxLength ||
      e.minLength ||
      e.pattern ||
      e.validate),
  et = (e, t, n) =>
    !n &&
    (t.watchAll ||
      t.watch.has(e) ||
      [...t.watch].some(
        (t) => e.startsWith(t) && /^\.\w+/.test(e.slice(t.length)),
      )),
  tt = (e, t, n, r) => {
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
          if (tt(a, t)) break;
        } else if (w(a) && tt(a, t)) break;
      }
    }
  };
function nt(e, t, n) {
  let r = k(e, n);
  if (r || ne(n)) return { error: r, name: n };
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
var rt = (e, t, n, r) => {
    n(e);
    let { name: i, ...a } = e;
    return (
      F(a) ||
      (r && Object.keys(a).length >= Object.keys(t).length) ||
      Object.keys(a).find((e) => t[e] === (!r || oe.all))
    );
  },
  it = (e, t, n) =>
    !e ||
    !t ||
    e === t ||
    we(e).some((e) => e && (n ? e === t : e.startsWith(t) || t.startsWith(e))),
  at = (e, t, n, r, i) =>
    i.isOnAll
      ? !1
      : !n && i.isOnTouch
        ? !(t || e)
        : (n ? r.isOnBlur : i.isOnBlur)
          ? !e
          : (n ? r.isOnChange : i.isOnChange)
            ? e
            : !0,
  ot = (e, t) => !re(k(e, t)).length && I(e, t),
  st = (e, t, n) => {
    let r = we(k(e, n));
    return (M(r, le, t[n]), M(e, n, r), e);
  };
function ct(e, t, n = `validate`) {
  if (N(e) || (Array.isArray(e) && e.every(N)) || (A(e) && !e))
    return { type: n, message: N(e) ? e : ``, ref: t };
}
var lt = (e) => (w(e) && !Je(e) ? e : { value: e, message: `` }),
  ut = async (e, t, n, r, i, a) => {
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
    let y = s ? s[0] : o,
      x = (e) => {
        i &&
          y.reportValidity &&
          (y.setCustomValidity(A(e) ? `` : e || ``), y.reportValidity());
      },
      C = {},
      ee = Ae(o),
      te = b(o),
      T = ee || te,
      E =
        ((g || De(o)) && O(o.value) && O(v)) ||
        (Oe(o) && o.value === ``) ||
        v === `` ||
        (Array.isArray(v) && !v.length) ||
        (g && typeof v == `number` && isNaN(v)),
      D = Ce.bind(null, h, r, C),
      ne = (e, t, n, r = se.maxLength, i = se.minLength) => {
        let a = e ? t : n;
        C[h] = { type: e ? r : i, message: a, ref: o, ...D(e ? r : i, a) };
      };
    if (
      a
        ? !Array.isArray(v) || !v.length
        : c &&
          ((!T && (E || S(v))) ||
            (A(v) && !v) ||
            (te && !He(s).isValid) ||
            (ee && !Ge(s).isValid))
    ) {
      let { value: e, message: t } = N(c) ? { value: !!c, message: c } : lt(c);
      if (
        e &&
        ((C[h] = {
          type: se.required,
          message: t,
          ref: y,
          ...D(se.required, t),
        }),
        !r)
      )
        return (x(t), C);
    }
    if (!E && (!S(d) || !S(f))) {
      let e,
        t,
        n = lt(f),
        i = lt(d);
      if (!S(v) && !isNaN(v)) {
        let r = o.valueAsNumber || (v && +v);
        (S(n.value) || (e = r > n.value), S(i.value) || (t = r < i.value));
      } else {
        let r = o.valueAsDate || new Date(v),
          a = (e) => new Date(new Date().toDateString() + ` ` + e),
          s = o.type == `time`,
          c = o.type == `week`;
        (N(n.value) &&
          v &&
          (e = s ? a(v) > a(n.value) : c ? v > n.value : r > new Date(n.value)),
          N(i.value) &&
            v &&
            (t = s
              ? a(v) < a(i.value)
              : c
                ? v < i.value
                : r < new Date(i.value)));
      }
      if ((e || t) && (ne(!!e, n.message, i.message, se.max, se.min), !r))
        return (x(C[h].message), C);
    }
    if ((l || u) && !E && (N(v) || (a && Array.isArray(v)))) {
      let e = lt(l),
        t = lt(u),
        n = !S(e.value) && v.length > +e.value,
        i = !S(t.value) && v.length < +t.value;
      if ((n || i) && (ne(n, e.message, t.message), !r))
        return (x(C[h].message), C);
    }
    if (p && !E && N(v)) {
      let { value: e, message: t } = lt(p);
      if (
        Je(e) &&
        !v.match(e) &&
        ((C[h] = { type: se.pattern, message: t, ref: o, ...D(se.pattern, t) }),
        !r)
      )
        return (x(t), C);
    }
    if (m) {
      if (j(m)) {
        let e = ct(await m(v, n), y);
        if (e && ((C[h] = { ...e, ...D(se.validate, e.message) }), !r))
          return (x(e.message), C);
      } else if (w(m)) {
        let e = {};
        for (let t in m) {
          if (!F(e) && !r) break;
          let i = ct(await m[t](v, n), y, t);
          i &&
            ((e = { ...i, ...D(t, i.message) }), x(i.message), r && (C[h] = e));
        }
        if (!F(e) && ((C[h] = { ref: y, ...e }), !r)) return C;
      }
    }
    return (x(!0), C);
  },
  dt = { mode: oe.onSubmit, reValidateMode: oe.onChange, shouldFocusError: !0 },
  ft = {
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
function pt(e = {}) {
  let t = { ...dt, ...e },
    n = {
      ...D(ft),
      isLoading: j(t.defaultValues),
      errors: t.errors || {},
      disabled: t.disabled || !1,
    },
    r = {},
    i =
      ((w(t.defaultValues) || w(t.values)) && D(t.defaultValues || t.values)) ||
      {},
    a = t.shouldUnregister ? {} : D(i),
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
    p = { array: Te(), state: Te() },
    m = t.criteriaMode === oe.all,
    h = (e) => (t) => {
      (clearTimeout(l), (l = setTimeout(e, t)));
    },
    g = async (e) => {
      if (!o.keepIsValid && !t.disabled && (d.isValid || f.isValid || e)) {
        let e;
        (t.resolver
          ? ((e = F((await de()).errors)), _())
          : (e = await me({
              fields: r,
              onlyCheckValid: !0,
              eventType: ae.VALID,
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
          e && (r ? M(n.validatingFields, e, r) : I(n.validatingFields, e));
        }),
        p.state.next({
          validatingFields: n.validatingFields,
          isValidating: !F(n.validatingFields),
        }));
    },
    v = () => {
      n.dirtyFields = ze(i, a);
    },
    y = (e, i = [], s, c, l = !0, u = !0) => {
      if (c && s && !t.disabled) {
        if (((o.action = !0), u && Array.isArray(k(r, e)))) {
          let t = s(k(r, e), c.argA, c.argB);
          l && M(r, e, t);
        }
        if (u && Array.isArray(k(n.errors, e))) {
          let t = s(k(n.errors, e), c.argA, c.argB);
          (l && M(n.errors, e, t), ot(n.errors, e));
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
            isDirty: _e(e, i),
            dirtyFields: n.dirtyFields,
            errors: n.errors,
            isValid: n.isValid,
          }));
      } else M(a, e, i);
    },
    C = (e, t) => {
      (M(n.errors, e, t), p.state.next({ errors: n.errors }));
    },
    T = (e) => {
      ((n.errors = e), p.state.next({ errors: n.errors, isValid: !1 }));
    },
    ne = (e, t, s, c) => {
      let l = k(r, e);
      if (l) {
        let r = O(k(a, e)),
          u = k(a, e, O(s) ? k(i, e) : s);
        (O(u) || (c && c.defaultChecked) || t
          ? M(a, e, t ? u : Ke(l._f))
          : be(e, u),
          o.mount &&
            !o.action &&
            (g(),
            r &&
              n.isDirty &&
              (d.isDirty || f.isDirty) &&
              (_e() || ((n.isDirty = !1), p.state.next({ ...n })))));
      }
    },
    ie = (e, r, a, o, s) => {
      let c = !1,
        l = !1,
        u = { name: e };
      if (!t.disabled) {
        if (!a || o) {
          (d.isDirty || f.isDirty) &&
            ((l = n.isDirty),
            (n.isDirty = u.isDirty = _e()),
            (c = l !== u.isDirty));
          let t = P(k(i, e), r);
          ((l = !!k(n.dirtyFields, e)),
            t ? I(n.dirtyFields, e) : M(n.dirtyFields, e, !0),
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
    ue = (e, r, i, a) => {
      let o = k(n.errors, e),
        s = (d.isValid || f.isValid) && A(r) && n.isValid !== r;
      if (
        (t.delayError && i
          ? ((c = h(() => C(e, i))), c(t.delayError))
          : (clearTimeout(l),
            (c = null),
            i ? M(n.errors, e, i) : I(n.errors, e)),
        (i ? !P(o, i) : o) || !F(a) || s)
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
    de = async (e) => (
      _(e, !0),
      await t.resolver(
        a,
        t.context,
        qe(e || s.mount, r, t.criteriaMode, t.shouldUseNativeValidation),
      )
    ),
    fe = async (e) => {
      let { errors: t } = await de(e);
      if ((_(e), e))
        for (let r of e) {
          let e = k(t, r);
          e ? M(n.errors, r, e) : I(n.errors, r);
        }
      else n.errors = t;
      return t;
    },
    pe = async ({ name: t, eventType: r }) => {
      if (e.validate) {
        let i = await e.validate({
          formValues: a,
          formState: n,
          name: t,
          eventType: r,
        });
        if (w(i))
          for (let e in i)
            i[e] &&
              Re(`${ce}.${e}`, {
                message: N(i.message) ? i.message : ``,
                type: se.validate,
              });
        else
          N(i) || !i ? Re(ce, { message: i || ``, type: se.validate }) : Le(ce);
        return i;
      }
      return !0;
    },
    me = async ({
      fields: r,
      onlyCheckValid: i,
      name: o,
      eventType: c,
      context: l = { valid: !0, runRootValidation: !1 },
    }) => {
      if (
        e.validate &&
        ((l.runRootValidation = !0),
        !(await pe({ name: o, eventType: c })) && ((l.valid = !1), i))
      )
        return l.valid;
      for (let o in r) {
        let u = r[o];
        if (u) {
          let { _f: r, ...f } = u;
          if (r) {
            let o = s.array.has(r.name),
              c = u._f && Qe(u._f);
            c && d.validatingFields && _([r.name], !0);
            let f = await ut(
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
                      ? st(n.errors, f, r.name)
                      : M(n.errors, r.name, f[r.name])
                    : I(n.errors, r.name)),
                e.shouldUseNativeValidation && f[r.name]))
            )
              break;
          }
          !F(f) &&
            (await me({
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
    ge = () => {
      for (let e of s.unMount) {
        let t = k(r, e);
        t &&
          (t._f.refs ? t._f.refs.every((e) => !Me(e)) : !Me(t._f.ref)) &&
          We(e);
      }
      s.unMount = new Set();
    },
    _e = (e, n) => !t.disabled && (e && n && M(a, e, n), !P(Fe(), i)),
    ve = (e, t, n) =>
      he(e, s, { ...(o.mount ? a : O(t) ? i : N(e) ? { [e]: t } : t) }, n, t),
    ye = (e) =>
      re(k(o.mount ? a : i, e, t.shouldUnregister ? k(i, e, []) : [])),
    be = (e, t, n = {}) => {
      let i = k(r, e),
        o = t;
      if (i) {
        let n = i._f;
        n &&
          (!n.disabled && M(a, e, Ue(t, n)),
          (o = Oe(n.ref) && S(t) ? `` : t),
          ke(n.ref)
            ? [...n.ref.options].forEach(
                (e) => (e.selected = o.includes(e.value)),
              )
            : n.refs
              ? b(n.ref)
                ? n.refs.forEach((e) => {
                    (!e.defaultChecked || !e.disabled) &&
                      (Array.isArray(o)
                        ? (e.checked = !!o.find((t) => t === e.value))
                        : (e.checked = o === e.value || !!o));
                  })
                : n.refs.forEach((e) => (e.checked = e.value === o))
              : De(n.ref)
                ? (n.ref.value = ``)
                : ((n.ref.value = o),
                  n.ref.type || p.state.next({ name: e, values: D(a) })));
      }
      ((n.shouldDirty || n.shouldTouch) &&
        ie(e, o, n.shouldTouch, n.shouldDirty, !0),
        n.shouldValidate && Pe(e));
    },
    xe = (e, t, n) => {
      for (let i in t) {
        if (!t.hasOwnProperty(i)) return;
        let a = t[i],
          o = e + `.` + i,
          c = k(r, o);
        (s.array.has(e) || w(a) || (c && !c._f)) && !x(a)
          ? xe(o, a, n)
          : be(o, a, n);
      }
    },
    Se = (e, t, i = {}) => {
      let c = k(r, e),
        l = s.array.has(e),
        u = D(t),
        m = P(k(a, e), u);
      if ((M(a, e, u), l))
        (p.array.next({ name: e, values: D(a) }),
          (d.isDirty || d.dirtyFields || f.isDirty || f.dirtyFields) &&
            i.shouldDirty &&
            (v(),
            p.state.next({
              name: e,
              dirtyFields: n.dirtyFields,
              isDirty: _e(e, u),
            })));
      else {
        let t = (Array.isArray(u) && !u.length) || F(u);
        !c || c._f || S(u) || t ? be(e, u, i) : xe(e, u, i);
      }
      if (!m) {
        let t = et(e, s);
        p.state.next({
          ...(t && n),
          name: o.mount || t ? e : void 0,
          values: D(a),
        });
      }
    },
    Ce = (e) => {
      let t = j(e) ? e(a) : e;
      P(a, t) || ((a = { ...a, ...t }), p.state.next({ ...n, values: a }));
    },
    Ae = async (i) => {
      o.mount = !0;
      let l = i.target,
        u = l.name,
        h = !0,
        v = k(r, u),
        y = (e) => {
          h =
            Number.isNaN(e) || (x(e) && isNaN(e.getTime())) || P(e, k(a, u, e));
        },
        b = Xe(t.mode),
        S = Xe(t.reValidateMode);
      if (v) {
        let o,
          x,
          C = l.type ? Ke(v._f) : ee(i),
          w = i.type === ae.BLUR || i.type === ae.FOCUS_OUT,
          te =
            (!$e(v._f) &&
              !e.validate &&
              !t.resolver &&
              !k(n.errors, u) &&
              !v._f.deps) ||
            at(w, k(n.touchedFields, u), n.isSubmitted, S, b),
          T = et(u, s, w);
        (M(a, u, C),
          w
            ? (!l || !l.readOnly) && (v._f.onBlur && v._f.onBlur(i), c && c(0))
            : v._f.onChange && v._f.onChange(i));
        let E = ie(u, C, w),
          ne = !F(E) || T;
        if ((!w && p.state.next({ name: u, type: i.type, values: D(a) }), te))
          return (
            (d.isValid || f.isValid) &&
              (t.mode === `onBlur` ? w && g() : w || g()),
            ne && p.state.next({ name: u, ...(T ? {} : E) })
          );
        if (
          (!t.resolver &&
            e.validate &&
            (await pe({ name: u, eventType: i.type })),
          !w && T && p.state.next({ ...n }),
          t.resolver)
        ) {
          let { errors: e } = await de([u]);
          if ((_([u]), y(C), h)) {
            let t = nt(n.errors, r, u),
              i = nt(e, r, t.name || u);
            ((o = i.error), (u = i.name), (x = F(e)));
          }
        } else
          (_([u], !0),
            (o = (await ut(v, s.disabled, a, m, t.shouldUseNativeValidation))[
              u
            ]),
            _([u]),
            y(C),
            h &&
              (o
                ? (x = !1)
                : (d.isValid || f.isValid) &&
                  (x = await me({
                    fields: r,
                    onlyCheckValid: !0,
                    name: u,
                    eventType: i.type,
                  }))));
        h &&
          (v._f.deps &&
            (!Array.isArray(v._f.deps) || v._f.deps.length > 0) &&
            Pe(v._f.deps),
          ue(u, x, o, E));
      }
    },
    Ne = (e, t) => {
      if (k(n.errors, t) && e.focus) return (e.focus(), 1);
    },
    Pe = async (e, i = {}) => {
      let a,
        o,
        c = we(e);
      if (t.resolver) {
        let t = await fe(O(e) ? e : c);
        ((a = F(t)), (o = e ? !c.some((e) => k(t, e)) : a));
      } else
        e
          ? ((o = (
              await Promise.all(
                c.map(async (e) => {
                  let t = k(r, e);
                  return await me({
                    fields: t && t._f ? { [e]: t } : t,
                    eventType: ae.TRIGGER,
                  });
                }),
              )
            ).every(Boolean)),
            !(!o && !n.isValid) && g())
          : (o = a = await me({ fields: r, name: e, eventType: ae.TRIGGER }));
      return (
        p.state.next({
          ...(!N(e) || ((d.isValid || f.isValid) && a !== n.isValid)
            ? {}
            : { name: e }),
          ...(t.resolver || !e ? { isValid: a } : {}),
          errors: n.errors,
        }),
        i.shouldFocus && !o && tt(r, Ne, e ? c : s.mount),
        o
      );
    },
    Fe = (e, t) => {
      let r = { ...(o.mount ? a : i) };
      return (
        t && (r = Ee(t.dirtyFields ? n.dirtyFields : n.touchedFields, r)),
        O(e) ? r : N(e) ? k(r, e) : e.map((e) => k(r, e))
      );
    },
    Ie = (e, t) => ({
      invalid: !!k((t || n).errors, e),
      isDirty: !!k((t || n).dirtyFields, e),
      error: k((t || n).errors, e),
      isValidating: !!k(n.validatingFields, e),
      isTouched: !!k((t || n).touchedFields, e),
    }),
    Le = (e) => {
      let t = e ? we(e) : void 0;
      (t?.forEach((e) => I(n.errors, e)),
        t
          ? t.forEach((e) => {
              p.state.next({ name: e, errors: n.errors });
            })
          : p.state.next({ errors: {} }));
    },
    Re = (e, t, i) => {
      let a = (k(r, e, { _f: {} })._f || {}).ref,
        { ref: o, message: s, type: c, ...l } = k(n.errors, e) || {};
      (M(n.errors, e, { ...l, ...t, ref: a }),
        p.state.next({ name: e, errors: n.errors, isValid: !1 }),
        i && i.shouldFocus && a && a.focus && a.focus());
    },
    Be = (e, t) =>
      j(e)
        ? p.state.subscribe({
            next: (n) => `values` in n && e(n.values || ve(void 0, t), n),
          })
        : ve(e, t, !0),
    Ve = (e) =>
      p.state.subscribe({
        next: (t) => {
          if (
            it(e.name, t.name, e.exact) &&
            rt(t, e.formState || d, _t, e.reRenderRoot)
          ) {
            let r = { ...a };
            e.callback({ values: r, ...n, ...t, defaultValues: i });
          }
        },
      }).unsubscribe,
    He = (e) => (
      (o.mount = !0),
      (f = { ...f, ...e.formState }),
      Ve({ ...e, formState: { ...u, ...e.formState } })
    ),
    We = (e, o = {}) => {
      for (let c of e ? we(e) : s.mount)
        (s.mount.delete(c),
          s.array.delete(c),
          o.keepValue || (I(r, c), I(a, c)),
          !o.keepError && I(n.errors, c),
          !o.keepDirty && I(n.dirtyFields, c),
          !o.keepTouched && I(n.touchedFields, c),
          !o.keepIsValidating && I(n.validatingFields, c),
          !t.shouldUnregister && !o.keepDefaultValue && I(i, c));
      (p.state.next({ values: D(a) }),
        p.state.next({ ...n, ...(o.keepDirty ? { isDirty: _e() } : {}) }),
        !o.keepIsValid && g());
    },
    Ge = ({ disabled: e, name: t }) => {
      if ((A(e) && o.mount) || e || s.disabled.has(t)) {
        let n = s.disabled.has(t) !== !!e;
        (e ? s.disabled.add(t) : s.disabled.delete(t),
          n && o.mount && !o.action && g());
      }
    },
    Je = (e, n = {}) => {
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
          ? Ge({ disabled: A(n.disabled) ? n.disabled : t.disabled, name: e })
          : ne(e, !0, n.value),
        {
          ...(c ? { disabled: n.disabled || t.disabled } : {}),
          ...(t.progressive
            ? {
                required: !!n.required,
                min: Ye(n.min),
                max: Ye(n.max),
                minLength: Ye(n.minLength),
                maxLength: Ye(n.maxLength),
                pattern: Ye(n.pattern),
              }
            : {}),
          name: e,
          onChange: Ae,
          onBlur: Ae,
          ref: (c) => {
            if (c) {
              (s.registerName.add(e),
                Je(e, n),
                s.registerName.delete(e),
                (a = k(r, e)));
              let t =
                  (O(c.value) &&
                    c.querySelectorAll &&
                    c.querySelectorAll(`input,select,textarea`)[0]) ||
                  c,
                o = je(t),
                l = a._f.refs || [];
              if (o ? l.find((e) => e === t) : t === a._f.ref) return;
              (M(r, e, {
                _f: {
                  ...a._f,
                  ...(o
                    ? {
                        refs: [
                          ...l.filter(Me),
                          t,
                          ...(Array.isArray(k(i, e)) ? [{}] : []),
                        ],
                        ref: { type: t.type, name: e },
                      }
                    : { ref: t }),
                },
              }),
                ne(e, !1, void 0, t));
            } else
              ((a = k(r, e, {})),
                a._f && (a._f.mount = !1),
                (t.shouldUnregister || n.shouldUnregister) &&
                  !(te(s.array, e) && o.action) &&
                  s.unMount.add(e));
          },
        }
      );
    },
    Ze = () => t.shouldFocusError && tt(r, Ne, s.mount),
    ct = (e) => {
      A(e) &&
        (p.state.next({ disabled: e }),
        tt(
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
    lt = (e, i) => async (o) => {
      let c;
      o && (o.preventDefault && o.preventDefault(), o.persist && o.persist());
      let l = D(a);
      if ((p.state.next({ isSubmitting: !0 }), t.resolver)) {
        let { errors: e, values: t } = await de();
        (_(), (n.errors = e), (l = D(t)));
      } else await me({ fields: r, eventType: ae.SUBMIT });
      if (s.disabled.size) for (let e of s.disabled) I(l, e);
      if ((I(n.errors, le), F(n.errors))) {
        p.state.next({ errors: {} });
        try {
          await e(l, o);
        } catch (e) {
          c = e;
        }
      } else (i && (await i({ ...n.errors }, o)), Ze(), setTimeout(Ze));
      if (
        (p.state.next({
          isSubmitted: !0,
          isSubmitting: !1,
          isSubmitSuccessful: F(n.errors) && !c,
          submitCount: n.submitCount + 1,
          errors: n.errors,
        }),
        c)
      )
        throw c;
    },
    pt = (e, t = {}) => {
      k(r, e) &&
        (O(t.defaultValue)
          ? Se(e, D(k(i, e)))
          : (Se(e, t.defaultValue), M(i, e, D(t.defaultValue))),
        t.keepTouched || I(n.touchedFields, e),
        t.keepDirty ||
          (I(n.dirtyFields, e),
          (n.isDirty = t.defaultValue ? _e(e, D(k(i, e))) : _e())),
        t.keepError || (I(n.errors, e), d.isValid && g()),
        p.state.next({ ...n }));
    },
    mt = (e, c = {}) => {
      let l = e ? D(e) : i,
        u = D(l),
        f = F(e),
        m = f ? i : u;
      if ((c.keepDefaultValues || (i = l), !c.keepValues)) {
        if (c.keepDirtyValues) {
          let e = new Set([...s.mount, ...Object.keys(ze(i, a))]);
          for (let t of Array.from(e)) {
            let e = k(n.dirtyFields, t),
              r = k(a, t),
              i = k(m, t);
            e && !O(r) ? M(m, t, r) : !e && !O(i) && Se(t, i);
          }
        } else {
          if (E && O(e))
            for (let e of s.mount) {
              let t = k(r, e);
              if (t && t._f) {
                let e = Array.isArray(t._f.refs) ? t._f.refs[0] : t._f.ref;
                if (Oe(e)) {
                  let t = e.closest(`form`);
                  if (t) {
                    t.reset();
                    break;
                  }
                }
              }
            }
          if (c.keepFieldsRef) for (let e of s.mount) Se(e, k(m, e));
          else r = {};
        }
        ((a = t.shouldUnregister ? (c.keepDefaultValues ? D(i) : {}) : D(m)),
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
          (!t.shouldUnregister && !F(m))),
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
              : !!(c.keepDefaultValues && !P(e, i)),
          isSubmitted: c.keepIsSubmitted ? n.isSubmitted : !1,
          dirtyFields: f
            ? {}
            : c.keepDirtyValues
              ? c.keepDefaultValues && a
                ? ze(i, a)
                : n.dirtyFields
              : c.keepDefaultValues && e
                ? ze(i, e)
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
    ht = (e, n) => mt(j(e) ? e(a) : e, { ...t.resetOptions, ...n }),
    gt = (e, t = {}) => {
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
    _t = (e) => {
      n = { ...n, ...e };
    },
    vt = {
      control: {
        register: Je,
        unregister: We,
        getFieldState: Ie,
        handleSubmit: lt,
        setError: Re,
        _subscribe: Ve,
        _runSchema: de,
        _updateIsValidating: _,
        _focusError: Ze,
        _getWatch: ve,
        _getDirty: _e,
        _setValid: g,
        _setFieldArray: y,
        _setDisabledField: Ge,
        _setErrors: T,
        _getFieldArray: ye,
        _reset: mt,
        _resetDefaultValues: () =>
          j(t.defaultValues) &&
          t.defaultValues().then((e) => {
            (ht(e, t.resetOptions), p.state.next({ isLoading: !1 }));
          }),
        _removeUnmounted: ge,
        _disableForm: ct,
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
      subscribe: He,
      trigger: Pe,
      register: Je,
      handleSubmit: lt,
      watch: Be,
      setValue: Se,
      setValues: Ce,
      getValues: Fe,
      reset: ht,
      resetField: pt,
      clearErrors: Le,
      unregister: We,
      setError: Re,
      setFocus: gt,
      getFieldState: Ie,
    };
  return { ...vt, formControl: vt };
}
function mt(e = {}) {
  let t = m.useRef(void 0),
    n = m.useRef(void 0),
    [r, i] = m.useState(() => ({
      ...D(ft),
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
      let { formControl: n, ...i } = pt(e);
      t.current = { ...i, formState: r };
    }
  let a = t.current.control;
  return (
    (a._options = e),
    pe(() => {
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
    m.useEffect(() => a._disableForm(e.disabled), [a, e.disabled]),
    m.useEffect(() => {
      (e.mode && (a._options.mode = e.mode),
        e.reValidateMode && (a._options.reValidateMode = e.reValidateMode));
    }, [a, e.mode, e.reValidateMode]),
    m.useEffect(() => {
      e.errors && (a._setErrors(e.errors), a._focusError());
    }, [a, e.errors]),
    m.useEffect(() => {
      e.shouldUnregister && a._subjects.state.next({ values: a._getWatch() });
    }, [a, e.shouldUnregister]),
    m.useEffect(() => {
      if (a._proxyFormState.isDirty) {
        let e = a._getDirty();
        e !== r.isDirty && a._subjects.state.next({ isDirty: e });
      }
    }, [a, r.isDirty]),
    m.useEffect(() => {
      e.values && !P(e.values, n.current)
        ? (a._reset(e.values, {
            keepFieldsRef: !0,
            ...a._options.resetOptions,
          }),
          a._options.resetOptions?.keepIsValid || a._setValid(),
          (n.current = e.values),
          i((e) => ({ ...e })))
        : a._resetDefaultValues();
    }, [a, e.values]),
    m.useEffect(() => {
      (a._state.mount || (a._setValid(), (a._state.mount = !0)),
        a._state.watch &&
          ((a._state.watch = !1), a._subjects.state.next({ ...a._formState })),
        a._removeUnmounted());
    }),
    (t.current.formState = m.useMemo(() => fe(r, a), [a, r])),
    t.current
  );
}
function ht({ className: e, ...t }) {
  return (0, h.jsx)(v, {
    "data-slot": `label`,
    className: c(
      `flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50`,
      e,
    ),
    ...t,
  });
}
var gt = Se,
  _t = m.createContext({}),
  vt = ({ ...e }) =>
    (0, h.jsx)(_t.Provider, {
      value: { name: e.name },
      children: (0, h.jsx)(ye, { ...e }),
    }),
  yt = () => {
    let e = m.useContext(_t),
      t = m.useContext(bt),
      { getFieldState: n, formState: r } = xe(),
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
  bt = m.createContext({});
function xt({ className: e, ...t }) {
  let n = m.useId();
  return (0, h.jsx)(bt.Provider, {
    value: { id: n },
    children: (0, h.jsx)(`div`, {
      "data-slot": `form-item`,
      className: c(`grid gap-2`, e),
      ...t,
    }),
  });
}
function St({ className: e, ...t }) {
  let { error: n, formItemId: r } = yt();
  return (0, h.jsx)(ht, {
    "data-slot": `form-label`,
    className: c(n && `text-destructive`, e),
    htmlFor: r,
    ...t,
  });
}
function Ct({ ...e }) {
  let {
    error: t,
    formItemId: n,
    formDescriptionId: r,
    formMessageId: i,
  } = yt();
  return (0, h.jsx)(s, {
    "data-slot": `form-control`,
    id: n,
    "aria-describedby": t ? `${r} ${i}` : `${r}`,
    "aria-invalid": !!t,
    ...e,
  });
}
function wt({ className: e, children: t, ...n }) {
  let { error: r, formMessageId: i } = yt(),
    a = r ? String(r?.message ?? ``) : t;
  return a
    ? (0, h.jsx)(`p`, {
        "data-slot": `form-message`,
        id: i,
        className: c(`text-sm font-medium text-destructive`, e),
        ...n,
        children: a,
      })
    : null;
}
function Tt({ className: e, type: t, ...n }) {
  return (0, h.jsx)(`input`, {
    type: t,
    "data-slot": `input`,
    className: c(
      `h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40`,
      e,
    ),
    ...n,
  });
}
function Et({ className: e }) {
  return (0, h.jsx)(`svg`, {
    className: e,
    viewBox: `0 0 24 24`,
    fill: `currentColor`,
    "aria-hidden": `true`,
    children: (0, h.jsx)(`path`, {
      d: `M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z`,
    }),
  });
}
function Dt({ action: e }) {
  return (0, h.jsxs)(`div`, {
    className: `space-y-4`,
    children: [
      (0, h.jsxs)(`div`, {
        className: `flex items-center gap-3`,
        children: [
          (0, h.jsx)(u, { className: `flex-1` }),
          (0, h.jsx)(`span`, {
            className: `text-xs text-muted-foreground`,
            children: `or continue with`,
          }),
          (0, h.jsx)(u, { className: `flex-1` }),
        ],
      }),
      (0, h.jsxs)(`div`, {
        className: `grid grid-cols-2 gap-3`,
        children: [
          (0, h.jsxs)(d, {
            type: `button`,
            variant: `outline`,
            className: `w-full`,
            onClick: () => {},
            children: [
              (0, h.jsxs)(`svg`, {
                className: `size-4 mr-2`,
                viewBox: `0 0 24 24`,
                "aria-hidden": `true`,
                children: [
                  (0, h.jsx)(`path`, {
                    d: `M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z`,
                    fill: `#4285F4`,
                  }),
                  (0, h.jsx)(`path`, {
                    d: `M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z`,
                    fill: `#34A853`,
                  }),
                  (0, h.jsx)(`path`, {
                    d: `M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z`,
                    fill: `#FBBC05`,
                  }),
                  (0, h.jsx)(`path`, {
                    d: `M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z`,
                    fill: `#EA4335`,
                  }),
                ],
              }),
              `Google`,
            ],
          }),
          (0, h.jsxs)(d, {
            type: `button`,
            variant: `outline`,
            className: `w-full`,
            onClick: () => {},
            children: [(0, h.jsx)(Et, { className: `size-4 mr-2` }), `GitHub`],
          }),
        ],
      }),
    ],
  });
}
var Ot = (e, t, n) => {
    if (e && `reportValidity` in e) {
      let r = k(n, t);
      (e.setCustomValidity((r && r.message) || ``), e.reportValidity());
    }
  },
  kt = (e, t) => {
    for (let n in t.fields) {
      let r = t.fields[n];
      r && r.ref && `reportValidity` in r.ref
        ? Ot(r.ref, n, e)
        : r && r.refs && r.refs.forEach((t) => Ot(t, n, e));
    }
  },
  At = (e, t) => {
    t.shouldUseNativeValidation && kt(e, t);
    let n = {};
    for (let r in e) {
      let i = k(t.fields, r),
        a = Object.assign(e[r] || {}, { ref: i && i.ref });
      if (jt(t.names || Object.keys(e), r)) {
        let e = Object.assign({}, k(n, r));
        (M(e, `root`, a), M(n, r, e));
      } else M(n, r, a);
    }
    return n;
  },
  jt = (e, t) => {
    let n = Mt(t);
    return e.some((e) => Mt(e).match(`^${n}\\.\\d+`));
  };
function Mt(e) {
  return e.replace(/\]|\[/g, ``);
}
var Nt;
function L(e, t, n) {
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
var Pt = class extends Error {
    constructor() {
      super(
        `Encountered Promise during synchronous parse. Use .parseAsync() instead.`,
      );
    }
  },
  Ft = class extends Error {
    constructor(e) {
      (super(`Encountered unidirectional transform during encode: ${e}`),
        (this.name = `ZodEncodeError`));
    }
  };
(Nt = globalThis).__zod_globalConfig ?? (Nt.__zod_globalConfig = {});
var It = globalThis.__zod_globalConfig;
function Lt(e) {
  return (e && Object.assign(It, e), It);
}
function Rt(e) {
  let t = Object.values(e).filter((e) => typeof e == `number`);
  return Object.entries(e)
    .filter(([e, n]) => t.indexOf(+e) === -1)
    .map(([e, t]) => t);
}
function zt(e, t) {
  return typeof t == `bigint` ? t.toString() : t;
}
function Bt(e) {
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
function Vt(e) {
  return e == null;
}
function Ht(e) {
  let t = +!!e.startsWith(`^`),
    n = e.endsWith(`$`) ? e.length - 1 : e.length;
  return e.slice(t, n);
}
var Ut = Symbol(`evaluating`);
function R(e, t, n) {
  let r;
  Object.defineProperty(e, t, {
    get() {
      if (r !== Ut) return (r === void 0 && ((r = Ut), (r = n())), r);
    },
    set(n) {
      Object.defineProperty(e, t, { value: n });
    },
    configurable: !0,
  });
}
function Wt(e, t, n) {
  Object.defineProperty(e, t, {
    value: n,
    writable: !0,
    enumerable: !0,
    configurable: !0,
  });
}
function Gt(...e) {
  let t = {};
  for (let n of e) Object.assign(t, Object.getOwnPropertyDescriptors(n));
  return Object.defineProperties({}, t);
}
function Kt(e) {
  return JSON.stringify(e);
}
function qt(e) {
  return e
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, ``)
    .replace(/[\s_-]+/g, `-`)
    .replace(/^-+|-+$/g, ``);
}
var Jt = `captureStackTrace` in Error ? Error.captureStackTrace : (...e) => {};
function Yt(e) {
  return typeof e == `object` && !!e && !Array.isArray(e);
}
var Xt = Bt(() => {
  if (
    It.jitless ||
    (typeof navigator < `u` && navigator?.userAgent?.includes(`Cloudflare`))
  )
    return !1;
  try {
    return (Function(``), !0);
  } catch {
    return !1;
  }
});
function Zt(e) {
  if (Yt(e) === !1) return !1;
  let t = e.constructor;
  if (t === void 0 || typeof t != `function`) return !0;
  let n = t.prototype;
  return !(
    Yt(n) === !1 ||
    Object.prototype.hasOwnProperty.call(n, `isPrototypeOf`) === !1
  );
}
function Qt(e) {
  return Zt(e)
    ? { ...e }
    : Array.isArray(e)
      ? [...e]
      : e instanceof Map
        ? new Map(e)
        : e instanceof Set
          ? new Set(e)
          : e;
}
var $t = new Set([`string`, `number`, `symbol`]);
function en(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}
function tn(e, t, n) {
  let r = new e._zod.constr(t ?? e._zod.def);
  return ((!t || n?.parent) && (r._zod.parent = e), r);
}
function z(e) {
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
function nn(e) {
  return Object.keys(e).filter(
    (t) => e[t]._zod.optin === `optional` && e[t]._zod.optout === `optional`,
  );
}
(-Number.MAX_VALUE, Number.MAX_VALUE);
function rn(e, t) {
  let n = e._zod.def,
    r = n.checks;
  if (r && r.length > 0)
    throw Error(
      `.pick() cannot be used on object schemas containing refinements`,
    );
  return tn(
    e,
    Gt(e._zod.def, {
      get shape() {
        let e = {};
        for (let r in t) {
          if (!(r in n.shape)) throw Error(`Unrecognized key: "${r}"`);
          t[r] && (e[r] = n.shape[r]);
        }
        return (Wt(this, `shape`, e), e);
      },
      checks: [],
    }),
  );
}
function an(e, t) {
  let n = e._zod.def,
    r = n.checks;
  if (r && r.length > 0)
    throw Error(
      `.omit() cannot be used on object schemas containing refinements`,
    );
  return tn(
    e,
    Gt(e._zod.def, {
      get shape() {
        let r = { ...e._zod.def.shape };
        for (let e in t) {
          if (!(e in n.shape)) throw Error(`Unrecognized key: "${e}"`);
          t[e] && delete r[e];
        }
        return (Wt(this, `shape`, r), r);
      },
      checks: [],
    }),
  );
}
function on(e, t) {
  if (!Zt(t)) throw Error(`Invalid input to extend: expected a plain object`);
  let n = e._zod.def.checks;
  if (n && n.length > 0) {
    let n = e._zod.def.shape;
    for (let e in t)
      if (Object.getOwnPropertyDescriptor(n, e) !== void 0)
        throw Error(
          "Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.",
        );
  }
  return tn(
    e,
    Gt(e._zod.def, {
      get shape() {
        let n = { ...e._zod.def.shape, ...t };
        return (Wt(this, `shape`, n), n);
      },
    }),
  );
}
function sn(e, t) {
  if (!Zt(t))
    throw Error(`Invalid input to safeExtend: expected a plain object`);
  return tn(
    e,
    Gt(e._zod.def, {
      get shape() {
        let n = { ...e._zod.def.shape, ...t };
        return (Wt(this, `shape`, n), n);
      },
    }),
  );
}
function cn(e, t) {
  if (e._zod.def.checks?.length)
    throw Error(
      `.merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.`,
    );
  return tn(
    e,
    Gt(e._zod.def, {
      get shape() {
        let n = { ...e._zod.def.shape, ...t._zod.def.shape };
        return (Wt(this, `shape`, n), n);
      },
      get catchall() {
        return t._zod.def.catchall;
      },
      checks: t._zod.def.checks ?? [],
    }),
  );
}
function ln(e, t, n) {
  let r = t._zod.def.checks;
  if (r && r.length > 0)
    throw Error(
      `.partial() cannot be used on object schemas containing refinements`,
    );
  return tn(
    t,
    Gt(t._zod.def, {
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
        return (Wt(this, `shape`, i), i);
      },
      checks: [],
    }),
  );
}
function un(e, t, n) {
  return tn(
    t,
    Gt(t._zod.def, {
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
        return (Wt(this, `shape`, i), i);
      },
    }),
  );
}
function dn(e, t = 0) {
  if (e.aborted === !0) return !0;
  for (let n = t; n < e.issues.length; n++)
    if (e.issues[n]?.continue !== !0) return !0;
  return !1;
}
function fn(e, t = 0) {
  if (e.aborted === !0) return !0;
  for (let n = t; n < e.issues.length; n++)
    if (e.issues[n]?.continue === !1) return !0;
  return !1;
}
function pn(e, t) {
  return t.map((t) => {
    var n;
    return ((n = t).path ?? (n.path = []), t.path.unshift(e), t);
  });
}
function mn(e) {
  return typeof e == `string` ? e : e?.message;
}
function hn(e, t, n) {
  let r = e.message
      ? e.message
      : (mn(e.inst?._zod.def?.error?.(e)) ??
        mn(t?.error?.(e)) ??
        mn(n.customError?.(e)) ??
        mn(n.localeError?.(e)) ??
        `Invalid input`),
    { inst: i, continue: a, input: o, ...s } = e;
  return ((s.path ??= []), (s.message = r), t?.reportInput && (s.input = o), s);
}
function gn(e) {
  return Array.isArray(e)
    ? `array`
    : typeof e == `string`
      ? `string`
      : `unknown`;
}
function _n(...e) {
  let [t, n, r] = e;
  return typeof t == `string`
    ? { message: t, code: `custom`, input: n, inst: r }
    : { ...t };
}
var vn = (e, t) => {
    ((e.name = `$ZodError`),
      Object.defineProperty(e, `_zod`, { value: e._zod, enumerable: !1 }),
      Object.defineProperty(e, `issues`, { value: t, enumerable: !1 }),
      (e.message = JSON.stringify(t, zt, 2)),
      Object.defineProperty(e, `toString`, {
        value: () => e.message,
        enumerable: !1,
      }));
  },
  yn = L(`$ZodError`, vn),
  bn = L(`$ZodError`, vn, { Parent: Error });
function xn(e, t = (e) => e.message) {
  let n = {},
    r = [];
  for (let i of e.issues)
    i.path.length > 0
      ? ((n[i.path[0]] = n[i.path[0]] || []), n[i.path[0]].push(t(i)))
      : r.push(t(i));
  return { formErrors: r, fieldErrors: n };
}
function Sn(e, t = (e) => e.message) {
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
var Cn = (e) => (t, n, r, i) => {
    let a = r ? { ...r, async: !1 } : { async: !1 },
      o = t._zod.run({ value: n, issues: [] }, a);
    if (o instanceof Promise) throw new Pt();
    if (o.issues.length) {
      let t = new (i?.Err ?? e)(o.issues.map((e) => hn(e, a, Lt())));
      throw (Jt(t, i?.callee), t);
    }
    return o.value;
  },
  wn = Cn(bn),
  Tn = (e) => async (t, n, r, i) => {
    let a = r ? { ...r, async: !0 } : { async: !0 },
      o = t._zod.run({ value: n, issues: [] }, a);
    if ((o instanceof Promise && (o = await o), o.issues.length)) {
      let t = new (i?.Err ?? e)(o.issues.map((e) => hn(e, a, Lt())));
      throw (Jt(t, i?.callee), t);
    }
    return o.value;
  },
  En = Tn(bn),
  Dn = (e) => (t, n, r) => {
    let i = r ? { ...r, async: !1 } : { async: !1 },
      a = t._zod.run({ value: n, issues: [] }, i);
    if (a instanceof Promise) throw new Pt();
    return a.issues.length
      ? {
          success: !1,
          error: new (e ?? yn)(a.issues.map((e) => hn(e, i, Lt()))),
        }
      : { success: !0, data: a.value };
  },
  On = Dn(bn),
  kn = (e) => async (t, n, r) => {
    let i = r ? { ...r, async: !0 } : { async: !0 },
      a = t._zod.run({ value: n, issues: [] }, i);
    return (
      a instanceof Promise && (a = await a),
      a.issues.length
        ? { success: !1, error: new e(a.issues.map((e) => hn(e, i, Lt()))) }
        : { success: !0, data: a.value }
    );
  },
  An = kn(bn),
  jn = (e) => (t, n, r) => {
    let i = r ? { ...r, direction: `backward` } : { direction: `backward` };
    return Cn(e)(t, n, i);
  },
  Mn = (e) => (t, n, r) => Cn(e)(t, n, r),
  Nn = (e) => async (t, n, r) => {
    let i = r ? { ...r, direction: `backward` } : { direction: `backward` };
    return Tn(e)(t, n, i);
  },
  Pn = (e) => async (t, n, r) => Tn(e)(t, n, r),
  Fn = (e) => (t, n, r) => {
    let i = r ? { ...r, direction: `backward` } : { direction: `backward` };
    return Dn(e)(t, n, i);
  },
  In = (e) => (t, n, r) => Dn(e)(t, n, r),
  Ln = (e) => async (t, n, r) => {
    let i = r ? { ...r, direction: `backward` } : { direction: `backward` };
    return kn(e)(t, n, i);
  },
  Rn = (e) => async (t, n, r) => kn(e)(t, n, r),
  zn = /^[cC][0-9a-z]{6,}$/,
  Bn = /^[0-9a-z]+$/,
  Vn = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
  Hn = /^[0-9a-vA-V]{20}$/,
  Un = /^[A-Za-z0-9]{27}$/,
  Wn = /^[a-zA-Z0-9_-]{21}$/,
  Gn =
    /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
  Kn =
    /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
  qn = (e) =>
    e
      ? RegExp(
          `^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`,
        )
      : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
  Jn =
    /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
  Yn = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
function Xn() {
  return new RegExp(Yn, `u`);
}
var Zn =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  Qn =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
  $n =
    /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
  er =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  tr =
    /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
  nr = /^[A-Za-z0-9_-]*$/,
  rr = /^https?$/,
  ir = /^\+[1-9]\d{6,14}$/,
  ar = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`,
  or = RegExp(`^${ar}$`);
function sr(e) {
  let t = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
  return typeof e.precision == `number`
    ? e.precision === -1
      ? `${t}`
      : e.precision === 0
        ? `${t}:[0-5]\\d`
        : `${t}:[0-5]\\d\\.\\d{${e.precision}}`
    : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function cr(e) {
  return RegExp(`^${sr(e)}$`);
}
function lr(e) {
  let t = sr({ precision: e.precision }),
    n = [`Z`];
  (e.local && n.push(``),
    e.offset && n.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`));
  let r = `${t}(?:${n.join(`|`)})`;
  return RegExp(`^${ar}T(?:${r})$`);
}
var ur = (e) => {
    let t = e
      ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ``}}`
      : `[\\s\\S]*`;
    return RegExp(`^${t}$`);
  },
  dr = /^[^A-Z]*$/,
  fr = /^[^a-z]*$/,
  pr = L(`$ZodCheck`, (e, t) => {
    var n;
    ((e._zod ??= {}),
      (e._zod.def = t),
      (n = e._zod).onattach ?? (n.onattach = []));
  }),
  mr = L(`$ZodCheckMaxLength`, (e, t) => {
    var n;
    (pr.init(e, t),
      (n = e._zod.def).when ??
        (n.when = (e) => {
          let t = e.value;
          return !Vt(t) && t.length !== void 0;
        }),
      e._zod.onattach.push((e) => {
        let n = e._zod.bag.maximum ?? 1 / 0;
        t.maximum < n && (e._zod.bag.maximum = t.maximum);
      }),
      (e._zod.check = (n) => {
        let r = n.value;
        if (r.length <= t.maximum) return;
        let i = gn(r);
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
  hr = L(`$ZodCheckMinLength`, (e, t) => {
    var n;
    (pr.init(e, t),
      (n = e._zod.def).when ??
        (n.when = (e) => {
          let t = e.value;
          return !Vt(t) && t.length !== void 0;
        }),
      e._zod.onattach.push((e) => {
        let n = e._zod.bag.minimum ?? -1 / 0;
        t.minimum > n && (e._zod.bag.minimum = t.minimum);
      }),
      (e._zod.check = (n) => {
        let r = n.value;
        if (r.length >= t.minimum) return;
        let i = gn(r);
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
  gr = L(`$ZodCheckLengthEquals`, (e, t) => {
    var n;
    (pr.init(e, t),
      (n = e._zod.def).when ??
        (n.when = (e) => {
          let t = e.value;
          return !Vt(t) && t.length !== void 0;
        }),
      e._zod.onattach.push((e) => {
        let n = e._zod.bag;
        ((n.minimum = t.length), (n.maximum = t.length), (n.length = t.length));
      }),
      (e._zod.check = (n) => {
        let r = n.value,
          i = r.length;
        if (i === t.length) return;
        let a = gn(r),
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
  _r = L(`$ZodCheckStringFormat`, (e, t) => {
    var n, r;
    (pr.init(e, t),
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
  vr = L(`$ZodCheckRegex`, (e, t) => {
    (_r.init(e, t),
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
  yr = L(`$ZodCheckLowerCase`, (e, t) => {
    ((t.pattern ??= dr), _r.init(e, t));
  }),
  br = L(`$ZodCheckUpperCase`, (e, t) => {
    ((t.pattern ??= fr), _r.init(e, t));
  }),
  xr = L(`$ZodCheckIncludes`, (e, t) => {
    pr.init(e, t);
    let n = en(t.includes),
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
  Sr = L(`$ZodCheckStartsWith`, (e, t) => {
    pr.init(e, t);
    let n = RegExp(`^${en(t.prefix)}.*`);
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
  Cr = L(`$ZodCheckEndsWith`, (e, t) => {
    pr.init(e, t);
    let n = RegExp(`.*${en(t.suffix)}$`);
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
  wr = L(`$ZodCheckOverwrite`, (e, t) => {
    (pr.init(e, t),
      (e._zod.check = (e) => {
        e.value = t.tx(e.value);
      }));
  }),
  Tr = class {
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
  Er = { major: 4, minor: 4, patch: 3 },
  B = L(`$ZodType`, (e, t) => {
    var n;
    ((e ??= {}),
      (e._zod.def = t),
      (e._zod.bag = e._zod.bag || {}),
      (e._zod.version = Er));
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
          let r = dn(e),
            i;
          for (let a of t) {
            if (a._zod.def.when) {
              if (fn(e) || !a._zod.def.when(e)) continue;
            } else if (r) continue;
            let t = e.issues.length,
              o = a._zod.check(e);
            if (o instanceof Promise && n?.async === !1) throw new Pt();
            if (i || o instanceof Promise)
              i = (i ?? Promise.resolve()).then(async () => {
                (await o, e.issues.length !== t && (r ||= dn(e, t)));
              });
            else {
              if (e.issues.length === t) continue;
              r ||= dn(e, t);
            }
          }
          return i ? i.then(() => e) : e;
        },
        n = (n, i, a) => {
          if (dn(n)) return ((n.aborted = !0), n);
          let o = t(i, r, a);
          if (o instanceof Promise) {
            if (a.async === !1) throw new Pt();
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
          if (a.async === !1) throw new Pt();
          return o.then((e) => t(e, r, a));
        }
        return t(o, r, a);
      };
    }
    R(e, `~standard`, () => ({
      validate: (t) => {
        try {
          let n = On(e, t);
          return n.success ? { value: n.data } : { issues: n.error?.issues };
        } catch {
          return An(e, t).then((e) =>
            e.success ? { value: e.data } : { issues: e.error?.issues },
          );
        }
      },
      vendor: `zod`,
      version: 1,
    }));
  }),
  Dr = L(`$ZodString`, (e, t) => {
    (B.init(e, t),
      (e._zod.pattern =
        [...(e?._zod.bag?.patterns ?? [])].pop() ?? ur(e._zod.bag)),
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
  V = L(`$ZodStringFormat`, (e, t) => {
    (_r.init(e, t), Dr.init(e, t));
  }),
  Or = L(`$ZodGUID`, (e, t) => {
    ((t.pattern ??= Kn), V.init(e, t));
  }),
  kr = L(`$ZodUUID`, (e, t) => {
    if (t.version) {
      let e = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[
        t.version
      ];
      if (e === void 0) throw Error(`Invalid UUID version: "${t.version}"`);
      t.pattern ??= qn(e);
    } else t.pattern ??= qn();
    V.init(e, t);
  }),
  Ar = L(`$ZodEmail`, (e, t) => {
    ((t.pattern ??= Jn), V.init(e, t));
  }),
  jr = L(`$ZodURL`, (e, t) => {
    (V.init(e, t),
      (e._zod.check = (n) => {
        try {
          let r = n.value.trim();
          if (
            !t.normalize &&
            t.protocol?.source === rr.source &&
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
  Mr = L(`$ZodEmoji`, (e, t) => {
    ((t.pattern ??= Xn()), V.init(e, t));
  }),
  Nr = L(`$ZodNanoID`, (e, t) => {
    ((t.pattern ??= Wn), V.init(e, t));
  }),
  Pr = L(`$ZodCUID`, (e, t) => {
    ((t.pattern ??= zn), V.init(e, t));
  }),
  Fr = L(`$ZodCUID2`, (e, t) => {
    ((t.pattern ??= Bn), V.init(e, t));
  }),
  Ir = L(`$ZodULID`, (e, t) => {
    ((t.pattern ??= Vn), V.init(e, t));
  }),
  Lr = L(`$ZodXID`, (e, t) => {
    ((t.pattern ??= Hn), V.init(e, t));
  }),
  Rr = L(`$ZodKSUID`, (e, t) => {
    ((t.pattern ??= Un), V.init(e, t));
  }),
  zr = L(`$ZodISODateTime`, (e, t) => {
    ((t.pattern ??= lr(t)), V.init(e, t));
  }),
  Br = L(`$ZodISODate`, (e, t) => {
    ((t.pattern ??= or), V.init(e, t));
  }),
  Vr = L(`$ZodISOTime`, (e, t) => {
    ((t.pattern ??= cr(t)), V.init(e, t));
  }),
  Hr = L(`$ZodISODuration`, (e, t) => {
    ((t.pattern ??= Gn), V.init(e, t));
  }),
  Ur = L(`$ZodIPv4`, (e, t) => {
    ((t.pattern ??= Zn), V.init(e, t), (e._zod.bag.format = `ipv4`));
  }),
  Wr = L(`$ZodIPv6`, (e, t) => {
    ((t.pattern ??= Qn),
      V.init(e, t),
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
  Gr = L(`$ZodCIDRv4`, (e, t) => {
    ((t.pattern ??= $n), V.init(e, t));
  }),
  Kr = L(`$ZodCIDRv6`, (e, t) => {
    ((t.pattern ??= er),
      V.init(e, t),
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
function qr(e) {
  if (e === ``) return !0;
  if (/\s/.test(e) || e.length % 4 != 0) return !1;
  try {
    return (atob(e), !0);
  } catch {
    return !1;
  }
}
var Jr = L(`$ZodBase64`, (e, t) => {
  ((t.pattern ??= tr),
    V.init(e, t),
    (e._zod.bag.contentEncoding = `base64`),
    (e._zod.check = (n) => {
      qr(n.value) ||
        n.issues.push({
          code: `invalid_format`,
          format: `base64`,
          input: n.value,
          inst: e,
          continue: !t.abort,
        });
    }));
});
function Yr(e) {
  if (!nr.test(e)) return !1;
  let t = e.replace(/[-_]/g, (e) => (e === `-` ? `+` : `/`));
  return qr(t.padEnd(Math.ceil(t.length / 4) * 4, `=`));
}
var Xr = L(`$ZodBase64URL`, (e, t) => {
    ((t.pattern ??= nr),
      V.init(e, t),
      (e._zod.bag.contentEncoding = `base64url`),
      (e._zod.check = (n) => {
        Yr(n.value) ||
          n.issues.push({
            code: `invalid_format`,
            format: `base64url`,
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  }),
  Zr = L(`$ZodE164`, (e, t) => {
    ((t.pattern ??= ir), V.init(e, t));
  });
function Qr(e, t = null) {
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
var $r = L(`$ZodJWT`, (e, t) => {
    (V.init(e, t),
      (e._zod.check = (n) => {
        Qr(n.value, t.alg) ||
          n.issues.push({
            code: `invalid_format`,
            format: `jwt`,
            input: n.value,
            inst: e,
            continue: !t.abort,
          });
      }));
  }),
  ei = L(`$ZodUnknown`, (e, t) => {
    (B.init(e, t), (e._zod.parse = (e) => e));
  }),
  ti = L(`$ZodNever`, (e, t) => {
    (B.init(e, t),
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
function ni(e, t, n) {
  (e.issues.length && t.issues.push(...pn(n, e.issues)),
    (t.value[n] = e.value));
}
var ri = L(`$ZodArray`, (e, t) => {
  (B.init(e, t),
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
        s instanceof Promise ? a.push(s.then((t) => ni(t, n, e))) : ni(s, n, e);
      }
      return a.length ? Promise.all(a).then(() => n) : n;
    }));
});
function ii(e, t, n, r, i, a) {
  let o = n in r;
  if (e.issues.length) {
    if (i && a && !o) return;
    t.issues.push(...pn(n, e.issues));
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
function ai(e) {
  let t = Object.keys(e.shape);
  for (let n of t)
    if (!e.shape?.[n]?._zod?.traits?.has(`$ZodType`))
      throw Error(`Invalid element at key "${n}": expected a Zod schema`);
  let n = nn(e.shape);
  return {
    ...e,
    keys: t,
    keySet: new Set(t),
    numKeys: t.length,
    optionalKeys: new Set(n),
  };
}
function oi(e, t, n, r, i, a) {
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
      ? e.push(a.then((e) => ii(e, n, i, t, u, d)))
      : ii(a, n, i, t, u, d);
  }
  return (
    o.length &&
      n.issues.push({ code: `unrecognized_keys`, keys: o, input: t, inst: a }),
    e.length ? Promise.all(e).then(() => n) : n
  );
}
var si = L(`$ZodObject`, (e, t) => {
    if ((B.init(e, t), !Object.getOwnPropertyDescriptor(t, `shape`)?.get)) {
      let e = t.shape;
      Object.defineProperty(t, `shape`, {
        get: () => {
          let n = { ...e };
          return (Object.defineProperty(t, `shape`, { value: n }), n);
        },
      });
    }
    let n = Bt(() => ai(t));
    R(e._zod, `propValues`, () => {
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
    let r = Yt,
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
          ? c.push(a.then((n) => ii(n, t, e, s, r, i)))
          : ii(a, t, e, s, r, i);
      }
      return i
        ? oi(c, s, t, o, n.value, e)
        : c.length
          ? Promise.all(c).then(() => t)
          : t;
    };
  }),
  ci = L(`$ZodObjectJIT`, (e, t) => {
    si.init(e, t);
    let n = e._zod.parse,
      r = Bt(() => ai(t)),
      i = (e) => {
        let t = new Tr([`shape`, `payload`, `ctx`]),
          n = r.value,
          i = (e) => {
            let t = Kt(e);
            return `shape[${t}]._zod.run({ value: input[${t}], issues: [] }, ctx)`;
          };
        t.write(`const input = payload.value;`);
        let a = Object.create(null),
          o = 0;
        for (let e of n.keys) a[e] = `key_${o++}`;
        t.write(`const newResult = {};`);
        for (let r of n.keys) {
          let n = a[r],
            o = Kt(r),
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
      o = Yt,
      s = !It.jitless,
      c = s && Xt.value,
      l = t.catchall,
      u;
    e._zod.parse = (d, f) => {
      u ??= r.value;
      let p = d.value;
      return o(p)
        ? s && c && f?.async === !1 && f.jitless !== !0
          ? ((a ||= i(t.shape)), (d = a(d, f)), l ? oi([], p, d, f, u, e) : d)
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
function li(e, t, n, r) {
  for (let n of e) if (n.issues.length === 0) return ((t.value = n.value), t);
  let i = e.filter((e) => !dn(e));
  return i.length === 1
    ? ((t.value = i[0].value), i[0])
    : (t.issues.push({
        code: `invalid_union`,
        input: t.value,
        inst: n,
        errors: e.map((e) => e.issues.map((e) => hn(e, r, Lt()))),
      }),
      t);
}
var ui = L(`$ZodUnion`, (e, t) => {
    (B.init(e, t),
      R(e._zod, `optin`, () =>
        t.options.some((e) => e._zod.optin === `optional`)
          ? `optional`
          : void 0,
      ),
      R(e._zod, `optout`, () =>
        t.options.some((e) => e._zod.optout === `optional`)
          ? `optional`
          : void 0,
      ),
      R(e._zod, `values`, () => {
        if (t.options.every((e) => e._zod.values))
          return new Set(t.options.flatMap((e) => Array.from(e._zod.values)));
      }),
      R(e._zod, `pattern`, () => {
        if (t.options.every((e) => e._zod.pattern)) {
          let e = t.options.map((e) => e._zod.pattern);
          return RegExp(`^(${e.map((e) => Ht(e.source)).join(`|`)})$`);
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
      return a ? Promise.all(o).then((t) => li(t, r, e, i)) : li(o, r, e, i);
    };
  }),
  di = L(`$ZodIntersection`, (e, t) => {
    (B.init(e, t),
      (e._zod.parse = (e, n) => {
        let r = e.value,
          i = t.left._zod.run({ value: r, issues: [] }, n),
          a = t.right._zod.run({ value: r, issues: [] }, n);
        return i instanceof Promise || a instanceof Promise
          ? Promise.all([i, a]).then(([t, n]) => pi(e, t, n))
          : pi(e, i, a);
      }));
  });
function fi(e, t) {
  if (e === t || (e instanceof Date && t instanceof Date && +e == +t))
    return { valid: !0, data: e };
  if (Zt(e) && Zt(t)) {
    let n = Object.keys(t),
      r = Object.keys(e).filter((e) => n.indexOf(e) !== -1),
      i = { ...e, ...t };
    for (let n of r) {
      let r = fi(e[n], t[n]);
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
        o = fi(i, a);
      if (!o.valid)
        return { valid: !1, mergeErrorPath: [r, ...o.mergeErrorPath] };
      n.push(o.data);
    }
    return { valid: !0, data: n };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function pi(e, t, n) {
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
  if ((a.length && i && e.issues.push({ ...i, keys: a }), dn(e))) return e;
  let o = fi(t.value, n.value);
  if (!o.valid)
    throw Error(
      `Unmergable intersection. Error path: ${JSON.stringify(o.mergeErrorPath)}`,
    );
  return ((e.value = o.data), e);
}
var mi = L(`$ZodEnum`, (e, t) => {
    B.init(e, t);
    let n = Rt(t.entries),
      r = new Set(n);
    ((e._zod.values = r),
      (e._zod.pattern = RegExp(
        `^(${n
          .filter((e) => $t.has(typeof e))
          .map((e) => (typeof e == `string` ? en(e) : e.toString()))
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
  hi = L(`$ZodTransform`, (e, t) => {
    (B.init(e, t),
      (e._zod.optin = `optional`),
      (e._zod.parse = (n, r) => {
        if (r.direction === `backward`) throw new Ft(e.constructor.name);
        let i = t.transform(n.value, n);
        if (r.async)
          return (i instanceof Promise ? i : Promise.resolve(i)).then(
            (e) => ((n.value = e), (n.fallback = !0), n),
          );
        if (i instanceof Promise) throw new Pt();
        return ((n.value = i), (n.fallback = !0), n);
      }));
  });
function gi(e, t) {
  return t === void 0 && (e.issues.length || e.fallback)
    ? { issues: [], value: void 0 }
    : e;
}
var _i = L(`$ZodOptional`, (e, t) => {
    (B.init(e, t),
      (e._zod.optin = `optional`),
      (e._zod.optout = `optional`),
      R(e._zod, `values`, () =>
        t.innerType._zod.values
          ? new Set([...t.innerType._zod.values, void 0])
          : void 0,
      ),
      R(e._zod, `pattern`, () => {
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${Ht(e.source)})?$`) : void 0;
      }),
      (e._zod.parse = (e, n) => {
        if (t.innerType._zod.optin === `optional`) {
          let r = e.value,
            i = t.innerType._zod.run(e, n);
          return i instanceof Promise ? i.then((e) => gi(e, r)) : gi(i, r);
        }
        return e.value === void 0 ? e : t.innerType._zod.run(e, n);
      }));
  }),
  vi = L(`$ZodExactOptional`, (e, t) => {
    (_i.init(e, t),
      R(e._zod, `values`, () => t.innerType._zod.values),
      R(e._zod, `pattern`, () => t.innerType._zod.pattern),
      (e._zod.parse = (e, n) => t.innerType._zod.run(e, n)));
  }),
  yi = L(`$ZodNullable`, (e, t) => {
    (B.init(e, t),
      R(e._zod, `optin`, () => t.innerType._zod.optin),
      R(e._zod, `optout`, () => t.innerType._zod.optout),
      R(e._zod, `pattern`, () => {
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${Ht(e.source)}|null)$`) : void 0;
      }),
      R(e._zod, `values`, () =>
        t.innerType._zod.values
          ? new Set([...t.innerType._zod.values, null])
          : void 0,
      ),
      (e._zod.parse = (e, n) =>
        e.value === null ? e : t.innerType._zod.run(e, n)));
  }),
  bi = L(`$ZodDefault`, (e, t) => {
    (B.init(e, t),
      (e._zod.optin = `optional`),
      R(e._zod, `values`, () => t.innerType._zod.values),
      (e._zod.parse = (e, n) => {
        if (n.direction === `backward`) return t.innerType._zod.run(e, n);
        if (e.value === void 0) return ((e.value = t.defaultValue), e);
        let r = t.innerType._zod.run(e, n);
        return r instanceof Promise ? r.then((e) => xi(e, t)) : xi(r, t);
      }));
  });
function xi(e, t) {
  return (e.value === void 0 && (e.value = t.defaultValue), e);
}
var Si = L(`$ZodPrefault`, (e, t) => {
    (B.init(e, t),
      (e._zod.optin = `optional`),
      R(e._zod, `values`, () => t.innerType._zod.values),
      (e._zod.parse = (e, n) => (
        n.direction === `backward` ||
          (e.value === void 0 && (e.value = t.defaultValue)),
        t.innerType._zod.run(e, n)
      )));
  }),
  Ci = L(`$ZodNonOptional`, (e, t) => {
    (B.init(e, t),
      R(e._zod, `values`, () => {
        let e = t.innerType._zod.values;
        return e ? new Set([...e].filter((e) => e !== void 0)) : void 0;
      }),
      (e._zod.parse = (n, r) => {
        let i = t.innerType._zod.run(n, r);
        return i instanceof Promise ? i.then((t) => wi(t, e)) : wi(i, e);
      }));
  });
function wi(e, t) {
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
var Ti = L(`$ZodCatch`, (e, t) => {
    (B.init(e, t),
      (e._zod.optin = `optional`),
      R(e._zod, `optout`, () => t.innerType._zod.optout),
      R(e._zod, `values`, () => t.innerType._zod.values),
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
                    error: { issues: r.issues.map((e) => hn(e, n, Lt())) },
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
                error: { issues: r.issues.map((e) => hn(e, n, Lt())) },
                input: e.value,
              })),
              (e.issues = []),
              (e.fallback = !0)),
            e);
      }));
  }),
  Ei = L(`$ZodPipe`, (e, t) => {
    (B.init(e, t),
      R(e._zod, `values`, () => t.in._zod.values),
      R(e._zod, `optin`, () => t.in._zod.optin),
      R(e._zod, `optout`, () => t.out._zod.optout),
      R(e._zod, `propValues`, () => t.in._zod.propValues),
      (e._zod.parse = (e, n) => {
        if (n.direction === `backward`) {
          let r = t.out._zod.run(e, n);
          return r instanceof Promise
            ? r.then((e) => Di(e, t.in, n))
            : Di(r, t.in, n);
        }
        let r = t.in._zod.run(e, n);
        return r instanceof Promise
          ? r.then((e) => Di(e, t.out, n))
          : Di(r, t.out, n);
      }));
  });
function Di(e, t, n) {
  return e.issues.length
    ? ((e.aborted = !0), e)
    : t._zod.run({ value: e.value, issues: e.issues, fallback: e.fallback }, n);
}
var Oi = L(`$ZodReadonly`, (e, t) => {
  (B.init(e, t),
    R(e._zod, `propValues`, () => t.innerType._zod.propValues),
    R(e._zod, `values`, () => t.innerType._zod.values),
    R(e._zod, `optin`, () => t.innerType?._zod?.optin),
    R(e._zod, `optout`, () => t.innerType?._zod?.optout),
    (e._zod.parse = (e, n) => {
      if (n.direction === `backward`) return t.innerType._zod.run(e, n);
      let r = t.innerType._zod.run(e, n);
      return r instanceof Promise ? r.then(ki) : ki(r);
    }));
});
function ki(e) {
  return ((e.value = Object.freeze(e.value)), e);
}
var Ai = L(`$ZodCustom`, (e, t) => {
  (pr.init(e, t),
    B.init(e, t),
    (e._zod.parse = (e, t) => e),
    (e._zod.check = (n) => {
      let r = n.value,
        i = t.fn(r);
      if (i instanceof Promise) return i.then((t) => ji(t, n, r, e));
      ji(i, n, r, e);
    }));
});
function ji(e, t, n, r) {
  if (!e) {
    let e = {
      code: `custom`,
      input: n,
      inst: r,
      path: [...(r._zod.def.path ?? [])],
      continue: !r._zod.def.abort,
    };
    (r._zod.def.params && (e.params = r._zod.def.params), t.issues.push(_n(e)));
  }
}
var Mi,
  Ni = class {
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
function Pi() {
  return new Ni();
}
(Mi = globalThis).__zod_globalRegistry ?? (Mi.__zod_globalRegistry = Pi());
var Fi = globalThis.__zod_globalRegistry;
function Ii(e, t) {
  return new e({ type: `string`, ...z(t) });
}
function Li(e, t) {
  return new e({
    type: `string`,
    format: `email`,
    check: `string_format`,
    abort: !1,
    ...z(t),
  });
}
function Ri(e, t) {
  return new e({
    type: `string`,
    format: `guid`,
    check: `string_format`,
    abort: !1,
    ...z(t),
  });
}
function zi(e, t) {
  return new e({
    type: `string`,
    format: `uuid`,
    check: `string_format`,
    abort: !1,
    ...z(t),
  });
}
function Bi(e, t) {
  return new e({
    type: `string`,
    format: `uuid`,
    check: `string_format`,
    abort: !1,
    version: `v4`,
    ...z(t),
  });
}
function Vi(e, t) {
  return new e({
    type: `string`,
    format: `uuid`,
    check: `string_format`,
    abort: !1,
    version: `v6`,
    ...z(t),
  });
}
function Hi(e, t) {
  return new e({
    type: `string`,
    format: `uuid`,
    check: `string_format`,
    abort: !1,
    version: `v7`,
    ...z(t),
  });
}
function Ui(e, t) {
  return new e({
    type: `string`,
    format: `url`,
    check: `string_format`,
    abort: !1,
    ...z(t),
  });
}
function Wi(e, t) {
  return new e({
    type: `string`,
    format: `emoji`,
    check: `string_format`,
    abort: !1,
    ...z(t),
  });
}
function Gi(e, t) {
  return new e({
    type: `string`,
    format: `nanoid`,
    check: `string_format`,
    abort: !1,
    ...z(t),
  });
}
function Ki(e, t) {
  return new e({
    type: `string`,
    format: `cuid`,
    check: `string_format`,
    abort: !1,
    ...z(t),
  });
}
function qi(e, t) {
  return new e({
    type: `string`,
    format: `cuid2`,
    check: `string_format`,
    abort: !1,
    ...z(t),
  });
}
function Ji(e, t) {
  return new e({
    type: `string`,
    format: `ulid`,
    check: `string_format`,
    abort: !1,
    ...z(t),
  });
}
function Yi(e, t) {
  return new e({
    type: `string`,
    format: `xid`,
    check: `string_format`,
    abort: !1,
    ...z(t),
  });
}
function Xi(e, t) {
  return new e({
    type: `string`,
    format: `ksuid`,
    check: `string_format`,
    abort: !1,
    ...z(t),
  });
}
function Zi(e, t) {
  return new e({
    type: `string`,
    format: `ipv4`,
    check: `string_format`,
    abort: !1,
    ...z(t),
  });
}
function Qi(e, t) {
  return new e({
    type: `string`,
    format: `ipv6`,
    check: `string_format`,
    abort: !1,
    ...z(t),
  });
}
function $i(e, t) {
  return new e({
    type: `string`,
    format: `cidrv4`,
    check: `string_format`,
    abort: !1,
    ...z(t),
  });
}
function ea(e, t) {
  return new e({
    type: `string`,
    format: `cidrv6`,
    check: `string_format`,
    abort: !1,
    ...z(t),
  });
}
function ta(e, t) {
  return new e({
    type: `string`,
    format: `base64`,
    check: `string_format`,
    abort: !1,
    ...z(t),
  });
}
function na(e, t) {
  return new e({
    type: `string`,
    format: `base64url`,
    check: `string_format`,
    abort: !1,
    ...z(t),
  });
}
function ra(e, t) {
  return new e({
    type: `string`,
    format: `e164`,
    check: `string_format`,
    abort: !1,
    ...z(t),
  });
}
function ia(e, t) {
  return new e({
    type: `string`,
    format: `jwt`,
    check: `string_format`,
    abort: !1,
    ...z(t),
  });
}
function aa(e, t) {
  return new e({
    type: `string`,
    format: `datetime`,
    check: `string_format`,
    offset: !1,
    local: !1,
    precision: null,
    ...z(t),
  });
}
function oa(e, t) {
  return new e({
    type: `string`,
    format: `date`,
    check: `string_format`,
    ...z(t),
  });
}
function sa(e, t) {
  return new e({
    type: `string`,
    format: `time`,
    check: `string_format`,
    precision: null,
    ...z(t),
  });
}
function ca(e, t) {
  return new e({
    type: `string`,
    format: `duration`,
    check: `string_format`,
    ...z(t),
  });
}
function la(e) {
  return new e({ type: `unknown` });
}
function ua(e, t) {
  return new e({ type: `never`, ...z(t) });
}
function da(e, t) {
  return new mr({ check: `max_length`, ...z(t), maximum: e });
}
function fa(e, t) {
  return new hr({ check: `min_length`, ...z(t), minimum: e });
}
function pa(e, t) {
  return new gr({ check: `length_equals`, ...z(t), length: e });
}
function ma(e, t) {
  return new vr({
    check: `string_format`,
    format: `regex`,
    ...z(t),
    pattern: e,
  });
}
function ha(e) {
  return new yr({ check: `string_format`, format: `lowercase`, ...z(e) });
}
function ga(e) {
  return new br({ check: `string_format`, format: `uppercase`, ...z(e) });
}
function _a(e, t) {
  return new xr({
    check: `string_format`,
    format: `includes`,
    ...z(t),
    includes: e,
  });
}
function va(e, t) {
  return new Sr({
    check: `string_format`,
    format: `starts_with`,
    ...z(t),
    prefix: e,
  });
}
function ya(e, t) {
  return new Cr({
    check: `string_format`,
    format: `ends_with`,
    ...z(t),
    suffix: e,
  });
}
function ba(e) {
  return new wr({ check: `overwrite`, tx: e });
}
function xa(e) {
  return ba((t) => t.normalize(e));
}
function Sa() {
  return ba((e) => e.trim());
}
function Ca() {
  return ba((e) => e.toLowerCase());
}
function wa() {
  return ba((e) => e.toUpperCase());
}
function Ta() {
  return ba((e) => qt(e));
}
function Ea(e, t, n) {
  return new e({ type: `array`, element: t, ...z(n) });
}
function Da(e, t, n) {
  return new e({ type: `custom`, check: `custom`, fn: t, ...z(n) });
}
function Oa(e, t) {
  let n = ka(
    (t) => (
      (t.addIssue = (e) => {
        if (typeof e == `string`) t.issues.push(_n(e, t.value, n._zod.def));
        else {
          let r = e;
          (r.fatal && (r.continue = !1),
            (r.code ??= `custom`),
            (r.input ??= t.value),
            (r.inst ??= n),
            (r.continue ??= !n._zod.def.abort),
            t.issues.push(_n(r)));
        }
      }),
      e(t.value, t)
    ),
    t,
  );
  return n;
}
function ka(e, t) {
  let n = new pr({ check: `custom`, ...z(t) });
  return ((n._zod.check = e), n);
}
function Aa(e) {
  let t = e?.target ?? `draft-2020-12`;
  return (
    t === `draft-4` && (t = `draft-04`),
    t === `draft-7` && (t = `draft-07`),
    {
      processors: e.processors ?? {},
      metadataRegistry: e?.metadata ?? Fi,
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
function H(e, t, n = { path: [], schemaPath: [] }) {
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
    a && ((o.ref ||= a), H(a, t, r), (t.seen.get(a).isParent = !0));
  }
  let c = t.metadataRegistry.get(e);
  return (
    c && Object.assign(o.schema, c),
    t.io === `input` &&
      U(e) &&
      (delete o.schema.examples, delete o.schema.default),
    t.io === `input` &&
      `_prefault` in o.schema &&
      ((r = o.schema).default ?? (r.default = o.schema._prefault)),
    delete o.schema._prefault,
    t.seen.get(e).schema
  );
}
function ja(e, t) {
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
function Ma(e, t) {
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
            input: Pa(t, `input`, e.processors),
            output: Pa(t, `output`, e.processors),
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
function U(e, t) {
  let n = t ?? { seen: new Set() };
  if (n.seen.has(e)) return !1;
  n.seen.add(e);
  let r = e._zod.def;
  if (r.type === `transform`) return !0;
  if (r.type === `array`) return U(r.element, n);
  if (r.type === `set`) return U(r.valueType, n);
  if (r.type === `lazy`) return U(r.getter(), n);
  if (
    r.type === `promise` ||
    r.type === `optional` ||
    r.type === `nonoptional` ||
    r.type === `nullable` ||
    r.type === `readonly` ||
    r.type === `default` ||
    r.type === `prefault`
  )
    return U(r.innerType, n);
  if (r.type === `intersection`) return U(r.left, n) || U(r.right, n);
  if (r.type === `record` || r.type === `map`)
    return U(r.keyType, n) || U(r.valueType, n);
  if (r.type === `pipe`)
    return e._zod.traits.has(`$ZodCodec`) ? !0 : U(r.in, n) || U(r.out, n);
  if (r.type === `object`) {
    for (let e in r.shape) if (U(r.shape[e], n)) return !0;
    return !1;
  }
  if (r.type === `union`) {
    for (let e of r.options) if (U(e, n)) return !0;
    return !1;
  }
  if (r.type === `tuple`) {
    for (let e of r.items) if (U(e, n)) return !0;
    return !!(r.rest && U(r.rest, n));
  }
  return !1;
}
var Na =
    (e, t = {}) =>
    (n) => {
      let r = Aa({ ...n, processors: t });
      return (H(e, r), ja(r, e), Ma(r, e));
    },
  Pa =
    (e, t, n = {}) =>
    (r) => {
      let { libraryOptions: i, target: a } = r ?? {},
        o = Aa({ ...(i ?? {}), target: a, io: t, processors: n });
      return (H(e, o), ja(o, e), Ma(o, e));
    },
  Fa = {
    guid: `uuid`,
    url: `uri`,
    datetime: `date-time`,
    json_string: `json-string`,
    regex: ``,
  },
  Ia = (e, t, n, r) => {
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
        ((i.format = Fa[s] ?? s),
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
  La = (e, t, n, r) => {
    n.not = {};
  },
  Ra = (e, t, n, r) => {
    let i = e._zod.def,
      a = Rt(i.entries);
    (a.every((e) => typeof e == `number`) && (n.type = `number`),
      a.every((e) => typeof e == `string`) && (n.type = `string`),
      (n.enum = a));
  },
  za = (e, t, n, r) => {
    if (t.unrepresentable === `throw`)
      throw Error(`Custom types cannot be represented in JSON Schema`);
  },
  Ba = (e, t, n, r) => {
    if (t.unrepresentable === `throw`)
      throw Error(`Transforms cannot be represented in JSON Schema`);
  },
  Va = (e, t, n, r) => {
    let i = n,
      a = e._zod.def,
      { minimum: o, maximum: s } = e._zod.bag;
    (typeof o == `number` && (i.minItems = o),
      typeof s == `number` && (i.maxItems = s),
      (i.type = `array`),
      (i.items = H(a.element, t, { ...r, path: [...r.path, `items`] })));
  },
  Ha = (e, t, n, r) => {
    let i = n,
      a = e._zod.def;
    ((i.type = `object`), (i.properties = {}));
    let o = a.shape;
    for (let e in o)
      i.properties[e] = H(o[e], t, {
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
            (i.additionalProperties = H(a.catchall, t, {
              ...r,
              path: [...r.path, `additionalProperties`],
            }))
          : t.io === `output` && (i.additionalProperties = !1));
  },
  Ua = (e, t, n, r) => {
    let i = e._zod.def,
      a = i.inclusive === !1,
      o = i.options.map((e, n) =>
        H(e, t, { ...r, path: [...r.path, a ? `oneOf` : `anyOf`, n] }),
      );
    a ? (n.oneOf = o) : (n.anyOf = o);
  },
  Wa = (e, t, n, r) => {
    let i = e._zod.def,
      a = H(i.left, t, { ...r, path: [...r.path, `allOf`, 0] }),
      o = H(i.right, t, { ...r, path: [...r.path, `allOf`, 1] }),
      s = (e) => `allOf` in e && Object.keys(e).length === 1;
    n.allOf = [...(s(a) ? a.allOf : [a]), ...(s(o) ? o.allOf : [o])];
  },
  Ga = (e, t, n, r) => {
    let i = e._zod.def,
      a = H(i.innerType, t, r),
      o = t.seen.get(e);
    t.target === `openapi-3.0`
      ? ((o.ref = i.innerType), (n.nullable = !0))
      : (n.anyOf = [a, { type: `null` }]);
  },
  Ka = (e, t, n, r) => {
    let i = e._zod.def;
    H(i.innerType, t, r);
    let a = t.seen.get(e);
    a.ref = i.innerType;
  },
  qa = (e, t, n, r) => {
    let i = e._zod.def;
    H(i.innerType, t, r);
    let a = t.seen.get(e);
    ((a.ref = i.innerType),
      (n.default = JSON.parse(JSON.stringify(i.defaultValue))));
  },
  Ja = (e, t, n, r) => {
    let i = e._zod.def;
    H(i.innerType, t, r);
    let a = t.seen.get(e);
    ((a.ref = i.innerType),
      t.io === `input` &&
        (n._prefault = JSON.parse(JSON.stringify(i.defaultValue))));
  },
  Ya = (e, t, n, r) => {
    let i = e._zod.def;
    H(i.innerType, t, r);
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
  Xa = (e, t, n, r) => {
    let i = e._zod.def,
      a = i.in._zod.traits.has(`$ZodTransform`),
      o = t.io === `input` ? (a ? i.out : i.in) : i.out;
    H(o, t, r);
    let s = t.seen.get(e);
    s.ref = o;
  },
  Za = (e, t, n, r) => {
    let i = e._zod.def;
    H(i.innerType, t, r);
    let a = t.seen.get(e);
    ((a.ref = i.innerType), (n.readOnly = !0));
  },
  Qa = (e, t, n, r) => {
    let i = e._zod.def;
    H(i.innerType, t, r);
    let a = t.seen.get(e);
    a.ref = i.innerType;
  };
function $a(e, t) {
  try {
    var n = e();
  } catch (e) {
    return t(e);
  }
  return n && n.then ? n.then(void 0, t) : n;
}
function eo(e, t) {
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
      n[o] = Ce(o, t, n, i, l ? [].concat(l, r.message) : r.message);
    }
    e.shift();
  }
  return n;
}
function to(e, t) {
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
      n[o] = Ce(o, t, n, i, l ? [].concat(l, r.message) : r.message);
    }
    e.shift();
  }
  return n;
}
function no(e, t, n) {
  if (
    (n === void 0 && (n = {}),
    (function (e) {
      return `_def` in e && typeof e._def == `object` && `typeName` in e._def;
    })(e))
  )
    return function (r, i, a) {
      try {
        return Promise.resolve(
          $a(
            function () {
              return Promise.resolve(
                e[n.mode === `sync` ? `parse` : `parseAsync`](r, t),
              ).then(function (e) {
                return (
                  a.shouldUseNativeValidation && kt({}, a),
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
                  errors: At(
                    eo(
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
          $a(
            function () {
              return Promise.resolve(
                (n.mode === `sync` ? wn : En)(e, r, t),
              ).then(function (e) {
                return (
                  a.shouldUseNativeValidation && kt({}, a),
                  { errors: {}, values: n.raw ? Object.assign({}, r) : e }
                );
              });
            },
            function (e) {
              if (
                (function (e) {
                  return e instanceof yn;
                })(e)
              )
                return {
                  values: {},
                  errors: At(
                    to(
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
function ro(e) {
  return io(e)
    ? e.errors && e.errors.length > 0
      ? e.errors[0]
      : e.message
    : e instanceof Error
      ? e.message
      : `An unexpected error occurred. Please try again.`;
}
function io(e) {
  return typeof e == `object` && !!e && `statusCode` in e && `message` in e;
}
function ao(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
var { toString: oo } = Object.prototype,
  { getPrototypeOf: so } = Object,
  { iterator: co, toStringTag: lo } = Symbol,
  uo = ((e) => (t) => {
    let n = oo.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  fo = (e) => ((e = e.toLowerCase()), (t) => uo(t) === e),
  po = (e) => (t) => typeof t === e,
  { isArray: mo } = Array,
  ho = po(`undefined`);
function go(e) {
  return (
    e !== null &&
    !ho(e) &&
    e.constructor !== null &&
    !ho(e.constructor) &&
    W(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
var _o = fo(`ArrayBuffer`);
function vo(e) {
  let t;
  return (
    (t =
      typeof ArrayBuffer < `u` && ArrayBuffer.isView
        ? ArrayBuffer.isView(e)
        : e && e.buffer && _o(e.buffer)),
    t
  );
}
var yo = po(`string`),
  W = po(`function`),
  bo = po(`number`),
  xo = (e) => typeof e == `object` && !!e,
  So = (e) => e === !0 || e === !1,
  Co = (e) => {
    if (uo(e) !== `object`) return !1;
    let t = so(e);
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(lo in e) &&
      !(co in e)
    );
  },
  wo = (e) => {
    if (!xo(e) || go(e)) return !1;
    try {
      return (
        Object.keys(e).length === 0 &&
        Object.getPrototypeOf(e) === Object.prototype
      );
    } catch {
      return !1;
    }
  },
  To = fo(`Date`),
  Eo = fo(`File`),
  Do = (e) => !!(e && e.uri !== void 0),
  Oo = (e) => e && e.getParts !== void 0,
  ko = fo(`Blob`),
  Ao = fo(`FileList`),
  jo = (e) => xo(e) && W(e.pipe);
function Mo() {
  return typeof globalThis < `u`
    ? globalThis
    : typeof self < `u`
      ? self
      : typeof window < `u`
        ? window
        : typeof global < `u`
          ? global
          : {};
}
var No = Mo(),
  Po = No.FormData === void 0 ? void 0 : No.FormData,
  Fo = (e) => {
    if (!e) return !1;
    if (Po && e instanceof Po) return !0;
    let t = so(e);
    if (!t || t === Object.prototype || !W(e.append)) return !1;
    let n = uo(e);
    return (
      n === `formdata` ||
      (n === `object` && W(e.toString) && e.toString() === `[object FormData]`)
    );
  },
  Io = fo(`URLSearchParams`),
  [Lo, Ro, zo, Bo] = [`ReadableStream`, `Request`, `Response`, `Headers`].map(
    fo,
  ),
  Vo = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ``);
function Ho(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e == null) return;
  let r, i;
  if ((typeof e != `object` && (e = [e]), mo(e)))
    for (r = 0, i = e.length; r < i; r++) t.call(null, e[r], r, e);
  else {
    if (go(e)) return;
    let i = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      a = i.length,
      o;
    for (r = 0; r < a; r++) ((o = i[r]), t.call(null, e[o], o, e));
  }
}
function Uo(e, t) {
  if (go(e)) return null;
  t = t.toLowerCase();
  let n = Object.keys(e),
    r = n.length,
    i;
  for (; r-- > 0; ) if (((i = n[r]), t === i.toLowerCase())) return i;
  return null;
}
var Wo =
    typeof globalThis < `u`
      ? globalThis
      : typeof self < `u`
        ? self
        : typeof window < `u`
          ? window
          : global,
  Go = (e) => !ho(e) && e !== Wo;
function Ko(...e) {
  let { caseless: t, skipUndefined: n } = (Go(this) && this) || {},
    r = {},
    i = (e, i) => {
      if (i === `__proto__` || i === `constructor` || i === `prototype`) return;
      let a = (t && Uo(r, i)) || i,
        o = is(r, a) ? r[a] : void 0;
      Co(o) && Co(e)
        ? (r[a] = Ko(o, e))
        : Co(e)
          ? (r[a] = Ko({}, e))
          : mo(e)
            ? (r[a] = e.slice())
            : (!n || !ho(e)) && (r[a] = e);
    };
  for (let t = 0, n = e.length; t < n; t++) e[t] && Ho(e[t], i);
  return r;
}
var qo = (e, t, n, { allOwnKeys: r } = {}) => (
    Ho(
      t,
      (t, r) => {
        n && W(t)
          ? Object.defineProperty(e, r, {
              __proto__: null,
              value: ao(t, n),
              writable: !0,
              enumerable: !0,
              configurable: !0,
            })
          : Object.defineProperty(e, r, {
              __proto__: null,
              value: t,
              writable: !0,
              enumerable: !0,
              configurable: !0,
            });
      },
      { allOwnKeys: r },
    ),
    e
  ),
  Jo = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  Yo = (e, t, n, r) => {
    ((e.prototype = Object.create(t.prototype, r)),
      Object.defineProperty(e.prototype, `constructor`, {
        __proto__: null,
        value: e,
        writable: !0,
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e, `super`, {
        __proto__: null,
        value: t.prototype,
      }),
      n && Object.assign(e.prototype, n));
  },
  Xo = (e, t, n, r) => {
    let i,
      a,
      o,
      s = {};
    if (((t ||= {}), e == null)) return t;
    do {
      for (i = Object.getOwnPropertyNames(e), a = i.length; a-- > 0; )
        ((o = i[a]),
          (!r || r(o, e, t)) && !s[o] && ((t[o] = e[o]), (s[o] = !0)));
      e = n !== !1 && so(e);
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t;
  },
  Zo = (e, t, n) => {
    ((e = String(e)),
      (n === void 0 || n > e.length) && (n = e.length),
      (n -= t.length));
    let r = e.indexOf(t, n);
    return r !== -1 && r === n;
  },
  Qo = (e) => {
    if (!e) return null;
    if (mo(e)) return e;
    let t = e.length;
    if (!bo(t)) return null;
    let n = Array(t);
    for (; t-- > 0; ) n[t] = e[t];
    return n;
  },
  $o = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < `u` && so(Uint8Array)),
  es = (e, t) => {
    let n = (e && e[co]).call(e),
      r;
    for (; (r = n.next()) && !r.done; ) {
      let n = r.value;
      t.call(e, n[0], n[1]);
    }
  },
  ts = (e, t) => {
    let n,
      r = [];
    for (; (n = e.exec(t)) !== null; ) r.push(n);
    return r;
  },
  ns = fo(`HTMLFormElement`),
  rs = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (e, t, n) {
      return t.toUpperCase() + n;
    }),
  is = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  as = fo(`RegExp`),
  os = (e, t) => {
    let n = Object.getOwnPropertyDescriptors(e),
      r = {};
    (Ho(n, (n, i) => {
      let a;
      (a = t(n, i, e)) !== !1 && (r[i] = a || n);
    }),
      Object.defineProperties(e, r));
  },
  ss = (e) => {
    os(e, (t, n) => {
      if (W(e) && [`arguments`, `caller`, `callee`].includes(n)) return !1;
      let r = e[n];
      if (W(r)) {
        if (((t.enumerable = !1), `writable` in t)) {
          t.writable = !1;
          return;
        }
        t.set ||= () => {
          throw Error(`Can not rewrite read-only method '` + n + `'`);
        };
      }
    });
  },
  cs = (e, t) => {
    let n = {},
      r = (e) => {
        e.forEach((e) => {
          n[e] = !0;
        });
      };
    return (mo(e) ? r(e) : r(String(e).split(t)), n);
  },
  ls = () => {},
  us = (e, t) => (e != null && Number.isFinite((e = +e)) ? e : t);
function ds(e) {
  return !!(e && W(e.append) && e[lo] === `FormData` && e[co]);
}
var fs = (e) => {
    let t = Array(10),
      n = (e, r) => {
        if (xo(e)) {
          if (t.indexOf(e) >= 0) return;
          if (go(e)) return e;
          if (!(`toJSON` in e)) {
            t[r] = e;
            let i = mo(e) ? [] : {};
            return (
              Ho(e, (e, t) => {
                let a = n(e, r + 1);
                !ho(a) && (i[t] = a);
              }),
              (t[r] = void 0),
              i
            );
          }
        }
        return e;
      };
    return n(e, 0);
  },
  ps = fo(`AsyncFunction`),
  ms = (e) => e && (xo(e) || W(e)) && W(e.then) && W(e.catch),
  hs = ((e, t) =>
    e
      ? setImmediate
      : t
        ? ((e, t) => (
            Wo.addEventListener(
              `message`,
              ({ source: n, data: r }) => {
                n === Wo && r === e && t.length && t.shift()();
              },
              !1,
            ),
            (n) => {
              (t.push(n), Wo.postMessage(e, `*`));
            }
          ))(`axios@${Math.random()}`, [])
        : (e) => setTimeout(e))(
    typeof setImmediate == `function`,
    W(Wo.postMessage),
  ),
  G = {
    isArray: mo,
    isArrayBuffer: _o,
    isBuffer: go,
    isFormData: Fo,
    isArrayBufferView: vo,
    isString: yo,
    isNumber: bo,
    isBoolean: So,
    isObject: xo,
    isPlainObject: Co,
    isEmptyObject: wo,
    isReadableStream: Lo,
    isRequest: Ro,
    isResponse: zo,
    isHeaders: Bo,
    isUndefined: ho,
    isDate: To,
    isFile: Eo,
    isReactNativeBlob: Do,
    isReactNative: Oo,
    isBlob: ko,
    isRegExp: as,
    isFunction: W,
    isStream: jo,
    isURLSearchParams: Io,
    isTypedArray: $o,
    isFileList: Ao,
    forEach: Ho,
    merge: Ko,
    extend: qo,
    trim: Vo,
    stripBOM: Jo,
    inherits: Yo,
    toFlatObject: Xo,
    kindOf: uo,
    kindOfTest: fo,
    endsWith: Zo,
    toArray: Qo,
    forEachEntry: es,
    matchAll: ts,
    isHTMLForm: ns,
    hasOwnProperty: is,
    hasOwnProp: is,
    reduceDescriptors: os,
    freezeMethods: ss,
    toObjectSet: cs,
    toCamelCase: rs,
    noop: ls,
    toFiniteNumber: us,
    findKey: Uo,
    global: Wo,
    isContextDefined: Go,
    isSpecCompliantForm: ds,
    toJSONObject: fs,
    isAsyncFn: ps,
    isThenable: ms,
    setImmediate: hs,
    asap:
      typeof queueMicrotask < `u`
        ? queueMicrotask.bind(Wo)
        : (typeof process < `u` && process.nextTick) || hs,
    isIterable: (e) => e != null && W(e[co]),
  },
  gs = G.toObjectSet([
    `age`,
    `authorization`,
    `content-length`,
    `content-type`,
    `etag`,
    `expires`,
    `from`,
    `host`,
    `if-modified-since`,
    `if-unmodified-since`,
    `last-modified`,
    `location`,
    `max-forwards`,
    `proxy-authorization`,
    `referer`,
    `retry-after`,
    `user-agent`,
  ]),
  _s = (e) => {
    let t = {},
      n,
      r,
      i;
    return (
      e &&
        e
          .split(
            `
`,
          )
          .forEach(function (e) {
            ((i = e.indexOf(`:`)),
              (n = e.substring(0, i).trim().toLowerCase()),
              (r = e.substring(i + 1).trim()),
              !(!n || (t[n] && gs[n])) &&
                (n === `set-cookie`
                  ? t[n]
                    ? t[n].push(r)
                    : (t[n] = [r])
                  : (t[n] = t[n] ? t[n] + `, ` + r : r)));
          }),
      t
    );
  },
  vs = Symbol(`internals`),
  ys = /[^\x09\x20-\x7E\x80-\xFF]/g;
function bs(e) {
  let t = 0,
    n = e.length;
  for (; t < n; ) {
    let n = e.charCodeAt(t);
    if (n !== 9 && n !== 32) break;
    t += 1;
  }
  for (; n > t; ) {
    let t = e.charCodeAt(n - 1);
    if (t !== 9 && t !== 32) break;
    --n;
  }
  return t === 0 && n === e.length ? e : e.slice(t, n);
}
function xs(e) {
  return e && String(e).trim().toLowerCase();
}
function Ss(e) {
  return bs(e.replace(ys, ``));
}
function Cs(e) {
  return e === !1 || e == null ? e : G.isArray(e) ? e.map(Cs) : Ss(String(e));
}
function ws(e) {
  let t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g,
    r;
  for (; (r = n.exec(e)); ) t[r[1]] = r[2];
  return t;
}
var Ts = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Es(e, t, n, r, i) {
  if (G.isFunction(r)) return r.call(this, t, n);
  if ((i && (t = n), G.isString(t))) {
    if (G.isString(r)) return t.indexOf(r) !== -1;
    if (G.isRegExp(r)) return r.test(t);
  }
}
function Ds(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (e, t, n) => t.toUpperCase() + n);
}
function Os(e, t) {
  let n = G.toCamelCase(` ` + t);
  [`get`, `set`, `has`].forEach((r) => {
    Object.defineProperty(e, r + n, {
      __proto__: null,
      value: function (e, n, i) {
        return this[r].call(this, t, e, n, i);
      },
      configurable: !0,
    });
  });
}
var K = class {
  constructor(e) {
    e && this.set(e);
  }
  set(e, t, n) {
    let r = this;
    function i(e, t, n) {
      let i = xs(t);
      if (!i) throw Error(`header name must be a non-empty string`);
      let a = G.findKey(r, i);
      (!a || r[a] === void 0 || n === !0 || (n === void 0 && r[a] !== !1)) &&
        (r[a || t] = Cs(e));
    }
    let a = (e, t) => G.forEach(e, (e, n) => i(e, n, t));
    if (G.isPlainObject(e) || e instanceof this.constructor) a(e, t);
    else if (G.isString(e) && (e = e.trim()) && !Ts(e)) a(_s(e), t);
    else if (G.isObject(e) && G.isIterable(e)) {
      let n = {},
        r,
        i;
      for (let t of e) {
        if (!G.isArray(t))
          throw TypeError(`Object iterator must return a key-value pair`);
        n[(i = t[0])] = (r = n[i])
          ? G.isArray(r)
            ? [...r, t[1]]
            : [r, t[1]]
          : t[1];
      }
      a(n, t);
    } else e != null && i(t, e, n);
    return this;
  }
  get(e, t) {
    if (((e = xs(e)), e)) {
      let n = G.findKey(this, e);
      if (n) {
        let e = this[n];
        if (!t) return e;
        if (t === !0) return ws(e);
        if (G.isFunction(t)) return t.call(this, e, n);
        if (G.isRegExp(t)) return t.exec(e);
        throw TypeError(`parser must be boolean|regexp|function`);
      }
    }
  }
  has(e, t) {
    if (((e = xs(e)), e)) {
      let n = G.findKey(this, e);
      return !!(n && this[n] !== void 0 && (!t || Es(this, this[n], n, t)));
    }
    return !1;
  }
  delete(e, t) {
    let n = this,
      r = !1;
    function i(e) {
      if (((e = xs(e)), e)) {
        let i = G.findKey(n, e);
        i && (!t || Es(n, n[i], i, t)) && (delete n[i], (r = !0));
      }
    }
    return (G.isArray(e) ? e.forEach(i) : i(e), r);
  }
  clear(e) {
    let t = Object.keys(this),
      n = t.length,
      r = !1;
    for (; n--; ) {
      let i = t[n];
      (!e || Es(this, this[i], i, e, !0)) && (delete this[i], (r = !0));
    }
    return r;
  }
  normalize(e) {
    let t = this,
      n = {};
    return (
      G.forEach(this, (r, i) => {
        let a = G.findKey(n, i);
        if (a) {
          ((t[a] = Cs(r)), delete t[i]);
          return;
        }
        let o = e ? Ds(i) : String(i).trim();
        (o !== i && delete t[i], (t[o] = Cs(r)), (n[o] = !0));
      }),
      this
    );
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    let t = Object.create(null);
    return (
      G.forEach(this, (n, r) => {
        n != null && n !== !1 && (t[r] = e && G.isArray(n) ? n.join(`, `) : n);
      }),
      t
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, t]) => e + `: ` + t).join(`
`);
  }
  getSetCookie() {
    return this.get(`set-cookie`) || [];
  }
  get [Symbol.toStringTag]() {
    return `AxiosHeaders`;
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...t) {
    let n = new this(e);
    return (t.forEach((e) => n.set(e)), n);
  }
  static accessor(e) {
    let t = (this[vs] = this[vs] = { accessors: {} }).accessors,
      n = this.prototype;
    function r(e) {
      let r = xs(e);
      t[r] || (Os(n, e), (t[r] = !0));
    }
    return (G.isArray(e) ? e.forEach(r) : r(e), this);
  }
};
(K.accessor([
  `Content-Type`,
  `Content-Length`,
  `Accept`,
  `Accept-Encoding`,
  `User-Agent`,
  `Authorization`,
]),
  G.reduceDescriptors(K.prototype, ({ value: e }, t) => {
    let n = t[0].toUpperCase() + t.slice(1);
    return {
      get: () => e,
      set(e) {
        this[n] = e;
      },
    };
  }),
  G.freezeMethods(K));
var ks = `[REDACTED ****]`;
function As(e) {
  if (G.hasOwnProp(e, `toJSON`)) return !0;
  let t = Object.getPrototypeOf(e);
  for (; t && t !== Object.prototype; ) {
    if (G.hasOwnProp(t, `toJSON`)) return !0;
    t = Object.getPrototypeOf(t);
  }
  return !1;
}
function js(e, t) {
  let n = new Set(t.map((e) => String(e).toLowerCase())),
    r = [],
    i = (e) => {
      if (typeof e != `object` || !e || G.isBuffer(e)) return e;
      if (r.indexOf(e) !== -1) return;
      (e instanceof K && (e = e.toJSON()), r.push(e));
      let t;
      if (G.isArray(e))
        ((t = []),
          e.forEach((e, n) => {
            let r = i(e);
            G.isUndefined(r) || (t[n] = r);
          }));
      else {
        if (!G.isPlainObject(e) && As(e)) return (r.pop(), e);
        t = Object.create(null);
        for (let [r, a] of Object.entries(e)) {
          let e = n.has(r.toLowerCase()) ? ks : i(a);
          G.isUndefined(e) || (t[r] = e);
        }
      }
      return (r.pop(), t);
    };
  return i(e);
}
var q = class e extends Error {
  static from(t, n, r, i, a, o) {
    let s = new e(t.message, n || t.code, r, i, a);
    return (
      (s.cause = t),
      (s.name = t.name),
      t.status != null && s.status == null && (s.status = t.status),
      o && Object.assign(s, o),
      s
    );
  }
  constructor(e, t, n, r, i) {
    (super(e),
      Object.defineProperty(this, `message`, {
        __proto__: null,
        value: e,
        enumerable: !0,
        writable: !0,
        configurable: !0,
      }),
      (this.name = `AxiosError`),
      (this.isAxiosError = !0),
      t && (this.code = t),
      n && (this.config = n),
      r && (this.request = r),
      i && ((this.response = i), (this.status = i.status)));
  }
  toJSON() {
    let e = this.config,
      t = e && G.hasOwnProp(e, `redact`) ? e.redact : void 0,
      n = G.isArray(t) && t.length > 0 ? js(e, t) : G.toJSONObject(e);
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: n,
      code: this.code,
      status: this.status,
    };
  }
};
((q.ERR_BAD_OPTION_VALUE = `ERR_BAD_OPTION_VALUE`),
  (q.ERR_BAD_OPTION = `ERR_BAD_OPTION`),
  (q.ECONNABORTED = `ECONNABORTED`),
  (q.ETIMEDOUT = `ETIMEDOUT`),
  (q.ECONNREFUSED = `ECONNREFUSED`),
  (q.ERR_NETWORK = `ERR_NETWORK`),
  (q.ERR_FR_TOO_MANY_REDIRECTS = `ERR_FR_TOO_MANY_REDIRECTS`),
  (q.ERR_DEPRECATED = `ERR_DEPRECATED`),
  (q.ERR_BAD_RESPONSE = `ERR_BAD_RESPONSE`),
  (q.ERR_BAD_REQUEST = `ERR_BAD_REQUEST`),
  (q.ERR_CANCELED = `ERR_CANCELED`),
  (q.ERR_NOT_SUPPORT = `ERR_NOT_SUPPORT`),
  (q.ERR_INVALID_URL = `ERR_INVALID_URL`),
  (q.ERR_FORM_DATA_DEPTH_EXCEEDED = `ERR_FORM_DATA_DEPTH_EXCEEDED`));
function Ms(e) {
  return G.isPlainObject(e) || G.isArray(e);
}
function Ns(e) {
  return G.endsWith(e, `[]`) ? e.slice(0, -2) : e;
}
function Ps(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (e, t) {
          return ((e = Ns(e)), !n && t ? `[` + e + `]` : e);
        })
        .join(n ? `.` : ``)
    : t;
}
function Fs(e) {
  return G.isArray(e) && !e.some(Ms);
}
var Is = G.toFlatObject(G, {}, null, function (e) {
  return /^is[A-Z]/.test(e);
});
function Ls(e, t, n) {
  if (!G.isObject(e)) throw TypeError(`target must be an object`);
  ((t ||= new FormData()),
    (n = G.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (e, t) {
        return !G.isUndefined(t[e]);
      },
    )));
  let r = n.metaTokens,
    i = n.visitor || d,
    a = n.dots,
    o = n.indexes,
    s = n.Blob || (typeof Blob < `u` && Blob),
    c = n.maxDepth === void 0 ? 100 : n.maxDepth,
    l = s && G.isSpecCompliantForm(t);
  if (!G.isFunction(i)) throw TypeError(`visitor must be a function`);
  function u(e) {
    if (e === null) return ``;
    if (G.isDate(e)) return e.toISOString();
    if (G.isBoolean(e)) return e.toString();
    if (!l && G.isBlob(e))
      throw new q(`Blob is not supported. Use a Buffer instead.`);
    return G.isArrayBuffer(e) || G.isTypedArray(e)
      ? l && typeof Blob == `function`
        ? new Blob([e])
        : Buffer.from(e)
      : e;
  }
  function d(e, n, i) {
    let s = e;
    if (G.isReactNative(t) && G.isReactNativeBlob(e))
      return (t.append(Ps(i, n, a), u(e)), !1);
    if (e && !i && typeof e == `object`) {
      if (G.endsWith(n, `{}`))
        ((n = r ? n : n.slice(0, -2)), (e = JSON.stringify(e)));
      else if (
        (G.isArray(e) && Fs(e)) ||
        ((G.isFileList(e) || G.endsWith(n, `[]`)) && (s = G.toArray(e)))
      )
        return (
          (n = Ns(n)),
          s.forEach(function (e, r) {
            !(G.isUndefined(e) || e === null) &&
              t.append(
                o === !0 ? Ps([n], r, a) : o === null ? n : n + `[]`,
                u(e),
              );
          }),
          !1
        );
    }
    return Ms(e) ? !0 : (t.append(Ps(i, n, a), u(e)), !1);
  }
  let f = [],
    p = Object.assign(Is, {
      defaultVisitor: d,
      convertValue: u,
      isVisitable: Ms,
    });
  function m(e, n, r = 0) {
    if (!G.isUndefined(e)) {
      if (r > c)
        throw new q(
          `Object is too deeply nested (` + r + ` levels). Max depth: ` + c,
          q.ERR_FORM_DATA_DEPTH_EXCEEDED,
        );
      if (f.indexOf(e) !== -1)
        throw Error(`Circular reference detected in ` + n.join(`.`));
      (f.push(e),
        G.forEach(e, function (e, a) {
          (!(G.isUndefined(e) || e === null) &&
            i.call(t, e, G.isString(a) ? a.trim() : a, n, p)) === !0 &&
            m(e, n ? n.concat(a) : [a], r + 1);
        }),
        f.pop());
    }
  }
  if (!G.isObject(e)) throw TypeError(`data must be an object`);
  return (m(e), t);
}
function Rs(e) {
  let t = {
    "!": `%21`,
    "'": `%27`,
    "(": `%28`,
    ")": `%29`,
    "~": `%7E`,
    "%20": `+`,
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20/g, function (e) {
    return t[e];
  });
}
function zs(e, t) {
  ((this._pairs = []), e && Ls(e, this, t));
}
var Bs = zs.prototype;
((Bs.append = function (e, t) {
  this._pairs.push([e, t]);
}),
  (Bs.toString = function (e) {
    let t = e
      ? function (t) {
          return e.call(this, t, Rs);
        }
      : Rs;
    return this._pairs
      .map(function (e) {
        return t(e[0]) + `=` + t(e[1]);
      }, ``)
      .join(`&`);
  }));
function Vs(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, `:`)
    .replace(/%24/g, `$`)
    .replace(/%2C/gi, `,`)
    .replace(/%20/g, `+`);
}
function Hs(e, t, n) {
  if (!t) return e;
  let r = (n && n.encode) || Vs,
    i = G.isFunction(n) ? { serialize: n } : n,
    a = i && i.serialize,
    o;
  if (
    ((o = a
      ? a(t, i)
      : G.isURLSearchParams(t)
        ? t.toString()
        : new zs(t, i).toString(r)),
    o)
  ) {
    let t = e.indexOf(`#`);
    (t !== -1 && (e = e.slice(0, t)),
      (e += (e.indexOf(`?`) === -1 ? `?` : `&`) + o));
  }
  return e;
}
var Us = class {
    constructor() {
      this.handlers = [];
    }
    use(e, t, n) {
      return (
        this.handlers.push({
          fulfilled: e,
          rejected: t,
          synchronous: n ? n.synchronous : !1,
          runWhen: n ? n.runWhen : null,
        }),
        this.handlers.length - 1
      );
    }
    eject(e) {
      this.handlers[e] && (this.handlers[e] = null);
    }
    clear() {
      this.handlers &&= [];
    }
    forEach(e) {
      G.forEach(this.handlers, function (t) {
        t !== null && e(t);
      });
    }
  },
  Ws = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
    legacyInterceptorReqResOrdering: !0,
  },
  Gs = {
    isBrowser: !0,
    classes: {
      URLSearchParams: typeof URLSearchParams < `u` ? URLSearchParams : zs,
      FormData: typeof FormData < `u` ? FormData : null,
      Blob: typeof Blob < `u` ? Blob : null,
    },
    protocols: [`http`, `https`, `file`, `blob`, `url`, `data`],
  },
  Ks = t({
    hasBrowserEnv: () => qs,
    hasStandardBrowserEnv: () => Ys,
    hasStandardBrowserWebWorkerEnv: () => Xs,
    navigator: () => Js,
    origin: () => Zs,
  }),
  qs = typeof window < `u` && typeof document < `u`,
  Js = (typeof navigator == `object` && navigator) || void 0,
  Ys =
    qs &&
    (!Js || [`ReactNative`, `NativeScript`, `NS`].indexOf(Js.product) < 0),
  Xs =
    typeof WorkerGlobalScope < `u` &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == `function`,
  Zs = (qs && window.location.href) || `http://localhost`,
  J = { ...Ks, ...Gs };
function Qs(e, t) {
  return Ls(e, new J.classes.URLSearchParams(), {
    visitor: function (e, t, n, r) {
      return J.isNode && G.isBuffer(e)
        ? (this.append(t, e.toString(`base64`)), !1)
        : r.defaultVisitor.apply(this, arguments);
    },
    ...t,
  });
}
function $s(e) {
  return G.matchAll(/\w+|\[(\w*)]/g, e).map((e) =>
    e[0] === `[]` ? `` : e[1] || e[0],
  );
}
function ec(e) {
  let t = {},
    n = Object.keys(e),
    r,
    i = n.length,
    a;
  for (r = 0; r < i; r++) ((a = n[r]), (t[a] = e[a]));
  return t;
}
function tc(e) {
  function t(e, n, r, i) {
    let a = e[i++];
    if (a === `__proto__`) return !0;
    let o = Number.isFinite(+a),
      s = i >= e.length;
    return (
      (a = !a && G.isArray(r) ? r.length : a),
      s
        ? (G.hasOwnProp(r, a)
            ? (r[a] = G.isArray(r[a]) ? r[a].concat(n) : [r[a], n])
            : (r[a] = n),
          !o)
        : ((!r[a] || !G.isObject(r[a])) && (r[a] = []),
          t(e, n, r[a], i) && G.isArray(r[a]) && (r[a] = ec(r[a])),
          !o)
    );
  }
  if (G.isFormData(e) && G.isFunction(e.entries)) {
    let n = {};
    return (
      G.forEachEntry(e, (e, r) => {
        t($s(e), r, n, 0);
      }),
      n
    );
  }
  return null;
}
var nc = (e, t) => (e != null && G.hasOwnProp(e, t) ? e[t] : void 0);
function rc(e, t, n) {
  if (G.isString(e))
    try {
      return ((t || JSON.parse)(e), G.trim(e));
    } catch (e) {
      if (e.name !== `SyntaxError`) throw e;
    }
  return (n || JSON.stringify)(e);
}
var ic = {
  transitional: Ws,
  adapter: [`xhr`, `http`, `fetch`],
  transformRequest: [
    function (e, t) {
      let n = t.getContentType() || ``,
        r = n.indexOf(`application/json`) > -1,
        i = G.isObject(e);
      if ((i && G.isHTMLForm(e) && (e = new FormData(e)), G.isFormData(e)))
        return r ? JSON.stringify(tc(e)) : e;
      if (
        G.isArrayBuffer(e) ||
        G.isBuffer(e) ||
        G.isStream(e) ||
        G.isFile(e) ||
        G.isBlob(e) ||
        G.isReadableStream(e)
      )
        return e;
      if (G.isArrayBufferView(e)) return e.buffer;
      if (G.isURLSearchParams(e))
        return (
          t.setContentType(
            `application/x-www-form-urlencoded;charset=utf-8`,
            !1,
          ),
          e.toString()
        );
      let a;
      if (i) {
        let t = nc(this, `formSerializer`);
        if (n.indexOf(`application/x-www-form-urlencoded`) > -1)
          return Qs(e, t).toString();
        if ((a = G.isFileList(e)) || n.indexOf(`multipart/form-data`) > -1) {
          let n = nc(this, `env`),
            r = n && n.FormData;
          return Ls(a ? { "files[]": e } : e, r && new r(), t);
        }
      }
      return i || r ? (t.setContentType(`application/json`, !1), rc(e)) : e;
    },
  ],
  transformResponse: [
    function (e) {
      let t = nc(this, `transitional`) || ic.transitional,
        n = t && t.forcedJSONParsing,
        r = nc(this, `responseType`),
        i = r === `json`;
      if (G.isResponse(e) || G.isReadableStream(e)) return e;
      if (e && G.isString(e) && ((n && !r) || i)) {
        let n = !(t && t.silentJSONParsing) && i;
        try {
          return JSON.parse(e, nc(this, `parseReviver`));
        } catch (e) {
          if (n)
            throw e.name === `SyntaxError`
              ? q.from(e, q.ERR_BAD_RESPONSE, this, null, nc(this, `response`))
              : e;
        }
      }
      return e;
    },
  ],
  timeout: 0,
  xsrfCookieName: `XSRF-TOKEN`,
  xsrfHeaderName: `X-XSRF-TOKEN`,
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: J.classes.FormData, Blob: J.classes.Blob },
  validateStatus: function (e) {
    return e >= 200 && e < 300;
  },
  headers: {
    common: {
      Accept: `application/json, text/plain, */*`,
      "Content-Type": void 0,
    },
  },
};
G.forEach([`delete`, `get`, `head`, `post`, `put`, `patch`, `query`], (e) => {
  ic.headers[e] = {};
});
function ac(e, t) {
  let n = this || ic,
    r = t || n,
    i = K.from(r.headers),
    a = r.data;
  return (
    G.forEach(e, function (e) {
      a = e.call(n, a, i.normalize(), t ? t.status : void 0);
    }),
    i.normalize(),
    a
  );
}
function oc(e) {
  return !!(e && e.__CANCEL__);
}
var sc = class extends q {
  constructor(e, t, n) {
    (super(e ?? `canceled`, q.ERR_CANCELED, t, n),
      (this.name = `CanceledError`),
      (this.__CANCEL__ = !0));
  }
};
function cc(e, t, n) {
  let r = n.config.validateStatus;
  !n.status || !r || r(n.status)
    ? e(n)
    : t(
        new q(
          `Request failed with status code ` + n.status,
          n.status >= 400 && n.status < 500
            ? q.ERR_BAD_REQUEST
            : q.ERR_BAD_RESPONSE,
          n.config,
          n.request,
          n,
        ),
      );
}
function lc(e) {
  let t = /^([-+\w]{1,25}):(?:\/\/)?/.exec(e);
  return (t && t[1]) || ``;
}
function uc(e, t) {
  e ||= 10;
  let n = Array(e),
    r = Array(e),
    i = 0,
    a = 0,
    o;
  return (
    (t = t === void 0 ? 1e3 : t),
    function (s) {
      let c = Date.now(),
        l = r[a];
      ((o ||= c), (n[i] = s), (r[i] = c));
      let u = a,
        d = 0;
      for (; u !== i; ) ((d += n[u++]), (u %= e));
      if (((i = (i + 1) % e), i === a && (a = (a + 1) % e), c - o < t)) return;
      let f = l && c - l;
      return f ? Math.round((d * 1e3) / f) : void 0;
    }
  );
}
function dc(e, t) {
  let n = 0,
    r = 1e3 / t,
    i,
    a,
    o = (t, r = Date.now()) => {
      ((n = r), (i = null), (a &&= (clearTimeout(a), null)), e(...t));
    };
  return [
    (...e) => {
      let t = Date.now(),
        s = t - n;
      s >= r
        ? o(e, t)
        : ((i = e),
          (a ||= setTimeout(() => {
            ((a = null), o(i));
          }, r - s)));
    },
    () => i && o(i),
  ];
}
var fc = (e, t, n = 3) => {
    let r = 0,
      i = uc(50, 250);
    return dc((n) => {
      let a = n.loaded,
        o = n.lengthComputable ? n.total : void 0,
        s = o == null ? a : Math.min(a, o),
        c = Math.max(0, s - r),
        l = i(c);
      ((r = Math.max(r, s)),
        e({
          loaded: s,
          total: o,
          progress: o ? s / o : void 0,
          bytes: c,
          rate: l || void 0,
          estimated: l && o ? (o - s) / l : void 0,
          event: n,
          lengthComputable: o != null,
          [t ? `download` : `upload`]: !0,
        }));
    }, n);
  },
  pc = (e, t) => {
    let n = e != null;
    return [(r) => t[0]({ lengthComputable: n, total: e, loaded: r }), t[1]];
  },
  mc =
    (e) =>
    (...t) =>
      G.asap(() => e(...t)),
  hc = J.hasStandardBrowserEnv
    ? ((e, t) => (n) => (
        (n = new URL(n, J.origin)),
        e.protocol === n.protocol &&
          e.host === n.host &&
          (t || e.port === n.port)
      ))(
        new URL(J.origin),
        J.navigator && /(msie|trident)/i.test(J.navigator.userAgent),
      )
    : () => !0,
  gc = J.hasStandardBrowserEnv
    ? {
        write(e, t, n, r, i, a, o) {
          if (typeof document > `u`) return;
          let s = [`${e}=${encodeURIComponent(t)}`];
          (G.isNumber(n) && s.push(`expires=${new Date(n).toUTCString()}`),
            G.isString(r) && s.push(`path=${r}`),
            G.isString(i) && s.push(`domain=${i}`),
            a === !0 && s.push(`secure`),
            G.isString(o) && s.push(`SameSite=${o}`),
            (document.cookie = s.join(`; `)));
        },
        read(e) {
          if (typeof document > `u`) return null;
          let t = document.cookie.split(`;`);
          for (let n = 0; n < t.length; n++) {
            let r = t[n].replace(/^\s+/, ``),
              i = r.indexOf(`=`);
            if (i !== -1 && r.slice(0, i) === e)
              return decodeURIComponent(r.slice(i + 1));
          }
          return null;
        },
        remove(e) {
          this.write(e, ``, Date.now() - 864e5, `/`);
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function _c(e) {
  return typeof e == `string` ? /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e) : !1;
}
function vc(e, t) {
  return t ? e.replace(/\/?\/$/, ``) + `/` + t.replace(/^\/+/, ``) : e;
}
function yc(e, t, n) {
  let r = !_c(t);
  return e && (r || n === !1) ? vc(e, t) : t;
}
var bc = (e) => (e instanceof K ? { ...e } : e);
function xc(e, t) {
  t ||= {};
  let n = Object.create(null);
  Object.defineProperty(n, `hasOwnProperty`, {
    __proto__: null,
    value: Object.prototype.hasOwnProperty,
    enumerable: !1,
    writable: !0,
    configurable: !0,
  });
  function r(e, t, n, r) {
    return G.isPlainObject(e) && G.isPlainObject(t)
      ? G.merge.call({ caseless: r }, e, t)
      : G.isPlainObject(t)
        ? G.merge({}, t)
        : G.isArray(t)
          ? t.slice()
          : t;
  }
  function i(e, t, n, i) {
    if (!G.isUndefined(t)) return r(e, t, n, i);
    if (!G.isUndefined(e)) return r(void 0, e, n, i);
  }
  function a(e, t) {
    if (!G.isUndefined(t)) return r(void 0, t);
  }
  function o(e, t) {
    if (!G.isUndefined(t)) return r(void 0, t);
    if (!G.isUndefined(e)) return r(void 0, e);
  }
  function s(n, i, a) {
    if (G.hasOwnProp(t, a)) return r(n, i);
    if (G.hasOwnProp(e, a)) return r(void 0, n);
  }
  let c = {
    url: a,
    method: a,
    data: a,
    baseURL: o,
    transformRequest: o,
    transformResponse: o,
    paramsSerializer: o,
    timeout: o,
    timeoutMessage: o,
    withCredentials: o,
    withXSRFToken: o,
    adapter: o,
    responseType: o,
    xsrfCookieName: o,
    xsrfHeaderName: o,
    onUploadProgress: o,
    onDownloadProgress: o,
    decompress: o,
    maxContentLength: o,
    maxBodyLength: o,
    beforeRedirect: o,
    transport: o,
    httpAgent: o,
    httpsAgent: o,
    cancelToken: o,
    socketPath: o,
    allowedSocketPaths: o,
    responseEncoding: o,
    validateStatus: s,
    headers: (e, t, n) => i(bc(e), bc(t), n, !0),
  };
  return (
    G.forEach(Object.keys({ ...e, ...t }), function (r) {
      if (r === `__proto__` || r === `constructor` || r === `prototype`) return;
      let a = G.hasOwnProp(c, r) ? c[r] : i,
        o = a(
          G.hasOwnProp(e, r) ? e[r] : void 0,
          G.hasOwnProp(t, r) ? t[r] : void 0,
          r,
        );
      (G.isUndefined(o) && a !== s) || (n[r] = o);
    }),
    n
  );
}
var Sc = [`content-type`, `content-length`];
function Cc(e, t, n) {
  if (n !== `content-only`) {
    e.set(t);
    return;
  }
  Object.entries(t).forEach(([t, n]) => {
    Sc.includes(t.toLowerCase()) && e.set(t, n);
  });
}
var wc = (e) =>
    encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi, (e, t) =>
      String.fromCharCode(parseInt(t, 16)),
    ),
  Tc = (e) => {
    let t = xc({}, e),
      n = (e) => (G.hasOwnProp(t, e) ? t[e] : void 0),
      r = n(`data`),
      i = n(`withXSRFToken`),
      a = n(`xsrfHeaderName`),
      o = n(`xsrfCookieName`),
      s = n(`headers`),
      c = n(`auth`),
      l = n(`baseURL`),
      u = n(`allowAbsoluteUrls`),
      d = n(`url`);
    if (
      ((t.headers = s = K.from(s)),
      (t.url = Hs(yc(l, d, u), e.params, e.paramsSerializer)),
      c &&
        s.set(
          `Authorization`,
          `Basic ` +
            btoa((c.username || ``) + `:` + (c.password ? wc(c.password) : ``)),
        ),
      G.isFormData(r) &&
        (J.hasStandardBrowserEnv || J.hasStandardBrowserWebWorkerEnv
          ? s.setContentType(void 0)
          : G.isFunction(r.getHeaders) &&
            Cc(s, r.getHeaders(), n(`formDataHeaderPolicy`))),
      J.hasStandardBrowserEnv &&
        (G.isFunction(i) && (i = i(t)), i === !0 || (i == null && hc(t.url))))
    ) {
      let e = a && o && gc.read(o);
      e && s.set(a, e);
    }
    return t;
  },
  Ec =
    typeof XMLHttpRequest < `u` &&
    function (e) {
      return new Promise(function (t, n) {
        let r = Tc(e),
          i = r.data,
          a = K.from(r.headers).normalize(),
          { responseType: o, onUploadProgress: s, onDownloadProgress: c } = r,
          l,
          u,
          d,
          f,
          p;
        function m() {
          (f && f(),
            p && p(),
            r.cancelToken && r.cancelToken.unsubscribe(l),
            r.signal && r.signal.removeEventListener(`abort`, l));
        }
        let h = new XMLHttpRequest();
        (h.open(r.method.toUpperCase(), r.url, !0), (h.timeout = r.timeout));
        function g() {
          if (!h) return;
          let r = K.from(
            `getAllResponseHeaders` in h && h.getAllResponseHeaders(),
          );
          (cc(
            function (e) {
              (t(e), m());
            },
            function (e) {
              (n(e), m());
            },
            {
              data:
                !o || o === `text` || o === `json`
                  ? h.responseText
                  : h.response,
              status: h.status,
              statusText: h.statusText,
              headers: r,
              config: e,
              request: h,
            },
          ),
            (h = null));
        }
        (`onloadend` in h
          ? (h.onloadend = g)
          : (h.onreadystatechange = function () {
              !h ||
                h.readyState !== 4 ||
                (h.status === 0 &&
                  !(h.responseURL && h.responseURL.startsWith(`file:`))) ||
                setTimeout(g);
            }),
          (h.onabort = function () {
            h &&=
              (n(new q(`Request aborted`, q.ECONNABORTED, e, h)), m(), null);
          }),
          (h.onerror = function (t) {
            let r = new q(
              t && t.message ? t.message : `Network Error`,
              q.ERR_NETWORK,
              e,
              h,
            );
            ((r.event = t || null), n(r), m(), (h = null));
          }),
          (h.ontimeout = function () {
            let t = r.timeout
                ? `timeout of ` + r.timeout + `ms exceeded`
                : `timeout exceeded`,
              i = r.transitional || Ws;
            (r.timeoutErrorMessage && (t = r.timeoutErrorMessage),
              n(
                new q(
                  t,
                  i.clarifyTimeoutError ? q.ETIMEDOUT : q.ECONNABORTED,
                  e,
                  h,
                ),
              ),
              m(),
              (h = null));
          }),
          i === void 0 && a.setContentType(null),
          `setRequestHeader` in h &&
            G.forEach(a.toJSON(), function (e, t) {
              h.setRequestHeader(t, e);
            }),
          G.isUndefined(r.withCredentials) ||
            (h.withCredentials = !!r.withCredentials),
          o && o !== `json` && (h.responseType = r.responseType),
          c && (([d, p] = fc(c, !0)), h.addEventListener(`progress`, d)),
          s &&
            h.upload &&
            (([u, f] = fc(s)),
            h.upload.addEventListener(`progress`, u),
            h.upload.addEventListener(`loadend`, f)),
          (r.cancelToken || r.signal) &&
            ((l = (t) => {
              h &&=
                (n(!t || t.type ? new sc(null, e, h) : t),
                h.abort(),
                m(),
                null);
            }),
            r.cancelToken && r.cancelToken.subscribe(l),
            r.signal &&
              (r.signal.aborted
                ? l()
                : r.signal.addEventListener(`abort`, l))));
        let _ = lc(r.url);
        if (_ && !J.protocols.includes(_)) {
          n(new q(`Unsupported protocol ` + _ + `:`, q.ERR_BAD_REQUEST, e));
          return;
        }
        h.send(i || null);
      });
    },
  Dc = (e, t) => {
    let { length: n } = (e = e ? e.filter(Boolean) : []);
    if (t || n) {
      let n = new AbortController(),
        r,
        i = function (e) {
          if (!r) {
            ((r = !0), o());
            let t = e instanceof Error ? e : this.reason;
            n.abort(
              t instanceof q ? t : new sc(t instanceof Error ? t.message : t),
            );
          }
        },
        a =
          t &&
          setTimeout(() => {
            ((a = null), i(new q(`timeout of ${t}ms exceeded`, q.ETIMEDOUT)));
          }, t),
        o = () => {
          e &&=
            (a && clearTimeout(a),
            (a = null),
            e.forEach((e) => {
              e.unsubscribe
                ? e.unsubscribe(i)
                : e.removeEventListener(`abort`, i);
            }),
            null);
        };
      e.forEach((e) => e.addEventListener(`abort`, i));
      let { signal: s } = n;
      return ((s.unsubscribe = () => G.asap(o)), s);
    }
  },
  Oc = function* (e, t) {
    let n = e.byteLength;
    if (!t || n < t) {
      yield e;
      return;
    }
    let r = 0,
      i;
    for (; r < n; ) ((i = r + t), yield e.slice(r, i), (r = i));
  },
  kc = async function* (e, t) {
    for await (let n of Ac(e)) yield* Oc(n, t);
  },
  Ac = async function* (e) {
    if (e[Symbol.asyncIterator]) {
      yield* e;
      return;
    }
    let t = e.getReader();
    try {
      for (;;) {
        let { done: e, value: n } = await t.read();
        if (e) break;
        yield n;
      }
    } finally {
      await t.cancel();
    }
  },
  jc = (e, t, n, r) => {
    let i = kc(e, t),
      a = 0,
      o,
      s = (e) => {
        o || ((o = !0), r && r(e));
      };
    return new ReadableStream(
      {
        async pull(e) {
          try {
            let { done: t, value: r } = await i.next();
            if (t) {
              (s(), e.close());
              return;
            }
            let o = r.byteLength;
            (n && n((a += o)), e.enqueue(new Uint8Array(r)));
          } catch (e) {
            throw (s(e), e);
          }
        },
        cancel(e) {
          return (s(e), i.return());
        },
      },
      { highWaterMark: 2 },
    );
  };
function Mc(e) {
  if (!e || typeof e != `string` || !e.startsWith(`data:`)) return 0;
  let t = e.indexOf(`,`);
  if (t < 0) return 0;
  let n = e.slice(5, t),
    r = e.slice(t + 1);
  if (/;base64/i.test(n)) {
    let e = r.length,
      t = r.length;
    for (let n = 0; n < t; n++)
      if (r.charCodeAt(n) === 37 && n + 2 < t) {
        let t = r.charCodeAt(n + 1),
          i = r.charCodeAt(n + 2);
        ((t >= 48 && t <= 57) ||
          (t >= 65 && t <= 70) ||
          (t >= 97 && t <= 102)) &&
          ((i >= 48 && i <= 57) ||
            (i >= 65 && i <= 70) ||
            (i >= 97 && i <= 102)) &&
          ((e -= 2), (n += 2));
      }
    let n = 0,
      i = t - 1,
      a = (e) =>
        e >= 2 &&
        r.charCodeAt(e - 2) === 37 &&
        r.charCodeAt(e - 1) === 51 &&
        (r.charCodeAt(e) === 68 || r.charCodeAt(e) === 100);
    (i >= 0 && (r.charCodeAt(i) === 61 ? (n++, i--) : a(i) && (n++, (i -= 3))),
      n === 1 && i >= 0 && (r.charCodeAt(i) === 61 || a(i)) && n++);
    let o = Math.floor(e / 4) * 3 - (n || 0);
    return o > 0 ? o : 0;
  }
  if (typeof Buffer < `u` && typeof Buffer.byteLength == `function`)
    return Buffer.byteLength(r, `utf8`);
  let i = 0;
  for (let e = 0, t = r.length; e < t; e++) {
    let n = r.charCodeAt(e);
    if (n < 128) i += 1;
    else if (n < 2048) i += 2;
    else if (n >= 55296 && n <= 56319 && e + 1 < t) {
      let t = r.charCodeAt(e + 1);
      t >= 56320 && t <= 57343 ? ((i += 4), e++) : (i += 3);
    } else i += 3;
  }
  return i;
}
var Nc = `1.16.0`,
  Pc = 64 * 1024,
  { isFunction: Fc } = G,
  Ic = (e, ...t) => {
    try {
      return !!e(...t);
    } catch {
      return !1;
    }
  },
  Lc = (e) => {
    let t = G.global ?? globalThis,
      { ReadableStream: n, TextEncoder: r } = t;
    e = G.merge.call(
      { skipUndefined: !0 },
      { Request: t.Request, Response: t.Response },
      e,
    );
    let { fetch: i, Request: a, Response: o } = e,
      s = i ? Fc(i) : typeof fetch == `function`,
      c = Fc(a),
      l = Fc(o);
    if (!s) return !1;
    let u = s && Fc(n),
      d =
        s &&
        (typeof r == `function`
          ? (
              (e) => (t) =>
                e.encode(t)
            )(new r())
          : async (e) => new Uint8Array(await new a(e).arrayBuffer())),
      f =
        c &&
        u &&
        Ic(() => {
          let e = !1,
            t = new a(J.origin, {
              body: new n(),
              method: `POST`,
              get duplex() {
                return ((e = !0), `half`);
              },
            }),
            r = t.headers.has(`Content-Type`);
          return (t.body != null && t.body.cancel(), e && !r);
        }),
      p = l && u && Ic(() => G.isReadableStream(new o(``).body)),
      m = { stream: p && ((e) => e.body) };
    s &&
      [`text`, `arrayBuffer`, `blob`, `formData`, `stream`].forEach((e) => {
        !m[e] &&
          (m[e] = (t, n) => {
            let r = t && t[e];
            if (r) return r.call(t);
            throw new q(
              `Response type '${e}' is not supported`,
              q.ERR_NOT_SUPPORT,
              n,
            );
          });
      });
    let h = async (e) => {
        if (e == null) return 0;
        if (G.isBlob(e)) return e.size;
        if (G.isSpecCompliantForm(e))
          return (
            await new a(J.origin, { method: `POST`, body: e }).arrayBuffer()
          ).byteLength;
        if (G.isArrayBufferView(e) || G.isArrayBuffer(e)) return e.byteLength;
        if ((G.isURLSearchParams(e) && (e += ``), G.isString(e)))
          return (await d(e)).byteLength;
      },
      g = async (e, t) => G.toFiniteNumber(e.getContentLength()) ?? h(t);
    return async (e) => {
      let {
          url: t,
          method: n,
          data: s,
          signal: l,
          cancelToken: u,
          timeout: d,
          onDownloadProgress: h,
          onUploadProgress: _,
          responseType: v,
          headers: y,
          withCredentials: b = `same-origin`,
          fetchOptions: x,
          maxContentLength: S,
          maxBodyLength: C,
        } = Tc(e),
        w = G.isNumber(S) && S > -1,
        ee = G.isNumber(C) && C > -1,
        te = i || fetch;
      v = v ? (v + ``).toLowerCase() : `text`;
      let T = Dc([l, u && u.toAbortSignal()], d),
        E = null,
        D =
          T &&
          T.unsubscribe &&
          (() => {
            T.unsubscribe();
          }),
        ne;
      try {
        if (w && typeof t == `string` && t.startsWith(`data:`) && Mc(t) > S)
          throw new q(
            `maxContentLength size of ` + S + ` exceeded`,
            q.ERR_BAD_RESPONSE,
            e,
            E,
          );
        if (ee && n !== `get` && n !== `head`) {
          let t = await g(y, s);
          if (typeof t == `number` && isFinite(t) && t > C)
            throw new q(
              `Request body larger than maxBodyLength limit`,
              q.ERR_BAD_REQUEST,
              e,
              E,
            );
        }
        if (
          _ &&
          f &&
          n !== `get` &&
          n !== `head` &&
          (ne = await g(y, s)) !== 0
        ) {
          let e = new a(t, { method: `POST`, body: s, duplex: `half` }),
            n;
          if (
            (G.isFormData(s) &&
              (n = e.headers.get(`content-type`)) &&
              y.setContentType(n),
            e.body)
          ) {
            let [t, n] = pc(ne, fc(mc(_)));
            s = jc(e.body, Pc, t, n);
          }
        }
        G.isString(b) || (b = b ? `include` : `omit`);
        let i = c && `credentials` in a.prototype;
        if (G.isFormData(s)) {
          let e = y.getContentType();
          e &&
            /^multipart\/form-data/i.test(e) &&
            !/boundary=/i.test(e) &&
            y.delete(`content-type`);
        }
        y.set(`User-Agent`, `axios/` + Nc, !1);
        let l = {
          ...x,
          signal: T,
          method: n.toUpperCase(),
          headers: y.normalize().toJSON(),
          body: s,
          duplex: `half`,
          credentials: i ? b : void 0,
        };
        E = c && new a(t, l);
        let u = await (c ? te(E, x) : te(t, l));
        if (w) {
          let t = G.toFiniteNumber(u.headers.get(`content-length`));
          if (t != null && t > S)
            throw new q(
              `maxContentLength size of ` + S + ` exceeded`,
              q.ERR_BAD_RESPONSE,
              e,
              E,
            );
        }
        let d = p && (v === `stream` || v === `response`);
        if (p && u.body && (h || w || (d && D))) {
          let t = {};
          [`status`, `statusText`, `headers`].forEach((e) => {
            t[e] = u[e];
          });
          let n = G.toFiniteNumber(u.headers.get(`content-length`)),
            [r, i] = (h && pc(n, fc(mc(h), !0))) || [],
            a = 0;
          u = new o(
            jc(
              u.body,
              Pc,
              (t) => {
                if (w && ((a = t), a > S))
                  throw new q(
                    `maxContentLength size of ` + S + ` exceeded`,
                    q.ERR_BAD_RESPONSE,
                    e,
                    E,
                  );
                r && r(t);
              },
              () => {
                (i && i(), D && D());
              },
            ),
            t,
          );
        }
        v ||= `text`;
        let O = await m[G.findKey(m, v) || `text`](u, e);
        if (w && !p && !d) {
          let t;
          if (
            (O != null &&
              (typeof O.byteLength == `number`
                ? (t = O.byteLength)
                : typeof O.size == `number`
                  ? (t = O.size)
                  : typeof O == `string` &&
                    (t =
                      typeof r == `function`
                        ? new r().encode(O).byteLength
                        : O.length)),
            typeof t == `number` && t > S)
          )
            throw new q(
              `maxContentLength size of ` + S + ` exceeded`,
              q.ERR_BAD_RESPONSE,
              e,
              E,
            );
        }
        return (
          !d && D && D(),
          await new Promise((t, n) => {
            cc(t, n, {
              data: O,
              headers: K.from(u.headers),
              status: u.status,
              statusText: u.statusText,
              config: e,
              request: E,
            });
          })
        );
      } catch (t) {
        if ((D && D(), T && T.aborted && T.reason instanceof q)) {
          let n = T.reason;
          throw (
            (n.config = e),
            E && (n.request = E),
            t !== n && (n.cause = t),
            n
          );
        }
        throw t &&
          t.name === `TypeError` &&
          /Load failed|fetch/i.test(t.message)
          ? Object.assign(
              new q(`Network Error`, q.ERR_NETWORK, e, E, t && t.response),
              { cause: t.cause || t },
            )
          : q.from(t, t && t.code, e, E, t && t.response);
      }
    };
  },
  Rc = new Map(),
  zc = (e) => {
    let t = (e && e.env) || {},
      { fetch: n, Request: r, Response: i } = t,
      a = [r, i, n],
      o = a.length,
      s,
      c,
      l = Rc;
    for (; o--; )
      ((s = a[o]),
        (c = l.get(s)),
        c === void 0 && l.set(s, (c = o ? new Map() : Lc(t))),
        (l = c));
    return c;
  };
zc();
var Bc = { http: null, xhr: Ec, fetch: { get: zc } };
G.forEach(Bc, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, `name`, { __proto__: null, value: t });
    } catch {}
    Object.defineProperty(e, `adapterName`, { __proto__: null, value: t });
  }
});
var Vc = (e) => `- ${e}`,
  Hc = (e) => G.isFunction(e) || e === null || e === !1;
function Uc(e, t) {
  e = G.isArray(e) ? e : [e];
  let { length: n } = e,
    r,
    i,
    a = {};
  for (let o = 0; o < n; o++) {
    r = e[o];
    let n;
    if (
      ((i = r),
      !Hc(r) && ((i = Bc[(n = String(r)).toLowerCase()]), i === void 0))
    )
      throw new q(`Unknown adapter '${n}'`);
    if (i && (G.isFunction(i) || (i = i.get(t)))) break;
    a[n || `#` + o] = i;
  }
  if (!i) {
    let e = Object.entries(a).map(
      ([e, t]) =>
        `adapter ${e} ` +
        (t === !1
          ? `is not supported by the environment`
          : `is not available in the build`),
    );
    throw new q(
      `There is no suitable adapter to dispatch the request ` +
        (n
          ? e.length > 1
            ? `since :
` +
              e.map(Vc).join(`
`)
            : ` ` + Vc(e[0])
          : `as no adapter specified`),
      `ERR_NOT_SUPPORT`,
    );
  }
  return i;
}
var Wc = { getAdapter: Uc, adapters: Bc };
function Gc(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new sc(null, e);
}
function Kc(e) {
  return (
    Gc(e),
    (e.headers = K.from(e.headers)),
    (e.data = ac.call(e, e.transformRequest)),
    [`post`, `put`, `patch`].indexOf(e.method) !== -1 &&
      e.headers.setContentType(`application/x-www-form-urlencoded`, !1),
    Wc.getAdapter(
      e.adapter || ic.adapter,
      e,
    )(e).then(
      function (t) {
        (Gc(e), (e.response = t));
        try {
          t.data = ac.call(e, e.transformResponse, t);
        } finally {
          delete e.response;
        }
        return ((t.headers = K.from(t.headers)), t);
      },
      function (t) {
        if (!oc(t) && (Gc(e), t && t.response)) {
          e.response = t.response;
          try {
            t.response.data = ac.call(e, e.transformResponse, t.response);
          } finally {
            delete e.response;
          }
          t.response.headers = K.from(t.response.headers);
        }
        return Promise.reject(t);
      },
    )
  );
}
var qc = {};
[`object`, `boolean`, `number`, `function`, `string`, `symbol`].forEach(
  (e, t) => {
    qc[e] = function (n) {
      return typeof n === e || `a` + (t < 1 ? `n ` : ` `) + e;
    };
  },
);
var Jc = {};
((qc.transitional = function (e, t, n) {
  function r(e, t) {
    return (
      `[Axios v` +
      Nc +
      `] Transitional option '` +
      e +
      `'` +
      t +
      (n ? `. ` + n : ``)
    );
  }
  return (n, i, a) => {
    if (e === !1)
      throw new q(
        r(i, ` has been removed` + (t ? ` in ` + t : ``)),
        q.ERR_DEPRECATED,
      );
    return (
      t &&
        !Jc[i] &&
        ((Jc[i] = !0),
        console.warn(
          r(
            i,
            ` has been deprecated since v` +
              t +
              ` and will be removed in the near future`,
          ),
        )),
      e ? e(n, i, a) : !0
    );
  };
}),
  (qc.spelling = function (e) {
    return (t, n) => (console.warn(`${n} is likely a misspelling of ${e}`), !0);
  }));
function Yc(e, t, n) {
  if (typeof e != `object`)
    throw new q(`options must be an object`, q.ERR_BAD_OPTION_VALUE);
  let r = Object.keys(e),
    i = r.length;
  for (; i-- > 0; ) {
    let a = r[i],
      o = Object.prototype.hasOwnProperty.call(t, a) ? t[a] : void 0;
    if (o) {
      let t = e[a],
        n = t === void 0 || o(t, a, e);
      if (n !== !0)
        throw new q(`option ` + a + ` must be ` + n, q.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0) throw new q(`Unknown option ` + a, q.ERR_BAD_OPTION);
  }
}
var Xc = { assertOptions: Yc, validators: qc },
  Y = Xc.validators,
  Zc = class {
    constructor(e) {
      ((this.defaults = e || {}),
        (this.interceptors = { request: new Us(), response: new Us() }));
    }
    async request(e, t) {
      try {
        return await this._request(e, t);
      } catch (e) {
        if (e instanceof Error) {
          let t = {};
          Error.captureStackTrace ? Error.captureStackTrace(t) : (t = Error());
          let n = (() => {
            if (!t.stack) return ``;
            let e = t.stack.indexOf(`
`);
            return e === -1 ? `` : t.stack.slice(e + 1);
          })();
          try {
            if (!e.stack) e.stack = n;
            else if (n) {
              let t = n.indexOf(`
`),
                r =
                  t === -1
                    ? -1
                    : n.indexOf(
                        `
`,
                        t + 1,
                      ),
                i = r === -1 ? `` : n.slice(r + 1);
              String(e.stack).endsWith(i) ||
                (e.stack +=
                  `
` + n);
            }
          } catch {}
        }
        throw e;
      }
    }
    _request(e, t) {
      (typeof e == `string` ? ((t ||= {}), (t.url = e)) : (t = e || {}),
        (t = xc(this.defaults, t)));
      let { transitional: n, paramsSerializer: r, headers: i } = t;
      (n !== void 0 &&
        Xc.assertOptions(
          n,
          {
            silentJSONParsing: Y.transitional(Y.boolean),
            forcedJSONParsing: Y.transitional(Y.boolean),
            clarifyTimeoutError: Y.transitional(Y.boolean),
            legacyInterceptorReqResOrdering: Y.transitional(Y.boolean),
          },
          !1,
        ),
        r != null &&
          (G.isFunction(r)
            ? (t.paramsSerializer = { serialize: r })
            : Xc.assertOptions(
                r,
                { encode: Y.function, serialize: Y.function },
                !0,
              )),
        t.allowAbsoluteUrls !== void 0 ||
          (this.defaults.allowAbsoluteUrls === void 0
            ? (t.allowAbsoluteUrls = !0)
            : (t.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)),
        Xc.assertOptions(
          t,
          {
            baseUrl: Y.spelling(`baseURL`),
            withXsrfToken: Y.spelling(`withXSRFToken`),
          },
          !0,
        ),
        (t.method = (t.method || this.defaults.method || `get`).toLowerCase()));
      let a = i && G.merge(i.common, i[t.method]);
      (i &&
        G.forEach(
          [`delete`, `get`, `head`, `post`, `put`, `patch`, `query`, `common`],
          (e) => {
            delete i[e];
          },
        ),
        (t.headers = K.concat(a, i)));
      let o = [],
        s = !0;
      this.interceptors.request.forEach(function (e) {
        if (typeof e.runWhen == `function` && e.runWhen(t) === !1) return;
        s &&= e.synchronous;
        let n = t.transitional || Ws;
        n && n.legacyInterceptorReqResOrdering
          ? o.unshift(e.fulfilled, e.rejected)
          : o.push(e.fulfilled, e.rejected);
      });
      let c = [];
      this.interceptors.response.forEach(function (e) {
        c.push(e.fulfilled, e.rejected);
      });
      let l,
        u = 0,
        d;
      if (!s) {
        let e = [Kc.bind(this), void 0];
        for (
          e.unshift(...o), e.push(...c), d = e.length, l = Promise.resolve(t);
          u < d;
        )
          l = l.then(e[u++], e[u++]);
        return l;
      }
      d = o.length;
      let f = t;
      for (; u < d; ) {
        let e = o[u++],
          t = o[u++];
        try {
          f = e(f);
        } catch (e) {
          t.call(this, e);
          break;
        }
      }
      try {
        l = Kc.call(this, f);
      } catch (e) {
        return Promise.reject(e);
      }
      for (u = 0, d = c.length; u < d; ) l = l.then(c[u++], c[u++]);
      return l;
    }
    getUri(e) {
      return (
        (e = xc(this.defaults, e)),
        Hs(
          yc(e.baseURL, e.url, e.allowAbsoluteUrls),
          e.params,
          e.paramsSerializer,
        )
      );
    }
  };
(G.forEach([`delete`, `get`, `head`, `options`], function (e) {
  Zc.prototype[e] = function (t, n) {
    return this.request(
      xc(n || {}, { method: e, url: t, data: (n || {}).data }),
    );
  };
}),
  G.forEach([`post`, `put`, `patch`, `query`], function (e) {
    function t(t) {
      return function (n, r, i) {
        return this.request(
          xc(i || {}, {
            method: e,
            headers: t ? { "Content-Type": `multipart/form-data` } : {},
            url: n,
            data: r,
          }),
        );
      };
    }
    ((Zc.prototype[e] = t()),
      e !== `query` && (Zc.prototype[e + `Form`] = t(!0)));
  }));
var Qc = class e {
  constructor(e) {
    if (typeof e != `function`) throw TypeError(`executor must be a function.`);
    let t;
    this.promise = new Promise(function (e) {
      t = e;
    });
    let n = this;
    (this.promise.then((e) => {
      if (!n._listeners) return;
      let t = n._listeners.length;
      for (; t-- > 0; ) n._listeners[t](e);
      n._listeners = null;
    }),
      (this.promise.then = (e) => {
        let t,
          r = new Promise((e) => {
            (n.subscribe(e), (t = e));
          }).then(e);
        return (
          (r.cancel = function () {
            n.unsubscribe(t);
          }),
          r
        );
      }),
      e(function (e, r, i) {
        n.reason || ((n.reason = new sc(e, r, i)), t(n.reason));
      }));
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(e) {
    if (this.reason) {
      e(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e) : (this._listeners = [e]);
  }
  unsubscribe(e) {
    if (!this._listeners) return;
    let t = this._listeners.indexOf(e);
    t !== -1 && this._listeners.splice(t, 1);
  }
  toAbortSignal() {
    let e = new AbortController(),
      t = (t) => {
        e.abort(t);
      };
    return (
      this.subscribe(t),
      (e.signal.unsubscribe = () => this.unsubscribe(t)),
      e.signal
    );
  }
  static source() {
    let t;
    return {
      token: new e(function (e) {
        t = e;
      }),
      cancel: t,
    };
  }
};
function $c(e) {
  return function (t) {
    return e.apply(null, t);
  };
}
function el(e) {
  return G.isObject(e) && e.isAxiosError === !0;
}
var tl = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526,
};
Object.entries(tl).forEach(([e, t]) => {
  tl[t] = e;
});
function nl(e) {
  let t = new Zc(e),
    n = ao(Zc.prototype.request, t);
  return (
    G.extend(n, Zc.prototype, t, { allOwnKeys: !0 }),
    G.extend(n, t, null, { allOwnKeys: !0 }),
    (n.create = function (t) {
      return nl(xc(e, t));
    }),
    n
  );
}
var X = nl(ic);
((X.Axios = Zc),
  (X.CanceledError = sc),
  (X.CancelToken = Qc),
  (X.isCancel = oc),
  (X.VERSION = Nc),
  (X.toFormData = Ls),
  (X.AxiosError = q),
  (X.Cancel = X.CanceledError),
  (X.all = function (e) {
    return Promise.all(e);
  }),
  (X.spread = $c),
  (X.isAxiosError = el),
  (X.mergeConfig = xc),
  (X.AxiosHeaders = K),
  (X.formToJSON = (e) => tc(G.isHTMLForm(e) ? new FormData(e) : e)),
  (X.getAdapter = Wc.getAdapter),
  (X.HttpStatusCode = tl),
  (X.default = X));
var rl = X.create({
  baseURL: `http://localhost:5000`,
  withCredentials: !0,
  headers: { "Content-Type": `application/json`, Accept: `application/json` },
});
rl.interceptors.response.use(
  (e) => {
    let t = e.data;
    if (!t.success) {
      let e = {
        message: t.message,
        errors: t.errors ?? [],
        statusCode: t.statusCode,
        traceId: t.traceId,
      };
      return Promise.reject(e);
    }
    return e;
  },
  (e) => {
    if (!e.response)
      return Promise.reject({
        message: `Network error. Please check your connection.`,
        errors: [],
        statusCode: 0,
      });
    let t = e.response.data,
      n = {
        message: t?.message ?? e.message,
        errors: t?.errors ?? [],
        statusCode: t?.statusCode ?? e.response.status,
        traceId: t?.traceId,
      };
    return Promise.reject(n);
  },
);
var il = {
    async login(e) {
      return (await rl.post(`/api/auth/login`, e)).data.data;
    },
    async register(e) {
      return (await rl.post(`/api/auth/register`, e)).data.data;
    },
    async getProfile() {
      return (await rl.get(`/api/auth/profile`)).data.data;
    },
    async logout() {
      await rl.post(`/api/auth/logout`);
    },
    async refresh() {
      return (await rl.post(`/api/auth/refresh`)).data.data;
    },
  },
  al = L(`ZodISODateTime`, (e, t) => {
    (zr.init(e, t), $.init(e, t));
  });
function ol(e) {
  return aa(al, e);
}
var sl = L(`ZodISODate`, (e, t) => {
  (Br.init(e, t), $.init(e, t));
});
function cl(e) {
  return oa(sl, e);
}
var ll = L(`ZodISOTime`, (e, t) => {
  (Vr.init(e, t), $.init(e, t));
});
function ul(e) {
  return sa(ll, e);
}
var dl = L(`ZodISODuration`, (e, t) => {
  (Hr.init(e, t), $.init(e, t));
});
function fl(e) {
  return ca(dl, e);
}
var Z = L(
    `ZodError`,
    (e, t) => {
      (yn.init(e, t),
        (e.name = `ZodError`),
        Object.defineProperties(e, {
          format: { value: (t) => Sn(e, t) },
          flatten: { value: (t) => xn(e, t) },
          addIssue: {
            value: (t) => {
              (e.issues.push(t), (e.message = JSON.stringify(e.issues, zt, 2)));
            },
          },
          addIssues: {
            value: (t) => {
              (e.issues.push(...t),
                (e.message = JSON.stringify(e.issues, zt, 2)));
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
  pl = Cn(Z),
  ml = Tn(Z),
  hl = Dn(Z),
  gl = kn(Z),
  _l = jn(Z),
  vl = Mn(Z),
  yl = Nn(Z),
  bl = Pn(Z),
  xl = Fn(Z),
  Sl = In(Z),
  Cl = Ln(Z),
  wl = Rn(Z),
  Tl = new WeakMap();
function El(e, t, n) {
  let r = Object.getPrototypeOf(e),
    i = Tl.get(r);
  if ((i || ((i = new Set()), Tl.set(r, i)), !i.has(t))) {
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
var Q = L(
    `ZodType`,
    (e, t) => (
      B.init(e, t),
      Object.assign(e[`~standard`], {
        jsonSchema: { input: Pa(e, `input`), output: Pa(e, `output`) },
      }),
      (e.toJSONSchema = Na(e, {})),
      (e.def = t),
      (e.type = t.type),
      Object.defineProperty(e, `_def`, { value: t }),
      (e.parse = (t, n) => pl(e, t, n, { callee: e.parse })),
      (e.safeParse = (t, n) => hl(e, t, n)),
      (e.parseAsync = async (t, n) => ml(e, t, n, { callee: e.parseAsync })),
      (e.safeParseAsync = async (t, n) => gl(e, t, n)),
      (e.spa = e.safeParseAsync),
      (e.encode = (t, n) => _l(e, t, n)),
      (e.decode = (t, n) => vl(e, t, n)),
      (e.encodeAsync = async (t, n) => yl(e, t, n)),
      (e.decodeAsync = async (t, n) => bl(e, t, n)),
      (e.safeEncode = (t, n) => xl(e, t, n)),
      (e.safeDecode = (t, n) => Sl(e, t, n)),
      (e.safeEncodeAsync = async (t, n) => Cl(e, t, n)),
      (e.safeDecodeAsync = async (t, n) => wl(e, t, n)),
      El(e, `ZodType`, {
        check(...e) {
          let t = this.def;
          return this.clone(
            Gt(t, {
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
          return tn(this, e, t);
        },
        brand() {
          return this;
        },
        register(e, t) {
          return (e.add(this, t), this);
        },
        refine(e, t) {
          return this.check(Au(e, t));
        },
        superRefine(e, t) {
          return this.check(ju(e, t));
        },
        overwrite(e) {
          return this.check(ba(e));
        },
        optional() {
          return fu(this);
        },
        exactOptional() {
          return mu(this);
        },
        nullable() {
          return gu(this);
        },
        nullish() {
          return fu(gu(this));
        },
        nonoptional(e) {
          return Su(this, e);
        },
        array() {
          return eu(this);
        },
        or(e) {
          return iu([this, e]);
        },
        and(e) {
          return ou(this, e);
        },
        transform(e) {
          return Eu(this, uu(e));
        },
        default(e) {
          return vu(this, e);
        },
        prefault(e) {
          return bu(this, e);
        },
        catch(e) {
          return wu(this, e);
        },
        pipe(e) {
          return Eu(this, e);
        },
        readonly() {
          return Ou(this);
        },
        describe(e) {
          let t = this.clone();
          return (Fi.add(t, { description: e }), t);
        },
        meta(...e) {
          if (e.length === 0) return Fi.get(this);
          let t = this.clone();
          return (Fi.add(t, e[0]), t);
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
          return Fi.get(e)?.description;
        },
        configurable: !0,
      }),
      e
    ),
  ),
  Dl = L(`_ZodString`, (e, t) => {
    (Dr.init(e, t),
      Q.init(e, t),
      (e._zod.processJSONSchema = (t, n, r) => Ia(e, t, n, r)));
    let n = e._zod.bag;
    ((e.format = n.format ?? null),
      (e.minLength = n.minimum ?? null),
      (e.maxLength = n.maximum ?? null),
      El(e, `_ZodString`, {
        regex(...e) {
          return this.check(ma(...e));
        },
        includes(...e) {
          return this.check(_a(...e));
        },
        startsWith(...e) {
          return this.check(va(...e));
        },
        endsWith(...e) {
          return this.check(ya(...e));
        },
        min(...e) {
          return this.check(fa(...e));
        },
        max(...e) {
          return this.check(da(...e));
        },
        length(...e) {
          return this.check(pa(...e));
        },
        nonempty(...e) {
          return this.check(fa(1, ...e));
        },
        lowercase(e) {
          return this.check(ha(e));
        },
        uppercase(e) {
          return this.check(ga(e));
        },
        trim() {
          return this.check(Sa());
        },
        normalize(...e) {
          return this.check(xa(...e));
        },
        toLowerCase() {
          return this.check(Ca());
        },
        toUpperCase() {
          return this.check(wa());
        },
        slugify() {
          return this.check(Ta());
        },
      }));
  }),
  Ol = L(`ZodString`, (e, t) => {
    (Dr.init(e, t),
      Dl.init(e, t),
      (e.email = (t) => e.check(Li(Al, t))),
      (e.url = (t) => e.check(Ui(Nl, t))),
      (e.jwt = (t) => e.check(ia(Jl, t))),
      (e.emoji = (t) => e.check(Wi(Pl, t))),
      (e.guid = (t) => e.check(Ri(jl, t))),
      (e.uuid = (t) => e.check(zi(Ml, t))),
      (e.uuidv4 = (t) => e.check(Bi(Ml, t))),
      (e.uuidv6 = (t) => e.check(Vi(Ml, t))),
      (e.uuidv7 = (t) => e.check(Hi(Ml, t))),
      (e.nanoid = (t) => e.check(Gi(Fl, t))),
      (e.guid = (t) => e.check(Ri(jl, t))),
      (e.cuid = (t) => e.check(Ki(Il, t))),
      (e.cuid2 = (t) => e.check(qi(Ll, t))),
      (e.ulid = (t) => e.check(Ji(Rl, t))),
      (e.base64 = (t) => e.check(ta(Gl, t))),
      (e.base64url = (t) => e.check(na(Kl, t))),
      (e.xid = (t) => e.check(Yi(zl, t))),
      (e.ksuid = (t) => e.check(Xi(Bl, t))),
      (e.ipv4 = (t) => e.check(Zi(Vl, t))),
      (e.ipv6 = (t) => e.check(Qi(Hl, t))),
      (e.cidrv4 = (t) => e.check($i(Ul, t))),
      (e.cidrv6 = (t) => e.check(ea(Wl, t))),
      (e.e164 = (t) => e.check(ra(ql, t))),
      (e.datetime = (t) => e.check(ol(t))),
      (e.date = (t) => e.check(cl(t))),
      (e.time = (t) => e.check(ul(t))),
      (e.duration = (t) => e.check(fl(t))));
  });
function kl(e) {
  return Ii(Ol, e);
}
var $ = L(`ZodStringFormat`, (e, t) => {
    (V.init(e, t), Dl.init(e, t));
  }),
  Al = L(`ZodEmail`, (e, t) => {
    (Ar.init(e, t), $.init(e, t));
  }),
  jl = L(`ZodGUID`, (e, t) => {
    (Or.init(e, t), $.init(e, t));
  }),
  Ml = L(`ZodUUID`, (e, t) => {
    (kr.init(e, t), $.init(e, t));
  }),
  Nl = L(`ZodURL`, (e, t) => {
    (jr.init(e, t), $.init(e, t));
  }),
  Pl = L(`ZodEmoji`, (e, t) => {
    (Mr.init(e, t), $.init(e, t));
  }),
  Fl = L(`ZodNanoID`, (e, t) => {
    (Nr.init(e, t), $.init(e, t));
  }),
  Il = L(`ZodCUID`, (e, t) => {
    (Pr.init(e, t), $.init(e, t));
  }),
  Ll = L(`ZodCUID2`, (e, t) => {
    (Fr.init(e, t), $.init(e, t));
  }),
  Rl = L(`ZodULID`, (e, t) => {
    (Ir.init(e, t), $.init(e, t));
  }),
  zl = L(`ZodXID`, (e, t) => {
    (Lr.init(e, t), $.init(e, t));
  }),
  Bl = L(`ZodKSUID`, (e, t) => {
    (Rr.init(e, t), $.init(e, t));
  }),
  Vl = L(`ZodIPv4`, (e, t) => {
    (Ur.init(e, t), $.init(e, t));
  }),
  Hl = L(`ZodIPv6`, (e, t) => {
    (Wr.init(e, t), $.init(e, t));
  }),
  Ul = L(`ZodCIDRv4`, (e, t) => {
    (Gr.init(e, t), $.init(e, t));
  }),
  Wl = L(`ZodCIDRv6`, (e, t) => {
    (Kr.init(e, t), $.init(e, t));
  }),
  Gl = L(`ZodBase64`, (e, t) => {
    (Jr.init(e, t), $.init(e, t));
  }),
  Kl = L(`ZodBase64URL`, (e, t) => {
    (Xr.init(e, t), $.init(e, t));
  }),
  ql = L(`ZodE164`, (e, t) => {
    (Zr.init(e, t), $.init(e, t));
  }),
  Jl = L(`ZodJWT`, (e, t) => {
    ($r.init(e, t), $.init(e, t));
  }),
  Yl = L(`ZodUnknown`, (e, t) => {
    (ei.init(e, t),
      Q.init(e, t),
      (e._zod.processJSONSchema = (e, t, n) => void 0));
  });
function Xl() {
  return la(Yl);
}
var Zl = L(`ZodNever`, (e, t) => {
  (ti.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => La(e, t, n, r)));
});
function Ql(e) {
  return ua(Zl, e);
}
var $l = L(`ZodArray`, (e, t) => {
  (ri.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Va(e, t, n, r)),
    (e.element = t.element),
    El(e, `ZodArray`, {
      min(e, t) {
        return this.check(fa(e, t));
      },
      nonempty(e) {
        return this.check(fa(1, e));
      },
      max(e, t) {
        return this.check(da(e, t));
      },
      length(e, t) {
        return this.check(pa(e, t));
      },
      unwrap() {
        return this.element;
      },
    }));
});
function eu(e, t) {
  return Ea($l, e, t);
}
var tu = L(`ZodObject`, (e, t) => {
  (ci.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Ha(e, t, n, r)),
    R(e, `shape`, () => t.shape),
    El(e, `ZodObject`, {
      keyof() {
        return cu(Object.keys(this._zod.def.shape));
      },
      catchall(e) {
        return this.clone({ ...this._zod.def, catchall: e });
      },
      passthrough() {
        return this.clone({ ...this._zod.def, catchall: Xl() });
      },
      loose() {
        return this.clone({ ...this._zod.def, catchall: Xl() });
      },
      strict() {
        return this.clone({ ...this._zod.def, catchall: Ql() });
      },
      strip() {
        return this.clone({ ...this._zod.def, catchall: void 0 });
      },
      extend(e) {
        return on(this, e);
      },
      safeExtend(e) {
        return sn(this, e);
      },
      merge(e) {
        return cn(this, e);
      },
      pick(e) {
        return rn(this, e);
      },
      omit(e) {
        return an(this, e);
      },
      partial(...e) {
        return ln(du, this, e[0]);
      },
      required(...e) {
        return un(xu, this, e[0]);
      },
    }));
});
function nu(e, t) {
  return new tu({ type: `object`, shape: e ?? {}, ...z(t) });
}
var ru = L(`ZodUnion`, (e, t) => {
  (ui.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Ua(e, t, n, r)),
    (e.options = t.options));
});
function iu(e, t) {
  return new ru({ type: `union`, options: e, ...z(t) });
}
var au = L(`ZodIntersection`, (e, t) => {
  (di.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Wa(e, t, n, r)));
});
function ou(e, t) {
  return new au({ type: `intersection`, left: e, right: t });
}
var su = L(`ZodEnum`, (e, t) => {
  (mi.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Ra(e, t, n, r)),
    (e.enum = t.entries),
    (e.options = Object.values(t.entries)));
  let n = new Set(Object.keys(t.entries));
  ((e.extract = (e, r) => {
    let i = {};
    for (let r of e)
      if (n.has(r)) i[r] = t.entries[r];
      else throw Error(`Key ${r} not found in enum`);
    return new su({ ...t, checks: [], ...z(r), entries: i });
  }),
    (e.exclude = (e, r) => {
      let i = { ...t.entries };
      for (let t of e)
        if (n.has(t)) delete i[t];
        else throw Error(`Key ${t} not found in enum`);
      return new su({ ...t, checks: [], ...z(r), entries: i });
    }));
});
function cu(e, t) {
  return new su({
    type: `enum`,
    entries: Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e,
    ...z(t),
  });
}
var lu = L(`ZodTransform`, (e, t) => {
  (hi.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Ba(e, t, n, r)),
    (e._zod.parse = (n, r) => {
      if (r.direction === `backward`) throw new Ft(e.constructor.name);
      n.addIssue = (r) => {
        if (typeof r == `string`) n.issues.push(_n(r, n.value, t));
        else {
          let t = r;
          (t.fatal && (t.continue = !1),
            (t.code ??= `custom`),
            (t.input ??= n.value),
            (t.inst ??= e),
            n.issues.push(_n(t)));
        }
      };
      let i = t.transform(n.value, n);
      return i instanceof Promise
        ? i.then((e) => ((n.value = e), (n.fallback = !0), n))
        : ((n.value = i), (n.fallback = !0), n);
    }));
});
function uu(e) {
  return new lu({ type: `transform`, transform: e });
}
var du = L(`ZodOptional`, (e, t) => {
  (_i.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Qa(e, t, n, r)),
    (e.unwrap = () => e._zod.def.innerType));
});
function fu(e) {
  return new du({ type: `optional`, innerType: e });
}
var pu = L(`ZodExactOptional`, (e, t) => {
  (vi.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Qa(e, t, n, r)),
    (e.unwrap = () => e._zod.def.innerType));
});
function mu(e) {
  return new pu({ type: `optional`, innerType: e });
}
var hu = L(`ZodNullable`, (e, t) => {
  (yi.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Ga(e, t, n, r)),
    (e.unwrap = () => e._zod.def.innerType));
});
function gu(e) {
  return new hu({ type: `nullable`, innerType: e });
}
var _u = L(`ZodDefault`, (e, t) => {
  (bi.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => qa(e, t, n, r)),
    (e.unwrap = () => e._zod.def.innerType),
    (e.removeDefault = e.unwrap));
});
function vu(e, t) {
  return new _u({
    type: `default`,
    innerType: e,
    get defaultValue() {
      return typeof t == `function` ? t() : Qt(t);
    },
  });
}
var yu = L(`ZodPrefault`, (e, t) => {
  (Si.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Ja(e, t, n, r)),
    (e.unwrap = () => e._zod.def.innerType));
});
function bu(e, t) {
  return new yu({
    type: `prefault`,
    innerType: e,
    get defaultValue() {
      return typeof t == `function` ? t() : Qt(t);
    },
  });
}
var xu = L(`ZodNonOptional`, (e, t) => {
  (Ci.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Ka(e, t, n, r)),
    (e.unwrap = () => e._zod.def.innerType));
});
function Su(e, t) {
  return new xu({ type: `nonoptional`, innerType: e, ...z(t) });
}
var Cu = L(`ZodCatch`, (e, t) => {
  (Ti.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Ya(e, t, n, r)),
    (e.unwrap = () => e._zod.def.innerType),
    (e.removeCatch = e.unwrap));
});
function wu(e, t) {
  return new Cu({
    type: `catch`,
    innerType: e,
    catchValue: typeof t == `function` ? t : () => t,
  });
}
var Tu = L(`ZodPipe`, (e, t) => {
  (Ei.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Xa(e, t, n, r)),
    (e.in = t.in),
    (e.out = t.out));
});
function Eu(e, t) {
  return new Tu({ type: `pipe`, in: e, out: t });
}
var Du = L(`ZodReadonly`, (e, t) => {
  (Oi.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => Za(e, t, n, r)),
    (e.unwrap = () => e._zod.def.innerType));
});
function Ou(e) {
  return new Du({ type: `readonly`, innerType: e });
}
var ku = L(`ZodCustom`, (e, t) => {
  (Ai.init(e, t),
    Q.init(e, t),
    (e._zod.processJSONSchema = (t, n, r) => za(e, t, n, r)));
});
function Au(e, t = {}) {
  return Da(ku, e, t);
}
function ju(e, t) {
  return Oa(e, t);
}
export {
  f as _,
  no as a,
  gt as c,
  xt as d,
  St as f,
  p as g,
  y as h,
  ro as i,
  Ct as l,
  mt as m,
  kl as n,
  Dt as o,
  wt as p,
  il as r,
  Tt as s,
  nu as t,
  vt as u,
};
