import { html } from "./lib/html";

let outletRef: HTMLElement | null = null;

export function buildShell(root: HTMLElement): HTMLElement {
  const shell = html`
    <div class="shell">
      <header class="site-header">
        <a class="brand" href="/">
          <span class="brand-mark">Rx<span class="brand-mark-dollar">$</span></span>
          <span class="brand-name">Pricing &amp; Contracts</span>
        </a>
        <nav class="site-nav">
          <a href="/claim-pricing/lifecycle">Pricing Claims</a>
          <a href="/contracts/why-contracts">Contracts</a>
          <a href="/case-files/sarah-wrist">Case Files</a>
          <a href="/glossary">Glossary</a>
        </nav>
      </header>
      <main class="site-main" id="outlet"></main>
      <footer class="site-footer">
        <span>A practitioner's tutorial on US healthcare claim pricing.</span>
        <span class="footer-meta">Built with Vite + TypeScript. No frameworks.</span>
      </footer>
    </div>`;
  root.replaceChildren(shell);
  outletRef = shell.querySelector<HTMLElement>("#outlet");
  if (!outletRef) throw new Error("outlet not found");
  return outletRef;
}

export function getOutlet(): HTMLElement {
  if (!outletRef) throw new Error("shell not initialized");
  return outletRef;
}
