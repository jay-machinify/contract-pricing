import type { CalculatorFactory } from "./types";
import { rbrvsPricer } from "./rbrvs-pricer";
import { drgCalculator } from "./drg-calculator";
import { memberCostShare } from "./member-cost-share";
import { adjudicationSim } from "./adjudication-sim";
import { carveOutVisualizer } from "./carve-out-visualizer";
import { contractComparison } from "./contract-comparison";

const registry: Record<string, CalculatorFactory> = {
  "rbrvs-pricer": rbrvsPricer,
  "drg-calculator": drgCalculator,
  "member-cost-share": memberCostShare,
  "adjudication-sim": adjudicationSim,
  "carve-out-visualizer": carveOutVisualizer,
  "contract-comparison": contractComparison,
};

export function mountCalculator(id: string, el: HTMLElement): () => void {
  const factory = registry[id];
  if (!factory) {
    el.innerHTML = `<div class="calc-missing">Unknown calculator: ${id}</div>`;
    return () => {};
  }
  const calc = factory();
  return calc.mount(el);
}

export function mountAllCalculators(root: ParentNode): (() => void)[] {
  const cleanups: (() => void)[] = [];
  root.querySelectorAll<HTMLElement>("[data-calc]").forEach((el) => {
    const id = el.dataset.calc;
    if (!id) return;
    cleanups.push(mountCalculator(id, el));
  });
  return cleanups;
}
