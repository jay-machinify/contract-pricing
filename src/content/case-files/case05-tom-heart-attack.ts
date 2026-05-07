import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "tom-heart-attack",
  title: "Tom's Heart Attack",
  subtitle: "Ambulance, ER, cardiac cath, ICU — and the No Surprises Act in action.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Case File 5 · Pricing Claims</span>
        <h1>Tom's Heart Attack</h1>
        <p class="chapter-subtitle">Ambulance, ER, cardiac cath, ICU — and the No Surprises Act in action.</p>

        <div class="case-meta">
          <div class="case-meta-item">
            <span class="case-meta-label">Patient</span>
            <span class="case-meta-value">Tom, 58</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-label">Plan</span>
            <span class="case-meta-value">Self-insured employer plan, ERISA, administered by major TPA</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-label">Deductible</span>
            <span class="case-meta-value">$3,000 (met from earlier in year)</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-label">OOP max</span>
            <span class="case-meta-value">$8,500 ($1,200 already accumulated)</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-label">Coinsurance</span>
            <span class="case-meta-value">15% in-network · 30% OON (when applicable)</span>
          </div>
        </div>

        <h2>What happened</h2>
        <p>
          Tom is at home on a Tuesday evening when he develops crushing chest pain radiating to
          his left arm. His wife calls 911. An ambulance arrives in 8 minutes. Paramedics get a
          12-lead ECG showing an ST-elevation MI (STEMI). They activate the catheterization lab
          en route to City General — the closest STEMI-capable hospital, 12 miles away. Tom is
          in the cath lab within 90 minutes of pain onset, has a stent placed in his LAD, and
          spends 2 days in the cardiac ICU before transferring to step-down for 3 more days.
          Total LOS: 5 days.
        </p>

        <h2>The first claim — ambulance</h2>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Ambulance (private company, out-of-network)</h3>
            <span class="claim-card-meta">CMS-1500 / 837P · POS 41</span>
          </div>
          <table>
            <thead><tr><th>Code</th><th>Description</th><th class="num">Charge</th></tr></thead>
            <tbody>
              <tr><td>HCPCS A0427</td><td>ALS emergency, base rate</td><td class="num">$1,800</td></tr>
              <tr><td>HCPCS A0425</td><td>Mileage, ground (12 miles)</td><td class="num">$420</td></tr>
              <tr><td>HCPCS A0398</td><td>ALS specialized treatment (cardiac)</td><td class="num">$650</td></tr>
              <tr><td colspan="2"><strong>Total billed</strong></td><td class="num"><strong>$2,870</strong></td></tr>
            </tbody>
          </table>
        </div>

        <p>
          Ambulance services are notorious for being out-of-network. The town's EMS is a
          private company; Tom's plan doesn't have a contract with them. Pre-2022, the
          ambulance could have balance-billed Tom for the gap.
        </p>
        <p>
          <strong>NSA caveat for ambulance</strong>: ground ambulance is currently <em>not</em>
          covered by federal NSA protections (only air ambulance is). Some states have their
          own ground-ambulance protections. In a state without state protection, Tom is
          potentially exposed to a balance bill for ground ambulance.
        </p>
        <p>
          Tom's plan applies its OON benefit: 30% coinsurance against the ${term("ucr", "Usual & Customary")}
          allowed amount. UCR for ground ambulance in this market: <strong>$1,950</strong>.
          The provider can balance bill Tom for $2,870 − $1,950 = $920 (state law permitting).
        </p>

        <h2>The hospital claim — STEMI inpatient stay</h2>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">City General Hospital (in-network)</h3>
            <span class="claim-card-meta">UB-04 / 837I · TOB 111</span>
          </div>
          <table>
            <thead><tr><th>Rev/Code</th><th>Description</th><th class="num">Charge</th></tr></thead>
            <tbody>
              <tr><td>Rev 0450</td><td>ER level 5 (high acuity)</td><td class="num">$5,200</td></tr>
              <tr><td>Rev 0481 / CPT 92928</td><td>Cardiac catheterization with stent placement</td><td class="num">$48,000</td></tr>
              <tr><td>Rev 0270</td><td>Drug-eluting stent (implant)</td><td class="num">$22,000</td></tr>
              <tr><td>Rev 0200</td><td>ICU room &amp; board (2 days)</td><td class="num">$18,000</td></tr>
              <tr><td>Rev 0124</td><td>Step-down room &amp; board (3 days)</td><td class="num">$11,400</td></tr>
              <tr><td>Rev 0250</td><td>Pharmacy (heparin, antiplatelets, statins, etc.)</td><td class="num">$8,200</td></tr>
              <tr><td>Rev 0320</td><td>Diagnostic imaging (chest X-rays, echo)</td><td class="num">$3,800</td></tr>
              <tr><td>Rev 0300</td><td>Lab (cardiac enzymes, basic chemistries, CBC)</td><td class="num">$1,950</td></tr>
              <tr><td>Rev 0410</td><td>Respiratory therapy</td><td class="num">$2,100</td></tr>
              <tr><td colspan="2"><strong>Total billed</strong></td><td class="num"><strong>$120,650</strong></td></tr>
            </tbody>
          </table>
        </div>

        <p>
          City General has a per-diem-with-carve-outs commercial contract with Tom's plan.
          Let's price it both ways — DRG and per-diem — to see why methodology choice matters
          on a case like this.
        </p>

        <h3>If the contract were DRG-based</h3>
        <ul>
          <li>Principal diagnosis I21.0 (STEMI of anterior wall) + procedure 02703DZ (PCI with drug-eluting stent) → DRG 246 (Percutaneous cardiovascular procedures with drug-eluting stent w/ MCC), weight 2.4319</li>
          <li>Hospital base rate: $7,500 (negotiated)</li>
          <li>Wage adjustment: 1.05 → adjusted base = $7,500 × (0.677 × 1.05 + 0.323) = $7,766</li>
          <li>Pre-add payment: $7,766 × 2.4319 = <strong>$18,887</strong></li>
          <li>+ Implant carve-out (drug-eluting stent at invoice + 12%): invoice $9,800 → $10,976</li>
          <li><strong>Total under DRG: $29,863</strong></li>
        </ul>

        <h3>The contract is actually per-diem with carve-outs</h3>
        <ul>
          <li>2 ICU days at $5,200/day = $10,400</li>
          <li>3 step-down days at $2,800/day = $8,400</li>
          <li>Cardiac cath case rate (PCI with stent): $14,500 (replaces normal per-diem for that day)</li>
          <li>Drug-eluting stent carve-out (invoice + 12%): $10,976</li>
          <li>Pharmacy under $X threshold: included in per-diem</li>
          <li>Routine lab/imaging: included in per-diem</li>
          <li><strong>Total under per-diem: $44,276</strong></li>
        </ul>

        <h3>Stop-loss check</h3>
        <p>
          The contract has a stop-loss provision: if billed charges exceed $250,000, payment
          flips to 75% of charges. Tom's case totals $120,650 — well below $250k. Stop-loss
          doesn't trigger.
        </p>

        <p>
          Hospital allowed under per-diem methodology: <strong>$44,276</strong>. Hospital
          write-off: $120,650 − $44,276 = <strong>$76,374</strong>.
        </p>

        <h2>Professional fees during the stay</h2>

        <p>
          Several physicians render services. Each generates their own CMS-1500. Critical: at
          a STEMI-capable hospital, several professionals may be in-network with the hospital
          but out-of-network with the plan.
        </p>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Interventional cardiologist (in-network)</h3>
            <span class="claim-card-meta">CMS-1500 · POS 21</span>
          </div>
          <p>
            CPT 92941 (PCI with stent in chronic total occlusion) and 92944 (additional vessel).
            Allowed: <strong>~$2,840</strong> at 130% of Medicare.
          </p>
        </div>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Anesthesiologist for cath lab (in-network)</h3>
            <span class="claim-card-meta">CMS-1500 · POS 21</span>
          </div>
          <p>
            ASA 00538 anesthesia for cardiac cath, 90 minutes. (4 base + 6 time) × $58 = <strong>$580 allowed</strong>.
          </p>
        </div>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Hospitalist (in-network) — daily rounding</h3>
            <span class="claim-card-meta">CMS-1500 · POS 21</span>
          </div>
          <p>CPT 99232 × 3 days + 99231 × 2 days. Allowed: <strong>~$420 total</strong>.</p>
        </div>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Cardiology consult (out-of-network!)</h3>
            <span class="claim-card-meta">CMS-1500 · POS 21</span>
          </div>
          <p>
            The on-call cardiology consult group is OON with Tom's plan. They billed CPT 99254
            (initial inpatient consult, comprehensive) and CPT 99232 × 4 days. Billed: $3,200.
          </p>
          <p>
            <strong>NSA applies</strong>. Tom didn't choose this provider; they were assigned to
            him at an in-network facility. The plan must:
          </p>
          <ul>
            <li>Treat the cardiology consult as in-network for cost-share purposes.</li>
            <li>Pay the QPA (median in-network rate) — about $1,800 here.</li>
            <li>Hold Tom harmless from balance billing.</li>
            <li>Provide federal IDR if the cardiology group disputes the rate.</li>
          </ul>
        </div>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Radiologist interpretations (in-network)</h3>
            <span class="claim-card-meta">CMS-1500 · POS 21</span>
          </div>
          <p>Chest X-rays, echo. Allowed total: <strong>~$310</strong>.</p>
        </div>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Pathologist (in-network)</h3>
            <span class="claim-card-meta">CMS-1500 · POS 81</span>
          </div>
          <p>
            Cardiac biomarker interpretation (CPT 84484 troponin). Most lab CPTs already paid
            on the technical side via the hospital's CLFS. Pathologist's professional component
            allowed: <strong>~$30</strong>.
          </p>
        </div>

        <h2>Putting it all together</h2>

        <div class="case-totals">
          <div class="case-totals-title">Tom's STEMI — Case Totals</div>
          <table>
            <thead>
              <tr><th>Component</th><th>Method</th><th class="num">Allowed</th></tr>
            </thead>
            <tbody>
              <tr><td>Ambulance (OON, no NSA for ground)</td><td>UCR · OON</td><td class="num">$1,950</td></tr>
              <tr><td>Hospital (per-diem + carve-out + cath case rate)</td><td>Mixed</td><td class="num">$44,276</td></tr>
              <tr><td>Interventional cardiologist</td><td>RBRVS</td><td class="num">$2,840</td></tr>
              <tr><td>Cath lab anesthesia</td><td>Anesthesia formula</td><td class="num">$580</td></tr>
              <tr><td>Hospitalist daily rounding</td><td>RBRVS</td><td class="num">$420</td></tr>
              <tr><td>Cardiology consult (OON, NSA QPA)</td><td>QPA</td><td class="num">$1,800</td></tr>
              <tr><td>Radiology interpretations</td><td>RBRVS</td><td class="num">$310</td></tr>
              <tr><td>Pathology professional</td><td>RBRVS</td><td class="num">$30</td></tr>
              <tr class="total-row"><td>Total allowed</td><td></td><td class="num">$52,206</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Tom's cost-share calculation</h2>
        <p>
          Tom had already met his $3,000 deductible earlier in the year (he's on chronic blood
          pressure medication and had outpatient labs). His OOP-max remaining at the start of
          the case was $8,500 − $1,200 = $7,300.
        </p>
        <p>
          15% in-network coinsurance applies to the in-network components. The OON ambulance
          gets 30% coinsurance against UCR plus the balance-billed gap (state-permitting). NSA
          components are at in-network 15%.
        </p>
        <p>
          Tom's coinsurance burns through his remaining $7,300 OOP fast — likely halfway
          through the hospital claim's adjudication. Once OOP max is hit, plan pays 100% of
          allowed for the rest. Out-of-network ambulance balance-bill gap is <em>outside</em>
          OOP max — Tom is on the hook unless his state has a ground-ambulance protection.
        </p>

        <table>
          <thead><tr><th>Component</th><th class="num">Tom pays</th><th class="num">Plan pays</th></tr></thead>
          <tbody>
            <tr><td>Pre-OOP-max (15% × ~$48,000)</td><td class="num">~$7,300 (capped)</td><td class="num">~$40,700</td></tr>
            <tr><td>Post-OOP-max claims</td><td class="num">$0</td><td class="num">~$2,256</td></tr>
            <tr><td>Ambulance balance-bill (potential)</td><td class="num">~$920</td><td class="num">$0</td></tr>
            <tr class="total-row"><td><strong>Total Tom OOP</strong></td><td class="num"><strong>~$8,220</strong></td><td class="num"><strong>~$42,956</strong></td></tr>
          </tbody>
        </table>

        <h2>What to notice</h2>
        <ol>
          <li><strong>The NSA does meaningful work.</strong> The OON cardiology consult group billed $3,200 with no contract. Without the NSA, they could have balance-billed Tom for the gap above his plan's OON allowed. Instead, plan pays QPA ($1,800), Tom is held harmless, and the cardiology group can dispute through IDR if they want.</li>
          <li><strong>Ground ambulance is the NSA's gap.</strong> Federal NSA covers air ambulance but not ground. About a third of ground-ambulance claims are OON. Tom may face balance billing depending on state law. This is one of the most common surprise-bill scenarios remaining post-2022.</li>
          <li><strong>Methodology choice has $14,000 of impact.</strong> Same case priced under DRG = $29,863; under per-diem with carve-outs = $44,276. The hospital prefers per-diem here; a payer would prefer DRG. The contract decides; the engine implements.</li>
          <li><strong>Implants drive serious dollars.</strong> The drug-eluting stent alone — at invoice + 12% — is ~$11,000 of the hospital allowed. Without the carve-out, it would have been buried in per-diem and the hospital would have lost money on the case.</li>
          <li><strong>Stop-loss saved nothing this time, but it could have.</strong> Tom's case at $120k of charges fell well short of the $250k stop-loss threshold. A 14-day ICU stay with multiple procedures could easily cross $250k and flip pricing to 75% of charges = ~$190,000. Stop-loss is the catastrophic-case safety net; most cases don't trigger it.</li>
          <li><strong>OOP max is what protects Tom financially.</strong> Without it, his 15% coinsurance on $52,000 of allowed amounts would have been ~$7,800 in cost-share — close, but the cap matters. Pre-ACA plans without OOP max could have left him with $20,000+ in real exposure on a single hospitalization.</li>
        </ol>

        <h2>If this had been an MA plan or Medicaid</h2>
        <ul>
          <li><strong>Medicare Advantage</strong>: similar mechanics, but the OON cardiology group would be paid at Medicare-equivalent rates regardless (MA plans cap OON at Medicare). NSA also applies. Per-day inpatient copay (e.g., $400/day for first 5 days) would replace coinsurance. OOP max federally capped at $9,350 in-network.</li>
          <li><strong>Medicaid managed care</strong>: state Medicaid sets the floor; the MCO contracts at lower commercial rates. No member cost share for most services. Provider would receive less than the commercial rates above.</li>
          <li><strong>Original Medicare</strong>: Part A inpatient deductible $1,632, then $0 coinsurance for first 60 days. Part B handles all the professional fees with 20% coinsurance, no OOP cap, supplemented by Medigap. Anesthesia and ambulance billed under Part B.</li>
        </ul>

        <div class="key-takeaway">
          <div class="key-takeaway-title">The bigger picture</div>
          A high-acuity ED-to-cath-lab admission stress-tests the system. NSA protections, OON
          ancillary providers, ambulance gaps, methodology choice on the hospital side, multiple
          professional billings, implants as carve-outs, stop-loss thresholds, and OOP max
          mechanics all show up in one case. If you can model this, you can model most of
          inpatient claim activity.
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this case</div>
          <div class="glossary-strip-terms">
            ${term("nsa")} ${term("balance-billing")} ${term("per-diem")} ${term("carve-out")}
            ${term("stop-loss")} ${term("oop-max")} ${term("ucr")} ${term("ma-plan")}
          </div>
        </div>
      </article>`;
  },
};
