import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "building-blocks",
  title: "Pricing Building Blocks",
  subtitle: "Billed, allowed, plan-paid, member responsibility, write-off — and how they fit together.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Chapter 3 · Pricing Claims</span>
        <h1>Pricing Building Blocks</h1>
        <p class="chapter-subtitle">Billed, allowed, plan-paid, member responsibility, write-off — and how they fit together.</p>

        <p>
          Five dollar amounts show up on virtually every claim. Confuse them and you'll
          misread every EOB you see. Get them straight and you can hold a conversation with
          a claims engine.
        </p>

        <h2>The five amounts</h2>
        <table>
          <thead><tr><th>Amount</th><th>What it is</th><th>Set by</th></tr></thead>
          <tbody>
            <tr><td>${term("billed-charge")}</td><td>Provider's gross list price.</td><td>Provider's ${term("charge-master")}.</td></tr>
            <tr><td>${term("allowed-amount")}</td><td>What the payer recognizes as the "real" price for the service.</td><td>Contract (the topic of walkthrough 2).</td></tr>
            <tr><td>Plan-paid</td><td>Payer's portion of the allowed amount.</td><td>Member's benefit design.</td></tr>
            <tr><td>Member responsibility</td><td>Member's portion of the allowed amount.</td><td>Member's benefit design.</td></tr>
            <tr><td>${term("write-off")}</td><td>The gap: billed minus allowed.</td><td>Provider absorbs (in-network).</td></tr>
          </tbody>
        </table>

        <h2>The fundamental identity</h2>
        <div class="formula">Billed = Allowed + Write-off</div>
        <div class="formula">Allowed = Plan-paid + Member responsibility</div>
        <p>
          Combine: <strong>Billed = Plan-paid + Member responsibility + Write-off</strong>.
          Every dollar billed has to land in one of those three buckets. That's the
          accounting identity that makes claims math reconcile.
        </p>

        <h2>A worked example</h2>
        <p>
          A patient sees an in-network primary care doc for a level-4 established visit (CPT 99214).
        </p>
        <table>
          <thead><tr><th>Item</th><th class="num">Amount</th></tr></thead>
          <tbody>
            <tr><td>Provider billed (charge-master rate)</td><td class="num">$245.00</td></tr>
            <tr><td>Contracted allowed amount</td><td class="num">$132.00</td></tr>
            <tr><td>Member already met deductible. Coinsurance 20%.</td><td class="num"></td></tr>
            <tr><td>Member responsibility (20% × $132)</td><td class="num">$26.40</td></tr>
            <tr><td>Plan paid (80% × $132)</td><td class="num">$105.60</td></tr>
            <tr><td>Provider write-off ($245 − $132)</td><td class="num">$113.00</td></tr>
            <tr><td><strong>Total accounted for</strong></td><td class="num"><strong>$245.00</strong></td></tr>
          </tbody>
        </table>

        <h2>Why is billed so much higher than allowed?</h2>
        <p>
          Three reasons. First, ${term("charge-master")} prices were set decades ago and inflate
          every year — they exist mostly for fallback methodologies like
          ${term("percent-of-charges")} where the contract pays a fraction of charges. Second,
          providers have an incentive to set charges high so the fraction translates to enough
          revenue. Third, uninsured self-pay patients still get billed at charge-master rates by
          default (though most hospitals discount heavily on request).
        </p>

        <p>
          For commercial in-network claims, billed charges are <em>essentially decorative</em> —
          the contract overrides them. The exception: when a contract uses
          ${term("lesser-of")} logic, the billed charge becomes a ceiling.
        </p>

        <div class="callout callout-good">
          <div class="callout-title">Lesser-of in plain English</div>
          A near-universal contract clause: allowed = min(billed, contracted rate). Prevents the
          provider from collecting more than they billed even when the contract rate is higher.
          Important when small charges happen to be below contract rates.
        </div>

        <h2>Out of network: the dynamics shift</h2>
        <p>
          Without a contract, there's no agreed allowed amount. Payers fall back to ${term("ucr", "Usual & Customary")} or
          ${term("reference-based-pricing")} (e.g., 140% of Medicare). The provider hasn't
          agreed to anything, so historically they could ${term("balance-billing", "balance bill")} the member for the gap. The
          ${term("nsa", "No Surprises Act")} closed many of those scenarios in 2022 — see chapter 10.
        </p>

        <h2>Where this gets confusing</h2>
        <ul>
          <li><strong>Hospitals</strong> often show billed charges that are 4–10× allowed amounts. That's normal.</li>
          <li><strong>Member EOBs</strong> usually show all five amounts but use slightly different vocabulary ("contractual adjustment" = write-off; "what you saved" = write-off + plan-paid).</li>
          <li><strong>Drug claims</strong> can blow up the model: insulin's billed charge might be $100 but allowed is $400 because the contracted rate is the cost of the drug + a dispensing fee, regardless of what the pharmacy "billed."</li>
        </ul>

        <div class="key-takeaway">
          <div class="key-takeaway-title">Key takeaway</div>
          Allowed is the number that matters. Plan-paid + member responsibility = allowed.
          Billed minus allowed = write-off. Internalize the identity and the rest of pricing
          becomes about how to compute "allowed."
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this chapter</div>
          <div class="glossary-strip-terms">
            ${term("billed-charge")} ${term("allowed-amount")} ${term("write-off")}
            ${term("charge-master")} ${term("lesser-of")} ${term("percent-of-charges")}
            ${term("ucr")} ${term("reference-based-pricing")} ${term("balance-billing")} ${term("nsa")}
          </div>
        </div>
      </article>`;
  },
};
