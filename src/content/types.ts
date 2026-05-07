export interface Chapter {
  slug: string;
  title: string;
  subtitle?: string;
  render(): HTMLElement | DocumentFragment;
}

export interface Walkthrough {
  slug: "claim-pricing" | "contracts" | "case-files";
  title: string;
  blurb: string;
  chapters: Chapter[];
}
