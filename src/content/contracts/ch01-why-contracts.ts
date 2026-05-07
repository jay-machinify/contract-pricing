import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "why-contracts",
  title: "Why Contracts Exist",
  subtitle: "The economic and regulatory pressure that drives healthcare contracting.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Chapter 1 · Contracts</span>
        <h1>Why Contracts Exist</h1>
        <p class="chapter-subtitle">The economic and regulatory pressure that drives healthcare contracting.</p>

        <p>
          Without a contract, a provider sets a price and the payer either accepts it or doesn't.
          That's how essentially no other US industry works, but it's exactly how healthcare worked
          before managed care. Today, contracts solve a real coordination problem: how do you
          arrive at a fair price between two parties who can't easily walk away from each other?
        </p>

        <h2>The basic deal</h2>
        <p>
          A provider contract is a bilateral agreement between a payer and a provider in which:
        </p>
        <ul>
          <li>The provider agrees to accept the contract's allowed amounts as <em>payment in full</em> for covered services.</li>
          <li>The payer agrees to direct members to the provider (network steerage), pay clean claims within a defined window, and follow the rules the contract spells out.</li>
          <li>The provider agrees not to ${term("balance-billing", "balance-bill")} members for the difference between billed charges and allowed amounts.</li>
          <li>Both agree on a methodology for setting allowed amounts (fee schedule, DRG, per diem, etc.) and on dispute-resolution and termination procedures.</li>
        </ul>

        <h2>In-network vs. out-of-network</h2>
        <p>
          A "${term("par-provider", "par provider")}" — short for participating — has a contract.
          When a member sees a par provider, the contract governs allowed amounts and the
          member can't be balance-billed. When a member sees a non-par provider, there's no
          contract, no agreed allowed amount, and historically the member could be on the hook
          for whatever the provider billed.
        </p>

        <h2>Why providers sign contracts</h2>
        <ul>
          <li><strong>Volume</strong> — being in-network drives patient flow.</li>
          <li><strong>Predictable receivables</strong> — clean claims pay quickly, and there's a defined dispute path.</li>
          <li><strong>Lower bad debt</strong> — agreeing on the price up front reduces collections work and write-offs from members refusing to pay surprise bills.</li>
          <li><strong>Marketing</strong> — health plan directories steer members to in-network providers.</li>
        </ul>

        <h2>Why payers sign contracts</h2>
        <ul>
          <li><strong>Cost predictability</strong> — known allowed amounts let actuaries set premiums.</li>
          <li><strong>Member protection</strong> — no surprise balance bills means happier members and lower regulatory risk.</li>
          <li><strong>Network adequacy</strong> — state and federal rules require enough providers per geography/specialty for the plan to be sold.</li>
          <li><strong>Steerage</strong> — well-designed networks can route members to lower-cost or higher-quality providers.</li>
        </ul>

        <h2>The leverage equation</h2>
        <p>
          Contracts are negotiated, and leverage drives outcomes. A few patterns:
        </p>
        <ul>
          <li><strong>Big provider system in a market where the payer needs them</strong> — provider has leverage, gets higher rates. Sole community hospitals can demand 200%+ of Medicare.</li>
          <li><strong>Big payer in a market with many fungible providers</strong> — payer has leverage, gets lower rates closer to Medicare.</li>
          <li><strong>Specialty without alternatives</strong> — air ambulance, anesthesia, ER staffing — historically extracted high rates because patients didn't choose them. The ${term("nsa", "No Surprises Act")} addresses this for specific scenarios.</li>
          <li><strong>Government plans</strong> — Medicare and Medicaid set rates by regulation; providers can decline to participate but the volume is too valuable to give up.</li>
        </ul>

        <h2>The regulatory layer</h2>
        <ul>
          <li><strong>State insurance departments</strong> regulate fully insured plans (network adequacy, prompt pay laws, claim disputes).</li>
          <li><strong>ERISA</strong> governs self-insured employer plans federally and preempts most state regulation.</li>
          <li><strong>The ACA</strong> imposed essential health benefits, OOP max caps, MLR floors, no preexisting-condition exclusions.</li>
          <li><strong>The ${term("nsa", "No Surprises Act")}</strong> (2022) created federal protection from balance billing in specific scenarios and an Independent Dispute Resolution path for rate disputes.</li>
          <li><strong>Hospital price transparency rules</strong> (2021+) require hospitals to publish negotiated rates by plan and by service.</li>
          <li><strong>Anti-kickback / Stark</strong> regulations restrict what payers and providers can offer each other in negotiation.</li>
        </ul>

        <h2>What's in a contract: the four essential parts</h2>
        <ol>
          <li><strong>The reimbursement methodology</strong> (chapters 4–6) — how the allowed amount is computed.</li>
          <li><strong>The covered services and codes</strong> — what's in scope and what isn't.</li>
          <li><strong>Operational terms</strong> (chapter 11) — claim submission, timely filing, dispute resolution, audits.</li>
          <li><strong>Term, termination, and amendments</strong> — how long the contract runs, how it ends, how it changes.</li>
        </ol>

        <div class="callout">
          <div class="callout-title">A non-obvious truth</div>
          Most "rate increases" in healthcare are not list-price changes — they're contract
          re-negotiations. When a hospital system says it's "negotiating with Anthem" and
          might "leave the network," what's actually being argued over is the multiplier
          on the contract's fee schedule and DRG base rate.
        </div>

        <div class="key-takeaway">
          <div class="key-takeaway-title">Key takeaway</div>
          Contracts solve a coordination problem: they let payers and providers agree on price
          in advance so claims can be processed automatically. The shape of the contract — what
          methodology, what codes, what carve-outs — determines everything that happens
          downstream in adjudication.
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this chapter</div>
          <div class="glossary-strip-terms">
            ${term("par-provider")} ${term("payer")} ${term("balance-billing")} ${term("nsa")}
          </div>
        </div>
      </article>`;
  },
};
