import type { Walkthrough } from "../types";
import { chapter as ch01 } from "./ch01-why-contracts";
import { chapter as ch02 } from "./ch02-anatomy";
import { chapter as ch03 } from "./ch03-provider-types";
import { chapter as ch04 } from "./ch04-methodologies";
import { chapter as ch05 } from "./ch05-hospital-deep-dive";
import { chapter as ch06 } from "./ch06-professional";
import { chapter as ch07 } from "./ch07-carve-outs";
import { chapter as ch08 } from "./ch08-risk";
import { chapter as ch09 } from "./ch09-tiers";
import { chapter as ch10 } from "./ch10-government";
import { chapter as ch11 } from "./ch11-operationalizing";
import { chapter as ch12 } from "./ch12-case-studies";

export const contractsWalkthrough: Walkthrough = {
  slug: "contracts",
  title: "Contracts",
  blurb: "How payers and providers negotiate the rates that drive pricing.",
  chapters: [ch01, ch02, ch03, ch04, ch05, ch06, ch07, ch08, ch09, ch10, ch11, ch12],
};
