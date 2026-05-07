import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "professional",
  title: "Professional Contracts",
  subtitle: "Cleaner than hospital, but with their own quirks.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Chapter 6 · Contracts</span>
        <h1>Professional Contracts</h1>
        <p class="chapter-subtitle">Cleaner than hospital, but with their own quirks.</p>

        <p>
          Professional contracts cover physicians, NPs, PAs, behavioral clinicians, and the
          group practices that employ them. They tend to be simpler than hospital contracts —
          one fee schedule, a few modifier rules, done. But the simplicity hides complexity in
          three areas: anesthesia, mid-levels, and modifier handling.
        </p>

        <h2>The standard structure</h2>
        <p>
          A typical professional contract:
        </p>
        <ul>
          <li><strong>Reimbursement</strong>: lesser of (a) billed charge or (b) X% of the current Medicare Physician Fee Schedule for the date of service, by code.</li>
          <li><strong>Anesthesia</strong>: (base units + time units) × Y dollars per unit, where Y is the contracted anesthesia conversion factor.</li>
          <li><strong>Drugs (J-codes administered in office)</strong>: ASP + Z% per Medicare's structure, or AWP - some discount.</li>
          <li><strong>Mid-levels</strong>: typically 85% of MD rate when billed under the mid-level's NPI.</li>
          <li><strong>Modifier handling</strong>: standard MPPR, bilateral 150%, assistant surgeon 16%, etc., often with payer-specific overrides.</li>
        </ul>

        <h2>Pegging to Medicare</h2>
        <p>
          The single most important clause is how the contract references Medicare's fee schedule.
          Variations:
        </p>

        <h3>Live Medicare reference</h3>
        <blockquote>
          "X% of the Medicare Physician Fee Schedule effective for the date of service."
        </blockquote>
        <p>
          When CMS updates RVUs or the conversion factor, the contract rate moves automatically.
          Provider-friendly when CMS rates rise; payer-friendly when they fall (which has been
          the trend for years).
        </p>

        <h3>Frozen reference</h3>
        <blockquote>
          "X% of the Medicare Physician Fee Schedule as published for calendar year 2024,
          held constant for the term of this Agreement."
        </blockquote>
        <p>
          Locks rates. Often the result of a hard negotiation — one party didn't want to take
          on Medicare-update risk. Requires manual amendment to update.
        </p>

        <h3>Specific year + fixed escalator</h3>
        <blockquote>
          "100% of the Medicare Physician Fee Schedule as published for calendar year 2024,
          escalated by three percent (3%) annually each January 1."
        </blockquote>
        <p>
          Predictable for both parties. Decouples from CMS volatility.
        </p>

        <h3>Locality choice</h3>
        <p>
          Medicare publishes RVUs and CFs at the national level but applies GPCIs by locality.
          A contract has to specify which locality applies. National-no-GPCI (effectively GPCI
          = 1.000) is common. Specific-locality means the contract pays more in San Francisco
          than in Mississippi for the same service.
        </p>

        <h2>${term("anesthesia-cf", "Anesthesia")}</h2>
        <p>
          Anesthesia uses a different formula:
        </p>
        <div class="formula">Allowed = (Base Units + Time Units) × Conversion Factor</div>
        <ul>
          <li><strong>Base units</strong>: from the ASA (American Society of Anesthesiologists) crosswalk, by ASA code. Higher complexity surgeries have more base units.</li>
          <li><strong>Time units</strong>: typically one unit per 15 minutes of anesthesia time. Some contracts use 12 minutes for surgeons' convenience.</li>
          <li><strong>Conversion factor</strong>: contracted dollar amount per unit. Medicare's national anesthesia CF is around $20.79 (2024). Commercial contracts often run $35–$80/unit.</li>
        </ul>
        <p>Modifier handling for anesthesia:</p>
        <ul>
          <li><code>QK</code> — Medical direction of 2–4 concurrent procedures (split 50/50 with CRNA).</li>
          <li><code>QY</code> — Medical direction of one CRNA.</li>
          <li><code>QX</code> — CRNA, medically directed.</li>
          <li><code>QZ</code> — CRNA, no MD direction.</li>
          <li><code>AA</code> — Personally performed by anesthesiologist.</li>
        </ul>

        <h2>Mid-level providers (NPs, PAs)</h2>
        <p>
          When NPs or PAs bill independently under their own NPI, Medicare pays at 85% of the
          MD rate. Commercial contracts handle this in different ways:
        </p>
        <ul>
          <li><strong>85% rule</strong> mirroring Medicare.</li>
          <li><strong>Full MD rate</strong> in some markets, often where the mid-level is functioning autonomously.</li>
          <li><strong>"Incident to" billing</strong>: when the mid-level works under MD supervision and bills under the MD's NPI, payment is at 100% of MD rate. Tightly regulated; abuse-prone.</li>
        </ul>

        <h2>Telehealth</h2>
        <p>
          Pre-pandemic, most telehealth was paid at a reduced rate or only in certain rural
          settings. The PHE-era expansion let telehealth pay at parity with in-person for many
          codes. Some contracts now bake in telehealth parity; others have begun rolling it
          back. Watch:
        </p>
        <ul>
          <li>Place of service 02 (originating site other than home) vs. 10 (home).</li>
          <li>Modifier 95 or GT (varies by payer).</li>
          <li>Audio-only vs. audio-video.</li>
          <li>Whether the contract scope includes telehealth-only encounter codes (G2010, G2012, etc.).</li>
        </ul>

        <h2>Surgical global periods</h2>
        <p>
          Major surgeries have a 90-day global period during which related E&amp;M is bundled
          into the surgical fee. Contracts usually adopt CMS's global-period assignments
          (0/10/90 day, MMM = maternity, XXX = no global). Modifier <code>-24</code>, <code>-25</code>,
          <code>-58</code>, <code>-79</code> handle the unbundle cases.
        </p>

        <h2>Multi-specialty groups</h2>
        <p>
          Large multi-specialty groups often negotiate one master contract with rate sheets per
          specialty. Each specialty might have a different multiplier on Medicare:
        </p>
        <ul>
          <li>Primary care: 100% of Medicare</li>
          <li>Most specialists: 130% of Medicare</li>
          <li>Anesthesia: contracted CF of $55/unit</li>
          <li>Pathology: 110% of Medicare with specific rules for global vs. -26/-TC splits</li>
          <li>Radiology: 110% of Medicare with -26/-TC handling</li>
          <li>Hospitalists: 130% of Medicare with rules for inpatient consult codes</li>
        </ul>

        <h2>Pre-auth and prior auth</h2>
        <p>
          Many professional contracts require prior authorization for specific services
          (advanced imaging, specialty drugs, certain procedures). The contract usually doesn't
          set the auth requirements directly — it points to the payer's medical policy, which
          can change. Authorization absent → claim denied with CARC 197 → provider appeals.
        </p>

        <div class="callout">
          <div class="callout-title">Anesthesia is its own world</div>
          The base + time × CF formula is unique to anesthesia. Modifier-driven splits (QK, QY,
          QX, QZ, AA) divide payment between anesthesiologists and CRNAs. Anesthesia
          conversion factor negotiations are notoriously contentious because the same code
          generates revenue for both the surgeon (paid per RBRVS) and the anesthesia team
          (paid per the anesthesia formula) and the gap between commercial and Medicare is
          larger here than almost anywhere else.
        </div>

        <div class="key-takeaway">
          <div class="key-takeaway-title">Key takeaway</div>
          Professional contracts are mostly fee schedule × multiplier of Medicare. The quirks
          live in anesthesia, mid-levels, telehealth, and modifier handling. Get those right
          and 90%+ of your professional contract logic is solid.
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this chapter</div>
          <div class="glossary-strip-terms">
            ${term("fee-schedule")} ${term("rbrvs")} ${term("conversion-factor")}
            ${term("anesthesia-cf")} ${term("modifier")} ${term("global-period")} ${term("rvu")}
          </div>
        </div>
      </article>`;
  },
};
