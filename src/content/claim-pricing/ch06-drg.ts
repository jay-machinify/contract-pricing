import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "drg",
  title: "Inpatient Facility Pricing (DRG)",
  subtitle: "How a 5-day hospital stay collapses to a single payment.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Chapter 6 · Pricing Claims</span>
        <h1>Inpatient Facility Pricing (DRG)</h1>
        <p class="chapter-subtitle">How a 5-day hospital stay collapses to a single payment.</p>

        <p>
          For inpatient care, Medicare and most commercial contracts use ${term("drg", "DRGs")}
          — a bundled payment that doesn't depend on length of stay or services rendered.
          Two patients with the same diagnosis and complications pay the same amount. This is
          how Medicare contains inpatient costs.
        </p>

        <h2>The DRG concept</h2>
        <p>
          Every inpatient discharge is grouped into one of ~750 ${term("drg", "MS-DRGs")}
          based on principal diagnosis, secondary diagnoses (CC/MCC complications), procedures,
          and patient demographics. Each DRG has a <strong>relative weight</strong> reflecting
          the average resource intensity for that case mix. A heart transplant DRG has weight
          ~25; a normal newborn has weight ~0.15.
        </p>

        <h2>The pricing formula</h2>
        <div class="formula">Payment = Base rate × (labor·WI + non-labor) × DRG weight + adjustments</div>

        <table>
          <thead><tr><th>Component</th><th>What it is</th></tr></thead>
          <tbody>
            <tr><td>Base rate</td><td>Hospital-specific operating base, set annually by CMS or by contract.</td></tr>
            <tr><td>${term("wage-index", "Wage index")}</td><td>CMS-published locality factor (CBSA) reflecting local hospital wages relative to national average.</td></tr>
            <tr><td>Labor share</td><td>Fraction of base rate that's labor-related; historically 0.677. Only this portion is wage-index-adjusted.</td></tr>
            <tr><td>DRG weight</td><td>Relative resource intensity of the DRG.</td></tr>
            <tr><td>${term("ime-dsh", "IME / DSH")}</td><td>Add-on percentages for teaching hospitals (IME) and safety-net providers (DSH).</td></tr>
            <tr><td>${term("outlier", "Outlier")} payment</td><td>Extra payment when the case's actual costs exceed a threshold (Medicare uses fixed-loss; commercial often charge-based).</td></tr>
            <tr><td>Transfer reduction</td><td>Reduces payment when patient is transferred to another acute care hospital before completing the expected length of stay.</td></tr>
          </tbody>
        </table>

        <h2>Worked example</h2>
        <p>
          DRG 470 (Major joint replacement w/o MCC) at a non-teaching community hospital in a
          national-average wage-index area:
        </p>
        <ul>
          <li>Base rate: $6,500</li>
          <li>Wage index: 1.000 → wage-adjusted base = $6,500</li>
          <li>DRG weight: 1.9904</li>
          <li>Pre-adjustment payment: $6,500 × 1.9904 = $12,937.60</li>
          <li>No IME/DSH add-ons</li>
          <li>No outlier (case stayed within thresholds)</li>
        </ul>
        <p><strong>Total payment: $12,937.60</strong>, regardless of whether the patient stayed 2 days or 5 days.</p>

        <div data-calc="drg-calculator"></div>

        <h2>How DRG assignment actually happens</h2>
        <p>
          Coders assign ICD-10-CM diagnoses and ICD-10-PCS procedures from the inpatient record.
          Software called a <em>grouper</em> (Medicare's MS-DRG Grouper, or commercial 3M APR-DRG
          Grouper) processes those codes and outputs a DRG. The grouper is non-trivial: present-on-admission
          (POA) flags, MCC/CC severity tiers, age, sex, and discharge disposition all influence the result.
        </p>

        <h2>CC and MCC: severity tiers</h2>
        <p>
          Many DRGs come in triplets reflecting comorbidity:
        </p>
        <ul>
          <li><strong>w/MCC</strong> — with major complications (e.g., DRG 291)</li>
          <li><strong>w/CC</strong> — with complications (e.g., DRG 292)</li>
          <li><strong>w/o CC/MCC</strong> — without complications (e.g., DRG 293)</li>
        </ul>
        <p>
          The same principal diagnosis (heart failure, in this example) gets weighted very
          differently depending on which severity tier the documentation supports. Hospital
          revenue depends meaningfully on documentation-driven CC/MCC capture — a whole
          industry of "clinical documentation improvement" (CDI) exists around this.
        </p>

        <h2>${term("outlier", "Outliers")}</h2>
        <p>
          Some cases blow well past their DRG weight. To prevent catastrophic losses for
          hospitals, payers add an outlier payment when the case's <em>cost</em> (estimated as
          billed charges × the hospital's cost-to-charge ratio) exceeds a fixed-loss threshold.
          Outlier rules have to be in the contract — they're not free.
        </p>

        <h2>Transfers</h2>
        <p>
          When a patient is transferred to another acute care hospital before the expected
          length of stay, the transferring hospital's DRG payment is reduced. Medicare uses a
          per-diem-like reduction; commercial contracts often define their own rule.
        </p>

        <h2>Commercial DRG contracts</h2>
        <p>
          Many commercial hospital contracts use DRGs but with their own base rates, weights
          (often APR-DRG instead of MS-DRG), or outlier thresholds. A typical structure:
        </p>
        <ul>
          <li>Base rate: hospital-specific dollar amount, often pegged to CMS base × multiplier.</li>
          <li>Weights: APR-DRG (severity-adjusted) or MS-DRG.</li>
          <li>Outlier: charge-based threshold + percent of charges above it (e.g., when charges > $250k, pay 60% of charges in excess of threshold).</li>
          <li>Transfer rules and exclusions.</li>
        </ul>

        <div class="callout">
          <div class="callout-title">Why DRGs work</div>
          The hospital can't make more by keeping the patient longer or running extra tests —
          the payment is fixed. Incentive to be efficient. The risk: undercoding lowers DRG
          assignment and revenue; overcoding (upcoding) creates compliance risk.
        </div>

        <div class="key-takeaway">
          <div class="key-takeaway-title">Key takeaway</div>
          DRGs bundle an inpatient stay into a single weight × base-rate payment. CC/MCC
          severity tiers, IME/DSH, outliers, and transfers adjust around that core.
          Commercial contracts often use the same machinery with their own dollar inputs.
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this chapter</div>
          <div class="glossary-strip-terms">
            ${term("drg")} ${term("wage-index")} ${term("ime-dsh")} ${term("outlier")}
          </div>
        </div>
      </article>`;
  },
};
