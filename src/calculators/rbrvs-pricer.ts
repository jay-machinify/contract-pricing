import { html } from "../lib/html";
import { money, num } from "../lib/money";
import { rbrvsAllowed } from "../lib/pricing-math";
import type { Calculator, CalculatorFactory } from "./types";

interface Preset {
  label: string;
  cpt: string;
  description: string;
  workRvu: number;
  peRvu: number;
  mpRvu: number;
}

const presets: Preset[] = [
  { label: "99213 — Office visit, established, 20–29 min", cpt: "99213", description: "Most common professional visit code", workRvu: 1.30, peRvu: 1.04, mpRvu: 0.10 },
  { label: "99214 — Office visit, established, 30–39 min", cpt: "99214", description: "Moderately complex established visit", workRvu: 1.92, peRvu: 1.49, mpRvu: 0.14 },
  { label: "27447 — Total knee arthroplasty", cpt: "27447", description: "Major orthopedic procedure", workRvu: 20.72, peRvu: 18.60, mpRvu: 4.21 },
  { label: "45378 — Diagnostic colonoscopy", cpt: "45378", description: "Common GI procedure", workRvu: 3.36, peRvu: 1.65, mpRvu: 0.36 },
];

export const rbrvsPricer: CalculatorFactory = () => {
  let preset = presets[0];
  let workRvu = preset.workRvu;
  let peRvu = preset.peRvu;
  let mpRvu = preset.mpRvu;
  let workGpci = 1.000;
  let peGpci = 1.000;
  let mpGpci = 1.000;
  let cf = 32.74; // 2024 Medicare CF

  const calc: Calculator = {
    mount(el) {
      el.classList.add("calc");
      el.replaceChildren(html`
        <div class="calc-eyebrow">Calculator</div>
        <h3 class="calc-title">RBRVS Allowed Amount</h3>
        <p style="margin: 0 0 var(--space-3); font-size: 14px; color: var(--c-ink-soft);">
          Pick a procedure or enter your own RVUs. The Medicare formula:
          <code>(work·workGPCI + PE·peGPCI + MP·mpGPCI) × CF</code>.
        </p>
        <div class="calc-grid">
          <div class="calc-inputs">
            <div class="calc-row">
              <label>Procedure</label>
              <select id="rb-preset" style="grid-column: 1 / span 2"></select>
            </div>
            <div class="calc-row"><label>Work RVU</label><input id="rb-w" type="number" step="0.01" /></div>
            <div class="calc-row"><label>Practice Expense RVU</label><input id="rb-pe" type="number" step="0.01" /></div>
            <div class="calc-row"><label>Malpractice RVU</label><input id="rb-mp" type="number" step="0.01" /></div>
            <div class="calc-row"><label>Work GPCI</label><input id="rb-wg" type="number" step="0.001" /></div>
            <div class="calc-row"><label>PE GPCI</label><input id="rb-peg" type="number" step="0.001" /></div>
            <div class="calc-row"><label>MP GPCI</label><input id="rb-mpg" type="number" step="0.001" /></div>
            <div class="calc-row"><label>Conversion Factor ($)</label><input id="rb-cf" type="number" step="0.01" /></div>
          </div>
          <div>
            <div class="calc-output" id="rb-out"></div>
            <p style="font-size: 12px; color: var(--c-ink-muted); margin: var(--space-2) 0 0;">
              Default GPCIs are 1.000 (national average). Adjust to model a specific locality.
            </p>
          </div>
        </div>
      `);

      const sel = el.querySelector<HTMLSelectElement>("#rb-preset")!;
      sel.replaceChildren(
        ...presets.map((p, i) => {
          const opt = document.createElement("option");
          opt.value = String(i);
          opt.textContent = p.label;
          return opt;
        })
      );

      const $ = (id: string) => el.querySelector<HTMLInputElement>(id)!;
      const wInput = $("#rb-w");
      const peInput = $("#rb-pe");
      const mpInput = $("#rb-mp");
      const wgInput = $("#rb-wg");
      const pegInput = $("#rb-peg");
      const mpgInput = $("#rb-mpg");
      const cfInput = $("#rb-cf");
      const out = el.querySelector<HTMLDivElement>("#rb-out")!;

      function syncInputs() {
        wInput.value = String(workRvu);
        peInput.value = String(peRvu);
        mpInput.value = String(mpRvu);
        wgInput.value = String(workGpci);
        pegInput.value = String(peGpci);
        mpgInput.value = String(mpGpci);
        cfInput.value = String(cf);
      }

      function recompute() {
        const allowed = rbrvsAllowed({ workRvu, peRvu, mpRvu, workGpci, peGpci, mpGpci, conversionFactor: cf });
        const workComp = workRvu * workGpci;
        const peComp = peRvu * peGpci;
        const mpComp = mpRvu * mpGpci;
        const totalRvu = workComp + peComp + mpComp;
        out.replaceChildren(html`
          <div class="calc-output-row"><span class="label">Adjusted work</span><span class="value">${num(workComp, 3)}</span></div>
          <div class="calc-output-row"><span class="label">Adjusted PE</span><span class="value">${num(peComp, 3)}</span></div>
          <div class="calc-output-row"><span class="label">Adjusted MP</span><span class="value">${num(mpComp, 3)}</span></div>
          <div class="calc-output-row"><span class="label">Total adjusted RVU</span><span class="value">${num(totalRvu, 3)}</span></div>
          <div class="calc-output-row"><span class="label">× Conversion factor</span><span class="value">${money(cf)}</span></div>
          <div class="calc-output-total"><span class="label">Allowed amount</span><span class="value">${money(allowed)}</span></div>
        `);
      }

      sel.addEventListener("change", () => {
        const p = presets[Number(sel.value)];
        if (!p) return;
        preset = p;
        workRvu = p.workRvu; peRvu = p.peRvu; mpRvu = p.mpRvu;
        syncInputs(); recompute();
      });
      wInput.addEventListener("input", () => { workRvu = parseFloat(wInput.value) || 0; recompute(); });
      peInput.addEventListener("input", () => { peRvu = parseFloat(peInput.value) || 0; recompute(); });
      mpInput.addEventListener("input", () => { mpRvu = parseFloat(mpInput.value) || 0; recompute(); });
      wgInput.addEventListener("input", () => { workGpci = parseFloat(wgInput.value) || 0; recompute(); });
      pegInput.addEventListener("input", () => { peGpci = parseFloat(pegInput.value) || 0; recompute(); });
      mpgInput.addEventListener("input", () => { mpGpci = parseFloat(mpgInput.value) || 0; recompute(); });
      cfInput.addEventListener("input", () => { cf = parseFloat(cfInput.value) || 0; recompute(); });

      syncInputs();
      recompute();

      return () => { /* event listeners die with the element */ };
    },
  };
  return calc;
};
