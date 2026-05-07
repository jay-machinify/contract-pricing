import { html } from "../lib/html";
import type { RouteResult } from "../router";

export function landingRoute(): RouteResult {
  const el = html`
    <section class="landing">
      <div class="landing-hero">
        <h1>Healthcare Pricing &amp; Contracts — A Practitioner's Tutorial</h1>
        <p>
          Two interactive walkthroughs covering how US healthcare claims are priced and
          how provider contracts shape that pricing. Calculators let you run the math
          yourself; a glossary captures the vocabulary.
        </p>
      </div>
      <div class="landing-cards">
        <a class="landing-card" href="/claim-pricing/lifecycle">
          <div class="card-eyebrow">Walkthrough 1 · 12 chapters</div>
          <h2>Pricing Claims</h2>
          <p>
            From the claim form to the EOB. Fee schedules, RBRVS, MS-DRG, APC, per diem,
            capitation, member cost share, COB, and end-to-end adjudication.
          </p>
          <span class="card-arrow">Start →</span>
        </a>
        <a class="landing-card" href="/contracts/why-contracts">
          <div class="card-eyebrow">Walkthrough 2 · 12 chapters</div>
          <h2>Contracts in Healthcare</h2>
          <p>
            How payers and providers negotiate the rates that drive pricing. Hospital
            contracts, professional contracts, carve-outs, risk arrangements, and the
            government-program layer.
          </p>
          <span class="card-arrow">Start →</span>
        </a>
      </div>
      <a class="landing-card" href="/case-files/sarah-wrist" style="margin-top: var(--space-4); display: block;">
        <div class="card-eyebrow">Case Files · 5 patient journeys</div>
        <h2>Case Files — Real-World Examples</h2>
        <p>
          Five patient stories that walk through real claims end-to-end. The codes, the
          methodologies, the dollar amounts, the EOB. The concepts from the walkthroughs,
          applied.
        </p>
        <span class="card-arrow">Read the cases →</span>
      </a>
      <a class="landing-glossary-link" href="/glossary">Browse the glossary →</a>
    </section>`;
  return { el, title: "Healthcare Pricing & Contracts — A Practitioner's Tutorial" };
}

export function notFoundRoute(): RouteResult {
  const el = html`
    <section class="landing">
      <div class="landing-hero">
        <h1>Page not found</h1>
        <p>That route doesn't exist. Head back to the <a href="/">landing page</a>.</p>
      </div>
    </section>`;
  return { el, title: "Not found" };
}
