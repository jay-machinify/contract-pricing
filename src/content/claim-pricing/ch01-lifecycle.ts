import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "lifecycle",
  title: "The Claim Lifecycle",
  subtitle: "Who the players are, and how a service becomes a payment.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Chapter 1 · Pricing Claims</span>
        <h1>The Claim Lifecycle</h1>
        <p class="chapter-subtitle">${this.subtitle}</p>

        <p>
          A medical claim is a structured request from a provider to a payer for money owed for
          services rendered. Before any pricing math happens, you need a mental model of who's
          involved and how the request actually moves between them. The whole industry is built
          on top of this loop.
        </p>

        <h2>The four players</h2>
        <ul>
          <li><strong>Member</strong> (also "patient", "subscriber", "enrollee"): the human who receives care and is covered by a health plan.</li>
          <li><strong>Provider</strong>: the clinician, group, hospital, ASC, lab, or DME supplier rendering the service.</li>
          <li><strong>${term("payer")}</strong>: the entity financially responsible — a commercial insurer, a self-insured employer plan (administered by a TPA), Medicare, a Medicaid MCO, an MA plan.</li>
          <li><strong>${term("clearinghouse")}</strong>: the middleware that scrubs and routes electronic claims between providers and payers (Change Healthcare, Availity, etc.). Solves the N×M integration problem.</li>
        </ul>

        <h2>The journey of a claim</h2>
        <p>
          Here's the canonical end-to-end flow for a single visit. Memorize this — every other
          chapter is a deeper zoom on one of these steps.
        </p>

        <ol>
          <li><strong>Eligibility check</strong> — Before service, the provider's office often verifies the member is active on the plan, what the cost-sharing looks like, and whether prior authorization is needed.</li>
          <li><strong>Service delivery</strong> — Care is rendered. The provider documents diagnoses (${term("icd-10")}) and procedures (${term("cpt")} / ${term("hcpcs")}).</li>
          <li><strong>Claim creation</strong> — Coding staff (or software) translates the visit into a structured claim: a ${term("cms-1500", "CMS-1500")} for professional services or a ${term("ub-04")} for institutional services.</li>
          <li><strong>Submission</strong> — The provider transmits the claim electronically as an ${term("edi-837", "EDI 837")} (837P professional, 837I institutional) through a clearinghouse to the payer.</li>
          <li><strong>${term("adjudication")}</strong> — The payer runs the claim through eligibility, coding edits, contract pricing, benefit application, and COB. Output: an allowed amount, plan-paid, and member-responsibility split.</li>
          <li><strong>Remittance</strong> — The payer sends an ${term("edi-835", "EDI 835")} (also called an ${term("era", "ERA")}) back to the provider, line-by-line, and an ${term("eob")} to the member.</li>
          <li><strong>Payment</strong> — Money moves: payer ACHs the plan-paid amount to the provider; the provider bills the member for any cost-sharing.</li>
          <li><strong>Patient billing &amp; AR</strong> — The provider posts payments, sends a statement to the member, and chases unpaid balances.</li>
        </ol>

        <div class="callout callout-good">
          <div class="callout-title">Mental model</div>
          A claim is a <em>request</em>. The 835/EOB is the <em>response</em>. Everything that happens in
          between — coding, pricing, benefit logic, COB — is the payer's adjudication engine
          deciding what the right answer is.
        </div>

        <h2>Money flows three ways</h2>
        <p>
          Once adjudication is done, the dollars split into three buckets:
        </p>

        <table>
          <thead><tr><th>Bucket</th><th>Who pays</th><th>What it means</th></tr></thead>
          <tbody>
            <tr><td>Plan-paid</td><td>Payer → Provider</td><td>The payer's portion of the ${term("allowed-amount")}.</td></tr>
            <tr><td>Member responsibility</td><td>Member → Provider</td><td>Deductible + copay + coinsurance.</td></tr>
            <tr><td>${term("write-off")}</td><td>Provider absorbs</td><td>The gap between billed charge and allowed amount; cannot be billed to member when in-network.</td></tr>
          </tbody>
        </table>

        <h2>Why this matters</h2>
        <p>
          The bulk of value in a healthcare pricing system lives at step 5 — the adjudication.
          But the data shape that flows in (the 837), the contracts that drive pricing (chapters 4–8),
          and the member benefits that determine cost-sharing (chapter 9) all need to mesh perfectly.
          A break anywhere in the pipeline shows up as either a denial, an underpayment, or an
          unhappy member who got an unexpected bill.
        </p>

        <div class="key-takeaway">
          <div class="key-takeaway-title">Key takeaway</div>
          The lifecycle is a request/response loop. Provider sends 837. Payer adjudicates. Payer
          replies with 835/EOB. The chapters that follow drill into each step.
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this chapter</div>
          <div class="glossary-strip-terms">
            ${term("payer")}
            ${term("clearinghouse")}
            ${term("cpt")}
            ${term("hcpcs")}
            ${term("icd-10")}
            ${term("cms-1500")}
            ${term("ub-04")}
            ${term("edi-837")}
            ${term("edi-835")}
            ${term("eob")}
            ${term("era")}
            ${term("adjudication")}
            ${term("allowed-amount")}
            ${term("write-off")}
          </div>
        </div>
      </article>`;
  },
};
