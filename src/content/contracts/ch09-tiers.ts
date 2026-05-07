import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "tiers",
  title: "Network Tiers & Steerage",
  subtitle: "How payers (and increasingly employers) push members toward specific providers.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Chapter 9 · Contracts</span>
        <h1>Network Tiers &amp; Steerage</h1>
        <p class="chapter-subtitle">How payers (and increasingly employers) push members toward specific providers.</p>

        <p>
          A flat in-network network treats every contracted provider equally. Real plans
          increasingly differentiate. Tiered networks, narrow networks, centers of excellence,
          and reference-based pricing all share a goal: route members to providers the payer
          considers higher-value (lower cost, sometimes higher quality).
        </p>

        <h2>Narrow networks</h2>
        <p>
          A narrow network deliberately excludes some otherwise-qualified providers in exchange
          for steeper discounts from the included ones. The provider trades exclusivity for
          volume.
        </p>
        <ul>
          <li>Common in ACA exchange products and some MA plans.</li>
          <li>State network adequacy rules cap how narrow it can be.</li>
          <li>Members get lower premiums but fewer choices.</li>
        </ul>

        <h2>Tiered networks</h2>
        <p>
          The plan keeps a broader network but groups providers into tiers, each with different
          member cost-sharing:
        </p>
        <table>
          <thead><tr><th>Tier</th><th>Provider examples</th><th>Member cost share</th></tr></thead>
          <tbody>
            <tr><td>Tier 1 (preferred)</td><td>Lower-cost / higher-value providers</td><td>$20 PCP, 10% coinsurance</td></tr>
            <tr><td>Tier 2 (standard)</td><td>Standard in-network</td><td>$40 PCP, 20% coinsurance</td></tr>
            <tr><td>Out-of-network</td><td>Non-par</td><td>50% coinsurance, no OOP cap counts</td></tr>
          </tbody>
        </table>
        <p>
          The provider's contract terms don't necessarily change between tiers — the plan just
          changes the member cost-sharing to nudge utilization. From the contract perspective,
          a single fee schedule may apply across tiers; from the member perspective, the cost
          difference is meaningful.
        </p>

        <h2>Centers of Excellence (COEs)</h2>
        <p>
          For specific high-cost, complex services — transplants, bariatric surgery, cardiac
          surgery, oncology, complex spine — payers designate a small set of providers as COEs
          and route applicable cases there.
        </p>
        <ul>
          <li><strong>Travel benefit</strong>: plan often pays for member travel and lodging.</li>
          <li><strong>Bundled payment</strong>: COE typically agrees to a single all-inclusive case rate.</li>
          <li><strong>Quality requirements</strong>: outcomes data, volumes, accreditation often required.</li>
          <li><strong>Steerage</strong>: members may have lower OOP at COE, or member is required to use COE for any plan coverage of the service.</li>
        </ul>

        <h2>${term("reference-based-pricing")}</h2>
        <p>
          A payer (often a self-insured employer plan administered by a TPA) sets allowed
          amounts at a defined multiple of Medicare — say, 140% of Medicare — instead of
          negotiating individual contracts.
        </p>
        <ul>
          <li><strong>Pros</strong>: low admin overhead; transparent pricing; consistent across providers.</li>
          <li><strong>Cons</strong>: providers haven't agreed; balance billing risk for members; abrasive provider relations.</li>
          <li><strong>Variants</strong>: pure RBP (no network at all), or hybrid networks where RBP applies only out-of-network or only to specific services.</li>
          <li><strong>NSA implications</strong>: reduces some balance-billing exposure for emergency / ancillary services post-2022.</li>
        </ul>
        <p>
          RBP is increasingly popular among self-insured employers as a cost-control lever,
          but it's controversial. Members must be educated. Member advocacy services often
          come bundled to help when balance bills land.
        </p>

        <h2>Direct contracting</h2>
        <p>
          Self-insured employers sometimes contract directly with providers, bypassing the
          payer's network entirely. Common models:
        </p>
        <ul>
          <li><strong>On-site / near-site clinics</strong> — employer hires a primary care vendor (Marathon Health, One Medical, Vera Whole Health) for employees.</li>
          <li><strong>Walmart-style direct contracts</strong> — employer flies employees to specific COEs (Cleveland Clinic, Mayo) for major procedures with bundled rates.</li>
          <li><strong>Direct primary care (DPC)</strong> — flat monthly fee per employee for primary care, no FFS billing.</li>
        </ul>

        <h2>Steerage tools</h2>
        <ul>
          <li><strong>Cost-share differentials</strong> — different copay/coinsurance by tier or COE.</li>
          <li><strong>Provider directories</strong> — promote tier 1 providers in search.</li>
          <li><strong>Cost transparency tools</strong> — show price comparisons to members.</li>
          <li><strong>Concierge services</strong> — care coordinators steer to recommended providers.</li>
          <li><strong>Bonuses for using COE</strong> — some plans waive deductible if COE used.</li>
        </ul>

        <h2>How tiering affects contracts</h2>
        <p>
          Most tiered networks keep the underlying contract intact and only vary member
          cost-sharing. But some sophisticated arrangements:
        </p>
        <ul>
          <li>Different reimbursement rates by tier (provider gets paid more in tier 1).</li>
          <li>Quality-based tier movement (provider can be promoted/demoted based on metrics).</li>
          <li>Shared upside if a provider successfully attracts members to their tier.</li>
        </ul>

        <h2>Network adequacy regulation</h2>
        <p>
          Federal and state rules require minimum provider availability per geography and
          specialty. Standards include:
        </p>
        <ul>
          <li>Distance / time standards (members must be within X miles or Y minutes of a PCP).</li>
          <li>Specialty count requirements (at least N cardiologists per market).</li>
          <li>Appointment wait times (urgent care within 24h, non-urgent within X days).</li>
          <li>Telehealth supplementation (does it count toward network adequacy?).</li>
        </ul>
        <p>
          MA plans submit Health Service Delivery (HSD) tables to CMS annually. Exchange plans
          go through state insurance departments. Failures lead to corrective action plans or
          enforcement.
        </p>

        <div class="callout callout-good">
          <div class="callout-title">The economic logic</div>
          Steerage works when the gap between high-value and low-value providers is large
          enough to justify the operational complexity of tiered networks and COEs. When
          everything in a market is similarly priced, tiering is mostly cosmetic.
        </div>

        <div class="key-takeaway">
          <div class="key-takeaway-title">Key takeaway</div>
          Network design is a separate dimension from contract pricing. Same fee schedule, two
          tiers — different member experience. Reference-based pricing replaces contracts with
          a benchmark. Centers of excellence carve out high-cost services. All of these are
          payer steerage tools layered on top of, or instead of, traditional contracting.
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this chapter</div>
          <div class="glossary-strip-terms">
            ${term("reference-based-pricing")} ${term("par-provider")} ${term("nsa")}
          </div>
        </div>
      </article>`;
  },
};
