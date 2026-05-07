import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "anatomy",
  title: "Anatomy of a Provider Contract",
  subtitle: "What sections appear in every contract, and which ones move the money.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Chapter 2 · Contracts</span>
        <h1>Anatomy of a Provider Contract</h1>
        <p class="chapter-subtitle">What sections appear in every contract, and which ones move the money.</p>

        <p>
          A typical provider contract is 30–80 pages of definitions, exhibits, and clauses.
          Most of it is boilerplate. A handful of sections actually drive what gets paid. Knowing
          which is which lets you read a contract in 20 minutes instead of two hours.
        </p>

        <h2>The standard sections</h2>
        <table>
          <thead><tr><th>Section</th><th>What it covers</th><th>Money impact</th></tr></thead>
          <tbody>
            <tr><td>Parties &amp; Definitions</td><td>Who's signing, what terms mean.</td><td>Low — but watch for the definition of "Allowed Amount."</td></tr>
            <tr><td>Term &amp; Termination</td><td>Effective date, renewal, how to terminate.</td><td>Medium — auto-renewal vs. fixed term changes leverage at re-negotiation.</td></tr>
            <tr><td>Products / Lines of Business</td><td>Which plans this rate sheet applies to: Commercial, MA, Medicaid, Exchange, etc.</td><td>High — same provider often has different rates per LOB.</td></tr>
            <tr><td>Reimbursement Methodology</td><td>The pricing formula(s).</td><td>Highest — chapters 4–6.</td></tr>
            <tr><td>Fee Schedule Exhibit</td><td>The rate sheet (or pointer to one).</td><td>Highest.</td></tr>
            <tr><td>Covered Services</td><td>What's in scope, what's excluded.</td><td>High — exclusions can quietly remove a whole revenue line.</td></tr>
            <tr><td>Carve-outs / Special Pricing</td><td>Implants, drugs, transplants, behavioral, ASC, etc.</td><td>High — chapter 7.</td></tr>
            <tr><td>Stop-loss / Outlier provisions</td><td>What happens on extreme cases.</td><td>High for hospital contracts, especially per-diem.</td></tr>
            <tr><td>Operational obligations</td><td>Timely filing, claim submission rules, audit rights, documentation.</td><td>Medium — chapter 11.</td></tr>
            <tr><td>Member Protection</td><td>No balance billing, hold-harmless clauses.</td><td>Medium — protects the deal but doesn't change rates.</td></tr>
            <tr><td>Dispute Resolution</td><td>Internal review, arbitration, governing law.</td><td>Low day-to-day, high during disputes.</td></tr>
            <tr><td>Amendments</td><td>How the contract can be changed mid-term.</td><td>High — most-favored-nation and unilateral-amendment clauses are notorious.</td></tr>
            <tr><td>Most-Favored-Nation</td><td>Provider must give payer rates as good as any other payer's. Mostly banned now in many states.</td><td>High historically; rare in new contracts.</td></tr>
          </tbody>
        </table>

        <h2>The key clauses to read carefully</h2>

        <h3>Definition of "Allowed Amount"</h3>
        <p>
          Look for ${term("lesser-of")} language: "the lesser of (a) Provider's Billed Charge
          or (b) the Contracted Rate." Without it, providers can sometimes collect contracted
          rates that exceed billed (rare but possible).
        </p>

        <h3>Fee schedule reference</h3>
        <p>
          Is it pegged to a Medicare year ("the CMS National Physician Fee Schedule effective
          for dates of service on or after January 1, 2024") or a frozen snapshot? If frozen,
          rates don't change unless the contract is renegotiated, regardless of CMS updates.
        </p>

        <h3>Effective date and term</h3>
        <p>
          When does each rate apply? Effective dates are typically tied to <em>date of service</em>,
          not date of submission. A claim with a January DOS submitted in March still uses
          January's rates. Contracts can have different effective dates per service line.
        </p>

        <h3>Evergreen vs. sunset</h3>
        <p>
          Evergreen contracts auto-renew indefinitely with N-day notice for termination. Sunset
          contracts expire at a fixed date. Evergreen is more common but creates lazy
          re-negotiation. Sunset forces a real renewal conversation but creates network-disruption risk.
        </p>

        <h3>Unilateral amendment clauses</h3>
        <p>
          Some payer contracts let the payer amend the rate sheet unilaterally with N-day notice.
          Provider must accept or terminate. Provider-friendly contracts require bilateral
          agreement on amendments.
        </p>

        <h3>Timely filing</h3>
        <p>
          The window in which the provider must submit a claim — often 90 to 365 days from DOS.
          Late claims are denied with a finality that's hard to appeal. Long-running litigation
          or COB delays can push a claim past timely filing if not carefully tracked.
        </p>

        <h3>Audit and recoupment rights</h3>
        <p>
          How long can the payer audit and demand repayment? Typically 12–24 months, sometimes
          longer for fraud. State law often sets floors. Provider-friendly contracts limit
          look-back windows.
        </p>

        <h3>Termination</h3>
        <p>
          Termination types matter:
        </p>
        <ul>
          <li><strong>Without cause</strong> — either party can end the contract with N-day notice (often 90–180 days). Used in re-negotiations.</li>
          <li><strong>For cause</strong> — material breach, immediate or with cure period.</li>
          <li><strong>Continuity of care</strong> — even after termination, ongoing treatment of certain members must continue at contract rates.</li>
        </ul>

        <h2>Exhibits matter as much as the body</h2>
        <p>
          Most of the actual money lives in exhibits — the fee schedule attachments, carve-out
          tables, performance metrics, and product matrices. The body is contract law; the
          exhibits are pricing engineering. When a real provider negotiates, the haggling is
          almost entirely about what's in the exhibits.
        </p>

        <div class="callout callout-good">
          <div class="callout-title">A practical reading order</div>
          1. Reimbursement methodology section.<br>
          2. Fee schedule exhibits.<br>
          3. Carve-out / special pricing exhibits.<br>
          4. Definition of "Allowed Amount" and "Billed Charge."<br>
          5. Term, termination, and amendment sections.<br>
          6. Everything else, only as needed.
        </div>

        <div class="key-takeaway">
          <div class="key-takeaway-title">Key takeaway</div>
          Contracts have a predictable shape. The reimbursement methodology section and the
          fee schedule exhibits drive the dollars. Definitions, term, and amendment clauses
          drive the leverage. Most other sections are boilerplate — useful in disputes,
          quiet day to day.
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this chapter</div>
          <div class="glossary-strip-terms">
            ${term("lesser-of")} ${term("fee-schedule")} ${term("carve-out")} ${term("stop-loss")}
          </div>
        </div>
      </article>`;
  },
};
