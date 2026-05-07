import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "carve-outs",
  title: "Carve-Outs & Special Pricing",
  subtitle: "Where contracts admit that not everything fits in the box.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Chapter 7 · Contracts</span>
        <h1>Carve-Outs &amp; Special Pricing</h1>
        <p class="chapter-subtitle">Where contracts admit that not everything fits in the box.</p>

        <p>
          A ${term("carve-out")} is an exception. The contract has a primary methodology — say,
          a per-diem inpatient rate — and the carve-out says "but for these specific items,
          ignore that and pay this way instead." Carve-outs exist because some items are too
          expensive or too variable to fit a bundled rate. They're also where contracts get
          gamed.
        </p>

        <h2>Why carve-outs exist</h2>
        <ol>
          <li><strong>High variability</strong> — items like implants vary 100× in cost. Bundling them into a per-diem would create huge winners and losers.</li>
          <li><strong>Pass-through cost</strong> — drugs, biologics, blood products: the hospital essentially passes through the manufacturer's price.</li>
          <li><strong>Specialty service lines</strong> — transplants, NICU, behavioral health are too distinct from general inpatient to share a methodology.</li>
          <li><strong>Cost protection</strong> — without a carve-out for a $50k implant, a single knee replacement could lose the hospital money under a $11k per-diem total.</li>
        </ol>

        <h2>The standard carve-out menu</h2>

        <h3>Implants</h3>
        <p>
          Joints, hardware, stents, pacemakers, neurostimulators, mesh, etc.
        </p>
        <ul>
          <li><strong>Invoice + markup</strong>: most common. Hospital provides the invoice; payer pays cost + 10–20%.</li>
          <li><strong>Charge − discount</strong>: pay billed charges minus a flat percentage (e.g., 30%).</li>
          <li><strong>Capped invoice</strong>: invoice + markup, but capped at a maximum (prevents abuse on extremely high-cost items).</li>
        </ul>
        <p>
          Watch for: definition of "implant" (the contract usually has a specific list or revenue code criteria); requirement to provide invoices on request; exclusions (consumables, sutures, routine supplies).
        </p>

        <h3>High-cost drugs</h3>
        <p>
          J-codes administered in inpatient or outpatient settings. Often:
        </p>
        <ul>
          <li>ASP + X% (mirrors Medicare structure)</li>
          <li>WAC − discount</li>
          <li>AWP − discount</li>
          <li>Threshold-based: drugs above $1,000/dose paid separately; below threshold, packaged into per-diem or APC</li>
        </ul>

        <h3>Specialty pharmacy</h3>
        <p>
          Often handled outside the medical contract entirely — through a specialty pharmacy
          program (Centers of Excellence, payer's preferred specialty pharmacy network).
          Provider is paid per the specialty pharmacy fee schedule, which differs from the
          provider's medical contract.
        </p>

        <h3>Transplants</h3>
        <p>
          Each organ has a global rate covering:
        </p>
        <ul>
          <li>Pre-transplant evaluation and listing</li>
          <li>Organ acquisition charges (separate sub-component)</li>
          <li>Transplant admission</li>
          <li>Post-transplant follow-up (often 1 year)</li>
        </ul>
        <p>
          Transplant rates can run from $200k (kidney) to $1.5M+ (heart, liver, lung, multi-organ).
          Often steered to a Center of Excellence network.
        </p>

        <h3>NICU</h3>
        <p>
          Typically per-diem-tiered by level (II / III / IV) with much higher rates than
          general inpatient. Some contracts carve NICU into a Center of Excellence arrangement
          with separate per-diem schedules.
        </p>

        <h3>Behavioral health</h3>
        <p>
          Even within a hospital contract, behavioral health units are often carved out:
        </p>
        <ul>
          <li>Psych units: separate per-diem (lower than med-surg)</li>
          <li>IOP/PHP (Intensive Outpatient / Partial Hospitalization): per-day rates</li>
          <li>Residential treatment: per-diem</li>
          <li>Eating disorder programs, addiction treatment: often separate networks</li>
        </ul>

        <h3>Maternity bundles</h3>
        <p>
          Vaginal delivery and C-section are often case-rate carve-outs from the inpatient
          methodology. Includes admission, delivery, postpartum stay, routine newborn care.
          Excludes complications and NICU.
        </p>

        <h3>Other common carve-outs</h3>
        <ul>
          <li><strong>Blood products</strong> — passed through, often at invoice + markup.</li>
          <li><strong>Take-home drugs</strong> — sometimes outside the inpatient bundle.</li>
          <li><strong>Durable medical equipment dispensed at discharge</strong>.</li>
          <li><strong>Specialty diagnostics</strong> — molecular tests, certain genetic panels.</li>
          <li><strong>Air ambulance</strong> — separate, often NSA-protected.</li>
          <li><strong>Hyperbaric oxygen, dialysis</strong> — often separate per-session rates.</li>
        </ul>

        <h2>Carve-out gamesmanship</h2>
        <p>
          Carve-outs introduce optimization opportunities that aren't always to the payer's
          benefit:
        </p>
        <ul>
          <li><strong>Charge inflation on carve-out items</strong> — when a contract pays "% of charges" for implants, hospitals raise implant chargemaster prices.</li>
          <li><strong>Definition disputes</strong> — what exactly counts as an "implant"? Mesh? Bone cement? Disposable instruments? Contracts that don't specify lose money.</li>
          <li><strong>Invoice inflation</strong> — hospitals can include shipping, handling, sterilization in "cost" if the contract is loose.</li>
          <li><strong>Drug split-billing</strong> — billing the drug separately from administration to maximize carve-out application.</li>
        </ul>

        <h2>How carve-outs interact with the primary methodology</h2>
        <p>
          The order of operations matters:
        </p>
        <ol>
          <li>Identify all line items on the claim that qualify for a carve-out.</li>
          <li>Set those aside; price them per the carve-out method.</li>
          <li>Apply the primary methodology (per-diem, DRG, APC) to the remaining services.</li>
          <li>Add the two together.</li>
          <li>Apply stop-loss across the total (often).</li>
        </ol>

        <h2>The carve-out visualizer (revisited)</h2>
        <p>
          The calculator from chapter 5 shows how carve-outs swing the total payment. Toggling
          carve-outs off can change a total by 30–50% on a typical inpatient stay with implants.
        </p>

        <div class="callout callout-good">
          <div class="callout-title">A useful framing</div>
          The primary methodology pays for the <em>service</em>. Carve-outs pay for
          <em>materials</em>. When a service line is mostly labor (an office visit), the
          methodology covers it. When it's heavy on materials (a knee replacement, a
          chemotherapy infusion), carve-outs shoulder the bulk of the dollars.
        </div>

        <div class="key-takeaway">
          <div class="key-takeaway-title">Key takeaway</div>
          Carve-outs handle the items where bundled methodologies break down. Implants, drugs,
          transplants, and specialty service lines are the big ones. The contract has to define
          carve-outs precisely or the payer ends up paying open-ended bills.
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this chapter</div>
          <div class="glossary-strip-terms">
            ${term("carve-out")} ${term("per-diem")} ${term("percent-of-charges")} ${term("stop-loss")}
          </div>
        </div>
      </article>`;
  },
};
