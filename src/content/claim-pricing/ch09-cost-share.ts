import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "cost-share",
  title: "Member Cost Sharing",
  subtitle: "Deductible, copay, coinsurance, OOP max — and how they stack.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Chapter 9 · Pricing Claims</span>
        <h1>Member Cost Sharing</h1>
        <p class="chapter-subtitle">Deductible, copay, coinsurance, OOP max — and how they stack.</p>

        <p>
          The contract gives you the allowed amount. The benefit design splits it between plan
          and member. Get the order of operations right and the math is straightforward; get it
          wrong and you're explaining angry phone calls about EOBs all day.
        </p>

        <h2>The four levers</h2>
        <table>
          <thead><tr><th>Lever</th><th>What it does</th><th>Typical values</th></tr></thead>
          <tbody>
            <tr><td>${term("deductible")}</td><td>Member pays 100% of allowed until this annual amount is met.</td><td>$0–$7,500 individual; HDHP min $1,650 (2025).</td></tr>
            <tr><td>${term("copay")}</td><td>Flat dollar at the time of service for specific service types.</td><td>$30 PCP, $50 specialist, $250 ER.</td></tr>
            <tr><td>${term("coinsurance")}</td><td>Member's percentage of the allowed amount after deductible.</td><td>20% in-network, 40–50% OON.</td></tr>
            <tr><td>${term("oop-max", "OOP max")}</td><td>Annual cap on member cost-sharing. Once hit, plan pays 100%.</td><td>$3,000–$9,200 individual (ACA-bounded).</td></tr>
          </tbody>
        </table>

        <h2>The standard order of operations</h2>
        <ol>
          <li>Compute the <strong>allowed amount</strong> from the contract (chapters 4–8).</li>
          <li>Apply <strong>deductible</strong>: member pays the lesser of (allowed, deductible remaining). The applied amount also reduces deductible remaining and OOP max remaining.</li>
          <li>Apply <strong>copay or coinsurance</strong> on the remainder:
            <ul>
              <li>If a copay applies for this service type, member pays the flat copay (or the remainder, whichever is smaller).</li>
              <li>Otherwise, member pays the coinsurance percentage of the remainder.</li>
            </ul>
          </li>
          <li>Apply the <strong>OOP max cap</strong>: total member responsibility for the year cannot exceed OOP max. If we just blew past it, refund the excess.</li>
          <li>The <strong>plan pays</strong> the difference between allowed and member responsibility.</li>
        </ol>

        <h2>Worked example: $1,200 outpatient procedure, 80/20 plan</h2>
        <p>
          Member has $800 deductible remaining and $5,000 OOP remaining. No copay applies; coinsurance is 20%.
        </p>
        <table>
          <thead><tr><th>Step</th><th class="num">Member</th><th class="num">Plan</th></tr></thead>
          <tbody>
            <tr><td>Allowed amount: $1,200</td><td class="num"></td><td class="num"></td></tr>
            <tr><td>Apply deductible (lesser of $800 or $1,200)</td><td class="num">$800</td><td class="num">$0</td></tr>
            <tr><td>Remaining after deductible: $400</td><td class="num"></td><td class="num"></td></tr>
            <tr><td>Apply 20% coinsurance on $400</td><td class="num">$80</td><td class="num">$320</td></tr>
            <tr><td><strong>Total</strong></td><td class="num"><strong>$880</strong></td><td class="num"><strong>$320</strong></td></tr>
          </tbody>
        </table>
        <p>$880 + $320 = $1,200 ✓. Member's deductible remaining drops by $800 → $0. OOP max remaining drops by $880 → $4,120.</p>

        <div data-calc="member-cost-share"></div>

        <h2>Copay vs. coinsurance</h2>
        <p>
          Many plans use <strong>copays for predictable services</strong> (PCP visits, generic
          drugs, ER) and <strong>coinsurance for everything else</strong>. Copays often
          bypass the deductible, especially for primary care and pharmacy. The benefit summary
          spells out which is which.
        </p>
        <p>
          One adjudication subtlety: when a copay applies, it typically <em>replaces</em>
          coinsurance for that service line, even if the deductible isn't yet met. So a $30 PCP
          copay member with $500 deductible remaining still pays $30, not the full allowed
          amount. This is by plan design.
        </p>

        <h2>${term("accumulator", "Accumulators")} — how the plan tracks state</h2>
        <p>
          Each member-plan-year combination has running totals:
        </p>
        <ul>
          <li>Deductible-met (so far this year)</li>
          <li>OOP-met (so far this year)</li>
          <li>Embedded individual vs. family accumulators</li>
        </ul>
        <p>
          As claims adjudicate, the accumulators tick up. Claim ordering matters — the same
          two claims processed in different orders can leave different accumulator states (and
          rarely, different total member responsibility). Most engines lock claim order by date
          of service, then by received timestamp.
        </p>

        <h2>Embedded vs. non-embedded family deductibles</h2>
        <p>
          Family plans cover multiple individuals. Two structures:
        </p>
        <ul>
          <li><strong>${term("embedded-deductible", "Embedded")}</strong>: any single member can hit their own individual deductible without the family deductible being met. Once the individual is met, that person's services bypass the deductible.</li>
          <li><strong>Non-embedded (aggregate)</strong>: the entire family deductible must be met before any member's services bypass the deductible. More common in HDHPs.</li>
        </ul>
        <p>
          Same structure applies to OOP max. ACA caps the embedded individual OOP at the
          self-only limit, even within a family plan.
        </p>

        <h2>Tricky cases worth knowing</h2>
        <ul>
          <li><strong>Preventive services</strong> (USPSTF A/B): $0 cost share, no deductible. Mistakenly applying coinsurance triggers compliance issues.</li>
          <li><strong>${term("nsa", "No Surprises Act")} services</strong>: out-of-network providers in scope are paid as if in-network for cost-share purposes.</li>
          <li><strong>Out-of-network</strong>: deductible/OOP often track separately from in-network accumulators (so OON care doesn't help meet IN deductible).</li>
          <li><strong>Tier-2 networks</strong>: middle cost-share tier between in-network and out-of-network.</li>
          <li><strong>HRA / HSA / FSA</strong>: accounts that may pay before member's pocket. Plans coordinate via "smart card" routing or after-the-fact reimbursement.</li>
        </ul>

        <div class="key-takeaway">
          <div class="key-takeaway-title">Key takeaway</div>
          Allowed amount comes from the contract. Member responsibility comes from the benefit
          design: deductible, then copay or coinsurance, capped by OOP max. Accumulators track
          running totals across the plan year. Get this order right and benefit math is
          predictable.
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this chapter</div>
          <div class="glossary-strip-terms">
            ${term("deductible")} ${term("copay")} ${term("coinsurance")} ${term("oop-max")}
            ${term("accumulator")} ${term("embedded-deductible")} ${term("nsa")}
          </div>
        </div>
      </article>`;
  },
};
