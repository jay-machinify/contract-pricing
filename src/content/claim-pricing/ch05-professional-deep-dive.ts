import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "professional-deep-dive",
  title: "Professional Pricing Deep Dive",
  subtitle: "Modifiers, bundling, multiple-procedure reductions, and edits.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Chapter 5 · Pricing Claims</span>
        <h1>Professional Pricing Deep Dive</h1>
        <p class="chapter-subtitle">Modifiers, bundling, multiple-procedure reductions, and edits.</p>

        <p>
          The fee schedule gives you a starting allowed amount per code. Then a bunch of
          adjustment rules pile on. Get these wrong and either the provider gets underpaid or
          the payer pays for things they shouldn't. Most pricing-engine bugs live in this
          chapter.
        </p>

        <h2>Modifier-driven pricing changes</h2>
        <table>
          <thead><tr><th>Modifier</th><th>Meaning</th><th>Pricing impact</th></tr></thead>
          <tbody>
            <tr><td><code>-50</code></td><td>Bilateral procedure</td><td>Typically 150% of unilateral fee schedule.</td></tr>
            <tr><td><code>-51</code></td><td>Multiple procedures</td><td>Triggers MPPR — see below.</td></tr>
            <tr><td><code>-52</code></td><td>Reduced services</td><td>Payer-specific; often a % reduction from full fee.</td></tr>
            <tr><td><code>-53</code></td><td>Discontinued procedure</td><td>Reduced payment, often 25–50%.</td></tr>
            <tr><td><code>-26</code></td><td>Professional component (radiology, path)</td><td>Pays only the interpreting physician's portion.</td></tr>
            <tr><td><code>-TC</code></td><td>Technical component</td><td>Pays only the equipment/tech portion. -26 + -TC = full global fee.</td></tr>
            <tr><td><code>-25</code></td><td>Significant separately identifiable E&amp;M same day as a procedure</td><td>Allows the E&amp;M to bypass the procedural bundling.</td></tr>
            <tr><td><code>-59</code></td><td>Distinct procedural service</td><td>Defeats ${term("ncci")} bundling. Heavily scrutinized.</td></tr>
            <tr><td><code>-XS / -XE / -XP / -XU</code></td><td>More specific subcategories of -59 (CMS preference)</td><td>Same effect as -59 but more auditable.</td></tr>
          </tbody>
        </table>

        <h2>Multiple Procedure Payment Reduction (MPPR)</h2>
        <p>
          When a surgeon does multiple procedures in the same session, the marginal cost of the
          second one is lower (already prepped, scrubbed, in the room). Medicare reflects this:
        </p>
        <ul>
          <li>Highest-priced procedure: 100% of fee schedule</li>
          <li>Each additional procedure (with -51 modifier): 50% of fee schedule</li>
        </ul>
        <p>
          MPPR rules vary by family of services. Diagnostic imaging has its own variant.
          Endoscopy uses a "base value" subtraction approach. The pricing engine needs to know
          which family it's in.
        </p>

        <h2>${term("ncci", "NCCI")} edits</h2>
        <p>
          The National Correct Coding Initiative publishes <em>edit pairs</em> — combinations
          of codes that shouldn't be billed together because one already includes the other.
          Examples:
        </p>
        <ul>
          <li>A comprehensive code plus a component code → the component is denied.</li>
          <li>"Mutually exclusive" pairs (you can't do both at once) → one denies.</li>
          <li>Modifier <code>-59</code> (or the X-modifiers) can override an edit if documentation supports a distinct service.</li>
        </ul>

        <h2>${term("mue", "Medically Unlikely Edits")}</h2>
        <p>
          MUEs cap units of a code per patient per day. If the MUE for code X is 4 and the
          claim has 6 units, the extras deny. Designed to catch billing typos and abuse —
          you cannot, in fact, perform 20 colonoscopies on the same patient in one day.
        </p>

        <h2>${term("global-period", "Global periods")}</h2>
        <p>
          Major surgeries have a global period (often 90 days) during which related E&amp;M
          services are bundled into the surgical fee — they don't pay separately. Modifiers
          unbundle when needed:
        </p>
        <ul>
          <li><code>-24</code>: unrelated E&amp;M during postop period</li>
          <li><code>-79</code>: unrelated procedure during postop period</li>
          <li><code>-58</code>: staged or planned related procedure</li>
        </ul>

        <h2>Other things that change the allowed amount</h2>
        <ul>
          <li><strong>Assistant surgeon</strong> (modifiers <code>-80</code>, <code>-81</code>, <code>-82</code>, <code>-AS</code>): typically 16% of the surgical fee.</li>
          <li><strong>Co-surgery</strong> (<code>-62</code>): each surgeon paid 62.5% of the fee.</li>
          <li><strong>Team surgery</strong> (<code>-66</code>): payer-determined, by report.</li>
          <li><strong>Anesthesia direction</strong> (<code>QK</code>, <code>QY</code>, <code>QX</code>, <code>QZ</code>): split payment between MD and CRNA.</li>
          <li><strong>Telehealth modifiers</strong> (<code>95</code>, <code>GT</code>, <code>GQ</code>) and POS 02/10: enable telehealth payment, may equal in-person rate during PHE-extended policies.</li>
        </ul>

        <h2>Order of operations in a real engine</h2>
        <ol>
          <li>Look up base allowed amount from the fee schedule for each line.</li>
          <li>Apply line-level modifier adjustments (-50, -52, etc.).</li>
          <li>Apply NCCI / MUE edits — deny lines that violate edits unless overridden.</li>
          <li>Apply MPPR / endoscopy / imaging family rules across remaining lines.</li>
          <li>Apply assistant/co-surgeon adjustments.</li>
          <li>Apply global-period bundling.</li>
          <li>Apply lesser-of vs. billed.</li>
          <li>Pass the line-level allowed amounts to the benefit engine.</li>
        </ol>

        <div class="callout callout-warm">
          <div class="callout-title">Common mistake</div>
          Treating modifier <code>-25</code> as a free unbundling button. Payers run audits on
          high <code>-25</code> usage; documentation has to show the E&amp;M was truly separate
          from the procedure. Same with <code>-59</code>.
        </div>

        <div class="key-takeaway">
          <div class="key-takeaway-title">Key takeaway</div>
          The fee schedule gives you a starting line allowed amount. Modifiers, NCCI, MUEs,
          MPPR, and global periods then adjust it. The order of operations matters — get it
          wrong and you've built a buggy pricing engine.
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this chapter</div>
          <div class="glossary-strip-terms">
            ${term("modifier")} ${term("ncci")} ${term("mue")} ${term("global-period")} ${term("anesthesia-cf")}
          </div>
        </div>
      </article>`;
  },
};
