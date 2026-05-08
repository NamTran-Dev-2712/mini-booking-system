import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/public/_layout.tsx", [
    index("routes/public/home.tsx"),
    route("about", "routes/public/about.tsx"),
  ]),

  layout("routes/auth/_layout.tsx", [
    route("login", "routes/auth/login.tsx"),
    route("register", "routes/auth/register.tsx"),
  ]),
] satisfies RouteConfig;
