import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "risk",
  title: "Risk Arrangements",
  subtitle: "Capitation, shared savings, ACOs — when providers take on insurance risk.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Chapter 8 · Contracts</span>
        <h1>Risk Arrangements</h1>
        <p class="chapter-subtitle">Capitation, shared savings, ACOs — when providers take on insurance risk.</p>

        <p>
          Fee-for-service rewards volume. Risk arrangements try to flip the incentive: pay the
          provider a fixed budget and let them keep what's left over after caring for an
          attributed population. The risk shifts to the provider — and so does the upside.
        </p>

        <h2>The risk spectrum</h2>
        <table>
          <thead><tr><th>Arrangement</th><th>How it works</th><th>Risk on provider</th></tr></thead>
          <tbody>
            <tr><td>Pure FFS</td><td>Pay per service per fee schedule.</td><td>None.</td></tr>
            <tr><td>FFS + P4P bonus</td><td>FFS rates + a bonus for hitting quality metrics.</td><td>Almost none.</td></tr>
            <tr><td>FFS + shared savings (upside-only)</td><td>FFS rates; year-end savings vs. benchmark shared with provider.</td><td>Light. No downside.</td></tr>
            <tr><td>Two-sided shared savings</td><td>FFS + share savings AND share losses.</td><td>Real. Capped corridors common.</td></tr>
            <tr><td>${term("bundled-payment", "Bundled payment")}</td><td>Single payment for an episode; provider keeps savings vs. spend.</td><td>Episode-level risk.</td></tr>
            <tr><td>Partial ${term("capitation")}</td><td>${term("pmpm")} for a defined service set (e.g., primary care).</td><td>Utilization risk for that scope.</td></tr>
            <tr><td>Full / global capitation</td><td>PMPM covering essentially all services.</td><td>Full insurance risk.</td></tr>
          </tbody>
        </table>

        <h2>How attribution works</h2>
        <p>
          Risk arrangements need to define which members are "yours" — the attribution. Common
          methods:
        </p>
        <ul>
          <li><strong>Member-selected PCP</strong> — member explicitly picks a PCP; that PCP's group is responsible.</li>
          <li><strong>Plurality of services</strong> — the provider who delivered the most primary care visits in a defined window gets attribution.</li>
          <li><strong>Most recent service</strong> — last-attended visit determines attribution.</li>
          <li><strong>Voluntary alignment</strong> (Medicare ACOs) — members can affirmatively align with a provider.</li>
        </ul>
        <p>
          Attribution drives both the PMPM payment (more attributed lives = more revenue) and
          the responsibility (more lives = more spend exposure).
        </p>

        <h2>Risk adjustment</h2>
        <p>
          Sicker populations cost more. To make capitation fair, payments are risk-adjusted:
          a panel of healthy 40-year-olds gets a lower PMPM than a panel of 70-year-olds with
          multiple chronic conditions.
        </p>
        <p>
          The dominant model is CMS's <strong>HCC</strong> (Hierarchical Condition Categories).
          Each member gets a risk score based on demographics + diagnoses captured during the year.
          The PMPM is multiplied by the risk score. Documentation drives revenue: a member
          coded with diabetes-with-complications scores higher than one coded with uncomplicated
          diabetes, even if they're the same person and the same care was rendered.
        </p>
        <p>
          This dynamic created an entire industry of "risk adjustment" services and is a
          consistent source of OIG audit attention in Medicare Advantage.
        </p>

        <h2>Reconciliation</h2>
        <p>
          Most risk arrangements are reconciled at year end:
        </p>
        <ol>
          <li>Compute the attributed members' total medical spend across all providers.</li>
          <li>Compare against the benchmark (a target dollar amount, often based on prior years' spend trended forward).</li>
          <li>Calculate savings (benchmark − actual).</li>
          <li>Apply the contract's sharing percentage (e.g., 50% of savings to provider, 50% to payer).</li>
          <li>Apply quality gates — savings might be partially or fully forfeited if quality metrics aren't met.</li>
          <li>Apply caps and floors — risk corridors limit upside and downside.</li>
        </ol>

        <h2>ACOs — the most common risk vehicle</h2>
        <p>
          An <strong>Accountable Care Organization</strong> is a group of providers (typically a
          health system or large physician group) that takes responsibility for a defined
          population. Variants:
        </p>
        <ul>
          <li><strong>MSSP (Medicare Shared Savings Program)</strong> — multiple tracks with different risk levels. Track 1 is upside-only; later tracks add downside.</li>
          <li><strong>ACO REACH</strong> — newer Medicare model with full capitation.</li>
          <li><strong>Commercial ACOs</strong> — payer-specific arrangements with similar structure.</li>
          <li><strong>Medicaid ACOs</strong> — state-by-state programs with various risk levels.</li>
        </ul>

        <h2>${term("ma-plan", "Medicare Advantage")} contracting</h2>
        <p>
          MA plans receive capitated risk-adjusted PMPMs from CMS, then turn around and contract
          with provider groups, often passing through some of that risk:
        </p>
        <ul>
          <li><strong>FFS only</strong>: provider paid per fee schedule; MA plan keeps the cap.</li>
          <li><strong>Shared savings</strong>: provider participates in upside.</li>
          <li><strong>Sub-capitation</strong>: provider receives a PMPM and manages a defined scope.</li>
          <li><strong>Global capitation</strong>: provider takes essentially full risk for the attributed population — common in California and emerging in other markets.</li>
        </ul>

        <h2>${term("mlr", "MLR")} regulation</h2>
        <p>
          The ACA requires payers to spend at least 80% (individual/small group) or 85%
          (large group) of premium on claims and quality improvement, or rebate the difference
          to members. This pushes payers to:
        </p>
        <ul>
          <li>Pay providers <em>more</em> sometimes (claims expenses count toward the floor).</li>
          <li>Cap administrative spend.</li>
          <li>Use risk arrangements that count as "claims" rather than "admin" under MLR rules.</li>
        </ul>

        <h2>Risk corridors and stop-loss reinsurance</h2>
        <p>
          Risk arrangements typically include protections against catastrophic outcomes:
        </p>
        <ul>
          <li><strong>Risk corridors</strong>: cap savings/losses (e.g., savings above 15% revert to the payer; losses above 10% are absorbed by the payer).</li>
          <li><strong>Stop-loss reinsurance</strong>: the provider buys insurance against extreme individual cases (e.g., transplant patients, NICU babies). Premium comes out of the capitation revenue.</li>
          <li><strong>Catastrophic case exclusions</strong>: certain extreme cases excluded from the provider's spend calculation.</li>
        </ul>

        <h2>Why risk arrangements are hard</h2>
        <ol>
          <li><strong>Data lag</strong>. Provider doesn't see total spend until claims complete; reconciliation can lag 18+ months.</li>
          <li><strong>Adverse selection</strong>. If sicker members get attributed, the PMPM may not cover them — risk adjustment must really work.</li>
          <li><strong>Out-of-network leakage</strong>. Members getting care outside the network add cost the provider can't control.</li>
          <li><strong>Documentation pressure</strong>. To get risk-adjusted payment right, providers must document diagnoses thoroughly, which can slip into upcoding.</li>
          <li><strong>Quality gating</strong>. Hitting HEDIS / Star measures takes population health work that doesn't generate immediate revenue.</li>
        </ol>

        <div class="callout">
          <div class="callout-title">The simple form</div>
          Risk = "we're going to pay you in advance, you take care of the population, and at the
          end we'll see whose forecast was right." When forecasts are good and the provider
          delivers efficient care, risk works. When either of those breaks, it's painful.
        </div>

        <div class="key-takeaway">
          <div class="key-takeaway-title">Key takeaway</div>
          Risk arrangements range from light P4P bonuses to full capitation. They flip the
          incentive from volume to value. Successful execution requires good attribution,
          working risk adjustment, sufficient data, and thoughtful corridors. Failure modes
          are common; the form is right but the operations are hard.
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this chapter</div>
          <div class="glossary-strip-terms">
            ${term("capitation")} ${term("pmpm")} ${term("bundled-payment")} ${term("ma-plan")} ${term("mlr")}
          </div>
        </div>
      </article>`;
  },
};
