import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "hospital-deep-dive",
  title: "Hospital Contracts Deep Dive",
  subtitle: "Per-diem with carve-outs, DRG with outliers, and stop-loss — where the real money lives.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Chapter 5 · Contracts</span>
        <h1>Hospital Contracts Deep Dive</h1>
        <p class="chapter-subtitle">Per-diem with carve-outs, DRG with outliers, and stop-loss — where the real money lives.</p>

        <p>
          Hospitals carry the largest dollars in healthcare contracting and the most complexity.
          A single hospital contract can have 20+ pricing rules layered on top of each other.
          Understanding the layering is the difference between predicting payment and being
          surprised by it.
        </p>

        <h2>Per-diem with carve-outs — the canonical structure</h2>
        <p>
          A typical commercial inpatient hospital contract using per-diem methodology looks
          like this:
        </p>

        <table>
          <thead><tr><th>Component</th><th>Detail</th></tr></thead>
          <tbody>
            <tr><td>Per-diem grid</td><td>Tiered by level of care (med-surg, telemetry, ICU, NICU, psych, rehab).</td></tr>
            <tr><td>Inclusions</td><td>Room &amp; board, nursing, routine supplies, routine drugs, ancillary diagnostics, basic OR.</td></tr>
            <tr><td>Carve-outs</td><td>Implants (often "invoice + 10%"), high-cost drugs (J-codes &gt; $X/dose), specialty pharmacy, transplants.</td></tr>
            <tr><td>Stop-loss trigger</td><td>Charges exceed $X (e.g., $250,000) — flip to % of charges (e.g., 75%) for the entire stay.</td></tr>
            <tr><td>Outlier provision</td><td>Sometimes a separate outlier payment in addition to per-diem.</td></tr>
            <tr><td>Readmission policy</td><td>Re-admission within 30 days for related diagnosis may not pay (or pays at reduced rate).</td></tr>
            <tr><td>Length-of-stay caps</td><td>Sometimes per-diem caps after N days (e.g., flat percent of charges after day 30).</td></tr>
            <tr><td>Transfer reduction</td><td>Reduced payment when patient is transferred out before expected DC.</td></tr>
          </tbody>
        </table>

        <h2>Try it: build a per-diem inpatient stay</h2>

        <div data-calc="carve-out-visualizer"></div>

        <h2>DRG with outliers and stop-loss</h2>
        <p>
          DRG-based contracts have their own complexity. A typical structure:
        </p>
        <ul>
          <li><strong>Base rate</strong> per the contract (often pegged to CMS base × multiplier, e.g., 110% of CMS).</li>
          <li><strong>Wage index</strong> — sometimes applied, sometimes not. Commercial often skips it.</li>
          <li><strong>DRG weights</strong> — MS-DRG or APR-DRG (severity-adjusted).</li>
          <li><strong>Outlier provision</strong> — when charges × cost-to-charge ratio exceed a threshold, additional payment of (excess × marginal cost factor).</li>
          <li><strong>Stop-loss</strong> — when charges exceed a high threshold (e.g., $500k), payment switches to % of charges. This protects the hospital from catastrophic underpayment on extreme cases.</li>
          <li><strong>Carve-outs</strong> — same as per-diem. Implants and specialty drugs often paid separately even on top of DRG.</li>
          <li><strong>Transfers, readmissions, present-on-admission</strong> rules.</li>
        </ul>

        <h2>Outpatient hospital structure</h2>
        <p>
          Mixed methodology is the norm:
        </p>
        <ul>
          <li><strong>Surgery</strong>: case rates by procedure (e.g., $4,500 for cataract, $9,000 for arthroscopy) or % of OPPS.</li>
          <li><strong>ER visits</strong>: case rate by acuity level (CPT 99281–99285) or revenue-code-based per-encounter rate.</li>
          <li><strong>Imaging</strong>: % of OPPS, often with a separate contrast carve-out.</li>
          <li><strong>Infusion / chemotherapy</strong>: drug carve-out (J-codes at ASP + X%) plus an administration fee.</li>
          <li><strong>Lab</strong>: per-test fee schedule.</li>
          <li><strong>Observation</strong>: separate per-diem or hour-based rate.</li>
          <li><strong>Catch-all</strong>: % of charges for anything not specifically priced.</li>
        </ul>

        <h2>Stop-loss in detail</h2>
        <p>
          Stop-loss provisions in hospital contracts are dollar-trigger thresholds that flip
          pricing methodology when a single case becomes catastrophically expensive. Common
          patterns:
        </p>
        <ul>
          <li><strong>Charge-based trigger, charge-based pay</strong>: "If billed charges exceed $250,000, the payment for the entire stay shall be 75% of billed charges, in lieu of per-diem." Simple.</li>
          <li><strong>Charge-based trigger, additive outlier</strong>: "If billed charges exceed the per-diem total × 5, an additional payment of (charges − threshold) × 60% shall apply." Hospital still gets per-diem, plus extra on top.</li>
          <li><strong>Cost-based trigger</strong>: "If billed charges × cost-to-charge ratio exceed $X, additional payment of (excess × marginal cost factor) shall apply." Mirrors Medicare outlier methodology.</li>
        </ul>

        <h2>Readmission policies</h2>
        <p>
          Readmission within 30 days for the same or related diagnosis may be:
        </p>
        <ul>
          <li><strong>Bundled into the original</strong>: no additional payment.</li>
          <li><strong>Paid at reduced rate</strong>: e.g., 50% of standard.</li>
          <li><strong>Excluded</strong> if the readmission was preventable per a defined list.</li>
        </ul>
        <p>
          Medicare's HRRP (Hospital Readmissions Reduction Program) penalizes hospitals
          financially for excess readmissions; commercial contracts often borrow language
          and definitions.
        </p>

        <h2>Other hospital contract specialties</h2>
        <ul>
          <li><strong>Transplant carve-outs</strong> — each organ has a global rate covering pre-transplant, transplant admission, and post-transplant follow-up.</li>
          <li><strong>NICU tiers</strong> — Level II (intermediate) vs. III (intensive) vs. IV (regional referral); huge per-diem differences.</li>
          <li><strong>Psychiatric units</strong> — separate per-diem, sometimes carved out to a behavioral health subcontractor.</li>
          <li><strong>Rehab units</strong> — separate per-diem; some contracts use Medicare's IRF-PPS as a basis.</li>
          <li><strong>Maternity bundling</strong> — global delivery rate covering admission, delivery, and postpartum.</li>
          <li><strong>OR time fees</strong> — sometimes carved out for ASC-style billing within hospital contracts.</li>
        </ul>

        <h2>What a hospital contract negotiation actually argues over</h2>
        <ol>
          <li>Inpatient base rate (DRG) or per-diem grid (per-diem). One number movement = millions in revenue.</li>
          <li>Stop-loss threshold and percentage. The provider wants a low threshold and high pay-out percentage; the payer wants the opposite.</li>
          <li>Carve-out scope. The provider wants more carve-outs (more services priced separately, less risk); the payer wants fewer.</li>
          <li>Readmission policy strictness.</li>
          <li>Annual escalators (1–4% per year, often by methodology).</li>
        </ol>

        <div class="callout callout-warm">
          <div class="callout-title">A quiet leverage tool</div>
          Most-favored-nation clauses ("you must give us rates as good as any other payer's")
          are increasingly banned by state law. Where they survive, they enormously constrain
          hospital negotiating room across the rest of their book.
        </div>

        <div class="key-takeaway">
          <div class="key-takeaway-title">Key takeaway</div>
          Hospital contracts layer per-diem or DRG on top of carve-outs on top of stop-loss
          on top of readmission policies. The pricing engine has to walk the layers in the
          right order. Negotiations focus on a handful of numbers; everything else is
          structural.
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this chapter</div>
          <div class="glossary-strip-terms">
            ${term("per-diem")} ${term("drg")} ${term("carve-out")} ${term("stop-loss")}
            ${term("outlier")} ${term("percent-of-charges")} ${term("apc")}
          </div>
        </div>
      </article>`;
  },
};
