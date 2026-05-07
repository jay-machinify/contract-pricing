import { html } from "../lib/html";
import { money } from "../lib/money";
import type { Calculator, CalculatorFactory } from "./types";

interface Step {
  key: string;
  title: string;
  detail: string;
  outcome?: string;
}

const scenarios = [
  {
    label: "Routine office visit, in-network — clean adjudication",
    billed: 285,
    steps: [
      { key: "intake", title: "Claim received", detail: "EDI 837P arrives via clearinghouse; format and member ID validate." },
      { key: "elig", title: "Eligibility check", detail: "Member is active on the plan on the date of service. Plan: PPO 80/20, $500 deductible (met), $4,500 OOP remaining." },
      { key: "edits", title: "Coding edits", detail: "CPT 99213, ICD-10 J06.9. NCCI: clean. MUE: 1 unit, within limit. No bundling issues." },
      { key: "pricing", title: "Contract pricing", detail: "Provider is in-network. Fee schedule for 99213: $112.45. Lesser-of(billed $285, contracted $112.45) = $112.45 allowed." },
      { key: "benefits", title: "Benefit application", detail: "Deductible already met. Coinsurance 20% applied: member owes $22.49, plan pays $89.96.", outcome: "Plan pays $89.96, member $22.49" },
      { key: "cob", title: "COB check", detail: "Member has only one active coverage. No coordination needed." },
      { key: "remit", title: "Payment & remit", detail: "835 ERA generated for provider; EOB mailed to member. ACH for $89.96 issued.", outcome: "Paid" },
    ] as Step[],
  },
  {
    label: "Out-of-network ER visit — No Surprises Act protection",
    billed: 4200,
    steps: [
      { key: "intake", title: "Claim received", detail: "EDI 837I from a non-par hospital. Type of bill 131 (outpatient ER). POS 23." },
      { key: "elig", title: "Eligibility check", detail: "Member active. ER coverage applies regardless of network." },
      { key: "edits", title: "Coding edits", detail: "Revenue code 0450, CPT 99284 (ER level 4). NCCI clean." },
      { key: "pricing", title: "NSA pricing", detail: "Out-of-network ER falls under NSA. Allowed amount = QPA (Qualifying Payment Amount) = $1,610. Member treated as in-network." },
      { key: "benefits", title: "Benefit application", detail: "ER copay $300; coinsurance 20% applied to remaining; member capped at in-network cost-sharing.", outcome: "Member owes $562; plan pays balance of allowed" },
      { key: "balance-bill", title: "Balance billing prohibited", detail: "Provider cannot bill member for the gap above $1,610. Provider may dispute via federal IDR if rate is contested." },
      { key: "remit", title: "Payment & remit", detail: "ERA issued. CARC adjustment shows non-allowed write-off.", outcome: "Paid under NSA" },
    ] as Step[],
  },
  {
    label: "Inpatient stay with denial → appeal → partial pay",
    billed: 78000,
    steps: [
      { key: "intake", title: "Claim received", detail: "EDI 837I from in-network hospital. TOB 111. DRG 470 (joint replacement)." },
      { key: "elig", title: "Eligibility check", detail: "Member active; inpatient benefit applies after 1-day deductible." },
      { key: "edits", title: "Authorization edit", detail: "Pre-auth missing. Claim denied with CARC 197 (precertification absent)." },
      { key: "appeal", title: "Provider appeals", detail: "Hospital submits documentation that auth was filed but not logged. Payer reviews and overturns the denial." },
      { key: "pricing", title: "Contract pricing", detail: "DRG-based contract: base rate $7,200 × DRG 470 weight 1.99 = $14,328 allowed." },
      { key: "benefits", title: "Benefit application", detail: "Deductible $0 remaining. Inpatient coinsurance 10% = $1,432.80 member, $12,895.20 plan.", outcome: "Plan pays $12,895.20" },
      { key: "remit", title: "Payment & remit", detail: "835 ERA reverses original denial; net payment issued.", outcome: "Paid after appeal" },
    ] as Step[],
  },
];

export const adjudicationSim: CalculatorFactory = () => {
  let scenarioIdx = 0;
  let currentStep = -1;

  const calc: Calculator = {
    mount(el) {
      el.classList.add("calc");
      el.replaceChildren(html`
        <div class="calc-eyebrow">Interactive simulation</div>
        <h3 class="calc-title">Claim Adjudication Walkthrough</h3>
        <p style="margin: 0 0 var(--space-3); font-size: 14px; color: var(--c-ink-soft);">
          Pick a scenario and step through the payer's adjudication pipeline. Each step is what
          a real claims engine actually does, in order.
        </p>
        <div style="margin-bottom: var(--space-3);">
          <select id="adj-scenario" style="width: 100%; padding: 6px 10px; border: 1px solid var(--c-line); border-radius: var(--radius-sm); background: #fff; font: inherit; font-size: 14px;"></select>
        </div>
        <div class="calc-step-list" id="adj-steps"></div>
        <div class="calc-step-actions">
          <button class="calc-btn" id="adj-prev">← Back</button>
          <button class="calc-btn primary" id="adj-next">Next step →</button>
          <button class="calc-btn" id="adj-reset">Reset</button>
        </div>
      `);

      const sel = el.querySelector<HTMLSelectElement>("#adj-scenario")!;
      sel.replaceChildren(
        ...scenarios.map((s, i) => {
          const o = document.createElement("option");
          o.value = String(i);
          o.textContent = `${s.label} (billed ${money(s.billed)})`;
          return o;
        })
      );

      const stepsEl = el.querySelector<HTMLDivElement>("#adj-steps")!;
      const prev = el.querySelector<HTMLButtonElement>("#adj-prev")!;
      const next = el.querySelector<HTMLButtonElement>("#adj-next")!;
      const reset = el.querySelector<HTMLButtonElement>("#adj-reset")!;

      function render() {
        const sc = scenarios[scenarioIdx];
        stepsEl.replaceChildren(
          ...sc.steps.map((s, i) => {
            const cls = i < currentStep ? "done" : i === currentStep ? "active" : "";
            return html`
              <div class="calc-step ${cls}">
                <div class="calc-step-num">${i + 1}</div>
                <div class="calc-step-body">
                  <div class="calc-step-title">${s.title}</div>
                  ${i <= currentStep ? html`<div class="calc-step-detail">${s.detail}</div>` : ""}
                  ${i <= currentStep && s.outcome ? html`<div class="calc-step-detail" style="color: var(--c-good); font-weight: 500; margin-top: 4px;">→ ${s.outcome}</div>` : ""}
                </div>
              </div>`;
          })
        );
        prev.disabled = currentStep < 0;
        next.disabled = currentStep >= sc.steps.length - 1;
        next.textContent = currentStep === -1 ? "Start →" : currentStep >= sc.steps.length - 1 ? "Done" : "Next step →";
      }

      sel.addEventListener("change", () => { scenarioIdx = Number(sel.value); currentStep = -1; render(); });
      prev.addEventListener("click", () => { if (currentStep > -1) { currentStep--; render(); } });
      next.addEventListener("click", () => { if (currentStep < scenarios[scenarioIdx].steps.length - 1) { currentStep++; render(); } });
      reset.addEventListener("click", () => { currentStep = -1; render(); });

      render();
      return () => {};
    },
  };
  return calc;
};
