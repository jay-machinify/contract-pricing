import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "other-methods",
  title: "Other Reimbursement Methods",
  subtitle: "Per diem, percent of charges, case rates, capitation, bundles.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Chapter 8 · Pricing Claims</span>
        <h1>Other Reimbursement Methods</h1>
        <p class="chapter-subtitle">Per diem, percent of charges, case rates, capitation, bundles.</p>

        <p>
          Fee schedules and DRG/APC are the two big paradigms, but contracts use a wider menu.
          Each method shifts risk between payer and provider differently. Knowing which one is
          in play determines what you can predict about the payment.
        </p>

        <h2>${term("per-diem", "Per diem")}</h2>
        <p>
          A flat daily rate for an inpatient stay, often tiered by level of care (med-surg, ICU,
          NICU). The per-diem covers <em>all services that day</em> within the bundle, except
          contracted ${term("carve-out", "carve-outs")} (implants, drugs, transplants).
        </p>
        <p>
          Common in commercial hospital contracts as an alternative to DRG. Easier to model:
          5 days × $2,200/day = $11,000. Harder to predict outliers — a 30-day ICU stay with
          high-cost drugs is wildly more expensive than the contract anticipated, which is why
          ${term("stop-loss")} thresholds typically wrap per-diem terms.
        </p>

        <h2>${term("percent-of-charges")}</h2>
        <p>
          Allowed amount = some % of the provider's billed charges. E.g., 60% of charges.
          Conceptually the simplest method, but it gives the provider unilateral control over
          its charge-master and therefore the payment. Common as:
        </p>
        <ul>
          <li>A fallback for services without a more specific contracted rate</li>
          <li>A stop-loss switch (e.g., "if charges exceed $X, switch from per-diem to 75% of charges")</li>
          <li>Pricing for small, cost-light providers where the payer doesn't want to negotiate granularly</li>
        </ul>

        <h2>${term("case-rate", "Case rate")}</h2>
        <p>
          A flat dollar payment per defined episode, regardless of length of stay or services
          rendered. <em>$9,500 for a vaginal delivery, $13,500 for a C-section.</em> Common in:
        </p>
        <ul>
          <li>Maternity (delivery + routine postpartum care)</li>
          <li>Cardiac procedures (cath lab, PCI)</li>
          <li>Bariatric surgery, joint replacement, cataract surgery</li>
        </ul>
        <p>
          Simpler than DRG (no weights, no severity tiering) but coarser. Risk lives with the
          provider: if the case turns out to be complex, they absorb the cost.
        </p>

        <h2>${term("capitation")}</h2>
        <p>
          A prospective ${term("pmpm")} payment that compensates the provider for managing some
          or all of an attributed member's care. <em>$25 PMPM for primary care</em> means a
          panel of 1,000 attributed members generates $25,000/month flat, regardless of how
          many visits.
        </p>
        <p>Variants:</p>
        <ul>
          <li><strong>Professional cap</strong> — covers PCP services only.</li>
          <li><strong>Global cap</strong> — covers everything (specialists, hospital, pharmacy). Only delegated medical groups (e.g., California Kaiser-affiliated IPAs) take this on.</li>
          <li><strong>Carved-out cap</strong> — primary care + specialty visits only; hospital paid FFS.</li>
        </ul>
        <p>
          Capitation flips the risk: the provider profits if utilization is low and loses money
          if utilization is high. It changes the incentive from "do more" to "manage the
          population." Most common in ${term("ma-plan", "Medicare Advantage")} and Medicaid
          managed care.
        </p>

        <h2>${term("bundled-payment", "Bundled payments")}</h2>
        <p>
          One payment covering an episode of care that spans multiple providers and a time
          window. Joint-replacement bundle: surgery + 90 days of post-acute care, all priced
          together. The convening provider distributes payments to participants. Medicare's
          <strong>BPCI Advanced</strong> and <strong>CJR</strong> programs popularized this;
          commercial plans now offer their own bundles.
        </p>

        <h2>Value-based / shared savings</h2>
        <p>
          Layered <em>on top</em> of an underlying FFS or DRG/APC framework. Provider keeps
          getting paid the usual way, but at year end, total spending is compared against a
          benchmark and the provider shares in the savings (or losses). ACO programs work this
          way.
        </p>
        <ul>
          <li><strong>Upside-only</strong>: provider shares in savings but doesn't owe money for losses.</li>
          <li><strong>Two-sided</strong>: provider shares in both directions; bigger upside, real downside.</li>
          <li><strong>P4P (pay-for-performance)</strong>: bonuses tied to quality measures (HEDIS, STAR ratings).</li>
        </ul>

        <h2>Side-by-side</h2>
        <table>
          <thead><tr><th>Method</th><th>Granularity</th><th>Risk on</th><th>Typical use</th></tr></thead>
          <tbody>
            <tr><td>Fee schedule</td><td>Per service line</td><td>Payer</td><td>Professional, outpatient</td></tr>
            <tr><td>Per diem</td><td>Per day</td><td>Mix (split by carve-outs and stop-loss)</td><td>Hospital inpatient (commercial)</td></tr>
            <tr><td>DRG</td><td>Per stay</td><td>Provider</td><td>Hospital inpatient</td></tr>
            <tr><td>APC</td><td>Per service / claim</td><td>Provider (mostly)</td><td>Hospital outpatient</td></tr>
            <tr><td>% of charges</td><td>Per claim</td><td>Payer</td><td>Fallback, stop-loss</td></tr>
            <tr><td>Case rate</td><td>Per episode</td><td>Provider</td><td>Maternity, ortho, cardiac</td></tr>
            <tr><td>Capitation</td><td>Per member per month</td><td>Provider</td><td>Primary care, MA, Medicaid</td></tr>
            <tr><td>Bundled payment</td><td>Per episode (multi-provider)</td><td>Convener / participants</td><td>Surgical episodes, post-acute</td></tr>
          </tbody>
        </table>

        <div class="key-takeaway">
          <div class="key-takeaway-title">Key takeaway</div>
          Different methods put risk in different places. Fee schedule and % of charges put it
          on the payer; DRG, APC, case rate, capitation, and bundles push it toward the
          provider. Real contracts mix these — fee schedule for some services, DRG for inpatient,
          per diem for behavioral, percent of charges for stop-loss and miscellany.
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this chapter</div>
          <div class="glossary-strip-terms">
            ${term("per-diem")} ${term("percent-of-charges")} ${term("case-rate")}
            ${term("capitation")} ${term("pmpm")} ${term("bundled-payment")}
            ${term("carve-out")} ${term("stop-loss")} ${term("ma-plan")}
          </div>
        </div>
      </article>`;
  },
};
