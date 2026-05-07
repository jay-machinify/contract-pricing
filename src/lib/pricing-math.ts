// Shared pricing primitives reused across calculators.

export function lesserOf(...values: number[]): number {
  return Math.min(...values.filter((v) => Number.isFinite(v)));
}

export function greaterOf(...values: number[]): number {
  return Math.max(...values.filter((v) => Number.isFinite(v)));
}

// RBRVS: Medicare-style fee. Each component RVU is multiplied by its GPCI,
// summed, then multiplied by the conversion factor.
export interface RbrvsInputs {
  workRvu: number;
  peRvu: number;       // practice expense RVU (facility or non-facility variant)
  mpRvu: number;       // malpractice RVU
  workGpci: number;
  peGpci: number;
  mpGpci: number;
  conversionFactor: number;
}

export function rbrvsAllowed(i: RbrvsInputs): number {
  const adjusted =
    i.workRvu * i.workGpci + i.peRvu * i.peGpci + i.mpRvu * i.mpGpci;
  return adjusted * i.conversionFactor;
}

// MS-DRG: base rate * DRG weight * (optional wage-index blend); outliers added on top.
export interface DrgInputs {
  drgWeight: number;
  baseRate: number;          // hospital-specific base operating rate
  wageIndex: number;         // CMS wage index for the CBSA
  laborShare: number;        // fraction of base rate that is labor-related (~0.677 historically)
  imeFactor?: number;        // additional payment % for teaching hospitals (0–1)
  dshFactor?: number;        // disproportionate share %
  outlierPayment?: number;   // dollar add-on for high-cost outliers
  transferReduction?: number;// reduction factor for transfers (0–1, where 0.5 = 50% reduction)
}

export function drgPayment(i: DrgInputs): number {
  const wageAdjusted =
    i.baseRate * (i.laborShare * i.wageIndex + (1 - i.laborShare));
  let pmt = wageAdjusted * i.drgWeight;
  if (i.imeFactor) pmt *= 1 + i.imeFactor;
  if (i.dshFactor) pmt *= 1 + i.dshFactor;
  if (i.transferReduction) pmt *= 1 - i.transferReduction;
  if (i.outlierPayment) pmt += i.outlierPayment;
  return pmt;
}

// Apply a per-diem schedule to a list of inpatient days, possibly with carve-outs.
export interface PerDiemDay {
  level: string;        // e.g. "med-surg", "icu", "nicu"
  rate: number;         // contracted per-diem rate for this level
  carveOut?: number;    // optional carve-out add-on (e.g. implants, drugs) for this day
}

export function perDiemTotal(days: PerDiemDay[]): number {
  return days.reduce((sum, d) => sum + d.rate + (d.carveOut ?? 0), 0);
}

// Member cost share calculation.
// Order: deductible first, then copay or coinsurance against the remaining allowed,
// capped by OOP max. Returns the split between member and plan responsibility.
export interface CostShareInputs {
  allowedAmount: number;
  deductibleRemaining: number;
  copay: number;               // flat copay, applied if > 0 (replaces coinsurance for this service)
  coinsuranceRate: number;     // 0–1, member's share after deductible
  oopMaxRemaining: number;     // member's remaining out-of-pocket headroom
}

export interface CostShareResult {
  memberPays: number;
  planPays: number;
  appliedToDeductible: number;
  appliedToCopayOrCoins: number;
  cappedByOopMax: boolean;
}

export function memberCostShare(i: CostShareInputs): CostShareResult {
  const allowed = Math.max(0, i.allowedAmount);
  const ded = Math.max(0, i.deductibleRemaining);
  const oop = Math.max(0, i.oopMaxRemaining);

  const appliedToDed = Math.min(allowed, ded);
  const remainingAfterDed = allowed - appliedToDed;

  let appliedAfterDed: number;
  if (i.copay > 0) {
    appliedAfterDed = Math.min(i.copay, remainingAfterDed);
  } else {
    appliedAfterDed = remainingAfterDed * Math.min(1, Math.max(0, i.coinsuranceRate));
  }

  let memberRaw = appliedToDed + appliedAfterDed;
  let cappedByOopMax = false;
  if (memberRaw > oop) {
    memberRaw = oop;
    cappedByOopMax = true;
  }
  const planPays = allowed - memberRaw;

  return {
    memberPays: round2(memberRaw),
    planPays: round2(planPays),
    appliedToDeductible: round2(appliedToDed),
    appliedToCopayOrCoins: round2(appliedAfterDed),
    cappedByOopMax,
  };
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
