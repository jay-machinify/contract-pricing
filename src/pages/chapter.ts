import { html } from "../lib/html";
import type { RouteResult } from "../router";
import type { Walkthrough } from "../content/types";
import { chapterNav, chapterTOC } from "../components/chapter-nav";
import { mountAllCalculators } from "../calculators/registry";
import { navigate } from "../router";

export function chapterRoute(walk: Walkthrough, slug: string): RouteResult {
  const chapter = walk.chapters.find((c) => c.slug === slug);
  if (!chapter) {
    const first = walk.chapters[0];
    if (first) navigate(`/${walk.slug}/${first.slug}`, { replace: true });
    return { el: html`<div></div>` };
  }

  const content = chapter.render();
  const toc = chapterTOC(walk, chapter.slug);
  const nav = chapterNav(walk, chapter.slug);

  const layout = html`
    <div class="chapter-layout">
      ${toc}
      <div class="chapter-content">
        ${content}
        ${nav}
      </div>
    </div>`;

  const cleanups = mountAllCalculators(layout);

  const onKey = (ev: KeyboardEvent) => {
    if (ev.target && (ev.target as HTMLElement).matches?.("input, textarea, select")) return;
    const idx = walk.chapters.findIndex((c) => c.slug === chapter.slug);
    if (ev.key === "ArrowLeft" && idx > 0) {
      ev.preventDefault();
      navigate(`/${walk.slug}/${walk.chapters[idx - 1].slug}`);
    } else if (ev.key === "ArrowRight" && idx < walk.chapters.length - 1) {
      ev.preventDefault();
      navigate(`/${walk.slug}/${walk.chapters[idx + 1].slug}`);
    }
  };
  window.addEventListener("keydown", onKey);

  return {
    el: layout,
    title: `${chapter.title} — ${walk.title}`,
    onUnmount: () => {
      cleanups.forEach((fn) => { try { fn(); } catch (e) { console.error(e); } });
      window.removeEventListener("keydown", onKey);
    },
  };
}
