import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "provider-types",
  title: "Provider Types & How They Shape Contracts",
  subtitle: "One word: hospitals contract very differently than physician groups.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Chapter 3 · Contracts</span>
        <h1>Provider Types &amp; How They Shape Contracts</h1>
        <p class="chapter-subtitle">One word: hospitals contract very differently than physician groups.</p>

        <p>
          Different categories of providers run different businesses, and contracts reflect
          that. The methodology, complexity, and leverage all vary by provider type.
        </p>

        <h2>Professional groups</h2>
        <p>
          Physicians, NPs, PAs, behavioral health clinicians, organized into solo practices,
          group practices, IPAs, or large multi-specialty groups (Permanente, Mayo, Cleveland).
        </p>
        <ul>
          <li><strong>Methodology</strong>: ${term("fee-schedule")} (typically % of Medicare RBRVS).</li>
          <li><strong>Complexity</strong>: low to medium. One rate sheet, one or two carve-outs (e.g., immunizations).</li>
          <li><strong>Leverage</strong>: usually weak unless the group is dominant in a specialty / market.</li>
          <li><strong>Watch for</strong>: handling of mid-levels (NP/PA bill at 85% of MD rate? or 100%?), telehealth, anesthesia conversion factor.</li>
        </ul>

        <h2>Hospitals and health systems</h2>
        <p>
          Acute-care hospitals (teaching, community, critical-access), often grouped into
          systems with 2 to 200 facilities sharing a contract.
        </p>
        <ul>
          <li><strong>Methodology</strong>: mixed. Inpatient: ${term("drg")} or ${term("per-diem")}. Outpatient: ${term("apc", "OPPS")} or ${term("percent-of-charges")}. Plus carve-outs.</li>
          <li><strong>Complexity</strong>: highest. Often 50+ pages of exhibits.</li>
          <li><strong>Leverage</strong>: strong, especially regional dominant systems. They negotiate hardest.</li>
          <li><strong>Watch for</strong>: stop-loss provisions, transplant carve-outs, implant carve-outs, observation handling, ER visit pricing, behavioral health units.</li>
        </ul>

        <h2>${term("asc", "ASCs")}</h2>
        <p>
          Ambulatory Surgery Centers — freestanding, same-day surgical facilities.
        </p>
        <ul>
          <li><strong>Methodology</strong>: percent of Medicare ASC, percent of OPPS, or custom case rates by code.</li>
          <li><strong>Complexity</strong>: medium.</li>
          <li><strong>Leverage</strong>: variable; dominant ortho/eye networks have it, individual ASCs less so.</li>
          <li><strong>Watch for</strong>: implant carve-outs (especially ortho), modifier handling, dual-billing scenarios (facility + professional).</li>
        </ul>

        <h2>FQHC / RHC / CAH</h2>
        <p>
          Special-status providers paid under specific rules:
        </p>
        <ul>
          <li><strong>${term("fqhc", "FQHC")}</strong> — Federally Qualified Health Center: paid under a CMS PPS encounter rate. One rate per face-to-face visit, regardless of services.</li>
          <li><strong>RHC</strong> — Rural Health Clinic: similar all-inclusive rate per visit.</li>
          <li><strong>CAH</strong> — Critical Access Hospital: cost-based reimbursement (101% of allowable cost) for Medicare; commercial contracts often follow.</li>
        </ul>
        <p>
          Commercial contracts with these providers usually mirror the federal methodology with
          a multiplier. Confusion arises when a commercial plan tries to apply normal fee schedules.
        </p>

        <h2>Ancillary providers</h2>
        <ul>
          <li><strong>Lab</strong>: per-test fee schedule, often pegged to Medicare CLFS. Big national chains (Quest, LabCorp) have leverage; hospital outreach labs less so.</li>
          <li><strong>Imaging</strong>: per-procedure fee schedule, often facility variants for hospital outpatient vs. freestanding.</li>
          <li><strong>DME</strong>: per-HCPCS Level II fee schedule, often Medicare-pegged. Rental vs. purchase logic, capped rentals.</li>
          <li><strong>Home health</strong>: episodic payment (Medicare's PDGM model) or per-visit.</li>
          <li><strong>Hospice</strong>: per diem by level of care (routine home, continuous home, inpatient respite, general inpatient).</li>
          <li><strong>SNF (skilled nursing)</strong>: per diem (Medicare's PDPM) or commercial flat per-diem with carve-outs for therapy.</li>
          <li><strong>Ambulance</strong>: ground vs. air; mileage component; air ambulance now covered by NSA.</li>
        </ul>

        <h2>Behavioral health</h2>
        <p>
          Psychiatry, therapy, residential treatment, IOP/PHP. Historically separate "behavioral
          health carve-out" contracts with specialty payers; now mostly integrated under
          parity laws (MHPAEA).
        </p>
        <ul>
          <li><strong>Methodology</strong>: fee schedule for outpatient; per diem for residential and inpatient psych units.</li>
          <li><strong>Watch for</strong>: parity compliance, network adequacy gaps, telehealth.</li>
        </ul>

        <h2>Pharmacy</h2>
        <p>
          Different rails entirely — adjudicated through PBMs in real time at point of sale.
          Pricing typically AWP minus a discount + dispensing fee, or MAC (Maximum Allowable Cost)
          for generics. PBM contracts include rebates, formulary tiers, and network construction
          (preferred vs. standard, mail-order, specialty).
        </p>

        <h2>Vision and dental</h2>
        <p>
          Often separate networks with dedicated administrators (VSP, Delta Dental). Contracts
          look much like medical professional contracts but on smaller fee schedules.
        </p>

        <h2>How methodology choice maps to provider type</h2>
        <table>
          <thead><tr><th>Provider type</th><th>Inpatient</th><th>Outpatient</th><th>Other</th></tr></thead>
          <tbody>
            <tr><td>Hospital</td><td>DRG, per diem</td><td>APC %, % of charges</td><td>Carve-outs (implants, drugs, transplants)</td></tr>
            <tr><td>Physician group</td><td>n/a</td><td>Fee schedule (% of Medicare)</td><td>Anesthesia formula, mid-level adjustments</td></tr>
            <tr><td>ASC</td><td>n/a</td><td>% of Medicare ASC, case rates</td><td>Implant carve-outs</td></tr>
            <tr><td>FQHC/RHC</td><td>n/a</td><td>Encounter rate</td><td></td></tr>
            <tr><td>CAH</td><td>Cost-based</td><td>Cost-based</td><td></td></tr>
            <tr><td>Lab</td><td>n/a</td><td>Per-test fee schedule</td><td></td></tr>
            <tr><td>DME</td><td>n/a</td><td>Per-HCPCS fee schedule</td><td>Rental caps, repair allowances</td></tr>
            <tr><td>Home health</td><td>n/a</td><td>Episodic or per-visit</td><td></td></tr>
            <tr><td>Hospice</td><td>n/a</td><td>Per diem by level</td><td></td></tr>
            <tr><td>SNF</td><td>n/a</td><td>Per diem (PDPM-like)</td><td>Therapy carve-out historically</td></tr>
            <tr><td>Behavioral</td><td>Per diem (psych unit)</td><td>Fee schedule</td><td>IOP/PHP per-day rates</td></tr>
          </tbody>
        </table>

        <div class="key-takeaway">
          <div class="key-takeaway-title">Key takeaway</div>
          Provider type determines contract complexity. Hospitals and health systems are the
          deepest specialty — chapter 5 zooms into hospital contracts because they carry
          most of the dollars, most of the complexity, and most of the negotiation leverage.
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this chapter</div>
          <div class="glossary-strip-terms">
            ${term("fee-schedule")} ${term("drg")} ${term("apc")} ${term("per-diem")}
            ${term("percent-of-charges")} ${term("asc")} ${term("fqhc")} ${term("carve-out")}
          </div>
        </div>
      </article>`;
  },
};
