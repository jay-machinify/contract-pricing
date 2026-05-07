import { html, escapeHtml } from "../../lib/html";
import { allTerms, type Term } from "./terms";
import type { RouteResult } from "../../router";

export function glossaryRoute(): RouteResult {
  const terms = allTerms();

  const list = html`<div class="glossary-list"></div>`;
  const empty = html`<div class="glossary-empty" style="display: none">No terms match.</div>`;

  function render(filter: string): void {
    const f = filter.trim().toLowerCase();
    const matches = !f
      ? terms
      : terms.filter((t) =>
          t.label.toLowerCase().includes(f) ||
          t.short.toLowerCase().includes(f) ||
          t.long.toLowerCase().includes(f) ||
          (t.also ?? []).some((a) => a.toLowerCase().includes(f))
        );

    list.replaceChildren(...matches.map(termEntry));
    (empty as HTMLElement).style.display = matches.length === 0 ? "block" : "none";
  }

  const search = html`<input
    class="glossary-search"
    type="search"
    placeholder="Search terms — try 'DRG', 'modifier', 'capitation'…"
    aria-label="Search glossary terms"
  />` as HTMLInputElement;

  search.addEventListener("input", () => render(search.value));

  const page = html`
    <section class="glossary">
      <h1>Glossary</h1>
      <p style="color: var(--c-ink-soft); margin: 0;">
        ${terms.length} terms covering claim pricing and contracts. Use the search box or scroll.
      </p>
      ${search}
      ${list}
      ${empty}
    </section>`;

  render("");
  return { el: page, title: "Glossary" };
}

function termEntry(t: Term): HTMLElement | DocumentFragment {
  return html`
    <article class="glossary-entry" id="${t.slug}">
      <div class="glossary-entry-label">
        <h3>${t.label}${t.also && t.also.length ? html`<span style="font-weight: 400; font-size: 13px; color: var(--c-ink-muted); margin-left: 8px">— also: ${t.also.join(", ")}</span>` : ""}</h3>
        <a class="slug-anchor" href="#${t.slug}" title="Permalink">#${t.slug}</a>
      </div>
      <p class="glossary-entry-short">${t.short}</p>
      <p class="glossary-entry-long">${unsafeText(t.long)}</p>
    </article>`;
}

// Long definitions are author-controlled (no user input); render as text.
function unsafeText(s: string): HTMLSpanElement {
  const span = document.createElement("span");
  span.innerHTML = escapeHtml(s);
  return span;
}
