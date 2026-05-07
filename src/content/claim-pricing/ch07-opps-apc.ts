import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "opps-apc",
  title: "Outpatient Facility Pricing (APC / OPPS)",
  subtitle: "How hospital outpatient services get paid.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Chapter 7 · Pricing Claims</span>
        <h1>Outpatient Facility Pricing (APC / OPPS)</h1>
        <p class="chapter-subtitle">How hospital outpatient services get paid.</p>

        <p>
          DRGs are for inpatient stays. For hospital outpatient services — same-day surgery,
          ER visits that don't admit, observation stays, infusions, diagnostic imaging — Medicare
          uses the ${term("opps", "Outpatient Prospective Payment System")} built around
          ${term("apc", "Ambulatory Payment Classifications")}.
        </p>

        <h2>The APC model</h2>
        <p>
          Each HCPCS code on an outpatient claim has a <strong>status indicator</strong>
          (a letter) that tells OPPS what to do with it. Codes with status indicator
          <code>S</code>, <code>T</code>, or <code>V</code> map to an APC; the APC has a relative
          weight; the weight times the OPPS conversion factor produces a payment.
        </p>

        <div class="formula">APC payment = APC relative weight × OPPS conversion factor × wage adjustment</div>

        <h2>Status indicators (the cheat sheet)</h2>
        <table>
          <thead><tr><th>SI</th><th>Meaning</th></tr></thead>
          <tbody>
            <tr><td><code>S</code></td><td>Significant procedure, multiple-procedure reduction does not apply.</td></tr>
            <tr><td><code>T</code></td><td>Significant procedure, MPR applies (50% reduction on lesser-priced concurrent procedures).</td></tr>
            <tr><td><code>V</code></td><td>Clinic or ER visit (E&amp;M).</td></tr>
            <tr><td><code>N</code></td><td>Packaged into another service. No separate payment.</td></tr>
            <tr><td><code>Q1–Q4</code></td><td>Conditionally packaged depending on what else is on the claim.</td></tr>
            <tr><td><code>J1</code></td><td>Comprehensive APC ("C-APC") — all other services on the claim are packaged into this one payment.</td></tr>
            <tr><td><code>G</code></td><td>Pass-through drug/biological — separately payable above APC.</td></tr>
            <tr><td><code>E</code></td><td>Excluded from OPPS.</td></tr>
          </tbody>
        </table>

        <h2>Packaging</h2>
        <p>
          OPPS packages a lot of stuff. Routine supplies, anesthesia, recovery room time,
          observation beds, and many drugs are not separately payable — they're rolled into
          the primary APC. Status indicator <code>N</code> = packaged. The hospital sees a $0
          line on the 835, but the cost is implicitly built into the APC payment.
        </p>

        <h2>Comprehensive APCs (C-APCs)</h2>
        <p>
          For high-cost procedures (status <code>J1</code>), OPPS now uses the C-APC: a single
          all-inclusive payment for the procedure plus everything else on the claim that day.
          Effectively a same-day "DRG" for outpatient. Greatly reduces unbundling games.
        </p>

        <h2>Multiple-procedure reduction</h2>
        <p>
          When two or more SI <code>T</code> procedures are on the same claim, the highest-paid
          gets 100% of its APC and the rest get 50%. Imaging family has its own rules.
        </p>

        <h2>Wage adjustment</h2>
        <p>
          Like DRG, OPPS payments are wage-adjusted on the labor share. Same wage index, similar mechanics.
        </p>

        <h2>${term("asc")} pricing — close cousin, separate system</h2>
        <p>
          Ambulatory surgery centers are paid under a different, lower fee schedule (the ASC
          payment system) — generally about 60% of the OPPS rate for the same procedure.
          Commercial contracts often follow this gap or peg ASC rates to a percent of Medicare
          ASC.
        </p>

        <h2>Observation</h2>
        <p>
          Observation services (HCPCS <code>G0378</code>) sit awkwardly between inpatient and
          outpatient. Medicare pays observation as part of a comprehensive APC when bundled
          with a qualifying ED visit and certain conditions are met. Otherwise observation
          packages into the primary service.
        </p>

        <h2>Commercial outpatient contracts</h2>
        <p>
          Commercial hospital contracts for outpatient services often use one of:
        </p>
        <ul>
          <li><strong>Percent of Medicare OPPS</strong> — e.g., "150% of Medicare OPPS" — clean and updates with CMS.</li>
          <li><strong>${term("percent-of-charges")}</strong> — e.g., 60% of billed charges. Loose cost discipline; common as a fallback for codes not under OPPS or for smaller hospitals.</li>
          <li><strong>Custom outpatient fee schedule</strong> — payer's own dollar amounts per HCPCS or per revenue code.</li>
          <li><strong>Case rate</strong> for high-volume procedures (e.g., colonoscopy, cataract).</li>
        </ul>

        <div class="callout callout-good">
          <div class="callout-title">Spot the pattern</div>
          OPPS = "outpatient DRG, lite." Code → APC → weight × CF, with packaging instead of
          a single weight. The payment paradigm is similar to inpatient DRG: bundle services,
          give one payment, push efficiency risk to the provider.
        </div>

        <div class="key-takeaway">
          <div class="key-takeaway-title">Key takeaway</div>
          Hospital outpatient pricing centers on APCs and status indicators. Comprehensive APCs
          bundle everything on the claim. Commercial contracts mostly piggyback on the OPPS
          framework, often as a percent of Medicare.
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this chapter</div>
          <div class="glossary-strip-terms">
            ${term("opps")} ${term("apc")} ${term("asc")} ${term("percent-of-charges")} ${term("revenue-code")}
          </div>
        </div>
      </article>`;
  },
};
