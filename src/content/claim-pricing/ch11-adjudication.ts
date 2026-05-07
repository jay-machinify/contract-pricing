import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "adjudication",
  title: "End-to-End Adjudication",
  subtitle: "Putting it all together — what a claims engine actually does.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Chapter 11 · Pricing Claims</span>
        <h1>End-to-End Adjudication</h1>
        <p class="chapter-subtitle">Putting it all together — what a claims engine actually does.</p>

        <p>
          You now know all the parts. ${term("adjudication")} is the pipeline that strings them
          together. Every commercial payer's engine has roughly the same shape; the differences
          live in implementation quality and configuration.
        </p>

        <h2>The pipeline</h2>
        <ol>
          <li><strong>Intake &amp; format validation</strong> — parse the 837, validate required loops/segments, reject malformed claims back to the clearinghouse.</li>
          <li><strong>Member matching</strong> — find the member record in the eligibility system. Mis-matched IDs cause "member not found" denials.</li>
          <li><strong>Eligibility</strong> — was the member active on the date of service? Coverage type, plan ID, group ID, segment.</li>
          <li><strong>Provider matching</strong> — is the rendering/billing provider known? In or out of network? What contract applies?</li>
          <li><strong>Authorization check</strong> — was prior auth required, and was it obtained? Some services auto-deny without auth.</li>
          <li><strong>Coding edits</strong> — NCCI, MUE, custom payer edits. Deny lines that fail.</li>
          <li><strong>Contract pricing</strong> — apply the contract methodology (fee schedule, DRG, APC, per diem, etc.) to compute line-level allowed amounts.</li>
          <li><strong>Modifier/MPPR/global-period adjustments</strong> — adjust within the contract framework.</li>
          <li><strong>Lesser-of</strong> — cap allowed at billed for any line where applicable.</li>
          <li><strong>Benefit application</strong> — split allowed between plan and member using deductible / copay / coinsurance / OOP max.</li>
          <li><strong>Accumulator updates</strong> — increment deductible-met, OOP-met.</li>
          <li><strong>${term("cob", "COB")}</strong> — if other coverage exists, route to primary first or apply secondary logic.</li>
          <li><strong>Final check</strong> — run summary edits (totals reconcile, no negative payments, etc.).</li>
          <li><strong>Adjudicate to status</strong> — APPROVED, DENIED, PEND, PARTIAL, etc.</li>
          <li><strong>Generate 835 / EOB</strong> — line-by-line CARC/RARC codes plus dollar amounts.</li>
          <li><strong>Disburse payment</strong> — ACH or check to provider; statements to members.</li>
        </ol>

        <h2>Try it yourself</h2>
        <p>Step through three real-ish scenarios and watch each phase fire:</p>

        <div data-calc="adjudication-sim"></div>

        <h2>Claim statuses (simplified)</h2>
        <table>
          <thead><tr><th>Status</th><th>Meaning</th></tr></thead>
          <tbody>
            <tr><td>Accepted</td><td>Format valid; in queue for adjudication.</td></tr>
            <tr><td>Pended</td><td>Held for human review — missing info, audit, suspect coding.</td></tr>
            <tr><td>Approved / Paid</td><td>Adjudicated and disbursed.</td></tr>
            <tr><td>Partial pay</td><td>Some lines paid, some denied.</td></tr>
            <tr><td>Denied</td><td>Adjudicated to $0; CARC explains why.</td></tr>
            <tr><td>Rejected</td><td>Failed format/eligibility upfront; no adjudication occurred.</td></tr>
            <tr><td>Voided / Reversed</td><td>Earlier payment reversed; often paired with a corrected claim.</td></tr>
          </tbody>
        </table>

        <h2>Denials and appeals</h2>
        <p>
          Denials come in different flavors:
        </p>
        <ul>
          <li><strong>Hard denial</strong> — adjudicated to $0; provider must appeal or write off.</li>
          <li><strong>Soft denial</strong> — request for additional information; can be cured by submitting docs.</li>
          <li><strong>Authorization denial</strong> — pre-auth missing or expired; sometimes appealable.</li>
          <li><strong>Medical necessity denial</strong> — payer disagrees that the service was needed; clinical appeal with documentation.</li>
          <li><strong>Coding denial</strong> — code combination violates edits; corrected claim often resolves.</li>
        </ul>
        <p>
          Appeal pathways: first-level appeal (internal), second-level (often external review),
          and for ERISA plans, ultimately federal court. State-regulated plans have state-level
          external review. Medicare Advantage has its own appeal hierarchy ending at the
          Medicare Appeals Council. The NSA created a separate IDR pathway specifically for
          rate disputes on out-of-network emergency / ancillary care.
        </p>

        <h2>Retro adjustments</h2>
        <p>
          Adjudication isn't always one-and-done. Common reasons claims re-adjudicate later:
        </p>
        <ul>
          <li>Eligibility correction — member was actually inactive, retro term.</li>
          <li>Other coverage discovered — primary payer turns out to have been someone else.</li>
          <li>Audit recovery — payer claws back overpayment.</li>
          <li>Contract amendment effective retroactively — re-price all claims in the period.</li>
          <li>Provider correction — corrected claim with different codes.</li>
        </ul>

        <h2>What "good" looks like</h2>
        <p>
          A high-quality claims engine:
        </p>
        <ul>
          <li>Adjudicates 90%+ of claims auto-finalized (no human touch) on first pass.</li>
          <li>Stores enough metadata to fully re-price any historical claim.</li>
          <li>Treats claim ordering as deterministic (date of service, then received timestamp, then claim ID).</li>
          <li>Surfaces clear denial reasons (CARC + RARC + plain-English message on EOB).</li>
          <li>Handles retro reprocessing without losing audit trail.</li>
        </ul>

        <div class="key-takeaway">
          <div class="key-takeaway-title">Key takeaway</div>
          Adjudication is a pipeline. The pieces are everything you've learned in chapters 1–10:
          eligibility, edits, contract pricing, benefits, COB. The last 10% — denial reasoning,
          appeals, retro adjustments — is where engines distinguish themselves.
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this chapter</div>
          <div class="glossary-strip-terms">
            ${term("adjudication")} ${term("carc")} ${term("rarc")} ${term("cob")} ${term("nsa")}
          </div>
        </div>
      </article>`;
  },
};
