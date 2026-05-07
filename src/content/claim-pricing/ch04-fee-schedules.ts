import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "fee-schedules",
  title: "Fee Schedules & RBRVS",
  subtitle: "Medicare's framework — and why every commercial contract refers to it.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Chapter 4 · Pricing Claims</span>
        <h1>Fee Schedules &amp; RBRVS</h1>
        <p class="chapter-subtitle">Medicare's framework — and why every commercial contract refers to it.</p>

        <p>
          A ${term("fee-schedule")} is a table that maps a procedure code to an allowed amount.
          The dominant framework in the US is Medicare's ${term("rbrvs")}, and you cannot escape it:
          commercial contracts are almost always quoted as <em>some percentage of Medicare</em>.
        </p>

        <h2>The RBRVS formula</h2>
        <div class="formula">Allowed = (work·workGPCI + PE·peGPCI + MP·mpGPCI) × CF</div>
        <p>
          Three relative-value units per CPT, each adjusted by a locality factor, summed,
          multiplied by a national conversion factor. That's the entire formula.
        </p>

        <table>
          <thead><tr><th>Component</th><th>What it represents</th></tr></thead>
          <tbody>
            <tr><td>Work ${term("rvu", "RVU")}</td><td>Physician time, mental effort, judgment, technical skill, stress.</td></tr>
            <tr><td>Practice expense RVU</td><td>Direct (supplies, clinical staff, equipment) and indirect (rent, admin) overhead. Has facility and non-facility variants.</td></tr>
            <tr><td>Malpractice RVU</td><td>Liability insurance allocation. Smallest of the three.</td></tr>
            <tr><td>${term("gpci", "GPCI")}</td><td>Geographic Practice Cost Index — three locality multipliers, one per RVU type. Effectively cost-of-living adjusters.</td></tr>
            <tr><td>${term("conversion-factor", "Conversion Factor")}</td><td>National dollar multiplier per RVU. CMS publishes annually (e.g., $32.74 in 2024).</td></tr>
          </tbody>
        </table>

        <h2>Worked example: a 99213 office visit</h2>
        <table>
          <thead><tr><th>Component</th><th class="num">RVU</th><th class="num">GPCI</th><th class="num">Adjusted</th></tr></thead>
          <tbody>
            <tr><td>Work</td><td class="num">1.30</td><td class="num">1.000</td><td class="num">1.300</td></tr>
            <tr><td>Practice expense</td><td class="num">1.04</td><td class="num">1.000</td><td class="num">1.040</td></tr>
            <tr><td>Malpractice</td><td class="num">0.10</td><td class="num">1.000</td><td class="num">0.100</td></tr>
            <tr><td><strong>Total</strong></td><td class="num"></td><td class="num"></td><td class="num"><strong>2.440</strong></td></tr>
            <tr><td>× CF $32.74</td><td class="num"></td><td class="num"></td><td class="num"><strong>$79.89</strong></td></tr>
          </tbody>
        </table>

        <p>That's the Medicare allowed amount for 99213 in a national-average locality. Now play with the calculator.</p>

        <div data-calc="rbrvs-pricer"></div>

        <h2>Facility vs. non-facility PE</h2>
        <p>
          CMS publishes <em>two</em> practice expense RVUs for most procedures: a higher
          non-facility PE (when the doctor's own office bears overhead) and a lower facility PE
          (when overhead is borne by the hospital and they bill separately for it under OPPS).
          The ${term("pos", "place of service")} on the claim determines which variant applies.
        </p>

        <h2>Commercial fee schedules</h2>
        <p>
          Commercial payers maintain their own fee schedules, but they're typically derived from
          Medicare. The most common form: <strong>X% of the current Medicare rate, by code</strong>.
          That's why a contract clause might read "120% of CMS National Physician Fee Schedule,
          effective for dates of service on or after January 1, 2024." When CMS updates RVUs or
          the CF, the commercial schedule moves.
        </p>

        <p>Other commercial fee-schedule patterns:</p>
        <ul>
          <li><strong>Custom fee schedule</strong> — payer's own dollar amounts, often legacy from before RBRVS dominance.</li>
          <li><strong>Mixed</strong> — % of Medicare for most codes, custom for a few high-volume or high-cost ones.</li>
          <li><strong>${term("ucr", "Usual & Customary")}</strong> — typically a percentile of charges in the area; mostly out-of-network now.</li>
        </ul>

        <h2>Lesser-of logic</h2>
        <p>
          Almost every fee-schedule clause is wrapped in lesser-of language: <em>"the lesser
          of provider's billed charge or the contracted allowed amount."</em> In plain English:
          if the provider charged $40 for a code where the contracted allowed is $79.89, the
          allowed amount is <strong>$40</strong>. The clause prevents windfalls when small
          charges happen to fall below the schedule.
        </p>

        <h2>Special cases worth knowing</h2>
        <ul>
          <li><strong>Anesthesia</strong> uses a separate formula: payment = (base units + time units) × ${term("anesthesia-cf", "anesthesia CF")}. Time units are typically 15-minute increments.</li>
          <li><strong>Drugs (J-codes)</strong> are often paid at <em>ASP + 6%</em> for Medicare; commercial often uses AWP - some discount or WAC-based formulas.</li>
          <li><strong>Lab</strong> has its own Medicare Clinical Lab Fee Schedule, much smaller in scope.</li>
          <li><strong>DME</strong> uses HCPCS Level II codes against a separate DME fee schedule with regional pricing.</li>
        </ul>

        <div class="key-takeaway">
          <div class="key-takeaway-title">Key takeaway</div>
          RBRVS is the backbone of US professional pricing. Commercial contracts are almost
          always pegged to Medicare. Once you can run the formula by hand, you understand the
          shape of half of all healthcare spending.
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this chapter</div>
          <div class="glossary-strip-terms">
            ${term("fee-schedule")} ${term("rbrvs")} ${term("rvu")} ${term("gpci")}
            ${term("conversion-factor")} ${term("lesser-of")} ${term("anesthesia-cf")}
            ${term("pos")} ${term("ucr")}
          </div>
        </div>
      </article>`;
  },
};
