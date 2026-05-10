import { a as e, n as t } from "./jsx-runtime-CAzG7qJ5.js";
var n = e(t(), 1),
  r = `modulepreload`,
  i = function (e) {
    return `/` + e;
  },
  a = {},
  o = function (e, t, n) {
    let o = Promise.resolve();
    if (t && t.length > 0) {
      let e = document.getElementsByTagName(`link`),
        s = document.querySelector(`meta[property=csp-nonce]`),
        c = s?.nonce || s?.getAttribute(`nonce`);
      function l(e) {
        return Promise.all(
          e.map((e) =>
            Promise.resolve(e).then(
              (e) => ({ status: `fulfilled`, value: e }),
              (e) => ({ status: `rejected`, reason: e }),
            ),
          ),
        );
      }
      o = l(
        t.map((t) => {
          if (((t = i(t, n)), t in a)) return;
          a[t] = !0;
          let o = t.endsWith(`.css`),
            s = o ? `[rel="stylesheet"]` : ``;
          if (n)
            for (let n = e.length - 1; n >= 0; n--) {
              let r = e[n];
              if (r.href === t && (!o || r.rel === `stylesheet`)) return;
            }
          else if (document.querySelector(`link[href="${t}"]${s}`)) return;
          let l = document.createElement(`link`);
          if (
            ((l.rel = o ? `stylesheet` : r),
            o || (l.as = `script`),
            (l.crossOrigin = ``),
            (l.href = t),
            c && l.setAttribute(`nonce`, c),
            document.head.appendChild(l),
            o)
          )
            return new Promise((e, n) => {
              (l.addEventListener(`load`, e),
                l.addEventListener(`error`, () =>
                  n(Error(`Unable to preload CSS for ${t}`)),
                ));
            });
        }),
      );
    }
    function s(e) {
      let t = new Event(`vite:preloadError`, { cancelable: !0 });
      if (((t.payload = e), window.dispatchEvent(t), !t.defaultPrevented))
        throw e;
    }
    return o.then((t) => {
      for (let e of t || []) e.status === `rejected` && s(e.reason);
      return e().catch(s);
    });
  },
  s = (e) => {
    throw TypeError(e);
  },
  c = (e, t, n) => t.has(e) || s(`Cannot ` + n),
  l = (e, t, n) => (
    c(e, t, `read from private field`),
    n ? n.call(e) : t.get(e)
  ),
  u = (e, t, n) =>
    t.has(e)
      ? s(`Cannot add the same private member more than once`)
      : t instanceof WeakSet
        ? t.add(e)
        : t.set(e, n),
  d = (e, t, n, r) => (
    c(e, t, `write to private field`),
    r ? r.call(e, n) : t.set(e, n),
    n
  ),
  f = `popstate`;
function p(e) {
  return (
    typeof e == `object` &&
    !!e &&
    `pathname` in e &&
    `search` in e &&
    `hash` in e &&
    `state` in e &&
    `key` in e
  );
}
function m(e = {}) {
  function t(e, t) {
    let n = t.state?.masked,
      { pathname: r, search: i, hash: a } = n || e.location;
    return y(
      ``,
      { pathname: r, search: i, hash: a },
      (t.state && t.state.usr) || null,
      (t.state && t.state.key) || `default`,
      n
        ? {
            pathname: e.location.pathname,
            search: e.location.search,
            hash: e.location.hash,
          }
        : void 0,
    );
  }
  function n(e, t) {
    return typeof t == `string` ? t : b(t);
  }
  return S(t, n, null, e);
}
function h(e, t) {
  if (e === !1 || e == null) throw Error(t);
}
function g(e, t) {
  if (!e) {
    typeof console < `u` && console.warn(t);
    try {
      throw Error(t);
    } catch {}
  }
}
function _() {
  return Math.random().toString(36).substring(2, 10);
}
function v(e, t) {
  return {
    usr: e.state,
    key: e.key,
    idx: t,
    masked: e.mask
      ? { pathname: e.pathname, search: e.search, hash: e.hash }
      : void 0,
  };
}
function y(e, t, n = null, r, i) {
  return {
    pathname: typeof e == `string` ? e : e.pathname,
    search: ``,
    hash: ``,
    ...(typeof t == `string` ? x(t) : t),
    state: n,
    key: (t && t.key) || r || _(),
    mask: i,
  };
}
function b({ pathname: e = `/`, search: t = ``, hash: n = `` }) {
  return (
    t && t !== `?` && (e += t.charAt(0) === `?` ? t : `?` + t),
    n && n !== `#` && (e += n.charAt(0) === `#` ? n : `#` + n),
    e
  );
}
function x(e) {
  let t = {};
  if (e) {
    let n = e.indexOf(`#`);
    n >= 0 && ((t.hash = e.substring(n)), (e = e.substring(0, n)));
    let r = e.indexOf(`?`);
    (r >= 0 && ((t.search = e.substring(r)), (e = e.substring(0, r))),
      e && (t.pathname = e));
  }
  return t;
}
function S(e, t, n, r = {}) {
  let { window: i = document.defaultView, v5Compat: a = !1 } = r,
    o = i.history,
    s = `POP`,
    c = null,
    l = u();
  l ?? ((l = 0), o.replaceState({ ...o.state, idx: l }, ``));
  function u() {
    return (o.state || { idx: null }).idx;
  }
  function d() {
    s = `POP`;
    let e = u(),
      t = e == null ? null : e - l;
    ((l = e), c && c({ action: s, location: _.location, delta: t }));
  }
  function m(e, t) {
    s = `PUSH`;
    let r = p(e) ? e : y(_.location, e, t);
    (n && n(r, e), (l = u() + 1));
    let d = v(r, l),
      f = _.createHref(r.mask || r);
    try {
      o.pushState(d, ``, f);
    } catch (e) {
      if (e instanceof DOMException && e.name === `DataCloneError`) throw e;
      i.location.assign(f);
    }
    a && c && c({ action: s, location: _.location, delta: 1 });
  }
  function h(e, t) {
    s = `REPLACE`;
    let r = p(e) ? e : y(_.location, e, t);
    (n && n(r, e), (l = u()));
    let i = v(r, l),
      d = _.createHref(r.mask || r);
    (o.replaceState(i, ``, d),
      a && c && c({ action: s, location: _.location, delta: 0 }));
  }
  function g(e) {
    return C(e);
  }
  let _ = {
    get action() {
      return s;
    },
    get location() {
      return e(i, o);
    },
    listen(e) {
      if (c) throw Error(`A history only accepts one active listener`);
      return (
        i.addEventListener(f, d),
        (c = e),
        () => {
          (i.removeEventListener(f, d), (c = null));
        }
      );
    },
    createHref(e) {
      return t(i, e);
    },
    createURL: g,
    encodeLocation(e) {
      let t = g(e);
      return { pathname: t.pathname, search: t.search, hash: t.hash };
    },
    push: m,
    replace: h,
    go(e) {
      return o.go(e);
    },
  };
  return _;
}
function C(e, t = !1) {
  let n = `http://localhost`;
  (typeof window < `u` &&
    (n =
      window.location.origin === `null`
        ? window.location.href
        : window.location.origin),
    h(n, `No window.location.(origin|href) available to create URL`));
  let r = typeof e == `string` ? e : b(e);
  return (
    (r = r.replace(/ $/, `%20`)),
    !t && r.startsWith(`//`) && (r = n + r),
    new URL(r, n)
  );
}
function w(e) {
  return { defaultValue: e };
}
var T,
  ee = class {
    constructor(e) {
      if ((u(this, T, new Map()), e)) for (let [t, n] of e) this.set(t, n);
    }
    get(e) {
      if (l(this, T).has(e)) return l(this, T).get(e);
      if (e.defaultValue !== void 0) return e.defaultValue;
      throw Error(`No value found for context`);
    }
    set(e, t) {
      l(this, T).set(e, t);
    }
  };
T = new WeakMap();
var E = new Set([`lazy`, `caseSensitive`, `path`, `id`, `index`, `children`]);
function D(e) {
  return E.has(e);
}
var O = new Set([
  `lazy`,
  `caseSensitive`,
  `path`,
  `id`,
  `index`,
  `middleware`,
  `children`,
]);
function k(e) {
  return O.has(e);
}
function A(e) {
  return e.index === !0;
}
function te(e, t, n = [], r = {}, i = !1) {
  return e.map((e, a) => {
    let o = [...n, String(a)],
      s = typeof e.id == `string` ? e.id : o.join(`-`);
    if (
      (h(
        e.index !== !0 || !e.children,
        `Cannot specify children on an index route`,
      ),
      h(
        i || !r[s],
        `Found a route id collision on id "${s}".  Route id's must be globally unique within Data Router usages`,
      ),
      A(e))
    ) {
      let n = { ...e, id: s };
      return ((r[s] = j(n, t(n))), n);
    } else {
      let n = { ...e, id: s, children: void 0 };
      return (
        (r[s] = j(n, t(n))),
        e.children && (n.children = te(e.children, t, o, r, i)),
        n
      );
    }
  });
}
function j(e, t) {
  return Object.assign(e, {
    ...t,
    ...(typeof t.lazy == `object` && t.lazy != null
      ? { lazy: { ...e.lazy, ...t.lazy } }
      : {}),
  });
}
function M(e, t, n = `/`) {
  return N(e, t, n, !1);
}
function N(e, t, n, r, i) {
  let a = z((typeof t == `string` ? x(t) : t).pathname || `/`, n);
  if (a == null) return null;
  let o = i ?? P(e),
    s = null,
    c = me(a);
  for (let e = 0; s == null && e < o.length; ++e) s = L(o[e], c, r);
  return s;
}
function ne(e, t) {
  let { route: n, pathname: r, params: i } = e;
  return {
    id: n.id,
    pathname: r,
    params: i,
    data: t[n.id],
    loaderData: t[n.id],
    handle: n.handle,
  };
}
function P(e) {
  let t = re(e);
  return (ie(t), t);
}
function re(e, t = [], n = [], r = ``, i = !1) {
  let a = (e, a, o = i, s) => {
    let c = {
      relativePath: s === void 0 ? e.path || `` : s,
      caseSensitive: e.caseSensitive === !0,
      childrenIndex: a,
      route: e,
    };
    if (c.relativePath.startsWith(`/`)) {
      if (!c.relativePath.startsWith(r) && o) return;
      (h(
        c.relativePath.startsWith(r),
        `Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
        (c.relativePath = c.relativePath.slice(r.length)));
    }
    let l = H([r, c.relativePath]),
      u = n.concat(c);
    (e.children &&
      e.children.length > 0 &&
      (h(
        e.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${l}".`,
      ),
      re(e.children, t, u, l, o)),
      !(e.path == null && !e.index) &&
        t.push({ path: l, score: de(l, e.index), routesMeta: u }));
  };
  return (
    e.forEach((e, t) => {
      if (e.path === `` || !e.path?.includes(`?`)) a(e, t);
      else for (let n of F(e.path)) a(e, t, !0, n);
    }),
    t
  );
}
function F(e) {
  let t = e.split(`/`);
  if (t.length === 0) return [];
  let [n, ...r] = t,
    i = n.endsWith(`?`),
    a = n.replace(/\?$/, ``);
  if (r.length === 0) return i ? [a, ``] : [a];
  let o = F(r.join(`/`)),
    s = [];
  return (
    s.push(...o.map((e) => (e === `` ? a : [a, e].join(`/`)))),
    i && s.push(...o),
    s.map((t) => (e.startsWith(`/`) && t === `` ? `/` : t))
  );
}
function ie(e) {
  e.sort((e, t) =>
    e.score === t.score
      ? fe(
          e.routesMeta.map((e) => e.childrenIndex),
          t.routesMeta.map((e) => e.childrenIndex),
        )
      : t.score - e.score,
  );
}
var ae = /^:[\w-]+$/,
  oe = 3,
  I = 2,
  se = 1,
  ce = 10,
  le = -2,
  ue = (e) => e === `*`;
function de(e, t) {
  let n = e.split(`/`),
    r = n.length;
  return (
    n.some(ue) && (r += le),
    t && (r += I),
    n
      .filter((e) => !ue(e))
      .reduce((e, t) => e + (ae.test(t) ? oe : t === `` ? se : ce), r)
  );
}
function fe(e, t) {
  return e.length === t.length && e.slice(0, -1).every((e, n) => e === t[n])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function L(e, t, n = !1) {
  let { routesMeta: r } = e,
    i = {},
    a = `/`,
    o = [];
  for (let e = 0; e < r.length; ++e) {
    let s = r[e],
      c = e === r.length - 1,
      l = a === `/` ? t : t.slice(a.length) || `/`,
      u = R(
        { path: s.relativePath, caseSensitive: s.caseSensitive, end: c },
        l,
      ),
      d = s.route;
    if (
      (!u &&
        c &&
        n &&
        !r[r.length - 1].route.index &&
        (u = R(
          { path: s.relativePath, caseSensitive: s.caseSensitive, end: !1 },
          l,
        )),
      !u)
    )
      return null;
    (Object.assign(i, u.params),
      o.push({
        params: i,
        pathname: H([a, u.pathname]),
        pathnameBase: we(H([a, u.pathnameBase])),
        route: d,
      }),
      u.pathnameBase !== `/` && (a = H([a, u.pathnameBase])));
  }
  return o;
}
function R(e, t) {
  typeof e == `string` && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = pe(e.path, e.caseSensitive, e.end),
    i = t.match(n);
  if (!i) return null;
  let a = i[0],
    o = a.replace(/(.)\/+$/, `$1`),
    s = i.slice(1);
  return {
    params: r.reduce((e, { paramName: t, isOptional: n }, r) => {
      if (t === `*`) {
        let e = s[r] || ``;
        o = a.slice(0, a.length - e.length).replace(/(.)\/+$/, `$1`);
      }
      let i = s[r];
      return (
        n && !i ? (e[t] = void 0) : (e[t] = (i || ``).replace(/%2F/g, `/`)),
        e
      );
    }, {}),
    pathname: a,
    pathnameBase: o,
    pattern: e,
  };
}
function pe(e, t = !1, n = !0) {
  g(
    e === `*` || !e.endsWith(`*`) || e.endsWith(`/*`),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, `/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, `/*`)}".`,
  );
  let r = [],
    i =
      `^` +
      e
        .replace(/\/*\*?$/, ``)
        .replace(/^\/*/, `/`)
        .replace(/[\\.*+^${}|()[\]]/g, `\\$&`)
        .replace(/\/:([\w-]+)(\?)?/g, (e, t, n, i, a) => {
          if ((r.push({ paramName: t, isOptional: n != null }), n)) {
            let t = a.charAt(i + e.length);
            return t && t !== `/` ? `/([^\\/]*)` : `(?:/([^\\/]*))?`;
          }
          return `/([^\\/]+)`;
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, `(/$1)?$2`);
  return (
    e.endsWith(`*`)
      ? (r.push({ paramName: `*` }),
        (i += e === `*` || e === `/*` ? `(.*)$` : `(?:\\/(.+)|\\/*)$`))
      : n
        ? (i += `\\/*$`)
        : e !== `` && e !== `/` && (i += `(?:(?=\\/|$))`),
    [new RegExp(i, t ? void 0 : `i`), r]
  );
}
function me(e) {
  try {
    return e
      .split(`/`)
      .map((e) => decodeURIComponent(e).replace(/\//g, `%2F`))
      .join(`/`);
  } catch (t) {
    return (
      g(
        !1,
        `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`,
      ),
      e
    );
  }
}
function z(e, t) {
  if (t === `/`) return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith(`/`) ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== `/` ? null : e.slice(n) || `/`;
}
function he({ basename: e, pathname: t }) {
  return t === `/` ? e : H([e, t]);
}
var ge = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  _e = (e) => ge.test(e);
function ve(e, t = `/`) {
  let {
      pathname: n,
      search: r = ``,
      hash: i = ``,
    } = typeof e == `string` ? x(e) : e,
    a;
  return (
    n
      ? ((n = Se(n)),
        (a = n.startsWith(`/`) ? B(n.substring(1), `/`) : B(n, t)))
      : (a = t),
    { pathname: a, search: Te(r), hash: Ee(i) }
  );
}
function B(e, t) {
  let n = Ce(t).split(`/`);
  return (
    e.split(`/`).forEach((e) => {
      e === `..` ? n.length > 1 && n.pop() : e !== `.` && n.push(e);
    }),
    n.length > 1 ? n.join(`/`) : `/`
  );
}
function ye(e, t, n, r) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function be(e) {
  return e.filter(
    (e, t) => t === 0 || (e.route.path && e.route.path.length > 0),
  );
}
function xe(e) {
  let t = be(e);
  return t.map((e, n) => (n === t.length - 1 ? e.pathname : e.pathnameBase));
}
function V(e, t, n, r = !1) {
  let i;
  typeof e == `string`
    ? (i = x(e))
    : ((i = { ...e }),
      h(
        !i.pathname || !i.pathname.includes(`?`),
        ye(`?`, `pathname`, `search`, i),
      ),
      h(
        !i.pathname || !i.pathname.includes(`#`),
        ye(`#`, `pathname`, `hash`, i),
      ),
      h(!i.search || !i.search.includes(`#`), ye(`#`, `search`, `hash`, i)));
  let a = e === `` || i.pathname === ``,
    o = a ? `/` : i.pathname,
    s;
  if (o == null) s = n;
  else {
    let e = t.length - 1;
    if (!r && o.startsWith(`..`)) {
      let t = o.split(`/`);
      for (; t[0] === `..`; ) (t.shift(), --e);
      i.pathname = t.join(`/`);
    }
    s = e >= 0 ? t[e] : `/`;
  }
  let c = ve(i, s),
    l = o && o !== `/` && o.endsWith(`/`),
    u = (a || o === `.`) && n.endsWith(`/`);
  return (!c.pathname.endsWith(`/`) && (l || u) && (c.pathname += `/`), c);
}
var Se = (e) => e.replace(/\/\/+/g, `/`),
  H = (e) => Se(e.join(`/`)),
  Ce = (e) => e.replace(/\/+$/, ``),
  we = (e) => Ce(e).replace(/^\/*/, `/`),
  Te = (e) => (!e || e === `?` ? `` : e.startsWith(`?`) ? e : `?` + e),
  Ee = (e) => (!e || e === `#` ? `` : e.startsWith(`#`) ? e : `#` + e),
  De = class {
    constructor(e, t) {
      ((this.type = `DataWithResponseInit`),
        (this.data = e),
        (this.init = t || null));
    }
  };
function Oe(e, t) {
  return new De(e, typeof t == `number` ? { status: t } : t);
}
var ke = (e, t = 302) => {
    let n = t;
    typeof n == `number`
      ? (n = { status: n })
      : n.status === void 0 && (n.status = 302);
    let r = new Headers(n.headers);
    return (r.set(`Location`, e), new Response(null, { ...n, headers: r }));
  },
  U = class {
    constructor(e, t, n, r = !1) {
      ((this.status = e),
        (this.statusText = t || ``),
        (this.internal = r),
        n instanceof Error
          ? ((this.data = n.toString()), (this.error = n))
          : (this.data = n));
    }
  };
function Ae(e) {
  return (
    e != null &&
    typeof e.status == `number` &&
    typeof e.statusText == `string` &&
    typeof e.internal == `boolean` &&
    `data` in e
  );
}
function je(e) {
  return H(e.map((e) => e.route.path).filter(Boolean)) || `/`;
}
var W =
  typeof window < `u` &&
  window.document !== void 0 &&
  window.document.createElement !== void 0;
function G(e, t) {
  let n = e;
  if (typeof n != `string` || !ge.test(n))
    return { absoluteURL: void 0, isExternal: !1, to: n };
  let r = n,
    i = !1;
  if (W)
    try {
      let e = new URL(window.location.href),
        r = n.startsWith(`//`) ? new URL(e.protocol + n) : new URL(n),
        a = z(r.pathname, t);
      r.origin === e.origin && a != null
        ? (n = a + r.search + r.hash)
        : (i = !0);
    } catch {
      g(
        !1,
        `<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
      );
    }
  return { absoluteURL: r, isExternal: i, to: n };
}
var Me = Symbol(`Uninstrumented`);
function Ne(e, t) {
  let n = {
    lazy: [],
    "lazy.loader": [],
    "lazy.action": [],
    "lazy.middleware": [],
    middleware: [],
    loader: [],
    action: [],
  };
  e.forEach((e) =>
    e({
      id: t.id,
      index: t.index,
      path: t.path,
      instrument(e) {
        let t = Object.keys(n);
        for (let r of t) e[r] && n[r].push(e[r]);
      },
    }),
  );
  let r = {};
  if (typeof t.lazy == `function` && n.lazy.length > 0) {
    let e = Fe(n.lazy, t.lazy, () => void 0);
    e && (r.lazy = e);
  }
  if (typeof t.lazy == `object`) {
    let e = t.lazy;
    [`middleware`, `loader`, `action`].forEach((t) => {
      let i = e[t],
        a = n[`lazy.${t}`];
      if (typeof i == `function` && a.length > 0) {
        let e = Fe(a, i, () => void 0);
        e && (r.lazy = Object.assign(r.lazy || {}, { [t]: e }));
      }
    });
  }
  return (
    [`loader`, `action`].forEach((e) => {
      let i = t[e];
      if (typeof i == `function` && n[e].length > 0) {
        let t = i[Me] ?? i,
          a = Fe(n[e], t, (...e) => Le(e[0]));
        a &&
          (e === `loader` && t.hydrate === !0 && (a.hydrate = !0),
          (a[Me] = t),
          (r[e] = a));
      }
    }),
    t.middleware &&
      t.middleware.length > 0 &&
      n.middleware.length > 0 &&
      (r.middleware = t.middleware.map((e) => {
        let t = e[Me] ?? e,
          r = Fe(n.middleware, t, (...e) => Le(e[0]));
        return r ? ((r[Me] = t), r) : e;
      })),
    r
  );
}
function Pe(e, t) {
  let n = { navigate: [], fetch: [] };
  if (
    (t.forEach((e) =>
      e({
        instrument(e) {
          let t = Object.keys(e);
          for (let r of t) e[r] && n[r].push(e[r]);
        },
      }),
    ),
    n.navigate.length > 0)
  ) {
    let t = e.navigate[Me] ?? e.navigate,
      r = Fe(n.navigate, t, (...t) => {
        let [n, r] = t;
        return {
          to: typeof n == `number` || typeof n == `string` ? n : n ? b(n) : `.`,
          ...K(e, r ?? {}),
        };
      });
    r && ((r[Me] = t), (e.navigate = r));
  }
  if (n.fetch.length > 0) {
    let t = e.fetch[Me] ?? e.fetch,
      r = Fe(n.fetch, t, (...t) => {
        let [n, , r, i] = t;
        return { href: r ?? `.`, fetcherKey: n, ...K(e, i ?? {}) };
      });
    r && ((r[Me] = t), (e.fetch = r));
  }
  return e;
}
function Fe(e, t, n) {
  return e.length === 0
    ? null
    : async (...r) => {
        let i = await Ie(e, n(...r), () => t(...r), e.length - 1);
        if (i.type === `error`) throw i.value;
        return i.value;
      };
}
async function Ie(e, t, n, r) {
  let i = e[r],
    a;
  if (i) {
    let o,
      s = async () => (
        o
          ? console.error(
              `You cannot call instrumented handlers more than once`,
            )
          : (o = Ie(e, t, n, r - 1)),
        (a = await o),
        h(a, `Expected a result`),
        a.type === `error` && a.value instanceof Error
          ? { status: `error`, error: a.value }
          : { status: `success`, error: void 0 }
      );
    try {
      await i(s, t);
    } catch (e) {
      console.error(`An instrumentation function threw an error:`, e);
    }
    (o || (await s()), await o);
  } else
    try {
      a = { type: `success`, value: await n() };
    } catch (e) {
      a = { type: `error`, value: e };
    }
  return (
    a || {
      type: `error`,
      value: Error(`No result assigned in instrumentation chain.`),
    }
  );
}
function Le(e) {
  let { request: t, context: n, params: r, pattern: i } = e;
  return { request: Re(t), params: { ...r }, pattern: i, context: ze(n) };
}
function K(e, t) {
  return {
    currentUrl: b(e.state.location),
    ...(`formMethod` in t ? { formMethod: t.formMethod } : {}),
    ...(`formEncType` in t ? { formEncType: t.formEncType } : {}),
    ...(`formData` in t ? { formData: t.formData } : {}),
    ...(`body` in t ? { body: t.body } : {}),
  };
}
function Re(e) {
  return {
    method: e.method,
    url: e.url,
    headers: { get: (...t) => e.headers.get(...t) },
  };
}
function ze(e) {
  if (Ve(e)) {
    let t = { ...e };
    return (Object.freeze(t), t);
  } else return { get: (t) => e.get(t) };
}
var Be = Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);
function Ve(e) {
  if (typeof e != `object` || !e) return !1;
  let t = Object.getPrototypeOf(e);
  return (
    t === Object.prototype ||
    t === null ||
    Object.getOwnPropertyNames(t).sort().join(`\0`) === Be
  );
}
var He = [`POST`, `PUT`, `PATCH`, `DELETE`],
  Ue = new Set(He),
  We = [`GET`, ...He],
  Ge = new Set(We),
  Ke = new Set([301, 302, 303, 307, 308]),
  qe = new Set([307, 308]),
  Je = {
    state: `idle`,
    location: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  Ye = {
    state: `idle`,
    data: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  Xe = { state: `unblocked`, proceed: void 0, reset: void 0, location: void 0 },
  Ze = (e) => ({ hasErrorBoundary: !!e.hasErrorBoundary }),
  Qe = `remix-router-transitions`,
  $e = Symbol(`ResetLoaderData`),
  et,
  tt,
  q,
  nt,
  rt = class {
    constructor(e) {
      (u(this, et),
        u(this, tt),
        u(this, q),
        u(this, nt),
        d(this, et, e),
        d(this, tt, P(e)));
    }
    get stableRoutes() {
      return l(this, et);
    }
    get activeRoutes() {
      return l(this, q) ?? l(this, et);
    }
    get branches() {
      return l(this, nt) ?? l(this, tt);
    }
    get hasHMRRoutes() {
      return l(this, q) != null;
    }
    setRoutes(e) {
      (d(this, et, e), d(this, tt, P(e)));
    }
    setHmrRoutes(e) {
      (d(this, q, e), d(this, nt, P(e)));
    }
    commitHmrRoutes() {
      l(this, q) &&
        (d(this, et, l(this, q)),
        d(this, tt, l(this, nt)),
        d(this, q, void 0),
        d(this, nt, void 0));
    }
  };
((et = new WeakMap()),
  (tt = new WeakMap()),
  (q = new WeakMap()),
  (nt = new WeakMap()));
function it(e) {
  let t = e.window ? e.window : typeof window < `u` ? window : void 0,
    n =
      t !== void 0 &&
      t.document !== void 0 &&
      t.document.createElement !== void 0;
  h(
    e.routes.length > 0,
    `You must provide a non-empty routes array to createRouter`,
  );
  let r = e.hydrationRouteProperties || [],
    i = e.mapRouteProperties || Ze,
    a = i;
  if (e.instrumentations) {
    let t = e.instrumentations;
    a = (e) => ({ ...i(e), ...Ne(t.map((e) => e.route).filter(Boolean), e) });
  }
  let o = {},
    s = new rt(te(e.routes, a, void 0, o)),
    c = e.basename || `/`;
  c.startsWith(`/`) || (c = `/${c}`);
  let l = e.dataStrategy || xt,
    u = { ...e.future },
    d = null,
    f = new Set(),
    p = null,
    m = null,
    _ = null,
    v = e.hydrationData != null,
    b = N(s.activeRoutes, e.history.location, c, !1, s.branches),
    S = !1,
    w = null,
    T,
    E;
  if (b == null && !e.patchRoutesOnNavigation) {
    let t = J(404, { pathname: e.history.location.pathname }),
      { matches: n, route: r } = Wt(s.activeRoutes);
    ((T = !0), (E = !T), (b = n), (w = { [r.id]: t }));
  } else if (
    (b &&
      !e.hydrationData &&
      tt(b, s.activeRoutes, e.history.location.pathname).active &&
      (b = null),
    !b)
  ) {
    ((T = !1), (E = !T), (b = []));
    let t = tt(null, s.activeRoutes, e.history.location.pathname);
    t.active && t.matches && ((S = !0), (b = t.matches));
  } else if (b.some((e) => e.route.lazy)) ((T = !1), (E = !T));
  else if (!b.some((e) => lt(e.route))) ((T = !0), (E = !T));
  else {
    let t = e.hydrationData ? e.hydrationData.loaderData : null,
      n = e.hydrationData ? e.hydrationData.errors : null,
      r = b;
    if (n) {
      let e = b.findIndex((e) => n[e.route.id] !== void 0);
      r = r.slice(0, e + 1);
    }
    ((E = !1),
      (T = !0),
      r.forEach((e) => {
        let r = ut(e.route, t, n);
        ((E ||= r.renderFallback), (T &&= !r.shouldLoad));
      }));
  }
  let D,
    O = {
      historyAction: e.history.action,
      location: e.history.location,
      matches: b,
      initialized: T,
      renderFallback: E,
      navigation: Je,
      restoreScrollPosition: e.hydrationData == null ? null : !1,
      preventScrollReset: !1,
      revalidation: `idle`,
      loaderData: (e.hydrationData && e.hydrationData.loaderData) || {},
      actionData: (e.hydrationData && e.hydrationData.actionData) || null,
      errors: (e.hydrationData && e.hydrationData.errors) || w,
      fetchers: new Map(),
      blockers: new Map(),
    },
    k = `POP`,
    A = null,
    j = !1,
    M,
    P = !1,
    re = new Map(),
    F = null,
    ie = !1,
    ae = !1,
    oe = new Set(),
    I = new Map(),
    se = 0,
    ce = -1,
    le = new Map(),
    ue = new Set(),
    de = new Map(),
    fe = new Map(),
    L = new Set(),
    R = new Map(),
    pe,
    me = null;
  function he() {
    if (
      ((d = e.history.listen(({ action: t, location: n, delta: r }) => {
        if (pe) {
          (pe(), (pe = void 0));
          return;
        }
        g(
          R.size === 0 || r != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.",
        );
        let i = We({
          currentLocation: O.location,
          nextLocation: n,
          historyAction: t,
        });
        if (i && r != null) {
          let t = new Promise((e) => {
            pe = e;
          });
          (e.history.go(r * -1),
            Ue(i, {
              state: `blocked`,
              location: n,
              proceed() {
                (Ue(i, {
                  state: `proceeding`,
                  proceed: void 0,
                  reset: void 0,
                  location: n,
                }),
                  t.then(() => e.history.go(r)));
              },
              reset() {
                let e = new Map(O.blockers);
                (e.set(i, Xe), B({ blockers: e }));
              },
            }),
            A?.resolve(),
            (A = null));
          return;
        }
        return V(t, n);
      })),
      n)
    ) {
      pn(t, re);
      let e = () => mn(t, re);
      (t.addEventListener(`pagehide`, e),
        (F = () => t.removeEventListener(`pagehide`, e)));
    }
    return (O.initialized || V(`POP`, O.location, { initialHydration: !0 }), D);
  }
  function ge() {
    (d && d(),
      F && F(),
      f.clear(),
      M && M.abort(),
      O.fetchers.forEach((e, t) => Ie(t)),
      O.blockers.forEach((e, t) => He(t)));
  }
  function ve(e) {
    return (f.add(e), () => f.delete(e));
  }
  function B(e, t = {}) {
    ((e.matches &&= e.matches.map((e) => {
      let t = o[e.route.id],
        n = e.route;
      return n.element !== t.element ||
        n.errorElement !== t.errorElement ||
        n.hydrateFallbackElement !== t.hydrateFallbackElement
        ? { ...e, route: t }
        : e;
    })),
      (O = { ...O, ...e }));
    let n = [],
      r = [];
    (O.fetchers.forEach((e, t) => {
      e.state === `idle` && (L.has(t) ? n.push(t) : r.push(t));
    }),
      L.forEach((e) => {
        !O.fetchers.has(e) && !I.has(e) && n.push(e);
      }),
      [...f].forEach((r) =>
        r(O, {
          deletedFetchers: n,
          newErrors: e.errors ?? null,
          viewTransitionOpts: t.viewTransitionOpts,
          flushSync: t.flushSync === !0,
        }),
      ),
      n.forEach((e) => Ie(e)),
      r.forEach((e) => O.fetchers.delete(e)));
  }
  function ye(t, n, { flushSync: r } = {}) {
    let i =
        O.actionData != null &&
        O.navigation.formMethod != null &&
        X(O.navigation.formMethod) &&
        O.navigation.state === `loading` &&
        t.state?._isRedirect !== !0,
      a;
    a = n.actionData
      ? Object.keys(n.actionData).length > 0
        ? n.actionData
        : null
      : i
        ? O.actionData
        : null;
    let o = n.loaderData
        ? Vt(O.loaderData, n.loaderData, n.matches || [], n.errors)
        : O.loaderData,
      c = O.blockers;
    c.size > 0 && ((c = new Map(c)), c.forEach((e, t) => c.set(t, Xe)));
    let l = ie ? !1 : et(t, n.matches || O.matches),
      u =
        j === !0 ||
        (O.navigation.formMethod != null &&
          X(O.navigation.formMethod) &&
          t.state?._isRedirect !== !0);
    (s.commitHmrRoutes(),
      ie ||
        k === `POP` ||
        (k === `PUSH`
          ? e.history.push(t, t.state)
          : k === `REPLACE` && e.history.replace(t, t.state)));
    let d;
    if (k === `POP`) {
      let e = re.get(O.location.pathname);
      e && e.has(t.pathname)
        ? (d = { currentLocation: O.location, nextLocation: t })
        : re.has(t.pathname) &&
          (d = { currentLocation: t, nextLocation: O.location });
    } else if (P) {
      let e = re.get(O.location.pathname);
      (e
        ? e.add(t.pathname)
        : ((e = new Set([t.pathname])), re.set(O.location.pathname, e)),
        (d = { currentLocation: O.location, nextLocation: t }));
    }
    (B(
      {
        ...n,
        actionData: a,
        loaderData: o,
        historyAction: k,
        location: t,
        initialized: !0,
        renderFallback: !1,
        navigation: Je,
        revalidation: `idle`,
        restoreScrollPosition: l,
        preventScrollReset: u,
        blockers: c,
      },
      { viewTransitionOpts: d, flushSync: r === !0 },
    ),
      (k = `POP`),
      (j = !1),
      (P = !1),
      (ie = !1),
      (ae = !1),
      A?.resolve(),
      (A = null),
      me?.resolve(),
      (me = null));
  }
  async function be(t, n) {
    if ((A?.resolve(), (A = null), typeof t == `number`)) {
      A ||= hn();
      let n = A.promise;
      return (e.history.go(t), n);
    }
    let {
        path: r,
        submission: i,
        error: a,
      } = st(
        !1,
        ot(O.location, O.matches, c, t, n?.fromRouteId, n?.relative),
        n,
      ),
      o;
    n?.mask &&
      (o = {
        pathname: ``,
        search: ``,
        hash: ``,
        ...(typeof n.mask == `string`
          ? x(n.mask)
          : { ...O.location.mask, ...n.mask }),
      });
    let s = O.location,
      l = y(s, r, n && n.state, void 0, o);
    l = { ...l, ...e.history.encodeLocation(l) };
    let u = n && n.replace != null ? n.replace : void 0,
      d = `PUSH`;
    u === !0
      ? (d = `REPLACE`)
      : u === !1 ||
        (i != null &&
          X(i.formMethod) &&
          i.formAction === O.location.pathname + O.location.search &&
          (d = `REPLACE`));
    let f =
        n && `preventScrollReset` in n ? n.preventScrollReset === !0 : void 0,
      p = (n && n.flushSync) === !0,
      m = We({ currentLocation: s, nextLocation: l, historyAction: d });
    if (m) {
      Ue(m, {
        state: `blocked`,
        location: l,
        proceed() {
          (Ue(m, {
            state: `proceeding`,
            proceed: void 0,
            reset: void 0,
            location: l,
          }),
            be(t, n));
        },
        reset() {
          let e = new Map(O.blockers);
          (e.set(m, Xe), B({ blockers: e }));
        },
      });
      return;
    }
    await V(d, l, {
      submission: i,
      pendingError: a,
      preventScrollReset: f,
      replace: n && n.replace,
      enableViewTransition: n && n.viewTransition,
      flushSync: p,
      callSiteDefaultShouldRevalidate: n && n.defaultShouldRevalidate,
    });
  }
  function xe() {
    ((me ||= hn()), je(), B({ revalidation: `loading` }));
    let e = me.promise;
    return O.navigation.state === `submitting`
      ? e
      : O.navigation.state === `idle`
        ? (V(O.historyAction, O.location, {
            startUninterruptedRevalidation: !0,
          }),
          e)
        : (V(k || O.historyAction, O.navigation.location, {
            overrideNavigation: O.navigation,
            enableViewTransition: P === !0,
          }),
          e);
  }
  async function V(t, n, r) {
    (M && M.abort(),
      (M = null),
      (k = t),
      (ie = (r && r.startUninterruptedRevalidation) === !0),
      $e(O.location, O.matches),
      (j = (r && r.preventScrollReset) === !0),
      (P = (r && r.enableViewTransition) === !0));
    let i = s.activeRoutes,
      a = r && r.overrideNavigation,
      o =
        r?.initialHydration && O.matches && O.matches.length > 0 && !S
          ? O.matches
          : N(i, n, c, !1, s.branches),
      l = (r && r.flushSync) === !0;
    if (
      o &&
      O.initialized &&
      !ae &&
      qt(O.location, n) &&
      !(r && r.submission && X(r.submission.formMethod))
    ) {
      ye(n, { matches: o }, { flushSync: l });
      return;
    }
    let u = tt(o, i, n.pathname);
    if ((u.active && u.matches && (o = u.matches), !o)) {
      let { error: e, notFoundMatches: t, route: r } = Ge(n.pathname);
      ye(
        n,
        { matches: t, loaderData: {}, errors: { [r.id]: e } },
        { flushSync: l },
      );
      return;
    }
    M = new AbortController();
    let d = Ft(e.history, n, M.signal, r && r.submission),
      f = e.getContext ? await e.getContext() : new ee(),
      p;
    if (r && r.pendingError)
      p = [Ut(o).route.id, { type: `error`, error: r.pendingError }];
    else if (r && r.submission && X(r.submission.formMethod)) {
      let t = await Se(
        d,
        n,
        r.submission,
        o,
        f,
        u.active,
        r && r.initialHydration === !0,
        { replace: r.replace, flushSync: l },
      );
      if (t.shortCircuited) return;
      if (t.pendingActionResult) {
        let [e, r] = t.pendingActionResult;
        if (Y(r) && Ae(r.error) && r.error.status === 404) {
          ((M = null),
            ye(n, {
              matches: t.matches,
              loaderData: {},
              errors: { [e]: r.error },
            }));
          return;
        }
      }
      ((o = t.matches || o),
        (p = t.pendingActionResult),
        (a = cn(n, r.submission)),
        (l = !1),
        (u.active = !1),
        (d = Ft(e.history, d.url, d.signal)));
    }
    let {
      shortCircuited: m,
      matches: h,
      loaderData: g,
      errors: _,
    } = await H(
      d,
      n,
      o,
      f,
      u.active,
      a,
      r && r.submission,
      r && r.fetcherSubmission,
      r && r.replace,
      r && r.initialHydration === !0,
      l,
      p,
      r && r.callSiteDefaultShouldRevalidate,
    );
    m ||
      ((M = null),
      ye(n, { matches: h || o, ...Ht(p), loaderData: g, errors: _ }));
  }
  async function Se(t, n, i, l, u, d, f, p = {}) {
    if (
      (je(), B({ navigation: ln(n, i) }, { flushSync: p.flushSync === !0 }), d)
    ) {
      let e = await q(l, n.pathname, t.signal);
      if (e.type === `aborted`) return { shortCircuited: !0 };
      if (e.type === `error`) {
        if (e.partialMatches.length === 0) {
          let { matches: t, route: n } = Wt(s.activeRoutes);
          return {
            matches: t,
            pendingActionResult: [n.id, { type: `error`, error: e.error }],
          };
        }
        let t = Ut(e.partialMatches).route.id;
        return {
          matches: e.partialMatches,
          pendingActionResult: [t, { type: `error`, error: e.error }],
        };
      } else if (e.matches) l = e.matches;
      else {
        let { notFoundMatches: e, error: t, route: r } = Ge(n.pathname);
        return {
          matches: e,
          pendingActionResult: [r.id, { type: `error`, error: t }],
        };
      }
    }
    let m,
      h = on(l, n);
    if (!h.route.action && !h.route.lazy)
      m = {
        type: `error`,
        error: J(405, {
          method: t.method,
          pathname: n.pathname,
          routeId: h.route.id,
        }),
      };
    else {
      let e = await ke(t, n, Dt(a, o, t, n, l, h, f ? [] : r, u), u, null);
      if (((m = e[h.route.id]), !m)) {
        for (let t of l)
          if (e[t.route.id]) {
            m = e[t.route.id];
            break;
          }
      }
      if (t.signal.aborted) return { shortCircuited: !0 };
    }
    if (Qt(m)) {
      let n;
      return (
        (n =
          p && p.replace != null
            ? p.replace
            : Pt(
                m.response.headers.get(`Location`),
                new URL(t.url),
                c,
                e.history,
              ) ===
              O.location.pathname + O.location.search),
        await Oe(t, m, !0, { submission: i, replace: n }),
        { shortCircuited: !0 }
      );
    }
    if (Y(m)) {
      let e = Ut(l, h.route.id);
      return (
        (p && p.replace) !== !0 && (k = `PUSH`),
        { matches: l, pendingActionResult: [e.route.id, m, h.route.id] }
      );
    }
    return { matches: l, pendingActionResult: [h.route.id, m] };
  }
  async function H(t, n, i, l, u, d, f, p, m, h, g, _, v) {
    let y = d || cn(n, f),
      b = f || p || sn(y),
      x = !ie && !h;
    if (u) {
      if (x) {
        let e = Ce(_);
        B(
          { navigation: y, ...(e === void 0 ? {} : { actionData: e }) },
          { flushSync: g },
        );
      }
      let e = await q(i, n.pathname, t.signal);
      if (e.type === `aborted`) return { shortCircuited: !0 };
      if (e.type === `error`) {
        if (e.partialMatches.length === 0) {
          let { matches: t, route: n } = Wt(s.activeRoutes);
          return { matches: t, loaderData: {}, errors: { [n.id]: e.error } };
        }
        let t = Ut(e.partialMatches).route.id;
        return {
          matches: e.partialMatches,
          loaderData: {},
          errors: { [t]: e.error },
        };
      } else if (e.matches) i = e.matches;
      else {
        let { error: e, notFoundMatches: t, route: r } = Ge(n.pathname);
        return { matches: t, loaderData: {}, errors: { [r.id]: e } };
      }
    }
    let S = s.activeRoutes,
      { dsMatches: C, revalidatingFetchers: w } = ct(
        t,
        l,
        a,
        o,
        e.history,
        O,
        i,
        b,
        n,
        h ? [] : r,
        h === !0,
        ae,
        oe,
        L,
        de,
        ue,
        S,
        c,
        e.patchRoutesOnNavigation != null,
        s.branches,
        _,
        v,
      );
    if (
      ((ce = ++se),
      !e.dataStrategy &&
        !C.some((e) => e.shouldLoad) &&
        !C.some((e) => e.route.middleware && e.route.middleware.length > 0) &&
        w.length === 0)
    ) {
      let e = ze();
      return (
        ye(
          n,
          {
            matches: i,
            loaderData: {},
            errors: _ && Y(_[1]) ? { [_[0]]: _[1].error } : null,
            ...Ht(_),
            ...(e ? { fetchers: new Map(O.fetchers) } : {}),
          },
          { flushSync: g },
        ),
        { shortCircuited: !0 }
      );
    }
    if (x) {
      let e = {};
      if (!u) {
        e.navigation = y;
        let t = Ce(_);
        t !== void 0 && (e.actionData = t);
      }
      (w.length > 0 && (e.fetchers = we(w)), B(e, { flushSync: g }));
    }
    w.forEach((e) => {
      (K(e.key), e.controller && I.set(e.key, e.controller));
    });
    let T = () => w.forEach((e) => K(e.key));
    M && M.signal.addEventListener(`abort`, T);
    let { loaderResults: ee, fetcherResults: E } = await U(C, w, t, n, l);
    if (t.signal.aborted) return { shortCircuited: !0 };
    (M && M.signal.removeEventListener(`abort`, T),
      w.forEach((e) => I.delete(e.key)));
    let D = Gt(ee);
    if (D)
      return (
        await Oe(t, D.result, !0, { replace: m }),
        { shortCircuited: !0 }
      );
    if (((D = Gt(E)), D))
      return (
        ue.add(D.key),
        await Oe(t, D.result, !0, { replace: m }),
        { shortCircuited: !0 }
      );
    let { loaderData: k, errors: A } = Bt(O, i, ee, _, w, E);
    h && O.errors && (A = { ...O.errors, ...A });
    let te = ze(),
      j = Be(ce),
      N = te || j || w.length > 0;
    return {
      matches: i,
      loaderData: k,
      errors: A,
      ...(N ? { fetchers: new Map(O.fetchers) } : {}),
    };
  }
  function Ce(e) {
    if (e && !Y(e[1])) return { [e[0]]: e[1].data };
    if (O.actionData)
      return Object.keys(O.actionData).length === 0 ? null : O.actionData;
  }
  function we(e) {
    return (
      e.forEach((e) => {
        let t = O.fetchers.get(e.key),
          n = un(void 0, t ? t.data : void 0);
        O.fetchers.set(e.key, n);
      }),
      new Map(O.fetchers)
    );
  }
  async function Te(t, n, r, i) {
    K(t);
    let a = (i && i.flushSync) === !0,
      o = s.activeRoutes,
      l = ot(O.location, O.matches, c, r, n, i?.relative),
      u = N(o, l, c, !1, s.branches),
      d = tt(u, o, l);
    if ((d.active && d.matches && (u = d.matches), !u)) {
      G(t, n, J(404, { pathname: l }), { flushSync: a });
      return;
    }
    let { path: f, submission: p, error: m } = st(!0, l, i);
    if (m) {
      G(t, n, m, { flushSync: a });
      return;
    }
    let h = e.getContext ? await e.getContext() : new ee(),
      g = (i && i.preventScrollReset) === !0;
    if (p && X(p.formMethod)) {
      await Ee(
        t,
        n,
        f,
        u,
        h,
        d.active,
        a,
        g,
        p,
        i && i.defaultShouldRevalidate,
      );
      return;
    }
    (de.set(t, { routeId: n, path: f }),
      await De(t, n, f, u, h, d.active, a, g, p));
  }
  async function Ee(t, n, i, l, u, d, f, p, m, g) {
    (je(), de.delete(t), W(t, dn(m, O.fetchers.get(t)), { flushSync: f }));
    let _ = new AbortController(),
      v = Ft(e.history, i, _.signal, m);
    if (d) {
      let e = await q(l, new URL(v.url).pathname, v.signal, t);
      if (e.type === `aborted`) return;
      if (e.type === `error`) {
        G(t, n, e.error, { flushSync: f });
        return;
      } else if (e.matches) l = e.matches;
      else {
        G(t, n, J(404, { pathname: i }), { flushSync: f });
        return;
      }
    }
    let y = on(l, i);
    if (!y.route.action && !y.route.lazy) {
      G(t, n, J(405, { method: m.formMethod, pathname: i, routeId: n }), {
        flushSync: f,
      });
      return;
    }
    I.set(t, _);
    let b = se,
      x = Dt(a, o, v, i, l, y, r, u),
      S = await ke(v, i, x, u, t),
      C = S[y.route.id];
    if (!C) {
      for (let e of x)
        if (S[e.route.id]) {
          C = S[e.route.id];
          break;
        }
    }
    if (v.signal.aborted) {
      I.get(t) === _ && I.delete(t);
      return;
    }
    if (L.has(t)) {
      if (Qt(C) || Y(C)) {
        W(t, fn(void 0));
        return;
      }
    } else {
      if (Qt(C))
        if ((I.delete(t), ce > b)) {
          W(t, fn(void 0));
          return;
        } else
          return (
            ue.add(t),
            W(t, un(m)),
            Oe(v, C, !1, { fetcherSubmission: m, preventScrollReset: p })
          );
      if (Y(C)) {
        G(t, n, C.error);
        return;
      }
    }
    let w = O.navigation.location || O.location,
      T = Ft(e.history, w, _.signal),
      ee = s.activeRoutes,
      E =
        O.navigation.state === `idle`
          ? O.matches
          : N(ee, O.navigation.location, c, !1, s.branches);
    h(E, `Didn't find any matches after fetcher action`);
    let D = ++se;
    le.set(t, D);
    let A = un(m, C.data);
    O.fetchers.set(t, A);
    let { dsMatches: te, revalidatingFetchers: j } = ct(
      T,
      u,
      a,
      o,
      e.history,
      O,
      E,
      m,
      w,
      r,
      !1,
      ae,
      oe,
      L,
      de,
      ue,
      ee,
      c,
      e.patchRoutesOnNavigation != null,
      s.branches,
      [y.route.id, C],
      g,
    );
    (j
      .filter((e) => e.key !== t)
      .forEach((e) => {
        let t = e.key,
          n = O.fetchers.get(t),
          r = un(void 0, n ? n.data : void 0);
        (O.fetchers.set(t, r), K(t), e.controller && I.set(t, e.controller));
      }),
      B({ fetchers: new Map(O.fetchers) }));
    let ne = () => j.forEach((e) => K(e.key));
    _.signal.addEventListener(`abort`, ne);
    let { loaderResults: P, fetcherResults: re } = await U(te, j, T, w, u);
    if (_.signal.aborted) return;
    if (
      (_.signal.removeEventListener(`abort`, ne),
      le.delete(t),
      I.delete(t),
      j.forEach((e) => I.delete(e.key)),
      O.fetchers.has(t))
    ) {
      let e = fn(C.data);
      O.fetchers.set(t, e);
    }
    let F = Gt(P);
    if (F) return Oe(T, F.result, !1, { preventScrollReset: p });
    if (((F = Gt(re)), F))
      return (ue.add(F.key), Oe(T, F.result, !1, { preventScrollReset: p }));
    let { loaderData: ie, errors: fe } = Bt(O, E, P, void 0, j, re);
    (Be(D),
      O.navigation.state === `loading` && D > ce
        ? (h(k, `Expected pending action`),
          M && M.abort(),
          ye(O.navigation.location, {
            matches: E,
            loaderData: ie,
            errors: fe,
            fetchers: new Map(O.fetchers),
          }))
        : (B({
            errors: fe,
            loaderData: Vt(O.loaderData, ie, E, fe),
            fetchers: new Map(O.fetchers),
          }),
          (ae = !1)));
  }
  async function De(t, n, i, s, c, l, u, d, f) {
    let p = O.fetchers.get(t);
    W(t, un(f, p ? p.data : void 0), { flushSync: u });
    let m = new AbortController(),
      h = Ft(e.history, i, m.signal);
    if (l) {
      let e = await q(s, new URL(h.url).pathname, h.signal, t);
      if (e.type === `aborted`) return;
      if (e.type === `error`) {
        G(t, n, e.error, { flushSync: u });
        return;
      } else if (e.matches) s = e.matches;
      else {
        G(t, n, J(404, { pathname: i }), { flushSync: u });
        return;
      }
    }
    let g = on(s, i);
    I.set(t, m);
    let _ = se,
      v = await ke(h, i, Dt(a, o, h, i, s, g, r, c), c, t),
      y = v[g.route.id];
    if (!y) {
      for (let e of s)
        if (v[e.route.id]) {
          y = v[e.route.id];
          break;
        }
    }
    if ((I.get(t) === m && I.delete(t), !h.signal.aborted)) {
      if (L.has(t)) {
        W(t, fn(void 0));
        return;
      }
      if (Qt(y))
        if (ce > _) {
          W(t, fn(void 0));
          return;
        } else {
          (ue.add(t), await Oe(h, y, !1, { preventScrollReset: d }));
          return;
        }
      if (Y(y)) {
        G(t, n, y.error);
        return;
      }
      W(t, fn(y.data));
    }
  }
  async function Oe(
    r,
    i,
    a,
    {
      submission: o,
      fetcherSubmission: s,
      preventScrollReset: l,
      replace: u,
    } = {},
  ) {
    (a || (A?.resolve(), (A = null)),
      i.response.headers.has(`X-Remix-Revalidate`) && (ae = !0));
    let d = i.response.headers.get(`Location`);
    (h(d, `Expected a Location header on the redirect Response`),
      (d = Pt(d, new URL(r.url), c, e.history)));
    let f = y(O.location, d, { _isRedirect: !0 });
    if (n) {
      let e = !1;
      if (i.response.headers.has(`X-Remix-Reload-Document`)) e = !0;
      else if (_e(d)) {
        let n = C(d, !0);
        e = n.origin !== t.location.origin || z(n.pathname, c) == null;
      }
      if (e) {
        u ? t.location.replace(d) : t.location.assign(d);
        return;
      }
    }
    M = null;
    let p =
        u === !0 || i.response.headers.has(`X-Remix-Replace`)
          ? `REPLACE`
          : `PUSH`,
      { formMethod: m, formAction: g, formEncType: _ } = O.navigation;
    !o && !s && m && g && _ && (o = sn(O.navigation));
    let v = o || s;
    qe.has(i.response.status) && v && X(v.formMethod)
      ? await V(p, f, {
          submission: { ...v, formAction: d },
          preventScrollReset: l || j,
          enableViewTransition: a ? P : void 0,
        })
      : await V(p, f, {
          overrideNavigation: cn(f, o),
          fetcherSubmission: s,
          preventScrollReset: l || j,
          enableViewTransition: a ? P : void 0,
        });
  }
  async function ke(e, t, n, r, i) {
    let a,
      o = {};
    try {
      a = await Ot(l, e, t, n, i, r, !1);
    } catch (e) {
      return (
        n
          .filter((e) => e.shouldLoad)
          .forEach((t) => {
            o[t.route.id] = { type: `error`, error: e };
          }),
        o
      );
    }
    if (e.signal.aborted) return o;
    if (!X(e.method))
      for (let e of n) {
        if (a[e.route.id]?.type === `error`) break;
        !a.hasOwnProperty(e.route.id) &&
          !O.loaderData.hasOwnProperty(e.route.id) &&
          (!O.errors || !O.errors.hasOwnProperty(e.route.id)) &&
          e.shouldCallHandler() &&
          (a[e.route.id] = {
            type: `error`,
            result: Error(
              `No result returned from dataStrategy for route ${e.route.id}`,
            ),
          });
      }
    for (let [t, r] of Object.entries(a))
      if (Zt(r)) {
        let i = r.result;
        o[t] = { type: `redirect`, response: Mt(i, e, t, n, c) };
      } else o[t] = await jt(r);
    return o;
  }
  async function U(e, t, n, r, i) {
    let a = ke(n, r, e, i, null),
      o = Promise.all(
        t.map(async (e) => {
          if (e.matches && e.match && e.request && e.controller) {
            let t = (await ke(e.request, e.path, e.matches, i, e.key))[
              e.match.route.id
            ];
            return { [e.key]: t };
          } else
            return Promise.resolve({
              [e.key]: { type: `error`, error: J(404, { pathname: e.path }) },
            });
        }),
      );
    return {
      loaderResults: await a,
      fetcherResults: (await o).reduce((e, t) => Object.assign(e, t), {}),
    };
  }
  function je() {
    ((ae = !0),
      de.forEach((e, t) => {
        (I.has(t) && oe.add(t), K(t));
      }));
  }
  function W(e, t, n = {}) {
    (O.fetchers.set(e, t),
      B(
        { fetchers: new Map(O.fetchers) },
        { flushSync: (n && n.flushSync) === !0 },
      ));
  }
  function G(e, t, n, r = {}) {
    let i = Ut(O.matches, t);
    (Ie(e),
      B(
        { errors: { [i.route.id]: n }, fetchers: new Map(O.fetchers) },
        { flushSync: (r && r.flushSync) === !0 },
      ));
  }
  function Me(e) {
    return (
      fe.set(e, (fe.get(e) || 0) + 1),
      L.has(e) && L.delete(e),
      O.fetchers.get(e) || Ye
    );
  }
  function Fe(e, t) {
    (K(e, t?.reason), W(e, fn(null)));
  }
  function Ie(e) {
    let t = O.fetchers.get(e);
    (I.has(e) && !(t && t.state === `loading` && le.has(e)) && K(e),
      de.delete(e),
      le.delete(e),
      ue.delete(e),
      L.delete(e),
      oe.delete(e),
      O.fetchers.delete(e));
  }
  function Le(e) {
    let t = (fe.get(e) || 0) - 1;
    (t <= 0 ? (fe.delete(e), L.add(e)) : fe.set(e, t),
      B({ fetchers: new Map(O.fetchers) }));
  }
  function K(e, t) {
    let n = I.get(e);
    n && (n.abort(t), I.delete(e));
  }
  function Re(e) {
    for (let t of e) {
      let e = fn(Me(t).data);
      O.fetchers.set(t, e);
    }
  }
  function ze() {
    let e = [],
      t = !1;
    for (let n of ue) {
      let r = O.fetchers.get(n);
      (h(r, `Expected fetcher: ${n}`),
        r.state === `loading` && (ue.delete(n), e.push(n), (t = !0)));
    }
    return (Re(e), t);
  }
  function Be(e) {
    let t = [];
    for (let [n, r] of le)
      if (r < e) {
        let e = O.fetchers.get(n);
        (h(e, `Expected fetcher: ${n}`),
          e.state === `loading` && (K(n), le.delete(n), t.push(n)));
      }
    return (Re(t), t.length > 0);
  }
  function Ve(e, t) {
    let n = O.blockers.get(e) || Xe;
    return (R.get(e) !== t && R.set(e, t), n);
  }
  function He(e) {
    (O.blockers.delete(e), R.delete(e));
  }
  function Ue(e, t) {
    let n = O.blockers.get(e) || Xe;
    h(
      (n.state === `unblocked` && t.state === `blocked`) ||
        (n.state === `blocked` && t.state === `blocked`) ||
        (n.state === `blocked` && t.state === `proceeding`) ||
        (n.state === `blocked` && t.state === `unblocked`) ||
        (n.state === `proceeding` && t.state === `unblocked`),
      `Invalid blocker state transition: ${n.state} -> ${t.state}`,
    );
    let r = new Map(O.blockers);
    (r.set(e, t), B({ blockers: r }));
  }
  function We({ currentLocation: e, nextLocation: t, historyAction: n }) {
    if (R.size === 0) return;
    R.size > 1 && g(!1, `A router only supports one blocker at a time`);
    let r = Array.from(R.entries()),
      [i, a] = r[r.length - 1],
      o = O.blockers.get(i);
    if (
      !(o && o.state === `proceeding`) &&
      a({ currentLocation: e, nextLocation: t, historyAction: n })
    )
      return i;
  }
  function Ge(e) {
    let t = J(404, { pathname: e }),
      n = s.activeRoutes,
      { matches: r, route: i } = Wt(n);
    return { notFoundMatches: r, route: i, error: t };
  }
  function Ke(e, t, n) {
    if (((p = e), (_ = t), (m = n || null), !v && O.navigation === Je)) {
      v = !0;
      let e = et(O.location, O.matches);
      e != null && B({ restoreScrollPosition: e });
    }
    return () => {
      ((p = null), (_ = null), (m = null));
    };
  }
  function Qe(e, t) {
    return (
      (m &&
        m(
          e,
          t.map((e) => ne(e, O.loaderData)),
        )) ||
      e.key
    );
  }
  function $e(e, t) {
    if (p && _) {
      let n = Qe(e, t);
      p[n] = _();
    }
  }
  function et(e, t) {
    if (p) {
      let n = Qe(e, t),
        r = p[n];
      if (typeof r == `number`) return r;
    }
    return null;
  }
  function tt(t, n, r) {
    if (e.patchRoutesOnNavigation) {
      let e = s.branches;
      if (!t) return { active: !0, matches: N(n, r, c, !0, e) || [] };
      if (Object.keys(t[0].params).length > 0)
        return { active: !0, matches: N(n, r, c, !0, e) };
    }
    return { active: !1, matches: null };
  }
  async function q(t, n, r, i) {
    if (!e.patchRoutesOnNavigation) return { type: `success`, matches: t };
    let l = t;
    for (;;) {
      let t = o;
      try {
        await e.patchRoutesOnNavigation({
          signal: r,
          path: n,
          matches: l,
          fetcherKey: i,
          patch: (e, n) => {
            r.aborted || mt(e, n, s, t, a, !1);
          },
        });
      } catch (e) {
        return { type: `error`, error: e, partialMatches: l };
      }
      if (r.aborted) return { type: `aborted` };
      let u = s.branches,
        d = N(s.activeRoutes, n, c, !1, u),
        f = null;
      if (
        d &&
        (Object.keys(d[0].params).length === 0 ||
          ((f = N(s.activeRoutes, n, c, !0, u)),
          !(f && l.length < f.length && nt(l, f.slice(0, l.length)))))
      )
        return { type: `success`, matches: d };
      if (((f ||= N(s.activeRoutes, n, c, !0, u)), !f || nt(l, f)))
        return { type: `success`, matches: null };
      l = f;
    }
  }
  function nt(e, t) {
    return (
      e.length === t.length && e.every((e, n) => e.route.id === t[n].route.id)
    );
  }
  function it(e) {
    ((o = {}), s.setHmrRoutes(te(e, a, void 0, o)));
  }
  function at(e, t, n = !1) {
    (mt(e, t, s, o, a, n), s.hasHMRRoutes || B({}));
  }
  return (
    (D = {
      get basename() {
        return c;
      },
      get future() {
        return u;
      },
      get state() {
        return O;
      },
      get routes() {
        return s.stableRoutes;
      },
      get branches() {
        return s.branches;
      },
      get manifest() {
        return o;
      },
      get window() {
        return t;
      },
      initialize: he,
      subscribe: ve,
      enableScrollRestoration: Ke,
      navigate: be,
      fetch: Te,
      revalidate: xe,
      createHref: (t) => e.history.createHref(t),
      encodeLocation: (t) => e.history.encodeLocation(t),
      getFetcher: Me,
      resetFetcher: Fe,
      deleteFetcher: Le,
      dispose: ge,
      getBlocker: Ve,
      deleteBlocker: He,
      patchRoutes: at,
      _internalFetchControllers: I,
      _internalSetRoutes: it,
      _internalSetStateDoNotUseOrYouWillBreakYourApp(e) {
        B(e);
      },
    }),
    e.instrumentations &&
      (D = Pe(D, e.instrumentations.map((e) => e.router).filter(Boolean))),
    D
  );
}
function at(e) {
  return (
    e != null &&
    ((`formData` in e && e.formData != null) ||
      (`body` in e && e.body !== void 0))
  );
}
function ot(e, t, n, r, i, a) {
  let o, s;
  if (i) {
    o = [];
    for (let e of t)
      if ((o.push(e), e.route.id === i)) {
        s = e;
        break;
      }
  } else ((o = t), (s = t[t.length - 1]));
  let c = V(r || `.`, xe(o), z(e.pathname, n) || e.pathname, a === `path`);
  if (
    (r ?? ((c.search = e.search), (c.hash = e.hash)),
    (r == null || r === `` || r === `.`) && s)
  ) {
    let e = an(c.search);
    if (s.route.index && !e)
      c.search = c.search ? c.search.replace(/^\?/, `?index&`) : `?index`;
    else if (!s.route.index && e) {
      let e = new URLSearchParams(c.search),
        t = e.getAll(`index`);
      (e.delete(`index`),
        t.filter((e) => e).forEach((t) => e.append(`index`, t)));
      let n = e.toString();
      c.search = n ? `?${n}` : ``;
    }
  }
  return (
    n !== `/` && (c.pathname = he({ basename: n, pathname: c.pathname })),
    b(c)
  );
}
function st(e, t, n) {
  if (!n || !at(n)) return { path: t };
  if (n.formMethod && !rn(n.formMethod))
    return { path: t, error: J(405, { method: n.formMethod }) };
  let r = () => ({ path: t, error: J(400, { type: `invalid-body` }) }),
    i = (n.formMethod || `get`).toUpperCase(),
    a = Kt(t);
  if (n.body !== void 0) {
    if (n.formEncType === `text/plain`) {
      if (!X(i)) return r();
      let e =
        typeof n.body == `string`
          ? n.body
          : n.body instanceof FormData || n.body instanceof URLSearchParams
            ? Array.from(n.body.entries()).reduce(
                (e, [t, n]) => `${e}${t}=${n}
`,
                ``,
              )
            : String(n.body);
      return {
        path: t,
        submission: {
          formMethod: i,
          formAction: a,
          formEncType: n.formEncType,
          formData: void 0,
          json: void 0,
          text: e,
        },
      };
    } else if (n.formEncType === `application/json`) {
      if (!X(i)) return r();
      try {
        let e = typeof n.body == `string` ? JSON.parse(n.body) : n.body;
        return {
          path: t,
          submission: {
            formMethod: i,
            formAction: a,
            formEncType: n.formEncType,
            formData: void 0,
            json: e,
            text: void 0,
          },
        };
      } catch {
        return r();
      }
    }
  }
  h(
    typeof FormData == `function`,
    `FormData is not available in this environment`,
  );
  let o, s;
  if (n.formData) ((o = Lt(n.formData)), (s = n.formData));
  else if (n.body instanceof FormData) ((o = Lt(n.body)), (s = n.body));
  else if (n.body instanceof URLSearchParams) ((o = n.body), (s = Rt(o)));
  else if (n.body == null) ((o = new URLSearchParams()), (s = new FormData()));
  else
    try {
      ((o = new URLSearchParams(n.body)), (s = Rt(o)));
    } catch {
      return r();
    }
  let c = {
    formMethod: i,
    formAction: a,
    formEncType: (n && n.formEncType) || `application/x-www-form-urlencoded`,
    formData: s,
    json: void 0,
    text: void 0,
  };
  if (X(c.formMethod)) return { path: t, submission: c };
  let l = x(t);
  return (
    e && l.search && an(l.search) && o.append(`index`, ``),
    (l.search = `?${o}`),
    { path: b(l), submission: c }
  );
}
function ct(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x) {
  let S = b ? (Y(b[1]) ? b[1].error : b[1].data) : void 0,
    C = i.createURL(a.location),
    w = i.createURL(c),
    T;
  if (u && a.errors) {
    let e = Object.keys(a.errors)[0];
    T = o.findIndex((t) => t.route.id === e);
  } else if (b && Y(b[1])) {
    let e = b[0];
    T = o.findIndex((t) => t.route.id === e) - 1;
  }
  let ee = b ? b[1].statusCode : void 0,
    E = ee && ee >= 400,
    D = {
      currentUrl: C,
      currentParams: a.matches[0]?.params || {},
      nextUrl: w,
      nextParams: o[0].params,
      ...s,
      actionResult: S,
      actionStatus: ee,
    },
    O = je(o),
    k = o.map((i, o) => {
      let { route: s } = i,
        f = null;
      if (T != null && o > T) f = !1;
      else if (s.lazy) f = !0;
      else if (!lt(s)) f = !1;
      else if (u) {
        let { shouldLoad: e } = ut(s, a.loaderData, a.errors);
        f = e;
      } else dt(a.loaderData, a.matches[o], i) && (f = !0);
      if (f !== null) return Et(n, r, e, c, O, i, l, t, f);
      let p = !1;
      typeof x == `boolean`
        ? (p = x)
        : E
          ? (p = !1)
          : d || C.pathname + C.search === w.pathname + w.search
            ? (p = !0)
            : C.search === w.search
              ? ft(a.matches[o], i) && (p = !0)
              : (p = !0);
      let m = { ...D, defaultShouldRevalidate: p };
      return Et(n, r, e, c, O, i, l, t, pt(i, m), m, x);
    }),
    A = [];
  return (
    m.forEach((e, s) => {
      if (u || !o.some((t) => t.route.id === e.routeId) || p.has(s)) return;
      let c = a.fetchers.get(s),
        m = c && c.state !== `idle` && c.data === void 0,
        b = N(g, e.path, _ ?? `/`, !1, y);
      if (!b) {
        if (v && m) return;
        A.push({
          key: s,
          routeId: e.routeId,
          path: e.path,
          matches: null,
          match: null,
          request: null,
          controller: null,
        });
        return;
      }
      if (h.has(s)) return;
      let S = on(b, e.path),
        C = new AbortController(),
        w = Ft(i, e.path, C.signal),
        T = null;
      if (f.has(s)) (f.delete(s), (T = Dt(n, r, w, e.path, b, S, l, t)));
      else if (m) d && (T = Dt(n, r, w, e.path, b, S, l, t));
      else {
        let i;
        i = typeof x == `boolean` ? x : E ? !1 : d;
        let a = { ...D, defaultShouldRevalidate: i };
        pt(S, a) && (T = Dt(n, r, w, e.path, b, S, l, t, a));
      }
      T &&
        A.push({
          key: s,
          routeId: e.routeId,
          path: e.path,
          matches: T,
          match: S,
          request: w,
          controller: C,
        });
    }),
    { dsMatches: k, revalidatingFetchers: A }
  );
}
function lt(e) {
  return e.loader != null || (e.middleware != null && e.middleware.length > 0);
}
function ut(e, t, n) {
  if (e.lazy) return { shouldLoad: !0, renderFallback: !0 };
  if (!lt(e)) return { shouldLoad: !1, renderFallback: !1 };
  let r = t != null && e.id in t,
    i = n != null && n[e.id] !== void 0;
  if (!r && i) return { shouldLoad: !1, renderFallback: !1 };
  if (typeof e.loader == `function` && e.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !r };
  let a = !r && !i;
  return { shouldLoad: a, renderFallback: a };
}
function dt(e, t, n) {
  let r = !t || n.route.id !== t.route.id,
    i = !e.hasOwnProperty(n.route.id);
  return r || i;
}
function ft(e, t) {
  let n = e.route.path;
  return (
    e.pathname !== t.pathname ||
    (n != null && n.endsWith(`*`) && e.params[`*`] !== t.params[`*`])
  );
}
function pt(e, t) {
  if (e.route.shouldRevalidate) {
    let n = e.route.shouldRevalidate(t);
    if (typeof n == `boolean`) return n;
  }
  return t.defaultShouldRevalidate;
}
function mt(e, t, n, r, i, a) {
  let o;
  if (e) {
    let t = r[e];
    (h(t, `No route found to patch children into: routeId = ${e}`),
      (t.children ||= []),
      (o = t.children));
  } else o = n.activeRoutes;
  let s = [],
    c = [];
  if (
    (t.forEach((e) => {
      let t = o.find((t) => ht(e, t));
      t ? c.push({ existingRoute: t, newRoute: e }) : s.push(e);
    }),
    s.length > 0)
  ) {
    let t = te(s, i, [e || `_`, `patch`, String(o?.length || `0`)], r);
    o.push(...t);
  }
  if (a && c.length > 0)
    for (let e = 0; e < c.length; e++) {
      let { existingRoute: t, newRoute: n } = c[e],
        r = t,
        [a] = te([n], i, [], {}, !0);
      Object.assign(r, {
        element: a.element ? a.element : r.element,
        errorElement: a.errorElement ? a.errorElement : r.errorElement,
        hydrateFallbackElement: a.hydrateFallbackElement
          ? a.hydrateFallbackElement
          : r.hydrateFallbackElement,
      });
    }
  n.hasHMRRoutes || n.setRoutes([...n.activeRoutes]);
}
function ht(e, t) {
  return `id` in e && `id` in t && e.id === t.id
    ? !0
    : e.index === t.index &&
        e.path === t.path &&
        e.caseSensitive === t.caseSensitive
      ? (!e.children || e.children.length === 0) &&
        (!t.children || t.children.length === 0)
        ? !0
        : (e.children?.every((e, n) => t.children?.some((t) => ht(e, t))) ?? !1)
      : !1;
}
var gt = new WeakMap(),
  _t = ({ key: e, route: t, manifest: n, mapRouteProperties: r }) => {
    let i = n[t.id];
    if (
      (h(i, `No route found in manifest`), !i.lazy || typeof i.lazy != `object`)
    )
      return;
    let a = i.lazy[e];
    if (!a) return;
    let o = gt.get(i);
    o || ((o = {}), gt.set(i, o));
    let s = o[e];
    if (s) return s;
    let c = (async () => {
      let t = D(e),
        n = i[e] !== void 0 && e !== `hasErrorBoundary`;
      if (t)
        (g(
          !t,
          `Route property ` +
            e +
            ` is not a supported lazy route property. This property will be ignored.`,
        ),
          (o[e] = Promise.resolve()));
      else if (n)
        g(
          !1,
          `Route "${i.id}" has a static property "${e}" defined. The lazy property will be ignored.`,
        );
      else {
        let t = await a();
        t != null && (Object.assign(i, { [e]: t }), Object.assign(i, r(i)));
      }
      typeof i.lazy == `object` &&
        ((i.lazy[e] = void 0),
        Object.values(i.lazy).every((e) => e === void 0) && (i.lazy = void 0));
    })();
    return ((o[e] = c), c);
  },
  vt = new WeakMap();
function yt(e, t, n, r, i) {
  let a = n[e.id];
  if ((h(a, `No route found in manifest`), !e.lazy))
    return { lazyRoutePromise: void 0, lazyHandlerPromise: void 0 };
  if (typeof e.lazy == `function`) {
    let t = vt.get(a);
    if (t) return { lazyRoutePromise: t, lazyHandlerPromise: t };
    let n = (async () => {
      h(typeof e.lazy == `function`, `No lazy route function found`);
      let t = await e.lazy(),
        n = {};
      for (let e in t) {
        let r = t[e];
        if (r === void 0) continue;
        let i = k(e),
          o = a[e] !== void 0 && e !== `hasErrorBoundary`;
        i
          ? g(
              !i,
              `Route property ` +
                e +
                ` is not a supported property to be returned from a lazy route function. This property will be ignored.`,
            )
          : o
            ? g(
                !o,
                `Route "${a.id}" has a static property "${e}" defined but its lazy function is also returning a value for this property. The lazy route property "${e}" will be ignored.`,
              )
            : (n[e] = r);
      }
      (Object.assign(a, n), Object.assign(a, { ...r(a), lazy: void 0 }));
    })();
    return (
      vt.set(a, n),
      n.catch(() => {}),
      { lazyRoutePromise: n, lazyHandlerPromise: n }
    );
  }
  let o = Object.keys(e.lazy),
    s = [],
    c;
  for (let a of o) {
    if (i && i.includes(a)) continue;
    let o = _t({ key: a, route: e, manifest: n, mapRouteProperties: r });
    o && (s.push(o), a === t && (c = o));
  }
  let l = s.length > 0 ? Promise.all(s).then(() => {}) : void 0;
  return (
    l?.catch(() => {}),
    c?.catch(() => {}),
    { lazyRoutePromise: l, lazyHandlerPromise: c }
  );
}
async function bt(e) {
  let t = e.matches.filter((e) => e.shouldLoad),
    n = {};
  return (
    (await Promise.all(t.map((e) => e.resolve()))).forEach((e, r) => {
      n[t[r].route.id] = e;
    }),
    n
  );
}
async function xt(e) {
  return e.matches.some((e) => e.route.middleware) ? St(e, () => bt(e)) : bt(e);
}
function St(e, t) {
  return Ct(
    e,
    t,
    (e) => {
      if (nn(e)) throw e;
      return e;
    },
    Yt,
    n,
  );
  function n(t, n, r) {
    if (r)
      return Promise.resolve(
        Object.assign(r.value, { [n]: { type: `error`, result: t } }),
      );
    {
      let { matches: r } = e,
        i = Ut(
          r,
          r[
            Math.min(
              Math.max(
                r.findIndex((e) => e.route.id === n),
                0,
              ),
              Math.max(
                r.findIndex((e) => e.shouldCallHandler()),
                0,
              ),
            )
          ].route.id,
        ).route.id;
      return Promise.resolve({ [i]: { type: `error`, result: t } });
    }
  }
}
async function Ct(e, t, n, r, i) {
  let { matches: a, ...o } = e;
  return await wt(
    o,
    a.flatMap((e) =>
      e.route.middleware ? e.route.middleware.map((t) => [e.route.id, t]) : [],
    ),
    t,
    n,
    r,
    i,
  );
}
async function wt(e, t, n, r, i, a, o = 0) {
  let { request: s } = e;
  if (s.signal.aborted)
    throw s.signal.reason ?? Error(`Request aborted: ${s.method} ${s.url}`);
  let c = t[o];
  if (!c) return await n();
  let [l, u] = c,
    d,
    f = async () => {
      if (d) throw Error("You may only call `next()` once per middleware");
      try {
        return ((d = { value: await wt(e, t, n, r, i, a, o + 1) }), d.value);
      } catch (e) {
        return ((d = { value: await a(e, l, d) }), d.value);
      }
    };
  try {
    let t = await u(e, f),
      n = t == null ? void 0 : r(t);
    return i(n)
      ? n
      : d
        ? (n ?? d.value)
        : ((d = { value: await f() }), d.value);
  } catch (e) {
    return await a(e, l, d);
  }
}
function Tt(e, t, n, r, i) {
  let a = _t({
      key: `middleware`,
      route: r.route,
      manifest: t,
      mapRouteProperties: e,
    }),
    o = yt(r.route, X(n.method) ? `action` : `loader`, t, e, i);
  return {
    middleware: a,
    route: o.lazyRoutePromise,
    handler: o.lazyHandlerPromise,
  };
}
function Et(e, t, n, r, i, a, o, s, c, l = null, u) {
  let d = !1,
    f = Tt(e, t, n, a, o);
  return {
    ...a,
    _lazyPromises: f,
    shouldLoad: c,
    shouldRevalidateArgs: l,
    shouldCallHandler(e) {
      return (
        (d = !0),
        l
          ? typeof u == `boolean`
            ? pt(a, { ...l, defaultShouldRevalidate: u })
            : typeof e == `boolean`
              ? pt(a, { ...l, defaultShouldRevalidate: e })
              : pt(a, l)
          : c
      );
    },
    resolve(e) {
      let { lazy: t, loader: o, middleware: l } = a.route,
        u = d || c || (e && !X(n.method) && (t || o)),
        p = l && l.length > 0 && !o && !t;
      return u && (X(n.method) || !p)
        ? kt({
            request: n,
            path: r,
            pattern: i,
            match: a,
            lazyHandlerPromise: f?.handler,
            lazyRoutePromise: f?.route,
            handlerOverride: e,
            scopedContext: s,
          })
        : Promise.resolve({ type: `data`, result: void 0 });
    },
  };
}
function Dt(e, t, n, r, i, a, o, s, c = null) {
  return i.map((l) =>
    l.route.id === a.route.id
      ? Et(e, t, n, r, je(i), l, o, s, !0, c)
      : {
          ...l,
          shouldLoad: !1,
          shouldRevalidateArgs: c,
          shouldCallHandler: () => !1,
          _lazyPromises: Tt(e, t, n, l, o),
          resolve: () => Promise.resolve({ type: `data`, result: void 0 }),
        },
  );
}
async function Ot(e, t, n, r, i, a, o) {
  r.some((e) => e._lazyPromises?.middleware) &&
    (await Promise.all(r.map((e) => e._lazyPromises?.middleware)));
  let s = {
      request: t,
      url: It(t, n),
      pattern: je(r),
      params: r[0].params,
      context: a,
      matches: r,
    },
    c = o
      ? () => {
          throw Error(
            "You cannot call `runClientMiddleware()` from a static handler `dataStrategy`. Middleware is run outside of `dataStrategy` during SSR in order to bubble up the Response.  You can enable middleware via the `respond` API in `query`/`queryRoute`",
          );
        }
      : (e) => {
          let t = s;
          return St(t, () =>
            e({
              ...t,
              fetcherKey: i,
              runClientMiddleware: () => {
                throw Error(
                  "Cannot call `runClientMiddleware()` from within an `runClientMiddleware` handler",
                );
              },
            }),
          );
        },
    l = await e({ ...s, fetcherKey: i, runClientMiddleware: c });
  try {
    await Promise.all(
      r.flatMap((e) => [e._lazyPromises?.handler, e._lazyPromises?.route]),
    );
  } catch {}
  return l;
}
async function kt({
  request: e,
  path: t,
  pattern: n,
  match: r,
  lazyHandlerPromise: i,
  lazyRoutePromise: a,
  handlerOverride: o,
  scopedContext: s,
}) {
  let c,
    l,
    u = X(e.method),
    d = u ? `action` : `loader`,
    f = (i) => {
      let a,
        c = new Promise((e, t) => (a = t));
      ((l = () => a()), e.signal.addEventListener(`abort`, l));
      let u = (a) =>
          typeof i == `function`
            ? i(
                {
                  request: e,
                  url: It(e, t),
                  pattern: n,
                  params: r.params,
                  context: s,
                },
                ...(a === void 0 ? [] : [a]),
              )
            : Promise.reject(
                Error(
                  `You cannot call the handler for a route which defines a boolean "${d}" [routeId: ${r.route.id}]`,
                ),
              ),
        f = (async () => {
          try {
            return { type: `data`, result: await (o ? o((e) => u(e)) : u()) };
          } catch (e) {
            return { type: `error`, result: e };
          }
        })();
      return Promise.race([f, c]);
    };
  try {
    let t = u ? r.route.action : r.route.loader;
    if (i || a)
      if (t) {
        let e,
          [n] = await Promise.all([
            f(t).catch((t) => {
              e = t;
            }),
            i,
            a,
          ]);
        if (e !== void 0) throw e;
        c = n;
      } else {
        await i;
        let t = u ? r.route.action : r.route.loader;
        if (t) [c] = await Promise.all([f(t), a]);
        else if (d === `action`) {
          let t = new URL(e.url),
            n = t.pathname + t.search;
          throw J(405, { method: e.method, pathname: n, routeId: r.route.id });
        } else return { type: `data`, result: void 0 };
      }
    else if (t) c = await f(t);
    else {
      let t = new URL(e.url);
      throw J(404, { pathname: t.pathname + t.search });
    }
  } catch (e) {
    return { type: `error`, result: e };
  } finally {
    l && e.signal.removeEventListener(`abort`, l);
  }
  return c;
}
async function At(e) {
  let t = e.headers.get(`Content-Type`);
  return t && /\bapplication\/json\b/.test(t)
    ? e.body == null
      ? null
      : e.json()
    : e.text();
}
async function jt(e) {
  let { result: t, type: n } = e;
  if (en(t)) {
    let e;
    try {
      e = await At(t);
    } catch (e) {
      return { type: `error`, error: e };
    }
    return n === `error`
      ? {
          type: `error`,
          error: new U(t.status, t.statusText, e),
          statusCode: t.status,
          headers: t.headers,
        }
      : { type: `data`, data: e, statusCode: t.status, headers: t.headers };
  }
  return n === `error`
    ? $t(t)
      ? t.data instanceof Error
        ? {
            type: `error`,
            error: t.data,
            statusCode: t.init?.status,
            headers: t.init?.headers ? new Headers(t.init.headers) : void 0,
          }
        : {
            type: `error`,
            error: Jt(t),
            statusCode: Ae(t) ? t.status : void 0,
            headers: t.init?.headers ? new Headers(t.init.headers) : void 0,
          }
      : { type: `error`, error: t, statusCode: Ae(t) ? t.status : void 0 }
    : $t(t)
      ? {
          type: `data`,
          data: t.data,
          statusCode: t.init?.status,
          headers: t.init?.headers ? new Headers(t.init.headers) : void 0,
        }
      : { type: `data`, data: t };
}
function Mt(e, t, n, r, i) {
  let a = e.headers.get(`Location`);
  if (
    (h(
      a,
      `Redirects returned/thrown from loaders/actions must have a Location header`,
    ),
    !_e(a))
  ) {
    let o = r.slice(0, r.findIndex((e) => e.route.id === n) + 1);
    ((a = ot(new URL(t.url), o, i, a)), e.headers.set(`Location`, a));
  }
  return e;
}
var Nt = [
  `about:`,
  `blob:`,
  `chrome:`,
  `chrome-untrusted:`,
  `content:`,
  `data:`,
  `devtools:`,
  `file:`,
  `filesystem:`,
  `javascript:`,
];
function Pt(e, t, n, r) {
  if (_e(e)) {
    let r = e,
      i = r.startsWith(`//`) ? new URL(t.protocol + r) : new URL(r);
    if (Nt.includes(i.protocol)) throw Error(`Invalid redirect location`);
    let a = z(i.pathname, n) != null;
    if (i.origin === t.origin && a) return Se(i.pathname) + i.search + i.hash;
  }
  try {
    let t = r.createURL(e);
    if (Nt.includes(t.protocol)) throw Error(`Invalid redirect location`);
  } catch {}
  return e;
}
function Ft(e, t, n, r) {
  let i = e.createURL(Kt(t)).toString(),
    a = { signal: n };
  if (r && X(r.formMethod)) {
    let { formMethod: e, formEncType: t } = r;
    ((a.method = e.toUpperCase()),
      t === `application/json`
        ? ((a.headers = new Headers({ "Content-Type": t })),
          (a.body = JSON.stringify(r.json)))
        : t === `text/plain`
          ? (a.body = r.text)
          : t === `application/x-www-form-urlencoded` && r.formData
            ? (a.body = Lt(r.formData))
            : (a.body = r.formData));
  }
  return new Request(i, a);
}
function It(e, t) {
  let n = new URL(e.url),
    r = typeof t == `string` ? x(t) : t;
  if (((n.pathname = r.pathname || `/`), r.search)) {
    let e = new URLSearchParams(r.search),
      t = e.getAll(`index`);
    e.delete(`index`);
    for (let n of t.filter(Boolean)) e.append(`index`, n);
    n.search = e.size ? `?${e.toString()}` : ``;
  } else n.search = ``;
  return ((n.hash = r.hash || ``), n);
}
function Lt(e) {
  let t = new URLSearchParams();
  for (let [n, r] of e.entries())
    t.append(n, typeof r == `string` ? r : r.name);
  return t;
}
function Rt(e) {
  let t = new FormData();
  for (let [n, r] of e.entries()) t.append(n, r);
  return t;
}
function zt(e, t, n, r = !1, i = !1) {
  let a = {},
    o = null,
    s,
    c = !1,
    l = {},
    u = n && Y(n[1]) ? n[1].error : void 0;
  return (
    e.forEach((n) => {
      if (!(n.route.id in t)) return;
      let d = n.route.id,
        f = t[d];
      if (
        (h(!Qt(f), `Cannot handle redirect results in processLoaderData`), Y(f))
      ) {
        let t = f.error;
        if ((u !== void 0 && ((t = u), (u = void 0)), (o ||= {}), i)) o[d] = t;
        else {
          let n = Ut(e, d);
          o[n.route.id] ?? (o[n.route.id] = t);
        }
        (r || (a[d] = $e),
          c || ((c = !0), (s = Ae(f.error) ? f.error.status : 500)),
          f.headers && (l[d] = f.headers));
      } else
        ((a[d] = f.data),
          f.statusCode && f.statusCode !== 200 && !c && (s = f.statusCode),
          f.headers && (l[d] = f.headers));
    }),
    u !== void 0 && n && ((o = { [n[0]]: u }), n[2] && (a[n[2]] = void 0)),
    { loaderData: a, errors: o, statusCode: s || 200, loaderHeaders: l }
  );
}
function Bt(e, t, n, r, i, a) {
  let { loaderData: o, errors: s } = zt(t, n, r);
  return (
    i
      .filter((e) => !e.matches || e.matches.some((e) => e.shouldLoad))
      .forEach((t) => {
        let { key: n, match: r, controller: i } = t;
        if (i && i.signal.aborted) return;
        let o = a[n];
        if ((h(o, `Did not find corresponding fetcher result`), Y(o))) {
          let t = Ut(e.matches, r?.route.id);
          ((s && s[t.route.id]) || (s = { ...s, [t.route.id]: o.error }),
            e.fetchers.delete(n));
        } else if (Qt(o)) h(!1, `Unhandled fetcher revalidation redirect`);
        else {
          let t = fn(o.data);
          e.fetchers.set(n, t);
        }
      }),
    { loaderData: o, errors: s }
  );
}
function Vt(e, t, n, r) {
  let i = Object.entries(t)
    .filter(([, e]) => e !== $e)
    .reduce((e, [t, n]) => ((e[t] = n), e), {});
  for (let a of n) {
    let n = a.route.id;
    if (
      (!t.hasOwnProperty(n) &&
        e.hasOwnProperty(n) &&
        a.route.loader &&
        (i[n] = e[n]),
      r && r.hasOwnProperty(n))
    )
      break;
  }
  return i;
}
function Ht(e) {
  return e
    ? Y(e[1])
      ? { actionData: {} }
      : { actionData: { [e[0]]: e[1].data } }
    : {};
}
function Ut(e, t) {
  return (
    (t ? e.slice(0, e.findIndex((e) => e.route.id === t) + 1) : [...e])
      .reverse()
      .find((e) => e.route.hasErrorBoundary === !0) || e[0]
  );
}
function Wt(e) {
  let t =
    e.length === 1
      ? e[0]
      : e.find((e) => e.index || !e.path || e.path === `/`) || {
          id: `__shim-error-route__`,
        };
  return {
    matches: [{ params: {}, pathname: ``, pathnameBase: ``, route: t }],
    route: t,
  };
}
function J(
  e,
  { pathname: t, routeId: n, method: r, type: i, message: a } = {},
) {
  let o = `Unknown Server Error`,
    s = `Unknown @remix-run/router error`;
  return (
    e === 400
      ? ((o = `Bad Request`),
        r && t && n
          ? (s = `You made a ${r} request to "${t}" but did not provide a \`loader\` for route "${n}", so there is no way to handle the request.`)
          : i === `invalid-body` && (s = `Unable to encode submission body`))
      : e === 403
        ? ((o = `Forbidden`), (s = `Route "${n}" does not match URL "${t}"`))
        : e === 404
          ? ((o = `Not Found`), (s = `No route matches URL "${t}"`))
          : e === 405 &&
            ((o = `Method Not Allowed`),
            r && t && n
              ? (s = `You made a ${r.toUpperCase()} request to "${t}" but did not provide an \`action\` for route "${n}", so there is no way to handle the request.`)
              : r && (s = `Invalid request method "${r.toUpperCase()}"`)),
    new U(e || 500, o, Error(s), !0)
  );
}
function Gt(e) {
  let t = Object.entries(e);
  for (let e = t.length - 1; e >= 0; e--) {
    let [n, r] = t[e];
    if (Qt(r)) return { key: n, result: r };
  }
}
function Kt(e) {
  return b({ ...(typeof e == `string` ? x(e) : e), hash: `` });
}
function qt(e, t) {
  return e.pathname !== t.pathname || e.search !== t.search
    ? !1
    : e.hash === ``
      ? t.hash !== ``
      : e.hash === t.hash
        ? !0
        : t.hash !== ``;
}
function Jt(e) {
  return new U(
    e.init?.status ?? 500,
    e.init?.statusText ?? `Internal Server Error`,
    e.data,
  );
}
function Yt(e) {
  return (
    typeof e == `object` &&
    !!e &&
    Object.entries(e).every(([e, t]) => typeof e == `string` && Xt(t))
  );
}
function Xt(e) {
  return (
    typeof e == `object` &&
    !!e &&
    `type` in e &&
    `result` in e &&
    (e.type === `data` || e.type === `error`)
  );
}
function Zt(e) {
  return en(e.result) && Ke.has(e.result.status);
}
function Y(e) {
  return e.type === `error`;
}
function Qt(e) {
  return (e && e.type) === `redirect`;
}
function $t(e) {
  return (
    typeof e == `object` &&
    !!e &&
    `type` in e &&
    `data` in e &&
    `init` in e &&
    e.type === `DataWithResponseInit`
  );
}
function en(e) {
  return (
    e != null &&
    typeof e.status == `number` &&
    typeof e.statusText == `string` &&
    typeof e.headers == `object` &&
    e.body !== void 0
  );
}
function tn(e) {
  return Ke.has(e);
}
function nn(e) {
  return en(e) && tn(e.status) && e.headers.has(`Location`);
}
function rn(e) {
  return Ge.has(e.toUpperCase());
}
function X(e) {
  return Ue.has(e.toUpperCase());
}
function an(e) {
  return new URLSearchParams(e).getAll(`index`).some((e) => e === ``);
}
function on(e, t) {
  let n = typeof t == `string` ? x(t).search : t.search;
  if (e[e.length - 1].route.index && an(n || ``)) return e[e.length - 1];
  let r = be(e);
  return r[r.length - 1];
}
function sn(e) {
  let {
    formMethod: t,
    formAction: n,
    formEncType: r,
    text: i,
    formData: a,
    json: o,
  } = e;
  if (!(!t || !n || !r)) {
    if (i != null)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: void 0,
        json: void 0,
        text: i,
      };
    if (a != null)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: a,
        json: void 0,
        text: void 0,
      };
    if (o !== void 0)
      return {
        formMethod: t,
        formAction: n,
        formEncType: r,
        formData: void 0,
        json: o,
        text: void 0,
      };
  }
}
function cn(e, t) {
  return t
    ? {
        state: `loading`,
        location: e,
        formMethod: t.formMethod,
        formAction: t.formAction,
        formEncType: t.formEncType,
        formData: t.formData,
        json: t.json,
        text: t.text,
      }
    : {
        state: `loading`,
        location: e,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
      };
}
function ln(e, t) {
  return {
    state: `submitting`,
    location: e,
    formMethod: t.formMethod,
    formAction: t.formAction,
    formEncType: t.formEncType,
    formData: t.formData,
    json: t.json,
    text: t.text,
  };
}
function un(e, t) {
  return e
    ? {
        state: `loading`,
        formMethod: e.formMethod,
        formAction: e.formAction,
        formEncType: e.formEncType,
        formData: e.formData,
        json: e.json,
        text: e.text,
        data: t,
      }
    : {
        state: `loading`,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: t,
      };
}
function dn(e, t) {
  return {
    state: `submitting`,
    formMethod: e.formMethod,
    formAction: e.formAction,
    formEncType: e.formEncType,
    formData: e.formData,
    json: e.json,
    text: e.text,
    data: t ? t.data : void 0,
  };
}
function fn(e) {
  return {
    state: `idle`,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: e,
  };
}
function pn(e, t) {
  try {
    let n = e.sessionStorage.getItem(Qe);
    if (n) {
      let e = JSON.parse(n);
      for (let [n, r] of Object.entries(e || {}))
        r && Array.isArray(r) && t.set(n, new Set(r || []));
    }
  } catch {}
}
function mn(e, t) {
  if (t.size > 0) {
    let n = {};
    for (let [e, r] of t) n[e] = [...r];
    try {
      e.sessionStorage.setItem(Qe, JSON.stringify(n));
    } catch (e) {
      g(
        !1,
        `Failed to save applied view transitions in sessionStorage (${e}).`,
      );
    }
  }
}
function hn() {
  let e,
    t,
    n = new Promise((r, i) => {
      ((e = async (e) => {
        r(e);
        try {
          await n;
        } catch {}
      }),
        (t = async (e) => {
          i(e);
          try {
            await n;
          } catch {}
        }));
    });
  return { promise: n, resolve: e, reject: t };
}
var gn = n.createContext(null);
gn.displayName = `DataRouter`;
var _n = n.createContext(null);
_n.displayName = `DataRouterState`;
var vn = n.createContext(!1);
function yn() {
  return n.useContext(vn);
}
var bn = n.createContext({ isTransitioning: !1 });
bn.displayName = `ViewTransition`;
var xn = n.createContext(new Map());
xn.displayName = `Fetchers`;
var Sn = n.createContext(null);
Sn.displayName = `Await`;
var Z = n.createContext(null);
Z.displayName = `Navigation`;
var Cn = n.createContext(null);
Cn.displayName = `Location`;
var wn = n.createContext({ outlet: null, matches: [], isDataRoute: !1 });
wn.displayName = `Route`;
var Tn = n.createContext(null);
Tn.displayName = `RouteError`;
var En = `REACT_ROUTER_ERROR`,
  Dn = `REDIRECT`,
  On = `ROUTE_ERROR_RESPONSE`;
function kn(e) {
  if (e.startsWith(`${En}:${Dn}:{`))
    try {
      let t = JSON.parse(e.slice(28));
      if (
        typeof t == `object` &&
        t &&
        typeof t.status == `number` &&
        typeof t.statusText == `string` &&
        typeof t.location == `string` &&
        typeof t.reloadDocument == `boolean` &&
        typeof t.replace == `boolean`
      )
        return t;
    } catch {}
}
function An(e) {
  if (e.startsWith(`${En}:${On}:{`))
    try {
      let t = JSON.parse(e.slice(40));
      if (
        typeof t == `object` &&
        t &&
        typeof t.status == `number` &&
        typeof t.statusText == `string`
      )
        return new U(t.status, t.statusText, t.data);
    } catch {}
}
function jn(e, { relative: t } = {}) {
  h(Mn(), `useHref() may be used only in the context of a <Router> component.`);
  let { basename: r, navigator: i } = n.useContext(Z),
    { hash: a, pathname: o, search: s } = Bn(e, { relative: t }),
    c = o;
  return (
    r !== `/` && (c = o === `/` ? r : H([r, o])),
    i.createHref({ pathname: c, search: s, hash: a })
  );
}
function Mn() {
  return n.useContext(Cn) != null;
}
function Q() {
  return (
    h(
      Mn(),
      `useLocation() may be used only in the context of a <Router> component.`,
    ),
    n.useContext(Cn).location
  );
}
var Nn = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`;
function Pn(e) {
  n.useContext(Z).static || n.useLayoutEffect(e);
}
function Fn() {
  let { isDataRoute: e } = n.useContext(wn);
  return e ? or() : In();
}
function In() {
  h(
    Mn(),
    `useNavigate() may be used only in the context of a <Router> component.`,
  );
  let e = n.useContext(gn),
    { basename: t, navigator: r } = n.useContext(Z),
    { matches: i } = n.useContext(wn),
    { pathname: a } = Q(),
    o = JSON.stringify(xe(i)),
    s = n.useRef(!1);
  return (
    Pn(() => {
      s.current = !0;
    }),
    n.useCallback(
      (n, i = {}) => {
        if ((g(s.current, Nn), !s.current)) return;
        if (typeof n == `number`) {
          r.go(n);
          return;
        }
        let c = V(n, JSON.parse(o), a, i.relative === `path`);
        (e == null &&
          t !== `/` &&
          (c.pathname = c.pathname === `/` ? t : H([t, c.pathname])),
          (i.replace ? r.replace : r.push)(c, i.state, i));
      },
      [t, r, o, a, e],
    )
  );
}
var Ln = n.createContext(null);
function Rn(e) {
  let t = n.useContext(wn).outlet;
  return n.useMemo(
    () => t && n.createElement(Ln.Provider, { value: e }, t),
    [t, e],
  );
}
function zn() {
  let { matches: e } = n.useContext(wn);
  return e[e.length - 1]?.params ?? {};
}
function Bn(e, { relative: t } = {}) {
  let { matches: r } = n.useContext(wn),
    { pathname: i } = Q(),
    a = JSON.stringify(xe(r));
  return n.useMemo(() => V(e, JSON.parse(a), i, t === `path`), [e, a, i, t]);
}
function Vn(e, t, r) {
  h(
    Mn(),
    `useRoutes() may be used only in the context of a <Router> component.`,
  );
  let { navigator: i } = n.useContext(Z),
    { matches: a } = n.useContext(wn),
    o = a[a.length - 1],
    s = o ? o.params : {},
    c = o ? o.pathname : `/`,
    l = o ? o.pathnameBase : `/`,
    u = o && o.route;
  {
    let e = (u && u.path) || ``;
    cr(
      c,
      !u || e.endsWith(`*`) || e.endsWith(`*?`),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${c}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e === `/` ? `*` : `${e}/*`}">.`,
    );
  }
  let d = Q(),
    f;
  if (t) {
    let e = typeof t == `string` ? x(t) : t;
    (h(
      l === `/` || e.pathname?.startsWith(l),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${l}" but pathname "${e.pathname}" was given in the \`location\` prop.`,
    ),
      (f = e));
  } else f = d;
  let p = f.pathname || `/`,
    m = p;
  if (l !== `/`) {
    let e = l.replace(/^\//, ``).split(`/`);
    m = `/` + p.replace(/^\//, ``).split(`/`).slice(e.length).join(`/`);
  }
  let _ =
    r && r.state.matches.length
      ? r.state.matches.map((e) =>
          Object.assign(e, { route: r.manifest[e.route.id] || e.route }),
        )
      : M(e, { pathname: m });
  (g(
    u || _ != null,
    `No routes matched location "${f.pathname}${f.search}${f.hash}" `,
  ),
    g(
      _ == null ||
        _[_.length - 1].route.element !== void 0 ||
        _[_.length - 1].route.Component !== void 0 ||
        _[_.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${f.pathname}${f.search}${f.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    ));
  let v = Jn(
    _ &&
      _.map((e) =>
        Object.assign({}, e, {
          params: Object.assign({}, s, e.params),
          pathname: H([
            l,
            i.encodeLocation
              ? i.encodeLocation(
                  e.pathname
                    .replace(/%/g, `%25`)
                    .replace(/\?/g, `%3F`)
                    .replace(/#/g, `%23`),
                ).pathname
              : e.pathname,
          ]),
          pathnameBase:
            e.pathnameBase === `/`
              ? l
              : H([
                  l,
                  i.encodeLocation
                    ? i.encodeLocation(
                        e.pathnameBase
                          .replace(/%/g, `%25`)
                          .replace(/\?/g, `%3F`)
                          .replace(/#/g, `%23`),
                      ).pathname
                    : e.pathnameBase,
                ]),
        }),
      ),
    a,
    r,
  );
  return t && v
    ? n.createElement(
        Cn.Provider,
        {
          value: {
            location: {
              pathname: `/`,
              search: ``,
              hash: ``,
              state: null,
              key: `default`,
              mask: void 0,
              ...f,
            },
            navigationType: `POP`,
          },
        },
        v,
      )
    : v;
}
function Hn() {
  let e = ar(),
    t = Ae(e)
      ? `${e.status} ${e.statusText}`
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    r = e instanceof Error ? e.stack : null,
    i = `rgba(200,200,200, 0.5)`,
    a = { padding: `0.5rem`, backgroundColor: i },
    o = { padding: `2px 4px`, backgroundColor: i },
    s = null;
  return (
    console.error(`Error handled by React Router default ErrorBoundary:`, e),
    (s = n.createElement(
      n.Fragment,
      null,
      n.createElement(`p`, null, `💿 Hey developer 👋`),
      n.createElement(
        `p`,
        null,
        `You can provide a way better UX than this when your app throws errors by providing your own `,
        n.createElement(`code`, { style: o }, `ErrorBoundary`),
        ` or`,
        ` `,
        n.createElement(`code`, { style: o }, `errorElement`),
        ` prop on your route.`,
      ),
    )),
    n.createElement(
      n.Fragment,
      null,
      n.createElement(`h2`, null, `Unexpected Application Error!`),
      n.createElement(`h3`, { style: { fontStyle: `italic` } }, t),
      r ? n.createElement(`pre`, { style: a }, r) : null,
      s,
    )
  );
}
var Un = n.createElement(Hn, null),
  Wn = class extends n.Component {
    constructor(e) {
      (super(e),
        (this.state = {
          location: e.location,
          revalidation: e.revalidation,
          error: e.error,
        }));
    }
    static getDerivedStateFromError(e) {
      return { error: e };
    }
    static getDerivedStateFromProps(e, t) {
      return t.location !== e.location ||
        (t.revalidation !== `idle` && e.revalidation === `idle`)
        ? { error: e.error, location: e.location, revalidation: e.revalidation }
        : {
            error: e.error === void 0 ? t.error : e.error,
            location: t.location,
            revalidation: e.revalidation || t.revalidation,
          };
    }
    componentDidCatch(e, t) {
      this.props.onError
        ? this.props.onError(e, t)
        : console.error(
            `React Router caught the following error during render`,
            e,
          );
    }
    render() {
      let e = this.state.error;
      if (
        this.context &&
        typeof e == `object` &&
        e &&
        `digest` in e &&
        typeof e.digest == `string`
      ) {
        let t = An(e.digest);
        t && (e = t);
      }
      let t =
        e === void 0
          ? this.props.children
          : n.createElement(
              wn.Provider,
              { value: this.props.routeContext },
              n.createElement(Tn.Provider, {
                value: e,
                children: this.props.component,
              }),
            );
      return this.context ? n.createElement(Kn, { error: e }, t) : t;
    }
  };
Wn.contextType = vn;
var Gn = new WeakMap();
function Kn({ children: e, error: t }) {
  let { basename: r } = n.useContext(Z);
  if (
    typeof t == `object` &&
    t &&
    `digest` in t &&
    typeof t.digest == `string`
  ) {
    let e = kn(t.digest);
    if (e) {
      let i = Gn.get(t);
      if (i) throw i;
      let a = G(e.location, r);
      if (W && !Gn.get(t))
        if (a.isExternal || e.reloadDocument)
          window.location.href = a.absoluteURL || a.to;
        else {
          let n = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(a.to, {
              replace: e.replace,
            }),
          );
          throw (Gn.set(t, n), n);
        }
      return n.createElement(`meta`, {
        httpEquiv: `refresh`,
        content: `0;url=${a.absoluteURL || a.to}`,
      });
    }
  }
  return e;
}
function qn({ routeContext: e, match: t, children: r }) {
  let i = n.useContext(gn);
  return (
    i &&
      i.static &&
      i.staticContext &&
      (t.route.errorElement || t.route.ErrorBoundary) &&
      (i.staticContext._deepestRenderedBoundaryId = t.route.id),
    n.createElement(wn.Provider, { value: e }, r)
  );
}
function Jn(e, t = [], r) {
  let i = r?.state;
  if (e == null) {
    if (!i) return null;
    if (i.errors) e = i.matches;
    else if (t.length === 0 && !i.initialized && i.matches.length > 0)
      e = i.matches;
    else return null;
  }
  let a = e,
    o = i?.errors;
  if (o != null) {
    let e = a.findIndex((e) => e.route.id && o?.[e.route.id] !== void 0);
    (h(
      e >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(o).join(`,`)}`,
    ),
      (a = a.slice(0, Math.min(a.length, e + 1))));
  }
  let s = !1,
    c = -1;
  if (r && i) {
    s = i.renderFallback;
    for (let e = 0; e < a.length; e++) {
      let t = a[e];
      if (
        ((t.route.HydrateFallback || t.route.hydrateFallbackElement) && (c = e),
        t.route.id)
      ) {
        let { loaderData: e, errors: n } = i,
          o =
            t.route.loader &&
            !e.hasOwnProperty(t.route.id) &&
            (!n || n[t.route.id] === void 0);
        if (t.route.lazy || o) {
          (r.isStatic && (s = !0), (a = c >= 0 ? a.slice(0, c + 1) : [a[0]]));
          break;
        }
      }
    }
  }
  let l = r?.onError,
    u =
      i && l
        ? (e, t) => {
            l(e, {
              location: i.location,
              params: i.matches?.[0]?.params ?? {},
              pattern: je(i.matches),
              errorInfo: t,
            });
          }
        : void 0;
  return a.reduceRight((e, r, l) => {
    let d,
      f = !1,
      p = null,
      m = null;
    i &&
      ((d = o && r.route.id ? o[r.route.id] : void 0),
      (p = r.route.errorElement || Un),
      s &&
        (c < 0 && l === 0
          ? (cr(
              `route-fallback`,
              !1,
              "No `HydrateFallback` element provided to render during initial hydration",
            ),
            (f = !0),
            (m = null))
          : c === l &&
            ((f = !0), (m = r.route.hydrateFallbackElement || null))));
    let h = t.concat(a.slice(0, l + 1)),
      g = () => {
        let t;
        return (
          (t = d
            ? p
            : f
              ? m
              : r.route.Component
                ? n.createElement(r.route.Component, null)
                : r.route.element
                  ? r.route.element
                  : e),
          n.createElement(qn, {
            match: r,
            routeContext: { outlet: e, matches: h, isDataRoute: i != null },
            children: t,
          })
        );
      };
    return i && (r.route.ErrorBoundary || r.route.errorElement || l === 0)
      ? n.createElement(Wn, {
          location: i.location,
          revalidation: i.revalidation,
          component: p,
          error: d,
          children: g(),
          routeContext: { outlet: null, matches: h, isDataRoute: !0 },
          onError: u,
        })
      : g();
  }, null);
}
function Yn(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Xn(e) {
  let t = n.useContext(gn);
  return (h(t, Yn(e)), t);
}
function Zn(e) {
  let t = n.useContext(_n);
  return (h(t, Yn(e)), t);
}
function Qn(e) {
  let t = n.useContext(wn);
  return (h(t, Yn(e)), t);
}
function $n(e) {
  let t = Qn(e),
    n = t.matches[t.matches.length - 1];
  return (
    h(n.route.id, `${e} can only be used on routes that contain a unique "id"`),
    n.route.id
  );
}
function er() {
  return $n(`useRouteId`);
}
function tr() {
  return Zn(`useNavigation`).navigation;
}
function nr() {
  let { matches: e, loaderData: t } = Zn(`useMatches`);
  return n.useMemo(() => e.map((e) => ne(e, t)), [e, t]);
}
function rr() {
  let e = Zn(`useLoaderData`),
    t = $n(`useLoaderData`);
  return e.loaderData[t];
}
function ir() {
  let e = Zn(`useActionData`),
    t = $n(`useLoaderData`);
  return e.actionData ? e.actionData[t] : void 0;
}
function ar() {
  let e = n.useContext(Tn),
    t = Zn(`useRouteError`),
    r = $n(`useRouteError`);
  return e === void 0 ? t.errors?.[r] : e;
}
function or() {
  let { router: e } = Xn(`useNavigate`),
    t = $n(`useNavigate`),
    r = n.useRef(!1);
  return (
    Pn(() => {
      r.current = !0;
    }),
    n.useCallback(
      async (n, i = {}) => {
        (g(r.current, Nn),
          r.current &&
            (typeof n == `number`
              ? await e.navigate(n)
              : await e.navigate(n, { fromRouteId: t, ...i })));
      },
      [e, t],
    )
  );
}
var sr = {};
function cr(e, t, n) {
  !t && !sr[e] && ((sr[e] = !0), g(!1, n));
}
var lr = {};
function ur(e, t) {
  !e && !lr[t] && ((lr[t] = !0), console.warn(t));
}
var dr = n.useOptimistic,
  fr = () => void 0;
function pr(e) {
  return dr ? dr(e) : [e, fr];
}
function mr(e) {
  let t = {
    hasErrorBoundary:
      e.hasErrorBoundary || e.ErrorBoundary != null || e.errorElement != null,
  };
  return (
    e.Component &&
      (e.element &&
        g(
          !1,
          "You should not include both `Component` and `element` on your route - `Component` will be used.",
        ),
      Object.assign(t, {
        element: n.createElement(e.Component),
        Component: void 0,
      })),
    e.HydrateFallback &&
      (e.hydrateFallbackElement &&
        g(
          !1,
          "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used.",
        ),
      Object.assign(t, {
        hydrateFallbackElement: n.createElement(e.HydrateFallback),
        HydrateFallback: void 0,
      })),
    e.ErrorBoundary &&
      (e.errorElement &&
        g(
          !1,
          "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used.",
        ),
      Object.assign(t, {
        errorElement: n.createElement(e.ErrorBoundary),
        ErrorBoundary: void 0,
      })),
    t
  );
}
var hr = [`HydrateFallback`, `hydrateFallbackElement`],
  gr = class {
    constructor() {
      ((this.status = `pending`),
        (this.promise = new Promise((e, t) => {
          ((this.resolve = (t) => {
            this.status === `pending` && ((this.status = `resolved`), e(t));
          }),
            (this.reject = (e) => {
              this.status === `pending` && ((this.status = `rejected`), t(e));
            }));
        })));
    }
  };
function _r({ router: e, flushSync: t, onError: r, useTransitions: i }) {
  i = yn() || i;
  let [a, o] = n.useState(e.state),
    [s, c] = pr(a),
    [l, u] = n.useState(),
    [d, f] = n.useState({ isTransitioning: !1 }),
    [p, m] = n.useState(),
    [h, g] = n.useState(),
    [_, v] = n.useState(),
    y = n.useRef(new Map()),
    b = n.useCallback(
      (
        a,
        {
          deletedFetchers: s,
          newErrors: l,
          flushSync: d,
          viewTransitionOpts: _,
        },
      ) => {
        (l &&
          r &&
          Object.values(l).forEach((e) =>
            r(e, {
              location: a.location,
              params: a.matches[0]?.params ?? {},
              pattern: je(a.matches),
            }),
          ),
          a.fetchers.forEach((e, t) => {
            e.data !== void 0 && y.current.set(t, e.data);
          }),
          s.forEach((e) => y.current.delete(e)),
          ur(
            d === !1 || t != null,
            'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.',
          ));
        let b =
          e.window != null &&
          e.window.document != null &&
          typeof e.window.document.startViewTransition == `function`;
        if (
          (ur(
            _ == null || b,
            "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available.",
          ),
          !_ || !b)
        ) {
          t && d
            ? t(() => o(a))
            : i === !1
              ? o(a)
              : n.startTransition(() => {
                  (i === !0 && c((e) => vr(e, a)), o(a));
                });
          return;
        }
        if (t && d) {
          t(() => {
            (h && (p?.resolve(), h.skipTransition()),
              f({
                isTransitioning: !0,
                flushSync: !0,
                currentLocation: _.currentLocation,
                nextLocation: _.nextLocation,
              }));
          });
          let n = e.window.document.startViewTransition(() => {
            t(() => o(a));
          });
          (n.finished.finally(() => {
            t(() => {
              (m(void 0), g(void 0), u(void 0), f({ isTransitioning: !1 }));
            });
          }),
            t(() => g(n)));
          return;
        }
        h
          ? (p?.resolve(),
            h.skipTransition(),
            v({
              state: a,
              currentLocation: _.currentLocation,
              nextLocation: _.nextLocation,
            }))
          : (u(a),
            f({
              isTransitioning: !0,
              flushSync: !1,
              currentLocation: _.currentLocation,
              nextLocation: _.nextLocation,
            }));
      },
      [e.window, t, h, p, i, c, r],
    );
  n.useLayoutEffect(() => e.subscribe(b), [e, b]);
  let x = s.initialized;
  (n.useLayoutEffect(() => {
    !x &&
      e.state.initialized &&
      b(e.state, { deletedFetchers: [], flushSync: !1, newErrors: null });
  }, [x, b, e.state]),
    n.useEffect(() => {
      d.isTransitioning && !d.flushSync && m(new gr());
    }, [d]),
    n.useEffect(() => {
      if (p && l && e.window) {
        let t = l,
          r = p.promise,
          a = e.window.document.startViewTransition(async () => {
            (i === !1
              ? o(t)
              : n.startTransition(() => {
                  (i === !0 && c((e) => vr(e, t)), o(t));
                }),
              await r);
          });
        (a.finished.finally(() => {
          (m(void 0), g(void 0), u(void 0), f({ isTransitioning: !1 }));
        }),
          g(a));
      }
    }, [l, p, e.window, i, c]),
    n.useEffect(() => {
      p && l && s.location.key === l.location.key && p.resolve();
    }, [p, h, s.location, l]),
    n.useEffect(() => {
      !d.isTransitioning &&
        _ &&
        (u(_.state),
        f({
          isTransitioning: !0,
          flushSync: !1,
          currentLocation: _.currentLocation,
          nextLocation: _.nextLocation,
        }),
        v(void 0));
    }, [d.isTransitioning, _]));
  let S = n.useMemo(
      () => ({
        createHref: e.createHref,
        encodeLocation: e.encodeLocation,
        go: (t) => e.navigate(t),
        push: (t, n, r) =>
          e.navigate(t, {
            state: n,
            preventScrollReset: r?.preventScrollReset,
          }),
        replace: (t, n, r) =>
          e.navigate(t, {
            replace: !0,
            state: n,
            preventScrollReset: r?.preventScrollReset,
          }),
      }),
      [e],
    ),
    C = e.basename || `/`,
    w = n.useMemo(
      () => ({ router: e, navigator: S, static: !1, basename: C, onError: r }),
      [e, S, C, r],
    );
  return n.createElement(
    n.Fragment,
    null,
    n.createElement(
      gn.Provider,
      { value: w },
      n.createElement(
        _n.Provider,
        { value: s },
        n.createElement(
          xn.Provider,
          { value: y.current },
          n.createElement(
            bn.Provider,
            { value: d },
            n.createElement(
              Sr,
              {
                basename: C,
                location: s.location,
                navigationType: s.historyAction,
                navigator: S,
                useTransitions: i,
              },
              n.createElement(yr, {
                routes: e.routes,
                manifest: e.manifest,
                future: e.future,
                state: s,
                isStatic: !1,
                onError: r,
              }),
            ),
          ),
        ),
      ),
    ),
    null,
  );
}
function vr(e, t) {
  return {
    ...e,
    navigation: t.navigation.state === `idle` ? e.navigation : t.navigation,
    revalidation: t.revalidation === `idle` ? e.revalidation : t.revalidation,
    actionData:
      t.navigation.state === `submitting` ? e.actionData : t.actionData,
    fetchers: t.fetchers,
  };
}
var yr = n.memo(br);
function br({
  routes: e,
  manifest: t,
  future: n,
  state: r,
  isStatic: i,
  onError: a,
}) {
  return Vn(e, void 0, {
    manifest: t,
    state: r,
    isStatic: i,
    onError: a,
    future: n,
  });
}
function xr(e) {
  return Rn(e.context);
}
function Sr({
  basename: e = `/`,
  children: t = null,
  location: r,
  navigationType: i = `POP`,
  navigator: a,
  static: o = !1,
  useTransitions: s,
}) {
  h(
    !Mn(),
    `You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`,
  );
  let c = e.replace(/^\/*/, `/`),
    l = n.useMemo(
      () => ({
        basename: c,
        navigator: a,
        static: o,
        useTransitions: s,
        future: {},
      }),
      [c, a, o, s],
    );
  typeof r == `string` && (r = x(r));
  let {
      pathname: u = `/`,
      search: d = ``,
      hash: f = ``,
      state: p = null,
      key: m = `default`,
      mask: _,
    } = r,
    v = n.useMemo(() => {
      let e = z(u, c);
      return e == null
        ? null
        : {
            location: {
              pathname: e,
              search: d,
              hash: f,
              state: p,
              key: m,
              mask: _,
            },
            navigationType: i,
          };
    }, [c, u, d, f, p, m, i, _]);
  return (
    g(
      v != null,
      `<Router basename="${c}"> is not able to match the URL "${u}${d}${f}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    v == null
      ? null
      : n.createElement(
          Z.Provider,
          { value: l },
          n.createElement(Cn.Provider, { children: t, value: v }),
        )
  );
}
n.Component;
function Cr() {
  return { params: zn(), loaderData: rr(), actionData: ir(), matches: nr() };
}
function wr(e) {
  return function () {
    let t = Cr();
    return n.createElement(e, t);
  };
}
function Tr() {
  return { params: zn(), loaderData: rr(), actionData: ir(), error: ar() };
}
function Er(e) {
  return function () {
    let t = Tr();
    return n.createElement(e, t);
  };
}
var Dr = `get`,
  Or = `application/x-www-form-urlencoded`;
function kr(e) {
  return typeof HTMLElement < `u` && e instanceof HTMLElement;
}
function Ar(e) {
  return kr(e) && e.tagName.toLowerCase() === `button`;
}
function jr(e) {
  return kr(e) && e.tagName.toLowerCase() === `form`;
}
function Mr(e) {
  return kr(e) && e.tagName.toLowerCase() === `input`;
}
function Nr(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Pr(e, t) {
  return e.button === 0 && (!t || t === `_self`) && !Nr(e);
}
var Fr = null;
function Ir() {
  if (Fr === null)
    try {
      (new FormData(document.createElement(`form`), 0), (Fr = !1));
    } catch {
      Fr = !0;
    }
  return Fr;
}
var Lr = new Set([
  `application/x-www-form-urlencoded`,
  `multipart/form-data`,
  `text/plain`,
]);
function Rr(e) {
  return e != null && !Lr.has(e)
    ? (g(
        !1,
        `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Or}"`,
      ),
      null)
    : e;
}
function zr(e, t) {
  let n, r, i, a, o;
  if (jr(e)) {
    let o = e.getAttribute(`action`);
    ((r = o ? z(o, t) : null),
      (n = e.getAttribute(`method`) || Dr),
      (i = Rr(e.getAttribute(`enctype`)) || Or),
      (a = new FormData(e)));
  } else if (Ar(e) || (Mr(e) && (e.type === `submit` || e.type === `image`))) {
    let o = e.form;
    if (o == null)
      throw Error(
        `Cannot submit a <button> or <input type="submit"> without a <form>`,
      );
    let s = e.getAttribute(`formaction`) || o.getAttribute(`action`);
    if (
      ((r = s ? z(s, t) : null),
      (n = e.getAttribute(`formmethod`) || o.getAttribute(`method`) || Dr),
      (i =
        Rr(e.getAttribute(`formenctype`)) ||
        Rr(o.getAttribute(`enctype`)) ||
        Or),
      (a = new FormData(o, e)),
      !Ir())
    ) {
      let { name: t, type: n, value: r } = e;
      if (n === `image`) {
        let e = t ? `${t}.` : ``;
        (a.append(`${e}x`, `0`), a.append(`${e}y`, `0`));
      } else t && a.append(t, r);
    }
  } else if (kr(e))
    throw Error(
      `Cannot submit element that is not <form>, <button>, or <input type="submit|image">`,
    );
  else ((n = Dr), (r = null), (i = Or), (o = e));
  return (
    a && i === `text/plain` && ((o = a), (a = void 0)),
    { action: r, method: n.toLowerCase(), encType: i, formData: a, body: o }
  );
}
var Br = -1,
  Vr = -2,
  Hr = -3,
  Ur = -4,
  Wr = -5,
  Gr = -6,
  Kr = -7,
  qr = `B`,
  Jr = `D`,
  Yr = `E`,
  Xr = `M`,
  Zr = `N`,
  Qr = `P`,
  $r = `R`,
  ei = `S`,
  ti = `Y`,
  ni = `U`,
  ri = `Z`,
  ii = [
    `EvalError`,
    `RangeError`,
    `ReferenceError`,
    `SyntaxError`,
    `TypeError`,
    `URIError`,
  ],
  ai = class {
    constructor() {
      this.promise = new Promise((e, t) => {
        ((this.resolve = e), (this.reject = t));
      });
    }
  };
function oi() {
  let e = new TextDecoder(),
    t = ``;
  return new TransformStream({
    transform(n, r) {
      let i = e.decode(n, { stream: !0 }),
        a = (t + i).split(`
`);
      t = a.pop() || ``;
      for (let e of a) r.enqueue(e);
    },
    flush(e) {
      t && e.enqueue(t);
    },
  });
}
Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);
var si =
  typeof window < `u` ? window : typeof globalThis < `u` ? globalThis : void 0;
function ci(e) {
  let { hydrated: t, values: n } = this;
  if (typeof e == `number`) return li.call(this, e);
  if (!Array.isArray(e) || !e.length) throw SyntaxError();
  let r = n.length;
  for (let t of e) n.push(t);
  return ((t.length = n.length), li.call(this, r));
}
function li(e) {
  let { hydrated: t, values: n, deferred: r, plugins: i } = this,
    a,
    o = [
      [
        e,
        (e) => {
          a = e;
        },
      ],
    ],
    s = [];
  for (; o.length > 0; ) {
    let [e, a] = o.pop();
    switch (e) {
      case Kr:
        a(void 0);
        continue;
      case Wr:
        a(null);
        continue;
      case Vr:
        a(NaN);
        continue;
      case Gr:
        a(1 / 0);
        continue;
      case Hr:
        a(-1 / 0);
        continue;
      case Ur:
        a(-0);
        continue;
    }
    if (t[e]) {
      a(t[e]);
      continue;
    }
    let c = n[e];
    if (!c || typeof c != `object`) {
      ((t[e] = c), a(c));
      continue;
    }
    if (Array.isArray(c))
      if (typeof c[0] == `string`) {
        let [n, l, u] = c;
        switch (n) {
          case Jr:
            a((t[e] = new Date(l)));
            continue;
          case ni:
            a((t[e] = new URL(l)));
            continue;
          case qr:
            a((t[e] = BigInt(l)));
            continue;
          case $r:
            a((t[e] = new RegExp(l, u)));
            continue;
          case ti:
            a((t[e] = Symbol.for(l)));
            continue;
          case ei:
            let n = new Set();
            t[e] = n;
            for (let e = c.length - 1; e > 0; e--)
              o.push([
                c[e],
                (e) => {
                  n.add(e);
                },
              ]);
            a(n);
            continue;
          case Xr:
            let d = new Map();
            t[e] = d;
            for (let e = c.length - 2; e > 0; e -= 2) {
              let t = [];
              (o.push([
                c[e + 1],
                (e) => {
                  t[1] = e;
                },
              ]),
                o.push([
                  c[e],
                  (e) => {
                    t[0] = e;
                  },
                ]),
                s.push(() => {
                  d.set(t[0], t[1]);
                }));
            }
            a(d);
            continue;
          case Zr:
            let f = Object.create(null);
            t[e] = f;
            for (let e of Object.keys(l).reverse()) {
              let t = [];
              (o.push([
                l[e],
                (e) => {
                  t[1] = e;
                },
              ]),
                o.push([
                  Number(e.slice(1)),
                  (e) => {
                    t[0] = e;
                  },
                ]),
                s.push(() => {
                  f[t[0]] = t[1];
                }));
            }
            a(f);
            continue;
          case Qr:
            if (t[l]) a((t[e] = t[l]));
            else {
              let n = new ai();
              ((r[l] = n), a((t[e] = n.promise)));
            }
            continue;
          case Yr:
            let [, p, m] = c,
              h =
                m &&
                si &&
                ii.includes(m) &&
                m in si &&
                typeof si[m] == `function`
                  ? new si[m](p)
                  : Error(p);
            ((t[e] = h), a(h));
            continue;
          case ri:
            a((t[e] = t[l]));
            continue;
          default:
            if (Array.isArray(i)) {
              let n = [],
                r = c.slice(1);
              for (let e = 0; e < r.length; e++) {
                let t = r[e];
                o.push([
                  t,
                  (t) => {
                    n[e] = t;
                  },
                ]);
              }
              s.push(() => {
                for (let r of i) {
                  let i = r(c[0], ...n);
                  if (i) {
                    a((t[e] = i.value));
                    return;
                  }
                }
                throw SyntaxError();
              });
              continue;
            }
            throw SyntaxError();
        }
      } else {
        let n = [];
        t[e] = n;
        for (let e = 0; e < c.length; e++) {
          let t = c[e];
          t !== Br &&
            o.push([
              t,
              (t) => {
                n[e] = t;
              },
            ]);
        }
        a(n);
        continue;
      }
    else {
      let n = {};
      t[e] = n;
      for (let e of Object.keys(c).reverse()) {
        let t = [];
        (o.push([
          c[e],
          (e) => {
            t[1] = e;
          },
        ]),
          o.push([
            Number(e.slice(1)),
            (e) => {
              t[0] = e;
            },
          ]),
          s.push(() => {
            n[t[0]] = t[1];
          }));
      }
      a(n);
      continue;
    }
  }
  for (; s.length > 0; ) s.pop()();
  return a;
}
async function ui(e, t) {
  let { plugins: n } = t ?? {},
    r = new ai(),
    i = e.pipeThrough(oi()).getReader(),
    a = { values: [], hydrated: [], deferred: {}, plugins: n },
    o = await di.call(a, i),
    s = r.promise;
  return (
    o.done
      ? r.resolve()
      : (s = fi
          .call(a, i)
          .then(r.resolve)
          .catch((e) => {
            for (let t of Object.values(a.deferred)) t.reject(e);
            r.reject(e);
          })),
    { done: s.then(() => i.closed), value: o.value }
  );
}
async function di(e) {
  let t = await e.read();
  if (!t.value) throw SyntaxError();
  let n;
  try {
    n = JSON.parse(t.value);
  } catch {
    throw SyntaxError();
  }
  return { done: t.done, value: ci.call(this, n) };
}
async function fi(e) {
  let t = await e.read();
  for (; !t.done; ) {
    if (!t.value) continue;
    let n = t.value;
    switch (n[0]) {
      case Qr: {
        let e = n.indexOf(`:`),
          t = Number(n.slice(1, e)),
          r = this.deferred[t];
        if (!r) throw Error(`Deferred ID ${t} not found in stream`);
        let i = n.slice(e + 1),
          a;
        try {
          a = JSON.parse(i);
        } catch {
          throw SyntaxError();
        }
        let o = ci.call(this, a);
        r.resolve(o);
        break;
      }
      case Yr: {
        let e = n.indexOf(`:`),
          t = Number(n.slice(1, e)),
          r = this.deferred[t];
        if (!r) throw Error(`Deferred ID ${t} not found in stream`);
        let i = n.slice(e + 1),
          a;
        try {
          a = JSON.parse(i);
        } catch {
          throw SyntaxError();
        }
        let o = ci.call(this, a);
        r.reject(o);
        break;
      }
      default:
        throw SyntaxError();
    }
    t = await e.read();
  }
}
async function pi(e) {
  let t = { signal: e.signal };
  if (e.method !== `GET`) {
    t.method = e.method;
    let n = e.headers.get(`Content-Type`);
    n && /\bapplication\/json\b/.test(n)
      ? ((t.headers = { "Content-Type": n }),
        (t.body = JSON.stringify(await e.json())))
      : n && /\btext\/plain\b/.test(n)
        ? ((t.headers = { "Content-Type": n }), (t.body = await e.text()))
        : n && /\bapplication\/x-www-form-urlencoded\b/.test(n)
          ? (t.body = new URLSearchParams(await e.text()))
          : (t.body = await e.formData());
  }
  return t;
}
var mi = {
    "&": `\\u0026`,
    ">": `\\u003e`,
    "<": `\\u003c`,
    "\u2028": `\\u2028`,
    "\u2029": `\\u2029`,
  },
  hi = /[&><\u2028\u2029]/g;
function gi(e) {
  return e.replace(hi, (e) => mi[e]);
}
function $(e, t) {
  if (e === !1 || e == null) throw Error(t);
}
var _i = Symbol(`SingleFetchRedirect`),
  vi = class extends Error {},
  yi = new Set([100, 101, 204, 205]);
function bi(e, t, n, r, i, a) {
  let o = xi(
    e,
    (e) => {
      let n = t.routes[e.route.id];
      return (
        $(n, `Route not found in manifest`),
        { hasLoader: n.hasLoader, hasClientLoader: n.hasClientLoader }
      );
    },
    ki,
    r,
    i,
    a,
  );
  return async (e) => e.runClientMiddleware(o);
}
function xi(e, t, n, r, i, a, o = () => !0) {
  return async (s) => {
    let { request: c, matches: l, fetcherKey: u } = s,
      d = e();
    if (c.method !== `GET`) return Si(s, n, i, a);
    let f = l.some((e) => {
      let { hasLoader: n, hasClientLoader: r } = t(e);
      return e.shouldCallHandler() && n && !r;
    });
    return !r && !f
      ? Ci(s, t, n, i, a)
      : u
        ? Ei(s, n, i, a)
        : wi(s, d, t, n, r, i, a, o);
  };
}
async function Si(e, t, n, r) {
  let i = e.matches.find((e) => e.shouldCallHandler());
  $(i, `No action match found`);
  let a,
    o = await i.resolve(
      async (o) =>
        await o(async () => {
          let { data: o, status: s } = await t(e, n, r, [i.route.id]);
          return ((a = s), ji(o, i.route.id));
        }),
    );
  return en(o.result) || Ae(o.result) || $t(o.result)
    ? { [i.route.id]: o }
    : { [i.route.id]: { type: o.type, result: Oe(o.result, a) } };
}
async function Ci(e, t, n, r, i) {
  let a = e.matches.filter((e) => e.shouldCallHandler()),
    o = {};
  return (
    await Promise.all(
      a.map((a) =>
        a.resolve(async (s) => {
          try {
            let { hasClientLoader: c } = t(a),
              l = a.route.id,
              u = c
                ? await s(async () => {
                    let { data: t } = await n(e, r, i, [l]);
                    return ji(t, l);
                  })
                : await s();
            o[a.route.id] = { type: `data`, result: u };
          } catch (e) {
            o[a.route.id] = { type: `error`, result: e };
          }
        }),
      ),
    ),
    o
  );
}
async function wi(e, t, n, r, i, a, o, s = () => !0) {
  let c = new Set(),
    l = !1,
    u = e.matches.map(() => Mi()),
    d = Mi(),
    f = {},
    p = Promise.all(
      e.matches.map(async (t, i) =>
        t.resolve(async (p) => {
          u[i].resolve();
          let m = t.route.id,
            { hasLoader: h, hasClientLoader: g } = n(t),
            _ =
              !t.shouldRevalidateArgs ||
              t.shouldRevalidateArgs.actionStatus == null ||
              t.shouldRevalidateArgs.actionStatus < 400;
          if (!t.shouldCallHandler(_)) {
            l ||= t.shouldRevalidateArgs != null && h;
            return;
          }
          if (s(t) && g) {
            h && (l = !0);
            try {
              f[m] = {
                type: `data`,
                result: await p(async () => {
                  let { data: t } = await r(e, a, o, [m]);
                  return ji(t, m);
                }),
              };
            } catch (e) {
              f[m] = { type: `error`, result: e };
            }
            return;
          }
          h && c.add(m);
          try {
            f[m] = {
              type: `data`,
              result: await p(async () => ji(await d.promise, m)),
            };
          } catch (e) {
            f[m] = { type: `error`, result: e };
          }
        }),
      ),
    );
  if (
    (await Promise.all(u.map((e) => e.promise)),
    ((!t.state.initialized && t.state.navigation.state === `idle`) ||
      c.size === 0) &&
      !window.__reactRouterHdrActive)
  )
    d.resolve({ routes: {} });
  else {
    let t = i && l && c.size > 0 ? [...c.keys()] : void 0;
    try {
      let n = await r(e, a, o, t);
      d.resolve(n.data);
    } catch (e) {
      d.reject(e);
    }
  }
  return (await p, await Ti(d.promise, e.matches, c, f), f);
}
async function Ti(e, t, n, r) {
  try {
    let i,
      a = await e;
    if (`routes` in a) {
      for (let e of t)
        if (e.route.id in a.routes) {
          let t = a.routes[e.route.id];
          if (`error` in t) {
            ((i = t.error),
              r[e.route.id]?.result ??
                (r[e.route.id] = { type: `error`, result: i }));
            break;
          }
        }
    }
    i !== void 0 &&
      Array.from(n.values()).forEach((e) => {
        r[e].result instanceof vi && (r[e].result = i);
      });
  } catch {}
}
async function Ei(e, t, n, r) {
  let i = e.matches.find((e) => e.shouldCallHandler());
  $(i, `No fetcher match found`);
  let a = i.route.id,
    o = await i.resolve(async (i) =>
      i(async () => {
        let { data: i } = await t(e, n, r, [a]);
        return ji(i, a);
      }),
    );
  return { [i.route.id]: o };
}
function Di(e) {
  let t = e.searchParams.getAll(`index`);
  e.searchParams.delete(`index`);
  let n = [];
  for (let e of t) e && n.push(e);
  for (let t of n) e.searchParams.append(`index`, t);
  return e;
}
function Oi(e, t, n, r) {
  let i =
    typeof e == `string`
      ? new URL(
          e,
          typeof window > `u`
            ? `server://singlefetch/`
            : window.location.origin,
        )
      : e;
  return (
    n
      ? i.pathname.endsWith(`/`)
        ? (i.pathname = `${i.pathname}_.${r}`)
        : (i.pathname = `${i.pathname}.${r}`)
      : i.pathname === `/`
        ? (i.pathname = `_root.${r}`)
        : t && z(i.pathname, t) === `/`
          ? (i.pathname = `${Ce(t)}/_root.${r}`)
          : (i.pathname = `${Ce(i.pathname)}.${r}`),
    i
  );
}
async function ki(e, t, n, r) {
  let { request: i } = e,
    a = Oi(i.url, t, n, `data`);
  i.method === `GET` &&
    ((a = Di(a)), r && a.searchParams.set(`_routes`, r.join(`,`)));
  let o = await fetch(a, await pi(i));
  if (o.status >= 400 && !o.headers.has(`X-Remix-Response`))
    throw new U(o.status, o.statusText, await o.text());
  if (o.status === 204 && o.headers.has(`X-Remix-Redirect`))
    return {
      status: 202,
      data: {
        redirect: {
          redirect: o.headers.get(`X-Remix-Redirect`),
          status: Number(o.headers.get(`X-Remix-Status`) || `302`),
          revalidate: o.headers.get(`X-Remix-Revalidate`) === `true`,
          reload: o.headers.get(`X-Remix-Reload-Document`) === `true`,
          replace: o.headers.get(`X-Remix-Replace`) === `true`,
        },
      },
    };
  if (yi.has(o.status)) {
    let e = {};
    return (
      r && i.method !== `GET` && (e[r[0]] = { data: void 0 }),
      { status: o.status, data: { routes: e } }
    );
  }
  $(o.body, `No response body to decode`);
  try {
    let e = await Ai(o.body, window),
      t;
    if (i.method === `GET`) {
      let n = e.value;
      t = _i in n ? { redirect: n[_i] } : { routes: n };
    } else {
      let n = e.value,
        i = r?.[0];
      ($(i, `No routeId found for single fetch call decoding`),
        (t = `redirect` in n ? { redirect: n } : { routes: { [i]: n } }));
    }
    return { status: o.status, data: t };
  } catch {
    throw Error(`Unable to decode turbo-stream response`);
  }
}
function Ai(e, t) {
  return ui(e, {
    plugins: [
      (e, ...n) => {
        if (e === `SanitizedError`) {
          let [e, r, i] = n,
            a = Error;
          e &&
            ii.includes(e) &&
            e in t &&
            typeof t[e] == `function` &&
            (a = t[e]);
          let o = new a(r);
          return ((o.stack = i), { value: o });
        }
        if (e === `ErrorResponse`) {
          let [e, t, r] = n;
          return { value: new U(t, r, e) };
        }
        if (e === `SingleFetchRedirect`) return { value: { [_i]: n[0] } };
        if (e === `SingleFetchClassInstance`) return { value: n[0] };
        if (e === `SingleFetchFallback`) return { value: void 0 };
      },
    ],
  });
}
function ji(e, t) {
  if (`redirect` in e) {
    let {
      redirect: t,
      revalidate: n,
      reload: r,
      replace: i,
      status: a,
    } = e.redirect;
    throw ke(t, {
      status: a,
      headers: {
        ...(n ? { "X-Remix-Revalidate": `yes` } : null),
        ...(r ? { "X-Remix-Reload-Document": `yes` } : null),
        ...(i ? { "X-Remix-Replace": `yes` } : null),
      },
    });
  }
  let n = e.routes[t];
  if (n == null) throw new vi(`No result found for routeId "${t}"`);
  if (`error` in n) throw n.error;
  if (`data` in n) return n.data;
  throw Error(`Invalid response found for routeId "${t}"`);
}
function Mi() {
  let e,
    t,
    n = new Promise((r, i) => {
      ((e = async (e) => {
        r(e);
        try {
          await n;
        } catch {}
      }),
        (t = async (e) => {
          i(e);
          try {
            await n;
          } catch {}
        }));
    });
  return { promise: n, resolve: e, reject: t };
}
async function Ni(e, t) {
  if (e.id in t) return t[e.id];
  try {
    let n = await o(() => import(e.module), []);
    return ((t[e.id] = n), n);
  } catch (t) {
    return (
      console.error(
        `Error loading route module \`${e.module}\`, reloading page...`,
      ),
      console.error(t),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function Pi(e, t, n) {
  return Ki(
    e
      .map((e) => {
        let r = t[e.route.id],
          i = n.routes[e.route.id];
        return [
          i && i.css ? i.css.map((e) => ({ rel: `stylesheet`, href: e })) : [],
          r?.links?.() || [],
        ];
      })
      .flat(2),
    Ui(e, n),
  );
}
function Fi(e) {
  return e.css ? e.css.map((e) => ({ rel: `stylesheet`, href: e })) : [];
}
async function Ii(e) {
  if (!e.css) return;
  let t = Fi(e);
  await Promise.all(t.map(Ri));
}
async function Li(e, t) {
  if ((!e.css && !t.links) || !Ji()) return;
  let n = [];
  if (
    (e.css && n.push(...Fi(e)), t.links && n.push(...t.links()), n.length === 0)
  )
    return;
  let r = [];
  for (let e of n)
    !zi(e) &&
      e.rel === `stylesheet` &&
      r.push({ ...e, rel: `preload`, as: `style` });
  await Promise.all(r.map(Ri));
}
async function Ri(e) {
  return new Promise((t) => {
    if (
      (e.media && !window.matchMedia(e.media).matches) ||
      document.querySelector(`link[rel="stylesheet"][href="${e.href}"]`)
    )
      return t();
    let n = document.createElement(`link`);
    Object.assign(n, e);
    function r() {
      document.head.contains(n) && document.head.removeChild(n);
    }
    ((n.onload = () => {
      (r(), t());
    }),
      (n.onerror = () => {
        (r(), t());
      }),
      document.head.appendChild(n));
  });
}
function zi(e) {
  return e != null && typeof e.page == `string`;
}
function Bi(e) {
  return e == null
    ? !1
    : e.href == null
      ? e.rel === `preload` &&
        typeof e.imageSrcSet == `string` &&
        typeof e.imageSizes == `string`
      : typeof e.rel == `string` && typeof e.href == `string`;
}
async function Vi(e, t, n) {
  return Ki(
    (
      await Promise.all(
        e.map(async (e) => {
          let r = t.routes[e.route.id];
          if (r) {
            let e = await Ni(r, n);
            return e.links ? e.links() : [];
          }
          return [];
        }),
      )
    )
      .flat(1)
      .filter(Bi)
      .filter((e) => e.rel === `stylesheet` || e.rel === `preload`)
      .map((e) =>
        e.rel === `stylesheet`
          ? { ...e, rel: `prefetch`, as: `style` }
          : { ...e, rel: `prefetch` },
      ),
  );
}
function Hi(e, t, n, r, i, a) {
  let o = (e, t) => (n[t] ? e.route.id !== n[t].route.id : !0),
    s = (e, t) =>
      n[t].pathname !== e.pathname ||
      (n[t].route.path?.endsWith(`*`) && n[t].params[`*`] !== e.params[`*`]);
  return a === `assets`
    ? t.filter((e, t) => o(e, t) || s(e, t))
    : a === `data`
      ? t.filter((t, a) => {
          let c = r.routes[t.route.id];
          if (!c || !c.hasLoader) return !1;
          if (o(t, a) || s(t, a)) return !0;
          if (t.route.shouldRevalidate) {
            let r = t.route.shouldRevalidate({
              currentUrl: new URL(
                i.pathname + i.search + i.hash,
                window.origin,
              ),
              currentParams: n[0]?.params || {},
              nextUrl: new URL(e, window.origin),
              nextParams: t.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof r == `boolean`) return r;
          }
          return !0;
        })
      : [];
}
function Ui(e, t, { includeHydrateFallback: n } = {}) {
  return Wi(
    e
      .map((e) => {
        let r = t.routes[e.route.id];
        if (!r) return [];
        let i = [r.module];
        return (
          r.clientActionModule && (i = i.concat(r.clientActionModule)),
          r.clientLoaderModule && (i = i.concat(r.clientLoaderModule)),
          n &&
            r.hydrateFallbackModule &&
            (i = i.concat(r.hydrateFallbackModule)),
          r.imports && (i = i.concat(r.imports)),
          i
        );
      })
      .flat(1),
  );
}
function Wi(e) {
  return [...new Set(e)];
}
function Gi(e) {
  let t = {},
    n = Object.keys(e).sort();
  for (let r of n) t[r] = e[r];
  return t;
}
function Ki(e, t) {
  let n = new Set(),
    r = new Set(t);
  return e.reduce((e, i) => {
    if (t && !zi(i) && i.as === `script` && i.href && r.has(i.href)) return e;
    let a = JSON.stringify(Gi(i));
    return (n.has(a) || (n.add(a), e.push({ key: a, link: i })), e);
  }, []);
}
var qi;
function Ji() {
  if (qi !== void 0) return qi;
  let e = document.createElement(`link`);
  return ((qi = e.relList.supports(`preload`)), (e = null), qi);
}
function Yi() {
  return n.createElement(
    Va,
    { title: `Loading...`, renderScripts: !0 },
    n.createElement(`script`, {
      dangerouslySetInnerHTML: {
        __html: `
              console.log(
                "💿 Hey developer 👋. You can provide a way better UX than this " +
                "when your app is loading JS modules and/or running \`clientLoader\` " +
                "functions. Check out https://reactrouter.com/start/framework/route-module#hydratefallback " +
                "for more information."
              );
            `,
      },
    }),
  );
}
function Xi(e) {
  let t = {};
  return (
    Object.values(e).forEach((e) => {
      if (e) {
        let n = e.parentId || ``;
        (t[n] || (t[n] = []), t[n].push(e));
      }
    }),
    t
  );
}
function Zi(e, t, r) {
  let i = aa(t),
    a =
      t.HydrateFallback && (!r || e.id === `root`)
        ? t.HydrateFallback
        : e.id === `root`
          ? Yi
          : void 0,
    o = t.ErrorBoundary
      ? t.ErrorBoundary
      : e.id === `root`
        ? () => n.createElement(Ba, { error: ar() })
        : void 0;
  return e.id === `root` && t.Layout
    ? {
        ...(i
          ? {
              element: n.createElement(
                t.Layout,
                null,
                n.createElement(i, null),
              ),
            }
          : { Component: i }),
        ...(o
          ? {
              errorElement: n.createElement(
                t.Layout,
                null,
                n.createElement(o, null),
              ),
            }
          : { ErrorBoundary: o }),
        ...(a
          ? {
              hydrateFallbackElement: n.createElement(
                t.Layout,
                null,
                n.createElement(a, null),
              ),
            }
          : { HydrateFallback: a }),
      }
    : { Component: i, ErrorBoundary: o, HydrateFallback: a };
}
function Qi(e, t, n, r, i, a) {
  return ta(t, n, r, i, a, ``, Xi(t), e);
}
function $i(e, t) {
  if ((e === `loader` && !t.hasLoader) || (e === `action` && !t.hasAction)) {
    let n = `You are trying to call ${e === `action` ? `serverAction()` : `serverLoader()`} on a route that does not have a server ${e} (routeId: "${t.id}")`;
    throw (console.error(n), new U(400, `Bad Request`, Error(n), !0));
  }
}
function ea(e, t) {
  let n = e === `clientAction` ? `a` : `an`,
    r = `Route "${t}" does not have ${n} ${e}, but you are trying to submit to it. To fix this, please add ${n} \`${e}\` function to the route`;
  throw (console.error(r), new U(405, `Method Not Allowed`, Error(r), !0));
}
function ta(e, t, n, r, i, a = ``, s = Xi(e), c) {
  return (s[a] || []).map((a) => {
    let l = t[a.id];
    function u(e) {
      return (
        $(
          typeof e == `function`,
          `No single fetch function available for route handler`,
        ),
        e()
      );
    }
    function d(e) {
      return a.hasLoader ? u(e) : Promise.resolve(null);
    }
    function f(e) {
      if (!a.hasAction) throw ea(`action`, a.id);
      return u(e);
    }
    function p(e) {
      o(() => import(e), []);
    }
    function m(e) {
      (e.clientActionModule && p(e.clientActionModule),
        e.clientLoaderModule && p(e.clientLoaderModule));
    }
    async function h(e) {
      let n = t[a.id],
        r = n ? Li(a, n) : Promise.resolve();
      try {
        return e();
      } finally {
        await r;
      }
    }
    let g = { id: a.id, index: a.index, path: a.path };
    if (l) {
      Object.assign(g, {
        ...g,
        ...Zi(a, l, i),
        middleware: l.clientMiddleware,
        handle: l.handle,
        shouldRevalidate: na(g.path, l, a, r, c),
      });
      let e = n && n.loaderData && a.id in n.loaderData,
        t = e ? n?.loaderData?.[a.id] : void 0,
        o = n && n.errors && a.id in n.errors,
        s = o ? n?.errors?.[a.id] : void 0,
        u = c == null && (l.clientLoader?.hydrate === !0 || !a.hasLoader);
      ((g.loader = async (
        { request: n, params: r, context: i, pattern: c, url: f },
        p,
      ) => {
        try {
          return await h(
            async () => (
              $(l, "No `routeModule` available for critical-route loader"),
              l.clientLoader
                ? l.clientLoader({
                    request: n,
                    params: r,
                    context: i,
                    pattern: c,
                    url: f,
                    async serverLoader() {
                      if (($i(`loader`, a), u)) {
                        if (e) return t;
                        if (o) throw s;
                      }
                      return d(p);
                    },
                  })
                : d(p)
            ),
          );
        } finally {
          u = !1;
        }
      }),
        (g.loader.hydrate = oa(a.id, l.clientLoader, a.hasLoader, i)),
        (g.action = (
          { request: e, params: t, context: n, pattern: r, url: o },
          s,
        ) =>
          h(async () => {
            if (
              ($(l, "No `routeModule` available for critical-route action"),
              !l.clientAction)
            ) {
              if (i) throw ea(`clientAction`, a.id);
              return f(s);
            }
            return l.clientAction({
              request: e,
              params: t,
              context: n,
              pattern: r,
              url: o,
              async serverAction() {
                return ($i(`action`, a), f(s));
              },
            });
          })));
    } else {
      (a.hasClientLoader || (g.loader = (e, t) => h(() => d(t))),
        a.hasClientAction ||
          (g.action = (e, t) =>
            h(() => {
              if (i) throw ea(`clientAction`, a.id);
              return f(t);
            })));
      let e;
      async function n() {
        return (
          (e ||= (async () => {
            (a.clientLoaderModule || a.clientActionModule) &&
              (await new Promise((e) => setTimeout(e, 0)));
            let e = ia(a, t);
            return (m(a), await e);
          })()),
          await e
        );
      }
      g.lazy = {
        loader: a.hasClientLoader
          ? async () => {
              let { clientLoader: e } = a.clientLoaderModule
                ? await o(() => import(a.clientLoaderModule), [])
                : await n();
              return (
                $(e, "No `clientLoader` export found"),
                (t, n) =>
                  e({
                    ...t,
                    async serverLoader() {
                      return ($i(`loader`, a), d(n));
                    },
                  })
              );
            }
          : void 0,
        action: a.hasClientAction
          ? async () => {
              let e = a.clientActionModule
                ? o(() => import(a.clientActionModule), [])
                : n();
              m(a);
              let { clientAction: t } = await e;
              return (
                $(t, "No `clientAction` export found"),
                (e, n) =>
                  t({
                    ...e,
                    async serverAction() {
                      return ($i(`action`, a), f(n));
                    },
                  })
              );
            }
          : void 0,
        middleware: a.hasClientMiddleware
          ? async () => {
              let { clientMiddleware: e } = a.clientMiddlewareModule
                ? await o(() => import(a.clientMiddlewareModule), [])
                : await n();
              return ($(e, "No `clientMiddleware` export found"), e);
            }
          : void 0,
        shouldRevalidate: async () => {
          let e = await n();
          return na(g.path, e, a, r, c);
        },
        handle: async () => (await n()).handle,
        Component: async () => (await n()).Component,
        ErrorBoundary: a.hasErrorBoundary
          ? async () => (await n()).ErrorBoundary
          : void 0,
      };
    }
    let _ = ta(e, t, n, r, i, a.id, s, c);
    return (_.length > 0 && (g.children = _), g);
  });
}
function na(e, t, n, r, i) {
  if (i) return ra(n.id, t.shouldRevalidate, i);
  if (!r && n.hasLoader && !n.hasClientLoader) {
    let n = e ? pe(e)[1].map((e) => e.paramName) : [],
      r = (e) => n.some((t) => e.currentParams[t] !== e.nextParams[t]);
    if (t.shouldRevalidate) {
      let e = t.shouldRevalidate;
      return (t) => e({ ...t, defaultShouldRevalidate: r(t) });
    } else return (e) => r(e);
  }
  return t.shouldRevalidate;
}
function ra(e, t, n) {
  let r = !1;
  return (i) =>
    r ? (t ? t(i) : i.defaultShouldRevalidate) : ((r = !0), n.has(e));
}
async function ia(e, t) {
  let n = Ni(e, t),
    r = Ii(e),
    i = await n;
  return (
    await Promise.all([r, Li(e, i)]),
    {
      Component: aa(i),
      ErrorBoundary: i.ErrorBoundary,
      clientMiddleware: i.clientMiddleware,
      clientAction: i.clientAction,
      clientLoader: i.clientLoader,
      handle: i.handle,
      links: i.links,
      meta: i.meta,
      shouldRevalidate: i.shouldRevalidate,
    }
  );
}
function aa(e) {
  if (
    e.default != null &&
    !(typeof e.default == `object` && Object.keys(e.default).length === 0)
  )
    return e.default;
}
function oa(e, t, n, r) {
  return (r && e !== `root`) || (t != null && (t.hydrate === !0 || n !== !0));
}
var sa = new Set(),
  ca = 1e3,
  la = new Set();
function ua(e, t) {
  return e.mode === `lazy` && t === !0;
}
function da({ sri: e, ...t }, n) {
  let r = new Set(n.state.matches.map((e) => e.route.id)),
    i = n.state.location.pathname.split(`/`).filter(Boolean),
    a = [`/`];
  for (i.pop(); i.length > 0; ) (a.push(`/${i.join(`/`)}`), i.pop());
  a.forEach((e) => {
    let t = N(n.routes, e, n.basename || `/`, !1, n.branches);
    t && t.forEach((e) => r.add(e.route.id));
  });
  let o = [...r].reduce((e, n) => Object.assign(e, { [n]: t.routes[n] }), {});
  return { ...t, routes: o, sri: e ? !0 : void 0 };
}
function fa(e, t, n, r, i, a, o) {
  if (ua(i, r))
    return async ({ path: s, patch: c, signal: l, fetcherKey: u }) => {
      if (la.has(s)) return;
      let { state: d } = e();
      await ga(
        [s],
        u ? window.location.href : b(d.navigation.location || d.location),
        t,
        n,
        r,
        a,
        o,
        i.manifestPath,
        c,
        l,
      );
    };
}
function pa(e, t, r, i, a, o) {
  n.useEffect(() => {
    if (!ua(a, i) || window.navigator?.connection?.saveData === !0) return;
    function n(e) {
      let t =
        e.tagName === `FORM`
          ? e.getAttribute(`action`)
          : e.getAttribute(`href`);
      if (!t) return;
      let n =
        e.tagName === `A`
          ? e.pathname
          : new URL(t, window.location.origin).pathname;
      la.has(n) || sa.add(n);
    }
    async function s() {
      document
        .querySelectorAll(`a[data-discover], form[data-discover]`)
        .forEach(n);
      let s = Array.from(sa.keys()).filter((e) =>
        la.has(e) ? (sa.delete(e), !1) : !0,
      );
      if (s.length !== 0)
        try {
          await ga(
            s,
            null,
            t,
            r,
            i,
            o,
            e.basename,
            a.manifestPath,
            e.patchRoutes,
          );
        } catch (e) {
          console.error(`Failed to fetch manifest patches`, e);
        }
    }
    let c = va(s, 100);
    s();
    let l = new MutationObserver(() => c());
    return (
      l.observe(document.documentElement, {
        subtree: !0,
        childList: !0,
        attributes: !0,
        attributeFilter: [`data-discover`, `href`, `action`],
      }),
      () => l.disconnect()
    );
  }, [i, o, t, r, e, a]);
}
function ma(e, t) {
  let n = e || `/__manifest`;
  return t == null ? n : H([t, n]);
}
var ha = `react-router-manifest-version`;
async function ga(e, t, n, r, i, a, o, s, c, l) {
  let u = new URLSearchParams();
  (u.set(`paths`, e.sort().join(`,`)), u.set(`version`, n.version));
  let d = new URL(ma(s, o), window.location.origin);
  if (((d.search = u.toString()), d.toString().length > 7680)) {
    sa.clear();
    return;
  }
  let f;
  try {
    let e = await fetch(d, { signal: l });
    if (!e.ok) throw Error(`${e.status} ${e.statusText}`);
    if (e.status === 204 && e.headers.has(`X-Remix-Reload-Document`)) {
      if (!t) {
        console.warn(
          `Detected a manifest version mismatch during eager route discovery. The next navigation/fetch to an undiscovered route will result in a new document navigation to sync up with the latest manifest.`,
        );
        return;
      }
      try {
        if (sessionStorage.getItem(ha) === n.version) {
          console.error(
            `Unable to discover routes due to manifest version mismatch.`,
          );
          return;
        }
        sessionStorage.setItem(ha, n.version);
      } catch {}
      ((window.location.href = t),
        console.warn(`Detected manifest version mismatch, reloading...`),
        await new Promise(() => {}));
    } else if (e.status >= 400) throw Error(await e.text());
    try {
      sessionStorage.removeItem(ha);
    } catch {}
    f = await e.json();
  } catch (e) {
    if (l?.aborted) return;
    throw e;
  }
  let p = new Set(Object.keys(n.routes)),
    m = Object.values(f).reduce(
      (e, t) => (t && !p.has(t.id) && (e[t.id] = t), e),
      {},
    );
  (Object.assign(n.routes, m), e.forEach((e) => _a(e, la)));
  let h = new Set();
  (Object.values(m).forEach((e) => {
    e && (!e.parentId || !m[e.parentId]) && h.add(e.parentId);
  }),
    h.forEach((e) => c(e || null, ta(m, r, null, i, a, e))));
}
function _a(e, t) {
  if (t.size >= ca) {
    let e = t.values().next().value;
    t.delete(e);
  }
  t.add(e);
}
function va(e, t) {
  let n;
  return (...r) => {
    (window.clearTimeout(n), (n = window.setTimeout(() => e(...r), t)));
  };
}
function ya() {
  let e = n.useContext(gn);
  return (
    $(
      e,
      `You must render this element inside a <DataRouterContext.Provider> element`,
    ),
    e
  );
}
function ba() {
  let e = n.useContext(_n);
  return (
    $(
      e,
      `You must render this element inside a <DataRouterStateContext.Provider> element`,
    ),
    e
  );
}
var xa = n.createContext(void 0);
xa.displayName = `FrameworkContext`;
function Sa() {
  let e = n.useContext(xa);
  return (
    $(e, `You must render this element inside a <HydratedRouter> element`),
    e
  );
}
function Ca(e, t) {
  let r = n.useContext(xa),
    [i, a] = n.useState(!1),
    [o, s] = n.useState(!1),
    {
      onFocus: c,
      onBlur: l,
      onMouseEnter: u,
      onMouseLeave: d,
      onTouchStart: f,
    } = t,
    p = n.useRef(null);
  (n.useEffect(() => {
    if ((e === `render` && s(!0), e === `viewport`)) {
      let e = new IntersectionObserver(
        (e) => {
          e.forEach((e) => {
            s(e.isIntersecting);
          });
        },
        { threshold: 0.5 },
      );
      return (
        p.current && e.observe(p.current),
        () => {
          e.disconnect();
        }
      );
    }
  }, [e]),
    n.useEffect(() => {
      if (i) {
        let e = setTimeout(() => {
          s(!0);
        }, 100);
        return () => {
          clearTimeout(e);
        };
      }
    }, [i]));
  let m = () => {
      a(!0);
    },
    h = () => {
      (a(!1), s(!1));
    };
  return r
    ? e === `intent`
      ? [
          o,
          p,
          {
            onFocus: wa(c, m),
            onBlur: wa(l, h),
            onMouseEnter: wa(u, m),
            onMouseLeave: wa(d, h),
            onTouchStart: wa(f, m),
          },
        ]
      : [o, p, {}]
    : [!1, p, {}];
}
function wa(e, t) {
  return (n) => {
    (e && e(n), n.defaultPrevented || t(n));
  };
}
function Ta(e, t, n) {
  if (n && !Pa) return [e[0]];
  if (t) {
    let n = e.findIndex((e) => t[e.route.id] !== void 0);
    return e.slice(0, n + 1);
  }
  return e;
}
var Ea = `data-react-router-critical-css`;
function Da({ nonce: e, crossOrigin: t }) {
  let { isSpaMode: r, manifest: i, routeModules: a, criticalCss: o } = Sa(),
    { errors: s, matches: c } = ba(),
    l = Ta(c, s, r),
    u = n.useMemo(() => Pi(l, a, i), [l, a, i]);
  return n.createElement(
    n.Fragment,
    null,
    typeof o == `string`
      ? n.createElement(`style`, {
          [Ea]: ``,
          nonce: e,
          dangerouslySetInnerHTML: { __html: o },
        })
      : null,
    typeof o == `object`
      ? n.createElement(`link`, {
          [Ea]: ``,
          rel: `stylesheet`,
          href: o.href,
          nonce: e,
          crossOrigin: t,
        })
      : null,
    u.map(({ key: r, link: i }) =>
      zi(i)
        ? n.createElement(Oa, {
            key: r,
            nonce: e,
            ...i,
            crossOrigin: i.crossOrigin ?? t,
          })
        : n.createElement(`link`, {
            key: r,
            nonce: e,
            ...i,
            crossOrigin: i.crossOrigin ?? t,
          }),
    ),
  );
}
function Oa({ page: e, ...t }) {
  let r = yn(),
    { router: i } = ya(),
    a = n.useMemo(() => M(i.routes, e, i.basename), [i.routes, e, i.basename]);
  return a
    ? r
      ? n.createElement(Aa, { page: e, matches: a, ...t })
      : n.createElement(ja, { page: e, matches: a, ...t })
    : null;
}
function ka(e) {
  let { manifest: t, routeModules: r } = Sa(),
    [i, a] = n.useState([]);
  return (
    n.useEffect(() => {
      let n = !1;
      return (
        Vi(e, t, r).then((e) => {
          n || a(e);
        }),
        () => {
          n = !0;
        }
      );
    }, [e, t, r]),
    i
  );
}
function Aa({ page: e, matches: t, ...r }) {
  let i = Q(),
    { future: a } = Sa(),
    { basename: o } = ya(),
    s = n.useMemo(() => {
      if (e === i.pathname + i.search + i.hash) return [];
      let n = Oi(e, o, a.unstable_trailingSlashAwareDataRequests, `rsc`),
        r = !1,
        s = [];
      for (let e of t)
        typeof e.route.shouldRevalidate == `function`
          ? (r = !0)
          : s.push(e.route.id);
      return (
        r && s.length > 0 && n.searchParams.set(`_routes`, s.join(`,`)),
        [n.pathname + n.search]
      );
    }, [o, a.unstable_trailingSlashAwareDataRequests, e, i, t]);
  return n.createElement(
    n.Fragment,
    null,
    s.map((e) =>
      n.createElement(`link`, {
        key: e,
        rel: `prefetch`,
        as: `fetch`,
        href: e,
        ...r,
      }),
    ),
  );
}
function ja({ page: e, matches: t, ...r }) {
  let i = Q(),
    { future: a, manifest: o, routeModules: s } = Sa(),
    { basename: c } = ya(),
    { loaderData: l, matches: u } = ba(),
    d = n.useMemo(() => Hi(e, t, u, o, i, `data`), [e, t, u, o, i]),
    f = n.useMemo(() => Hi(e, t, u, o, i, `assets`), [e, t, u, o, i]),
    p = n.useMemo(() => {
      if (e === i.pathname + i.search + i.hash) return [];
      let n = new Set(),
        r = !1;
      if (
        (t.forEach((e) => {
          let t = o.routes[e.route.id];
          !t ||
            !t.hasLoader ||
            ((!d.some((t) => t.route.id === e.route.id) &&
              e.route.id in l &&
              s[e.route.id]?.shouldRevalidate) ||
            t.hasClientLoader
              ? (r = !0)
              : n.add(e.route.id));
        }),
        n.size === 0)
      )
        return [];
      let u = Oi(e, c, a.unstable_trailingSlashAwareDataRequests, `data`);
      return (
        r &&
          n.size > 0 &&
          u.searchParams.set(
            `_routes`,
            t
              .filter((e) => n.has(e.route.id))
              .map((e) => e.route.id)
              .join(`,`),
          ),
        [u.pathname + u.search]
      );
    }, [c, a.unstable_trailingSlashAwareDataRequests, l, i, o, d, t, e, s]),
    m = n.useMemo(() => Ui(f, o), [f, o]),
    h = ka(f);
  return n.createElement(
    n.Fragment,
    null,
    p.map((e) =>
      n.createElement(`link`, {
        key: e,
        rel: `prefetch`,
        as: `fetch`,
        href: e,
        ...r,
      }),
    ),
    m.map((e) =>
      n.createElement(`link`, { key: e, rel: `modulepreload`, href: e, ...r }),
    ),
    h.map(({ key: e, link: t }) =>
      n.createElement(`link`, {
        key: e,
        nonce: r.nonce,
        ...t,
        crossOrigin: t.crossOrigin ?? r.crossOrigin,
      }),
    ),
  );
}
function Ma() {
  let { isSpaMode: e, routeModules: t } = Sa(),
    { errors: r, matches: i, loaderData: a } = ba(),
    o = Q(),
    s = Ta(i, r, e),
    c = null;
  r && (c = r[s[s.length - 1].route.id]);
  let l = [],
    u = null,
    d = [];
  for (let e = 0; e < s.length; e++) {
    let n = s[e],
      r = n.route.id,
      i = a[r],
      f = n.params,
      p = t[r],
      m = [],
      h = {
        id: r,
        data: i,
        loaderData: i,
        meta: [],
        params: n.params,
        pathname: n.pathname,
        handle: n.route.handle,
        error: c,
      };
    if (
      ((d[e] = h),
      p?.meta
        ? (m =
            typeof p.meta == `function`
              ? p.meta({
                  data: i,
                  loaderData: i,
                  params: f,
                  location: o,
                  matches: d,
                  error: c,
                })
              : Array.isArray(p.meta)
                ? [...p.meta]
                : p.meta)
        : u && (m = [...u]),
      (m ||= []),
      !Array.isArray(m))
    )
      throw Error(
        `The route at ` +
          n.route.path +
          ` returns an invalid value. All route meta functions must return an array of meta objects.

To reference the meta function API, see https://reactrouter.com/start/framework/route-module#meta`,
      );
    ((h.meta = m), (d[e] = h), (l = [...m]), (u = l));
  }
  return n.createElement(
    n.Fragment,
    null,
    l.flat().map((e) => {
      if (!e) return null;
      if (`tagName` in e) {
        let { tagName: t, ...r } = e;
        if (!Na(t))
          return (
            console.warn(
              `A meta object uses an invalid tagName: ${t}. Expected either 'link' or 'meta'`,
            ),
            null
          );
        let i = t;
        return n.createElement(i, { key: JSON.stringify(r), ...r });
      }
      if (`title` in e)
        return n.createElement(`title`, { key: `title` }, String(e.title));
      if (
        (`charset` in e && ((e.charSet ??= e.charset), delete e.charset),
        `charSet` in e && e.charSet != null)
      )
        return typeof e.charSet == `string`
          ? n.createElement(`meta`, { key: `charSet`, charSet: e.charSet })
          : null;
      if (`script:ld+json` in e)
        try {
          let t = JSON.stringify(e[`script:ld+json`]);
          return n.createElement(`script`, {
            key: `script:ld+json:${t}`,
            type: `application/ld+json`,
            dangerouslySetInnerHTML: { __html: gi(t) },
          });
        } catch {
          return null;
        }
      return n.createElement(`meta`, { key: JSON.stringify(e), ...e });
    }),
  );
}
function Na(e) {
  return typeof e == `string` && /^(meta|link)$/.test(e);
}
var Pa = !1;
function Fa() {
  Pa = !0;
}
function Ia(e) {
  let {
      manifest: t,
      serverHandoffString: r,
      isSpaMode: i,
      renderMeta: a,
      routeDiscovery: o,
      ssr: s,
    } = Sa(),
    { router: c, static: l, staticContext: u } = ya(),
    { matches: d } = ba(),
    f = yn(),
    p = ua(o, s);
  a && (a.didRenderScripts = !0);
  let m = Ta(d, null, i);
  n.useEffect(() => {
    Fa();
  }, []);
  let h = n.useMemo(() => {
      if (f) return null;
      let i = u
          ? `window.__reactRouterContext = ${r};window.__reactRouterContext.stream = new ReadableStream({start(controller){window.__reactRouterContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());`
          : ` `,
        a = l
          ? `${t.hmr?.runtime ? `import ${JSON.stringify(t.hmr.runtime)};` : ``}${p ? `` : `import ${JSON.stringify(t.url)}`};
${m.map((e, n) => {
  let r = `route${n}`,
    i = t.routes[e.route.id];
  $(i, `Route ${e.route.id} not found in manifest`);
  let {
      clientActionModule: a,
      clientLoaderModule: o,
      clientMiddlewareModule: s,
      hydrateFallbackModule: c,
      module: l,
    } = i,
    u = [
      ...(a ? [{ module: a, varName: `${r}_clientAction` }] : []),
      ...(o ? [{ module: o, varName: `${r}_clientLoader` }] : []),
      ...(s ? [{ module: s, varName: `${r}_clientMiddleware` }] : []),
      ...(c ? [{ module: c, varName: `${r}_HydrateFallback` }] : []),
      { module: l, varName: `${r}_main` },
    ];
  return u.length === 1
    ? `import * as ${r} from ${JSON.stringify(l)};`
    : [
        u.map((e) => `import * as ${e.varName} from "${e.module}";`).join(`
`),
        `const ${r} = {${u.map((e) => `...${e.varName}`).join(`,`)}};`,
      ].join(`
`);
}).join(`
`)}
  ${p ? `window.__reactRouterManifest = ${JSON.stringify(da(t, c), null, 2)};` : ``}
  window.__reactRouterRouteModules = {${m.map((e, t) => `${JSON.stringify(e.route.id)}:route${t}`).join(`,`)}};

import(${JSON.stringify(t.entry.module)});`
          : ` `;
      return n.createElement(
        n.Fragment,
        null,
        n.createElement(`script`, {
          ...e,
          suppressHydrationWarning: !0,
          dangerouslySetInnerHTML: { __html: i },
          type: void 0,
        }),
        n.createElement(`script`, {
          ...e,
          suppressHydrationWarning: !0,
          dangerouslySetInnerHTML: { __html: a },
          type: `module`,
          async: !0,
        }),
      );
    }, []),
    g =
      Pa || f
        ? []
        : La(t.entry.imports.concat(Ui(m, t, { includeHydrateFallback: !0 }))),
    _ = typeof t.sri == `object` ? t.sri : {};
  return (
    ur(
      !f,
      `The <Scripts /> element is a no-op when using RSC and can be safely removed.`,
    ),
    Pa || f
      ? null
      : n.createElement(
          n.Fragment,
          null,
          typeof t.sri == `object`
            ? n.createElement(`script`, {
                ...e,
                "rr-importmap": ``,
                type: `importmap`,
                suppressHydrationWarning: !0,
                dangerouslySetInnerHTML: {
                  __html: JSON.stringify({ integrity: _ }),
                },
              })
            : null,
          p
            ? null
            : n.createElement(`link`, {
                rel: `modulepreload`,
                href: t.url,
                crossOrigin: e.crossOrigin,
                integrity: _[t.url],
                nonce: e.nonce,
                suppressHydrationWarning: !0,
              }),
          n.createElement(`link`, {
            rel: `modulepreload`,
            href: t.entry.module,
            crossOrigin: e.crossOrigin,
            integrity: _[t.entry.module],
            nonce: e.nonce,
            suppressHydrationWarning: !0,
          }),
          g.map((t) =>
            n.createElement(`link`, {
              key: t,
              rel: `modulepreload`,
              href: t,
              crossOrigin: e.crossOrigin,
              integrity: _[t],
              nonce: e.nonce,
              suppressHydrationWarning: !0,
            }),
          ),
          h,
        )
  );
}
function La(e) {
  return [...new Set(e)];
}
function Ra(...e) {
  return (t) => {
    e.forEach((e) => {
      typeof e == `function` ? e(t) : e != null && (e.current = t);
    });
  };
}
var za = class extends n.Component {
  constructor(e) {
    (super(e), (this.state = { error: e.error || null, location: e.location }));
  }
  static getDerivedStateFromError(e) {
    return { error: e };
  }
  static getDerivedStateFromProps(e, t) {
    return t.location === e.location
      ? { error: e.error || t.error, location: t.location }
      : { error: e.error || null, location: e.location };
  }
  render() {
    return this.state.error
      ? n.createElement(Ba, { error: this.state.error, isOutsideRemixApp: !0 })
      : this.props.children;
  }
};
function Ba({ error: e, isOutsideRemixApp: t }) {
  console.error(e);
  let r = n.createElement(`script`, {
    dangerouslySetInnerHTML: {
      __html: `
        console.log(
          "💿 Hey developer 👋. You can provide a way better UX than this when your app throws errors. Check out https://reactrouter.com/how-to/error-boundary for more information."
        );
      `,
    },
  });
  if (Ae(e))
    return n.createElement(
      Va,
      { title: `Unhandled Thrown Response!` },
      n.createElement(
        `h1`,
        { style: { fontSize: `24px` } },
        e.status,
        ` `,
        e.statusText,
      ),
      r,
    );
  let i;
  if (e instanceof Error) i = e;
  else {
    let t =
      e == null
        ? `Unknown Error`
        : typeof e == `object` && `toString` in e
          ? e.toString()
          : JSON.stringify(e);
    i = Error(t);
  }
  return n.createElement(
    Va,
    { title: `Application Error!`, isOutsideRemixApp: t },
    n.createElement(`h1`, { style: { fontSize: `24px` } }, `Application Error`),
    n.createElement(
      `pre`,
      {
        style: {
          padding: `2rem`,
          background: `hsla(10, 50%, 50%, 0.1)`,
          color: `red`,
          overflow: `auto`,
        },
      },
      i.stack,
    ),
    r,
  );
}
function Va({ title: e, renderScripts: t, isOutsideRemixApp: r, children: i }) {
  let { routeModules: a } = Sa();
  return a.root?.Layout && !r
    ? i
    : n.createElement(
        `html`,
        { lang: `en` },
        n.createElement(
          `head`,
          null,
          n.createElement(`meta`, { charSet: `utf-8` }),
          n.createElement(`meta`, {
            name: `viewport`,
            content: `width=device-width,initial-scale=1,viewport-fit=cover`,
          }),
          n.createElement(`title`, null, e),
        ),
        n.createElement(
          `body`,
          null,
          n.createElement(
            `main`,
            { style: { fontFamily: `system-ui, sans-serif`, padding: `2rem` } },
            i,
            t ? n.createElement(Ia, null) : null,
          ),
        ),
      );
}
var Ha =
  typeof window < `u` &&
  window.document !== void 0 &&
  window.document.createElement !== void 0;
try {
  Ha && (window.__reactRouterVersion = `7.15.0`);
} catch {}
function Ua({ basename: e, children: t, history: r, useTransitions: i }) {
  let [a, o] = n.useState({ action: r.action, location: r.location }),
    s = n.useCallback(
      (e) => {
        i === !1 ? o(e) : n.startTransition(() => o(e));
      },
      [i],
    );
  return (
    n.useLayoutEffect(() => r.listen(s), [r, s]),
    n.createElement(Sr, {
      basename: e,
      children: t,
      location: a.location,
      navigationType: a.action,
      navigator: r,
      useTransitions: i,
    })
  );
}
Ua.displayName = `unstable_HistoryRouter`;
var Wa = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Ga = n.forwardRef(function (
    {
      onClick: e,
      discover: t = `render`,
      prefetch: r = `none`,
      relative: i,
      reloadDocument: a,
      replace: o,
      mask: s,
      state: c,
      target: l,
      to: u,
      preventScrollReset: d,
      viewTransition: f,
      defaultShouldRevalidate: p,
      ...m
    },
    h,
  ) {
    let { basename: g, navigator: _, useTransitions: v } = n.useContext(Z),
      y = typeof u == `string` && Wa.test(u),
      b = G(u, g);
    u = b.to;
    let x = jn(u, { relative: i }),
      S = Q(),
      C = null;
    if (s) {
      let e = V(s, [], S.mask ? S.mask.pathname : `/`, !0);
      (g !== `/` && (e.pathname = e.pathname === `/` ? g : H([g, e.pathname])),
        (C = _.createHref(e)));
    }
    let [w, T, ee] = Ca(r, m),
      E = Qa(u, {
        replace: o,
        mask: s,
        state: c,
        target: l,
        preventScrollReset: d,
        relative: i,
        viewTransition: f,
        defaultShouldRevalidate: p,
        useTransitions: v,
      });
    function D(t) {
      (e && e(t), t.defaultPrevented || E(t));
    }
    let O = !(b.isExternal || a),
      k = n.createElement(`a`, {
        ...m,
        ...ee,
        href: (O ? C : void 0) || b.absoluteURL || x,
        onClick: O ? D : e,
        ref: Ra(h, T),
        target: l,
        "data-discover": !y && t === `render` ? `true` : void 0,
      });
    return w && !y
      ? n.createElement(n.Fragment, null, k, n.createElement(Oa, { page: x }))
      : k;
  });
Ga.displayName = `Link`;
var Ka = n.forwardRef(function (
  {
    "aria-current": e = `page`,
    caseSensitive: t = !1,
    className: r = ``,
    end: i = !1,
    style: a,
    to: o,
    viewTransition: s,
    children: c,
    ...l
  },
  u,
) {
  let d = Bn(o, { relative: l.relative }),
    f = Q(),
    p = n.useContext(_n),
    { navigator: m, basename: h } = n.useContext(Z),
    g = p != null && co(d) && s === !0,
    _ = m.encodeLocation ? m.encodeLocation(d).pathname : d.pathname,
    v = f.pathname,
    y =
      p && p.navigation && p.navigation.location
        ? p.navigation.location.pathname
        : null;
  (t ||
    ((v = v.toLowerCase()),
    (y = y ? y.toLowerCase() : null),
    (_ = _.toLowerCase())),
    y && h && (y = z(y, h) || y));
  let b = _ !== `/` && _.endsWith(`/`) ? _.length - 1 : _.length,
    x = v === _ || (!i && v.startsWith(_) && v.charAt(b) === `/`),
    S =
      y != null &&
      (y === _ || (!i && y.startsWith(_) && y.charAt(_.length) === `/`)),
    C = { isActive: x, isPending: S, isTransitioning: g },
    w = x ? e : void 0,
    T;
  T =
    typeof r == `function`
      ? r(C)
      : [
          r,
          x ? `active` : null,
          S ? `pending` : null,
          g ? `transitioning` : null,
        ]
          .filter(Boolean)
          .join(` `);
  let ee = typeof a == `function` ? a(C) : a;
  return n.createElement(
    Ga,
    {
      ...l,
      "aria-current": w,
      className: T,
      ref: u,
      style: ee,
      to: o,
      viewTransition: s,
    },
    typeof c == `function` ? c(C) : c,
  );
});
Ka.displayName = `NavLink`;
var qa = n.forwardRef(
  (
    {
      discover: e = `render`,
      fetcherKey: t,
      navigate: r,
      reloadDocument: i,
      replace: a,
      state: o,
      method: s = Dr,
      action: c,
      onSubmit: l,
      relative: u,
      preventScrollReset: d,
      viewTransition: f,
      defaultShouldRevalidate: p,
      ...m
    },
    h,
  ) => {
    let { useTransitions: g } = n.useContext(Z),
      _ = to(),
      v = no(c, { relative: u }),
      y = s.toLowerCase() === `get` ? `get` : `post`,
      b = typeof c == `string` && Wa.test(c);
    return n.createElement(`form`, {
      ref: h,
      method: y,
      action: v,
      onSubmit: i
        ? l
        : (e) => {
            if ((l && l(e), e.defaultPrevented)) return;
            e.preventDefault();
            let i = e.nativeEvent.submitter,
              c = i?.getAttribute(`formmethod`) || s,
              m = () =>
                _(i || e.currentTarget, {
                  fetcherKey: t,
                  method: c,
                  navigate: r,
                  replace: a,
                  state: o,
                  relative: u,
                  preventScrollReset: d,
                  viewTransition: f,
                  defaultShouldRevalidate: p,
                });
            g && r !== !1 ? n.startTransition(() => m()) : m();
          },
      ...m,
      "data-discover": !b && e === `render` ? `true` : void 0,
    });
  },
);
qa.displayName = `Form`;
function Ja({ getKey: e, storageKey: t, ...r }) {
  let i = n.useContext(xa),
    { basename: a } = n.useContext(Z),
    o = Q(),
    s = nr();
  oo({ getKey: e, storageKey: t });
  let c = n.useMemo(() => {
    if (!i || !e) return null;
    let t = ao(o, s, a, e);
    return t === o.key ? null : t;
  }, []);
  if (!i || i.isSpaMode) return null;
  let l = ((e, t) => {
    if (!window.history.state || !window.history.state.key) {
      let e = Math.random().toString(32).slice(2);
      window.history.replaceState({ key: e }, ``);
    }
    try {
      let n = JSON.parse(sessionStorage.getItem(e) || `{}`)[
        t || window.history.state.key
      ];
      typeof n == `number` && window.scrollTo(0, n);
    } catch (t) {
      (console.error(t), sessionStorage.removeItem(e));
    }
  }).toString();
  return n.createElement(`script`, {
    ...r,
    suppressHydrationWarning: !0,
    dangerouslySetInnerHTML: {
      __html: `(${l})(${gi(JSON.stringify(t || ro))}, ${gi(JSON.stringify(c))})`,
    },
  });
}
Ja.displayName = `ScrollRestoration`;
function Ya(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Xa(e) {
  let t = n.useContext(gn);
  return (h(t, Ya(e)), t);
}
function Za(e) {
  let t = n.useContext(_n);
  return (h(t, Ya(e)), t);
}
function Qa(
  e,
  {
    target: t,
    replace: r,
    mask: i,
    state: a,
    preventScrollReset: o,
    relative: s,
    viewTransition: c,
    defaultShouldRevalidate: l,
    useTransitions: u,
  } = {},
) {
  let d = Fn(),
    f = Q(),
    p = Bn(e, { relative: s });
  return n.useCallback(
    (m) => {
      if (Pr(m, t)) {
        m.preventDefault();
        let t = r === void 0 ? b(f) === b(p) : r,
          h = () =>
            d(e, {
              replace: t,
              mask: i,
              state: a,
              preventScrollReset: o,
              relative: s,
              viewTransition: c,
              defaultShouldRevalidate: l,
            });
        u ? n.startTransition(() => h()) : h();
      }
    },
    [f, d, p, r, i, a, t, e, o, s, c, l, u],
  );
}
var $a = 0,
  eo = () => `__${String(++$a)}__`;
function to() {
  let { router: e } = Xa(`useSubmit`),
    { basename: t } = n.useContext(Z),
    r = er(),
    i = e.fetch,
    a = e.navigate;
  return n.useCallback(
    async (e, n = {}) => {
      let { action: o, method: s, encType: c, formData: l, body: u } = zr(e, t);
      n.navigate === !1
        ? await i(n.fetcherKey || eo(), r, n.action || o, {
            defaultShouldRevalidate: n.defaultShouldRevalidate,
            preventScrollReset: n.preventScrollReset,
            formData: l,
            body: u,
            formMethod: n.method || s,
            formEncType: n.encType || c,
            flushSync: n.flushSync,
          })
        : await a(n.action || o, {
            defaultShouldRevalidate: n.defaultShouldRevalidate,
            preventScrollReset: n.preventScrollReset,
            formData: l,
            body: u,
            formMethod: n.method || s,
            formEncType: n.encType || c,
            replace: n.replace,
            state: n.state,
            fromRouteId: r,
            flushSync: n.flushSync,
            viewTransition: n.viewTransition,
          });
    },
    [i, a, t, r],
  );
}
function no(e, { relative: t } = {}) {
  let { basename: r } = n.useContext(Z),
    i = n.useContext(wn);
  h(i, `useFormAction must be used inside a RouteContext`);
  let [a] = i.matches.slice(-1),
    o = { ...Bn(e || `.`, { relative: t }) },
    s = Q();
  if (e == null) {
    o.search = s.search;
    let e = new URLSearchParams(o.search),
      t = e.getAll(`index`);
    if (t.some((e) => e === ``)) {
      (e.delete(`index`),
        t.filter((e) => e).forEach((t) => e.append(`index`, t)));
      let n = e.toString();
      o.search = n ? `?${n}` : ``;
    }
  }
  return (
    (!e || e === `.`) &&
      a.route.index &&
      (o.search = o.search ? o.search.replace(/^\?/, `?index&`) : `?index`),
    r !== `/` && (o.pathname = o.pathname === `/` ? r : H([r, o.pathname])),
    b(o)
  );
}
var ro = `react-router-scroll-positions`,
  io = {};
function ao(e, t, n, r) {
  let i = null;
  return (
    r &&
      (i = r(
        n === `/` ? e : { ...e, pathname: z(e.pathname, n) || e.pathname },
        t,
      )),
    (i ??= e.key),
    i
  );
}
function oo({ getKey: e, storageKey: t } = {}) {
  let { router: r } = Xa(`useScrollRestoration`),
    { restoreScrollPosition: i, preventScrollReset: a } =
      Za(`useScrollRestoration`),
    { basename: o } = n.useContext(Z),
    s = Q(),
    c = nr(),
    l = tr();
  (n.useEffect(
    () => (
      (window.history.scrollRestoration = `manual`),
      () => {
        window.history.scrollRestoration = `auto`;
      }
    ),
    [],
  ),
    so(
      n.useCallback(() => {
        if (l.state === `idle`) {
          let t = ao(s, c, o, e);
          io[t] = window.scrollY;
        }
        try {
          sessionStorage.setItem(t || ro, JSON.stringify(io));
        } catch (e) {
          g(
            !1,
            `Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`,
          );
        }
        window.history.scrollRestoration = `auto`;
      }, [l.state, e, o, s, c, t]),
    ),
    typeof document < `u` &&
      (n.useLayoutEffect(() => {
        try {
          let e = sessionStorage.getItem(t || ro);
          e && (io = JSON.parse(e));
        } catch {}
      }, [t]),
      n.useLayoutEffect(() => {
        let t = r?.enableScrollRestoration(
          io,
          () => window.scrollY,
          e ? (t, n) => ao(t, n, o, e) : void 0,
        );
        return () => t && t();
      }, [r, o, e]),
      n.useLayoutEffect(() => {
        if (i !== !1) {
          if (typeof i == `number`) {
            window.scrollTo(0, i);
            return;
          }
          try {
            if (s.hash) {
              let e = document.getElementById(
                decodeURIComponent(s.hash.slice(1)),
              );
              if (e) {
                e.scrollIntoView();
                return;
              }
            }
          } catch {
            g(
              !1,
              `"${s.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`,
            );
          }
          a !== !0 && window.scrollTo(0, 0);
        }
      }, [s, i, a])));
}
function so(e, t) {
  let { capture: r } = t || {};
  n.useEffect(() => {
    let t = r == null ? void 0 : { capture: r };
    return (
      window.addEventListener(`pagehide`, e, t),
      () => {
        window.removeEventListener(`pagehide`, e, t);
      }
    );
  }, [e, r]);
}
function co(e, { relative: t } = {}) {
  let r = n.useContext(bn);
  h(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  );
  let { basename: i } = Xa(`useViewTransitionState`),
    a = Bn(e, { relative: t });
  if (!r.isTransitioning) return !1;
  let o = z(r.currentLocation.pathname, i) || r.currentLocation.pathname,
    s = z(r.nextLocation.pathname, i) || r.nextLocation.pathname;
  return R(a.pathname, s) != null || R(a.pathname, o) != null;
}
export {
  Er as A,
  Ae as C,
  pa as D,
  oa as E,
  Fn as O,
  h as S,
  M as T,
  it as _,
  Ma as a,
  bi as b,
  xr as c,
  Ia as d,
  Ja as f,
  w as g,
  Qi as h,
  Da as i,
  wr as k,
  za as l,
  ta as m,
  xa as n,
  yi as o,
  m as p,
  Ga as r,
  Ka as s,
  U as t,
  _r as u,
  Ai as v,
  mr as w,
  hr as x,
  fa as y,
};
