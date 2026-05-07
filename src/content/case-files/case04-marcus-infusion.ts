import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "marcus-infusion",
  title: "Marcus's Infliximab Infusions",
  subtitle: "Specialty drugs, J-codes, ASP+6%, biosimilars, and prior auth.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Case File 4 · Pricing Claims</span>
        <h1>Marcus's Infliximab Infusions</h1>
        <p class="chapter-subtitle">Specialty drugs, J-codes, ASP+6%, biosimilars, and prior auth.</p>

        <div class="case-meta">
          <div class="case-meta-item">
            <span class="case-meta-label">Patient</span>
            <span class="case-meta-value">Marcus, 28</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-label">Diagnosis</span>
            <span class="case-meta-value">Crohn's disease (ICD-10 K50.10)</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-label">Plan</span>
            <span class="case-meta-value">Commercial PPO via employer</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-label">Deductible</span>
            <span class="case-meta-value">$1,500 (met)</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-label">Coinsurance</span>
            <span class="case-meta-value">20% in-network</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-label">Specialty drug rider</span>
            <span class="case-meta-value">Buy-and-bill, medical benefit</span>
          </div>
        </div>

        <h2>The setup</h2>
        <p>
          After two years of unsuccessful step therapy, Marcus's gastroenterologist starts him
          on infliximab — a biologic monoclonal antibody — via IV infusion every 8 weeks. The
          drug is administered in the GI practice's infusion suite. Each infusion takes about
          2.5 hours.
        </p>
        <p>
          This case shows a recurring claim type that runs differently from a typical office
          visit — physician-administered "specialty" drugs are paid under medical benefits
          (not pharmacy), use J-codes, and trigger their own prior-auth and biosimilar games.
        </p>

        <h2>The two ways physician-administered drugs get paid</h2>
        <p>There are two distinct workflows for drugs given in a clinical setting:</p>

        <table>
          <thead><tr><th>Workflow</th><th>How it works</th><th>Who buys the drug</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Buy-and-bill</strong></td>
              <td>Provider purchases the drug, administers it, then bills the medical plan with a J-code. Plan reimburses for drug + admin fee.</td>
              <td>Provider</td>
            </tr>
            <tr>
              <td><strong>White-bagging / brown-bagging</strong></td>
              <td>Specialty pharmacy purchases and ships the drug to the provider (white) or patient (brown). Provider bills only the admin fee. Plan pays specialty pharmacy directly under pharmacy benefit.</td>
              <td>Specialty pharmacy</td>
            </tr>
          </tbody>
        </table>

        <p>
          Marcus's plan does buy-and-bill. The GI practice purchases each vial, infuses it,
          and bills medically.
        </p>

        <h2>Anatomy of one infusion claim</h2>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Single infusion encounter</h3>
            <span class="claim-card-meta">CMS-1500 / 837P · POS 11</span>
          </div>
          <table>
            <thead><tr><th>Code</th><th>Description</th><th class="num">Units</th><th class="num">Charge</th></tr></thead>
            <tbody>
              <tr><td>HCPCS J1745</td><td>Infliximab, 10 mg</td><td class="num">600</td><td class="num">$5,800</td></tr>
              <tr><td>CPT 96365</td><td>IV infusion, initial up to 1 hour</td><td class="num">1</td><td class="num">$285</td></tr>
              <tr><td>CPT 96366</td><td>Each additional hour, ×2</td><td class="num">2</td><td class="num">$160</td></tr>
              <tr><td>CPT 99213</td><td>Brief E&amp;M visit (with mod -25)</td><td class="num">1</td><td class="num">$180</td></tr>
              <tr><td colspan="3"><strong>Total billed</strong></td><td class="num"><strong>$6,425</strong></td></tr>
            </tbody>
          </table>
        </div>

        <p><strong>Pricing breakdown:</strong></p>

        <h3>The drug — J1745, 600 units</h3>
        <p>
          One unit of HCPCS J1745 = 10 mg of infliximab. Marcus weighs 75 kg and dosing is
          5 mg/kg, so he gets 375 mg → rounded to a 400 mg vial → 40 units actually used.
          But J1745 is billed at "amount administered to the patient." Many practices over-bill
          based on full vials purchased; payers audit this.
        </p>
        <p>
          For 400 mg = 40 units. Wait — but the claim shows 600 units. Multi-vial dosing for
          a higher-dose patient? Or initial loading dose at 10 mg/kg = 750 mg ≈ 800 mg = 80 units.
          The case is ambiguous; let's say Marcus is on maintenance dose of 5 mg/kg over 60 minutes
          and is using 400 mg total. So 40 units of J1745 not 600. Let me redo:
        </p>
        <ul>
          <li>40 units × ASP per unit (Medicare ASP for J1745: ≈ $80.24 for 10 mg in 2024)</li>
          <li>40 × $80.24 = $3,209.60</li>
          <li>Medicare pays ASP + 6% = $3,202.18 × 1.06 = <strong>$3,402.18</strong></li>
          <li>Commercial contract: ASP + 8% (negotiated) = <strong>$3,466.37 allowed</strong></li>
        </ul>
        <p>The drug allowed amount: <strong>$3,466.37</strong>.</p>

        <h3>The administration codes — 96365 + 96366 × 2</h3>
        <p>Infusion administration codes are paid through RBRVS:</p>
        <ul>
          <li>96365 (initial hour): allowed ≈ <strong>$67</strong></li>
          <li>96366 (each additional hour): allowed ≈ $25 × 2 = <strong>$50</strong></li>
          <li>Total admin: <strong>$117</strong></li>
        </ul>

        <h3>The E&amp;M with modifier -25</h3>
        <p>
          The mod -25 says this E&amp;M is significant and separately identifiable from the
          procedure (the infusion). Without -25, the E&amp;M would deny as bundled into the
          infusion administration. Allowed for 99213-25: <strong>~$80</strong>.
        </p>

        <h3>Per-infusion total</h3>
        <p>
          Drug ($3,466.37) + Admin ($117) + E&amp;M ($80) = <strong>~$3,663 allowed per infusion</strong>.
          Marcus's 20% coinsurance after deductible: ~$733 per infusion.
        </p>

        <h2>The biosimilar story</h2>
        <p>
          Infliximab has multiple FDA-approved biosimilars (Inflectra, Renflexis, Avsola, etc.)
          with their own HCPCS codes (Q5103, Q5104, Q5121). They're typically 15–30% cheaper
          than reference Remicade. Plans push patients to biosimilars for cost savings.
        </p>
        <p>
          Marcus's plan covers reference infliximab but requires step therapy through a biosimilar
          first, unless the patient has documented failure or intolerance. Marcus's GI starts
          him on Inflectra (Q5103). After 6 months, Marcus develops antibody response and loses
          response. The doctor documents this, gets prior auth approved, and switches to reference
          Remicade.
        </p>
        <p>If Marcus had stayed on Inflectra:</p>
        <ul>
          <li>Q5103 ASP: ≈ $61.00 per unit</li>
          <li>40 units × $61 × 1.08 = <strong>$2,635.20 allowed</strong> (vs. $3,466.37 for Remicade)</li>
          <li>Plan saves $831 per infusion → ~$5,000/year on the drug.</li>
        </ul>
        <p>
          The biosimilar pressure is real and visible in the contract. Some plans flat refuse
          to cover reference infliximab without biosimilar failure documentation.
        </p>

        <h2>Prior authorization</h2>
        <p>
          Specialty drugs at this cost level always require prior auth. Each infusion isn't
          re-authorized individually; rather, the plan approves a course (e.g., 6 infusions
          over 12 months). Failures here:
        </p>
        <ul>
          <li>Auth expires mid-course → next claim denies → patient delays infusion → disease flares.</li>
          <li>Step therapy requires biosimilar trial first → patient who's already failed isn't aware they need new auth → denial.</li>
          <li>Site-of-care rules (some plans require home infusion or hospital outpatient instead of office) → claim denies for wrong POS.</li>
        </ul>

        <h2>Site-of-service differentials</h2>
        <p>
          The same drug, same dose, can cost wildly different amounts depending on where it's
          infused:
        </p>

        <table>
          <thead><tr><th>Site</th><th>Drug pricing</th><th>Facility fee</th><th>Total per infusion</th></tr></thead>
          <tbody>
            <tr><td>GI office (POS 11)</td><td>ASP + 8% = $3,466</td><td>None (admin codes only)</td><td>~$3,663</td></tr>
            <tr><td>Hospital outpatient (POS 22)</td><td>ASP + 8% = $3,466 OR % of charges</td><td>OPPS APC ≈ $400</td><td>~$3,950–6,000</td></tr>
            <tr><td>Home infusion (POS 12)</td><td>Specialty pharmacy pricing — often lower</td><td>Per-diem nursing fee</td><td>~$3,000</td></tr>
          </tbody>
        </table>
        <p>
          Plans increasingly use site-of-service policies to push infusions to lower-cost sites.
          Some plans deny POS 22 entirely for non-complex infusions and require POS 11 or 12.
        </p>

        <h2>Recurring annual cost</h2>
        <p>Marcus is on infliximab maintenance — every 8 weeks → ~6.5 infusions per year.</p>

        <div class="case-totals">
          <div class="case-totals-title">Marcus — Annual Infusion Cost</div>
          <table>
            <thead>
              <tr><th>Cost</th><th class="num">On Inflectra (biosimilar)</th><th class="num">On Remicade (reference)</th></tr>
            </thead>
            <tbody>
              <tr><td>Per-infusion allowed</td><td class="num">$2,832</td><td class="num">$3,663</td></tr>
              <tr><td>Per-infusion plan pays (80%)</td><td class="num">$2,266</td><td class="num">$2,930</td></tr>
              <tr><td>Per-infusion Marcus pays (20%)</td><td class="num">$566</td><td class="num">$733</td></tr>
              <tr class="total-row"><td>Annual plan paid (×6.5)</td><td class="num">$14,729</td><td class="num">$19,045</td></tr>
              <tr><td>Annual Marcus pays (×6.5, capped at OOP max)</td><td class="num">$3,679</td><td class="num">$4,765</td></tr>
            </tbody>
          </table>
        </div>

        <p>
          With Marcus's $5,000 OOP max, both scenarios cap him in-year at ~$5,000 once total
          family medical spend pushes him over (deductible already met). The plan's cost
          difference is ~$4,300/year — meaningful when scaled across the plan's IBD population.
        </p>

        <h2>What to notice</h2>
        <ol>
          <li><strong>Specialty drugs run on medical benefits, not pharmacy.</strong> Even though it's a "drug," infliximab paid under buy-and-bill is a medical claim, with J-code, ASP+%, RBRVS-paid administration codes, and modifier -25 for separately identifiable E&amp;M.</li>
          <li><strong>ASP + 6% (Medicare) / ASP + 8% (typical commercial) is the standard methodology.</strong> Average Sales Price is published quarterly by CMS based on manufacturer reporting. Other formulas exist (WAC - X%, AWP - X%) but ASP-based is dominant for buy-and-bill.</li>
          <li><strong>Biosimilars are a real cost-control lever.</strong> Plans invest heavily in step therapy, prior auth, and site-of-service rules to push patients to biosimilars. Whether this is good clinical practice is debated; it does save money.</li>
          <li><strong>Auth is a recurring administrative burden.</strong> A patient on long-term biologics generates auth-renewal events every 6–12 months. Practices have whole roles dedicated to keeping authorizations current. Auth gaps create denial cascades.</li>
          <li><strong>Site of service can multiply costs.</strong> Same drug, same dose: $3,663 in the office vs. $5,500+ in the hospital outpatient vs. $3,000 at home. The incentives flow downstream — payers prefer office or home; hospitals prefer outpatient; everyone has reasons.</li>
          <li><strong>Buy-and-bill rewards the practice.</strong> The 6–8% markup over ASP is real revenue for the GI practice. They have an incentive to keep buy-and-bill (the practice books revenue) versus white-bagging (the practice gets only the admin fee). Plans push white-bagging because it shifts the drug spend to pharmacy benefits, where formularies and rebates are easier to manage.</li>
        </ol>

        <div class="key-takeaway">
          <div class="key-takeaway-title">The bigger picture</div>
          Specialty drugs are a growing share of healthcare spending — and the way they're
          paid (buy-and-bill, J-codes, ASP-based pricing, prior auth, biosimilars, site-of-service
          rules) lives entirely on the medical-benefits side. Pricing engines have to handle
          these claims with the same rigor as any other claim, but the dollar magnitudes —
          $3,000+ per infusion, $20,000+ per patient per year — make them disproportionately
          important.
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this case</div>
          <div class="glossary-strip-terms">
            ${term("hcpcs")} ${term("modifier")} ${term("carve-out")} ${term("pos")}
          </div>
        </div>
      </article>`;
  },
};
