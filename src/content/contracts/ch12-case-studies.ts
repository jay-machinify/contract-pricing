import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "case-studies",
  title: "Putting It Together — Case Studies",
  subtitle: "One claim, five contracts. The same hospitalization priced under different methods.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Chapter 12 · Contracts</span>
        <h1>Putting It Together — Case Studies</h1>
        <p class="chapter-subtitle">One claim, five contracts. The same hospitalization priced under different methods.</p>

        <p>
          Pick a hospital stay. Run it through five different contract methodologies. Watch
          how the same medical event becomes a wildly different payment depending on how the
          contract is structured. This is the punchline of the entire walkthrough.
        </p>

        <div data-calc="contract-comparison"></div>

        <h2>What you should notice</h2>
        <ol>
          <li><strong>Methodology matters more than you'd expect.</strong> The same claim can swing 2–3x in payment between methodologies. The choice of contract structure isn't a minor configuration — it's the dominant lever.</li>
          <li><strong>Per-diem with carve-outs is the most variable.</strong> A short stay with no carve-outs is cheap; a long stay with implants is expensive. Per-diem rewards efficient stays.</li>
          <li><strong>DRG is flat for the case mix.</strong> Length of stay doesn't matter; severity of the case (DRG weight) does. DRG rewards getting the patient through the stay efficiently.</li>
          <li><strong>% of charges scales with billing.</strong> Provider sets billed charges; payer pays a fraction. Loose cost discipline.</li>
          <li><strong>Case rate is binary.</strong> Either the case fits the rate or it doesn't. Outliers blow up the math.</li>
          <li><strong>% of Medicare is a clean reference</strong> but pegs payment to whatever Medicare decides. Volatility from CMS.</li>
        </ol>

        <h2>How payers think about methodology choice</h2>
        <ul>
          <li><strong>Predictable, lower-cost</strong>: DRG, case rate. Push utilization risk to provider.</li>
          <li><strong>Lower friction</strong>: % of Medicare. Auto-updates with CMS, simple to load and audit.</li>
          <li><strong>Tactical flexibility</strong>: per-diem with carve-outs. Lets payer fine-tune what's bundled and what isn't.</li>
          <li><strong>Fallback</strong>: % of charges. For things that don't fit anywhere else.</li>
          <li><strong>Risk-shifting</strong>: capitation, bundled payments. When the payer can attribute a population and trust the provider to manage care.</li>
        </ul>

        <h2>How providers think about methodology choice</h2>
        <ul>
          <li><strong>Predictable revenue</strong>: fee schedule, % of Medicare. Volume in, money out.</li>
          <li><strong>Upside on efficiency</strong>: DRG, case rate. Reward for shortening stays.</li>
          <li><strong>Cost protection</strong>: per-diem with carve-outs and stop-loss. Can't lose money on extreme cases.</li>
          <li><strong>Volume protection</strong>: % of charges. Doesn't constrain how much can be billed.</li>
          <li><strong>Population health upside</strong>: capitation, shared savings. If you can manage care, you keep the savings.</li>
        </ul>

        <h2>Putting walkthrough 1 and 2 together</h2>
        <p>
          By now you should be able to trace a claim:
        </p>
        <ol>
          <li>Provider renders care, codes the claim (walkthrough 1, ch 2).</li>
          <li>Claim travels via clearinghouse to payer (walkthrough 1, ch 1).</li>
          <li>Payer's adjudication engine runs eligibility and edits (walkthrough 1, ch 11).</li>
          <li>Engine looks up the relevant <strong>contract</strong> (walkthrough 2, ch 11).</li>
          <li>Applies the contract's methodology — DRG, fee schedule, per-diem, etc. (walkthrough 2, ch 4–6).</li>
          <li>Applies carve-outs, modifiers, lesser-of (walkthrough 2, ch 7; walkthrough 1, ch 5).</li>
          <li>Applies stop-loss / outliers (walkthrough 2, ch 5).</li>
          <li>Computes the allowed amount.</li>
          <li>Splits into plan-paid and member responsibility based on benefits (walkthrough 1, ch 9).</li>
          <li>Generates the 835 / EOB (walkthrough 1, ch 12).</li>
          <li>Disburses payment.</li>
        </ol>

        <h2>The big themes worth carrying forward</h2>
        <ul>
          <li><strong>Allowed amount is the central variable.</strong> Everything else is upstream of (contract terms) or downstream from (benefits) it.</li>
          <li><strong>Contracts are software inputs.</strong> Misloaded terms are the most common pricing-engine bug.</li>
          <li><strong>Methodology choice = risk allocation.</strong> Bundled methods push risk to provider; FFS keeps it on payer.</li>
          <li><strong>Medicare is the universal reference.</strong> Even if Medicare isn't your direct payer, its rates set the floor and shape everything else.</li>
          <li><strong>Edge cases dominate.</strong> The first 80% of claims are easy. The last 20% — denials, appeals, COB, NSA, retroactive amendments — is where engineering and ops energy actually goes.</li>
        </ul>

        <div class="callout callout-good">
          <div class="callout-title">Where to go next</div>
          The official Medicare references are dense but authoritative — the MPFS, OPPS, and
          IPPS final rules each year explain CMS's pricing logic in full. Hospital cost reports,
          the Hospital Compare data, and the Medicare Provider Utilization &amp; Payment data
          (publicly available) let you see actual rates and volumes. The CMS NCCI policy
          manuals explain the edits in detail. For the legal side, sample contracts on the
          National Academy for State Health Policy site give a sense of what real provider
          contracts look like.
        </div>

        <div class="key-takeaway">
          <div class="key-takeaway-title">You now have the framework</div>
          You can read a claim form, recognize the codes, identify the methodology a contract
          uses, predict roughly what a payment will be, and trace the path from service to
          payment. From here, depth comes from working with real claims data, real contracts,
          and real adjudication systems. The mental model is in place.
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this chapter</div>
          <div class="glossary-strip-terms">
            ${term("drg")} ${term("per-diem")} ${term("case-rate")} ${term("percent-of-charges")}
            ${term("fee-schedule")} ${term("carve-out")} ${term("stop-loss")} ${term("capitation")}
            ${term("allowed-amount")}
          </div>
        </div>
      </article>`;
  },
};
