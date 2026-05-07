import { html } from "../../lib/html";
import { term } from "../../components/term-link";
import type { Chapter } from "../types";

export const chapter: Chapter = {
  slug: "government",
  title: "Government Programs Layer",
  subtitle: "Medicare, Medicare Advantage, Medicaid, and the rules they impose.",
  render() {
    return html`
      <article class="prose">
        <span class="chapter-eyebrow">Chapter 10 · Contracts</span>
        <h1>Government Programs Layer</h1>
        <p class="chapter-subtitle">Medicare, Medicare Advantage, Medicaid, and the rules they impose.</p>

        <p>
          About 40% of US healthcare spending flows through government programs. Their pricing
          rules form the backbone that commercial contracts reference. Even payers that don't
          operate government plans need to understand them — they're the regulatory and
          economic floor of the entire system.
        </p>

        <h2>Original Medicare (Parts A &amp; B)</h2>
        <p>
          The traditional Medicare program operated directly by CMS. Pricing is set by
          regulation; providers can choose whether to participate but cannot negotiate rates.
        </p>
        <ul>
          <li><strong>Part A</strong> — inpatient hospital, SNF, hospice, home health. Paid via DRG (inpatient), per-diem variants (SNF/hospice), and PDGM (home health).</li>
          <li><strong>Part B</strong> — physician services, outpatient hospital, DME, lab. Paid via MPFS (RBRVS), OPPS (APC), CLFS, and DMEPOS fee schedules.</li>
          <li><strong>Member cost share</strong>: Part A inpatient deductible (~$1,632 in 2025) per benefit period; Part B has 20% coinsurance after a small annual deductible. No OOP max — Medicare alone leaves significant exposure.</li>
        </ul>

        <h2>${term("ma-plan", "Medicare Advantage (Part C)")}</h2>
        <p>
          Private plans that contract with CMS to deliver Medicare benefits to enrolled members.
          About half of all Medicare beneficiaries are now in MA.
        </p>
        <p><strong>How CMS pays MA plans:</strong></p>
        <ul>
          <li>Risk-adjusted capitated PMPM, computed per beneficiary using HCC coding.</li>
          <li>Paid monthly to the plan for each enrolled member.</li>
          <li>Plans use this revenue to pay providers (via their own contracts), administer benefits, and earn margin.</li>
        </ul>
        <p><strong>How MA plans pay providers:</strong></p>
        <ul>
          <li>Most MA plans contract at percent-of-Medicare rates (often 100–110% of MPFS for professional, varying for institutional).</li>
          <li>Some use FFS, some sub-capitate, some run global-risk arrangements.</li>
          <li>Out-of-network providers must accept the Medicare rate (with limits) — MA plans cannot let providers balance bill members.</li>
        </ul>
        <p><strong>Stars program:</strong></p>
        <ul>
          <li>CMS rates MA plans 1–5 stars on quality measures (HEDIS, CAHPS, HOS, plan operations).</li>
          <li>Higher Star ratings → higher CMS payments (Quality Bonus Program) and rebates that fund richer benefits.</li>
          <li>This drives a lot of MA plan behavior, including which providers they contract with and quality programs they push.</li>
        </ul>

        <h2>Medicaid</h2>
        <p>
          Joint federal-state program for low-income Americans. Two big modalities:
        </p>
        <ul>
          <li><strong>Fee-for-service Medicaid</strong> — state pays providers directly per a state-published fee schedule. Rates often very low (50–60% of Medicare).</li>
          <li><strong>Medicaid Managed Care (MCO)</strong> — state contracts with private MCOs (Centene, Molina, etc.) on a capitated PMPM. The MCO then contracts with providers. ~70% of Medicaid is now MCO.</li>
        </ul>
        <p>
          Provider-MCO contracts often look like commercial contracts but at lower rates.
          Each state has its own Medicaid program design and reimbursement structure — there's
          no national standard.
        </p>

        <h2>Dual-eligible (Medicare + Medicaid)</h2>
        <p>
          Members eligible for both Medicare and Medicaid. Medicare is primary; Medicaid covers
          some Medicare cost-sharing and additional benefits (especially long-term services and
          supports). Special MA plans (D-SNPs) and integrated programs (FIDE, MMP) target this
          population.
        </p>
        <p>
          Provider contracts for D-SNPs typically follow MA rules with some Medicaid-specific
          add-ons (long-term care benefits, EPSDT for kids, etc.).
        </p>

        <h2>How government rates shape commercial contracts</h2>
        <ul>
          <li><strong>Medicare is the reference</strong> — most commercial contracts are quoted as % of Medicare.</li>
          <li><strong>Medicare updates propagate</strong> — when CMS updates RVUs or DRG weights, commercial rates pegged live to Medicare move automatically.</li>
          <li><strong>Cost shifting</strong> — when Medicare/Medicaid pay below cost, providers seek higher commercial rates to make up the gap. This is part of why commercial rates run 200–300% of Medicare in some markets.</li>
          <li><strong>Floor for negotiations</strong> — providers will rarely accept commercial rates below Medicare; payers will rarely offer above some multiple of Medicare.</li>
        </ul>

        <h2>Public option-style designs</h2>
        <p>
          A handful of states (Washington, Colorado, Nevada) have launched "public option"
          plans on the ACA exchange that cap provider rates at a multiple of Medicare. These
          functionally extend Medicare-style price-setting into commercial. Adoption has been
          slow because participation by hospitals is voluntary and rate caps depress
          willingness.
        </p>

        <h2>Federal program oversight</h2>
        <ul>
          <li><strong>OIG (HHS Office of Inspector General)</strong> — audits for fraud, waste, abuse. Targets common issues: upcoding, billing for services not rendered, modifier abuse, MA risk-adjustment fraud.</li>
          <li><strong>CMS National Coverage Determinations</strong> — coverage rules that bind both Original Medicare and MA.</li>
          <li><strong>Medicare Administrative Contractors (MACs)</strong> — regional contractors that adjudicate Original Medicare claims. They publish Local Coverage Determinations (LCDs) for jurisdictional coverage rules.</li>
          <li><strong>State insurance departments</strong> — regulate fully insured commercial and Medicaid MCOs operating in the state.</li>
          <li><strong>Department of Labor</strong> — regulates self-insured ERISA plans.</li>
        </ul>

        <h2>Why this matters for contract design</h2>
        <p>
          When you write a contract, you're implicitly subject to whatever government program
          rules also apply:
        </p>
        <ul>
          <li>An MA plan's contracts must cover all Medicare-covered services and meet network adequacy.</li>
          <li>A commercial plan must comply with ACA essential health benefits.</li>
          <li>A self-insured plan must follow ERISA but is exempt from many state mandates.</li>
          <li>NSA applies regardless of plan type to its scoped scenarios.</li>
        </ul>
        <p>
          The contract sits inside a regulatory frame. Both sides know it. Neither can write a
          provision that violates the frame and expect it to hold up.
        </p>

        <div class="key-takeaway">
          <div class="key-takeaway-title">Key takeaway</div>
          Government programs set the rates that commercial contracts reference. MA inverts the
          model: government pays plans, plans pay providers. Medicaid usually goes through MCOs
          at lower rates. Pricing engines have to handle each program with its own rules; most
          contract math is just "Medicare rate × multiplier" anyway.
        </div>

        <div class="glossary-strip">
          <div class="glossary-strip-title">Terms in this chapter</div>
          <div class="glossary-strip-terms">
            ${term("ma-plan")} ${term("rbrvs")} ${term("drg")} ${term("apc")} ${term("pmpm")} ${term("mlr")}
          </div>
        </div>
      </article>`;
  },
};
