import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "bob-knee",
  title: "Bob's Knee Replacement (Medicare)",
  subtitle: "A six-month episode under Original Medicare — RBRVS, OPPS, MS-DRG, and SNF.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Case File 2 · Pricing Claims</span>
        <h1>Bob's Knee Replacement</h1>
        <p class="chapter-subtitle">A six-month episode under Original Medicare — RBRVS, OPPS, MS-DRG, and SNF.</p>

        <div class="case-meta">
          <div class="case-meta-item">
            <span class="case-meta-label">Patient</span>
            <span class="case-meta-value">Bob, 67</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-label">Plan</span>
            <span class="case-meta-value">Original Medicare (Parts A &amp; B) + Medigap Plan G</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-label">Part A deductible</span>
            <span class="case-meta-value">$1,632 per benefit period (2025)</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-label">Part B deductible</span>
            <span class="case-meta-value">$257 (already met earlier in year)</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-label">Part B coinsurance</span>
            <span class="case-meta-value">20% (covered by Medigap Plan G)</span>
          </div>
        </div>

        <h2>The episode</h2>
        <p>
          Bob has end-stage osteoarthritis in his right knee. Six months of conservative
          management hasn't helped. His PCP refers him to an orthopedic surgeon who recommends
          total knee arthroplasty (TKA). Here's what happens in claims terms over the next
          three months.
        </p>

        <h2>Phase 1: Pre-op work-up</h2>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Surgeon office visit (CPT 99204)</h3>
            <span class="claim-card-meta">CMS-1500 · POS 11</span>
          </div>
          <p>New patient, level-4 visit. Medicare allowed amount in Bob's locality: <strong>$182.61</strong>. Medicare pays 80% = $146.09; Bob owes 20% = $36.52, which Medigap covers.</p>
        </div>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Pre-op X-rays (in office)</h3>
            <span class="claim-card-meta">CMS-1500 · POS 11</span>
          </div>
          <p>Bilateral standing knee X-rays (CPT 73565). Medicare non-facility allowed: <strong>$36.95</strong> (low because the office takes the X-ray and reads it themselves). Medicare 80% / Bob 20%.</p>
        </div>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Pre-op cardiology clearance (CPT 99213)</h3>
            <span class="claim-card-meta">CMS-1500 · POS 11</span>
          </div>
          <p>Cardiologist office visit + ECG (CPT 93000) for a man with hypertension. Medicare allowed: $89.31 + $16.32 = <strong>$105.63</strong>.</p>
        </div>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Pre-op labs (hospital outpatient)</h3>
            <span class="claim-card-meta">UB-04 · TOB 131</span>
          </div>
          <p>CBC, CMP, PT/PTT, type-and-screen. Paid under Medicare Clinical Lab Fee Schedule (CLFS), not OPPS. Total allowed: ≈ <strong>$53.20</strong>.</p>
        </div>

        <h2>Phase 2: Surgery — the big one</h2>

        <p>
          Surgery is performed at Memorial Hospital, a non-teaching community hospital. Bob is
          admitted as an inpatient (note: knee replacement is on Medicare's "inpatient only" list
          having been recently removed in 2018, so the inpatient/outpatient question matters here;
          for our case, the surgeon and hospital agreed on inpatient for medical necessity).
          Length of stay: 4 days.
        </p>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Hospital inpatient (DRG 470 — major joint replacement w/o MCC)</h3>
            <span class="claim-card-meta">UB-04 · TOB 111</span>
          </div>
          <p>
            Hospital billed charges: <strong>$78,000</strong> (gross chargemaster).
          </p>
          <p>
            Medicare ${term("drg")} pricing for a non-teaching, non-DSH community hospital with
            wage index 1.0:
          </p>
          <ul>
            <li>National operating base rate (2024): <strong>$6,447.95</strong></li>
            <li>Wage adjustment: 1.0 × 0.677 + 0.323 = 1.000 → adjusted base = $6,447.95</li>
            <li>DRG 470 weight: <strong>1.9904</strong></li>
            <li>Pre-adjustment payment: $6,447.95 × 1.9904 = <strong>$12,834.02</strong></li>
            <li>No IME (non-teaching), no DSH (community)</li>
            <li>Plus a small capital base rate (~$472 per stay)</li>
            <li><strong>Total Medicare payment to hospital: ≈ $13,300</strong></li>
          </ul>
          <p>
            Hospital writes off $78,000 − $13,300 = <strong>$64,700</strong>.
          </p>
        </div>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Surgeon professional fee (CPT 27447)</h3>
            <span class="claim-card-meta">CMS-1500 · POS 21</span>
          </div>
          <p>
            CPT 27447 (TKA) Medicare RBRVS in Bob's locality:
          </p>
          <ul>
            <li>Work RVU: 20.72</li>
            <li>PE RVU (facility): 18.60</li>
            <li>MP RVU: 4.21</li>
            <li>GPCIs: 1.00, 1.00, 1.00 (national average locality)</li>
            <li>2024 CF: $32.74</li>
            <li>Allowed = (20.72 + 18.60 + 4.21) × 32.74 = <strong>$1,425.40</strong></li>
          </ul>
          <p>
            27447 has a 90-day ${term("global-period")}. The surgical fee covers the surgery itself
            <em>plus all related E&amp;M visits within 90 days post-op</em>. No separate billing
            for routine post-op office visits.
          </p>
        </div>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Anesthesiologist</h3>
            <span class="claim-card-meta">CMS-1500 · POS 21</span>
          </div>
          <p>
            ASA 01402 (anesthesia for TKA) has 7 base units. Surgery time: 105 minutes = 7 time
            units. Medicare anesthesia CF (2024): <strong>$20.81</strong>.
          </p>
          <div class="formula">(7 + 7) × $20.81 = $291.34 allowed</div>
        </div>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Hospital-based clinicians during stay</h3>
            <span class="claim-card-meta">CMS-1500 each · POS 21</span>
          </div>
          <p>Each bills professionally even though the facility's covered by DRG:</p>
          <ul>
            <li>Hospitalist daily rounding (CPT 99232 × 4 days): 4 × $73.18 = $292.72</li>
            <li>PT eval (CPT 97161) and PT sessions: ~$200 total</li>
            <li>Hospital pharmacist consult: rolled into DRG (no separate professional billing under Medicare for inpatient pharmacy)</li>
          </ul>
        </div>

        <h2>Phase 3: Post-acute care</h2>

        <p>
          Bob isn't quite ready to go home alone. He's transferred to a SNF (skilled nursing
          facility) for 10 days of rehabilitation. Medicare Part A covers the first 20 days at
          $0 cost-share per benefit period. The SNF is paid under Medicare's PDPM (Patient
          Driven Payment Model), a per-diem methodology with case-mix categories driving the
          rate.
        </p>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">SNF stay (10 days)</h3>
            <span class="claim-card-meta">UB-04 · TOB 211</span>
          </div>
          <p>PDPM blended per-diem ≈ $580/day for Bob's case mix → <strong>$5,800 total</strong>. Bob owes $0 (within first 20 days).</p>
        </div>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Outpatient physical therapy (post-discharge)</h3>
            <span class="claim-card-meta">CMS-1500 · POS 11</span>
          </div>
          <p>Bob does 12 outpatient PT sessions over 8 weeks. Each session: CPT 97110 (3 units) + 97140 (1 unit). Per session Medicare allowed ≈ $115. Total: <strong>~$1,380</strong>. 80% / 20%.</p>
          <p>
            <strong>2025 therapy threshold ($2,330)</strong>: not crossed; no KX modifier needed.
          </p>
        </div>

        <h2>Putting it all together</h2>

        <div class="case-totals">
          <div class="case-totals-title">Bob's Episode Totals</div>
          <table>
            <thead>
              <tr><th>Component</th><th>Method</th><th class="num">Allowed</th><th class="num">Bob owes</th></tr>
            </thead>
            <tbody>
              <tr><td>Surgeon office visit</td><td>RBRVS · MPFS</td><td class="num">$182.61</td><td class="num">$36.52*</td></tr>
              <tr><td>Pre-op X-ray (office)</td><td>RBRVS · non-facility</td><td class="num">$36.95</td><td class="num">$7.39*</td></tr>
              <tr><td>Cardiology clearance</td><td>RBRVS · MPFS</td><td class="num">$105.63</td><td class="num">$21.13*</td></tr>
              <tr><td>Hospital labs</td><td>CLFS</td><td class="num">$53.20</td><td class="num">$0.00*</td></tr>
              <tr><td>Hospital inpatient (DRG 470)</td><td>MS-DRG</td><td class="num">$13,300.00</td><td class="num">$1,632.00*</td></tr>
              <tr><td>Surgeon (CPT 27447 + 90-day global)</td><td>RBRVS</td><td class="num">$1,425.40</td><td class="num">$285.08*</td></tr>
              <tr><td>Anesthesiologist</td><td>Anesthesia formula</td><td class="num">$291.34</td><td class="num">$58.27*</td></tr>
              <tr><td>Hospital-based clinicians</td><td>RBRVS</td><td class="num">~$500</td><td class="num">$100*</td></tr>
              <tr><td>SNF (10 days)</td><td>PDPM per diem</td><td class="num">$5,800.00</td><td class="num">$0.00</td></tr>
              <tr><td>Outpatient PT (12 sessions)</td><td>RBRVS</td><td class="num">$1,380.00</td><td class="num">$276.00*</td></tr>
              <tr class="total-row"><td>Total</td><td></td><td class="num">~$23,075</td><td class="num">~$2,416 (covered by Medigap*)</td></tr>
            </tbody>
          </table>
          <p style="font-size: 12px; color: var(--c-ink-muted); margin-top: var(--space-2); font-style: italic;">
            * Bob's Medigap Plan G covers all Part A/B coinsurance and the Part B deductible after the small annual Part B deductible. After Plan G, his actual out-of-pocket for the entire episode is essentially $0.
          </p>
        </div>

        <h2>What to notice</h2>
        <ol>
          <li><strong>Six different methodologies in one episode.</strong> RBRVS for office and outpatient professional services. CLFS for labs. MS-DRG for hospital inpatient. Anesthesia formula for the anesthesiologist. PDPM for SNF. And outpatient PT under RBRVS again. The pricing engine has to know which applies where.</li>
          <li><strong>Inpatient is one DRG payment, not the sum of services.</strong> The hospital billed $78,000 for the 4-day stay; Medicare paid ~$13,300 — a fixed amount based entirely on the DRG. Length of stay and number of services don't matter beyond the DRG-grouping inputs.</li>
          <li><strong>The surgeon's 90-day global period collapses post-op visits.</strong> All the routine post-op office visits are bundled into the $1,425.40 surgical fee. If Bob hits a complication (related E&amp;M with mod -24, or unrelated procedure with mod -79), they unbundle.</li>
          <li><strong>Medicare alone would have left Bob exposed.</strong> The Part A deductible alone is $1,632. Without Medigap, his cost share across the episode would have totaled ~$2,400+. Medicare has no OOP max — Plan G fills that gap.</li>
          <li><strong>Different facility types, different methodologies.</strong> Acute hospital (DRG), SNF (PDPM), outpatient hospital lab (CLFS), professional office (RBRVS non-facility). Same patient, same week, four different fee schedules.</li>
          <li><strong>Charge-master prices are wildly disconnected from payment.</strong> $78,000 billed, $13,300 paid. The hospital's $64,700 write-off isn't a "discount" — it's the chargemaster's relationship to reality. Same dynamic appears across every claim.</li>
        </ol>

        <h2>How this would look under a Medicare Advantage plan</h2>
        <p>
          If Bob were on a ${term("ma-plan", "Medicare Advantage")} plan instead of Original
          Medicare, the structure would shift:
        </p>
        <ul>
          <li>The MA plan would receive a risk-adjusted PMPM from CMS to cover Bob.</li>
          <li>The MA plan's contracts with providers might use Medicare-equivalent rates (effectively the same dollar amounts) or it might have negotiated tighter rates for higher-volume DRGs.</li>
          <li>The MA plan would impose its own benefit design — likely a per-stay copay (e.g., $300/day for the first 5 inpatient days = $1,200) or a flat case copay.</li>
          <li>MA plans must have an OOP max (unlike Original Medicare); the federal cap in 2025 is $9,350 in-network.</li>
          <li>The MA plan might require prior authorization for the inpatient admission and SNF transfer, with denial risk if not obtained.</li>
        </ul>
        <p>Same surgery, same surgeon, same hospital — but a different financial experience for Bob.</p>

        <div class="key-takeaway">
          <div class="key-takeaway-title">The bigger picture</div>
          A surgical episode is a portfolio of claims, each priced by its own methodology, all
          tied together by the patient and the date span. Modeling an episode means modeling
          all the parts. Medicare's structure becomes the reference: even commercial plans
          quote rates as percent-of-Medicare for each component.
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this case</div>
          <div class="glossary-strip-terms">
            ${term("drg")} ${term("rbrvs")} ${term("rvu")} ${term("conversion-factor")}
            ${term("anesthesia-cf")} ${term("global-period")} ${term("ma-plan")}
            ${term("oop-max")}
          </div>
        </div>
      </article>`;
  },
};
