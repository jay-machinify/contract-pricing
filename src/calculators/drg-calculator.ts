import { html } from "../lib/html";
import { money, num, pct } from "../lib/money";
import { drgPayment } from "../lib/pricing-math";
import type { Calculator, CalculatorFactory } from "./types";

interface Drg {
  code: string; title: string; weight: number;
}

const drgs: Drg[] = [
  { code: "470", title: "Major joint replacement w/o MCC", weight: 1.9904 },
  { code: "291", title: "Heart failure & shock w/ MCC", weight: 1.4347 },
  { code: "871", title: "Septicemia w/o MV >96 hours, w/ MCC", weight: 1.7563 },
  { code: "765", title: "Cesarean section w/ CC/MCC", weight: 1.0628 },
  { code: "885", title: "Psychoses", weight: 0.9920 },
];

export const drgCalculator: CalculatorFactory = () => {
  let drgIdx = 0;
  let baseRate = 6500;          // hospital-specific base operating rate
  let wageIndex = 1.000;
  let laborShare = 0.677;
  let imePct = 0;               // percent
  let dshPct = 0;
  let outlier = 0;
  let transferReductionPct = 0;

  const calc: Calculator = {
    mount(el) {
      el.classList.add("calc");
      el.replaceChildren(html`
        <div class="calc-eyebrow">Calculator</div>
        <h3 class="calc-title">MS-DRG Inpatient Payment</h3>
        <p style="margin: 0 0 var(--space-3); font-size: 14px; color: var(--c-ink-soft);">
          Pick a DRG, set the hospital's base rate and wage index, layer in adjustments.
          Formula: <code>base × (labor·WI + non-labor) × DRG weight</code>, then add IME/DSH and outliers.
        </p>
        <div class="calc-grid">
          <div class="calc-inputs">
            <div class="calc-row"><label>DRG</label><select id="dr-drg" style="grid-column: 1 / span 2"></select></div>
            <div class="calc-row"><label>Base rate ($)</label><input id="dr-base" type="number" step="100" /></div>
            <div class="calc-row"><label>Wage index</label><input id="dr-wi" type="number" step="0.01" /></div>
            <div class="calc-row"><label>Labor share</label><input id="dr-ls" type="number" step="0.001" /></div>
            <div class="calc-row"><label>IME % add-on</label><input id="dr-ime" type="number" step="0.5" /></div>
            <div class="calc-row"><label>DSH % add-on</label><input id="dr-dsh" type="number" step="0.5" /></div>
            <div class="calc-row"><label>Outlier payment ($)</label><input id="dr-out" type="number" step="500" /></div>
            <div class="calc-row"><label>Transfer reduction %</label><input id="dr-tx" type="number" step="5" /></div>
          </div>
          <div>
            <div class="calc-output" id="dr-result"></div>
            <p style="font-size: 12px; color: var(--c-ink-muted); margin: var(--space-2) 0 0;">
              Default labor share is 0.677, the historical CMS value for the labor portion of the DRG base rate.
            </p>
          </div>
        </div>
      `);

      const sel = el.querySelector<HTMLSelectElement>("#dr-drg")!;
      sel.replaceChildren(
        ...drgs.map((d, i) => {
          const o = document.createElement("option");
          o.value = String(i);
          o.textContent = `DRG ${d.code} — ${d.title} (wt ${d.weight.toFixed(4)})`;
          return o;
        })
      );

      const $ = <T extends HTMLElement>(s: string) => el.querySelector<T>(s)!;
      const baseI = $<HTMLInputElement>("#dr-base");
      const wiI = $<HTMLInputElement>("#dr-wi");
      const lsI = $<HTMLInputElement>("#dr-ls");
      const imeI = $<HTMLInputElement>("#dr-ime");
      const dshI = $<HTMLInputElement>("#dr-dsh");
      const outI = $<HTMLInputElement>("#dr-out");
      const txI = $<HTMLInputElement>("#dr-tx");
      const resEl = $<HTMLDivElement>("#dr-result");

      function sync() {
        baseI.value = String(baseRate);
        wiI.value = String(wageIndex);
        lsI.value = String(laborShare);
        imeI.value = String(imePct);
        dshI.value = String(dshPct);
        outI.value = String(outlier);
        txI.value = String(transferReductionPct);
      }

      function recompute() {
        const drg = drgs[drgIdx];
        const wageAdjusted = baseRate * (laborShare * wageIndex + (1 - laborShare));
        const total = drgPayment({
          drgWeight: drg.weight,
          baseRate, wageIndex, laborShare,
          imeFactor: imePct / 100,
          dshFactor: dshPct / 100,
          outlierPayment: outlier,
          transferReduction: transferReductionPct / 100,
        });
        resEl.replaceChildren(html`
          <div class="calc-output-row"><span class="label">DRG ${drg.code} weight</span><span class="value">${num(drg.weight, 4)}</span></div>
          <div class="calc-output-row"><span class="label">Wage-adjusted base</span><span class="value">${money(wageAdjusted)}</span></div>
          <div class="calc-output-row"><span class="label">Pre-adjustment payment</span><span class="value">${money(wageAdjusted * drg.weight)}</span></div>
          ${imePct ? html`<div class="calc-output-row"><span class="label">+ IME ${pct(imePct/100, 1)}</span><span class="value">+ ${money(wageAdjusted * drg.weight * imePct/100)}</span></div>` : ""}
          ${dshPct ? html`<div class="calc-output-row"><span class="label">+ DSH ${pct(dshPct/100, 1)}</span><span class="value">+ ${money(wageAdjusted * drg.weight * (1+imePct/100) * dshPct/100)}</span></div>` : ""}
          ${transferReductionPct ? html`<div class="calc-output-row"><span class="label">− Transfer reduction ${pct(transferReductionPct/100, 1)}</span><span class="value" style="color: var(--c-warm)">applied</span></div>` : ""}
          ${outlier ? html`<div class="calc-output-row"><span class="label">+ Outlier add-on</span><span class="value">+ ${money(outlier)}</span></div>` : ""}
          <div class="calc-output-total"><span class="label">Total payment</span><span class="value">${money(total)}</span></div>
        `);
      }

      sel.addEventListener("change", () => { drgIdx = Number(sel.value); recompute(); });
      baseI.addEventListener("input", () => { baseRate = parseFloat(baseI.value) || 0; recompute(); });
      wiI.addEventListener("input", () => { wageIndex = parseFloat(wiI.value) || 0; recompute(); });
      lsI.addEventListener("input", () => { laborShare = parseFloat(lsI.value) || 0; recompute(); });
      imeI.addEventListener("input", () => { imePct = parseFloat(imeI.value) || 0; recompute(); });
      dshI.addEventListener("input", () => { dshPct = parseFloat(dshI.value) || 0; recompute(); });
      outI.addEventListener("input", () => { outlier = parseFloat(outI.value) || 0; recompute(); });
      txI.addEventListener("input", () => { transferReductionPct = parseFloat(txI.value) || 0; recompute(); });

      sync();
      recompute();
      return () => {};
    },
  };
  return calc;
};
