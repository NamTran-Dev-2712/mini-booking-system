import { a as e, n as t, t as n } from "./jsx-runtime-D0R9s8hK.js";
var r = e(t(), 1);
function i(e, t) {
  if (typeof e == `function`) return e(t);
  e != null && (e.current = t);
}
function a(...e) {
  return (t) => {
    let n = !1,
      r = e.map((e) => {
        let r = i(e, t);
        return (!n && typeof r == `function` && (n = !0), r);
      });
    if (n)
      return () => {
        for (let t = 0; t < r.length; t++) {
          let n = r[t];
          typeof n == `function` ? n() : i(e[t], null);
        }
      };
  };
}
function o(...e) {
  return r.useCallback(a(...e), e);
}
var s = n();
function c(e) {
  let t = u(e),
    n = r.forwardRef((e, n) => {
      let { children: i, ...a } = e,
        o = r.Children.toArray(i),
        c = o.find(d);
      if (c) {
        let e = c.props.children,
          i = o.map((t) =>
            t === c
              ? r.Children.count(e) > 1
                ? r.Children.only(null)
                : r.isValidElement(e)
                  ? e.props.children
                  : null
              : t,
          );
        return (0, s.jsx)(t, {
          ...a,
          ref: n,
          children: r.isValidElement(e) ? r.cloneElement(e, void 0, i) : null,
        });
      }
      return (0, s.jsx)(t, { ...a, ref: n, children: i });
    });
  return ((n.displayName = `${e}.Slot`), n);
}
var l = c(`Slot`);
function u(e) {
  let t = r.forwardRef((e, t) => {
    let { children: n, ...i } = e;
    if (r.isValidElement(n)) {
      let e = p(n),
        o = f(i, n.props);
      return (
        n.type !== r.Fragment && (o.ref = t ? a(t, e) : e),
        r.cloneElement(n, o)
      );
    }
    return r.Children.count(n) > 1 ? r.Children.only(null) : null;
  });
  return ((t.displayName = `${e}.SlotClone`), t);
}
var ee = Symbol(`radix.slottable`);
function d(e) {
  return (
    r.isValidElement(e) &&
    typeof e.type == `function` &&
    `__radixId` in e.type &&
    e.type.__radixId === ee
  );
}
function f(e, t) {
  let n = { ...t };
  for (let r in t) {
    let i = e[r],
      a = t[r];
    /^on[A-Z]/.test(r)
      ? i && a
        ? (n[r] = (...e) => {
            let t = a(...e);
            return (i(...e), t);
          })
        : i && (n[r] = i)
      : r === `style`
        ? (n[r] = { ...i, ...a })
        : r === `className` && (n[r] = [i, a].filter(Boolean).join(` `));
  }
  return { ...e, ...n };
}
function p(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, `ref`)?.get,
    n = t && `isReactWarning` in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, `ref`)?.get),
      (n = t && `isReactWarning` in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
function m(e) {
  var t,
    n,
    r = ``;
  if (typeof e == `string` || typeof e == `number`) r += e;
  else if (typeof e == `object`)
    if (Array.isArray(e)) {
      var i = e.length;
      for (t = 0; t < i; t++)
        e[t] && (n = m(e[t])) && (r && (r += ` `), (r += n));
    } else for (n in e) e[n] && (r && (r += ` `), (r += n));
  return r;
}
function h() {
  for (var e, t, n = 0, r = ``, i = arguments.length; n < i; n++)
    (e = arguments[n]) && (t = m(e)) && (r && (r += ` `), (r += t));
  return r;
}
var g = (e, t) => {
    let n = Array(e.length + t.length);
    for (let t = 0; t < e.length; t++) n[t] = e[t];
    for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
    return n;
  },
  _ = (e, t) => ({ classGroupId: e, validator: t }),
  v = (e = new Map(), t = null, n) => ({
    nextPart: e,
    validators: t,
    classGroupId: n,
  }),
  y = `-`,
  b = [],
  te = `arbitrary..`,
  ne = (e) => {
    let t = re(e),
      { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
    return {
      getClassGroupId: (e) => {
        if (e.startsWith(`[`) && e.endsWith(`]`)) return S(e);
        let n = e.split(y);
        return x(n, +(n[0] === `` && n.length > 1), t);
      },
      getConflictingClassGroupIds: (e, t) => {
        if (t) {
          let t = r[e],
            i = n[e];
          return t ? (i ? g(i, t) : t) : i || b;
        }
        return n[e] || b;
      },
    };
  },
  x = (e, t, n) => {
    if (e.length - t === 0) return n.classGroupId;
    let r = e[t],
      i = n.nextPart.get(r);
    if (i) {
      let n = x(e, t + 1, i);
      if (n) return n;
    }
    let a = n.validators;
    if (a === null) return;
    let o = t === 0 ? e.join(y) : e.slice(t).join(y),
      s = a.length;
    for (let e = 0; e < s; e++) {
      let t = a[e];
      if (t.validator(o)) return t.classGroupId;
    }
  },
  S = (e) =>
    e.slice(1, -1).indexOf(`:`) === -1
      ? void 0
      : (() => {
          let t = e.slice(1, -1),
            n = t.indexOf(`:`),
            r = t.slice(0, n);
          return r ? te + r : void 0;
        })(),
  re = (e) => {
    let { theme: t, classGroups: n } = e;
    return ie(n, t);
  },
  ie = (e, t) => {
    let n = v();
    for (let r in e) {
      let i = e[r];
      C(i, n, r, t);
    }
    return n;
  },
  C = (e, t, n, r) => {
    let i = e.length;
    for (let a = 0; a < i; a++) {
      let i = e[a];
      ae(i, t, n, r);
    }
  },
  ae = (e, t, n, r) => {
    if (typeof e == `string`) {
      w(e, t, n);
      return;
    }
    if (typeof e == `function`) {
      T(e, t, n, r);
      return;
    }
    E(e, t, n, r);
  },
  w = (e, t, n) => {
    let r = e === `` ? t : D(t, e);
    r.classGroupId = n;
  },
  T = (e, t, n, r) => {
    if (O(e)) {
      C(e(r), t, n, r);
      return;
    }
    (t.validators === null && (t.validators = []), t.validators.push(_(n, e)));
  },
  E = (e, t, n, r) => {
    let i = Object.entries(e),
      a = i.length;
    for (let e = 0; e < a; e++) {
      let [a, o] = i[e];
      C(o, D(t, a), n, r);
    }
  },
  D = (e, t) => {
    let n = e,
      r = t.split(y),
      i = r.length;
    for (let e = 0; e < i; e++) {
      let t = r[e],
        i = n.nextPart.get(t);
      (i || ((i = v()), n.nextPart.set(t, i)), (n = i));
    }
    return n;
  },
  O = (e) => `isThemeGetter` in e && e.isThemeGetter === !0,
  k = (e) => {
    if (e < 1) return { get: () => void 0, set: () => {} };
    let t = 0,
      n = Object.create(null),
      r = Object.create(null),
      i = (i, a) => {
        ((n[i] = a),
          t++,
          t > e && ((t = 0), (r = n), (n = Object.create(null))));
      };
    return {
      get(e) {
        let t = n[e];
        if (t !== void 0) return t;
        if ((t = r[e]) !== void 0) return (i(e, t), t);
      },
      set(e, t) {
        e in n ? (n[e] = t) : i(e, t);
      },
    };
  },
  A = `!`,
  j = `:`,
  oe = [],
  M = (e, t, n, r, i) => ({
    modifiers: e,
    hasImportantModifier: t,
    baseClassName: n,
    maybePostfixModifierPosition: r,
    isExternal: i,
  }),
  N = (e) => {
    let { prefix: t, experimentalParseClassName: n } = e,
      r = (e) => {
        let t = [],
          n = 0,
          r = 0,
          i = 0,
          a,
          o = e.length;
        for (let s = 0; s < o; s++) {
          let o = e[s];
          if (n === 0 && r === 0) {
            if (o === j) {
              (t.push(e.slice(i, s)), (i = s + 1));
              continue;
            }
            if (o === `/`) {
              a = s;
              continue;
            }
          }
          o === `[`
            ? n++
            : o === `]`
              ? n--
              : o === `(`
                ? r++
                : o === `)` && r--;
        }
        let s = t.length === 0 ? e : e.slice(i),
          c = s,
          l = !1;
        s.endsWith(A)
          ? ((c = s.slice(0, -1)), (l = !0))
          : s.startsWith(A) && ((c = s.slice(1)), (l = !0));
        let u = a && a > i ? a - i : void 0;
        return M(t, l, c, u);
      };
    if (t) {
      let e = t + j,
        n = r;
      r = (t) =>
        t.startsWith(e) ? n(t.slice(e.length)) : M(oe, !1, t, void 0, !0);
    }
    if (n) {
      let e = r;
      r = (t) => n({ className: t, parseClassName: e });
    }
    return r;
  },
  P = (e) => {
    let t = new Map();
    return (
      e.orderSensitiveModifiers.forEach((e, n) => {
        t.set(e, 1e6 + n);
      }),
      (e) => {
        let n = [],
          r = [];
        for (let i = 0; i < e.length; i++) {
          let a = e[i],
            o = a[0] === `[`,
            s = t.has(a);
          o || s
            ? (r.length > 0 && (r.sort(), n.push(...r), (r = [])), n.push(a))
            : r.push(a);
        }
        return (r.length > 0 && (r.sort(), n.push(...r)), n);
      }
    );
  },
  F = (e) => ({
    cache: k(e.cacheSize),
    parseClassName: N(e),
    sortModifiers: P(e),
    ...ne(e),
  }),
  I = /\s+/,
  se = (e, t) => {
    let {
        parseClassName: n,
        getClassGroupId: r,
        getConflictingClassGroupIds: i,
        sortModifiers: a,
      } = t,
      o = [],
      s = e.trim().split(I),
      c = ``;
    for (let e = s.length - 1; e >= 0; --e) {
      let t = s[e],
        {
          isExternal: l,
          modifiers: u,
          hasImportantModifier: ee,
          baseClassName: d,
          maybePostfixModifierPosition: f,
        } = n(t);
      if (l) {
        c = t + (c.length > 0 ? ` ` + c : c);
        continue;
      }
      let p = !!f,
        m = r(p ? d.substring(0, f) : d);
      if (!m) {
        if (!p) {
          c = t + (c.length > 0 ? ` ` + c : c);
          continue;
        }
        if (((m = r(d)), !m)) {
          c = t + (c.length > 0 ? ` ` + c : c);
          continue;
        }
        p = !1;
      }
      let h = u.length === 0 ? `` : u.length === 1 ? u[0] : a(u).join(`:`),
        g = ee ? h + A : h,
        _ = g + m;
      if (o.indexOf(_) > -1) continue;
      o.push(_);
      let v = i(m, p);
      for (let e = 0; e < v.length; ++e) {
        let t = v[e];
        o.push(g + t);
      }
      c = t + (c.length > 0 ? ` ` + c : c);
    }
    return c;
  },
  L = (...e) => {
    let t = 0,
      n,
      r,
      i = ``;
    for (; t < e.length; )
      (n = e[t++]) && (r = R(n)) && (i && (i += ` `), (i += r));
    return i;
  },
  R = (e) => {
    if (typeof e == `string`) return e;
    let t,
      n = ``;
    for (let r = 0; r < e.length; r++)
      e[r] && (t = R(e[r])) && (n && (n += ` `), (n += t));
    return n;
  },
  z = (e, ...t) => {
    let n,
      r,
      i,
      a,
      o = (o) => (
        (n = F(t.reduce((e, t) => t(e), e()))),
        (r = n.cache.get),
        (i = n.cache.set),
        (a = s),
        s(o)
      ),
      s = (e) => {
        let t = r(e);
        if (t) return t;
        let a = se(e, n);
        return (i(e, a), a);
      };
    return ((a = o), (...e) => a(L(...e)));
  },
  B = [],
  V = (e) => {
    let t = (t) => t[e] || B;
    return ((t.isThemeGetter = !0), t);
  },
  H = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  U = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  ce = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,
  le = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  ue =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  de = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  fe = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  pe =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  W = (e) => ce.test(e),
  G = (e) => !!e && !Number.isNaN(Number(e)),
  K = (e) => !!e && Number.isInteger(Number(e)),
  me = (e) => e.endsWith(`%`) && G(e.slice(0, -1)),
  q = (e) => le.test(e),
  he = () => !0,
  ge = (e) => ue.test(e) && !de.test(e),
  _e = () => !1,
  ve = (e) => fe.test(e),
  ye = (e) => pe.test(e),
  be = (e) => !J(e) && !X(e),
  xe = (e) => Q(e, Ie, _e),
  J = (e) => H.test(e),
  Y = (e) => Q(e, Le, ge),
  Se = (e) => Q(e, Re, G),
  Ce = (e) => Q(e, Be, he),
  we = (e) => Q(e, ze, _e),
  Te = (e) => Q(e, Pe, _e),
  Ee = (e) => Q(e, Fe, ye),
  De = (e) => Q(e, Ve, ve),
  X = (e) => U.test(e),
  Z = (e) => $(e, Le),
  Oe = (e) => $(e, ze),
  ke = (e) => $(e, Pe),
  Ae = (e) => $(e, Ie),
  je = (e) => $(e, Fe),
  Me = (e) => $(e, Ve, !0),
  Ne = (e) => $(e, Be, !0),
  Q = (e, t, n) => {
    let r = H.exec(e);
    return r ? (r[1] ? t(r[1]) : n(r[2])) : !1;
  },
  $ = (e, t, n = !1) => {
    let r = U.exec(e);
    return r ? (r[1] ? t(r[1]) : n) : !1;
  },
  Pe = (e) => e === `position` || e === `percentage`,
  Fe = (e) => e === `image` || e === `url`,
  Ie = (e) => e === `length` || e === `size` || e === `bg-size`,
  Le = (e) => e === `length`,
  Re = (e) => e === `number`,
  ze = (e) => e === `family-name`,
  Be = (e) => e === `number` || e === `weight`,
  Ve = (e) => e === `shadow`,
  He = z(() => {
    let e = V(`color`),
      t = V(`font`),
      n = V(`text`),
      r = V(`font-weight`),
      i = V(`tracking`),
      a = V(`leading`),
      o = V(`breakpoint`),
      s = V(`container`),
      c = V(`spacing`),
      l = V(`radius`),
      u = V(`shadow`),
      ee = V(`inset-shadow`),
      d = V(`text-shadow`),
      f = V(`drop-shadow`),
      p = V(`blur`),
      m = V(`perspective`),
      h = V(`aspect`),
      g = V(`ease`),
      _ = V(`animate`),
      v = () => [
        `auto`,
        `avoid`,
        `all`,
        `avoid-page`,
        `page`,
        `left`,
        `right`,
        `column`,
      ],
      y = () => [
        `center`,
        `top`,
        `bottom`,
        `left`,
        `right`,
        `top-left`,
        `left-top`,
        `top-right`,
        `right-top`,
        `bottom-right`,
        `right-bottom`,
        `bottom-left`,
        `left-bottom`,
      ],
      b = () => [...y(), X, J],
      te = () => [`auto`, `hidden`, `clip`, `visible`, `scroll`],
      ne = () => [`auto`, `contain`, `none`],
      x = () => [X, J, c],
      S = () => [W, `full`, `auto`, ...x()],
      re = () => [K, `none`, `subgrid`, X, J],
      ie = () => [`auto`, { span: [`full`, K, X, J] }, K, X, J],
      C = () => [K, `auto`, X, J],
      ae = () => [`auto`, `min`, `max`, `fr`, X, J],
      w = () => [
        `start`,
        `end`,
        `center`,
        `between`,
        `around`,
        `evenly`,
        `stretch`,
        `baseline`,
        `center-safe`,
        `end-safe`,
      ],
      T = () => [
        `start`,
        `end`,
        `center`,
        `stretch`,
        `center-safe`,
        `end-safe`,
      ],
      E = () => [`auto`, ...x()],
      D = () => [
        W,
        `auto`,
        `full`,
        `dvw`,
        `dvh`,
        `lvw`,
        `lvh`,
        `svw`,
        `svh`,
        `min`,
        `max`,
        `fit`,
        ...x(),
      ],
      O = () => [
        W,
        `screen`,
        `full`,
        `dvw`,
        `lvw`,
        `svw`,
        `min`,
        `max`,
        `fit`,
        ...x(),
      ],
      k = () => [
        W,
        `screen`,
        `full`,
        `lh`,
        `dvh`,
        `lvh`,
        `svh`,
        `min`,
        `max`,
        `fit`,
        ...x(),
      ],
      A = () => [e, X, J],
      j = () => [...y(), ke, Te, { position: [X, J] }],
      oe = () => [`no-repeat`, { repeat: [``, `x`, `y`, `space`, `round`] }],
      M = () => [`auto`, `cover`, `contain`, Ae, xe, { size: [X, J] }],
      N = () => [me, Z, Y],
      P = () => [``, `none`, `full`, l, X, J],
      F = () => [``, G, Z, Y],
      I = () => [`solid`, `dashed`, `dotted`, `double`],
      se = () => [
        `normal`,
        `multiply`,
        `screen`,
        `overlay`,
        `darken`,
        `lighten`,
        `color-dodge`,
        `color-burn`,
        `hard-light`,
        `soft-light`,
        `difference`,
        `exclusion`,
        `hue`,
        `saturation`,
        `color`,
        `luminosity`,
      ],
      L = () => [G, me, ke, Te],
      R = () => [``, `none`, p, X, J],
      z = () => [`none`, G, X, J],
      B = () => [`none`, G, X, J],
      H = () => [G, X, J],
      U = () => [W, `full`, ...x()];
    return {
      cacheSize: 500,
      theme: {
        animate: [`spin`, `ping`, `pulse`, `bounce`],
        aspect: [`video`],
        blur: [q],
        breakpoint: [q],
        color: [he],
        container: [q],
        "drop-shadow": [q],
        ease: [`in`, `out`, `in-out`],
        font: [be],
        "font-weight": [
          `thin`,
          `extralight`,
          `light`,
          `normal`,
          `medium`,
          `semibold`,
          `bold`,
          `extrabold`,
          `black`,
        ],
        "inset-shadow": [q],
        leading: [`none`, `tight`, `snug`, `normal`, `relaxed`, `loose`],
        perspective: [
          `dramatic`,
          `near`,
          `normal`,
          `midrange`,
          `distant`,
          `none`,
        ],
        radius: [q],
        shadow: [q],
        spacing: [`px`, G],
        text: [q],
        "text-shadow": [q],
        tracking: [`tighter`, `tight`, `normal`, `wide`, `wider`, `widest`],
      },
      classGroups: {
        aspect: [{ aspect: [`auto`, `square`, W, J, X, h] }],
        container: [`container`],
        columns: [{ columns: [G, J, X, s] }],
        "break-after": [{ "break-after": v() }],
        "break-before": [{ "break-before": v() }],
        "break-inside": [
          { "break-inside": [`auto`, `avoid`, `avoid-page`, `avoid-column`] },
        ],
        "box-decoration": [{ "box-decoration": [`slice`, `clone`] }],
        box: [{ box: [`border`, `content`] }],
        display: [
          `block`,
          `inline-block`,
          `inline`,
          `flex`,
          `inline-flex`,
          `table`,
          `inline-table`,
          `table-caption`,
          `table-cell`,
          `table-column`,
          `table-column-group`,
          `table-footer-group`,
          `table-header-group`,
          `table-row-group`,
          `table-row`,
          `flow-root`,
          `grid`,
          `inline-grid`,
          `contents`,
          `list-item`,
          `hidden`,
        ],
        sr: [`sr-only`, `not-sr-only`],
        float: [{ float: [`right`, `left`, `none`, `start`, `end`] }],
        clear: [{ clear: [`left`, `right`, `both`, `none`, `start`, `end`] }],
        isolation: [`isolate`, `isolation-auto`],
        "object-fit": [
          { object: [`contain`, `cover`, `fill`, `none`, `scale-down`] },
        ],
        "object-position": [{ object: b() }],
        overflow: [{ overflow: te() }],
        "overflow-x": [{ "overflow-x": te() }],
        "overflow-y": [{ "overflow-y": te() }],
        overscroll: [{ overscroll: ne() }],
        "overscroll-x": [{ "overscroll-x": ne() }],
        "overscroll-y": [{ "overscroll-y": ne() }],
        position: [`static`, `fixed`, `absolute`, `relative`, `sticky`],
        inset: [{ inset: S() }],
        "inset-x": [{ "inset-x": S() }],
        "inset-y": [{ "inset-y": S() }],
        start: [{ "inset-s": S(), start: S() }],
        end: [{ "inset-e": S(), end: S() }],
        "inset-bs": [{ "inset-bs": S() }],
        "inset-be": [{ "inset-be": S() }],
        top: [{ top: S() }],
        right: [{ right: S() }],
        bottom: [{ bottom: S() }],
        left: [{ left: S() }],
        visibility: [`visible`, `invisible`, `collapse`],
        z: [{ z: [K, `auto`, X, J] }],
        basis: [{ basis: [W, `full`, `auto`, s, ...x()] }],
        "flex-direction": [
          { flex: [`row`, `row-reverse`, `col`, `col-reverse`] },
        ],
        "flex-wrap": [{ flex: [`nowrap`, `wrap`, `wrap-reverse`] }],
        flex: [{ flex: [G, W, `auto`, `initial`, `none`, J] }],
        grow: [{ grow: [``, G, X, J] }],
        shrink: [{ shrink: [``, G, X, J] }],
        order: [{ order: [K, `first`, `last`, `none`, X, J] }],
        "grid-cols": [{ "grid-cols": re() }],
        "col-start-end": [{ col: ie() }],
        "col-start": [{ "col-start": C() }],
        "col-end": [{ "col-end": C() }],
        "grid-rows": [{ "grid-rows": re() }],
        "row-start-end": [{ row: ie() }],
        "row-start": [{ "row-start": C() }],
        "row-end": [{ "row-end": C() }],
        "grid-flow": [
          { "grid-flow": [`row`, `col`, `dense`, `row-dense`, `col-dense`] },
        ],
        "auto-cols": [{ "auto-cols": ae() }],
        "auto-rows": [{ "auto-rows": ae() }],
        gap: [{ gap: x() }],
        "gap-x": [{ "gap-x": x() }],
        "gap-y": [{ "gap-y": x() }],
        "justify-content": [{ justify: [...w(), `normal`] }],
        "justify-items": [{ "justify-items": [...T(), `normal`] }],
        "justify-self": [{ "justify-self": [`auto`, ...T()] }],
        "align-content": [{ content: [`normal`, ...w()] }],
        "align-items": [{ items: [...T(), { baseline: [``, `last`] }] }],
        "align-self": [{ self: [`auto`, ...T(), { baseline: [``, `last`] }] }],
        "place-content": [{ "place-content": w() }],
        "place-items": [{ "place-items": [...T(), `baseline`] }],
        "place-self": [{ "place-self": [`auto`, ...T()] }],
        p: [{ p: x() }],
        px: [{ px: x() }],
        py: [{ py: x() }],
        ps: [{ ps: x() }],
        pe: [{ pe: x() }],
        pbs: [{ pbs: x() }],
        pbe: [{ pbe: x() }],
        pt: [{ pt: x() }],
        pr: [{ pr: x() }],
        pb: [{ pb: x() }],
        pl: [{ pl: x() }],
        m: [{ m: E() }],
        mx: [{ mx: E() }],
        my: [{ my: E() }],
        ms: [{ ms: E() }],
        me: [{ me: E() }],
        mbs: [{ mbs: E() }],
        mbe: [{ mbe: E() }],
        mt: [{ mt: E() }],
        mr: [{ mr: E() }],
        mb: [{ mb: E() }],
        ml: [{ ml: E() }],
        "space-x": [{ "space-x": x() }],
        "space-x-reverse": [`space-x-reverse`],
        "space-y": [{ "space-y": x() }],
        "space-y-reverse": [`space-y-reverse`],
        size: [{ size: D() }],
        "inline-size": [{ inline: [`auto`, ...O()] }],
        "min-inline-size": [{ "min-inline": [`auto`, ...O()] }],
        "max-inline-size": [{ "max-inline": [`none`, ...O()] }],
        "block-size": [{ block: [`auto`, ...k()] }],
        "min-block-size": [{ "min-block": [`auto`, ...k()] }],
        "max-block-size": [{ "max-block": [`none`, ...k()] }],
        w: [{ w: [s, `screen`, ...D()] }],
        "min-w": [{ "min-w": [s, `screen`, `none`, ...D()] }],
        "max-w": [
          { "max-w": [s, `screen`, `none`, `prose`, { screen: [o] }, ...D()] },
        ],
        h: [{ h: [`screen`, `lh`, ...D()] }],
        "min-h": [{ "min-h": [`screen`, `lh`, `none`, ...D()] }],
        "max-h": [{ "max-h": [`screen`, `lh`, ...D()] }],
        "font-size": [{ text: [`base`, n, Z, Y] }],
        "font-smoothing": [`antialiased`, `subpixel-antialiased`],
        "font-style": [`italic`, `not-italic`],
        "font-weight": [{ font: [r, Ne, Ce] }],
        "font-stretch": [
          {
            "font-stretch": [
              `ultra-condensed`,
              `extra-condensed`,
              `condensed`,
              `semi-condensed`,
              `normal`,
              `semi-expanded`,
              `expanded`,
              `extra-expanded`,
              `ultra-expanded`,
              me,
              J,
            ],
          },
        ],
        "font-family": [{ font: [Oe, we, t] }],
        "font-features": [{ "font-features": [J] }],
        "fvn-normal": [`normal-nums`],
        "fvn-ordinal": [`ordinal`],
        "fvn-slashed-zero": [`slashed-zero`],
        "fvn-figure": [`lining-nums`, `oldstyle-nums`],
        "fvn-spacing": [`proportional-nums`, `tabular-nums`],
        "fvn-fraction": [`diagonal-fractions`, `stacked-fractions`],
        tracking: [{ tracking: [i, X, J] }],
        "line-clamp": [{ "line-clamp": [G, `none`, X, Se] }],
        leading: [{ leading: [a, ...x()] }],
        "list-image": [{ "list-image": [`none`, X, J] }],
        "list-style-position": [{ list: [`inside`, `outside`] }],
        "list-style-type": [{ list: [`disc`, `decimal`, `none`, X, J] }],
        "text-alignment": [
          { text: [`left`, `center`, `right`, `justify`, `start`, `end`] },
        ],
        "placeholder-color": [{ placeholder: A() }],
        "text-color": [{ text: A() }],
        "text-decoration": [
          `underline`,
          `overline`,
          `line-through`,
          `no-underline`,
        ],
        "text-decoration-style": [{ decoration: [...I(), `wavy`] }],
        "text-decoration-thickness": [
          { decoration: [G, `from-font`, `auto`, X, Y] },
        ],
        "text-decoration-color": [{ decoration: A() }],
        "underline-offset": [{ "underline-offset": [G, `auto`, X, J] }],
        "text-transform": [
          `uppercase`,
          `lowercase`,
          `capitalize`,
          `normal-case`,
        ],
        "text-overflow": [`truncate`, `text-ellipsis`, `text-clip`],
        "text-wrap": [{ text: [`wrap`, `nowrap`, `balance`, `pretty`] }],
        indent: [{ indent: x() }],
        "vertical-align": [
          {
            align: [
              `baseline`,
              `top`,
              `middle`,
              `bottom`,
              `text-top`,
              `text-bottom`,
              `sub`,
              `super`,
              X,
              J,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              `normal`,
              `nowrap`,
              `pre`,
              `pre-line`,
              `pre-wrap`,
              `break-spaces`,
            ],
          },
        ],
        break: [{ break: [`normal`, `words`, `all`, `keep`] }],
        wrap: [{ wrap: [`break-word`, `anywhere`, `normal`] }],
        hyphens: [{ hyphens: [`none`, `manual`, `auto`] }],
        content: [{ content: [`none`, X, J] }],
        "bg-attachment": [{ bg: [`fixed`, `local`, `scroll`] }],
        "bg-clip": [{ "bg-clip": [`border`, `padding`, `content`, `text`] }],
        "bg-origin": [{ "bg-origin": [`border`, `padding`, `content`] }],
        "bg-position": [{ bg: j() }],
        "bg-repeat": [{ bg: oe() }],
        "bg-size": [{ bg: M() }],
        "bg-image": [
          {
            bg: [
              `none`,
              {
                linear: [
                  { to: [`t`, `tr`, `r`, `br`, `b`, `bl`, `l`, `tl`] },
                  K,
                  X,
                  J,
                ],
                radial: [``, X, J],
                conic: [K, X, J],
              },
              je,
              Ee,
            ],
          },
        ],
        "bg-color": [{ bg: A() }],
        "gradient-from-pos": [{ from: N() }],
        "gradient-via-pos": [{ via: N() }],
        "gradient-to-pos": [{ to: N() }],
        "gradient-from": [{ from: A() }],
        "gradient-via": [{ via: A() }],
        "gradient-to": [{ to: A() }],
        rounded: [{ rounded: P() }],
        "rounded-s": [{ "rounded-s": P() }],
        "rounded-e": [{ "rounded-e": P() }],
        "rounded-t": [{ "rounded-t": P() }],
        "rounded-r": [{ "rounded-r": P() }],
        "rounded-b": [{ "rounded-b": P() }],
        "rounded-l": [{ "rounded-l": P() }],
        "rounded-ss": [{ "rounded-ss": P() }],
        "rounded-se": [{ "rounded-se": P() }],
        "rounded-ee": [{ "rounded-ee": P() }],
        "rounded-es": [{ "rounded-es": P() }],
        "rounded-tl": [{ "rounded-tl": P() }],
        "rounded-tr": [{ "rounded-tr": P() }],
        "rounded-br": [{ "rounded-br": P() }],
        "rounded-bl": [{ "rounded-bl": P() }],
        "border-w": [{ border: F() }],
        "border-w-x": [{ "border-x": F() }],
        "border-w-y": [{ "border-y": F() }],
        "border-w-s": [{ "border-s": F() }],
        "border-w-e": [{ "border-e": F() }],
        "border-w-bs": [{ "border-bs": F() }],
        "border-w-be": [{ "border-be": F() }],
        "border-w-t": [{ "border-t": F() }],
        "border-w-r": [{ "border-r": F() }],
        "border-w-b": [{ "border-b": F() }],
        "border-w-l": [{ "border-l": F() }],
        "divide-x": [{ "divide-x": F() }],
        "divide-x-reverse": [`divide-x-reverse`],
        "divide-y": [{ "divide-y": F() }],
        "divide-y-reverse": [`divide-y-reverse`],
        "border-style": [{ border: [...I(), `hidden`, `none`] }],
        "divide-style": [{ divide: [...I(), `hidden`, `none`] }],
        "border-color": [{ border: A() }],
        "border-color-x": [{ "border-x": A() }],
        "border-color-y": [{ "border-y": A() }],
        "border-color-s": [{ "border-s": A() }],
        "border-color-e": [{ "border-e": A() }],
        "border-color-bs": [{ "border-bs": A() }],
        "border-color-be": [{ "border-be": A() }],
        "border-color-t": [{ "border-t": A() }],
        "border-color-r": [{ "border-r": A() }],
        "border-color-b": [{ "border-b": A() }],
        "border-color-l": [{ "border-l": A() }],
        "divide-color": [{ divide: A() }],
        "outline-style": [{ outline: [...I(), `none`, `hidden`] }],
        "outline-offset": [{ "outline-offset": [G, X, J] }],
        "outline-w": [{ outline: [``, G, Z, Y] }],
        "outline-color": [{ outline: A() }],
        shadow: [{ shadow: [``, `none`, u, Me, De] }],
        "shadow-color": [{ shadow: A() }],
        "inset-shadow": [{ "inset-shadow": [`none`, ee, Me, De] }],
        "inset-shadow-color": [{ "inset-shadow": A() }],
        "ring-w": [{ ring: F() }],
        "ring-w-inset": [`ring-inset`],
        "ring-color": [{ ring: A() }],
        "ring-offset-w": [{ "ring-offset": [G, Y] }],
        "ring-offset-color": [{ "ring-offset": A() }],
        "inset-ring-w": [{ "inset-ring": F() }],
        "inset-ring-color": [{ "inset-ring": A() }],
        "text-shadow": [{ "text-shadow": [`none`, d, Me, De] }],
        "text-shadow-color": [{ "text-shadow": A() }],
        opacity: [{ opacity: [G, X, J] }],
        "mix-blend": [
          { "mix-blend": [...se(), `plus-darker`, `plus-lighter`] },
        ],
        "bg-blend": [{ "bg-blend": se() }],
        "mask-clip": [
          {
            "mask-clip": [
              `border`,
              `padding`,
              `content`,
              `fill`,
              `stroke`,
              `view`,
            ],
          },
          `mask-no-clip`,
        ],
        "mask-composite": [
          { mask: [`add`, `subtract`, `intersect`, `exclude`] },
        ],
        "mask-image-linear-pos": [{ "mask-linear": [G] }],
        "mask-image-linear-from-pos": [{ "mask-linear-from": L() }],
        "mask-image-linear-to-pos": [{ "mask-linear-to": L() }],
        "mask-image-linear-from-color": [{ "mask-linear-from": A() }],
        "mask-image-linear-to-color": [{ "mask-linear-to": A() }],
        "mask-image-t-from-pos": [{ "mask-t-from": L() }],
        "mask-image-t-to-pos": [{ "mask-t-to": L() }],
        "mask-image-t-from-color": [{ "mask-t-from": A() }],
        "mask-image-t-to-color": [{ "mask-t-to": A() }],
        "mask-image-r-from-pos": [{ "mask-r-from": L() }],
        "mask-image-r-to-pos": [{ "mask-r-to": L() }],
        "mask-image-r-from-color": [{ "mask-r-from": A() }],
        "mask-image-r-to-color": [{ "mask-r-to": A() }],
        "mask-image-b-from-pos": [{ "mask-b-from": L() }],
        "mask-image-b-to-pos": [{ "mask-b-to": L() }],
        "mask-image-b-from-color": [{ "mask-b-from": A() }],
        "mask-image-b-to-color": [{ "mask-b-to": A() }],
        "mask-image-l-from-pos": [{ "mask-l-from": L() }],
        "mask-image-l-to-pos": [{ "mask-l-to": L() }],
        "mask-image-l-from-color": [{ "mask-l-from": A() }],
        "mask-image-l-to-color": [{ "mask-l-to": A() }],
        "mask-image-x-from-pos": [{ "mask-x-from": L() }],
        "mask-image-x-to-pos": [{ "mask-x-to": L() }],
        "mask-image-x-from-color": [{ "mask-x-from": A() }],
        "mask-image-x-to-color": [{ "mask-x-to": A() }],
        "mask-image-y-from-pos": [{ "mask-y-from": L() }],
        "mask-image-y-to-pos": [{ "mask-y-to": L() }],
        "mask-image-y-from-color": [{ "mask-y-from": A() }],
        "mask-image-y-to-color": [{ "mask-y-to": A() }],
        "mask-image-radial": [{ "mask-radial": [X, J] }],
        "mask-image-radial-from-pos": [{ "mask-radial-from": L() }],
        "mask-image-radial-to-pos": [{ "mask-radial-to": L() }],
        "mask-image-radial-from-color": [{ "mask-radial-from": A() }],
        "mask-image-radial-to-color": [{ "mask-radial-to": A() }],
        "mask-image-radial-shape": [{ "mask-radial": [`circle`, `ellipse`] }],
        "mask-image-radial-size": [
          {
            "mask-radial": [
              { closest: [`side`, `corner`], farthest: [`side`, `corner`] },
            ],
          },
        ],
        "mask-image-radial-pos": [{ "mask-radial-at": y() }],
        "mask-image-conic-pos": [{ "mask-conic": [G] }],
        "mask-image-conic-from-pos": [{ "mask-conic-from": L() }],
        "mask-image-conic-to-pos": [{ "mask-conic-to": L() }],
        "mask-image-conic-from-color": [{ "mask-conic-from": A() }],
        "mask-image-conic-to-color": [{ "mask-conic-to": A() }],
        "mask-mode": [{ mask: [`alpha`, `luminance`, `match`] }],
        "mask-origin": [
          {
            "mask-origin": [
              `border`,
              `padding`,
              `content`,
              `fill`,
              `stroke`,
              `view`,
            ],
          },
        ],
        "mask-position": [{ mask: j() }],
        "mask-repeat": [{ mask: oe() }],
        "mask-size": [{ mask: M() }],
        "mask-type": [{ "mask-type": [`alpha`, `luminance`] }],
        "mask-image": [{ mask: [`none`, X, J] }],
        filter: [{ filter: [``, `none`, X, J] }],
        blur: [{ blur: R() }],
        brightness: [{ brightness: [G, X, J] }],
        contrast: [{ contrast: [G, X, J] }],
        "drop-shadow": [{ "drop-shadow": [``, `none`, f, Me, De] }],
        "drop-shadow-color": [{ "drop-shadow": A() }],
        grayscale: [{ grayscale: [``, G, X, J] }],
        "hue-rotate": [{ "hue-rotate": [G, X, J] }],
        invert: [{ invert: [``, G, X, J] }],
        saturate: [{ saturate: [G, X, J] }],
        sepia: [{ sepia: [``, G, X, J] }],
        "backdrop-filter": [{ "backdrop-filter": [``, `none`, X, J] }],
        "backdrop-blur": [{ "backdrop-blur": R() }],
        "backdrop-brightness": [{ "backdrop-brightness": [G, X, J] }],
        "backdrop-contrast": [{ "backdrop-contrast": [G, X, J] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": [``, G, X, J] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [G, X, J] }],
        "backdrop-invert": [{ "backdrop-invert": [``, G, X, J] }],
        "backdrop-opacity": [{ "backdrop-opacity": [G, X, J] }],
        "backdrop-saturate": [{ "backdrop-saturate": [G, X, J] }],
        "backdrop-sepia": [{ "backdrop-sepia": [``, G, X, J] }],
        "border-collapse": [{ border: [`collapse`, `separate`] }],
        "border-spacing": [{ "border-spacing": x() }],
        "border-spacing-x": [{ "border-spacing-x": x() }],
        "border-spacing-y": [{ "border-spacing-y": x() }],
        "table-layout": [{ table: [`auto`, `fixed`] }],
        caption: [{ caption: [`top`, `bottom`] }],
        transition: [
          {
            transition: [
              ``,
              `all`,
              `colors`,
              `opacity`,
              `shadow`,
              `transform`,
              `none`,
              X,
              J,
            ],
          },
        ],
        "transition-behavior": [{ transition: [`normal`, `discrete`] }],
        duration: [{ duration: [G, `initial`, X, J] }],
        ease: [{ ease: [`linear`, `initial`, g, X, J] }],
        delay: [{ delay: [G, X, J] }],
        animate: [{ animate: [`none`, _, X, J] }],
        backface: [{ backface: [`hidden`, `visible`] }],
        perspective: [{ perspective: [m, X, J] }],
        "perspective-origin": [{ "perspective-origin": b() }],
        rotate: [{ rotate: z() }],
        "rotate-x": [{ "rotate-x": z() }],
        "rotate-y": [{ "rotate-y": z() }],
        "rotate-z": [{ "rotate-z": z() }],
        scale: [{ scale: B() }],
        "scale-x": [{ "scale-x": B() }],
        "scale-y": [{ "scale-y": B() }],
        "scale-z": [{ "scale-z": B() }],
        "scale-3d": [`scale-3d`],
        skew: [{ skew: H() }],
        "skew-x": [{ "skew-x": H() }],
        "skew-y": [{ "skew-y": H() }],
        transform: [{ transform: [X, J, ``, `none`, `gpu`, `cpu`] }],
        "transform-origin": [{ origin: b() }],
        "transform-style": [{ transform: [`3d`, `flat`] }],
        translate: [{ translate: U() }],
        "translate-x": [{ "translate-x": U() }],
        "translate-y": [{ "translate-y": U() }],
        "translate-z": [{ "translate-z": U() }],
        "translate-none": [`translate-none`],
        accent: [{ accent: A() }],
        appearance: [{ appearance: [`none`, `auto`] }],
        "caret-color": [{ caret: A() }],
        "color-scheme": [
          {
            scheme: [
              `normal`,
              `dark`,
              `light`,
              `light-dark`,
              `only-dark`,
              `only-light`,
            ],
          },
        ],
        cursor: [
          {
            cursor: [
              `auto`,
              `default`,
              `pointer`,
              `wait`,
              `text`,
              `move`,
              `help`,
              `not-allowed`,
              `none`,
              `context-menu`,
              `progress`,
              `cell`,
              `crosshair`,
              `vertical-text`,
              `alias`,
              `copy`,
              `no-drop`,
              `grab`,
              `grabbing`,
              `all-scroll`,
              `col-resize`,
              `row-resize`,
              `n-resize`,
              `e-resize`,
              `s-resize`,
              `w-resize`,
              `ne-resize`,
              `nw-resize`,
              `se-resize`,
              `sw-resize`,
              `ew-resize`,
              `ns-resize`,
              `nesw-resize`,
              `nwse-resize`,
              `zoom-in`,
              `zoom-out`,
              X,
              J,
            ],
          },
        ],
        "field-sizing": [{ "field-sizing": [`fixed`, `content`] }],
        "pointer-events": [{ "pointer-events": [`auto`, `none`] }],
        resize: [{ resize: [`none`, ``, `y`, `x`] }],
        "scroll-behavior": [{ scroll: [`auto`, `smooth`] }],
        "scroll-m": [{ "scroll-m": x() }],
        "scroll-mx": [{ "scroll-mx": x() }],
        "scroll-my": [{ "scroll-my": x() }],
        "scroll-ms": [{ "scroll-ms": x() }],
        "scroll-me": [{ "scroll-me": x() }],
        "scroll-mbs": [{ "scroll-mbs": x() }],
        "scroll-mbe": [{ "scroll-mbe": x() }],
        "scroll-mt": [{ "scroll-mt": x() }],
        "scroll-mr": [{ "scroll-mr": x() }],
        "scroll-mb": [{ "scroll-mb": x() }],
        "scroll-ml": [{ "scroll-ml": x() }],
        "scroll-p": [{ "scroll-p": x() }],
        "scroll-px": [{ "scroll-px": x() }],
        "scroll-py": [{ "scroll-py": x() }],
        "scroll-ps": [{ "scroll-ps": x() }],
        "scroll-pe": [{ "scroll-pe": x() }],
        "scroll-pbs": [{ "scroll-pbs": x() }],
        "scroll-pbe": [{ "scroll-pbe": x() }],
        "scroll-pt": [{ "scroll-pt": x() }],
        "scroll-pr": [{ "scroll-pr": x() }],
        "scroll-pb": [{ "scroll-pb": x() }],
        "scroll-pl": [{ "scroll-pl": x() }],
        "snap-align": [{ snap: [`start`, `end`, `center`, `align-none`] }],
        "snap-stop": [{ snap: [`normal`, `always`] }],
        "snap-type": [{ snap: [`none`, `x`, `y`, `both`] }],
        "snap-strictness": [{ snap: [`mandatory`, `proximity`] }],
        touch: [{ touch: [`auto`, `none`, `manipulation`] }],
        "touch-x": [{ "touch-pan": [`x`, `left`, `right`] }],
        "touch-y": [{ "touch-pan": [`y`, `up`, `down`] }],
        "touch-pz": [`touch-pinch-zoom`],
        select: [{ select: [`none`, `text`, `all`, `auto`] }],
        "will-change": [
          { "will-change": [`auto`, `scroll`, `contents`, `transform`, X, J] },
        ],
        fill: [{ fill: [`none`, ...A()] }],
        "stroke-w": [{ stroke: [G, Z, Y, Se] }],
        stroke: [{ stroke: [`none`, ...A()] }],
        "forced-color-adjust": [{ "forced-color-adjust": [`auto`, `none`] }],
      },
      conflictingClassGroups: {
        overflow: [`overflow-x`, `overflow-y`],
        overscroll: [`overscroll-x`, `overscroll-y`],
        inset: [
          `inset-x`,
          `inset-y`,
          `inset-bs`,
          `inset-be`,
          `start`,
          `end`,
          `top`,
          `right`,
          `bottom`,
          `left`,
        ],
        "inset-x": [`right`, `left`],
        "inset-y": [`top`, `bottom`],
        flex: [`basis`, `grow`, `shrink`],
        gap: [`gap-x`, `gap-y`],
        p: [`px`, `py`, `ps`, `pe`, `pbs`, `pbe`, `pt`, `pr`, `pb`, `pl`],
        px: [`pr`, `pl`],
        py: [`pt`, `pb`],
        m: [`mx`, `my`, `ms`, `me`, `mbs`, `mbe`, `mt`, `mr`, `mb`, `ml`],
        mx: [`mr`, `ml`],
        my: [`mt`, `mb`],
        size: [`w`, `h`],
        "font-size": [`leading`],
        "fvn-normal": [
          `fvn-ordinal`,
          `fvn-slashed-zero`,
          `fvn-figure`,
          `fvn-spacing`,
          `fvn-fraction`,
        ],
        "fvn-ordinal": [`fvn-normal`],
        "fvn-slashed-zero": [`fvn-normal`],
        "fvn-figure": [`fvn-normal`],
        "fvn-spacing": [`fvn-normal`],
        "fvn-fraction": [`fvn-normal`],
        "line-clamp": [`display`, `overflow`],
        rounded: [
          `rounded-s`,
          `rounded-e`,
          `rounded-t`,
          `rounded-r`,
          `rounded-b`,
          `rounded-l`,
          `rounded-ss`,
          `rounded-se`,
          `rounded-ee`,
          `rounded-es`,
          `rounded-tl`,
          `rounded-tr`,
          `rounded-br`,
          `rounded-bl`,
        ],
        "rounded-s": [`rounded-ss`, `rounded-es`],
        "rounded-e": [`rounded-se`, `rounded-ee`],
        "rounded-t": [`rounded-tl`, `rounded-tr`],
        "rounded-r": [`rounded-tr`, `rounded-br`],
        "rounded-b": [`rounded-br`, `rounded-bl`],
        "rounded-l": [`rounded-tl`, `rounded-bl`],
        "border-spacing": [`border-spacing-x`, `border-spacing-y`],
        "border-w": [
          `border-w-x`,
          `border-w-y`,
          `border-w-s`,
          `border-w-e`,
          `border-w-bs`,
          `border-w-be`,
          `border-w-t`,
          `border-w-r`,
          `border-w-b`,
          `border-w-l`,
        ],
        "border-w-x": [`border-w-r`, `border-w-l`],
        "border-w-y": [`border-w-t`, `border-w-b`],
        "border-color": [
          `border-color-x`,
          `border-color-y`,
          `border-color-s`,
          `border-color-e`,
          `border-color-bs`,
          `border-color-be`,
          `border-color-t`,
          `border-color-r`,
          `border-color-b`,
          `border-color-l`,
        ],
        "border-color-x": [`border-color-r`, `border-color-l`],
        "border-color-y": [`border-color-t`, `border-color-b`],
        translate: [`translate-x`, `translate-y`, `translate-none`],
        "translate-none": [
          `translate`,
          `translate-x`,
          `translate-y`,
          `translate-z`,
        ],
        "scroll-m": [
          `scroll-mx`,
          `scroll-my`,
          `scroll-ms`,
          `scroll-me`,
          `scroll-mbs`,
          `scroll-mbe`,
          `scroll-mt`,
          `scroll-mr`,
          `scroll-mb`,
          `scroll-ml`,
        ],
        "scroll-mx": [`scroll-mr`, `scroll-ml`],
        "scroll-my": [`scroll-mt`, `scroll-mb`],
        "scroll-p": [
          `scroll-px`,
          `scroll-py`,
          `scroll-ps`,
          `scroll-pe`,
          `scroll-pbs`,
          `scroll-pbe`,
          `scroll-pt`,
          `scroll-pr`,
          `scroll-pb`,
          `scroll-pl`,
        ],
        "scroll-px": [`scroll-pr`, `scroll-pl`],
        "scroll-py": [`scroll-pt`, `scroll-pb`],
        touch: [`touch-x`, `touch-y`, `touch-pz`],
        "touch-x": [`touch`],
        "touch-y": [`touch`],
        "touch-pz": [`touch`],
      },
      conflictingClassGroupModifiers: { "font-size": [`leading`] },
      orderSensitiveModifiers: [
        `*`,
        `**`,
        `after`,
        `backdrop`,
        `before`,
        `details-content`,
        `file`,
        `first-letter`,
        `first-line`,
        `marker`,
        `placeholder`,
        `selection`,
      ],
    };
  });
function Ue(...e) {
  return He(h(e));
}
var We = (e) => (typeof e == `boolean` ? `${e}` : e === 0 ? `0` : e),
  Ge = h,
  Ke = (e, t) => (n) => {
    if (t?.variants == null) return Ge(e, n?.class, n?.className);
    let { variants: r, defaultVariants: i } = t,
      a = Object.keys(r).map((e) => {
        let t = n?.[e],
          a = i?.[e];
        if (t === null) return null;
        let o = We(t) || We(a);
        return r[e][o];
      }),
      o =
        n &&
        Object.entries(n).reduce((e, t) => {
          let [n, r] = t;
          return (r === void 0 || (e[n] = r), e);
        }, {});
    return Ge(
      e,
      a,
      t?.compoundVariants?.reduce((e, t) => {
        let { class: n, className: r, ...a } = t;
        return Object.entries(a).every((e) => {
          let [t, n] = e;
          return Array.isArray(n)
            ? n.includes({ ...i, ...o }[t])
            : { ...i, ...o }[t] === n;
        })
          ? [...e, n, r]
          : e;
      }, []),
      n?.class,
      n?.className,
    );
  };
export { o as a, c as i, Ue as n, l as r, Ke as t };
