import { html } from "../lib/html";
import type { Walkthrough } from "../content/types";

export function chapterNav(walk: Walkthrough, currentSlug: string): HTMLElement | DocumentFragment {
  const idx = walk.chapters.findIndex((c) => c.slug === currentSlug);
  const prev = idx > 0 ? walk.chapters[idx - 1] : null;
  const next = idx >= 0 && idx < walk.chapters.length - 1 ? walk.chapters[idx + 1] : null;
  const total = walk.chapters.length;
  const progressPct = total > 0 ? ((idx + 1) / total) * 100 : 0;

  return html`
    <nav class="chapter-nav">
      <div class="chapter-progress">
        <div class="chapter-progress-bar" style="width: ${progressPct}%"></div>
        <div class="chapter-progress-label">Chapter ${idx + 1} of ${total} — ${walk.title}</div>
      </div>
      <div class="chapter-nav-buttons">
        ${prev
          ? html`<a class="chapter-nav-btn prev" href="/${walk.slug}/${prev.slug}">
              <span class="nav-arrow">←</span>
              <span class="nav-label">
                <span class="nav-eyebrow">Previous</span>
                <span class="nav-title">${prev.title}</span>
              </span>
            </a>`
          : html`<span class="chapter-nav-btn disabled"></span>`}
        ${next
          ? html`<a class="chapter-nav-btn next" href="/${walk.slug}/${next.slug}">
              <span class="nav-label">
                <span class="nav-eyebrow">Next</span>
                <span class="nav-title">${next.title}</span>
              </span>
              <span class="nav-arrow">→</span>
            </a>`
          : html`<span class="chapter-nav-btn disabled"></span>`}
      </div>
    </nav>`;
}

export function chapterTOC(walk: Walkthrough, currentSlug: string): HTMLElement | DocumentFragment {
  return html`
    <aside class="chapter-toc">
      <div class="toc-title">${walk.title}</div>
      <ol class="toc-list">
        ${walk.chapters.map(
          (c, i) => html`<li class="${c.slug === currentSlug ? "active" : ""}">
            <a href="/${walk.slug}/${c.slug}">
              <span class="toc-num">${String(i + 1).padStart(2, "0")}</span>
              <span class="toc-title-text">${c.title}</span>
            </a>
          </li>`
        )}
      </ol>
    </aside>`;
}
