import { n as e, t } from "./jsx-runtime-CAzG7qJ5.js";
import { t as n } from "./createLucideIcon-DIem-QJH.js";
import { a as r, c as i, n as a } from "./separator-8f2NwZMe.js";
var o = n(`building-2`, [
    [`path`, { d: `M10 12h4`, key: `a56b0p` }],
    [`path`, { d: `M10 8h4`, key: `1sr2af` }],
    [`path`, { d: `M14 21v-3a2 2 0 0 0-4 0v3`, key: `1rgiei` }],
    [
      `path`,
      {
        d: `M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2`,
        key: `secmi2`,
      },
    ],
    [`path`, { d: `M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16`, key: `16ra0t` }],
  ]),
  s = n(`chart-column`, [
    [`path`, { d: `M3 3v16a2 2 0 0 0 2 2h16`, key: `c24i48` }],
    [`path`, { d: `M18 17V9`, key: `2bz60n` }],
    [`path`, { d: `M13 17V5`, key: `1frdt8` }],
    [`path`, { d: `M8 17v-3`, key: `17ska0` }],
  ]),
  c = n(`users`, [
    [`path`, { d: `M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2`, key: `1yyitq` }],
    [`path`, { d: `M16 3.128a4 4 0 0 1 0 7.744`, key: `16gr8j` }],
    [`path`, { d: `M22 21v-2a4 4 0 0 0-3-3.87`, key: `kshegd` }],
    [`circle`, { cx: `9`, cy: `7`, r: `4`, key: `nufk8` }],
  ]);
e();
var l = t(),
  u = i(
    `group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!`,
    {
      variants: {
        variant: {
          default: `bg-primary text-primary-foreground [a]:hover:bg-primary/80`,
          secondary: `bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80`,
          destructive: `bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20`,
          outline: `border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground`,
          ghost: `hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50`,
          link: `text-primary underline-offset-4 hover:underline`,
        },
      },
      defaultVariants: { variant: `default` },
    },
  );
function d({ className: e, variant: t = `default`, asChild: n = !1, ...i }) {
  return (0, l.jsx)(n ? r : `span`, {
    "data-slot": `badge`,
    "data-variant": t,
    className: a(u({ variant: t }), e),
    ...i,
  });
}
export { o as i, c as n, s as r, d as t };
