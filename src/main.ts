import "./styles/global.css";
import "./styles/prose.css";
import "./styles/calculators.css";

import { route, setNotFound, startRouter } from "./router";
import { buildShell } from "./shell";
import { landingRoute, notFoundRoute } from "./pages/landing";
import { chapterRoute } from "./pages/chapter";
import { glossaryRoute } from "./content/glossary/glossary-page";
import { claimPricingWalkthrough } from "./content/claim-pricing";
import { contractsWalkthrough } from "./content/contracts";
import { caseFilesWalkthrough } from "./content/case-files";

const root = document.getElementById("app");
if (!root) throw new Error("#app not found");
const outlet = buildShell(root);

route("/", () => landingRoute());
route("/glossary", () => glossaryRoute());

route("/claim-pricing", () => {
  const first = claimPricingWalkthrough.chapters[0];
  return chapterRoute(claimPricingWalkthrough, first.slug);
});
route("/claim-pricing/:slug", ({ slug }) => chapterRoute(claimPricingWalkthrough, slug));

route("/contracts", () => {
  const first = contractsWalkthrough.chapters[0];
  return chapterRoute(contractsWalkthrough, first.slug);
});
route("/contracts/:slug", ({ slug }) => chapterRoute(contractsWalkthrough, slug));

route("/case-files", () => {
  const first = caseFilesWalkthrough.chapters[0];
  return chapterRoute(caseFilesWalkthrough, first.slug);
});
route("/case-files/:slug", ({ slug }) => chapterRoute(caseFilesWalkthrough, slug));

setNotFound(() => notFoundRoute());

startRouter(outlet);
