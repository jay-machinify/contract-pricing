import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "methodologies",
  title: "Reimbursement Methodologies in Contracts",
  subtitle: "Picking the right hammer for the right service line.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Chapter 4 · Contracts</span>
        <h1>Reimbursement Methodologies in Contracts</h1>
        <p class="chapter-subtitle">Picking the right hammer for the right service line.</p>

        <p>
          Walkthrough 1, chapters 4–8 explained the methodologies as pricing tools. Here we look
          at them as contract elements — which method goes where, why, and what to watch for in
          the contract language.
        </p>

        <h2>The standard menu, by methodology</h2>

        <h3>${term("fee-schedule", "Percent of Medicare fee schedule")}</h3>
        <p>
          The dominant professional methodology. Contract clause:
        </p>
        <blockquote>
          "Reimbursement for Professional Services shall be the lesser of (a) Provider's Billed
          Charge or (b) one hundred twenty percent (120%) of the Medicare Physician Fee Schedule
          allowed amount for the applicable procedure code, as published by CMS and effective
          for the date of service."
        </blockquote>
        <p>
          Watch for: the multiplier (often 100–150% commercial; 60–80% Medicaid), the Medicare
          year reference, locality (national vs. specific GPCIs), and frozen-snapshot vs.
          live-update language.
        </p>

        <h3>Custom fee schedule</h3>
        <p>
          A payer-specific dollar table per code, usually as an exhibit. Less common today
          because it requires manual maintenance and lacks Medicare's automatic updates.
          Persists in legacy contracts and certain specialty arrangements.
        </p>

        <h3>${term("drg")} (inpatient)</h3>
        <p>
          Standard inpatient hospital methodology. Variants:
        </p>
        <ul>
          <li><strong>Medicare MS-DRG</strong> — base rate × DRG weight × wage index, plus IME/DSH/outliers.</li>
          <li><strong>APR-DRG (3M)</strong> — All Patient Refined DRGs with severity-of-illness subclasses (1–4). Often used in commercial and Medicaid.</li>
          <li><strong>Hospital-specific DRG</strong> — payer and hospital agree on a base rate; weights still come from MS-DRG or APR-DRG.</li>
        </ul>

        <h3>${term("apc", "APC")} / OPPS-based (outpatient)</h3>
        <p>
          Often expressed as percent of Medicare OPPS. Sometimes wraps in commercial-specific
          status indicator overrides (e.g., the contract says "we pay separately for items
          packaged under OPPS status N").
        </p>

        <h3>${term("per-diem", "Per diem")} (inpatient hospital)</h3>
        <p>
          Tiered by level of care. Common contract structure:
        </p>
        <table>
          <thead><tr><th>Level</th><th>Per-diem rate</th></tr></thead>
          <tbody>
            <tr><td>Med-surg</td><td>$2,200</td></tr>
            <tr><td>Telemetry</td><td>$2,800</td></tr>
            <tr><td>ICU</td><td>$4,800</td></tr>
            <tr><td>NICU Level II</td><td>$3,400</td></tr>
            <tr><td>NICU Level III</td><td>$5,600</td></tr>
            <tr><td>NICU Level IV</td><td>$7,200</td></tr>
            <tr><td>Psych unit</td><td>$1,400</td></tr>
            <tr><td>Rehab unit</td><td>$1,800</td></tr>
          </tbody>
        </table>
        <p>
          Per-diem contracts almost always include carve-outs (chapter 7) and stop-loss
          (chapter 5). Without those, big cases can lose hospitals huge amounts of money.
        </p>

        <h3>${term("case-rate", "Case rate")}</h3>
        <p>
          Single payment per defined case. Frequently used for:
        </p>
        <ul>
          <li>Maternity (vaginal vs. C-section, complications carve-out)</li>
          <li>Joint replacement, cardiac procedures</li>
          <li>Some bariatric procedures</li>
          <li>Dialysis (per session or per month)</li>
        </ul>
        <p>
          Cleaner than DRG but coarser. Make sure the contract specifies what triggers the
          case rate (admission DRG? procedure code? both?), what's included, what's excluded,
          and what happens for outliers.
        </p>

        <h3>${term("percent-of-charges")}</h3>
        <p>
          The fallback methodology. Common contract appearances:
        </p>
        <ul>
          <li><strong>Default for non-categorized services</strong> — "any service not otherwise priced shall be paid at sixty percent (60%) of billed charges."</li>
          <li><strong>Stop-loss switch</strong> — "in the event a case's billed charges exceed $X, payment shall flip from per-diem to seventy-five percent (75%) of billed charges."</li>
          <li><strong>Small hospitals or specialty units</strong> — sometimes simpler than building out a per-diem grid.</li>
        </ul>
        <p>
          Always come with concern: the provider can raise charges and the payer pays more.
          Strong contracts cap charge increases or use most-recent-CMS reference rates as a
          proxy.
        </p>

        <h3>${term("capitation")}</h3>
        <p>
          Used in primary care, specialty management, and full-risk arrangements. Contract
          language defines:
        </p>
        <ul>
          <li>The PMPM rate (often risk-adjusted by HCC scores in MA)</li>
          <li>Attribution rules (how members get assigned to the provider)</li>
          <li>Scope (professional only, professional + lab, full risk, etc.)</li>
          <li>Reconciliation (truing up against actual utilization at year end)</li>
          <li>Risk corridors (caps and floors on profit/loss)</li>
        </ul>

        <h3>${term("bundled-payment", "Bundled payments")}</h3>
        <p>
          One payment covering an episode across multiple providers. Contract complexity is
          high — defining the episode, attribution, distribution to participants, quality gates,
          and reconciliation.
        </p>

        <h2>Mixing and matching</h2>
        <p>
          Real hospital contracts always combine methods. A typical structure:
        </p>
        <ul>
          <li>Inpatient: DRG with carve-outs and stop-loss</li>
          <li>Outpatient surgery: case rates by procedure</li>
          <li>Outpatient diagnostic: percent of Medicare OPPS</li>
          <li>ER visits: case rate by acuity level</li>
          <li>Anything else: percent of charges fallback</li>
        </ul>

        <p>The hierarchy of methods determines what gets applied to what. The contract has to be unambiguous about precedence.</p>

        <h2>Lesser-of vs. greater-of</h2>
        <p>
          Lesser-of clauses are universal (allowed = min(billed, contracted)). Greater-of
          clauses are rare but sometimes appear:
        </p>
        <ul>
          <li><strong>Greater-of for outliers</strong>: "payment for outlier cases shall be the greater of the per-diem total or 60% of charges." Protects the provider on extreme cases.</li>
          <li><strong>Greater-of in stop-loss</strong>: "if charges exceed threshold, payment shall be the greater of per-diem total or 70% of charges." Same protection.</li>
        </ul>

        <h2>Effective date precision</h2>
        <p>
          Each rate or methodology can have its own effective date. Real contracts often have
          rate sheets with multiple "as of" dates — Year 1 rates, Year 2 with a 3% increase,
          Year 3 with a 4% increase. Pricing engines need to lookup by date of service.
        </p>

        <div class="key-takeaway">
          <div class="key-takeaway-title">Key takeaway</div>
          Each service line gets matched to a methodology in the contract, with precedence and
          fallback rules. A pricing engine has to apply them in the right order with the right
          inputs and the right effective dates. Get any of those wrong and the engine is wrong.
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this chapter</div>
          <div class="glossary-strip-terms">
            ${term("fee-schedule")} ${term("drg")} ${term("apc")} ${term("per-diem")}
            ${term("case-rate")} ${term("percent-of-charges")} ${term("capitation")}
            ${term("bundled-payment")} ${term("lesser-of")} ${term("carve-out")} ${term("stop-loss")}
          </div>
        </div>
      </article>`;
  },
};
