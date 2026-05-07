// Tagged-template helper that builds DOM from interpolated template literals.
// - Substitutes placeholders inside text content AND attribute values.
// - Single root → returns that HTMLElement. Multiple roots → returns a DocumentFragment.
// - Values may be primitives, Nodes, or arrays of those.

type Insertable = string | number | boolean | null | undefined | Node | Insertable[];

const PLACEHOLDER_PREFIX = "h";

export function html(strings: TemplateStringsArray, ...values: Insertable[]): HTMLElement | DocumentFragment {
  let raw = "";
  for (let i = 0; i < strings.length; i++) {
    raw += strings[i];
    if (i < values.length) {
      raw += `${PLACEHOLDER_PREFIX}${i}${PLACEHOLDER_PREFIX}`;
    }
  }

  const template = document.createElement("template");
  template.innerHTML = raw.trim();
  const fragment = template.content;

  const placeholderRe = new RegExp(`${PLACEHOLDER_PREFIX}(\\d+)${PLACEHOLDER_PREFIX}`, "g");

  // Pass 1: process attributes on every element.
  const elementWalker = document.createTreeWalker(fragment, NodeFilter.SHOW_ELEMENT);
  const elements: Element[] = [];
  let e: Node | null;
  while ((e = elementWalker.nextNode())) elements.push(e as Element);

  for (const elem of elements) {
    const attrs = Array.from(elem.attributes);
    for (const attr of attrs) {
      if (!attr.value.includes(PLACEHOLDER_PREFIX)) continue;
      placeholderRe.lastIndex = 0;
      const newValue = attr.value.replace(placeholderRe, (_match, idxStr) =>
        valueToString(values[Number(idxStr)])
      );
      attr.value = newValue;
    }
  }

  // Pass 2: process text node placeholders. Splits text nodes and inserts Nodes inline.
  const walker = document.createTreeWalker(fragment, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let n: Node | null;
  while ((n = walker.nextNode())) textNodes.push(n as Text);

  for (const textNode of textNodes) {
    const text = textNode.nodeValue ?? "";
    if (!text.includes(PLACEHOLDER_PREFIX)) continue;
    const parent = textNode.parentNode;
    if (!parent) continue;

    placeholderRe.lastIndex = 0;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    const replacements: Node[] = [];
    while ((match = placeholderRe.exec(text))) {
      if (match.index > lastIndex) {
        replacements.push(document.createTextNode(text.slice(lastIndex, match.index)));
      }
      appendInsertable(replacements, values[Number(match[1])]);
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      replacements.push(document.createTextNode(text.slice(lastIndex)));
    }
    for (const r of replacements) parent.insertBefore(r, textNode);
    parent.removeChild(textNode);
  }

  // Single element root → unwrap. Otherwise return the fragment as-is.
  if (fragment.childElementCount === 1 && fragment.childNodes.length === 1) {
    return fragment.firstElementChild as HTMLElement;
  }
  return fragment;
}

function appendInsertable(out: Node[], v: Insertable): void {
  if (v === null || v === undefined || v === false || v === true) return;
  if (typeof v === "string" || typeof v === "number") {
    out.push(document.createTextNode(String(v)));
    return;
  }
  if (Array.isArray(v)) {
    for (const item of v) appendInsertable(out, item);
    return;
  }
  if (v instanceof Node) {
    out.push(v);
    return;
  }
}

function valueToString(v: Insertable): string {
  if (v === null || v === undefined || v === false || v === true) return "";
  if (typeof v === "string" || typeof v === "number") return String(v);
  if (Array.isArray(v)) return v.map(valueToString).join("");
  return ""; // Nodes can't meaningfully appear inside attribute values.
}

// Escape user-supplied text when building an HTML string fragment by hand.
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
