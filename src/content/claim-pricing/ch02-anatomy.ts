import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "anatomy",
  title: "Anatomy of a Claim",
  subtitle: "Professional vs. institutional, and the codes that drive pricing.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Chapter 2 · Pricing Claims</span>
        <h1>Anatomy of a Claim</h1>
        <p class="chapter-subtitle">Professional vs. institutional, and the codes that drive pricing.</p>

        <p>
          There are two kinds of claims in US healthcare, and they look very different. If you
          can't tell them apart, nothing else will make sense.
        </p>

        <h2>Two claim types, two forms</h2>
        <table>
          <thead>
            <tr><th></th><th>Professional</th><th>Institutional</th></tr>
          </thead>
          <tbody>
            <tr><td>Who bills it</td><td>Physicians, NPs, PAs, professional groups, ASCs (sometimes)</td><td>Hospitals, SNFs, hospices, home health, dialysis centers</td></tr>
            <tr><td>Paper form</td><td>${term("cms-1500")}</td><td>${term("ub-04")} (a.k.a. CMS-1450)</td></tr>
            <tr><td>Electronic format</td><td>EDI 837P</td><td>EDI 837I</td></tr>
            <tr><td>Primary code system</td><td>${term("cpt")} / ${term("hcpcs")}</td><td>${term("revenue-code")} + HCPCS</td></tr>
            <tr><td>Bundle structure</td><td>Per line item (one CPT per line)</td><td>Per revenue line, often summarized for facility payment methodologies</td></tr>
          </tbody>
        </table>

        <p>
          The same hospitalization typically generates <em>both</em>: a UB-04 for the facility's
          services (the room, nursing, supplies, OR time) and one or more CMS-1500s for the
          professional fees (the surgeon, anesthesiologist, hospitalist, radiologist).
        </p>

        <h2>The codes that drive pricing</h2>

        <h3>${term("icd-10", "ICD-10-CM")} — diagnosis codes</h3>
        <p>
          Why was the patient there? Codes like <code>J06.9</code> (acute upper respiratory
          infection) or <code>S82.001A</code> (fracture of the right patella, initial encounter).
          For inpatient stays the principal diagnosis often drives ${term("drg", "DRG")} assignment.
          Procedure-side codes for inpatient use are ICD-10-PCS (a separate, much longer code set).
        </p>

        <h3>${term("cpt")} — procedure codes (professional)</h3>
        <p>
          Five-digit codes maintained by the AMA. <code>99213</code> is an established-patient
          office visit, <code>27447</code> is a total knee arthroplasty, <code>45378</code> is a
          diagnostic colonoscopy. Most professional reimbursement keys off CPT.
        </p>

        <h3>${term("hcpcs")} Level II — drugs, DME, supplies</h3>
        <p>
          Alphanumeric codes for things CPT doesn't cover. <code>J3490</code> is "unclassified
          drug"; <code>E0114</code> is "crutches, underarm, wood." Pricing for J-codes typically
          uses Average Sales Price (ASP) data plus a markup.
        </p>

        <h3>${term("modifier", "Modifiers")}</h3>
        <p>
          Two characters that change meaning or pricing. A few essentials:
        </p>
        <ul>
          <li><code>-25</code>: a separately identifiable E&amp;M service on the same day as a procedure</li>
          <li><code>-59</code>: a distinct procedural service (often used to defeat ${term("ncci")} bundling — and often abused)</li>
          <li><code>-50</code>: bilateral procedure (typically priced at 150%)</li>
          <li><code>-51</code>: multiple procedures (triggers multiple-procedure reduction)</li>
          <li><code>-26</code> / <code>-TC</code>: professional vs. technical component for diagnostic services like imaging</li>
        </ul>

        <h3>${term("revenue-code", "Revenue codes")} — institutional only</h3>
        <p>
          Four-digit codes on UB-04 identifying the cost center: <code>0250</code> pharmacy,
          <code>0450</code> ER, <code>0636</code> drugs requiring detailed coding,
          <code>0124</code> semi-private room (med-surg). Hospital pricing often hinges on
          revenue codes — a contract might say "ICU per diem applies to revenue codes 0200–0204."
        </p>

        <h3>${term("type-of-bill", "Type of bill")} — institutional only</h3>
        <p>
          Three-digit code identifying facility, classification, and frequency.
          <code>111</code> = inpatient hospital, admit-thru-discharge claim. The TOB is the
          first thing a payer looks at to decide which pricing methodology applies.
        </p>

        <h3>${term("ndc")} — drugs</h3>
        <p>
          11-digit identifier for a specific drug/strength/package, used alongside J-codes for
          office-administered drugs and on pharmacy claims.
        </p>

        <h3>${term("pos", "Place of service")} — professional only</h3>
        <p>
          Two-digit code: 11 office, 21 inpatient hospital, 22 on-campus outpatient, 23 ER,
          02 telehealth, etc. POS often determines which variant of the fee schedule applies
          (facility vs. non-facility).
        </p>

        <div class="callout">
          <div class="callout-title">Watch for</div>
          The same encounter can be coded multiple legitimate ways. Coders weigh documentation
          completeness, payer rules, and revenue impact. This is not fraud — it's optimization
          within the rules. Audits exist to catch the line where optimization crosses into fraud.
        </div>

        <h2>Putting it together: a sample 837P line</h2>
        <div class="formula">CPT 99214 · Modifier -25 · ICD-10 J06.9 · POS 11 · Charge $245.00</div>
        <p>
          That single line tells the payer: "Established patient, level-4 office visit, with a
          significant separately identifiable E&amp;M (probably also a procedure billed elsewhere
          on this claim), for an URI, in the office. We're charging $245." The payer will look up
          its fee schedule for 99214, apply modifier-25 logic, validate the diagnosis supports
          medical necessity, and produce an allowed amount.
        </p>

        <div class="key-takeaway">
          <div class="key-takeaway-title">Key takeaway</div>
          Professional and institutional are different worlds. The codes you see drive how
          pricing is computed. CPT/HCPCS for professional and outpatient pricing; revenue codes
          + type of bill for facility-side pricing.
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this chapter</div>
          <div class="glossary-strip-terms">
            ${term("cms-1500")} ${term("ub-04")} ${term("cpt")} ${term("hcpcs")}
            ${term("icd-10")} ${term("modifier")} ${term("revenue-code")}
            ${term("type-of-bill")} ${term("ndc")} ${term("pos")} ${term("ncci")}
            ${term("drg")}
          </div>
        </div>
      </article>`;
  },
};
