import type { Walkthrough } from "../types";
import { chapter as ch01 } from "./ch01-lifecycle";
import { chapter as ch02 } from "./ch02-anatomy";
import { chapter as ch03 } from "./ch03-building-blocks";
import { chapter as ch04 } from "./ch04-fee-schedules";
import { chapter as ch05 } from "./ch05-professional-deep-dive";
import { chapter as ch06 } from "./ch06-drg";
import { chapter as ch07 } from "./ch07-opps-apc";
import { chapter as ch08 } from "./ch08-other-methods";
import { chapter as ch09 } from "./ch09-cost-share";
import { chapter as ch10 } from "./ch10-cob";
import { chapter as ch11 } from "./ch11-adjudication";
import { chapter as ch12 } from "./ch12-eob";

export const claimPricingWalkthrough: Walkthrough = {
  slug: "claim-pricing",
  title: "Pricing Claims",
  blurb: "From service to payment — fee schedules, DRGs, APCs, member cost share, and end-to-end adjudication.",
  chapters: [ch01, ch02, ch03, ch04, ch05, ch06, ch07, ch08, ch09, ch10, ch11, ch12],
};
