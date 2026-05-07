import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "operationalizing",
  title: "Operationalizing Contracts",
  subtitle: "From signed PDF to working pricing engine.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Chapter 11 · Contracts</span>
        <h1>Operationalizing Contracts</h1>
        <p class="chapter-subtitle">From signed PDF to working pricing engine.</p>

        <p>
          A signed contract is just the beginning. Turning it into accurately priced claims
          requires loading it into the pricing engine, validating it, monitoring it, and
          handling all the edge cases that real claims throw at it. This is where pricing
          systems live or die.
        </p>

        <h2>Contract loading</h2>
        <p>
          The pricing engine needs a structured representation of the contract. Translating
          natural-language contract terms into machine-executable rules is harder than it sounds:
        </p>
        <ul>
          <li><strong>Methodology configuration</strong> — pick the right pricing module per service line.</li>
          <li><strong>Fee schedule loading</strong> — pull in CPT-by-CPT amounts; if pegged to Medicare, configure the multiplier and Medicare reference snapshot logic.</li>
          <li><strong>Carve-out tables</strong> — list of codes / criteria that trigger carve-out pricing.</li>
          <li><strong>Modifier rules</strong> — payer-specific overrides on top of standard modifier handling.</li>
          <li><strong>Effective dates</strong> — by service line, by methodology, by code if needed.</li>
          <li><strong>Stop-loss / outlier triggers</strong> — thresholds and percentages.</li>
        </ul>

        <h2>Effective and term dates</h2>
        <p>
          Pricing has to be by date of service. A claim with a January DOS submitted in May
          uses January's contract terms. When contracts amend or terminate, the engine needs
          to honor the right effective date for each line.
        </p>
        <p>
          Common gotcha: <em>retroactive amendments</em>. The contract is amended in March
          effective January 1. Claims already adjudicated under the prior rates need to be
          re-adjudicated. Engines need a "reprice all claims for provider X with DOS &gt;= Y"
          capability and an audit trail of what changed.
        </p>

        <h2>Provider directory and contract assignment</h2>
        <p>
          Each provider on a claim needs to be matched to a contract. Inputs:
        </p>
        <ul>
          <li>Billing NPI — the entity getting paid.</li>
          <li>Rendering NPI — the individual who performed the service.</li>
          <li>Tax ID (TIN).</li>
          <li>Provider type and specialty.</li>
          <li>Service location.</li>
          <li>Date of service.</li>
        </ul>
        <p>
          The combination of these tells the engine which contract applies. A single provider
          group might have different contracts for commercial vs. MA vs. Medicaid lines of
          business. The same NPI could have multiple contracts active at once for different
          plans.
        </p>

        <h2>Audits and recoupments</h2>
        <p>
          Every contract has audit rights. The payer can review the provider's documentation
          and adjust prior payments if they don't support the codes billed.
        </p>
        <ul>
          <li><strong>Pre-pay audits</strong> — payer holds the claim and requests records before paying.</li>
          <li><strong>Post-pay audits</strong> — payer pays, then audits and demands recoupment.</li>
          <li><strong>Sampling-based audits</strong> — extrapolate findings from a sample to the entire population.</li>
          <li><strong>Concurrent audits</strong> — review claims as they come in.</li>
        </ul>
        <p>
          Recoupments are operationally messy: the payer takes future payments to recover prior
          overpayments. Providers track and dispute these. Time limits in the contract (and
          state law) cap how far back recoupments can reach.
        </p>

        <h2>Disputes</h2>
        <p>
          Common dispute types:
        </p>
        <ul>
          <li><strong>Pricing disputes</strong> — provider says payment was too low; engine says it ran the contract correctly. Usually a contract interpretation question.</li>
          <li><strong>Denial disputes</strong> — provider appeals a denial.</li>
          <li><strong>Audit disputes</strong> — provider contests a recoupment.</li>
          <li><strong>NSA disputes</strong> — out-of-network ER / ancillary; handled through federal IDR.</li>
          <li><strong>Claim status disputes</strong> — provider says it submitted; payer says it didn't receive.</li>
        </ul>
        <p>
          Dispute resolution paths typically run: internal review → external review → arbitration
          → litigation, each with time limits. Healthy contract relationships have most disputes
          resolved at internal review.
        </p>

        <h2>Performance monitoring</h2>
        <p>
          Both sides should monitor the contract:
        </p>
        <ul>
          <li><strong>Payer-side</strong>: average payment per case vs. expected; underpayment / overpayment rates; appeal volume; days-to-pay; denial rate by reason.</li>
          <li><strong>Provider-side</strong>: payment-to-charges ratio; net collection rate; days in AR; denial-and-recovery rate.</li>
        </ul>
        <p>
          Systematic deviations from expected payment amounts often indicate misconfigured
          contracts. A 1% pricing error on a hospital contract worth $200M/year is $2M.
        </p>

        <h2>Fee schedule maintenance</h2>
        <p>
          Live-pegged contracts auto-update with Medicare. CMS publishes:
        </p>
        <ul>
          <li>Annual MPFS final rule (effective January 1)</li>
          <li>Quarterly RVU updates</li>
          <li>Annual OPPS / ASC final rule</li>
          <li>Annual IPPS final rule (for DRG weights and base rates, effective October 1)</li>
          <li>Annual updates to CLFS, DMEPOS, etc.</li>
        </ul>
        <p>
          Pricing engines need to ingest each of these. Frozen contracts skip the updates but
          still need careful monitoring to catch claims that should have re-adjudicated.
        </p>

        <h2>Common operational failure modes</h2>
        <ol>
          <li><strong>Misloaded contract terms</strong> — a wrong multiplier or wrong effective date affects every claim.</li>
          <li><strong>Stale Medicare references</strong> — the engine still uses 2023 RVUs in 2024.</li>
          <li><strong>Missing carve-outs</strong> — claims paid at per-diem when an implant should have been carved out.</li>
          <li><strong>Provider mismatch</strong> — claims attached to the wrong contract.</li>
          <li><strong>Date-of-service overlap</strong> — two contracts active for the same DOS, no precedence rule.</li>
          <li><strong>Modifier handling drift</strong> — payer-specific modifier rules out of sync with current policy.</li>
          <li><strong>Audit trail gaps</strong> — can't reconstruct why a claim paid the way it did.</li>
        </ol>

        <h2>What "good" looks like</h2>
        <ul>
          <li>Contracts loaded once, queried by date of service for any historical claim.</li>
          <li>Every payment can be reconstructed end-to-end from inputs.</li>
          <li>Reprice-all capability for retroactive changes.</li>
          <li>Underpayment / overpayment monitoring as standard reporting.</li>
          <li>Versioned contract records — see what the contract said for any past date.</li>
          <li>Clear separation between contract terms (the data) and pricing logic (the code).</li>
        </ul>

        <div class="callout callout-good">
          <div class="callout-title">A useful posture</div>
          Contracts are software inputs. Treat them as configuration that's tested, versioned,
          and observable. The contract document is the spec; the engine is the implementation;
          the claims data is the integration test.
        </div>

        <div class="key-takeaway">
          <div class="key-takeaway-title">Key takeaway</div>
          A contract isn't done when it's signed — it's done when the pricing engine reliably
          implements it. Most operational pain in healthcare pricing is contracts loaded
          incorrectly, updates missed, or audit trails too thin to reconstruct what happened.
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this chapter</div>
          <div class="glossary-strip-terms">
            ${term("fee-schedule")} ${term("carve-out")} ${term("nsa")} ${term("adjudication")}
          </div>
        </div>
      </article>`;
  },
};
