import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "lisa-maternity",
  title: "Lisa's Pregnancy & Delivery",
  subtitle: "9 months of prenatal care, a C-section, and an unexpected NICU stay.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Case File 3 · Pricing Claims</span>
        <h1>Lisa's Pregnancy &amp; Delivery</h1>
        <p class="chapter-subtitle">9 months of prenatal care, a C-section, and an unexpected NICU stay.</p>

        <div class="case-meta">
          <div class="case-meta-item">
            <span class="case-meta-label">Patient</span>
            <span class="case-meta-value">Lisa, 31, with husband Tom and now baby Ava</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-label">Plan</span>
            <span class="case-meta-value">HDHP family plan via employer</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-label">Family deductible</span>
            <span class="case-meta-value">$6,000 aggregate (non-embedded)</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-label">Family OOP max</span>
            <span class="case-meta-value">$12,000</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-label">Coinsurance</span>
            <span class="case-meta-value">20% in-network after deductible</span>
          </div>
          <div class="case-meta-item">
            <span class="case-meta-label">HSA balance</span>
            <span class="case-meta-value">$3,200 starting</span>
          </div>
        </div>

        <h2>The structure of maternity claims</h2>
        <p>
          Maternity is the most counter-intuitive area of healthcare billing for first-time
          parents. The reason: the OB practice usually bills a <strong>global maternity package</strong>
          — a single CPT code (59400 for vaginal delivery, 59510 for C-section) that covers
          most of pregnancy, the delivery, and routine postpartum care, all for one bundled fee.
          Many of the prenatal visits Lisa attends generate <em>no separate claim</em> at the
          time. The OB office submits one big claim after delivery.
        </p>
        <p>
          Things <em>not</em> in the global package:
        </p>
        <ul>
          <li>Initial pregnancy diagnosis visit (often before global care begins)</li>
          <li>Lab work (separate fee schedule)</li>
          <li>Ultrasounds (separate CPT codes per study)</li>
          <li>Non-routine antepartum care (e.g., gestational diabetes management, growth scans)</li>
          <li>Hospital facility fees for delivery (separate UB-04)</li>
          <li>Anesthesia for delivery (separate professional claim)</li>
          <li>The baby's claims (entirely separate)</li>
          <li>Pediatrician hospital visits to the newborn</li>
        </ul>

        <h2>Phase 1: Prenatal care (months 1–9)</h2>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">First positive test visit (week 6)</h3>
            <span class="claim-card-meta">CMS-1500 · POS 11</span>
          </div>
          <p>CPT 99213 (established patient office visit) — pregnancy isn't yet "on the books." Allowed: <strong>$112</strong>. Counts toward deductible.</p>
        </div>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Initial OB visit (week 10)</h3>
            <span class="claim-card-meta">CMS-1500 · POS 11</span>
          </div>
          <p>OB confirms pregnancy. <em>This visit and most subsequent prenatal visits don't generate separate claims</em> — they roll into the global maternity package code that gets billed at delivery.</p>
        </div>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Prenatal labs (multiple visits)</h3>
            <span class="claim-card-meta">CMS-1500 · POS 11</span>
          </div>
          <p>OB orders standard prenatal panel: CBC, blood typing, antibody screen, rubella, HepB, HIV, syphilis, urinalysis. Plus a glucose tolerance test at 26 weeks. Each lab is paid under CLFS.</p>
          <ul>
            <li>Initial prenatal panel: ~$165</li>
            <li>Repeat CBC (3 times during pregnancy): ~$30</li>
            <li>Glucose tolerance test (1-hour): $32</li>
            <li>Glucose tolerance test (3-hour, after positive 1-hour): $58</li>
            <li>Group B Strep screen (week 36): $42</li>
            <li><strong>Total labs allowed: ~$327</strong></li>
          </ul>
          <p>
            <strong>Note</strong>: standard prenatal labs are an ACA-mandated essential health
            benefit and are typically <em>preventive</em> — covered at $0 cost share before
            deductible. The 3-hour glucose tolerance test (after a positive screening) might be
            classified as diagnostic and subject to deductible/coinsurance, depending on the
            plan's benefit design.
          </p>
        </div>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Ultrasounds</h3>
            <span class="claim-card-meta">CMS-1500 · POS 11</span>
          </div>
          <p>
            Two routine ultrasounds: dating (week 8) and anatomy scan (week 20). Each is CPT
            76801 / 76805 — separately payable, not in the global. Plus a third growth scan
            ordered at week 36 because Lisa's measuring small.
          </p>
          <ul>
            <li>76801 (dating, &lt;14 weeks): allowed ~$140</li>
            <li>76805 (anatomy, ≥14 weeks): allowed ~$165</li>
            <li>76816 (follow-up growth): allowed ~$95</li>
            <li><strong>Total US allowed: ~$400</strong></li>
          </ul>
        </div>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">NIPT (cell-free DNA prenatal screening)</h3>
            <span class="claim-card-meta">CMS-1500 · POS 81 (lab)</span>
          </div>
          <p>
            CPT 81420. Plan covers it as a preventive service for women over 35 or high-risk;
            for a low-risk 31-year-old like Lisa, it might require self-pay or partial coverage.
            Allowed (when covered): <strong>$249</strong> (lab pricing varies wildly).
          </p>
        </div>

        <h2>Phase 2: The delivery</h2>

        <p>
          At week 39, Lisa goes into labor. After 18 hours, the baby's heart rate becomes
          non-reassuring. Her OB calls a C-section. Surgery proceeds without complications, but
          baby Ava is born with low Apgar scores and is admitted to the NICU for 4 days for
          observation and bilirubin treatment.
        </p>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">OB global maternity package (CPT 59510)</h3>
            <span class="claim-card-meta">CMS-1500 · POS 21 (DOS = delivery date)</span>
          </div>
          <p>
            CPT 59510: routine OB care + C-section + postpartum care. Single billed line
            covering all the prenatal visits, the delivery, and the routine postpartum visits.
          </p>
          <ul>
            <li>Billed: $7,800</li>
            <li>Contract: 130% of Medicare → $4,300 × 1.30 ≈ <strong>$5,590 allowed</strong></li>
          </ul>
          <p>
            If the OB had been a different physician or had transferred care mid-pregnancy, the
            global wouldn't apply and individual prenatal visits, delivery, and postpartum
            visits would each generate their own claims.
          </p>
        </div>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Hospital — Lisa's labor &amp; delivery stay (3 days)</h3>
            <span class="claim-card-meta">UB-04 · TOB 111</span>
          </div>
          <p>
            Hospital contract uses a <strong>case rate for cesarean delivery</strong>:
            <strong>$13,500</strong> all-inclusive, with a complications carve-out (n/a here)
            and a separate NICU per-diem (a separate claim, see next).
          </p>
        </div>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Anesthesiologist (epidural + C-section anesthesia)</h3>
            <span class="claim-card-meta">CMS-1500 · POS 21</span>
          </div>
          <p>
            Epidural placement (CPT 01967) and conversion to surgical anesthesia for C-section
            (CPT 01968 add-on). Special "OB anesthesia" units. Allowed: <strong>~$890</strong>.
          </p>
        </div>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Hospital — baby Ava's NICU stay (4 days, separate claim)</h3>
            <span class="claim-card-meta">UB-04 · TOB 111 · separate member ID once enrolled</span>
          </div>
          <p>
            NICU is carved out from the maternity case rate. The hospital contract has a
            tiered NICU per-diem:
          </p>
          <ul>
            <li>NICU Level II per-diem: <strong>$3,400/day × 4 = $13,600</strong></li>
            <li>Phototherapy / billi lights packaged into per-diem: $0 separate</li>
            <li><strong>Total NICU allowed: $13,600</strong></li>
          </ul>
          <p>
            Important: the hospital sees Ava as a separate "patient" for billing purposes. The
            family must enroll Ava in the plan within 30 days of birth (HIPAA special enrollment
            event). Until enrolled, the NICU charges accumulate; once enrolled with retroactive
            date-of-birth coverage, they adjudicate against Ava's coverage. <em>Forgetting to
            enroll the baby is a leading cause of unexpected huge bills.</em>
          </p>
        </div>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Pediatrician — newborn hospital visits (Ava)</h3>
            <span class="claim-card-meta">CMS-1500 · POS 21</span>
          </div>
          <p>
            Initial newborn evaluation (CPT 99460), subsequent newborn care (99462 × 3 days),
            discharge day visit (99463). All in Ava's name on her own claim.
          </p>
          <ul>
            <li>Total ped pro fees allowed: <strong>~$420</strong></li>
          </ul>
        </div>

        <div class="claim-card">
          <div class="claim-card-header">
            <h3 class="claim-card-title">Neonatologist — NICU professional fees (Ava)</h3>
            <span class="claim-card-meta">CMS-1500 · POS 21</span>
          </div>
          <p>
            The neonatologist who oversees Ava's NICU care bills professionally (CPT 99477,
            99478) for each day. Allowed: <strong>~$1,160</strong> over 4 days.
          </p>
        </div>

        <h2>Phase 3: Postpartum (weeks 1–6 post-delivery)</h2>

        <p>
          The 6-week postpartum visit is included in the global maternity package — no separate
          claim. Lisa's baby blues progressing to mild depression results in a behavioral health
          visit not in the global. CPT 99213 + behavioral assessment add-on, allowed
          <strong>~$145</strong>.
        </p>
        <p>
          Ava's first newborn pediatric visit (week 1) is a preventive well-child visit (CPT
          99381) — covered at 100% with no cost share, $0 to the family. Several more well-baby
          visits over the next year: same.
        </p>

        <h2>Putting it all together</h2>

        <div class="case-totals">
          <div class="case-totals-title">Lisa's Pregnancy &amp; Delivery — Family Totals</div>
          <table>
            <thead>
              <tr><th>Item</th><th>Method</th><th class="num">Allowed</th></tr>
            </thead>
            <tbody>
              <tr><td>Initial pregnancy visit (Lisa)</td><td>RBRVS</td><td class="num">$112</td></tr>
              <tr><td>Prenatal labs</td><td>CLFS</td><td class="num">$327</td></tr>
              <tr><td>Ultrasounds (3 studies)</td><td>RBRVS</td><td class="num">$400</td></tr>
              <tr><td>NIPT (lab)</td><td>CLFS</td><td class="num">$249</td></tr>
              <tr><td>OB global maternity (59510)</td><td>Global package</td><td class="num">$5,590</td></tr>
              <tr><td>Hospital case rate for C-section</td><td>Case rate</td><td class="num">$13,500</td></tr>
              <tr><td>Anesthesia (OB)</td><td>Anesthesia formula</td><td class="num">$890</td></tr>
              <tr><td>NICU 4-day per-diem (Ava)</td><td>Per-diem with carve-out</td><td class="num">$13,600</td></tr>
              <tr><td>Pediatrician hospital visits (Ava)</td><td>RBRVS</td><td class="num">$420</td></tr>
              <tr><td>Neonatologist NICU (Ava)</td><td>RBRVS</td><td class="num">$1,160</td></tr>
              <tr><td>Postpartum behavioral health (Lisa)</td><td>RBRVS</td><td class="num">$145</td></tr>
              <tr class="total-row"><td>Total allowed</td><td></td><td class="num">$36,393</td></tr>
            </tbody>
          </table>
        </div>

        <h2>The cost-share math</h2>
        <p>
          The family had a $6,000 aggregate deductible (non-embedded — meaning the whole family
          deductible has to be met before any benefits apply). Most of the prenatal labs are
          preventive at $0 cost share. The other claims accumulate against the deductible.
        </p>

        <p>
          By the time the hospital case rate adjudicates, the family has hit deductible. From
          there, 20% coinsurance applies until OOP max ($12,000). The hospital + NICU + neonatology
          claims push the family across the OOP max threshold quickly.
        </p>

        <table>
          <thead><tr><th>Phase</th><th class="num">Family pays</th><th class="num">Plan pays</th></tr></thead>
          <tbody>
            <tr><td>Pre-delivery (deductible building)</td><td class="num">~$1,000</td><td class="num">~$70 (preventive labs)</td></tr>
            <tr><td>Hospital + NICU + delivery (deductible + coins to OOP max)</td><td class="num">~$11,000</td><td class="num">~$22,500</td></tr>
            <tr><td>Post-OOP-max care (PT, well visits, ped follow-up)</td><td class="num">$0</td><td class="num">~$1,800</td></tr>
            <tr class="total-row"><td><strong>Family total OOP for the year</strong></td><td class="num"><strong>~$12,000 (capped)</strong></td><td class="num"><strong>~$24,400</strong></td></tr>
          </tbody>
        </table>

        <p>
          The family's HSA covers ~$3,200 of the OOP, leaving ~$8,800 to come from cash. A
          significant financial event for most families.
        </p>

        <h2>What to notice</h2>
        <ol>
          <li><strong>Most prenatal visits don't generate claims at the time.</strong> The global maternity package collapses 12+ visits into a single CPT billed at delivery. New parents who expect a flurry of EOBs through pregnancy are confused — most arrive after delivery.</li>
          <li><strong>The baby's claims are separate.</strong> Once Ava is born, anything that touches her — pediatrician, NICU, neonatologist — bills under her name. The family has to <em>enroll the baby on the plan within the special enrollment window</em>, retroactive to date of birth. Forget that step and the family is liable for Ava's claims at the OON / no-coverage rate.</li>
          <li><strong>NICU is a per-diem carve-out.</strong> Most maternity contracts don't include NICU in the case rate. NICU days carry their own per-diem at much higher tiered rates. Three different intensity levels (II, III, IV).</li>
          <li><strong>Preventive vs. diagnostic distinctions matter.</strong> Routine prenatal labs are preventive at $0 cost-share. A 3-hour glucose tolerance test triggered by a positive 1-hour might be diagnostic, with deductible/coins applying. The same lab can land in different buckets depending on indication.</li>
          <li><strong>Aggregate vs. embedded family deductibles.</strong> Lisa's plan is HDHP with a $6,000 aggregate deductible — non-embedded — so the family had to hit the entire $6,000 before the plan paid anything (other than preventive). An embedded family plan would have had a $3,000 individual deductible inside the family deductible, possibly easing earlier exposure.</li>
          <li><strong>OOP max is the saving grace.</strong> Without the $12,000 family OOP max, this case would have generated $36,393 of allowed amounts with the family paying 20% × $36,393 (after deductible) = ~$7,278 + $6,000 deductible = ~$13,278. The cap saves them ~$1,300, and more importantly caps the worst-case financial exposure.</li>
        </ol>

        <div class="key-takeaway">
          <div class="key-takeaway-title">The bigger picture</div>
          A pregnancy generates one of the most varied claim portfolios in healthcare: global
          packages, separately payable labs and imaging, multiple facility billings, multiple
          professional billings, two patients (mom and baby) with different policy logic, and
          benefit features (preventive vs. diagnostic, embedded vs. aggregate, OOP max) that
          all matter to the final bill. It's a worked-example of how the system's pieces
          interact in practice.
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this case</div>
          <div class="glossary-strip-terms">
            ${term("case-rate")} ${term("per-diem")} ${term("carve-out")} ${term("deductible")}
            ${term("oop-max")} ${term("embedded-deductible")} ${term("anesthesia-cf")}
          </div>
        </div>
      </article>`;
  },
};
