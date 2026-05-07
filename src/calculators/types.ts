export interface Calculator {
  mount(el: HTMLElement): () => void; // returns unmount/cleanup
}

export type CalculatorFactory = () => Calculator;
