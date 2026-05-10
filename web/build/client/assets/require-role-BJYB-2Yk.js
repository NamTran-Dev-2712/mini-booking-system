import { D as e, v as t } from "./chunk-5KNZJZUH-C906xdEM.js";
import { t as n } from "./auth.store-U8lf-bmK.js";
var r = { Admin: `/admin`, Mentor: `/mentor`, User: `/user` };
function i(r) {
  return async function () {
    await n.persist.rehydrate();
    let { isAuthenticated: i, user: a } = n.getState();
    if (!i) throw e(`/login`);
    if (!a?.roles.includes(r)) throw t(null, { status: 404 });
    return null;
  };
}
async function a() {
  await n.persist.rehydrate();
  let { isAuthenticated: t, user: i } = n.getState();
  if (t && i) throw e(r[i.roles[0] ?? `User`] ?? `/`);
  return null;
}
export { i as n, a as t };
