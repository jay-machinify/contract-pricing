// Tiny History API router. Pages register a render() that returns an HTMLElement
// plus an optional onUnmount() called before navigation.

export interface RouteResult {
  el: HTMLElement | DocumentFragment;
  onUnmount?: () => void;
  title?: string;
}

export type RouteHandler = (params: Record<string, string>, url: URL) => RouteResult | Promise<RouteResult>;

interface CompiledRoute {
  pattern: RegExp;
  keys: string[];
  handler: RouteHandler;
}

// import.meta.env.BASE_URL is the Vite-injected base path ("/" in dev,
// "/contract-pricing/" on GitHub Pages). Strip the trailing slash for prefixing.
const BASE = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");

function stripBase(path: string): string {
  if (BASE && path.startsWith(BASE)) {
    const rest = path.slice(BASE.length);
    return rest.startsWith("/") ? rest : "/" + rest;
  }
  return path;
}

function withBase(path: string): string {
  if (!BASE) return path;
  if (path.startsWith(BASE + "/") || path === BASE) return path;
  return BASE + (path.startsWith("/") ? path : "/" + path);
}

let routes: CompiledRoute[] = [];
let outlet: HTMLElement | null = null;
let currentUnmount: (() => void) | null = null;
let notFoundHandler: RouteHandler | null = null;
let onNavigateCallbacks: Array<(url: URL) => void> = [];

function compile(path: string): { pattern: RegExp; keys: string[] } {
  const keys: string[] = [];
  const pattern = path
    .replace(/\/+$/, "")
    .replace(/:([A-Za-z0-9_]+)/g, (_, k) => {
      keys.push(k);
      return "([^/]+)";
    });
  return { pattern: new RegExp("^" + (pattern || "/") + "/?$"), keys };
}

export function route(path: string, handler: RouteHandler): void {
  const { pattern, keys } = compile(path);
  routes.push({ pattern, keys, handler });
}

export function setNotFound(handler: RouteHandler): void {
  notFoundHandler = handler;
}

export function onNavigate(cb: (url: URL) => void): void {
  onNavigateCallbacks.push(cb);
}

export function navigate(href: string, opts: { replace?: boolean } = {}): void {
  const target = withBase(href);
  if (opts.replace) history.replaceState({}, "", target);
  else history.pushState({}, "", target);
  resolve();
}

async function resolve(): Promise<void> {
  if (!outlet) return;
  const url = new URL(window.location.href);
  const path = stripBase(url.pathname);

  for (const r of routes) {
    const m = r.pattern.exec(path);
    if (m) {
      const params: Record<string, string> = {};
      r.keys.forEach((k, i) => (params[k] = decodeURIComponent(m[i + 1])));
      await render(r.handler, params, url);
      return;
    }
  }
  if (notFoundHandler) {
    await render(notFoundHandler, {}, url);
  }
}

async function render(handler: RouteHandler, params: Record<string, string>, url: URL): Promise<void> {
  if (!outlet) return;
  if (currentUnmount) {
    try { currentUnmount(); } catch (e) { console.error(e); }
    currentUnmount = null;
  }
  const result = await handler(params, url);
  outlet.replaceChildren(result.el);
  currentUnmount = result.onUnmount ?? null;
  if (result.title) document.title = result.title;
  onNavigateCallbacks.forEach((cb) => cb(url));

  // Handle hash anchors after route swap.
  if (url.hash) {
    requestAnimationFrame(() => {
      const id = url.hash.slice(1);
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  } else {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }
}

export function startRouter(outletEl: HTMLElement): void {
  outlet = outletEl;

  document.addEventListener("click", (ev) => {
    const target = ev.target;
    if (!(target instanceof Element)) return;
    const a = target.closest("a");
    if (!a) return;
    const href = a.getAttribute("href");
    if (!href) return;
    if (a.target === "_blank") return;
    if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
    if (!href.startsWith("/")) return;

    ev.preventDefault();
    const targetPath = withBase(href);
    const url = new URL(targetPath, window.location.origin);
    if (url.pathname === window.location.pathname && url.hash) {
      // Same page, just hash change — let browser handle by updating hash.
      history.pushState({}, "", url.href);
      const id = url.hash.slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    navigate(href);
  });

  window.addEventListener("popstate", () => {
    resolve();
  });

  resolve();
}
