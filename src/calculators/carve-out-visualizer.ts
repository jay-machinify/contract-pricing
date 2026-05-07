import { html } from "../lib/html";
import { money } from "../lib/money";
import type { Calculator, CalculatorFactory } from "./types";

interface Day {
  level: "med-surg" | "icu" | "nicu";
  carveOut: { kind: string; amount: number } | null;
}

const levelRates: Record<Day["level"], number> = {
  "med-surg": 2200,
  "icu": 4800,
  "nicu": 5600,
};

const carveOptions = [
  { kind: "Implant (knee)", amount: 6500 },
  { kind: "High-cost drug", amount: 3200 },
  { kind: "Specialty pharmacy", amount: 1800 },
];

export const carveOutVisualizer: CalculatorFactory = () => {
  let days: Day[] = [
    { level: "med-surg", carveOut: null },
    { level: "med-surg", carveOut: null },
    { level: "icu", carveOut: null },
    { level: "med-surg", carveOut: { kind: "Implant (knee)", amount: 6500 } },
  ];
  let carveOutsEnabled = true;

  const calc: Calculator = {
    mount(el) {
      el.classList.add("calc");
      el.replaceChildren(html`
        <div class="calc-eyebrow">Calculator</div>
        <h3 class="calc-title">Per-Diem Hospital Contract — Carve-Out Visualizer</h3>
        <p style="margin: 0 0 var(--space-3); font-size: 14px; color: var(--c-ink-soft);">
          Build an inpatient stay day by day. Each day has a per-diem rate by level of care,
          and may include a contracted carve-out for high-cost items. Toggle carve-outs to see
          how much they swing the total.
        </p>
        <div class="calc-toggle-row">
          <label for="co-enabled">Carve-outs enabled (uncheck to model a no-carve-out contract)</label>
          <input type="checkbox" id="co-enabled" />
        </div>
        <div id="co-days" class="calc-line-items" style="margin: var(--space-3) 0;"></div>
        <div class="calc-list-controls">
          <button class="calc-btn" id="co-add">+ Add day</button>
          <button class="calc-btn" id="co-add-co">+ Add day with carve-out</button>
        </div>
        <div class="calc-output" id="co-out" style="margin-top: var(--space-4);"></div>
      `);

      const toggle = el.querySelector<HTMLInputElement>("#co-enabled")!;
      const daysEl = el.querySelector<HTMLDivElement>("#co-days")!;
      const out = el.querySelector<HTMLDivElement>("#co-out")!;
      toggle.checked = carveOutsEnabled;

      function renderDays() {
        daysEl.replaceChildren(
          ...days.map((d, i) => {
            const row = html`
              <div class="calc-line-item">
                <span style="font-size: 13px;">Day ${i + 1}</span>
                <select data-i="${i}" data-field="level"></select>
                <select data-i="${i}" data-field="carve"></select>
                <button class="remove-btn" data-i="${i}" title="Remove day">×</button>
              </div>`;
            const levelSel = row.querySelector<HTMLSelectElement>("[data-field='level']")!;
            (Object.keys(levelRates) as Day["level"][]).forEach((lv) => {
              const o = document.createElement("option");
              o.value = lv;
              o.textContent = `${lv} ${money(levelRates[lv])}/day`;
              if (lv === d.level) o.selected = true;
              levelSel.appendChild(o);
            });
            const carveSel = row.querySelector<HTMLSelectElement>("[data-field='carve']")!;
            const noneOpt = document.createElement("option");
            noneOpt.value = "";
            noneOpt.textContent = "(no carve-out)";
            if (!d.carveOut) noneOpt.selected = true;
            carveSel.appendChild(noneOpt);
            carveOptions.forEach((c) => {
              const o = document.createElement("option");
              o.value = c.kind;
              o.textContent = `+ ${c.kind} ${money(c.amount)}`;
              if (d.carveOut && d.carveOut.kind === c.kind) o.selected = true;
              carveSel.appendChild(o);
            });
            return row;
          })
        );

        daysEl.querySelectorAll<HTMLSelectElement>("select[data-field='level']").forEach((s) => {
          s.addEventListener("change", () => {
            const i = Number(s.dataset.i);
            days[i].level = s.value as Day["level"];
            recompute();
          });
        });
        daysEl.querySelectorAll<HTMLSelectElement>("select[data-field='carve']").forEach((s) => {
          s.addEventListener("change", () => {
            const i = Number(s.dataset.i);
            const found = carveOptions.find((c) => c.kind === s.value);
            days[i].carveOut = found ? { kind: found.kind, amount: found.amount } : null;
            renderDays();
            recompute();
          });
        });
        daysEl.querySelectorAll<HTMLButtonElement>("button.remove-btn").forEach((b) => {
          b.addEventListener("click", () => {
            const i = Number(b.dataset.i);
            days.splice(i, 1);
            renderDays();
            recompute();
          });
        });
      }

      function recompute() {
        let perDiemTotal = 0;
        let carveTotal = 0;
        days.forEach((d) => {
          perDiemTotal += levelRates[d.level];
          if (carveOutsEnabled && d.carveOut) carveTotal += d.carveOut.amount;
        });
        const total = perDiemTotal + carveTotal;
        out.replaceChildren(html`
          <div class="calc-output-row"><span class="label">Per-diem subtotal (${days.length} days)</span><span class="value">${money(perDiemTotal)}</span></div>
          <div class="calc-output-row"><span class="label">Carve-out subtotal ${carveOutsEnabled ? "" : "(disabled)"}</span><span class="value">${money(carveTotal)}</span></div>
          <div class="calc-output-total"><span class="label">Total contract payment</span><span class="value">${money(total)}</span></div>
        `);
      }

      el.querySelector<HTMLButtonElement>("#co-add")!.addEventListener("click", () => {
        days.push({ level: "med-surg", carveOut: null });
        renderDays();
        recompute();
      });
      el.querySelector<HTMLButtonElement>("#co-add-co")!.addEventListener("click", () => {
        days.push({ level: "med-surg", carveOut: { ...carveOptions[1] } });
        renderDays();
        recompute();
      });
      toggle.addEventListener("change", () => {
        carveOutsEnabled = toggle.checked;
        recompute();
      });

      renderDays();
      recompute();
      return () => {};
    },
  };
  return calc;
};
