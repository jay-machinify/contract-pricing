import { html } from "../lib/html";
import { getTerm } from "../content/glossary/terms";

// term("drg") -> <a class="term" href="/glossary#drg" title="...">DRG</a>
// term("drg", "diagnosis-related groups") -> overrides display label
export function term(slug: string, label?: string): HTMLElement | DocumentFragment {
  const t = getTerm(slug);
  if (!t) {
    return html`<span class="term term-missing" title="Unknown term: ${slug}">${label ?? slug}</span>`;
  }
  const display = label ?? t.label;
  return html`<a class="term" href="/glossary#${slug}" title="${t.short}">${display}</a>`;
}
