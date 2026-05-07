import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "eob",
  title: "Reading an EOB / 835 ERA",
  subtitle: "Decoding the artifacts that come out the other end.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Chapter 12 · Pricing Claims</span>
        <h1>Reading an EOB / 835 ERA</h1>
        <p class="chapter-subtitle">Decoding the artifacts that come out the other end.</p>

        <p>
          Every adjudication produces two documents: an ${term("eob")} for the member and an
          ${term("era", "835 ERA")} for the provider. They contain the same information in
          different formats. Reading them fluently is a foundational skill — it's how you
          verify pricing actually worked the way you think it did.
        </p>

        <h2>The member-facing EOB</h2>
        <p>A typical EOB shows, per service line:</p>
        <table>
          <thead><tr><th>Column</th><th>Meaning</th></tr></thead>
          <tbody>
            <tr><td>Date of service</td><td>When the service occurred.</td></tr>
            <tr><td>Service description</td><td>Plain English (often abbreviated CPT).</td></tr>
            <tr><td>Amount billed</td><td>Provider's gross charge.</td></tr>
            <tr><td>Allowed amount / "Health plan discount"</td><td>What the contract recognized; the discount is billed minus allowed.</td></tr>
            <tr><td>Amount plan paid</td><td>Plan's portion of allowed.</td></tr>
            <tr><td>What you owe</td><td>Member's portion: deductible + copay + coinsurance, capped by OOP max.</td></tr>
          </tbody>
        </table>
        <p>
          And usually a summary line: deductible-met-to-date, OOP-met-to-date, lifetime maximum
          (rare post-ACA), and a "this is not a bill" disclaimer.
        </p>

        <h2>The provider-facing 835 ERA</h2>
        <p>
          Same data, much more structured. The 835 follows the ANSI X12 standard. Key segments:
        </p>
        <ul>
          <li><code>BPR</code> — total payment, payment method (ACH/check), trace number.</li>
          <li><code>TRN</code> — payer's trace number (matches to ACH).</li>
          <li><code>CLP</code> — claim-level summary: total billed, total paid, status.</li>
          <li><code>SVC</code> — service-line detail: HCPCS, billed, paid, allowed.</li>
          <li><code>CAS</code> — adjustments (CARCs and dollar amounts) per line and per claim.</li>
          <li><code>LQ</code> — RARCs (remark codes), additional explanation.</li>
        </ul>

        <h2>${term("carc", "CARCs")} and ${term("rarc", "RARCs")}</h2>
        <p>
          The two-letter CARC <em>group code</em> tells you who absorbs the adjustment:
        </p>
        <ul>
          <li><code>CO</code> — Contractual Obligation (provider absorbs; in-network write-off).</li>
          <li><code>PR</code> — Patient Responsibility (member owes).</li>
          <li><code>OA</code> — Other Adjustment (e.g., COB amount applied).</li>
          <li><code>PI</code> — Payer Initiated (rare; payer-side reductions outside contract).</li>
        </ul>

        <p>Common CARC codes:</p>
        <table>
          <thead><tr><th>Code</th><th>Meaning</th></tr></thead>
          <tbody>
            <tr><td>CO-45</td><td>Charge exceeds fee schedule (the write-off).</td></tr>
            <tr><td>CO-97</td><td>Service is bundled into another procedure.</td></tr>
            <tr><td>CO-237</td><td>Legislated/regulatory penalty (e.g., late submission).</td></tr>
            <tr><td>PR-1</td><td>Deductible amount.</td></tr>
            <tr><td>PR-2</td><td>Coinsurance amount.</td></tr>
            <tr><td>PR-3</td><td>Copay amount.</td></tr>
            <tr><td>PR-119</td><td>Benefit maximum reached (rare post-ACA for EHB).</td></tr>
            <tr><td>OA-23</td><td>Impact of prior payer adjudication (COB).</td></tr>
            <tr><td>CO-50</td><td>Non-covered: medical necessity not established.</td></tr>
            <tr><td>CO-197</td><td>Authorization absent.</td></tr>
          </tbody>
        </table>

        <p>
          RARCs (alphanumeric, like <code>M127</code> "Missing patient medical record") add
          color to a CARC. They're not financial — they're explanatory.
        </p>

        <h2>Worked example: reading an 835 line</h2>
        <p>For a 99213 office visit billed at $245:</p>
        <table>
          <thead><tr><th>Field</th><th>Value</th><th>Interpretation</th></tr></thead>
          <tbody>
            <tr><td>SVC HCPCS</td><td>99213</td><td>Office visit, established, level 3.</td></tr>
            <tr><td>SVC billed</td><td>$245.00</td><td>Charge-master rate.</td></tr>
            <tr><td>SVC paid</td><td>$105.60</td><td>Plan-paid portion.</td></tr>
            <tr><td>CAS CO-45</td><td>$113.00</td><td>Write-off (provider absorbs).</td></tr>
            <tr><td>CAS PR-2</td><td>$26.40</td><td>Member coinsurance.</td></tr>
          </tbody>
        </table>
        <p>
          $245 = $105.60 (paid) + $113 (CO write-off) + $26.40 (PR member). Reconciles.
          The provider posts $105.60 as a payment, $113 as a contractual adjustment, and bills
          the patient for $26.40.
        </p>

        <h2>The reverse-engineering exercise</h2>
        <p>
          When something looks wrong on an EOB, work backwards:
        </p>
        <ol>
          <li>Does billed = allowed + write-off? If not, contract pricing is suspect.</li>
          <li>Does allowed = plan-paid + member responsibility? If not, benefit math is wrong.</li>
          <li>Does the member responsibility match the plan's deductible / copay / coinsurance for that service type given the accumulator state? If not, accumulators or service classification are off.</li>
          <li>Are the CARC/RARC codes consistent with what happened? If not, the engine and the EOB narrative don't agree.</li>
        </ol>

        <h2>Pharmacy is different</h2>
        <p>
          Pharmacy claims don't run through 837/835 rails. They use NCPDP standards and adjudicate
          in real time at the point of sale through PBMs. The pharmacist sees the cost share
          immediately. The artifacts are different but the same five amounts (billed, allowed,
          plan-paid, member, write-off) still apply.
        </p>

        <div class="key-takeaway">
          <div class="key-takeaway-title">Key takeaway</div>
          The EOB and 835 are how adjudication answers the original 837. CARCs explain who
          absorbs each adjustment; RARCs add detail. If you can read an 835 fluently and
          reconcile it back to the 837, you can debug pricing.
        </div>

        <p style="margin-top: var(--space-6); padding-top: var(--space-5); border-top: 1px solid var(--c-line); font-size: 16px;">
          That's the Pricing walkthrough. Next: how the contracts that drive all this pricing
          actually get written. Continue to <a href="/contracts/why-contracts">Walkthrough 2 — Contracts</a>.
        </p>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this chapter</div>
          <div class="glossary-strip-terms">
            ${term("eob")} ${term("era")} ${term("edi-835")} ${term("carc")} ${term("rarc")}
          </div>
        </div>
      </article>`;
  },
};
