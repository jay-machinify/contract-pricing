import { html } from "../lib/html";
import { money } from "../lib/money";
import { memberCostShare as computeCostShare } from "../lib/pricing-math";
import type { Calculator, CalculatorFactory } from "./types";

export const memberCostShare: CalculatorFactory = () => {
  let allowed = 1200;
  let dedRemaining = 800;
  let copay = 0;
  let coinsRate = 20; // percent
  let oopRemaining = 5000;

  const calc: Calculator = {
    mount(el) {
      el.classList.add("calc");
      el.replaceChildren(html`
        <div class="calc-eyebrow">Calculator</div>
        <h3 class="calc-title">Member Cost Share</h3>
        <p style="margin: 0 0 var(--space-3); font-size: 14px; color: var(--c-ink-soft);">
          Allowed amount goes to deductible first, then copay (if any) or coinsurance.
          Member payment is capped by remaining out-of-pocket max.
        </p>
        <div class="calc-grid">
          <div class="calc-inputs">
            <div class="calc-row"><label>Allowed amount ($)</label><input id="mc-allowed" type="number" step="50" /></div>
            <div class="calc-row"><label>Deductible remaining ($)</label><input id="mc-ded" type="number" step="50" /></div>
            <div class="calc-row"><label>Copay ($, 0 = use coins)</label><input id="mc-copay" type="number" step="5" /></div>
            <div class="calc-row"><label>Coinsurance %</label><input id="mc-coins" type="number" step="5" /></div>
            <div class="calc-row"><label>OOP max remaining ($)</label><input id="mc-oop" type="number" step="100" /></div>
          </div>
          <div>
            <div class="calc-output" id="mc-out"></div>
            <div id="mc-bar"></div>
          </div>
        </div>
      `);

      const $ = <T extends HTMLInputElement>(s: string) => el.querySelector<T>(s)!;
      const aI = $("#mc-allowed");
      const dI = $("#mc-ded");
      const cpI = $("#mc-copay");
      const coI = $("#mc-coins");
      const oI = $("#mc-oop");
      const out = el.querySelector<HTMLDivElement>("#mc-out")!;
      const bar = el.querySelector<HTMLDivElement>("#mc-bar")!;

      function sync() {
        aI.value = String(allowed);
        dI.value = String(dedRemaining);
        cpI.value = String(copay);
        coI.value = String(coinsRate);
        oI.value = String(oopRemaining);
      }

      function recompute() {
        const r = computeCostShare({
          allowedAmount: allowed,
          deductibleRemaining: dedRemaining,
          copay,
          coinsuranceRate: coinsRate / 100,
          oopMaxRemaining: oopRemaining,
        });
        out.replaceChildren(html`
          <div class="calc-output-row"><span class="label">Allowed amount</span><span class="value">${money(allowed)}</span></div>
          <div class="calc-output-row"><span class="label">Applied to deductible</span><span class="value">${money(r.appliedToDeductible)}</span></div>
          <div class="calc-output-row"><span class="label">${copay > 0 ? "Copay" : `Coinsurance ${coinsRate}%`}</span><span class="value">${money(r.appliedToCopayOrCoins)}</span></div>
          ${r.cappedByOopMax ? html`<div class="calc-output-row" style="color: var(--c-good)"><span class="label">Capped by OOP max</span><span class="value">✓</span></div>` : ""}
          <div class="calc-output-total"><span class="label">Member pays</span><span class="value">${money(r.memberPays)}</span></div>
          <div class="calc-output-total" style="border-top: 0; padding-top: 0;"><span class="label" style="color: var(--c-good)">Plan pays</span><span class="value" style="color: var(--c-good)">${money(r.planPays)}</span></div>
        `);
        const total = Math.max(allowed, 0.0001);
        const memberPct = (r.memberPays / total) * 100;
        const planPct = (r.planPays / total) * 100;
        bar.replaceChildren(html`
          <div style="margin-top: var(--space-2)">
            <div class="calc-bar">
              ${memberPct > 0 ? html`<div class="calc-bar-segment calc-bar-member" style="flex-basis: ${memberPct}%">${memberPct >= 12 ? `Member ${memberPct.toFixed(0)}%` : ""}</div>` : ""}
              ${planPct > 0 ? html`<div class="calc-bar-segment calc-bar-plan" style="flex-basis: ${planPct}%">${planPct >= 12 ? `Plan ${planPct.toFixed(0)}%` : ""}</div>` : ""}
            </div>
          </div>
        `);
      }

      aI.addEventListener("input", () => { allowed = parseFloat(aI.value) || 0; recompute(); });
      dI.addEventListener("input", () => { dedRemaining = parseFloat(dI.value) || 0; recompute(); });
      cpI.addEventListener("input", () => { copay = parseFloat(cpI.value) || 0; recompute(); });
      coI.addEventListener("input", () => { coinsRate = parseFloat(coI.value) || 0; recompute(); });
      oI.addEventListener("input", () => { oopRemaining = parseFloat(oI.value) || 0; recompute(); });

      sync();
      recompute();
      return () => {};
    },
  };
  return calc;
};
