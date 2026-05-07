import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "cob",
  title: "Coordination of Benefits & Edge Cases",
  subtitle: "When more than one party should be paying.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Chapter 10 · Pricing Claims</span>
        <h1>Coordination of Benefits &amp; Edge Cases</h1>
        <p class="chapter-subtitle">When more than one party should be paying.</p>

        <p>
          ${term("cob")} is the set of rules that determines which insurer pays first when a
          member has more than one coverage, and how the second insurer fills in. These rules
          are surprisingly intricate; an honest CO B engine has to handle dozens of combinations.
        </p>

        <h2>Why members have two coverages</h2>
        <ul>
          <li>Both spouses have employer coverage and cover each other's family</li>
          <li>Adult child under 26 covered by parent's plan and own employer's plan</li>
          <li>Active employee with both Medicare and employer coverage (over 65, still working)</li>
          <li>Active duty / TRICARE plus civilian coverage</li>
          <li>Workers' comp claim plus health insurance</li>
          <li>Auto insurance medical payments / no-fault plus health insurance</li>
        </ul>

        <h2>Determining primary vs. secondary</h2>
        <p>The hierarchy, in rough order:</p>
        <ol>
          <li><strong>Workers' comp / TRICARE / Medicare-as-secondary statutes</strong> — federal/state law dictates the order in specific scenarios.</li>
          <li><strong>Employee vs. dependent</strong> — your own employer's plan is primary for you; your spouse's plan is secondary for you.</li>
          <li><strong>Birthday rule (for dependent kids)</strong> — the parent whose birthday falls earlier in the year has the primary coverage. Year of birth is irrelevant.</li>
          <li><strong>Custody rule (divorced parents)</strong> — court decree first; otherwise the custodial parent's plan is primary.</li>
          <li><strong>Length of coverage</strong> — when none of the above apply, the plan that's been in effect longer is primary.</li>
        </ol>

        <h2>How secondary pays</h2>
        <p>Two patterns dominate:</p>
        <ul>
          <li><strong>Standard COB</strong>: secondary pays the lesser of (a) what it would have paid if primary, or (b) the remaining member responsibility after primary. Member ends up owing $0 in the best case.</li>
          <li><strong>Non-duplication COB</strong>: secondary pays only the difference between what <em>it</em> would have paid as primary and what primary actually paid. If secondary's allowed is lower than primary's payment, secondary owes nothing.</li>
        </ul>

        <h2>Medicare as Secondary Payer (MSP)</h2>
        <p>
          When a person eligible for Medicare also has employer coverage (typically because they
          or their spouse is still working at a company with 20+ employees), Medicare is
          <em>secondary</em>. The employer plan pays first; Medicare fills in.
        </p>
        <p>
          When the employer is small (under 20), Medicare is primary. Same logic for ESRD
          (first 30 months: employer primary), liability/auto/workers' comp situations, and
          Veterans Affairs scenarios. MSP is one of the most error-prone areas in claims
          processing — getting it wrong creates years-old "demand letters" from CMS.
        </p>

        <h2>${term("subrogation")} and third-party liability</h2>
        <p>
          When a member's injury was caused by a third party (auto accident, slip-and-fall),
          the at-fault party's liability insurer is theoretically responsible. But that takes
          time to litigate and members need treatment now. The health plan typically pays
          first, then <em>subrogates</em>: pursues recovery from the at-fault party's insurer
          (or settlement) to recoup what it paid.
        </p>
        <p>
          Health plans often have lien rights against settlements. ERISA plans have especially
          strong subrogation protections (limited by the "make-whole" doctrine in some
          jurisdictions). Vendors specialize in this work.
        </p>

        <h2>${term("nsa", "No Surprises Act")}</h2>
        <p>
          Effective January 1, 2022. The federal No Surprises Act prohibits balance billing in
          three main scenarios:
        </p>
        <ul>
          <li><strong>Emergency services</strong> at any facility — in or out of network.</li>
          <li><strong>Air ambulance</strong> services.</li>
          <li><strong>Out-of-network ancillary services at in-network facilities</strong> — anesthesia, pathology, radiology, hospitalist, etc., where the patient didn't choose the provider.</li>
        </ul>
        <p>
          For these services, member cost-sharing is calculated as if the provider were
          in-network, using the <strong>Qualifying Payment Amount (QPA)</strong> — the median
          contracted rate for the service in that geographic area. Disputes between payer and
          provider over the right rate go through a federal Independent Dispute Resolution (IDR)
          process. The member is held harmless throughout.
        </p>

        <h2>Other edge cases worth recognizing</h2>
        <ul>
          <li><strong>Foreign claims</strong> — usually adjudicated as out-of-network, may require currency conversion.</li>
          <li><strong>Workers' compensation</strong> — separate fee schedules (state-specific), separate adjudication, often a bill review vendor.</li>
          <li><strong>Auto / no-fault</strong> — Personal Injury Protection (PIP) is often primary in no-fault states.</li>
          <li><strong>Medicaid</strong> — always payer of last resort; adjudication should pursue any other coverage first.</li>
          <li><strong>Indian Health Service</strong> — IHS is payer of last resort by statute.</li>
          <li><strong>Pharmacy benefits</strong> — adjudicated through PBMs in real-time at point of sale; different rails entirely.</li>
        </ul>

        <div class="callout">
          <div class="callout-title">Why COB is hard in practice</div>
          The plan often doesn't know the member has other coverage until after a claim
          processes. COB questionnaires, periodic reverification, and inter-payer COB
          databases (e.g., COBA at CMS) try to keep this current. Fixing it after the fact
          generates retro adjustments — claims get "corrected" months later when other
          coverage is discovered.
        </div>

        <div class="key-takeaway">
          <div class="key-takeaway-title">Key takeaway</div>
          COB is about identifying the right primary payer and computing how secondary fills
          the gap. Medicare-as-secondary, subrogation, and the NSA all introduce variations.
          Most pricing-engine bugs in this area come from missing or stale "other coverage"
          information.
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this chapter</div>
          <div class="glossary-strip-terms">
            ${term("cob")} ${term("subrogation")} ${term("nsa")} ${term("balance-billing")}
          </div>
        </div>
      </article>`;
  },
};
