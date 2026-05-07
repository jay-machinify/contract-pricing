import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "sarah-wrist",
  title: "Sarah's Broken Wrist",
  subtitle: "ER visit, OON ED physician, and outpatient surgery on a commercial PPO.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Case File 1 · Pricing Claims</span>
        <h1>Sarah's Broken Wrist</h1>
        <p class="chapter-subtitle">ER visit, OON ED physician, and outpatient surgery on a commercial PPO.</p>

        <div class="case-meta">
          <div class="case-meta-item">
            <span class="case-meta-label">Patient</span>
            <span class="case-meta-value">Sarah, 34</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-label">Plan</span>
            <span class="case-meta-value">Commercial PPO 80/20</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-label">Deductible</span>
            <span class="case-meta-value">$2,500 individual ($1,800 already met)</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-label">OOP max</span>
            <span class="case-meta-value">$6,000 ($4,200 remaining)</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-label">Coinsurance</span>
            <span class="case-meta-value">20% in-network · 40% out-of-network</span>
          </div>
        </div>

        <h2>What happened</h2>
        <p>
          Sarah falls off her bike on a Saturday afternoon and lands hard on her right wrist.
          Pain, swelling, obvious deformity. She drives to the closest ER — Memorial Hospital,
          which is in-network for her plan. The ER physician on duty that day is contracted
          through an emergency medicine staffing company that, unbeknownst to anyone walking in,
          is <em>out-of-network</em> with Sarah's plan. The hospital is in-network; the doctor
          standing in the same room is not.
        </p>
        <p>
          X-rays confirm a displaced distal radius fracture. The ER physician sets it as best
          they can, splints the wrist, and refers her to orthopedics for definitive management.
          Three days later, an in-network ortho surgeon performs an outpatient open reduction
          and internal fixation (ORIF) at the hospital's outpatient surgery department.
        </p>

        <h2>The claims that get generated</h2>
        <p>
          One ER event spawns multiple claims, each from a different billing entity. Trace
          them carefully.
        </p>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Claim 1: ER facility (Memorial Hospital)</h3>
            <span class="claim-card-meta">UB-04 / 837I · TOB 131</span>
          </div>
          <table>
            <thead><tr><th>Code</th><th>Description</th><th class="num">Charge</th></tr></thead>
            <tbody>
              <tr><td>Rev 0450</td><td>ER level 4</td><td class="num">$3,800</td></tr>
              <tr><td>Rev 0320 / CPT 73100</td><td>Wrist X-ray, 2 views</td><td class="num">$420</td></tr>
              <tr><td>Rev 0320 / CPT 73110</td><td>Wrist X-ray, 3+ views</td><td class="num">$540</td></tr>
              <tr><td>Rev 0270</td><td>Med/surg supplies (splint)</td><td class="num">$310</td></tr>
              <tr><td>Rev 0250</td><td>Pharmacy (analgesia)</td><td class="num">$95</td></tr>
              <tr><td colspan="2"><strong>Total billed</strong></td><td class="num"><strong>$5,165</strong></td></tr>
            </tbody>
          </table>
        </div>

        <p>
          Pricing: Memorial is in-network. The contract is OPPS-based for outpatient hospital
          services — the ER visit prices through APC ${term("apc", "APCs")} keyed to the level-4 ER
          code (CPT 99284) plus packaged ancillaries. With ${term("opps")} packaging, the splint
          and pharmacy roll into the primary APC; only the X-rays are separately payable.
        </p>
        <p>The contract pays 145% of Medicare OPPS for facility services:</p>
        <ul>
          <li>APC 5024 (Level 4 ER) Medicare rate ≈ $475 → contract allowed = $475 × 1.45 = <strong>$688.75</strong></li>
          <li>APC 5521 (X-ray, 73100) Medicare rate ≈ $40 → contract allowed = $58.00</li>
          <li>APC 5522 (X-ray, 73110) Medicare rate ≈ $48 → contract allowed = $69.60</li>
          <li>Splint and pharmacy: <em>packaged</em> (status N), $0 separately payable.</li>
          <li><strong>Total facility allowed: $816.35</strong></li>
        </ul>
        <p>The hospital writes off $5,165 − $816.35 = <strong>$4,348.65</strong>.</p>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Claim 2: ER physician (out-of-network staffing company)</h3>
            <span class="claim-card-meta">CMS-1500 / 837P · POS 23</span>
          </div>
          <table>
            <thead><tr><th>Code</th><th>Description</th><th class="num">Charge</th></tr></thead>
            <tbody>
              <tr><td>CPT 99284</td><td>ED visit, level 4 (high complexity)</td><td class="num">$985</td></tr>
              <tr><td>CPT 25600</td><td>Closed treatment, distal radius fracture</td><td class="num">$1,250</td></tr>
              <tr><td>CPT 25600 / Mod -54</td><td>(Surgical care only — fracture care will be unbundled)</td><td class="num"></td></tr>
              <tr><td colspan="2"><strong>Total billed</strong></td><td class="num"><strong>$2,235</strong></td></tr>
            </tbody>
          </table>
        </div>

        <p>
          Here's where it gets interesting. The ED physician is out-of-network, but the
          ${term("nsa", "No Surprises Act")} (effective January 1, 2022) protects Sarah from
          balance billing for emergency services regardless of network status. The plan must:
        </p>
        <ol>
          <li>Compute the <strong>Qualifying Payment Amount (QPA)</strong> — the median in-network rate for these codes in this geographic area.</li>
          <li>Pay the provider that QPA (with a few specific exceptions).</li>
          <li>Apply Sarah's cost share <em>as if</em> the provider were in-network.</li>
          <li>Hold Sarah harmless from balance billing.</li>
        </ol>

        <p>QPA computation by code:</p>
        <ul>
          <li>99284 QPA ≈ $268 (median in-network for level-4 ED visit in this market)</li>
          <li>25600 QPA ≈ $385</li>
          <li><strong>Total ED physician allowed: $653</strong></li>
        </ul>

        <p>
          The provider received $653 from Sarah's plan and her cost share. They believe the rate
          is too low and dispute it through federal IDR. Sarah is held harmless throughout.
        </p>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Claim 3: Radiologist interpretation (in-network professional)</h3>
            <span class="claim-card-meta">CMS-1500 / 837P · POS 22</span>
          </div>
          <table>
            <thead><tr><th>Code</th><th>Description</th><th class="num">Charge</th></tr></thead>
            <tbody>
              <tr><td>CPT 73100 / Mod -26</td><td>Wrist X-ray interpretation, prof component</td><td class="num">$185</td></tr>
              <tr><td>CPT 73110 / Mod -26</td><td>Wrist X-ray interpretation, prof component</td><td class="num">$220</td></tr>
              <tr><td colspan="2"><strong>Total billed</strong></td><td class="num"><strong>$405</strong></td></tr>
            </tbody>
          </table>
        </div>

        <p>
          The X-rays were already paid on the facility claim (technical component). The
          radiologist who interpreted them bills separately for the professional component
          (mod -26). The contract: 130% of Medicare MPFS.
        </p>
        <ul>
          <li>73100-26 Medicare ≈ $9.15 → contract allowed = $11.90</li>
          <li>73110-26 Medicare ≈ $11.42 → contract allowed = $14.85</li>
          <li><strong>Total radiology allowed: $26.75</strong></li>
        </ul>

        <h2>Three days later: outpatient ORIF</h2>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Claim 4: ASC facility (in-network)</h3>
            <span class="claim-card-meta">UB-04 / 837I · TOB 831</span>
          </div>
          <table>
            <thead><tr><th>Code</th><th>Description</th><th class="num">Charge</th></tr></thead>
            <tbody>
              <tr><td>Rev 0490</td><td>ASC facility fee</td><td class="num">$8,400</td></tr>
              <tr><td>Rev 0270 / HCPCS</td><td>Internal fixation hardware (plate, screws)</td><td class="num">$3,200</td></tr>
              <tr><td>Rev 0250</td><td>Pharmacy (anesthesia drugs)</td><td class="num">$420</td></tr>
              <tr><td colspan="2"><strong>Total billed</strong></td><td class="num"><strong>$12,020</strong></td></tr>
            </tbody>
          </table>
        </div>

        <p>The contract methodology for the ASC facility is a <strong>case rate</strong> for ORIF distal radius (CPT 25607) of <strong>$3,800</strong>, with a hardware ${term("carve-out")} at invoice + 10%. The hardware invoice was $1,950, so the carve-out pays $1,950 × 1.10 = $2,145.</p>
        <ul>
          <li>Case rate: $3,800</li>
          <li>Implant carve-out: $2,145</li>
          <li><strong>Total ASC allowed: $5,945</strong></li>
        </ul>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Claim 5: Orthopedic surgeon (in-network)</h3>
            <span class="claim-card-meta">CMS-1500 / 837P · POS 24</span>
          </div>
          <table>
            <thead><tr><th>Code</th><th>Description</th><th class="num">Charge</th></tr></thead>
            <tbody>
              <tr><td>CPT 25607</td><td>ORIF distal radius, extra-articular</td><td class="num">$3,500</td></tr>
              <tr><td colspan="2"><strong>Total billed</strong></td><td class="num"><strong>$3,500</strong></td></tr>
            </tbody>
          </table>
        </div>
        <p>Surgeon contract: 140% of Medicare RBRVS. Code 25607 Medicare rate (POS 24, facility) ≈ $670. Contract allowed = $670 × 1.40 = <strong>$938</strong>. Triggers a 90-day ${term("global-period")}: any related E&amp;M during that window is bundled into this fee.</p>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Claim 6: Anesthesiologist (in-network)</h3>
            <span class="claim-card-meta">CMS-1500 / 837P · POS 24</span>
          </div>
          <table>
            <thead><tr><th>Code</th><th>Description</th><th class="num">Charge</th></tr></thead>
            <tbody>
              <tr><td>CPT 01840</td><td>Anesthesia for forearm surgery</td><td class="num">$1,400</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Anesthesia uses a different formula: (base units + time units) × ${term("anesthesia-cf")}.
          ASA code 01840 has 4 base units. Surgery took 90 minutes = 6 time units. Contract CF
          is $52/unit.
        </p>
        <div class="formula">(4 + 6) × $52 = $520 allowed</div>

        <h2>Putting it all together</h2>
        <p>The case generated six separate claims. Here's the rollup:</p>

        <div class="case-totals">
          <div class="case-totals-title">Case Totals</div>
          <table>
            <thead>
              <tr><th>Claim</th><th class="num">Billed</th><th class="num">Allowed</th><th class="num">Plan paid</th><th class="num">Sarah pays</th></tr>
            </thead>
            <tbody>
              <tr><td>1. ER facility (IN)</td><td class="num">$5,165.00</td><td class="num">$816.35</td><td class="num">$483.08</td><td class="num">$333.27</td></tr>
              <tr><td>2. ER physician (OON / NSA)</td><td class="num">$2,235.00</td><td class="num">$653.00</td><td class="num">$522.40</td><td class="num">$130.60</td></tr>
              <tr><td>3. Radiologist (IN)</td><td class="num">$405.00</td><td class="num">$26.75</td><td class="num">$21.40</td><td class="num">$5.35</td></tr>
              <tr><td>4. ASC facility (IN)</td><td class="num">$12,020.00</td><td class="num">$5,945.00</td><td class="num">$4,756.00</td><td class="num">$1,189.00</td></tr>
              <tr><td>5. Surgeon (IN)</td><td class="num">$3,500.00</td><td class="num">$938.00</td><td class="num">$750.40</td><td class="num">$187.60</td></tr>
              <tr><td>6. Anesthesia (IN)</td><td class="num">$1,400.00</td><td class="num">$520.00</td><td class="num">$416.00</td><td class="num">$104.00</td></tr>
              <tr class="total-row"><td>Total</td><td class="num">$24,725.00</td><td class="num">$8,899.10</td><td class="num">$6,949.28</td><td class="num">$1,949.82</td></tr>
            </tbody>
          </table>
        </div>

        <p>
          A simplified cost-share calculation: Sarah had $700 left on her deductible at the
          start of the case (already shown as $1,800 met of $2,500). The first ER claim consumes
          that $700, and from then on she's on coinsurance at 20% in-network. Her total
          out-of-pocket: <strong>$1,949.82</strong>. Plan paid: <strong>$6,949.28</strong>. Provider
          write-offs (billed minus allowed): <strong>$15,825.90</strong>.
        </p>

        <h2>What to notice</h2>
        <ol>
          <li><strong>One event, six billing entities.</strong> ER facility, ER physician, radiologist (interpreting the X-rays the facility took), ASC facility, surgeon, anesthesiologist. Each has its own contract and methodology.</li>
          <li><strong>The OON ED physician is invisible to Sarah.</strong> She walked into an in-network hospital. Without the No Surprises Act, the ED physician could have balance-billed her for the gap between $653 and their $2,235 charge — about $1,580 of surprise debt. The NSA blocks that.</li>
          <li><strong>Methodologies differ across claims in the same case.</strong> APC for ER facility, RBRVS for surgeon, anesthesia formula for the anesthesiologist, case rate + carve-out for the ASC. The pricing engine has to know which to apply for each claim and line.</li>
          <li><strong>Hardware drives a real chunk of the dollars.</strong> The implant carve-out alone is $2,145 — almost as much as the case rate itself. Without the carve-out, the ASC would have lost money on the case.</li>
          <li><strong>Billed and allowed bear no relationship.</strong> Sarah's billed total: $24,725. Allowed: $8,899. About 64% gets written off. Her out-of-pocket: $1,950 — a fraction of either number.</li>
          <li><strong>One claim, one DOS, but multiple effective dates can apply.</strong> The ER, radiology, and ortho surgery all happened in the same week, so the same contract version applies. If the surgery had crossed a fee-schedule update boundary (Jan 1), it could have priced differently.</li>
        </ol>

        <div class="key-takeaway">
          <div class="key-takeaway-title">The bigger picture</div>
          A "simple" broken wrist case touches: claim form anatomy, two clearinghouse paths
          (837P and 837I), three different reimbursement methodologies, the No Surprises Act,
          a 90-day global period, an implant carve-out, the lesser-of clause, deductible
          mechanics, and OOP max accumulation. If this much happens in one ER visit, imagine
          what a complex inpatient stay generates.
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this case</div>
          <div class="glossary-strip-terms">
            ${term("apc")} ${term("opps")} ${term("nsa")} ${term("balance-billing")}
            ${term("anesthesia-cf")} ${term("global-period")} ${term("carve-out")}
            ${term("modifier")} ${term("revenue-code")} ${term("case-rate")}
          </div>
        </div>
      </article>`;
  },
};
