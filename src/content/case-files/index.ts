import type { Walkthrough } from "../types";
import { chapter as ch01 } from "./case01-sarah-wrist";
import { chapter as ch02 } from "./case02-bob-knee";
import { chapter as ch03 } from "./case03-lisa-maternity";
import { chapter as ch04 } from "./case04-marcus-infusion";
import { chapter as ch05 } from "./case05-tom-heart-attack";

export const caseFilesWalkthrough: Walkthrough = {
  slug: "case-files",
  title: "Case Files",
  blurb: "Patient journeys that bring the concepts together.",
  chapters: [ch01, ch02, ch03, ch04, ch05],
};
