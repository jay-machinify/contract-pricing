import { html } from "../lib/html";
import { money } from "../lib/money";
import { drgPayment, perDiemTotal } from "../lib/pricing-math";
import type { Calculator, CalculatorFactory } from "./types";

interface Scenario {
  label: string;
  billedCharges: number;
  medicareEquivalent: number;   // what Medicare would pay
  drgWeight: number;
  daysByLevel: Array<{ level: "med-surg" | "icu" | "nicu"; days: number }>;
  carveOuts: number;            // total dollar carve-outs in a per-diem contract
  caseRate: number;             // flat case rate for this episode
}

const scenarios: Scenario[] = [
  {
    label: "Knee replacement, 4-day inpatient stay",
    billedCharges: 78000,
    medicareEquivalent: 14328,
    drgWeight: 1.9904,
    daysByLevel: [{ level: "med-surg", days: 4 }],
    carveOuts: 6500,
    caseRate: 22000,
  },
  {
    label: "ICU sepsis, 8-day stay (3 ICU + 5 med-surg)",
    billedCharges: 145000,
    medicareEquivalent: 24800,
    drgWeight: 1.7563,
    daysByLevel: [
      { level: "icu", days: 3 },
      { level: "med-surg", days: 5 },
    ],
    carveOuts: 5200,
    caseRate: 32000,
  },
  {
    label: "Cesarean delivery, 3-day stay",
    billedCharges: 42000,
    medicareEquivalent: 8650,
    drgWeight: 1.0628,
    daysByLevel: [{ level: "med-surg", days: 3 }],
    carveOuts: 0,
    caseRate: 13500,
  },
];

const perDiemRates = { "med-surg": 2200, "icu": 4800, "nicu": 5600 };

export const contractComparison: CalculatorFactory = () => {
  let scenarioIdx = 0;
  let pctOfMedicare = 140; // 140% of Medicare
  let pctOfCharges = 55;
  let drgBaseRate = 7200;
  let stopLossPctCharges = 75; // when stop-loss triggers, fall back to this % of charges

  const calc: Calculator = {
    mount(el) {
      el.classList.add("calc");
      el.replaceChildren(html`
        <div class="calc-eyebrow">Calculator</div>
        <h3 class="calc-title">Contract Comparison — One Claim, Five Methodologies</h3>
        <p style="margin: 0 0 var(--space-3); font-size: 14px; color: var(--c-ink-soft);">
          Pick a scenario. Watch how the same hospitalization is reimbursed under different
          contract types. The methodology a payer chooses for a service line drives massive
          differences in payment.
        </p>
        <div class="calc-grid">
          <div class="calc-inputs">
            <div class="calc-row"><label>Scenario</label><select id="cc-scenario" style="grid-column: 1 / span 2;"></select></div>
            <div class="calc-row"><label>% of Medicare</label><input id="cc-pom" type="number" step="5" /></div>
            <div class="calc-row"><label>% of charges</label><input id="cc-poc" type="number" step="5" /></div>
            <div class="calc-row"><label>DRG base rate ($)</label><input id="cc-base" type="number" step="100" /></div>
            <div class="calc-row"><label>Stop-loss % of charges</label><input id="cc-sl" type="number" step="5" /></div>
          </div>
          <div>
            <div id="cc-summary" style="font-size: 13px; color: var(--c-ink-soft); margin-bottom: var(--space-2)"></div>
            <table class="calc-comparison-table" id="cc-table"></table>
          </div>
        </div>
      `);

      const $ = <T extends HTMLElement>(s: string) => el.querySelector<T>(s)!;
      const sel = $<HTMLSelectElement>("#cc-scenario");
      sel.replaceChildren(
        ...scenarios.map((s, i) => {
          const o = document.createElement("option");
          o.value = String(i);
          o.textContent = `${s.label} (billed ${money(s.billedCharges)})`;
          return o;
        })
      );

      const pomI = $<HTMLInputElement>("#cc-pom");
      const pocI = $<HTMLInputElement>("#cc-poc");
      const baseI = $<HTMLInputElement>("#cc-base");
      const slI = $<HTMLInputElement>("#cc-sl");
      const summary = $<HTMLDivElement>("#cc-summary");
      const table = $<HTMLTableElement>("#cc-table");

      function sync() {
        pomI.value = String(pctOfMedicare);
        pocI.value = String(pctOfCharges);
        baseI.value = String(drgBaseRate);
        slI.value = String(stopLossPctCharges);
      }

      function recompute() {
        const s = scenarios[scenarioIdx];
        summary.replaceChildren(html`<div>
          <strong>Billed charges:</strong> ${money(s.billedCharges)} ·
          <strong>Medicare-equivalent:</strong> ${money(s.medicareEquivalent)}
        </div>`);

        const pomPay = s.medicareEquivalent * (pctOfMedicare / 100);
        const pocPay = s.billedCharges * (pctOfCharges / 100);
        const drg = drgPayment({
          drgWeight: s.drgWeight,
          baseRate: drgBaseRate,
          wageIndex: 1.0,
          laborShare: 0.677,
        });
        const pdDays = s.daysByLevel.flatMap((d) =>
          Array.from({ length: d.days }, () => ({ level: d.level, rate: perDiemRates[d.level] }))
        );
        let perDiemPay = perDiemTotal(pdDays) + s.carveOuts;
        // stop-loss: if charges exceed 5x per-diem, contract may flip to % of charges
        const stopLossTrigger = s.billedCharges > perDiemPay * 5;
        if (stopLossTrigger) {
          perDiemPay = s.billedCharges * (stopLossPctCharges / 100);
        }
        const caseRatePay = s.caseRate;

        const rows = [
          { label: `${pctOfMedicare}% of Medicare`, payment: pomPay, note: `${money(s.medicareEquivalent)} × ${pctOfMedicare}%` },
          { label: `${pctOfCharges}% of billed charges`, payment: pocPay, note: `${money(s.billedCharges)} × ${pctOfCharges}%` },
          { label: "DRG", payment: drg, note: `Base ${money(drgBaseRate)} × wt ${s.drgWeight.toFixed(4)}` },
          { label: "Per diem + carve-outs", payment: perDiemPay, note: stopLossTrigger ? `Stop-loss triggered → ${stopLossPctCharges}% of charges` : `${pdDays.length} days @ tiered rates + ${money(s.carveOuts)} carve-outs` },
          { label: "Case rate", payment: caseRatePay, note: "Single flat payment for the episode" },
        ];

        const winner = rows.reduce((max, r) => (r.payment > max.payment ? r : max), rows[0]);

        table.replaceChildren(html`
          <thead><tr><th>Methodology</th><th class="num">Payment</th><th>Notes</th></tr></thead>
          <tbody>
            ${rows.map((r) => html`
              <tr class="${r === winner ? "winner" : ""}">
                <td>${r.label}</td>
                <td class="num">${money(r.payment)}</td>
                <td style="font-size: 12px; color: var(--c-ink-soft)">${r.note}</td>
              </tr>`)}
          </tbody>
        `);
      }

      sel.addEventListener("change", () => { scenarioIdx = Number(sel.value); recompute(); });
      pomI.addEventListener("input", () => { pctOfMedicare = parseFloat(pomI.value) || 0; recompute(); });
      pocI.addEventListener("input", () => { pctOfCharges = parseFloat(pocI.value) || 0; recompute(); });
      baseI.addEventListener("input", () => { drgBaseRate = parseFloat(baseI.value) || 0; recompute(); });
      slI.addEventListener("input", () => { stopLossPctCharges = parseFloat(slI.value) || 0; recompute(); });

      sync();
      recompute();
      return () => {};
    },
  };
  return calc;
};
